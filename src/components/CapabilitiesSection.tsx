"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Factory, Sparkles } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { companyFacts } from "@/data/companyFacts";
import FacilityImage from "@/components/FacilityImage";

interface CapabilityItem {
  step: string;
  titleEn: string;
  titleHi: string;
  subtitleEn: string;
  subtitleHi: string;
  metricEn: string;
  metricHi: string;
  candidates: string[];
  href: string;
}

const flagshipCapabilities: CapabilityItem[] = [
  {
    step: "01",
    titleEn: "SMT & Electronics Line",
    titleHi: "SMT और इलेक्ट्रॉनिक्स लाइन",
    subtitleEn: "Automated Pick & Place",
    subtitleHi: "स्वचालित पिक और प्लेस",
    metricEn: "Multi-Zone Reflow • In-Line AOI Inspection",
    metricHi: "मल्टी-ज़ोन रिफ्लो • इन-लाइन AOI निरीक्षण",
    candidates: [
      "/images/facilities/smt.webp",
      "/images/facilities/legacy/smt.png",
      "/images/smt_electronics.jpg",
    ],
    href: "/facilities/smt",
  },
  {
    step: "02",
    titleEn: "Precision Injection Moulding",
    titleHi: "परिशुद्धता इंजेक्शन मोल्डिंग",
    subtitleEn: "Housings & Diffusers",
    subtitleHi: "हाउसिंग और डिफ्यूज़र",
    metricEn: "PP, ABS, PC & PBT • Multi-Cavity Tooling",
    metricHi: "PP, ABS, PC और PBT • मल्टी-कैविटी मोल्ड्स",
    candidates: [
      "/images/facilities/injection-moulding.webp",
      "/images/facilities/legacy/injection-moulding.jpeg",
      "/images/moulding_factory.jpg",
    ],
    href: "/facilities/injection-moulding",
  },
  {
    step: "03",
    titleEn: "In-House Precision Tool Room",
    titleHi: "इन-हाउस टूल रूम और मोल्ड्स",
    subtitleEn: "CNC VMC & Wire-Cut EDM",
    subtitleHi: "सीएनसी वीएमसी और ईडीएम",
    metricEn: "±0.01 mm Tolerance • P20 & H13 Die Steels",
    metricHi: "±0.01 मिमी टॉलरेंस • P20 और H13 टूल स्टील",
    candidates: [
      "/images/tool_room.jpg",
      "/images/facilities/tool-room.webp",
      "/images/moulding_factory.jpg",
    ],
    href: "/facilities/tool-room",
  },
  {
    step: "04",
    titleEn: "Continuous Profile Extrusion",
    titleHi: "कंटीन्यूअस प्रोफाइल एक्सट्रूज़न",
    subtitleEn: "Batten Profiles & Optics",
    subtitleHi: "बैटन प्रोफाइल और ऑप्टिक्स",
    metricEn: "Optical Polycarbonate • Exact Tolerances",
    metricHi: "ऑप्टिकल पॉलीकार्बोनेट • सटीक सहनशीलता",
    candidates: [
      "/images/hero_manufacturing.jpg",
      "/images/facilities/legacy/extrusion.jpeg",
    ],
    href: "/facilities/extrusion",
  },
  {
    step: "05",
    titleEn: "Hollow Blow Moulding",
    titleHi: "ब्लो मोल्डिंग कंटेनर्स",
    subtitleEn: "Pharma & FMCG Packaging",
    subtitleHi: "फार्मा और एफएमसीजी पैकेजिंग",
    metricEn: "50ml – 5000ml Envelope • Parison Wall Control",
    metricHi: "50ml – 5000ml सीमा • पैरिसन वॉल नियंत्रण",
    candidates: [
      "/images/facilities/blow-moulding.webp",
      "/images/facilities/legacy/blow-moulding.png",
      "/images/packaging_factory.jpg",
    ],
    href: "/facilities/blow-moulding",
  },
  {
    step: "06",
    titleEn: "Conveyor Assembly & Aging",
    titleHi: "कन्वेयर असेंबली और एजिंग लाइन",
    subtitleEn: "100% Electrical Burn-In",
    subtitleHi: "100% बर्न-इन वोल्टेज तनाव परीक्षण",
    metricEn: "Cyclic High-Voltage Stress • Transit Drop Tested",
    metricHi: "चक्रीय वोल्टेज तनाव • सुरक्षित ट्रांजिट पैकेजिंग",
    candidates: [
      "/images/facilities/assembly-packing.webp",
      "/images/facilities/legacy/assembly-packing.png",
      "/images/product_showcase.jpg",
    ],
    href: "/facilities/assembly-packing",
  },
];

