import { motion, useTransform, type MotionValue } from "motion/react";
import type { CSSProperties, ReactNode } from "react";

/** Stage units: the Mac's footprint is BASE_W × BASE_D pixels before the stage is scaled. */
export const BASE_W = 520;
export const BASE_D = 340;
export const SSD_W = 300;
export const SSD_D = 84;

const face: CSSProperties = { backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" };

/** A flat plate positioned inside the 3D stage. */
export function Plate({
  w,
  d,
  x = 0,
  y = 0,
  className = "",
  style,
  children,
}: {
  w: number;
  d: number;
  x?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  return (
    <div
      className={`absolute ${className}`}
      style={{ width: w, height: d, left: x, top: y, transformStyle: "preserve-3d", ...style }}
    >
      {children}
    </div>
  );
}

export function LidOuter() {
  return (
    <div
      className="absolute inset-0 rounded-[18px] bg-[linear-gradient(135deg,#e9e9ee,#c9cad1_45%,#dedfe4)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.6)]"
      style={face}
    >
      <div className="absolute top-1/2 left-1/2 size-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#f5f5f7,#b9bac2)] opacity-70" />
    </div>
  );
}

export function LidScreen({ src }: { src: string }) {
  return (
    <div
      className="absolute inset-0 overflow-hidden rounded-[18px] bg-[#0d0d12] p-[10px] shadow-[inset_0_0_0_2px_#2a2a33]"
      style={{ ...face, transform: "rotateX(180deg)" }}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[8px] bg-black">
        <img
          src={src}
          alt="MacDissect showing a treemap of a home folder"
          className="h-full w-full object-cover object-left-top"
          draggable={false}
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.16),transparent_40%)]" />
      </div>
    </div>
  );
}

