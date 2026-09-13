// Copy for the MacDissect website. Mirrors what the macOS app actually ships.

export type Tint = "mint" | "sky" | "sun" | "coral" | "lilac";

export const tintClasses: Record<Tint, { soft: string; solid: string; ring: string }> = {
  mint: { soft: "bg-mint/15", solid: "bg-mint", ring: "group-hover:ring-mint/60" },
  sky: { soft: "bg-sky/15", solid: "bg-sky", ring: "group-hover:ring-sky/60" },
  sun: { soft: "bg-sun/20", solid: "bg-sun", ring: "group-hover:ring-sun/70" },
  coral: { soft: "bg-coral/15", solid: "bg-coral", ring: "group-hover:ring-coral/60" },
  lilac: { soft: "bg-lilac/15", solid: "bg-lilac", ring: "group-hover:ring-lilac/60" },
};

export const sections: {
  title: string;
  shortcut: string;
  body: string;
  tint: Tint;
  pro?: boolean;
  wide?: boolean;
}[] = [
  {
    title: "Explore",
    shortcut: "⌘2",
    body: "Switch between a treemap, a sunburst and a folder list. Click any block to drill in, press ⌘↑ to climb back out. Protected folders are flagged so you know when a size may be incomplete.",
    tint: "sky",
  },
  {
    title: "Overview",
    shortcut: "⌘1",
    body: "Free and used space, your largest items, and what changed since the previous scan.",
    tint: "mint",
  },
  {
    title: "Large Files",
    shortcut: "⌘3",
    body: "Every file above the size you pick, biggest first, with a combined total for your selection.",
    tint: "sun",
  },
  {
    title: "History",
    shortcut: "⌘4",
    body: "Every scan is saved as a summary on your Mac: a size-over-time chart and the folders that grew or shrank.",
    tint: "lilac",
    pro: true,
  },
  {
    title: "Smart Cleanup",
    shortcut: "⌘5",
    body: "Finds caches, build output, simulators and other known space hogs, then moves what you choose to the Trash.",
    tint: "coral",
    pro: true,
  },
  {
    title: "Trash",
    shortcut: "⌘6",
    body: "See how much the Trash holds and empty it in one click, across every disk.",
    tint: "mint",
  },
];

/** `exampleGb` values are illustrative, used only for the interactive demo. */
export const cleanupCategories: {
  name: string;
  detail: string;
  regenerable: boolean;
  exampleGb: number;
}[] = [
  {
    name: "Xcode Data",
    detail: "DerivedData, archives, device support",
    regenerable: true,
    exampleGb: 24.1,
  },
  {
    name: "iOS Simulators",
    detail: "Simulator devices and runtimes",
    regenerable: true,
    exampleGb: 18.6,
  },
  { name: "Docker", detail: "Docker Desktop disk image", regenerable: false, exampleGb: 16.0 },
  {
    name: "node_modules",
    detail: "Reinstall with npm, yarn or pnpm",
    regenerable: true,
    exampleGb: 9.4,
  },
  {
    name: "iOS Backups",
    detail: "Local iPhone and iPad backups",
    regenerable: false,
    exampleGb: 8.2,
  },
  {
    name: "Package Caches",
    detail: "npm, Homebrew, CocoaPods, pip, Cargo…",
    regenerable: true,
    exampleGb: 6.8,
  },
  {
    name: "Disk Images",
    detail: ".dmg, .iso, .ipsw installers",
    regenerable: false,
    exampleGb: 5.3,
  },
  {
    name: "App Caches",
    detail: "Caches apps recreate on their own",
    regenerable: true,
    exampleGb: 4.9,
  },
  {
    name: "Build Artifacts",
    detail: ".next, dist, target, build, Pods",
    regenerable: true,
    exampleGb: 3.7,
  },
  {
    name: "Android",
    detail: "System images, emulators, Gradle caches",
    regenerable: true,
    exampleGb: 3.1,
  },
  {
    name: "Large Media",
    detail: "Video, audio and images over 500 MB",
    regenerable: false,
    exampleGb: 2.9,
  },
  {
    name: "Virtual Machines",
    detail: "Parallels, UTM, VMware, VirtualBox",
    regenerable: false,
    exampleGb: 2.4,
  },
  { name: "Archives", detail: ".zip, .tar.gz, .7z", regenerable: false, exampleGb: 1.2 },
  { name: "Logs", detail: "Diagnostic and application logs", regenerable: true, exampleGb: 0.8 },
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

export type Faq = { q: string; a: string };

export const productFaqs: Faq[] = [
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
    q: "Which macOS versions are supported?",
    a: "macOS 14 Sonoma or later.",
  },
];

export const billingFaqs: Faq[] = [
  {
    q: "Is there a free trial?",
    a: "Yes. Download MacDissect and every Pro feature is unlocked for 7 days, no payment or account needed. After that, the free features keep working.",
  },
  {
    q: "What happens if my subscription ends?",
    a: "Pro features lock on your Macs, but the free features keep working: scanning folders, exploring, finding large files and emptying the Trash.",
  },
  {
    q: "How much does MacDissect Pro cost?",
    a: "$10 a year, billed yearly, plus any sales tax that applies where you live. That covers every Pro feature on up to 3 Macs.",
  },
  {
    q: "How many Macs can I use it on?",
    a: "One MacDissect Pro license activates on up to 3 Macs. Remove a Mac from your account page to free a slot.",
  },
  {
    q: "How do I get my license key?",
    a: "After checkout, sign in on this website with the same email address you paid with. Your account page shows your MACD-… key. Paste it into MacDissect's Settings to activate.",
  },
  {
    q: "Can I cancel?",
    a: "Yes, any time, through Dodo Payments using the link in your receipt email. When the subscription ends, Pro features lock on your Macs and the free features keep working.",
  },
  {
    q: "Who handles payment?",
    a: "Dodo Payments runs checkout as the merchant of record, so they handle your card details and sales tax. We never see your card number.",
  },
];
