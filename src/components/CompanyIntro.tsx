"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { companyFacts } from "@/data/companyFacts";
import { ArrowRight, Zap, Cpu, Package, Wrench } from "lucide-react";

const introCopy = {
  en: {
    eyebrow: `${companyFacts.experience} Years of Manufacturing Expertise`,
    title: "Integrated manufacturing under one ecosystem.",
    description:
      "Sheetal Group is an Indian manufacturer and supplier specializing in LED lighting, electronics, and rigid plastic packaging. With more than 25 years of industry experience, the company combines product development, in-house tooling, SMT assembly, and strict BIS quality control under a single coordinated manufacturing campus in Daman.",
    divisions: [
      {
        number: "01",
        label: "LED Lighting OEM/ODM",
        desc: "Energy-efficient LED bulbs, commercial battens, slim downlights, and high-power IP65 street & flood fixtures.",
        spec: "5W – 120W • IP65 • BIS Compliant",
        icon: Zap,
        href: "/products/led-lighting",
      },
      {
        number: "02",
        label: "SMT & Electronics",
        desc: "Automated high-speed pick-and-place lines, nitrogen reflow, wave soldering, and 4KV+ surge-immune driver assemblies.",
        spec: "High-Speed SMT • In-Line AOI • 4KV Surge",
        icon: Cpu,
        href: "/products/electronics",
      },
      {
        number: "03",
        label: "Rigid Plastic Packaging",
        desc: "Pharma liquid bottles, chemical containers, cosmetic jars, and custom tamper-evident closures.",
        spec: "50ml – 5000ml • HDPE / PP / PET",
        icon: Package,
        href: "/products/rigid-packaging",
      },
      {
        number: "04",
        label: "Tool Room & Moulding",
        desc: "In-house CNC machining centers, wire-cut EDM, multi-cavity injection moulds, and rapid SLA concept prototyping.",
        spec: "In-House VMC • ±0.01mm Precision",
        icon: Wrench,
        href: "/facilities/tool-room",
      },
    ],
    exploreText: "Explore Division",
  },
  hi: {
    eyebrow: `${companyFacts.experience} वर्षों की विनिर्माण उत्कृष्टता`,
    title: "एक एकीकृत पारिस्थितिकी तंत्र के तहत विनिर्माण।",
    description:
      "शीतल ग्रुप एक भारतीय विनिर्माण भागीदार है जो एलईडी लाइटिंग, इलेक्ट्रॉनिक्स और कठोर प्लास्टिक पैकेजिंग में विशेषज्ञता रखता है। 25 से अधिक वर्षों के अनुभव के साथ, हम दमन स्थित अपने विनिर्माण परिसर में उत्पाद विकास, इन-हाउस टूलिंग, एसएमटी असेंबली और बीआईएस गुणवत्ता नियंत्रण को एक ही छत के नीचे जोड़ते हैं।",
    divisions: [
      {
        number: "01",
        label: "एलईडी लाइटिंग OEM/ODM",
        desc: "ऊर्जा-कुशल एलईडी बल्ब, वाणिज्यिक बैटन, स्लिम डाउनलाइट्स और उच्च-शक्ति IP65 स्ट्रीट और फ्लड फिक्स्चर।",
        spec: "5W – 120W • IP65 • बीआईएस प्रमाणित",
        icon: Zap,
        href: "/products/led-lighting",
      },
      {
        number: "02",
        label: "SMT और इलेक्ट्रॉनिक्स",
        desc: "स्वचालित हाई-स्पीड पिक-एंड-प्लेस लाइनें, नाइट्रोजन रिफ्लो, वेव सोल्डरिंग और 4KV+ सर्ज-प्रोटेक्टेड ड्राइवर असेंबली।",
        spec: "हाई-स्पीड SMT • इन-लाइन AOI • 4KV सर्ज",
        icon: Cpu,
        href: "/products/electronics",
      },
      {
        number: "03",
        label: "कठोर प्लास्टिक पैकेजिंग",
        desc: "फार्मा लिक्विड बोतलें, केमिकल कंटेनर्स, कॉस्मेटिक जार और कस्टम सीलबंद कैप्स व क्लोजर्स।",
        spec: "50ml – 5000ml • HDPE / PP / PET",
        icon: Package,
        href: "/products/rigid-packaging",
      },
      {
        number: "04",
        label: "टूल रूम और मोल्ड इंजीनियरिंग",
        desc: "इन-हाउस सीएनसी मशीनिंग सेंटर, वायर-कट ईडीएम, मल्टी-कैविटी इंजेक्शन मोल्ड्स और रैपिड प्रोटोटाइपिंग।",
        spec: "इन-हाउस VMC • ±0.01mm परिशुद्धता",
        icon: Wrench,
        href: "/facilities/tool-room",
      },
    ],
    exploreText: "डिवीजन देखें",
  },
};

export default function CompanyIntro() {
  const locale = useLocale();
  const copy = locale === "hi" ? introCopy.hi : introCopy.en;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 md:py-32 bg-white border-b border-steel/10" id="company-intro">
      <div className="container-wide">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mb-16"
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
          <p className="text-steel text-base md:text-lg leading-relaxed max-w-3xl">
            {copy.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {copy.divisions.map((div, i) => {
            const Icon = div.icon;
            return (
              <motion.div
                key={div.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              >
                <Link
                  href={div.href}
                  className="group flex flex-col justify-between h-full border border-steel/15 p-8 bg-[#fafbfc] hover:bg-white hover:border-accent hover:shadow-xl transition-all duration-300 rounded-sm"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-mono text-accent text-xs font-bold uppercase tracking-widest bg-accent/10 px-2.5 py-1 rounded">
                        {div.number}
                      </span>
                      <div className="w-10 h-10 rounded-full bg-white border border-steel/20 flex items-center justify-center text-ink group-hover:text-accent group-hover:border-accent transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-xl font-display font-bold text-ink mb-3 group-hover:text-accent transition-colors">
                      {div.label}
                    </h3>
                    <p className="text-steel text-sm leading-relaxed mb-6">
                      {div.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-steel/10 mt-auto">
                    <p className="font-mono text-[11px] text-steel/80 uppercase tracking-wide mb-3">
                      {div.spec}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink group-hover:text-accent transition-colors">
                      <span>{copy.exploreText}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
