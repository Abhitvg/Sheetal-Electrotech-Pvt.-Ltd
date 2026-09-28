"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Float, PresentationControls, ContactShadows } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { useEngineeringMode } from "./EngineeringModeProvider";
import { ChevronRight } from "lucide-react";

type MaterialId = "polycarbonate" | "aluminum" | "pcb";

const materials = {
  polycarbonate: {
    title: "Optical Grade Polycarbonate",
    subtitle: "High Transmittance Diffuser Material",
    specs: [
      { label: "Light Transmittance", value: "> 92%" },
      { label: "Heat Deflection", value: "135°C" },
      { label: "Impact Strength", value: "850 J/m" },
    ],
    desc: "Used in all our LED diffusers and batten covers to ensure maximum lumen output while hiding internal LED dotting. UV stabilized to prevent yellowing over a 10-year lifespan."
  },
  aluminum: {
    title: "ADC12 Die-Cast Aluminum",
    subtitle: "Thermal Management Alloy",
    specs: [
      { label: "Thermal Cond.", value: "96 W/m·K" },
      { label: "Tensile Strength", value: "310 MPa" },
      { label: "Corrosion Res.", value: "Excellent" },
    ],
    desc: "Precision die-cast heat sinks designed for maximum surface area. Ensures junction temperatures remain below critical thresholds for 50,000+ hour operational life."
  },
  pcb: {
    title: "FR4 / Metal Core PCB",
    subtitle: "Electronic Foundation",
    specs: [
      { label: "Thermal Cond.", value: "2.0 W/m·K" },
      { label: "Breakdown Vol.", value: "4.0 kV/mil" },
      { label: "Glass Trans.", value: "135°C (Tg)" },
    ],
    desc: "High-density interconnect boards engineered for heavy thermal loads. Custom layout optimization to minimize EMI and maximize component lifespan."
  }
};

function MaterialModel({ id }: { id: MaterialId }) {
  const { isEngineeringMode } = useEngineeringMode();
  const wireframe = isEngineeringMode;

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      {id === "polycarbonate" && (
        <group scale={2}>
          {/* Main Diffuser Dome */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[1, 64, 64, 0, Math.PI * 2, 0, Math.PI / 2.2]} />
            <meshPhysicalMaterial 
              color={isEngineeringMode ? "#60a5fa" : "#ffffff"} 
              transmission={wireframe ? 0 : 0.95} 
              opacity={wireframe ? 0.3 : 1}
              roughness={0.15}
              ior={1.5}
              thickness={0.8}
              clearcoat={1}
              wireframe={wireframe}
            />
          </mesh>
          {/* Internal Optical Ribs for Light Diffusion */}
          {Array.from({ length: 24 }).map((_, i) => (
            <mesh key={`rib-${i}`} position={[0, -0.1, 0]} rotation={[0, (i * Math.PI) / 12, 0]}>
              <boxGeometry args={[1.9, 0.4, 0.05]} />
              <meshPhysicalMaterial 
                color={isEngineeringMode ? "#60a5fa" : "#ffffff"} 
                transmission={wireframe ? 0 : 0.9} 
                opacity={0.8}
                roughness={0.3}
                wireframe={wireframe}
              />
            </mesh>
          ))}
          {/* Base Mounting Ring */}
          <mesh position={[0, -0.2, 0]}>
            <cylinderGeometry args={[0.98, 0.98, 0.1, 64]} />
            <meshPhysicalMaterial 
              color={isEngineeringMode ? "#60a5fa" : "#f1f5f9"} 
              transmission={0}
              roughness={0.5}
              wireframe={wireframe}
            />
          </mesh>
        </group>
      )}

      {id === "aluminum" && (
        <group scale={1.5}>
          {/* Heavy Base Plate */}
          <mesh position={[0, -0.4, 0]}>
            <boxGeometry args={[2.5, 0.2, 2.5]} />
            <meshStandardMaterial 
              color={isEngineeringMode ? "#60a5fa" : "#cbd5e1"} 
              metalness={0.9} 
              roughness={0.2}
              wireframe={wireframe} 
            />
          </mesh>
          {/* Complex Heat Sink Fins */}
          {Array.from({ length: 11 }).map((_, i) => (
            <mesh key={`alu-fin-${i}`} position={[-1 + i * 0.2, 0.3, 0]}>
              <boxGeometry args={[0.06, 1.2, 2.3]} />
              <meshStandardMaterial 
                color={isEngineeringMode ? "#60a5fa" : "#94a3b8"} 
                metalness={0.8} 
                roughness={0.3}
                wireframe={wireframe} 
              />
            </mesh>
          ))}
          {/* Cross Support Rib */}
          <mesh position={[0, 0.3, 0]}>
            <boxGeometry args={[2.3, 1, 0.1]} />
            <meshStandardMaterial 
              color={isEngineeringMode ? "#60a5fa" : "#94a3b8"} 
              metalness={0.8} 
              roughness={0.3}
              wireframe={wireframe} 
            />
          </mesh>
        </group>
      )}

      {id === "pcb" && (
        <group scale={2} rotation={[-0.2, 0, 0]}>
          {/* Main Board */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[1, 1, 0.05, 64]} />
            <meshStandardMaterial 
              color={isEngineeringMode ? "#facc15" : "#022c22"} 
              metalness={0.2} 
              roughness={0.8}
              wireframe={wireframe}
            />
          </mesh>
          {/* Copper Traces (Concentric rings) */}
          {Array.from({ length: 4 }).map((_, i) => (
            <mesh key={`trace-${i}`} position={[0, 0.026, 0]}>
              <torusGeometry args={[0.3 + i * 0.15, 0.02, 16, 64]} />
              <meshStandardMaterial color={isEngineeringMode ? "#ffffff" : "#d97706"} metalness={1} roughness={0.3} />
            </mesh>
          ))}
          {/* Surface Mount LED Chips */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * Math.PI) / 6;
            const r = 0.6;
            return (
              <group key={`led-${i}`} position={[Math.cos(angle) * r, 0.03, Math.sin(angle) * r]} rotation={[0, -angle, 0]}>
                <mesh>
                  <boxGeometry args={[0.15, 0.02, 0.15]} />
                  <meshStandardMaterial color={isEngineeringMode ? "#facc15" : "#ffffff"} />
                </mesh>
                <mesh position={[0, 0.015, 0]}>
                  <boxGeometry args={[0.1, 0.01, 0.1]} />
                  <meshStandardMaterial color="#fbbf24" emissive={wireframe ? "#000" : "#fef3c7"} emissiveIntensity={0.5} />
                </mesh>
              </group>
            )
          })}
          {/* Center Driver IC */}
          <mesh position={[0, 0.05, 0]}>
            <boxGeometry args={[0.3, 0.08, 0.3]} />
            <meshStandardMaterial color="#1e293b" metalness={0.2} roughness={0.7} />
          </mesh>
          {/* Power Connector */}
          <mesh position={[0, 0.06, 0.8]}>
             <boxGeometry args={[0.2, 0.1, 0.15]} />
             <meshStandardMaterial color="#f8fafc" />
          </mesh>
        </group>
      )}
    </Float>
  );
}

