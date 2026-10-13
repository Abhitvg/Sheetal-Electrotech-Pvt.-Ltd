"use client";

import { useRef } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { motion, useInView } from "framer-motion";
import { useLocale } from "next-intl";
import {
  ArrowRight,
  Phone,
  Mail,
  MessageSquare,
  ShieldCheck,
  Clock,
  UploadCloud,
} from "lucide-react";

const ctaCopy = {
  en: {
    badge: "OEM & Manufacturing Intake",
    titlePrefix: "Ready to Scale Your Production with a ",
    titleHighlight: "True In-House Partner?",
    subtitle:
      "Whether you are engineering a custom lighting luminaire, scaling high-speed SMT assembly, or requiring millions of rigid plastic containers, our engineering team is ready to review your CAD files and bill of materials.",
    rfqButton: "Request Quotation & Upload CAD",
    contactButton: "Contact Engineering Desk",
    whatsappButton: "Chat on WhatsApp",
    sla: "4-Hour Response SLA",
    nda: "Strict NDA & IP Confidentiality",
    uploadNotice: "Upload STEP, IGES, Gerber, PCB or PDF drawings for immediate review.",
  },
  hi: {
    badge: "OEM और विनिर्माण इनटेक",
    titlePrefix: "क्या आप अपने उत्पादन को एक ",
    titleHighlight: "विश्वसनीय इन-हाउस पार्टनर के साथ बढ़ाने के लिए तैयार हैं?",
    subtitle:
      "चाहे आप एक कस्टम लाइटिंग ल्यूमिनेयर का निर्माण कर रहे हों, हाई-स्पीड SMT असेंबली की आवश्यकता हो, या लाखों कठोर कंटेनर चाहिए हों, हमारी इंजीनियरिंग टीम आपके विनिर्देशों की समीक्षा करने के लिए तैयार है।",
    rfqButton: "कोटेशन मांगें और CAD अपलोड करें",
    contactButton: "इंजीनियरिंग डेस्क से संपर्क करें",
    whatsappButton: "व्हाट्सएप पर चैट करें",
    sla: "4-घंटे में त्वरित प्रतिक्रिया",
    nda: "सख्त NDA और बौद्धिक संपदा सुरक्षा",
    uploadNotice: "तत्काल समीक्षा के लिए STEP, IGES, Gerber या PDF चित्र अपलोड करें।",
  },
};

export default function CTASection() {
  const locale = useLocale();
  const copy = locale === "hi" ? ctaCopy.hi : ctaCopy.en;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 md:py-32 overflow-hidden bg-[#071322]" id="cta">
      {/* Background Image with Dark Industrial Gradients */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero_factory.jpg"
          alt="Manufacturing facility"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071322] via-[#071322]/95 to-[#0b192c]/90" />
      </div>

      {/* Decorative Grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Content */}
      <div className="container-wide relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-4xl"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-accent/20 border border-accent/40 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <p className="font-mono text-accent text-xs uppercase tracking-wider font-semibold">
              {copy.badge}
            </p>
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
            {copy.titlePrefix}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
              {copy.titleHighlight}
            </span>
          </h2>

          {/* Subheading */}
          <p className="text-white/70 text-base md:text-lg mb-8 max-w-2xl leading-relaxed">
            {copy.subtitle}
          </p>

          {/* SLA & NDA Security Badges */}
          <div className="flex flex-wrap items-center gap-4 mb-10 text-xs font-mono text-white/80">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded">
              <Clock className="w-3.5 h-3.5 text-accent" />
              <span>{copy.sla}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{copy.nda}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded hidden sm:flex">
              <UploadCloud className="w-3.5 h-3.5 text-cyan-400" />
              <span>{copy.uploadNotice}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <Link
              href="/rfq"
              className="group flex items-center gap-3 px-8 py-4 bg-accent hover:bg-orange-600 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all duration-300 rounded-sm shadow-xl"
            >
              <span>{copy.rfqButton}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href="https://wa.me/919327345295?text=Hello%20Sheetal%20Electrotech,%20we%20have%20an%20OEM%20manufacturing%20inquiry."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-6 py-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-mono font-bold text-xs uppercase tracking-wider transition-all duration-200 rounded-sm shadow-md"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{copy.whatsappButton}</span>
            </a>

            <Link
              href="/contact"
              className="flex items-center gap-2 px-6 py-4 border border-white/30 text-white font-mono font-medium text-xs uppercase tracking-wider hover:bg-white/10 transition-all duration-300 rounded-sm"
            >
              {copy.contactButton}
            </Link>
          </div>

          {/* Direct Communication Bar */}
          <div className="pt-8 border-t border-white/15 flex flex-wrap items-center gap-6 md:gap-10 text-white/70 text-xs font-mono">
            <a
              href="mailto:info@sheetalelectrotech.com"
              className="flex items-center gap-2 hover:text-accent transition-colors"
            >
              <Mail className="w-4 h-4 text-accent" />
              <span>info@sheetalelectrotech.com</span>
            </a>
            <a
              href="tel:+919327345295"
              className="flex items-center gap-2 hover:text-accent transition-colors"
            >
              <Phone className="w-4 h-4 text-accent" />
              <span>+91 93273 45295</span>
            </a>
            <a
              href="tel:+919925439405"
              className="flex items-center gap-2 hover:text-accent transition-colors"
            >
              <Phone className="w-4 h-4 text-accent" />
              <span>+91 99254 39405</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
