"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { FacilityProcessChain } from "@/data/facilityProcessChains";
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Cog,
  Layers,
  ShieldCheck,
  Activity,
  Gauge,
  Thermometer,
  Cpu,
  RotateCw,
} from "lucide-react";

interface Props {
  chain: FacilityProcessChain;
}

export default function FacilityProcessVisualizer({ chain }: Props) {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<"simulation" | "telemetry" | "quality">("simulation");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const stages = chain.stages;
  const currentStage = stages[currentStageIndex];
  const totalStages = stages.length;

  const handleNext = useCallback(() => {
    setCurrentStageIndex((prev) => (prev + 1) % totalStages);
  }, [totalStages]);

  const handlePrev = useCallback(() => {
    setCurrentStageIndex((prev) => (prev - 1 + totalStages) % totalStages);
  }, [totalStages]);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        handleNext();
      }, 2800);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, handleNext]);

  useEffect(() => {
    setCurrentStageIndex(0);
    setIsPlaying(false);
  }, [chain.slug]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === " " && e.altKey) {
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  // Dynamic telemetry simulated based on current stage
  const getTelemetry = () => {
    switch (currentStageIndex) {
      case 0:
        return {
          clampForce: "180.2 T",
          pressure: "85 bar",
          temp: "218°C",
          status: "CLAMP ENGAGED",
          cycleTime: "4.2s",
          powerKw: "34.2 kW",
        };
      case 1:
        return {
          clampForce: "185.0 T",
          pressure: "148 bar",
          temp: "225°C",
          status: "INJECTION ACTIVE",
          cycleTime: "9.8s",
          powerKw: "48.6 kW",
        };
      case 2:
        return {
          clampForce: "180.0 T",
          pressure: "45 bar",
          temp: "195°C",
          status: "COOLING CIRCUIT",
          cycleTime: "15.4s",
          powerKw: "22.1 kW",
        };
      default:
        return {
          clampForce: "12.0 T",
          pressure: "20 bar",
          temp: "205°C",
          status: "PART EJECTION",
          cycleTime: "18.6s",
          powerKw: "16.4 kW",
        };
    }
  };

  const tele = getTelemetry();

  return (
    <div className="space-y-12 my-16">
      {/* Industrial SCADA / Digital Twin Visualizer Card */}
      <div className="bg-[#0b1320] border border-slate-800 rounded-3xl shadow-2xl overflow-hidden text-white">
        {/* Top Control & Telemetry Strip */}
        <div className="border-b border-slate-800 bg-[#070d17] px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-slate-300 font-semibold flex items-center gap-2">
              <Cpu className="w-4 h-4 text-orange-400" />
              Digital Twin Console · {chain.name}
            </span>
            <span className="hidden sm:inline text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              ONLINE · Daman Hub
            </span>
          </div>

          {/* View Mode Switcher Tabs */}
          <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab("simulation")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                activeTab === "simulation"
                  ? "bg-accent text-white font-bold shadow-md shadow-accent/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Schematic View
            </button>
            <button
              onClick={() => setActiveTab("telemetry")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                activeTab === "telemetry"
                  ? "bg-accent text-white font-bold shadow-md shadow-accent/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Telemetry Readouts
            </button>
            <button
              onClick={() => setActiveTab("quality")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                activeTab === "quality"
                  ? "bg-accent text-white font-bold shadow-md shadow-accent/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              QC Gates
            </button>
          </div>
        </div>

        {/* Live Industrial Telemetry Readout Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-slate-800/60 border-b border-slate-800">
          <div className="p-4 bg-[#09101b]">
            <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-1">
              <Gauge className="w-3.5 h-3.5 text-orange-400" /> Clamp Force
            </p>
            <p className="font-mono text-base font-bold text-white">{tele.clampForce}</p>
          </div>
          <div className="p-4 bg-[#09101b]">
            <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-1">
              <Activity className="w-3.5 h-3.5 text-sky-400" /> Cavity Pressure
            </p>
            <p className="font-mono text-base font-bold text-sky-400">{tele.pressure}</p>
          </div>
          <div className="p-4 bg-[#09101b]">
            <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-1">
              <Thermometer className="w-3.5 h-3.5 text-rose-400" /> Barrel Temp
            </p>
            <p className="font-mono text-base font-bold text-rose-400">{tele.temp}</p>
          </div>
          <div className="p-4 bg-[#09101b]">
            <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500 mb-1">
              Cycle Clock
            </p>
            <p className="font-mono text-base font-bold text-emerald-400">{tele.cycleTime}</p>
          </div>
          <div className="p-4 bg-[#09101b]">
            <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500 mb-1">
              Drive Power
            </p>
            <p className="font-mono text-base font-bold text-slate-200">{tele.powerKw}</p>
          </div>
          <div className="p-4 bg-[#09101b]">
            <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500 mb-1">
              Line Status
            </p>
            <p className="font-mono text-xs font-bold text-orange-400 truncate">{tele.status}</p>
          </div>
        </div>

        {/* Dynamic Content Panel based on activeTab */}
        {activeTab === "simulation" && (
          <div className="p-6 md:p-10 relative overflow-hidden bg-[#070e1a]">
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:28px_28px]" />
            <div className="relative z-10 max-w-4xl mx-auto">
              {chain.schematicType === "injection-machine" ? (
                <InjectionMachineSchematic stageIndex={currentStageIndex} />
              ) : (
                <GenericProcessFlowSchematic stages={stages} stageIndex={currentStageIndex} />
              )}
            </div>
          </div>
        )}

        {activeTab === "telemetry" && (
          <div className="p-8 md:p-12 bg-[#070e1a]">
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
              <div className="bg-[#0b1320] border border-slate-800 rounded-2xl p-6">
                <h4 className="font-mono text-xs uppercase tracking-widest text-orange-400 mb-4 flex items-center gap-2">
                  <Activity className="w-4 h-4" /> Real-Time Parameter Telemetry
                </h4>
                <div className="space-y-4 text-xs font-mono">
                  <div className="flex justify-between p-3 bg-black/40 rounded-xl border border-white/5">
                    <span className="text-slate-400">Microprocessor Clock</span>
                    <span className="text-white">50 Hz Synchronous</span>
                  </div>
                  <div className="flex justify-between p-3 bg-black/40 rounded-xl border border-white/5">
                    <span className="text-slate-400">Screw Position Linear Scale</span>
                    <span className="text-sky-400">124.5 mm (±0.02 mm)</span>
                  </div>
                  <div className="flex justify-between p-3 bg-black/40 rounded-xl border border-white/5">
                    <span className="text-slate-400">Mould Water Inflow</span>
                    <span className="text-emerald-400">12.4°C @ 28 L/min</span>
                  </div>
                  <div className="flex justify-between p-3 bg-black/40 rounded-xl border border-white/5">
                    <span className="text-slate-400">Cavity Peak Hydraulic Pressure</span>
                    <span className="text-orange-400">165 bar Peak</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#0b1320] border border-slate-800 rounded-2xl p-6">
                <h4 className="font-mono text-xs uppercase tracking-widest text-sky-400 mb-4 flex items-center gap-2">
                  <Cog className="w-4 h-4" /> Production Batch Tolerance
                </h4>
                <div className="space-y-4 text-xs font-mono">
                  <div className="flex justify-between p-3 bg-black/40 rounded-xl border border-white/5">
                    <span className="text-slate-400">Dimensional Tolerance</span>
                    <span className="text-emerald-400">± 0.05 mm (ISO Class 2)</span>
                  </div>
                  <div className="flex justify-between p-3 bg-black/40 rounded-xl border border-white/5">
                    <span className="text-slate-400">Polymer Melt Flow Index</span>
                    <span className="text-white">14.2 g/10min Verified</span>
                  </div>
                  <div className="flex justify-between p-3 bg-black/40 rounded-xl border border-white/5">
                    <span className="text-slate-400">Gram Weight Stability</span>
                    <span className="text-white">± 0.08g Variance</span>
                  </div>
                  <div className="flex justify-between p-3 bg-black/40 rounded-xl border border-white/5">
                    <span className="text-slate-400">Statistical Process Control</span>
                    <span className="text-emerald-400">Cpk &gt; 1.67</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "quality" && (
          <div className="p-8 md:p-12 bg-[#070e1a]">
            <div className="max-w-4xl mx-auto space-y-4">
              <h4 className="font-mono text-xs uppercase tracking-widest text-emerald-400 mb-4 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" /> ISO 9001:2015 Verified Quality Gates
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                {chain.qc.map((point, qIdx) => (
                  <div
                    key={point}
                    className="p-5 rounded-2xl bg-[#0b1320] border border-slate-800 flex items-start gap-3.5"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-1">
                        Gate 0{qIdx + 1}
                      </p>
                      <p className="text-sm text-slate-300 leading-relaxed">{point}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Interactive Controls & Stage Description */}
        <div className="p-6 md:p-10 border-t border-slate-800 bg-[#09101c] grid lg:grid-cols-[280px_1fr] gap-10 items-center">
          {/* Circular Stage Wheel */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                {/* Background Ring */}
                <circle
                  cx="100"
                  cy="100"
                  r="78"
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth="4"
                />
                {/* Active Progress Arc */}
                <circle
                  cx="100"
                  cy="100"
                  r="78"
                  fill="none"
                  stroke="#ff5e14"
                  strokeWidth="5"
                  strokeDasharray="490"
                  strokeDashoffset={490 - (490 * (currentStageIndex + 1)) / totalStages}
                  strokeLinecap="round"
                  className="transition-all duration-500 ease-out"
                />
              </svg>

              {/* Stage Nodes on Ring */}
              {stages.map((st, i) => {
                const angle = (i * 360) / totalStages;
                const radian = (angle - 90) * (Math.PI / 180);
                const x = 96 + 78 * Math.cos(radian);
                const y = 96 + 78 * Math.sin(radian);
                const isActive = i === currentStageIndex;
                const isPassed = i < currentStageIndex;

                return (
                  <button
                    key={st.title}
                    onClick={() => {
                      setCurrentStageIndex(i);
                      setIsPlaying(false);
                    }}
                    style={{ left: `${x}px`, top: `${y}px` }}
                    className={`absolute w-8 h-8 -ml-4 -mt-4 rounded-full flex items-center justify-center font-mono text-xs font-semibold transition-all duration-300 ${
                      isActive
                        ? "bg-accent text-white scale-125 shadow-lg shadow-accent/50 ring-4 ring-orange-400/40"
                        : isPassed
                        ? "bg-slate-700 text-white"
                        : "bg-slate-900 border-2 border-slate-700 text-slate-400 hover:border-accent hover:text-white"
                    }`}
                    aria-label={`Go to stage ${i + 1}: ${st.title}`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </button>
                );
              })}

              {/* Center Wheel Label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 pointer-events-none">
                <span className="font-mono text-[10px] tracking-widest text-slate-400 uppercase">
                  {chain.cycleName}
                </span>
                <span className="font-display text-3xl font-bold text-white mt-0.5">
                  {String(currentStageIndex + 1).padStart(2, "0")}
                </span>
                <span className="text-[11px] text-slate-400 font-medium font-mono">
                  of {String(totalStages).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>

          {/* Active Stage Details & Stepper */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs uppercase tracking-widest text-orange-400 font-bold px-2.5 py-0.5 rounded bg-orange-500/10 border border-orange-500/20">
                Phase {String(currentStageIndex + 1).padStart(2, "0")}
              </span>
              <span className="text-slate-600">·</span>
              <span className="font-mono text-xs uppercase tracking-wider text-slate-400">
                {currentStage.title}
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-display font-medium text-white mb-3">
              {currentStage.title}
            </h3>

            <p className="text-slate-300 text-base md:text-lg leading-relaxed min-h-[4rem] mb-6">
              {currentStage.description}
            </p>

            {/* Stepper Buttons & Play/Pause */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  handlePrev();
                  setIsPlaying(false);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 text-sm font-medium hover:bg-slate-800 hover:text-white transition-colors"
                aria-label="Previous cycle stage"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>

              <button
                onClick={togglePlay}
                className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isPlaying
                    ? "bg-slate-800 text-white hover:bg-slate-700 border border-slate-700 shadow-sm"
                    : "bg-accent text-white hover:bg-orange-600 shadow-lg shadow-accent/30"
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4" /> Pause Cycle
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" /> Auto-Run Cycle
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  handleNext();
                  setIsPlaying(false);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white text-slate-900 text-sm font-semibold hover:bg-slate-200 transition-colors"
                aria-label="Next cycle stage"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Stage Selector Pills */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap gap-2">
              {stages.map((st, i) => (
                <button
                  key={st.title}
                  onClick={() => {
                    setCurrentStageIndex(i);
                    setIsPlaying(false);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                    i === currentStageIndex
                      ? "bg-accent text-white font-bold shadow-md shadow-accent/30 ring-1 ring-orange-400"
                      : "bg-slate-800/70 text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")} {st.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Specifications, Products Fed, and Quality Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Specifications */}
        <div className="bg-white border border-slate-200 rounded-2xl p-7 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center gap-2.5 mb-5 text-accent">
              <Cog className="w-5 h-5 text-accent" />
              <h4 className="font-mono text-xs uppercase tracking-widest font-bold text-slate-900">
                Technical Specifications
              </h4>
            </div>
            <dl className="divide-y divide-slate-100 text-sm">
              {chain.specs.map(([label, value]) => (
                <div key={label} className="py-2.5 flex flex-col">
                  <dt className="text-slate-500 font-mono text-xs uppercase tracking-wider mb-0.5">
                    {label}
                  </dt>
                  <dd className="font-medium text-slate-900">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Product Feeds */}
        <div className="bg-white border border-slate-200 rounded-2xl p-7 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center gap-2.5 mb-5 text-accent">
              <Layers className="w-5 h-5 text-accent" />
              <h4 className="font-mono text-xs uppercase tracking-widest font-bold text-slate-900">
                Products This Line Feeds
              </h4>
            </div>
            <p className="text-sm text-slate-600 mb-4">
              Direct component outputs routed to Sheetal downstream assembly lines:
            </p>
            <div className="flex flex-wrap gap-2">
              {chain.feeds.map((feed) => (
                <span
                  key={feed}
                  className="inline-block px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800"
                >
                  {feed}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Quality Checkpoints */}
        <div className="bg-white border border-slate-200 rounded-2xl p-7 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center gap-2.5 mb-5 text-accent">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h4 className="font-mono text-xs uppercase tracking-widest font-bold text-slate-900">
                Quality Verification Gates
              </h4>
            </div>
            <ul className="space-y-3">
              {chain.qc.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Interactive SVG Machine Schematics
// -------------------------------------------------------------

function InjectionMachineSchematic({ stageIndex }: { stageIndex: number }) {
  const isClamped = stageIndex === 0 || stageIndex === 1 || stageIndex === 2;
  const isInjecting = stageIndex === 1;
  const isCooling = stageIndex === 2;
  const isEjected = stageIndex === 3;

  const screwOffset = isInjecting ? 28 : stageIndex === 0 ? 0 : 12;
  const platenOffset = isClamped ? 0 : 48;

  return (
    <div className="w-full">
      <svg
        viewBox="0 0 640 320"
        className="w-full h-auto select-none"
        aria-label="Interactive schematic of injection moulding machine cycle"
      >
        <defs>
          <linearGradient id="barrelGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
          <linearGradient id="meltFlow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ff5e14" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>

        {/* Machine Bed Foundation */}
        <line x1="20" y1="280" x2="620" y2="280" stroke="#334155" strokeWidth="3" />
        <rect x="60" y="280" width="120" height="14" fill="#1e293b" rx="2" />
        <rect x="420" y="280" width="140" height="14" fill="#1e293b" rx="2" />

        {/* Resin Hopper */}
        <g>
          <path d="M120 40 H210 L195 120 H135 Z" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
          <circle cx="160" cy="70" r="3" fill="#ff5e14" />
          <circle cx="170" cy="80" r="3" fill="#ff5e14" />
          <circle cx="155" cy="90" r="3" fill="#ff5e14" />
          <circle cx="168" cy="98" r="3" fill="#ff5e14" />
          <text x="165" y="30" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">
            RESIN HOPPER
          </text>
        </g>

        {/* Heated Barrel Outer */}
        <rect
          x="180"
          y="126"
          width="180"
          height="54"
          rx="6"
          fill="url(#barrelGrad)"
          stroke="#475569"
          strokeWidth="2"
        />
        {/* Heating bands */}
        <rect x="200" y="122" width="14" height="62" fill="#ef4444" opacity="0.6" rx="2" />
        <rect x="235" y="122" width="14" height="62" fill="#ef4444" opacity="0.6" rx="2" />
        <rect x="270" y="122" width="14" height="62" fill="#ef4444" opacity="0.6" rx="2" />
        <rect x="305" y="122" width="14" height="62" fill="#ef4444" opacity="0.6" rx="2" />

        {/* Reciprocating Screw (Smooth Animated) */}
        <g
          style={{
            transform: `translateX(${screwOffset}px)`,
            transition: "transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <path
            d="M 195 138 v 30 M 210 138 v 30 M 225 138 v 30 M 240 138 v 30 M 255 138 v 30 M 270 138 v 30 M 285 138 v 30 M 300 138 v 30 M 315 138 v 30"
            stroke="#94a3b8"
            strokeWidth="2.5"
          />
          <rect x="185" y="148" width="140" height="10" fill="#64748b" />
          <polygon points="325,143 345,153 325,163" fill="#cbd5e1" />
        </g>

        {/* Molten Plastic Flow Front */}
        <path
          d="M 345 147 H 360 V 159 H 345 Z"
          fill="url(#meltFlow)"
          className="transition-all duration-300"
        />

        {/* Injection Nozzle */}
        <polygon points="360,140 376,148 376,158 360,166" fill="#334155" />

        {/* Fixed Platen (Stationary) */}
        <g>
          <rect x="378" y="90" width="22" height="150" fill="#334155" rx="3" />
          <rect x="400" y="120" width="18" height="66" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" />
          <text x="390" y="78" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">
            FIXED PLATEN
          </text>
        </g>

        {/* Mould Cavity */}
        <rect
          x="418"
          y="126"
          width="26"
          height="54"
          fill={isClamped ? (isInjecting ? "#ff5e14" : isCooling ? "#38bdf8" : "#94a3b8") : "#070e1a"}
          stroke="#475569"
          strokeDasharray={isClamped ? "none" : "3 3"}
          className="transition-colors duration-500"
          rx="2"
        />

        {/* Moving Platen & Hydraulic Ram */}
        <g
          style={{
            transform: `translateX(${platenOffset}px)`,
            transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <rect x="444" y="120" width="18" height="66" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" />
          <rect x="462" y="90" width="22" height="150" fill="#334155" rx="3" />
          <rect x="484" y="150" width="80" height="20" fill="#475569" />
          <rect x="564" y="130" width="36" height="60" fill="#1e293b" stroke="#334155" strokeWidth="2" rx="4" />
          <text x="473" y="78" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">
            MOVING PLATEN
          </text>
        </g>

        {/* Ejected Solidified Part Drops (Stage 3) */}
        <g
          style={{
            opacity: isEjected ? 1 : 0,
            transform: isEjected ? "translate(424px, 230px)" : "translate(424px, 140px)",
            transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <rect
            x="0"
            y="0"
            width="22"
            height="24"
            rx="4"
            fill="#ff5e14"
            stroke="#ffffff"
            strokeWidth="1.5"
          />
          <text x="11" y="38" textAnchor="middle" fill="#38bdf8" fontSize="8" fontFamily="monospace">
            PART RELEASE
          </text>
        </g>

        {/* Tie Bars (Horizontal Guides) */}
        <line x1="360" y1="102" x2="580" y2="102" stroke="#64748b" strokeWidth="3" opacity="0.4" />
        <line x1="360" y1="228" x2="580" y2="228" stroke="#64748b" strokeWidth="3" opacity="0.4" />

        {/* Status Telemetry Badge */}
        <g transform="translate(30, 240)">
          <rect x="0" y="0" width="200" height="28" rx="6" fill="#1e293b" stroke="#334155" />
          <circle
            cx="14"
            cy="14"
            r="4"
            fill={isInjecting ? "#ef4444" : isCooling ? "#38bdf8" : "#22c55e"}
            className="animate-pulse"
          />
          <text x="26" y="18" fill="#f8fafc" fontSize="10" fontFamily="monospace" fontWeight="bold">
            {stageIndex === 0
              ? "HYDRAULIC CLAMP: LOCKED"
              : stageIndex === 1
              ? "INJECTION: SCREW ADVANCE"
              : stageIndex === 2
              ? "COOLING CIRCUIT: 12°C"
              : "EJECTOR PINS: RETRACT"}
          </text>
        </g>
      </svg>
    </div>
  );
}

function GenericProcessFlowSchematic({
  stages,
  stageIndex,
}: {
  stages: { title: string; description: string }[];
  stageIndex: number;
}) {
  const n = stages.length;

  return (
    <div className="w-full py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {stages.map((stage, i) => {
          const isActive = i === stageIndex;
          const isPassed = i < stageIndex;

          return (
            <div
              key={stage.title}
              className={`p-6 rounded-2xl border transition-all duration-300 relative ${
                isActive
                  ? "bg-slate-800/90 border-accent shadow-xl shadow-accent/20 ring-2 ring-orange-400/40"
                  : isPassed
                  ? "bg-slate-800/40 border-slate-700 text-slate-300"
                  : "bg-slate-900/60 border-slate-800 text-slate-500"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                    isActive
                      ? "bg-accent text-white"
                      : isPassed
                      ? "bg-slate-700 text-slate-200"
                      : "bg-slate-800 text-slate-500"
                  }`}
                >
                  PHASE 0{i + 1}
                </span>
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
                )}
              </div>

              <h4
                className={`font-display text-base font-medium mb-1.5 ${
                  isActive ? "text-white" : isPassed ? "text-slate-200" : "text-slate-400"
                }`}
              >
                {stage.title}
              </h4>

              <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                {stage.description}
              </p>

              {i < n - 1 && (
                <div className="hidden md:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10">
                  <span className={`text-xs ${isPassed ? "text-accent" : "text-slate-600"}`}>
                    →
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
