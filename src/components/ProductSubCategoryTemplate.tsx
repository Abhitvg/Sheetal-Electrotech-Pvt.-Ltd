"use client";

import { Link } from "@/i18n/routing";
import { ArrowRight, Download } from "lucide-react";
import Image from "next/image";
import { legacyProductImages } from "@/data/legacyMedia";

interface ProductSubCategoryProps {
  title: string;
  category: string;
  description: string;
  products: {
    id: string;
    name: string;
    description?: string;
    applications?: string[];
    range?: string;
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
        <div className="space-y-24">
          {products.map((product) => (
            <div key={product.id} className="flex flex-col md:flex-row gap-12 bg-white border border-steel/15 p-0 md:p-8 group hover:border-accent/30 transition-all">
              {/* Product Image */}
              <div className="w-full md:w-5/12">
                <div className={`aspect-square relative ${product.bg || "bg-mist"} flex items-center justify-center p-8`}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-8 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {(legacyProductImages[product.id]?.length ?? 0) > 0 && (
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    {(legacyProductImages[product.id] ?? []).slice(0, 3).map((src, index) => (
                      <div key={src} className="aspect-[4/3] bg-mist overflow-hidden border border-steel/10">
                        <img
                          src={src}
                          alt={`${product.name} — official source image ${index + 1}`}
                          loading="lazy"
                          onError={(event) => { event.currentTarget.src = product.image; }}
                          className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
                            {/* Product Info */}
              <div className="flex-1 flex flex-col justify-start p-8 md:p-0">
                <div className="mb-6">
                  <h2 className="text-3xl font-display font-bold text-ink mb-2 uppercase tracking-wide">{product.name}</h2>
                  {product.description && (
                    <p className="text-steel text-lg leading-relaxed mt-4">{product.description}</p>
                  )}
                </div>
                
                {product.applications && product.applications.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-sm font-mono text-accent uppercase tracking-widest border-b border-steel/20 pb-2 mb-4">Applications</h3>
                    <ul className="list-disc list-inside text-ink/80 space-y-1">
                      {product.applications.map((app, idx) => (
                        <li key={idx}>{app}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {product.specs && product.specs.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-sm font-mono text-accent uppercase tracking-widest border-b border-steel/20 pb-2 mb-4">Specifications</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm">
                        <thead>
                          <tr className="border-b border-steel/20 bg-mist/30">
                            <th className="py-3 px-4 font-mono font-medium text-steel uppercase tracking-wider w-1/3">Parameter</th>
                            <th className="py-3 px-4 font-mono font-medium text-steel uppercase tracking-wider">Specification</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-steel/10">
                          {product.specs.map((spec, i) => (
                            <tr key={i} className="hover:bg-mist/10">
                              <td className="py-3 px-4 text-steel/80 font-medium">{spec.label}</td>
                              <td className="py-3 px-4 text-ink">{spec.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-4 mt-auto pt-4 border-t border-steel/10">
                  <Link
                    href={`/rfq?product=${encodeURIComponent(product.name)}`}
                    className="bg-accent text-white px-8 py-3 font-medium hover:bg-orange-600 transition-colors inline-flex items-center gap-2"
                  >
                    Request Quote <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
