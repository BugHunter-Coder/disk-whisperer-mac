import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const inputSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(200),
});

function dodoBaseUrl() {
  return process.env["DODO_ENVIRONMENT"] === "live"
    ? "https://live.dodopayments.com"
    : "https://test.dodopayments.com";
}

export const createDodoCheckout = createServerFn({ method: "POST" })
  .inputValidator((data) => inputSchema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env["DODO_PAYMENTS_API_KEY"];
    const productId = process.env["DODO_PRODUCT_ID"];
    if (!apiKey || !productId) {
      return { ok: false as const, error: "Payments are not configured yet." };
    }

    const origin =
      process.env["SITE_URL"] ??
      "https://project--8213ab52-6526-4d49-8898-7f68c648d679.lovable.app";

    const res = await fetch(`${dodoBaseUrl()}/checkouts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_cart: [{ product_id: productId, quantity: 1 }],
        customer: { email: data.email, name: data.name },
        return_url: `${origin}/?subscribed=1`,
      }),
    });

    if (!res.ok) {
      console.error("Dodo checkout failed:", res.status, await res.text());
      return { ok: false as const, error: "Could not start checkout. Please try again." };
    }

    const payload = (await res.json()) as { checkout_url?: string };
    if (!payload.checkout_url) {
      return { ok: false as const, error: "Checkout link missing from response." };
    }
    return { ok: true as const, checkoutUrl: payload.checkout_url };
  });
