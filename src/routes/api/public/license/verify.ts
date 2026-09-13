import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/license/verify")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { verifyLicenseKey } = await import("@/lib/license.server");
        let body: { license_key?: string; device_id?: string };
        try {
          body = (await request.json()) as typeof body;
        } catch {
          return Response.json(
            { valid: false, code: "missing_fields", reason: "Invalid request body." },
            { status: 400 },
          );
        }
        if (!body.license_key || typeof body.license_key !== "string") {
          return Response.json(
            { valid: false, code: "missing_fields", reason: "license_key is required." },
            { status: 400 },
          );
        }
        const deviceId = typeof body.device_id === "string" ? body.device_id : undefined;
        const result = await verifyLicenseKey(body.license_key, deviceId);
        // Never leak the subscriber email to an unauthenticated caller.
        if (!result.valid) return Response.json(result, { status: 200 });
        return Response.json({
          valid: true,
          status: result.status,
          activations: result.activations,
          max_activations: result.maxActivations,
        });
      },
    },
  },
});
