"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";


export default function ProductShowcase() {
  const t = useTranslations("ProductShowcase");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const products = [
    {
      category: "LED Bulbs",
      description: "Energy-efficient LED bulbs from 5W to 50W. B22 & E27 bases.",
      image: "/images/led-bulb.png",
      href: "/products/led-lighting",
    },
    {
      category: "LED Battens",
      description: "Slim-profile batten lights for commercial & residential use.",
      image: "/images/led-batten.png",
      href: "/products/led-lighting",
    },
    {
      category: "Street Lights",
      description: "High-power LED street lights with IP65 rating for outdoor use.",
      image: "/images/street_light.png",
      href: "/products/led-lighting",
    },
    {
      category: "Downlights & Spots",
      description: "Precision-engineered recessed and surface-mount fixtures.",
      image: "/images/down-light.png",
      href: "/products/led-lighting",
    },
    {
      category: "Smart Bulbs",
      description: "WiFi-enabled smart lighting with app control and voice support.",
      image: "/images/smart-bulb.png",
      href: "/products/led-lighting",
    },
    {
      category: t("packaging"),
      description: "Custom injection-moulded packaging for FMCG and pharma.",
      image: "/images/jar_product.jpg",
      href: "/products/rigid-packaging",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-mist" id="products">
      <div className="container-wide">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <p className="font-mono text-accent text-sm uppercase tracking-widest mb-3">
              Product Portfolio
            </p>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-ink">
              200+ SKUs. Ready to Scale.
            </h2>
          </div>
          <Link
            href="/products"
            className="group flex items-center gap-2 text-accent font-medium text-sm uppercase tracking-wider hover:gap-3 transition-all"
          >
            View All Products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.category}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link href={product.href} className="group block bg-white border border-slate-200 rounded-sm overflow-hidden hover:border-accent/50 hover:shadow-lg transition-all duration-300">
                {/* Image */}
                <div className="relative h-56 bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-8 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.category}
                    width={200}
                    height={200}
                    className="object-contain group-hover:scale-110 transition-transform duration-500 max-h-40"
                  />
                </div>

                {/* Content */}
                <div className="p-6 border-t border-slate-100">
                  <h3 className="text-lg font-display font-bold text-ink mb-2 group-hover:text-accent transition-colors">
                    {product.category}
                  </h3>
                  <p className="text-steel text-sm leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
