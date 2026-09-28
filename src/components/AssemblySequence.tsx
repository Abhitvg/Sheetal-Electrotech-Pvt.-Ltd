"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEngineeringMode } from "./EngineeringModeProvider";

gsap.registerPlugin(ScrollTrigger);

function ConveyorBulb({ position, delay }: { position: [number, number, number], delay: number }) {
  const { isEngineeringMode } = useEngineeringMode();
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!group.current) return;
    // Simple conveyor movement
    const t = state.clock.getElapsedTime() + delay;
    group.current.position.z = (t * 2) % 20 - 10;
  });

  return (
    <group ref={group} position={position} scale={0.6}>
      {/* Diffuser */}
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[1, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshPhysicalMaterial 
          color={isEngineeringMode ? "#60a5fa" : "#ffffff"} 
          transmission={isEngineeringMode ? 0 : 0.95} 
          opacity={isEngineeringMode ? 0.3 : 1} 
          metalness={0} roughness={0.25} ior={1.5} thickness={0.5} clearcoat={1} wireframe={isEngineeringMode} 
        />
      </mesh>
      {/* PCB */}
      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.92, 0.92, 0.05, 32]} />
        <meshStandardMaterial color={isEngineeringMode ? "#facc15" : "#ffffff"} wireframe={isEngineeringMode} />
      </mesh>
      {/* Heatsink Body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.95, 0.55, 2, 32]} />
        <meshStandardMaterial color={isEngineeringMode ? "#3b82f6" : "#f1f5f9"} roughness={0.2} wireframe={isEngineeringMode} />
      </mesh>
      {/* Heatsink Fins */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={`fin-${i}`} position={[0, 0.4 - i * 0.15, 0]}>
          <cylinderGeometry args={[0.9, 0.85, 0.05, 16]} />
          <meshStandardMaterial color={isEngineeringMode ? "#3b82f6" : "#e2e8f0"} metalness={isEngineeringMode ? 0 : 0.9} roughness={0.4} wireframe={isEngineeringMode} />
        </mesh>
      ))}
      {/* Base */}
      <mesh position={[0, -1.2, 0]}>
        <cylinderGeometry args={[0.5, 0.45, 0.6, 16]} />
        <meshStandardMaterial color={isEngineeringMode ? "#1d4ed8" : "#cbd5e1"} metalness={isEngineeringMode ? 0 : 1} roughness={0.3} wireframe={isEngineeringMode} />
      </mesh>
    </group>
  );
}

function AssemblySimulation({ timeline }: { timeline: gsap.core.Timeline | null }) {
  const group = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!timeline || !group.current) return;

    // We can animate the whole group (e.g. zooming in or out) during the sequence
    gsap.set(group.current.position, { x: 0, y: -2, z: -5 });
    
    // Zoom in slowly over the entire timeline
    timeline.to(group.current.position, { z: 5, duration: 6, ease: "none" }, 0);

  }, [timeline]);

  // Create dozens of bulbs for the conveyor belt
  const bulbs = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    x: (i % 4) * 2 - 3,
    y: 0,
    z: 0,
    delay: i * 0.5,
  }));

  return (
    <group ref={group}>
      {/* Conveyor Belt Plane */}
      <mesh position={[0, -1.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 40]} />
        <meshStandardMaterial color="#0f172a" roughness={0.9} />
      </mesh>
      
      {bulbs.map((b) => (
        <ConveyorBulb key={b.id} position={[b.x, b.y, b.z]} delay={b.delay} />
      ))}
    </group>
  );
}

export default function AssemblySequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tl, setTl] = useState<gsap.core.Timeline | null>(null);
  
  // HTML references
  const stepRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    "COMPONENTS",
    "ASSEMBLY",
    "AGING",
    "320V TEST",
    "PACKAGING",
    "SHIPMENT",
    "100,000+ UNITS / DAY"
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=6000", // 600vh for 6 steps
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          // Calculate current step based on progress
          const progress = self.progress;
          const index = Math.min(Math.floor(progress * steps.length), steps.length - 1);
          setCurrentStep(index);
        }
      }
    });

    setTl(timeline);

    return () => {
      timeline.kill();
    };
  }, [steps.length]);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-paper overflow-hidden text-ink">
      
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 4, 15], fov: 45 }} shadows>
          <ambientLight intensity={0.4} />
          {/* Main overhead lighting for assembly line */}
          <directionalLight position={[10, 20, 5]} intensity={1.5} castShadow shadow-mapSize={[2048, 2048]} />
          {/* Warm industrial fill */}
          <spotLight position={[-15, 5, -5]} intensity={1} angle={0.8} penumbra={1} color="#facc15" />
          
          <AssemblySimulation timeline={tl} />
          
          <Environment preset="studio" />
        </Canvas>
      </div>

      {/* HTML Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center text-center">
        <div ref={stepRef} className={`absolute inset-0 flex flex-col justify-start pt-32 md:justify-center items-center transition-all duration-300 ${currentStep === steps.length - 1 ? 'bg-ink/90 backdrop-blur-md justify-center pt-0' : 'bg-transparent'}`}>
          <p className={`font-mono text-sm uppercase tracking-widest mb-4 ${currentStep === steps.length - 1 ? 'text-accent' : 'text-accent'}`}>
            03 / Final Assembly
          </p>
          <h2 className={`text-5xl md:text-8xl font-display font-bold transition-colors duration-500 ${currentStep === steps.length - 1 ? 'text-white' : 'text-ink'}`}>
            {steps[currentStep]}
          </h2>
          {currentStep === steps.length - 1 && (
            <p className="mt-6 text-steel font-mono uppercase tracking-widest text-lg">
              Fully Automated Lines. Zero Defects.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
