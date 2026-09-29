import Image from "next/image";
import { facilities } from "@/data/facilities";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  const params = [];
  for (const locale of routing.locales) {
    for (const f of facilities) {
      params.push({ locale, slug: f.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const facility = facilities.find((f) => f.slug === slug);
  if (!facility) return {};
  return {
    title: `${facility.title} | Sheetal Electrotech Facilities`,
    description: facility.description,
  };
}

export default async function FacilityDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const facility = facilities.find((f) => f.slug === slug);
  if (!facility) notFound();

  return (
    <div className="bg-paper text-ink min-h-screen">
      {/* Hero - Full bleed with overlay */}
      <div className="relative h-[70vh] min-h-[500px] flex items-end">
        <div className="absolute inset-0">
          <Image src={facility.image} alt={facility.title} fill sizes="100vw" className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
        </div>
        <div className="relative z-10 container-wide text-paper pb-16 pt-32">
          <p className="font-mono text-accent text-sm uppercase tracking-widest mb-4">
            Sheetal Facilities
          </p>
          <h1 className="text-5xl md:text-7xl font-display font-medium mb-6 leading-tight text-white">
            {facility.title}
          </h1>
          <p className="text-white/70 text-xl max-w-2xl">{facility.tagline}</p>
        </div>
      </div>

      {/* Spec Bar */}
      {facility.specs && facility.specs.length > 0 && (
        <div className="bg-mist text-ink py-8 border-b border-slate-200">
          <div className="container-wide grid grid-cols-2 md:grid-cols-4 gap-8">
            {facility.specs.map((spec, i) => (
              <div key={i}>
                <p className="font-mono text-xs text-ink/40 uppercase tracking-widest mb-2">{spec.label}</p>
                <p className="text-2xl font-display font-medium text-ink">{spec.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container-wide py-24">
        <div className="grid lg:grid-cols-3 gap-16">
          
          {/* Left: Description & Materials */}
          <div className="lg:col-span-2">
            <p className="text-steel text-xl leading-relaxed mb-12">{facility.description}</p>

            {facility.materials && facility.materials.length > 0 && (
              <div className="mb-12">
                <h3 className="font-mono text-sm uppercase tracking-widest text-steel mb-6">
                  Materials Processed
                </h3>
                <div className="flex flex-wrap gap-3">
                  {facility.materials.map((mat) => (
                    <span key={mat} className="border border-steel/30 px-4 py-2 text-sm font-mono text-steel">
                      {mat}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Highlights */}
            {facility.highlights && facility.highlights.length > 0 && (
              <div className="space-y-0 divide-y divide-steel/10">
                {facility.highlights.map((h, i) => (
                  <div key={i} className="py-8 grid md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-medium text-ink text-lg">{h.title}</h4>
                    </div>
                    <p className="md:col-span-2 text-steel leading-relaxed">{h.body}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Sticky RFQ Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-mist text-ink p-8">
              <p className="font-mono text-xs uppercase tracking-widest text-ink/40 mb-4">
                Ready to partner?
              </p>
              <h3 className="text-2xl font-display mb-4">
                Get a quote for this facility.
              </h3>
              <p className="text-ink/60 text-sm mb-8">
                Share your spec and we'll come back with a production-ready proposal.
              </p>

              <a
                href="/rfq"
                className="block w-full bg-accent text-ink text-center py-4 font-medium hover:bg-orange-600 transition-colors mb-6"
              >
                Request a Quote →
              </a>

              <div className="border-t border-slate-200 pt-6 space-y-3 text-sm">
                <a href="mailto:info@sheetalelectrotech.com" className="flex items-center gap-2 text-ink/60 hover:text-accent transition-colors">
                  info@sheetalelectrotech.com
                </a>
                <p className="text-ink/40 font-mono text-xs">+91 93273 45295, +91 99254 39405</p>
                <p className="text-ink/40 font-mono text-xs">Survey No. 168/28 & 168/29, Opp. Givaudan India Pvt. Ltd, Dhabel, Daman</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
