// How-to guides that answer the disk-space questions people search for.
// Each guide works without MacDissect and shows where the app saves time.

export type GuideSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  /** Terminal commands, shown in a code block. */
  code?: string;
};

export type Guide = {
  slug: string;
  /** Page <title>, written for search results. */
  metaTitle: string;
  title: string;
  description: string;
  intro: string;
  sections: GuideSection[];
  /** Short pitch for the call-to-action box at the end of the guide. */
  cta: string;
};

export const GUIDES_UPDATED = "2026-09-18";

export const guides: Guide[] = [
  {
    slug: "free-up-disk-space-on-mac",
    metaTitle: "How to Free Up Disk Space on a Mac (2026 Guide) – MacDissect",
    title: "How to free up disk space on a Mac",
    description:
      "A step-by-step guide to finding what's filling your Mac's disk and safely reclaiming space: large files, caches, iOS backups, developer data and the Trash.",
    intro:
      "When macOS warns that your disk is almost full, the fastest fix is to find the few folders that hold most of the space, instead of deleting small files at random. This guide walks through where space usually goes and how to get it back safely.",
    sections: [
      {
        heading: "1. See what's actually using the space",
        paragraphs: [
          'Open Apple menu → System Settings → General → Storage for a rough breakdown. The categories are broad, and a large share is often labelled "System Data" with no way to drill in.',
          "A disk space analyzer shows every folder sized by what it holds, so the biggest items stand out right away. MacDissect draws your home folder as a treemap or sunburst for free, and you can click any block to drill in.",
        ],
      },
      {
        heading: "2. Find and remove large files",
        paragraphs: [
          "Old videos, disk images (.dmg, .iso), zip archives and virtual machines are the usual suspects. In Finder, press ⌘F, set Kind to Other → File Size, and search for files larger than 1 GB.",
        ],
        bullets: [
          "Check ~/Downloads first: installers pile up there.",
          "Move media you want to keep to an external drive or cloud storage.",
          "Delete .dmg installers once the app is in Applications.",
        ],
      },
      {
        heading: "3. Clear caches that rebuild themselves",
        paragraphs: [
          "Apps store caches in ~/Library/Caches. They are safe to remove because apps recreate them, but quit the app first. Clearing caches frees space only until the apps rebuild them, so treat it as a one-off boost rather than a permanent fix.",
        ],
      },
      {
        heading: "4. Remove old iPhone and iPad backups",
        paragraphs: [
          "Local device backups can take tens of gigabytes each. In Finder, select your iPhone in the sidebar, click Manage Backups, and delete backups you no longer need. Keep at least one recent backup of any device you still use.",
        ],
      },
      {
        heading: "5. Clean up developer data",
        paragraphs: [
          "If you write code, developer tools are often the single biggest consumer of disk space: Xcode DerivedData and simulators, node_modules folders, Docker images, and package manager caches.",
        ],
        bullets: [
          "Xcode: see our guide to clearing DerivedData and simulators.",
          "JavaScript: old projects' node_modules folders can be deleted and reinstalled.",
          "Docker: the Docker Desktop disk image grows and doesn't shrink on its own.",
        ],
      },
      {
        heading: "6. Empty the Trash",
        paragraphs: [
          "Deleted files keep using space until the Trash is emptied, and each external drive has its own hidden Trash. Right-click the Trash in the Dock and choose Empty Trash.",
        ],
      },
    ],
    cta: "MacDissect shows your whole disk as a treemap, lists every large file, and its Smart Cleanup finds 14 kinds of reclaimable data, moving what you pick to the Trash so nothing is lost by mistake.",
  },
  {
    slug: "best-disk-space-analyzer-mac",
    metaTitle: "Best Disk Space Analyzers for Mac in 2026 (Free & Paid) – MacDissect",
    title: "The best disk space analyzers for Mac in 2026",
    description:
      "A plain comparison of Mac disk space analyzers: MacDissect, DaisyDisk, GrandPerspective, OmniDiskSweeper and CleanMyMac. What each does well, and which to pick.",
    intro:
      "A disk space analyzer scans your drive and shows which folders are taking up space, so you can clean up in minutes instead of guessing. Here's how the most popular Mac options differ, including where our own app, MacDissect, fits and where another tool may suit you better.",
    sections: [
      {
        heading: "What to look for",
        bullets: [
          "A visual map (treemap or sunburst) so the biggest folders stand out at a glance.",
          "Fast scans that include hidden folders like ~/Library.",
          "Safe deletion: items go to the Trash, not straight to permanent removal.",
          "Help telling apart regenerable caches from files that are yours.",
          "Fair pricing: a free tier or a one-time price instead of a subscription.",
          "Privacy: scan results that never leave your Mac.",
        ],
      },
      {
        heading: "MacDissect: best for developers and a free home-folder scan",
        paragraphs: [
          "MacDissect is a native SwiftUI app that maps your disk as a treemap, sunburst or sorted list. Scanning and exploring your home folder is free with no time limit. Pro, a one-time $10 license, adds full-disk and external-drive scans, Smart Cleanup, History and low-space alerts.",
          "Smart Cleanup recognizes 14 kinds of reclaimable data, including Xcode DerivedData, iOS simulators, Docker, node_modules, build output and package caches. It marks what rebuilds itself and moves only what you select to the Trash. History shows which folders grew since your last scan, and Live Stats shows CPU, memory, network and disk activity. It needs macOS 14 Sonoma or later.",
        ],
      },
      {
        heading: "DaisyDisk: a polished, paid classic",
        paragraphs: [
          "DaisyDisk is a well-established analyzer known for its ring-shaped disk map. It's a one-time purchase. It's a good fit if you only need to find and delete big folders now and then and don't need developer-specific cleanup.",
        ],
      },
      {
        heading: "GrandPerspective: free and open source",
        paragraphs: [
          "GrandPerspective draws your disk as a treemap and nothing more. It's free and open source (a paid App Store version supports the project). Choose it if you want a no-cost treemap of the whole disk and are comfortable deciding what to delete yourself.",
        ],
      },
      {
        heading: "OmniDiskSweeper: a free, sorted list",
        paragraphs: [
          "OmniDiskSweeper from The Omni Group lists folders sorted by size in a column browser. It's free and quick, but there's no visual map and no guidance on what's safe to remove.",
        ],
      },
      {
        heading: "CleanMyMac: an all-in-one suite",
        paragraphs: [
          "CleanMyMac by MacPaw bundles cleanup, an app uninstaller, malware scanning and performance tools, sold as a subscription. It's worth it if you want all of those tools; if disk space is the only problem, a focused analyzer costs less.",
        ],
      },
      {
        heading: "Which one should you choose?",
        bullets: [
          "Want free and just need to see what's big in your home folder: MacDissect (free tier) or GrandPerspective.",
          "Write code and fight Xcode, Docker or node_modules bloat: MacDissect Pro.",
          "Prefer a simple list over a map: OmniDiskSweeper.",
          "Want a full maintenance suite: CleanMyMac.",
        ],
      },
    ],
    cta: "Try MacDissect free: download it, scan your home folder, and see what's filling your Mac in under a minute. Upgrade to Pro once, for $10, only if you need it.",
  },
  {
    slug: "see-folder-sizes-mac",
    metaTitle: "How to See Folder Sizes on Mac (Finder, Terminal & Apps) – MacDissect",
    title: "How to see folder sizes on a Mac",
    description:
      "Finder doesn't show folder sizes by default. Here are four ways to see how big every folder is on your Mac: Finder settings, Get Info, Terminal and a disk analyzer.",
    intro:
      'In Finder\'s list view, folders show "--" in the Size column. That\'s because calculating folder sizes takes time, so macOS skips it unless you ask. Here\'s how to turn it on, and faster ways to see sizes across your whole Mac.',
    sections: [
      {
        heading: "1. Turn on \"Calculate all sizes\" in Finder",
        paragraphs: [
          "Open a Finder window, switch to list view (⌘2), then press ⌘J to open View Options. Tick \"Calculate all sizes\". Click \"Use as Defaults\" to apply it to every folder. Sizes can take a moment to appear in large folders.",
        ],
      },
      {
        heading: "2. Use Get Info for a single folder",
        paragraphs: [
          "Select a folder and press ⌘I. The Info window shows its total size and item count. Select several folders and press ⌃⌘I to see their combined size in one window.",
        ],
      },
      {
        heading: "3. Use Terminal for a sorted list",
        paragraphs: [
          "The du command lists folder sizes. This shows every item in your home folder, smallest to largest:",
        ],
        code: "cd ~\ndu -sh * .[^.]* 2>/dev/null | sort -h",
      },
      {
        heading: "4. Use a disk space analyzer for the whole picture",
        paragraphs: [
          "Finder and du show one level at a time. A disk analyzer scans everything once and lets you drill down through nested folders instantly, including hidden ones like ~/Library that Finder hides.",
        ],
      },
    ],
    cta: "MacDissect sizes every folder in your home folder for free and draws them as a treemap or sunburst, so you can click straight to what's big instead of opening folders one by one.",
  },
  {
    slug: "find-large-files-mac",
    metaTitle: "How to Find Large Files on Mac (4 Quick Ways) – MacDissect",
    title: "How to find large files on a Mac",
    description:
      "Find the biggest files on your Mac with Storage settings, Finder search, Terminal or a disk analyzer, and learn which large files are safe to delete.",
    intro:
      "A handful of big files, such as videos, disk images, archives and virtual machines, often account for a large share of a full disk. Here are four ways to find them, from built-in tools to Terminal.",
    sections: [
      {
        heading: "1. Storage settings: Review Files",
        paragraphs: [
          "Open System Settings → General → Storage and click the ⓘ button next to Documents. The Large Files tab lists your biggest files, and you can delete them from there.",
        ],
      },
      {
        heading: "2. Finder search by file size",
        paragraphs: [
          "Press ⌘F in Finder and choose \"This Mac\". Click the Kind menu, choose Other…, tick File Size, then set it to \"is greater than\" 1 GB. Switch to list view and sort by Size.",
        ],
      },
      {
        heading: "3. Terminal",
        paragraphs: ["List files over 1 GB in your home folder, sorted by size:"],
        code: "find ~ -type f -size +1G -exec du -h {} + 2>/dev/null | sort -h",
      },
      {
        heading: "4. A disk analyzer's large files list",
        paragraphs: [
          "Analyzers rank every file by size across the scanned folder and let you reveal it in Finder or move it to the Trash in one step.",
        ],
      },
      {
        heading: "Which large files are usually safe to delete",
        bullets: [
          ".dmg and .pkg installers for apps you've already installed",
          "Zip archives you've already extracted",
          "Screen recordings and exported videos you've uploaded elsewhere",
          "Virtual machines and Docker images you no longer use",
          "Old iPhone and iPad backups (keep at least one recent backup)",
        ],
      },
    ],
    cta: "MacDissect's free Large Files view ranks every file in your home folder by size, with search and Quick Look, and removes files by moving them to the Trash.",
  },
  {
    slug: "mac-disk-almost-full",
    metaTitle: '"Your Disk Is Almost Full" on Mac: How to Fix It Fast – MacDissect',
    title: '"Your disk is almost full" on Mac: how to fix it fast',
    description:
      "Seeing the \"Your disk is almost full\" warning? Free up space quickly and safely, find out what filled your disk, and stop the warning from coming back.",
    intro:
      "macOS needs free space for updates, virtual memory and temporary files. When it runs low, apps slow down, updates fail and you see the warning. Here's the fastest safe order to get space back, then how to keep it from happening again.",
    sections: [
      {
        heading: "Quick wins (5 minutes)",
        bullets: [
          "Empty the Trash, including on external drives.",
          "Delete .dmg installers and old downloads in ~/Downloads.",
          "Delete old iPhone and iPad backups in Finder → your device → Manage Backups.",
          "In System Settings → General → Storage, turn on \"Empty Trash Automatically\".",
        ],
      },
      {
        heading: "Find what actually filled the disk",
        paragraphs: [
          "If the quick wins don't free enough, something large is hiding. Use a disk analyzer or Terminal to find the biggest folders instead of guessing. The usual culprits are video files, \"System Data\" (caches, local Time Machine snapshots, VMs) and developer data such as Xcode, Docker and node_modules.",
        ],
        code: "du -sh ~/* ~/Library/* 2>/dev/null | sort -h | tail -20",
      },
      {
        heading: "Clear space that rebuilds itself",
        paragraphs: [
          "Caches in ~/Library/Caches, Xcode DerivedData and package manager caches are recreated when needed, so deleting them is safe. Quit the related apps first.",
        ],
      },
      {
        heading: "Keep it from coming back",
        bullets: [
          "Aim to keep at least 10–15% of your disk free.",
          "Turn on \"Optimize Storage\" for Apple TV and Mail in Storage settings.",
          "Scan every month or two and compare what grew since last time.",
          "Get a warning before space runs out, not after.",
        ],
      },
    ],
    cta: "MacDissect finds what's filling your disk in seconds. Pro adds History to show which folders grew since your last scan, plus low-space alerts and free space in the menu bar, for a one-time $10.",
  },
  {
    slug: "clear-xcode-derived-data",
    metaTitle: "How to Clear Xcode DerivedData, Archives & Simulators on Mac – MacDissect",
    title: "How to clear Xcode DerivedData, archives and simulators",
    description:
      "Xcode can quietly use 50 GB or more. Learn what DerivedData, Archives, device support files and simulators are, and how to delete them safely.",
    intro:
      "Xcode keeps build products, old app archives, debug symbols for every iOS version you've connected, and full simulator runtimes. Most of it rebuilds on demand, so it's among the safest space to reclaim on a developer's Mac.",
    sections: [
      {
        heading: "DerivedData",
        paragraphs: [
          "DerivedData holds intermediate build files and indexes for every project you've opened. Deleting it is safe; Xcode rebuilds it on the next build, which will take longer once. Quit Xcode first.",
        ],
        code: "rm -rf ~/Library/Developer/Xcode/DerivedData",
      },
      {
        heading: "Archives",
        paragraphs: [
          "Every Product → Archive is kept in ~/Library/Developer/Xcode/Archives. Keep archives for builds you shipped if you need their debug symbols for crash reports; delete the rest from Xcode's Organizer window.",
        ],
      },
      {
        heading: "iOS DeviceSupport",
        paragraphs: [
          "Xcode copies debug symbols from each iOS version you connect a device with. Folders for iOS versions you no longer test on can go; Xcode copies them again if you connect such a device.",
        ],
        code: "open ~/Library/Developer/Xcode/iOS\\ DeviceSupport",
      },
      {
        heading: "Simulators",
        paragraphs: [
          "Simulator devices and runtimes are large. Remove devices for runtimes that are no longer installed, and delete runtimes you don't need from Xcode → Settings → Components.",
        ],
        code: "xcrun simctl delete unavailable\nxcrun simctl runtime list",
      },
    ],
    cta: "MacDissect's Smart Cleanup groups Xcode data and iOS simulators with their sizes, marks what is regenerable, and moves only what you select to the Trash.",
  },
  {
    slug: "mac-system-data-storage",
    metaTitle: 'What Is "System Data" in Mac Storage and How to Reduce It – MacDissect',
    title: 'What is "System Data" in Mac storage, and how do you reduce it?',
    description:
      "System Data is macOS's catch-all storage category. Find out what it usually contains (caches, logs, local snapshots, backups, VMs) and how to shrink it safely.",
    intro:
      "System Settings → Storage lumps anything it can't classify into \"System Data\". It's not one folder, so you can't delete it directly. You have to find which of the items inside it are large on your Mac.",
    sections: [
      {
        heading: "What System Data usually includes",
        bullets: [
          "App caches and logs in ~/Library/Caches and ~/Library/Logs",
          "Time Machine local snapshots, kept while your backup disk is disconnected",
          "iPhone and iPad backups",
          "Developer data: Xcode, simulators, Docker images, package caches",
          "Virtual machine disks from Parallels, UTM, VMware or VirtualBox",
          "Files inside app containers in ~/Library/Containers",
        ],
      },
      {
        heading: "Check Time Machine local snapshots",
        paragraphs: [
          "macOS removes local snapshots automatically when space runs low, but they can make System Data look huge. List them in Terminal:",
        ],
        code: "tmutil listlocalsnapshots /",
      },
      {
        heading: "Look inside ~/Library",
        paragraphs: [
          "Most of what counts as System Data for your user account lives in ~/Library, which Finder hides. Press ⇧⌘G in Finder and type ~/Library to open it. Don't delete folders you don't recognize; look up what they belong to first.",
        ],
      },
      {
        heading: "Give your analyzer Full Disk Access",
        paragraphs: [
          "macOS blocks apps from reading some protected folders. Without Full Disk Access, any disk analyzer will under-report sizes there. Grant it in System Settings → Privacy & Security → Full Disk Access.",
        ],
      },
    ],
    cta: "MacDissect maps ~/Library like any other folder, flags folders macOS wouldn't let it read, and Smart Cleanup separates regenerable caches from data that's yours.",
  },
  {
    slug: "delete-node-modules-mac",
    metaTitle: "How to Find and Delete node_modules Folders on Mac – MacDissect",
    title: "How to find and delete node_modules folders on a Mac",
    description:
      "Old JavaScript projects leave behind gigabytes of node_modules. Find every node_modules folder, see how big they are, and clear npm, yarn and pnpm caches.",
    intro:
      "Every JavaScript project installs its own node_modules folder, often hundreds of megabytes each. Projects you haven't touched in months are safe to clean: run npm install (or yarn, or pnpm) to get the folder back.",
    sections: [
      {
        heading: "List node_modules folders and their sizes",
        paragraphs: ["Run this from the folder that holds your projects, for example ~/code:"],
        code: "find . -name node_modules -type d -prune -exec du -sh {} + | sort -h",
      },
      {
        heading: "Delete them",
        paragraphs: [
          "Review the list first. This deletes every node_modules folder below the current folder permanently, without using the Trash:",
        ],
        code: "find . -name node_modules -type d -prune -exec rm -rf {} +",
      },
      {
        heading: "Clear package manager caches",
        code: "npm cache clean --force\nyarn cache clean\npnpm store prune",
      },
    ],
    cta: "MacDissect's Smart Cleanup finds node_modules, build output (.next, dist, target, Pods) and package caches across your Mac, and moves them to the Trash instead of deleting permanently.",
  },
  {
    slug: "docker-disk-space-mac",
    metaTitle: "How to Reclaim Docker Disk Space on Mac – MacDissect",
    title: "How to reclaim Docker disk space on a Mac",
    description:
      "Docker Desktop stores everything in one disk image that grows over time. See what's using it, prune unused images and volumes, and shrink the limit.",
    intro:
      "On a Mac, Docker Desktop keeps all images, containers, volumes and build cache inside a single virtual disk file. Pruning frees space inside that file; it can take a while before Finder shows the space as free again.",
    sections: [
      {
        heading: "See what Docker is using",
        code: "docker system df",
      },
      {
        heading: "Remove what you don't need",
        paragraphs: [
          "These commands remove stopped containers, unused networks, dangling images and build cache. Adding --volumes also deletes unused volumes, which may contain database data, so check them first.",
        ],
        code: "docker system prune\ndocker builder prune\ndocker volume ls",
      },
      {
        heading: "Limit the disk image size",
        paragraphs: [
          "In Docker Desktop → Settings → Resources, lower the virtual disk limit. Reducing it deletes all images and containers, so push or export anything you need first.",
        ],
      },
    ],
    cta: "MacDissect shows the Docker Desktop disk image alongside everything else on your Mac, and flags it as your data so it's never selected for cleanup by accident.",
  },
];

export const findGuide = (slug: string) => guides.find((g) => g.slug === slug);
