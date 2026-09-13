import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import type { Faq } from "@/components/landing/content";

export function FaqList({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <ul className="space-y-3">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <li
            key={f.q}
            className={`rounded-2xl border transition-colors duration-300 ${
              isOpen ? "border-ink/15 bg-cream" : "border-ink/10 bg-cream/50 hover:bg-cream"
            }`}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold"
            >
              {f.q}
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ type: "spring", visualDuration: 0.25, bounce: 0.3 }}
                className={`grid size-7 shrink-0 place-items-center rounded-full ${
                  isOpen ? "bg-ink text-cream" : "bg-ink/5"
                }`}
              >
                <Plus className="size-4" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ type: "spring", visualDuration: 0.35, bounce: 0 }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-ink/70">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
