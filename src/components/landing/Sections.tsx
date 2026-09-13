import { cleanupCategories, faqs, plans, sections, tintClasses } from "./content";

export function FeaturesSection() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-14">
      <h2 className="font-display text-[clamp(1.8rem,4vw,2.75rem)] font-extrabold tracking-tight">
        Six views. One very clear picture.
      </h2>
      <p className="mt-3 max-w-2xl text-lg text-ink/70">
        Scan your home folder, any folder you pick, or the whole Mac. Then jump between views from
        the sidebar or the keyboard.
      </p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((s) => {
          const tint = tintClasses[s.tint];
          return (
            <div key={s.title} className={`rounded-3xl border-2 p-6 ${tint.card}`}>
              <div className="flex items-center justify-between">
                <span
                  className={`grid h-11 min-w-11 place-items-center rounded-2xl px-2 font-display text-base font-extrabold text-ink ${tint.chip}`}
                >
                  {s.shortcut}
                </span>
                {s.pro && (
                  <span className="rounded-full bg-ink px-2.5 py-1 text-[11px] font-bold tracking-wide text-cream">
                    PRO
                  </span>
                )}
              </div>
              <h3 className="mt-4 font-display text-lg font-bold">{s.title}</h3>
              <p className="mt-1.5 text-sm text-ink/70">{s.body}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function CleanupSection() {
  return (
    <section id="cleanup" className="mx-auto max-w-6xl px-6 py-14">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <span className="inline-block rounded-full border-2 border-coral/40 bg-coral/20 px-4 py-1.5 text-xs font-semibold">
            Smart Cleanup
          </span>
          <h2 className="mt-5 font-display text-[clamp(1.8rem,4vw,2.75rem)] leading-tight font-extrabold tracking-tight">
            Knows where the gigabytes hide.
          </h2>
          <p className="mt-4 text-lg text-ink/70">
            MacDissect recognizes 14 kinds of reclaimable data, from Xcode DerivedData to forgotten
            node_modules. Each item is counted once, so the total you see is the space you get back.
          </p>
          <p className="mt-4 text-ink/70">
            <strong className="text-ink">Select Regenerable</strong> picks only data that rebuilds
            itself. Anything that holds your own data is flagged, so you review it first.
          </p>
        </div>
        <ul className="grid gap-2.5 sm:grid-cols-2 lg:col-span-7">
          {cleanupCategories.map((c) => (
            <li
              key={c.name}
              className="flex items-start justify-between gap-3 rounded-2xl border-2 border-ink/10 bg-cream px-4 py-3"
            >
              <div className="min-w-0">
                <p className="font-semibold">{c.name}</p>
                <p className="text-xs text-ink/60">{c.detail}</p>
              </div>
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-bold ${
                  c.regenerable ? "bg-mint/30" : "bg-sun/40"
                }`}
              >
                {c.regenerable ? "Rebuilds" : "Your data"}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function MonitorSection() {
  const items = [
    {
      title: "Free space in your menu bar",
      body: "Glance at what's left, start a scan, and see what changed since last time without opening the app.",
      tint: "bg-sky",
    },
    {
      title: "Low-space alerts",
      body: "Pick a warning level. When free space drops below it, a notification takes you straight to Smart Cleanup.",
      tint: "bg-sun",
    },
    {
      title: "Scans at login",
      body: "Open MacDissect at login and let it scan in the background, so History always has fresh data.",
      tint: "bg-lilac",
    },
  ];
  return (
    <section className="mx-auto max-w-6xl px-6 py-14">
      <h2 className="font-display text-[clamp(1.8rem,4vw,2.75rem)] font-extrabold tracking-tight">
        Catch a full disk before it happens
      </h2>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {items.map((i) => (
          <div key={i.title} className="rounded-3xl border-2 border-ink/10 bg-cream p-6">
            <span className={`block h-2 w-12 rounded-full ${i.tint}`}></span>
            <h3 className="mt-4 font-display text-lg font-bold">{i.title}</h3>
            <p className="mt-1.5 text-sm text-ink/70">{i.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function PrivacySection() {
  const points = [
    { text: "Scans and analysis run entirely on your Mac", tint: "bg-mint" },
    { text: "Items go to the Trash, so you can restore them", tint: "bg-sun" },
    { text: "macOS system files and essential folders are off-limits", tint: "bg-coral" },
    { text: "Finder is only asked to empty the Trash when you click it", tint: "bg-sky" },
  ];
  return (
    <section id="privacy" className="mx-auto max-w-6xl px-6 py-14">
      <div className="grid items-center gap-10 rounded-[2.5rem] bg-ink px-8 py-14 text-cream sm:px-14 md:grid-cols-2">
        <div>
          <span className="inline-block rounded-full border-2 border-lilac/50 bg-lilac/25 px-4 py-1.5 text-xs font-semibold text-cream">
            Private and safe
          </span>
          <h2 className="mt-5 font-display text-[clamp(1.9rem,4vw,3rem)] leading-tight font-extrabold">
            Your files never leave your Mac.
          </h2>
          <p className="mt-4 text-lg text-cream/70">
            No telemetry and no uploads. The only thing MacDissect sends over the network is your
            license key when it activates.
          </p>
        </div>
        <div className="space-y-3">
          {points.map((p) => (
            <div key={p.text} className="flex items-center gap-3 rounded-2xl bg-cream/10 px-5 py-4">
              <span
                className={`grid size-9 shrink-0 place-items-center rounded-xl font-bold text-ink ${p.tint}`}
              >
                ✓
              </span>
              <span className="font-semibold">{p.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PlansSection() {
  return (
    <section id="plans" className="mx-auto max-w-6xl px-6 py-14">
      <h2 className="font-display text-[clamp(1.8rem,4vw,2.75rem)] font-extrabold tracking-tight">
        Free to explore. Pro to clean up.
      </h2>
      <p className="mt-3 max-w-2xl text-lg text-ink/70">
        Every Pro feature is unlocked for your first 7 days. After that, the free features keep
        working.
      </p>
      <div className="mt-8 overflow-x-auto rounded-3xl border-2 border-ink/10 bg-cream">
        <table className="w-full min-w-[28rem] text-left text-sm">
          <thead>
            <tr className="border-b-2 border-ink/10">
              <th className="px-5 py-4 font-display text-base font-bold">Feature</th>
              <th className="w-24 px-5 py-4 text-center font-display text-base font-bold">Free</th>
              <th className="w-24 px-5 py-4 text-center font-display text-base font-bold">Pro</th>
            </tr>
          </thead>
          <tbody>
            {plans.map((p) => (
              <tr key={p.feature} className="border-b border-ink/5 last:border-0">
                <td className="px-5 py-3.5 font-medium">{p.feature}</td>
                <td className="px-5 py-3.5 text-center font-bold">
                  {p.free ? "✓" : <span className="text-ink/25">—</span>}
                </td>
                <td className="px-5 py-3.5 text-center font-bold text-mint">✓</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-6 py-14">
      <h2 className="font-display text-[clamp(1.8rem,4vw,2.75rem)] font-extrabold tracking-tight">
        Questions
      </h2>
      <div className="mt-6 space-y-3">
        {faqs.map((f) => (
          <details
            key={f.q}
            className="group rounded-2xl border-2 border-ink/10 bg-cream px-5 py-4 open:bg-cream"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
              {f.q}
              <span className="text-xl leading-none text-ink/40 transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 text-ink/70">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
