"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Float, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEngineeringMode } from "./EngineeringModeProvider";

gsap.registerPlugin(ScrollTrigger);

function PCBSimulation({ timeline }: { timeline: gsap.core.Timeline | null }) {
  const { isEngineeringMode } = useEngineeringMode();
  
  const pcbRef = useRef<THREE.Group>(null);
  const componentRef = useRef<THREE.Group>(null);
  const solderPasteRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!timeline || !pcbRef.current || !componentRef.current || !solderPasteRef.current) return;

    // Initial state: close up on PCB
    gsap.set(pcbRef.current.position, { x: 0, y: 0, z: 4 }); // Very close to camera
    gsap.set(pcbRef.current.rotation, { x: -Math.PI / 4, y: 0, z: 0 });
    
    gsap.set(solderPasteRef.current.scale, { x: 0, y: 0, z: 0 }); // No solder initially
    gsap.set(componentRef.current.position, { y: 2 }); // High above
    gsap.set(componentRef.current.scale, { x: 0, y: 0, z: 0 }); // Hidden

    // 0 -> 1: SOLDER (paste applied)
    timeline.to(solderPasteRef.current.scale, { x: 1, y: 1, z: 1, duration: 0.5 }, 0);
    
    // 1 -> 2: PLACE (component drops)
    timeline.to(componentRef.current.scale, { x: 1, y: 1, z: 1, duration: 0.2 }, 1);
    timeline.to(componentRef.current.position, { y: 0.06, duration: 0.8, ease: "bounce.out" }, 1);
    
    // 2 -> 3: REFLOW (solder melts - turns shiny/metallic)
    timeline.to(solderPasteRef.current.scale, { x: 1.2, y: 0.5, z: 1.2, duration: 1 }, 2);
    
    // 3 -> 4: INSPECT (Camera pans across)
    timeline.to(pcbRef.current.position, { x: -2, duration: 1 }, 3);
    
    // 4 -> 5: ZOOM OUT (becomes part of bulb driver)
    timeline.to(pcbRef.current.position, { x: 0, y: 0, z: -2, duration: 1 }, 4);
    timeline.to(pcbRef.current.rotation, { x: Math.PI / 2, y: 0, z: 0, duration: 1 }, 4);

  }, [timeline]);

  // Procedural SMD components scattered on the board
  const smds = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    x: Math.random() * 3 - 1.5,
    z: Math.random() * 3 - 1.5,
    type: Math.random() > 0.5 ? 'resistor' : 'capacitor',
    rotation: Math.random() > 0.5 ? Math.PI / 2 : 0
  }));

  return (
    <group ref={pcbRef}>
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.1}>
        
        {/* FR4 PCB Board */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[4, 0.1, 4]} />
          <meshStandardMaterial color={isEngineeringMode ? "#1e293b" : "#065f46"} metalness={0.1} roughness={0.9} wireframe={isEngineeringMode} />
        </mesh>
        
        {/* Background Copper Traces (Visual approximation) */}
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh key={`trace-${i}`} position={[-1.5 + i * 0.4, 0.051, 0]}>
            <boxGeometry args={[0.02, 0.01, 3.8]} />
            <meshStandardMaterial color={isEngineeringMode ? "#facc15" : "#10b981"} metalness={0.5} roughness={0.5} />
          </mesh>
        ))}

        {/* Scattered tiny SMDs already placed */}
        {smds.map(smd => (
           <group key={`smd-${smd.id}`} position={[smd.x, 0.06, smd.z]} rotation={[0, smd.rotation, 0]}>
             {/* Solder pads */}
             <mesh position={[0.2, -0.01, 0]}><boxGeometry args={[0.15, 0.01, 0.2]} /><meshStandardMaterial color="#94a3b8" metalness={1} roughness={0.2} /></mesh>
             <mesh position={[-0.2, -0.01, 0]}><boxGeometry args={[0.15, 0.01, 0.2]} /><meshStandardMaterial color="#94a3b8" metalness={1} roughness={0.2} /></mesh>
             {/* Component Body */}
             <mesh position={[0, 0.02, 0]}>
               <boxGeometry args={[0.3, 0.06, 0.15]} />
               <meshStandardMaterial color={smd.type === 'resistor' ? "#1e293b" : "#d97706"} roughness={0.5} />
             </mesh>
             {/* Contacts */}
             <mesh position={[0.15, 0.02, 0]}><boxGeometry args={[0.05, 0.061, 0.151]} /><meshStandardMaterial color="#cbd5e1" metalness={0.8} /></mesh>
             <mesh position={[-0.15, 0.02, 0]}><boxGeometry args={[0.05, 0.061, 0.151]} /><meshStandardMaterial color="#cbd5e1" metalness={0.8} /></mesh>
           </group>
        ))}

        {/* Central Copper Pads for the main IC */}
        <group position={[0, 0.051, 0]}>
          {[-0.3, -0.1, 0.1, 0.3].map((z, i) => (
            <group key={`pad-${i}`}>
              <mesh position={[0.5, 0, z]}>
                <boxGeometry args={[0.3, 0.01, 0.1]} />
                <meshStandardMaterial color={isEngineeringMode ? "#facc15" : "#d97706"} metalness={1} roughness={0.2} wireframe={isEngineeringMode} />
              </mesh>
              <mesh position={[-0.5, 0, z]}>
                <boxGeometry args={[0.3, 0.01, 0.1]} />
                <meshStandardMaterial color={isEngineeringMode ? "#facc15" : "#d97706"} metalness={1} roughness={0.2} wireframe={isEngineeringMode} />
              </mesh>
            </group>
          ))}
        </group>

        {/* Solder Paste for the main IC */}
        <group ref={solderPasteRef} position={[0, 0.055, 0]}>
          {[-0.3, -0.1, 0.1, 0.3].map((z, i) => (
            <group key={`paste-${i}`}>
              <mesh position={[0.5, 0, z]}>
                <boxGeometry args={[0.25, 0.02, 0.08]} />
                <meshStandardMaterial color={isEngineeringMode ? "#94a3b8" : "#94a3b8"} metalness={1} roughness={0.1} wireframe={isEngineeringMode} />
              </mesh>
              <mesh position={[-0.5, 0, z]}>
                <boxGeometry args={[0.25, 0.02, 0.08]} />
                <meshStandardMaterial color={isEngineeringMode ? "#94a3b8" : "#94a3b8"} metalness={1} roughness={0.1} wireframe={isEngineeringMode} />
              </mesh>
            </group>
          ))}
        </group>

        {/* SMT Component (Main IC Microchip SOIC-8 style) */}
        <group ref={componentRef} position={[0, 0, 0]}>
          {/* Black Epoxy Body */}
          <mesh position={[0, 0.1, 0]}>
            <boxGeometry args={[0.8, 0.15, 1.0]} />
            <meshStandardMaterial color={isEngineeringMode ? "#60a5fa" : "#1e293b"} metalness={0.1} roughness={0.8} wireframe={isEngineeringMode} />
          </mesh>
          {/* IC Dot (Pin 1 indicator) */}
          <mesh position={[-0.2, 0.18, -0.3]}>
            <cylinderGeometry args={[0.05, 0.05, 0.01, 16]} />
            <meshStandardMaterial color="#334155" roughness={0.9} />
          </mesh>
          {/* Gull-wing Legs */}
          {[-0.3, -0.1, 0.1, 0.3].map((z, i) => (
            <group key={`leg-${i}`}>
              {/* Right leg */}
              <mesh position={[0.45, 0.05, z]} rotation={[0, 0, -Math.PI/6]}>
                <boxGeometry args={[0.2, 0.02, 0.05]} />
                <meshStandardMaterial color="#94a3b8" metalness={1} roughness={0.2} />
              </mesh>
              {/* Left leg */}
              <mesh position={[-0.45, 0.05, z]} rotation={[0, 0, Math.PI/6]}>
                <boxGeometry args={[0.2, 0.02, 0.05]} />
                <meshStandardMaterial color="#94a3b8" metalness={1} roughness={0.2} />
              </mesh>
            </group>
          ))}
        </group>

      </Float>
    </group>
  );
}

