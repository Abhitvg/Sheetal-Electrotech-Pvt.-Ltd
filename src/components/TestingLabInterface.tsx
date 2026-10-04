"use client";

import { useEffect, useState } from "react";
import { Activity, Thermometer, Zap } from "lucide-react";

export default function TestingLabInterface() {
  const [activeTest, setActiveTest] = useState("thermal");

  // Simulated data streams
  const [dataStream, setDataStream] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const ms = new Date().getMilliseconds().toString().padStart(3, "0");
      const temp = (Math.random() * 5 + 65).toFixed(2);
      const current = (Math.random() * 0.1 + 2.4).toFixed(3);
      
      const newLog = `[SYS_${ms}] CH0${Math.floor(Math.random()*4)+1} | TMP: ${temp}°C | CUR: ${current}A | STATUS: NOMINAL`;
      
      setDataStream(prev => {
        const next = [newLog, ...prev];
        if (next.length > 8) next.pop();
        return next;
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-ink text-paper relative overflow-hidden">
      
      <div className="container-wide mb-12">
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Zero-Defect Quality Control.</h2>
        <p className="text-steel text-lg max-w-2xl">
          We don&apos;t just claim quality; we engineer it. Explore our real-time testing simulation showcasing the rigorous parameters every unit must pass before leaving our facility.
        </p>
      </div>

      <div className="container-wide">
        <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-1 md:p-4 font-mono shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4 px-4">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
              <span className="text-sm tracking-widest text-steel">SYS.QC_LAB_01 // LIVE</span>
            </div>
            <div className="flex gap-4">
              <span className="text-xs text-accent bg-accent/10 px-2 py-1 rounded">BIS COMPLIANT</span>
              <span className="text-xs text-accent bg-accent/10 px-2 py-1 rounded">Quality Control</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            
            {/* Left Sidebar - Test Selection */}
            <div className="col-span-1 border border-white/5 bg-white/5 rounded-xl p-4 flex flex-col gap-2">
              <h3 className="text-xs text-steel uppercase tracking-widest mb-4">Active Protocol</h3>
              
              <button 
                onClick={() => setActiveTest("thermal")}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-all text-left ${activeTest === "thermal" ? "bg-accent/10 border-accent text-accent" : "border-transparent text-steel hover:bg-white/5"}`}
              >
                <Thermometer className="w-5 h-5" />
                <div>
                  <div className="text-sm font-bold">Thermal Chamber</div>
                  <div className="text-xs opacity-70">85°C / 85% RH Aging</div>
                </div>
              </button>

              <button 
                onClick={() => setActiveTest("photometric")}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-all text-left ${activeTest === "photometric" ? "bg-accent/10 border-accent text-accent" : "border-transparent text-steel hover:bg-white/5"}`}
              >
                <Activity className="w-5 h-5" />
                <div>
                  <div className="text-sm font-bold">Goniophotometer</div>
                  <div className="text-xs opacity-70">Luminous Efficacy & Distribution</div>
                </div>
              </button>

              <button 
                onClick={() => setActiveTest("electrical")}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-all text-left ${activeTest === "electrical" ? "bg-accent/10 border-accent text-accent" : "border-transparent text-steel hover:bg-white/5"}`}
              >
                <Zap className="w-5 h-5" />
                <div>
                  <div className="text-sm font-bold">Electrical Surge</div>
                  <div className="text-xs opacity-70">High-Voltage Transient Testing</div>
                </div>
              </button>

              <div className="mt-auto pt-6 border-t border-white/10">
                <h3 className="text-xs text-steel uppercase tracking-widest mb-4">Live Telemetry</h3>
                <div className="flex flex-col gap-1 text-[10px] text-steel">
                  {dataStream.map((log, i) => (
                    <div key={i} className="opacity-80 font-mono break-all">{log}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Display Area */}
            <div className="col-span-1 lg:col-span-2 border border-white/5 bg-[#0b1120] rounded-xl p-6 relative overflow-hidden min-h-[400px] flex flex-col">
              
              {/* Background Grid */}
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" style={{ backgroundSize: '40px' }}></div>
              
              {activeTest === "thermal" && (
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h4 className="text-accent text-lg font-bold">THERMAL DISSIPATION ANALYSIS</h4>
                      <p className="text-steel text-xs">Heat Sink Aluminum Grade ADC12</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-display font-light">68.4<span className="text-sm text-steel">°C</span></div>
                      <div className="text-xs text-emerald-400">WITHIN TOLERANCE</div>
                    </div>
                  </div>
                  
                  {/* CSS Simulation of a heat map / graph */}
                  <div className="flex-1 w-full flex items-end justify-between gap-1 pb-4">
                     {[30, 45, 60, 55, 75, 80, 85, 70, 65, 60, 50, 45, 35, 40, 55, 65, 70].map((h, i) => (
                       <div key={i} className="w-full relative group">
                         <div 
                           className="w-full bg-gradient-to-t from-blue-500 via-orange-500 to-red-500 rounded-t-sm transition-all duration-500" 
                           style={{ height: `${h}%`, opacity: h > 75 ? 1 : 0.6 }}
                         ></div>
                       </div>
                     ))}
                  </div>
                </div>
              )}

              {activeTest === "photometric" && (
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h4 className="text-accent text-lg font-bold">PHOTOMETRIC POLAR CURVE</h4>
                      <p className="text-steel text-xs">Integrating Sphere - 12W LED</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-display font-light">120<span className="text-sm text-steel">LM/W</span></div>
                      <div className="text-xs text-emerald-400">HIGH EFFICACY</div>
                    </div>
                  </div>
                  
                  {/* SVG Simulation of a photometric curve */}
                  <div className="flex-1 w-full flex items-center justify-center">
                    <svg viewBox="0 0 200 200" className="w-48 h-48 opacity-80 overflow-visible">
                      <circle cx="100" cy="100" r="90" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
                      <circle cx="100" cy="100" r="60" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
                      <circle cx="100" cy="100" r="30" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
                      <line x1="100" y1="10" x2="100" y2="190" stroke="#334155" strokeWidth="1" />
                      <line x1="10" y1="100" x2="190" y2="100" stroke="#334155" strokeWidth="1" />
                      
                      <path 
                        d="M100 10 C140 10 180 80 180 100 C180 120 140 190 100 190 C60 190 20 120 20 100 C20 80 60 10 100 10" 
                        fill="none" 
                        stroke="#3b82f6" 
                        strokeWidth="3"
                        className="animate-[pulse_3s_ease-in-out_infinite]"
                      />
                    </svg>
                  </div>
                </div>
              )}

              {activeTest === "electrical" && (
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h4 className="text-accent text-lg font-bold">TRANSIENT VOLTAGE SURGE</h4>
                      <p className="text-steel text-xs">IEC 61000-4-5 Immunity Test</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-display font-light">4.8<span className="text-sm text-steel">KV</span></div>
                      <div className="text-xs text-emerald-400">SURVIVED - NO DAMAGE</div>
                    </div>
                  </div>
                  
                  {/* SVG Simulation of an oscilloscope surge */}
                  <div className="flex-1 w-full flex items-center justify-center bg-black/30 rounded-lg p-4 border border-white/5">
                    <svg viewBox="0 0 500 100" className="w-full h-full preserve-aspect-ratio-none">
                      {/* Grid */}
                      <pattern id="grid" width="50" height="25" patternUnits="userSpaceOnUse">
                        <path d="M 50 0 L 0 0 0 25" fill="none" stroke="#1e293b" strokeWidth="1"/>
                      </pattern>
                      <rect width="500" height="100" fill="url(#grid)" />
                      
                      {/* Waveform */}
                      <path 
                        d="M 0 50 L 100 50 L 110 20 L 120 90 L 130 50 L 400 50 L 410 10 L 420 95 L 430 50 L 500 50" 
                        fill="none" 
                        stroke="#f59e0b" 
                        strokeWidth="2" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
