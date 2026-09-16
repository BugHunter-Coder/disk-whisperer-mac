#!/usr/bin/env node
// Copies the server's settings from the Cloudflare build environment into the Worker's runtime
// secrets. Build variables only exist while building; checkout, the license API and the Dodo
// webhook read these at runtime. Run after `wrangler deploy` in the Workers Builds deploy command:
//   npx wrangler deploy && node scripts/sync-worker-secrets.mjs
import { spawnSync } from "node:child_process";

const RUNTIME_KEYS = [
  "SUPABASE_URL",
  "SUPABASE_PUBLISHABLE_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "DODO_ENVIRONMENT",
  "DODO_PAYMENTS_API_KEY",
  "DODO_PRODUCT_ID",
  "DODO_WEBHOOK_KEY",
  "SITE_URL",
  "MACDISSECT_DOWNLOAD_URL",
];

const secrets = Object.fromEntries(
  RUNTIME_KEYS.filter((key) => process.env[key]?.trim()).map((key) => [key, process.env[key].trim()]),
);
const missing = RUNTIME_KEYS.filter((key) => !(key in secrets) && key !== "MACDISSECT_DOWNLOAD_URL");
if (missing.length) console.warn(`[sync-worker-secrets] not set in the build environment: ${missing.join(", ")}`);
if (!Object.keys(secrets).length) {
  console.error("[sync-worker-secrets] nothing to upload; add the variables under Settings → Builds.");
  process.exit(1);
}

// `wrangler secret bulk` reads JSON from stdin, so values never appear in the build log.
const result = spawnSync("npx", ["wrangler", "secret", "bulk"], {
  input: JSON.stringify(secrets),
  stdio: ["pipe", "inherit", "inherit"],
});
if (result.status !== 0) process.exit(result.status ?? 1);
console.log(`[sync-worker-secrets] uploaded ${Object.keys(secrets).length} runtime secrets: ${Object.keys(secrets).join(", ")}`);
