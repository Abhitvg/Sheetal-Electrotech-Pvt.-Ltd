"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";

const galleryImages = [
  { src: "/images/legacy/Photo1.webp", alt: "Injection Moulding Facility", category: "Facilities" },
  { src: "/images/legacy/Photo2.webp", alt: "Tooling and CNC Extruder", category: "Facilities" },
  { src: "/images/legacy/Photo3.webp", alt: "SMT & Auto Insertion Line", category: "Electronics" },
  { src: "/images/legacy/Photo4.webp", alt: "Assembly and Packaging Line", category: "Assembly" },
  { src: "/images/legacy/Photo5.webp", alt: "Blow Moulding Machinery", category: "Facilities" },
  { src: "/images/testing_lab.jpg", alt: "Quality Assurance Laboratory", category: "Quality" },
  { src: "/images/hero_factory.jpg", alt: "Factory Floor Overview", category: "Facilities" }
];

export default function GalleryPage() {
  return (
    <div className="bg-paper min-h-screen text-ink pt-32 pb-24">
      <div className="container-wide">
        <div className="max-w-3xl mb-16">
          <p className="font-mono text-accent text-sm uppercase tracking-widest mb-6 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-accent inline-block"></span>
            Factory Floor
          </p>
          <h1 className="text-5xl md:text-7xl font-display font-medium mb-6">
            Inside Our Operations.
          </h1>
          <p className="text-steel text-xl">
            A look inside our vertically integrated manufacturing facility in Daman.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((img, i) => (
            <div key={i} className="group relative aspect-[4/3] bg-mist overflow-hidden border border-steel/10">
              <Image 
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-accent font-mono text-xs uppercase tracking-widest mb-1">{img.category}</p>
                <p className="text-white font-medium">{img.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
