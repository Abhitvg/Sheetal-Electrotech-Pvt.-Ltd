"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Cpu,
  Zap,
  Award,
  CheckCircle2,
  Microscope,
  Flame,
  ArrowRight,
  Sparkles,
  Layers
} from "lucide-react";

export interface TestingProcessStep {
  id: string;
  stepNumber: string;
  title: string;
  shortTag: string;
  icon: typeof ShieldCheck;
  image: string;
  headline: string;
  description: string;
  equipment: string;
  samplingRate: string;
  criteria: string[];
  refStandard: string;
}

export const testingProcesses: TestingProcessStep[] = [
  {
    id: "incoming",
    stepNumber: "01",
    title: "Incoming Material Inspection (IQC)",
    shortTag: "Virgin Polymers & Components",
    icon: ShieldCheck,
    image: "/images/testing_lab.jpg",
    headline: "Zero-defect baseline verification before raw stock enters shop-floor inventory.",
    description: "Every batch of virgin engineering polymers (polycarbonate, PBT, polypropylene), aluminum 6063 ingots, LED emitters, passive SMDs, and driver ICs undergoes rigorous inspection against vendor Certificates of Analysis (COA) and Sheetal internal engineering thresholds.",
    equipment: "Melt Flow Index (MFI) tester, digital moisture analyzer, spectrophotometer, optical comparator",
    samplingRate: "MIL-STD-105E / AQL 0.65 Level II",
    criteria: [
      "Polymer moisture content < 0.02% prior to dehumidification drying",
      "LED emitter CCT binning within 3-step MacAdam ellipse",
      "SMD component solderability & terminal oxidation verification",
      "Raw aluminum 6063 alloy thermal conductivity ≥ 200 W/m·K"
    ],
    refStandard: "IS 15410 · ASTM D1238 · IES LM-80"
  },
  {
    id: "process",
    stepNumber: "02",
    title: "In-Process Control (IPQC)",
    shortTag: "SMT & Moulding Lines",
    icon: Cpu,
    image: "/images/smt_electronics.jpg",
    headline: "Automated real-time inspection during SMT mounting and precision injection moulding.",
    description: "During automated SMT pick-and-place and injection moulding cycles, inline Automated Optical Inspection (AOI) and multi-zone reflow profile loggers monitor solder joint integrity, component orientation, and plastic wall-thickness uniformity in real time.",
    equipment: "Inline AOI optical scanner, KIC reflow thermal profiler, digital micrometer, mould cavity pressure transducers",
    samplingRate: "100% Inline Optical AOI + Hourly dimensional first-off sampling",
    criteria: [
      "100% automated optical inspection for tombstoning, solder bridges & polarities",
      "Lead-free SAC305 reflow peak temperature maintained at 245°C ± 3°C",
      "Plastic injection moulding cycle time & cushion consistency ±0.1s",
      "Moulded diffuser light transmission tolerance ≥ 88% ± 1.5%"
    ],
    refStandard: "IPC-A-610 Class 2 · DIN 16901 · IS 16102"
  },
  {
    id: "assembly",
    stepNumber: "03",
    title: "Assembly & Hipot Verification",
    shortTag: "High-Voltage Dielectric Testing",
    icon: Zap,
    image: "/images/facilities/assembly-packing.webp",
    headline: "100% dielectric withstand and surge immunity validation on every manufactured luminaire.",
    description: "As assembled luminaires move through continuous ESD-protected conveyor lines, every unit is subjected to mandatory high-voltage flash testing (1.5 kV to 3.75 kV AC) to verify electrical insulation, earth continuity, and surge protection device (SPD) integrity.",
    equipment: "Programmable AC/DC Hipot Dielectric Tester, Earth Resistance Meter, Surge Simulation Generator",
    samplingRate: "100% Routine Production Testing (Zero Escape Policy)",
    criteria: [
      "High-voltage withstand 1.5 kV AC for 1 minute with leakage current < 5.0 mA",
      "Earth continuity resistance < 0.1 Ω from earth terminal to external housing",
      "Surge withstand validation up to 2.5 kV (differential) & 4.0 kV (common mode)",
      "Thermal interface compound coverage ≥ 95% on MCPCB heat slug"
    ],
    refStandard: "IS 16102 (Part 1) · IS 10322 (Part 5) · IS 15885"
  },
  {
    id: "final",
    stepNumber: "04",
    title: "Final QA & Photometric Aging",
    shortTag: "Integrating Sphere & Burn-in",
    icon: Award,
    image: "/images/testing_lab.jpg",
    headline: "Integrating sphere photometric benchmarking and cyclic voltage burn-in aging.",
    description: "Completed production batches enter dark-room testing where 1.5m / 2.0m Integrating Spheres with Everfine Spectroradiometers measure luminous flux, CCT, CRI, and power factor. Representative samples undergo 4-hour cyclic high/low voltage burn-in to filter out infant mortality.",
    equipment: "Everfine Integrating Sphere Spectroradiometer, High-Precision Power Analyzer, Multi-Channel Thermal Logger",
    samplingRate: "100% Burn-In Aging + Batch-wise 100% Photometric Verification",
    criteria: [
      "Luminous efficacy ≥ 100 lm/W validated across standard rating wattages",
      "Color Rendering Index (CRI) Ra ≥ 80 with R9 > 10 for true color fidelity",
      "Total Harmonic Distortion (THD) < 10% and Power Factor (PF) > 0.95",
      "Zero component failures during 4-hour cyclic burn-in (140V to 300V AC)"
    ],
    refStandard: "IS 16102 (Part 2) · IES LM-79 · BEE 5-Star"
  }
];

