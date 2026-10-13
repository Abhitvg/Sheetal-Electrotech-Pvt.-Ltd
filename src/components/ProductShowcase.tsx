"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowRight, FileDown, CheckCircle2, SlidersHorizontal } from "lucide-react";

type CategoryFilter = "all" | "lighting" | "electronics" | "packaging";

interface ShowcaseProduct {
  id: string;
  category: "lighting" | "electronics" | "packaging";
  titleEn: string;
  titleHi: string;
  badgeEn: string;
  badgeHi: string;
  descEn: string;
  descHi: string;
  specEn: string;
  specHi: string;
  image: string;
  href: string;
}

const products: ShowcaseProduct[] = [
  {
    id: "led-bulbs",
    category: "lighting",
    titleEn: "LED Bulbs",
    titleHi: "एलईडी बल्ब",
    badgeEn: "High Lumen",
    badgeHi: "उच्च लुमेन",
    descEn: "High-efficiency domestic and commercial lamps with high surge immunity.",
    descHi: "उच्च सर्ज सुरक्षा के साथ उच्च दक्षता वाले घरेलू और वाणिज्यिक लैंप।",
    specEn: "5W – 50W • B22 / E27 • >100 lm/W • BIS Certified",
    specHi: "5W – 50W • B22 / E27 • >100 lm/W • बीआईएस प्रमाणित",
    image: "/images/led-bulb.png",
    href: "/products/led-lighting/bulbs",
  },
  {
    id: "led-battens",
    category: "lighting",
    titleEn: "LED Battens",
    titleHi: "एलईडी बैटन",
    badgeEn: "Continuous Extrusion",
    badgeHi: "कंटीन्यूअस एक्सट्रूज़न",
    descEn: "Slim-profile extruded polycarbonate battens for uniform glare-free illumination.",
    descHi: "समान और चकाचौंध-मुक्त प्रकाश के लिए स्लिम पॉलीकार्बोनेट बैटन।",
    specEn: "18W – 36W • 1ft – 4ft • Surge 4KV • High PF >0.95",
    specHi: "18W – 36W • 1ft – 4ft • 4KV सर्ज • हाई PF >0.95",
    image: "/images/led-batten.png",
    href: "/products/led-lighting/battens",
  },
  {
    id: "street-lights",
    category: "lighting",
    titleEn: "Outdoor Street Lights",
    titleHi: "स्ट्रीट लाइट्स",
    badgeEn: "Heavy-Duty IP65",
    badgeHi: "हैवी ड्यूटी IP65",
    descEn: "Die-cast aluminium luminaires for highway, municipal and industrial illumination.",
    descHi: "हाईवे, नगरपालिका और औद्योगिक प्रकाश व्यवस्था के लिए एल्युमिनियम ल्यूमिनेयर।",
    specEn: "30W – 120W • IP65 Waterproof • 4KV/6KV Surge",
    specHi: "30W – 120W • IP65 वाटरप्रूफ • 4KV/6KV सर्ज",
    image: "/images/street_light.png",
    href: "/products/led-lighting/street-lights",
  },
  {
    id: "downlights",
    category: "lighting",
    titleEn: "Architectural Downlights",
    titleHi: "डाउनलाइट्स और स्पॉट्स",
    badgeEn: "Glare-Free Optic",
    badgeHi: "ग्लेयर-फ्री ऑप्टिक्स",
    descEn: "Precision recessed and surface-mount fixtures with engineered PMMA diffusers.",
    descHi: "इंजीनियर्ड डिफ्यूज़र के साथ सटीक रीसेस्ड और सरफेस-माउंट फिक्स्चर।",
    specEn: "3W – 24W • Slim Profile • Warm/Natural/Cool CCT",
    specHi: "3W – 24W • स्लिम प्रोफाइल • वार्म/नेचुरल/कूल CCT",
    image: "/images/down-light.png",
    href: "/products/led-lighting/downlights",
  },
  {
    id: "smart-bulb",
    category: "lighting",
    titleEn: "Smart IoT Lighting",
    titleHi: "स्मार्ट IoT लाइटिंग",
    badgeEn: "WiFi / BLE Mesh",
    badgeHi: "WiFi / BLE मेश",
    descEn: "App and voice-enabled smart luminaires with tunable white and 16M colors.",
    descHi: "ट्यूनेबल व्हाइट और 16 मिलियन रंगों के साथ ऐप और वॉयस सक्षम स्मार्ट लाइटें।",
    specEn: "WiFi/BLE • Tuya / Alexa / Google Assistant Ready",
    specHi: "WiFi/BLE • तुया / एलेक्सा / गूगल असिस्टेंट सपोर्ट",
    image: "/images/smart-bulb.png",
    href: "/products/led-lighting/smart-led",
  },
  {
    id: "driver-pcb",
    category: "electronics",
    titleEn: "SMT LED Driver Modules",
    titleHi: "SMT ड्राइवर मॉड्यूल्स",
    badgeEn: "Class-A Driver",
    badgeHi: "क्लास-ए ड्राइवर",
    descEn: "In-house manufactured constant-current driver circuits with multi-stage surge arrestors.",
    descHi: "मल्टी-स्टेज सर्ज सुरक्षा के साथ इन-हाउस निर्मित निरंतर चालू ड्राइवर सर्किट।",
    specEn: "High PF >0.98 • THD <10% • 440V Sustained Cutoff",
    specHi: "हाई PF >0.98 • THD <10% • 440V कट-ऑफ सुरक्षा",
    image: "/images/smt_electronics.jpg",
    href: "/products/electronics",
  },
  {
    id: "rigid-jars",
    category: "packaging",
    titleEn: "Rigid Packaging Jars & Bottles",
    titleHi: "कठोर जार और बोतलें",
    badgeEn: "Pharma Grade",
    badgeHi: "फार्मा ग्रेड",
    descEn: "Custom blow and injection-moulded containers for pharmaceutical, cosmetics, and FMCG.",
    descHi: "फार्मास्युटिकल, कॉस्मेटिक्स और एफएमसीजी के लिए कस्टम मोल्डेड कंटेनर।",
    specEn: "50ml – 5000ml • HDPE / PP / PET • 100% Leak Tested",
    specHi: "50ml – 5000ml • HDPE / PP / PET • 100% लीक टेस्टेड",
    image: "/images/jar_product.jpg",
    href: "/products/rigid-packaging/jars",
  },
  {
    id: "packaging-bottles",
    category: "packaging",
    titleEn: "Industrial Liquid Jerrycans",
    titleHi: "औद्योगिक लिक्विड जेरीकैन",
    badgeEn: "Heavy-Wall Blow",
    badgeHi: "हैवी-वॉल ब्लो",
    descEn: "Precision parison calibrated hollow containers with tamper-evident neck finishes.",
    descHi: "सीलबंद नेक फिनिश के साथ सटीक कैलिब्रेटेड खोखले कंटेनर।",
    specEn: "1L – 5L Capacity • UN Drop Test Tested • High ESCR",
    specHi: "1L – 5L क्षमता • UN ड्रॉप टेस्ट पास • हाई ESCR",
    image: "/images/packaging_factory.jpg",
    href: "/products/rigid-packaging/bottles",
  },
];

