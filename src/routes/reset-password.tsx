import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { motion } from "motion/react";
import { KeyRound, Loader2 } from "lucide-react";
import { PageShell } from "@/components/site/SiteFooter";
import { supabase } from "@/integrations/supabase/client";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/reset-password")({
  head: () =>
    pageHead({
      path: "/reset-password",
      title: "Reset password – MacDissect Pro",
      description: "Reset the password for your MacDissect Pro account.",
      noindex: true,
    }),
  component: ResetPasswordPage,
});

function errorMessage(err: unknown): string {
  return err instanceof Error ? err.message : "Something went wrong.";
}

function ResetPasswordPage() {
  const navigate = useNavigate();
  // Supabase turns the emailed link into a session before this mounts; "checking" avoids a
  // flash of the wrong form while we find out which one that session makes us show.
  const [mode, setMode] = useState<"checking" | "request" | "update">("checking");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    void supabase.auth.getSession().then(({ data }) => {
      if (active) setMode(data.session ? "update" : "request");
    });
    const { data: subscription } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setMode("update");
    });
    return () => {
      active = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  const requestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      toast.success("Check your inbox", {
        description: `We sent a password reset link to ${email}.`,
      });
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  const updatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      toast.success("Password updated.");
      await navigate({ to: "/account" });
    } catch (err) {
      toast.error(errorMessage(err));
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
          {mode === "checking" ? (
            <div className="grid place-items-center rounded-[2rem] border border-ink/10 bg-cream/90 p-8 shadow-[0_30px_60px_-30px_rgba(25,25,37,0.35)] backdrop-blur">
              <Loader2 className="size-5 animate-spin text-ink/50" />
            </div>
          ) : (
            <form
              onSubmit={mode === "update" ? updatePassword : requestReset}
              className="rounded-[2rem] border border-ink/10 bg-cream/90 p-8 shadow-[0_30px_60px_-30px_rgba(25,25,37,0.35)] backdrop-blur"
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-ink text-cream">
                <KeyRound className="size-5" />
              </span>
              <h1 className="mt-5 font-display text-3xl font-extrabold tracking-tight">
                {mode === "update" ? "Set a new password" : "Reset your password"}
              </h1>
              <p className="mt-2 text-sm text-ink/60">
                {mode === "update"
                  ? "Choose a new password for your account."
                  : "We'll email you a link to reset it."}
              </p>

              {mode === "update" ? (
                <label className="mt-6 block text-xs font-bold tracking-wide text-ink/60 uppercase">
                  New password
                  <input
                    type="password"
                    required
                    minLength={6}
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-ink/15 bg-paper px-4 py-3 text-sm font-medium normal-case transition-colors outline-none focus:border-ink/40 focus:bg-cream"
                  />
                </label>
              ) : (
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
              )}

              <motion.button
                type="submit"
                disabled={busy}
                whileHover={busy ? {} : { y: -2 }}
                whileTap={busy ? {} : { scale: 0.98 }}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-ink px-6 py-3.5 text-base font-bold text-cream shadow-[4px_4px_0_0_#A78BFA] disabled:opacity-50"
              >
                {busy && <Loader2 className="size-4 animate-spin" />}
                {busy ? "One moment…" : mode === "update" ? "Update password" : "Send reset link"}
              </motion.button>
            </form>
          )}
          <p className="mt-5 text-center text-sm text-ink/55">
            <Link to="/auth" className="font-semibold text-ink underline underline-offset-4">
              Back to sign in
            </Link>
          </p>
        </motion.div>
      </section>
    </PageShell>
  );
}
