"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Clock,
  ArrowRight,
  ShieldCheck,
  Zap,
  Building2,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  MessageSquare,
  FileSpreadsheet,
  CalendarCheck,
  Compass,
  Train,
  Plane,
  Car,
  Factory,
} from "lucide-react";

export interface ContactViewProps {
  locale: "en" | "hi";
}

const contactCopy = {
  en: {
    heroEyebrow: "06 / Direct Industrial Channel · Daman Manufacturing",
    heroTitle: "Connect with our engineering & manufacturing team.",
    heroSubtitle:
      "Direct routing to engineering leads, tool designers, and production managers in Daman. 4-hour response SLA for technical inquiries, OEM requirements, and factory visit requests.",
    slaBadges: [
      { label: "4-Hour Response SLA", desc: "Rapid feasibility feedback on technical inquiries" },
      { label: "Direct Engineering Review", desc: "Discuss directly with toolmakers and SMT leads" },
      { label: "Strict NDA & IP Protection", desc: "Proprietary mould and circuit confidentiality" },
      { label: "30,000+ Sq. Ft. Facility Tours", desc: "Welcome client audits and production visits" },
    ],
    quickActions: {
      phoneTitle: "Factory Hotline",
      phoneSubtitle: "Mon – Sat: 9:00 AM – 6:00 PM IST",
      phone1: "+91 93273 45295",
      phone2: "+91 99254 39405",
      whatsappTitle: "WhatsApp Business",
      whatsappSubtitle: "Direct Chat with OEM Engineering Lead",
      whatsappBtn: "Chat on WhatsApp",
      emailTitle: "Official Technical Desk",
      emailSubtitle: "Engineering RFQs & Drawings",
      email: "info@sheetalelectrotech.com",
      rfqTitle: "Dedicated RFQ Portal",
      rfqSubtitle: "Have CAD Files, STEP Models or BOM?",
      rfqBtn: "Open RFQ Portal",
    },
    form: {
      title: "Send an Industrial Inquiry",
      subtitle: "Select your manufacturing domain to route directly to the relevant production unit.",
      intents: [
        { id: "oem_lighting", label: "LED Lighting OEM", subject: "LED Lighting OEM Manufacturing Inquiry" },
        { id: "rigid_packaging", label: "Rigid Packaging", subject: "Rigid Plastic Packaging Inquiry" },
        { id: "smt_electronics", label: "SMT & Electronics", subject: "SMT & Circuit Board Assembly Inquiry" },
        { id: "moulding_tooling", label: "Tool Room & Moulding", subject: "Custom Tooling & Mould Development Inquiry" },
        { id: "factory_visit", label: "Factory Visit / Audit", subject: "Daman Manufacturing Facility Audit Request" },
        { id: "general", label: "General Inquiry", subject: "General Sheetal Electrotech Inquiry" },
      ],
      fullNameLabel: "Full Name *",
      fullNamePlaceholder: "Rajesh Sharma",
      emailLabel: "Work Email *",
      emailPlaceholder: "rajesh@company.com",
      phoneLabel: "Phone / Mobile *",
      phonePlaceholder: "+91 98765 43210",
      companyLabel: "Company / Organization *",
      companyPlaceholder: "Precision Enterprises Ltd.",
      volumeLabel: "Estimated Requirement / Volume",
      volumePlaceholder: "Select estimated production scale (optional)",
      volumeOptions: [
        "Pilot / Prototype Run (< 5,000 units)",
        "Standard Production (5,000 – 25,000 units/mo)",
        "High-Volume Run (25,000 – 100,000 units/mo)",
        "Mass Manufacturing (100,000+ units/mo)",
        "Tooling & Moulding Only",
      ],
      subjectLabel: "Subject *",
      messageLabel: "Technical Requirements & Specifications *",
      messagePlaceholder: "Please share target product, wattage/lumens, resin materials, estimated monthly volume, certifications needed, or target delivery timeline...",
      rfqHint: "Have 3D CAD files (.STEP, .IGES) or complete BOM? Use our dedicated",
      rfqLinkText: "Engineering RFQ Portal with multi-file upload →",
      submitBtn: "Transmit Inquiry to Daman Engineering",
      submittingBtn: "Transmitting to Engineering Desk...",
      successTitle: "Inquiry Successfully Transmitted!",
      successDesc: "Your requirement has been logged with Sheetal's production desk. Our engineering lead will review your specifications and respond within 4 business hours.",
      successRef: "Direct reference copy routed to:",
      sendAnother: "Submit Another Inquiry",
    },
    facilityHub: {
      eyebrow: "Manufacturing Infrastructure",
      title: "Our Facilities & Headquarters",
      subtitle: "Inspect our primary 30,000+ sq ft integrated production complex in Daman or connect with our corporate commercial office in Mumbai.",
      tabs: {
        daman: "Daman Manufacturing Complex (Primary)",
        mumbai: "Mumbai Corporate Office",
      },
      daman: {
        tag: "Primary Manufacturing Plant · 30,000+ Sq. Ft.",
        name: "Sheetal Electrotech Integrated Complex",
        address: "Survey No. 168/28 & 168/29, Opp. Givaudan India Pvt. Ltd, Dhabel, Daman and Diu – 396210, India",
        desc: "Vertically integrated campus housing 9 production divisions including heavy injection moulding, high-speed SMT lines, automated bulb assembly, and tool room.",
        transitTitle: "Logistics & Travel Connectivity",
        transit: [
          { icon: Train, label: "Vapi Railway Station", value: "12 km · ~25 mins via NH 48" },
          { icon: Plane, label: "Surat Int'l Airport (STV)", value: "110 km · ~2 hours" },
          { icon: Plane, label: "Mumbai Int'l Airport (BOM)", value: "165 km · ~3.5 hours" },
          { icon: Car, label: "National Highway 48", value: "Direct industrial corridor access" },
        ],
        directionsBtn: "Open in Google Maps Directions",
        scheduleVisitBtn: "Schedule Factory Tour & Audit",
      },
      mumbai: {
        tag: "Corporate & Commercial Sales Office",
        name: "Sheetal Group Corporate Headquarters",
        address: "Goregaon East, Western Express Highway Corridor, Mumbai, Maharashtra 400063, India",
        desc: "Dedicated to OEM enterprise contracts, executive briefings, commercial terms, and sample evaluations.",
        transitTitle: "Metro & Highway Connectivity",
        transit: [
          { icon: Train, label: "Western Express Highway", value: "Immediate highway access" },
          { icon: Train, label: "Metro Line 7 (Red Line)", value: "Walking distance to station" },
          { icon: Plane, label: "Mumbai Airport (BOM)", value: "12 km · ~25 mins" },
        ],
        directionsBtn: "Open Mumbai Office in Maps",
      },
    },
    faq: {
      eyebrow: "Industrial FAQs",
      title: "Frequently Asked Questions",
      items: [
        {
          q: "How fast can Sheetal quote on a new OEM luminaire or plastic part?",
          a: "For standard catalog variants and modifications, we deliver technical commercial quotes within 4 business hours. For bespoke tooling and custom moulds, our tool designers review your CAD data within 24–48 hours.",
        },
        {
          q: "Can we sign a mutual Non-Disclosure Agreement (NDA) before sharing CAD files?",
          a: "Yes, absolutely. We routinely sign bilateral NDAs with our OEM brand partners before receiving STEP/IGES CAD files or proprietary PCB schematics to safeguard your intellectual property.",
        },
        {
          q: "Can client engineering teams visit the Daman facility for an audit?",
          a: "We welcome prospective and existing clients to audit our clean rooms, SMT lines, mould shop, and testing labs. We can also assist with local transit pickup from Vapi Railway Station.",
        },
        {
          q: "What certifications are supported at the Daman plant?",
          a: "Our facility operates under an audited ISO 9001:2015 Quality Management System. Products comply with BIS (Bureau of Indian Standards), CE, and RoHS standards with 100% in-house photometric and electrical testing.",
        },
      ],
    },
  },
  hi: {
    heroEyebrow: "06 / प्रत्यक्ष औद्योगिक संपर्क · दमन विनिर्माण इकाई",
    heroTitle: "हमारी इंजीनियरिंग और विनिर्माण टीम से संपर्क करें।",
    heroSubtitle:
      "दमन में सीधे इंजीनियरिंग प्रमुखों, मोल्ड डिजाइनरों और प्रोडक्शन प्रबंधकों से जुड़ें। तकनीकी पूछताछ, OEM आवश्यकताओं और फैक्ट्री विजिट के लिए 4 घंटे का प्रतिक्रिया SLA।",
    slaBadges: [
      { label: "4-घंटे का प्रतिक्रिया SLA", desc: "तकनीकी आवश्यकताओं पर त्वरित व्यवहार्यता प्रतिक्रिया" },
      { label: "प्रत्यक्ष इंजीनियरिंग समीक्षा", desc: "टूलमेकर्स और SMT विशेषज्ञों से सीधे चर्चा करें" },
      { label: "सख्त NDA और IP सुरक्षा", desc: "स्वामित्व वाले मोल्ड और सर्किट की पूर्ण गोपनीयता" },
      { label: "30,000+ वर्ग फुट फैक्ट्री टूर", desc: "क्लाइंट ऑडिट और उत्पादन निरीक्षण का स्वागत है" },
    ],
    quickActions: {
      phoneTitle: "फैक्ट्री हॉटलाइन",
      phoneSubtitle: "सोम – शनि: 9:00 AM – 6:00 PM IST",
      phone1: "+91 93273 45295",
      phone2: "+91 99254 39405",
      whatsappTitle: "व्हाट्सएप बिज़नेस",
      whatsappSubtitle: "OEM इंजीनियरिंग हेड से सीधा संवाद",
      whatsappBtn: "व्हाट्सएप पर चैट करें",
      emailTitle: "आधिकारिक तकनीकी ईमेल",
      emailSubtitle: "इंजीनियरिंग RFQ और ड्रॉइंग्स",
      email: "info@sheetalelectrotech.com",
      rfqTitle: "समर्पित RFQ पोर्टल",
      rfqSubtitle: "CAD फाइलें, STEP मॉडल या BOM उपलब्ध हैं?",
      rfqBtn: "RFQ पोर्टल खोलें",
    },
    form: {
      title: "औद्योगिक आवश्यकता भेजें",
      subtitle: "सीधे संबंधित उत्पादन विभाग तक पहुंचने के लिए अपना विनिर्माण क्षेत्र चुनें।",
      intents: [
        { id: "oem_lighting", label: "LED लाइटिंग OEM", subject: "LED लाइटिंग OEM विनिर्माण पूछताछ" },
        { id: "rigid_packaging", label: "कठोर पैकेजिंग", subject: "कठोर प्लास्टिक पैकेजिंग पूछताछ" },
        { id: "smt_electronics", label: "SMT और इलेक्ट्रॉनिक्स", subject: "SMT और सर्किट बोर्ड असेंबली पूछताछ" },
        { id: "moulding_tooling", label: "टूल रूम और मोल्डिंग", subject: "कस्टम टूलिंग और मोल्ड विकास पूछताछ" },
        { id: "factory_visit", label: "फैक्ट्री विजिट / ऑडिट", subject: "दमन विनिर्माण सुविधा ऑडिट अनुरोध" },
        { id: "general", label: "सामान्य पूछताछ", subject: "सामान्य शीतल इलेक्ट्रो-टेक पूछताछ" },
      ],
      fullNameLabel: "पूरा नाम *",
      fullNamePlaceholder: "राजेश शर्मा",
      emailLabel: "कंपनी का ईमेल *",
      emailPlaceholder: "rajesh@company.com",
      phoneLabel: "फ़ोन / मोबाइल *",
      phonePlaceholder: "+91 98765 43210",
      companyLabel: "कंपनी / संगठन *",
      companyPlaceholder: "प्रिसिजन एंटरप्राइजेज लिमिटेड",
      volumeLabel: "अनुमानित मात्रा / आवश्यकता",
      volumePlaceholder: "अनुमानित उत्पादन पैमाना चुनें (वैकल्पिक)",
      volumeOptions: [
        "पायलट / प्रोटोटाइप रन (< 5,000 यूनिट्स)",
        "मानक उत्पादन (5,000 – 25,000 यूनिट्स/माह)",
        "उच्च मात्रा रन (25,000 – 100,000 यूनिट्स/माह)",
        "बड़े पैमाने पर उत्पादन (100,000+ यूनिट्स/माह)",
        "केवल टूलिंग और मोल्डिंग",
      ],
      subjectLabel: "विषय *",
      messageLabel: "तकनीकी आवश्यकताएं और विनिर्देश *",
      messagePlaceholder: "कृपया लक्षित उत्पाद, वाट/लुमेन, रेजिन सामग्री, मासिक मात्रा, आवश्यक प्रमाणपत्र या डिलीवरी समयसीमा साझा करें...",
      rfqHint: "क्या आपके पास 3D CAD फाइलें (.STEP, .IGES) या BOM है? हमारे समर्पित",
      rfqLinkText: "इंजीनियरिंग RFQ पोर्टल का उपयोग करें (मल्टी-फाइल अपलोड) →",
      submitBtn: "दमन इंजीनियरिंग टीम को भेजें",
      submittingBtn: "इंजीनियरिंग डेस्क को भेजा जा रहा है...",
      successTitle: "पूछताछ सफलतापूर्वक प्रेषित!",
      successDesc: "आपकी आवश्यकता शीतल के उत्पादन डेस्क पर दर्ज कर ली गई है। हमारी इंजीनियरिंग टीम आपके विनिर्देशों की समीक्षा करेगी और 4 व्यावसायिक घंटों के भीतर जवाब देगी।",
      successRef: "सीधी संदर्भ प्रति यहां भेजी गई:",
      sendAnother: "एक और पूछताछ भेजें",
    },
    facilityHub: {
      eyebrow: "विनिर्माण अवसंरचना",
      title: "हमारी सुविधाएं और मुख्यालय",
      subtitle: "दमन में हमारे प्राथमिक 30,000+ वर्ग फुट एकीकृत उत्पादन परिसर का निरीक्षण करें या मुंबई में हमारे कॉर्पोरेट कार्यालय से संपर्क करें।",
      tabs: {
        daman: "दमन विनिर्माण परिसर (मुख्य प्लांट)",
        mumbai: "मुंबई कॉर्पोरेट कार्यालय",
      },
      daman: {
        tag: "मुख्य विनिर्माण प्लांट · 30,000+ वर्ग फुट",
        name: "शीतल इलेक्ट्रो-टेक एकीकृत परिसर",
        address: "सर्वे नं. 168/28 और 168/29, गिवाउदान इंडिया के सामने, धाबेल, दमन और दीव – 396210, भारत",
        desc: "वर्टिकली इंटीग्रेटेड परिसर जिसमें इंजेक्शन मोल्डिंग, हाई-स्पीड SMT लाइन्स, ऑटोमेटेड बल्ब असेंबली और टूल रूम सहित 9 उत्पादन विभाग शामिल हैं।",
        transitTitle: "लॉजिस्टिक्स और यात्रा कनेक्टिविटी",
        transit: [
          { icon: Train, label: "वापी रेलवे स्टेशन", value: "12 किमी · NH 48 के माध्यम से ~25 मिनट" },
          { icon: Plane, label: "सूरत अंतर्राष्ट्रीय हवाई अड्डा (STV)", value: "110 किमी · ~2 घंटे" },
          { icon: Plane, label: "मुंबई अंतर्राष्ट्रीय हवाई अड्डा (BOM)", value: "165 किमी · ~3.5 घंटे" },
          { icon: Car, label: "राष्ट्रीय राजमार्ग 48", value: "सीधा औद्योगिक कॉरिडोर संपर्क" },
        ],
        directionsBtn: "गूगल मैप्स में दिशा-निर्देश देखें",
        scheduleVisitBtn: "फैक्ट्री टूर और ऑडिट शेड्यूल करें",
      },
      mumbai: {
        tag: "कॉर्पोरेट और कमर्शियल सेल्स कार्यालय",
        name: "शीतल ग्रुप कॉर्पोरेट मुख्यालय",
        address: "गोरेगांव पूर्व, वेस्टर्न एक्सप्रेस हाईवे कॉरिडोर, मुंबई, महाराष्ट्र 400063, भारत",
        desc: "OEM एंटरप्राइज अनुबंधों, कार्यकारी बैठकों, व्यावसायिक शर्तों और नमूना मूल्यांकन के लिए समर्पित।",
        transitTitle: "मेट्रो और हाईवे कनेक्टिविटी",
        transit: [
          { icon: Train, label: "वेस्टर्न एक्सप्रेस हाईवे", value: "सीधा हाईवे एक्सेस" },
          { icon: Train, label: "मेट्रो लाइन 7 (रेड लाइन)", value: "स्टेशन से पैदल दूरी" },
          { icon: Plane, label: "मुंबई हवाई अड्डा (BOM)", value: "12 किमी · ~25 मिनट" },
        ],
        directionsBtn: "गूगल मैप्स में मुंबई कार्यालय देखें",
      },
    },
    faq: {
      eyebrow: "औद्योगिक FAQ",
      title: "अक्सर पूछे जाने वाले प्रश्न",
      items: [
        {
          q: "शीतल नए OEM ल्यूमिनेयर या प्लास्टिक घटक पर कितनी जल्दी कोटेशन दे सकता है?",
          a: "मानक कैटलॉग वेरिएंट और संशोधनों के लिए, हम 4 व्यावसायिक घंटों के भीतर वाणिज्यिक कोटेशन प्रदान करते हैं। कस्टम टूलिंग और नए मोल्ड के लिए, हमारे टूल डिजाइनर 24–48 घंटों में आपके CAD डेटा की समीक्षा करते हैं।",
        },
        {
          q: "क्या हम CAD फाइलें साझा करने से पहले गैर-प्रकटीकरण समझौता (NDA) कर सकते हैं?",
          a: "हाँ, बिल्कुल। हम आपकी बौद्धिक संपदा की सुरक्षा के लिए STEP/IGES CAD फाइलें या PCB स्कीमेटिक्स प्राप्त करने से पहले अपने OEM ब्रांड भागीदारों के साथ पारस्परिक NDA निष्पादित करते हैं।",
        },
        {
          q: "क्या ग्राहक इंजीनियरिंग टीम ऑडिट के लिए दमन सुविधा का दौरा कर सकती है?",
          a: "हम संभावित और मौजूदा ग्राहकों का हमारे क्लीन रूम, SMT लाइन्स, मोल्ड शॉप और परीक्षण प्रयोगशालाओं के ऑडिट के लिए स्वागत करते हैं। हम वापी रेलवे स्टेशन से स्थानीय पिकअप में भी सहायता करते हैं।",
        },
        {
          q: "दमन प्लांट में कौन से प्रमाणपत्र समर्थित हैं?",
          a: "हमारी सुविधा ISO 9001:2015 गुणवत्ता प्रबंधन प्रणाली के तहत संचालित होती है। उत्पाद 100% इन-हाउस फोटोमेट्रिक और इलेक्ट्रिकल परीक्षण के साथ BIS, CE और RoHS मानकों का अनुपालन करते हैं।",
        },
      ],
    },
  },
} as const;

