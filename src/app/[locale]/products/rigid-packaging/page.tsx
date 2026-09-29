"use client";

import { Link } from "@/i18n/routing";
import { ArrowRight, Box, Package, Layers, Hexagon } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const subCategories = [
  {
    title: "Plastic Bottles",
    description: "Blow-moulded and injection blow-moulded bottles.",
    href: "/products/rigid-packaging/bottles",
    icon: Box
  },
  {
    title: "Jars & Containers",
    description: "Wide-mouth jars and rigid containers for diverse applications.",
    href: "/products/rigid-packaging/jars",
    icon: Package
  },
  {
    title: "Custom Packaging",
    description: "Custom-moulded packaging designed around specific product requirements.",
    href: "/products/rigid-packaging/custom",
    icon: Layers
  },
  {
    title: "Injection-Moulded Components",
    description: "Precision mechanical plastic parts, housings, and enclosures.",
    href: "/products/rigid-packaging/components",
    icon: Hexagon
  }
];

export default function RigidPackagingPage() {
  return (
    <div className="min-h-screen bg-paper pb-24">
      {/* Hero */}
      <div className="relative h-[65vh] min-h-[500px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/facilities/hero-company.png" alt="Sheetal Electrotech Factory" fill sizes="100vw" className="object-cover object-center" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/20" />
        </div>
        <div className="relative z-10 container-wide text-white pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <Link href="/products" className="text-white/60 hover:text-white text-sm font-mono uppercase tracking-widest mb-6 inline-block">
              ← Back to Products
            </Link>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-medium mb-6 leading-tight text-white">
              Rigid Plastic Packaging
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-display mb-4">
              Precision moulding for packaging and components.
            </p>
            <p className="text-lg text-white/75 max-w-2xl mb-8 leading-relaxed">
              Injection moulding, blow moulding and IBM capabilities supporting bottles, containers, jars and custom packaging.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/facilities"
                className="bg-white text-ink px-6 py-3 font-medium hover:bg-accent hover:text-white transition-colors"
              >
                Explore Capabilities
              </Link>
              <Link
                href="/contact"
                className="bg-transparent border border-white/30 text-white px-6 py-3 font-medium hover:bg-white/10 transition-colors"
              >
                Request Quote
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Subcategories */}
      <div className="container-wide py-20 border-b border-steel/10">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-medium text-ink">What We Manufacture</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {subCategories.map((cat) => (
            <Link key={cat.title} href={cat.href} className="group block bg-white border border-steel/15 hover:border-accent/30 transition-all overflow-hidden flex flex-col h-full">
              <div className="h-48 relative bg-mist p-6 flex flex-shrink-0 items-center justify-center">
                <cat.icon className="w-16 h-16 text-steel/50 group-hover:text-accent transition-colors duration-500 group-hover:scale-110 transform" strokeWidth={1} />
              </div>
              <div className="p-6 flex flex-col flex-grow text-center">
                <h3 className="text-lg font-display font-bold text-ink mb-3 group-hover:text-accent transition-colors">
                  {cat.title}
                </h3>
                <p className="text-steel text-sm leading-relaxed">{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Manufacturing Capabilities Banner */}
      <section className="bg-mist text-ink py-16">
        <div className="container-wide">
          <h3 className="font-mono text-xs uppercase tracking-widest text-ink/50 mb-8 text-center">Packaging Manufacturing Process</h3>
          <div className="flex flex-wrap justify-center items-center gap-4 text-lg md:text-xl font-display font-medium text-center">
            <span>Injection Moulding</span>
            <span className="text-accent">→</span>
            <span>IBM</span>
            <span className="text-accent">→</span>
            <span>Blow Moulding</span>
            <span className="text-accent">→</span>
            <span>Assembly & Packing</span>
            <span className="text-accent">→</span>
            <span>Quality Control</span>
          </div>
        </div>
      </section>

      {/* Why Sheetal */}
      <section className="container-wide py-24 border-b border-steel/10">
        <h2 className="text-3xl md:text-4xl font-display font-medium text-ink text-center mb-16">
          Why Sheetal for Rigid Plastic Packaging?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h4 className="text-xl font-display font-bold text-ink mb-4">Integrated Manufacturing</h4>
            <p className="text-steel leading-relaxed">Multiple moulding processes available within a single manufacturing setup.</p>
          </div>
          <div>
            <h4 className="text-xl font-display font-bold text-ink mb-4">Custom Development</h4>
            <p className="text-steel leading-relaxed">Support for packaging and component requirements based on specific customer geometries.</p>
          </div>
          <div>
            <h4 className="text-xl font-display font-bold text-ink mb-4">Quality Control</h4>
            <p className="text-steel leading-relaxed">Rigorous inspection and quality processes integrated directly into the manufacturing lines.</p>
          </div>
          <div>
            <h4 className="text-xl font-display font-bold text-ink mb-4">OEM Manufacturing</h4>
            <p className="text-steel leading-relaxed">End-to-end manufacturing support for businesses requiring customized products and packaging.</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container-wide py-24 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-display font-medium text-ink mb-6">
            Have a packaging requirement?
          </h2>
          <p className="text-xl text-steel mb-10">
            Share your product requirements and specifications with our team to start development.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-accent text-white px-8 py-4 font-medium hover:bg-ink transition-colors"
          >
            Request a Quote <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
