"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { FacilityProcessChain } from "@/data/facilityProcessChains";
import { Play, Pause, ChevronLeft, ChevronRight, CheckCircle2, Cog, Layers, ShieldCheck } from "lucide-react";

interface Props {
  chain: FacilityProcessChain;
}

export default function FacilityProcessVisualizer({ chain }: Props) {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
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
      }, 2600);
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

  // Reset to stage 0 when facility changes
  useEffect(() => {
    setCurrentStageIndex(0);
    setIsPlaying(false);
  }, [chain.slug]);

  // Keyboard navigation
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

  return (
    <div className="space-y-12 my-16">
      {/* Visualizer Card */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        {/* Top Header Bar */}
        <div className="border-b border-slate-200 bg-slate-50/80 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
            <p className="font-mono text-xs uppercase tracking-widest text-slate-700 font-semibold">
              Interactive Simulation · {chain.cycleName}
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono text-slate-500">
            <span>Cycle Stage:</span>
            <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-md font-semibold text-accent">
              {String(currentStageIndex + 1).padStart(2, "0")} / {String(totalStages).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Machine Schematic Section */}
        <div className="p-6 md:p-10 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-15 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:32px_32px]" />
          
          <div className="relative z-10 max-w-4xl mx-auto">
            {chain.schematicType === "injection-machine" ? (
              <InjectionMachineSchematic stageIndex={currentStageIndex} />
            ) : (
              <GenericProcessFlowSchematic stages={stages} stageIndex={currentStageIndex} />
            )}
          </div>
        </div>

        {/* Interactive Controls & Stage Description */}
        <div className="p-6 md:p-10 grid lg:grid-cols-[280px_1fr] gap-10 items-center">
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
                  stroke="#e2e8f0"
                  strokeWidth="3"
                />
                {/* Active Progress Arc */}
                <circle
                  cx="100"
                  cy="100"
                  r="78"
                  fill="none"
                  stroke="#ff5e14"
                  strokeWidth="4"
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
                        ? "bg-accent text-white scale-125 shadow-lg shadow-accent/30 ring-4 ring-orange-100"
                        : isPassed
                        ? "bg-slate-900 text-white"
                        : "bg-white border-2 border-slate-300 text-slate-600 hover:border-accent hover:text-accent"
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
                <span className="font-display text-2xl font-bold text-ink mt-0.5">
                  {String(currentStageIndex + 1).padStart(2, "0")}
                </span>
                <span className="text-[11px] text-slate-500 font-medium">of {totalStages}</span>
              </div>
            </div>
          </div>

          {/* Active Stage Details & Controls */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
                Stage {String(currentStageIndex + 1).padStart(2, "0")}
              </span>
              <span className="text-slate-300">·</span>
              <span className="font-mono text-xs uppercase tracking-wider text-slate-500">
                {currentStage.title}
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-display font-medium text-ink mb-3">
              {currentStage.title}
            </h3>

            <p className="text-slate-600 text-base md:text-lg leading-relaxed min-h-[4rem] mb-6">
              {currentStage.description}
            </p>

            {/* Stepper Buttons & Play/Pause */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  handlePrev();
                  setIsPlaying(false);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-50 hover:border-slate-400 transition-colors"
                aria-label="Previous cycle stage"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>

              <button
                onClick={togglePlay}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  isPlaying
                    ? "bg-slate-900 text-white hover:bg-black shadow-sm"
                    : "bg-accent text-white hover:bg-orange-600 shadow-md shadow-accent/20"
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4" /> Pause Cycle
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" /> Auto-Play Cycle
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  handleNext();
                  setIsPlaying(false);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-black transition-colors"
                aria-label="Next cycle stage"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Horizontal stage pill selector */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap gap-2">
              {stages.map((st, i) => (
                <button
                  key={st.title}
                  onClick={() => {
                    setCurrentStageIndex(i);
                    setIsPlaying(false);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                    i === currentStageIndex
                      ? "bg-orange-50 border border-accent text-accent font-semibold"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 border border-transparent"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")} {st.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3-Column Specifications, Product Feeds, and Quality Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Specifications */}
        <div className="bg-white border border-slate-200 rounded-xl p-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-5 text-accent">
              <Cog className="w-5 h-5" />
              <h4 className="font-mono text-xs uppercase tracking-widest font-semibold text-slate-900">
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
        <div className="bg-white border border-slate-200 rounded-xl p-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-5 text-accent">
              <Layers className="w-5 h-5" />
              <h4 className="font-mono text-xs uppercase tracking-widest font-semibold text-slate-900">
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
        <div className="bg-white border border-slate-200 rounded-xl p-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-5 text-accent">
              <ShieldCheck className="w-5 h-5" />
              <h4 className="font-mono text-xs uppercase tracking-widest font-semibold text-slate-900">
                Quality Verification Points
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
  // 0: Clamp (moving platen moves in, clamp closed)
  // 1: Inject (screw moves forward, molten plastic flows into mould cavity)
  // 2: Cool (cooling active, part solidified)
  // 3: Eject (platen retracts, ejector pins fire, part drops)

  const isClamped = stageIndex === 0 || stageIndex === 1 || stageIndex === 2;
  const isInjecting = stageIndex === 1;
  const isCooling = stageIndex === 2;
  const isEjected = stageIndex === 3;

  const screwOffset = isInjecting ? 28 : stageIndex === 0 ? 0 : 12;
  const platenOffset = isClamped ? 0 : 44;

  return (
    <div className="w-full">
      <svg
        viewBox="0 0 640 320"
        className="w-full h-auto select-none"
        aria-label="Interactive schematic of injection moulding machine cycle"
      >
        {/* Machine Bed Foundation */}
        <line x1="20" y1="280" x2="620" y2="280" stroke="#334155" strokeWidth="3" />
        <rect x="60" y="280" width="120" height="14" fill="#1e293b" />
        <rect x="420" y="280" width="140" height="14" fill="#1e293b" />

        {/* Resin Hopper */}
        <g>
          <path d="M120 40 H210 L195 120 H135 Z" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
          {/* Granules inside */}
          <circle cx="160" cy="70" r="3" fill="#ff5e14" />
          <circle cx="170" cy="80" r="3" fill="#ff5e14" />
          <circle cx="155" cy="90" r="3" fill="#ff5e14" />
          <circle cx="168" cy="98" r="3" fill="#ff5e14" />
          <text x="165" y="30" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="monospace">
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
          fill="#0f172a"
          stroke="#475569"
          strokeWidth="2"
        />
        {/* Heating bands */}
        <rect x="200" y="122" width="14" height="62" fill="#ef4444" opacity="0.6" rx="2" />
        <rect x="235" y="122" width="14" height="62" fill="#ef4444" opacity="0.6" rx="2" />
        <rect x="270" y="122" width="14" height="62" fill="#ef4444" opacity="0.6" rx="2" />
        <rect x="305" y="122" width="14" height="62" fill="#ef4444" opacity="0.6" rx="2" />

        {/* Reciprocating Screw (Moves smoothly) */}
        <g
          style={{
            transform: `translateX(${screwOffset}px)`,
            transition: "transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          {/* Screw flights */}
          <path
            d="M 195 138 v 30 M 210 138 v 30 M 225 138 v 30 M 240 138 v 30 M 255 138 v 30 M 270 138 v 30 M 285 138 v 30 M 300 138 v 30 M 315 138 v 30"
            stroke="#94a3b8"
            strokeWidth="2.5"
          />
          <rect x="185" y="148" width="140" height="10" fill="#64748b" />
          {/* Screw tip */}
          <polygon points="325,143 345,153 325,163" fill="#cbd5e1" />
        </g>

        {/* Molten Plastic Flow Front */}
        <path
          d="M 345 147 H 360 V 159 H 345 Z"
          fill={isInjecting ? "#ff5e14" : "#f59e0b"}
          className="transition-all duration-300"
        />

        {/* Nozzle */}
        <polygon points="360,140 376,148 376,158 360,166" fill="#334155" />

        {/* Fixed Platen (Stationary) */}
        <g>
          <rect x="378" y="90" width="22" height="150" fill="#334155" rx="3" />
          <rect x="400" y="120" width="18" height="66" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" />
          <text x="390" y="78" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">
            FIXED PLATEN
          </text>
        </g>

        {/* Mould Cavity (Between Platens) */}
        <rect
          x="418"
          y="126"
          width="26"
          height="54"
          fill={isClamped ? (isInjecting ? "#ff5e14" : isCooling ? "#38bdf8" : "#94a3b8") : "#0f172a"}
          stroke="#475569"
          strokeDasharray={isClamped ? "none" : "3 3"}
          className="transition-colors duration-500"
          rx="2"
        />

        {/* Moving Platen & Hydraulic Ram (Clamps and opens) */}
        <g
          style={{
            transform: `translateX(${platenOffset}px)`,
            transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {/* Moving Mould half */}
          <rect x="444" y="120" width="18" height="66" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" />
          {/* Moving Platen */}
          <rect x="462" y="90" width="22" height="150" fill="#334155" rx="3" />
          {/* Hydraulic Tie Bar & Cylinder */}
          <rect x="484" y="150" width="80" height="20" fill="#475569" />
          <rect x="564" y="130" width="36" height="60" fill="#1e293b" stroke="#334155" strokeWidth="2" />
          <text x="473" y="78" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">
            MOVING PLATEN
          </text>
        </g>

        {/* Ejected Solidified Product Drops (Stage 3) */}
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
          <text x="11" y="38" textAnchor="middle" fill="#38bdf8" fontSize="9" fontFamily="monospace">
            PART EJECTED
          </text>
        </g>

        {/* Tie Bars (Horizontal Guide Bars) */}
        <line x1="360" y1="102" x2="580" y2="102" stroke="#64748b" strokeWidth="3" opacity="0.4" />
        <line x1="360" y1="228" x2="580" y2="228" stroke="#64748b" strokeWidth="3" opacity="0.4" />

        {/* Real-time Status Badge */}
        <g transform="translate(30, 240)">
          <rect x="0" y="0" width="180" height="28" rx="6" fill="#1e293b" stroke="#334155" />
          <circle
            cx="14"
            cy="14"
            r="4"
            fill={isInjecting ? "#ef4444" : isCooling ? "#38bdf8" : "#22c55e"}
            className="animate-pulse"
          />
          <text x="26" y="18" fill="#f8fafc" fontSize="10" fontFamily="monospace" fontWeight="bold">
            {stageIndex === 0
              ? "CLAMP: HYDRAULIC LOCK"
              : stageIndex === 1
              ? "INJECT: SCREW ADVANCE"
              : stageIndex === 2
              ? "COOL: HEAT EXTRACTION"
              : "EJECT: PART RELEASE"}
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
              className={`p-5 rounded-xl border transition-all duration-300 relative ${
                isActive
                  ? "bg-slate-800/90 border-accent shadow-lg shadow-accent/15 ring-2 ring-orange-500/30"
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
                  STEP {String(i + 1).padStart(2, "0")}
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

              {/* Progress Connector Indicator */}
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
