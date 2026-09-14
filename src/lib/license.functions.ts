import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const keySchema = z.object({ licenseKey: z.string().min(4).max(64) });

export const checkLicenseKey = createServerFn({ method: "POST" })
  .inputValidator((data) => keySchema.parse(data))
  .handler(async ({ data }) => {
    const { verifyLicenseKey } = await import("./license.server");
    const result = await verifyLicenseKey(data.licenseKey);
    if (!result.valid) return { valid: false as const, reason: result.reason };
    return {
      valid: true as const,
      activations: result.activations,
      maxActivations: result.maxActivations,
    };
  });

export const activateDevice = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        licenseKey: z.string().min(4).max(64),
        deviceId: z.string().min(3).max(128),
        deviceName: z.string().max(120).optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const { activateLicenseOnDevice } = await import("./license.server");
    return activateLicenseOnDevice({
      rawKey: data.licenseKey,
      deviceId: data.deviceId,
      deviceName: data.deviceName ?? null,
    });
  });

/**
 * Enough to recognise the Mac, never the full ID: the key plus the full ID is what releases a Mac,
 * and that must only happen from MacDissect on that Mac. So the full ID never reaches the browser.
 */
function shortMacId(deviceId: string) {
  return deviceId.length > 10 ? `${deviceId.slice(0, 4)}…${deviceId.slice(-4)}` : "••••";
}

export type MyLicense = {
  licenseKey: string;
  status: string;
  activations: number;
  maxActivations: number;
  createdAt: string;
  subscription: { status: string; renewsAt: string | null } | null;
  /** Read-only: a key can only be released from the Mac itself (Settings → License). deviceId is shortened. */
  devices: {
    id: string;
    deviceId: string;
    deviceName: string | null;
    activatedAt: string;
    lastSeenAt: string;
  }[];
};

export const getMyLicense = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<MyLicense | null> => {
    const findLicense = () =>
      context.supabase
        .from("licenses")
        .select(
          "id, license_key, status, activation_count, max_activations, created_at, dodo_subscription_id",
        )
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

    let { data: license } = await findLicense();

    // No key yet: the payment webhook may not have arrived, so ask Dodo directly.
    const email = typeof context.claims.email === "string" ? context.claims.email : null;
    if (!license && email) {
      const { syncSubscriptionsFromDodo } = await import("./license.server");
      try {
        if ((await syncSubscriptionsFromDodo(email)) > 0) ({ data: license } = await findLicense());
      } catch (e) {
        console.error("Dodo subscription sync failed:", e);
      }
    }

    if (!license) return null;

    const { data: devices } = await context.supabase
      .from("license_activations")
      .select("id, device_id, device_name, created_at, last_seen_at")
      .eq("license_id", license.id)
      .order("created_at", { ascending: true });

    const { data: subscription } = license.dodo_subscription_id
      ? await context.supabase
          .from("dodo_subscriptions")
          .select("status, current_period_end")
          .eq("dodo_subscription_id", license.dodo_subscription_id)
          .maybeSingle()
      : { data: null };

    return {
      licenseKey: license.license_key,
      status: license.status,
      activations: license.activation_count,
      maxActivations: license.max_activations,
      createdAt: license.created_at,
      subscription: subscription
        ? { status: subscription.status, renewsAt: subscription.current_period_end }
        : null,
      devices: (devices ?? []).map((d) => ({
        id: d.id,
        deviceId: shortMacId(d.device_id),
        deviceName: d.device_name,
        activatedAt: d.created_at,
        lastSeenAt: d.last_seen_at,
      })),
    };
  });

export const getDownloadLink = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: license } = await context.supabase
      .from("licenses")
      .select("id")
      .eq("status", "active")
      .limit(1)
      .maybeSingle();

    if (!license) {
      return { ok: false as const, message: "No active subscription found for your account." };
    }

    const { DOWNLOAD } = await import("./download");
    const url = process.env["MACDISSECT_DOWNLOAD_URL"] ?? DOWNLOAD.url;
    if (!url) {
      return {
        ok: false as const,
        message: "The download isn't published yet — it will appear here as soon as it is.",
      };
    }
    return { ok: true as const, url };
  });
