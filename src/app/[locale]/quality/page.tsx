"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Download, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

const testingProcesses = [
  {
    id: "visual",
    title: "Visual & Dimensional Inspection",
    icon: ShieldCheck,
    description: "Every component is meticulously inspected for structural integrity, finish, and precise dimensional tolerances before proceeding to assembly.",
  },
  {
    id: "functional",
    title: "Functional Testing",
    icon: Zap,
    description: "Finished products undergo comprehensive functional testing to ensure they perform reliably under expected operating conditions.",
  },
  {
    id: "compliance",
    title: "Standards Compliance",
    icon: CheckCircle2,
    description: "Our quality assurance team verifies that products meet all documented specifications and applicable industry standards prior to dispatch.",
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
            Engineered for reliability.<br />Tested for reality.
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
              src="/images/legacy/inspection.png"
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
            <h3 className="font-display text-2xl mb-8">In-House Validation Protocols</h3>
            
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
              <h2 className="text-3xl md:text-5xl font-display font-medium mb-4">Quality & Compliance</h2>
              <p className="text-ink/60">Our manufacturing processes are supported by documented quality and compliance requirements.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-8">
            <div className="border border-slate-200 p-8 flex flex-col gap-6 bg-white max-w-3xl">
              <div className="w-16 h-16 bg-slate-100 flex items-center justify-center rounded-sm text-ink font-display text-xl font-bold">
                <ShieldCheck className="w-8 h-8 text-ink/70" />
              </div>
              <div>
                <h4 className="text-xl font-medium mb-2">Compliance Documentation</h4>
                <p className="text-base text-ink/70 leading-relaxed">
                  Certification and compliance documentation can be provided upon request for procurement audits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
