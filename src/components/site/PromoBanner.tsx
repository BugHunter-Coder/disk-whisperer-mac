import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowRight, Gift, X } from "lucide-react";
import { getLaunchOffer } from "@/lib/dodo.functions";

const DISMISS_KEY = "macdissect-launch-banner-dismissed";

/** Launch offer: the first 50 MacDissect Pro licenses are free for life. Hidden once they're gone. */
export function PromoBanner() {
  const fetchOffer = useServerFn(getLaunchOffer);
  const { data: offer } = useQuery({
    queryKey: ["launch-offer"],
    queryFn: () => fetchOffer(),
    staleTime: 60_000,
  });
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    try {
      setDismissed(sessionStorage.getItem(DISMISS_KEY) === "1");
    } catch {
      setDismissed(false);
    }
  }, []);

  const dismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // Storage blocked: the banner just comes back on the next page load.
    }
  };

  const show = !!offer?.active && !dismissed;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="mx-auto mb-2 flex max-w-6xl items-center gap-2 rounded-2xl bg-ink py-1.5 pr-1.5 pl-4 text-cream shadow-[4px_4px_0_0_#FFC93C]"
          role="region"
          aria-label="Launch offer"
        >
          <Gift className="size-4 shrink-0 text-sun" />
          <p className="min-w-0 flex-1 truncate text-xs font-semibold sm:text-sm">
            <span className="text-sun">Launch offer:</span> MacDissect Pro free for life for the
            first {offer.limit} people
            <span className="hidden sm:inline">
              {" "}
              · <strong className="tabular-nums">{offer.remaining}</strong> left
            </span>
          </p>
          <Link
            to="/pricing"
            hash="buy"
            className="group inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-sun px-3 py-1.5 text-xs font-bold text-ink sm:text-sm"
          >
            Claim
            <span className="sm:hidden tabular-nums">({offer.remaining} left)</span>
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Hide launch offer"
            className="grid size-7 shrink-0 place-items-center rounded-lg text-cream/60 hover:bg-cream/10 hover:text-cream"
          >
            <X className="size-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
