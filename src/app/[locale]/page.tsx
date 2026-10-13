import Hero from "@/components/Hero";
import CompanyIntro from "@/components/CompanyIntro";
import ProductShowcase from "@/components/ProductShowcase";
import WhySheetal from "@/components/WhySheetal";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import OEMProcessJourney from "@/components/OEMProcessJourney";
import IndustriesServed from "@/components/IndustriesServed";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;

  return (
    <div className="flex flex-col w-full">
      {/* 1. HERO — Command Header, Verified Stats & Compliance Badges */}
      <Hero />

      {/* 2. COMPANY INTRO — 4 Core Manufacturing Pillars & Single-Roof Story */}
      <CompanyIntro />

      {/* 3. PRODUCT SHOWCASE — Filterable Category Grid & Full Catalogue PDF Download */}
      <ProductShowcase />

      {/* 4. MANUFACTURING CAPABILITIES — 6 Flagship Capabilities & 9-Facility Campus Navigator */}
      <CapabilitiesSection />

      {/* 5. WHY SHEETAL — 6 OEM Value Propositions & Quantitative Differentiators */}
      <WhySheetal />

      {/* 6. OEM PROCESS JOURNEY — 5-Stage Blueprint to Mass Production Lifecycle */}
      <OEMProcessJourney />

      {/* 7. INDUSTRIES SERVED — Balanced 6 Core Industrial Verticals & Key Applications */}
      <IndustriesServed />

      {/* 8. ENTERPRISE TRUST & TESTIMONIALS — Accreditations, Audit Invitation & Client Reviews */}
      <Testimonials />

      {/* 9. REQUEST QUOTE & FAST ACTION — Direct CAD Upload, WhatsApp & Engineering Hotlines */}
      <CTASection />
    </div>
  );
}
