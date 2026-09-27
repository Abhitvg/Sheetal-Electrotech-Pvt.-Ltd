"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, PresentationControls, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { useEngineeringMode } from "./EngineeringModeProvider";

type Category = "LED Bulbs" | "LED Battens" | "Flood Lights" | "Custom Injection Moulding";

// Primitive representations for the configurator
function ConfiguratorModel({ category }: { category: Category }) {
  const { isEngineeringMode } = useEngineeringMode();
  const group = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.005;
    }
  });

  const wireframe = isEngineeringMode;
  const mainColor = isEngineeringMode ? "#60a5fa" : "#ffffff";
  const accentColor = isEngineeringMode ? "#facc15" : "#1e293b";

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        {category === "LED Bulbs" && (
          <group scale={1.5} position={[0, 0.5, 0]}>
            <mesh position={[0, 1.2, 0]}>
              <sphereGeometry args={[1, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
              <meshPhysicalMaterial color={mainColor} transmission={wireframe ? 0 : 0.9} opacity={wireframe ? 0.3 : 1} ior={1.5} thickness={0.5} wireframe={wireframe} />
            </mesh>
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.95, 0.6, 2, 32]} />
              <meshStandardMaterial color={isEngineeringMode ? mainColor : "#e2e8f0"} roughness={0.5} wireframe={wireframe} />
            </mesh>
            <mesh position={[0, -1.2, 0]}>
              <cylinderGeometry args={[0.5, 0.5, 0.6, 32]} />
              <meshStandardMaterial color={isEngineeringMode ? mainColor : "#94a3b8"} metalness={1} roughness={0.3} wireframe={wireframe} />
            </mesh>
          </group>
        )}

        {category === "LED Battens" && (
          <group scale={1.2}>
            <mesh position={[0, 0.2, 0]}>
              <boxGeometry args={[4, 0.4, 0.6]} />
              <meshPhysicalMaterial color={mainColor} transmission={wireframe ? 0 : 0.8} opacity={wireframe ? 0.3 : 1} wireframe={wireframe} />
            </mesh>
            <mesh position={[0, -0.2, 0]}>
              <boxGeometry args={[4, 0.4, 0.8]} />
              <meshStandardMaterial color={isEngineeringMode ? mainColor : "#e2e8f0"} roughness={0.5} wireframe={wireframe} />
            </mesh>
          </group>
        )}

        {category === "Flood Lights" && (
          <group scale={1.5} rotation={[0.3, 0, 0]}>
            <mesh position={[0, 0, 0.3]}>
              <boxGeometry args={[2.5, 2, 0.1]} />
              <meshPhysicalMaterial color={mainColor} transmission={wireframe ? 0 : 0.9} wireframe={wireframe} />
            </mesh>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[2.8, 2.3, 0.6]} />
              <meshStandardMaterial color={accentColor} metalness={0.8} roughness={0.2} wireframe={wireframe} />
            </mesh>
            {/* Mounting bracket */}
            <mesh position={[0, -1.3, -0.2]} rotation={[0, 0, 0]}>
              <boxGeometry args={[1.5, 0.2, 0.8]} />
              <meshStandardMaterial color={isEngineeringMode ? mainColor : "#94a3b8"} metalness={1} wireframe={wireframe} />
            </mesh>
          </group>
        )}

        {category === "Custom Injection Moulding" && (
          <group scale={1.5}>
            <mesh>
              <torusKnotGeometry args={[1, 0.3, 100, 16]} />
              <meshStandardMaterial color={mainColor} roughness={0.1} wireframe={wireframe} />
            </mesh>
          </group>
        )}
      </Float>
    </group>
  );
}

