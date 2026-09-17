import { createFileRoute } from "@tanstack/react-router";
import { createHmac, timingSafeEqual } from "crypto";

// Dodo Payments uses Standard Webhooks: signature = base64(HMAC-SHA256(secret,
// `${webhook-id}.${webhook-timestamp}.${body}`)), sent as "v1,<sig>" pairs.
function verifySignature(rawBody: string, headers: Headers, secret: string): boolean {
  const id = headers.get("webhook-id");
  const timestamp = headers.get("webhook-timestamp");
  const signatureHeader = headers.get("webhook-signature");
  if (!id || !timestamp || !signatureHeader) return false;

  // Reject events older than 5 minutes to prevent replay attacks.
  const ageSeconds = Math.abs(Date.now() / 1000 - Number(timestamp));
  if (!Number.isFinite(ageSeconds) || ageSeconds > 300) return false;

  const key = Buffer.from(secret.replace(/^whsec_/, ""), "base64");
  const expected = createHmac("sha256", key)
    .update(`${id}.${timestamp}.${rawBody}`)
    .digest("base64");

  return signatureHeader.split(" ").some((part) => {
    const [version, sig] = part.split(",");
    if (version !== "v1" || !sig) return false;
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    return a.length === b.length && timingSafeEqual(a, b);
  });
}

export const Route = createFileRoute("/api/public/dodo-webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const webhookKey = process.env["DODO_WEBHOOK_KEY"];
        if (!webhookKey) return new Response("Not configured", { status: 500 });

        const rawBody = await request.text();
        if (!verifySignature(rawBody, request.headers, webhookKey)) {
          return new Response("Invalid signature", { status: 401 });
        }

        const event = JSON.parse(rawBody) as {
          type?: string;
          data?: {
            payment_id?: string;
            subscription_id?: string | null;
            status?: string;
            product_id?: string;
            product_cart?: { product_id?: string }[] | null;
            total_amount?: number;
            currency?: string;
            next_billing_date?: string;
            customer?: { customer_id?: string; email?: string };
          };
        };

        const type = event.type ?? "";

        // One-time lifetime purchase (including $0 launch-promo claims) → issue its license.
        if (type === "payment.succeeded" || type === "refund.succeeded") {
          const d = event.data ?? {};
          if (!d.payment_id) return Response.json({ ok: true });
          const license = await import("@/lib/license.server");
          try {
            if (type === "refund.succeeded") {
              await license.recordRefund(d.payment_id);
              return Response.json({ ok: true });
            }
            // Renewals of subscriptions from before Pro became lifetime carry a subscription id.
            if (d.subscription_id) return Response.json({ ok: true });
            const productId = process.env["DODO_PRODUCT_ID"];
            const productIds = (d.product_cart ?? []).map((i) => i.product_id);
            if (productId && !productIds.includes(productId)) return Response.json({ ok: true });
            const email = d.customer?.email;
            if (!email) return Response.json({ ok: true });
            await license.recordPayment({
              paymentId: d.payment_id,
              email,
              customerId: d.customer?.customer_id ?? null,
              productId: productId ?? productIds[0] ?? null,
              status: "succeeded",
              totalAmount: d.total_amount ?? 0,
              currency: d.currency ?? null,
              refunded: false,
            });
          } catch (e) {
            console.error("Recording payment failed:", e);
            return new Response("Database error", { status: 500 });
          }
          return Response.json({ ok: true });
        }

        if (!type.startsWith("subscription.")) return Response.json({ ok: true });

        const d = event.data ?? {};
        const status =
          d.status ??
          (type === "subscription.cancelled"
            ? "cancelled"
            : type === "subscription.failed"
              ? "failed"
              : "active");

        const email = d.customer?.email;
        if (!email) return Response.json({ ok: true });

        // Legacy yearly subscriptions: store them and issue their (now lifetime) license key.
        const { recordSubscription } = await import("@/lib/license.server");
        try {
          await recordSubscription({
            email,
            customerId: d.customer?.customer_id ?? null,
            subscriptionId: d.subscription_id ?? null,
            productId: d.product_id ?? null,
            status,
            currentPeriodEnd: d.next_billing_date ?? null,
          });
        } catch (e) {
          console.error("Recording subscription failed:", e);
          return new Response("Database error", { status: 500 });
        }

        return Response.json({ ok: true });
      },
    },
  },
});
