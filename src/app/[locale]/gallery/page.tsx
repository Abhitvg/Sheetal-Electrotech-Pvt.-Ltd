
"use client";

import Image from "next/image";
import { useMemo, useState, useEffect, useCallback } from "react";
import { legacyGalleryImages } from "@/data/legacyMedia";
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

const FILTERS = ["All", "Facilities", "Products", "Knowledge"] as const;
type Filter = (typeof FILTERS)[number];

export default function GalleryPage() {
  const [filter, setFilter] = useState<Filter>("All");
  const [visibleCount, setVisibleCount] = useState(36);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isPanning, setIsPanning] = useState(false);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const filtered = useMemo(
    () => filter === "All" ? legacyGalleryImages : legacyGalleryImages.filter((item) => item.category === filter),
    [filter]
  );

  const visible = filtered.slice(0, visibleCount);

  function selectFilter(next: Filter) {
    setFilter(next);
    setVisibleCount(36);
    setSelectedIndex(null);
  }

  const activeImage = selectedIndex !== null ? filtered[selectedIndex] : null;

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => ((prev! + 1) % filtered.length));
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  }, [selectedIndex, filtered.length]);

  const handlePrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => ((prev! - 1 + filtered.length) % filtered.length));
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  }, [selectedIndex, filtered.length]);

  const handleClose = useCallback(() => {
    setSelectedIndex(null);
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  }, []);

  const handleZoomIn = () => setZoomLevel((z) => Math.min(z + 0.35, 3.5));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(z - 0.35, 0.7));
  const handleResetZoom = () => {
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  };

  // Keyboard navigation
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "+" || e.key === "=") handleZoomIn();
      if (e.key === "-") handleZoomOut();
      if (e.key === "0") handleResetZoom();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, handleClose, handleNext, handlePrev]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedIndex]);

  // Pan dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsPanning(true);
      setDragStart({ x: e.clientX - panPosition.x, y: e.clientY - panPosition.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning && zoomLevel > 1) {
      setPanPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => setIsPanning(false);

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
            Authentic Sheetal Electrotech photography and visual assets recovered from the company&apos;s official legacy website, organized around manufacturing, products and technical knowledge. Click any image to inspect in high-resolution lightbox with zoom.
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
            <figure
              key={item.src + index}
              onClick={() => {
                setSelectedIndex(index);
                setZoomLevel(1);
                setPanPosition({ x: 0, y: 0 });
              }}
              className="group bg-white border border-steel/10 overflow-hidden cursor-pointer hover:border-accent hover:shadow-md transition-all duration-300"
            >
              <div className="relative aspect-[4/3] bg-mist overflow-hidden">
                <Image
                  src={item.src}
                  alt={`${item.category} — Sheetal Electrotech official archive image ${index + 1}`}
                  fill
                  priority={index < 8}
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                  <span className="text-white text-xs font-sans font-medium">Click to expand</span>
                </div>
              </div>
              <figcaption className="px-4 py-3 flex items-center justify-between gap-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-accent font-semibold">
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

        {/* FULLSCREEN LIGHTBOX MODAL */}
        {activeImage && (
          <div
            className="fixed inset-0 z-50 bg-ink/95 backdrop-blur-md flex flex-col animate-in fade-in duration-200"
            onClick={handleClose}
          >
            {/* Top Bar */}
            <div
              className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 bg-accent/20 border border-accent/40 text-accent font-mono text-xs uppercase tracking-wider font-semibold rounded-xs">
                  {activeImage.category} Archive
                </span>
                <span className="text-white font-display text-base md:text-lg">
                  Photo {selectedIndex! + 1} of {filtered.length}
                </span>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleZoomIn}
                  title="Zoom In (+)"
                  className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-sm transition-colors"
                >
                  <ZoomIn className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleZoomOut}
                  title="Zoom Out (-)"
                  className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-sm transition-colors"
                >
                  <ZoomOut className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleResetZoom}
                  title="Reset Zoom (0)"
                  className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-sm transition-colors text-xs font-mono"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
                <a
                  href={activeImage.src}
                  target="_blank"
                  rel="noreferrer"
                  download
                  title="Open / Download Original"
                  className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-sm transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
                <div className="h-6 w-px bg-white/20 mx-1" />
                <button
                  type="button"
                  onClick={handleClose}
                  title="Close (Esc)"
                  className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-sm transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Main Stage */}
            <div
              className={`flex-1 relative flex items-center justify-center p-4 overflow-hidden select-none ${
                zoomLevel > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-default"
              }`}
              onClick={(e) => e.stopPropagation()}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            >
              {/* Prev Button */}
              {filtered.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="absolute left-6 z-20 p-3 bg-black/60 hover:bg-accent text-white rounded-full transition-colors border border-white/20 shadow-lg"
                  title="Previous (Arrow Left)"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              {/* Next Button */}
              {filtered.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-6 z-20 p-3 bg-black/60 hover:bg-accent text-white rounded-full transition-colors border border-white/20 shadow-lg"
                  title="Next (Arrow Right)"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}

              {/* Enlarged Image Container */}
              <div
                className="relative max-w-full max-h-full transition-transform duration-100 ease-out"
                style={{
                  transform: `scale(${zoomLevel}) translate(${panPosition.x / zoomLevel}px, ${panPosition.y / zoomLevel}px)`,
                }}
              >
                <img
                  src={activeImage.src}
                  alt={`Archive photograph ${selectedIndex! + 1}`}
                  className="max-h-[82vh] max-w-[90vw] object-contain shadow-2xl rounded-xs pointer-events-none"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
