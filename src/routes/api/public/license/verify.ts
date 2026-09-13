import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/license/verify")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { verifyLicenseKey } = await import("@/lib/license.server");
        let body: { license_key?: string };
        try {
          body = (await request.json()) as { license_key?: string };
        } catch {
          return Response.json({ valid: false, reason: "Invalid request body." }, { status: 400 });
        }
        if (!body.license_key || typeof body.license_key !== "string") {
          return Response.json({ valid: false, reason: "license_key is required." }, { status: 400 });
        }
        const result = await verifyLicenseKey(body.license_key);
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
