"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ProductsHub() {
  const [hoveredSide, setHoveredSide] = useState<"left" | "right" | null>(null);

  return (
    <div className="w-full h-screen flex flex-col md:flex-row bg-ink overflow-hidden pt-20 md:pt-0">
      
      {/* LEFT SIDE: Rigid Packaging */}
      <Link 
        href="/products/rigid-packaging"
        className={`relative flex flex-col justify-center transition-all duration-700 ease-in-out cursor-pointer group ${
          hoveredSide === "left" ? "md:w-[65%]" : hoveredSide === "right" ? "md:w-[35%]" : "md:w-1/2"
        } h-1/2 md:h-full border-b md:border-b-0 md:border-r border-white/10`}
        onMouseEnter={() => setHoveredSide("left")}
        onMouseLeave={() => setHoveredSide(null)}
      >
        {/* Image Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className={`absolute inset-0 bg-ink transition-opacity duration-700 z-10 ${
            hoveredSide === "right" ? "opacity-80" : "opacity-30 group-hover:opacity-10"
          }`} />
          <Image
            src="/img2/4.png"
            alt="Rigid Plastic Packaging"
            fill
            sizes="(max-width: 768px) 100vw, 65vw"
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            priority
          />
        </div>

        {/* Content */}
        <div className="relative z-20 p-8 md:p-16 lg:p-24 w-full max-w-2xl mx-auto flex flex-col items-center md:items-start text-center md:text-left transition-transform duration-500">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="font-mono text-accent text-sm uppercase tracking-widest mb-4">
              OEM Division 01
            </p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-medium text-white mb-6 leading-tight">
              Rigid Plastic Packaging
            </h2>
            <p className={`text-white/70 text-lg transition-all duration-500 max-w-md ${
              hoveredSide === "right" ? "opacity-0 h-0 overflow-hidden" : "opacity-100 mb-8"
            }`}>
              Precision-moulded cosmetic jars, pharmaceutical bottles, and industrial containers. Food-grade, sterile, and highly customizable.
            </p>
            
            <div className={`flex items-center gap-4 text-white font-medium border border-white/20 px-8 py-4 w-max transition-all duration-300 ${
              hoveredSide === "left" ? "bg-white text-ink" : "hover:bg-white/10"
            }`}>
              Explore Portfolio
              <ArrowRight className={`w-5 h-5 transition-transform ${hoveredSide === "left" ? "translate-x-1" : ""}`} />
            </div>
          </motion.div>
        </div>
      </Link>

      {/* RIGHT SIDE: LED Lighting */}
      <Link 
        href="/products/led-lighting"
        className={`relative flex flex-col justify-center transition-all duration-700 ease-in-out cursor-pointer group ${
          hoveredSide === "right" ? "md:w-[65%]" : hoveredSide === "left" ? "md:w-[35%]" : "md:w-1/2"
        } h-1/2 md:h-full`}
        onMouseEnter={() => setHoveredSide("right")}
        onMouseLeave={() => setHoveredSide(null)}
      >
        {/* Image Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className={`absolute inset-0 bg-ink transition-opacity duration-700 z-10 ${
            hoveredSide === "left" ? "opacity-80" : "opacity-40 group-hover:opacity-10"
          }`} />
          <Image
            src="/img2/5.png"
            alt="LED Lighting Products"
            fill
            sizes="(max-width: 768px) 100vw, 65vw"
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            priority
          />
        </div>

        {/* Content */}
        <div className="relative z-20 p-8 md:p-16 lg:p-24 w-full max-w-2xl mx-auto flex flex-col items-center md:items-start text-center md:text-left transition-transform duration-500">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="font-mono text-accent text-sm uppercase tracking-widest mb-4">
              OEM Division 02
            </p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-medium text-white mb-6 leading-tight">
              LED Lighting Solutions
            </h2>
            <p className={`text-white/70 text-lg transition-all duration-500 max-w-md ${
              hoveredSide === "left" ? "opacity-0 h-0 overflow-hidden" : "opacity-100 mb-8"
            }`}>
              From 3W domestic bulbs to high-lumen industrial flood lights. Fully tested, BIS-certified, and ready for your brand label.
            </p>
            
            <div className={`flex items-center gap-4 text-white font-medium border border-white/20 px-8 py-4 w-max transition-all duration-300 ${
              hoveredSide === "right" ? "bg-accent border-accent text-white" : "hover:bg-white/10"
            }`}>
              Explore Portfolio
              <ArrowRight className={`w-5 h-5 transition-transform ${hoveredSide === "right" ? "translate-x-1" : ""}`} />
            </div>
          </motion.div>
        </div>
      </Link>
      
    </div>
  );
}
