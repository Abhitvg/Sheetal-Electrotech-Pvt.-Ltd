"use client";

import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows, Float } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// A procedural, premium-looking 3D bulb built from primitives for the demo.
// (In production, you would swap this with useGLTF("/bulb.glb"))
function ProceduralBulb() {
  const group = useRef<THREE.Group>(null);
  const diffuserRef = useRef<THREE.Mesh>(null);
  const pcbRef = useRef<THREE.Mesh>(null);
  const heatsinkRef = useRef<THREE.Mesh>(null);
  const driverRef = useRef<THREE.Mesh>(null);
  const baseRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (!group.current) return;

    // Set up GSAP ScrollTrigger timeline for the exploded view
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#exploded-section",
        start: "top top",
        end: "+=2000",
        scrub: 1,
        pin: true,
      }
    });

    // 0% -> Complete LED bulb (initial state)
    // 25% -> Diffuser separates
    tl.to(diffuserRef.current!.position, { y: 2.5, duration: 1 }, 0);
    
    // 40% -> LED PCB moves outward
    tl.to(pcbRef.current!.position, { y: 1.2, duration: 1 }, 0.5);
    
    // 55% -> Aluminum heat sink rotates into view
    // Heat sink doesn't move as much, but maybe we rotate the whole bulb?
    tl.to(group.current.rotation, { y: Math.PI * 2, duration: 3, ease: "none" }, 0);
    
    // 70% -> Driver PCB separates
    tl.to(driverRef.current!.position, { y: -1.2, duration: 1 }, 1);
    
    // 85% -> Outer housing/base moves backward
    tl.to(baseRef.current!.position, { y: -2.5, duration: 1 }, 1.5);

    // 100% -> Everything snaps back (we can let GSAP scrub handle the reverse on scroll up, 
    // or add a snap-back at the very end of the timeline if needed).

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <group ref={group} dispose={null} scale={1.5}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        
        {/* Diffuser */}
        <mesh ref={diffuserRef} position={[0, 1.2, 0]}>
          <sphereGeometry args={[1, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshPhysicalMaterial 
            color="#ffffff" 
            transmission={0.9} 
            opacity={1} 
            metalness={0} 
            roughness={0.1} 
            ior={1.5} 
            thickness={0.5} 
          />
        </mesh>

        {/* LED PCB */}
        <mesh ref={pcbRef} position={[0, 1.1, 0]}>
          <cylinderGeometry args={[0.9, 0.9, 0.05, 32]} />
          <meshStandardMaterial color="#fcd34d" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Heat Sink / Housing */}
        <mesh ref={heatsinkRef} position={[0, 0, 0]}>
          <cylinderGeometry args={[0.95, 0.6, 2, 32]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.2} roughness={0.5} />
        </mesh>

        {/* Driver */}
        <mesh ref={driverRef} position={[0, -0.2, 0]}>
          <boxGeometry args={[0.4, 0.8, 0.4]} />
          <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* B22/E27 Base */}
        <mesh ref={baseRef} position={[0, -1.2, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.6, 32]} />
          <meshStandardMaterial color="#94a3b8" metalness={1} roughness={0.3} />
          {/* Base threads/pins abstraction */}
          <mesh position={[0, -0.4, 0]}>
            <cylinderGeometry args={[0.2, 0.4, 0.3, 32]} />
            <meshStandardMaterial color="#0f172a" metalness={0.5} roughness={0.5} />
          </mesh>
        </mesh>

      </Float>
    </group>
  );
}

export default function ExplodedBulb3D() {
  return (
    <section id="exploded-section" className="relative w-full h-screen bg-slate-50 flex items-center justify-center overflow-hidden border-y border-slate-200">
      
      {/* 3D Canvas Layer */}
      <div className="absolute inset-0 z-10 cursor-move">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#0066ff" />
          
          <ProceduralBulb />
          
          <Environment preset="studio" />
          <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={10} blur={2} far={4} />
        </Canvas>
      </div>

      {/* Typography / UI Layer */}
      <div className="relative z-0 w-full h-full flex flex-col justify-between p-8 md:p-16 pointer-events-none">
        <div className="max-w-xl">
          <h2 className="text-5xl md:text-7xl font-display font-medium text-ink tracking-tight mb-4">
            From Component <br /> <span className="text-steel">to Product.</span>
          </h2>
          <p className="text-lg text-steel font-mono">
            SCROLL TO EXPLORE ENGINEERING
          </p>
        </div>
        
        <div className="self-end text-right max-w-xl">
          <h2 className="text-4xl md:text-5xl font-display font-medium text-ink tracking-tight mb-4">
            And we manufacture <br /> <span className="text-accent">every part.</span>
          </h2>
        </div>
      </div>
      
    </section>
  );
}
