"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  FileSpreadsheet,
  Download,
  Eye,
} from "lucide-react";

interface GalleryImageItem {
  src: string;
  alt: string;
  isDatasheet?: boolean;
  label?: string;
}

interface ProductGalleryProps {
  productName: string;
  mainImage: string;
  bg?: string;
  additionalImages?: string[];
  datasheetImage?: string;
  onOpenDatasheetModal?: () => void;
}

export default function ProductGallery({
  productName,
  mainImage,
  bg = "bg-mist",
  additionalImages = [],
  datasheetImage,
}: ProductGalleryProps) {
  // Build unified list of unique images
  const allImageItems: GalleryImageItem[] = [];

  // Add primary product image
  allImageItems.push({
    src: mainImage,
    alt: `${productName} — Main view`,
    label: "Main View",
  });

  // Add additional product images (filtering duplicates)
  additionalImages.forEach((img, i) => {
    if (img && !allImageItems.some((item) => item.src === img)) {
      const filename = img.split("/").pop()?.toLowerCase() || "";
      const isSheet =
        filename.includes("specs") ||
        filename.includes("desc") ||
        filename.includes("datasheet") ||
        img === datasheetImage;

      allImageItems.push({
        src: img,
        alt: `${productName} — ${isSheet ? "Technical Datasheet" : `Angle ${i + 1}`}`,
        isDatasheet: isSheet,
        label: isSheet ? "Datasheet" : `View ${i + 1}`,
      });
    }
  });

  // Add dedicated datasheet image if not already included
  if (
    datasheetImage &&
    !allImageItems.some((item) => item.src === datasheetImage)
  ) {
    allImageItems.push({
      src: datasheetImage,
      alt: `${productName} — Engineering Datasheet`,
      isDatasheet: true,
      label: "Official Datasheet",
    });
  }

  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const activeItem = allImageItems[activeIndex] || allImageItems[0];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setZoomLevel(1);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setZoomLevel(1);
  };

  const nextLightboxImage = useCallback(() => {
    setLightboxIndex((prev) => (prev + 1) % allImageItems.length);
    setZoomLevel(1);
  }, [allImageItems.length]);

  const prevLightboxImage = useCallback(() => {
    setLightboxIndex(
      (prev) => (prev - 1 + allImageItems.length) % allImageItems.length
    );
    setZoomLevel(1);
  }, [allImageItems.length]);

  // Handle keyboard navigation in lightbox
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextLightboxImage();
      if (e.key === "ArrowLeft") prevLightboxImage();
      if (e.key === "+" || e.key === "=") {
        setZoomLevel((z) => Math.min(z + 0.25, 3));
      }
      if (e.key === "-") {
        setZoomLevel((z) => Math.max(z - 0.25, 0.75));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, nextLightboxImage, prevLightboxImage]);

  const handleImageError = (src: string) => {
    setImgErrors((prev) => ({ ...prev, [src]: true }));
  };

  return (
    <div className="w-full">
      {/* Main Image Display Box */}
      <div
        className={`group relative aspect-[4/3] ${bg} border border-steel/15 overflow-hidden flex items-center justify-center p-6 cursor-pointer select-none transition-all duration-300 hover:border-accent/40`}
        onClick={() => openLightbox(activeIndex)}
        role="button"
        tabIndex={0}
        aria-label={`Open fullscreen view of ${activeItem?.alt}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") openLightbox(activeIndex);
        }}
      >
        {/* Subtle engineering corner markers */}
        <div className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-steel/20 group-hover:border-accent transition-colors" />
        <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-steel/20 group-hover:border-accent transition-colors" />
        <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-steel/20 group-hover:border-accent transition-colors" />
        <div className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-steel/20 group-hover:border-accent transition-colors" />

        {/* Datasheet special badge if active image is a sheet */}
        {activeItem?.isDatasheet && (
          <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 bg-accent text-white px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider font-semibold rounded-sm shadow-sm">
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Technical Datasheet</span>
          </div>
        )}

        {/* View / Zoom Hint Button */}
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-white/90 hover:bg-white text-ink text-xs font-mono px-2.5 py-1 border border-steel/20 shadow-sm opacity-80 group-hover:opacity-100 transition-opacity">
          <Maximize2 className="w-3.5 h-3.5 text-accent" />
          <span>Zoom</span>
        </div>

        {/* The Displayed Image */}
        <div className="relative w-full h-full">
          <Image
            src={
              imgErrors[activeItem?.src]
                ? "/images/led-bulb.png"
                : activeItem?.src || mainImage
            }
            alt={activeItem?.alt || productName}
            fill
            sizes="(max-width: 768px) 100vw, 42vw"
            priority={activeIndex === 0}
            className={`transition-all duration-500 group-hover:scale-105 ${
              activeItem?.isDatasheet ? "object-contain p-2" : "object-contain p-4"
            }`}
            onError={() => handleImageError(activeItem?.src)}
          />
        </div>

        {/* Click-to-enlarge overlay banner on hover */}
        <div className="absolute inset-x-0 bottom-0 py-2.5 bg-gradient-to-t from-ink/80 to-transparent text-white text-xs font-mono flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Eye className="w-3.5 h-3.5 text-accent" />
          <span>Click to open high-resolution gallery & zoom</span>
        </div>
      </div>

      {/* Thumbnails Row */}
      {allImageItems.length > 1 && (
        <div className="grid grid-cols-4 gap-2.5 mt-3">
          {allImageItems.map((item, index) => {
            const isSelected = index === activeIndex;
            return (
              <button
                key={`${item.src}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                onDoubleClick={() => openLightbox(index)}
                className={`group relative aspect-[4/3] overflow-hidden bg-white border-2 transition-all duration-200 text-left ${
                  isSelected
                    ? "border-accent shadow-md ring-2 ring-accent/20"
                    : "border-steel/15 hover:border-accent/50 opacity-80 hover:opacity-100"
                }`}
                title={
                  item.isDatasheet
                    ? "Click to view Technical Datasheet"
                    : `View image ${index + 1}`
                }
              >
                <Image
                  src={
                    imgErrors[item.src] ? "/images/led-bulb.png" : item.src
                  }
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 25vw, 10vw"
                  className={`transition-transform duration-300 group-hover:scale-110 ${
                    item.isDatasheet ? "object-contain p-1" : "object-cover"
                  }`}
                  onError={() => handleImageError(item.src)}
                />

                {/* Datasheet overlay badge on thumbnail */}
                {item.isDatasheet && (
                  <div className="absolute inset-x-0 bottom-0 bg-accent/90 text-white text-[9px] font-mono text-center py-0.5 tracking-wider uppercase font-bold flex items-center justify-center gap-1">
                    <FileSpreadsheet className="w-2.5 h-2.5" />
                    <span>Sheet</span>
                  </div>
                )}

                {/* Selected Indicator Pill */}
                {isSelected && !item.isDatasheet && (
                  <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-accent ring-2 ring-white" />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-ink/95 backdrop-blur-md flex flex-col items-center justify-between p-4 md:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${productName} image viewer`}
        >
          {/* Header Controls */}
          <div className="w-full flex items-center justify-between z-10 py-2 border-b border-white/10 text-white">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
                {productName}
              </span>
              <span className="text-white/40 text-sm">/</span>
              <span className="text-sm font-mono text-white/80">
                {allImageItems[lightboxIndex]?.label ||
                  `Image ${lightboxIndex + 1} of ${allImageItems.length}`}
              </span>
              {allImageItems[lightboxIndex]?.isDatasheet && (
                <span className="bg-accent/30 text-accent border border-accent/40 text-[11px] font-mono px-2 py-0.5 rounded-sm">
                  Certified Technical Ratings
                </span>
              )}
            </div>

            {/* Toolbar Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.min(z + 0.25, 3))}
                className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors"
                title="Zoom In (+)"
                aria-label="Zoom in"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.max(z - 0.25, 0.75))}
                className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors"
                title="Zoom Out (-)"
                aria-label="Zoom out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setZoomLevel(1)}
                className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors"
                title="Reset Zoom"
                aria-label="Reset zoom"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <a
                href={allImageItems[lightboxIndex]?.src}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors inline-flex items-center"
                title="Open original high-resolution file in new tab"
                aria-label="Open original image"
              >
                <Download className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={closeLightbox}
                className="p-2 bg-white/10 hover:bg-accent text-white rounded transition-colors ml-2"
                title="Close (Esc)"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Image View Area */}
          <div className="relative flex-1 w-full flex items-center justify-center overflow-auto my-4">
            {/* Previous Arrow */}
            {allImageItems.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prevLightboxImage();
                }}
                className="absolute left-2 md:left-6 z-20 p-3 rounded-full bg-white/10 hover:bg-accent text-white backdrop-blur-sm transition-all"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* The Image inside Zoom Container */}
            <div
              className="relative max-w-full max-h-[75vh] flex items-center justify-center transition-transform duration-200"
              style={{
                transform: `scale(${zoomLevel})`,
                transformOrigin: "center center",
              }}
            >
              <img
                src={
                  imgErrors[allImageItems[lightboxIndex]?.src]
                    ? "/images/led-bulb.png"
                    : allImageItems[lightboxIndex]?.src
                }
                alt={allImageItems[lightboxIndex]?.alt || productName}
                className={`max-w-[90vw] max-h-[70vh] object-contain rounded-sm shadow-2xl ${
                  allImageItems[lightboxIndex]?.isDatasheet
                    ? "bg-white p-4 border border-white/20"
                    : ""
                }`}
                onError={() =>
                  handleImageError(allImageItems[lightboxIndex]?.src)
                }
              />
            </div>

            {/* Next Arrow */}
            {allImageItems.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  nextLightboxImage();
                }}
                className="absolute right-2 md:right-6 z-20 p-3 rounded-full bg-white/10 hover:bg-accent text-white backdrop-blur-sm transition-all"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Bottom Thumbnails Strip */}
          <div className="w-full flex items-center justify-center gap-2 overflow-x-auto py-2 z-10 border-t border-white/10">
            {allImageItems.map((item, idx) => (
              <button
                key={`lightbox-thumb-${idx}`}
                type="button"
                onClick={() => {
                  setLightboxIndex(idx);
                  setZoomLevel(1);
                }}
                className={`relative w-16 h-12 flex-shrink-0 border-2 overflow-hidden bg-black/40 transition-all ${
                  idx === lightboxIndex
                    ? "border-accent scale-105"
                    : "border-white/20 hover:border-white/60 opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={imgErrors[item.src] ? "/images/led-bulb.png" : item.src}
                  alt={item.alt}
                  className="w-full h-full object-contain"
                />
                {item.isDatasheet && (
                  <span className="absolute bottom-0 inset-x-0 bg-accent text-[8px] text-white font-mono uppercase text-center">
                    Sheet
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
