"use client";

import { useEffect, useRef, useMemo } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { useEngineeringMode } from "./EngineeringModeProvider";

export function ProceduralBulb({ 
  timeline,
  autoRotate = false
}: { 
  timeline?: gsap.core.Timeline | null;
  autoRotate?: boolean;
}) {
  const { isEngineeringMode } = useEngineeringMode();
  
  const group = useRef<THREE.Group>(null);
  const diffuserRef = useRef<THREE.Group>(null);
  const pcbRef = useRef<THREE.Group>(null);
  const heatsinkRef = useRef<THREE.Group>(null);
  const driverRef = useRef<THREE.Group>(null);
  const baseRef = useRef<THREE.Group>(null);

  const { viewport } = useThree();
  const isMobile = viewport.width < 5;

  useFrame(() => {
    if (autoRotate && group.current) {
      group.current.rotation.y += 0.005;
    }
  });

  useEffect(() => {
    if (!group.current) return;
    
    if (timeline) {
      // Mobile: push up, Desktop: center-right
      const startX = isMobile ? 0 : 2;
      const startY = isMobile ? 1.5 : -0.5;
      
      gsap.set(group.current.position, { x: startX, y: startY, z: 0 });
      gsap.set(group.current.scale, { 
        x: isMobile ? 0.8 : 1.2, 
        y: isMobile ? 0.8 : 1.2, 
        z: isMobile ? 0.8 : 1.2 
      });
      gsap.set(group.current.rotation, { x: 0.1, y: 0, z: 0 });

      // 0 -> 1 (0-15%): Complete bulb rotating slightly.
      timeline.to(group.current.rotation, { y: Math.PI / 4, duration: 1, ease: "none" }, 0);
      
      // 1 -> 2 (15-30%): Diffuser moves away.
      timeline.to(diffuserRef.current!.position, { y: 2.8, duration: 1, ease: "power2.inOut" }, 1);
      timeline.to(group.current.rotation, { y: Math.PI / 2, duration: 1, ease: "none" }, 1);
      
      // 2 -> 3 (30-45%): LED PCB separates.
      timeline.to(pcbRef.current!.position, { y: 1.5, duration: 1, ease: "power2.inOut" }, 2);
      timeline.to(group.current.rotation, { y: Math.PI * 0.75, duration: 1, ease: "none" }, 2);
      
      // 3 -> 4 (45-60%): Heat sink separates.
      timeline.to(heatsinkRef.current!.position, { y: 0, duration: 1, ease: "power2.inOut" }, 3);
      timeline.to(group.current.rotation, { y: Math.PI, duration: 1, ease: "none" }, 3);
      
      // 4 -> 5 (60-75%): Driver separates.
      timeline.to(driverRef.current!.position, { y: -1.8, duration: 1, ease: "power2.inOut" }, 4);
      timeline.to(group.current.rotation, { y: Math.PI * 1.25, duration: 1, ease: "none" }, 4);
      
      // 5 -> 6 (75-90%): Housing/Base separates.
      timeline.to(baseRef.current!.position, { y: -3.5, duration: 1, ease: "power2.inOut" }, 5);
      timeline.to(group.current.rotation, { y: Math.PI * 1.5, duration: 1, ease: "none" }, 5);
      
      // 6 -> 7 (90-100%): Spin out.
      timeline.to(group.current.rotation, { y: Math.PI * 2, duration: 1, ease: "none" }, 6);
    } else {
      gsap.set(group.current.position, { x: 0, y: 0, z: 0 });
      gsap.set(group.current.scale, { x: 1, y: 1, z: 1 });
      gsap.set(group.current.rotation, { x: 0.1, y: 0, z: 0 });
    }
  }, [timeline, isMobile]);

  // Generate LED chips for the PCB
  const ledChips = useMemo(() => {
    const chips = [];
    const radius = 0.5;
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      chips.push(
        <mesh key={i} position={[Math.cos(angle) * radius, 0.05, Math.sin(angle) * radius]}>
          <boxGeometry args={[0.15, 0.02, 0.15]} />
          <meshStandardMaterial 
            color={isEngineeringMode ? "#facc15" : "#ffcc00"} 
            emissive={isEngineeringMode ? "#000000" : "#ffea00"} 
            emissiveIntensity={isEngineeringMode ? 0 : 0.8}
            wireframe={isEngineeringMode}
          />
        </mesh>
      );
    }
    // Center chip
    chips.push(
      <mesh key="center" position={[0, 0.05, 0]}>
        <boxGeometry args={[0.2, 0.02, 0.2]} />
        <meshStandardMaterial 
          color={isEngineeringMode ? "#facc15" : "#ffcc00"} 
          emissive={isEngineeringMode ? "#000000" : "#ffea00"} 
          emissiveIntensity={isEngineeringMode ? 0 : 1}
          wireframe={isEngineeringMode}
        />
      </mesh>
    );
    return chips;
  }, [isEngineeringMode]);

  // Generate Heat Sink Fins
  const heatSinkFins = useMemo(() => {
    const fins = [];
    for (let i = 0; i < 8; i++) {
      fins.push(
        <mesh key={`fin-${i}`} position={[0, 0.4 - i * 0.15, 0]}>
          <cylinderGeometry args={[0.9, 0.85, 0.05, 32]} />
          <meshStandardMaterial 
            color={isEngineeringMode ? "#60a5fa" : "#e2e8f0"} 
            metalness={isEngineeringMode ? 0 : 0.9} 
            roughness={isEngineeringMode ? 1 : 0.4} 
            wireframe={isEngineeringMode} 
          />
        </mesh>
      );
    }
    return fins;
  }, [isEngineeringMode]);

  // Generate E27 Threads
  const threads = useMemo(() => {
    const items = [];
    for (let i = 0; i < 5; i++) {
      items.push(
        <mesh key={`thread-${i}`} position={[0, -0.15 - i * 0.1, 0]}>
          <torusGeometry args={[0.49, 0.03, 16, 32]} />
          <meshStandardMaterial 
            color={isEngineeringMode ? "#60a5fa" : "#94a3b8"} 
            metalness={isEngineeringMode ? 0 : 1} 
            roughness={isEngineeringMode ? 1 : 0.3} 
            wireframe={isEngineeringMode} 
          />
        </mesh>
      );
    }
    return items;
  }, [isEngineeringMode]);

  return (
    <group ref={group} dispose={null} scale={1.2}>
      <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.1}>
        
        {/* 1. Diffuser (Frosted Polycarbonate) */}
        <group ref={diffuserRef} position={[0, 1.2, 0]}>
          <mesh>
            <sphereGeometry args={[1, 64, 64, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshPhysicalMaterial 
              color={isEngineeringMode ? "#60a5fa" : "#ffffff"} 
              transmission={isEngineeringMode ? 0 : 0.95} 
              opacity={isEngineeringMode ? 0.3 : 1} 
              metalness={0} 
              roughness={isEngineeringMode ? 0 : 0.25} 
              ior={1.5} 
              thickness={0.5}
              clearcoat={1}
              clearcoatRoughness={0.1}
              wireframe={isEngineeringMode}
            />
          </mesh>
          {/* Inner Lip */}
          <mesh position={[0, -0.05, 0]}>
            <cylinderGeometry args={[0.98, 0.98, 0.1, 64]} />
            <meshPhysicalMaterial 
              color={isEngineeringMode ? "#60a5fa" : "#ffffff"} 
              transmission={isEngineeringMode ? 0 : 0.95}
              roughness={0.2}
              wireframe={isEngineeringMode}
            />
          </mesh>
        </group>

        {/* 2. LED PCB (Aluminum Core PCB) */}
        <group ref={pcbRef} position={[0, 1.1, 0]}>
          {/* PCB Base */}
          <mesh>
            <cylinderGeometry args={[0.92, 0.92, 0.05, 64]} />
            <meshStandardMaterial 
              color={isEngineeringMode ? "#facc15" : "#ffffff"} 
              metalness={isEngineeringMode ? 0 : 0.2} 
              roughness={0.8} 
              wireframe={isEngineeringMode} 
            />
          </mesh>
          {/* LED Chips */}
          {ledChips}
        </group>

        {/* 3. Heat Sink / Housing (Die-cast Aluminum) */}
        <group ref={heatsinkRef} position={[0, 0, 0]}>
          {/* Core body */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.95, 0.55, 2, 64]} />
            <meshStandardMaterial 
              color={isEngineeringMode ? "#60a5fa" : "#f1f5f9"} 
              metalness={isEngineeringMode ? 0 : 0.3} 
              roughness={0.2} 
              wireframe={isEngineeringMode} 
            />
          </mesh>
          {/* Cooling Fins */}
          {heatSinkFins}
        </group>

        {/* 4. Driver (Power Electronics) */}
        <group ref={driverRef} position={[0, -0.2, 0]}>
          {/* Main PCB board */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.6, 0.05, 0.6]} />
            <meshStandardMaterial color={isEngineeringMode ? "#facc15" : "#16a34a"} roughness={0.9} wireframe={isEngineeringMode} />
          </mesh>
          {/* Capacitor 1 */}
          <mesh position={[-0.15, 0.2, -0.15]}>
            <cylinderGeometry args={[0.1, 0.1, 0.35, 16]} />
            <meshStandardMaterial color={isEngineeringMode ? "#facc15" : "#0f172a"} roughness={0.4} wireframe={isEngineeringMode} />
          </mesh>
          {/* Capacitor 2 */}
          <mesh position={[0.15, 0.15, 0.1]}>
            <cylinderGeometry args={[0.08, 0.08, 0.25, 16]} />
            <meshStandardMaterial color={isEngineeringMode ? "#facc15" : "#2563eb"} roughness={0.4} wireframe={isEngineeringMode} />
          </mesh>
          {/* Transformer */}
          <mesh position={[0, 0.15, 0.15]}>
            <boxGeometry args={[0.2, 0.25, 0.2]} />
            <meshStandardMaterial color={isEngineeringMode ? "#facc15" : "#facc15"} roughness={0.6} wireframe={isEngineeringMode} />
          </mesh>
          {/* IC Chip */}
          <mesh position={[0.1, 0.05, -0.1]}>
            <boxGeometry args={[0.15, 0.05, 0.15]} />
            <meshStandardMaterial color={isEngineeringMode ? "#facc15" : "#1e293b"} roughness={0.8} wireframe={isEngineeringMode} />
          </mesh>
        </group>

        {/* 5. B22/E27 Base (Nickel Plated Brass) */}
        <group ref={baseRef} position={[0, -1.2, 0]}>
          {/* Plastic Insulator Neck */}
          <mesh position={[0, 0.2, 0]}>
            <cylinderGeometry args={[0.55, 0.5, 0.2, 32]} />
            <meshStandardMaterial color={isEngineeringMode ? "#60a5fa" : "#334155"} roughness={0.7} wireframe={isEngineeringMode} />
          </mesh>
          
          {/* Main Metal Base */}
          <mesh position={[0, -0.2, 0]}>
            <cylinderGeometry args={[0.5, 0.45, 0.6, 32]} />
            <meshStandardMaterial 
              color={isEngineeringMode ? "#60a5fa" : "#cbd5e1"} 
              metalness={isEngineeringMode ? 0 : 1} 
              roughness={isEngineeringMode ? 1 : 0.3} 
              wireframe={isEngineeringMode} 
            />
          </mesh>
          
          {/* Threads */}
          {threads}

          {/* Bottom Contact (Insulator + Solder Point) */}
          <mesh position={[0, -0.55, 0]}>
            <cylinderGeometry args={[0.45, 0.2, 0.1, 32]} />
            <meshStandardMaterial color={isEngineeringMode ? "#60a5fa" : "#0f172a"} roughness={0.9} wireframe={isEngineeringMode} />
          </mesh>
          <mesh position={[0, -0.62, 0]}>
            <cylinderGeometry args={[0.15, 0.1, 0.05, 16]} />
            <meshStandardMaterial color={isEngineeringMode ? "#60a5fa" : "#94a3b8"} metalness={1} roughness={0.4} wireframe={isEngineeringMode} />
          </mesh>
        </group>

      </Float>
    </group>
  );
}