export default function ContactView({ locale }: ContactViewProps) {
  const t = contactCopy[locale];

  const [activeIntent, setActiveIntent] = useState<string>("oem_lighting");
  const [formState, setFormState] = useState<{
    name: string;
    email: string;
    phone: string;
    company: string;
    volume: string;
    subject: string;
    message: string;
  }>({
    name: "",
    email: "",
    phone: "",
    company: "",
    volume: "",
    subject: t.form.intents[0].subject,
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [activeFacilityTab, setActiveFacilityTab] = useState<"daman" | "mumbai">("daman");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleIntentSelect = (intentId: string) => {
    setActiveIntent(intentId);
    const selected = t.form.intents.find((i) => i.id === intentId);
    if (selected) {
      setFormState((prev) => ({
        ...prev,
        subject: selected.subject,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    // Include full subject with volume if specified
    const fullSubject = formState.volume
      ? `${formState.subject} [Volume: ${formState.volume}]`
      : formState.subject;
    formData.set("subject", fullSubject);

    try {
      const { submitContact } = await import("@/app/actions/contact");
      const result = await submitContact(formData);

      setIsSubmitting(false);
      if (result.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(result.message || "Failed to transmit message. Please contact us via phone or email directly.");
      }
    } catch {
      setIsSubmitting(false);
      setErrorMsg("An unexpected network error occurred. Please call or WhatsApp our production hotline directly.");
    }
  };

  const scrollToForm = (intentId?: string) => {
    if (intentId) {
      handleIntentSelect(intentId);
    }
    const formEl = document.getElementById("contact-inquiry-form");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="bg-paper text-ink min-h-screen">
      {/* ═══════════════════════════════════════════
          HERO SECTION — INDUSTRIAL COMMAND
      ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#071322] text-white pt-32 md:pt-40 pb-20 md:pb-28">
        {/* Subtle engineering grid + radial glow orbs */}
        <div className="absolute inset-0 opacity-25 bg-[linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />
        <div className="absolute -left-32 -top-32 w-[520px] h-[520px] rounded-full bg-accent/[.07] blur-[120px] pointer-events-none" />
        <div className="absolute right-0 top-1/4 w-[480px] h-[480px] rounded-full bg-[#ff5e14]/[.06] blur-[120px] pointer-events-none" />

        <div className="container-wide relative z-10">
          <div className="max-w-4xl">
            {/* Breadcrumb & Eyebrow */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="font-mono text-xs uppercase tracking-[.25em] text-accent flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                {t.heroEyebrow}
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-[72px] font-display font-medium leading-[1.02] tracking-tight mb-8">
              {t.heroTitle}
            </h1>

            <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-3xl mb-12">
              {t.heroSubtitle}
            </p>

            {/* 4 Trust & SLA Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-8 border-t border-white/10">
              {t.slaBadges.map((badge, idx) => (
                <div
                  key={idx}
                  className="bg-white/[.04] border border-white/10 rounded-xl p-4 backdrop-blur-sm hover:border-accent/40 hover:bg-white/[.07] transition-all"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff5e14]" />
                    <span className="font-mono text-xs text-white font-semibold">{badge.label}</span>
                  </div>
                  <p className="text-[11px] text-white/50 leading-relaxed">{badge.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          DIRECT FAST-ACTION COMMUNICATION BAR
      ═══════════════════════════════════════════ */}
      <section className="relative z-20 -mt-8 sm:-mt-10 mb-16">
        <div className="container-wide">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. Phone Hotline */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-lg shadow-black/[.04] flex flex-col justify-between hover:border-accent/50 hover:shadow-xl transition-all group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    Live
                  </span>
                </div>
                <h3 className="font-display font-medium text-ink text-base mb-1">
                  {t.quickActions.phoneTitle}
                </h3>
                <p className="text-xs text-steel mb-3 font-mono">
                  {t.quickActions.phoneSubtitle}
                </p>
              </div>
              <div className="space-y-1 pt-3 border-t border-slate-100 font-mono text-xs">
                <a
                  href={`tel:${t.quickActions.phone1.replace(/\s+/g, "")}`}
                  className="block font-semibold text-accent hover:text-blue-700 transition-colors"
                >
                  {t.quickActions.phone1} →
                </a>
                <a
                  href={`tel:${t.quickActions.phone2.replace(/\s+/g, "")}`}
                  className="block text-slate-600 hover:text-accent transition-colors"
                >
                  {t.quickActions.phone2} →
                </a>
              </div>
            </div>

            {/* 2. WhatsApp Direct */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-lg shadow-black/[.04] flex flex-col justify-between hover:border-emerald-500/50 hover:shadow-xl transition-all group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Online
                  </span>
                </div>
                <h3 className="font-display font-medium text-ink text-base mb-1">
                  {t.quickActions.whatsappTitle}
                </h3>
                <p className="text-xs text-steel mb-3">
                  {t.quickActions.whatsappSubtitle}
                </p>
              </div>
              <a
                href="https://wa.me/919327345295?text=Hello%20Sheetal%20Electrotech%2C%20I%20have%20an%20OEM%20manufacturing%20inquiry%20regarding%20LED%20lighting%20%2F%20plastic%20packaging."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs transition-colors shadow-sm"
              >
                {t.quickActions.whatsappBtn}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* 3. Official Email */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-lg shadow-black/[.04] flex flex-col justify-between hover:border-accent/50 hover:shadow-xl transition-all group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-slate-800 group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    24/7 Desk
                  </span>
                </div>
                <h3 className="font-display font-medium text-ink text-base mb-1">
                  {t.quickActions.emailTitle}
                </h3>
                <p className="text-xs text-steel mb-3">
                  {t.quickActions.emailSubtitle}
                </p>
              </div>
              <a
                href={`mailto:${t.quickActions.email}?subject=Sheetal%20Electrotech%20OEM%20Manufacturing%20Inquiry`}
                className="font-mono text-xs font-semibold text-accent hover:text-blue-700 truncate block pt-3 border-t border-slate-100 transition-colors"
              >
                {t.quickActions.email} →
              </a>
            </div>

            {/* 4. RFQ Portal Shortcut */}
            <div className="bg-[#071322] rounded-2xl p-6 border border-white/10 text-white shadow-xl flex flex-col justify-between hover:border-accent/60 transition-all group relative overflow-hidden">
              <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-accent/20 blur-2xl pointer-events-none" />
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center">
                    <FileSpreadsheet className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent/20 text-accent font-semibold">
                    CAD Upload
                  </span>
                </div>
                <h3 className="font-display font-medium text-white text-base mb-1">
                  {t.quickActions.rfqTitle}
                </h3>
                <p className="text-xs text-white/60 mb-3">
                  {t.quickActions.rfqSubtitle}
                </p>
              </div>
              <Link
                href="/rfq"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-ink hover:bg-accent hover:text-white font-medium text-xs transition-all shadow-sm group-hover:shadow-[0_0_20px_rgba(0,102,255,.4)]"
              >
                {t.quickActions.rfqBtn}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          MAIN INTERACTIVE INQUIRY FORM & SIDEBAR
      ═══════════════════════════════════════════ */}
      <section id="contact-inquiry-form" className="py-12 md:py-20">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Form Column (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xl shadow-black/[.03]">
              {submitted ? (
                <div className="py-12 px-6 text-center">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600 shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-display font-medium text-ink mb-3">
                    {t.form.successTitle}
                  </h3>
                  <p className="text-steel text-base max-w-lg mx-auto mb-6 leading-relaxed">
                    {t.form.successDesc}
                  </p>
                  <div className="inline-block bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-mono text-slate-700 mb-8">
                    {t.form.successRef} <span className="font-semibold text-accent">{formState.email || "info@sheetalelectrotech.com"}</span>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormState({
                          name: "",
                          email: "",
                          phone: "",
                          company: "",
                          volume: "",
                          subject: t.form.intents[0].subject,
                          message: "",
                        });
                      }}
                      className="px-6 py-3 rounded-xl bg-ink text-white text-xs font-medium hover:bg-slate-800 transition-colors"
                    >
                      {t.form.sendAnother}
                    </button>
                    <Link
                      href="/products"
                      className="px-6 py-3 rounded-xl border border-slate-200 text-ink text-xs font-medium hover:bg-slate-50 transition-colors"
                    >
                      Explore Products Portfolio →
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-8">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-accent font-semibold block mb-2">
                      Direct Routing System
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-display font-medium text-ink mb-2">
                      {t.form.title}
                    </h2>
                    <p className="text-sm text-steel leading-relaxed">
                      {t.form.subtitle}
                    </p>
                  </div>

                  {/* Honeypot for Anti-Spam protection */}
                  <div className="absolute -left-[10000px] w-px h-px overflow-hidden" aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                  </div>

                  {/* Intent Selection Pills */}
                  <div className="mb-8">
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-3">
                      Select Inquiry Domain
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {t.form.intents.map((intent) => {
                        const isSelected = activeIntent === intent.id;
                        return (
                          <button
                            key={intent.id}
                            type="button"
                            onClick={() => handleIntentSelect(intent.id)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                              isSelected
                                ? "bg-accent text-white shadow-md shadow-accent/25 font-semibold"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200/80"
                            }`}
                          >
                            {intent.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2-Column Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label htmlFor="name" className="block text-xs font-medium text-ink mb-2">
                        {t.form.fullNameLabel}
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        autoComplete="name"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-ink text-sm bg-slate-50/50 focus:bg-white focus:border-accent focus:ring-2 focus:ring-accent/15 outline-none transition-all placeholder:text-slate-400"
                        placeholder={t.form.fullNamePlaceholder}
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-medium text-ink mb-2">
                        {t.form.emailLabel}
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        autoComplete="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-ink text-sm bg-slate-50/50 focus:bg-white focus:border-accent focus:ring-2 focus:ring-accent/15 outline-none transition-all placeholder:text-slate-400"
                        placeholder={t.form.emailPlaceholder}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label htmlFor="phone" className="block text-xs font-medium text-ink mb-2">
                        {t.form.phoneLabel}
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        autoComplete="tel"
                        required
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-ink text-sm bg-slate-50/50 focus:bg-white focus:border-accent focus:ring-2 focus:ring-accent/15 outline-none transition-all placeholder:text-slate-400"
                        placeholder={t.form.phonePlaceholder}
                      />
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-xs font-medium text-ink mb-2">
                        {t.form.companyLabel}
                      </label>
                      <input
                        id="company"
                        type="text"
                        name="company"
                        autoComplete="organization"
                        required
                        value={formState.company}
                        onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-ink text-sm bg-slate-50/50 focus:bg-white focus:border-accent focus:ring-2 focus:ring-accent/15 outline-none transition-all placeholder:text-slate-400"
                        placeholder={t.form.companyPlaceholder}
                      />
                    </div>
                  </div>

                  {/* Volume Scale Dropdown */}
                  <div className="mb-5">
                    <label htmlFor="volume" className="block text-xs font-medium text-ink mb-2">
                      {t.form.volumeLabel}
                    </label>
                    <select
                      id="volume"
                      value={formState.volume}
                      onChange={(e) => setFormState({ ...formState, volume: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-ink text-sm bg-slate-50/50 focus:bg-white focus:border-accent focus:ring-2 focus:ring-accent/15 outline-none transition-all"
                    >
                      <option value="">{t.form.volumePlaceholder}</option>
                      {t.form.volumeOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Subject Hidden or Readonly preview */}
                  <input type="hidden" name="subject" value={formState.subject} />

                  {/* Technical Message Area */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="message" className="text-xs font-medium text-ink">
                        {t.form.messageLabel}
                      </label>
                      <span className="text-[11px] font-mono text-slate-400">
                        {formState.message.length} / 5000 chars
                      </span>
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-ink text-sm bg-slate-50/50 focus:bg-white focus:border-accent focus:ring-2 focus:ring-accent/15 outline-none transition-all resize-none placeholder:text-slate-400 leading-relaxed"
                      placeholder={t.form.messagePlaceholder}
                    />
                  </div>

                  {/* RFQ Portal Hint Box */}
                  <div className="mb-8 p-4 rounded-2xl bg-amber-50/80 border border-amber-200/60 flex items-start gap-3 text-xs text-amber-900">
                    <Compass className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      {t.form.rfqHint}{" "}
                      <Link href="/rfq" className="font-semibold underline hover:text-amber-700">
                        {t.form.rfqLinkText}
                      </Link>
                    </p>
                  </div>

                  {errorMsg && (
                    <div
                      role="alert"
                      aria-live="polite"
                      className="mb-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl text-xs leading-relaxed"
                    >
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-3 bg-accent hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium text-sm py-4 px-8 rounded-xl transition-all shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/35"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>{t.form.submittingBtn}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{t.form.submitBtn}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar Column (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Plant Status & Operating Schedule Card */}
              <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-sm">
                <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-display font-medium text-ink text-base">
                      Plant Production Status
                    </span>
                  </div>
                  <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                    Active Operations
                  </span>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-ink">Manufacturing Shift Hours</p>
                      <p className="text-slate-500 font-mono mt-0.5">
                        Mon – Sat: 9:00 AM – 6:00 PM IST (Shift 1 & 2)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-ink">Confidentiality Guarantee</p>
                      <p className="text-slate-500 mt-0.5">
                        Client design IP, mould tooling, and circuit files protected under mutual NDA agreements.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Zap className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-ink">Response Time Protocol</p>
                      <p className="text-slate-500 mt-0.5">
                        Standard RFQs evaluated by senior engineering leads within 4 business hours.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Daman Factory Audit Card */}
              <div className="relative overflow-hidden rounded-3xl bg-[#071322] text-white p-7 border border-white/10 shadow-xl group">
                <div className="absolute right-0 bottom-0 w-44 h-44 rounded-full bg-[#ff5e14]/15 blur-2xl pointer-events-none" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#ff5e14] block mb-2 font-semibold">
                  Factory Inspection & Audit
                </span>
                <h3 className="font-display font-medium text-xl text-white mb-2">
                  Planning a Daman Plant Visit?
                </h3>
                <p className="text-white/70 text-xs leading-relaxed mb-6">
                  We welcome OEM procurement teams, quality auditors, and brand leaders to tour our 30,000+ sq ft manufacturing setup. We coordinate station pickups from Vapi.
                </p>
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => scrollToForm("factory_visit")}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-accent hover:text-white transition-colors"
                  >
                    Request Audit Schedule <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-mono text-[11px] text-white/40">Vapi · 12 km</span>
                </div>
              </div>

              {/* Key Certifications Strip */}
              <div className="bg-slate-100/70 rounded-3xl p-6 border border-slate-200/60">
                <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 block mb-3">
                  Plant Quality Governance
                </span>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="bg-white rounded-xl p-3 border border-slate-200">
                    <p className="font-mono text-sm font-bold text-ink">ISO 9001:2015</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">Quality Systems</p>
                  </div>
                  <div className="bg-white rounded-xl p-3 border border-slate-200">
                    <p className="font-mono text-sm font-bold text-ink">BIS Certified</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">Safety & Photometrics</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          INTERACTIVE DUAL-FACILITY HUB & LIVE MAP
      ═══════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-mist border-y border-steel/10">
        <div className="container-wide">
          <div className="max-w-3xl mb-12">
            <span className="font-mono text-xs uppercase tracking-widest text-accent mb-3 block font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              {t.facilityHub.eyebrow}
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-medium leading-tight mb-4">
              {t.facilityHub.title}
            </h2>
            <p className="text-steel text-base md:text-lg leading-relaxed">
              {t.facilityHub.subtitle}
            </p>
          </div>

          {/* Facility Tab Switcher */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <button
              type="button"
              onClick={() => setActiveFacilityTab("daman")}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-mono uppercase tracking-wider transition-all ${
                activeFacilityTab === "daman"
                  ? "bg-[#071322] text-white shadow-lg font-semibold"
                  : "bg-white text-slate-600 hover:bg-slate-200/80 border border-slate-200"
              }`}
            >
              <Factory className="w-4 h-4 text-accent" />
              <span>{t.facilityHub.tabs.daman}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveFacilityTab("mumbai")}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-mono uppercase tracking-wider transition-all ${
                activeFacilityTab === "mumbai"
                  ? "bg-[#071322] text-white shadow-lg font-semibold"
                  : "bg-white text-slate-600 hover:bg-slate-200/80 border border-slate-200"
              }`}
            >
              <Building2 className="w-4 h-4 text-accent" />
              <span>{t.facilityHub.tabs.mumbai}</span>
            </button>
          </div>

          {/* Active Facility Card + Map Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Facility Details Box (5 cols) */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-lg flex flex-col justify-between">
              {activeFacilityTab === "daman" ? (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-mono text-[10px] uppercase tracking-wider bg-accent/10 text-accent font-semibold px-2.5 py-1 rounded-full">
                      {t.facilityHub.daman.tag}
                    </span>
                  </div>
                  <h3 className="text-2xl font-display font-medium text-ink mb-3">
                    {t.facilityHub.daman.name}
                  </h3>
                  <div className="flex items-start gap-3 text-xs text-steel mb-6 leading-relaxed">
                    <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>{t.facilityHub.daman.address}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-8">
                    {t.facilityHub.daman.desc}
                  </p>

                  <div className="pt-6 border-t border-slate-100">
                    <h4 className="font-mono text-xs uppercase tracking-wider text-ink font-semibold mb-3 flex items-center gap-2">
                      <Compass className="w-3.5 h-3.5 text-accent" />
                      {t.facilityHub.daman.transitTitle}
                    </h4>
                    <div className="space-y-2.5">
                      {t.facilityHub.daman.transit.map((tr, i) => {
                        const Icon = tr.icon;
                        return (
                          <div key={i} className="flex items-center justify-between text-xs py-1">
                            <span className="text-slate-500 flex items-center gap-2">
                              <Icon className="w-3.5 h-3.5 text-accent/70" />
                              {tr.label}
                            </span>
                            <span className="font-mono font-medium text-ink">{tr.value}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-mono text-[10px] uppercase tracking-wider bg-slate-100 text-slate-700 font-semibold px-2.5 py-1 rounded-full">
                      {t.facilityHub.mumbai.tag}
                    </span>
                  </div>
                  <h3 className="text-2xl font-display font-medium text-ink mb-3">
                    {t.facilityHub.mumbai.name}
                  </h3>
                  <div className="flex items-start gap-3 text-xs text-steel mb-6 leading-relaxed">
                    <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>{t.facilityHub.mumbai.address}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-8">
                    {t.facilityHub.mumbai.desc}
                  </p>

                  <div className="pt-6 border-t border-slate-100">
                    <h4 className="font-mono text-xs uppercase tracking-wider text-ink font-semibold mb-3 flex items-center gap-2">
                      <Compass className="w-3.5 h-3.5 text-accent" />
                      {t.facilityHub.mumbai.transitTitle}
                    </h4>
                    <div className="space-y-2.5">
                      {t.facilityHub.mumbai.transit.map((tr, i) => {
                        const Icon = tr.icon;
                        return (
                          <div key={i} className="flex items-center justify-between text-xs py-1">
                            <span className="text-slate-500 flex items-center gap-2">
                              <Icon className="w-3.5 h-3.5 text-accent/70" />
                              {tr.label}
                            </span>
                            <span className="font-mono font-medium text-ink">{tr.value}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-8 border-t border-slate-100 flex flex-wrap gap-3 mt-6">
                {activeFacilityTab === "daman" ? (
                  <>
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=Dhabel+Daman+India+396210"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-accent hover:bg-blue-600 text-white text-xs font-semibold transition-all shadow-md"
                    >
                      {t.facilityHub.daman.directionsBtn}
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      type="button"
                      onClick={() => scrollToForm("factory_visit")}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 hover:bg-slate-100 text-ink text-xs font-semibold transition-all"
                    >
                      <CalendarCheck className="w-3.5 h-3.5 text-accent" />
                      {t.facilityHub.daman.scheduleVisitBtn}
                    </button>
                  </>
                ) : (
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=Goregaon+East+Mumbai+Maharashtra+400063"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-accent hover:bg-blue-600 text-white text-xs font-semibold transition-all shadow-md"
                  >
                    {t.facilityHub.mumbai.directionsBtn}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

            {/* Live Map Frame (7 cols) */}
            <div className="lg:col-span-7 bg-[#071322] rounded-3xl overflow-hidden border border-slate-200/80 shadow-lg relative min-h-[420px] flex flex-col">
              <div className="px-6 py-3.5 bg-[#0b1b30] border-b border-white/10 flex items-center justify-between text-xs font-mono text-white/70">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  {activeFacilityTab === "daman" ? "Coordinates: 20.4124° N, 72.8494° E (Dhabel, Daman)" : "Coordinates: 19.1620° N, 72.8600° E (Goregaon, Mumbai)"}
                </span>
                <span className="text-[11px] text-white/40">OpenStreetMap Interactive</span>
              </div>
              <div className="relative flex-1 w-full min-h-[380px]">
                {activeFacilityTab === "daman" ? (
                  <iframe
                    src="https://www.openstreetmap.org/export/embed.html?bbox=72.825%2C20.395%2C72.875%2C20.435&layer=mapnik&marker=20.4124%2C72.8494"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    title="Sheetal Electrotech Daman Manufacturing Hub"
                    className="w-full h-full min-h-[380px]"
                  />
                ) : (
                  <iframe
                    src="https://www.openstreetmap.org/export/embed.html?bbox=72.84%2C19.14%2C72.88%2C19.18&layer=mapnik&marker=19.162%2C72.86"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    title="Sheetal Group Mumbai Corporate Office"
                    className="w-full h-full min-h-[380px]"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FAQ ACCORDION SECTION
      ═══════════════════════════════════════════ */}
      <section className="py-20 md:py-28">
        <div className="container-wide max-w-4xl">
          <div className="text-center mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-accent mb-3 block font-semibold">
              {t.faq.eyebrow}
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-medium text-ink">
              {t.faq.title}
            </h2>
          </div>

          <div className="space-y-4">
            {t.faq.items.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
                  >
                    <span className="font-display font-medium text-ink text-base md:text-lg">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-accent" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-steel text-sm leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          BOTTOM CTA BAR — BRING YOUR REQUIREMENT
      ═══════════════════════════════════════════ */}
      <section className="py-20 bg-accent text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.06)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />
        <div className="container-wide relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-white/70 block mb-2">
              Ready to Prototype or Scale?
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-medium leading-tight">
              Bring your specification to Daman.
            </h2>
            <p className="text-white/80 text-sm md:text-base mt-3 leading-relaxed">
              From tool design and SMT placement to high-volume assembly and packing, Sheetal is your single manufacturing partner.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/rfq"
              className="inline-flex items-center gap-3 bg-white text-ink px-8 py-4 rounded-xl font-medium hover:bg-[#071322] hover:text-white transition-all shadow-xl"
            >
              Request Engineering Quote <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:+919327345295"
              className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-4 rounded-xl font-medium hover:bg-white/10 transition-colors"
            >
              <Phone className="w-4 h-4" />
              Call Factory
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
