"use client";

import Image from "next/image";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";


export default function WhyChooseUs() {
  const t = useTranslations("WhyChooseUs");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const reasons = [
    {
      title: t("w1Title"),
      description: t("w1Desc"),
      icon: "/images/legacy/product-design.png",
    },
    {
      title: t("w2Title"),
      description: t("w2Desc"),
      icon: "/images/legacy/manufacturing.png",
    },
    {
      title: t("w3Title"),
      description: t("w3Desc"),
      icon: "/images/legacy/inspection.png",
    },
    {
      title: t("w4Title"),
      description: t("w4Desc"),
      icon: "/images/legacy/stock.png",
    },
    {
      title: t("w5Title"),
      description: t("w5Desc"),
      icon: "/images/legacy/technical-support.png",
    },
  ];



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
            {t("badge")}
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-ink mb-6">
            {t("title")}
          </h2>
          <p className="text-steel text-lg">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, i) => {
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group p-8 border border-slate-200 rounded-sm hover:border-accent/50 hover:shadow-lg transition-all duration-300 bg-white"
              >
                <div className="w-16 h-16 bg-accent/10 flex items-center justify-center rounded-sm mb-6 group-hover:bg-accent/20 transition-colors">
                  <Image src={reason.icon} alt="" width={32} height={32} className="object-contain" />
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