const showcaseCopy = {
  en: {
    eyebrow: "Product Portfolio",
    title: "Engineered for Performance & Scale.",
    subtitle:
      "Explore high-precision LED lighting fixtures, custom SMT electronics, and rigid plastic packaging manufactured at our Daman integrated campus.",
    viewAll: "View All Products",
    filterAll: "All Products",
    filterLighting: "LED Lighting",
    filterElectronics: "Electronics & SMT",
    filterPackaging: "Rigid Packaging",
    ctaTitle: "Need Full Technical Data & Photometrics?",
    ctaDesc: "Download our complete 2026 OEM product catalogue with mechanical drawings, lumen charts, and packaging weights.",
    downloadBtn: "Download Product Catalogue (PDF)",
    viewSpecs: "View Specifications",
  },
  hi: {
    eyebrow: "उत्पाद पोर्टफोलियो",
    title: "प्रदर्शन और बड़े पैमाने के लिए निर्मित।",
    subtitle:
      "दमन स्थित हमारे एकीकृत परिसर में निर्मित उच्च-सटीक एलईडी लाइटिंग फिक्स्चर, कस्टम एसएमटी इलेक्ट्रॉनिक्स और कठोर प्लास्टिक पैकेजिंग देखें।",
    viewAll: "सभी उत्पाद देखें",
    filterAll: "सभी उत्पाद",
    filterLighting: "एलईडी लाइटिंग",
    filterElectronics: "इलेक्ट्रॉनिक्स और SMT",
    filterPackaging: "कठोर पैकेजिंग",
    ctaTitle: "विस्तृत तकनीकी डेटा और फोटोमेट्रिक्स चाहिए?",
    ctaDesc: "मैकेनिकल ड्रॉइंग, लुमेन चार्ट और पैकेजिंग वजन के साथ हमारा पूर्ण OEM उत्पाद कैटलॉग डाउनलोड करें।",
    downloadBtn: "उत्पाद कैटलॉग डाउनलोड करें (PDF)",
    viewSpecs: "विनिर्देश देखें",
  },
};

