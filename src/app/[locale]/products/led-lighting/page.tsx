"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Download, ChevronDown } from "lucide-react";

const ledProducts = [
  {
    id: "led-batten",
    name: "Led Batten",
    range: "10W – 40W",
    image: "/images/legacy/10-3.webp",
    bg: "bg-[#3d4231]",
    description: "LED batten lights are an energy-efficient alternative to traditional fluorescent tube lights.",
    specs: [
      { label: "Wattage Range", value: "10W – 40W" },
      { label: "Length", value: "600mm / 1200mm / 1500mm" },
      { label: "Luminous Efficacy", value: "≥100 lm/W" },
      { label: "IP Rating", value: "IP20 / IP65" },
      { label: "Certification", value: "BIS, CE" },
    ],
  },
  {
    id: "high-power-led-batten",
    name: "High Power Led Batten",
    range: "30W – 60W",
    image: "/images/legacy/4-3.webp",
    bg: "bg-[#3d4231]",
    description: "High intensity LED battens for large indoor areas and industrial spaces, offering excellent durability.",
    specs: [
      { label: "Wattage Range", value: "30W – 60W" },
      { label: "Length", value: "1200mm / 1500mm" },
      { label: "Luminous Efficacy", value: "≥120 lm/W" },
      { label: "Housing", value: "Aluminum Extrusion" },
    ],
  },
  {
    id: "led-decorative-light",
    name: "Led Decorative Light",
    range: "Varies",
    image: "/images/legacy/11-jpg.webp",
    bg: "bg-white",
    description: "LED decorative lights are a type of LED lighting fixture that provide decorative and ambient lighting in various indoor settings.",
    specs: [
      { label: "Applications", value: "Hospitality, Residential" },
      { label: "Styles", value: "Pendant, Wall Sconce, Chandelier" },
    ],
  },
  {
    id: "led-strip-light",
    name: "Led Strip Light",
    range: "5m – 50m rolls",
    image: "/images/legacy/Photo11.webp",
    bg: "bg-white",
    description: "Flexible LED strip lights for cove lighting, architectural accents, and decorative applications.",
    specs: [
      { label: "LED Type", value: "SMD 2835 / 5050" },
      { label: "LED Density", value: "60/120/240 LEDs per meter" },
      { label: "Voltage", value: "12V DC / 24V DC / 220V AC" },
    ],
  },
  {
    id: "led-bulb",
    name: "Led Bulb",
    range: "3W – 15W",
    image: "/images/legacy/Photo13.webp",
    bg: "bg-[#717478]",
    description: "Standard LED bulbs with energy-efficient illumination for daily residential and commercial use.",
    specs: [
      { label: "Wattage Range", value: "3W, 5W, 7W, 9W, 12W, 15W" },
      { label: "Base Type", value: "B22 / E27" },
    ],
  },
  {
    id: "led-bulb-2",
    name: "Led Bulb 2",
    range: "5W – 18W",
    image: "/images/legacy/Photo15.webp", 
    bg: "bg-[#433b2e]",
    description: "Premium LED bulbs offering higher lumens and a sleeker design for modern spaces.",
    specs: [
      { label: "Wattage Range", value: "5W – 18W" },
      { label: "Base Type", value: "B22 / E27" },
    ],
  },
  {
    id: "high-power-led-bulb",
    name: "High Power Led Bulb",
    range: "30W – 150W",
    image: "/images/legacy/po-jpg.webp",
    bg: "bg-[#3d4231]",
    description: "High-wattage LED bulbs designed for large spaces such as warehouses, industrial sheds, and high-ceiling environments.",
    specs: [
      { label: "Wattage Range", value: "30W, 40W, 50W, 80W, 100W, 150W" },
      { label: "Luminous Efficacy", value: "≥110 lm/W" },
      { label: "Base Type", value: "B22 / E27 / E40" },
    ],
  },
  {
    id: "led-emergency-bulb",
    name: "Led Emergency Bulb",
    range: "9W – 15W",
    image: "/images/legacy/Photo10.webp",
    bg: "bg-[#3d4231]",
    description: "Inverter LED bulbs with a built-in lithium-ion battery for backup lighting during grid outages.",
    specs: [
      { label: "Wattage", value: "9W, 12W, 15W" },
      { label: "Backup Time", value: "Up to 4 hours" },
    ],
  },
  {
    id: "led-candle-bulb",
    name: "Led Candle Bulb",
    range: "3W – 7W",
    image: "/images/legacy/3-3.webp",
    bg: "bg-[#717478]",
    description: "Elegant LED candle bulbs designed for chandeliers and decorative wall sconces.",
    specs: [
      { label: "Wattage Range", value: "3W, 5W, 7W" },
      { label: "Base Type", value: "E14 / E27 / B22" },
      { label: "Shape", value: "Candle, Flame tip" },
    ],
  },
  {
    id: "led-spot-g9",
    name: "Led Spot & G9 Bulb",
    range: "3W – 15W",
    image: "/images/legacy/9-3.webp",
    bg: "bg-[#3d4231]",
    description: "Compact Led Spot and G9 bulbs for directional and precise illumination in decorative fixtures.",
    specs: [
      { label: "Wattage Range", value: "3W – 15W" },
      { label: "Base Type", value: "G9 / GU10" },
    ],
  },
  {
    id: "led-street-light",
    name: "Led Street Light",
    range: "20W – 150W",
    image: "/images/legacy/1-3.webp",
    bg: "bg-[#3d4231]",
    description: "LED street lights provide high-quality illumination on public streets and highways.",
    specs: [
      { label: "Wattage Range", value: "20W - 150W" },
      { label: "IP Rating", value: "IP 66" },
      { label: "Surge Limit", value: "5KV" },
    ],
  },
  {
    id: "well-glass-flood",
    name: "Well Glass & Flood li.",
    range: "20W – 200W",
    image: "/images/legacy/9-2.webp",
    bg: "bg-[#3d4231]",
    description: "Outdoor lighting fixtures designed to illuminate large areas with high-intensity, directional light.",
    specs: [
      { label: "Wattage Range", value: "20W – 200W" },
      { label: "IP Rating", value: "IP65" },
    ],
  },
  {
    id: "extension-board",
    name: "Extension Board",
    range: "Various",
    image: "/images/legacy/exension-board-jpg.webp",
    bg: "bg-[#394234]",
    description: "High-quality, heavy-duty electrical extension boards with surge protection.",
    specs: [
      { label: "Sockets", value: "3 / 4 / 6 way universal" },
      { label: "Protection", value: "Overload & Surge protection" },
    ],
  },
  {
    id: "led-down-lighter",
    name: "Led Down Lighter",
    range: "6W – 24W",
    image: "/images/legacy/9-jpg.webp",
    bg: "bg-[#7a7c7b]",
    description: "Premium downlighter with copper interior finish for elegant architectural lighting.",
    specs: [
      { label: "Wattage Range", value: "6W – 24W" },
      { label: "Housing", value: "Die-cast Aluminum" },
    ],
  },
  {
    id: "led-down-lighter-2",
    name: "Led Down Lighter-2",
    range: "3W – 18W",
    image: "/images/legacy/Photo1.webp",
    bg: "bg-[#fefefe]",
    description: "Deep-recessed LED down lighters with specialized reflectors for low glare.",
    specs: [
      { label: "Wattage Range", value: "3W, 6W, 12W, 15W, 18W" },
      { label: "Shape", value: "Round / Square" },
    ],
  },
  {
    id: "led-down-lighter-3",
    name: "Led Down Lighter-3",
    range: "6W – 24W",
    image: "/images/legacy/10-jpg.webp",
    bg: "bg-[#fefefe]",
    description: "Standard recessed LED downlights for commercial and residential applications.",
    specs: [
      { label: "Wattage Range", value: "6W – 24W" },
      { label: "Cut-out Sizes", value: "3 inch - 8 inch" },
    ],
  },
  {
    id: "led-ceiling-light",
    name: "Led Ceiling Light",
    range: "12W – 36W",
    image: "/images/legacy/ceiling-jpg.webp",
    bg: "bg-[#fdfdfd]",
    description: "LED ceiling lights installed onto ceilings for ambient lighting in indoor spaces.",
    specs: [
      { label: "Wattage Range", value: "12W – 36W" },
      { label: "Shape", value: "Square" },
    ],
  },
  {
    id: "smart-led-bulb",
    name: "Smart Led Bulb",
    range: "7W – 12W",
    image: "/images/legacy/Photo14.webp",
    bg: "bg-white",
    description: "Smart LED bulbs offering 16 million colors and CCT tuning via Wi-Fi connectivity.",
    specs: [
      { label: "Wattage Range", value: "7W – 12W" },
      { label: "Colors", value: "16 Million RGB + CCT" },
      { label: "Connectivity", value: "Wi-Fi 2.4GHz / BLE" },
    ],
  }
];

