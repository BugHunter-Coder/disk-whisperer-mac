import { Link } from "@tanstack/react-router";
import { comparisons } from "@/components/landing/compare";
import { Logo, SiteHeader } from "./SiteHeader";

export function SiteFooter() {
  return (
    <footer className="mt-10 border-t border-ink/10">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="sm:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm text-ink/60">
            See what's using your Mac's disk and reclaim space safely. Scans never leave your Mac.
          </p>
        </div>
        <div>
          <h3 className="text-xs font-bold tracking-widest text-ink/40 uppercase">Product</h3>
          <ul className="mt-4 space-y-2.5 text-sm font-medium text-ink/70">
            <li>
              <Link to="/" hash="features" className="hover:text-ink">
                Features
              </Link>
            </li>
            <li>
              <Link to="/download" className="hover:text-ink">
                Download
              </Link>
            </li>
            <li>
              <Link to="/pricing" className="hover:text-ink">
                Pricing
              </Link>
            </li>
            <li>
              <Link to="/" hash="faq" className="hover:text-ink">
                FAQ
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-bold tracking-widest text-ink/40 uppercase">Resources</h3>
          <ul className="mt-4 space-y-2.5 text-sm font-medium text-ink/70">
            <li>
              <Link to="/guides" className="hover:text-ink">
                Disk space guides
              </Link>
            </li>
            {comparisons.map((c) => (
              <li key={c.slug}>
                <Link to="/compare/$slug" params={{ slug: c.slug }} className="hover:text-ink">
                  vs {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-bold tracking-widest text-ink/40 uppercase">License</h3>
          <ul className="mt-4 space-y-2.5 text-sm font-medium text-ink/70">
            <li>
              <Link to="/account" className="hover:text-ink">
                My license
              </Link>
            </li>
            <li>
              <Link to="/activate" className="hover:text-ink">
                Activate a Mac
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-ink">
                Privacy policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-2 px-6 pb-10 text-xs text-ink/45 sm:flex-row">
        <span>© 2026 MacDissect. Made for people who love their Macs.</span>
        <span>macOS 14 Sonoma or later</span>
      </div>
    </footer>
  );
}

/** Page chrome shared by every marketing and account page. */
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-clip bg-paper font-sans text-ink antialiased">
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
