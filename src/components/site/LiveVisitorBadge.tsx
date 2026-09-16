import NumberFlow from "@number-flow/react";
import { useLiveVisitorCount } from "@/hooks/use-live-visitor-count";
import { useTotalVisitorCount } from "@/hooks/use-total-visitor-count";
import { NumberTicker } from "@/components/ui/number-ticker";

export function LiveVisitorBadge({ className = "" }: { className?: string }) {
  const liveCount = useLiveVisitorCount();
  const totalCount = useTotalVisitorCount();

  if (liveCount === null && totalCount === null) return null;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-ink/15 px-2 py-1 text-[10px] font-semibold text-ink/70 sm:gap-3 sm:px-3 sm:py-1.5 sm:text-xs ${className}`}
    >
      {liveCount !== null && (
        <NumberTicker
          value={liveCount}
          label={<span className="hidden sm:inline">online</span>}
          className="tabular-nums"
        />
      )}
      {totalCount !== null && (
        <span
          className="inline-flex items-center gap-1 tabular-nums"
          title="Total visitors to macdissect.com to date"
        >
          <NumberFlow value={totalCount} />
          <span className="hidden sm:inline text-ink/70">visitors</span>
        </span>
      )}
    </span>
  );
}
