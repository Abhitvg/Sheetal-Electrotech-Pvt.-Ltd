"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ShieldCheck, Zap, Factory } from "lucide-react";

const testingProcesses = [
  {
    id: "incoming",
    title: "Incoming Inspection",
    icon: ShieldCheck,
    description: "Rigorous material verification before any component enters the production line, ensuring base materials meet quality thresholds.",
  },
  {
    id: "process",
    title: "Process Control",
    icon: Factory,
    description: "In-line quality checks during injection moulding, SMT, and fabrication to maintain exact tolerances and manufacturing standards.",
  },
  {
    id: "assembly",
    title: "Assembly Inspection",
    icon: CheckCircle2,
    description: "Continuous monitoring at assembly stations to verify correct insertion, structural integrity, and proper component fitting.",
  },
  {
    id: "final",
    title: "Final Testing",
    icon: Zap,
    description: "Comprehensive functional, electrical, and visual validation on finished products prior to packaging and dispatch.",
  },
];

export default function QualityPage() {
  const [activeProcess, setActiveProcess] = useState(testingProcesses[0].id);

  return (
    <div className="bg-paper min-h-screen text-ink">
      
      {/* Hero Header */}
      <div className="pt-40 pb-20 px-6 container-wide">
        <div className="max-w-4xl">
          <p className="font-mono text-accent text-sm uppercase tracking-widest mb-6 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-accent inline-block"></span>
            Quality & Compliance
          </p>
          <h1 className="text-5xl md:text-7xl font-display font-medium mb-8">
            Built into every stage of manufacturing.
          </h1>
          <p className="text-steel text-xl max-w-2xl">
            We don't just manufacture; we validate. Our in-house testing and robust inspection processes support compliance with domestic BIS standards and our own internal quality metrics.
          </p>
        </div>
      </div>

      {/* Interactive Testing Diagram Section */}
      <section className="container-wide mb-32">
        <div className="bg-white border border-steel/10 shadow-sm overflow-hidden flex flex-col lg:flex-row">
          
          {/* Left: Image/Diagram Display */}
          <div className="lg:w-1/2 relative min-h-[400px] lg:min-h-full bg-mist">
            <Image 
              src="/images/testing_lab.jpg"
              alt="Quality Assurance Laboratory"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent" />
            
            {/* Interactive Hotspots Overlay */}
            <div className="absolute inset-0 p-12 flex flex-col justify-end">
              <AnimatePresence mode="wait">
                {testingProcesses.map((process) => 
                  activeProcess === process.id && (
                    <motion.div
                      key={process.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-white p-6 shadow-xl max-w-sm border-l-4 border-accent"
                    >
                      <h4 className="font-medium text-lg mb-2">{process.title}</h4>
                      <p className="text-steel text-sm leading-relaxed">{process.description}</p>
                    </motion.div>
                  )
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Selection Menu */}
          <div className="lg:w-1/2 p-8 lg:p-16">
            <h3 className="font-display text-2xl mb-8">Manufacturing Quality Process</h3>
            
            <div className="space-y-4">
              {testingProcesses.map((process) => (
                <button
                  key={process.id}
                  onClick={() => setActiveProcess(process.id)}
                  className={`w-full text-left p-6 transition-all duration-300 border flex items-center gap-6 ${
                    activeProcess === process.id 
                      ? "border-accent bg-accent/5 shadow-sm" 
                      : "border-steel/10 hover:border-steel/30 bg-white"
                  }`}
                >
                  <div className={`p-3 rounded-full ${
                    activeProcess === process.id ? "bg-accent text-ink" : "bg-mist text-steel"
                  }`}>
                    <process.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className={`font-medium ${activeProcess === process.id ? "text-ink" : "text-steel"}`}>
                      {process.title}
                    </h4>
                    <p className="text-sm text-steel mt-1 opacity-70">View details →</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications & Compliance Download Strip */}
      <section className="bg-mist text-ink py-24">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16 border-b border-slate-200 pb-8">
            <div>
              <h2 className="text-3xl md:text-5xl font-display font-medium mb-4">Certifications</h2>
              <p className="text-ink/60">Our manufacturing capabilities are supported by industry-recognized quality standards.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="border border-slate-200 p-8 flex flex-col gap-6 bg-white">
              <div className="w-16 h-16 bg-slate-100 flex items-center justify-center rounded-sm text-ink font-display text-xl font-bold">
                ISO
              </div>
              <div>
                <h4 className="text-xl font-medium mb-2">ISO 9001:2015</h4>
                <p className="text-base text-ink/70 leading-relaxed">
                  Certified Quality Management System covering our design, manufacturing and supply operations.
                </p>
              </div>
            </div>
            
            <div className="border border-slate-200 p-8 flex flex-col gap-6 bg-white">
              <div className="w-16 h-16 bg-slate-100 flex items-center justify-center rounded-sm text-ink font-display text-xl font-bold">
                BIS
              </div>
              <div>
                <h4 className="text-xl font-medium mb-2">BIS Certified</h4>
                <p className="text-base text-ink/70 leading-relaxed">
                  Products manufactured in compliance with Bureau of Indian Standards requirements for safety and performance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
