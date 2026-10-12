"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { Link } from "@/i18n/routing";
import { ArrowRight, Box, ChevronLeft, ChevronRight, Eye, Factory, Sparkles, X } from "lucide-react";

export interface RoomProduct {
  name: string;
  category: string;
  href: string;
  facilities: { slug: string; name: string }[];
  description: string;
  specs: [string, string][];
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
      "Energy-efficient LED bulbs (5W–50W) for residential and commercial use, built completely in-house from thermally conductive housings to SMT driver circuits.",
    specs: [
      ["Wattage Range", "5W – 50W"],
      ["Base Fittings", "B22 · E27"],
      ["Efficacy", "> 105 lm/W"],
      ["Surge Protection", "Up to 4kV In-built"],
      ["Supply Model", "OEM / Private Label"],
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

  const activeProduct = ROOM_PRODUCTS[activeIndex];
  const totalProducts = ROOM_PRODUCTS.length;

  // Scene refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const itemsRef = useRef<{
    group: THREE.Group;
    light: THREE.PointLight;
    homePos: THREE.Vector3;
    homeScale: number;
    focusScale: number;
    tilt: number;
  }[]>([]);
  const animFrameIdRef = useRef<number | null>(null);

  // Smooth scroll / navigation target
  const scrollRatioRef = useRef(0);
  const targetRatioRef = useRef(0);

