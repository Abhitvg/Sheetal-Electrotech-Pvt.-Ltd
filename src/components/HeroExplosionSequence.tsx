"use client";

import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows, Float } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEngineeringMode } from "./EngineeringModeProvider";

gsap.registerPlugin(ScrollTrigger);

function ProceduralBulb({ timeline }: { timeline: gsap.core.Timeline | null }) {
  const { isEngineeringMode } = useEngineeringMode();
  
  const group = useRef<THREE.Group>(null);
  const diffuserRef = useRef<THREE.Mesh>(null);
  const pcbRef = useRef<THREE.Mesh>(null);
  const heatsinkRef = useRef<THREE.Mesh>(null);
  const driverRef = useRef<THREE.Mesh>(null);
  const baseRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (!group.current || !timeline) return;

    // Initial state: bulb on the right side for the hero
    gsap.set(group.current.position, { x: 2, y: 0, z: 0 });
    gsap.set(group.current.rotation, { x: 0.2, y: -0.5, z: -0.2 });

    // Hero -> Explosion Transition (0 -> 1 progress)
    
    // Move to center and stand upright
    timeline.to(group.current.position, { x: 0, y: 0, duration: 1 }, 0);
    timeline.to(group.current.rotation, { x: 0, y: Math.PI * 2, z: 0, duration: 2, ease: "power1.inOut" }, 0);

    // Explode components
    timeline.to(diffuserRef.current!.position, { y: 2.5, duration: 1 }, 1);
    timeline.to(pcbRef.current!.position, { y: 1.2, duration: 1 }, 1.2);
    // Heatsink stays around 0
    timeline.to(driverRef.current!.position, { y: -1.2, duration: 1 }, 1.4);
    timeline.to(baseRef.current!.position, { y: -2.5, duration: 1 }, 1.6);

  }, [timeline]);

  return (
    <group ref={group} dispose={null} scale={1.2}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
        
        {/* Diffuser */}
        <mesh ref={diffuserRef} position={[0, 1.2, 0]}>
          <sphereGeometry args={[1, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshPhysicalMaterial 
            color={isEngineeringMode ? "#60a5fa" : "#ffffff"} 
            transmission={isEngineeringMode ? 0 : 0.9} 
            opacity={isEngineeringMode ? 0.3 : 1} 
            metalness={0} 
            roughness={0.1} 
            ior={1.5} 
            thickness={0.5} 
            wireframe={isEngineeringMode}
          />
        </mesh>

        {/* LED PCB */}
        <mesh ref={pcbRef} position={[0, 1.1, 0]}>
          <cylinderGeometry args={[0.9, 0.9, 0.05, 32]} />
          <meshStandardMaterial color={isEngineeringMode ? "#facc15" : "#fcd34d"} metalness={0.8} roughness={0.2} wireframe={isEngineeringMode} />
        </mesh>

        {/* Heat Sink / Housing */}
        <mesh ref={heatsinkRef} position={[0, 0, 0]}>
          <cylinderGeometry args={[0.95, 0.6, 2, 32]} />
          <meshStandardMaterial color={isEngineeringMode ? "#60a5fa" : "#e2e8f0"} metalness={0.2} roughness={0.5} wireframe={isEngineeringMode} />
        </mesh>

        {/* Driver */}
        <mesh ref={driverRef} position={[0, -0.2, 0]}>
          <boxGeometry args={[0.4, 0.8, 0.4]} />
          <meshStandardMaterial color={isEngineeringMode ? "#facc15" : "#1e293b"} metalness={0.9} roughness={0.1} wireframe={isEngineeringMode} />
        </mesh>

        {/* B22/E27 Base */}
        <mesh ref={baseRef} position={[0, -1.2, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.6, 32]} />
          <meshStandardMaterial color={isEngineeringMode ? "#60a5fa" : "#94a3b8"} metalness={1} roughness={0.3} wireframe={isEngineeringMode} />
          {/* Base threads/pins */}
          <mesh position={[0, -0.4, 0]}>
            <cylinderGeometry args={[0.2, 0.4, 0.3, 32]} />
            <meshStandardMaterial color={isEngineeringMode ? "#60a5fa" : "#0f172a"} metalness={0.5} roughness={0.5} wireframe={isEngineeringMode} />
          </mesh>
        </mesh>

      </Float>
    </group>
  );
}

export default function HeroExplosionSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tl, setTl] = useState<gsap.core.Timeline | null>(null);

  // HTML references for fading
  const heroTextRef = useRef<HTMLDivElement>(null);
  const engTextRef = useRef<HTMLDivElement>(null);
  const calloutsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=3000", // 300vh scroll duration
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      }
    });

    // Animate HTML elements in sync with the 3D timeline
    // 0 -> 1: Hero to Center
    timeline.to(heroTextRef.current, { opacity: 0, x: -50, duration: 0.5 }, 0);
    
    // 1 -> 2: Center to Explode
    timeline.fromTo(engTextRef.current, 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 0.5 }, 
      0.8
    );
    
    timeline.fromTo(calloutsRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      1.5
    );

    setTl(timeline);

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-paper overflow-hidden text-ink">
      
      {/* 3D Canvas - Pinned to background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#0066ff" />
          
          <ProceduralBulb timeline={tl} />
          
          <Environment preset="studio" />
          <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={10} blur={2} far={4} />
        </Canvas>
      </div>

      {/* HTML Layer - Pointer events none so user can still drag/interact with 3D if needed */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-center">
        
        {/* HERO TEXT (Visible at 0 progress) */}
        <div ref={heroTextRef} className="container-wide w-full h-full flex flex-col justify-center absolute inset-0">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.1] mb-6">
              ENGINEERING LIGHT.<br />
              <span className="text-accent">MANUFACTURING SCALE.</span>
            </h1>
            <p className="text-steel font-mono uppercase tracking-widest text-sm mb-12">
              Lighting | Electronics | Plastics
            </p>
            
            <div className="flex items-center gap-6">
              <button className="bg-ink text-white px-8 py-4 text-sm font-medium hover:bg-accent transition-colors pointer-events-auto">
                Explore Capabilities
              </button>
              <div className="flex items-center gap-3 text-steel text-xs font-mono uppercase">
                <span className="w-12 h-[1px] bg-steel"></span>
                Scroll to Explore
              </div>
            </div>
          </div>
        </div>

        {/* ENGINEERING TEXT (Fades in at 1 progress) */}
        <div ref={engTextRef} className="container-wide w-full h-full flex flex-col justify-start pt-24 absolute inset-0 opacity-0">
          <div className="text-center w-full">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-ink">
              ENGINEERED DOWN TO THE COMPONENT.
            </h2>
          </div>
        </div>

        {/* CALLOUTS (Fades in at end of explosion) */}
        <div ref={calloutsRef} className="container-wide w-full h-full flex justify-between items-center absolute inset-0 opacity-0 pointer-events-none pb-12">
          
          {/* Left Side Callouts */}
          <div className="flex flex-col gap-32 pl-12">
            <div className="max-w-xs pointer-events-auto group">
              <h3 className="font-mono text-sm font-bold uppercase mb-2 group-hover:text-accent transition-colors">LED PCB</h3>
              <div className="w-8 h-[1px] bg-ink mb-3 group-hover:w-16 group-hover:bg-accent transition-all"></div>
              <p className="text-xs text-steel font-mono">High-efficiency LED architecture. Thermal optimisation, custom CCT.</p>
            </div>
            
            <div className="max-w-xs pointer-events-auto group">
              <h3 className="font-mono text-sm font-bold uppercase mb-2 group-hover:text-accent transition-colors">DRIVER</h3>
              <div className="w-8 h-[1px] bg-ink mb-3 group-hover:w-16 group-hover:bg-accent transition-all"></div>
              <p className="text-xs text-steel font-mono">Constant current regulation. Surge protection up to 5KV.</p>
            </div>
          </div>

          {/* Right Side Callouts */}
          <div className="flex flex-col gap-48 pr-12 text-right">
             <div className="max-w-xs pointer-events-auto group ml-auto">
              <h3 className="font-mono text-sm font-bold uppercase mb-2 group-hover:text-accent transition-colors">DIFFUSER</h3>
              <div className="w-8 h-[1px] bg-ink mb-3 ml-auto group-hover:w-16 group-hover:bg-accent transition-all"></div>
              <p className="text-xs text-steel font-mono">Polycarbonate frosted cover for even 360-degree light distribution.</p>
            </div>
            
            <div className="max-w-xs pointer-events-auto group ml-auto">
              <h3 className="font-mono text-sm font-bold uppercase mb-2 group-hover:text-accent transition-colors">HEAT SINK</h3>
              <div className="w-8 h-[1px] bg-ink mb-3 ml-auto group-hover:w-16 group-hover:bg-accent transition-all"></div>
              <p className="text-xs text-steel font-mono">Designed for continuous operation. Aluminium heat dissipation.</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
