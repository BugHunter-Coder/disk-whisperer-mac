// Blog posts on Apple's latest iOS and macOS releases and what they do to a Mac's disk.
// Guides answer evergreen how-to questions; posts are dated news with sources.

import type { Faq } from "@/components/landing/content";
import type { GuideSection } from "@/components/landing/guides";

export type BlogPost = {
  slug: string;
  /** Page <title>, written for search results. */
  metaTitle: string;
  title: string;
  description: string;
  /** ISO dates. */
  published: string;
  updated: string;
  tag: string;
  intro: string;
  sections: GuideSection[];
  faqs: Faq[];
  /** Reporting the post relies on, linked at the end for readers who want to check. */
  sources: { label: string; url: string }[];
  /** Guides worth reading next. */
  relatedGuides: string[];
  /** Short pitch for the call-to-action box at the end of the post. */
  cta: string;
};

export const posts: BlogPost[] = [
  {
    slug: "removemacai-delete-apple-intelligence-models",
    metaTitle: "RemoveMacAI: Delete Apple Intelligence Models and Free 12 GB+ – MacDissect",
    title: "RemoveMacAI deletes Apple Intelligence from macOS 27 for 12 GB+. Should you run it?",
    description:
      "A free open-source tool removes Apple Intelligence's models from macOS 27 and blocks them from coming back. What it frees, what stops working, the risks, and safer space to clear first.",
    published: "2026-10-09",
    updated: "2026-10-09",
    tag: "macOS 27",
    intro:
      "macOS 27 downloads Apple Intelligence's models whether you use them or not, and Apple removed the switch that turned them off. This week a free open-source tool called RemoveMacAI went viral for doing what Apple won't: deleting those models and keeping them gone. MacRumors, Ars Technica, The Verge and others covered it, and users report getting back 12 GB or more. Here's what it actually does, what you give up, and whether it's the right fix for a full disk.",
    sections: [
      {
        heading: "What RemoveMacAI does",
        bullets: [
          "Turns off Apple Intelligence through a configuration profile, the same mechanism companies use to manage Macs.",
          "Deletes the downloaded models through Apple's own asset service. It doesn't disable System Integrity Protection or delete files from protected system folders by hand.",
          "Blocks the models from downloading again by pointing those downloads at a closed local port. The profile reportedly survives macOS updates.",
          "Shows what it will change before it changes anything, and “removemacai revert” undoes all of it.",
          "It comes as a Mac app and a command-line tool, and has grown into a general debloater: analytics, ads, pop-ups, background updaters and a storage cleaner.",
        ],
      },
      {
        heading: "How much space you get back",
        paragraphs: [
          "Around 12 GB is typical, and some users report more, depending on which models were installed. That lines up with what reviewers measured for Apple Intelligence on macOS 27: Apple says up to 14 GB on M3-or-later Macs, while MacRumors and Ars Technica measured 20 GB or more on some machines.",
          "Run “removemacai status” first. It lists each Apple Intelligence feature and the size of its models, so you know what you'd save before you commit.",
        ],
        code: "# See each feature and the size of its models (changes nothing)\nremovemacai status\n\n# Turn it off (shows the change and asks first)\nremovemacai off\n\n# Undo everything RemoveMacAI changed\nremovemacai revert",
      },
      {
        heading: "What stops working",
        bullets: [
          "The new Siri AI features and the ChatGPT integration.",
          "Writing Tools, Genmoji and Image Playground.",
          "Summaries and smart replies in Mail, Messages, Safari, Notes and notifications.",
          "Inline predictions, Photos Clean Up and Spatial Photos.",
          "Xcode's predictive code completion.",
          "Dictation keeps working. You can also keep individual features with “removemacai off --keep”.",
        ],
      },
      {
        heading: "The risks",
        bullets: [
          "It's a third-party script. Installing it means running code from GitHub with admin rights. It's open source, so read it or wait for others to, and MacRumors explicitly says it doesn't endorse it.",
          "The app isn't notarized, so macOS warns you the first time you open it.",
          "It may break later. The developer notes that some of the profile settings it relies on were deprecated in macOS 26.4. They still work on macOS 27.0.1, but a future update could stop honouring them, and the models would come back.",
          "If you use Siri or Writing Tools even occasionally, you'll miss them. This is a trade, not free space.",
        ],
      },
      {
        heading: "Clear the safe stuff first",
        paragraphs: [
          "Removing Apple Intelligence is the only way to shrink that 12–20 GB, but it's rarely the biggest thing on a full Mac. Before you trade away features, look at what you can delete with no downside at all:",
        ],
        bullets: [
          "Old iPhone and iPad backups (Finder → Manage Backups), often 10–50 GB each.",
          "macOS installers left in /Applications and old .dmg and .pkg files in Downloads.",
          "Xcode DerivedData, device support files and old simulator runtimes, which can top 50 GB.",
          "Docker images, node_modules folders and other developer caches.",
          "Local Time Machine snapshots left over from the macOS 27 update.",
        ],
      },
      {
        heading: "Also this week: Full Disk Access is getting stricter",
        paragraphs: [
          "On October 2, Apple said it will add “additional controls” to the Full Disk Access setting because of risks from AI agents, and that granting it will take a very explicit action from the user. Apple hasn't said when, or in which macOS version.",
          "Full Disk Access is what lets backup tools and disk analyzers see your whole drive. When the change lands, expect apps like these to ask you to confirm access again. MacDissect only reads file sizes and metadata, and nothing leaves your Mac.",
        ],
      },
      {
        heading: "The short version",
        paragraphs: [
          "If you never use Apple Intelligence and you're on a 256 GB Mac, RemoveMacAI is a reasonable, reversible way to get 12 GB or more back, as long as you're comfortable running an unofficial tool that a future update could break. Everyone else should clear backups, installers and caches first. That's usually more space, with nothing given up.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is RemoveMacAI safe?",
        a: "It's open source, shows every change before applying it, uses a configuration profile rather than deleting protected system files, and can undo everything with “removemacai revert”. It's still an unofficial tool that runs with admin rights, and MacRumors says it doesn't endorse it, so use it at your own risk.",
      },
      {
        q: "How much space does removing Apple Intelligence free on macOS 27?",
        a: "About 12 GB is typical, and some users report more depending on which models were installed. “removemacai status” shows the size on your own Mac before you change anything.",
      },
      {
        q: "Can I get Apple Intelligence back after removing it?",
        a: "Yes. “removemacai on” turns Apple Intelligence back on, and “removemacai revert” undoes every change the tool made. The models then download again.",
      },
      {
        q: "Will a macOS update bring the models back?",
        a: "The profile reportedly survives updates. But some of the settings it relies on were deprecated in macOS 26.4, so a future macOS version could stop honouring them and the models could return.",
      },
    ],
    sources: [
      {
        label: "MacRumors: Mac users reclaim 12GB+ of storage with Apple Intelligence removal tool",
        url: "https://www.macrumors.com/2026/10/05/apple-intelligence-removal-tool-frees-mac-storage/",
      },
      {
        label: "Ars Technica: Command-line tool quickly removes Apple Intelligence from macOS 27",
        url: "https://arstechnica.com/apple/2026/10/command-line-tool-quickly-removes-apple-intelligence-from-macos-27/",
      },
      {
        label: "RemoveMacAI on GitHub",
        url: "https://github.com/omlahore/RemoveMacAI",
      },
      {
        label: "MacRumors: Apple announces Full Disk Access changes on macOS due to AI agents",
        url: "https://www.macrumors.com/2026/10/02/apple-announces-macos-full-disk-access-changes/",
      },
    ],
    relatedGuides: ["macbook-low-storage-256gb", "mac-system-data-storage", "clear-xcode-derived-data"],
    cta: "Before you give up features for space, see where it really went. MacDissect's treemap shows every folder sized at a glance, and Smart Cleanup finds old iPhone backups, installers and developer caches you can delete with nothing lost. Scans never leave your Mac.",
  },
  {
    slug: "macos-27-golden-gate-storage",
    metaTitle: "macOS 27 Golden Gate Storage: Where Your Disk Space Went – MacDissect",
    title: "macOS 27 Golden Gate ate my disk space: where it went and how to get it back",
    description:
      "After updating to macOS 27, many Macs show 15–30 GB less free space. Here's what's using it (Apple Intelligence models, snapshots, the installer) and what you can safely reclaim.",
    published: "2026-10-08",
    updated: "2026-10-08",
    tag: "macOS 27",
    intro:
      "macOS 27 Golden Gate shipped on September 14, 2026, and the 27.0.1 fix followed on September 28. It's mostly a speed and polish release, but a lot of people noticed something else first: free space dropped by 15 GB or more right after the update. Here's where that space goes and how much of it you can get back.",
    sections: [
      {
        heading: "What's new in macOS 27, in one minute",
        bullets: [
          "Siri AI: a rebuilt, conversational Siri with on-screen and personal context, launched in English first.",
          "Apple Intelligence spreads into Photos, Safari, Mail, Messages and Shortcuts, including AI file and folder naming.",
          "Refined Liquid Glass with adjustable transparency, after readability complaints about Tahoe.",
          "Apple says app launches are up to 30% faster, with quicker Spotlight, AirDrop and networking.",
          "Apple silicon only: macOS 27 doesn't install on Intel Macs, and it's the last release with general Rosetta support.",
        ],
      },
      {
        heading: "Apple Intelligence now downloads 14–30 GB of models",
        paragraphs: [
          "The biggest change for your disk is Apple Intelligence. Apple's support document says it needs up to 14 GB on Macs with an M3 or later and at least 12 GB of memory, and up to 8 GB on other supported Macs. Real measurements are higher: MacRumors saw 20.67 GB on an M4 Pro Mac mini, Ars Technica measured 22.42 GB on an M3 MacBook Air and about 14 GB on an M1 MacBook Air and the MacBook Neo, and one user reported about 30 GB on the release candidate.",
          "According to MacRumors, macOS 27 also removed the switch that used to stop the models downloading. Using the features is optional; the download isn't. On a 256 GB Mac that's a big bite you can't avoid, so the rest of your disk matters more than before.",
          "To see your own number, open System Settings → General → Storage and click the ⓘ button next to macOS.",
        ],
      },
      {
        heading: "Other places the update put data",
        bullets: [
          "Local Time Machine snapshots: macOS takes one before a major update. They show up as purgeable space and free themselves over time, but they make free space look smaller in the meantime.",
          "The installer: if you downloaded “Install macOS Golden Gate” from the App Store, a copy can stay in /Applications. Delete it once you're updated.",
          "Rebuilt caches and indexes: Spotlight, Photos and Siri AI rebuild their indexes after an upgrade. That's temporary and settles within a few days.",
          "System Data: most of the above lands in the grey “System Data” bar, which is why that number jumps after every major update.",
        ],
      },
      {
        heading: "How to check what's actually using space",
        paragraphs: [
          "The Storage pane groups everything into broad categories. To see folders, list local snapshots in Terminal and look at what's really on the disk:",
        ],
        code: "# Local Time Machine snapshots\ntmutil listlocalsnapshots /\n\n# Delete one by its date if you need space now\nsudo tmutil deletelocalsnapshots 2026-09-14-101500\n\n# Biggest folders in your home folder\ndu -sh ~/* 2>/dev/null | sort -rh | head -15",
      },
      {
        heading: "What you can safely reclaim after updating",
        bullets: [
          "The macOS installer app in /Applications, if it's still there.",
          "Old local snapshots, once you've confirmed the update went fine.",
          "App caches in ~/Library/Caches (quit the apps first; they rebuild).",
          "Old iPhone and iPad backups, especially if you also updated to iOS 27 and have a new backup.",
          "Developer data: Xcode DerivedData and old simulator runtimes grow fast with each new Xcode.",
          "Leave /System, /private/var/db and anything Apple Intelligence put there alone. You can't remove the models, and trying will break things.",
        ],
      },
      {
        heading: "The short version",
        paragraphs: [
          "Budget roughly 20 GB more for macOS 27 than you did for Tahoe, mostly for Apple Intelligence. You can't shrink that part, so get the space back from what you do control: old backups, installers, caches, downloads and developer files. A disk analyzer makes that a five-minute job instead of a hunt.",
        ],
      },
    ],
    faqs: [
      {
        q: "How much storage does macOS 27 Apple Intelligence use?",
        a: "Apple says up to 14 GB on M3-or-later Macs with 12 GB+ of memory and up to 8 GB on other supported Macs. Measured numbers have been higher, about 14–24 GB in reviews and up to about 30 GB in one user report.",
      },
      {
        q: "Can I delete the Apple Intelligence models in macOS 27?",
        a: "No. According to MacRumors, macOS 27 removed the option to stop the models downloading. You can choose not to use the features, but the models stay on disk.",
      },
      {
        q: "Why did System Data grow after updating to macOS 27?",
        a: "Apple Intelligence models, local Time Machine snapshots taken before the update, and rebuilt indexes all count as System Data. Snapshots and indexes shrink on their own over a few days; the models don't.",
      },
    ],
    sources: [
      {
        label: "MacRumors: Apple Intelligence taking up 30GB+ on some Macs running macOS 27",
        url: "https://www.macrumors.com/2026/09/23/apple-intelligence-30gb-some-macs-macos-27/",
      },
      {
        label: "Macworld: macOS Golden Gate features, release date and compatibility",
        url: "https://www.macworld.com/article/3139330/macos-27-mac-features-siri-apple-intelligence-release-date-compatibility.html",
      },
      {
        label: "Tom's Guide: If your Mac is suddenly running out of space after macOS 27",
        url: "https://www.tomsguide.com/computing/if-your-mac-is-suddenly-running-out-of-space-after-macos-27-check-this-one-setting",
      },
    ],
    relatedGuides: [
      "mac-storage-full-after-update",
      "mac-system-data-storage",
      "purgeable-space-mac",
    ],
    cta: "MacDissect shows every folder on your Mac sized as a treemap, so the space macOS 27 left behind is obvious at a glance. Smart Cleanup finds old iPhone backups, installers and developer caches, and scans never leave your Mac.",
  },
  {
    slug: "ios-27-update-mac-storage",
    metaTitle: "iOS 27 Is Out: What It Does to Your iPhone and Mac Storage – MacDissect",
    title: "iOS 27 is out: what it means for your iPhone's storage, and your Mac's",
    description:
      "iOS 27 needs up to 14 GB for Apple Intelligence on newer iPhones, and updating through a Mac leaves big backups and firmware files behind. Here's what to clean up.",
    published: "2026-10-08",
    updated: "2026-10-08",
    tag: "iOS 27",
    intro:
      "iOS 27 rolled out on September 14, 2026, followed by iOS 27.0.1 on September 28 with fixes for unexpected restarts and a touchscreen freeze. It runs on the same iPhones as iOS 26 (iPhone 11 and later, plus the 2nd-generation SE), so almost everyone can install it. Its storage cost shows up in two places: on the iPhone, and on the Mac you back it up to.",
    sections: [
      {
        heading: "What's new in iOS 27",
        bullets: [
          "Siri AI, a rebuilt assistant with personal context and a chat app, in beta and English-only at launch, and not in the EU or China yet.",
          "Apple Intelligence in Safari, Photos, Messages, Mail, Calendar, Home and Shortcuts (iPhone 15 Pro and newer).",
          "Photos gets Reframe, Extend and a faster Clean Up tool.",
          "Separate volume sliders for ringtones, alarms and alerts, a new Drawing app and a quick-paste bar above the keyboard.",
          "Apple claims up to 30% faster app launches and up to 80% faster AirDrop.",
        ],
      },
      {
        heading: "On the iPhone: Apple Intelligence wants up to 14 GB",
        paragraphs: [
          "Apple's support document now asks for up to 14 GB free on the iPhone 17 Pro, 17 Pro Max, iPhone Air, iPhone 18 Pro, 18 Pro Max and iPhone Duo. These models run Apple's larger on-device model, which powers better dictation and adjustable Siri voices. Other Apple Intelligence iPhones still need about 8 GB.",
          "If your iPhone is short on space, Settings → General → iPhone Storage lists apps by size and offers to offload ones you rarely use.",
        ],
      },
      {
        heading: "On your Mac: backups and firmware pile up",
        paragraphs: [
          "If you back up your iPhone to your Mac before a big update (a good habit), each backup can be tens of gigabytes. Finder keeps old backups of every device you've ever connected, including phones you've sold.",
        ],
        bullets: [
          "Device backups: ~/Library/Application Support/MobileSync/Backup",
          "Firmware downloaded for updates and restores (.ipsw files): ~/Library/iTunes/iPhone Software Updates and ~/Library/iTunes/iPad Software Updates",
          "Photos and videos imported from the iPhone, often duplicated in ~/Pictures and Downloads.",
        ],
        code: "# How much space your iPhone backups use\ndu -sh ~/Library/Application\\ Support/MobileSync/Backup\n\n# Leftover iOS firmware files\nls -lh ~/Library/iTunes/*Software\\ Updates/ 2>/dev/null",
      },
      {
        heading: "Delete old backups the safe way",
        paragraphs: [
          "Don't delete folders inside MobileSync by hand: their names are random IDs, so it's easy to remove the wrong one. Connect the iPhone, select it in the Finder sidebar, click Manage Backups, and delete backups for devices you no longer own. Keep at least one recent backup of every device you still use.",
          "Firmware files in the Software Updates folders are safe to delete once the update is done. Finder downloads them again if it ever needs them.",
        ],
      },
      {
        heading: "Updating your Mac too?",
        paragraphs: [
          "If you're also moving to macOS 27, Apple Intelligence on the Mac takes even more room than on the iPhone. See our post on where macOS 27 puts its data before you update both.",
        ],
      },
    ],
    faqs: [
      {
        q: "How much storage does iOS 27 Apple Intelligence need?",
        a: "Up to 14 GB on the iPhone 17 Pro and Pro Max, iPhone Air, iPhone 18 Pro and Pro Max and iPhone Duo, and about 8 GB on other iPhones that support Apple Intelligence.",
      },
      {
        q: "Which iPhones get iOS 27?",
        a: "The same as iOS 26: iPhone 11 and later and the iPhone SE (2nd generation) and later. Apple Intelligence and Siri AI need an iPhone 15 Pro or newer.",
      },
      {
        q: "Where are iPhone backups stored on a Mac?",
        a: "In ~/Library/Application Support/MobileSync/Backup. Delete them from Finder's Manage Backups window rather than by hand.",
      },
    ],
    sources: [
      {
        label:
          "9to5Mac: Apple Intelligence now requires almost double the iPhone storage on latest models",
        url: "https://9to5mac.com/2026/09/18/apple-intelligence-now-requires-almost-double-the-iphone-storage-on-latest-models/",
      },
      {
        label: "Macworld: iOS 27 features, compatibility and Siri AI",
        url: "https://www.macworld.com/article/2986799/ios-27-features-compatiblity-siri-ai-updates.html",
      },
      {
        label: "MacRumors: iOS 27 is compatible with these iPhone models",
        url: "https://www.macrumors.com/2026/09/14/ios-27-compatible-iphones/",
      },
    ],
    relatedGuides: [
      "free-up-disk-space-on-mac",
      "find-large-files-mac",
      "macbook-low-storage-256gb",
    ],
    cta: "MacDissect's Smart Cleanup lists local iPhone and iPad backups and leftover .ipsw firmware files with their sizes, so you can see what an iOS update left on your Mac before you remove anything.",
  },
  {
    slug: "macos-27-drops-intel-macs",
    metaTitle: "macOS 27 Drops Intel Macs: What It Means for You – MacDissect",
    title: "macOS 27 drops Intel Macs: what that means for your Mac and your apps",
    description:
      "macOS 27 Golden Gate runs only on Apple silicon, and it's the last version with general Rosetta support. What to do if you have an Intel Mac or Intel-only apps.",
    published: "2026-10-08",
    updated: "2026-10-08",
    tag: "macOS 27",
    intro:
      "macOS 27 Golden Gate is the first Mac release that won't install on any Intel Mac. macOS 26 Tahoe was the end of the line for them. If you're on Intel, or still rely on Intel-only apps on an Apple silicon Mac, here's what changes and what to do.",
    sections: [
      {
        heading: "Which Macs can run macOS 27",
        bullets: [
          "MacBook Air and MacBook Pro with Apple silicon (2020 and later)",
          "iMac with Apple silicon (2021 and later)",
          "Mac mini with Apple silicon (2020 and later)",
          "Mac Studio (2022 and later) and Mac Pro with Apple silicon (2023 and later)",
          "MacBook Neo (A18 Pro)",
        ],
      },
      {
        heading: "If you have an Intel Mac",
        paragraphs: [
          "Nothing stops working. Your Mac keeps running Tahoe or whatever version it has, along with your apps. You won't get macOS 27's features, and Macworld reports that some Intel models may receive security fixes for older macOS versions until about September 2028.",
          "In practice, the bigger problem is apps: as developers move to macOS 27 features, new versions will stop supporting Tahoe over the next year or two. If you're planning to replace the Mac, this is a good time to clean it up so migrating is quick.",
        ],
      },
      {
        heading: "Rosetta's last full year",
        paragraphs: [
          "macOS 27 is the last version with general Rosetta 2 support. Intel-only apps still run today, but most will stop working in macOS 28 unless their developers ship Apple silicon versions. macOS 27 adds a checker in System Settings that lists the Intel apps you've used in the past year.",
          "You can also check from Terminal. Apps whose binary lists only x86_64 are Intel-only:",
        ],
        code: '# List apps that ship only an Intel binary\nfor app in /Applications/*.app; do\n  bin="$app/Contents/MacOS/$(defaults read "$app/Contents/Info" CFBundleExecutable 2>/dev/null)"\n  [ -f "$bin" ] && lipo -archs "$bin" 2>/dev/null | grep -qv arm64 && echo "$app"\ndone',
      },
      {
        heading: "Clean up before you migrate to a new Mac",
        paragraphs: [
          "Migration Assistant copies everything, including years of caches, old installers and forgotten backups. Moving 300 GB when you only need 120 GB makes the transfer much slower and can fill the new Mac's smaller disk on day one.",
        ],
        bullets: [
          "Delete Intel-only apps you've replaced, and their leftovers in ~/Library.",
          "Remove old iPhone backups, .dmg installers and virtual machines you no longer use.",
          "Clear developer data such as DerivedData, node_modules and Docker images; it all rebuilds.",
          "Move large media archives to an external drive instead of migrating them.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does macOS 27 support Intel Macs?",
        a: "No. macOS 27 Golden Gate runs only on Apple silicon Macs and the MacBook Neo. macOS 26 Tahoe is the last version for Intel Macs.",
      },
      {
        q: "Will Intel apps still work on macOS 27?",
        a: "Yes, through Rosetta 2. But macOS 27 is the last version with general Rosetta support, so most Intel-only apps are expected to stop working in macOS 28.",
      },
    ],
    sources: [
      {
        label: "MacRumors: macOS Golden Gate marks the end of an era",
        url: "https://www.macrumors.com/2026/09/14/macos-golden-gate-marks-the-end-of-an-era-2/",
      },
      {
        label: "Macworld: macOS Golden Gate features, release date and compatibility",
        url: "https://www.macworld.com/article/3139330/macos-27-mac-features-siri-apple-intelligence-release-date-compatibility.html",
      },
      {
        label: "AppleInsider: How and when macOS will finally stop support for Intel apps",
        url: "https://appleinsider.com/articles/26/06/12/how-and-when-macos-will-finally-stop-support-for-intel-apps",
      },
    ],
    relatedGuides: [
      "uninstall-apps-completely-mac",
      "free-up-disk-space-on-mac",
      "why-is-my-mac-slow",
    ],
    cta: "Before you migrate, scan your Mac with MacDissect to see what's worth taking along. The treemap shows forgotten backups, installers and old projects, and Smart Cleanup removes the regenerable ones safely.",
  },
  {
    slug: "prepare-mac-for-macos-27-update",
    metaTitle: "How Much Free Space Do You Need for macOS 27? Prep Checklist – MacDissect",
    title: "Getting ready for macOS 27: how much free space you need and a 10-minute checklist",
    description:
      "macOS 27 plus Apple Intelligence can take 20–30 GB more than Tahoe. How much free space to leave before updating, and what to clear first.",
    published: "2026-10-08",
    updated: "2026-10-08",
    tag: "macOS 27",
    intro:
      "A major macOS update needs room for the download, room to unpack it, and room for a safety snapshot, and with macOS 27, room for the Apple Intelligence models it downloads afterwards. Updates that run out of space fail in confusing ways, so it's worth ten minutes of prep.",
    sections: [
      {
        heading: "How much space to leave",
        paragraphs: [
          "Apple doesn't publish one number for the whole job. Between the installer, the pre-update snapshot and the 8–14 GB Apple says Apple Intelligence needs (measured at 20 GB or more on many Macs), we suggest at least 40 GB free before you click Update Now. More is better on a 256 GB Mac, where the update can push you into “disk almost full” warnings.",
        ],
      },
      {
        heading: "The 10-minute checklist",
        bullets: [
          "Back up with Time Machine or another tool first. Major updates rarely fail, but when they do you want a copy.",
          "Empty the Trash, including on external drives.",
          "Clear ~/Downloads of old .dmg and .pkg installers and zip files.",
          "Delete iPhone and iPad backups you don't need via Finder → Manage Backups.",
          "If you develop: clear Xcode DerivedData and old simulators, and prune Docker images.",
          "Check for Intel-only apps you depend on, since macOS 27 is Rosetta's last full release.",
          "Plug in the charger and leave the Mac on Wi-Fi for the model download afterwards.",
        ],
      },
      {
        heading: "After the update",
        paragraphs: [
          "Expect free space to look low for a few days while Spotlight and Photos re-index and the pre-update snapshot sits on disk. If it's still low after a week, look at what changed rather than guessing. Our post on where macOS 27 puts its data covers the usual suspects.",
        ],
      },
    ],
    faqs: [
      {
        q: "How much free space do I need to update to macOS 27?",
        a: "Apple doesn't publish a single figure. Counting the installer, the pre-update snapshot and Apple Intelligence's models (8–14 GB officially, often 20 GB+ measured), we recommend at least 40 GB free.",
      },
      {
        q: "Can I update to macOS 27 on a 256 GB Mac?",
        a: "Yes, but clear space first. Apple Intelligence's models can't be removed, so 256 GB Macs will have noticeably less free space afterwards.",
      },
    ],
    sources: [
      {
        label: "MacRumors: Apple Intelligence taking up 30GB+ on some Macs running macOS 27",
        url: "https://www.macrumors.com/2026/09/23/apple-intelligence-30gb-some-macs-macos-27/",
      },
      {
        label: "Macworld: macOS Golden Gate features, release date and compatibility",
        url: "https://www.macworld.com/article/3139330/macos-27-mac-features-siri-apple-intelligence-release-date-compatibility.html",
      },
    ],
    relatedGuides: ["mac-disk-almost-full", "clear-xcode-derived-data", "docker-disk-space-mac"],
    cta: "MacDissect's free home-folder scan shows where your space is in seconds. Pro scans the whole disk and remembers it, so after the update you can see exactly what grew.",
  },
];

export const BLOG_UPDATED = posts.reduce((d, p) => (p.updated > d ? p.updated : d), "");

export const findPost = (slug: string) => posts.find((p) => p.slug === slug);
