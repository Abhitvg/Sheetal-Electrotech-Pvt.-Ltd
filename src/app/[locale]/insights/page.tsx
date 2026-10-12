import Image from "next/image";
import { Link } from "@/i18n/routing";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Factory,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Award,
  Cpu,
  FileText,
  HelpCircle,
  UserCheck,
  Sparkles,
  Download,
  ExternalLink,
  ChevronRight,
  Gauge,
  Microscope,
  FileCheck
} from "lucide-react";
import { insights } from "@/data/insights";
import type { Metadata } from "next";
import { localizedMetadata, SITE_URL } from "@/lib/seo";
import { legacyInsightImages } from "@/data/legacyMedia";
import InsightsExplorer from "@/components/InsightsExplorer";
import InsightsFaqAccordion from "@/components/InsightsFaqAccordion";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return localizedMetadata(locale, "/insights", {
    en: {
      title: "Insights & Engineering Knowledge Hub | Sheetal Electrotech Daman",
      description: "Authoritative engineering guides, BIS compliance standards, SMT electronics assembly, injection moulding parameters, and photometric testing by Sheetal Electrotech.",
    },
    hi: {
      title: "अंतर्दृष्टि और इंजीनियरिंग ज्ञान केंद्र | शीतल इलेक्ट्रो-टेक दमन",
      description: "शीतल इलेक्ट्रो-टेक द्वारा आधिकारिक इंजीनियरिंग गाइड, BIS मानक, SMT इलेक्ट्रॉनिक्स असेंबली, और मोल्डिंग विनिर्देश।",
    },
  });
}

