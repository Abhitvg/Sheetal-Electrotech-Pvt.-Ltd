"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { Link } from "@/i18n/routing";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Eye,
  Factory,
  Sparkles,
  X,
  RotateCw,
  Sun,
  Layers,
  Maximize2,
  Check,
} from "lucide-react";

export interface RoomProduct {
  name: string;
  category: string;
  href: string;
  facilities: { slug: string; name: string }[];
  description: string;
  specs: [string, string][];
  metrics: { label: string; value: string; percent: number }[];
  technical: string[];
  manufacturing: string[];
}

export const ROOM_PRODUCTS: RoomProduct[] = [
  {
    name: "LED Bulb",
    category: "Everyday Lighting",
    href: "/products/led-lighting/bulbs",
    facilities: [
      { slug: "injection-moulding", name: "Injection Moulding" },
      { slug: "smt", name: "SMT & Electronics" },
      { slug: "assembly-packing", name: "Assembly & Packing" },
    ],
    description:
      "High-efficiency LED bulbs (5W–50W) for residential and commercial use, built completely in-house from thermally conductive housings to SMT driver circuits.",
    specs: [
      ["Wattage Range", "5W – 50W"],
      ["Base Fittings", "B22 · E27"],
      ["Efficacy", "> 105 lm/W"],
      ["Surge Protection", "Up to 4kV In-built"],
      ["Supply Model", "OEM / Private Label"],
    ],
    metrics: [
      { label: "Luminous Efficacy", value: "108 lm/W", percent: 92 },
      { label: "Thermal Dissipation", value: "98.4%", percent: 98 },
      { label: "Surge Immunity", value: "4.0 kV", percent: 88 },
      { label: "Power Factor", value: "0.98", percent: 96 },
    ],
    technical: [
      "Thermally engineered aluminium-plastic composite housing",
      "SMT metal-core PCB (MCPCB) with high-efficiency 2835 LEDs",
      "Constant current isolated IC driver with over-voltage cut-off",
    ],
    manufacturing: [
      "High-pressure plastic injection moulding for bulb shell",
      "Dual-head high-speed SMT placement for LED array",
      "Automated robotic silicon dispensing and heat-sink press",
      "100% 4-stage aging test and photometric burn-in",
    ],
  },
  {
    name: "LED Batten",
    category: "Linear Lighting",
    href: "/products/led-lighting/battens",
    facilities: [
      { slug: "extrusion", name: "Extrusion" },
      { slug: "smt", name: "SMT & Electronics" },
      { slug: "assembly-packing", name: "Assembly & Packing" },
    ],
    description:
      "Slim-profile architectural batten lights with continuous extruded optical polycarbonate diffusers providing uniform, shadowless illumination.",
    specs: [
      ["Wattage", "10W · 20W · 24W · 36W"],
      ["Length", "1ft · 2ft · 4ft Options"],
      ["Optical Diffuser", "Extruded Polycarbonate (89% transmittance)"],
      ["Power Factor", "> 0.95"],
      ["Color Temp", "3000K · 4000K · 6500K"],
    ],
    metrics: [
      { label: "Optical Transmittance", value: "89.2%", percent: 89 },
      { label: "Beam Uniformity", value: "99.1%", percent: 99 },
      { label: "Color Consistency", value: "< 3 SDCM", percent: 94 },
      { label: "Power Factor", value: "0.96", percent: 95 },
    ],
    technical: [
      "In-house extruded continuous body with snap-fit locking",
      "High-density linear LED boards preventing dark spots",
      "Internal wiring channel with flame-retardant terminal blocks",
    ],
    manufacturing: [
      "Vacuum-calibrated profile extrusion and cut-off saw",
      "Automated SMT assembly for linear LED strips",
      "Driver potting and ultrasonic end-cap bonding",
      "Automated lux and flicker-rate verification",
    ],
  },
  {
    name: "Street Light",
    category: "Outdoor Infrastructure",
    href: "/products/led-lighting/street-lights",
    facilities: [
      { slug: "tool-room", name: "Tool Room" },
      { slug: "smt", name: "SMT & Electronics" },
      { slug: "manual-insertion", name: "Manual Insertion" },
      { slug: "assembly-packing", name: "Assembly & Packing" },
    ],
    description:
      "High-tonnage die-cast outdoor luminaire engineered for municipal highways and industrial perimeters with IP66 ingress sealing and 6kV surge tolerance.",
    specs: [
      ["Wattage", "30W – 150W"],
      ["Ingress Rating", "IP66 Water & Dust Proof"],
      ["Impact Rating", "IK08 Toughened Glass/Lens"],
      ["Surge Rating", "6kV – 10kV Dual Stage"],
      ["Optics", "Batwing Type II/III Street Optics"],
    ],
    metrics: [
      { label: "Ingress Sealing", value: "IP66 Tested", percent: 100 },
      { label: "Surge Tolerance", value: "6.0 kV", percent: 95 },
      { label: "Impact Rating", value: "IK08 Grade", percent: 90 },
      { label: "Operating Temp", value: "-20°C to +55°C", percent: 96 },
    ],
    technical: [
      "Tool-room engineered thermal fins for natural heat convection",
      "Heavy-duty through-hole power components on wave-soldered driver",
      "UV-stabilized secondary optical lens for street throw",
    ],
    manufacturing: [
      "High-pressure tooling and CNC milling for housing",
      "Wave-soldered heavy transformer & surge suppressor board",
      "Silicone gasket compression sealing and pressure test",
      "Hi-pot 3.75kV dielectric withstand safety test",
    ],
  },
  {
    name: "Downlights & Spots",
    category: "Architectural Lighting",
    href: "/products/led-lighting/downlights",
    facilities: [
      { slug: "injection-moulding", name: "Injection Moulding" },
      { slug: "smt", name: "SMT & Electronics" },
      { slug: "assembly-packing", name: "Assembly & Packing" },
    ],
    description:
      "Precision recessed and surface-mount downlights engineered for architectural low-glare commercial environments and luxury residential ceilings.",
    specs: [
      ["Mounting", "Recessed Spring Clip / Surface Housing"],
      ["Wattage", "6W · 9W · 12W · 18W"],
      ["Cut-out Diameters", "75mm – 150mm"],
      ["CRI", "> 85 (High Color Fidelity)"],
      ["Beam Angles", "36° Spot · 60° Flood · 110° Wide"],
    ],
    metrics: [
      { label: "Color Rendering (CRI)", value: "Ra > 86", percent: 92 },
      { label: "Unified Glare Rating", value: "UGR < 19", percent: 95 },
      { label: "Thermal Retention", value: "< 65°C Junction", percent: 90 },
      { label: "Lumen Maintenance", value: "L70 @ 50,000h", percent: 94 },
    ],
    technical: [
      "Injection-moulded anti-glare reflector and baffle ring",
      "Compact constant-current driver fitting through cut-out hole",
      "High-CRI COB or SMD LED engines with aluminum core backing",
    ],
    manufacturing: [
      "Precision mould design and injection moulding of trims",
      "SMT pick-and-place for compact driver and LED board",
      "Twist-lock assembly and spring-tension calibration",
      "Goniophotometer beam angle and CRI testing",
    ],
  },
  {
    name: "Smart Bulb",
    category: "Connected IoT",
    href: "/products/led-lighting/smart-led",
    facilities: [
      { slug: "research-development", name: "R&D" },
      { slug: "smt", name: "SMT & Electronics" },
      { slug: "assembly-packing", name: "Assembly & Packing" },
    ],
    description:
      "WiFi & Bluetooth enabled smart LED bulb supporting 16 million RGB colors, tunable white (2700K–6500K), and seamless voice integration.",
    specs: [
      ["Connectivity", "2.4GHz Wi-Fi + Bluetooth Mesh"],
      ["Color Palette", "16M Colors + Tunable White"],
      ["Compatibility", "Amazon Alexa, Google Home, Smart Life"],
      ["Dimming Range", "1% – 100% Smooth PWM"],
      ["Standby Power", "< 0.5W"],
    ],
    metrics: [
      { label: "Wireless Latency", value: "< 45 ms", percent: 96 },
      { label: "Color Gamut", value: "16M RGB", percent: 100 },
      { label: "Standby Efficiency", value: "< 0.35 W", percent: 98 },
      { label: "PWM Smoothness", value: "16-Bit Res", percent: 94 },
    ],
    technical: [
      "Integrated dual-band IoT microcontroller module",
      "Independent multi-channel linear LED drivers for RGB + CW + WW",
      "Thermal layout keeping antenna isolated from heat sink",
    ],
    manufacturing: [
      "R&D firmware flashing and RF calibration chamber test",
      "High-density SMT assembly with multi-channel LED layout",
      "Thermal paste robotic dispensing and ultrasonic housing weld",
      "Automated wireless pairing and spectrum analysis",
    ],
  },
  {
    name: "Ceiling Light",
    category: "Commercial & Ambient",
    href: "/products/led-lighting/downlights",
    facilities: [
      { slug: "injection-moulding", name: "Injection Moulding" },
      { slug: "extrusion", name: "Extrusion" },
      { slug: "assembly-packing", name: "Assembly & Packing" },
    ],
    description:
      "Wide-angle circular ceiling luminaires providing uniform ambient lighting for offices, hospital corridors, and modern living spaces.",
    specs: [
      ["Wattage", "15W · 22W · 36W"],
      ["Diameter", "220mm – 400mm"],
      ["Mounting", "Flush Surface Mount / Suspended"],
      ["IP Rating", "IP44 Splash Proof"],
      ["Lumen Output", "Up to 3,600 lm"],
    ],
    metrics: [
      { label: "Luminous Output", value: "3,650 lm", percent: 96 },
      { label: "Light Distribution", value: "120° Wide", percent: 95 },
      { label: "Driver Efficiency", value: "91.8%", percent: 92 },
      { label: "Ingress Protection", value: "IP44", percent: 88 },
    ],
    technical: [
      "Edge-lit or backlit optical light guide plate with zero glare",
      "Low-profile injection-moulded housing with easy-twist base plate",
      "High-efficiency flicker-free isolated constant current driver",
    ],
    manufacturing: [
      "Multi-cavity injection moulding for rear pan and front ring",
      "Precision laser dotting on optical light guide plate",
      "Automated driver mounting and perimeter LED tape placement",
      "Integrating sphere luminous flux and uniformity test",
    ],
  },
];

