"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  Layers,
  Camera,
} from "lucide-react";

interface FacilityPhotoGalleryProps {
  images: string[];
  facilityTitle: string;
}

export default function FacilityPhotoGallery({
  images,
  facilityTitle,
}: FacilityPhotoGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isPanning, setIsPanning] = useState(false);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const activeImage = selectedIndex !== null ? images[selectedIndex] : null;

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => ((prev! + 1) % images.length));
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  }, [selectedIndex, images.length]);

  const handlePrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => ((prev! - 1 + images.length) % images.length));
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  }, [selectedIndex, images.length]);

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

  if (!images || images.length === 0) return null;

  return (
    <div>
      {/* Gallery Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 text-accent font-mono text-xs uppercase tracking-wider font-semibold rounded-full mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>Factory Floor Photo Archive</span>
          </div>
          <h3 className="text-3xl md:text-4xl font-display font-medium text-ink">
            Authentic Machinery & Production Lines
          </h3>
          <p className="text-steel text-base mt-2 max-w-2xl">
            Original photographic records of the {facilityTitle} facility at Sheetal Electrotech, Daman. Click any photo to inspect in high-resolution lightbox.
          </p>
        </div>
        <div className="text-right font-mono text-xs text-steel/70">
          <span>{images.length} High-Resolution Photographs</span>
        </div>
      </div>

      {/* Grid of Authentic Photos */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {images.map((src, index) => (
          <div
            key={src + index}
            onClick={() => {
              setSelectedIndex(index);
              setZoomLevel(1);
              setPanPosition({ x: 0, y: 0 });
            }}
            className="group relative aspect-[4/3] bg-mist/60 border border-steel/20 overflow-hidden cursor-pointer rounded-xs hover:border-accent hover:shadow-lg transition-all duration-300"
          >
            <Image
              src={src}
              alt={`${facilityTitle} factory floor photo ${index + 1}`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Overlay Banner */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
              <span className="font-mono text-[10px] text-accent uppercase tracking-wider font-semibold">
                Archival Record #{index + 1}
              </span>
              <span className="text-white text-xs font-sans font-medium">
                Click to expand & zoom
              </span>
            </div>
            {/* Badge top-left */}
            <div className="absolute top-2 left-2 px-2 py-0.5 bg-ink/75 backdrop-blur-xs text-[10px] font-mono text-white/90 rounded-xs border border-white/10">
              0{index + 1}
            </div>
          </div>
        ))}
      </div>

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
                Facility Archive
              </span>
              <span className="text-white font-display text-base md:text-lg">
                {facilityTitle} · Photo {selectedIndex! + 1} of {images.length}
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
                href={activeImage}
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
            {images.length > 1 && (
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
            {images.length > 1 && (
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
                src={activeImage}
                alt={`${facilityTitle} archive photograph`}
                className="max-h-[82vh] max-w-[90vw] object-contain shadow-2xl rounded-xs pointer-events-none"
              />
            </div>
          </div>

          {/* Bottom Thumbnails Strip */}
          <div
            className="h-20 bg-black/60 border-t border-white/10 px-6 py-2 flex items-center gap-3 overflow-x-auto z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {images.map((src, idx) => (
              <button
                key={src + idx}
                type="button"
                onClick={() => {
                  setSelectedIndex(idx);
                  setZoomLevel(1);
                  setPanPosition({ x: 0, y: 0 });
                }}
                className={`relative h-14 w-20 flex-shrink-0 rounded-xs overflow-hidden border-2 transition-all ${
                  idx === selectedIndex
                    ? "border-accent scale-105 shadow-md"
                    : "border-white/20 opacity-60 hover:opacity-100 hover:border-white/60"
                }`}
              >
                <Image
                  src={src}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
