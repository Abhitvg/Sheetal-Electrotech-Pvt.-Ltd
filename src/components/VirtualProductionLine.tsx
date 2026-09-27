"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const stages = [
  {
    id: "raw-material",
    title: "RAW MATERIAL",
    subtitle: "Precision Engineering Plastics",
    desc: "We source high-grade polycarbonate, ABS, and specialized engineering plastics, meticulously inspected before entering the production floor.",
    img: "/images/packaging_factory.jpg", // Placeholder until specific raw material img
    metrics: ["100% Virgin Grade", "Moisture Controlled"],
  },
  {
    id: "moulding",
    title: "INJECTION MOULDING",
    subtitle: "1.2M Units Monthly Capacity",
    desc: "18+ advanced injection moulding machines forming precise optical diffusers and thermally conductive housings.",
    img: "/images/moulding_factory.jpg",
    metrics: ["18+ Machines", "Automated Ejection"],
  },
  {
    id: "smt",
    title: "SMT & ELECTRONICS",
    subtitle: "Automated Component Placement",
    desc: "High-speed Fuji & Panasonic SMT lines placing microscopic LED chips and driver components with micron-level accuracy.",
    img: "/images/hero_factory.jpg",
    metrics: ["High-speed Pick & Place", "AOI Inspection"],
  },
  {
    id: "assembly",
    title: "ASSEMBLY",
    subtitle: "Semi-Automated Lines",
    desc: "Skilled technicians and automated jigs combine components into finished products along continuous assembly tracks.",
    img: "/images/img_3.jpg",
    metrics: ["Lean Manufacturing", "Anti-static Environment"],
  },
  {
    id: "testing",
    title: "QUALITY TESTING",
    subtitle: "Rigorous End-of-line QC",
    desc: "Every unit undergoes automated aging, thermal cycling, and photometric testing to ensure 100% compliance with BIS standards.",
    img: "/images/testing_lab.jpg", // We have testing_lab_xxx in brain but let's use a generic or missing one for now, or use one we have.
    metrics: ["Thermal Testing", "Lumen Verification"],
  },
  {
    id: "packaging",
    title: "PACKAGING",
    subtitle: "Ready for Retail",
    desc: "Automated blister packing and carton sealing, barcoded and palletized for immediate global distribution.",
    img: "/images/products_packaging.jpg", // Assuming similar path
    metrics: ["Automated Sealing", "Global Logistics"],
  }
];

export default function VirtualProductionLine() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !scrollWrapperRef.current) return;

    // We have N stages, so we want to translate -(N-1) * 100vw
    const totalMove = -(stages.length - 1) * 100;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${stages.length * 100}vh`, // Scroll distance proportional to number of slides
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      }
    });

    tl.to(scrollWrapperRef.current, {
      xPercent: totalMove,
      ease: "none",
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-ink text-paper overflow-hidden">
      
      {/* Background ambient text */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 opacity-[0.03] pointer-events-none whitespace-nowrap z-0">
        <h2 className="text-[20vw] font-display font-bold">MANUFACTURING</h2>
      </div>

      <div className="absolute top-8 left-8 md:top-16 md:left-16 z-20">
        <p className="font-mono text-accent text-sm uppercase tracking-widest flex items-center gap-4">
          <span className="w-8 h-[1px] bg-accent"></span>
          Virtual Production Line
        </p>
      </div>

      <div 
        ref={scrollWrapperRef} 
        className="flex w-[600vw] h-full relative z-10"
        style={{ width: `${stages.length * 100}vw` }}
      >
        {stages.map((stage, i) => (
          <div key={stage.id} className="w-[100vw] h-full flex items-center justify-center p-8 md:p-24 relative">
            
            {/* Progress indicator */}
            <div className="absolute bottom-8 left-8 md:bottom-16 md:left-16 font-mono text-steel">
              <span className="text-white text-xl">0{i + 1}</span> / 0{stages.length}
            </div>
            
            {/* Connection Line to Next Stage */}
            {i !== stages.length - 1 && (
              <div className="absolute top-1/2 right-0 w-32 md:w-48 h-[1px] bg-steel/30 translate-x-1/2 z-0">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent"></div>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-12 md:gap-24 w-full max-w-7xl items-center">
              
              {/* Text Content */}
              <div className="flex flex-col relative z-10">
                <h3 className="text-4xl md:text-6xl font-display font-bold mb-4">{stage.title}</h3>
                <h4 className="text-xl md:text-2xl text-accent mb-6 font-medium">{stage.subtitle}</h4>
                <p className="text-steel text-lg mb-12 max-w-md leading-relaxed">
                  {stage.desc}
                </p>
                
                <div className="flex gap-8 border-t border-white/10 pt-8">
                  {stage.metrics.map((metric, idx) => (
                    <div key={idx} className="flex flex-col gap-2">
                      <div className="w-2 h-2 bg-accent rounded-full mb-1"></div>
                      <span className="font-mono text-sm text-steel uppercase">{metric}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image Content */}
              <div className="relative h-[40vh] md:h-[60vh] w-full group">
                <div className="absolute inset-0 border border-white/10 translate-x-4 translate-y-4 transition-transform group-hover:translate-x-6 group-hover:translate-y-6 z-0"></div>
                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm z-10">
                   {/* In real implementation, these would be valid image paths. 
                       We are reusing existing ones for the blueprint layout. */}
                   <Image 
                     src={stage.img}
                     alt={stage.title}
                     fill
                     className="object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal hover:opacity-100 transition-all duration-700"
                   />
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