export default function ThreeProductRoom() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);
  const [lightingMode, setLightingMode] = useState<"warm" | "daylight" | "cyber">("warm");
  const [explodedMode, setExplodedMode] = useState(false);

  const activeProduct = ROOM_PRODUCTS[activeIndex];
  const totalProducts = ROOM_PRODUCTS.length;

  // Three.js References
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const dirLightRef = useRef<THREE.DirectionalLight | null>(null);
  const ambLightRef = useRef<THREE.AmbientLight | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  const itemsRef = useRef<{
    group: THREE.Group;
    light: THREE.PointLight;
    homePos: THREE.Vector3;
    homeScale: number;
    focusScale: number;
    tilt: number;
    components?: THREE.Mesh[];
  }[]>([]);

  // Drag interaction state
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const userRotationRef = useRef({ x: 0, y: 0 });

  // Smooth scroll / navigation target
  const scrollRatioRef = useRef(0);
  const targetRatioRef = useRef(0);

  const setProduct = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(totalProducts - 1, index));
    setActiveIndex(clamped);
    targetRatioRef.current = clamped + 1; // 1-indexed for 3D focus
    userRotationRef.current = { x: 0, y: 0 };
    setIsPanelOpen(true);
  }, [totalProducts]);

  // Lighting mode switcher
  useEffect(() => {
    if (!dirLightRef.current || !ambLightRef.current || !sceneRef.current) return;
    if (lightingMode === "warm") {
      dirLightRef.current.color.setHex(0xffedd5);
      dirLightRef.current.intensity = 1.4;
      ambLightRef.current.color.setHex(0xfff7ed);
      ambLightRef.current.intensity = 0.7;
      sceneRef.current.fog = new THREE.FogExp2(0x071322, 0.045);
    } else if (lightingMode === "daylight") {
      dirLightRef.current.color.setHex(0xf0f9ff);
      dirLightRef.current.intensity = 1.6;
      ambLightRef.current.color.setHex(0xe0f2fe);
      ambLightRef.current.intensity = 0.85;
      sceneRef.current.fog = new THREE.FogExp2(0x06111f, 0.045);
    } else {
      // cyber/neon industrial mode
      dirLightRef.current.color.setHex(0xff5e14);
      dirLightRef.current.intensity = 1.8;
      ambLightRef.current.color.setHex(0x38bdf8);
      ambLightRef.current.intensity = 0.5;
      sceneRef.current.fog = new THREE.FogExp2(0x030712, 0.05);
    }
  }, [lightingMode]);

  // Setup Three.js Scene
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        powerPreference: "high-performance",
        alpha: false,
      });
    } catch {
      setHasWebGL(false);
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const bgColor = 0x071322;
    scene.background = new THREE.Color(bgColor);
    scene.fog = new THREE.FogExp2(bgColor, 0.045);

    const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 50);
    cameraRef.current = camera;

    // Materials
    const mat = (color: number, opts: THREE.MeshStandardMaterialParameters = {}) =>
      new THREE.MeshStandardMaterial({
        color,
        roughness: opts.roughness ?? 0.35,
        metalness: opts.metalness ?? 0.3,
        ...opts,
      });

    const addMesh = (
      parent: THREE.Object3D,
      geo: THREE.BufferGeometry,
      m: THREE.Material,
      x = 0,
      y = 0,
      z = 0
    ) => {
      const mesh = new THREE.Mesh(geo, m);
      mesh.position.set(x, y, z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      parent.add(mesh);
      return mesh;
    };

    // Material library
    const metallicFloor = mat(0x0b192c, { roughness: 0.15, metalness: 0.85 });
    const wallDark = mat(0x050d18, { roughness: 0.9, metalness: 0.1 });
    const accentOrange = mat(0xff5e14, { metalness: 0.4, roughness: 0.2 });
    const brushedSteel = mat(0x334155, { metalness: 0.8, roughness: 0.25 });
    const chrome = mat(0xe2e8f0, { metalness: 0.95, roughness: 0.1 });
    const whitePlastic = mat(0xf8fafc, { roughness: 0.35 });
    const lumGlow = mat(0xfff7ed, {
      emissive: 0xffedd5,
      emissiveIntensity: 1.6,
      roughness: 0.1,
    });
    const frostedLens = mat(0xbae6fd, {
      roughness: 0.15,
      metalness: 0.1,
      transparent: true,
      opacity: 0.82,
    });

    // Room Geometry & Studio Stage
    // Reflective Studio Floor
    addMesh(scene, new THREE.BoxGeometry(20, 0.2, 20), metallicFloor, 0, -0.1, 1);
    // Back Architectural Wall
    addMesh(scene, new THREE.BoxGeometry(20, 8, 0.2), wallDark, 0, 4, -5.2);
    // Left Feature Wall
    addMesh(scene, new THREE.BoxGeometry(0.2, 8, 20), wallDark, -9.8, 4, 1);
    // Ceiling
    addMesh(scene, new THREE.BoxGeometry(20, 0.2, 20), wallDark, 0, 8, 1);

    // Glowing architectural grid accents on floor
    const grid = new THREE.GridHelper(18, 18, 0xff5e14, 0x1e293b);
    grid.position.y = 0.02;
    scene.add(grid);

    // Pedestals for items
    addMesh(scene, new THREE.CylinderGeometry(0.5, 0.55, 1.3, 36), brushedSteel, -3.2, 0.65, -2.6);
    addMesh(scene, new THREE.BoxGeometry(3.2, 0.5, 1.0), brushedSteel, 0, 0.25, -3.2);
    addMesh(scene, new THREE.CylinderGeometry(0.55, 0.6, 1.6, 36), brushedSteel, 3.8, 0.8, -1.8);
    addMesh(scene, new THREE.BoxGeometry(0.8, 0.1, 2.2), chrome, -7.8, 2.8, -1.8);

    // Lighting
    const ambLight = new THREE.AmbientLight(0xfff7ed, 0.7);
    ambLightRef.current = ambLight;
    scene.add(ambLight);

    const dirLight = new THREE.DirectionalLight(0xffedd5, 1.4);
    dirLight.position.set(5, 8, 6);
    dirLightRef.current = dirLight;
    scene.add(dirLight);

    // Accent rim light from opposite side
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 0.8);
    rimLight.position.set(-6, 4, -3);
    scene.add(rimLight);

    // Procedural Product Models
    const creators: ((g: THREE.Group) => THREE.Mesh[])[] = [
      // 0: LED Bulb
      (g) => {
        const m1 = addMesh(g, new THREE.SphereGeometry(0.52, 36, 28), lumGlow, 0, 0.6, 0);
        const m2 = addMesh(g, new THREE.CylinderGeometry(0.38, 0.3, 0.35, 36), whitePlastic, 0, -0.02, 0);
        const m3 = addMesh(g, new THREE.CylinderGeometry(0.3, 0.3, 0.45, 36), accentOrange, 0, -0.38, 0);
        const m4 = addMesh(g, new THREE.CylinderGeometry(0.2, 0.2, 0.18, 28), chrome, 0, -0.65, 0);
        return [m1, m2, m3, m4];
      },
      // 1: LED Batten
      (g) => {
        const m1 = addMesh(g, new THREE.BoxGeometry(3.0, 0.2, 0.38), brushedSteel, 0, 0, 0);
        const m2 = addMesh(g, new THREE.BoxGeometry(2.9, 0.05, 0.3), lumGlow, 0, -0.11, 0);
        const m3 = addMesh(g, new THREE.BoxGeometry(0.1, 0.24, 0.42), accentOrange, 1.5, 0, 0);
        const m4 = addMesh(g, new THREE.BoxGeometry(0.1, 0.24, 0.42), accentOrange, -1.5, 0, 0);
        return [m1, m2, m3, m4];
      },
      // 2: Street Light
      (g) => {
        const m1 = addMesh(g, new THREE.CylinderGeometry(0.07, 0.09, 2.0, 20), brushedSteel, 0, 0, 0);
        const m2 = addMesh(g, new THREE.BoxGeometry(0.9, 0.08, 0.08), brushedSteel, 0.4, 0.95, 0);
        const m3 = addMesh(g, new THREE.BoxGeometry(0.9, 0.15, 0.45), brushedSteel, 0.8, 0.92, 0);
        const m4 = addMesh(g, new THREE.BoxGeometry(0.78, 0.04, 0.35), lumGlow, 0.8, 0.85, 0);
        const m5 = addMesh(g, new THREE.BoxGeometry(0.82, 0.03, 0.4), frostedLens, 0.8, 0.83, 0);
        return [m1, m2, m3, m4, m5];
      },
      // 3: Downlights & Spots
      (g) => {
        const m1 = addMesh(g, new THREE.CylinderGeometry(0.7, 0.7, 0.16, 44), brushedSteel, 0, 0, 0);
        const m2 = addMesh(g, new THREE.TorusGeometry(0.55, 0.06, 18, 44), accentOrange, 0, -0.08, 0);
        const m3 = addMesh(g, new THREE.CylinderGeometry(0.48, 0.48, 0.04, 44), lumGlow, 0, -0.08, 0);
        return [m1, m2, m3];
      },
      // 4: Smart Bulb
      (g) => {
        const m1 = addMesh(g, new THREE.SphereGeometry(0.45, 36, 28), lumGlow, 0, 0.52, 0);
        const m2 = addMesh(g, new THREE.CylinderGeometry(0.26, 0.26, 0.38, 28), brushedSteel, 0, -0.02, 0);
        const m3 = addMesh(g, new THREE.TorusGeometry(0.58, 0.025, 16, 48), accentOrange, 0, 0.52, 0);
        const m4 = addMesh(g, new THREE.CylinderGeometry(0.2, 0.2, 0.22, 28), accentOrange, 0, -0.34, 0);
        return [m1, m2, m3, m4];
      },
      // 5: Ceiling Light
      (g) => {
        const m1 = addMesh(g, new THREE.CylinderGeometry(1.0, 1.0, 0.14, 52), whitePlastic, 0, 0, 0);
        const m2 = addMesh(g, new THREE.CylinderGeometry(0.88, 0.88, 0.04, 52), lumGlow, 0, -0.08, 0);
        const m3 = addMesh(g, new THREE.TorusGeometry(1.0, 0.05, 16, 52), accentOrange, 0, -0.04, 0);
        return [m1, m2, m3];
      },
    ];

    const configs = [
      [-3.2, 1.6, -2.6, 0.55, 1.85, 0.1],
      [0, 3.0, -3.2, 0.75, 1.15, 0.1],
      [3.8, 1.9, -1.8, 0.5, 1.55, 0.0],
      [1.8, 4.3, -1.0, 0.6, 1.65, -1.1],
      [-7.8, 3.1, -1.8, 0.5, 1.85, 0.1],
      [-2.0, 4.3, -0.5, 0.65, 1.35, -1.1],
    ];

    itemsRef.current = creators.map((createFn, i) => {
      const group = new THREE.Group();
      const components = createFn(group);
      const [hx, hy, hz, hs, fs, tilt] = configs[i];
      group.position.set(hx, hy, hz);
      group.scale.setScalar(hs);

      const light = new THREE.PointLight(0xffedd5, 1.0, 6);
      light.position.set(0, -0.2, 0.5);
      group.add(light);

      scene.add(group);
      return {
        group,
        light,
        homePos: new THREE.Vector3(hx, hy, hz),
        homeScale: hs,
        focusScale: fs,
        tilt,
        components,
      };
    });

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    camera.position.set(0, 2.3, 6);
    camera.lookAt(0, 2.0, -1.5);

    // Animation Loop
    let time = 0;
    const smoothStep = (x: number) => x * x * (3 - 2 * x);
    const clamp = (val: number, min: number, max: number) =>
      Math.min(max, Math.max(min, val));
    const focusTarget = new THREE.Vector3();

    const renderLoop = () => {
      time += 0.015;
      animFrameIdRef.current = requestAnimationFrame(renderLoop);

      scrollRatioRef.current += (targetRatioRef.current - scrollRatioRef.current) * 0.08;
      const s = scrollRatioRef.current;
      const isDesktop = container.clientWidth > 900;

      // Smooth camera position
      camera.position.set(
        Math.sin(s * 0.55) * 1.5,
        2.3 + Math.sin(s * 0.3) * 0.15,
        5.9 - Math.min(s, 1) * 0.5
      );
      camera.lookAt(0, 2.0, -1.5);
      camera.updateMatrixWorld();

      itemsRef.current.forEach((item, idx) => {
        const dist = Math.abs(s - (idx + 1));
        const weight = smoothStep(clamp(1 - dist / 0.5, 0, 1));

        focusTarget.set(isDesktop ? -1.15 : 0, isDesktop ? 0.25 : 0.65, -3.3);
        camera.localToWorld(focusTarget);

        item.group.position.lerpVectors(item.homePos, focusTarget, weight);

        const targetScale = item.homeScale + (item.focusScale - item.homeScale) * weight;
        item.group.scale.setScalar(targetScale);

        // Rotation: auto-rotation + user drag rotation
        const activeAutoRotation = autoRotate && weight > 0.8 ? time * 0.6 : 0;
        item.group.rotation.set(
          item.tilt * weight + userRotationRef.current.x * weight,
          activeAutoRotation + userRotationRef.current.y * weight,
          0
        );

        // Exploded layer animation on toggle
        if (item.components && item.components.length > 2) {
          item.components.forEach((c, cIdx) => {
            const explodeOffset = explodedMode && weight > 0.8 ? (cIdx - 1.5) * 0.35 : 0;
            c.position.y += (explodeOffset - c.position.y) * 0.1;
          });
        }

        item.light.intensity = 0.6 + weight * 2.5;
      });

      renderer.render(scene, camera);
    };

    renderLoop();

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      window.removeEventListener("resize", handleResize);

      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry?.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material?.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, [totalProducts, autoRotate, explodedMode]);

  useEffect(() => {
    targetRatioRef.current = 1;
  }, []);

  // Mouse & Touch Drag Handlers for 360° product rotation
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - previousMousePositionRef.current.x;
    const deltaY = e.clientY - previousMousePositionRef.current.y;

    userRotationRef.current.y += deltaX * 0.012;
    userRotationRef.current.x += deltaY * 0.012;

    // Clamp vertical tilt
    userRotationRef.current.x = Math.max(-0.6, Math.min(0.6, userRotationRef.current.x));

    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className="relative w-full h-[780px] md:h-[880px] rounded-3xl overflow-hidden bg-[#071322] border border-white/10 shadow-2xl select-none cursor-grab active:cursor-grabbing group"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {!hasWebGL && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-slate-900 text-white text-center">
          <p className="text-slate-400 mb-4">
            3D WebGL is not supported on this browser or device.
          </p>
          <Link
            href="/products/led-lighting"
            className="px-6 py-3 rounded-xl bg-accent text-white font-medium"
          >
            Browse Standard Product Catalogue
          </Link>
        </div>
      )}

      {/* Top Left: Status & Telemetry HUD */}
      <div className="absolute top-6 left-6 z-20 flex flex-col gap-2 pointer-events-none">
        <div className="flex items-center gap-2.5 bg-slate-900/80 backdrop-blur-xl px-4 py-2 rounded-full border border-white/10 shadow-lg">
          <Sparkles className="w-4 h-4 text-orange-400 animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-widest text-white/90 font-medium">
            Virtual 3D Engineering Suite · Daman Floor
          </span>
        </div>

        {/* Real-time telemetry readouts */}
        <div className="hidden sm:flex items-center gap-3 font-mono text-[11px] text-white/60 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/5">
          <span>DRAG: 360° ORBIT</span>
          <span className="text-white/20">|</span>
          <span>ACTIVE: 0{activeIndex + 1}</span>
          <span className="text-white/20">|</span>
          <span className="text-orange-400">FPS: 60 HIGH-DPI</span>
        </div>
      </div>

      {/* Top Right: Studio Toolbar Controls */}
      <div className="absolute top-6 right-6 z-20 flex items-center gap-2">
        {/* Exploded Mode Toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setExplodedMode((prev) => !prev);
          }}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono transition-all backdrop-blur-xl border ${
            explodedMode
              ? "bg-accent text-white border-accent shadow-lg shadow-accent/20"
              : "bg-slate-900/80 text-white/80 border-white/10 hover:bg-slate-800"
          }`}
          title="Toggle Exploded Layer Component View"
        >
          <Layers className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Exploded View</span>
        </button>

        {/* Auto Rotate Toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setAutoRotate((prev) => !prev);
          }}
          className={`p-2 rounded-xl text-xs backdrop-blur-xl border transition-all ${
            autoRotate
              ? "bg-slate-900/80 text-orange-400 border-white/10"
              : "bg-slate-900/50 text-white/40 border-white/5"
          }`}
          title="Toggle Auto Rotation"
        >
          <RotateCw className={`w-4 h-4 ${autoRotate ? "animate-spin" : ""}`} style={{ animationDuration: "8s" }} />
        </button>

        {/* Lighting Mode Switcher */}
        <div className="flex items-center bg-slate-900/80 backdrop-blur-xl p-1 rounded-xl border border-white/10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightingMode("warm");
            }}
            className={`px-2 py-1 rounded-lg text-xs font-mono transition-colors ${
              lightingMode === "warm" ? "bg-accent text-white font-bold" : "text-white/60 hover:text-white"
            }`}
            title="Warm 3000K Lighting"
          >
            3000K
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightingMode("daylight");
            }}
            className={`px-2 py-1 rounded-lg text-xs font-mono transition-colors ${
              lightingMode === "daylight" ? "bg-sky-500 text-white font-bold" : "text-white/60 hover:text-white"
            }`}
            title="Cool Daylight 6500K"
          >
            6500K
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightingMode("cyber");
            }}
            className={`px-2 py-1 rounded-lg text-xs font-mono transition-colors ${
              lightingMode === "cyber" ? "bg-purple-600 text-white font-bold" : "text-white/60 hover:text-white"
            }`}
            title="Cyber Industrial Illumination"
          >
            CYBER
          </button>
        </div>
      </div>

      {/* Bottom Floating Carousel & Step Controls */}
      <div className="absolute bottom-6 left-6 right-6 md:right-auto z-20 flex flex-wrap items-center gap-2 bg-slate-900/90 backdrop-blur-2xl p-2 rounded-2xl border border-white/10 shadow-2xl">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setProduct(activeIndex - 1);
          }}
          disabled={activeIndex === 0}
          className="p-2.5 rounded-xl text-white hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-colors"
          aria-label="Previous 3D Product"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-1.5 px-2 overflow-x-auto max-w-[260px] sm:max-w-md">
          {ROOM_PRODUCTS.map((p, idx) => (
            <button
              key={p.name}
              onClick={(e) => {
                e.stopPropagation();
                setProduct(idx);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all shrink-0 ${
                idx === activeIndex
                  ? "bg-accent text-white font-bold shadow-md shadow-accent/30 ring-2 ring-orange-400/40"
                  : "bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              0{idx + 1} {p.name}
            </button>
          ))}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setProduct(activeIndex + 1);
          }}
          disabled={activeIndex === totalProducts - 1}
          className="p-2.5 rounded-xl text-white hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-colors"
          aria-label="Next 3D Product"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Fly-out Technical Inspection Glass Card */}
      <div
        className={`absolute top-20 sm:top-6 right-6 bottom-6 w-full max-w-md z-30 transition-all duration-500 pointer-events-auto ${
          isPanelOpen ? "translate-x-0 opacity-100" : "translate-x-[110%] opacity-0 pointer-events-none"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-full bg-slate-900/90 backdrop-blur-2xl border border-white/15 rounded-3xl shadow-2xl p-6 md:p-8 flex flex-col justify-between overflow-y-auto text-white">
          <div>
            {/* Top Bar with Category Badge & Close Button */}
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs uppercase tracking-widest text-orange-400 font-semibold px-3 py-1 bg-orange-500/10 rounded-full border border-orange-500/20">
                0{activeIndex + 1} / 0{totalProducts} · {activeProduct.category}
              </span>
              <button
                onClick={() => setIsPanelOpen(false)}
                className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close inspector panel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h3 className="text-3xl font-display font-medium text-white mb-2">
              {activeProduct.name}
            </h3>

            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              {activeProduct.description}
            </p>

            {/* Performance Metric Progress Bars */}
            <div className="mb-6 space-y-2.5 bg-black/30 p-4 rounded-2xl border border-white/5">
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-2">
                Engineering Benchmarks
              </h4>
              {activeProduct.metrics.map((m) => (
                <div key={m.label} className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">{m.label}</span>
                    <span className="text-orange-400 font-bold">{m.value}</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-500 to-amber-300 transition-all duration-700 rounded-full"
                      style={{ width: `${m.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* In-House Production Facilities Badges */}
            <div className="mb-6">
              <h4 className="font-mono text-[11px] uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
                <Factory className="w-3.5 h-3.5 text-orange-400" />
                Manufactured Across Sheetal Facilities:
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {activeProduct.facilities.map((fac) => (
                  <Link
                    key={fac.slug}
                    href={`/facilities/${fac.slug}`}
                    className="inline-block px-3 py-1.5 rounded-lg bg-white/5 hover:bg-accent hover:text-white text-xs font-mono text-slate-300 border border-white/10 transition-all"
                  >
                    {fac.name} →
                  </Link>
                ))}
              </div>
            </div>

            {/* Specifications Quick-Glance Table */}
            <div className="mb-6">
              <h4 className="font-mono text-[11px] uppercase tracking-wider text-slate-400 mb-2">
                Technical Specifications
              </h4>
              <dl className="divide-y divide-white/10 text-xs border border-white/10 rounded-2xl bg-black/20 p-3.5">
                {activeProduct.specs.map(([label, val]) => (
                  <div key={label} className="py-2 flex justify-between gap-4">
                    <dt className="text-slate-400 font-mono">{label}</dt>
                    <dd className="font-semibold text-white text-right">{val}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Key Manufacturing Stages Pipeline */}
            <div className="mb-6">
              <h4 className="font-mono text-[11px] uppercase tracking-wider text-slate-400 mb-2">
                Factory Execution Pipeline
              </h4>
              <ol className="space-y-2 text-xs text-slate-300">
                {activeProduct.manufacturing.map((step, sIdx) => (
                  <li key={step} className="flex items-start gap-2.5">
                    <span className="font-mono text-orange-400 font-bold bg-orange-500/10 px-1.5 py-0.5 rounded text-[10px]">
                      0{sIdx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-white/10 flex items-center gap-3">
            <Link
              href={activeProduct.href}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors text-center border border-white/15"
            >
              Explore Category <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/rfq"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-accent text-white text-xs font-semibold hover:bg-orange-600 transition-colors shadow-lg shadow-accent/30 text-center"
            >
              Request OEM Quote
            </Link>
          </div>
        </div>
      </div>

      {/* Button to reopen panel if closed */}
      {!isPanelOpen && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsPanelOpen(true);
          }}
          className="absolute top-20 sm:top-6 right-6 z-20 flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900/90 text-white text-xs font-mono uppercase tracking-wider border border-white/20 shadow-2xl hover:bg-black transition-all"
        >
          <Eye className="w-4 h-4 text-orange-400" /> Inspect Product
        </button>
      )}
    </div>
  );
}
