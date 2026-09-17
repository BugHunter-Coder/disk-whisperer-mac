// "MacDissect vs X" pages for people searching for alternatives to other Mac disk tools.
// Keep claims about other apps general and verifiable; details on their sites can change.

export type Comparison = {
  slug: string;
  name: string;
  maker: string;
  website: string;
  metaTitle: string;
  description: string;
  /** One-paragraph summary of the other app, neutral in tone. */
  summary: string;
  /** How the other app is priced, in general terms. */
  pricing: string;
  chooseThem: string[];
  chooseUs: string[];
};

export const COMPARE_UPDATED = "2026-09-17";

/** What MacDissect offers, shown on every comparison page. */
export const macdissectFacts: { label: string; value: string }[] = [
  { label: "Price", value: "Free forever for home-folder scans; Pro is a one-time $10, for life" },
  { label: "Views", value: "Treemap, sunburst and folder list" },
  { label: "Cleanup", value: "Smart Cleanup with 14 categories, items go to the Trash" },
  { label: "Developer data", value: "Xcode, simulators, Docker, node_modules, build output" },
  { label: "History", value: "Size-over-time chart and folders that grew or shrank" },
  { label: "Live stats", value: "CPU, memory, battery, network and disk activity" },
  { label: "Privacy", value: "Scans stay on your Mac, no telemetry" },
  { label: "Requires", value: "macOS 14 Sonoma or later, Apple silicon and Intel" },
];

export const comparisons: Comparison[] = [
  {
    slug: "daisydisk-alternative",
    name: "DaisyDisk",
    maker: "Software Ambience",
    website: "https://daisydiskapp.com",
    metaTitle: "MacDissect vs DaisyDisk: A DaisyDisk Alternative for Mac – MacDissect",
    description:
      "Looking for a DaisyDisk alternative? Compare MacDissect and DaisyDisk: visual disk maps, cleanup of developer data, disk history, live stats and pricing.",
    summary:
      "DaisyDisk is a long-established, polished disk analyzer known for its ring-shaped disk map. It's a paid app you buy once, available from its website and the Mac App Store.",
    pricing: "Paid, one-time purchase",
    chooseThem: [
      "You're already used to its ring-shaped disk map.",
      "You only need to find and remove big folders occasionally.",
    ],
    chooseUs: [
      "You want to explore your home folder for free, with no time limit.",
      "You're a developer: Smart Cleanup recognizes Xcode data, simulators, Docker, node_modules and package caches.",
      "You want History to show which folders grew since your last scan.",
      "You'd like low-space alerts and free space in the menu bar.",
    ],
  },
  {
    slug: "grandperspective-alternative",
    name: "GrandPerspective",
    maker: "an open-source project",
    website: "https://grandperspectiv.sourceforge.net",
    metaTitle: "MacDissect vs GrandPerspective: A Modern GrandPerspective Alternative – MacDissect",
    description:
      "Compare MacDissect with GrandPerspective. Both draw your Mac's disk as a treemap; MacDissect adds a sunburst, Smart Cleanup, history and live stats.",
    summary:
      "GrandPerspective is a free, open-source utility that draws your disk as a treemap, where each file is a rectangle sized by how much space it uses. It focuses on visualization.",
    pricing: "Free and open source (a paid Mac App Store version supports development)",
    chooseThem: [
      "You want a free, open-source tool for the whole disk.",
      "A treemap is all you need.",
    ],
    chooseUs: [
      "You want treemap, sunburst and list views of the same scan.",
      "You want guided cleanup that tells regenerable caches apart from your own data.",
      "You want a Large Files list, History and live system stats in one native app.",
    ],
  },
  {
    slug: "omnidisksweeper-alternative",
    name: "OmniDiskSweeper",
    maker: "The Omni Group",
    website: "https://www.omnigroup.com/more",
    metaTitle: "MacDissect vs OmniDiskSweeper: An OmniDiskSweeper Alternative – MacDissect",
    description:
      "Compare MacDissect with OmniDiskSweeper. Go beyond a size-sorted file list with treemaps, Smart Cleanup for developer data, history and alerts.",
    summary:
      "OmniDiskSweeper is a free utility from The Omni Group that lists folders and files sorted by size, in a column browser. It's simple and quick for finding big items.",
    pricing: "Free",
    chooseThem: [
      "You want a free, no-frills list of folders sorted by size.",
      "You're comfortable judging on your own what's safe to delete.",
    ],
    chooseUs: [
      "You'd rather see your disk as a treemap or sunburst than a list.",
      "You want Smart Cleanup to recognize caches, build output and simulators for you.",
      "You want items moved to the Trash so mistakes can be undone.",
    ],
  },
  {
    slug: "cleanmymac-alternative",
    name: "CleanMyMac",
    maker: "MacPaw",
    website: "https://macpaw.com/cleanmymac",
    metaTitle: "MacDissect vs CleanMyMac: A Focused CleanMyMac Alternative – MacDissect",
    description:
      "Compare MacDissect with CleanMyMac. If you mainly need to see what fills your disk and clean it safely, MacDissect is a focused, private and affordable option.",
    summary:
      "CleanMyMac by MacPaw is an all-in-one Mac maintenance suite: cleanup, app uninstalling, malware scanning, performance tools and more. It's sold as a subscription.",
    pricing: "Subscription",
    chooseThem: [
      "You want many maintenance tools in one app, not just disk space.",
      "You want malware scanning and an app uninstaller.",
    ],
    chooseUs: [
      "Disk space is the problem you want solved, with a clear map of every folder.",
      "You want a free tier that never expires, and Pro as a one-time $10 instead of a subscription.",
      "You want scans that stay on your Mac with no telemetry.",
      "You're a developer with Xcode, Docker and node_modules eating your disk.",
    ],
  },
];

export const findComparison = (slug: string) => comparisons.find((c) => c.slug === slug);
