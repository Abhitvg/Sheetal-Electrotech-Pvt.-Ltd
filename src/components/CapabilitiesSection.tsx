"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { companyFacts } from "@/data/companyFacts";
import LegacyFacilityImage from "@/components/FacilityImage";

const capabilities = [
  {
    step: "01",
    title: "Injection Moulding",
    subtitle: "Precision plastic moulding",
    metric: "Injection & Precision Moulding",
    candidates: [
      "https://sheetalelectrotech.com/wp-content/uploads/2023/04/MG_8394-768x512.jpeg",
      "https://sheetalelectrotech.com/wp-content/uploads/2023/04/MG_8394.jpeg",
      "https://sheetalelectrotech.com/wp-content/uploads/2023/04/MG_8394.jpg",
    ],
    href: "/facilities/injection-moulding",
  },
  {
    step: "02",
    title: "SMT & Electronics",
    subtitle: "PCB assembly",
    metric: "SMT & Component Assembly",
    candidates: [
      "https://sheetalelectrotech.com/wp-content/uploads/2023/04/IMG_8730.png",
      "https://sheetalelectrotech.com/wp-content/uploads/2023/04/IMG_8730.jpg",
      "https://sheetalelectrotech.com/wp-content/uploads/2023/04/IMG_8730.jpeg",
      "https://sheetalelectrotech.com/wp-content/uploads/2023/04/IMG_8730-768x512.png",
      "https://sheetalelectrotech.com/wp-content/uploads/2023/04/IMG_8730-768x512.jpg",
      "https://sheetalelectrotech.com/wp-content/uploads/2023/04/IMG_8730-768x512.jpeg",
    ],
    href: "/facilities/smt",
  },
  {
    step: "03",
    title: "Assembly & Packing",
    subtitle: "Product assembly",
    metric: "Assembly & Packing",
    candidates: [
      "https://sheetalelectrotech.com/wp-content/uploads/2023/04/IMG_8803.png",
      "https://sheetalelectrotech.com/wp-content/uploads/2023/04/IMG_8803.jpg",
      "https://sheetalelectrotech.com/wp-content/uploads/2023/04/IMG_8803.jpeg",
      "https://sheetalelectrotech.com/wp-content/uploads/2023/04/IMG_8803-768x512.png",
      "https://sheetalelectrotech.com/wp-content/uploads/2023/04/IMG_8803-768x512.jpg",
      "https://sheetalelectrotech.com/wp-content/uploads/2023/04/IMG_8803-768x512.jpeg",
    ],
    href: "/facilities/assembly-packing",
  },
  {
    step: "04",
    title: "Manual Insertion",
    subtitle: "Through-hole component assembly",
    metric: "Manual Component Insertion",
    candidates: [
      "https://sheetalelectrotech.com/wp-content/uploads/2023/04/IMG_8686.png",
      "https://sheetalelectrotech.com/wp-content/uploads/2023/04/IMG_8686.jpg",
      "https://sheetalelectrotech.com/wp-content/uploads/2023/04/IMG_8686.jpeg",
      "https://sheetalelectrotech.com/wp-content/uploads/2023/04/IMG_8686-768x512.png",
      "https://sheetalelectrotech.com/wp-content/uploads/2023/04/IMG_8686-768x512.jpg",
      "https://sheetalelectrotech.com/wp-content/uploads/2023/04/IMG_8686-768x512.jpeg",
    ],
    href: "/facilities/manual-insertion",
  },
  {
    step: "05",
    title: "R&D / Product Development",
    subtitle: "Product development",
    metric: "R&D & Engineering",
    candidates: [
      "https://sheetalelectrotech.com/wp-content/uploads/2023/04/IMG_8742.png",
      "https://sheetalelectrotech.com/wp-content/uploads/2023/04/IMG_8742.jpg",
      "https://sheetalelectrotech.com/wp-content/uploads/2023/04/IMG_8742.jpeg",
      "https://sheetalelectrotech.com/wp-content/uploads/2023/04/IMG_8742-768x512.png",
      "https://sheetalelectrotech.com/wp-content/uploads/2023/04/IMG_8742-768x512.jpg",
      "https://sheetalelectrotech.com/wp-content/uploads/2023/04/IMG_8742-768x512.jpeg",
    ],
    href: "/facilities/research-development",
  },
];

export default function CapabilitiesSection() {
  const t = useTranslations("Capabilities");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 bg-paper" id="capabilities">
      <div className="container-wide">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-mono text-accent text-sm uppercase tracking-widest mb-3">
            Vertically Integrated
          </p>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-ink mb-6">
            Integrated Manufacturing
          </h2>
          <p className="text-steel text-lg max-w-2xl">
            Integrated manufacturing capabilities spanning moulding, electronics, assembly, testing and tooling
            in our {companyFacts.manufacturingArea} facility in Daman, India.
          </p>
        </motion.div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.step}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={cap.href} className="group block relative overflow-hidden rounded-sm bg-ink h-[400px]">
                {/* Image */}
                <LegacyFacilityImage
                  candidates={cap.candidates}
                  alt={cap.title}
                  eager={i < 3}
                  className="absolute inset-0 h-full w-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b192c]/95 via-[#0b192c]/40 to-[#0b192c]/5" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <p className="font-mono text-accent text-xs uppercase tracking-widest mb-2">
                    {cap.step} / {cap.subtitle}
                  </p>
                  <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-accent transition-colors">
                    {cap.title}
                  </h3>
                  <p className="text-white/70 font-mono text-sm mb-4">{cap.metric}</p>
                  <div className="flex items-center gap-2 text-white/50 text-sm font-medium group-hover:text-accent transition-colors">
                    Explore
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
