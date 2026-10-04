"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import { ProceduralBulb } from "./ProceduralBulb";

export default function HeroExplosionSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tl, setTl] = useState<gsap.core.Timeline | null>(null);

  // Text References
  const text0Ref = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const text4Ref = useRef<HTMLDivElement>(null);
  const text5Ref = useRef<HTMLDivElement>(null);
  const text6Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Timeline duration is 7 steps
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=5000", // 500vh scroll duration for a smooth experience
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      }
    });

    // Step 0: Initial Hero Text
    timeline.to(text0Ref.current, { opacity: 0, y: -50, duration: 0.5 }, 0.5);
    
    // Step 1: Optical Design
    timeline.fromTo(text1Ref.current, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.5 }, 1);
    timeline.to(text1Ref.current, { opacity: 0, x: -50, duration: 0.5 }, 1.8);
    
    // Step 2: Electronics
    timeline.fromTo(text2Ref.current, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.5 }, 2);
    timeline.to(text2Ref.current, { opacity: 0, x: -50, duration: 0.5 }, 2.8);
    
    // Step 3: Thermal Management
    timeline.fromTo(text3Ref.current, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.5 }, 3);
    timeline.to(text3Ref.current, { opacity: 0, x: -50, duration: 0.5 }, 3.8);
    
    // Step 4: Power Electronics
    timeline.fromTo(text4Ref.current, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.5 }, 4);
    timeline.to(text4Ref.current, { opacity: 0, x: -50, duration: 0.5 }, 4.8);
    
    // Step 5: Plastic Engineering
    timeline.fromTo(text5Ref.current, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.5 }, 5);
    timeline.to(text5Ref.current, { opacity: 0, x: -50, duration: 0.5 }, 5.8);
    
    // Step 6: Final Message
    timeline.fromTo(text6Ref.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.5 }, 6);

    setTl(timeline);

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-paper overflow-hidden text-ink">
      
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }} shadows>
          <ambientLight intensity={0.6} />
          {/* Main Key Light */}
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={1.2} 
            castShadow 
            shadow-mapSize={[2048, 2048]}
          />
          {/* Cool Fill Light */}
          <directionalLight position={[-10, -10, -5]} intensity={0.8} color="#3b82f6" />
          {/* Dramatic Rim Light */}
          <spotLight 
            position={[0, 10, -10]} 
            intensity={2} 
            angle={0.6} 
            penumbra={1} 
            color="#ffffff" 
          />
          
          <ProceduralBulb timeline={tl} />
          
          <Environment preset="studio" />
          <ContactShadows position={[0, -4.5, 0]} opacity={0.5} scale={20} blur={2.5} far={8} resolution={256} color="#0f172a" />
        </Canvas>
      </div>

      {/* HTML Narrative Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-center container-wide w-full h-full">
        
        {/* Step 0: Hero */}
        <div ref={text0Ref} className="absolute inset-0 flex flex-col justify-end md:justify-center pb-32 md:pb-0 md:pl-24 pl-8 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.1] mb-6 text-ink">
            SOLVING COMPLEX<br />
            <span className="text-accent">MANUFACTURING CHALLENGES.</span>
          </h1>
          <p className="text-slate-600 font-mono text-lg md:text-xl mb-12">
            From product design to mass production — under one roof.
          </p>
          <div className="flex items-center gap-3 text-slate-500 text-xs font-mono uppercase">
            <span className="w-12 h-[1px] bg-slate-500"></span>
            Scroll to Explore
          </div>
        </div>

        {/* Step 1: Optical Design */}
        <div ref={text1Ref} className="absolute inset-0 flex flex-col justify-end md:justify-center pb-32 md:pb-0 md:pl-24 pl-8 max-w-2xl opacity-0">
          <p className="font-mono text-accent text-sm uppercase tracking-widest mb-2">01 / Diffuser</p>
          <h2 className="text-5xl md:text-7xl font-display font-bold text-ink">
            OPTICAL DESIGN
          </h2>
        </div>

        {/* Step 2: Electronics */}
        <div ref={text2Ref} className="absolute inset-0 flex flex-col justify-end md:justify-center pb-32 md:pb-0 md:pl-24 pl-8 max-w-2xl opacity-0">
          <p className="font-mono text-accent text-sm uppercase tracking-widest mb-2">02 / LED PCB</p>
          <h2 className="text-5xl md:text-7xl font-display font-bold text-ink">
            ELECTRONICS
          </h2>
        </div>

        {/* Step 3: Thermal Management */}
        <div ref={text3Ref} className="absolute inset-0 flex flex-col justify-end md:justify-center pb-32 md:pb-0 md:pl-24 pl-8 max-w-2xl opacity-0">
          <p className="font-mono text-accent text-sm uppercase tracking-widest mb-2">03 / Heat Sink</p>
          <h2 className="text-5xl md:text-7xl font-display font-bold text-ink">
            THERMAL MANAGEMENT
          </h2>
        </div>

        {/* Step 4: Power Electronics */}
        <div ref={text4Ref} className="absolute inset-0 flex flex-col justify-end md:justify-center pb-32 md:pb-0 md:pl-24 pl-8 max-w-2xl opacity-0">
          <p className="font-mono text-accent text-sm uppercase tracking-widest mb-2">04 / Driver</p>
          <h2 className="text-5xl md:text-7xl font-display font-bold text-ink">
            POWER ELECTRONICS
          </h2>
        </div>

        {/* Step 5: Plastic Engineering */}
        <div ref={text5Ref} className="absolute inset-0 flex flex-col justify-end md:justify-center pb-32 md:pb-0 md:pl-24 pl-8 max-w-2xl opacity-0">
          <p className="font-mono text-accent text-sm uppercase tracking-widest mb-2">05 / Housing</p>
          <h2 className="text-5xl md:text-7xl font-display font-bold text-ink">
            PLASTIC ENGINEERING
          </h2>
        </div>

        {/* Step 6: Final Message */}
        <div ref={text6Ref} className="absolute inset-0 flex flex-col justify-center items-center text-center opacity-0 bg-paper/80 backdrop-blur-sm">
          <h2 className="text-5xl md:text-7xl font-display font-bold text-ink mb-6">
            WE DON'T JUST ASSEMBLE.<br />
            <span className="text-accent">WE MANUFACTURE.</span>
          </h2>
          <p className="text-slate-600 font-mono text-lg uppercase tracking-widest">
            Plastic → SMT → Assembly
          </p>
        </div>

      </div>
    </section>
  );
}
