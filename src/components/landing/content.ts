// Copy for the MacDissect landing page. Mirrors what the macOS app actually ships.

export type Tint = "mint" | "sky" | "sun" | "coral" | "lilac";

export const tintClasses: Record<Tint, { card: string; chip: string; dot: string }> = {
  mint: { card: "border-mint/40 bg-mint/20", chip: "bg-mint", dot: "bg-mint" },
  sky: { card: "border-sky/40 bg-sky/20", chip: "bg-sky", dot: "bg-sky" },
  sun: { card: "border-sun/50 bg-sun/25", chip: "bg-sun", dot: "bg-sun" },
  coral: { card: "border-coral/40 bg-coral/20", chip: "bg-coral", dot: "bg-coral" },
  lilac: { card: "border-lilac/40 bg-lilac/20", chip: "bg-lilac", dot: "bg-lilac" },
};

export const sections: {
  title: string;
  shortcut: string;
  body: string;
  tint: Tint;
  pro?: boolean;
}[] = [
  {
    title: "Overview",
    shortcut: "⌘1",
    body: "Free and used space on your startup disk, the largest items in your last scan, and what changed since the scan before it.",
    tint: "mint",
  },
  {
    title: "Explore",
    shortcut: "⌘2",
    body: "Switch between a treemap, a sunburst and a folder list. Click any block to drill in, press ⌘↑ to climb back out.",
    tint: "sky",
  },
  {
    title: "Large Files",
    shortcut: "⌘3",
    body: "Every file above the size you pick, biggest first. Select several to see their combined size at a glance.",
    tint: "sun",
  },
  {
    title: "History",
    shortcut: "⌘4",
    body: "Each scan is saved as a summary on your Mac. See a size-over-time chart and which folders grew or shrank.",
    tint: "lilac",
    pro: true,
  },
  {
    title: "Smart Cleanup",
    shortcut: "⌘5",
    body: "Finds caches, build output, simulators and other known space hogs, then moves what you select to the Trash.",
    tint: "coral",
    pro: true,
  },
  {
    title: "Trash",
    shortcut: "⌘6",
    body: "See how much the Trash is holding and empty it in one click, across every disk.",
    tint: "mint",
  },
];

export const cleanupCategories: { name: string; detail: string; regenerable: boolean }[] = [
  { name: "Xcode Data", detail: "DerivedData, archives, device support", regenerable: true },
  { name: "iOS Simulators", detail: "Simulator devices and runtimes", regenerable: true },
  { name: "Android", detail: "System images, emulators, Gradle caches", regenerable: true },
  { name: "node_modules", detail: "Reinstall with npm, yarn or pnpm", regenerable: true },
  { name: "Package Caches", detail: "npm, Homebrew, CocoaPods, pip, Cargo…", regenerable: true },
  { name: "Build Artifacts", detail: ".next, dist, target, build, Pods", regenerable: true },
  { name: "App Caches", detail: "Caches apps recreate on their own", regenerable: true },
  { name: "Logs", detail: "Diagnostic and application logs", regenerable: true },
  { name: "Docker", detail: "Docker Desktop disk image", regenerable: false },
  { name: "iOS Backups", detail: "Local iPhone and iPad backups", regenerable: false },
  { name: "Virtual Machines", detail: "Parallels, UTM, VMware, VirtualBox", regenerable: false },
  { name: "Disk Images", detail: ".dmg, .iso, .ipsw installers", regenerable: false },
  { name: "Archives", detail: ".zip, .tar.gz, .7z", regenerable: false },
  { name: "Large Media", detail: "Video, audio and images over 500 MB", regenerable: false },
];

export const plans: { feature: string; free: boolean }[] = [
  { feature: "Scan your home folder or any folder you choose", free: true },
  { feature: "Treemap, sunburst and list views with drill-down", free: true },
  { feature: "Large file finder and search", free: true },
  { feature: "See Trash size and empty it in one click", free: true },
  { feature: "Scan your full Mac (entire startup disk)", free: false },
  { feature: "Smart Cleanup and Move to Trash", free: false },
  { feature: "History and growth tracking", free: false },
  { feature: "Menu bar monitor, low-space alerts, scan at login", free: false },
];

export const faqs: { q: string; a: string }[] = [
  {
    q: "Does MacDissect upload anything about my files?",
    a: "No. Scanning and analysis happen entirely on your Mac. The only network request is license activation, which is re-checked every few days and never includes file names or sizes.",
  },
  {
    q: "Can it delete something important?",
    a: "MacDissect moves items to the Trash rather than deleting them, so you can restore anything until you empty it. It refuses to touch macOS system locations and essential folders like /Applications, ~/Library or ~/Documents themselves.",
  },
  {
    q: "Why do some folders show a lock?",
    a: "macOS protects some locations. MacDissect tells you when a folder couldn't be read so you know a size may be incomplete. Granting Full Disk Access in System Settings lets it see everything, including inside the Trash.",
  },
  {
    q: "What happens after the 7-day trial?",
    a: "Pro features lock, but the free features keep working: scanning folders, exploring, finding large files and emptying the Trash.",
  },
  {
    q: "How many Macs can I use it on?",
    a: "One MacDissect Pro license activates on up to 3 Macs. Remove a Mac from your account page to free a slot.",
  },
  {
    q: "Which macOS versions are supported?",
    a: "macOS 14 Sonoma or later.",
  },
];
