import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

/**
 * Minimal chrome for a single app's legal/support pages (privacy, terms,
 * support). Deliberately lighter than the MacDissect marketing `PageShell` —
 * an App Store reviewer or InsectScan user landing here shouldn't see
 * MacDissect's Mac-only "Download" CTA and pricing nav.
 */
export function AppPageShell({
  appName,
  appIcon,
  children,
}: {
  appName: string;
  appIcon: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-paper font-sans text-ink antialiased">
      <header className="border-b border-ink/10">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <img src={appIcon} alt="" className="size-9 rounded-xl" />
            <span className="font-display text-lg font-bold">{appName}</span>
          </div>
          <Link
            to="/products"
            className="flex items-center gap-1.5 text-sm font-semibold text-ink/55 transition-colors hover:text-ink"
          >
            <ArrowLeft className="size-4" /> All products
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16">{children}</main>

      <footer className="border-t border-ink/10 px-6 py-8 text-center text-xs text-ink/45">
        © 2026 {appName} · another app by the maker of{" "}
        <Link to="/" className="underline hover:text-ink">
          MacDissect
        </Link>
      </footer>
    </div>
  );
}
