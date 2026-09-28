"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Environment, Float, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEngineeringMode } from "./EngineeringModeProvider";

gsap.registerPlugin(ScrollTrigger);

function MouldSimulation({ timeline }: { timeline: gsap.core.Timeline | null }) {
  const { isEngineeringMode } = useEngineeringMode();
  const { viewport } = useThree();
  const isMobile = viewport.width < 5;
  
  const topMouldRef = useRef<THREE.Group>(null);
  const bottomMouldRef = useRef<THREE.Group>(null);
  const partRef = useRef<THREE.Group>(null);
  const group = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!timeline || !topMouldRef.current || !bottomMouldRef.current || !partRef.current || !group.current) return;

    // Initial state: mould is closed
    gsap.set(topMouldRef.current.position, { y: 0.8 });
    gsap.set(bottomMouldRef.current.position, { y: -0.8 });
    gsap.set(partRef.current.position, { y: 0 });
    gsap.set(partRef.current.scale, { x: 0, y: 0, z: 0 }); // Part doesn't exist yet
    
    // Position group based on viewport
    const startX = isMobile ? 0 : 2;
    const startY = isMobile ? -1.5 : 0;
    
    gsap.set(group.current.position, { x: startX, y: startY, z: 0 });
    gsap.set(group.current.rotation, { x: 0.5, y: -0.5, z: 0 });

    // 0 -> 1: Scroll starts, mould enters and opens
    timeline.to(topMouldRef.current.position, { y: 2.2, duration: 1, ease: "power2.inOut" }, 0);
    timeline.to(bottomMouldRef.current.position, { y: -2.2, duration: 1, ease: "power2.inOut" }, 0);
    
    // 0.5 -> 1.5: Part appears (moulded) and drops out
    timeline.to(partRef.current.scale, { x: 1, y: 1, z: 1, duration: 0.5, ease: "back.out(1.7)" }, 0.5);
    
    // 1.5 -> 2.5: Part rotates and flies towards the camera/left
    timeline.to(partRef.current.position, { x: -3, y: 1, z: 2, duration: 1, ease: "power2.inOut" }, 1.5);
    timeline.to(partRef.current.rotation, { x: Math.PI, y: Math.PI * 2, duration: 1, ease: "none" }, 1.5);

  }, [timeline, isMobile]);

  const steelMaterial = new THREE.MeshStandardMaterial({
    color: isEngineeringMode ? "#60a5fa" : "#94a3b8",
    metalness: 0.9,
    roughness: 0.2,
    wireframe: isEngineeringMode
  });
  
  const darkSteelMaterial = new THREE.MeshStandardMaterial({
    color: isEngineeringMode ? "#3b82f6" : "#475569",
    metalness: 0.8,
    roughness: 0.3,
    wireframe: isEngineeringMode
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
        
        {/* Top Mould Half (Cavity) */}
        <group ref={topMouldRef} position={[0, 0.8, 0]}>
          {/* Main Block */}
          <mesh material={steelMaterial} position={[0, 0.4, 0]}>
            <boxGeometry args={[4, 1.2, 4]} />
          </mesh>
          {/* Top Clamping Plate */}
          <mesh material={darkSteelMaterial} position={[0, 1.1, 0]}>
            <boxGeometry args={[4.4, 0.2, 4.4]} />
          </mesh>
          {/* Sprue Bushing */}
          <mesh material={darkSteelMaterial} position={[0, 1.25, 0]}>
            <cylinderGeometry args={[0.2, 0.2, 0.2, 16]} />
          </mesh>
          {/* Guide Pins Receptacles (Holes) */}
          {[[-1.6, -1.6], [1.6, -1.6], [-1.6, 1.6], [1.6, 1.6]].map((pos, i) => (
            <mesh key={`hole-${i}`} material={darkSteelMaterial} position={[pos[0], -0.2, pos[1]]}>
              <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
            </mesh>
          ))}
          {/* Cavity Cutout (Visual approximation) */}
          <mesh material={darkSteelMaterial} position={[0, -0.21, 0]}>
            <cylinderGeometry args={[1, 1, 0.05, 32]} />
          </mesh>
        </group>
        
        {/* Bottom Mould Half (Core) */}
        <group ref={bottomMouldRef} position={[0, -0.8, 0]}>
          {/* Main Block */}
          <mesh material={steelMaterial} position={[0, -0.4, 0]}>
            <boxGeometry args={[4, 1.2, 4]} />
          </mesh>
          {/* Bottom Clamping Plate */}
          <mesh material={darkSteelMaterial} position={[0, -1.1, 0]}>
            <boxGeometry args={[4.4, 0.2, 4.4]} />
          </mesh>
          {/* Guide Pins */}
          {[[-1.6, -1.6], [1.6, -1.6], [-1.6, 1.6], [1.6, 1.6]].map((pos, i) => (
            <mesh key={`pin-${i}`} material={steelMaterial} position={[pos[0], 0.6, pos[1]]}>
              <cylinderGeometry args={[0.12, 0.12, 1.6, 16]} />
            </mesh>
          ))}
          {/* Core Feature (matches the part) */}
          <mesh material={darkSteelMaterial} position={[0, 0.2, 0]}>
            <sphereGeometry args={[0.95, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
          </mesh>
        </group>

        {/* The Injection Moulded Part (Diffuser) */}
        <group ref={partRef}>
          <mesh position={[0, 0.1, 0]}>
            <sphereGeometry args={[1, 64, 64, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshPhysicalMaterial 
              color={isEngineeringMode ? "#facc15" : "#ffffff"} 
              transmission={isEngineeringMode ? 0 : 0.95} 
              opacity={isEngineeringMode ? 0.3 : 1} 
              roughness={isEngineeringMode ? 0 : 0.2} 
              ior={1.5} 
              thickness={0.5} 
              clearcoat={1}
              wireframe={isEngineeringMode}
            />
          </mesh>
          {/* Part Lip/Flange */}
          <mesh position={[0, 0.05, 0]}>
            <cylinderGeometry args={[1.05, 1.05, 0.1, 64]} />
            <meshPhysicalMaterial 
              color={isEngineeringMode ? "#facc15" : "#ffffff"} 
              transmission={isEngineeringMode ? 0 : 0.95}
              roughness={0.2}
              wireframe={isEngineeringMode}
            />
          </mesh>
        </group>

      </Float>
    </group>
  );
}

export default function PlasticEngineering() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tl, setTl] = useState<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=1500", // 150vh scroll duration
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      }
    });

    setTl(timeline);

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-paper overflow-hidden text-ink flex flex-col md:flex-row">
      
      {/* 3D Canvas Overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }} shadows>
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow shadow-mapSize={[2048, 2048]} />
          <spotLight position={[-5, 5, -5]} intensity={2} angle={0.5} penumbra={1} color="#3b82f6" />
          <spotLight position={[5, -5, 5]} intensity={1} angle={0.5} penumbra={1} color="#facc15" />
          <ProceduralBulbWrapper timeline={tl} />
        </Canvas>
      </div>

      {/* LEFT: Real Factory Image */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full relative z-0">
        <div className="absolute inset-0 bg-ink/20 mix-blend-overlay z-10" />
        <Image 
          src="/images/moulding_factory.jpg" 
          alt="Plastic Injection Moulding Facility" 
          fill 
          className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
        />
      </div>

      {/* RIGHT: Huge Typography */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-center p-8 md:p-24 relative z-10 bg-paper">
        <p className="font-mono text-accent text-sm uppercase tracking-widest mb-6">
          01 / Plastic Engineering
        </p>
        <h2 className="text-6xl md:text-8xl font-display font-bold leading-[0.9] mb-8">
          80 <span className="text-steel font-light">—</span> 160T
        </h2>
        <div className="w-full h-[1px] bg-steel/30 mb-8"></div>
        <p className="text-3xl md:text-5xl font-mono text-steel uppercase tracking-widest">
          1.2M PIECES / MONTH
        </p>
      </div>

    </section>
  );
}

// Wrapper to isolate 3D components
function ProceduralBulbWrapper({ timeline }: { timeline: gsap.core.Timeline | null }) {
  return (
    <>
      <MouldSimulation timeline={timeline} />
      <Environment preset="studio" />
    </>
  );
}
