import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no ambiguous chars

export function generateLicenseKey(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  const chars = Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]);
  const groups: string[] = [];
  for (let i = 0; i < 16; i += 4) groups.push(chars.slice(i, i + 4).join(""));
  return `MACD-${groups.join("-")}`;
}

export function normalizeKey(input: string): string {
  return input.trim().toUpperCase().replace(/\s+/g, "");
}

export function adminClient(): SupabaseClient {
  return createClient(process.env["SUPABASE_URL"]!, process.env["SUPABASE_SERVICE_ROLE_KEY"]!, {
    auth: { persistSession: false },
  });
}

/**
 * Creates (or reactivates) a license for a paid subscription. Idempotent:
 * a subscription that already has a key keeps the same key.
 */
export async function issueLicenseForSubscription(params: {
  email: string;
  subscriptionId: string | null;
  active: boolean;
}): Promise<void> {
  const supabase = adminClient();
  const status = params.active ? "active" : "revoked";

  if (params.subscriptionId) {
    const { data: existing } = await supabase
      .from("licenses")
      .select("id")
      .eq("dodo_subscription_id", params.subscriptionId)
      .maybeSingle();

    if (existing) {
      await supabase.from("licenses").update({ status, email: params.email }).eq("id", existing.id);
      return;
    }
  }

  if (!params.active) return;

  await supabase.from("licenses").insert({
    license_key: generateLicenseKey(),
    email: params.email,
    dodo_subscription_id: params.subscriptionId,
    status: "active",
  });
}

type LicenseRow = {
  id: string;
  license_key: string;
  email: string;
  status: string;
  max_activations: number;
  activation_count: number;
};

/** Machine-readable failure reasons, so the Mac app can react without parsing messages. */
export type LicenseErrorCode =
  "missing_fields" | "not_found" | "revoked" | "limit_reached" | "not_activated" | "server_error";

export type LicenseCheck =
  | { valid: false; code: LicenseErrorCode; reason: string }
  | {
      valid: true;
      email: string;
      status: string;
      activations: number;
      maxActivations: number;
    };

async function findLicense(supabase: SupabaseClient, key: string): Promise<LicenseRow | null> {
  const { data } = await supabase
    .from("licenses")
    .select("id, license_key, email, status, max_activations, activation_count")
    .eq("license_key", key)
    .maybeSingle<LicenseRow>();
  return data;
}

/** Recounts activations so the stored count never drifts from the real rows. */
async function syncActivationCount(supabase: SupabaseClient, licenseId: string): Promise<number> {
  const { count } = await supabase
    .from("license_activations")
    .select("id", { count: "exact", head: true })
    .eq("license_id", licenseId);
  await supabase
    .from("licenses")
    .update({ activation_count: count ?? 0 })
    .eq("id", licenseId);
  return count ?? 0;
}

/**
 * Checks a key. With a device id, also requires that Mac to still be activated
 * (so removing a Mac from the account page locks it) and records it as seen.
 */
export async function verifyLicenseKey(
  rawKey: string,
  rawDeviceId?: string,
): Promise<LicenseCheck> {
  const key = normalizeKey(rawKey);
  if (!key) return { valid: false, code: "missing_fields", reason: "Enter a license key." };

  const supabase = adminClient();
  const data = await findLicense(supabase, key);

  if (!data) return { valid: false, code: "not_found", reason: "That license key was not found." };
  if (data.status !== "active")
    return { valid: false, code: "revoked", reason: "This license is no longer active." };

  const deviceId = rawDeviceId?.trim();
  if (deviceId) {
    const { data: activation } = await supabase
      .from("license_activations")
      .select("id")
      .eq("license_id", data.id)
      .eq("device_id", deviceId)
      .maybeSingle();
    if (!activation)
      return {
        valid: false,
        code: "not_activated",
        reason: "This Mac is no longer activated for this license.",
      };
    await supabase
      .from("license_activations")
      .update({ last_seen_at: new Date().toISOString() })
      .eq("id", activation.id);
  }

  return {
    valid: true,
    email: data.email,
    status: data.status,
    activations: data.activation_count,
    maxActivations: data.max_activations,
  };
}

export type LicenseResult = {
  ok: boolean;
  code?: LicenseErrorCode;
  message: string;
  activations?: number;
  maxActivations?: number;
};

export async function activateLicenseOnDevice(params: {
  rawKey: string;
  deviceId: string;
  deviceName?: string | null;
}): Promise<LicenseResult> {
  const key = normalizeKey(params.rawKey);
  const deviceId = params.deviceId.trim();
  if (!key || !deviceId)
    return {
      ok: false,
      code: "missing_fields",
      message: "License key and device id are required.",
    };

  const supabase = adminClient();
  const license = await findLicense(supabase, key);

  if (!license) return { ok: false, code: "not_found", message: "That license key was not found." };
  if (license.status !== "active")
    return { ok: false, code: "revoked", message: "This license is no longer active." };

  const { data: existing } = await supabase
    .from("license_activations")
    .select("id")
    .eq("license_id", license.id)
    .eq("device_id", deviceId)
    .maybeSingle();

  if (existing) {
    await supabase
      .from("license_activations")
      .update({ last_seen_at: new Date().toISOString(), device_name: params.deviceName ?? null })
      .eq("id", existing.id);
    return {
      ok: true,
      message: "This Mac is already activated.",
      activations: license.activation_count,
      maxActivations: license.max_activations,
    };
  }

  if (license.activation_count >= license.max_activations) {
    return {
      ok: false,
      code: "limit_reached",
      message: `This license is already used on ${license.max_activations} Macs. Remove one to free a slot.`,
    };
  }

  const { error } = await supabase.from("license_activations").insert({
    license_id: license.id,
    device_id: deviceId,
    device_name: params.deviceName ?? null,
  });
  if (error)
    return { ok: false, code: "server_error", message: "Could not activate this Mac. Try again." };

  const nextCount = await syncActivationCount(supabase, license.id);

  return {
    ok: true,
    message: "MacDissect Pro is activated on this Mac.",
    activations: nextCount,
    maxActivations: license.max_activations,
  };
}

/** Frees a Mac's activation slot. Removing a Mac that isn't activated still succeeds. */
export async function deactivateLicenseOnDevice(params: {
  rawKey: string;
  deviceId: string;
}): Promise<LicenseResult> {
  const key = normalizeKey(params.rawKey);
  const deviceId = params.deviceId.trim();
  if (!key || !deviceId)
    return {
      ok: false,
      code: "missing_fields",
      message: "License key and device id are required.",
    };

  const supabase = adminClient();
  const license = await findLicense(supabase, key);
  if (!license) return { ok: false, code: "not_found", message: "That license key was not found." };

  await supabase
    .from("license_activations")
    .delete()
    .eq("license_id", license.id)
    .eq("device_id", deviceId);
  const activations = await syncActivationCount(supabase, license.id);

  return {
    ok: true,
    message: "This Mac was deactivated.",
    activations,
    maxActivations: license.max_activations,
  };
}