export function TopCase() {
  const rows = [14, 14, 13, 12, 11];
  return (
    <div className="absolute inset-0 rounded-[18px] bg-[linear-gradient(160deg,#dcdde2,#c3c4cb)] p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.5)]">
      <div className="mx-auto flex h-[52%] w-[88%] flex-col gap-[3px] rounded-md bg-[#1b1b22] p-[6px]">
        {rows.map((n, r) => (
          <div key={r} className="flex flex-1 gap-[3px]">
            {Array.from({ length: n }).map((_, i) => (
              <span
                key={i}
                className="flex-1 rounded-[2px] bg-[#2d2d36] shadow-[inset_0_-1px_0_rgba(0,0,0,0.5)]"
                style={r === 4 && i === 5 ? { flex: 5 } : undefined}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="mx-auto mt-4 h-[30%] w-[42%] rounded-lg bg-[linear-gradient(160deg,#cfd0d6,#b9bac1)] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)]" />
    </div>
  );
}

function Chip({
  className = "",
  label,
  style,
}: {
  className?: string;
  label?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`absolute grid place-items-center rounded-[4px] bg-[linear-gradient(145deg,#2b2b33,#15151b)] text-[7px] font-bold tracking-wider text-white/60 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] ${className}`}
      style={style}
    >
      {label}
    </div>
  );
}

export function LogicBoard() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[14px] bg-[linear-gradient(135deg,#16341f,#0f2416)] shadow-[inset_0_0_0_1px_rgba(52,211,153,0.25)]">
      <svg
        className="absolute inset-0 h-full w-full opacity-40"
        viewBox="0 0 440 140"
        preserveAspectRatio="none"
      >
        {Array.from({ length: 14 }).map((_, i) => (
          <path
            key={i}
            d={`M0 ${10 + i * 9} H${120 + (i % 4) * 40} L${150 + (i % 4) * 40} ${20 + i * 7} H440`}
            stroke="#34d399"
            strokeWidth="0.6"
            fill="none"
          />
        ))}
      </svg>
      <Chip label="SoC" className="h-[62px] w-[62px] text-[9px]" style={{ left: 150, top: 36 }} />
      <Chip className="h-[26px] w-[40px]" style={{ left: 226, top: 36 }} />
      <Chip className="h-[26px] w-[40px]" style={{ left: 226, top: 72 }} />
      <Chip className="h-[18px] w-[28px]" style={{ left: 90, top: 30 }} />
      <Chip className="h-[18px] w-[28px]" style={{ left: 90, top: 60 }} />
      <Chip className="h-[22px] w-[22px]" style={{ left: 300, top: 50 }} />
      {[30, 50, 70, 90].map((t) => (
        <span
          key={t}
          className="absolute h-[6px] w-[10px] rounded-[1px] bg-[#c9a24a]"
          style={{ left: 20, top: t }}
        />
      ))}
    </div>
  );
}

export function Battery() {
  return (
    <div className="absolute inset-0 flex gap-2 rounded-[14px] p-2">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="flex-1 rounded-[8px] bg-[linear-gradient(180deg,#34343d,#22222a)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
        >
          <div className="mx-auto mt-2 h-1 w-1/2 rounded-full bg-sun/70" />
        </div>
      ))}
    </div>
  );
}

export function BottomCase() {
  return (
    <div className="absolute inset-0 rounded-[18px] bg-[linear-gradient(160deg,#d7d8de,#b8b9c0)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.45),0_40px_60px_-30px_rgba(25,25,37,0.55)]">
      {[
        [24, 24],
        [BASE_W - 48, 24],
        [24, BASE_D - 48],
        [BASE_W - 48, BASE_D - 48],
      ].map(([l, t]) => (
        <span
          key={`${l}-${t}`}
          className="absolute size-6 rounded-full bg-[#9d9ea6] shadow-inner"
          style={{ left: l, top: t }}
        />
      ))}
      <div className="absolute inset-x-[30%] top-[46%] h-2 rounded-full bg-black/10" />
    </div>
  );
}

/* ---------- SSD parts ---------- */

export function SsdPcb() {
  return (
    <div className="absolute inset-0 rounded-[6px] bg-[linear-gradient(135deg,#0f2b1a,#0a1f13)] shadow-[inset_0_0_0_1px_rgba(52,211,153,0.35),0_20px_40px_-20px_rgba(52,211,153,0.6)]">
      <div className="absolute top-2 bottom-2 left-1 flex w-3 flex-col justify-between">
        {Array.from({ length: 9 }).map((_, i) => (
          <span key={i} className="h-1 rounded-[1px] bg-[#d4ab4f]" />
        ))}
      </div>
      <span className="absolute top-1/2 right-2 size-3 -translate-y-1/2 rounded-full border-2 border-[#d4ab4f]" />
    </div>
  );
}

export function SsdSticker() {
  return (
    <div className="absolute inset-0 flex items-center justify-between rounded-[5px] bg-[linear-gradient(135deg,#f5f5f7,#d9dae0)] px-4 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)]">
      <div>
        <p className="text-[11px] font-extrabold tracking-wide text-ink">NVMe SSD</p>
        <p className="text-[8px] font-semibold text-ink/50">1 TB · M.2 2280</p>
      </div>
      <div className="grid grid-cols-6 gap-[1px]">
        {Array.from({ length: 24 }).map((_, i) => (
          <span
            key={i}
            className={`size-[4px] ${(i * 7) % 3 === 0 ? "bg-ink" : "bg-transparent"}`}
          />
        ))}
      </div>
    </div>
  );
}

export function NandChip({ index }: { index: number }) {
  return (
    <div className="absolute inset-0 grid place-items-center rounded-[4px] bg-[linear-gradient(145deg,#30303a,#17171d)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1),0_10px_20px_-10px_rgba(0,0,0,0.6)]">
      <span className="text-[7px] font-bold tracking-widest text-white/50">NAND {index + 1}</span>
    </div>
  );
}

export function ControllerChip() {
  return (
    <div className="absolute inset-0 grid place-items-center rounded-[4px] bg-[linear-gradient(145deg,#3a3a46,#1c1c24)] shadow-[inset_0_0_0_1px_rgba(56,189,248,0.4),0_0_24px_rgba(56,189,248,0.35)]">
      <span className="text-[7px] font-bold tracking-widest text-sky">CTRL</span>
    </div>
  );
}

/**
 * A 3D bar standing on the stage plane: top face plus front and right faces.
 * `grow` (0→1) raises it from flat to full height using transforms only.
 */
export function DataBar({
  w,
  d,
  h,
  x,
  y,
  color,
  side,
  label,
  size,
  grow,
}: {
  w: number;
  d: number;
  h: number;
  x: number;
  y: number;
  color: string;
  side: string;
  label: string;
  size: string;
  grow: MotionValue<number>;
}) {
  const topZ = useTransform(grow, (g) => h * g);
  const opacity = useTransform(grow, [0, 0.15], [0, 1]);
  return (
    <motion.div
      className="absolute"
      style={{ left: x, top: y, width: w, height: d, transformStyle: "preserve-3d", opacity }}
    >
      {/* front face */}
      <motion.div
        className="absolute left-0"
        style={{
          top: d,
          width: w,
          height: h,
          background: side,
          transformOrigin: "top",
          rotateX: 90,
          scaleY: grow,
        }}
      />
      {/* right face */}
      <motion.div
        className="absolute top-0"
        style={{
          left: w,
          width: h,
          height: d,
          background: side,
          filter: "brightness(0.85)",
          transformOrigin: "left",
          rotateY: -90,
          scaleX: grow,
        }}
      />
      {/* top face */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-center px-1.5 text-ink"
        style={{ background: color, z: topZ, boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.35)" }}
      >
        <span className="text-[8px] leading-tight font-extrabold tracking-tight">{label}</span>
        <span className="text-[8px] leading-tight font-bold opacity-70">{size}</span>
      </motion.div>
    </motion.div>
  );
}
