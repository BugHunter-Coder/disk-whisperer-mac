import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { bars, mix, phase, T } from "../timeline";
import { buildMac, W } from "./macModel";

/**
 * Renders the laptop teardown with three.js. `getProgress` returns the section's scroll
 * progress (0→1); everything in the scene is a pure function of it.
 */

type Label = { el: HTMLElement; anchor: () => THREE.Vector3; opacity: (p: number) => number };

const partLabel = (p: number) => phase(p, [0.3, 0.38]) * (1 - phase(p, [0.5, 0.54]));

export function createTeardownScene(
  container: HTMLElement,
  overlay: HTMLElement,
  getProgress: () => number,
  screenshotUrl: string,
) {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.95;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.domElement.style.display = "block";
  container.appendChild(renderer.domElement);

  let lastP = -1;
  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
  scene.environment = envRT.texture;

  const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);

  // Lights: a soft key light for shadows, the room environment does the reflections.
  const key = new THREE.DirectionalLight(0xffffff, 2.2);
  key.position.set(4, 9, 5);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.left = -5;
  key.shadow.camera.right = 5;
  key.shadow.camera.top = 5;
  key.shadow.camera.bottom = -5;
  key.shadow.radius = 6;
  key.shadow.bias = -0.0004;
  scene.add(key);
  scene.add(new THREE.HemisphereLight(0xfff6ea, 0xd9e6f2, 0.35));

  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 40),
    new THREE.ShadowMaterial({ color: 0x191925, opacity: 0.22 }),
  );
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  const screenshot = new THREE.TextureLoader().load(screenshotUrl, () => {
    lastP = -1; // redraw once the display image has loaded
  });
  screenshot.colorSpace = THREE.SRGBColorSpace;
  screenshot.anisotropy = renderer.capabilities.getMaxAnisotropy();

  const mac = buildMac(screenshot);
  scene.add(mac.root);
  const glow = mac.ssd.getObjectByName("glow") as THREE.Mesh<
    THREE.BufferGeometry,
    THREE.MeshBasicMaterial
  >;

  /* DOM labels that follow 3D anchors */
  const labels: Label[] = [];
  const addLabel = (
    text: string,
    className: string,
    anchor: () => THREE.Vector3,
    opacity: Label["opacity"],
  ) => {
    const el = document.createElement("span");
    el.textContent = text;
    el.className = `pointer-events-none absolute top-0 left-0 whitespace-nowrap rounded-full px-3 py-1 text-xs font-bold shadow-sm will-change-transform ${className}`;
    el.style.opacity = "0";
    overlay.appendChild(el);
    labels.push({ el, anchor, opacity });
  };
  const worldLeftEdge =
    (obj: THREE.Object3D, dx = -W / 2 - 0.15) =>
    () =>
      obj.localToWorld(new THREE.Vector3(dx, 0, 0));
  addLabel(
    "Display",
    "bg-ink text-cream",
    () => mac.lidPivot.localToWorld(new THREE.Vector3(-W / 2 - 0.15, 0, 1.06)),
    partLabel,
  );
  addLabel("Top case & keyboard", "bg-ink text-cream", worldLeftEdge(mac.topCase), partLabel);
  addLabel("Logic board", "bg-ink text-cream", worldLeftEdge(mac.logic, -1.4), partLabel);
  addLabel("Battery", "bg-ink text-cream", worldLeftEdge(mac.battery, -1.6), partLabel);
  addLabel(
    "SSD",
    "bg-mint text-ink",
    worldLeftEdge(mac.ssd, -0.8),
    (p) => partLabel(p) || phase(p, [0.55, 0.6]) * (1 - phase(p, [0.66, 0.7])),
  );
  addLabel("Bottom case", "bg-ink text-cream", worldLeftEdge(mac.bottom), partLabel);
  const ssdPartTags = (p: number) => phase(p, [0.72, 0.76]) * (1 - phase(p, [0.8, 0.83]));
  addLabel(
    "Controller",
    "bg-sky text-ink",
    () => mac.ssdController.localToWorld(new THREE.Vector3(0, 0.05, 0)),
    ssdPartTags,
  );
  addLabel(
    "NAND flash",
    "bg-lilac text-ink",
    () => mac.ssdNand[2]!.localToWorld(new THREE.Vector3(0, 0.05, 0)),
    ssdPartTags,
  );
  addLabel(
    "Label",
    "bg-cream text-ink",
    () => mac.ssdSticker.localToWorld(new THREE.Vector3(0.5, 0.02, 0)),
    ssdPartTags,
  );
  mac.bars.forEach((bar, i) => {
    const info = bars[i]!;
    addLabel(
      `${info.label} · ${info.size}`,
      "bg-cream/95 text-ink ring-1 ring-ink/10",
      () => bar.mesh.localToWorld(new THREE.Vector3(0, 1.08, 0)),
      (p) => phase(p, [T.data[0] + 0.04 + i * 0.012, T.data[0] + 0.08 + i * 0.012]),
    );
  });

  /* Layout */
  let width = 0;
  let height = 0;
  const resize = () => {
    width = container.clientWidth;
    height = container.clientHeight;
    renderer.setSize(width, height, false);
    renderer.domElement.style.width = `${width}px`;
    renderer.domElement.style.height = `${height}px`;
    camera.aspect = width / Math.max(1, height);
    camera.updateProjectionMatrix();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(container);
  resize();

  /* Pose everything for a scroll position */
  const camPos = new THREE.Vector3();
  const camTarget = new THREE.Vector3();
  const tmp = new THREE.Vector3();

  const pose = (p: number) => {
    const fold = phase(p, T.lidFold);
    const slide = phase(p, T.lidSlide);
    const ex = phase(p, T.explode);
    const focus = phase(p, T.focus);
    const inner = phase(p, T.ssdExplode);
    const data = phase(p, T.data);
    const away = focus * 9; // how far other parts fly out during the SSD dive

    // Lid: open → flat behind → over the stack
    mac.lidPivot.rotation.x = -THREE.MathUtils.degToRad(mix(112, 180, fold));
    mac.lidPivot.position.z = mix(-1.06, 1.06, slide);
    mac.lidPivot.position.y = mix(0.226, 0.226 + 3.1, ex) + away;

    mac.topCase.position.y = mix(0.2, 2.05, ex) + away;
    mac.logic.position.y = mix(0.1, 1.05, ex) + away;
    mac.battery.position.y = mix(0.1, 0.1, ex) + away;
    mac.bottom.position.y = mix(0, -2.1, ex) - away;
    mac.ssd.position.y = mix(mix(0.14, -1.0, ex), 0.2, focus);
    mac.ssd.rotation.y = mix(0, -0.35, focus);

    // Inside the SSD
    mac.ssdSticker.position.y = 0.048 + inner * 0.95 + data * 6;
    mac.ssdController.position.y = 0.027 + inner * 0.58 + data * 6;
    mac.ssdNand.forEach((nand, i) => {
      const lift = phase(p, [T.ssdExplode[0] + i * 0.015, T.ssdExplode[1]]);
      nand.position.y = 0.027 + lift * (0.3 + i * 0.07) * (1 - data);
    });
    glow.material.opacity = focus * 0.12;

    mac.bars.forEach((bar, i) => {
      const grow = phase(p, [T.data[0] + i * 0.012, T.data[1] - (5 - i) * 0.004]);
      bar.mesh.visible = grow > 0.001;
      bar.mesh.scale.y = Math.max(0.0001, grow * bar.height);
    });

    // Camera: hero three-quarter view → wide exploded view → dive to the SSD
    const wide = ex * (1 - focus);
    camPos.set(mix(5.6, 9.2, wide), mix(4.1, 7.2, wide), mix(6.6, 10.4, wide));
    camTarget.set(0, mix(0.55, 0.45, wide), 0);
    tmp.set(2.6, 2.5, 3.1);
    camPos.lerp(tmp, focus);
    camTarget.lerp(tmp.set(0, mix(0.2, 0.55, data), 0.05), focus);
    // Narrow viewports get a little more distance.
    const aspectPad = width / Math.max(1, height) < 1 ? 1.55 : 1;
    camera.position.copy(camTarget).addScaledVector(camPos.sub(camTarget), aspectPad);
    camera.lookAt(camTarget);
    ground.position.y = mix(0, -2.1, ex) - 0.02;
    ground.visible = focus < 0.02;
  };

  const projected = new THREE.Vector3();
  const updateLabels = (p: number) => {
    for (const label of labels) {
      const alpha = label.opacity(p);
      label.el.style.opacity = alpha.toFixed(3);
      if (alpha <= 0.001) continue;
      projected.copy(label.anchor()).project(camera);
      const x = (projected.x * 0.5 + 0.5) * width;
      const y = (-projected.y * 0.5 + 0.5) * height;
      label.el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -120%)`;
    }
  };

  /* Render only while the section is on screen */
  let frame = 0;
  let visible = true;
  const loop = () => {
    frame = requestAnimationFrame(loop);
    if (!visible) return;
    const p = getProgress();
    if (Math.abs(p - lastP) < 0.00005 && lastP >= 0) return;
    lastP = p;
    pose(p);
    renderer.render(scene, camera);
    updateLabels(p);
  };
  const io = new IntersectionObserver(([entry]) => {
    visible = entry?.isIntersecting ?? true;
    if (visible) lastP = -1;
  });
  io.observe(container);
  loop();

  return () => {
    cancelAnimationFrame(frame);
    observer.disconnect();
    io.disconnect();
    for (const label of labels) label.el.remove();
    mac.dispose();
    screenshot.dispose();
    envRT.dispose();
    pmrem.dispose();
    ground.geometry.dispose();
    (ground.material as THREE.Material).dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
