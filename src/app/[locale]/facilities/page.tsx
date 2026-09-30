import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import LegacyFacilityImage from "@/components/LegacyFacilityImage";
import { facilities } from "@/data/facilities";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { getPageCopy, localizedMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return localizedMetadata(locale, "/facilities", getPageCopy("facilities"));
}
export default function FacilitiesIndexPage() {
  const t = useTranslations("FacilitiesPage");
  return (
    <div className="bg-paper text-ink min-h-screen">

      {/* Header */}
      <div className="bg-mist text-ink pt-40 pb-24">
        <div className="container-wide">
          <p className="font-mono text-accent text-sm uppercase tracking-widest mb-6 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-accent inline-block"></span>
            {t("badge")}
          </p>
          <h1 className="text-5xl md:text-7xl font-display font-medium mb-6 max-w-3xl">
            {t("title")}
          </h1>
          <p className="text-ink/60 text-xl max-w-2xl">
            {t("subtitle")}
          </p>
        </div>
      </div>

      {/* Facilities Grid */}
      <div className="container-wide py-24">
        <div className="grid md:grid-cols-2 gap-6">
          {facilities.map((facility, i) => {
            const hasRealPhoto = true;

            return (
              <Link
                key={facility.slug}
                href={`/facilities/${facility.slug}`}
                className={`group relative overflow-hidden flex flex-col min-h-[380px] ${
                  hasRealPhoto ? "bg-mist" : "bg-slate-900"
                }`}
              >
                {/* Background */}
                {hasRealPhoto ? (
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <LegacyFacilityImage
                      candidates={[facility.image, ...(facility.fallbackImages ?? [])]}
                      alt={facility.title}
                      className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Improved gradient overlay for readability - stronger contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-transparent" />
                  </div>
                ) : (
                  <div className="absolute inset-0 z-0 overflow-hidden bg-[#0b192c]">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]"></div>
                    {/* Large capability number in background */}
                    <div className="absolute -right-8 -bottom-8 text-[200px] font-display font-bold text-white/5 leading-none select-none">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#0b192c]/90" />
                  </div>
                )}

                {/* Content */}
                <div className="relative z-10 p-10 flex flex-col justify-end h-full">
                  <p className="font-mono text-white/50 text-[11px] uppercase tracking-widest mb-4">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  
                  <h3 className="text-2xl md:text-[28px] font-display font-medium mb-3 text-white group-hover:text-blue-400 transition-colors">
                    {facility.title}
                  </h3>
                  
                  <p className="text-white/75 text-[15px] mb-8 max-w-sm leading-relaxed">
                    {facility.tagline}
                  </p>

                  <div className="border-t border-white/20 pt-5 mt-auto flex items-center gap-2 text-[13px] font-medium text-blue-400">
                    {t("viewFacility")}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Built Around Manufacturing Capability */}
      <div className="bg-ink text-white py-24 text-center">
        <div className="container-wide max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-display font-medium mb-6">
            Built Around Manufacturing Capability
          </h2>
          <p className="text-white/70 text-lg mb-10 leading-relaxed">
            From moulding and extrusion to electronics assembly, R&D and tooling, our facility structure supports multiple stages of product development and manufacturing.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/products"
              className="bg-white text-ink px-8 py-4 font-medium hover:bg-accent hover:text-white transition-colors"
            >
              Explore Products
            </Link>
            <Link
              href="/contact"
              className="bg-transparent border border-white/30 text-white px-8 py-4 font-medium hover:bg-white/10 transition-colors"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </div>

      {/* Map / Location CTA */}
      <div className="bg-mist py-20 border-t border-steel/10">
        <div className="container-wide flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-3xl font-display mb-2">{t("ctaTitle")}</h3>
            <p className="text-steel">{t("ctaSubtitle")}</p>
          </div>
          <Link
            href="/rfq"
            className="bg-paper text-ink border border-slate-200 px-10 py-4 font-medium flex items-center gap-3 hover:bg-accent transition-colors whitespace-nowrap"
          >
            {t("ctaButton")} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

    </div>
  );
}
