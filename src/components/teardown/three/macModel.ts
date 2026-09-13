import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { bars } from "../timeline";

/**
 * A procedural laptop, built from simple geometry with physically based materials,
 * split into the parts the teardown pulls apart. Units are roughly decimetres.
 */

export const W = 3.04;
export const D = 2.12;

export type MacModel = {
  root: THREE.Group;
  bottom: THREE.Group;
  battery: THREE.Group;
  logic: THREE.Group;
  topCase: THREE.Group;
  lidPivot: THREE.Group;
  ssd: THREE.Group;
  ssdSticker: THREE.Object3D;
  ssdController: THREE.Object3D;
  ssdNand: THREE.Object3D[];
  bars: { mesh: THREE.Mesh; height: number }[];
  ssdTop: number;
  dispose: () => void;
};

const disposables: { dispose: () => void }[] = [];
function track<T extends { dispose: () => void }>(item: T): T {
  disposables.push(item);
  return item;
}

function rounded(w: number, h: number, d: number, r: number, segments = 4) {
  return track(new RoundedBoxGeometry(w, h, d, segments, Math.min(r, h / 2 - 0.0005)));
}

function box(w: number, h: number, d: number) {
  return track(new THREE.BoxGeometry(w, h, d));
}

function mesh(geometry: THREE.BufferGeometry, material: THREE.Material, shadows = true) {
  const m = new THREE.Mesh(geometry, material);
  m.castShadow = shadows;
  m.receiveShadow = shadows;
  return m;
}

