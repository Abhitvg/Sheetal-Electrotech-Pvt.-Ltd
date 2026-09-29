import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";

const subCategories = [
  {
    title: "Extension Boards",
    description: "Safe and durable power extensions.",
    href: "/products/electronics/extension-boards",
    image: "/images/legacy/4-3.webp"
  }
];

export default function ElectronicsPage() {
  return (
    <div className="min-h-screen bg-paper pb-24">
      <div className="bg-mist text-ink pt-32 pb-16 border-b border-steel/10">
        <div className="container-wide">
          <Link href="/products" className="text-steel hover:text-accent text-sm font-mono uppercase tracking-widest mb-4 inline-block">
            ← Back to Products
          </Link>
          <h1 className="text-5xl md:text-7xl font-display font-medium mb-6">
            Electronics & Accessories
          </h1>
          <p className="text-steel text-xl max-w-2xl">
            Reliable electronic products manufactured in-house.
          </p>
        </div>
      </div>
      <div className="container-wide py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {subCategories.map((cat) => (
            <Link key={cat.title} href={cat.href} className="group block bg-white border border-steel/15 hover:border-accent/30 transition-all overflow-hidden">
              <div className="h-64 relative bg-mist p-8 flex items-center justify-center">
                <Image src={cat.image} alt={cat.title} fill className="object-contain p-8 group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-8">
                <h2 className="text-2xl font-display font-bold text-ink mb-2 flex items-center justify-between">
                  {cat.title}
                  <ArrowRight className="w-5 h-5 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                </h2>
                <p className="text-steel">{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