function readingTime(content: [string, ...string[]][]) {
  const text = content.flat().join(" ");
  const words = text.replace(/[*_#]/g, "").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

// AEO / FAQ Data structure for direct search engine and AI synthesis
const KNOWLEDGE_FAQS = [
  {
    question: "What are the mandatory BIS standards for LED lighting products manufactured in India?",
    answer: "In India, all LED lighting products must comply with the Compulsory Registration Scheme (CRS) administered by the Bureau of Indian Standards (BIS). Specifically, self-ballasted LED bulbs must meet IS 16102 (Part 1 for safety and Part 2 for performance), fixed/recessed luminaires must comply with IS 10322 (Part 5), and electronic drivers must adhere to IS 15885 (Part 2, Sec 13). Testing mandates high-voltage dielectric withstand, surge immunity up to 2.5–4 kV, total harmonic distortion (THD < 10%), and thermal dissipation compliance under Indian ambient conditions up to 45°C.",
    topic: "Compliance & BIS Standards"
  },
  {
    question: "How does in-house tool room integration reduce OEM lead times for plastic components?",
    answer: "At Sheetal Electrotech, having a dedicated in-house CNC tool room directly adjacent to injection and blow moulding lines eliminates 3 to 6 weeks of external tooling coordination. Our engineers perform 3D CAD/CAM mould design, CNC milling, wire-cut EDM, and trial sampling on the same campus. Die modifications, cooling channel optimization, and preventive maintenance happen in hours rather than days, ensuring consistent part tolerances (±0.01 mm) and uninterrupted mass manufacturing.",
    topic: "Tool Room & Moulding"
  },
  {
    question: "What thermal management practices ensure 50,000+ hour operational lifespan in LED luminaires?",
    answer: "LED lumen maintenance (L70/B50) depends entirely on junction temperature (Tj < 85°C). Sheetal Electrotech optimizes thermal pathways by utilizing MCPCBs (Metal Core PCBs) with thermal conductivity ≥ 1.5–2.0 W/m·K, paired with extruded high-grade aluminum 6063 heat sinks or thermally conductive engineering plastics with optimized convection fins. This keeps driver capacitors and LED phosphor well below thermal degradation thresholds even during continuous 24/7 industrial operation.",
    topic: "Thermal Engineering & Reliability"
  },
  {
    question: "How does SMT assembly with Automated Optical Inspection (AOI) minimize infant mortality in LED drivers?",
    answer: "Our automated Surface Mount Technology (SMT) lines employ high-speed pick-and-place machinery followed by reflow ovens with multi-zone thermal profiling. Every populated PCB passes through inline Automated Optical Inspection (AOI) to detect solder bridges, tombstoning, and component polarity errors. Completed drivers then undergo 100% cyclic high-voltage burn-in stress aging to filter out early infant mortality before final luminaire boxing.",
    topic: "SMT & Electronics Quality"
  },
  {
    question: "What is the difference between Extrusion Blow Moulding (EBM) and Injection Blow Moulding (IBM) for rigid packaging?",
    answer: "Extrusion Blow Moulding (EBM) extrudes a hollow parison and is optimal for medium-to-large containers (100 ml to 5 liters), handles, and custom asymmetrical packaging. Injection Blow Moulding (IBM) first precision-moulds a preform with finished neck threads before blow-moulding the body, delivering superior neck thread tolerance, uniform wall thickness, and zero flash. IBM is ideal for pharmaceutical bottles, cosmetics, and tight-sealing dropper containers.",
    topic: "Rigid Packaging Engineering"
  },
  {
    question: "What testing reports and quality documentation does Sheetal Electrotech supply with OEM orders?",
    answer: "Every OEM batch manufactured by Sheetal Electrotech can be accompanied by a comprehensive Quality Dossier: First Article Inspection Reports (FAIR), raw material certificates of analysis (COA for virgin polymers), photometric integrating sphere test reports (lumens, CCT, CRI, efficacy), high-voltage flash test logs, drop test verification, and formal Certificate of Conformance (CoC).",
    topic: "Quality Assurance & Documentation"
  }
];

export default function InsightsIndexPage() {
  const featured = insights.find((post) => post.slug === "benefits-of-led-lighting") ?? insights[0];
  const featuredImage = legacyInsightImages[featured.slug]?.[0] || "/images/product_showcase.jpg";

  // JSON-LD Schema for SEO, GEO & AEO
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/en/insights#webpage`,
        "url": `${SITE_URL}/en/insights`,
        "name": "Insights & Engineering Knowledge Hub | Sheetal Electrotech",
        "description": "Comprehensive engineering guides, BIS standards, SMT electronics assembly, injection moulding parameters, and lighting design by Sheetal Electrotech Daman.",
        "isPartOf": {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          "url": SITE_URL,
          "name": "Sheetal Electrotech Pvt. Ltd."
        },
        "about": [
          { "@type": "Thing", "name": "LED Lighting Manufacturing" },
          { "@type": "Thing", "name": "Plastic Injection Moulding" },
          { "@type": "Thing", "name": "Surface Mount Technology SMT" },
          { "@type": "Thing", "name": "Bureau of Indian Standards BIS" },
          { "@type": "Thing", "name": "Rigid Plastic Packaging" }
        ],
        "hasPart": insights.map((post) => ({
          "@type": "Article",
          "headline": post.title,
          "description": post.excerpt,
          "url": `${SITE_URL}/en/insights/${post.slug}`,
          "datePublished": post.datePublished,
          "dateModified": post.dateModified,
          "author": {
            "@type": "Organization",
            "name": "Sheetal Electrotech Engineering & Quality Team"
          }
        }))
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/en/insights#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": `${SITE_URL}/en`
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Insights & Knowledge",
            "item": `${SITE_URL}/en/insights`
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/en/insights#faq`,
        "mainEntity": KNOWLEDGE_FAQS.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }
    ]
  };

  return (
    <main className="min-h-screen bg-paper text-ink">
      {/* Structured Schema Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Hero Section: Luxury Industrial Blueprint Aesthetic */}
      <section className="relative overflow-hidden bg-slate-950 text-white border-b border-slate-800">
        {/* Ambient Factory Photo Backdrop */}
        <div
          className="absolute inset-0 opacity-15 mix-blend-luminosity bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: "url('/images/hero_manufacturing.jpg')" }}
        />
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="absolute -left-40 -top-40 h-[480px] w-[480px] rounded-full bg-accent/15 blur-3xl pointer-events-none" />
        <div className="absolute -right-40 bottom-[-200px] h-[520px] w-[520px] rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 container-wide pt-32 md:pt-40 pb-20 md:pb-28">
          {/* Breadcrumb Path */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-8">
            <Link href="/" className="hover:text-accent transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-accent font-semibold">Insights & Knowledge Hub</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/15 border border-accent/30 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <p className="font-mono text-accent text-xs uppercase tracking-widest font-semibold">
                Sheetal Electrotech · Engineering Knowledge & Standards Hub
              </p>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-medium leading-[1.02] tracking-tight mb-8">
              Manufacturing Mastery.
              <span className="block text-white/50">Lighting Science.</span>
              <span className="block text-white">Precision Engineering.</span>
            </h1>

            <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-3xl mb-12 font-sans">
              Authoritative technical documentation, thermal modeling, BIS compliance methodologies, and tooling engineering from Sheetal Electrotech&apos;s 30,000+ sq. ft. vertically integrated campus in Daman, India.
            </p>

            {/* Core Metrics Strip in Blueprint Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 border-t border-white/15 max-w-4xl">
              <div className="p-4 rounded-sm bg-white/[0.04] border border-white/10 backdrop-blur-sm hover:border-accent/50 transition-colors">
                <div className="flex items-center gap-2 mb-1.5">
                  <BookOpen className="w-4 h-4 text-accent" />
                  <p className="font-display text-3xl md:text-4xl font-bold text-accent">{insights.length}</p>
                </div>
                <p className="text-white text-xs font-semibold">Technical Guides</p>
                <p className="text-slate-400 text-[11px] font-mono mt-0.5">Comprehensive Archive</p>
              </div>

              <div className="p-4 rounded-sm bg-white/[0.04] border border-white/10 backdrop-blur-sm hover:border-white/30 transition-colors">
                <div className="flex items-center gap-2 mb-1.5">
                  <Factory className="w-4 h-4 text-white" />
                  <p className="font-display text-3xl md:text-4xl font-bold text-white">9</p>
                </div>
                <p className="text-white text-xs font-semibold">In-House Divisions</p>
                <p className="text-slate-400 text-[11px] font-mono mt-0.5">Tooling, SMT & Moulding</p>
              </div>

              <div className="p-4 rounded-sm bg-white/[0.04] border border-white/10 backdrop-blur-sm hover:border-white/30 transition-colors">
                <div className="flex items-center gap-2 mb-1.5">
                  <Clock className="w-4 h-4 text-white" />
                  <p className="font-display text-3xl md:text-4xl font-bold text-white">25+ Yrs</p>
                </div>
                <p className="text-white text-xs font-semibold">Shop-Floor Data</p>
                <p className="text-slate-400 text-[11px] font-mono mt-0.5">Empirical Reliability Logs</p>
              </div>

              <div className="p-4 rounded-sm bg-white/[0.04] border border-white/10 backdrop-blur-sm hover:border-accent/50 transition-colors">
                <div className="flex items-center gap-2 mb-1.5">
                  <ShieldCheck className="w-4 h-4 text-accent" />
                  <p className="font-display text-3xl md:text-4xl font-bold text-accent">100%</p>
                </div>
                <p className="text-white text-xs font-semibold">BIS & ISO Compliant</p>
                <p className="text-slate-400 text-[11px] font-mono mt-0.5">IS 16102 · IS 10322 · CRS</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Insight Spotlight */}
      {featured && (
        <section className="py-16 md:py-24 border-b border-slate-200 bg-white">
          <div className="container-wide">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <p className="font-mono text-accent text-xs uppercase tracking-[.25em] mb-2 font-semibold">
                  Featured Knowledge Spotlight
                </p>
                <h2 className="text-3xl md:text-4xl font-display font-medium text-ink">
                  Start with First Principles
                </h2>
              </div>
              <Link
                href={`/insights/${featured.slug}`}
                className="inline-flex items-center gap-2 text-accent text-sm font-semibold uppercase tracking-wider hover:text-orange-600 transition-colors"
              >
                Read Featured Engineering Article <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <Link
              href={`/insights/${featured.slug}`}
              className="group grid lg:grid-cols-[1.15fr_.85fr] bg-slate-950 text-white rounded-sm overflow-hidden border border-slate-800 shadow-2xl hover:border-accent/40 transition-all duration-500"
            >
              {/* Left Column: High-Res Spotlight Photo */}
              <div className="relative min-h-[400px] lg:min-h-[520px] bg-slate-900 overflow-hidden">
                <Image
                  src={featuredImage}
                  alt={`${featured.title} — official Sheetal Electrotech engineering source`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />
                
                {/* Floating Badges */}
                <div className="absolute left-6 top-6 flex items-center gap-2">
                  <span className="px-3 py-1 bg-black/85 backdrop-blur-md text-white font-mono text-[10px] uppercase tracking-widest border border-white/10 rounded-xs">
                    {featured.category}
                  </span>
                  <span className="px-3 py-1 bg-accent text-ink font-mono text-[10px] uppercase tracking-widest font-bold rounded-xs shadow-xs">
                    {readingTime(featured.content)} min read
                  </span>
                </div>

                {/* Technical Specifications Watermark Strip */}
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-slate-950/85 backdrop-blur-md border border-white/10 rounded-xs flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Luminous Efficacy</span>
                    <span className="text-accent font-bold">≥ 100 lm/W</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Operational Life</span>
                    <span className="text-white font-bold">25,000 – 50,000 Hrs</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Standard Compliance</span>
                    <span className="text-white font-bold">IS 16102 / CRS</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Daman Division</span>
                    <span className="text-accent font-bold">Div 09 · Photometrics</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Key Takeaways & Pull Quote */}
              <div className="p-8 md:p-12 lg:p-14 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-accent font-mono text-xs uppercase tracking-widest mb-4">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>01 · High-Impact Engineering Guide</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium leading-tight mb-6 group-hover:text-accent transition-colors">
                    {featured.title}
                  </h3>
                  <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-8 font-sans">
                    {featured.excerpt}
                  </p>
                </div>

                <div className="space-y-4 pt-6 border-t border-slate-800">
                  {featured.keyStat && (
                    <div className="border border-white/10 bg-white/5 p-5 rounded-xs">
                      <p className="font-mono text-[10px] uppercase tracking-widest text-accent mb-1 font-semibold">
                        Key Empirical Stat
                      </p>
                      <p className="text-2xl md:text-3xl font-display font-medium text-white">
                        {featured.keyStat}
                      </p>
                    </div>
                  )}
                  {featured.pullQuote && (
                    <blockquote className="border-l-2 border-accent pl-5 text-slate-300 text-sm md:text-base italic leading-relaxed">
                      “{featured.pullQuote}”
                    </blockquote>
                  )}
                  <div className="pt-2 flex items-center justify-between text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <ShieldCheck className="w-4 h-4 text-accent" />
                      Reviewed by Sheetal R&D Board
                    </span>
                    <span className="text-accent group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 font-bold">
                      Read Full Analysis →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Interactive Knowledge Explorer (Real-Time Search, Filters & Cards) */}
      <section className="py-16 md:py-24 border-b border-slate-200 bg-paper">
        <div className="container-wide">
          <div className="mb-10">
            <p className="font-mono text-accent text-xs uppercase tracking-[.25em] mb-2 font-semibold">
              Searchable Engineering Index
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-medium text-ink">
              Explore All Technical Documentation
            </h2>
            <p className="text-slate-600 text-base mt-2 max-w-2xl">
              Filter by engineering discipline, search by specific technical terms or standard codes, and access verified manufacturing blueprints.
            </p>
          </div>

          <InsightsExplorer
            insights={insights}
            legacyInsightImages={legacyInsightImages}
          />
        </div>
      </section>

      {/* AEO / GEO Technical Standards Matrix (Targeted for AI Search Engines & Procurement Audits) */}
      <section className="py-20 md:py-28 bg-white border-b border-slate-200">
        <div className="container-wide">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/15 border border-accent/30 rounded-full mb-4">
              <Award className="w-3.5 h-3.5 text-accent" />
              <p className="font-mono text-accent text-xs uppercase tracking-widest font-semibold">
                GEO & AEO Technical Specifications Matrix
              </p>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-medium text-ink mb-4">
              Engineering Benchmarks & Standards
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Direct technical parameters and quality assurance thresholds enforced across all Sheetal Electrotech manufacturing lines in Daman.
            </p>
          </div>

          {/* Comparative Standards Table with Status Chips */}
          <div className="overflow-x-auto border border-slate-200 rounded-sm shadow-sm mb-12">
            <table className="w-full text-left border-collapse min-w-[760px]">
              <thead>
                <tr className="bg-slate-900 text-white font-mono text-xs uppercase tracking-wider">
                  <th className="py-4 px-6 border-b border-slate-800">Manufacturing Domain</th>
                  <th className="py-4 px-6 border-b border-slate-800">Mandatory Standard</th>
                  <th className="py-4 px-6 border-b border-slate-800">Critical Technical Parameters</th>
                  <th className="py-4 px-6 border-b border-slate-800">Sheetal In-House Validation</th>
                  <th className="py-4 px-6 border-b border-slate-800">Audit Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm">
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6 font-semibold text-ink">
                    Self-Ballasted LED Bulbs
                    <span className="block text-xs font-mono text-slate-400 font-normal">Division 07 · Assembly</span>
                  </td>
                  <td className="py-4 px-6 font-mono text-accent font-semibold text-xs whitespace-nowrap">
                    IS 16102 (Part 1 & 2)
                  </td>
                  <td className="py-4 px-6 text-slate-600">
                    Surge immunity ≥ 2.5 kV, CRI ≥ 80, Luminous efficacy ≥ 100 lm/W, Operating voltage 140–300V AC
                  </td>
                  <td className="py-4 px-6 text-slate-700 font-medium">
                    Integrating Sphere spectrophotometer, High-Voltage flash, Surge test generator
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono rounded-xs font-semibold">
                      100% Certified
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6 font-semibold text-ink">
                    Fixed & Recessed Luminaires
                    <span className="block text-xs font-mono text-slate-400 font-normal">Division 07 · Luminaires</span>
                  </td>
                  <td className="py-4 px-6 font-mono text-accent font-semibold text-xs whitespace-nowrap">
                    IS 10322 (Part 5 Sec 1)
                  </td>
                  <td className="py-4 px-6 text-slate-600">
                    Thermal ceiling test &lt; 65°C, Insulation resistance &gt; 2 MΩ, Ingress protection IP20–IP66
                  </td>
                  <td className="py-4 px-6 text-slate-700 font-medium">
                    Thermal stress chamber, Goniophotometer dark room, IP water/dust test booth
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono rounded-xs font-semibold">
                      100% Certified
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6 font-semibold text-ink">
                    Electronic Drivers (PCBA)
                    <span className="block text-xs font-mono text-slate-400 font-normal">Division 02 · SMT Lines</span>
                  </td>
                  <td className="py-4 px-6 font-mono text-accent font-semibold text-xs whitespace-nowrap">
                    IS 15885 (Part 2 Sec 13)
                  </td>
                  <td className="py-4 px-6 text-slate-600">
                    Total Harmonic Distortion (THD) &lt; 10%, Power Factor &gt; 0.95, Over-voltage & Short-circuit cutoff
                  </td>
                  <td className="py-4 px-6 text-slate-700 font-medium">
                    Automated ATE testing bench, 100% cyclic burn-in aging carousel, AOI optical inspection
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono rounded-xs font-semibold">
                      100% Certified
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6 font-semibold text-ink">
                    Injection Mould Tooling
                    <span className="block text-xs font-mono text-slate-400 font-normal">Division 08 · Tool Room</span>
                  </td>
                  <td className="py-4 px-6 font-mono text-accent font-semibold text-xs whitespace-nowrap">
                    DIN 1.2316 / P20 Tool Steel
                  </td>
                  <td className="py-4 px-6 text-slate-600">
                    Machining tolerance ±0.01 mm, Core/Cavity hardness 30–34 HRC, Mirror finish &lt; 0.05 Ra
                  </td>
                  <td className="py-4 px-6 text-slate-700 font-medium">
                    Coordinate Measuring Machine (CMM), CNC VMC probing, Ultrasonic die maintenance
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono rounded-xs font-semibold">
                      100% Certified
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6 font-semibold text-ink">
                    Rigid Packaging Containers
                    <span className="block text-xs font-mono text-slate-400 font-normal">Division 01 & 03 · Moulding</span>
                  </td>
                  <td className="py-4 px-6 font-mono text-accent font-semibold text-xs whitespace-nowrap">
                    IS 15410 / Food Grade FDA
                  </td>
                  <td className="py-4 px-6 text-slate-600">
                    100% Leak tightness, Top-load crush test ≥ 25 kg, Environmental Stress Crack Resistance (ESCR)
                  </td>
                  <td className="py-4 px-6 text-slate-700 font-medium">
                    Hydrostatic leak tester, Drop test platform, Digital wall-thickness micrometer
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono rounded-xs font-semibold">
                      100% Certified
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Test Equipment Capabilities Banner */}
          <div className="bg-paper border border-slate-200 p-6 md:p-8 rounded-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white border border-slate-200 rounded-sm flex items-center justify-center shrink-0 text-accent">
                <Microscope className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-display font-bold text-lg text-ink">
                  Full Test Laboratory Traceability in Daman
                </h4>
                <p className="text-slate-600 text-sm max-w-2xl mt-1">
                  Our in-house photometric dark rooms, surge simulation generators, and CMM dimensional laboratories provide 100% batch-wise traceability for OEM clients and third-party quality auditors.
                </p>
              </div>
            </div>
            <Link
              href="/quality"
              className="inline-flex items-center gap-2 bg-ink text-white px-5 py-3 text-xs font-mono uppercase tracking-wider rounded-sm hover:bg-accent hover:text-ink transition-colors shrink-0"
            >
              View Quality Accreditations →
            </Link>
          </div>
        </div>
      </section>

      {/* OEM Engineering Dossier & Product Catalogue Download Section */}
      <section className="py-16 md:py-20 bg-slate-900 text-white border-b border-slate-800">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 rounded-full mb-4">
                <FileCheck className="w-3.5 h-3.5 text-accent" />
                <span className="font-mono text-accent text-xs uppercase tracking-widest font-semibold">
                  Official Technical Publications
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-medium mb-4">
                Download OEM Product &amp; Engineering Catalogues
              </h2>
              <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-6 font-sans">
                Access full photometric specification sheets, dimensional blueprints, packaging container line diagrams, and compliance certificates for your procurement audit.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-white">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent" /> Updated 2026 Edition
                </span>
                <span>·</span>
                <span className="flex items-center gap-1.5 text-white">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent" /> High-Resolution PDF
                </span>
                <span>·</span>
                <span className="flex items-center gap-1.5 text-white">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent" /> Ready for Technical Submittals
                </span>
              </div>
            </div>

            {/* Download Action Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-slate-950 border border-white/10 p-6 rounded-sm hover:border-accent transition-all flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 bg-accent/20 border border-accent/40 rounded-sm flex items-center justify-center text-accent mb-4">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-display font-bold text-white mb-1">
                    Product Catalogue 2026
                  </h4>
                  <p className="text-slate-400 text-xs mb-4">
                    Complete portfolio overview of LED bulbs, battens, downlights, flood lights, and rigid packaging.
                  </p>
                  <span className="text-[10px] font-mono text-slate-400 block mb-6">
                    PDF · Quick Reference · Immediate Access
                  </span>
                </div>
                <a
                  href="/resources/product-catalogue.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-accent text-ink py-3 px-4 font-bold text-xs uppercase tracking-wider rounded-xs hover:bg-white transition-colors"
                >
                  <Download className="w-4 h-4" /> Download Catalogue
                </a>
              </div>

              <div className="bg-slate-950 border border-white/10 p-6 rounded-sm hover:border-accent transition-all flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 bg-blue-500/20 border border-blue-500/40 rounded-sm flex items-center justify-center text-blue-400 mb-4">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-display font-bold text-white mb-1">
                    Comprehensive Dossier
                  </h4>
                  <p className="text-slate-400 text-xs mb-4">
                    Complete 37MB industrial dossier with factory machinery specs, QA test protocols, and tooling blueprints.
                  </p>
                  <span className="text-[10px] font-mono text-slate-400 block mb-6">
                    PDF · 37 MB · Master Engineering Edition
                  </span>
                </div>
                <a
                  href="/resources/Sheetal-update.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/20 py-3 px-4 font-bold text-xs uppercase tracking-wider rounded-xs hover:bg-white hover:text-ink transition-colors"
                >
                  <Download className="w-4 h-4" /> Download Full Dossier
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Answer Engine Optimization (AEO) Direct Q&A Accordion */}
      <section className="py-20 md:py-28 bg-paper border-b border-slate-200">
        <div className="container-wide">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/15 border border-accent/30 rounded-full mb-4">
              <HelpCircle className="w-3.5 h-3.5 text-accent" />
              <p className="font-mono text-accent text-xs uppercase tracking-widest font-semibold">
                Answer Engine Optimization (AEO) Knowledge Archive
              </p>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-medium text-ink mb-4">
              Direct Answers for OEM Specifiers
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed font-sans">
              Concise, factual engineering answers formulated for procurement directors, project consultants, and generative AI research systems.
            </p>
          </div>

          {/* Interactive Accordion with Topic Filters & Clipboard Copy */}
          <InsightsFaqAccordion faqs={KNOWLEDGE_FAQS} />
        </div>
      </section>

      {/* E-E-A-T Editorial Review & Engineering Authority Board */}
      <section className="py-16 md:py-20 bg-white border-b border-slate-200">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/15 border border-accent/30 rounded-full mb-3">
                <UserCheck className="w-3.5 h-3.5 text-accent" />
                <span className="font-mono text-accent text-xs uppercase tracking-widest font-semibold">
                  E-E-A-T Editorial Governance
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-ink">
                Reviewed by Sheetal Electrotech Engineering Directorate
              </h3>
              <p className="text-slate-600 text-sm max-w-xl mx-auto mt-2">
                All articles, standards matrices, and shop-floor test guidelines published in this repository are reviewed and maintained by our department directors in Daman.
              </p>
            </div>

            {/* Executive Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-paper border border-slate-200 p-6 rounded-sm flex items-start gap-4">
                <div className="w-12 h-12 bg-ink text-white rounded-sm flex items-center justify-center font-display font-bold text-lg shrink-0">
                  SPA
                </div>
                <div>
                  <h4 className="font-display font-bold text-lg text-ink">
                    Suresh Prasad Arya
                  </h4>
                  <p className="text-accent text-xs font-mono font-semibold uppercase tracking-wider mb-2">
                    Head of Research & Development (R&D)
                  </p>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    25+ years in optoelectronic engineering, photometric integrating sphere analysis, and Bureau of Indian Standards (BIS CRS) luminaire qualification.
                  </p>
                </div>
              </div>

              <div className="bg-paper border border-slate-200 p-6 rounded-sm flex items-start gap-4">
                <div className="w-12 h-12 bg-accent text-ink rounded-sm flex items-center justify-center font-display font-bold text-lg shrink-0">
                  MY
                </div>
                <div>
                  <h4 className="font-display font-bold text-lg text-ink">
                    Manjit Yadav
                  </h4>
                  <p className="text-ink text-xs font-mono font-semibold uppercase tracking-wider mb-2">
                    Head of Quality Department & Testing
                  </p>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    20+ years overseeing ISO 9001:2015 audit regimes, inline Automated Optical Inspection (AOI), and high-voltage dielectric withstand verification.
                  </p>
                </div>
              </div>
            </div>

            {/* Integrity Statement */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-accent" />
                Daman Industrial Campus · Plot No. 43, 52/2 & 53/1, Silvassa Road
              </span>
              <span>Last Technical Audit: October 2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Consultation & RFQ Call to Action */}
      <section className="py-20 bg-accent text-ink">
        <div className="container-wide flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-ink/75 font-semibold block mb-2">
              Have a Specific Engineering Challenge?
            </span>
            <h3 className="text-3xl md:text-5xl font-display font-medium mb-3">
              Consult with our Daman engineering team.
            </h3>
            <p className="text-ink/80 text-lg max-w-xl font-sans">
              From photometric simulation and CAD mould design to custom SMT driver layouts, our technical experts are available for discovery discussions.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <Link
              href="/rfq"
              className="bg-white text-ink px-8 py-4 font-bold text-base hover:bg-slate-900 hover:text-white transition-colors flex items-center gap-2 whitespace-nowrap shadow-xl rounded-xs"
            >
              Start Technical Discussion <ArrowRight className="w-4 h-4 text-accent" />
            </Link>
            <Link
              href="/facilities"
              className="border-2 border-ink text-ink px-7 py-4 font-bold text-base hover:bg-ink hover:text-white transition-colors whitespace-nowrap rounded-xs"
            >
              View Factory Capabilities
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
