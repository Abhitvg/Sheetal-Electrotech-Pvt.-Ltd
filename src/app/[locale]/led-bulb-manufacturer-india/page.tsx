import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { companyFacts } from "@/data/companyFacts";

export const metadata = {
  title: "LED Bulb Manufacturer in India | OEM/ODM Services | Sheetal Electrotech",
  description: "Established LED bulb manufacturer in India offering OEM/ODM services. Complete in-house manufacturing, SMT, and assembly. ISO & BIS certified.",
};

export default function LEDBulbManufacturerIndia() {
  return (
    <div className="bg-paper min-h-screen text-ink">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden border-b border-steel/10">
        <div className="container-wide relative z-10">
          <div className="max-w-4xl">
            <p className="font-mono text-accent text-sm uppercase tracking-widest mb-6">
              OEM/ODM Manufacturing Partner
            </p>
            <h1 className="text-5xl md:text-7xl font-display font-medium mb-8 leading-tight">
              Premium LED Bulb Manufacturer in India
            </h1>
            <p className="text-steel text-xl leading-relaxed mb-10 max-w-2xl">
              Sheetal Electrotech is an established OEM manufacturer of LED bulbs, offering end-to-end production capabilities from housing injection to SMT and final assembly in our {companyFacts.manufacturingArea} facility.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/rfq" className="bg-accent text-white px-8 py-4 font-medium hover:bg-orange-600 transition-colors inline-flex items-center gap-3">
                Request a Quote <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/facilities" className="border border-steel/20 text-ink px-8 py-4 font-medium hover:bg-mist transition-colors inline-flex items-center gap-3">
                Explore Our Facilities
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 container-wide">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-display font-medium mb-6">End-to-End LED Manufacturing</h2>
            <p className="text-steel text-lg mb-8 leading-relaxed">
              As a vertically integrated LED bulb manufacturer in India, we control every step of the production process. This eliminates vendor dependency, ensures strict quality control, and allows us to offer competitive pricing without compromising on reliability.
            </p>
            <ul className="space-y-4">
              {[
                "In-house Tool Room & Injection Moulding",
                "Automated SMT & Component Insertion",
                "Advanced Photometric & Surge Testing",
                "BIS Certified & ISO 9001:2015 Compliant",
                "White-label OEM Branding & Custom Packaging"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-ink font-medium">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-square md:aspect-[4/3] bg-mist">
            <Image 
              src="/images/legacy/Photo13.webp" 
              alt="LED Bulb Manufacturing Line"
              fill
              className="object-contain p-12"
            />
          </div>
        </div>
      </section>

      {/* Product Range */}
      <section className="py-24 bg-mist border-y border-steel/10">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-medium mb-6">Our LED Bulb Range</h2>
            <p className="text-steel text-lg">We manufacture a comprehensive range of LED bulbs designed for Indian power conditions.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Standard LED Bulbs", range: "3W – 15W", desc: "Energy-efficient bulbs for residential and commercial spaces." },
              { title: "Premium LED Bulbs", range: "5W – 18W", desc: "High-lumen output bulbs with sleek architectural designs." },
              { title: "High Power Bulbs", range: "30W – 150W", desc: "Industrial-grade high wattage bulbs for warehouses and factories." }
            ].map((prod, i) => (
              <div key={i} className="bg-white p-8 border border-steel/10 hover:border-accent/30 transition-colors">
                <h3 className="text-2xl font-display font-medium mb-2 text-ink">{prod.title}</h3>
                <p className="text-accent font-mono text-sm mb-4">{prod.range}</p>
                <p className="text-steel">{prod.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 container-wide text-center">
        <h2 className="text-3xl md:text-5xl font-display font-medium mb-6">Ready to scale your lighting brand?</h2>
        <p className="text-steel text-xl max-w-2xl mx-auto mb-10">
          Partner with India's most reliable OEM LED bulb manufacturer. Get in touch with our engineering team today.
        </p>
        <Link href="/rfq" className="bg-ink text-white px-8 py-4 font-medium hover:bg-accent hover:text-ink transition-colors inline-flex items-center gap-3">
          Start Your OEM Project <ArrowRight className="w-5 h-5" />
        </Link>
      </section>
    </div>
  );
}
