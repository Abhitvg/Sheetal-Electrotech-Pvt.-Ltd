"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const subCategories = [
  {
    title: "Plastic Bottles",
    description: "Blow-moulded and injection-stretch blow-moulded bottles.",
    href: "/products/rigid-packaging/bottles",
    image: "/images/legacy/Photo7.webp"
  },
  {
    title: "Jars & Containers",
    description: "Wide-mouth jars and rigid containers for diverse applications.",
    href: "/products/rigid-packaging/jars",
    image: "/images/legacy/Photo8.webp"
  },
  {
    title: "Custom Packaging",
    description: "Tailored packaging designs for specialized requirements.",
    href: "/products/rigid-packaging/custom",
    image: "/images/legacy/10-3.webp"
  },
  {
    title: "Injection-Moulded Components",
    description: "High-precision components built in-house.",
    href: "/products/rigid-packaging/components",
    image: "/images/legacy/Photo13.webp"
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
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-medium mb-6 leading-tight">
              Rigid Plastic Packaging
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-display mb-4">
              Precision moulding for packaging and components.
            </p>
            <p className="text-lg text-white/70 max-w-2xl mb-8 leading-relaxed">
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
        <div className="mb-12">
          <h2 className="text-3xl font-display font-medium text-ink">What We Manufacture</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {subCategories.map((cat) => (
            <Link key={cat.title} href={cat.href} className="group block bg-white border border-steel/15 hover:border-accent/30 transition-all overflow-hidden flex flex-col h-full">
              <div className="h-48 relative bg-mist p-6 flex flex-shrink-0 items-center justify-center">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-display font-bold text-ink mb-3 flex items-center justify-between">
                  {cat.title}
                  <ArrowRight className="w-4 h-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
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
          <h3 className="font-mono text-xs uppercase tracking-widest text-ink/50 mb-8 text-center">Manufacturing Capabilities</h3>
          <div className="flex flex-wrap justify-center items-center gap-4 text-lg md:text-xl font-display font-medium">
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
    </div>
  );
}
