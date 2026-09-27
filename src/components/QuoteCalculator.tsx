"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Clock, PackageCheck, ArrowRight, ShieldCheck } from "lucide-react";

type Category = "LED Bulbs" | "LED Battens" | "Flood Lights" | "Custom Injection Moulding" | "Blow Moulded Containers";

export default function QuoteCalculator() {
  const [category, setCategory] = useState<Category>("LED Bulbs");
  const [volume, setVolume] = useState<number>(10000);

  // Simple static rules engine for demonstration
  const calculateEstimate = () => {
    let basePrice = 0;
    let leadTimeWeeks = 2;

    switch (category) {
      case "LED Bulbs":
        basePrice = 0.85;
        if (volume > 50000) leadTimeWeeks = 3;
        break;
      case "LED Battens":
        basePrice = 1.45;
        if (volume > 25000) leadTimeWeeks = 4;
        break;
      case "Flood Lights":
        basePrice = 4.20;
        leadTimeWeeks = 3;
        if (volume > 10000) leadTimeWeeks = 5;
        break;
      case "Custom Injection Moulding":
        basePrice = 0.40;
        leadTimeWeeks = 6; // Includes tooling time
        break;
      case "Blow Moulded Containers":
        basePrice = 0.15;
        leadTimeWeeks = 2;
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
      leadTime: leadTimeWeeks,
    };
  };

  const estimate = calculateEstimate();

  return (
    <div className="bg-paper border border-steel/20 shadow-xl overflow-hidden w-full max-w-5xl mx-auto flex flex-col md:flex-row">
      
      {/* Input Section */}
      <div className="p-8 md:p-12 md:w-3/5 bg-mist/30">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-accent p-2">
            <Calculator className="text-white w-5 h-5" />
          </div>
          <h3 className="text-2xl font-display font-medium text-ink">Live Capacity Calculator</h3>
        </div>

        <div className="space-y-8">
          <div>
            <label className="block text-sm font-medium text-steel mb-3 uppercase tracking-wider font-mono">
              Product Category
            </label>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {(["LED Bulbs", "LED Battens", "Flood Lights", "Custom Injection Moulding", "Blow Moulded Containers"] as Category[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`text-left text-sm px-4 py-3 border transition-colors ${
                    category === cat 
                      ? "border-accent bg-accent/10 text-ink font-medium" 
                      : "border-steel/20 text-steel hover:border-steel/50 bg-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="flex justify-between text-sm font-medium text-steel mb-3 uppercase tracking-wider font-mono">
              <span>Monthly Volume Request</span>
              <span className="text-ink font-bold">{volume.toLocaleString()} units</span>
            </label>
            <input 
              type="range" 
              min="1000" 
              max="200000" 
              step="1000"
              value={volume} 
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full accent-accent h-2 bg-steel/20 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-steel mt-2 font-mono">
              <span>1k</span>
              <span>100k</span>
              <span>200k+</span>
            </div>
          </div>
        </div>
      </div>

      {/* Output / Estimate Section */}
      <div className="bg-mist text-ink p-8 md:p-12 md:w-2/5 flex flex-col justify-between">
        <div>
          <p className="font-mono text-sm text-white/50 uppercase tracking-widest mb-6 border-b border-white/10 pb-4">
            Real-Time Estimate
          </p>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={category + volume}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div>
                <p className="text-steel text-sm font-medium mb-1">Estimated Unit Price Band</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl lg:text-5xl font-display font-medium text-white">
                    ${estimate.priceMin}
                  </span>
                  <span className="text-xl text-white/50">-</span>
                  <span className="text-3xl font-display font-medium text-white/70">
                    ${estimate.priceMax}
                  </span>
                </div>
                <p className="text-xs text-white/40 mt-2 font-mono">*Ex-works Daman, India. Material cost subject to minor variance.</p>
              </div>

              <div>
                <p className="text-steel text-sm font-medium mb-2">Production Lead Time</p>
                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6 text-accent" />
                  <span className="text-2xl font-display font-medium text-white">
                    {estimate.leadTime} Weeks
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex items-center gap-2 text-sm text-success mb-6 font-mono">
            <ShieldCheck className="w-4 h-4" />
            <span>Capacity available for this run</span>
          </div>
          <button className="w-full bg-accent hover:bg-orange-600 text-white py-4 font-medium flex items-center justify-center gap-3 transition-colors group">
            Proceed to Full RFQ
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
