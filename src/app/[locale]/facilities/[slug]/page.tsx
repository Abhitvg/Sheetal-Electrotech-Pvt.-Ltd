import { facilities } from "@/data/facilities";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { localizedMetadata } from "@/lib/seo";
import LegacyFacilityImage from "@/components/LegacyFacilityImage";
import { facilityLegacyGalleries } from "@/data/legacyMedia";
import { ArrowRight, Factory, Gauge, Layers3 } from "lucide-react";

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

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const facility = facilities.find((f) => f.slug === slug);
  if (!facility) return {};
  return localizedMetadata(locale, `/facilities/${slug}`, {
    en: { title: `${facility.title} | Sheetal Electrotech Facilities`, description: facility.description },
    hi: { title: `${facility.title} | शीतल इलेक्ट्रो-टेक सुविधाएं`, description: facility.description },
  });
}

export default async function FacilityDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { slug } = await params;
  const facility = facilities.find((f) => f.slug === slug);
  if (!facility) notFound();

  return (
    <div className="bg-paper text-ink min-h-screen">
      {/* Hero - Full bleed with overlay */}
      <div className="relative h-[70vh] min-h-[500px] flex items-end">
        <div className="absolute inset-0">
          <LegacyFacilityImage
            candidates={[
              ...(facility.slug !== "tool-room" ? (facilityLegacyGalleries[facility.slug] ?? []) : []),
              facility.image,
              ...(facility.fallbackImages ?? [])
            ]}
            alt={facility.title}
            eager
            className="absolute inset-0 h-full w-full object-cover"
          />
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

      {(facility.capacityNote || facility.applications || facility.approvedBrands || facility.portfolio) && (
        <section className="bg-white border-b border-slate-200">
          <div className="container-wide py-20">
            <div className="grid lg:grid-cols-[1.15fr_.85fr] gap-12 items-start">
              <div>
                <p className="font-mono text-accent text-xs uppercase tracking-[.2em] mb-4">Capability Profile</p>
                <h2 className="text-3xl md:text-5xl font-display font-medium leading-tight mb-6">
                  {facility.legacyHeading || "Built for practical production requirements."}
                </h2>
                {facility.capacityNote && (
                  <div className="flex items-start gap-4 bg-mist border border-steel/10 p-5">
                    <Gauge className="w-5 h-5 text-accent shrink-0 mt-1" />
                    <div>
                      <p className="font-mono text-xs uppercase tracking-widest text-steel/70 mb-1">Production capacity</p>
                      <p className="text-steel leading-relaxed">{facility.capacityNote}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-px bg-slate-200 border border-slate-200">
                {(facility.applications || []).map((item) => (
                  <div key={item} className="bg-paper p-5">
                    <Factory className="w-5 h-5 text-accent mb-4" />
                    <p className="font-display text-lg">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {facility.portfolio && facility.portfolio.length > 0 && (
              <div className="mt-16">
                <div className="flex items-end justify-between gap-6 mb-8">
                  <div>
                    <p className="font-mono text-accent text-xs uppercase tracking-widest mb-2">What the capability supports</p>
                    <h3 className="text-2xl md:text-3xl font-display font-medium">Extrusion portfolio</h3>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-5">
                  {facility.portfolio.map((item, i) => (
                    <div key={item.title} className="border border-steel/15 bg-paper p-7">
                      <span className="font-mono text-xs text-accent">0{i + 1}</span>
                      <h4 className="font-display text-xl font-medium mt-7 mb-3">{item.title}</h4>
                      <p className="text-steel leading-relaxed">{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {facility.approvedBrands && facility.approvedBrands.length > 0 && (
              <div className="mt-14 pt-10 border-t border-steel/10">
                <p className="font-mono text-xs uppercase tracking-widest text-steel mb-5">Selected brands</p>
                <div className="flex flex-wrap gap-3">
                  {facility.approvedBrands.map((brand) => (
                    <span key={brand} className="px-4 py-2 border border-steel/20 bg-paper font-display text-sm">{brand}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

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
            <div className="sticky top-32 space-y-5">
              <div className="bg-mist text-ink p-8">
                <p className="font-mono text-xs uppercase tracking-widest text-ink/40 mb-4">Ready to partner?</p>
                <h3 className="text-2xl font-display mb-4">Get a quote for this capability.</h3>
                <p className="text-ink/60 text-sm mb-8">Share your specification, target volume and application with our team.</p>
                <a href="/rfq" className="flex items-center justify-center gap-3 w-full bg-accent text-ink text-center py-4 font-medium hover:bg-orange-600 transition-colors">
                  Request a Quote <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              {facility.slug === "extrusion" && (
                <div className="border border-steel/15 p-7 bg-white">
                  <div className="flex items-center gap-3 mb-4">
                    <Layers3 className="w-5 h-5 text-accent" />
                    <p className="font-display font-medium">Specification-led discussion</p>
                  </div>
                  <p className="text-sm text-steel leading-relaxed">
                    For extrusion enquiries, include profile drawings, dimensions, material preference, application and expected volumes where available.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {facility.slug !== "tool-room" && (facilityLegacyGalleries[facility.slug]?.length ?? 0) > 1 && (
        <section className="border-t border-steel/10 bg-mist/40 py-20">
          <div className="container-wide">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <p className="font-mono text-accent text-xs uppercase tracking-[.2em] mb-3">Official facility photography</p>
                <h2 className="text-3xl md:text-5xl font-display font-medium">Inside the operation</h2>
              </div>
              <p className="text-steel max-w-md text-sm leading-relaxed">
                These images are sourced from Sheetal Electrotech&apos;s official legacy site archive and kept tied to the corresponding manufacturing capability.
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {(facilityLegacyGalleries[facility.slug] ?? []).slice(0, 10).map((src, i) => (
                <div key={src} className="group overflow-hidden bg-white border border-steel/10 aspect-[4/3]">
                  <img
                    src={src}
                    alt={`${facility.title} — official facility image ${i + 1}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
