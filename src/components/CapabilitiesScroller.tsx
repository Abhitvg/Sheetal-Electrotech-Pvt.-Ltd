"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const facilities = [
  {
    id: "moulding",
    title: "Plastic Injection Moulding",
    description: "Our state-of-the-art moulding facility handles materials like PP, ABS, PET, and PC with machines ranging from 80 to 160 Tons. We deliver high-precision components with cost-effective efficiency.",
    stats: {
      capacity: "1.2M",
      label: "Pieces / Month",
      machine: "80-160T",
    },
    image: "/images/moulding_factory.jpg",
  },
  {
    id: "smt",
    title: "SMT Section & Auto Insertion",
    description: "Equipped with advanced Yamaha and Hanwha pick-and-place machines, our SMT lines handle everything from basic resistors to complex MOSFETs and LEDs at incredible speeds.",
    stats: {
      capacity: "170K",
      label: "CPH Speed",
      machine: "6-Zone Reflow",
    },
    image: "/images/hero_factory.jpg",
  },
  {
    id: "packaging",
    title: "Assembly & Packaging",
    description: "A fully systematic conveyor system integrated with high-voltage aging machines. We ensure every unit is rigorously tested before being carefully packed for export.",
    stats: {
      capacity: "100K",
      label: "Units / Day",
      machine: "320V Testing",
    },
    image: "/images/testing_lab.jpg",
  },
];

export default function CapabilitiesScroller() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={containerRef} className="relative bg-mist text-ink" style={{ height: "300vh" }}>
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        <div className="container-wide w-full h-full flex flex-col md:flex-row items-center py-24 gap-16">
          
          {/* Left Text Content - Changes based on scroll */}
          <div className="w-full md:w-1/2 relative h-[70vh] flex flex-col justify-center">
            {facilities.map((facility, index) => {
              // Calculate opacity for each text block based on scroll progress
              const step = 1 / facilities.length;
              const start = index * step;
              const end = (index + 1) * step;
              
              const opacity = useTransform(
                scrollYProgress,
                [start, start + step * 0.2, end - step * 0.2, end],
                [0, 1, 1, 0]
              );
              
              const y = useTransform(
                scrollYProgress,
                [start, start + step * 0.2, end - step * 0.2, end],
                [40, 0, 0, -40]
              );

              return (
                <motion.div
                  key={facility.id}
                  style={{ opacity, y, pointerEvents: "none" }}
                  className="absolute inset-0 flex flex-col justify-center"
                >
                  <p className="font-mono text-accent text-sm uppercase tracking-widest mb-4">
                    0{index + 1} — {facility.title.split(' ')[0]}
                  </p>
                  <h2 className="text-4xl md:text-6xl font-display font-medium mb-6 leading-tight text-white">
                    {facility.title}
                  </h2>
                  <p className="text-white/60 text-lg mb-8 max-w-md">
                    {facility.description}
                  </p>
                  
                  <div className="flex gap-12 border-t border-white/10 pt-8">
                    <div>
                      <p className="text-3xl font-display text-white mb-1">{facility.stats.capacity}</p>
                      <p className="text-xs font-mono text-white/40 uppercase">{facility.stats.label}</p>
                    </div>
                    <div>
                      <p className="text-3xl font-display text-white mb-1">{facility.stats.machine}</p>
                      <p className="text-xs font-mono text-white/40 uppercase">Spec</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Image Content - Transitions based on scroll */}
          <div className="w-full md:w-1/2 h-[60vh] relative">
            {facilities.map((facility, index) => {
              const step = 1 / facilities.length;
              const start = index * step;
              const end = (index + 1) * step;
              
              const opacity = useTransform(
                scrollYProgress,
                [start, start + step * 0.1, end - step * 0.1, end],
                [0, 1, 1, 0]
              );
              
              const scale = useTransform(
                scrollYProgress,
                [start, end],
                [1.1, 1]
              );

              return (
                <motion.div
                  key={facility.id}
                  style={{ opacity }}
                  className="absolute inset-0 overflow-hidden"
                >
                  <motion.div style={{ scale }} className="w-full h-full relative">
                    <div className="absolute inset-0 bg-paper/20 z-10" />
                    <Image
                      src={facility.image}
                      alt={facility.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </motion.div>
                </motion.div>
              );
            })}
            
            {/* View Facility Button overlay */}
            <div className="absolute bottom-6 right-6 z-20">
               <button className="bg-paper text-ink p-4 hover:bg-accent hover:text-white transition-colors flex items-center gap-3 font-medium">
                 View Facility Details
                 <ArrowRight className="w-4 h-4" />
               </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
