import { motion } from "motion/react";
import { Download } from "lucide-react";
import { DOWNLOAD } from "@/lib/download";

/** Direct link to the latest DMG. */
export function DownloadButton({
  variant = "dark",
  label = "Download for Mac",
  className = "",
}: {
  variant?: "dark" | "light" | "sun";
  label?: string;
  className?: string;
}) {
  const styles = {
    dark: "bg-ink text-cream shadow-[4px_4px_0_0_#FFC93C]",
    light: "border border-ink/15 bg-cream/80 text-ink backdrop-blur hover:bg-cream",
    sun: "bg-sun text-ink shadow-[4px_4px_0_0_#191925]",
  }[variant];
  return (
    <motion.a
      href={DOWNLOAD.url}
      download
      // DataFast records each click as a "download_dmg" goal.
      data-fast-goal="download_dmg"
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 font-bold transition-colors ${styles} ${className}`}
    >
      <Download className="size-4" />
      {label}
    </motion.a>
  );
}
