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

export type MyLicense = {
  licenseKey: string;
  status: string;
  activations: number;
  maxActivations: number;
  devices: { id: string; deviceId: string; deviceName: string | null; lastSeenAt: string }[];
};

export const getMyLicense = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<MyLicense | null> => {
    const { data: license } = await context.supabase
      .from("licenses")
      .select("id, license_key, status, activation_count, max_activations")
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!license) return null;

    const { data: devices } = await context.supabase
      .from("license_activations")
      .select("id, device_id, device_name, last_seen_at")
      .eq("license_id", license.id)
      .order("created_at", { ascending: true });

    return {
      licenseKey: license.license_key,
      status: license.status,
      activations: license.activation_count,
      maxActivations: license.max_activations,
      devices: (devices ?? []).map((d) => ({
        id: d.id,
        deviceId: d.device_id,
        deviceName: d.device_name,
        lastSeenAt: d.last_seen_at,
      })),
    };
  });

export const removeDevice = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => z.object({ activationId: z.string().uuid() }).parse(data))
  .handler(async ({ data, context }) => {
    // RLS scopes this read to licenses owned by the caller's email.
    const { data: activation } = await context.supabase
      .from("license_activations")
      .select("id, license_id")
      .eq("id", data.activationId)
      .maybeSingle();

    if (!activation) return { ok: false as const, message: "That Mac was not found." };

    const { adminClient } = await import("./license.server");
    const admin = adminClient();
    await admin.from("license_activations").delete().eq("id", activation.id);

    const { count } = await admin
      .from("license_activations")
      .select("id", { count: "exact", head: true })
      .eq("license_id", activation.license_id);

    await admin
      .from("licenses")
      .update({ activation_count: count ?? 0 })
      .eq("id", activation.license_id);

    return { ok: true as const, message: "Mac removed." };
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

    const url = process.env["MACDISSECT_DOWNLOAD_URL"];
    if (!url) {
      return {
        ok: false as const,
        message: "The download isn't published yet — it will appear here as soon as it is.",
      };
    }
    return { ok: true as const, url };
  });