  const setProduct = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(totalProducts - 1, index));
    setActiveIndex(clamped);
    targetRatioRef.current = clamped + 1; // 1-indexed for product viewing
    setIsPanelOpen(true);
  }, [totalProducts]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Check WebGL availability
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      setHasWebGL(false);
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const bgColor = 0x071322; // match Sheetal dark blue palette
    scene.background = new THREE.Color(bgColor);
    scene.fog = new THREE.FogExp2(bgColor, 0.05);

    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 50);
    cameraRef.current = camera;

    // Helper material factory
    const mat = (color: number, opts: THREE.MeshStandardMaterialParameters = {}) =>
      new THREE.MeshStandardMaterial({
        color,
        roughness: opts.roughness ?? 0.45,
        metalness: opts.metalness ?? 0.2,
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
      parent.add(mesh);
      return mesh;
    };

    // Palette materials
    const oak = mat(0xcbb698, { roughness: 0.7 });
    const wallMat = mat(0x0d1f33, { roughness: 0.8 });
    const accentMat = mat(0xff5e14, { metalness: 0.4, roughness: 0.3 });
    const darkSteel = mat(0x1e293b, { metalness: 0.6, roughness: 0.35 });
    const whitePlastic = mat(0xffffff, { roughness: 0.4 });
    const glowMat = mat(0xfff7ed, {
      emissive: 0xffedd5,
      emissiveIntensity: 1.2,
      roughness: 0.2,
    });
    const glassMat = mat(0xbae6fd, {
      roughness: 0.1,
      metalness: 0.1,
      transparent: true,
      opacity: 0.75,
    });

    // Room Architecture
    // Floor
    addMesh(scene, new THREE.BoxGeometry(16, 0.2, 16), oak, 0, -0.1, 1);
    // Back Wall
    addMesh(scene, new THREE.BoxGeometry(16, 6, 0.2), wallMat, 0, 3, -4.5);
    // Left Wall
    addMesh(scene, new THREE.BoxGeometry(0.2, 6, 16), wallMat, -8, 3, 1);
    // Ceiling
    addMesh(scene, new THREE.BoxGeometry(16, 0.2, 16), wallMat, 0, 6, 1);

    // Architectural furniture & pedestals
    addMesh(scene, new THREE.CylinderGeometry(0.4, 0.4, 1.2, 32), darkSteel, -3.2, 0.6, -2.6);
    addMesh(scene, new THREE.BoxGeometry(2.8, 0.4, 0.8), darkSteel, 0, 0.2, -3.2);
    addMesh(scene, new THREE.CylinderGeometry(0.5, 0.5, 1.5, 32), darkSteel, 3.8, 0.75, -1.8);
    addMesh(scene, new THREE.BoxGeometry(0.6, 0.08, 1.8), oak, -6.8, 2.5, -1.8);

    // Ambient & Directional Lighting
    const ambLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambLight);

    const dirLight = new THREE.DirectionalLight(0xffedd5, 1.2);
    dirLight.position.set(4, 7, 5);
    scene.add(dirLight);

    // Procedural 3D Products
    const creators = [
      // 0: LED Bulb
      (g: THREE.Group) => {
        addMesh(g, new THREE.SphereGeometry(0.5, 32, 24), glowMat, 0, 0.55, 0);
        addMesh(g, new THREE.CylinderGeometry(0.35, 0.28, 0.3, 32), whitePlastic, 0, -0.02, 0);
        addMesh(g, new THREE.CylinderGeometry(0.28, 0.28, 0.4, 32), accentMat, 0, -0.35, 0);
        addMesh(g, new THREE.CylinderGeometry(0.18, 0.18, 0.15, 24), darkSteel, 0, -0.6, 0);
      },
      // 1: LED Batten
      (g: THREE.Group) => {
        addMesh(g, new THREE.BoxGeometry(2.8, 0.18, 0.35), darkSteel, 0, 0, 0);
        addMesh(g, new THREE.BoxGeometry(2.7, 0.04, 0.26), glowMat, 0, -0.1, 0);
        addMesh(g, new THREE.BoxGeometry(0.08, 0.22, 0.38), accentMat, 1.4, 0, 0);
        addMesh(g, new THREE.BoxGeometry(0.08, 0.22, 0.38), accentMat, -1.4, 0, 0);
      },
      // 2: Street Light
      (g: THREE.Group) => {
        addMesh(g, new THREE.CylinderGeometry(0.06, 0.08, 1.8, 16), darkSteel, 0, 0, 0);
        addMesh(g, new THREE.BoxGeometry(0.8, 0.06, 0.06), darkSteel, 0.35, 0.9, 0);
        addMesh(g, new THREE.BoxGeometry(0.8, 0.12, 0.4), darkSteel, 0.7, 0.88, 0);
        addMesh(g, new THREE.BoxGeometry(0.68, 0.03, 0.3), glowMat, 0.7, 0.82, 0);
        addMesh(g, new THREE.BoxGeometry(0.72, 0.02, 0.34), glassMat, 0.7, 0.8, 0);
      },
      // 3: Downlight & Spot
      (g: THREE.Group) => {
        addMesh(g, new THREE.CylinderGeometry(0.65, 0.65, 0.14, 40), darkSteel, 0, 0, 0);
        addMesh(g, new THREE.TorusGeometry(0.5, 0.05, 16, 40), accentMat, 0, -0.07, 0);
        addMesh(g, new THREE.CylinderGeometry(0.44, 0.44, 0.03, 40), glowMat, 0, -0.07, 0);
      },
      // 4: Smart Bulb
      (g: THREE.Group) => {
        addMesh(g, new THREE.SphereGeometry(0.42, 32, 24), glowMat, 0, 0.5, 0);
        addMesh(g, new THREE.CylinderGeometry(0.24, 0.24, 0.35, 24), darkSteel, 0, -0.02, 0);
        addMesh(g, new THREE.TorusGeometry(0.54, 0.02, 12, 48), accentMat, 0, 0.5, 0);
        addMesh(g, new THREE.CylinderGeometry(0.18, 0.18, 0.2, 24), accentMat, 0, -0.32, 0);
      },
      // 5: Ceiling Light
      (g: THREE.Group) => {
        addMesh(g, new THREE.CylinderGeometry(0.95, 0.95, 0.12, 48), whitePlastic, 0, 0, 0);
        addMesh(g, new THREE.CylinderGeometry(0.82, 0.82, 0.03, 48), glowMat, 0, -0.07, 0);
        addMesh(g, new THREE.TorusGeometry(0.95, 0.04, 12, 48), accentMat, 0, -0.03, 0);
      },
    ];

    // Home configurations [x, y, z, homeScale, focusScale, tiltX]
    const configs = [
      [-3.2, 1.5, -2.6, 0.55, 1.8, 0.1],
      [0, 2.9, -3.2, 0.75, 1.1, 0.1],
      [3.8, 1.8, -1.8, 0.5, 1.5, 0.0],
      [1.8, 4.2, -1.0, 0.6, 1.6, -1.1],
      [-6.8, 2.8, -1.8, 0.5, 1.8, 0.1],
      [-2.0, 4.2, -0.5, 0.65, 1.3, -1.1],
    ];

    itemsRef.current = creators.map((createFn, i) => {
      const group = new THREE.Group();
      createFn(group);
      const [hx, hy, hz, hs, fs, tilt] = configs[i];
      group.position.set(hx, hy, hz);
      group.scale.setScalar(hs);

      const light = new THREE.PointLight(0xffedd5, 0.8, 5);
      light.position.set(0, -0.2, 0.4);
      group.add(light);

      scene.add(group);
      return {
        group,
        light,
        homePos: new THREE.Vector3(hx, hy, hz),
        homeScale: hs,
        focusScale: fs,
        tilt,
      };
    });

    // Resize handler
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

    // Initial camera placement
    camera.position.set(0, 2.2, 6);
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

      // Smooth interpolation of scroll / index ratio
      scrollRatioRef.current += (targetRatioRef.current - scrollRatioRef.current) * 0.08;
      const s = scrollRatioRef.current;
      const isDesktop = container.clientWidth > 860;

      // Dynamic Camera trajectory
      camera.position.set(
        Math.sin(s * 0.55) * 1.4,
        2.2 + Math.sin(s * 0.3) * 0.15,
        5.8 - Math.min(s, 1) * 0.5
      );
      camera.lookAt(0, 2.0, -1.5);
      camera.updateMatrixWorld();

      // Transform items based on active index
      itemsRef.current.forEach((item, idx) => {
        const dist = Math.abs(s - (idx + 1));
        const weight = smoothStep(clamp(1 - dist / 0.5, 0, 1));

        // Focus point in camera view space
        focusTarget.set(isDesktop ? -1.1 : 0, isDesktop ? 0.2 : 0.6, -3.4);
        camera.localToWorld(focusTarget);

        // Position Lerp
        item.group.position.lerpVectors(item.homePos, focusTarget, weight);

        // Scale Lerp
        const targetScale = item.homeScale + (item.focusScale - item.homeScale) * weight;
        item.group.scale.setScalar(targetScale);

        // Smooth rotation when in focus
        item.group.rotation.set(
          item.tilt * weight,
          weight * time * 0.8 + (1 - weight) * 0,
          0
        );

        // Dynamic light intensity
        item.light.intensity = 0.5 + weight * 2.2;
      });

      renderer.render(scene, camera);
    };

    renderLoop();

    // Cleanup on unmount
    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      window.removeEventListener("resize", handleResize);

      // Dispose Geometries and Materials
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
  }, [totalProducts]);

  // Set initial target to 1 (first product)
  useEffect(() => {
    targetRatioRef.current = 1;
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[760px] md:h-[860px] rounded-3xl overflow-hidden bg-[#071322] border border-slate-800 shadow-2xl select-none"
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

      {/* Top HUD Brand Badge */}
      <div className="absolute top-6 left-6 z-20 flex items-center gap-3 bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
        <Sparkles className="w-4 h-4 text-orange-400 animate-pulse" />
        <span className="font-mono text-xs uppercase tracking-widest text-white/80">
          3D Interactive Product Showroom · Daman Manufacturing
        </span>
      </div>

      {/* Bottom Product Carousel Stepper */}
      <div className="absolute bottom-6 left-6 right-6 md:right-auto z-20 flex flex-wrap items-center gap-2 bg-slate-900/90 backdrop-blur-md p-2 rounded-2xl border border-white/10 shadow-lg">
        <button
          onClick={() => setProduct(activeIndex - 1)}
          disabled={activeIndex === 0}
          className="p-2.5 rounded-xl text-white hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-colors"
          aria-label="Previous 3D Product"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-1.5 px-2 overflow-x-auto max-w-[280px] sm:max-w-md">
          {ROOM_PRODUCTS.map((p, idx) => (
            <button
              key={p.name}
              onClick={() => setProduct(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all shrink-0 ${
                idx === activeIndex
                  ? "bg-accent text-white font-bold shadow-md shadow-accent/30"
                  : "bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              0{idx + 1} {p.name}
            </button>
          ))}
        </div>

        <button
          onClick={() => setProduct(activeIndex + 1)}
          disabled={activeIndex === totalProducts - 1}
          className="p-2.5 rounded-xl text-white hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-colors"
          aria-label="Next 3D Product"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Fly-out Technical Inspection Panel */}
      <div
        className={`absolute top-6 right-6 bottom-6 w-full max-w-md z-30 transition-all duration-500 pointer-events-auto ${
          isPanelOpen ? "translate-x-0 opacity-100" : "translate-x-[110%] opacity-0 pointer-events-none"
        }`}
      >
        <div className="h-full bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-3xl shadow-2xl p-6 md:p-8 flex flex-col justify-between overflow-y-auto text-ink">
          {/* Header */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold px-2.5 py-1 bg-orange-50 rounded-full border border-orange-200">
                0{activeIndex + 1} / 0{totalProducts} · {activeProduct.category}
              </span>
              <button
                onClick={() => setIsPanelOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Close inspector panel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h3 className="text-3xl font-display font-medium text-ink mb-2">
              {activeProduct.name}
            </h3>

            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              {activeProduct.description}
            </p>

            {/* In-House Production Facilities Badges */}
            <div className="mb-6">
              <h4 className="font-mono text-[11px] uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Factory className="w-3.5 h-3.5 text-accent" />
                Manufactured Across Sheetal Facilities:
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {activeProduct.facilities.map((fac) => (
                  <Link
                    key={fac.slug}
                    href={`/facilities/${fac.slug}`}
                    className="inline-block px-2.5 py-1 rounded-md bg-slate-100 hover:bg-accent hover:text-white text-xs font-mono text-slate-700 transition-colors"
                  >
                    {fac.name} →
                  </Link>
                ))}
              </div>
            </div>

            {/* Specifications Table */}
            <div className="mb-6">
              <h4 className="font-mono text-[11px] uppercase tracking-wider text-slate-400 mb-2">
                Technical Specifications
              </h4>
              <dl className="divide-y divide-slate-100 text-xs border border-slate-100 rounded-xl bg-slate-50/50 p-3">
                {activeProduct.specs.map(([label, val]) => (
                  <div key={label} className="py-1.5 flex justify-between gap-4">
                    <dt className="text-slate-500 font-mono">{label}</dt>
                    <dd className="font-semibold text-slate-900 text-right">{val}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Key Manufacturing Stages */}
            <div className="mb-6">
              <h4 className="font-mono text-[11px] uppercase tracking-wider text-slate-400 mb-2">
                Factory Execution Pipeline
              </h4>
              <ol className="space-y-1.5 text-xs text-slate-600">
                {activeProduct.manufacturing.map((step, sIdx) => (
                  <li key={step} className="flex items-start gap-2">
                    <span className="font-mono text-accent font-bold">0{sIdx + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
            <Link
              href={activeProduct.href}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors text-center"
            >
              Explore Category <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/rfq"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-accent text-white text-xs font-semibold hover:bg-orange-600 transition-colors shadow-md shadow-accent/20 text-center"
            >
              Request Quote
            </Link>
          </div>
        </div>
      </div>

      {/* Button to reopen panel if closed */}
      {!isPanelOpen && (
        <button
          onClick={() => setIsPanelOpen(true)}
          className="absolute top-6 right-6 z-20 flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900/90 text-white text-xs font-mono uppercase tracking-wider border border-white/20 shadow-xl hover:bg-black transition-all"
        >
          <Eye className="w-4 h-4 text-accent" /> Inspect Product
        </button>
      )}
    </div>
  );
}