export default function QualityProcessInteractive() {
  const [activeId, setActiveId] = useState<string>(testingProcesses[0].id);
  const activeStep = testingProcesses.find((p) => p.id === activeId) ?? testingProcesses[0];

  return (
    <section className="container-wide mb-28">
      {/* Blueprint Container */}
      <div className="bg-slate-950 text-white border border-slate-800 rounded-sm shadow-2xl overflow-hidden">
        
        {/* Step Selector Header Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-b border-slate-800 bg-slate-900/60 divide-x divide-slate-800/80">
          {testingProcesses.map((step) => {
            const isActive = activeId === step.id;
            const Icon = step.icon;

            return (
              <button
                key={step.id}
                onClick={() => setActiveId(step.id)}
                className={`p-5 md:p-6 text-left transition-all duration-300 relative cursor-pointer group ${
                  isActive
                    ? "bg-slate-900 text-white"
                    : "text-slate-400 hover:text-white hover:bg-slate-900/40"
                }`}
              >
                {/* Active Top Glow Line */}
                {isActive && (
                  <motion.div
                    layoutId="activeQualityTabIndicator"
                    className="absolute top-0 left-0 right-0 h-1 bg-accent shadow-[0_0_12px_rgba(249,115,22,0.8)]"
                  />
                )}

                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`font-mono text-xs font-bold px-2 py-0.5 rounded-xs ${
                      isActive
                        ? "bg-accent text-ink"
                        : "bg-white/10 text-slate-400 group-hover:text-white"
                    }`}
                  >
                    STAGE {step.stepNumber}
                  </span>
                  <Icon
                    className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                      isActive ? "text-accent" : "text-slate-500"
                    }`}
                  />
                </div>

                <h4
                  className={`font-display text-sm md:text-base font-bold leading-snug ${
                    isActive ? "text-white" : "text-slate-300"
                  }`}
                >
                  {step.title.split(" (")[0]}
                </h4>
                <p className="font-mono text-[11px] text-slate-500 mt-1 truncate">
                  {step.shortTag}
                </p>
              </button>
            );
          })}
        </div>

        {/* Dynamic Interactive Stage Body */}
        <div className="grid lg:grid-cols-12 min-h-[580px]">
          
          {/* Left Column: Real Photography Showcase with Dynamic Overlays (7 cols) */}
          <div className="lg:col-span-7 relative bg-slate-900 overflow-hidden min-h-[380px] lg:min-h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep.id}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <Image
                  src={activeStep.image}
                  alt={`${activeStep.title} at Sheetal Electrotech Quality Laboratory`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-slate-950/80 hidden lg:block" />
              </motion.div>
            </AnimatePresence>

            {/* Live Watermark Overlay Chips */}
            <div className="absolute top-6 left-6 flex flex-wrap items-center gap-2 z-10">
              <span className="px-3 py-1 bg-black/80 backdrop-blur-md text-white font-mono text-[10px] uppercase tracking-widest border border-white/10 rounded-xs">
                DAMAN QUALITY LAB · {activeStep.stepNumber}
              </span>
              <span className="px-3 py-1 bg-accent/90 text-ink font-mono text-[10px] uppercase tracking-widest font-bold rounded-xs shadow-xs">
                {activeStep.refStandard}
              </span>
            </div>

            {/* Bottom Sampling Badge on Image */}
            <div className="absolute bottom-6 left-6 right-6 p-4 bg-slate-950/90 backdrop-blur-md border border-white/10 rounded-xs flex flex-wrap items-center justify-between gap-3 text-xs font-mono z-10">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Sampling Regime</span>
                <span className="text-white font-bold">{activeStep.samplingRate}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Inspection Standard</span>
                <span className="text-accent font-bold">{activeStep.refStandard}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Technical Criteria & Protocols (5 cols) */}
          <div className="lg:col-span-5 p-8 md:p-10 lg:p-12 flex flex-col justify-between bg-slate-950 border-t lg:border-t-0 lg:border-l border-slate-800">
            <div>
              <div className="inline-flex items-center gap-2 text-accent font-mono text-xs uppercase tracking-widest mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Protocol Specifications · Stage {activeStep.stepNumber}</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-display font-medium text-white mb-3">
                {activeStep.title}
              </h3>

              <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6 font-sans">
                {activeStep.description}
              </p>

              {/* Verified Pass/Fail Criteria */}
              <div className="space-y-3 pt-4 border-t border-slate-800/80 mb-6">
                <p className="font-mono text-xs uppercase tracking-wider text-accent font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Enforced Quality Thresholds:
                </p>
                <ul className="space-y-2.5">
                  {activeStep.criteria.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-300 leading-snug">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Equipment Used Strip */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-xs text-xs">
                <span className="text-slate-400 block font-mono text-[10px] uppercase tracking-wider mb-1">
                  Instrumentation &amp; Testing Apparatus:
                </span>
                <span className="text-slate-200 font-sans leading-relaxed">
                  {activeStep.equipment}
                </span>
              </div>
            </div>

            {/* Bottom Advance Control */}
            <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">
                Stage {activeStep.stepNumber} of 04
              </span>
              <button
                onClick={() => {
                  const currIdx = testingProcesses.findIndex((p) => p.id === activeId);
                  const nextIdx = (currIdx + 1) % testingProcesses.length;
                  setActiveId(testingProcesses[nextIdx].id);
                }}
                className="text-accent hover:text-white transition-colors flex items-center gap-1.5 font-bold cursor-pointer"
              >
                Next Quality Stage <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
