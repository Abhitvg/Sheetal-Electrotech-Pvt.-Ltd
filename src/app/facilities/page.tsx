import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { facilities } from "@/data/facilities";

export default function FacilitiesIndexPage() {
  return (
    <div className="bg-paper text-ink min-h-screen">

      {/* Header */}
      <div className="bg-mist text-ink pt-40 pb-24">
        <div className="container-wide">
          <p className="font-mono text-accent text-sm uppercase tracking-widest mb-6 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-accent inline-block"></span>
            9 In-House Facilities
          </p>
          <h1 className="text-5xl md:text-7xl font-display font-medium mb-6 max-w-3xl">
            One campus. Every capability.
          </h1>
          <p className="text-white/60 text-xl max-w-2xl">
            All production operations are co-located in Daman, India. No sub-contracting, no hidden vendor dependencies — full traceability from raw material to finished goods.
          </p>
        </div>
      </div>

      {/* Facilities Grid */}
      <div className="container-wide py-24">
        <div className="grid md:grid-cols-2 gap-6">
          {facilities.map((facility, i) => (
            <Link
              key={facility.slug}
              href={`/facilities/${facility.slug}`}
              className="group relative overflow-hidden bg-mist text-ink flex flex-col min-h-[380px]"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <Image
                  src={facility.image}
                  alt={facility.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/50 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 p-10 flex flex-col justify-end h-full">
                <p className="font-mono text-accent text-xs uppercase tracking-widest mb-4">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="text-3xl font-display font-medium mb-3 group-hover:text-accent transition-colors">
                  {facility.title}
                </h3>
                <p className="text-white/60 text-sm mb-8 max-w-sm leading-relaxed">
                  {facility.tagline}
                </p>

                {/* Spec mini-strip */}
                <div className="flex gap-8 border-t border-white/10 pt-6 mb-6">
                  {facility.specs.slice(0, 2).map((spec) => (
                    <div key={spec.label}>
                      <p className="text-white font-display text-xl font-medium">{spec.value}</p>
                      <p className="text-white/40 text-xs font-mono uppercase">{spec.label}</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-sm font-medium text-accent">
                  View Facility
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Map / Location CTA */}
      <div className="bg-mist py-20 border-t border-steel/10">
        <div className="container-wide flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-3xl font-display mb-2">See it in person.</h3>
            <p className="text-steel">We welcome site visits. Our Daman campus is 3 hours from Mumbai by road.</p>
          </div>
          <Link
            href="/rfq"
            className="bg-paper text-ink border border-white/10 px-10 py-4 font-medium flex items-center gap-3 hover:bg-accent transition-colors whitespace-nowrap"
          >
            Book a Factory Visit <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

    </div>
  );
}
