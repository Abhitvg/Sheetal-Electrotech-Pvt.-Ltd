"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Factory, Settings2, ShieldCheck, Box } from "lucide-react";
import QuoteCalculator from "@/components/QuoteCalculator";
import CapabilitiesScroller from "@/components/CapabilitiesScroller";
import ExplodedBulb3D from "@/components/ExplodedBulb3D";

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[90vh] min-h-[600px] flex items-end pb-24 pt-32">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-paper/60 backdrop-blur-sm z-10" /> {/* Glass overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-paper via-transparent to-transparent z-10" />
          <Image
            src="/images/hero_factory.jpg"
            alt="Advanced SMT Assembly Line at Sheetal Electrotech"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Content Container */}
        <div className="container-wide relative z-20 w-full text-paper">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-accent uppercase tracking-widest font-mono text-sm mb-6 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-accent inline-block"></span>
                OEM Manufacturing Partner
              </p>
              
              <h1 className="mb-8 font-display text-5xl md:text-7xl lg:text-8xl font-medium leading-[1.05] text-gradient">
                Solving Complex Manufacturing Challenges.
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-6 mb-16"
            >
              <button className="bg-accent text-ink px-8 py-4 font-medium flex items-center justify-between gap-4 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:bg-blue-500 transition-all w-max group rounded-full">
                Request a Quote
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="glass px-8 py-4 font-medium hover:bg-slate-100 transition-colors w-max rounded-full text-ink">
                Explore Facilities
              </button>
            </motion.div>
          </div>

          {/* Dimension-line Stat Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 border-t border-slate-200 pt-8"
          >
            <div className="flex flex-col gap-2 glass-card p-6 rounded-2xl">
              <span className="text-3xl md:text-4xl font-display font-medium text-ink">9</span>
              <span className="text-sm font-mono text-steel uppercase">In-house Facilities</span>
            </div>
            <div className="flex flex-col gap-2 glass-card p-6 rounded-2xl">
              <span className="text-3xl md:text-4xl font-display font-medium text-ink">100K</span>
              <span className="text-sm font-mono text-steel uppercase">Units / Day</span>
            </div>
            <div className="flex flex-col gap-2 glass-card p-6 rounded-2xl">
              <span className="text-3xl md:text-4xl font-display font-medium text-ink">18+</span>
              <span className="text-sm font-mono text-steel uppercase">Moulding Machines</span>
            </div>
            <div className="flex flex-col gap-2 glass-card p-6 rounded-2xl">
              <span className="text-3xl md:text-4xl font-display font-medium text-ink">25+</span>
              <span className="text-sm font-mono text-steel uppercase">Years Experience</span>
            </div>
          </motion.div>
        </div>
      </section>

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

      {/* 2.1 3D PRODUCT EXPLOSION */}
      <ExplodedBulb3D />

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
