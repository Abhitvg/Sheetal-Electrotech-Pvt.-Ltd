import Image from "next/image";
import { Link } from "@/i18n/routing";
import {
  ShieldCheck,
  CheckCircle2,
  Award,
  Zap,
  Microscope,
  Clock,
  Factory,
  FileText,
  Download,
  UserCheck,
  HelpCircle,
  ChevronRight,
  ArrowRight,
  Gauge,
  Cpu,
  Layers,
  Sparkles,
  FileCheck,
  Scale,
  Settings2
} from "lucide-react";
import type { Metadata } from "next";
import { localizedMetadata, SITE_URL } from "@/lib/seo";
import QualityProcessInteractive from "@/components/QualityProcessInteractive";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return localizedMetadata(locale, "/quality", {
    en: {
      title: "Quality Assurance & BIS Compliance | Sheetal Electrotech Daman",
      description: "In-house photometric integrating sphere testing, 100% Hipot dielectric validation, ISO 9001:2015 regimes, and BIS CRS certification at Sheetal Electrotech.",
    },
    hi: {
      title: "गुणवत्ता आश्वासन और बीआईएस अनुपालन | शीतल इलेक्ट्रो-टेक दमन",
      description: "इन-हाउस फोटोमेट्रिक इंटीग्रेटिंग स्फेयर परीक्षण, 100% हाईपोट डाइइलेक्ट्रिक सत्यापन, और बीआईएस सीआरएस प्रमाणीकरण।",
    },
  });
}

// Laboratory testing stations
const LAB_STATIONS = [
  {
    title: "Photometric Integrating Sphere Dark Room",
    equipment: "Everfine Spectroradiometer & 1.5m / 2.0m Integrating Spheres",
    division: "Division 09 · Photometrics",
    description: "Measures absolute luminous flux (lumens), luminous efficacy (lm/W), spectral power distribution, CCT (2700K–6500K), and Color Rendering Index (CRI Ra ≥ 80, R9 > 10) under temperature-controlled dark-room conditions.",
    standards: "IES LM-79 · IS 16102 (Part 2) · BEE 5-Star",
    image: "/images/testing_lab.jpg",
    badge: "100% Batch Verification"
  },
  {
    title: "High-Voltage Dielectric Flash Testing Station",
    equipment: "Programmable AC/DC Hipot & Insulation Resistance Testers",
    division: "Division 07 · Assembly Lines",
    description: "100% routine inline testing subjecting every luminaire to 1.5 kV – 3.75 kV AC dielectric stress to verify insulation resistance (> 100 MΩ) and earth continuity, ensuring zero electrical shock hazard escape.",
    standards: "IS 16102 (Part 1) · IS 10322 (Part 5)",
    image: "/images/facilities/assembly-packing.webp",
    badge: "100% Routine Inline (Zero Escape)"
  },
  {
    title: "Surge Simulation & Grid Transient Laboratory",
    equipment: "Combination Wave Surge Generator (1.2/50 μs & 8/20 μs)",
    division: "Division 02 · Driver Electronics",
    description: "Simulates high-voltage lightning strikes and industrial inductive grid switching up to 2.5 kV differential mode and 4.0 kV common mode, verifying metal oxide varistor (MOV) and driver SPD resilience.",
    standards: "IS 15885 · IEC 61000-4-5",
    image: "/images/smt_electronics.jpg",
    badge: "Surge Immunity ≥ 2.5–4.0 kV"
  },
  {
    title: "Automated Optical Inspection (AOI) SMT Line",
    equipment: "Multi-Angle High-Speed AOI Optical Scanners",
    division: "Division 02 · Surface Mount",
    description: "Inspects sub-micron solder fillets, component polarities, solder bridges, and tombstoning on multi-channel LED driver and MCPCB arrays immediately post-reflow.",
    standards: "IPC-A-610 Class 2 Workmanship",
    image: "/images/facilities/smt.webp",
    badge: "Sub-Micron Defect Detection"
  },
  {
    title: "Cyclic Thermal Burn-In & Stress Chamber",
    equipment: "Multi-Zone Heated Aging Racks with Programmable Power Cycling",
    division: "Division 07 · Testing & Aging",
    description: "Elevates ambient temperature to 45°C while cycling mains voltage dynamically between 140V AC and 300V AC over a continuous 4-hour burn-in period to eliminate early component infant mortality.",
    standards: "Sheetal Reliability Standard · IS 16102",
    image: "/images/hero_manufacturing.jpg",
    badge: "4-Hour Cyclic Burn-In"
  },
  {
    title: "CMM Metrology & Optical Tooling Inspection",
    equipment: "Coordinate Measuring Machine (CMM) & Digital Height Micrometers",
    division: "Division 08 · Tool Room",
    description: "Verifies CNC-machined injection mould cavity tolerances (±0.01 mm), core concentricity, EDM surface finishes (< 0.05 Ra), and plastic component critical dimensions.",
    standards: "DIN 16901 · ISO 2768",
    image: "/images/tool_room.jpg",
    badge: "±0.01 mm Precision Probing"
  },
  {
    title: "Ingress Protection (IP) Environmental Booth",
    equipment: "Calibrated Water Jet Nozzles & Talcum Dust Infiltration Chamber",
    division: "Division 07 · Outdoor Luminaires",
    description: "Validates silicone gasket seals and housing closures for street lights, flood lights, and industrial battens from IP20 indoor to IP66 outdoor high-pressure washdown conditions.",
    standards: "IS 10322 (Part 1) · IEC 60529",
    image: "/images/street_light.png",
    badge: "IP20 to IP66 Certified"
  },
  {
    title: "Packaging Top-Load & Hydrostatic Leak Tester",
    equipment: "Digital Top-Load Compression Tester & Vacuum Leak Detector",
    division: "Division 01 & 03 · Rigid Packaging",
    description: "Measures vertical crush strength (≥ 25 kg) on HDPE/PP bottles and performs negative pressure submersion leak testing to guarantee zero seal leakage during transit and capping.",
    standards: "IS 15410 · ASTM D2659 · FDA 21 CFR",
    image: "/images/facilities/ibm-plastic.webp",
    badge: "Top-Load ≥ 25 kg Tested"
  }
];

