"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Download, ChevronDown } from "lucide-react";

const ledProducts = [
  {
    id: "led-bulb",
    name: "LED Bulbs",
    range: "3W – 20W",
    image: "/img2/16.png",
    bg: "bg-[#0a0a0a]",
    description: "Standard A-type and speciality LED bulbs for residential and commercial applications. Available in E27, B22, and custom bases.",
    specs: [
      { label: "Wattage Range", value: "3W – 20W" },
      { label: "Lumens", value: "250 – 2000 lm" },
      { label: "CCT Options", value: "2700K / 4000K / 6500K" },
      { label: "CRI", value: "≥80 Ra" },
      { label: "Input Voltage", value: "160–260V AC" },
      { label: "Certification", value: "BIS, CE" },
    ],
  },
  {
    id: "led-batten",
    name: "LED Battens",
    range: "10W – 40W",
    image: "/img2/17.png",
    bg: "bg-[#f5f5f3]",
    description: "Surface-mount and recessed LED battens for retail, office, and industrial lighting. Single-piece polycarbonate body, driver integrated.",
    specs: [
      { label: "Wattage Range", value: "10W – 40W" },
      { label: "Length", value: "600mm / 1200mm / 1500mm" },
      { label: "Luminous Efficacy", value: "≥100 lm/W" },
      { label: "IP Rating", value: "IP20 / IP65" },
      { label: "Driver", value: "In-built constant current" },
      { label: "Certification", value: "BIS, CE" },
    ],
  },
  {
    id: "flood",
    name: "Flood & Street Lights",
    range: "20W – 200W",
    image: "/img2/8.jpg",
    bg: "bg-[#14151a]",
    description: "High-lumen outdoor luminaires with die-cast aluminium housings and IP65 protection for industrial sites, streets, and perimeter lighting.",
    specs: [
      { label: "Wattage Range", value: "20W – 200W" },
      { label: "Lumens", value: "2000 – 22000 lm" },
      { label: "IP Rating", value: "IP65" },
      { label: "Beam Angle", value: "60° / 90° / 120°" },
      { label: "Housing", value: "Die-cast aluminium" },
      { label: "Certification", value: "BIS, CE" },
    ],
  },
];

export default function LEDLightingPage() {
  const [activeProduct, setActiveProduct] = useState(ledProducts[0]);
  const [specsOpen, setSpecsOpen] = useState(false);

  return (
    <div className="bg-paper text-ink min-h-screen">

      {/* Header */}
      <div className="bg-ink text-paper pt-40 pb-24">
        <div className="container-wide">
          <p className="font-mono text-accent text-sm uppercase tracking-widest mb-6 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-accent inline-block" />
            OEM Division 02
          </p>
          <h1 className="text-5xl md:text-7xl font-display font-medium mb-6 max-w-3xl leading-tight">
            LED Lighting Solutions
          </h1>
          <p className="text-white/60 text-xl max-w-2xl">
            Fully BIS-certified, white-label ready. From 3W residential bulbs to 200W industrial flood lights — all manufactured and tested in-house at our Daman campus.
          </p>
        </div>
      </div>

      {/* Interactive Product Selector */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Left: Product Image */}
            <div className={`relative aspect-[3/4] overflow-hidden ${activeProduct.bg}`}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProduct.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={activeProduct.image}
                    alt={activeProduct.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain p-12"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Product Details */}
            <div className="flex flex-col gap-8 pt-4">

              {/* Product Tabs */}
              <div className="flex gap-0 border border-steel/20 w-full">
                {ledProducts.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => { setActiveProduct(p); setSpecsOpen(false); }}
                    className={`flex-1 py-3 text-sm font-medium transition-colors border-r last:border-r-0 border-steel/20 ${
                      activeProduct.id === p.id ? "bg-ink text-white" : "text-steel hover:bg-mist"
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>

              {/* Product Info */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProduct.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <h2 className="text-4xl font-display font-medium">{activeProduct.name}</h2>
                    <span className="font-mono text-sm text-steel border border-steel/30 px-3 py-1">{activeProduct.range}</span>
                  </div>
                  <p className="text-steel text-lg mb-10 leading-relaxed">{activeProduct.description}</p>

                  {/* Specs Accordion */}
                  <div className="border border-steel/20 mb-8">
                    <button
                      onClick={() => setSpecsOpen(!specsOpen)}
                      className="w-full flex justify-between items-center px-6 py-4 font-medium hover:bg-mist/50 transition-colors"
                    >
                      <span className="font-mono text-sm uppercase tracking-wider text-steel">Technical Specification</span>
                      <ChevronDown className={`w-5 h-5 text-steel transition-transform ${specsOpen ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {specsOpen && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-steel/20 divide-y divide-steel/10">
                            {activeProduct.specs.map((spec) => (
                              <div key={spec.label} className="flex justify-between px-6 py-4">
                                <span className="text-sm text-steel font-mono">{spec.label}</span>
                                <span className="text-sm font-medium text-ink">{spec.value}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/rfq"
                      className="bg-accent text-white px-8 py-4 font-medium flex items-center justify-center gap-3 hover:bg-orange-600 transition-colors"
                    >
                      Request OEM Quote <ArrowRight className="w-4 h-4" />
                    </Link>
                    <button className="border border-steel/30 px-8 py-4 font-medium flex items-center justify-center gap-3 hover:bg-mist transition-colors text-steel">
                      Download Datasheet <Download className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Why OEM with Sheetal */}
      <section className="bg-ink text-paper py-24">
        <div className="container-wide">
          <h2 className="text-3xl md:text-5xl font-display mb-16 max-w-xl">Why leading brands choose us for LED OEM.</h2>
          <div className="grid md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {[
              { title: "Your Brand, Our Factory", body: "Complete white-label service. Your logos, cartons, and documentation — handled in-house with zero MOQ on label changes." },
              { title: "BIS-Ready Stock", body: "Pre-certified LED components are held in buffer stock for faster production cycles on repeat orders." },
              { title: "Surge Tested, Grid Proven", body: "Every driver is tested to survive Indian grid fluctuations up to 4kV, reducing field failure rates to near zero." },
            ].map((item) => (
              <div key={item.title} className="p-10">
                <h4 className="font-display text-xl font-medium mb-4 text-white">{item.title}</h4>
                <p className="text-white/60 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
