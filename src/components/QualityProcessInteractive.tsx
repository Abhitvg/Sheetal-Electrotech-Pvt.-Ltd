"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ShieldCheck, Zap, Factory } from "lucide-react";

export const testingProcesses = [
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

export default function QualityProcessInteractive() {
  const [activeProcess, setActiveProcess] = useState(testingProcesses[0].id);

  return (
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
  );
}
