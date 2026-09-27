"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Factory, Settings2, ShieldCheck, Box } from "lucide-react";
import QuoteCalculator3D from "@/components/QuoteCalculator3D";
import HeroExplosionSequence from "@/components/HeroExplosionSequence";
import DarkIndustrialTransition from "@/components/DarkIndustrialTransition";
import VirtualProductionLine from "@/components/VirtualProductionLine";
import TestingLabInterface from "@/components/TestingLabInterface";
import MaterialShowcase from "@/components/MaterialShowcase";
import StreetLightExplosionSequence from "@/components/StreetLightExplosionSequence";

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* 1. CONTINUOUS 3D HERO NARRATIVE */}
      <HeroExplosionSequence />

      {/* 2. FACTORY TRANSITION */}
      <DarkIndustrialTransition />

      {/* 2.5 MATERIAL SHOWCASE */}
      <MaterialShowcase />

      {/* 3. VIRTUAL PRODUCTION LINE (Horizontal Scroll) */}
      <VirtualProductionLine />

      {/* 4. TESTING LAB INTERFACE */}
      <TestingLabInterface />

      {/* 4.5 STREET LIGHT EXPLOSION */}
      <StreetLightExplosionSequence />

      {/* 5. LIVE CAPACITY CALCULATOR */}
      <section className="py-24 bg-gradient-premium relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero_factory.jpg')] opacity-10 mix-blend-overlay bg-cover bg-center"></div>
        <div className="container-wide relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="mb-4">Instantly verify our capacity.</h2>
            <p className="text-steel text-lg">
              No endless email threads. Input your target volume and category to get an immediate 
              estimate of unit cost and lead time based on our active production lines.
            </p>
          </div>
          <QuoteCalculator3D />
        </div>
      </section>

      {/* 3. TRUST & LOGO WALL (Proof Strip) */}
      <section className="py-24 bg-paper text-ink border-t border-slate-200">
        <div className="container-wide text-center">
          <p className="font-mono text-sm uppercase tracking-widest text-ink/50 mb-12">
            Trusted by industry leaders
          </p>
          <div className="flex flex-wrap justify-center items-center gap-16 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
             <div className="flex items-center gap-2">
               <ShieldCheck className="w-8 h-8 text-ink" />
               <span className="text-2xl font-display font-bold tracking-tight">TATA</span>
             </div>
             <div className="flex items-center gap-2">
               <div className="w-8 h-8 rounded-full border-4 border-ink flex items-center justify-center">
                 <div className="w-2 h-2 bg-ink rounded-full"></div>
               </div>
               <span className="text-2xl font-display font-medium tracking-widest uppercase">Crompton</span>
             </div>
             <div className="flex items-center gap-2">
               <Settings2 className="w-8 h-8 text-ink" />
               <span className="text-xl font-display font-bold tracking-widest text-ink">LEDVANCE</span>
             </div>
             <div className="flex items-center gap-2">
               <div className="w-6 h-6 border-2 border-ink rotate-45 flex items-center justify-center"></div>
               <span className="text-2xl font-display font-semibold tracking-wide">Orient</span>
             </div>
             <div className="flex items-center gap-2">
               <Factory className="w-8 h-8 text-ink" />
               <span className="text-2xl font-display font-bold italic tracking-tight">HPCL</span>
             </div>
             <div className="flex items-center gap-2">
               <Box className="w-8 h-8 text-ink" />
               <span className="text-2xl font-display font-black tracking-widest">UPL</span>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