export default function ProductShowcase() {
  const locale = useLocale();
  const copy = locale === "hi" ? showcaseCopy.hi : showcaseCopy.en;
  const [filter, setFilter] = useState<CategoryFilter>("all");

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const filteredProducts = products.filter(
    (p) => filter === "all" || p.category === filter
  );

  return (
    <section className="py-24 md:py-32 bg-[#f4f6f8] border-b border-steel/10" id="products">
      <div className="container-wide">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <p className="font-mono text-accent text-xs uppercase tracking-wider font-semibold">
                {copy.eyebrow}
              </p>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-ink mb-4 leading-tight">
              {copy.title}
            </h2>
            <p className="text-steel text-base md:text-lg leading-relaxed">
              {copy.subtitle}
            </p>
          </div>

          <Link
            href="/products"
            className="group inline-flex items-center gap-2 text-ink font-bold text-sm uppercase tracking-wider hover:text-accent transition-colors self-start lg:self-end pb-1 border-b-2 border-accent"
          >
            {copy.viewAll}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-10 pb-4 border-b border-steel/15">
          <div className="flex items-center gap-2 text-steel/60 mr-2 text-xs font-mono uppercase tracking-widest hidden sm:flex">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Category:</span>
          </div>
          {[
            { key: "all", label: copy.filterAll },
            { key: "lighting", label: copy.filterLighting },
            { key: "electronics", label: copy.filterElectronics },
            { key: "packaging", label: copy.filterPackaging },
          ].map((cat) => {
            const isActive = filter === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setFilter(cat.key as CategoryFilter)}
                className={`px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#0b192c] text-white shadow-md font-bold"
                    : "bg-white text-steel hover:text-ink hover:bg-white/80 border border-steel/20"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Product Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredProducts.map((product) => {
              const title = locale === "hi" ? product.titleHi : product.titleEn;
              const badge = locale === "hi" ? product.badgeHi : product.badgeEn;
              const desc = locale === "hi" ? product.descHi : product.descEn;
              const spec = locale === "hi" ? product.specHi : product.specEn;

              return (
                <motion.div
                  layout
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    href={product.href}
                    className="group flex flex-col justify-between h-full bg-white border border-steel/15 hover:border-accent hover:shadow-xl transition-all duration-300 rounded-sm overflow-hidden"
                  >
                    <div>
                      {/* Product Image Area */}
                      <div className="relative h-52 bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center p-6 overflow-hidden">
                        <span className="absolute top-3 left-3 px-2 py-0.5 bg-white/90 border border-steel/15 rounded text-[10px] font-mono font-semibold uppercase tracking-wider text-steel z-10">
                          {badge}
                        </span>
                        <Image
                          src={product.image}
                          alt={title}
                          width={180}
                          height={180}
                          className="object-contain group-hover:scale-108 transition-transform duration-500 max-h-36 drop-shadow-sm"
                        />
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <h3 className="text-lg font-display font-bold text-ink mb-2 group-hover:text-accent transition-colors">
                          {title}
                        </h3>
                        <p className="text-steel text-xs leading-relaxed line-clamp-2 mb-4">
                          {desc}
                        </p>
                      </div>
                    </div>

                    <div className="px-5 pb-5 pt-3 border-t border-steel/10 bg-[#fafbfc] mt-auto">
                      <p className="font-mono text-[10px] font-semibold text-accent uppercase tracking-wider mb-2.5">
                        {spec}
                      </p>
                      <div className="flex items-center justify-between text-xs font-bold text-ink group-hover:text-accent transition-colors">
                        <span>{copy.viewSpecs}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Catalogue Download Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 p-6 md:p-8 bg-[#071322] border border-white/10 rounded-sm text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-accent text-xs font-mono uppercase tracking-widest mb-2 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Direct Engineering Download</span>
            </div>
            <h3 className="text-xl md:text-2xl font-display font-bold mb-2">
              {copy.ctaTitle}
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">
              {copy.ctaDesc}
            </p>
          </div>

          <a
            href="/resources/product-catalogue.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex-shrink-0 inline-flex items-center gap-3 px-6 py-3.5 bg-accent hover:bg-orange-600 text-white font-mono text-xs font-bold uppercase tracking-wider rounded-sm transition-all duration-200 shadow-md self-start md:self-auto"
          >
            <FileDown className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            <span>{copy.downloadBtn}</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
