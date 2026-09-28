"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Download, CheckCircle2, FlaskConical, ShieldCheck, Zap } from "lucide-react";

const testingProcesses = [
  {
    id: "lumen",
    title: "Lumen & Integrating Sphere",
    icon: FlaskConical,
    description: "Every batch of LED chips undergoes rigorous photometric testing in our integrating spheres to guarantee color temperature consistency and exact lumen output, preventing batch-to-batch variation.",
  },
  {
    id: "surge",
    title: "High-Voltage Surge Testing",
    icon: Zap,
    description: "Our lighting drivers are stressed with up to 4kV surge testing to simulate severe grid fluctuations, ensuring the components will survive real-world Indian electrical grid conditions.",
  },
  {
    id: "leak",
    title: "Vacuum Leak Detection",
    icon: ShieldCheck,
    description: "For rigid packaging, samples are tested in negative pressure vacuum chambers to ensure caps and threads are 100% hermetically sealed for cosmetics and pharmaceuticals.",
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
            Zero Defect Policy
          </p>
          <h1 className="text-5xl md:text-7xl font-display font-medium mb-8">
            Engineered for reliability.<br />Tested for reality.
          </h1>
          <p className="text-steel text-xl max-w-2xl">
            We don't just manufacture; we validate. Our in-house testing laboratories ensure that every product leaving Daman meets strict international compliance and domestic BIS standards.
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
              <h2 className="text-3xl md:text-5xl font-display font-medium mb-4">Official Certifications</h2>
              <p className="text-ink/60">Verified documents available for procurement audits.</p>
            </div>
            <button className="bg-white text-ink px-6 py-3 font-medium flex items-center gap-3 hover:bg-accent hover:text-ink transition-colors">
              Download Full Dossier <Download className="w-4 h-4" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Cert 1 */}
            <div className="border border-slate-200 p-8 flex flex-col gap-6 hover:bg-slate-50 transition-colors group cursor-pointer">
              <div className="w-16 h-16 bg-slate-100 flex items-center justify-center rounded-sm text-ink font-display text-xl font-bold">
                ISO
              </div>
              <div>
                <h4 className="text-xl font-medium mb-2 group-hover:text-accent transition-colors">ISO 9001:2015</h4>
                <p className="text-sm text-ink/50 mb-6">Quality Management Systems for manufacturing and assembly operations.</p>
                <div className="flex items-center gap-2 text-sm text-accent font-medium">
                  <Download className="w-4 h-4" /> Download PDF
                </div>
              </div>
            </div>

            {/* Cert 2 */}
            <div className="border border-slate-200 p-8 flex flex-col gap-6 hover:bg-slate-50 transition-colors group cursor-pointer">
              <div className="w-16 h-16 bg-slate-100 flex items-center justify-center rounded-sm text-ink font-display text-xl font-bold">
                BIS
              </div>
              <div>
                <h4 className="text-xl font-medium mb-2 group-hover:text-accent transition-colors">BIS Certification</h4>
                <p className="text-sm text-ink/50 mb-6">Bureau of Indian Standards compliance for LED lighting products and drivers.</p>
                <div className="flex items-center gap-2 text-sm text-accent font-medium">
                  <Download className="w-4 h-4" /> Download PDF
                </div>
              </div>
            </div>

            {/* Cert 3 */}
            <div className="border border-slate-200 p-8 flex flex-col gap-6 hover:bg-slate-50 transition-colors group cursor-pointer">
              <div className="w-16 h-16 bg-slate-100 flex items-center justify-center rounded-sm text-ink font-display text-xl font-bold">
                CE
              </div>
              <div>
                <h4 className="text-xl font-medium mb-2 group-hover:text-accent transition-colors">CE Declaration</h4>
                <p className="text-sm text-ink/50 mb-6">European conformity standards for export-ready manufactured goods.</p>
                <div className="flex items-center gap-2 text-sm text-accent font-medium">
                  <Download className="w-4 h-4" /> Download PDF
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
