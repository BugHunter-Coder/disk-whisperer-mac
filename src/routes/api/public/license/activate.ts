import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/license/activate")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { activateLicenseOnDevice } = await import("@/lib/license.server");
        let body: { license_key?: string; device_id?: string; device_name?: string };
        try {
          body = (await request.json()) as typeof body;
        } catch {
          return Response.json({ ok: false, message: "Invalid request body." }, { status: 400 });
        }
        if (!body.license_key || !body.device_id) {
          return Response.json(
            { ok: false, message: "license_key and device_id are required." },
            { status: 400 },
          );
        }
        const result = await activateLicenseOnDevice({
          rawKey: body.license_key,
          deviceId: body.device_id,
          deviceName: body.device_name ?? null,
        });
        return Response.json(result, { status: result.ok ? 200 : 400 });
      },
    },
  },
});
