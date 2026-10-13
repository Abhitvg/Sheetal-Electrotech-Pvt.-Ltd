"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import {
  Quote,
  ShieldCheck,
  Award,
  CheckCircle2,
  CalendarCheck,
  Building,
} from "lucide-react";

const trustCopy = {
  en: {
    eyebrow: "Enterprise Trust & Engineering Track Record",
    title: "Proven Partnerships Across High-Volume OEM Programs.",
    subtitle:
      "National brands, electrical contractors, and distributor networks partner with Sheetal Electrotech for documented reliability, fast-track tooling, and zero-defect execution.",
    auditTitle: "Plan a Comprehensive Factory Audit",
    auditDesc:
      "We invite corporate engineering, sourcing, and quality teams to inspect our 30,000+ sq. ft. Daman manufacturing campus in person.",
    auditBtn: "Schedule Facility Audit",
    testimonials: [
      {
        quote:
          "Sheetal Electrotech's vertical integration reduced our batten manufacturing lead times by 3 full weeks. Having extrusion, SMT PCB mounting, and automated aging under one roof gives our brand unmatched supply reliability.",
        author: "A. K. Verma",
        role: "VP Procurement & Supply Chain",
        sector: "National Architectural Lighting Brand",
        metric: "3-Week Lead Time Reduction",
      },
      {
        quote:
          "Their in-house CNC tool room is their greatest competitive advantage. When we needed urgent cavity modifications for our smart downlight range, their tool room completed alterations on-site in 4 days without third-party delays.",
        author: "Ramesh Patel",
        role: "Technical Director",
        sector: "Smart Electrical Appliances OEM",
        metric: "4-Day In-House Tooling Turnaround",
      },
      {
        quote:
          "Strict dimensional tolerances, zero neck flash, and clean lot-level traceability. We have relied on Sheetal's blow moulding facility for 5L chemical jerrycans and pharma bottles without a single batch quality failure.",
        author: "S. M. Mehta",
        role: "Head of Packaging Sourcing",
        sector: "Specialty Chemicals & Pharma",
        metric: "Zero Batch Rejection Record",
      },
    ],
    accreditations: [
      {
        title: "BIS Certified Compliance",
        subtitle: "Products tested to Indian safety & performance standards",
        icon: Award,
      },
      {
        title: "ISO 9001 Process Discipline",
        subtitle: "Documented material traceability & QA checkpoints",
        icon: ShieldCheck,
      },
      {
        title: "ESD-Protected SMT Line",
        subtitle: "Complete electrostatic discharge defense for ICs",
        icon: CheckCircle2,
      },
      {
        title: "30,000+ Sq. Ft. Integrated Campus",
        subtitle: "Single-roof manufacturing in Daman industrial zone",
        icon: Building,
      },
    ],
  },
  hi: {
    eyebrow: "विश्वसनीयता और इंजीनियरिंग ट्रैक रिकॉर्ड",
    title: "उच्च-मात्रा OEM कार्यक्रमों में सिद्ध साझेदारी।",
    subtitle:
      "अग्रणी ब्रांड, इलेक्ट्रिकल ठेकेदार और वितरक नेटवर्क विश्वसनीयता, तेज टूलींग और शून्य-दोष निष्पादन के लिए शीतल इलेक्ट्रो-टेक पर भरोसा करते हैं।",
    auditTitle: "व्यापक फैक्टरी ऑडिट की योजना बनाएं",
    auditDesc:
      "हम कॉर्पोरेट इंजीनियरिंग और खरीद टीमों को हमारे 30,000+ वर्ग फुट दमन विनिर्माण परिसर का व्यक्तिगत रूप से निरीक्षण करने के लिए आमंत्रित करते हैं।",
    auditBtn: "ऑडिट शेड्यूल करें",
    testimonials: [
      {
        quote:
          "शीतल इलेक्ट्रो-टेक के वर्टिकल इंटीग्रेशन ने हमारे बैटन निर्माण के समय को 3 सप्ताह तक कम कर दिया। एक ही छत के नीचे एक्सट्रूज़न, एसएमटी माउंटिंग और ऑटोमेटेड एजिंग होने से हमारे ब्रांड को अद्वितीय आपूर्ति विश्वसनीयता मिलती है।",
        author: "ए. के. वर्मा",
        role: "उपाध्यक्ष - खरीद और आपूर्ति",
        sector: "राष्ट्रीय लाइटिंग ब्रांड",
        metric: "3-सप्ताह समय की बचत",
      },
      {
        quote:
          "इनका इन-हाउस सीएनसी टूल रूम इनका सबसे बड़ा लाभ है। जब हमें अपनी स्मार्ट डाउनलाइट श्रृंखला के लिए तत्काल मोल्ड संशोधनों की आवश्यकता थी, तो उनकी टीम ने केवल 4 दिनों में साइट पर परिवर्तन पूरे कर दिए।",
        author: "रमेश पटेल",
        role: "तकनीकी निदेशक",
        sector: "कंज्यूमर इलेक्ट्रिकल OEM",
        metric: "4-दिन में मोल्ड संशोधन",
      },
      {
        quote:
          "सटीक नेक फिनिश और सख्त बैच ट्रेसेबिलिटी। हमने बिना किसी अस्वीकृति के फार्मा बोतलों और कंटेनरों के लिए शीतल की ब्लो मोल्डिंग सुविधा पर पूर्ण भरोसा किया है।",
        author: "एस. एम. मेहता",
        role: "पैकेजिंग सोर्सिंग प्रमुख",
        sector: "स्पेशलिटी केमिकल्स और फार्मा",
        metric: "शून्य बैच अस्वीकृति रिकॉर्ड",
      },
    ],
    accreditations: [
      {
        title: "बीआईएस प्रमाणित अनुपालन",
        subtitle: "भारतीय सुरक्षा और प्रदर्शन मानकों के अनुरूप परीक्षित उत्पाद",
        icon: Award,
      },
      {
        title: "ISO 9001 प्रक्रिया अनुशासन",
        subtitle: "दस्तावेजी सामग्री ट्रेसेबिलिटी और QA चेकपॉइंट्स",
        icon: ShieldCheck,
      },
      {
        title: "ESD-संरक्षित SMT लाइन",
        subtitle: "संवेदनशील अर्धचालकों के लिए इलेक्ट्रोस्टैटिक डिस्चार्ज सुरक्षा",
        icon: CheckCircle2,
      },
      {
        title: "30,000+ वर्ग फुट एकीकृत परिसर",
        subtitle: "दमन औद्योगिक क्षेत्र में एकल-छत विनिर्माण",
        icon: Building,
      },
    ],
  },
};

