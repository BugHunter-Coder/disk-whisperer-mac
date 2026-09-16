import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * Live count of browser tabs currently on the site, via a Supabase Realtime
 * Presence channel. Ephemeral by design — presence is per-connection, so no
 * table or migration is needed and the count self-corrects on disconnect.
 */
export function useLiveVisitorCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const channel = supabase.channel("site-visitors", {
      config: { presence: { key: crypto.randomUUID() } },
    });

    channel
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState();
        setCount(Object.keys(state).length);
      })
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          void channel.track({ online_at: new Date().toISOString() });
        }
      });

    return () => {
      void supabase.removeChannel(channel);
    };
  }, []);

  return count;
}
