"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function DarkIndustrialTransition() {
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!textRef.current || !statsRef.current) return;

    // Animate background from white to dark happens via the CSS flow, but we can 
    // fade in the stats as they scroll into view.
    
    gsap.fromTo(textRef.current, 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, scrollTrigger: {
        trigger: textRef.current,
        start: "top 80%",
        end: "top 50%",
        scrub: 1
      }}
    );

    gsap.fromTo(statsRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, scrollTrigger: {
        trigger: statsRef.current,
        start: "top 80%",
        end: "top 60%",
        scrub: 1
      }}
    );
  }, []);

  return (
    <section className="relative w-full py-32 bg-ink text-paper overflow-hidden flex flex-col items-center justify-center min-h-screen">
      
      {/* Background Factory Video/Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/hero_factory.jpg" 
          alt="Factory Environment"
          fill
          className="object-cover opacity-20 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink z-10" />
      </div>

      <div className="container-wide relative z-20 text-center flex flex-col items-center">
        
        <div ref={textRef} className="mb-24">
          <p className="font-mono text-accent text-sm uppercase tracking-widest mb-6">
            The Sheetal Ecosystem
          </p>
          <h2 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-4">
            FROM DESIGN. <br />
            <span className="text-steel">TO MILLION-UNIT PRODUCTION.</span>
          </h2>
        </div>

        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24 w-full max-w-5xl border-t border-white/10 pt-16">
          <div className="flex flex-col items-center gap-2">
            <span className="text-4xl md:text-6xl font-display font-medium text-white">30,000+</span>
            <span className="text-sm font-mono text-steel uppercase tracking-widest">SQ. FT. AREA</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-4xl md:text-6xl font-display font-medium text-white">9</span>
            <span className="text-sm font-mono text-steel uppercase tracking-widest">PRODUCTION FACILITIES</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-4xl md:text-6xl font-display font-medium text-white">25+</span>
            <span className="text-sm font-mono text-steel uppercase tracking-widest">YEARS OF EXCELLENCE</span>
          </div>
        </div>
      </div>

    </section>
  );
}
