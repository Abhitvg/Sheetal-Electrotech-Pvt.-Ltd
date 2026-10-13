"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLocale } from "next-intl";
import {
  Layers,
  ShieldCheck,
  Wrench,
  Activity,
  TrendingUp,
  MapPin,
  CheckCircle,
} from "lucide-react";

const whySheetalCopy = {
  en: {
    eyebrow: "Why OEM Brands Choose Sheetal",
    title: "Engineered to Solve Complex Manufacturing Challenges.",
    subtitle:
      "Enterprise brands and distributor networks trust Sheetal Electrotech for end-to-end execution, strict IP protection, and uncompromising quality standards.",
    reasons: [
      {
        icon: Layers,
        number: "01",
        title: "Single-Roof Vertical Integration",
        description:
          "From raw polymer granulate to final blister-packed luminaire, every critical phase is executed on-site, eliminating multiple sub-contractor markups and coordination delays.",
        metric: "Zero Subcontractor Delay",
      },
      {
        icon: ShieldCheck,
        number: "02",
        title: "Strict IP & Blueprint Confidentiality",
        description:
          "Enforced non-disclosure agreements, customer-dedicated tooling assets, and secured digital CAD vaults guarantee complete design ownership and trade secret protection.",
        metric: "100% Proprietary Tooling",
      },
      {
        icon: Wrench,
        number: "03",
        title: "In-House Tool Room Agility",
        description:
          "Equipped with precision CNC machining centers and wire-cut EDM, our tool room fabricates and refines production moulds internally without waiting weeks for external die makers.",
        metric: "±0.01 mm Tooling Tolerance",
      },
      {
        icon: Activity,
        number: "04",
        title: "100% Cyclic Burn-In & Aging",
        description:
          "Every luminaire and driver module undergoes cyclic high-voltage surge stress and thermal burn-in on our automated conveyors to prevent early field mortality.",
        metric: "Zero Infant Mortality Target",
      },
      {
        icon: TrendingUp,
        number: "05",
        title: "Flexible Batch Scalability",
        description:
          "Production infrastructure designed to pivot swiftly from small initial pilot runs to high-volume recurring container deliveries as your brand scales market share.",
        metric: "Rapid Ramp-Up Schedules",
      },
      {
        icon: MapPin,
        number: "06",
        title: "Strategic Daman Industrial Hub",
        description:
          "Situated 18 km from Vapi railway junction and right off the Western Express Highway (NH-48), enabling direct fast-freight distribution across India and Mumbai container ports.",
        metric: "Direct NH-48 & Port Access",
      },
    ],
  },
  hi: {
    eyebrow: "OEM ब्रांड शीतल को क्यों चुनते हैं",
    title: "जटिल विनिर्माण चुनौतियों को हल करने के लिए निर्मित।",
    subtitle:
      "अग्रणी ब्रांड और वितरक नेटवर्क एंड-टू-एंड विनिर्माण, सख्त बौद्धिक संपदा सुरक्षा और अडिग गुणवत्ता के लिए शीतल इलेक्ट्रो-टेक पर भरोसा करते हैं।",
    reasons: [
      {
        icon: Layers,
        number: "01",
        title: "एक ही छत के नीचे पूर्ण एकीकरण",
        description:
          "कच्चे पॉलीमर से लेकर अंतिम पैक किए गए ल्यूमिनेयर तक, प्रत्येक महत्वपूर्ण चरण इन-हाउस निष्पादित किया जाता है, जिससे बिचौलियों का खर्च और देरी समाप्त होती है।",
        metric: "शून्य सब-कॉन्ट्रैक्टर देरी",
      },
      {
        icon: ShieldCheck,
        number: "02",
        title: "सख्त NDA और ब्लूप्रिंट गोपनीयता",
        description:
          "लागू गैर-प्रकटीकरण समझौते (NDA), ग्राहक-समर्पित टूलींग संपत्तियां और सुरक्षित सीएडी वॉल्ट पूर्ण डिजाइन स्वामित्व और व्यापार गोपनीयता सुनिश्चित करते हैं।",
        metric: "100% मालिकाना टूलींग",
      },
      {
        icon: Wrench,
        number: "03",
        title: "इन-हाउस टूल रूम की तत्परता",
        description:
          "सटीक सीएनसी और वायर-कट ईडीएम से सुसज्जित, हमारा टूल रूम बाहरी निर्माताओं पर निर्भर हुए बिना मोल्ड्स और डाई का इन-हाउस निर्माण और रखरखाव करता है।",
        metric: "±0.01 मिमी सटीक सहिष्णुता",
      },
      {
        icon: Activity,
        number: "04",
        title: "100% चक्रीय बर्न-इन और एजिंग",
        description:
          "शुरुआती विफलता को रोकने के लिए प्रत्येक ल्यूमिनेयर और ड्राइवर मॉड्यूल को हमारे कन्वेयर पर चक्रीय उच्च-वोल्टेज तनाव और थर्मल बर्न-इन से गुजारा जाता है।",
        metric: "शून्य विफलता दर लक्ष्य",
      },
      {
        icon: TrendingUp,
        number: "05",
        title: "लचीला और स्केलेबल उत्पादन",
        description:
          "हमारा उत्पादन ढांचा पायलट परीक्षण बैचों से लेकर बड़े पैमाने पर मासिक कंटेनर डिलीवरी तक तेजी से अनुकूलित होने के लिए डिज़ाइन किया गया है।",
        metric: "तेज रैंप-अप शेड्यूल",
      },
      {
        icon: MapPin,
        number: "06",
        title: "रणनीतिक दमन औद्योगिक केंद्र",
        description:
          "वापी रेलवे स्टेशन से केवल 18 किमी और एनएच-48 के पास स्थित, जिससे पूरे भारत और मुंबई बंदरगाहों पर त्वरित माल वितरण संभव होता है।",
        metric: "सीधा NH-48 और बंदरगाह संपर्क",
      },
    ],
  },
};

export default function WhySheetal() {
  const locale = useLocale();
  const copy = locale === "hi" ? whySheetalCopy.hi : whySheetalCopy.en;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 md:py-32 bg-[#fafbfc] border-b border-steel/10" id="why-sheetal">
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

        {/* 6 High-Contrast Reason Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {copy.reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group flex flex-col justify-between p-8 border border-steel/15 bg-white hover:border-accent hover:shadow-xl transition-all duration-300 rounded-sm relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 bg-accent/10 rounded-sm flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-steel/40 text-xs font-bold tracking-widest group-hover:text-accent transition-colors">
                      {reason.number}
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-bold text-ink mb-3 group-hover:text-accent transition-colors leading-snug">
                    {reason.title}
                  </h3>

                  <p className="text-steel text-sm leading-relaxed mb-6">
                    {reason.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-steel/10 flex items-center gap-2 text-xs font-mono font-semibold text-accent">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{reason.metric}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