export default function Testimonials() {
  const locale = useLocale();
  const copy = locale === "hi" ? trustCopy.hi : trustCopy.en;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 md:py-32 bg-[#071322] text-white border-b border-white/10" id="approach">
      <div className="container-wide">
        {/* Header */}
        <motion.div
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

        {/* 4 Accreditations Ribbon */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {copy.accreditations.map((acc, i) => {
            const Icon = acc.icon;
            return (
              <motion.div
                key={acc.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-6 bg-white/5 border border-white/10 rounded-sm hover:border-accent/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-sm bg-accent/20 flex items-center justify-center text-accent mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-display font-bold text-base text-white mb-1.5">
                  {acc.title}
                </h4>
                <p className="text-white/60 text-xs leading-relaxed">
                  {acc.subtitle}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {copy.testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="group flex flex-col justify-between p-8 bg-white/[0.04] border border-white/10 hover:border-accent hover:bg-white/[0.07] transition-all duration-300 rounded-sm relative"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <Quote className="w-8 h-8 text-accent/40 group-hover:text-accent transition-colors" />
                  <span className="px-2 py-0.5 bg-accent/20 border border-accent/40 rounded text-[11px] font-mono text-accent font-semibold">
                    {t.metric}
                  </span>
                </div>

                <p className="text-white/80 text-sm leading-relaxed italic mb-8">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 mt-auto">
                <p className="font-display font-bold text-white text-base">
                  {t.author}
                </p>
                <p className="text-accent text-xs font-mono font-medium mb-1">
                  {t.role}
                </p>
                <p className="text-white/50 text-[11px]">
                  {t.sector}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Factory Audit CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="p-8 bg-gradient-to-r from-blue-950/60 to-slate-900/60 border border-blue-500/30 rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div className="max-w-2xl">
            <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-2">
              {copy.auditTitle}
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">
              {copy.auditDesc}
            </p>
          </div>

          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 px-6 py-3.5 bg-accent hover:bg-orange-600 text-white font-mono text-xs font-bold uppercase tracking-wider rounded-sm transition-all duration-200 shadow-md self-start md:self-auto flex-shrink-0"
          >
            <CalendarCheck className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>{copy.auditBtn}</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
