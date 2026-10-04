
"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { legacyGalleryImages } from "@/data/legacyMedia";

const FILTERS = ["All", "Facilities", "Products", "Knowledge"] as const;
type Filter = (typeof FILTERS)[number];

export default function GalleryPage() {
  const [filter, setFilter] = useState<Filter>("All");
  const [visibleCount, setVisibleCount] = useState(36);

  const filtered = useMemo(
    () => filter === "All" ? legacyGalleryImages : legacyGalleryImages.filter((item) => item.category === filter),
    [filter]
  );

  const visible = filtered.slice(0, visibleCount);

  function selectFilter(next: Filter) {
    setFilter(next);
    setVisibleCount(36);
  }

  return (
    <main className="bg-paper min-h-screen text-ink pt-32 pb-24">
      <div className="container-wide">
        <div className="max-w-4xl mb-14">
          <p className="font-mono text-accent text-sm uppercase tracking-[.2em] mb-6">
            Official Site Archive
          </p>
          <h1 className="text-5xl md:text-7xl font-display font-medium mb-6">
            Factory, Products & Knowledge.
          </h1>
          <p className="text-steel text-xl leading-relaxed max-w-3xl">
            Authentic Sheetal Electrotech photography and visual assets recovered from the company&apos;s official legacy website, organized around manufacturing, products and technical knowledge.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-5 mb-10 pb-5 border-b border-steel/10">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => selectFilter(item)}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-wider border transition-colors ${
                  filter === item
                    ? "bg-ink text-white border-ink"
                    : "bg-white text-steel border-steel/15 hover:border-accent hover:text-ink"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          <p className="text-steel text-sm font-mono">
            {filtered.length} archived images
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {visible.map((item, index) => (
            <figure key={item.src} className="group bg-white border border-steel/10 overflow-hidden">
              <div className="relative aspect-[4/3] bg-mist overflow-hidden">
                <Image
                  src={item.src}
                  alt={`${item.category} — Sheetal Electrotech official archive image ${index + 1}`}
                  fill
                  priority={index < 8}
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <figcaption className="px-4 py-3 flex items-center justify-between gap-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
                  {item.category}
                </span>
                <span className="text-[10px] text-steel/60">Official archive</span>
              </figcaption>
            </figure>
          ))}
        </div>

        {visibleCount < filtered.length && (
          <div className="text-center mt-12">
            <button
              type="button"
              onClick={() => setVisibleCount((count) => Math.min(count + 36, filtered.length))}
              className="px-7 py-3 border border-ink text-ink text-sm font-medium hover:bg-ink hover:text-white transition-colors"
            >
              Load more
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
