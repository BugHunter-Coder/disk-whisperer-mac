import { Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { Download, LogIn, LogOut, Menu, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`group flex items-center gap-2.5 ${className}`}>
      <span className="relative grid size-9 place-items-center overflow-hidden rounded-xl bg-ink">
        <span className="absolute top-1.5 left-1.5 size-3 rounded-[3px] bg-mint transition-transform duration-300 group-hover:scale-110" />
        <span className="absolute top-1.5 right-1.5 h-3 w-2.5 rounded-[3px] bg-sky transition-transform duration-300 group-hover:-translate-y-0.5" />
        <span className="absolute right-1.5 bottom-1.5 left-1.5 h-3 rounded-[3px] bg-coral transition-transform duration-300 group-hover:translate-y-0.5" />
      </span>
      <span className="font-display text-xl font-extrabold tracking-tight">MacDissect</span>
    </Link>
  );
}

const links = [
  { to: "/", hash: "features", label: "Features" },
  { to: "/pricing", label: "Pricing" },
  { to: "/privacy", label: "Privacy" },
] as const;

/** The signed-in visitor's email (null when signed out), updating on sign-in and sign-out. */
function useAccountEmail() {
  const [email, setEmail] = useState<string | null>(null);
  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => setEmail(data.session?.user.email ?? null));
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user.email ?? null);
    });
    return () => data.subscription.unsubscribe();
  }, []);
  return email;
}

export function SiteHeader() {
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const accountEmail = useAccountEmail();
  const signedIn = accountEmail !== null;
  const navigate = useNavigate();

  const signOut = async () => {
    setOpen(false);
    await supabase.auth.signOut();
    await navigate({ to: "/" });
  };

  // Hide while scrolling down, show again on the way up.
  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(y > previous && y > 160 && !open);
    setScrolled(y > 12);
  });

  return (
    <>
      <motion.div
        className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-gradient-to-r from-mint via-sky to-coral"
        style={{ scaleX: progress }}
      />
      <motion.header
        className="fixed inset-x-0 top-3 z-40 px-4"
        animate={{ y: hidden ? -96 : 0 }}
        transition={{ type: "spring", visualDuration: 0.35, bounce: 0 }}
      >
        <div
          className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5 transition-[background-color,box-shadow,border-color] duration-300 ${
            scrolled || open
              ? "border border-ink/10 bg-cream/80 shadow-[0_8px_30px_-12px_rgba(25,25,37,0.25)] backdrop-blur-xl"
              : "border border-transparent"
          }`}
        >
          <Logo />
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                {...("hash" in l ? { hash: l.hash } : {})}
                className="rounded-full px-4 py-2 text-sm font-semibold text-ink/65 transition-colors hover:bg-ink/5 hover:text-ink"
                activeProps={{ className: "text-ink" }}
                activeOptions={{ exact: true, includeHash: false }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            {signedIn ? (
              <>
                <Link
                  to="/account"
                  title={accountEmail}
                  className="hidden items-center gap-2 rounded-full border border-ink/15 py-1.5 pr-4 pl-1.5 text-sm font-semibold text-ink transition-colors hover:bg-ink/5 sm:inline-flex"
                  activeProps={{ className: "bg-ink/5" }}
                >
                  <span className="grid size-7 place-items-center rounded-full bg-ink text-xs font-bold text-cream uppercase">
                    {accountEmail.charAt(0)}
                  </span>
                  Account
                </Link>
                <button
                  type="button"
                  onClick={signOut}
                  aria-label="Log out"
                  title="Log out"
                  className="hidden size-10 place-items-center rounded-full text-ink/60 transition-colors hover:bg-ink/5 hover:text-ink sm:grid"
                >
                  <LogOut className="size-4" />
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="hidden items-center gap-2 rounded-full border border-ink/15 px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-ink/5 sm:inline-flex"
              >
                <LogIn className="size-4" /> Log in
              </Link>
            )}
            <motion.span whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }}>
              <Link
                to="/download"
                className="hidden items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-cream shadow-[3px_3px_0_0_#34D399] sm:inline-flex"
              >
                <Download className="size-4" /> Download
              </Link>
            </motion.span>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="grid size-10 place-items-center rounded-xl hover:bg-ink/5 md:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {open && (
            <motion.nav
              key="mobile"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ type: "spring", visualDuration: 0.3, bounce: 0.1 }}
              className="mx-auto mt-2 flex max-w-6xl flex-col gap-1 rounded-2xl border border-ink/10 bg-cream/95 p-3 shadow-xl backdrop-blur-xl md:hidden"
            >
              {links.map((l) => (
                <Link
                  key={l.label}
                  to={l.to}
                  {...("hash" in l ? { hash: l.hash } : {})}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 font-semibold hover:bg-ink/5"
                >
                  {l.label}
                </Link>
              ))}
              {signedIn ? (
                <>
                  <Link
                    to="/account"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 font-semibold hover:bg-ink/5"
                  >
                    <span className="grid size-7 place-items-center rounded-full bg-ink text-xs font-bold text-cream uppercase">
                      {accountEmail.charAt(0)}
                    </span>
                    Account
                  </Link>
                  <button
                    type="button"
                    onClick={signOut}
                    className="rounded-xl px-4 py-3 text-left font-semibold hover:bg-ink/5"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setOpen(false)}
                  className="rounded-xl border border-ink/15 px-4 py-3 text-center font-semibold hover:bg-ink/5"
                >
                  Log in
                </Link>
              )}
              <Link
                to="/download"
                onClick={() => setOpen(false)}
                className="mt-1 rounded-xl bg-ink px-4 py-3 text-center font-semibold text-cream"
              >
                Download for Mac
              </Link>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
