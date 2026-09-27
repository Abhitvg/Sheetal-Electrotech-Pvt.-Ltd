"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";

type Category = "LED Bulbs" | "LED Battens" | "Flood Lights" | "Custom Injection Moulding" | "Blow Moulded Containers";

export default function QuoteCalculator() {
  const [category, setCategory] = useState<Category>("LED Bulbs");
  const [volume, setVolume] = useState<number>(100000);

  // Simple static rules engine for demonstration
  const calculateEstimate = () => {
    let basePrice = 0;
    let leadTimeDaysMin = 14;
    let leadTimeDaysMax = 18;

    switch (category) {
      case "LED Bulbs":
        basePrice = 0.85;
        if (volume > 50000) { leadTimeDaysMin = 18; leadTimeDaysMax = 24; }
        break;
      case "LED Battens":
        basePrice = 1.45;
        if (volume > 25000) { leadTimeDaysMin = 21; leadTimeDaysMax = 28; }
        break;
      case "Flood Lights":
        basePrice = 4.20;
        leadTimeDaysMin = 21; leadTimeDaysMax = 28;
        if (volume > 10000) { leadTimeDaysMin = 28; leadTimeDaysMax = 35; }
        break;
      case "Custom Injection Moulding":
        basePrice = 0.40;
        leadTimeDaysMin = 40; leadTimeDaysMax = 45; // Includes tooling time
        break;
      case "Blow Moulded Containers":
        basePrice = 0.15;
        leadTimeDaysMin = 14; leadTimeDaysMax = 18;
        break;
    }

    // Volume discount tiers
    let discount = 1;
    if (volume >= 50000) discount = 0.9;
    else if (volume >= 100000) discount = 0.85;

    const finalPrice = basePrice * discount;

    return {
      priceMin: (finalPrice * 0.95).toFixed(2),
      priceMax: (finalPrice * 1.05).toFixed(2),
      leadTime: `${leadTimeDaysMin}–${leadTimeDaysMax} Days`,
    };
  };

  const estimate = calculateEstimate();

  return (
    <div className="bg-white border border-slate-200 shadow-sm overflow-hidden w-full max-w-5xl mx-auto flex flex-col md:flex-row font-mono">
      
      {/* Input Section */}
      <div className="p-8 md:p-12 md:w-1/2 bg-slate-50 border-r border-slate-200">
        <h3 className="text-sm tracking-widest text-steel uppercase mb-8">Engineering Configurator</h3>

        <div className="space-y-12">
          <div>
            <label className="block text-xs font-medium text-steel mb-4 uppercase tracking-wider">
              Product Specification
            </label>
            <div className="flex flex-col gap-2 border-l-2 border-accent pl-4">
              {(["LED Bulbs", "LED Battens", "Flood Lights", "Custom Injection Moulding", "Blow Moulded Containers"] as Category[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`text-left text-sm transition-colors py-1 ${
                    category === cat 
                      ? "text-accent font-bold before:content-['>'] before:mr-2 before:text-accent" 
                      : "text-steel hover:text-ink"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="flex justify-between text-xs font-medium text-steel mb-4 uppercase tracking-wider">
              <span>Target Volume (Units)</span>
              <span className="text-ink font-bold">{volume.toLocaleString()}</span>
            </label>
            <input 
              type="range" 
              min="1000" 
              max="200000" 
              step="1000"
              value={volume} 
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full accent-accent h-1 bg-slate-200 appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-steel mt-3">
              <span>1k</span>
              <span>100k</span>
              <span>200k+</span>
            </div>
          </div>
        </div>
      </div>

      {/* Output / Blueprint Section */}
      <div className="bg-white p-8 md:p-12 md:w-1/2 flex flex-col justify-between relative">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
        </div>

        <div>
          <p className="text-xs text-steel uppercase tracking-widest mb-8">
            Live Production Blueprint
          </p>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={category + volume}
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(4px)" }}
              className="space-y-10"
            >
              <div>
                <p className="text-steel text-xs uppercase mb-2">Your Requirement</p>
                <div className="text-sm text-ink border border-slate-200 p-4 inline-block bg-slate-50">
                  <div className="font-bold text-accent mb-2">{category.toUpperCase()}</div>
                  <div className="text-steel">STANDARD OP / 6500K</div>
                  <div className="text-steel">BIS CERTIFIED</div>
                </div>
              </div>

              <div>
                <p className="text-steel text-xs uppercase mb-2">Estimated Production Cost</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl text-ink">
                    ${estimate.priceMin}
                  </span>
                  <span className="text-steel">–</span>
                  <span className="text-3xl text-ink">
                    ${estimate.priceMax}
                  </span>
                  <span className="text-sm text-steel ml-2">/ unit</span>
                </div>
              </div>

              <div>
                <p className="text-steel text-xs uppercase mb-2">Lead Time</p>
                <div className="text-2xl text-ink">
                  {estimate.leadTime}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200">
          <div className="flex items-center gap-2 text-xs text-success mb-6">
            <ShieldCheck className="w-4 h-4" />
            <span>Capacity available for this run</span>
          </div>
          <button className="w-full bg-ink hover:bg-accent text-white py-4 text-sm font-medium flex items-center justify-center gap-3 transition-colors group">
            START RFQ PROCESS
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
