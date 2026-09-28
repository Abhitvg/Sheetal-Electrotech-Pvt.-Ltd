"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { Factory, Layers, Globe, ShieldCheck, Wrench, Zap } from "lucide-react";

const reasons = [
  {
    icon: Factory,
    title: "Vertically Integrated",
    description: "From raw plastic pellets to finished, packaged products — every manufacturing step under one roof eliminates supply chain risk.",
  },
  {
    icon: ShieldCheck,
    title: "ISO & BIS Certified",
    description: "ISO 9001:2015 quality management with BIS certification. Every product undergoes 100% automated testing before dispatch.",
  },
  {
    icon: Layers,
    title: "200+ SKUs",
    description: "LED bulbs, battens, downlights, street lights, smart lighting, and rigid plastic packaging — all manufactured in-house.",
  },
  {
    icon: Zap,
    title: "High-Speed SMT",
    description: "Fuji & Hanwha pick-and-place lines placing 170,000+ components per hour with automated optical inspection.",
  },
  {
    icon: Wrench,
    title: "In-House Tool Room",
    description: "Dedicated mould design and manufacturing facility for rapid prototyping — new moulds in days, not weeks.",
  },
  {
    icon: Globe,
    title: "Global Export Ready",
    description: "Serving clients across 5+ countries with international quality standards and export-grade packaging.",
  },
];

export default function WhyChooseUs() {
  const t = useTranslations("WhyChooseUs");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 bg-paper" id="why-us">
      <div className="container-wide">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="font-mono text-accent text-sm uppercase tracking-widest mb-3">
            Why Sheetal Electrotech
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-ink mb-6">
            Your Single-Source Manufacturing Partner
          </h2>
          <p className="text-steel text-lg">
            Eliminate multi-vendor complexity. Get consistent quality, competitive pricing,
            and reliable delivery from a partner who controls every stage of production.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group p-8 border border-slate-200 rounded-sm hover:border-accent/50 hover:shadow-lg transition-all duration-300 bg-white"
              >
                <div className="w-14 h-14 bg-accent/10 flex items-center justify-center rounded-sm mb-6 group-hover:bg-accent/20 transition-colors">
                  <Icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-xl font-display font-bold text-ink mb-3">
                  {reason.title}
                </h3>
                <p className="text-steel text-sm leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
