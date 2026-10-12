import type { Metadata } from "next";
import { Link } from "@/i18n/routing";
import { localizedMetadata } from "@/lib/seo";
import ProcessesTimeline from "@/components/ProcessesTimeline";
import { ArrowRight, Factory, ShieldCheck, Zap } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return localizedMetadata(locale, "/processes", {
    en: {
      title: "Manufacturing Processes & Production Chain | Sheetal Electrotech Daman",
      description:
        "Explore Sheetal Electrotech's nine integrated manufacturing processes in sequential production order: Injection Moulding, Blow Moulding, IBM, Extrusion, SMT, Manual Insertion, Assembly & Packing, Tool Room, and R&D.",
    },
    hi: {
      title: "विनिर्माण प्रक्रियाएं एवं उत्पादन श्रृंखला | शीतल इलेक्ट्रो-टेक दमन",
      description:
        "शीतल इलेक्ट्रो-टेक की नौ एकीकृत विनिर्माण प्रक्रियाओं को क्रमवार देखें: इंजेक्शन मोल्डिंग, ब्लो मोल्डिंग, आईबीएम, एक्सट्रूज़न, एसएमटी, मैनुअल इंसर्शन, असेंबली, टूल रूम और आरएंडडी।",
    },
  });
}

export default function ProcessesPage() {
  return (
    <main className="bg-paper text-ink min-h-screen">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-slate-900 text-white pt-36 pb-20 md:pt-44 md:pb-28">
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        <div className="container-wide relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-orange-400 font-mono text-xs uppercase tracking-widest mb-6">
              <Factory className="w-3.5 h-3.5 text-accent" />
              <span>Integrated Production Chain · Daman, India</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-medium tracking-tight leading-[1.05] text-white mb-6">
              Nine facilities. One continuous{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-300 to-amber-200">
                manufacturing chain.
              </span>
            </h1>

            <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-2xl mb-10">
              From raw polymer granules and bare copper-clad boards to finished, photometrically tested LED luminaires and pharmaceutical packaging — all under a single ISO 9001:2015 quality assurance system.
            </p>

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-800 max-w-xl">
              <div>
                <p className="font-display text-3xl md:text-4xl font-bold text-white">09</p>
                <p className="font-mono text-xs uppercase tracking-wider text-slate-400 mt-1">In-House Processes</p>
              </div>
              <div>
                <p className="font-display text-3xl md:text-4xl font-bold text-white">30K+</p>
                <p className="font-mono text-xs uppercase tracking-wider text-slate-400 mt-1">Sq. Ft. Factory Floor</p>
              </div>
              <div>
                <p className="font-display text-3xl md:text-4xl font-bold text-white">100%</p>
                <p className="font-mono text-xs uppercase tracking-wider text-slate-400 mt-1">In-House Tooling</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Process Timeline & Interactive Chain */}
      <section className="container-wide py-16 md:py-24">
        <ProcessesTimeline />
      </section>

      {/* Bottom OEM / RFQ Banner */}
      <section className="bg-slate-900 text-white py-20 border-t border-slate-800">
        <div className="container-wide">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-2xl">
              <span className="font-mono text-xs uppercase tracking-widest text-accent mb-2 block font-semibold">
                Start Your Contract Manufacturing Project
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-medium text-white mb-4">
                Bring your drawings to our production floor.
              </h2>
              <p className="text-slate-300 text-base md:text-lg leading-relaxed">
                Connect directly with our engineering team for tool design, pilot moulding trials, SMT prototypes, or turnkey contract manufacturing.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <Link
                href="/rfq"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-accent text-white font-medium hover:bg-orange-600 transition-colors shadow-lg shadow-accent/25"
              >
                Request an OEM Quote <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/facilities"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-xl border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              >
                Browse Facility Directory
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
