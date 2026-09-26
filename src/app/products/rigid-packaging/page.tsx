"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Download, ChevronDown } from "lucide-react";

const packagingProducts = [
  {
    id: "cosmetic-jars",
    name: "Cosmetic Jars",
    range: "15ml – 500ml",
    image: "/jar_product.jpg",
    bg: "bg-white",
    description: "Premium acrylic and PET cosmetic jars with hermetically sealed lids. Available in round, square, and custom geometries. Food and cosmetic grade compliant.",
    specs: [
      { label: "Volume Range", value: "15ml – 500ml" },
      { label: "Material", value: "PET, Acrylic, PP" },
      { label: "Neck Finishes", value: "28mm, 38mm, 58mm, custom" },
      { label: "Wall Thickness", value: "0.8mm – 2.5mm" },
      { label: "Colour Matching", value: "Pantone (96hr turnaround)" },
      { label: "Compliance", value: "Food-grade / Cosmetic-grade" },
    ],
  },
  {
    id: "pharma-bottles",
    name: "Pharma Bottles",
    range: "30ml – 2L",
    image: "/products_packaging.jpg",
    bg: "bg-[#f0f4f8]",
    description: "High-density polyethylene bottles for pharmaceutical and nutraceutical applications. Child-resistant caps, tamper-evident seals, and full documentation.",
    specs: [
      { label: "Volume Range", value: "30ml – 2L" },
      { label: "Material", value: "HDPE, PET" },
      { label: "Cap Options", value: "CRC, push-pull, flip-top" },
      { label: "Colour", value: "Amber, clear, white, custom" },
      { label: "Testing", value: "Vacuum leak, drop, compression" },
      { label: "Compliance", value: "USP, IP grade resin" },
    ],
  },
  {
    id: "industrial",
    name: "Industrial Containers",
    range: "1L – 20L",
    image: "/moulding_factory.jpg",
    bg: "bg-[#1a1f23]",
    description: "Heavy-wall HDPE jerrycans and pails for lubricants, agrochemicals, and industrial liquids. UN-certified options available for hazardous goods.",
    specs: [
      { label: "Volume Range", value: "1L – 20L" },
      { label: "Material", value: "HDPE, PP" },
      { label: "Wall Thickness", value: "2mm – 5mm" },
      { label: "Handle Options", value: "Integrated / swing" },
      { label: "UN Certification", value: "Available on request" },
      { label: "Stacking Load", value: "Up to 8 layers" },
    ],
  },
];

export default function RigidPackagingPage() {
  const [activeProduct, setActiveProduct] = useState(packagingProducts[0]);
  const [specsOpen, setSpecsOpen] = useState(false);

  return (
    <div className="bg-paper text-ink min-h-screen">

      {/* Header */}
      <div className="bg-ink text-paper pt-40 pb-24">
        <div className="container-wide">
          <p className="font-mono text-accent text-sm uppercase tracking-widest mb-6 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-accent inline-block" />
            OEM Division 01
          </p>
          <h1 className="text-5xl md:text-7xl font-display font-medium mb-6 max-w-3xl leading-tight">
            Rigid Plastic Packaging
          </h1>
          <p className="text-white/60 text-xl max-w-2xl">
            Precision blow-moulded and injection-moulded containers for cosmetics, pharmaceuticals, and industrial applications. Virgin resin, full traceability, custom geometries.
          </p>
        </div>
      </div>

      {/* Interactive Product Selector */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Left: Image */}
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
                    className="object-contain p-12"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Details */}
            <div className="flex flex-col gap-8 pt-4">
              <div className="flex gap-0 border border-steel/20 w-full">
                {packagingProducts.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => { setActiveProduct(p); setSpecsOpen(false); }}
                    className={`flex-1 py-3 text-xs font-medium transition-colors border-r last:border-r-0 border-steel/20 ${
                      activeProduct.id === p.id ? "bg-ink text-white" : "text-steel hover:bg-mist"
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>

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

      {/* Capabilities Strip */}
      <section className="bg-ink text-paper py-24">
        <div className="container-wide">
          <h2 className="text-3xl md:text-5xl font-display mb-16 max-w-xl">End-to-end packaging capability.</h2>
          <div className="grid md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {[
              { title: "In-House Mould Design", body: "Custom geometries designed and tooled within our facility. No third-party mould shops, no IP leakage." },
              { title: "Inline Decoration", body: "Hot-stamp, laser engraving, and silk-screen printing performed immediately after forming on the same production line." },
              { title: "100% Leak Testing", body: "Every container goes through vacuum chamber testing. Zero compromised units leave the facility." },
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