export default function QuoteCalculator3D() {
  const [category, setCategory] = useState<Category>("LED Bulbs");
  const [volume, setVolume] = useState<number>(100000);
  const { isEngineeringMode } = useEngineeringMode();

  const calculateEstimate = () => {
    let basePrice = 0;
    let leadTimeDaysMin = 14;
    let leadTimeDaysMax = 18;

    switch (category) {
      case "LED Bulbs": basePrice = 0.85; if (volume > 50000) { leadTimeDaysMin = 18; leadTimeDaysMax = 24; } break;
      case "LED Battens": basePrice = 1.45; if (volume > 25000) { leadTimeDaysMin = 21; leadTimeDaysMax = 28; } break;
      case "Flood Lights": basePrice = 4.20; leadTimeDaysMin = 21; leadTimeDaysMax = 28; if (volume > 10000) { leadTimeDaysMin = 28; leadTimeDaysMax = 35; } break;
      case "Custom Injection Moulding": basePrice = 0.40; leadTimeDaysMin = 40; leadTimeDaysMax = 45; break;
    }

    let discount = 1;
    if (volume >= 50000) discount = 0.9;
    else if (volume >= 100000) discount = 0.85;

    const finalPrice = basePrice * discount;

    return {
      priceMin: (finalPrice * 0.95).toFixed(2),
      priceMax: (finalPrice * 1.05).toFixed(2),
      leadTime: `${leadTimeDaysMin}–${leadTimeDaysMax} Days`,
    };
  };

  const estimate = calculateEstimate();

  return (
    <div className={`border shadow-sm overflow-hidden w-full max-w-6xl mx-auto flex flex-col md:flex-row font-mono transition-colors duration-500 ${isEngineeringMode ? 'bg-transparent border-steel' : 'bg-white border-slate-200'}`}>
      
      {/* 3D Viewer Section (Left) */}
      <div className={`md:w-1/2 relative min-h-[400px] flex flex-col ${isEngineeringMode ? 'border-r border-steel/50' : 'bg-slate-50 border-r border-slate-200'}`}>
        <div className="absolute top-6 left-6 z-10 pointer-events-none">
           <h3 className={`text-sm tracking-widest uppercase font-bold ${isEngineeringMode ? 'text-accent' : 'text-steel'}`}>
             Interactive View
           </h3>
           <p className={`text-xs mt-1 ${isEngineeringMode ? 'text-steel' : 'text-slate-400'}`}>Drag to rotate</p>
        </div>
        
        <div className="flex-1 w-full h-full absolute inset-0">
          <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
            <ambientLight intensity={isEngineeringMode ? 1.5 : 0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
            <PresentationControls global rotation={[0, 0.3, 0]} polar={[-0.4, 0.2]} azimuth={[-1, 0.75]} snap={true}>
              <ConfiguratorModel category={category} />
            </PresentationControls>
            {!isEngineeringMode && <Environment preset="studio" />}
            {!isEngineeringMode && <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2} far={4} />}
          </Canvas>
        </div>
      </div>

      {/* Input & Output Section (Right) */}
      <div className={`p-8 md:p-12 md:w-1/2 flex flex-col justify-between relative ${isEngineeringMode ? 'bg-transparent text-paper' : 'bg-white text-ink'}`}>
        
        <div className="space-y-10">
          <div>
            <label className={`block text-xs font-medium mb-4 uppercase tracking-wider ${isEngineeringMode ? 'text-steel' : 'text-steel'}`}>
              Select Product Category
            </label>
            <div className="grid grid-cols-2 gap-3">
              {(["LED Bulbs", "LED Battens", "Flood Lights", "Custom Injection Moulding"] as Category[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`text-left text-xs p-3 transition-all border ${
                    category === cat 
                      ? (isEngineeringMode ? "border-accent bg-accent/10 text-accent font-bold" : "border-ink bg-ink text-white font-bold")
                      : (isEngineeringMode ? "border-steel/30 text-steel hover:border-steel hover:bg-white/5" : "border-slate-200 text-steel hover:border-ink hover:text-ink")
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={`flex justify-between text-xs font-medium mb-4 uppercase tracking-wider ${isEngineeringMode ? 'text-steel' : 'text-steel'}`}>
              <span>Target Volume (Units)</span>
              <span className={`font-bold ${isEngineeringMode ? 'text-white' : 'text-ink'}`}>{volume.toLocaleString()}</span>
            </label>
            <input 
              type="range" 
              min="1000" 
              max="200000" 
              step="1000"
              value={volume} 
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full accent-accent h-1 bg-slate-200 appearance-none cursor-pointer"
            />
          </div>
        </div>

        <div className={`mt-12 pt-8 border-t ${isEngineeringMode ? 'border-steel/50' : 'border-slate-200'}`}>
          <p className={`text-xs uppercase tracking-widest mb-6 ${isEngineeringMode ? 'text-steel' : 'text-steel'}`}>
            Live Production Blueprint
          </p>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={category + volume}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-2 gap-6"
            >
              <div>
                <p className={`text-xs uppercase mb-2 ${isEngineeringMode ? 'text-steel' : 'text-steel'}`}>Est. Unit Cost</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-display">
                    ${estimate.priceMin}
                  </span>
                  <span className={isEngineeringMode ? 'text-steel' : 'text-slate-400'}>–</span>
                  <span className="text-xl">
                    ${estimate.priceMax}
                  </span>
                </div>
              </div>

              <div>
                <p className={`text-xs uppercase mb-2 ${isEngineeringMode ? 'text-steel' : 'text-steel'}`}>Lead Time</p>
                <div className="text-2xl font-display">
                  {estimate.leadTime}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10">
            <button className={`w-full py-4 text-sm font-medium flex items-center justify-center gap-3 transition-colors group ${
              isEngineeringMode 
                ? 'bg-accent/20 border border-accent text-accent hover:bg-accent hover:text-ink'
                : 'bg-ink text-white hover:bg-accent hover:text-ink'
            }`}>
              START RFQ PROCESS
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
