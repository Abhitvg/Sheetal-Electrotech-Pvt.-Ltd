"use client";

import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows, Float } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEngineeringMode } from "./EngineeringModeProvider";

gsap.registerPlugin(ScrollTrigger);

function ProceduralStreetLight() {
  const group = useRef<THREE.Group>(null);
  const { isEngineeringMode } = useEngineeringMode();
  const wireframe = isEngineeringMode;

  // Parts refs for animation
  const lensRef = useRef<THREE.Mesh>(null);
  const ledBoardRef = useRef<THREE.Group>(null);
  const driverRef = useRef<THREE.Mesh>(null);
  const heatSinkRef = useRef<THREE.Group>(null);
  const bracketRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (!group.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#street-light-explosion",
        start: "top top",
        end: "+=2000",
        scrub: 1,
        pin: true,
      }
    });

    // Animate individual components apart
    // Initial State: Combined
    // We animate them down and away to explode the layers

    // 1. Lens drops down
    tl.to(lensRef.current!.position, { y: -2.5, duration: 1 }, 0);
    
    // 2. LED Board drops slightly less
    tl.to(ledBoardRef.current!.position, { y: -1.2, duration: 1 }, 0.2);
    
    // 3. Driver block lifts up and back
    tl.to(driverRef.current!.position, { y: 1.5, z: -1, duration: 1 }, 0.4);
    
    // 4. Bracket slides out the back
    tl.to(bracketRef.current!.position, { z: -3, duration: 1 }, 0.6);

    // Slowly rotate the entire assembly during the scroll to show off the exploded view
    tl.to(group.current.rotation, { x: 0.5, y: Math.PI, duration: 2, ease: "none" }, 0);

    return () => {
      tl.kill();
    };
  }, []);

  const mainColor = isEngineeringMode ? "#60a5fa" : "#e2e8f0";
  const accentColor = isEngineeringMode ? "#facc15" : "#1e293b";

  return (
    <group ref={group} dispose={null} scale={1.2}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
        
        {/* LENS (Bottom cover - curved toughened glass) */}
        <mesh ref={lensRef} position={[0, -0.4, 0]}>
          <boxGeometry args={[2.8, 0.1, 4.8]} />
          {/* We add a curved inner bubble to the glass */}
          <mesh position={[0, 0.05, 0]} rotation={[Math.PI, 0, 0]}>
            <sphereGeometry args={[1.3, 32, 32, 0, Math.PI, 0, Math.PI]} />
            <meshPhysicalMaterial color={isEngineeringMode ? "#60a5fa" : "#ffffff"} transmission={wireframe ? 0 : 0.9} opacity={0.5} roughness={0.1} wireframe={wireframe} />
          </mesh>
          <meshPhysicalMaterial 
            color={isEngineeringMode ? "#60a5fa" : "#ffffff"} 
            transmission={wireframe ? 0 : 0.95} 
            opacity={wireframe ? 0.3 : 1} 
            ior={1.5} 
            thickness={0.5} 
            roughness={0.05}
            clearcoat={1}
            wireframe={wireframe} 
          />
        </mesh>

        {/* LED BOARD & CHIPS */}
        <group ref={ledBoardRef} position={[0, -0.2, 0]}>
          {/* Metal Core PCB */}
          <mesh>
            <boxGeometry args={[2.6, 0.05, 4.6]} />
            <meshStandardMaterial color={isEngineeringMode ? "#facc15" : "#ffffff"} metalness={0.8} roughness={0.2} wireframe={wireframe} />
          </mesh>
          {/* Reflective Cups for LEDs */}
          {Array.from({ length: 6 }).map((_, row) => 
            Array.from({ length: 4 }).map((_, col) => (
              <group key={`chip-${row}-${col}`} position={[-0.9 + col * 0.6, -0.05, -1.5 + row * 0.6]}>
                {/* Yellow Phosphor LED Chip */}
                <mesh position={[0, 0, 0]}>
                  <boxGeometry args={[0.2, 0.02, 0.2]} />
                  <meshStandardMaterial color={isEngineeringMode ? "#ffffff" : "#fbbf24"} emissive={isEngineeringMode ? "#000" : "#fef3c7"} emissiveIntensity={0.5} wireframe={wireframe} />
                </mesh>
                {/* Silver Reflector Ring */}
                <mesh position={[0, 0.02, 0]} rotation={[Math.PI/2, 0, 0]}>
                  <torusGeometry args={[0.15, 0.05, 16, 32]} />
                  <meshStandardMaterial color={isEngineeringMode ? mainColor : "#cbd5e1"} metalness={1} roughness={0.1} wireframe={wireframe} />
                </mesh>
              </group>
            ))
          )}
        </group>

        {/* HEATSINK & MAIN HOUSING (Middle) */}
        <group ref={heatSinkRef} position={[0, 0, 0]}>
          {/* Main Die-Cast Block with chamfered look */}
          <mesh>
            <boxGeometry args={[3, 0.4, 5]} />
            <meshStandardMaterial color={mainColor} metalness={0.8} roughness={0.2} wireframe={wireframe} />
          </mesh>
          {/* Heavy Cooling Fins (Top) */}
          {Array.from({ length: 12 }).map((_, i) => (
            <mesh key={`hs-fin-${i}`} position={[-1.35 + i * 0.245, 0.4, 0]}>
              <boxGeometry args={[0.08, 0.6, 4.8]} />
              <meshStandardMaterial color={mainColor} metalness={0.8} roughness={0.2} wireframe={wireframe} />
            </mesh>
          ))}
          {/* Side Bezels */}
          <mesh position={[1.55, 0.2, 0]}>
             <boxGeometry args={[0.1, 0.8, 5]} />
             <meshStandardMaterial color={mainColor} metalness={0.8} roughness={0.2} wireframe={wireframe} />
          </mesh>
          <mesh position={[-1.55, 0.2, 0]}>
             <boxGeometry args={[0.1, 0.8, 5]} />
             <meshStandardMaterial color={mainColor} metalness={0.8} roughness={0.2} wireframe={wireframe} />
          </mesh>
        </group>

        {/* LED DRIVER (Inside / Top cavity) */}
        <group ref={driverRef} position={[0, 0.2, -1.5]}>
          {/* Driver Metal Enclosure */}
          <mesh>
            <boxGeometry args={[1.6, 0.35, 1.2]} />
            <meshStandardMaterial color={accentColor} metalness={0.9} roughness={0.3} wireframe={wireframe} />
          </mesh>
          {/* Wiring block / connector */}
          <mesh position={[0, 0, -0.65]}>
            <boxGeometry args={[0.6, 0.2, 0.2]} />
            <meshStandardMaterial color={isEngineeringMode ? mainColor : "#0f172a"} roughness={0.8} wireframe={wireframe} />
          </mesh>
        </group>

        {/* MOUNTING BRACKET (Back) */}
        <group ref={bracketRef} position={[0, 0, -3.2]} rotation={[Math.PI / 2, 0, 0]}>
          {/* Pipe receiver */}
          <mesh>
            <cylinderGeometry args={[0.35, 0.35, 1.5, 32]} />
            <meshStandardMaterial color={isEngineeringMode ? mainColor : "#64748b"} metalness={0.9} roughness={0.3} wireframe={wireframe} />
          </mesh>
          {/* Mounting bolts */}
          {[-0.4, 0, 0.4].map(y => (
            <mesh key={`bolt-${y}`} position={[0, y, 0.3]} rotation={[Math.PI/2, 0, 0]}>
              <cylinderGeometry args={[0.08, 0.08, 0.2, 16]} />
              <meshStandardMaterial color={isEngineeringMode ? mainColor : "#f8fafc"} metalness={1} roughness={0.2} wireframe={wireframe} />
            </mesh>
          ))}
        </group>

      </Float>
    </group>
  );
}

