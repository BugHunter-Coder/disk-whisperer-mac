import { Link } from "@tanstack/react-router";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { DownloadButton } from "@/components/site/DownloadButton";
import {
  BASE_D,
  BASE_W,
  Battery,
  BottomCase,
  ControllerChip,
  DataBar,
  LidOuter,
  LidScreen,
  LogicBoard,
  NandChip,
  Plate,
  SSD_D,
  SSD_W,
  SsdPcb,
  SsdSticker,
  TopCase,
} from "./parts";

/**
 * Scroll-driven teardown of a Mac: the lid folds back, every layer separates, the view dives
 * into the SSD, the SSD comes apart, and its flash chips turn into the folders MacDissect measures.
 * Sizes on the bars match the product screenshot shown on the display.
 */

// Timeline, as fractions of the section's scroll progress.
const T = {
  lidFold: [0.06, 0.16],
  lidSlide: [0.16, 0.24],
  explode: [0.2, 0.38],
  focus: [0.52, 0.64],
  ssdExplode: [0.66, 0.78],
  data: [0.8, 0.93],
} as const;

const stages: { at: number; eyebrow: string; title: string; body: ReactNode }[] = [
  { at: 0, eyebrow: "", title: "", body: null },
  {
    at: 0.1,
    eyebrow: "Teardown · 01",
    title: "Open it up.",
    body: "Your Mac says the disk is almost full. Let's find out what's actually inside.",
  },
  {
    at: 0.24,
    eyebrow: "Teardown · 02",
    title: "Every layer, pulled apart.",
    body: "Display, top case, logic board, battery. None of them hold your files.",
  },
  {
    at: 0.4,
    eyebrow: "Teardown · 03",
    title: "The display shows the map.",
    body: "MacDissect lays your disk out as a treemap on screen: every block is a folder, sized by what it takes up.",
  },
  {
    at: 0.52,
    eyebrow: "Teardown · 04",
    title: "Down to the SSD.",
    body: "Everything you've ever saved lives on this one small board.",
  },
  {
    at: 0.66,
    eyebrow: "Teardown · 05",
    title: "Inside the SSD.",
    body: "A controller keeps track of where every block lives. The NAND flash chips hold the bits themselves.",
  },
  {
    at: 0.8,
    eyebrow: "Teardown · 06",
    title: "Your files, measured.",
    body: "MacDissect turns those chips back into folders you recognize, then helps you clean up the ones that don't belong.",
  },
];

const bars = [
  { label: "Library", size: "17.5 GB", gb: 17.51, color: "#9fc3f0", side: "#5b8fd6" },
  { label: "Movies", size: "12.9 GB", gb: 12.9, color: "#f0c79a", side: "#d0955a" },
  { label: "Pictures", size: "3.5 GB", gb: 3.46, color: "#a6e3a1", side: "#5fbf62" },
  { label: "Downloads", size: "3.4 GB", gb: 3.4, color: "#e3a6e6", side: "#c05fc5" },
  { label: "Developer", size: "3.4 GB", gb: 3.38, color: "#f0dc8e", side: "#d4b53f" },
  { label: "Music", size: "3.3 GB", gb: 3.25, color: "#9ee7e6", side: "#4cc3c1" },
];

function useRange(
  p: MotionValue<number>,
  range: readonly [number, number],
  values: [number, number],
) {
  return useTransform(p, [range[0], range[1]], values);
}

/** A layer of the Mac that fades out when the view dives into the SSD. */
function MacLayer({
  progress,
  z,
  focusZ,
  children,
  label,
}: {
  progress: MotionValue<number>;
  z: [number, number];
  focusZ: number;
  children: ReactNode;
  label?: string;
}) {
  const explodeZ = useRange(progress, T.explode, z);
  const flyZ = useRange(progress, T.focus, [0, focusZ]);
  const zTotal = useTransform([explodeZ, flyZ], ([a, b]) => (a as number) + (b as number));
  const opacity = useRange(progress, T.focus, [1, 0]);
  const tagOpacity = useTransform(progress, [0.3, 0.38, 0.5, 0.54], [0, 1, 1, 0]);
  return (
    <motion.div
      className="absolute inset-0"
      style={{ z: zTotal, opacity, transformStyle: "preserve-3d" }}
    >
      {children}
      {label && (
        <motion.span
          className="absolute top-2 -left-4 -translate-x-full rounded-full bg-ink px-5 py-2.5 text-[26px] font-bold whitespace-nowrap text-cream"
          style={{ opacity: tagOpacity }}
        >
          {label}
        </motion.span>
      )}
    </motion.div>
  );
}

