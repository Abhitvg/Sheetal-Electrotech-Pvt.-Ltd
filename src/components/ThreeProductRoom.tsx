"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
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
  Layers,
  Power,
  Sun,
  ZoomIn,
  ZoomOut,
  SlidersHorizontal,
  Box,
  CheckCircle2,
  Loader2,
  FileCode,
} from "lucide-react";

export interface Hotspot {
  id: string;
  title: string;
  spec: string;
  position: [number, number, number];
}

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
  hotspots: Hotspot[];
}

export const ROOM_PRODUCTS: RoomProduct[] = [
  {
    name: "LED Bulb",
    category: "Everyday & Commercial Lighting",
    href: "/products/led-lighting/bulbs",
    facilities: [
      { slug: "injection-moulding", name: "Injection Moulding" },
      { slug: "smt", name: "SMT & Electronics" },
      { slug: "assembly-packing", name: "Assembly & Packing" },
    ],
    description:
      "High-efficiency LED bulbs (5W–50W) for residential and commercial use, built completely in-house from thermally conductive housings to SMT driver circuits.",
    specs: [
      ["Wattage Range", "5W – 50W (Standard 9W/12W)"],
      ["Base Fittings", "B22d Bayonet · E27 Screw"],
      ["Luminous Efficacy", "> 105 lm/W @ 6500K"],
      ["Surge Protection", "Up to 4.0 kV In-built MOV"],
      ["Supply Model", "OEM / Private Label Production"],
    ],
    metrics: [
      { label: "Luminous Efficacy", value: "108 lm/W", percent: 92 },
      { label: "Thermal Dissipation", value: "98.4%", percent: 98 },
      { label: "Surge Immunity", value: "4.0 kV", percent: 88 },
      { label: "Power Factor", value: "0.98", percent: 96 },
    ],
    technical: [
      "Thermally engineered aluminium-plastic composite housing",
      "SMT metal-core PCB (MCPCB) with 16+ high-efficiency 2835 LEDs",
      "Constant current isolated IC driver with over-voltage cut-off",
    ],
    manufacturing: [
      "High-pressure plastic injection moulding for bulb shell",
      "Dual-head high-speed SMT placement for LED array",
      "Automated robotic silicon dispensing and heat-sink press",
      "100% 4-stage aging test and photometric burn-in",
    ],
    hotspots: [
      {
        id: "diffuser",
        title: "Opal Polycarbonate Diffuser",
        spec: "89% optical transmittance with 240° wide beam spread",
        position: [0, 0.65, 0.35],
      },
      {
        id: "mcpcb",
        title: "SMD 2835 Metal-Core PCB",
        spec: "16x Epistar/Sanan LED dies on 1.2mm aluminium substrate",
        position: [0, 0.22, 0.32],
      },
      {
        id: "heatsink",
        title: "ADC12 Die-Cast Heat Sink",
        spec: "Internal convective aluminium core for <65°C junction temp",
        position: [0, -0.12, 0.3],
      },
      {
        id: "driver",
        title: "Isolated IC Driver Module",
        spec: "High PF (>0.98), THD <10%, and 4kV transient surge MOV",
        position: [0, -0.38, 0.25],
      },
      {
        id: "base",
        title: "Nickel-Plated Base Cap",
        spec: "Precision threaded E27 / B22 bayonet with brass contact",
        position: [0, -0.7, 0.2],
      },
    ],
  },
  {
    name: "LED Batten",
    category: "Architectural Linear Lighting",
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
      ["Length", "1ft · 2ft · 4ft Architectural Options"],
      ["Optical Diffuser", "Extruded Polycarbonate (89% transmittance)"],
      ["Power Factor", "> 0.95 @ 230V AC"],
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
    hotspots: [
      {
        id: "diffuser",
        title: "Extruded Polycarbonate Lens",
        spec: "Uniform longitudinal diffusion with zero LED hot-spots",
        position: [0, 0.2, 0.26],
      },
      {
        id: "linear_board",
        title: "Dual Linear LED Engine",
        spec: "Staggered SMD 2835 chips for 120 lm/W system efficacy",
        position: [0.5, 0.05, 0.18],
      },
      {
        id: "spine",
        title: "Extruded Aluminium Spine",
        spec: "Concealed snap-lock mounting channel & wire conduit",
        position: [-0.5, -0.12, 0.18],
      },
      {
        id: "endcap",
        title: "Injection-Moulded End Cap",
        spec: "Tool-less wire entry with flame-retardant V0 polymer",
        position: [1.4, 0.0, 0.12],
      },
    ],
  },
  {
    name: "Street Light",
    category: "Municipal & Highway Infrastructure",
    href: "/products/led-lighting/street-lights",
    facilities: [
      { slug: "tool-room", name: "Tool Room" },
      { slug: "smt", name: "SMT & Electronics" },
      { slug: "manual-insertion", name: "Manual Insertion" },
      { slug: "assembly-packing", name: "Assembly & Packing" },
    ],
    description:
      "High-tonnage die-cast outdoor luminaire engineered for municipal highways and industrial perimeters with IP66 ingress sealing and 6kV–10kV surge tolerance.",
    specs: [
      ["Wattage Range", "30W – 150W High-Mast Grade"],
      ["Ingress Rating", "IP66 Dust & High-Pressure Water"],
      ["Impact Rating", "IK08 Toughened Glass/Lens"],
      ["Surge Rating", "6.0 kV – 10.0 kV Dual Stage"],
      ["Optics", "Batwing Type II/III Municipal Optics"],
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
    hotspots: [
      {
        id: "optics",
        title: "Batwing Optical Lens Matrix",
        spec: "Type II/III street distribution with zero upward waste light",
        position: [-0.2, -0.18, 0.38],
      },
      {
        id: "fins",
        title: "Convective Cooling Fins",
        spec: "14x aerodynamic dorsal fins preventing debris accumulation",
        position: [0.15, 0.28, 0.1],
      },
      {
        id: "driver_bay",
        title: "IP67 Driver & 10kV Surge Bay",
        spec: "Isolated compartment with silicone compression O-ring",
        position: [0.55, 0.12, -0.1],
      },
      {
        id: "spigot",
        title: "Tubular Mounting Spigot",
        spec: "50-60mm pole clamp with dual M10 stainless steel bolts",
        position: [1.0, 0.04, -0.2],
      },
    ],
  },
  {
    name: "Downlights & Spots",
    category: "Architectural & Commercial Lighting",
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
      ["CRI", "Ra > 85 (High Color Fidelity)"],
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
    hotspots: [
      {
        id: "baffle",
        title: "Stepped Anti-Glare Baffle",
        spec: "Deep recessed concentric cone achieving UGR < 19 comfort",
        position: [0, -0.25, 0.38],
      },
      {
        id: "cob",
        title: "High-CRI COB Light Engine",
        spec: "Central intense COB emitter with faceted specular reflector",
        position: [0, -0.05, 0.25],
      },
      {
        id: "heatsink_tower",
        title: "Radial Heat Sink Tower",
        spec: "16x vertical fins machined for maximum convective airflow",
        position: [0, 0.28, 0.28],
      },
      {
        id: "springs",
        title: "Stainless Retention Springs",
        spec: "Dual torsion spring arms for secure gypsum ceiling grip",
        position: [-0.55, 0.05, 0.15],
      },
    ],
  },
  {
    name: "Smart Bulb",
    category: "Connected IoT Illumination",
    href: "/products/led-lighting/smart-led",
    facilities: [
      { slug: "research-development", name: "R&D" },
      { slug: "smt", name: "SMT & Electronics" },
      { slug: "assembly-packing", name: "Assembly & Packing" },
    ],
    description:
      "WiFi & Bluetooth enabled smart LED bulb supporting 16 million RGB colors, tunable white (2700K–6500K), and seamless voice integration.",
    specs: [
      ["Connectivity", "2.4GHz Wi-Fi + Bluetooth 5.0 Mesh"],
      ["Color Palette", "16M Colors + 2700K–6500K Tunable"],
      ["Compatibility", "Matter, Alexa, Google Home, Smart Life"],
      ["Dimming Range", "1% – 100% Smooth PWM (Flicker-Free)"],
      ["Standby Power", "< 0.35W Ultra-Low Standby"],
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
    hotspots: [
      {
        id: "rf_antenna",
        title: "Isolated Wi-Fi/BLE Antenna",
        spec: "Thermally isolated RF trace for 30m dependable range",
        position: [0, 0.65, 0.35],
      },
      {
        id: "multichannel_led",
        title: "RGB + CW + WW LED Matrix",
        spec: "12x full-color RGB + 8x high-CRI tunable white emitter chips",
        position: [0, 0.25, 0.3],
      },
      {
        id: "smart_bezel",
        title: "Laser-Etched IoT Bezel",
        spec: "Matte anodized accent ring with status indicator window",
        position: [0, 0.05, 0.3],
      },
      {
        id: "iot_driver",
        title: "Microcontroller Driver Board",
        spec: "32-bit RISC-V SoC with hardware cryptographic security",
        position: [0, -0.35, 0.25],
      },
    ],
  },
  {
    name: "Ceiling Light",
    category: "Commercial & Ambient Panel",
    href: "/products/led-lighting/downlights",
    facilities: [
      { slug: "injection-moulding", name: "Injection Moulding" },
      { slug: "extrusion", name: "Extrusion" },
      { slug: "assembly-packing", name: "Assembly & Packing" },
    ],
    description:
      "Wide-angle circular ceiling luminaires providing uniform ambient lighting for offices, hospital corridors, and modern living spaces.",
    specs: [
      ["Wattage Options", "15W · 22W · 36W Commercial Grade"],
      ["Diameter Range", "220mm – 400mm Ultra-Slim Profile"],
      ["Mounting", "Flush Surface Mount / Quick-Twist Bracket"],
      ["IP Rating", "IP44 Splash Proof Seal"],
      ["Lumen Output", "Up to 3,600 lm @ 100 lm/W"],
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
    hotspots: [
      {
        id: "prismatic_face",
        title: "Micro-Prismatic Luminous Face",
        spec: "Uniform 120° beam distribution with anti-yellowing PMMA",
        position: [0, -0.15, 0.48],
      },
      {
        id: "perimeter_frame",
        title: "Seamless Aluminium Rim",
        spec: "High-pressure extruded rim with seamless laser welding",
        position: [0.55, 0.0, 0.32],
      },
      {
        id: "lgp_plate",
        title: "Laser-Dotted Light Guide Plate",
        spec: "High-transmittance matrix with rear 98% nano-reflector",
        position: [0, 0.08, 0.32],
      },
      {
        id: "twist_bracket",
        title: "Quick-Twist Mounting Base",
        spec: "Concealed keyhole slots for tool-less ceiling latching",
        position: [0, 0.28, 0.28],
      },
    ],
  },
];

export interface CadAssetConfig {
  key: string;
  url: string;
  label: string;
  badge: string;
  cadFile: string;
  sourceDesc: string;
  targetScale: number;
  rotationOffset?: [number, number, number];
  positionYOffset?: number;
}

export const PRODUCT_CAD_VARIANTS: Record<
  number,
  { primary: CadAssetConfig; secondary?: CadAssetConfig }
> = {
  0: {
    primary: {
      key: "bulb",
      url: "/models/bulb.glb",
      label: "A60 LED Bulb (Real CAD)",
      badge: "SolidWorks CAD",
      cadFile: "bulb.glb (2.0 MB)",
      sourceDesc: "High-precision CAD model with threaded cap, heat sink body, and optical globe",
      targetScale: 1.18,
      positionYOffset: -0.45,
    },
  },
  1: {
    primary: {
      key: "batten",
      url: "/models/led_batten.glb",
      label: "Argus Linear 2400mm (Real CAD)",
      badge: "Architectural CAD",
      cadFile: "led_batten.glb (2.6 MB)",
      sourceDesc: "Precision 2400mm continuous architectural linear luminaire extrusion",
      targetScale: 2.2,
      rotationOffset: [0, Math.PI / 4, 0],
      positionYOffset: -0.85,
    },
  },
  2: {
    primary: {
      key: "street_floodlight",
      url: "/models/street_floodlight.glb",
      label: "EC-FL-30 Industrial Floodlight (Real CAD)",
      badge: "Heavy-Duty CAD",
      cadFile: "street_floodlight.glb (0.4 MB)",
      sourceDesc: "Commercial grade IP66 exterior floodlight with adjustable mounting bracket",
      targetScale: 1.55,
      rotationOffset: [0.25, -Math.PI / 4, 0],
      positionYOffset: -0.75,
    },
    secondary: {
      key: "street_light",
      url: "/models/street_light.glb",
      label: "Industrial Highway Luminaire (Real CAD)",
      badge: "Municipal CAD",
      cadFile: "street_light.glb (2.8 MB)",
      sourceDesc: "High-mast aerodynamic die-cast aluminium roadway luminaire with cooling fins",
      targetScale: 1.6,
      rotationOffset: [0.25, -Math.PI / 3, 0],
      positionYOffset: -0.75,
    },
  },
  3: {
    primary: {
      key: "downlight",
      url: "/models/downlight.glb",
      label: "Architectural Recessed Downlight (Real CAD)",
      badge: "Anti-Glare CAD",
      cadFile: "downlight.glb (0.8 MB)",
      sourceDesc: "Precision ceiling downlight canister with parabolic reflector and spring clips",
      targetScale: 1.35,
      rotationOffset: [0.45, 0, 0],
      positionYOffset: -0.65,
    },
    secondary: {
      key: "spotlight",
      url: "/models/spotlight.glb",
      label: "Commercial Track Spotlight (Real CAD)",
      badge: "Track Spot CAD",
      cadFile: "spotlight.glb (5.0 MB)",
      sourceDesc: "Steel Cut track-mount commercial luminaire with cooling fins and multi-axis swivel",
      targetScale: 1.5,
      rotationOffset: [0.3, -Math.PI / 3, 0],
      positionYOffset: -0.65,
    },
  },
  4: {
    primary: {
      key: "smart_bulb",
      url: "/models/bulb.glb",
      label: "IoT Connected Smart Bulb (Real CAD)",
      badge: "RGB IoT CAD",
      cadFile: "bulb.glb (2.0 MB)",
      sourceDesc: "Multi-channel RGB + tunable white IoT connected luminaire",
      targetScale: 1.18,
      positionYOffset: -0.45,
    },
  },
  5: {
    primary: {
      key: "ceiling_panel",
      url: "/models/downlight.glb",
      label: "Architectural Ceiling Luminaire (Real CAD)",
      badge: "Ceiling CAD",
      cadFile: "downlight.glb (0.8 MB)",
      sourceDesc: "Commercial ultra-slim ambient ceiling fixture",
      targetScale: 1.35,
      rotationOffset: [0.55, 0, 0],
      positionYOffset: -0.65,
    },
  },
};

interface LayerComponent {
  mesh: THREE.Object3D;
  explodeDirection: THREE.Vector3;
  explodeDistance: number;
  initialPos: THREE.Vector3;
  name: string;
}

export default function ThreeProductRoom() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [modelMode, setModelMode] = useState<"cad" | "exploded">("cad");
  const [variantMap, setVariantMap] = useState<Record<number, "primary" | "secondary">>({
    2: "primary",
    3: "primary",
  });
  const [loadingCad, setLoadingCad] = useState(false);
  const [cadProgress, setCadProgress] = useState(0);

  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isPowered, setIsPowered] = useState(true);
  const [lightingMode, setLightingMode] = useState<"warm" | "neutral" | "daylight" | "cyber">("warm");
  const [renderMode, setRenderMode] = useState<"realistic" | "cad" | "xray">("realistic");
  const [isExploded, setIsExploded] = useState(false);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);

  const activeProduct = ROOM_PRODUCTS[activeIndex];
  const totalProducts = ROOM_PRODUCTS.length;

  // Active CAD config
  const activeCadVariants = PRODUCT_CAD_VARIANTS[activeIndex] || PRODUCT_CAD_VARIANTS[0];
  const activeVariantKey = variantMap[activeIndex] || "primary";
  const activeCadConfig =
    activeVariantKey === "secondary" && activeCadVariants.secondary
      ? activeCadVariants.secondary
      : activeCadVariants.primary;

  // Real-time animation refs (ensuring smooth frame-rate lerps)
  const explodeRatioRef = useRef(0);
  const targetExplodeRatioRef = useRef(0);

  // Sync refs for 60fps render loop
  const activeIndexRef = useRef(activeIndex);
  activeIndexRef.current = activeIndex;

  const modelModeRef = useRef(modelMode);
  modelModeRef.current = modelMode;

  const variantMapRef = useRef(variantMap);
  variantMapRef.current = variantMap;

  const lightingModeRef = useRef(lightingMode);
  lightingModeRef.current = lightingMode;

  const isPoweredRef = useRef(isPowered);
  isPoweredRef.current = isPowered;

  const autoRotateRef = useRef(autoRotate);
  autoRotateRef.current = autoRotate;

  const activeProductRef = useRef(activeProduct);
  activeProductRef.current = activeProduct;

  // Three.js State References
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // CAD Mesh references
  const cadMasterGroupRef = useRef<THREE.Group | null>(null);
  const loadedCadMapRef = useRef<Map<string, THREE.Group>>(new Map());
  const loadCadModelRef = useRef<((url: string, config: CadAssetConfig) => void) | null>(null);

  // Lights
  const productLightRef = useRef<THREE.PointLight | null>(null);
  const spotLightRef = useRef<THREE.SpotLight | null>(null);

  // Active Models Map
  const productGroupsRef = useRef<THREE.Group[]>([]);
  const productLayersRef = useRef<LayerComponent[][]>([]);
  const materialsRef = useRef<THREE.Material[]>([]);
  const emissiveMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([]);

  // Camera Orbit & Damping
  const cameraOrbitRef = useRef({
    radius: 5.6,
    targetRadius: 5.6,
    theta: 0.35,
    phi: 1.25,
    targetTheta: 0.35,
    targetPhi: 1.25,
    panX: typeof window !== "undefined" && window.innerWidth >= 1024 ? 1.45 : 0,
    targetPanX: typeof window !== "undefined" && window.innerWidth >= 1024 ? 1.45 : 0,
  });

  const isDraggingRef = useRef(false);
  const lastPointerRef = useRef({ x: 0, y: 0 });

  // Hotspots 2D screen projections
  const [hotspotScreenCoords, setHotspotScreenCoords] = useState<{ id: string; x: number; y: number; visible: boolean }[]>([]);

  // Toggle Exploded View
  const toggleExploded = () => {
    const nextState = !isExploded;
    setIsExploded(nextState);
    targetExplodeRatioRef.current = nextState ? 1.0 : 0.0;
  };

  // Switch CAD Variant (Primary vs Secondary)
  const setVariantForProduct = (prodIdx: number, variant: "primary" | "secondary") => {
    setVariantMap((prev) => ({ ...prev, [prodIdx]: variant }));
  };

  // Navigation setter
  const setProduct = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(totalProducts - 1, index));
    setActiveIndex(clamped);
    setSelectedHotspot(null);
    setIsExploded(false);
    targetExplodeRatioRef.current = 0.0;
    cameraOrbitRef.current.targetTheta = 0.35;
    cameraOrbitRef.current.targetPhi = 1.25;
  }, [totalProducts]);

  // Trigger CAD asset loading whenever active product or variant changes
  useEffect(() => {
    if (loadCadModelRef.current && activeCadConfig) {
      loadCadModelRef.current(activeCadConfig.url, activeCadConfig);
    }
  }, [activeIndex, activeCadConfig]);

  // Adjust camera horizontal offset based on drawer state & screen size
  useEffect(() => {
    const updatePan = () => {
      const isDesktop = typeof window !== "undefined" && window.innerWidth >= 1024;
      cameraOrbitRef.current.targetPanX = isPanelOpen && isDesktop ? 1.45 : 0;
    };
    updatePan();
    window.addEventListener("resize", updatePan);
    return () => window.removeEventListener("resize", updatePan);
  }, [isPanelOpen]);

  // Lighting & CCT Update
  useEffect(() => {
    if (!productLightRef.current || !spotLightRef.current) return;

    let lightHex = 0xffe2b2; // warm 3000k
    let lightIntensity = 2.4;

    if (lightingMode === "warm") {
      lightHex = 0xffe2b2;
    } else if (lightingMode === "neutral") {
      lightHex = 0xfff4e6;
    } else if (lightingMode === "daylight") {
      lightHex = 0xdcf0ff;
    } else {
      lightHex = 0xff5e14; // cyber accent
    }

    const effectiveIntensity = isPowered ? lightIntensity : 0;
    productLightRef.current.color.setHex(lightHex);
    productLightRef.current.intensity = effectiveIntensity * 1.5;
    spotLightRef.current.color.setHex(lightHex);
    spotLightRef.current.intensity = effectiveIntensity * 4.0;

    emissiveMaterialsRef.current.forEach((mat) => {
      mat.emissive.setHex(lightHex);
      mat.emissiveIntensity = isPowered ? (lightingMode === "cyber" ? 2.5 : 1.8) : 0.05;
    });
  }, [lightingMode, isPowered]);

  // Render Mode (Realistic, CAD Wireframe, X-Ray) Update
  useEffect(() => {
    materialsRef.current.forEach((mat) => {
      if (mat instanceof THREE.MeshStandardMaterial) {
        if (renderMode === "cad") {
          mat.wireframe = true;
          mat.transparent = true;
          mat.opacity = 0.75;
        } else if (renderMode === "xray") {
          mat.wireframe = false;
          mat.transparent = true;
          mat.opacity = 0.28;
        } else {
          // realistic
          mat.wireframe = false;
          mat.transparent = (mat as any)._initiallyTransparent ?? false;
          mat.opacity = (mat as any)._initialOpacity ?? 1.0;
        }
        mat.needsUpdate = true;
      }
    });
  }, [renderMode]);

  // Three.js Master Setup
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
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const bgColor = 0x050c18;
    scene.background = new THREE.Color(bgColor);
    scene.fog = new THREE.FogExp2(bgColor, 0.035);

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 40);
    cameraRef.current = camera;

    // Helper material factory
    const matLib: THREE.Material[] = [];
    materialsRef.current = matLib;
    emissiveMaterialsRef.current = [];

    const createPBRMat = (
      color: number,
      opts: THREE.MeshStandardMaterialParameters = {},
      initiallyTransparent = false,
      initialOpacity = 1.0
    ) => {
      const m = new THREE.MeshStandardMaterial({
        color,
        roughness: opts.roughness ?? 0.35,
        metalness: opts.metalness ?? 0.3,
        ...opts,
      });
      (m as any)._initiallyTransparent = initiallyTransparent;
      (m as any)._initialOpacity = initialOpacity;
      if (initiallyTransparent) {
        m.transparent = true;
        m.opacity = initialOpacity;
      }
      matLib.push(m);
      return m;
    };

    // Shared Palette
    const frostedLensMat = createPBRMat(0xffffff, { roughness: 0.18, metalness: 0.05 }, true, 0.88);
    const lumEmissiveMat = createPBRMat(0xfff6ea, {
      roughness: 0.1,
      metalness: 0.0,
      emissive: 0xffe2b2,
      emissiveIntensity: 1.8,
    });
    emissiveMaterialsRef.current.push(lumEmissiveMat);

    const ledDieEmissiveMat = createPBRMat(0xfbbf24, {
      roughness: 0.2,
      metalness: 0.1,
      emissive: 0xffd166,
      emissiveIntensity: 2.2,
    });
    emissiveMaterialsRef.current.push(ledDieEmissiveMat);

    const brushedAluMat = createPBRMat(0xd8e2ed, { roughness: 0.28, metalness: 0.88 });
    const darkAluMat = createPBRMat(0x273549, { roughness: 0.35, metalness: 0.75 });
    const chromeMat = createPBRMat(0xf1f5f9, { roughness: 0.08, metalness: 0.98 });
    const copperMat = createPBRMat(0xb45309, { roughness: 0.25, metalness: 0.9 });
    const brassMat = createPBRMat(0xd97706, { roughness: 0.22, metalness: 0.92 });
    const whitePlasticMat = createPBRMat(0xf8fafc, { roughness: 0.38, metalness: 0.05 });
    const darkHousingMat = createPBRMat(0x0f172a, { roughness: 0.45, metalness: 0.25 });
    const pcbGreenMat = createPBRMat(0x15803d, { roughness: 0.45, metalness: 0.3 });
    const orangeAccentMat = createPBRMat(0xff5e14, { roughness: 0.25, metalness: 0.5 });
    const electronicBlackMat = createPBRMat(0x18181b, { roughness: 0.5, metalness: 0.2 });

    // Helper Mesh Function
    const makeMesh = (
      parent: THREE.Object3D,
      geo: THREE.BufferGeometry,
      mat: THREE.Material,
      x = 0,
      y = 0,
      z = 0,
      rx = 0,
      ry = 0,
      rz = 0
    ) => {
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, y, z);
      mesh.rotation.set(rx, ry, rz);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      parent.add(mesh);
      return mesh;
    };

    // STUDIO STAGE & TURNTABLE
    const stageGroup = new THREE.Group();
    scene.add(stageGroup);

    const podiumMat = createPBRMat(0x0b1728, { roughness: 0.22, metalness: 0.82 });
    const rimGlowMat = createPBRMat(0xff5e14, { emissive: 0xff5e14, emissiveIntensity: 0.8, roughness: 0.2 });

    makeMesh(stageGroup, new THREE.CylinderGeometry(2.4, 2.6, 0.22, 64), podiumMat, 0, -1.15, 0);
    makeMesh(stageGroup, new THREE.TorusGeometry(2.41, 0.025, 16, 64), rimGlowMat, 0, -1.04, 0, Math.PI / 2);

    const degreeCircleMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.45 });
    const circlePoints: THREE.Vector3[] = [];
    for (let i = 0; i <= 64; i++) {
      const a = (i / 64) * Math.PI * 2;
      circlePoints.push(new THREE.Vector3(Math.cos(a) * 2.15, -1.035, Math.sin(a) * 2.15));
    }
    const circleGeo = new THREE.BufferGeometry().setFromPoints(circlePoints);
    const degreeLine = new THREE.Line(circleGeo, degreeCircleMat);
    stageGroup.add(degreeLine);

    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const tickPts = [
        new THREE.Vector3(Math.cos(a) * 2.05, -1.035, Math.sin(a) * 2.05),
        new THREE.Vector3(Math.cos(a) * 2.25, -1.035, Math.sin(a) * 2.25),
      ];
      const tickGeo = new THREE.BufferGeometry().setFromPoints(tickPts);
      stageGroup.add(new THREE.Line(tickGeo, degreeCircleMat));
    }

    const floorGrid = new THREE.GridHelper(16, 16, 0xff5e14, 0x1e293b);
    floorGrid.position.y = -1.26;
    (floorGrid.material as THREE.Material).transparent = true;
    (floorGrid.material as THREE.Material).opacity = 0.25;
    scene.add(floorGrid);

    // STUDIO LIGHTS
    const ambLight = new THREE.AmbientLight(0xfff7ed, 0.75);
    scene.add(ambLight);

    const keyLight = new THREE.DirectionalLight(0xfff4e6, 2.2);
    keyLight.position.set(4.5, 6.0, 5.0);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xdbeafe, 1.1);
    fillLight.position.set(-4.5, 3.5, 4.0);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.4);
    rimLight.position.set(0, 4.5, -4.5);
    scene.add(rimLight);

    const productLight = new THREE.PointLight(0xffe2b2, 2.4, 6.5, 1.2);
    productLight.position.set(0, 0.4, 0);
    productLightRef.current = productLight;
    scene.add(productLight);

    const spotLight = new THREE.SpotLight(0xffe2b2, 4.0, 8.0, Math.PI / 3, 0.4, 1.5);
    spotLight.position.set(0, 0.5, 0);
    spotLight.target.position.set(0, -1.1, 0);
    spotLight.castShadow = true;
    spotLightRef.current = spotLight;
    scene.add(spotLight);
    scene.add(spotLight.target);

    // =========================================================================
    // PROCEDURAL HIGH-FIDELITY PRODUCT FACTORIES
    // =========================================================================
    const productGroups: THREE.Group[] = [];
    const productLayers: LayerComponent[][] = [];

    const addLayer = (
      layers: LayerComponent[],
      mesh: THREE.Object3D,
      name: string,
      dir: THREE.Vector3,
      dist: number
    ) => {
      layers.push({
        mesh,
        name,
        explodeDirection: dir.clone().normalize(),
        explodeDistance: dist,
        initialPos: mesh.position.clone(),
      });
      return mesh;
    };

    // 0: LED Bulb (12W Industrial Grade)
    (() => {
      const bulbRoot = new THREE.Group();
      const layers: LayerComponent[] = [];

      // Layer 0: Diffuser Lens
      const diffGroup = new THREE.Group();
      diffGroup.position.set(0, 0.35, 0);
      makeMesh(diffGroup, new THREE.SphereGeometry(0.58, 48, 32, 0, Math.PI * 2, 0, Math.PI * 0.65), frostedLensMat, 0, 0, 0);
      makeMesh(diffGroup, new THREE.TorusGeometry(0.54, 0.03, 16, 48), whitePlasticMat, 0, -0.22, 0, Math.PI / 2);
      bulbRoot.add(diffGroup);
      addLayer(layers, diffGroup, "Polycarbonate Diffuser Globe", new THREE.Vector3(0, 1, 0), 0.7);

      // Layer 1: Metal-Core PCB with 16 SMD 2835 LEDs
      const pcbGroup = new THREE.Group();
      pcbGroup.position.set(0, 0.1, 0);
      makeMesh(pcbGroup, new THREE.CylinderGeometry(0.5, 0.5, 0.03, 48), whitePlasticMat, 0, 0, 0);
      makeMesh(pcbGroup, new THREE.RingGeometry(0.18, 0.46, 32), copperMat, 0, 0.016, 0, -Math.PI / 2);

      for (let i = 0; i < 16; i++) {
        const a = (i / 16) * Math.PI * 2;
        const cx = Math.cos(a) * 0.34;
        const cz = Math.sin(a) * 0.34;
        makeMesh(pcbGroup, new THREE.BoxGeometry(0.065, 0.015, 0.065), ledDieEmissiveMat, cx, 0.02, cz, 0, a, 0);
      }
      makeMesh(pcbGroup, new THREE.BoxGeometry(0.08, 0.015, 0.08), ledDieEmissiveMat, 0, 0.02, 0);
      bulbRoot.add(pcbGroup);
      addLayer(layers, pcbGroup, "Metal-Core MCPCB & SMD LED Array", new THREE.Vector3(0, 1, 0), 0.3);

      // Layer 2: ADC12 Die-Cast Heat Sink Body
      const hsGroup = new THREE.Group();
      hsGroup.position.set(0, -0.15, 0);
      makeMesh(hsGroup, new THREE.CylinderGeometry(0.52, 0.38, 0.46, 48), darkAluMat, 0, 0, 0);
      makeMesh(hsGroup, new THREE.TorusGeometry(0.53, 0.03, 16, 48), orangeAccentMat, 0, 0.22, 0, Math.PI / 2);

      for (let i = 0; i < 16; i++) {
        const a = (i / 16) * Math.PI * 2;
        const fx = Math.cos(a) * 0.46;
        const fz = Math.sin(a) * 0.46;
        makeMesh(hsGroup, new THREE.BoxGeometry(0.025, 0.44, 0.05), brushedAluMat, fx, 0, fz, 0, a, 0);
      }
      bulbRoot.add(hsGroup);
      addLayer(layers, hsGroup, "Die-Cast ADC12 Heat Sink Housing", new THREE.Vector3(0, 0, 0), 0);

      // Layer 3: Internal IC Driver Board
      const drvGroup = new THREE.Group();
      drvGroup.position.set(0, -0.42, 0);
      makeMesh(drvGroup, new THREE.CylinderGeometry(0.32, 0.32, 0.03, 32), pcbGreenMat, 0, 0, 0);
      makeMesh(drvGroup, new THREE.CylinderGeometry(0.08, 0.08, 0.22, 16), electronicBlackMat, 0.1, 0.12, 0.05);
      makeMesh(drvGroup, new THREE.BoxGeometry(0.14, 0.15, 0.14), copperMat, -0.09, 0.09, -0.04);
      makeMesh(drvGroup, new THREE.CylinderGeometry(0.06, 0.06, 0.03, 16), createPBRMat(0x0284c7, { roughness: 0.3 }), 0.02, 0.04, -0.1, Math.PI / 2);
      bulbRoot.add(drvGroup);
      addLayer(layers, drvGroup, "Isolated Constant-Current IC Driver", new THREE.Vector3(0, -1, 0), 0.35);

      // Layer 4: Threaded Base (E27 / B22)
      const baseGroup = new THREE.Group();
      baseGroup.position.set(0, -0.68, 0);
      makeMesh(baseGroup, new THREE.CylinderGeometry(0.34, 0.26, 0.15, 36), whitePlasticMat, 0, 0.1, 0);

      for (let i = 0; i < 4; i++) {
        makeMesh(baseGroup, new THREE.TorusGeometry(0.245, 0.028, 12, 36), chromeMat, 0, -0.02 - i * 0.06, 0, Math.PI / 2);
      }
      makeMesh(baseGroup, new THREE.CylinderGeometry(0.24, 0.24, 0.22, 36), chromeMat, 0, -0.1, 0);
      makeMesh(baseGroup, new THREE.CylinderGeometry(0.18, 0.18, 0.04, 24), electronicBlackMat, 0, -0.22, 0);
      makeMesh(baseGroup, new THREE.CylinderGeometry(0.09, 0.09, 0.03, 24), brassMat, 0, -0.24, 0);
      bulbRoot.add(baseGroup);
      addLayer(layers, baseGroup, "Precision Nickel-Plated E27/B22 Base", new THREE.Vector3(0, -1, 0), 0.7);

      bulbRoot.position.set(0, 0.05, 0);
      bulbRoot.scale.setScalar(1.2);
      productGroups.push(bulbRoot);
      productLayers.push(layers);
    })();

    // 1: Architectural LED Batten (4ft Linear Luminaire)
    (() => {
      const battenRoot = new THREE.Group();
      const layers: LayerComponent[] = [];

      // Layer 0: Extruded Polycarbonate Diffuser
      const diffGroup = new THREE.Group();
      diffGroup.position.set(0, 0.18, 0);
      makeMesh(diffGroup, new THREE.BoxGeometry(3.1, 0.1, 0.36), frostedLensMat, 0, 0, 0);
      makeMesh(diffGroup, new THREE.CylinderGeometry(0.18, 0.18, 3.08, 32, 1, false, 0, Math.PI), frostedLensMat, 0, 0.05, 0, 0, 0, Math.PI / 2);
      battenRoot.add(diffGroup);
      addLayer(layers, diffGroup, "Extruded Polycarbonate Optical Diffuser", new THREE.Vector3(0, 1, 0), 0.55);

      // Layer 1: Dual Linear MCPCB LED Arrays
      const pcbGroup = new THREE.Group();
      pcbGroup.position.set(0, 0.06, 0);
      makeMesh(pcbGroup, new THREE.BoxGeometry(3.0, 0.02, 0.28), whitePlasticMat, 0, 0, 0);

      for (let i = 0; i < 18; i++) {
        const x = -1.35 + i * 0.16;
        makeMesh(pcbGroup, new THREE.BoxGeometry(0.045, 0.015, 0.045), ledDieEmissiveMat, x, 0.015, -0.065);
        makeMesh(pcbGroup, new THREE.BoxGeometry(0.045, 0.015, 0.045), ledDieEmissiveMat, x, 0.015, 0.065);
      }
      battenRoot.add(pcbGroup);
      addLayer(layers, pcbGroup, "Dual Linear Metal-Core LED Boards", new THREE.Vector3(0, 1, 0), 0.25);

      // Layer 2: Extruded Aluminium Spine Housing
      const spineGroup = new THREE.Group();
      spineGroup.position.set(0, -0.08, 0);
      makeMesh(spineGroup, new THREE.BoxGeometry(3.12, 0.18, 0.4), brushedAluMat, 0, 0, 0);
      makeMesh(spineGroup, new THREE.BoxGeometry(3.12, 0.03, 0.12), darkAluMat, 0, -0.1, 0);
      battenRoot.add(spineGroup);
      addLayer(layers, spineGroup, "Continuous Extruded Aluminium Chassis", new THREE.Vector3(0, 0, 0), 0);

      // Layer 3: Internal Electronic Driver & Terminals
      const drvGroup = new THREE.Group();
      drvGroup.position.set(0, -0.28, 0);
      makeMesh(drvGroup, new THREE.BoxGeometry(1.2, 0.08, 0.22), darkHousingMat, 0, 0, 0);
      makeMesh(drvGroup, new THREE.BoxGeometry(0.18, 0.07, 0.16), orangeAccentMat, 0.65, 0, 0);
      makeMesh(drvGroup, new THREE.BoxGeometry(0.18, 0.07, 0.16), orangeAccentMat, -0.65, 0, 0);
      battenRoot.add(drvGroup);
      addLayer(layers, drvGroup, "High-PF Isolated Linear Driver Module", new THREE.Vector3(0, -1, 0), 0.35);

      // Layer 4: Injection-Moulded End Caps
      const capLeft = new THREE.Group();
      capLeft.position.set(-1.6, 0, 0);
      makeMesh(capLeft, new THREE.BoxGeometry(0.1, 0.28, 0.42), orangeAccentMat, 0, 0, 0);
      battenRoot.add(capLeft);
      addLayer(layers, capLeft, "Left Modular End Cap", new THREE.Vector3(-1, 0, 0), 0.45);

      const capRight = new THREE.Group();
      capRight.position.set(1.6, 0, 0);
      makeMesh(capRight, new THREE.BoxGeometry(0.1, 0.28, 0.42), orangeAccentMat, 0, 0, 0);
      battenRoot.add(capRight);
      addLayer(layers, capRight, "Right Wire-Entry End Cap", new THREE.Vector3(1, 0, 0), 0.45);

      battenRoot.position.set(0, 0.1, 0);
      battenRoot.rotation.set(0.25, -0.5, 0.1);
      battenRoot.scale.setScalar(0.95);
      productGroups.push(battenRoot);
      productLayers.push(layers);
    })();

    // 2: Heavy-Duty Municipal Street Light (IP66 Highway Luminaire)
    (() => {
      const slRoot = new THREE.Group();
      const layers: LayerComponent[] = [];

      // Layer 0: Toughened Glass Cover & Silicone Seal
      const glassGroup = new THREE.Group();
      glassGroup.position.set(-0.25, -0.22, 0);
      makeMesh(glassGroup, new THREE.BoxGeometry(1.6, 0.04, 0.9), frostedLensMat, 0, 0, 0);
      makeMesh(glassGroup, new THREE.BoxGeometry(1.66, 0.05, 0.05), chromeMat, 0, 0, 0.46);
      makeMesh(glassGroup, new THREE.BoxGeometry(1.66, 0.05, 0.05), chromeMat, 0, 0, -0.46);
      slRoot.add(glassGroup);
      addLayer(layers, glassGroup, "IK08 Toughened Glass & Ingress Seal", new THREE.Vector3(0, -1, 0), 0.45);

      // Layer 1: Batwing Secondary Optical Lens Array (2x6 matrix)
      const lensGroup = new THREE.Group();
      lensGroup.position.set(-0.25, -0.1, 0);
      for (let r = 0; r < 2; r++) {
        for (let c = 0; c < 6; c++) {
          const z = -0.26 + r * 0.52;
          const x = -0.62 + c * 0.25;
          makeMesh(lensGroup, new THREE.SphereGeometry(0.08, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5), frostedLensMat, x, 0.02, z);
          makeMesh(lensGroup, new THREE.BoxGeometry(0.05, 0.015, 0.05), ledDieEmissiveMat, x, 0.0, z);
        }
      }
      makeMesh(lensGroup, new THREE.BoxGeometry(1.55, 0.02, 0.82), whitePlasticMat, 0, -0.01, 0);
      slRoot.add(lensGroup);
      addLayer(layers, lensGroup, "Batwing Secondary Optical Lens Array", new THREE.Vector3(0, -1, 0), 0.25);

      // Layer 2: Main Die-Cast Aerodynamic Body & Convective Cooling Fins
      const bodyGroup = new THREE.Group();
      bodyGroup.position.set(0, 0.05, 0);
      makeMesh(bodyGroup, new THREE.BoxGeometry(2.3, 0.22, 1.05), darkAluMat, 0, 0, 0);
      makeMesh(bodyGroup, new THREE.ConeGeometry(0.55, 0.7, 4), darkAluMat, -1.2, 0, 0, 0, 0, Math.PI / 2);

      for (let i = 0; i < 12; i++) {
        const x = -0.8 + i * 0.15;
        makeMesh(bodyGroup, new THREE.BoxGeometry(0.04, 0.28, 0.95), brushedAluMat, x, 0.2, 0);
      }

      makeMesh(bodyGroup, new THREE.CylinderGeometry(0.18, 0.18, 0.65, 32), darkAluMat, 1.25, 0.04, 0, 0, 0, Math.PI / 2);
      makeMesh(bodyGroup, new THREE.BoxGeometry(0.08, 0.1, 0.32), chromeMat, 1.25, 0.18, 0);
      slRoot.add(bodyGroup);
      addLayer(layers, bodyGroup, "Heavy ADC12 Die-Cast Chassis & Spigot", new THREE.Vector3(0, 0, 0), 0);

      // Layer 3: Potted IP67 Driver & 10kV Surge Arrestor
      const drvGroup = new THREE.Group();
      drvGroup.position.set(0.65, 0.28, 0);
      makeMesh(drvGroup, new THREE.BoxGeometry(0.75, 0.18, 0.65), electronicBlackMat, 0, 0, 0);
      makeMesh(drvGroup, new THREE.CylinderGeometry(0.08, 0.08, 0.12, 16), orangeAccentMat, 0.25, 0.12, 0.15);
      makeMesh(drvGroup, new THREE.BoxGeometry(0.25, 0.08, 0.2), createPBRMat(0x0284c7, { roughness: 0.3 }), -0.2, 0.12, -0.15);
      slRoot.add(drvGroup);
      addLayer(layers, drvGroup, "Potted IP67 Driver & 10kV Surge Module", new THREE.Vector3(0, 1, 0), 0.45);

      slRoot.position.set(0, 0.08, 0);
      slRoot.rotation.set(0.35, 0.65, -0.1);
      slRoot.scale.setScalar(1.05);
      productGroups.push(slRoot);
      productLayers.push(layers);
    })();

    // 3: Architectural Deep-Baffle Downlight & Spotlight
    (() => {
      const dlRoot = new THREE.Group();
      const layers: LayerComponent[] = [];

      // Layer 0: Outer Flange & Ceiling Retention Springs
      const trimGroup = new THREE.Group();
      trimGroup.position.set(0, -0.45, 0);
      makeMesh(trimGroup, new THREE.CylinderGeometry(0.9, 0.9, 0.05, 48), whitePlasticMat, 0, 0, 0);
      makeMesh(trimGroup, new THREE.CylinderGeometry(0.02, 0.02, 0.45, 12), chromeMat, -0.85, 0.2, 0, 0, 0, 0.4);
      makeMesh(trimGroup, new THREE.CylinderGeometry(0.02, 0.02, 0.45, 12), chromeMat, 0.85, 0.2, 0, 0, 0, -0.4);
      dlRoot.add(trimGroup);
      addLayer(layers, trimGroup, "Powder-Coated Trim & Spring Retention Arms", new THREE.Vector3(0, -1, 0), 0.45);

      // Layer 1: Stepped Anti-Glare Baffle Cone (UGR < 19)
      const baffleGroup = new THREE.Group();
      baffleGroup.position.set(0, -0.22, 0);
      makeMesh(baffleGroup, new THREE.CylinderGeometry(0.55, 0.8, 0.35, 48, 1, true), darkHousingMat, 0, 0, 0);
      makeMesh(baffleGroup, new THREE.TorusGeometry(0.68, 0.02, 16, 48), orangeAccentMat, 0, -0.12, 0, Math.PI / 2);
      makeMesh(baffleGroup, new THREE.TorusGeometry(0.58, 0.02, 16, 48), orangeAccentMat, 0, 0.05, 0, Math.PI / 2);
      dlRoot.add(baffleGroup);
      addLayer(layers, baffleGroup, "Stepped Anti-Glare Conical Baffle", new THREE.Vector3(0, -1, 0), 0.25);

      // Layer 2: Faceted Specular Reflector & COB Light Engine
      const cobGroup = new THREE.Group();
      cobGroup.position.set(0, 0.05, 0);
      makeMesh(cobGroup, new THREE.CylinderGeometry(0.25, 0.52, 0.35, 48, 1, true), chromeMat, 0, 0, 0);
      makeMesh(cobGroup, new THREE.CylinderGeometry(0.22, 0.22, 0.03, 32), whitePlasticMat, 0, 0.16, 0);
      makeMesh(cobGroup, new THREE.CylinderGeometry(0.12, 0.12, 0.02, 32), ledDieEmissiveMat, 0, 0.18, 0);
      dlRoot.add(cobGroup);
      addLayer(layers, cobGroup, "Faceted Parabolic Reflector & COB Engine", new THREE.Vector3(0, 0, 0), 0);

      // Layer 3: Radial Heat Sink Tower
      const hsGroup = new THREE.Group();
      hsGroup.position.set(0, 0.42, 0);
      makeMesh(hsGroup, new THREE.CylinderGeometry(0.55, 0.55, 0.45, 32), darkAluMat, 0, 0, 0);
      for (let i = 0; i < 16; i++) {
        const a = (i / 16) * Math.PI * 2;
        const fx = Math.cos(a) * 0.48;
        const fz = Math.sin(a) * 0.48;
        makeMesh(hsGroup, new THREE.BoxGeometry(0.03, 0.44, 0.12), brushedAluMat, fx, 0, fz, 0, a, 0);
      }
      dlRoot.add(hsGroup);
      addLayer(layers, hsGroup, "Radial Extruded Aluminium Heat Sink", new THREE.Vector3(0, 1, 0), 0.35);

      // Layer 4: Companion External Driver Box
      const drvGroup = new THREE.Group();
      drvGroup.position.set(0, 0.85, 0);
      makeMesh(drvGroup, new THREE.BoxGeometry(0.7, 0.18, 0.38), electronicBlackMat, 0, 0, 0);
      makeMesh(drvGroup, new THREE.BoxGeometry(0.12, 0.08, 0.1), orangeAccentMat, 0.35, 0, 0);
      dlRoot.add(drvGroup);
      addLayer(layers, drvGroup, "External Isolated Constant-Current Driver", new THREE.Vector3(0, 1, 0), 0.7);

      dlRoot.position.set(0, 0.05, 0);
      dlRoot.rotation.set(0.45, 0.3, 0);
      dlRoot.scale.setScalar(1.15);
      productGroups.push(dlRoot);
      productLayers.push(layers);
    })();

    // 4: Smart Connected RGB+CCT IoT Bulb
    (() => {
      const smartRoot = new THREE.Group();
      const layers: LayerComponent[] = [];

      // Layer 0: Diffuser Dome
      const diffGroup = new THREE.Group();
      diffGroup.position.set(0, 0.35, 0);
      makeMesh(diffGroup, new THREE.SphereGeometry(0.55, 48, 32, 0, Math.PI * 2, 0, Math.PI * 0.65), frostedLensMat, 0, 0, 0);
      smartRoot.add(diffGroup);
      addLayer(layers, diffGroup, "Optically Tuned Polycarbonate Diffuser", new THREE.Vector3(0, 1, 0), 0.7);

      // Layer 1: Dual-Ring RGB + Tunable White LED Engine
      const ledGroup = new THREE.Group();
      ledGroup.position.set(0, 0.1, 0);
      makeMesh(ledGroup, new THREE.CylinderGeometry(0.48, 0.48, 0.03, 48), whitePlasticMat, 0, 0, 0);

      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * Math.PI * 2;
        const rx = Math.cos(a) * 0.35;
        const rz = Math.sin(a) * 0.35;
        const rgbMat = createPBRMat(0xff5e14, {
          roughness: 0.2,
          emissive: (i % 3 === 0 ? 0xff0055 : i % 3 === 1 ? 0x00ff88 : 0x0088ff),
          emissiveIntensity: 2.2,
        });
        emissiveMaterialsRef.current.push(rgbMat);
        makeMesh(ledGroup, new THREE.BoxGeometry(0.06, 0.02, 0.06), rgbMat, rx, 0.02, rz, 0, a, 0);
      }

      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        const wx = Math.cos(a) * 0.18;
        const wz = Math.sin(a) * 0.18;
        makeMesh(ledGroup, new THREE.BoxGeometry(0.05, 0.02, 0.05), ledDieEmissiveMat, wx, 0.02, wz, 0, a, 0);
      }
      smartRoot.add(ledGroup);
      addLayer(layers, ledGroup, "Multi-Channel RGB + CCT LED Matrix", new THREE.Vector3(0, 1, 0), 0.3);

      // Layer 2: Smart Ring & Fluted Heat Sink
      const ringGroup = new THREE.Group();
      ringGroup.position.set(0, -0.15, 0);
      makeMesh(ringGroup, new THREE.CylinderGeometry(0.5, 0.38, 0.42, 48), darkAluMat, 0, 0, 0);
      makeMesh(ringGroup, new THREE.TorusGeometry(0.51, 0.03, 16, 48), orangeAccentMat, 0, 0.18, 0, Math.PI / 2);
      smartRoot.add(ringGroup);
      addLayer(layers, ringGroup, "Thermally Engineered Composite Shell", new THREE.Vector3(0, 0, 0), 0);

      // Layer 3: IoT SoC Microcontroller & Multi-Channel Driver
      const iotGroup = new THREE.Group();
      iotGroup.position.set(0, -0.42, 0);
      makeMesh(iotGroup, new THREE.CylinderGeometry(0.3, 0.3, 0.03, 32), pcbGreenMat, 0, 0, 0);
      makeMesh(iotGroup, new THREE.BoxGeometry(0.18, 0.06, 0.18), chromeMat, 0, 0.04, 0);
      smartRoot.add(iotGroup);
      addLayer(layers, iotGroup, "Dual-Band Wi-Fi & BLE Mesh IoT Module", new THREE.Vector3(0, -1, 0), 0.35);

      // Layer 4: E27 Nickel Screw Base
      const baseGroup = new THREE.Group();
      baseGroup.position.set(0, -0.68, 0);
      makeMesh(baseGroup, new THREE.CylinderGeometry(0.32, 0.25, 0.14, 36), whitePlasticMat, 0, 0.08, 0);
      for (let i = 0; i < 4; i++) {
        makeMesh(baseGroup, new THREE.TorusGeometry(0.24, 0.026, 12, 36), chromeMat, 0, -0.02 - i * 0.06, 0, Math.PI / 2);
      }
      makeMesh(baseGroup, new THREE.CylinderGeometry(0.23, 0.23, 0.2, 36), chromeMat, 0, -0.1, 0);
      makeMesh(baseGroup, new THREE.CylinderGeometry(0.08, 0.08, 0.03, 24), brassMat, 0, -0.22, 0);
      smartRoot.add(baseGroup);
      addLayer(layers, baseGroup, "Nickel-Plated E27 Smart Base Fitting", new THREE.Vector3(0, -1, 0), 0.7);

      smartRoot.position.set(0, 0.05, 0);
      smartRoot.rotation.set(0.15, 0.4, 0);
      smartRoot.scale.setScalar(1.2);
      productGroups.push(smartRoot);
      productLayers.push(layers);
    })();

    // 5: Architectural Circular Ceiling Panel Light
    (() => {
      const panRoot = new THREE.Group();
      const layers: LayerComponent[] = [];

      // Layer 0: Micro-Prismatic Glare-Free Diffuser Face
      const faceGroup = new THREE.Group();
      faceGroup.position.set(0, -0.18, 0);
      makeMesh(faceGroup, new THREE.CylinderGeometry(1.2, 1.2, 0.04, 64), frostedLensMat, 0, 0, 0);
      makeMesh(faceGroup, new THREE.TorusGeometry(1.21, 0.03, 16, 64), whitePlasticMat, 0, 0, 0, Math.PI / 2);
      panRoot.add(faceGroup);
      addLayer(layers, faceGroup, "Micro-Prismatic Luminous Diffuser", new THREE.Vector3(0, -1, 0), 0.45);

      // Layer 1: Laser-Dotted Light Guide Plate (LGP) & Edge-Lit LED Ring
      const lgpGroup = new THREE.Group();
      lgpGroup.position.set(0, -0.05, 0);
      makeMesh(lgpGroup, new THREE.CylinderGeometry(1.16, 1.16, 0.04, 64), frostedLensMat, 0, 0, 0);
      for (let i = 0; i < 32; i++) {
        const a = (i / 32) * Math.PI * 2;
        const ex = Math.cos(a) * 1.15;
        const ez = Math.sin(a) * 1.15;
        makeMesh(lgpGroup, new THREE.BoxGeometry(0.04, 0.02, 0.04), ledDieEmissiveMat, ex, 0, ez, 0, a, 0);
      }
      panRoot.add(lgpGroup);
      addLayer(layers, lgpGroup, "Laser-Dotted Light Guide Plate & LEDs", new THREE.Vector3(0, -1, 0), 0.2);

      // Layer 2: Seamless Extruded Aluminium Bezel Ring
      const bezelGroup = new THREE.Group();
      bezelGroup.position.set(0, 0.06, 0);
      makeMesh(bezelGroup, new THREE.CylinderGeometry(1.26, 1.26, 0.12, 64, 1, true), darkAluMat, 0, 0, 0);
      makeMesh(bezelGroup, new THREE.TorusGeometry(1.26, 0.035, 16, 64), orangeAccentMat, 0, -0.04, 0, Math.PI / 2);
      panRoot.add(bezelGroup);
      addLayer(layers, bezelGroup, "Seamless Aluminium Extrusion Perimeter Bezel", new THREE.Vector3(0, 0, 0), 0);

      // Layer 3: Rear Galvanized Reflective Pan & Twist-Lock Bracket
      const backGroup = new THREE.Group();
      backGroup.position.set(0, 0.22, 0);
      makeMesh(backGroup, new THREE.CylinderGeometry(1.22, 1.22, 0.06, 64), brushedAluMat, 0, 0, 0);
      makeMesh(backGroup, new THREE.BoxGeometry(1.1, 0.04, 0.25), chromeMat, 0, 0.06, 0);
      makeMesh(backGroup, new THREE.BoxGeometry(0.35, 0.12, 0.2), electronicBlackMat, 0, 0.14, 0);
      panRoot.add(backGroup);
      addLayer(layers, backGroup, "Rear Nano-Reflector & Quick-Twist Base", new THREE.Vector3(0, 1, 0), 0.45);

      panRoot.position.set(0, 0.08, 0);
      panRoot.rotation.set(0.65, -0.35, 0.15);
      panRoot.scale.setScalar(1.05);
      productGroups.push(panRoot);
      productLayers.push(layers);
    })();

    // Add all product groups to stage
    productGroups.forEach((g) => stageGroup.add(g));
    productGroupsRef.current = productGroups;
    productLayersRef.current = productLayers;

    // =========================================================================
    // PRODUCTION CAD GLTF LOADER SETUP
    // =========================================================================
    const cadMasterGroup = new THREE.Group();
    stageGroup.add(cadMasterGroup);
    cadMasterGroupRef.current = cadMasterGroup;

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/gltf/");
    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

    const loadCadModel = (url: string, config: CadAssetConfig) => {
      const existing = loadedCadMapRef.current.get(config.key);
      if (existing) {
        if (existing.parent !== cadMasterGroup) {
          cadMasterGroup.add(existing);
        }
        setLoadingCad(false);
        setCadProgress(100);
        return;
      }
      setLoadingCad(true);
      setCadProgress(15);
      gltfLoader.load(
        url,
        (gltf) => {
          const model = gltf.scene || gltf.scenes[0];
          if (!model) {
            setLoadingCad(false);
            return;
          }

          // Filter out unwanted background studio planes, backdrop sheets, cameras, lights, or extra clone meshes
          const toRemove: THREE.Object3D[] = [];
          model.traverse((child) => {
            if (child instanceof THREE.Light || child instanceof THREE.Camera) {
              toRemove.push(child);
              return;
            }
            const name = (child.name || "").toLowerCase();
            if (
              name === "light" ||
              name === "camera" ||
              name === "lamp" ||
              name === "sun" ||
              name.startsWith("plane") ||
              name.includes("backdrop") ||
              name.includes("ground_plane") ||
              name.includes("studio_plane") ||
              (config.key.includes("bulb") && (name.includes(".001") || name.includes(".002"))) ||
              (config.key === "batten" && (name.includes("_04") || name.includes("_05")))
            ) {
              toRemove.push(child);
            }
          });
          toRemove.forEach((child) => {
            if (child.parent) {
              child.parent.remove(child);
            }
          });

          const box = new THREE.Box3().setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z) || 1;
          const scale = config.targetScale / maxDim;

          // Master wrapper (lerped by renderLoop for smooth scale/visibility transitions)
          const wrapper = new THREE.Group();

          // Pivot group: handles rotation and Y elevation around the true geometric center
          const pivot = new THREE.Group();
          pivot.position.y = config.positionYOffset || 0;
          if (config.rotationOffset) {
            pivot.rotation.set(...config.rotationOffset);
          }

          // Inner group: offsets and scales raw geometry so its center is exactly at (0, 0, 0)
          const inner = new THREE.Group();
          inner.scale.setScalar(scale);
          inner.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
          inner.add(model);

          pivot.add(inner);
          wrapper.add(pivot);
          wrapper.scale.setScalar(0.0001);
          wrapper.visible = false;

          // Material upgrades and shadow registration
          model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.castShadow = true;
              child.receiveShadow = true;
              const meshName = (child.name || "").toLowerCase();

              const matName = (
                child.material && "name" in child.material
                  ? ((child.material as any).name || "")
                  : ""
              ).toLowerCase();

              // Special high-fidelity material handling for Bulb & Smart Bulb
              if (config.key.includes("bulb")) {
                if (meshName.includes("metal") || matName.includes("metal")) {
                  const metalMat = new THREE.MeshStandardMaterial({
                    color: 0xe2e8f0,
                    metalness: 0.95,
                    roughness: 0.22,
                  });
                  (metalMat as any)._initiallyTransparent = false;
                  (metalMat as any)._initialOpacity = 1.0;
                  child.material = metalMat;
                  materialsRef.current.push(metalMat);
                } else if (
                  meshName.includes("light_plastic") ||
                  meshName.includes("diffuser") ||
                  matName.includes("light_plastic") ||
                  matName.includes("diffuser")
                ) {
                  const currentHex =
                    lightingModeRef.current === "warm"
                      ? 0xffa500
                      : lightingModeRef.current === "neutral"
                      ? 0xffe2b2
                      : lightingModeRef.current === "daylight"
                      ? 0xf0f9ff
                      : 0xa855f7;
                  const globeMat = new THREE.MeshStandardMaterial({
                    color: 0xffffff,
                    roughness: 0.15,
                    metalness: 0.02,
                    emissive: new THREE.Color(currentHex),
                    emissiveIntensity: isPoweredRef.current ? (lightingModeRef.current === "cyber" ? 2.5 : 1.8) : 0.05,
                  });
                  (globeMat as any)._initiallyTransparent = false;
                  (globeMat as any)._initialOpacity = 1.0;
                  child.material = globeMat;
                  materialsRef.current.push(globeMat);
                  emissiveMaterialsRef.current.push(globeMat);
                } else if (meshName.includes("plastic") || matName.includes("plastic")) {
                  const bodyMat = new THREE.MeshStandardMaterial({
                    color: 0xf8fafc,
                    metalness: 0.05,
                    roughness: 0.38,
                  });
                  (bodyMat as any)._initiallyTransparent = false;
                  (bodyMat as any)._initialOpacity = 1.0;
                  child.material = bodyMat;
                  materialsRef.current.push(bodyMat);
                }
              } else if (config.key === "batten") {
                if (
                  meshName.includes("03") ||
                  meshName.includes("diffuser") ||
                  matName.includes("03") ||
                  matName.includes("diffuser")
                ) {
                  const currentHex =
                    lightingModeRef.current === "warm"
                      ? 0xffe2b2
                      : lightingModeRef.current === "neutral"
                      ? 0xfff4e6
                      : lightingModeRef.current === "daylight"
                      ? 0xdcf0ff
                      : 0x38bdf8;
                  const diffMat = new THREE.MeshStandardMaterial({
                    color: 0xffffff,
                    roughness: 0.2,
                    metalness: 0.05,
                    emissive: new THREE.Color(currentHex),
                    emissiveIntensity: isPoweredRef.current ? 1.6 : 0.05,
                  });
                  (diffMat as any)._initiallyTransparent = false;
                  (diffMat as any)._initialOpacity = 1.0;
                  child.material = diffMat;
                  materialsRef.current.push(diffMat);
                  emissiveMaterialsRef.current.push(diffMat);
                } else {
                  const aluMat = new THREE.MeshStandardMaterial({
                    color: 0xd8e2ed,
                    metalness: 0.88,
                    roughness: 0.28,
                  });
                  (aluMat as any)._initiallyTransparent = false;
                  (aluMat as any)._initialOpacity = 1.0;
                  child.material = aluMat;
                  materialsRef.current.push(aluMat);
                }
              } else if (config.key.includes("street")) {
                const currentHex =
                  lightingModeRef.current === "warm"
                    ? 0xffe2b2
                    : lightingModeRef.current === "neutral"
                    ? 0xfff4e6
                    : lightingModeRef.current === "daylight"
                    ? 0xdcf0ff
                    : 0x38bdf8;

                const isLuminous =
                  meshName.includes("glass") ||
                  meshName.includes("lens") ||
                  meshName.includes("led") ||
                  meshName.includes("light") ||
                  meshName.includes("148") ||
                  meshName.includes("152") ||
                  matName.includes("148") ||
                  matName.includes("152") ||
                  matName.includes("glass") ||
                  matName.includes("lens") ||
                  matName.includes("led");

                const isBracket =
                  meshName.includes("bracket") ||
                  meshName.includes("mount") ||
                  meshName.includes("bolt") ||
                  meshName.includes("154") ||
                  matName.includes("154") ||
                  matName.includes("bracket");

                if (isLuminous) {
                  const lensMat = new THREE.MeshStandardMaterial({
                    color: 0xffffff,
                    roughness: 0.1,
                    metalness: 0.05,
                    emissive: new THREE.Color(currentHex),
                    emissiveIntensity: isPoweredRef.current ? 2.2 : 0.05,
                  });
                  (lensMat as any)._initiallyTransparent = false;
                  (lensMat as any)._initialOpacity = 1.0;
                  child.material = lensMat;
                  materialsRef.current.push(lensMat);
                  emissiveMaterialsRef.current.push(lensMat);
                } else if (isBracket) {
                  const bracketMat = new THREE.MeshStandardMaterial({
                    color: 0x94a3b8,
                    metalness: 0.88,
                    roughness: 0.25,
                  });
                  (bracketMat as any)._initiallyTransparent = false;
                  (bracketMat as any)._initialOpacity = 1.0;
                  child.material = bracketMat;
                  materialsRef.current.push(bracketMat);
                } else {
                  // Cast Aluminium Housing with aerodynamic cooling fins - architectural metallic slate
                  const finMat = new THREE.MeshStandardMaterial({
                    color: 0x475569,
                    metalness: 0.82,
                    roughness: 0.32,
                  });
                  (finMat as any)._initiallyTransparent = false;
                  (finMat as any)._initialOpacity = 1.0;
                  child.material = finMat;
                  materialsRef.current.push(finMat);
                }
              } else if (config.key === "downlight" || config.key === "ceiling_panel") {
                const currentHex =
                  lightingModeRef.current === "warm"
                    ? 0xffe2b2
                    : lightingModeRef.current === "neutral"
                    ? 0xfff4e6
                    : lightingModeRef.current === "daylight"
                    ? 0xdcf0ff
                    : 0x38bdf8;

                const isLuminous =
                  meshName.includes("cylinder") ||
                  meshName.includes("diffuser") ||
                  meshName.includes("glass") ||
                  meshName.includes("pcylinder5") ||
                  matName.includes("diffuser") ||
                  matName.includes("glass");

                const isReflector =
                  meshName.includes("29") ||
                  meshName.includes("reflector") ||
                  matName.includes("29") ||
                  matName.includes("reflector");

                if (isLuminous) {
                  const downlightLensMat = new THREE.MeshStandardMaterial({
                    color: 0xffffff,
                    roughness: 0.12,
                    metalness: 0.02,
                    emissive: new THREE.Color(currentHex),
                    emissiveIntensity: isPoweredRef.current ? 1.8 : 0.05,
                  });
                  (downlightLensMat as any)._initiallyTransparent = false;
                  (downlightLensMat as any)._initialOpacity = 1.0;
                  child.material = downlightLensMat;
                  materialsRef.current.push(downlightLensMat);
                  emissiveMaterialsRef.current.push(downlightLensMat);
                } else if (isReflector) {
                  const specReflectorMat = new THREE.MeshStandardMaterial({
                    color: 0xf1f5f9,
                    metalness: 0.95,
                    roughness: 0.1,
                  });
                  (specReflectorMat as any)._initiallyTransparent = false;
                  (specReflectorMat as any)._initialOpacity = 1.0;
                  child.material = specReflectorMat;
                  materialsRef.current.push(specReflectorMat);
                } else {
                  // Architectural white canister rim and retention springs
                  const trimMat = new THREE.MeshStandardMaterial({
                    color: 0xf8fafc,
                    metalness: 0.08,
                    roughness: 0.32,
                  });
                  (trimMat as any)._initiallyTransparent = false;
                  (trimMat as any)._initialOpacity = 1.0;
                  child.material = trimMat;
                  materialsRef.current.push(trimMat);
                }
              } else if (config.key === "spotlight") {
                const currentHex =
                  lightingModeRef.current === "warm"
                    ? 0xffe2b2
                    : lightingModeRef.current === "neutral"
                    ? 0xfff4e6
                    : lightingModeRef.current === "daylight"
                    ? 0xdcf0ff
                    : 0x38bdf8;

                const isLens =
                  meshName.includes("35") ||
                  meshName.includes("36") ||
                  meshName.includes("lens") ||
                  meshName.includes("led") ||
                  matName.includes("35") ||
                  matName.includes("36") ||
                  matName.includes("led") ||
                  matName.includes("lens");

                if (isLens) {
                  const spotLensMat = new THREE.MeshStandardMaterial({
                    color: 0xffffff,
                    roughness: 0.12,
                    metalness: 0.05,
                    emissive: new THREE.Color(currentHex),
                    emissiveIntensity: isPoweredRef.current ? 2.4 : 0.05,
                  });
                  (spotLensMat as any)._initiallyTransparent = false;
                  (spotLensMat as any)._initialOpacity = 1.0;
                  child.material = spotLensMat;
                  materialsRef.current.push(spotLensMat);
                  emissiveMaterialsRef.current.push(spotLensMat);
                } else {
                  const spotBodyMat = new THREE.MeshStandardMaterial({
                    color: 0x18181b,
                    metalness: 0.72,
                    roughness: 0.32,
                  });
                  (spotBodyMat as any)._initiallyTransparent = false;
                  (spotBodyMat as any)._initialOpacity = 1.0;
                  child.material = spotBodyMat;
                  materialsRef.current.push(spotBodyMat);
                }
              } else if (child.material) {
                const mats = Array.isArray(child.material) ? child.material : [child.material];
                mats.forEach((m) => {
                  if (m instanceof THREE.MeshStandardMaterial) {
                    (m as any)._initiallyTransparent = m.transparent;
                    (m as any)._initialOpacity = m.opacity;
                    m.roughness = Math.min(0.65, Math.max(0.18, m.roughness));
                    m.metalness = Math.max(0.12, m.metalness);
                    materialsRef.current.push(m);
                  }
                });
              }
            }
          });

          cadMasterGroup.add(wrapper);
          loadedCadMapRef.current.set(config.key, wrapper);
          setLoadingCad(false);
          setCadProgress(100);
        },
        (xhr) => {
          if (xhr.total > 0) {
            setCadProgress(Math.round((xhr.loaded / xhr.total) * 100));
          }
        },
        (err) => {
          console.warn("CAD load warning:", err);
          setLoadingCad(false);
        }
      );
    };

    loadCadModelRef.current = loadCadModel;

    // Load initial CAD model
    if (activeCadConfig) {
      loadCadModel(activeCadConfig.url, activeCadConfig);
    }

    // RESIZE HANDLER
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    handleResize();
    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);
    window.addEventListener("resize", handleResize);

    // =========================================================================
    // RENDER & ANIMATION LOOP
    // =========================================================================
    let time = 0;

    const renderLoop = () => {
      time += 0.012;
      animFrameIdRef.current = requestAnimationFrame(renderLoop);

      const orbit = cameraOrbitRef.current;

      // Auto rotation when idle
      if (autoRotateRef.current && !isDraggingRef.current) {
        orbit.targetTheta += 0.0035;
      }

      // Smooth damping interpolation for camera orbit
      orbit.theta += (orbit.targetTheta - orbit.theta) * 0.08;
      orbit.phi += (orbit.targetPhi - orbit.phi) * 0.08;
      orbit.radius += (orbit.targetRadius - orbit.radius) * 0.08;
      orbit.panX += (orbit.targetPanX - orbit.panX) * 0.08;

      orbit.phi = Math.max(0.15, Math.min(Math.PI / 2 - 0.05, orbit.phi));

      const cx = orbit.radius * Math.sin(orbit.phi) * Math.sin(orbit.theta);
      const cy = orbit.radius * Math.cos(orbit.phi);
      const cz = orbit.radius * Math.sin(orbit.phi) * Math.cos(orbit.theta);

      // Camera horizontal right unit vector in XZ plane (orthogonal to view direction)
      const rLen = Math.hypot(cx, cz) || 1;
      const rx = cz / rLen;
      const rz = -cx / rLen;

      // Pan horizontally across screen along camera local right axis
      const shiftX = rx * orbit.panX;
      const shiftZ = rz * orbit.panX;

      camera.position.set(cx + shiftX, cy + 0.15, cz + shiftZ);
      camera.lookAt(shiftX, 0.15, shiftZ);

      // Smooth explode animation interpolation
      explodeRatioRef.current += (targetExplodeRatioRef.current - explodeRatioRef.current) * 0.09;
      const currentExplode = explodeRatioRef.current;

      const curIdx = activeIndexRef.current;
      const isCadMode = modelModeRef.current === "cad";
      const currentVariantKey = variantMapRef.current[curIdx] || "primary";
      const currentVariantConfig =
        PRODUCT_CAD_VARIANTS[curIdx]?.[currentVariantKey] || PRODUCT_CAD_VARIANTS[curIdx]?.primary;
      const activeCadKey = currentVariantConfig?.key;

      // Update Procedural Exploded Groups
      productGroupsRef.current.forEach((group, idx) => {
        const isCurrent = idx === curIdx && !isCadMode;
        const targetScale = isCurrent ? 1.0 : 0.0001;

        const curScale = group.scale.x;
        const nextScale = curScale + (targetScale - curScale) * 0.12;
        group.scale.setScalar(nextScale);
        group.visible = nextScale > 0.01;

        if (isCurrent && productLayersRef.current[idx]) {
          productLayersRef.current[idx].forEach((layer) => {
            const explodeOffset = layer.explodeDirection
              .clone()
              .multiplyScalar(layer.explodeDistance * currentExplode);
            layer.mesh.position.copy(layer.initialPos).add(explodeOffset);
          });
        }
      });

      // Update Production CAD Mesh Groups
      if (cadMasterGroupRef.current) {
        loadedCadMapRef.current.forEach((wrapper, key) => {
          const isCurrent = isCadMode && key === activeCadKey;
          const targetScale = isCurrent ? 1.0 : 0.0001;

          const curScale = wrapper.scale.x;
          const nextScale = curScale + (targetScale - curScale) * 0.12;
          wrapper.scale.setScalar(nextScale);
          wrapper.visible = nextScale > 0.01;
        });
      }

      // Update 2D Screen Projections for Hotspots
      if (container && camera) {
        const currentProductHotspots = activeProductRef.current?.hotspots || [];
        const activeCadModel = activeCadKey ? loadedCadMapRef.current.get(activeCadKey) : null;
        const targetGroup =
          isCadMode && activeCadModel && activeCadModel.children[0]
            ? activeCadModel.children[0]
            : (activeCadModel || productGroupsRef.current[curIdx]);

        const isVisible = isCadMode ? Boolean(activeCadModel && activeCadModel.visible) : Boolean(targetGroup && targetGroup.visible);

        if (targetGroup && isVisible) {
          const coords = currentProductHotspots.map((hs) => {
            const v = new THREE.Vector3(...hs.position);
            v.applyMatrix4(targetGroup.matrixWorld);

            const isBehind = v.dot(camera.getWorldDirection(new THREE.Vector3())) < 0;

            v.project(camera);
            const halfW = container.clientWidth / 2;
            const halfH = container.clientHeight / 2;
            const screenX = v.x * halfW + halfW;
            const screenY = -v.y * halfH + halfH;

            return {
              id: hs.id,
              x: screenX,
              y: screenY,
              visible: v.z < 1.0 && !isBehind && screenX > 20 && screenX < container.clientWidth - 20,
            };
          });
          setHotspotScreenCoords(coords);
        }
      }

      renderer.render(scene, camera);
    };

    renderLoop();

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);

      loadedCadMapRef.current.clear();
      materialsRef.current = [];
      emissiveMaterialsRef.current = [];

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
  }, []);

  // Orbit Pointer Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    lastPointerRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastPointerRef.current.x;
    const dy = e.clientY - lastPointerRef.current.y;

    cameraOrbitRef.current.targetTheta -= dx * 0.007;
    cameraOrbitRef.current.targetPhi -= dy * 0.007;

    lastPointerRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const handleWheel = (e: React.WheelEvent) => {
    // Only zoom when Ctrl or Cmd is held (trackpad pinch or intentional zoom),
    // allowing effortless normal vertical page scrolling past the showroom container
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const zoomDelta = e.deltaY * 0.003;
      cameraOrbitRef.current.targetRadius = Math.max(
        2.6,
        Math.min(7.2, cameraOrbitRef.current.targetRadius + zoomDelta)
      );
    }
  };

  // Zoom Button Controls
  const zoomIn = () => {
    cameraOrbitRef.current.targetRadius = Math.max(2.6, cameraOrbitRef.current.targetRadius - 0.6);
  };

  const zoomOut = () => {
    cameraOrbitRef.current.targetRadius = Math.min(7.2, cameraOrbitRef.current.targetRadius + 0.6);
  };

  const resetCamera = () => {
    const isDesktop = typeof window !== "undefined" && window.innerWidth >= 1024;
    cameraOrbitRef.current.targetTheta = 0.35;
    cameraOrbitRef.current.targetPhi = 1.25;
    cameraOrbitRef.current.targetRadius = 5.6;
    cameraOrbitRef.current.radius = 5.6;
    cameraOrbitRef.current.targetPanX = isPanelOpen && isDesktop ? 1.45 : 0;
    setSelectedHotspot(null);
  };

  return (
    <div
      id="three-showroom-canvas"
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onWheel={handleWheel}
      className="relative w-full h-[560px] md:h-[620px] lg:h-[640px] rounded-3xl overflow-hidden bg-[#040c17] border border-white/10 shadow-2xl select-none cursor-grab active:cursor-grabbing group"
    >
      {/* 3D WebGL Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* WebGL Not Supported Fallback */}
      {!hasWebGL && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-slate-900 text-white text-center">
          <p className="text-slate-400 mb-4">
            3D WebGL hardware acceleration is not supported on this browser or device.
          </p>
          <Link
            href="/products/led-lighting"
            className="px-6 py-3 rounded-xl bg-accent text-white font-medium"
          >
            Browse Standard Product Catalogue
          </Link>
        </div>
      )}

      {/* TOP BAR: Header & Shading Mode Controls */}
      <div
        className={`absolute top-6 left-6 z-20 flex flex-wrap items-center justify-between pointer-events-none gap-3 transition-all duration-500 ${
          isPanelOpen ? "right-6 lg:right-[475px]" : "right-6"
        }`}
      >
        {/* Left: Studio Telemetry HUD */}
        <div className="flex flex-col gap-2 pointer-events-auto">
          <div className="flex items-center gap-2 bg-slate-900/85 backdrop-blur-xl px-4 py-2 rounded-full border border-white/10 shadow-xl">
            <Sparkles className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-white/90 font-medium">
              {modelMode === "cad"
                ? `Production CAD · ${activeCadConfig.badge}`
                : "Exploded Sub-Assembly Cutaway · Daman Floor"}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-white/70 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 w-fit">
            <span className="text-orange-400 font-semibold">{activeCadConfig.cadFile}</span>
            <span className="text-white/20">|</span>
            <span>DRAG: 360° ORBIT</span>
            <span className="text-white/20">|</span>
            <span>SCROLL: ZOOM</span>
          </div>

          {/* Dynamic CAD streaming progress banner */}
          {loadingCad && (
            <div className="flex items-center gap-2 bg-orange-500/15 backdrop-blur-xl px-3 py-1 rounded-xl border border-orange-500/30 text-xs font-mono text-orange-400 animate-in fade-in">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Loading CAD Mesh ({cadProgress}%)...</span>
            </div>
          )}
        </div>

        {/* Right: Mode Switcher & Shading Modes & Panel Toggle */}
        <div className="flex flex-wrap items-center gap-2 pointer-events-auto">
          {/* Model Mode Switcher: Production CAD vs Exploded Cutaway */}
          <div className="flex items-center bg-slate-900/90 backdrop-blur-xl p-1 rounded-2xl border border-white/10 shadow-lg">
            <button
              id="mode-cad-btn"
              onClick={(e) => {
                e.stopPropagation();
                setModelMode("cad");
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                modelMode === "cad"
                  ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold shadow-md shadow-orange-500/20"
                  : "text-white/70 hover:text-white"
              }`}
              title="Inspect Real Production CAD Model"
            >
              <Box className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Production CAD</span>
              <span className="sm:hidden">CAD</span>
            </button>
            <button
              id="mode-exploded-btn"
              onClick={(e) => {
                e.stopPropagation();
                setModelMode("exploded");
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                modelMode === "exploded"
                  ? "bg-accent text-white font-bold shadow-md shadow-accent/20"
                  : "text-white/70 hover:text-white"
              }`}
              title="Inspect Exploded Internal Engineering Sub-Assembly"
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Exploded Cutaway</span>
              <span className="sm:hidden">Exploded</span>
            </button>
          </div>

          {/* Model Variant Toggle (if product has 2 real CAD models) */}
          {modelMode === "cad" && activeCadVariants.secondary && (
            <div className="flex items-center bg-slate-900/90 backdrop-blur-xl p-1 rounded-2xl border border-orange-500/30 shadow-lg">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setVariantForProduct(activeIndex, "primary");
                }}
                className={`px-2.5 py-1 rounded-xl text-xs font-mono transition-all ${
                  activeVariantKey === "primary"
                    ? "bg-orange-500/20 text-orange-300 font-bold border border-orange-500/40"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {activeCadVariants.primary.badge}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setVariantForProduct(activeIndex, "secondary");
                }}
                className={`px-2.5 py-1 rounded-xl text-xs font-mono transition-all ${
                  activeVariantKey === "secondary"
                    ? "bg-orange-500/20 text-orange-300 font-bold border border-orange-500/40"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {activeCadVariants.secondary.badge}
              </button>
            </div>
          )}

          {/* Shading Selector (Realistic / CAD Wire / X-Ray) */}
          <div className="flex items-center bg-slate-900/85 backdrop-blur-xl p-1 rounded-2xl border border-white/10 shadow-lg">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setRenderMode("realistic");
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                renderMode === "realistic"
                  ? "bg-accent text-white font-semibold shadow-md shadow-accent/20"
                  : "text-white/70 hover:text-white"
              }`}
              title="Photorealistic PBR Shading"
            >
              Realistic
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setRenderMode("cad");
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                renderMode === "cad"
                  ? "bg-sky-500 text-white font-semibold shadow-md shadow-sky-500/20"
                  : "text-white/70 hover:text-white"
              }`}
              title="CAD Wireframe & Tooling Geometry"
            >
              CAD Wire
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setRenderMode("xray");
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                renderMode === "xray"
                  ? "bg-purple-600 text-white font-semibold shadow-md shadow-purple-600/20"
                  : "text-white/70 hover:text-white"
              }`}
              title="X-Ray Ghosted Internal Architecture"
            >
              X-Ray
            </button>
          </div>

          {/* Toggle Specs Drawer Button */}
          <button
            id="toggle-specs-btn"
            onClick={(e) => {
              e.stopPropagation();
              setIsPanelOpen((prev) => !prev);
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-mono transition-all backdrop-blur-xl border ${
              isPanelOpen
                ? "bg-orange-500/15 text-orange-400 border-orange-500/30"
                : "bg-slate-900/85 text-white/80 border-white/10 hover:bg-slate-800"
            }`}
            title={isPanelOpen ? "Hide Specifications Drawer" : "Show Specifications Drawer"}
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-orange-400" />
            <span className="hidden sm:inline">
              {isPanelOpen ? "Close Specs" : "Inspect Specs"}
            </span>
          </button>
        </div>
      </div>

      {/* FLOATING 3D HOTSPOT ANNOTATION PINS */}
      {hotspotScreenCoords.map((hsCoord) => {
        const hotspotData = activeProduct.hotspots.find((h) => h.id === hsCoord.id);
        if (!hotspotData || !hsCoord.visible) return null;
        const isSelected = selectedHotspot?.id === hsCoord.id;

        return (
          <div
            key={hsCoord.id}
            style={{
              transform: `translate3d(${hsCoord.x}px, ${hsCoord.y}px, 0)`,
            }}
            className="absolute top-0 left-0 z-30 pointer-events-auto -translate-x-1/2 -translate-y-1/2"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedHotspot(isSelected ? null : hotspotData);
              }}
              className={`relative flex items-center justify-center w-7 h-7 rounded-full transition-all group/pin ${
                isSelected
                  ? "bg-accent scale-110 shadow-lg shadow-accent/50 ring-4 ring-orange-400/30"
                  : "bg-slate-900/90 hover:bg-accent hover:scale-105 border border-white/30"
              }`}
              title={hotspotData.title}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-white" />
              <span className="absolute inset-0 rounded-full border border-orange-400 animate-ping opacity-75" />
            </button>

            {/* Hotspot Floating Tooltip Card */}
            {isSelected && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute left-8 top-1/2 -translate-y-1/2 w-64 bg-slate-900/95 backdrop-blur-xl border border-orange-500/30 rounded-2xl p-3.5 shadow-2xl text-left z-40 animate-in fade-in zoom-in-95 duration-200"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-orange-400 font-bold">
                    Sub-Assembly Pin
                  </span>
                  <button
                    onClick={() => setSelectedHotspot(null)}
                    className="text-white/40 hover:text-white p-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <h5 className="font-display text-sm font-medium text-white mb-1">
                  {hotspotData.title}
                </h5>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {hotspotData.spec}
                </p>
              </div>
            )}
          </div>
        );
      })}

      {/* BOTTOM CONTROLS BAR: Ergonomic 3-Section Floating Hub */}
      <div
        className={`absolute bottom-6 left-6 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none transition-all duration-500 ${
          isPanelOpen ? "right-6 lg:right-[475px]" : "right-6"
        }`}
      >
        {/* Left: Camera Navigation & Zoom Controls */}
        <div className="flex items-center gap-1.5 bg-slate-900/85 backdrop-blur-2xl p-1.5 rounded-2xl border border-white/10 shadow-xl pointer-events-auto">
          <button
            onClick={zoomIn}
            className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={zoomOut}
            className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            id="reset-camera-btn"
            onClick={resetCamera}
            className="px-2.5 py-1.5 rounded-xl text-xs font-mono text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            title="Reset Camera Angle"
          >
            Reset 360°
          </button>
        </div>

        {/* Center: Product Family Carousel Pills */}
        <div className="flex items-center gap-1 bg-slate-900/90 backdrop-blur-2xl p-1.5 rounded-2xl border border-white/10 shadow-2xl pointer-events-auto overflow-x-auto max-w-[280px] sm:max-w-none">
          <button
            id="prev-product-btn"
            onClick={(e) => {
              e.stopPropagation();
              setProduct(activeIndex - 1);
            }}
            disabled={activeIndex === 0}
            className="p-2 rounded-xl text-white hover:bg-white/10 disabled:opacity-20 disabled:pointer-events-none transition-colors shrink-0"
            aria-label="Previous Product"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1 px-1 overflow-x-auto scrollbar-none">
            {ROOM_PRODUCTS.map((p, idx) => (
              <button
                key={p.name}
                id={`product-pill-${idx}`}
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
            id="next-product-btn"
            onClick={(e) => {
              e.stopPropagation();
              setProduct(activeIndex + 1);
            }}
            disabled={activeIndex === totalProducts - 1}
            className="p-2 rounded-xl text-white hover:bg-white/10 disabled:opacity-20 disabled:pointer-events-none transition-colors shrink-0"
            aria-label="Next Product"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Studio Hardware Controls (Exploded, Power, CCT, Auto-Rotate) */}
        <div className="flex items-center gap-1.5 bg-slate-900/85 backdrop-blur-2xl p-1.5 rounded-2xl border border-white/10 shadow-xl pointer-events-auto">
          {/* Exploded / Assembled Toggle */}
          <button
            id="toggle-exploded-btn"
            onClick={(e) => {
              e.stopPropagation();
              if (modelMode === "cad") {
                setModelMode("exploded");
                setIsExploded(true);
                targetExplodeRatioRef.current = 1.0;
              } else {
                toggleExploded();
              }
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all border ${
              isExploded && modelMode === "exploded"
                ? "bg-accent text-white border-accent shadow-lg shadow-accent/30"
                : "bg-white/5 text-white/80 border-white/5 hover:bg-white/10"
            }`}
            title="Toggle Exploded Layer Breakdown"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {isExploded && modelMode === "exploded" ? "Assembled" : "Exploded"}
            </span>
          </button>

          {/* Light Power Switch */}
          <button
            id="toggle-power-btn"
            onClick={(e) => {
              e.stopPropagation();
              setIsPowered((prev) => !prev);
            }}
            className={`p-2 rounded-xl text-xs border transition-all ${
              isPowered
                ? "bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-lg shadow-amber-500/20"
                : "bg-white/5 text-white/40 border-white/5 hover:text-white/80"
            }`}
            title={isPowered ? "Turn Lamp Off" : "Turn Lamp On"}
          >
            <Power className="w-4 h-4" />
          </button>

          {/* CCT Spectrum Selector */}
          <div className="hidden lg:flex items-center bg-black/40 p-0.5 rounded-xl border border-white/5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightingMode("warm");
              }}
              className={`px-2 py-1 rounded-lg text-[11px] font-mono transition-colors ${
                lightingMode === "warm" ? "bg-amber-500 text-slate-950 font-bold" : "text-white/60 hover:text-white"
              }`}
              title="Warm White 3000K"
            >
              3000K
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightingMode("daylight");
              }}
              className={`px-2 py-1 rounded-lg text-[11px] font-mono transition-colors ${
                lightingMode === "daylight" ? "bg-sky-400 text-slate-950 font-bold" : "text-white/60 hover:text-white"
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
              className={`px-2 py-1 rounded-lg text-[11px] font-mono transition-colors ${
                lightingMode === "cyber" ? "bg-purple-600 text-white font-bold" : "text-white/60 hover:text-white"
              }`}
              title="Cyber RGB Spectrum"
            >
              RGB
            </button>
          </div>

          {/* Auto-Rotation Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setAutoRotate((prev) => !prev);
            }}
            className={`p-2 rounded-xl text-xs border transition-all ${
              autoRotate
                ? "bg-white/10 text-orange-400 border-orange-500/30"
                : "bg-white/5 text-white/40 border-white/5"
            }`}
            title="Toggle Turntable Auto-Rotation"
          >
            <RotateCw className={`w-4 h-4 ${autoRotate ? "animate-spin" : ""}`} style={{ animationDuration: "12s" }} />
          </button>
        </div>
      </div>

      {/* RIGHT SIDE: Technical Inspection Glass Drawer */}
      <div
        className={`absolute top-20 sm:top-6 right-6 bottom-6 w-full max-w-md z-30 transition-all duration-500 pointer-events-auto ${
          isPanelOpen ? "translate-x-0 opacity-100" : "translate-x-[110%] opacity-0 pointer-events-none"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-full bg-slate-900/94 backdrop-blur-2xl border border-white/15 rounded-3xl shadow-2xl p-6 md:p-8 flex flex-col justify-between overflow-y-auto text-white">
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

            <p className="text-slate-300 text-sm leading-relaxed mb-6 font-sans">
              {activeProduct.description}
            </p>

            {/* Active 3D CAD Asset Telemetry */}
            <div className="mb-6 bg-orange-500/10 border border-orange-500/25 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-orange-400 font-bold flex items-center gap-1.5">
                  <FileCode className="w-3.5 h-3.5" />
                  Production CAD Asset
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 font-semibold border border-orange-500/30">
                  {activeCadConfig.badge}
                </span>
              </div>
              <p className="text-xs text-white font-mono font-medium mb-1">
                {activeCadConfig.label}
              </p>
              <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                {activeCadConfig.sourceDesc}
              </p>
            </div>

            {/* Performance Metric Progress Bars */}
            <div className="mb-6 space-y-2.5 bg-black/40 p-4 rounded-2xl border border-white/5">
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-2">
                Factory Engineering Benchmarks
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
                Manufactured In-House at Daman:
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

            {/* Technical Specifications Quick-Glance Table */}
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
    </div>
  );
}
