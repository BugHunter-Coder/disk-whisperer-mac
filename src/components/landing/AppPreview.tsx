// Illustrative mock of the MacDissect window: sidebar plus a treemap of a home folder.

const sidebar = ["Overview", "Explore", "Large Files", "History", "Smart Cleanup", "Trash"];

const blocks: { name: string; size: string; className: string; style: React.CSSProperties }[] = [
  {
    name: "Library",
    size: "142 GB",
    className: "bg-sky",
    style: { gridColumn: "1 / 4", gridRow: "1 / 4" },
  },
  {
    name: "Movies",
    size: "96 GB",
    className: "bg-coral",
    style: { gridColumn: "4 / 7", gridRow: "1 / 3" },
  },
  {
    name: "Developer",
    size: "61 GB",
    className: "bg-sun",
    style: { gridColumn: "4 / 6", gridRow: "3 / 5" },
  },
  {
    name: "Downloads",
    size: "38 GB",
    className: "bg-mint",
    style: { gridColumn: "1 / 3", gridRow: "4 / 5" },
  },
  {
    name: "Music",
    size: "17 GB",
    className: "bg-lilac",
    style: { gridColumn: "3 / 4", gridRow: "4 / 5" },
  },
  {
    name: "…",
    size: "",
    className: "bg-ink/15",
    style: { gridColumn: "6 / 7", gridRow: "3 / 5" },
  },
];

export function AppPreview() {
  return (
    <div className="relative">
      <div className="absolute -top-3 -left-3 size-16 -rotate-6 rounded-2xl bg-sky/30"></div>
      <div className="absolute -right-3 -bottom-4 size-20 rotate-12 rounded-full bg-coral/25"></div>
      <div className="relative overflow-hidden rounded-[2rem] border-2 border-ink/10 bg-cream shadow-[10px_10px_0_0_#191925]">
        <div className="flex items-center gap-2 border-b-2 border-ink/10 px-5 py-3.5">
          <span className="size-3 rounded-full bg-coral"></span>
          <span className="size-3 rounded-full bg-sun"></span>
          <span className="size-3 rounded-full bg-mint"></span>
          <span className="ml-3 truncate text-xs font-semibold text-ink/40">
            MacDissect — Explore · Home
          </span>
        </div>
        <div className="flex">
          <ul className="hidden w-32 shrink-0 space-y-1 border-r-2 border-ink/10 p-3 text-xs font-semibold sm:block">
            {sidebar.map((item) => (
              <li
                key={item}
                className={`rounded-lg px-2.5 py-1.5 ${
                  item === "Explore" ? "bg-ink text-cream" : "text-ink/60"
                }`}
              >
                {item}
              </li>
            ))}
          </ul>
          <div className="min-w-0 flex-1 p-4">
            <div className="mb-3 flex items-end justify-between gap-3">
              <span className="font-display text-base font-bold">Home</span>
              <span className="rounded-full bg-paper px-2.5 py-1 text-[11px] font-semibold text-ink/60">
                Treemap · Sunburst · List
              </span>
            </div>
            <div
              className="grid h-56 gap-1 sm:h-64"
              style={{ gridTemplateColumns: "repeat(6, 1fr)", gridTemplateRows: "repeat(4, 1fr)" }}
            >
              {blocks.map((b) => (
                <div
                  key={b.name}
                  className={`flex flex-col justify-end overflow-hidden rounded-xl p-2 text-ink ${b.className}`}
                  style={b.style}
                >
                  <span className="truncate text-xs font-bold">{b.name}</span>
                  {b.size && <span className="text-[11px] font-semibold opacity-70">{b.size}</span>}
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between rounded-xl bg-mint/20 px-3 py-2 text-xs font-semibold">
              <span>354 GB in 1.2 million files</span>
              <span className="text-ink/60">128 GB free</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
