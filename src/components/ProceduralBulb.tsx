"use client";

import { useEffect, useRef } from "react";
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
  const diffuserRef = useRef<THREE.Mesh>(null);
  const pcbRef = useRef<THREE.Mesh>(null);
  const heatsinkRef = useRef<THREE.Mesh>(null);
  const driverRef = useRef<THREE.Mesh>(null);
  const baseRef = useRef<THREE.Mesh>(null);

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
      timeline.to(diffuserRef.current!.position, { y: 2.5, duration: 1, ease: "power2.inOut" }, 1);
      timeline.to(group.current.rotation, { y: Math.PI / 2, duration: 1, ease: "none" }, 1);
      
      // 2 -> 3 (30-45%): LED PCB separates.
      timeline.to(pcbRef.current!.position, { y: 1.2, duration: 1, ease: "power2.inOut" }, 2);
      timeline.to(group.current.rotation, { y: Math.PI * 0.75, duration: 1, ease: "none" }, 2);
      
      // 3 -> 4 (45-60%): Heat sink separates.
      timeline.to(heatsinkRef.current!.position, { y: -0.2, duration: 1, ease: "power2.inOut" }, 3);
      timeline.to(group.current.rotation, { y: Math.PI, duration: 1, ease: "none" }, 3);
      
      // 4 -> 5 (60-75%): Driver separates.
      timeline.to(driverRef.current!.position, { y: -1.8, duration: 1, ease: "power2.inOut" }, 4);
      timeline.to(group.current.rotation, { y: Math.PI * 1.25, duration: 1, ease: "none" }, 4);
      
      // 5 -> 6 (75-90%): Housing separates.
      timeline.to(baseRef.current!.position, { y: -3.0, duration: 1, ease: "power2.inOut" }, 5);
      timeline.to(group.current.rotation, { y: Math.PI * 1.5, duration: 1, ease: "none" }, 5);
      
      // 6 -> 7 (90-100%): Everything disappears except individual components.
      timeline.to(group.current.rotation, { y: Math.PI * 2, duration: 1, ease: "none" }, 6);
    } else {
      // Default position for generic use (e.g., product page)
      gsap.set(group.current.position, { x: 0, y: 0, z: 0 });
      gsap.set(group.current.scale, { x: 1, y: 1, z: 1 });
      gsap.set(group.current.rotation, { x: 0.1, y: 0, z: 0 });
    }
  }, [timeline, isMobile]);

  return (
    <group ref={group} dispose={null} scale={1.2}>
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
        
        {/* Diffuser (Frosted Polycarbonate) */}
        <mesh ref={diffuserRef} position={[0, 1.2, 0]}>
          <sphereGeometry args={[1, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshPhysicalMaterial 
            color={isEngineeringMode ? "#60a5fa" : "#ffffff"} 
            transmission={isEngineeringMode ? 0 : 0.9} 
            opacity={isEngineeringMode ? 0.3 : 1} 
            metalness={0} 
            roughness={0.2} 
            ior={1.5} 
            thickness={0.5} 
            wireframe={isEngineeringMode}
          />
        </mesh>

        {/* LED PCB (PCB Green) */}
        <mesh ref={pcbRef} position={[0, 1.1, 0]}>
          <cylinderGeometry args={[0.9, 0.9, 0.05, 32]} />
          <meshStandardMaterial color={isEngineeringMode ? "#facc15" : "#10b981"} metalness={0.4} roughness={0.6} wireframe={isEngineeringMode} />
        </mesh>

        {/* Heat Sink / Housing (Brushed Aluminium) */}
        <mesh ref={heatsinkRef} position={[0, 0, 0]}>
          <cylinderGeometry args={[0.95, 0.6, 2, 32]} />
          <meshStandardMaterial color={isEngineeringMode ? "#60a5fa" : "#cbd5e1"} metalness={0.8} roughness={0.3} wireframe={isEngineeringMode} />
        </mesh>

        {/* Driver (Electronics) */}
        <mesh ref={driverRef} position={[0, -0.2, 0]}>
          <boxGeometry args={[0.4, 0.8, 0.4]} />
          <meshStandardMaterial color={isEngineeringMode ? "#facc15" : "#334155"} metalness={0.6} roughness={0.4} wireframe={isEngineeringMode} />
        </mesh>

        {/* B22/E27 Base (Plastic Engineering/Metal) */}
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
