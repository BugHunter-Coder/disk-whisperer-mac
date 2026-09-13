import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
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
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/account` },
        });
        if (error) throw error;
        toast.success("Account created.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      await navigate({ to: "/account" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-paper px-6 font-sans text-ink">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-xl bg-ink font-display text-lg font-extrabold text-cream">
            M
          </span>
          <span className="font-display text-2xl font-extrabold tracking-tight">MacDissect</span>
        </Link>

        <form
          onSubmit={submit}
          className="mt-8 rounded-3xl border-2 border-ink/10 bg-cream p-7 shadow-[6px_6px_0_0_#191925]"
        >
          <h1 className="font-display text-2xl font-extrabold">
            {mode === "signin" ? "Sign in to your license" : "Create your account"}
          </h1>
          <p className="mt-2 text-sm text-ink/60">
            Use the same email address you used at checkout.
          </p>

          <label className="mt-6 block text-xs font-bold tracking-wide text-ink/60 uppercase">
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full rounded-xl border-2 border-ink/15 bg-paper px-4 py-3 text-sm font-medium normal-case outline-none focus:border-mint"
            />
          </label>
          <label className="mt-3 block text-xs font-bold tracking-wide text-ink/60 uppercase">
            Password
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-xl border-2 border-ink/15 bg-paper px-4 py-3 text-sm font-medium normal-case outline-none focus:border-mint"
            />
          </label>

          <button
            type="submit"
            disabled={busy}
            className="mt-6 w-full rounded-2xl bg-ink px-6 py-3.5 text-base font-bold text-cream shadow-[4px_4px_0_0_#A78BFA] transition-transform hover:-translate-y-0.5 disabled:opacity-50"
          >
            {busy ? "One moment…" : mode === "signin" ? "Sign in" : "Create account"}
          </button>

          <button
            type="button"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="mt-4 w-full text-center text-sm font-semibold text-ink/60 hover:text-ink"
          >
            {mode === "signin"
              ? "New here? Create an account"
              : "Already have an account? Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
