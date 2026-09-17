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
  {
    title: "Live Stats",
    shortcut: "⌘7",
    body: "CPU, memory, battery, network and disk activity as it happens, plus the apps working your Mac hardest.",
    tint: "sky",
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
  { feature: "Visualize disk usage: treemap, sunburst and list views", free: true },
  { feature: "Power search across everything you scanned", free: true },
  { feature: "Find large files", free: true },
  { feature: "Live stats: CPU, memory and battery", free: true },
  { feature: "Overview of used and free space", free: true },
  { feature: "See Trash size and empty it in one click", free: true },
  { feature: "Scan your full Mac (entire startup disk)", free: false },
  { feature: "Scan any folder or external drive", free: false },
  { feature: "Smart Cleanup and Move to Trash", free: false },
  { feature: "History and growth tracking", free: false },
  { feature: "Menu bar monitor, low-space alerts, scan at login", free: false },
];

export type Faq = { q: string; a: string };

export const productFaqs: Faq[] = [
  {
    q: "Does MacDissect upload anything about my files?",
    a: "No. Scanning and analysis happen entirely on your Mac. The only network request is license activation, which is re-checked about once a day and never includes file names or sizes.",
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
    a: "No trial is needed to try MacDissect: the free version is free forever and scans and visualizes your home folder, with search, large files, live stats and Trash. Pro features unlock with a one-time $10 lifetime license.",
  },
  {
    q: "Is Pro really a one-time payment?",
    a: "Yes. You pay once and your license key works for life. There is no subscription and nothing to renew or cancel.",
  },
  {
    q: "How does the launch offer work?",
    a: "The first 50 people to claim MacDissect Pro get a lifetime license for free: go through checkout on the pricing page and the price is $0. Once all 50 are claimed, Pro is a one-time $10. One free license per email address.",
  },
  {
    q: "How much does MacDissect Pro cost?",
    a: "$10 once, plus any sales tax that applies where you live, for a lifetime license covering every Pro feature on one Mac. The first 50 licenses are free.",
  },
  {
    q: "How many Macs can I use it on?",
    a: "One MacDissect Pro license works on one Mac. Moving to a new Mac? On the old Mac, open MacDissect → Settings → License and click Deactivate This Mac, then activate the key on the new Mac. Your account page shows which Mac the key is on.",
  },
  {
    q: "How do I get my license key?",
    a: "After checkout, sign in on this website with the same email address you paid with. Your account page shows your MACD-… key. Paste it into MacDissect's Settings to activate.",
  },
  {
    q: "I had a yearly subscription. What happens now?",
    a: "Your existing license key now works for life. You won't lose Pro, and you can cancel the old subscription through the link in your Dodo Payments receipt email so it isn't charged again.",
  },
  {
    q: "Can I get a refund?",
    a: "Reply to your Dodo Payments receipt email to ask. A refunded license stops working on your Mac, and the free features keep working.",
  },
  {
    q: "Who handles payment?",
    a: "Dodo Payments runs checkout as the merchant of record, so they handle your card details and sales tax. We never see your card number.",
  },
];
