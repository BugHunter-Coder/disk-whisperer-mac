import NumberFlow, { type Value } from "@number-flow/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type NumberTickerProps = {
  value: Value;
  label?: ReactNode;
  decimals?: number;
  className?: string;
};

/** Animated stat: value counts up/down smoothly on change, with a live pulse dot. */
export function NumberTicker({ value, label, decimals = 0, className }: NumberTickerProps) {
  return (
    <div className={cn("inline-flex items-center gap-1.5", className)}>
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-mint opacity-75" />
        <span className="relative inline-flex size-2 rounded-full bg-mint" />
      </span>
      <NumberFlow
        value={value}
        format={{
          notation: "standard",
          compactDisplay: "short",
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }}
      />
      {label && <span className="text-ink/70">{label}</span>}
    </div>
  );
}
