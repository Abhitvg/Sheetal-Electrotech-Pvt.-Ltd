"use client";

import { useState, useEffect } from "react";
import {
  FileSpreadsheet,
  Maximize2,
  Zap,
  Activity,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Download,
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sun,
} from "lucide-react";
import { ProductDatasheet } from "@/data/productDatasheets";

interface ProductDatasheetSectionProps {
  datasheet: ProductDatasheet;
  productName: string;
}

export default function ProductDatasheetSection({
  datasheet,
  productName,
}: ProductDatasheetSectionProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Close on Escape key
  useEffect(() => {
    if (!modalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalOpen]);

  const openModal = () => {
    setZoomLevel(1);
    setModalOpen(true);
  };

  return (
    <div className="mt-8 border border-accent/25 rounded-sm bg-gradient-to-b from-white to-[#fbfcfe] p-6 md:p-8 shadow-sm">
      {/* Top Banner & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-steel/15">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/25 text-accent text-xs font-mono uppercase tracking-wider font-semibold rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Certified Technical Ratings & Engineering Datasheet</span>
          </div>
          <h3 className="text-xl md:text-2xl font-display font-bold text-ink">
            {datasheet.sheetTitle || `${productName} Technical Specifications`}
          </h3>
          <p className="text-steel text-sm mt-1">
            {datasheet.sheetSubtitle ||
              "Verified manufacturing specifications compliant with national & international illumination standards."}
          </p>
        </div>

        {/* Action Button: View Full Scanned Sheet */}
        <button
          type="button"
          onClick={openModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-ink text-white hover:bg-accent text-sm font-medium font-mono uppercase tracking-wider transition-all duration-200 shadow-sm flex-shrink-0 cursor-pointer"
        >
          <Maximize2 className="w-4 h-4 text-accent hover:text-white" />
          <span>Inspect Original Sheet</span>
        </button>
      </div>

      {/* Key Highlights Quick Strip (IN FRONT!) */}
      {datasheet.highlights && datasheet.highlights.length > 0 && (
        <div className="my-6">
          <p className="text-xs font-mono text-steel uppercase tracking-widest mb-3 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-accent" />
            <span>Key Engineering Ratings</span>
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {datasheet.highlights.map((h, i) => (
              <div
                key={i}
                className="bg-white border border-steel/15 p-3 rounded-sm hover:border-accent/40 transition-colors shadow-xs"
              >
                <p className="text-[11px] font-mono text-steel uppercase tracking-wider mb-1">
                  {h.label}
                </p>
                <p className="text-sm font-semibold text-ink font-display">
                  {h.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Factory Available CCT Temperatures (Kelvin Spectrum) Bar */}
      {(() => {
        const hasCct =
          datasheet.columns?.some((c) => c.toLowerCase().includes("cct")) ||
          datasheet.highlights?.some(
            (h) =>
              h.label.toLowerCase().includes("cct") ||
              h.label.toLowerCase().includes("color")
          );

        if (!hasCct) return null;

        return (
          <div className="my-6 p-4 md:p-5 rounded-sm bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-sky-500/10 border border-steel/20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-ink">
                  Factory Available CCT Temperatures (Kelvin Spectrum)
                </span>
              </div>
              <span className="text-[11px] font-mono text-steel">
                Custom Kelvin (2700K–6500K) & 3CCT drivers supported on demand
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* 3000K Warm White */}
              <div className="flex items-start gap-3 p-3 bg-white border border-amber-300/80 rounded-sm shadow-xs">
                <span className="w-4 h-4 mt-0.5 rounded-full bg-[#f59e0b] ring-2 ring-amber-200 flex-shrink-0" />
                <div>
                  <div className="text-xs font-bold text-ink font-mono flex items-center gap-1.5">
                    <span>3000K Warm White</span>
                    <span className="text-[10px] text-amber-700 font-sans font-semibold">(WW)</span>
                  </div>
                  <p className="text-[11px] text-steel mt-0.5">
                    Living rooms, bedrooms, hospitality corridors, restaurants & dining
                  </p>
                </div>
              </div>

              {/* 4000K Neutral White */}
              <div className="flex items-start gap-3 p-3 bg-white border border-yellow-300/80 rounded-sm shadow-xs">
                <span className="w-4 h-4 mt-0.5 rounded-full bg-[#fde047] ring-2 ring-yellow-200 flex-shrink-0" />
                <div>
                  <div className="text-xs font-bold text-ink font-mono flex items-center gap-1.5">
                    <span>4000K Neutral White</span>
                    <span className="text-[10px] text-stone-600 font-sans font-semibold">(NW)</span>
                  </div>
                  <p className="text-[11px] text-steel mt-0.5">
                    Modern corporate offices, task areas, retail showrooms & study tables
                  </p>
                </div>
              </div>

              {/* 6500K Cool Daylight */}
              <div className="flex items-start gap-3 p-3 bg-white border border-sky-300/80 rounded-sm shadow-xs">
                <span className="w-4 h-4 mt-0.5 rounded-full bg-[#38bdf8] ring-2 ring-sky-200 flex-shrink-0" />
                <div>
                  <div className="text-xs font-bold text-ink font-mono flex items-center gap-1.5">
                    <span>6500K Cool Daylight</span>
                    <span className="text-[10px] text-sky-700 font-sans font-semibold">(CDL)</span>
                  </div>
                  <p className="text-[11px] text-steel mt-0.5">
                    Industrial sheds, warehousing, healthcare cleanrooms & high-clarity spaces
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* The Tabular Wattage / Matrix Specification Table */}
      {datasheet.columns && datasheet.rows && datasheet.rows.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-mono text-steel uppercase tracking-widest flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-accent" />
              <span>Full Model Range & Dimensional Parameters</span>
            </p>
            <span className="text-[11px] font-mono text-steel/70">
              Scroll horizontally if needed →
            </span>
          </div>

          <div className="overflow-x-auto border border-steel/20 rounded-sm bg-white shadow-xs">
            <table className="w-full text-left text-xs md:text-sm">
              <thead>
                <tr className="bg-slate-900 text-white font-mono text-xs uppercase tracking-wider">
                  {datasheet.columns.map((col, idx) => (
                    <th
                      key={idx}
                      className="py-3 px-4 font-semibold whitespace-nowrap border-r border-white/10 last:border-r-0"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-steel/10 font-sans">
                {datasheet.rows.map((row, rIdx) => (
                  <tr
                    key={rIdx}
                    className="hover:bg-accent/5 transition-colors odd:bg-white even:bg-[#f9fafb]"
                  >
                    {row.map((cell, cIdx) => {
                      const isWattage = cIdx === 1;
                      const isCct = datasheet.columns[cIdx]?.toLowerCase().includes("cct");

                      if (isCct && (cell.includes("3000K") || cell.includes("4000K") || cell.includes("6500K"))) {
                        return (
                          <td
                            key={cIdx}
                            className="py-3 px-4 text-ink whitespace-nowrap border-r border-steel/10 last:border-r-0"
                          >
                            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-slate-50 border border-steel/20 rounded-sm font-mono text-xs">
                              <div className="flex items-center gap-1">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" title="3000K Warm White" />
                                <span className="w-2.5 h-2.5 rounded-full bg-[#fde047] border border-amber-300" title="4000K Neutral White" />
                                <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8]" title="6500K Cool Daylight" />
                              </div>
                              <span className="font-semibold text-ink">{cell}</span>
                            </div>
                          </td>
                        );
                      }

                      return (
                        <td
                          key={cIdx}
                          className={`py-3 px-4 text-ink whitespace-nowrap border-r border-steel/10 last:border-r-0 ${
                            isWattage ? "font-bold text-accent font-mono" : ""
                          }`}
                        >
                          {cell}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Interactive Original Engineering Sheet Preview Card */}
      {datasheet.sheetImage && (
        <div className="mt-8 pt-6 border-t border-steel/15">
          <div
            onClick={openModal}
            className="group relative cursor-pointer overflow-hidden border border-steel/20 bg-mist/60 hover:border-accent transition-all duration-300 p-4 md:p-6 rounded-sm flex flex-col md:flex-row items-center gap-6"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") openModal();
            }}
          >
            {/* Sheet Preview Box */}
            <div className="relative w-full md:w-72 h-28 bg-white border border-steel/20 rounded overflow-hidden shadow-xs flex-shrink-0 flex items-center justify-center p-2 group-hover:scale-[1.02] transition-transform">
              <img
                src={datasheet.sheetImage}
                alt="Original Engineering Specification Sheet Scan"
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 bg-ink/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="bg-ink/90 text-white text-[11px] font-mono px-3 py-1.5 rounded flex items-center gap-1.5 shadow-md">
                  <Maximize2 className="w-3.5 h-3.5 text-accent" />
                  <span>Click to Expand</span>
                </div>
              </div>
            </div>

            {/* Description & Certifications */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-mono text-emerald-700 font-semibold mb-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Original Factory Test Document Available</span>
              </div>
              <h4 className="font-display font-bold text-ink text-base md:text-lg group-hover:text-accent transition-colors">
                Official Engineering Ratings Sheet (High-Resolution View)
              </h4>
              <p className="text-steel text-xs md:text-sm mt-1 max-w-xl">
                Click here to view the high-resolution original technical sheet
                with complete beam angles, voltage thresholds, surge endurance,
                and dimensional schematics.
              </p>
            </div>

            {/* Prompt Pill */}
            <div className="flex-shrink-0">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-accent bg-accent/10 px-3 py-2 rounded-sm group-hover:bg-accent group-hover:text-white transition-colors">
                <span>Enlarge Sheet</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      )}

      {/* High-Resolution Engineering Datasheet Lightbox Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 bg-ink/95 backdrop-blur-md flex flex-col items-center justify-center p-4 md:p-8"
          onClick={() => setModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`${datasheet.sheetTitle} modal`}
        >
          <div
            className="relative bg-white max-w-6xl w-full max-h-[92vh] flex flex-col overflow-hidden rounded-sm shadow-2xl border border-steel/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 md:px-6 md:py-4 border-b border-steel/15 bg-slate-900 text-white">
              <div className="flex items-center gap-3">
                <FileSpreadsheet className="w-5 h-5 text-accent" />
                <div>
                  <span className="text-[10px] font-mono uppercase text-accent font-semibold tracking-wider block">
                    Official Quality & Engineering Archive
                  </span>
                  <h3 className="text-base md:text-lg font-display font-bold text-white">
                    {datasheet.sheetTitle}
                  </h3>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.min(z + 0.25, 2.5))}
                  className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.max(z - 0.25, 0.75))}
                  className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel(1)}
                  className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors"
                  title="Reset Zoom"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <a
                  href={datasheet.sheetImage}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-white/10 hover:bg-accent text-white text-xs font-mono rounded flex items-center gap-1.5 transition-colors ml-2"
                  title="Open or Save Original High-Res File"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Save File</span>
                </a>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="p-1.5 bg-white/10 hover:bg-accent text-white rounded transition-colors ml-2"
                  title="Close (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body with Zoom / Pan */}
            <div className="flex-1 overflow-auto p-4 md:p-8 bg-[#f4f6f8] flex items-center justify-center min-h-[300px]">
              <div
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: "center center",
                  transition: "transform 0.15s ease-out",
                }}
                className="max-w-full"
              >
                <img
                  src={datasheet.sheetImage}
                  alt={datasheet.sheetTitle}
                  className="max-w-none w-auto max-h-none min-w-full md:min-w-[900px] object-contain bg-white p-4 shadow-md border border-steel/15"
                />
              </div>
            </div>

            <div className="p-3 bg-white border-t border-steel/15 text-center text-xs font-mono text-steel">
              Sheetal Electrotech Pvt. Ltd. • ISO 9001:2015 & BIS Certified Production Testing Datasheet
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