// Stage-by-stage Quality Inspection Matrix
const QUALITY_REGIME_TABLE = [
  {
    stage: "IQC · Incoming Quality Control",
    materials: "Virgin Polycarbonate, PBT, Al 6063, LEDs, Capacitors & ICs",
    parameters: "Melt Flow Index (MFI), moisture < 0.02%, CCT binning within 3-step MacAdam, raw aluminum conductivity",
    instrumentation: "Moisture analyzer, MFI plastometer, Spectrophotometer, digital calipers",
    sampling: "MIL-STD-105E / AQL 0.65 Level II",
    gatekeeper: "Raw Material Quarantine Gate"
  },
  {
    stage: "IPQC · In-Process SMT & Moulding",
    materials: "Populated PCBAs, Reflowed MCPCBs, Moulded Housings & Parisons",
    parameters: "Solder joint wetting, tombstoning, cushion consistency, wall thickness, cycle time ±0.1s",
    instrumentation: "Inline AOI Scanner, KIC Thermal Profiler, ultrasonic wall-thickness gauge",
    sampling: "100% Inline AOI + Hourly first-off dimensional audit",
    gatekeeper: "Production Line In-Line Stoppage"
  },
  {
    stage: "Assembly & Hipot Flash Testing",
    materials: "Assembled LED Bulbs, Battens, Downlights, Street Lights",
    parameters: "High-voltage breakdown withstand 1.5–3.75 kV AC, earth continuity < 0.1 Ω, SPD integrity",
    instrumentation: "Automated AC/DC Hipot Dielectric Tester, Earth Resistance Meter",
    sampling: "100% Routine Testing (Zero Escape Policy)",
    gatekeeper: "Automated Reject Ejection"
  },
  {
    stage: "FQC · Photometric & Burn-in Aging",
    materials: "Complete Production Batches Prior to Final Packaging",
    parameters: "Luminous flux (lumens), efficacy ≥ 100 lm/W, CRI ≥ 80, THD < 10%, 4-hr thermal burn-in survivability",
    instrumentation: "Everfine Integrating Sphere Spectroradiometer, Multi-channel Power Analyzer",
    sampling: "100% Burn-in Aging + Batch 100% Photometric Verification",
    gatekeeper: "Batch Release Approval"
  },
  {
    stage: "OQC · Outgoing Quality Audit (PDI)",
    materials: "Carton Packaging, Palletized Finished Goods & Barcodes",
    parameters: "Drop test survivability, barcode legibility, BIS mark verification, aesthetic cosmetic inspection",
    instrumentation: "1.2m Carton Drop Tester, Barcode Verifier, Inspection Light Booth",
    sampling: "Pre-Shipment Inspection (PSI) / AQL 1.0",
    gatekeeper: "Quality Dispatch Release Certificate"
  }
];

