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
        return_url: `${origin}/pricing?subscribed=1`,
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

export type ProPlan = {
  /** Price in the currency's smallest unit (e.g. cents). */
  amount: number;
  currency: string;
  /** e.g. "year" or "month"; null for a one-time price. */
  interval: string | null;
  intervalCount: number;
  taxInclusive: boolean;
  /** Free trial configured on the Dodo product, in days (0 when none). */
  trialDays: number;
};

/**
 * The advertised Pro plan: $10 per year. The Dodo product (DODO_PRODUCT_ID) should be a
 * recurring price of 1000 USD cents billed every 1 year so checkout matches this.
 */
export const PRO_PLAN_DEFAULT: ProPlan = {
  amount: 1000,
  currency: "USD",
  interval: "year",
  intervalCount: 1,
  taxInclusive: false,
  trialDays: 0,
};

/** Reads the live price of the Pro product from Dodo, so the pricing page never goes stale. */
export const getProPlan = createServerFn({ method: "GET" }).handler(
  async (): Promise<ProPlan | null> => {
    const apiKey = process.env["DODO_PAYMENTS_API_KEY"];
    const productId = process.env["DODO_PRODUCT_ID"];
    if (!apiKey || !productId) return null;

    try {
      const res = await fetch(`${dodoBaseUrl()}/products/${encodeURIComponent(productId)}`, {
        headers: { Authorization: `Bearer ${apiKey}` },
      });
      if (!res.ok) return null;
      const product = (await res.json()) as {
        price?: {
          type?: string;
          price?: number;
          fixed_price?: number;
          currency?: string;
          payment_frequency_interval?: string;
          payment_frequency_count?: number;
          tax_inclusive?: boolean;
          trial_period_days?: number;
        };
      };
      const price = product.price;
      const amount = price?.price ?? price?.fixed_price;
      if (!price || typeof amount !== "number" || !price.currency) return null;
      const recurring = price.type !== "one_time_price";
      const plan: ProPlan = {
        amount,
        currency: price.currency.toUpperCase(),
        interval: recurring ? (price.payment_frequency_interval ?? "year").toLowerCase() : null,
        intervalCount: price.payment_frequency_count ?? 1,
        taxInclusive: price.tax_inclusive ?? false,
        trialDays: recurring ? (price.trial_period_days ?? 0) : 0,
      };
      if (
        plan.amount !== PRO_PLAN_DEFAULT.amount ||
        plan.currency !== PRO_PLAN_DEFAULT.currency ||
        plan.interval !== PRO_PLAN_DEFAULT.interval ||
        plan.intervalCount !== PRO_PLAN_DEFAULT.intervalCount
      ) {
        console.warn("Dodo product price differs from the advertised $10/year plan:", plan);
      }
      return plan;
    } catch (e) {
      console.error("Could not load Dodo product price:", e);
      return null;
    }
  },
);