export default function SMTSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tl, setTl] = useState<gsap.core.Timeline | null>(null);
  
  // HTML references
  const step0Ref = useRef<HTMLDivElement>(null);
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  const step4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=4000", // 400vh for 5 steps
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      }
    });

    // Step 0: Initial
    timeline.to(step0Ref.current, { opacity: 0, duration: 0.5 }, 0.5);
    
    // Step 1: Place
    timeline.fromTo(step1Ref.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }, 1);
    timeline.to(step1Ref.current, { opacity: 0, duration: 0.5 }, 1.5);
    
    // Step 2: Reflow
    timeline.fromTo(step2Ref.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }, 2);
    timeline.to(step2Ref.current, { opacity: 0, duration: 0.5 }, 2.5);
    
    // Step 3: Inspect
    timeline.fromTo(step3Ref.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }, 3);
    timeline.to(step3Ref.current, { opacity: 0, duration: 0.5 }, 3.5);
    
    // Step 4: Zoom out
    timeline.fromTo(step4Ref.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }, 4);

    setTl(timeline);

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-ink overflow-hidden text-paper">
      
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }} shadows>
          <ambientLight intensity={0.4} />
          {/* Intense focused key light for macro feeling */}
          <spotLight position={[5, 10, 5]} intensity={2.5} angle={0.4} penumbra={0.5} castShadow shadow-mapSize={[2048, 2048]} />
          {/* Blue rim light for tech aesthetic */}
          <directionalLight position={[-10, -5, -5]} intensity={1.5} color="#3b82f6" />
          
          <PCBSimulation timeline={tl} />
          
          <Environment preset="studio" />
        </Canvas>
      </div>

      {/* HTML Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center text-center">
        
        <div ref={step0Ref} className="absolute inset-0 flex flex-col justify-end md:justify-center items-center pb-32 md:pb-0">
          <p className="font-mono text-accent text-sm uppercase tracking-widest mb-4">02 / Electronics (SMT)</p>
          <h2 className="text-6xl md:text-8xl font-display font-bold">SOLDER</h2>
        </div>

        <div ref={step1Ref} className="absolute inset-0 flex flex-col justify-end md:justify-center items-center pb-32 md:pb-0 opacity-0">
          <p className="font-mono text-accent text-sm uppercase tracking-widest mb-4">02 / Electronics (SMT)</p>
          <h2 className="text-6xl md:text-8xl font-display font-bold">PLACE</h2>
        </div>

        <div ref={step2Ref} className="absolute inset-0 flex flex-col justify-end md:justify-center items-center pb-32 md:pb-0 opacity-0">
          <p className="font-mono text-accent text-sm uppercase tracking-widest mb-4">02 / Electronics (SMT)</p>
          <h2 className="text-6xl md:text-8xl font-display font-bold">REFLOW</h2>
        </div>

        <div ref={step3Ref} className="absolute inset-0 flex flex-col justify-end md:justify-center items-center pb-32 md:pb-0 opacity-0">
          <p className="font-mono text-accent text-sm uppercase tracking-widest mb-4">02 / Electronics (SMT)</p>
          <h2 className="text-6xl md:text-8xl font-display font-bold">INSPECT</h2>
        </div>

        <div ref={step4Ref} className="absolute inset-0 flex flex-col justify-center items-center opacity-0 bg-ink/80 backdrop-blur-sm">
          <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">
            INTEGRATED ELECTRONICS<br />
            <span className="text-accent">MANUFACTURING.</span>
          </h2>
          <p className="text-steel font-mono text-lg uppercase tracking-widest">
            In-House PCB Assembly
          </p>
        </div>

      </div>
    </section>
  );
}
