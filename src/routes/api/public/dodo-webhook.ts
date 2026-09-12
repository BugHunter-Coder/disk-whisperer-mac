import { createFileRoute } from "@tanstack/react-router";
import { createHmac, timingSafeEqual } from "crypto";
import { createClient } from "@supabase/supabase-js";

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

  return signatureHeader
    .split(" ")
    .some((part) => {
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

        const supabase = createClient(
          process.env["SUPABASE_URL"]!,
          process.env["SUPABASE_SERVICE_ROLE_KEY"]!,
          { auth: { persistSession: false } },
        );

        const { error } = await supabase.from("subscriptions").upsert(
          {
            email: d.customer?.email ?? "unknown",
            customer_id: d.customer?.customer_id ?? null,
            dodo_subscription_id: d.subscription_id ?? null,
            product_id: d.product_id ?? null,
            status,
            current_period_end: d.next_billing_date ?? null,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "dodo_subscription_id" },
        );

        if (error) {
          console.error("Subscription upsert failed:", error);
          return new Response("Database error", { status: 500 });
        }
        return Response.json({ ok: true });
      },
    },
  },
});
