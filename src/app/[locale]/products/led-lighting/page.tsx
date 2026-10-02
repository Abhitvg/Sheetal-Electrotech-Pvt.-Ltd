"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import { legacyProductImages } from "@/data/legacyMedia";

const subCategories = [
  {
    title: "LED Bulbs",
    description: "LED bulbs for residential, commercial and industrial applications, manufactured to specified requirements.",
    href: "/products/led-lighting/bulbs",
    image: legacyProductImages["led-bulb"]?.[0] ?? "/images/products/led-bulb.png"
  },
  {
    title: "LED Battens",
    description: "Linear LED lighting products for residential, commercial and industrial spaces, available in multiple configurations.",
    href: "/products/led-lighting/battens",
    image: "/images/products/led-batten.png"
  },
  {
    title: "LED Downlights & Panels",
    description: "LED downlights, down lighters, ceiling lights and surface ring products manufactured to specified requirements.",
    href: "/products/led-lighting/downlights",
    image: "/images/products/led-down-light.webp"
  },
  {
    title: "LED Street Lights",
    description: "LED street lighting products for outdoor illumination and infrastructure applications.",
    href: "/products/led-lighting/street-lights",
    image: "/images/products/led-street-light-2.png"
  },
  {
    title: "LED Flood Lights",
    description: "Flood and well light products for outdoor illumination, security, sports and landscaping applications.",
    href: "/products/led-lighting/flood-lights",
    image: "/images/products/led-flood-well-light.png"
  },
  {
    title: "LED Spot Lights",
    description: "Directional LED spot lighting products for focused illumination.",
    href: "/products/led-lighting/spot-lights",
    image: "/images/products/led-spot-light.png"
  },
  {
    title: "Decorative Lighting",
    description: "Decorative LED lighting products for aesthetic and ambient indoor illumination.",
    href: "/products/led-lighting/decorative-lights",
    image: "/images/products/led-decorative-light.png"
  },
  {
    title: "Smart LED Lighting",
    description: "Smart LED lighting with smartphone/app control and voice assistant support through the connected ecosystem described on the official site.",
    href: "/products/led-lighting/smart-led",
    image: "/images/products/smart-led-bulb.png"
  },
  {
    title: "LED Strip Lights",
    description: "Flexible LED strip lighting products for accent and interior illumination.",
    href: "/products/led-lighting/strip-lights",
    image: "/images/products/led-strip-lights.png"
  }
];

export default function LEDLightingPage() {
  return (
    <div className="min-h-screen bg-paper pb-24">
      {/* Header */}
      <div className="bg-mist text-ink pt-32 pb-16 border-b border-steel/10">
        <div className="container-wide">
          <Link href="/products" className="text-steel hover:text-accent text-sm font-mono uppercase tracking-widest mb-4 inline-block">
            ← Back to Products
          </Link>
          <h1 className="text-5xl md:text-7xl font-display font-medium mb-6">
            LED Lighting
          </h1>
          <p className="text-steel text-xl max-w-2xl">
            A comprehensive range of energy-efficient LED luminaires designed and manufactured in our integrated Daman facility.
          </p>
        </div>
      </div>

      {/* Subcategories */}
      <div className="container-wide py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {subCategories.map((cat) => (
            <Link key={cat.title} href={cat.href} className="group block bg-white border border-steel/15 hover:border-accent/30 transition-all overflow-hidden">
              <div className="h-64 relative bg-mist p-8 flex items-center justify-center">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-contain p-8 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <h2 className="text-2xl font-display font-bold text-ink mb-2 flex items-center justify-between">
                  {cat.title}
                  <ArrowRight className="w-5 h-5 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                </h2>
                <p className="text-steel">{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
