"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { industriesServed } from "@/data/companyFacts";
import { Lightbulb, Cpu, Pill, Package, ShoppingBag, Car } from "lucide-react";

const icons = [Lightbulb, Cpu, Pill, Package, ShoppingBag, Car];

export default function IndustriesServed() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 md:py-32 bg-paper border-t border-steel/10" id="industries">
      <div className="container-wide">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <p className="font-mono text-accent text-sm uppercase tracking-widest mb-3">
            Industries
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-ink mb-6">
            Industries & Applications
          </h2>
          <p className="text-steel text-lg">
            Manufacturing solutions across multiple industry verticals.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {industriesServed.map((industry, i) => {
            const Icon = icons[i] || Package;
            return (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group border border-steel/15 p-6 bg-white text-center hover:border-accent/30 transition-all"
              >
                <div className="w-12 h-12 bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display font-bold text-ink text-sm mb-2">{industry.name}</h3>
                <p className="text-steel text-xs leading-relaxed">{industry.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
