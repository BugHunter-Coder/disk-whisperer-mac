import { motion, stagger, type Variants } from "motion/react";
import type { ReactNode } from "react";

/** Shared easing for entrances: fast start, soft landing. */
export const easeOut = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: easeOut } },
};

export const staggerParent = (gap = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { delayChildren: stagger(gap, { startDelay: delay }) } },
});

/** Fades and lifts its content in once it scrolls into view. */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/** Staggers direct `StaggerItem` children into view. */
export function Stagger({
  children,
  className,
  gap,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
  as?: "div" | "ul";
}) {
  const Component = as === "ul" ? motion.ul : motion.div;
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerParent(gap)}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const Component = as === "li" ? motion.li : motion.div;
  return (
    <Component className={className} variants={fadeUp}>
      {children}
    </Component>
  );
}

/** Headline that reveals word by word. */
export function WordReveal({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.span
      className={className}
      initial="hidden"
      animate="show"
      variants={staggerParent(0.06, delay)}
      aria-label={text}
    >
      {text.split(" ").map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          aria-hidden
          className="inline-block whitespace-pre"
          variants={{
            hidden: { opacity: 0, y: "0.4em", filter: "blur(8px)" },
            show: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.6, ease: easeOut },
            },
          }}
        >
          {word}{" "}
        </motion.span>
      ))}
    </motion.span>
  );
}