export default function LEDLightingPage() {
  const [activeProduct, setActiveProduct] = useState(ledProducts[0]);
  const [specsOpen, setSpecsOpen] = useState(false);

  return (
    <div className="bg-paper text-ink min-h-screen">

      {/* Header */}
      <div className="bg-mist text-ink pt-40 pb-24">
        <div className="container-wide">
          <p className="font-mono text-accent text-sm uppercase tracking-widest mb-6 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-accent inline-block" />
            OEM Division 02
          </p>
          <h1 className="text-5xl md:text-7xl font-display font-medium mb-6 max-w-3xl leading-tight">
            LED Lighting Solutions
          </h1>
          <p className="text-ink/60 text-xl max-w-2xl">
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
              <div className="flex flex-wrap gap-2 w-full">
                {ledProducts.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => { setActiveProduct(p); setSpecsOpen(false); }}
                    className={`px-5 py-2.5 text-sm font-medium transition-all rounded-full border ${
                      activeProduct.id === p.id 
                        ? "bg-paper text-ink border border-slate-200 shadow-[0_0_15px_rgba(255,255,255,0.1)]" 
                        : "glass text-steel border-steel/20 hover:border-steel/40 hover:text-ink"
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>

              {/* Product Info */}
              <div className="grid">
                <AnimatePresence>
                  <motion.div
                    key={activeProduct.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="col-start-1 row-start-1"
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
                          <div className="border-t border-steel/20 p-4">
                            {/* @ts-ignore - Ignore optional specsImage typing issues temporarily */}
                            {activeProduct.specsImage ? (
                              <Image 
                                src={(activeProduct as any).specsImage} 
                                alt={`${activeProduct.name} specs`} 
                                width={800} 
                                height={400} 
                                className="w-full h-auto object-contain bg-white mix-blend-multiply" 
                              />
                            ) : (
                              <div className="divide-y divide-steel/10 -mx-4 -my-4">
                                {activeProduct.specs.map((spec) => (
                                  <div key={spec.label} className="flex justify-between px-6 py-4">
                                    <span className="text-sm text-steel font-mono">{spec.label}</span>
                                    <span className="text-sm font-medium text-ink">{spec.value}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Product Anatomy Accordion (if available) */}
                  {/* @ts-ignore */}
                  {activeProduct.explodedView && (
                    <div className="border border-steel/20 mb-8 glass-card">
                      <button
                        onClick={() => {
                          const el = document.getElementById("anatomy-content");
                          if (el) {
                            if (el.style.height === "0px" || !el.style.height) {
                              el.style.height = "auto";
                            } else {
                              el.style.height = "0px";
                            }
                          }
                        }}
                        className="w-full flex justify-between items-center px-6 py-4 font-medium hover:bg-slate-50 transition-colors"
                      >
                        <span className="font-mono text-sm uppercase tracking-wider text-accent">Product Anatomy</span>
                        <ChevronDown className={`w-5 h-5 text-accent transition-transform`} />
                      </button>
                      <div id="anatomy-content" className="overflow-hidden transition-all duration-300" style={{ height: "auto" }}>
                        <div className="border-t border-steel/20 p-4 bg-slate-50 rounded-b-xl">
                          <Image 
                            // @ts-ignore
                            src={activeProduct.explodedView} 
                            alt={`${activeProduct.name} Exploded View`} 
                            width={800} 
                            height={800} 
                            className="w-full h-auto object-contain rounded-lg" 
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/rfq"
                      className="bg-accent text-ink px-8 py-4 font-medium flex items-center justify-center gap-3 hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all rounded-full"
                    >
                      Request OEM Quote <ArrowRight className="w-4 h-4" />
                    </Link>
                    <button className="glass px-8 py-4 font-medium flex items-center justify-center gap-3 hover:bg-slate-100 transition-colors text-ink rounded-full">
                      Download Datasheet <Download className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why OEM with Sheetal */}
      <section className="bg-mist text-ink py-24">
        <div className="container-wide">
          <h2 className="text-3xl md:text-5xl font-display mb-16 max-w-xl">Why leading brands choose us for LED OEM.</h2>
          <div className="grid md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {[
              { title: "Your Brand, Our Factory", body: "Complete white-label service. Your logos, cartons, and documentation — handled in-house with zero MOQ on label changes." },
              { title: "BIS-Ready Stock", body: "Pre-certified LED components are held in buffer stock for faster production cycles on repeat orders." },
              { title: "Surge Tested, Grid Proven", body: "Every driver is tested to survive Indian grid fluctuations up to 4kV, reducing field failure rates to near zero." },
            ].map((item) => (
              <div key={item.title} className="p-10">
                <h4 className="font-display text-xl font-medium mb-4 text-ink">{item.title}</h4>
                <p className="text-ink/60 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
