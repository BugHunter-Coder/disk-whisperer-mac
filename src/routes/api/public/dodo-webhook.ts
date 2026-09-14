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
            subscription_id?: string;
            status?: string;
            product_id?: string;
            next_billing_date?: string;
            customer?: { customer_id?: string; email?: string };
          };
        };

        const type = event.type ?? "";
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

        // Store the subscription and issue (or revoke) the Pro license key for this subscriber.
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
