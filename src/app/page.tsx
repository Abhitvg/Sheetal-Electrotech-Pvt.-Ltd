"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Factory, Settings2, ShieldCheck, Box } from "lucide-react";
import QuoteCalculator from "@/components/QuoteCalculator";
import CapabilitiesScroller from "@/components/CapabilitiesScroller";
import HeroExplosionSequence from "@/components/HeroExplosionSequence";

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* 1. CONTINUOUS 3D HERO NARRATIVE */}
      <HeroExplosionSequence />

      {/* 2. THE OEM PROMISE */}
      <section className="section-padding bg-paper">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="mb-6">We own your production end-to-end.</h2>
              <p className="text-steel mb-8 text-lg">
                Stop juggling multiple vendors and dealing with supply chain delays. From product design and mould manufacturing to SMT assembly and final packing, we are a fully vertically integrated OEM partner based in Daman, India.
              </p>
              
              <ul className="space-y-6">
                {[
                  { icon: Settings2, title: "Design to Production", desc: "In-house tooling and precision molding for rigid plastics." },
                  { icon: Factory, title: "Mass Scale Capacity", desc: "Extrusion capacity of up to 1.2M pieces per month." },
                  { icon: ShieldCheck, title: "Verified Quality", desc: "Rigorous end-of-line testing with BIS & CE compliance." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 items-start p-4 glass-card rounded-xl">
                    <div className="p-3 bg-accent/20 rounded-lg border border-accent/30">
                      <item.icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-medium text-ink mb-1">{item.title}</h4>
                      <p className="text-steel text-sm">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative h-[600px] w-full bg-mist overflow-hidden">
               <Image
                 src="/images/moulding_factory.jpg"
                 alt="Moulding Factory Facility"
                 fill
                 sizes="(max-width: 768px) 100vw, 50vw"
                 className="object-cover"
               />
            </div>
          </div>
        </div>
      </section>

      {/* Note: 3D Product Explosion is now part of the Hero sequence above */}

      {/* 2.2 SCROLL-LINKED FACILITIES STORYTELLING */}
      <CapabilitiesScroller />

      {/* 2.5 LIVE CAPACITY CALCULATOR */}
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
          <QuoteCalculator />
        </div>
      </section>

      {/* 3. TRUST & LOGO WALL (Proof Strip) */}
      <section className="py-24 bg-paper text-ink border-t border-slate-200">
        <div className="container-wide text-center">
          <p className="font-mono text-sm uppercase tracking-widest text-ink/50 mb-12">
            Trusted by industry leaders
          </p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-70 grayscale">
             {/* Text placeholders for now since we don't have SVGs */}
             {["TATA", "Crompton", "Ledvance", "Orient", "HPCL", "UPL"].map((client, i) => (
               <span key={i} className="text-2xl font-display font-medium tracking-wide">
                 {client}
               </span>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
}