export default function MaterialShowcase() {
  const [activeId, setActiveId] = useState<MaterialId>("polycarbonate");
  const { isEngineeringMode } = useEngineeringMode();

  return (
    <section className={`py-32 overflow-hidden transition-colors duration-500 ${isEngineeringMode ? 'bg-transparent text-paper' : 'bg-white text-ink border-t border-slate-200'}`}>
      <div className="container-wide">
        
        <div className="mb-16">
          <p className="font-mono text-accent text-sm uppercase tracking-widest mb-4 flex items-center gap-4">
            <span className="w-8 h-[1px] bg-accent"></span>
            Raw Material Integrity
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold max-w-2xl">
            Sourced for performance.<br />
            Engineered for longevity.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Navigation & Details */}
          <div className="flex flex-col gap-12">
            
            {/* Selection Menu */}
            <div className="flex flex-col gap-2">
              {(Object.keys(materials) as MaterialId[]).map((id) => (
                <button
                  key={id}
                  onClick={() => setActiveId(id)}
                  className={`flex justify-between items-center p-4 text-left border transition-all ${
                    activeId === id 
                      ? (isEngineeringMode ? 'border-accent bg-accent/10 text-accent font-bold' : 'border-ink bg-ink text-white font-bold') 
                      : (isEngineeringMode ? 'border-steel/30 text-steel hover:bg-white/5' : 'border-slate-200 text-steel hover:text-ink')
                  }`}
                >
                  <span className="uppercase font-mono text-sm tracking-wide">{materials[id].title}</span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${activeId === id ? 'translate-x-1' : ''}`} />
                </button>
              ))}
            </div>

            {/* Specifications Display */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className={`text-xl font-display font-bold mb-2 ${isEngineeringMode ? 'text-white' : 'text-ink'}`}>
                  {materials[activeId].subtitle}
                </h3>
                <p className={`text-sm leading-relaxed mb-8 ${isEngineeringMode ? 'text-steel' : 'text-steel'}`}>
                  {materials[activeId].desc}
                </p>

                <div className="grid grid-cols-3 gap-6">
                  {materials[activeId].specs.map((spec, i) => (
                    <div key={i} className={`flex flex-col gap-2 pt-4 border-t ${isEngineeringMode ? 'border-steel/30' : 'border-slate-200'}`}>
                      <span className={`text-xs font-mono uppercase ${isEngineeringMode ? 'text-steel' : 'text-steel'}`}>{spec.label}</span>
                      <span className={`text-lg font-bold ${isEngineeringMode ? 'text-white' : 'text-ink'}`}>{spec.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

          </div>

          {/* 3D Canvas */}
          <div className={`relative h-[500px] rounded-xl overflow-hidden border ${isEngineeringMode ? 'bg-transparent border-steel/50' : 'bg-slate-50 border-slate-200'}`}>
            <div className="absolute top-4 left-4 z-10 pointer-events-none">
              <span className={`text-xs font-mono uppercase tracking-widest ${isEngineeringMode ? 'text-steel' : 'text-slate-400'}`}>
                Interactive Material Viewer
              </span>
            </div>
            
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
              <ambientLight intensity={isEngineeringMode ? 1.5 : 0.7} />
              <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
              
              <PresentationControls global rotation={[0.2, 0.5, 0]} polar={[-0.4, 0.2]} azimuth={[-1, 0.75]} snap={true}>
                <MaterialModel id={activeId} />
              </PresentationControls>
              
              {!isEngineeringMode && <Environment preset="city" />}
              {!isEngineeringMode && <ContactShadows position={[0, -2]} opacity={0.4} scale={10} blur={2} far={4} />}
            </Canvas>
          </div>

        </div>
      </div>
    </section>
  );
}