export default function StreetLightExplosionSequence() {
  const { isEngineeringMode } = useEngineeringMode();

  return (
    <section id="street-light-explosion" className={`relative w-full h-screen flex items-center justify-center overflow-hidden border-y transition-colors duration-500 ${isEngineeringMode ? 'bg-transparent border-steel/50' : 'bg-slate-50 border-slate-200'}`}>
      
      {/* 3D Canvas Layer */}
      <div className="absolute inset-0 z-10 cursor-move">
        <Canvas camera={{ position: [5, 3, 7], fov: 45 }}>
          <ambientLight intensity={isEngineeringMode ? 1.5 : 0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} color={isEngineeringMode ? "#60a5fa" : "#0066ff"} />
          
          <ProceduralStreetLight />
          
          {!isEngineeringMode && <Environment preset="city" />}
          {!isEngineeringMode && <ContactShadows position={[0, -4, 0]} opacity={0.5} scale={15} blur={2.5} far={6} />}
        </Canvas>
      </div>

      {/* Typography / UI Layer */}
      <div className="relative z-20 w-full h-full flex flex-col justify-between p-8 md:p-16 pointer-events-none">
        
        {/* Top Left */}
        <div className="max-w-xl">
          <p className={`font-mono text-sm uppercase tracking-widest mb-4 flex items-center gap-4 ${isEngineeringMode ? 'text-steel' : 'text-accent'}`}>
            <span className={`w-8 h-[1px] ${isEngineeringMode ? 'bg-steel' : 'bg-accent'}`}></span>
            Street Lighting Infrastructure
          </p>
          <h2 className={`text-4xl md:text-6xl font-display font-bold tracking-tight mb-4 ${isEngineeringMode ? 'text-white' : 'text-ink'}`}>
            Deconstructing <br /> <span className={isEngineeringMode ? 'text-accent' : 'text-steel'}>Performance.</span>
          </h2>
          <p className={`text-sm md:text-base font-mono ${isEngineeringMode ? 'text-steel' : 'text-slate-500'}`}>
            SCROLL TO EXPLORE COMPONENTS
          </p>
        </div>
        
        {/* Bottom Right */}
        <div className="hidden md:block self-end text-right max-w-xl bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
          <h3 className={`text-2xl md:text-3xl font-display font-bold tracking-tight mb-2 ${isEngineeringMode ? 'text-white' : 'text-ink'}`}>
            Thermal Mastery
          </h3>
          <p className={isEngineeringMode ? 'text-steel' : 'text-slate-600'}>
            Our heavy-duty die-cast housings act as massive heat sinks. 
            By dissipating heat instantly, we guarantee our street lights 
            survive harsh outdoor environments without lumen depreciation.
          </p>
        </div>

      </div>
      
    </section>
  );
}
