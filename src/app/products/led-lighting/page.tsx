"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows, OrbitControls } from "@react-three/drei";
import { ProceduralBulb } from "@/components/ProceduralBulb";
import { ArrowRight, Download, ChevronDown } from "lucide-react";

const ledProducts = [
  {
    id: "led-bulb",
    name: "LED Bulbs",
    range: "3W – 20W",
    image: "/images/led_bulb_product.jpg",
    bg: "bg-[#0a0a0a]",
    description: "LED bulbs are a type of energy-efficient lighting that use light-emitting diodes (LEDs) to produce light. They are designed to replace traditional incandescent bulbs and are becoming increasingly popular due to their energy efficiency, long lifespan, and cost savings.",
    specsImage: "/images/led-bulb_specs.png",
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
    id: "smart-bulb",
    name: "Smart LED Bulb",
    range: "7W – 12W",
    image: "/images/smart-bulb.png",
    bg: "bg-[#14151a]",
    description: "Smart LED bulbs are a type of light bulb that can be controlled remotely through a smartphone app or voice assistant, such as Amazon Alexa or Google Assistant. They typically connect to your home's Wi-Fi network, allowing you to turn them on or off, adjust their brightness, and even change their color using your smartphone or voice commands.",
    specsImage: "/images/smart-bulb_specs.png",
    specs: [
      { label: "Wattage Range", value: "7W – 12W" },
      { label: "Colors", value: "16 Million RGB + CCT" },
      { label: "Connectivity", value: "Wi-Fi 2.4GHz / BLE" },
      { label: "CRI", value: "≥80 Ra" },
      { label: "Input Voltage", value: "160–260V AC" },
      { label: "Certification", value: "BIS, CE, RoHS" },
    ],
    explodedView: "/images/smart_bulb_exploded.png",
  },
  {
    id: "led-batten",
    name: "LED Battens",
    range: "10W – 40W",
    image: "/images/led_batten_product.jpg",
    bg: "bg-[#f5f5f3]",
    description: "LED batten lights are an energy-efficient alternative to traditional fluorescent tube lights. They offer bright, uniform light that is ideal for indoor lighting applications.",
    specsImage: "/images/led-batten_specs.png",
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
    id: "flood-well",
    name: "Flood & Well Light",
    range: "20W – 200W",
    image: "/images/flood-well.png",
    bg: "bg-[#14151a]",
    description: "LED flood and well lights are outdoor lighting fixtures that are designed to illuminate large areas with high-intensity, directional light.",
    specsImage: "/images/flood-well_specs.png",
    specs: [
      { label: "Wattage Range", value: "20W – 200W" },
      { label: "Lumens", value: "2000 – 22000 lm" },
      { label: "IP Rating", value: "IP65" },
      { label: "Beam Angle", value: "60° / 90° / 120°" },
      { label: "Housing", value: "Die-cast aluminium" },
      { label: "Certification", value: "BIS, CE" },
    ],
  },
  {
    id: "street",
    name: "LED Street Light",
    range: "20W – 150W",
    image: "/images/street_light.png",
    bg: "bg-[#0a0a0a]",
    description: "LED street lights are a type of outdoor lighting fixture that are designed to provide high-quality illumination on public streets and highways. They are designed to be energy-efficient and long-lasting, making them a popular alternative to traditional street lighting options.",
    specsImage: "/images/street_light_specs.png",
    specs: [
      { label: "Wattage Range", value: "20W, 30W, 50W, 100W, 150W" },
      { label: "CCT (K)", value: "6500K" },
      { label: "Efficacy (lm/W)", value: "100" },
      { label: "Beam Angle", value: "120°" },
      { label: "Voltage (V)", value: "100-300" },
      { label: "IP Rating", value: "IP 66" },
      { label: "Surge Limit", value: "5KV" },
      { label: "Material", value: "All Die Cast" },
    ],
    explodedView: "/images/led_exploded_view.jpg",
  },
  {
    id: "spot",
    name: "LED Spot Light",
    range: "3W – 15W",
    image: "/images/spot.png",
    bg: "bg-[#1a1a1a]",
    description: "LED spot lights are a type of LED lighting fixture that are designed to provide focused, directional illumination in a specific area. They are commonly used in homes, offices, and commercial buildings to highlight artwork, displays, and architectural features.",
    specsImage: "/images/spot_specs.png",
    specs: [
      { label: "Wattage Range", value: "3W – 15W" },
      { label: "Beam Angle", value: "15° / 24° / 36°" },
      { label: "CCT Options", value: "3000K / 4000K" },
      { label: "CRI", value: "≥90 Ra" },
      { label: "Mounting", value: "Track or Surface mount" },
      { label: "Certification", value: "BIS, CE" },
    ],
  },
  {
    id: "decorative",
    name: "Decorative Light",
    range: "Varies",
    image: "/images/decorative.png",
    bg: "bg-[#f5f5f3]",
    description: "LED decorative lights are a type of LED lighting fixture that are designed to provide decorative and ambient lighting in various indoor settings. They are commonly used in homes, restaurants, hotels, and event venues to create an inviting and festive atmosphere.",
    specsImage: "/images/decorative_specs.png",
    specs: [
      { label: "Applications", value: "Hospitality, Residential" },
      { label: "Styles", value: "Pendant, Wall Sconce, Chandelier" },
      { label: "CCT Options", value: "2700K / 3000K" },
      { label: "Dimming", value: "Triac / 0-10V / DALI" },
      { label: "Material", value: "Glass, Aluminum, Brass" },
      { label: "Certification", value: "BIS, CE" },
    ],
  },
  {
    id: "ceiling",
    name: "LED Ceiling Light",
    range: "12W – 36W",
    image: "/images/ceiling.png",
    bg: "bg-[#0a0a0a]",
    description: "LED ceiling lights are a type of lighting fixture that are installed onto ceilings and used to provide ambient lighting for various indoor spaces such as homes, offices, and commercial buildings. They are designed to be energy-efficient, durable, and long-lasting, making them a popular alternative to traditional lighting options.",
    specsImage: "/images/ceiling_specs.png",
    specs: [
      { label: "Wattage Range", value: "12W – 36W" },
      { label: "Shape", value: "Round, Square" },
      { label: "Mounting", value: "Surface Mounted" },
      { label: "Luminous Efficacy", value: "≥90 lm/W" },
      { label: "Diffuser", value: "Polycarbonate / Acrylic" },
      { label: "Certification", value: "BIS, CE" },
    ],
  },
  {
    id: "down-light",
    name: "LED Down Light",
    range: "6W – 24W",
    image: "/images/down-light.png",
    bg: "bg-[#f5f5f3]",
    description: "LED downlights are a type of lighting fixture that is installed in ceilings or walls to provide directional lighting. They are a popular choice for both residential and commercial applications, as they are energy-efficient, long-lasting, and offer a range of customization options.",
    specsImage: "/images/down-light_specs.png",
    specs: [
      { label: "Wattage Range", value: "6W – 24W" },
      { label: "Cut-out Sizes", value: "3 inch - 8 inch" },
      { label: "Mounting", value: "Recessed with spring clips" },
      { label: "CRI", value: "≥80 Ra" },
      { label: "Driver", value: "External/Internal Isolated" },
      { label: "Certification", value: "BIS, CE" },
    ],
  },
  {
    id: "extension-board",
    name: "Extension Board",
    range: "Various",
    image: "/images/products_led.jpg",
    bg: "bg-[#0a0a0a]",
    description: "High-quality, heavy-duty electrical extension boards with surge protection, multiple universal sockets, and flame-retardant casing.",
    specs: [
      { label: "Sockets", value: "3 / 4 / 6 way universal" },
      { label: "Cable Length", value: "1.5m / 3m / 5m" },
      { label: "Max Load", value: "2500W / 10A" },
      { label: "Protection", value: "Overload & Surge protection" },
      { label: "Housing", value: "Fire-retardant Polycarbonate" },
      { label: "Certification", value: "BIS, CE" },
    ],
  },
  {
    id: "surface-ring",
    name: "Surface Ring",
    range: "Compatible",
    image: "/images/products_led.jpg",
    bg: "bg-[#14151a]",
    description: "Architectural surface mounting rings for converting recessed downlights into surface-mounted fixtures on solid ceilings.",
    specs: [
      { label: "Compatibility", value: "3 inch - 8 inch downlights" },
      { label: "Material", value: "Powder-coated Aluminium" },
      { label: "Colors", value: "White / Black / Custom" },
      { label: "Mounting", value: "Screw mount" },
      { label: "Application", value: "Concrete ceilings" },
      { label: "Durability", value: "Rust and corrosion resistant" },
    ],
  },
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
                  {activeProduct.id === "led-bulb" ? (
                    <div className="w-full h-full p-4">
                      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} shadows className="w-full h-full cursor-grab active:cursor-grabbing">
                        <ambientLight intensity={0.6} />
                        <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow shadow-mapSize={[1024, 1024]} />
                        <directionalLight position={[-10, -10, -5]} intensity={0.8} color="#3b82f6" />
                        
                        <ProceduralBulb autoRotate />
                        
                        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
                        
                        <Environment preset="studio" />
                        <ContactShadows position={[0, -2.5, 0]} opacity={0.5} scale={10} blur={2.5} far={4} resolution={256} color="#0f172a" />
                      </Canvas>
                    </div>
                  ) : (
                    <Image
                      src={activeProduct.image}
                      alt={activeProduct.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-contain p-12"
                    />
                  )}
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
