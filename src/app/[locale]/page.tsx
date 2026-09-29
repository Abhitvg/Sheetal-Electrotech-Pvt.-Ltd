import Hero from "@/components/Hero";
import CompanyIntro from "@/components/CompanyIntro";
import ProductShowcase from "@/components/ProductShowcase";
import WhySheetal from "@/components/WhySheetal";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import IndustriesServed from "@/components/IndustriesServed";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. HERO */}
      <Hero />

      {/* 2. COMPANY INTRO — Who is Sheetal + What We Manufacture */}
      <CompanyIntro />

      {/* 3. PRODUCT SHOWCASE */}
      <ProductShowcase />

      {/* 4. WHY SHEETAL */}
      <WhySheetal />

      {/* 5. MANUFACTURING CAPABILITIES */}
      <CapabilitiesSection />

      {/* 6. INDUSTRIES SERVED */}
      <IndustriesServed />

      {/* 7. TESTIMONIALS */}
      <Testimonials />

      {/* 8. REQUEST QUOTE */}
      <CTASection />
    </div>
  );
}
