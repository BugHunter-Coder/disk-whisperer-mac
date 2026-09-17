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

export const GUIDES_UPDATED = "2026-09-17";

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
