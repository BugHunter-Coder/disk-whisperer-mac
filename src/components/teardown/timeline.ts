/** Shared scroll timeline for the teardown, as fractions of the section's scroll progress. */
export const T = {
  lidFold: [0.06, 0.16],
  lidSlide: [0.16, 0.24],
  explode: [0.2, 0.38],
  focus: [0.52, 0.64],
  ssdExplode: [0.66, 0.78],
  data: [0.8, 0.93],
} as const;

/** Folder sizes from the product screenshot shown on the display. */
export const bars = [
  { label: "Library", size: "17.5 GB", gb: 17.51, color: "#7fb0ee", side: "#5b8fd6" },
  { label: "Movies", size: "12.9 GB", gb: 12.9, color: "#f0b27a", side: "#d0955a" },
  { label: "Pictures", size: "3.5 GB", gb: 3.46, color: "#86d98a", side: "#5fbf62" },
  { label: "Downloads", size: "3.4 GB", gb: 3.4, color: "#dc8fe0", side: "#c05fc5" },
  { label: "Developer", size: "3.4 GB", gb: 3.38, color: "#ecd06a", side: "#d4b53f" },
  { label: "Music", size: "3.3 GB", gb: 3.25, color: "#6fd8d6", side: "#4cc3c1" },
];

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/** 0→1 as `p` moves through `range`, with smooth ease-in-out. */
export function phase(p: number, range: readonly [number, number]) {
  const t = clamp01((p - range[0]) / (range[1] - range[0]));
  return t * t * (3 - 2 * t);
}

export const mix = (a: number, b: number, t: number) => a + (b - a) * t;