const capabilitiesCopy = {
  en: {
    eyebrow: "Vertically Integrated Manufacturing",
    title: "9 In-House Capabilities Under One Roof.",
    description: `From raw polymer compounding and bare circuit boards to final BIS-certified luminaires, our ${companyFacts.manufacturingArea} sq. ft. campus in Daman delivers single-source control with zero subcontracting delays.`,
    exploreBadge: "Explore Capability",
    viewAllHeading: "Complete 9-Capability Campus Infrastructure",
    viewAllDesc: "Also operating dedicated lines for Manual Through-Hole Insertion, Optical R&D Dark Room, and Injection Blow Moulding (IBM).",
    viewAllBtn: "View All 9 Manufacturing Facilities",
  },
  hi: {
    eyebrow: "वर्टिकली इंटीग्रेटेड मैन्युफैक्चरिंग",
    title: "एक ही छत के नीचे 9 इन-हाउस क्षमताएं।",
    description: `कच्चे पॉलीमर और सर्किट बोर्ड से लेकर अंतिम बीआईएस-प्रमाणित ल्यूमिनेयर तक, दमन स्थित हमारा ${companyFacts.manufacturingArea} वर्ग फुट परिसर बिना किसी तीसरे पक्ष के विलंब के पूर्ण नियंत्रण प्रदान करता है।`,
    exploreBadge: "सुविधा देखें",
    viewAllHeading: "संपूर्ण 9-सुविधा परिसर अवसंरचना",
    viewAllDesc: "मैनुअल थ्रू-होल इंसर्शन, ऑप्टिकल आरएंडडी डार्क रूम और इंजेक्शन ब्लो मोल्डिंग (IBM) के लिए समर्पित लाइनें भी संचालित हैं।",
    viewAllBtn: "सभी 9 विनिर्माण सुविधाएं देखें",
  },
};

export default function CapabilitiesSection() {
  const locale = useLocale();
  const copy = locale === "hi" ? capabilitiesCopy.hi : capabilitiesCopy.en;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 bg-white border-b border-steel/10" id="capabilities">
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
            <Factory className="w-3.5 h-3.5 text-accent" />
            <p className="font-mono text-accent text-xs uppercase tracking-wider font-semibold">
              {copy.eyebrow}
            </p>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-ink mb-6 leading-tight">
            {copy.title}
          </h2>
          <p className="text-steel text-base md:text-lg leading-relaxed">
            {copy.description}
          </p>
        </motion.div>

        {/* 6 Balanced Flagship Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flagshipCapabilities.map((cap, i) => {
            const title = locale === "hi" ? cap.titleHi : cap.titleEn;
            const subtitle = locale === "hi" ? cap.subtitleHi : cap.subtitleEn;
            const metric = locale === "hi" ? cap.metricHi : cap.metricEn;

            return (
              <motion.div
                key={cap.step}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link
                  href={cap.href}
                  className="group block relative overflow-hidden rounded-sm bg-ink h-[400px] border border-steel/15 shadow-sm hover:shadow-2xl transition-all duration-500"
                >
                  <FacilityImage
                    candidates={cap.candidates}
                    alt={title}
                    eager={i === 0}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="absolute inset-0 h-full w-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-108 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071322] via-[#071322]/50 to-transparent" />
                  
                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <p className="font-mono text-accent text-xs uppercase tracking-widest mb-2 font-bold">
                      {cap.step} / {subtitle}
                    </p>
                    <h3 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-accent transition-colors leading-snug">
                      {title}
                    </h3>
                    <p className="text-white/70 font-mono text-xs mb-5">
                      {metric}
                    </p>
                    <div className="flex items-center gap-2 text-white/60 text-xs font-bold uppercase tracking-wider group-hover:text-accent transition-colors">
                      <span>{copy.exploreBadge}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* 9-Facility Campus Navigator Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 p-6 md:p-8 bg-[#0b192c] border border-white/10 rounded-sm text-white flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-1 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Production Campus</span>
            </div>
            <h4 className="text-lg md:text-xl font-display font-bold mb-1">
              {copy.viewAllHeading}
            </h4>
            <p className="text-white/70 text-xs md:text-sm leading-relaxed">
              {copy.viewAllDesc}
            </p>
          </div>

          <Link
            href="/facilities"
            className="group inline-flex items-center gap-3 px-6 py-3 bg-white text-ink font-mono text-xs font-bold uppercase tracking-wider hover:bg-accent hover:text-white transition-all duration-200 rounded-sm flex-shrink-0 self-start md:self-auto"
          >
            <span>{copy.viewAllBtn}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