function Stage({ progress }: { progress: MotionValue<number> }) {
  // Whole stage
  const stageScale = useTransform(
    progress,
    [0, T.explode[0], T.explode[1], T.focus[0], T.focus[1], 1],
    [1, 0.95, 0.52, 0.52, 1, 1],
  );
  const stageRotZ = useTransform(progress, [0, T.focus[0], T.focus[1], 1], [-36, -36, -28, -24]);
  const stageRotX = useTransform(progress, [0, T.explode[1], T.focus[1], 1], [60, 62, 56, 52]);

  // Lid: open 110° → flat 180° behind the base, then slides on top of the stack.
  const lidRot = useRange(progress, T.lidFold, [108, 180]);
  const lidY = useRange(progress, T.lidSlide, [0, BASE_D]);

  // SSD: stays centered, grows during focus, then comes apart.
  const ssdScale = useRange(progress, T.focus, [1, 1.9]);
  const stickerZ = useRange(progress, T.ssdExplode, [3, 150]);
  const ctrlZ = useRange(progress, T.ssdExplode, [2, 95]);
  const topPartsOpacity = useRange(progress, [T.data[0], T.data[0] + 0.05], [1, 0]);
  const ssdGlow = useTransform(progress, [T.focus[0], T.focus[1]], [0, 1]);
  const maxGb = Math.max(...bars.map((b) => b.gb));

  return (
    <div className="relative h-full w-full" style={{ perspective: "2400px" }}>
      <div className="absolute top-[64%] left-1/2 origin-center scale-[0.46] sm:top-[58%] sm:scale-[0.7] lg:top-[56%] lg:scale-[0.82] xl:scale-95">
        <motion.div
          className="absolute"
          style={{
            width: BASE_W,
            height: BASE_D,
            left: -BASE_W / 2,
            top: -BASE_D / 2,
            rotateX: stageRotX,
            rotateZ: stageRotZ,
            scale: stageScale,
            transformStyle: "preserve-3d",
          }}
        >
          <MacLayer progress={progress} z={[0, -400]} focusZ={-300} label="Bottom case">
            <BottomCase />
          </MacLayer>

          <MacLayer progress={progress} z={[6, -70]} focusZ={260} label="Battery">
            <Plate w={440} d={116} x={40} y={196}>
              <Battery />
            </Plate>
          </MacLayer>

          <MacLayer progress={progress} z={[8, 100]} focusZ={320} label="Logic board">
            <Plate w={440} d={140} x={40} y={30}>
              <LogicBoard />
            </Plate>
          </MacLayer>

          <MacLayer progress={progress} z={[16, 280]} focusZ={380} label="Top case & keyboard">
            <TopCase />
          </MacLayer>

          {/* Lid, hinged along the back edge */}
          <MacLayer progress={progress} z={[16, 470]} focusZ={420} label="Display">
            <motion.div
              className="absolute inset-0"
              style={{
                y: lidY,
                rotateX: lidRot,
                transformOrigin: "50% 0%",
                transformStyle: "preserve-3d",
              }}
            >
              <LidOuter />
              <LidScreen src="/product/explore-treemap.png" />
            </motion.div>
          </MacLayer>

          {/* SSD module, centered on the base */}
          <SsdGroup
            progress={progress}
            ssdScale={ssdScale}
            ssdGlow={ssdGlow}
            stickerZ={stickerZ}
            ctrlZ={ctrlZ}
            topPartsOpacity={topPartsOpacity}
          >
            {bars.map((b, i) => (
              <GrowingBar
                key={b.label}
                progress={progress}
                index={i}
                w={44}
                d={56}
                h={30 + (b.gb / maxGb) * 150}
                x={16 + i * 46}
                y={14}
                color={b.color}
                side={b.side}
                label={b.label}
                size={b.size}
              />
            ))}
          </SsdGroup>
        </motion.div>
      </div>
    </div>
  );
}

