import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";
import { BadgeCheck, CalendarClock, Check, Copy, Eye, EyeOff, LogOut, Mail } from "lucide-react";
import type { MyLicense } from "@/lib/license.functions";

const dateFormat = new Intl.DateTimeFormat("en-US", { dateStyle: "medium" });

function formatDate(value: string | null | undefined) {
  return value ? dateFormat.format(new Date(value)) : "—";
}

/** "MACD-ABCD-EFGH-IJKL-MNOP" → "MACD-••••-••••-••••-MNOP": enough to recognise, not to reuse. */
function maskLicenseKey(key: string) {
  const groups = key.split("-");
  if (groups.length < 3) return "•".repeat(Math.max(4, key.length - 4)) + key.slice(-4);
  return groups
    .map((g, i) => (i === 0 || i === groups.length - 1 ? g : "•".repeat(g.length)))
    .join("-");
}

export function ProfileCard({
  email,
  emailVerified,
  memberSince,
  onSignOut,
}: {
  email: string;
  emailVerified: boolean;
  memberSince: string;
  onSignOut: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-5 rounded-[2rem] border border-ink/10 bg-cream p-6 sm:p-8">
      <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-ink font-display text-2xl font-extrabold text-cream uppercase">
        {email.charAt(0)}
      </span>
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-2 truncate text-lg font-bold">
          <Mail className="size-4 shrink-0 text-ink/40" />
          <span className="truncate">{email}</span>
        </p>
        <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink/60">
          {emailVerified && (
            <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-700">
              <BadgeCheck className="size-4" /> Email verified
            </span>
          )}
          <span>Member since {formatDate(memberSince)}</span>
        </p>
      </div>
      <button
        type="button"
        onClick={onSignOut}
        className="flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-sm font-semibold transition-colors hover:bg-ink/5"
      >
        <LogOut className="size-4" /> Log out
      </button>
    </div>
  );
}

export function SubscriptionDetails({ license }: { license: MyLicense }) {
  const status = license.subscription?.status ?? license.status;
  const active = status === "active";
  const rows = [
    { label: "Plan", value: "MacDissect Pro · yearly" },
    {
      label: "Status",
      value: (
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold capitalize ${
            active ? "bg-mint/30 text-emerald-800" : "bg-coral/25 text-ink"
          }`}
        >
          <span className={`size-1.5 rounded-full ${active ? "bg-emerald-600" : "bg-coral"}`} />
          {status.replace(/_/g, " ")}
        </span>
      ),
    },
    { label: "Renews on", value: formatDate(license.subscription?.renewsAt) },
    { label: "Key issued", value: formatDate(license.createdAt) },
  ];

  return (
    <dl className="grid gap-px overflow-hidden rounded-[2rem] border border-ink/10 bg-ink/10 sm:grid-cols-2">
      {rows.map((r) => (
        <div key={r.label} className="bg-cream px-6 py-4">
          <dt className="flex items-center gap-1.5 text-xs font-bold tracking-wide text-ink/45 uppercase">
            {r.label === "Renews on" && <CalendarClock className="size-3.5" />}
            {r.label}
          </dt>
          <dd className="mt-1 font-semibold">{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function MaskedLicenseKey({ licenseKey }: { licenseKey: string }) {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(licenseKey);
      setCopied(true);
      toast.success("License key copied. Paste it into MacDissect → Settings → License.");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("Couldn't copy. Show the key and copy it manually.");
    }
  };

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      <code
        aria-label={revealed ? "License key" : "License key (hidden)"}
        className="min-w-0 flex-1 rounded-xl bg-cream/10 px-4 py-3 font-mono text-base font-bold tracking-wider break-all select-all sm:text-lg"
      >
        {revealed ? licenseKey : maskLicenseKey(licenseKey)}
      </code>
      <button
        type="button"
        onClick={() => setRevealed((v) => !v)}
        aria-pressed={revealed}
        className="flex items-center gap-2 rounded-xl border border-cream/20 px-4 py-3 text-sm font-bold transition-colors hover:bg-cream/10"
      >
        {revealed ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        {revealed ? "Hide" : "Show"}
      </button>
      <motion.button
        type="button"
        onClick={copy}
        whileTap={{ scale: 0.94 }}
        className="flex w-24 items-center justify-center gap-2 rounded-xl bg-mint px-4 py-3 text-sm font-bold text-ink"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={copied ? "done" : "copy"}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-2"
          >
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            {copied ? "Copied" : "Copy"}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
