import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const STORAGE_KEY = "macdissect_visitor_id";

function getOrCreateVisitorId(): string {
  const existing = localStorage.getItem(STORAGE_KEY);
  if (existing) return existing;
  const id = crypto.randomUUID();
  localStorage.setItem(STORAGE_KEY, id);
  return id;
}

/**
 * Total unique visitors to the site to date, backed by the `site_visitors`
 * table (see migration 20260916120000). Records this browser's visit once
 * (deduped server-side by visitor_id) then reads the running total.
 */
export function useTotalVisitorCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        const visitorId = getOrCreateVisitorId();
        await supabase.rpc("record_site_visit", { p_visitor_id: visitorId });
        const { data, error } = await supabase.rpc("get_site_visitor_count");
        if (!cancelled && !error && typeof data === "number") setCount(data);
      } catch {
        // Best-effort stat; leave count null on failure.
      }
    }

    void run();
    return () => {
      cancelled = true;
    };
  }, []);

  return count;
}