function labelTexture(
  lines: { text: string; font: string; y: number; color: string }[],
  w = 512,
  h = 140,
) {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#f3f3f5";
  ctx.fillRect(0, 0, w, h);
  for (const line of lines) {
    ctx.fillStyle = line.color;
    ctx.font = line.font;
    ctx.fillText(line.text, 28, line.y);
  }
  for (let i = 0; i < 36; i++) {
    if ((i * 7) % 3 === 0) {
      ctx.fillStyle = "#191925";
      ctx.fillRect(w - 110 + (i % 6) * 13, 34 + Math.floor(i / 6) * 13, 11, 11);
    }
  }
  const texture = track(new THREE.CanvasTexture(canvas));
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

export function buildMac(screenshot: THREE.Texture): MacModel {
  disposables.length = 0;

  // Materials
  const aluminum = track(
    new THREE.MeshPhysicalMaterial({
      color: 0xc3c6cc,
      metalness: 1,
      roughness: 0.24,
      clearcoat: 0.5,
      clearcoatRoughness: 0.18,
      envMapIntensity: 1.4,
    }),
  );
  const aluminumDark = track(
    new THREE.MeshPhysicalMaterial({
      color: 0x8e9098,
      metalness: 1,
      roughness: 0.36,
      envMapIntensity: 1.3,
    }),
  );
  const keyMat = track(new THREE.MeshStandardMaterial({ color: 0x151518, roughness: 0.55 }));
  const wellMat = track(new THREE.MeshStandardMaterial({ color: 0x0b0b0d, roughness: 0.8 }));
  const glass = track(
    new THREE.MeshPhysicalMaterial({
      color: 0xc9cbd1,
      metalness: 0.5,
      roughness: 0.16,
      clearcoat: 1,
    }),
  );
  const bezel = track(
    new THREE.MeshPhysicalMaterial({ color: 0x040405, roughness: 0.12, clearcoat: 1 }),
  );
  const screenMat = track(new THREE.MeshBasicMaterial({ map: screenshot, toneMapped: false }));
  const pcb = track(
    new THREE.MeshStandardMaterial({ color: 0x0d3a22, roughness: 0.55, metalness: 0.15 }),
  );
  const gold = track(
    new THREE.MeshStandardMaterial({ color: 0xd8ac50, metalness: 1, roughness: 0.28 }),
  );
  const chipMat = track(
    new THREE.MeshStandardMaterial({ color: 0x1b1b20, roughness: 0.42, metalness: 0.2 }),
  );
  const cellMat = track(new THREE.MeshStandardMaterial({ color: 0x2b2b31, roughness: 0.72 }));
  const cellStripe = track(new THREE.MeshStandardMaterial({ color: 0xffc93c, roughness: 0.6 }));
  const glowMat = track(
    new THREE.MeshBasicMaterial({
      color: 0x34d399,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    }),
  );

  const root = new THREE.Group();

  /* Bottom case */
  const bottom = new THREE.Group();
  const shell = mesh(rounded(W, 0.07, D, 0.06), aluminum);
  shell.position.y = 0.035;
  bottom.add(shell);
  for (const [x, z] of [
    [-1.3, -0.85],
    [1.3, -0.85],
    [-1.3, 0.85],
    [1.3, 0.85],
  ] as const) {
    const foot = mesh(track(new THREE.CylinderGeometry(0.09, 0.09, 0.012, 32)), aluminumDark);
    foot.position.set(x, 0.075, z);
    bottom.add(foot);
  }
  root.add(bottom);

  /* Battery */
  const battery = new THREE.Group();
  for (let i = 0; i < 6; i++) {
    const cell = mesh(rounded(0.42, 0.05, 0.66, 0.02), cellMat);
    cell.position.set(-1.25 + i * 0.5, 0, 0);
    const stripe = mesh(box(0.2, 0.004, 0.04), cellStripe, false);
    stripe.position.set(-1.25 + i * 0.5, 0.027, -0.22);
    battery.add(cell, stripe);
  }
  battery.position.set(0, 0.1, 0.52);
  root.add(battery);

  /* Logic board */
  const logic = new THREE.Group();
  logic.add(mesh(box(2.5, 0.02, 0.62), pcb));
  const soc = mesh(rounded(0.42, 0.05, 0.42, 0.015), aluminumDark);
  soc.position.set(0.1, 0.035, 0);
  logic.add(soc);
  for (const [x, z, w, d] of [
    [0.52, -0.12, 0.2, 0.13],
    [0.52, 0.12, 0.2, 0.13],
    [-0.4, -0.14, 0.16, 0.1],
    [-0.4, 0.12, 0.16, 0.1],
    [0.85, 0, 0.12, 0.12],
    [-0.75, 0, 0.1, 0.18],
  ] as const) {
    const chip = mesh(box(w, 0.025, d), chipMat);
    chip.position.set(x, 0.022, z);
    logic.add(chip);
  }
  for (let i = 0; i < 4; i++) {
    const pad = mesh(box(0.06, 0.012, 0.035), gold, false);
    pad.position.set(-1.18, 0.016, -0.2 + i * 0.13);
    logic.add(pad);
  }
  logic.position.set(0, 0.1, -0.55);
  root.add(logic);

  /* SSD */
  const ssd = new THREE.Group();
  const board = mesh(box(1.34, 0.022, 0.36), pcb);
  ssd.add(board);
  const connector = mesh(box(0.07, 0.024, 0.3), gold);
  connector.position.set(-0.66, 0.002, 0);
  ssd.add(connector);
  const glow = new THREE.Mesh(box(1.5, 0.001, 0.52), glowMat);
  glow.position.y = -0.02;
  glow.name = "glow";
  ssd.add(glow);

  const ssdController = mesh(box(0.22, 0.032, 0.22), chipMat);
  ssdController.position.set(-0.43, 0.027, 0);
  ssd.add(ssdController);

  const ssdNand: THREE.Object3D[] = [];
  for (let i = 0; i < 4; i++) {
    const nand = mesh(box(0.2, 0.032, 0.28), chipMat);
    nand.position.set(-0.14 + i * 0.24, 0.027, 0);
    ssd.add(nand);
    ssdNand.push(nand);
  }

  const stickerTex = labelTexture([
    { text: "NVMe SSD", font: "800 46px system-ui, sans-serif", y: 64, color: "#191925" },
    { text: "1 TB · M.2 2280", font: "600 26px system-ui, sans-serif", y: 104, color: "#6b6b75" },
  ]);
  const ssdSticker = mesh(
    box(1.14, 0.006, 0.31),
    track(new THREE.MeshStandardMaterial({ map: stickerTex, roughness: 0.75 })),
  );
  ssdSticker.position.set(0.05, 0.048, 0);
  ssd.add(ssdSticker);

  const ssdTop = 0.011;
  const maxGb = Math.max(...bars.map((b) => b.gb));
  const barMeshes = bars.map((b, i) => {
    const height = 0.14 + (b.gb / maxGb) * 1.05;
    const mat = track(
      new THREE.MeshPhysicalMaterial({
        color: b.side,
        roughness: 0.28,
        clearcoat: 0.6,
        clearcoatRoughness: 0.2,
      }),
    );
    const barGeometry = rounded(0.18, 1, 0.26, 0.02);
    barGeometry.translate(0, 0.5, 0); // grow upwards from the board
    const bar = mesh(barGeometry, mat);
    bar.position.set(-0.56 + i * 0.225, ssdTop, 0);
    bar.scale.y = 0.0001;
    bar.visible = false;
    ssd.add(bar);
    return { mesh: bar, height };
  });

  ssd.position.set(0, 0.14, 0.1);
  root.add(ssd);

  /* Top case with keyboard and trackpad */
  const topCase = new THREE.Group();
  topCase.add(mesh(rounded(W, 0.05, D, 0.05), aluminum));
  const well = mesh(box(2.72, 0.006, 1.02), wellMat, false);
  well.position.set(0, 0.026, -0.36);
  topCase.add(well);

  const keyGeometry = rounded(0.155, 0.03, 0.155, 0.025, 3);
  const rows = [14, 14, 14, 13, 12];
  const keyCount = rows.reduce((a, b) => a + b, 0) + 1;
  const keys = new THREE.InstancedMesh(keyGeometry, keyMat, keyCount);
  keys.castShadow = true;
  const m = new THREE.Matrix4();
  let k = 0;
  rows.forEach((n, r) => {
    const pitch = 2.6 / 14;
    const offset = ((14 - n) * pitch) / 2;
    for (let i = 0; i < n; i++) {
      m.makeTranslation(-1.3 + offset + pitch / 2 + i * pitch, 0.04, -0.8 + r * 0.19);
      keys.setMatrixAt(k++, m);
    }
  });
  // space bar
  m.compose(new THREE.Vector3(0, 0.04, 0.15), new THREE.Quaternion(), new THREE.Vector3(5.2, 1, 1));
  keys.setMatrixAt(k, m);
  topCase.add(keys);

  const trackpad = mesh(rounded(1.3, 0.01, 0.74, 0.004), glass, false);
  trackpad.position.set(0, 0.026, 0.58);
  topCase.add(trackpad);
  topCase.position.y = 0.2;
  root.add(topCase);

  /* Lid: pivot on the back edge, display facing down when closed */
  const lidPivot = new THREE.Group();
  lidPivot.position.set(0, 0.226, -D / 2);
  const lid = new THREE.Group();
  lid.position.set(0, 0.022, D / 2);
  lid.add(mesh(rounded(W, 0.04, D - 0.02, 0.05), aluminum));
  const bezelMesh = mesh(box(W - 0.06, 0.004, D - 0.08), bezel, false);
  bezelMesh.position.y = -0.021;
  lid.add(bezelMesh);
  const screen = new THREE.Mesh(track(new THREE.PlaneGeometry(2.82, 1.81)), screenMat);
  screen.rotation.x = Math.PI / 2; // faces down when closed, towards the viewer when open
  screen.position.set(0, -0.0235, 0.02);
  lid.add(screen);
  lidPivot.add(lid);
  root.add(lidPivot);

  return {
    root,
    bottom,
    battery,
    logic,
    topCase,
    lidPivot,
    ssd,
    ssdSticker,
    ssdController,
    ssdNand,
    bars: barMeshes,
    ssdTop,
    dispose: () => {
      for (const item of disposables) item.dispose();
      disposables.length = 0;
    },
  };
}
