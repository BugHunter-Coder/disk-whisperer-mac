import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AnimatePresence, motion } from "motion/react";
import { KeyRound, Loader2 } from "lucide-react";
import { PageShell } from "@/components/site/SiteFooter";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — MacDissect Pro" },
      {
        name: "description",
        content:
          "Sign in with the email you used at checkout to get your MacDissect Pro license key and download link.",
      },
      { property: "og:title", content: "Sign in — MacDissect Pro" },
      {
        property: "og:description",
        content: "Access your MacDissect Pro license key and download.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthPage,
});

/** Supabase's raw messages ("Email signups are disabled") mean nothing to customers. */
function authErrorMessage(err: unknown): string {
  const code = (err as { code?: string } | null)?.code;
  switch (code) {
    case "email_provider_disabled":
    case "signup_disabled":
      return "Account sign-up is unavailable right now. Please try again later or contact support.";
    case "email_not_confirmed":
      return "Confirm your email first: open the link we sent you, then sign in.";
    case "invalid_credentials":
      return "That email and password don't match. Check them and try again.";
    case "user_already_exists":
      return "An account with this email already exists. Sign in instead.";
    default:
      return err instanceof Error ? err.message : "Something went wrong.";
  }
}

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/account` },
        });
        if (error) throw error;
        // Supabase hides existing accounts: it "succeeds" with no identities and sends no email.
        if (data.user && data.user.identities?.length === 0) {
          toast.error("An account with this email already exists. Sign in instead.");
          setMode("signin");
          return;
        }
        // With email confirmation on, there is no session until the link in the email is clicked.
        if (!data.session) {
          toast.success("Check your inbox", {
            description: `We sent a confirmation link to ${email}. Open it to finish creating your account.`,
          });
          setMode("signin");
          return;
        }
        toast.success("Account created.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      await navigate({ to: "/account" });
    } catch (err) {
      toast.error(authErrorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <PageShell>
      <section className="relative isolate grid min-h-[90vh] place-items-center overflow-hidden px-6 pt-32 pb-16">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(40%_50%_at_30%_30%,rgba(167,139,250,0.22),transparent),radial-gradient(40%_50%_at_75%_70%,rgba(52,211,153,0.2),transparent)]"
        />
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", visualDuration: 0.6, bounce: 0.15 }}
          className="w-full max-w-md"
        >
          <form
            onSubmit={submit}
            className="rounded-[2rem] border border-ink/10 bg-cream/90 p-8 shadow-[0_30px_60px_-30px_rgba(25,25,37,0.35)] backdrop-blur"
          >
            <span className="grid size-12 place-items-center rounded-2xl bg-ink text-cream">
              <KeyRound className="size-5" />
            </span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={mode}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.2 }}
              >
                <h1 className="mt-5 font-display text-3xl font-extrabold tracking-tight">
                  {mode === "signin" ? "Sign in to your license" : "Create your account"}
                </h1>
                <p className="mt-2 text-sm text-ink/60">
                  Use the same email address you used at checkout.
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 grid grid-cols-2 rounded-xl bg-ink/5 p-1 text-sm font-semibold">
              {(["signin", "signup"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={`relative rounded-lg py-2 transition-colors ${
                    mode === m ? "text-cream" : "text-ink/60 hover:text-ink"
                  }`}
                >
                  {mode === m && (
                    <motion.span
                      layoutId="auth-mode"
                      className="absolute inset-0 rounded-lg bg-ink"
                      transition={{ type: "spring", visualDuration: 0.3, bounce: 0.2 }}
                    />
                  )}
                  <span className="relative">{m === "signin" ? "Sign in" : "Create account"}</span>
                </button>
              ))}
            </div>

            <label className="mt-6 block text-xs font-bold tracking-wide text-ink/60 uppercase">
              Email
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm font-medium normal-case transition-colors outline-none focus:border-ink/40 focus:bg-cream"
              />
            </label>
            <label className="mt-3 block text-xs font-bold tracking-wide text-ink/60 uppercase">
              Password
              <input
                type="password"
                required
                minLength={6}
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm font-medium normal-case transition-colors outline-none focus:border-ink/40 focus:bg-cream"
              />
            </label>

            <motion.button
              type="submit"
              disabled={busy}
              whileHover={busy ? {} : { y: -2 }}
              whileTap={busy ? {} : { scale: 0.98 }}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-ink px-6 py-3.5 text-base font-bold text-cream shadow-[4px_4px_0_0_#A78BFA] disabled:opacity-50"
            >
              {busy && <Loader2 className="size-4 animate-spin" />}
              {busy ? "One moment…" : mode === "signin" ? "Sign in" : "Create account"}
            </motion.button>
          </form>
          <p className="mt-5 text-center text-sm text-ink/55">
            Not subscribed yet?{" "}
            <Link to="/pricing" className="font-semibold text-ink underline underline-offset-4">
              See pricing
            </Link>
          </p>
        </motion.div>
      </section>
    </PageShell>
  );
}