// Quality FAQs for OEM procurement auditors
const QUALITY_FAQS = [
  {
    q: "Can OEM procurement teams and third-party auditors conduct on-site factory audits at Daman?",
    a: "Yes. Sheetal Electrotech maintains an open-door audit policy for authorized OEM clients and recognized third-party inspection agencies (such as TUV, SGS, Bureau Veritas, and BIS inspectors). Audits can cover raw material stores, automated SMT lines, CNC tool room operations, the photometric dark room, and warehouse dispatch staging."
  },
  {
    q: "What sampling regimes and AQL standards are enforced across production batches?",
    a: "We operate a hybrid quality regime: 100% routine inspection is mandatory for critical safety items (including high-voltage dielectric flash testing, ground bond, and SMT automated optical inspection). For incoming raw materials and pre-shipment outgoing carton audits, we enforce MIL-STD-105E / ISO 2859-1 (AQL 0.65 for Major defects and AQL 1.0 for Minor defects)."
  },
  {
    q: "How does Sheetal Electrotech eliminate infant mortality in LED driver electronics?",
    a: "Every populated driver board passes through our automated inline AOI scanner followed by a mandatory 4-hour cyclic thermal burn-in aging carousel. During burn-in, drivers operate in elevated ambient temperatures (45°C) while power is continuously cycled between low voltage (140V AC) and extreme over-voltage (300V AC), forcing defective components to fail before packaging."
  },
  {
    q: "What documentation and test certificates accompany manufactured OEM batches?",
    a: "Every commercial dispatch is accompanied by an OEM Quality Dossier consisting of a Certificate of Conformance (CoC), batch-wise Integrating Sphere Photometric Test Reports (lumens, CCT, CRI, THD, PF), High-Voltage Flash Test Logs, and virgin polymer material certificates of analysis (COA)."
  },
  {
    q: "How are calibration schedules managed for the Everfine Integrating Sphere and Hipot testers?",
    a: "All analytical laboratory instruments (including our Everfine integrating spheres, standard reference lamps, digital power analyzers, and Hipot dielectric testers) follow an annual calibration cycle traceable to NABL-accredited metrology institutes in India, ensuring legal traceability for all BIS submittals."
  }
];

