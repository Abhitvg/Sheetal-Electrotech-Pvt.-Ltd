"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLocale } from "next-intl";
import {
  FileCode,
  Wrench,
  Microscope,
  Cpu,
  Truck,
  ArrowRight,
} from "lucide-react";
import { Link } from "@/i18n/routing";

const processCopy = {
  en: {
    eyebrow: "Turnkey Manufacturing Roadmap",
    title: "From CAD Blueprint to Mass Production.",
    subtitle:
      "A systematic, transparent 5-stage engineering lifecycle engineered to mitigate risk, accelerate speed-to-market, and ensure zero-defect quality.",
    ctaText: "Start Stage 01: Submit CAD for DFM Review",
    stages: [
      {
        number: "01",
        title: "CAD & BOM DFM Review",
        subtitle: "Design For Manufacturability",
        description:
          "Our engineers analyze your 3D CAD models, PCB Gerber files, and target unit costs, identifying moldability optimizations and supply chain efficiencies within 24 hours.",
        icon: FileCode,
        timeline: "24 – 48 Hours",
      },
      {
        number: "02",
        title: "In-House Tooling & Prototyping",
        subtitle: "CNC Machining & 3D SLA",
        description:
          "Our in-house tool room designs multi-cavity dies and fabricates functional SLA prototypes for mechanical fitment, heat dissipation, and aesthetic sign-off.",
        icon: Wrench,
        timeline: "7 – 15 Days",
      },
      {
        number: "03",
        title: "Pilot Run & BIS Certification",
        subtitle: "Photometry & Thermal Stress",
        description:
          "Pre-production pilot units are evaluated in our calibrated optical dark room (spectroradiometer) and subjected to high-voltage surge and thermal endurance testing.",
        icon: Microscope,
        timeline: "Validated Samples",
      },
      {
        number: "04",
        title: "High-Speed SMT & Lean Assembly",
        subtitle: "Cleanroom Mounting & Assembly",
        description:
          "Full production ramp on automated surface-mount lines, followed by sequential conveyorized luminaire assembly and automated optical inspection (AOI).",
        icon: Cpu,
        timeline: "Scalable Shifts",
      },
      {
        number: "05",
        title: "100% Burn-In & Logistics Dispatch",
        subtitle: "Surge Stress & Drop-Tested Boxing",
        description:
          "100% of finished luminaires undergo cyclic on/off voltage stress aging before packaging into drop-tested export cartons for direct dispatch via NH-48 / Vapi.",
        icon: Truck,
        timeline: "Zero-Defect Dispatch",
      },
    ],
  },
  hi: {
    eyebrow: "टर्नकी विनिर्माण रोडमैप",
    title: "CAD ब्लूप्रिंट से बड़े पैमाने पर उत्पादन तक।",
    subtitle:
      "जोखिम को कम करने, बाजार में गति बढ़ाने और शून्य-दोष गुणवत्ता सुनिश्चित करने के लिए डिज़ाइन किया गया 5-चरणीय इंजीनियरिंग जीवनचक्र।",
    ctaText: "चरण 01 शुरू करें: DFM समीक्षा के लिए CAD सबमिट करें",
    stages: [
      {
        number: "01",
        title: "CAD और BOM DFM समीक्षा",
        subtitle: "विनिर्माण योग्यता विश्लेषण",
        description:
          "हमारे इंजीनियर 24 घंटों के भीतर आपके 3D CAD मॉडल, Gerber फाइलों और लागत का विश्लेषण करते हैं।",
        icon: FileCode,
        timeline: "24 – 48 घंटे",
      },
      {
        number: "02",
        title: "इन-हाउस टूलिंग और प्रोटोटाइप",
        subtitle: "सीएनसी मशीनिंग और 3D SLA",
        description:
          "हमारा इन-हाउस टूल रूम मल्टी-कैविटी मोल्ड्स डिजाइन करता है और त्वरित फिटमेंट चेक के लिए प्रोटोटाइप बनाता है।",
        icon: Wrench,
        timeline: "7 – 15 दिन",
      },
      {
        number: "03",
        title: "पायलट रन और बीआईएस परीक्षण",
        subtitle: "फोटोमेट्री और थर्मल स्ट्रेस",
        description:
          "प्री-प्रोडक्शन बैचों को हमारे ऑप्टिकल डार्क रूम में लुमेन आउटपुट और हाई-वोल्टेज सर्ज के लिए परखा जाता है।",
        icon: Microscope,
        timeline: "सत्यापित नमूने",
      },
      {
        number: "04",
        title: "हाई-स्पीड SMT और असेंबली",
        subtitle: "स्वचालित माउंटिंग लाइनें",
        description:
          "स्वचालित सतह-माउंट लाइनों पर पूर्ण उत्पादन, इसके बाद अनुक्रमिक कन्वेयर असेंबली और AOI निरीक्षण।",
        icon: Cpu,
        timeline: "स्केलेबल शिफ्ट",
      },
      {
        number: "05",
        title: "100% बर्न-इन और सुरक्षित डिपैच",
        subtitle: "वोल्टेज तनाव और सुरक्षित पैकिंग",
        description:
          "100% ल्यूमिनेयर पैकेजिंग से पहले चक्रीय वोल्टेज तनाव एजिंग से गुजरते हैं और सुरक्षित रूप से भेजे जाते हैं।",
        icon: Truck,
        timeline: "शून्य-दोष डिपैच",
      },
    ],
  },
};

export default function OEMProcessJourney() {
  const locale = useLocale();
  const copy = locale === "hi" ? processCopy.hi : processCopy.en;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 md:py-32 bg-[#0b192c] text-white border-b border-white/10" id="oem-process">
      <div className="container-wide">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 rounded-full mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <p className="font-mono text-accent text-xs uppercase tracking-wider font-semibold">
              {copy.eyebrow}
            </p>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
            {copy.title}
          </h2>
          <p className="text-white/70 text-base md:text-lg leading-relaxed">
            {copy.subtitle}
          </p>
        </motion.div>

        {/* 5 Sequential Stages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-14">
          {copy.stages.map((stage, i) => {
            const Icon = stage.icon;
            return (
              <motion.div
                key={stage.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group flex flex-col justify-between p-6 bg-white/[0.04] border border-white/10 hover:border-accent hover:bg-white/[0.08] transition-all duration-300 rounded-sm relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-accent text-xs font-bold px-2 py-0.5 bg-accent/20 rounded">
                      STAGE {stage.number}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 group-hover:text-accent group-hover:bg-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-white text-base mb-1.5 group-hover:text-accent transition-colors leading-snug">
                    {stage.title}
                  </h3>
                  <p className="font-mono text-cyan-300 text-[11px] mb-3">
                    {stage.subtitle}
                  </p>
                  <p className="text-white/70 text-xs leading-relaxed mb-6">
                    {stage.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 mt-auto flex items-center justify-between text-[11px] font-mono text-white/50">
                  <span>Timeline:</span>
                  <span className="text-white font-semibold">{stage.timeline}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive Action Link */}
        <div className="text-center">
          <Link
            href="/rfq"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-accent hover:bg-orange-600 text-white font-mono text-xs font-bold uppercase tracking-wider rounded-sm transition-all duration-200 shadow-xl"
          >
            <span>{copy.ctaText}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