function SsdGroup({
  progress,
  ssdScale,
  ssdGlow,
  stickerZ,
  ctrlZ,
  topPartsOpacity,
  children,
}: {
  progress: MotionValue<number>;
  ssdScale: MotionValue<number>;
  ssdGlow: MotionValue<number>;
  stickerZ: MotionValue<number>;
  ctrlZ: MotionValue<number>;
  topPartsOpacity: MotionValue<number>;
  children: ReactNode;
}) {
  // Sits between the battery and the bottom case when exploded, then rises to the center.
  const explodeZ = useTransform(
    progress,
    [T.explode[0], T.explode[1], T.focus[0], T.focus[1]],
    [12, -235, -235, 0],
  );
  const labelOpacity = useTransform(progress, [0.3, 0.38, 0.5, 0.54], [0, 1, 1, 0]);
  const partTags = useTransform(progress, [0.72, 0.78, 0.8, 0.84], [0, 1, 1, 0]);
  const glowShadow = useTransform(
    ssdGlow,
    (g) => `0 0 ${60 * g}px ${10 * g}px rgba(52,211,153,${0.35 * g})`,
  );
  return (
    <motion.div
      className="absolute"
      style={{
        width: SSD_W,
        height: SSD_D,
        left: (BASE_W - SSD_W) / 2,
        top: (BASE_D - SSD_D) / 2 + 20,
        z: explodeZ,
        scale: ssdScale,
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div className="absolute inset-0 rounded-[6px]" style={{ boxShadow: glowShadow }} />
      <SsdPcb />
      <motion.span
        className="absolute top-0 -left-4 -translate-x-full rounded-full bg-mint px-5 py-2.5 text-[26px] font-bold whitespace-nowrap text-ink"
        style={{ opacity: labelOpacity }}
      >
        SSD
      </motion.span>

      {/* NAND flash packages */}
      {[0, 1, 2, 3].map((i) => (
        <NandLayer key={i} progress={progress} index={i} />
      ))}

      {/* Controller and DRAM */}
      <motion.div
        className="absolute"
        style={{ left: 30, top: 18, width: 46, height: 46, z: ctrlZ, opacity: topPartsOpacity }}
      >
        <ControllerChip />
        <motion.span
          className="absolute -top-6 left-0 rounded-full bg-sky px-2 py-0.5 text-[10px] font-bold whitespace-nowrap text-ink"
          style={{ opacity: partTags }}
        >
          Controller
        </motion.span>
      </motion.div>

      {/* Label sticker */}
      <motion.div className="absolute inset-0" style={{ z: stickerZ, opacity: topPartsOpacity }}>
        <SsdSticker />
      </motion.div>

      <motion.span
        className="absolute -bottom-8 left-[104px] rounded-full bg-lilac px-2 py-0.5 text-[10px] font-bold whitespace-nowrap text-ink"
        style={{ opacity: partTags }}
      >
        NAND flash
      </motion.span>

      {children}
    </motion.div>
  );
}

function NandLayer({ progress, index }: { progress: MotionValue<number>; index: number }) {
  const lifted = 40 + index * 10;
  const z = useTransform(
    progress,
    [T.ssdExplode[0] + index * 0.015, T.ssdExplode[1], T.data[0], T.data[0] + 0.05],
    [1, lifted, lifted, 4],
  );
  return (
    <motion.div
      className="absolute"
      style={{ left: 96 + index * 50, top: 8, width: 42, height: 68, z }}
    >
      <NandChip index={index} />
    </motion.div>
  );
}

function GrowingBar({
  progress,
  index,
  ...bar
}: { progress: MotionValue<number>; index: number } & Omit<Parameters<typeof DataBar>[0], "grow">) {
  const grow = useTransform(
    progress,
    [T.data[0] + index * 0.012, T.data[1] - (5 - index) * 0.004],
    [0, 1],
  );
  return <DataBar {...bar} grow={grow} />;
}

/**
 * Real-time three.js render of the teardown. The lightweight CSS stage shows while three.js
 * loads, and stays as the fallback when WebGL isn't available.
 */
function ThreeStage({ progress }: { progress: MotionValue<number> }) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "failed">("loading");

  useEffect(() => {
    let cancelled = false;
    let dispose: (() => void) | undefined;
    import("./three/scene")
      .then(({ createTeardownScene }) => {
        if (cancelled || !canvasRef.current || !overlayRef.current) return;
        try {
          dispose = createTeardownScene(
            canvasRef.current,
            overlayRef.current,
            () => progress.get(),
            "/product/explore-treemap.png",
          );
          setStatus("ready");
        } catch (error) {
          console.error("3D teardown unavailable, using the CSS version:", error);
          setStatus("failed");
        }
      })
      .catch(() => setStatus("failed"));
    return () => {
      cancelled = true;
      dispose?.();
    };
  }, [progress]);

  return (
    <div className="relative h-full w-full">
      {status !== "ready" && <Stage progress={progress} />}
      <div
        ref={canvasRef}
        className={`absolute inset-0 transition-opacity duration-700 ${
          status === "ready" ? "opacity-100" : "opacity-0"
        }`}
      />
      <div ref={overlayRef} className="pointer-events-none absolute inset-0 overflow-hidden" />
    </div>
  );
}

export function MacTeardown() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.0005 });
  const [stage, setStage] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    let next = 0;
    stages.forEach((s, i) => {
      if (p >= s.at) next = i;
    });
    setStage(next);
  });

  const heroOpacity = useTransform(progress, [0, 0.08], [1, 0]);
  const heroY = useTransform(progress, [0, 0.08], [0, -40]);
  const current = stages[stage]!;
  const barProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={ref} className="relative h-[900vh] bg-paper" aria-label="MacDissect teardown">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(55%_55%_at_65%_55%,rgba(56,189,248,0.16),transparent),radial-gradient(35%_35%_at_15%_85%,rgba(255,107,107,0.12),transparent)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(rgba(25,25,37,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(25,25,37,0.05)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] bg-[size:48px_48px]"
        />

        <div className="relative mx-auto grid h-full max-w-7xl grid-rows-[auto_1fr] px-6 pt-24 lg:grid-cols-12 lg:grid-rows-1 lg:pt-0">
          {/* Copy */}
          <div className="relative z-10 flex items-center lg:col-span-5">
            <div className="relative min-h-[21rem] w-full sm:min-h-[18rem] lg:min-h-[15rem]">
              <motion.div style={{ opacity: heroOpacity, y: heroY }} className="absolute inset-0">
                <p className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-cream/80 px-3 py-1.5 text-xs font-semibold backdrop-blur">
                  <span className="size-2 rounded-full bg-mint" /> Native macOS app · scans stay on
                  your Mac
                </p>
                <h1 className="mt-5 font-display text-[clamp(2.6rem,6vw,5rem)] leading-[0.92] font-extrabold tracking-tight">
                  See every <span className="text-coral">gigabyte.</span>
                  <br />
                  Down to the SSD.
                </h1>
                <p className="mt-5 max-w-md text-lg text-ink/65">
                  MacDissect takes your disk apart so you can see exactly what's filling it, then
                  reclaim the space safely.
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <DownloadButton />
                  <Link
                    to="/pricing"
                    className="inline-flex items-center gap-2 rounded-2xl border border-ink/15 bg-cream/70 px-5 py-3.5 font-bold backdrop-blur transition-colors hover:bg-cream"
                  >
                    $10 lifetime Pro <ArrowRight className="size-4" />
                  </Link>
                  <span className="flex items-center gap-2 text-sm font-semibold text-ink/50">
                    <motion.span
                      animate={{ y: [0, 5, 0] }}
                      transition={{ duration: 1.6, repeat: Infinity }}
                    >
                      <ArrowDown className="size-4" />
                    </motion.span>
                    Scroll to tear it down
                  </span>
                </div>
              </motion.div>

              <AnimatePresence mode="wait">
                {stage > 0 && (
                  <motion.div
                    key={stage}
                    initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <p className="text-xs font-bold tracking-[0.2em] text-ink/45 uppercase">
                      {current.eyebrow}
                    </p>
                    <h2 className="mt-3 font-display text-[clamp(2.2rem,4.5vw,3.75rem)] leading-[0.95] font-extrabold tracking-tight">
                      {current.title}
                    </h2>
                    <p className="mt-4 max-w-md text-lg text-ink/65">{current.body}</p>
                    {stage === stages.length - 1 && (
                      <DownloadButton label="Dissect your Mac" className="mt-6" />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* 3D stage */}
          <div className="relative min-h-0 lg:col-span-7">
            <ThreeStage progress={progress} />
          </div>
        </div>

        {/* Progress rail */}
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2">
          {stages.slice(1).map((s, i) => (
            <span
              key={s.title}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                stage >= i + 1 ? "w-8 bg-ink" : "w-3 bg-ink/15"
              }`}
            />
          ))}
        </div>
        <motion.div
          className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-ink/10"
          style={{ scaleX: barProgress }}
        />
      </div>
    </section>
  );
}
