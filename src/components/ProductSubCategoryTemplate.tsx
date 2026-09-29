"use client";

import { Link } from "@/i18n/routing";
import { ArrowRight, Download } from "lucide-react";
import Image from "next/image";

interface ProductSubCategoryProps {
  title: string;
  category: string;
  description: string;
  products: {
    id: string;
    name: string;
    range: string;
    image: string;
    bg?: string;
    specs: { label: string; value: string }[];
  }[];
}

export default function ProductSubCategoryTemplate({ title, category, description, products }: ProductSubCategoryProps) {
  return (
    <div className="min-h-screen bg-paper pb-24">
      {/* Header */}
      <div className="bg-mist text-ink pt-32 pb-16 border-b border-steel/10">
        <div className="container-wide">
          <Link href={`/products/${category}`} className="text-steel hover:text-accent text-sm font-mono uppercase tracking-widest mb-4 inline-block">
            ← Back to {category.replace("-", " ")}
          </Link>
          <h1 className="text-5xl md:text-7xl font-display font-medium mb-6">
            {title}
          </h1>
          <p className="text-steel text-xl max-w-2xl">
            {description}
          </p>
        </div>
      </div>

      {/* Product List */}
      <div className="container-wide py-16">
        <div className="space-y-16">
          {products.map((product) => (
            <div key={product.id} className="flex flex-col md:flex-row gap-12 bg-white border border-steel/15 p-8 group hover:border-accent/30 transition-all">
              <div className={`w-full md:w-1/3 aspect-square relative ${product.bg || "bg-mist"} flex items-center justify-center p-8`}>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-8 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <div className="mb-8">
                  <h2 className="text-3xl font-display font-bold text-ink mb-2">{product.name}</h2>
                  <p className="font-mono text-accent uppercase tracking-widest text-sm">{product.range}</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mb-8">
                  {product.specs.map((spec, i) => (
                    <div key={i} className="border-b border-steel/10 pb-2">
                      <p className="text-xs font-mono text-steel uppercase tracking-wider mb-1">{spec.label}</p>
                      <p className="text-ink font-medium">{spec.value}</p>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 mt-auto">
                  <Link
                    href={`/rfq?product=${product.name}`}
                    className="bg-accent text-white px-6 py-3 font-medium hover:bg-orange-600 transition-colors inline-flex items-center gap-2"
                  >
                    Request Quote <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button className="border border-steel/20 text-ink px-6 py-3 font-medium hover:bg-mist transition-colors inline-flex items-center gap-2">
                    Spec Sheet <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