export default function QualityPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/en/quality#webpage`,
        "url": `${SITE_URL}/en/quality`,
        "name": "Quality Assurance & Compliance Directorate | Sheetal Electrotech",
        "description": "Comprehensive quality assurance, in-house photometric dark-room testing, 100% dielectric flash validation, and BIS CRS certifications at Sheetal Electrotech Daman.",
        "isPartOf": {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          "url": SITE_URL,
          "name": "Sheetal Electrotech Pvt. Ltd."
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/en/quality#breadcrumb`,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE_URL}/en` },
          { "@type": "ListItem", "position": 2, "name": "Quality & Compliance", "item": `${SITE_URL}/en/quality` }
        ]
      }
    ]
  };

  return (
    <main className="min-h-screen bg-paper text-ink">
      {/* Schema Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Hero Header: Luxury Industrial Blueprint Aesthetic */}
      <section className="relative overflow-hidden bg-slate-950 text-white border-b border-slate-800 pt-32 md:pt-40 pb-20 md:pb-28">
        {/* Ambient Factory Photo Backdrop */}
        <div
          className="absolute inset-0 opacity-15 mix-blend-luminosity bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: "url('/images/testing_lab.jpg')" }}
        />
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="absolute -left-40 -top-40 h-[480px] w-[480px] rounded-full bg-accent/15 blur-3xl pointer-events-none" />
        <div className="absolute -right-40 bottom-[-200px] h-[520px] w-[520px] rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 container-wide">
          {/* Breadcrumb Path */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-8">
            <Link href="/" className="hover:text-accent transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-accent font-semibold">Quality &amp; Compliance Directorate</span>
          </nav>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/15 border border-accent/30 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <p className="font-mono text-accent text-xs uppercase tracking-widest font-semibold">
                Sheetal Electrotech · Quality Assurance &amp; Metrology Hub
              </p>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-medium leading-[1.02] tracking-tight mb-8">
              Zero-Defect Philosophy.
              <span className="block text-white/50">100% In-House Validation.</span>
              <span className="block text-white">Engineered for 50,000+ Hours.</span>
            </h1>

            <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-3xl mb-12 font-sans">
              Quality is not an inspection checkpoint at Sheetal Electrotech; it is engineered into every stage of manufacturing. From virgin polymer spectroscopy to inline SMT Automated Optical Inspection (AOI) and 100% high-voltage flash validation, our 30,000+ sq. ft. campus in Daman provides verifiable traceability for tier-1 OEM brands.
            </p>

            {/* Core Metrics Strip in Blueprint Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 border-t border-white/15 max-w-4xl">
              <div className="p-4 rounded-sm bg-white/[0.04] border border-white/10 backdrop-blur-sm hover:border-accent/50 transition-colors">
                <div className="flex items-center gap-2 mb-1.5">
                  <Zap className="w-4 h-4 text-accent" />
                  <p className="font-display text-3xl md:text-4xl font-bold text-accent">100%</p>
                </div>
                <p className="text-white text-xs font-semibold">Routine Hipot Flash</p>
                <p className="text-slate-400 text-[11px] font-mono mt-0.5">1.5–3.75 kV Withstand</p>
              </div>

              <div className="p-4 rounded-sm bg-white/[0.04] border border-white/10 backdrop-blur-sm hover:border-white/30 transition-colors">
                <div className="flex items-center gap-2 mb-1.5">
                  <Clock className="w-4 h-4 text-white" />
                  <p className="font-display text-3xl md:text-4xl font-bold text-white">50k+ Hrs</p>
                </div>
                <p className="text-white text-xs font-semibold">L70/B50 Life Design</p>
                <p className="text-slate-400 text-[11px] font-mono mt-0.5">Thermal TJ &lt; 85°C</p>
              </div>

              <div className="p-4 rounded-sm bg-white/[0.04] border border-white/10 backdrop-blur-sm hover:border-white/30 transition-colors">
                <div className="flex items-center gap-2 mb-1.5">
                  <Scale className="w-4 h-4 text-white" />
                  <p className="font-display text-3xl md:text-4xl font-bold text-white">±0.01mm</p>
                </div>
                <p className="text-white text-xs font-semibold">CMM Tooling Precision</p>
                <p className="text-slate-400 text-[11px] font-mono mt-0.5">CNC Die Maintenance</p>
              </div>

              <div className="p-4 rounded-sm bg-white/[0.04] border border-white/10 backdrop-blur-sm hover:border-accent/50 transition-colors">
                <div className="flex items-center gap-2 mb-1.5">
                  <ShieldCheck className="w-4 h-4 text-accent" />
                  <p className="font-display text-3xl md:text-4xl font-bold text-accent">ISO &amp; BIS</p>
                </div>
                <p className="text-white text-xs font-semibold">100% Certified Regime</p>
                <p className="text-slate-400 text-[11px] font-mono mt-0.5">IS 16102 · IS 10322</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive 4-Stage Quality Process Component */}
      <section className="py-20 md:py-28 bg-paper border-b border-slate-200">
        <div className="container-wide">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/15 border border-accent/30 rounded-full mb-3">
              <Settings2 className="w-3.5 h-3.5 text-accent" />
              <p className="font-mono text-accent text-xs uppercase tracking-widest font-semibold">
                Multi-Stage Testing Pipeline
              </p>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-medium text-ink mb-4">
              Manufacturing Quality in 4 Stages
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Explore our systematic gatekeeper protocols from incoming raw polymer inspection to final photometric dark-room integrating sphere certification.
            </p>
          </div>

          <QualityProcessInteractive />
        </div>
      </section>

      {/* Advanced Testing Laboratory & Metrology Infrastructure */}
      <section className="py-20 md:py-28 bg-white border-b border-slate-200">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/15 border border-accent/30 rounded-full mb-3">
                <Microscope className="w-3.5 h-3.5 text-accent" />
                <p className="font-mono text-accent text-xs uppercase tracking-widest font-semibold">
                  In-House Metrology &amp; Instrumentation
                </p>
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-medium text-ink">
                Dedicated Testing Laboratories
              </h2>
              <p className="text-slate-600 text-lg max-w-2xl mt-3">
                Calibrated optical, electrical, thermal, and dimensional test benches operating directly on our Daman shop floor.
              </p>
            </div>
            <Link
              href="/resources/product-catalogue.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-ink text-white px-6 py-3.5 text-xs font-mono uppercase tracking-wider rounded-xs hover:bg-accent hover:text-ink transition-colors shrink-0 shadow-sm"
            >
              <Download className="w-4 h-4" /> Download Lab Specifications
            </Link>
          </div>

          {/* 8-Card Lab Stations Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {LAB_STATIONS.map((station, idx) => (
              <div
                key={station.title}
                className="group bg-paper border border-slate-200 rounded-sm overflow-hidden hover:border-accent hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Photo Container */}
                  <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden">
                    <Image
                      src={station.image}
                      alt={station.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                    
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-black/80 backdrop-blur-xs text-white text-[9px] font-mono uppercase tracking-widest border border-white/10 rounded-xs">
                      LAB #{String(idx + 1).padStart(2, "0")}
                    </div>

                    <div className="absolute bottom-2.5 left-2.5 right-2.5 text-[10px] font-mono text-accent font-semibold truncate">
                      {station.badge}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                      {station.division}
                    </span>
                    <h3 className="font-display text-lg font-bold text-ink mb-2 leading-snug group-hover:text-accent transition-colors">
                      {station.title}
                    </h3>
                    <p className="text-slate-600 text-xs leading-relaxed mb-4">
                      {station.description}
                    </p>

                    <div className="bg-white border border-slate-200/80 p-3 rounded-xs text-[11px] mb-2">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400 block mb-0.5">
                        Instrumentation:
                      </span>
                      <span className="text-slate-700 font-medium">
                        {station.equipment}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>Standard:</span>
                  <span className="text-accent font-semibold">{station.standards.split(" · ")[0]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stage-by-Stage Quality Inspection Matrix (IQC to OQC) */}
      <section className="py-20 md:py-28 bg-paper border-b border-slate-200">
        <div className="container-wide">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/15 border border-accent/30 rounded-full mb-3">
              <Layers className="w-3.5 h-3.5 text-accent" />
              <p className="font-mono text-accent text-xs uppercase tracking-widest font-semibold">
                Shop-Floor Standard Operating Procedure
              </p>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-medium text-ink mb-4">
              Inspection Regime &amp; Sampling Matrix
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Transparent, measurable inspection parameters applied at each physical manufacturing boundary to eliminate non-conformance before dispatch.
            </p>
          </div>

          {/* Interactive Inspection Table */}
          <div className="overflow-x-auto border border-slate-200 rounded-sm shadow-sm bg-white mb-10">
            <table className="w-full text-left border-collapse min-w-[850px]">
              <thead>
                <tr className="bg-slate-900 text-white font-mono text-xs uppercase tracking-wider">
                  <th className="py-4 px-6 border-b border-slate-800">Inspection Gate</th>
                  <th className="py-4 px-6 border-b border-slate-800">Materials &amp; Assemblies Tested</th>
                  <th className="py-4 px-6 border-b border-slate-800">Critical Quality Thresholds</th>
                  <th className="py-4 px-6 border-b border-slate-800">Sampling Protocol</th>
                  <th className="py-4 px-6 border-b border-slate-800">Gating Policy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm">
                {QUALITY_REGIME_TABLE.map((row) => (
                  <tr key={row.stage} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-bold text-ink whitespace-nowrap">
                      {row.stage}
                    </td>
                    <td className="py-4 px-6 text-slate-600 text-xs max-w-[200px]">
                      {row.materials}
                    </td>
                    <td className="py-4 px-6 text-slate-700 text-xs">
                      {row.parameters}
                    </td>
                    <td className="py-4 px-6 font-mono text-xs text-accent font-semibold whitespace-nowrap">
                      {row.sampling}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono rounded-xs font-semibold">
                        {row.gatekeeper}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Traceability Callout Card */}
          <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-accent/15 border border-accent/30 rounded-sm flex items-center justify-center shrink-0 text-accent">
                <FileCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-display font-bold text-lg text-ink">
                  100% Traceability with Batch Dossiers
                </h4>
                <p className="text-slate-600 text-sm max-w-2xl mt-1">
                  Every manufactured batch carries serial-linked test documentation: raw polymer COAs, integrating sphere photometric spectral records, and high-voltage Hipot test logs.
                </p>
              </div>
            </div>
            <Link
              href="/rfq"
              className="inline-flex items-center gap-2 bg-accent text-ink px-6 py-3 font-bold text-xs uppercase tracking-wider rounded-xs hover:bg-slate-900 hover:text-white transition-colors shrink-0 shadow-xs"
            >
              Request Sample Quality Dossier <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Certifications & Compliance Regimes Matrix */}
      <section className="py-20 md:py-28 bg-white border-b border-slate-200">
        <div className="container-wide">
          <div className="max-w-3xl mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/15 border border-accent/30 rounded-full mb-3">
              <Award className="w-3.5 h-3.5 text-accent" />
              <p className="font-mono text-accent text-xs uppercase tracking-widest font-semibold">
                Government &amp; International Standards
              </p>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-medium text-ink mb-4">
              Accreditations &amp; Certifications
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Our Daman facilities and product lines comply with domestic statutory mandates and international standards for electrical safety, photometric efficiency, and environmental compliance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* ISO 9001:2015 */}
            <div className="border border-slate-200 bg-paper p-8 rounded-sm hover:border-accent hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 bg-slate-900 text-accent rounded-sm flex items-center justify-center font-display font-bold text-lg mb-6 shadow-xs">
                  ISO
                </div>
                <h3 className="text-xl font-display font-bold text-ink mb-2">
                  ISO 9001:2015
                </h3>
                <p className="text-xs font-mono uppercase tracking-widest text-accent mb-3 font-semibold">
                  Quality Management System (QMS)
                </p>
                <p className="text-sm text-slate-600 leading-relaxed mb-6 font-sans">
                  Certified Quality Management System covering the design, tooling, injection moulding, SMT electronics assembly, and luminaire packing operations in Daman.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200 text-xs font-mono text-slate-500 flex items-center justify-between">
                <span>Audit Status:</span>
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Certified
                </span>
              </div>
            </div>

            {/* BIS CRS (IS 16102) */}
            <div className="border border-slate-200 bg-paper p-8 rounded-sm hover:border-accent hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 bg-accent text-ink rounded-sm flex items-center justify-center font-display font-bold text-lg mb-6 shadow-xs">
                  BIS
                </div>
                <h3 className="text-xl font-display font-bold text-ink mb-2">
                  BIS CRS · IS 16102 (Part 1 &amp; 2)
                </h3>
                <p className="text-xs font-mono uppercase tracking-widest text-accent mb-3 font-semibold">
                  Self-Ballasted LED Bulbs Safety &amp; Efficacy
                </p>
                <p className="text-sm text-slate-600 leading-relaxed mb-6 font-sans">
                  Mandatory Compulsory Registration Scheme (CRS) compliance administered by Bureau of Indian Standards, validating insulation resistance, high voltage, and lumen maintenance.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200 text-xs font-mono text-slate-500 flex items-center justify-between">
                <span>Safety &amp; Efficacy:</span>
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 100% Compliant
                </span>
              </div>
            </div>

            {/* BIS IS 10322 */}
            <div className="border border-slate-200 bg-paper p-8 rounded-sm hover:border-accent hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 bg-slate-900 text-white rounded-sm flex items-center justify-center font-display font-bold text-lg mb-6 shadow-xs">
                  LUM
                </div>
                <h3 className="text-xl font-display font-bold text-ink mb-2">
                  BIS IS 10322 (Part 5 Sec 1)
                </h3>
                <p className="text-xs font-mono uppercase tracking-widest text-accent mb-3 font-semibold">
                  Fixed &amp; Recessed Luminaires
                </p>
                <p className="text-sm text-slate-600 leading-relaxed mb-6 font-sans">
                  Compliance standards for commercial battens, downlights, and ceiling fixtures covering thermal ceiling testing (&lt; 65°C), earth continuity, and IP ingress protection.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200 text-xs font-mono text-slate-500 flex items-center justify-between">
                <span>Thermal &amp; Electrical:</span>
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Certified
                </span>
              </div>
            </div>

            {/* BIS IS 15885 */}
            <div className="border border-slate-200 bg-paper p-8 rounded-sm hover:border-accent hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 bg-slate-900 text-accent rounded-sm flex items-center justify-center font-display font-bold text-lg mb-6 shadow-xs">
                  SMT
                </div>
                <h3 className="text-xl font-display font-bold text-ink mb-2">
                  BIS IS 15885 (Part 2 Sec 13)
                </h3>
                <p className="text-xs font-mono uppercase tracking-widest text-accent mb-3 font-semibold">
                  Electronic Controlgear for LED Drivers
                </p>
                <p className="text-sm text-slate-600 leading-relaxed mb-6 font-sans">
                  Mandatory safety benchmarks for electronic drivers validating over-voltage cutoff, short-circuit protection, Total Harmonic Distortion (THD &lt; 10%), and Power Factor (&gt; 0.95).
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200 text-xs font-mono text-slate-500 flex items-center justify-between">
                <span>Electronics Quality:</span>
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Certified
                </span>
              </div>
            </div>

            {/* RoHS Compliance */}
            <div className="border border-slate-200 bg-paper p-8 rounded-sm hover:border-accent hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 bg-emerald-950 text-emerald-400 rounded-sm flex items-center justify-center font-display font-bold text-lg mb-6 shadow-xs">
                  RoHS
                </div>
                <h3 className="text-xl font-display font-bold text-ink mb-2">
                  RoHS 2.0 Directive (2011/65/EU)
                </h3>
                <p className="text-xs font-mono uppercase tracking-widest text-accent mb-3 font-semibold">
                  Hazardous Substance Restriction
                </p>
                <p className="text-sm text-slate-600 leading-relaxed mb-6 font-sans">
                  All SMT soldering and manual component assembly utilize certified lead-free SAC305 alloys, eliminating lead, mercury, cadmium, and hexavalent chromium.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200 text-xs font-mono text-slate-500 flex items-center justify-between">
                <span>Environmental:</span>
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 100% Lead-Free
                </span>
              </div>
            </div>

            {/* Rigid Packaging Food-Grade IS 15410 */}
            <div className="border border-slate-200 bg-paper p-8 rounded-sm hover:border-accent hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 bg-blue-950 text-blue-400 rounded-sm flex items-center justify-center font-display font-bold text-lg mb-6 shadow-xs">
                  FDA
                </div>
                <h3 className="text-xl font-display font-bold text-ink mb-2">
                  IS 15410 &amp; FDA 21 CFR
                </h3>
                <p className="text-xs font-mono uppercase tracking-widest text-accent mb-3 font-semibold">
                  Food &amp; Pharmaceutical Grade Packaging
                </p>
                <p className="text-sm text-slate-600 leading-relaxed mb-6 font-sans">
                  Rigid HDPE/PP containers moulded exclusively with 100% virgin food-contact approved masterbatches, meeting migration limits and Environmental Stress Crack Resistance.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200 text-xs font-mono text-slate-500 flex items-center justify-between">
                <span>Food &amp; Pharma:</span>
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Food-Contact Safe
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OEM Engineering Dossier & Product Catalogue Downloads */}
      <section className="py-20 md:py-24 bg-slate-900 text-white border-b border-slate-800">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 rounded-full mb-4">
                <FileCheck className="w-3.5 h-3.5 text-accent" />
                <span className="font-mono text-accent text-xs uppercase tracking-widest font-semibold">
                  Official Technical Submittals
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-medium mb-4">
                Download OEM Quality Dossier &amp; Catalogues
              </h2>
              <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-6 font-sans">
                Review complete photometric testing reports, dimensional metrology blueprints, virgin polymer COAs, and compliance certificates for your vendor approval audit.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-white">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent" /> First Article Inspection (FAIR)
                </span>
                <span>·</span>
                <span className="flex items-center gap-1.5 text-white">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent" /> Certificate of Conformance (CoC)
                </span>
                <span>·</span>
                <span className="flex items-center gap-1.5 text-white">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent" /> Photometric Test Logs
                </span>
              </div>
            </div>

            {/* Action Cards */}
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
                    Complete portfolio overview of LED bulbs, battens, downlights, and rigid packaging.
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
                    <Layers className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-display font-bold text-white mb-1">
                    Master Engineering Dossier
                  </h4>
                  <p className="text-slate-400 text-xs mb-4">
                    Complete 37MB industrial dossier with machinery specifications, QA protocols, and certifications.
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

      {/* E-E-A-T Quality Directorate Governance */}
      <section className="py-20 md:py-28 bg-white border-b border-slate-200">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/15 border border-accent/30 rounded-full mb-3">
                <UserCheck className="w-3.5 h-3.5 text-accent" />
                <span className="font-mono text-accent text-xs uppercase tracking-widest font-semibold">
                  E-E-A-T Quality Directorate Governance
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl font-display font-bold text-ink">
                Executive Quality Oversight in Daman
              </h3>
              <p className="text-slate-600 text-base max-w-xl mx-auto mt-2">
                All quality assurance regimes, calibration routines, and testing laboratories at Sheetal Electrotech are governed directly by our department heads.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Manjit Yadav */}
              <div className="bg-paper border border-slate-200 p-8 rounded-sm shadow-xs flex items-start gap-5">
                <div className="w-14 h-14 bg-accent text-ink rounded-sm flex items-center justify-center font-display font-bold text-xl shrink-0 shadow-xs">
                  MY
                </div>
                <div>
                  <h4 className="font-display font-bold text-xl text-ink">
                    Manjit Yadav
                  </h4>
                  <p className="text-accent text-xs font-mono font-semibold uppercase tracking-wider mb-2">
                    Head of Quality Department &amp; Testing
                  </p>
                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-sans">
                    20+ years directing ISO 9001:2015 audit regimes, inline Automated Optical Inspection (AOI), 100% high-voltage Hipot flash verification, and outgoing pre-shipment inspection (PDI).
                  </p>
                </div>
              </div>

              {/* Suresh Prasad Arya */}
              <div className="bg-paper border border-slate-200 p-8 rounded-sm shadow-xs flex items-start gap-5">
                <div className="w-14 h-14 bg-slate-900 text-white rounded-sm flex items-center justify-center font-display font-bold text-xl shrink-0 shadow-xs">
                  SPA
                </div>
                <div>
                  <h4 className="font-display font-bold text-xl text-ink">
                    Suresh Prasad Arya
                  </h4>
                  <p className="text-slate-900 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
                    Head of Research &amp; Development (R&amp;D)
                  </p>
                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-sans">
                    25+ years in optoelectronic engineering, photometric integrating sphere analysis, and Bureau of Indian Standards (BIS CRS IS 16102 / IS 10322) luminaire qualification.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-accent" />
                Sheetal Industrial Campus · Plot No. 43, 52/2 &amp; 53/1, Silvassa Road, Daman
              </span>
              <span>Annual NABL Metrology Audit: October 2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* Procurement Quality FAQ Accordion (AEO for Specifiers) */}
      <section className="py-20 md:py-28 bg-paper border-b border-slate-200">
        <div className="container-wide">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/15 border border-accent/30 rounded-full mb-3">
              <HelpCircle className="w-3.5 h-3.5 text-accent" />
              <p className="font-mono text-accent text-xs uppercase tracking-widest font-semibold">
                Procurement &amp; Vendor Qualification Q&amp;A
              </p>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-medium text-ink mb-4">
              Answers for Quality Auditors &amp; Specifiers
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed font-sans">
              Concise, factual quality documentation answers for procurement directors, OEM sourcing heads, and technical evaluation panels.
            </p>
          </div>

          <div className="max-w-4xl space-y-4">
            {QUALITY_FAQS.map((faq) => (
              <details
                key={faq.q}
                className="group border border-slate-200 bg-white p-6 rounded-sm shadow-xs transition-all"
              >
                <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-semibold text-ink text-base md:text-lg">
                  <span>{faq.q}</span>
                  <span className="text-accent font-mono text-xl group-open:rotate-45 transition-transform duration-200 shrink-0">
                    +
                  </span>
                </summary>
                <p className="pt-4 text-slate-600 text-sm md:text-base leading-relaxed font-sans border-t border-slate-100 mt-4">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule a Factory Audit & Request Quality Dossier CTA */}
      <section className="py-20 bg-accent text-ink">
        <div className="container-wide flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-ink/75 font-semibold block mb-2">
              Ready to Qualify Sheetal Electrotech as Your Manufacturing Partner?
            </span>
            <h3 className="text-3xl md:text-5xl font-display font-medium mb-3">
              Schedule a factory audit at our Daman campus.
            </h3>
            <p className="text-ink/80 text-lg max-w-xl font-sans">
              Our quality assurance team welcomes vendor qualification inspections, process audits, and technical submittal evaluations.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <Link
              href="/contact"
              className="bg-white text-ink px-8 py-4 font-bold text-base hover:bg-slate-900 hover:text-white transition-colors flex items-center gap-2 whitespace-nowrap shadow-xl rounded-xs"
            >
              Schedule Factory Audit <ArrowRight className="w-4 h-4 text-accent" />
            </Link>
            <Link
              href="/rfq"
              className="border-2 border-ink text-ink px-7 py-4 font-bold text-base hover:bg-ink hover:text-white transition-colors whitespace-nowrap rounded-xs"
            >
              Request Sample Quality Dossier
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
