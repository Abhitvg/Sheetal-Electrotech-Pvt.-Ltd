import Hero from "@/components/Hero";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import ProductShowcase from "@/components/ProductShowcase";
import TrustWall from "@/components/TrustWall";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. CINEMATIC HERO */}
      <Hero />

      {/* 2. TRUST WALL */}
      <TrustWall />

      {/* 3. CAPABILITIES */}
      <CapabilitiesSection />

      {/* 4. WHY CHOOSE US */}
      <WhyChooseUs />

      {/* 5. PRODUCT SHOWCASE */}
      <ProductShowcase />

      {/* 6. TESTIMONIALS */}
      <Testimonials />

      {/* 7. CTA */}
      <CTASection />
    </div>
  );
}
