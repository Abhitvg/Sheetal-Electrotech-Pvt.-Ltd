"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLocale } from "next-intl";
import {
  Lightbulb,
  Cpu,
  Pill,
  ShoppingBag,
  Car,
  Building2,
  Check,
} from "lucide-react";

const industriesCopy = {
  en: {
    eyebrow: "Industries & OEM Sectors",
    title: "Precision Solutions Across 6 Core Verticals.",
    subtitle:
      "Our integrated manufacturing ecosystem supports leading national brands, tier-1 suppliers, and specialized distributors across diverse industrial requirements.",
    sectors: [
      {
        icon: Lightbulb,
        name: "Architectural & Commercial Lighting",
        description:
          "Turnkey OEM luminaire manufacturing for residential, commercial retail, and architectural projects.",
        examples: ["LED Battens", "Recessed Downlights", "Street Luminaires"],
      },
      {
        icon: Cpu,
        name: "Consumer Electronics & Power",
        description:
          "Precision SMT PCB assembly, constant-current drivers, surge protection, and power distribution strips.",
        examples: ["Driver Modules", "Extension Boards", "Smart IoT PCBA"],
      },
      {
        icon: Pill,
        name: "Pharmaceutical & Healthcare",
        description:
          "High-grade virgin HDPE/PP hollow bottles, dropper vials, and airtight induction-seal packaging.",
        examples: ["Pharma Bottles", "Dropper Containers", "Airtight Caps"],
      },
      {
        icon: ShoppingBag,
        name: "FMCG, Cosmetics & Personal Care",
        description:
          "Aesthetic double-wall cream jars, lotion dispenser bottles, and custom branded blow-moulded packaging.",
        examples: ["Cosmetic Jars", "Lotion Bottles", "Tamper Closures"],
      },
      {
        icon: Car,
        name: "Automotive & Electrical Sub-Assemblies",
        description:
          "Heavy-duty injection-moulded enclosures, automotive wiring connectors, and rugged plastic sub-assemblies.",
        examples: ["Terminal Blocks", "Wiring Enclosures", "Custom Brackets"],
      },
      {
        icon: Building2,
        name: "Infrastructure & Municipal Lighting",
        description:
          "High-surge IP65 floodlights, highway illumination, and government-spec rural electrification lights.",
        examples: ["30W–120W Street Lights", "IP65 Floodlights", "Solar Fixtures"],
      },
    ],
  },
  hi: {
    eyebrow: "उद्योग और OEM क्षेत्र",
    title: "6 मुख्य कार्यक्षेत्रों में सटीक विनिर्माण समाधान।",
    subtitle:
      "हमारा एकीकृत विनिर्माण पारिस्थितिकी तंत्र विविध औद्योगिक आवश्यकताओं में अग्रणी राष्ट्रीय ब्रांडों और वितरकों का समर्थन करता है।",
    sectors: [
      {
        icon: Lightbulb,
        name: "वाणिज्यिक और वास्तुशिल्प लाइटिंग",
        description:
          "आवासीय, वाणिज्यिक और वास्तुशिल्प परियोजनाओं के लिए टर्नकी OEM ल्यूमिनेयर निर्माण।",
        examples: ["एलईडी बैटन", "डाउनलाइट्स", "स्ट्रीट ल्यूमिनेयर"],
      },
      {
        icon: Cpu,
        name: "कंज्यूमर इलेक्ट्रॉनिक्स और पावर",
        description:
          "सटीक SMT पीसीबी असेंबली, कॉन्स्टेंट-करेंट ड्राइवर, सर्ज प्रोटेक्शन और पावर स्ट्रिप्स।",
        examples: ["ड्राइवर मॉड्यूल", "एक्सटेंशन बोर्ड", "स्मार्ट IoT PCBA"],
      },
      {
        icon: Pill,
        name: "फार्मास्युटिकल और हेल्थकेयर",
        description:
          "उच्च श्रेणी के HDPE/PP बोतलें, ड्रॉपर शीशियां और एयरटाइट इंडक्शन-सील पैकेजिंग।",
        examples: ["फार्मा बोतलें", "ड्रॉपर कंटेनर", "एयरटाइट कैप्स"],
      },
      {
        icon: ShoppingBag,
        name: "FMCG, कॉस्मेटिक्स और पर्सनल केयर",
        description:
          "डबल-वॉल क्रीम जार, लोशन डिस्पेंसर बोतलें और कस्टम ब्रांडेड मोल्डेड पैकेजिंग।",
        examples: ["कॉस्मेटिक जार", "लोशन बोतलें", "सीलबंद कैप्स"],
      },
      {
        icon: Car,
        name: "ऑटोमोटिव और इलेक्ट्रिकल सब-असेंबली",
        description:
          "हैवी-ड्यूटी इंजेक्शन-मोल्डेड बाड़े, वायरिंग कनेक्टर और मजबूत प्लास्टिक सब-असेंबली।",
        examples: ["टर्मिनल ब्लॉक", "वायरिंग एनक्लोजर", "कस्टम ब्रैकेट"],
      },
      {
        icon: Building2,
        name: "इन्फ्रास्ट्रक्चर और म्यूनिसिपल लाइटिंग",
        description:
          "हाई-सर्ज IP65 फ्लडलाइट्स, हाईवे इल्यूमिनेशन और सरकारी विनिर्देशित स्ट्रीट लाइट्स।",
        examples: ["30W–120W स्ट्रीट लाइट्स", "IP65 फ्लडलाइट्स", "सोलर लाइट्स"],
      },
    ],
  },
};

export default function IndustriesServed() {
  const locale = useLocale();
  const copy = locale === "hi" ? industriesCopy.hi : industriesCopy.en;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 md:py-32 bg-white border-b border-steel/10" id="industries">
      <div className="container-wide">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <p className="font-mono text-accent text-xs uppercase tracking-wider font-semibold">
              {copy.eyebrow}
            </p>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-ink mb-6 leading-tight">
            {copy.title}
          </h2>
          <p className="text-steel text-base md:text-lg leading-relaxed">
            {copy.subtitle}
          </p>
        </motion.div>

        {/* Balanced 6-Sector Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {copy.sectors.map((sector, i) => {
            const Icon = sector.icon;
            return (
              <motion.div
                key={sector.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group flex flex-col justify-between p-8 border border-steel/15 bg-[#fafbfc] hover:bg-white hover:border-accent hover:shadow-xl transition-all duration-300 rounded-sm"
              >
                <div>
                  <div className="w-12 h-12 bg-white border border-steel/20 rounded-sm flex items-center justify-center mb-6 text-ink group-hover:text-accent group-hover:border-accent transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-display font-bold text-ink text-lg mb-3 group-hover:text-accent transition-colors leading-snug">
                    {sector.name}
                  </h3>

                  <p className="text-steel text-sm leading-relaxed mb-6">
                    {sector.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-steel/10 mt-auto">
                  <p className="font-mono text-[10px] text-steel/70 uppercase tracking-widest mb-2 font-semibold">
                    Applications:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {sector.examples.map((ex) => (
                      <span
                        key={ex}
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-steel/15 text-[11px] font-mono text-ink rounded"
                      >
                        <Check className="w-2.5 h-2.5 text-accent" />
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
