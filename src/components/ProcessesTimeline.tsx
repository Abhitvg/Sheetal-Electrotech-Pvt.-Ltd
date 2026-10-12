"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/routing";
import { FACILITY_PROCESS_CHAINS } from "@/data/facilityProcessChains";
import { ArrowRight, CheckCircle2, Cog, Layers, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";

export default function ProcessesTimeline() {
  const [activeSlug, setActiveSlug] = useState<string>(FACILITY_PROCESS_CHAINS[0].slug);

  const activeIndex = FACILITY_PROCESS_CHAINS.findIndex((f) => f.slug === activeSlug);
  const total = FACILITY_PROCESS_CHAINS.length;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const slug = entry.target.getAttribute("data-slug");
            if (slug) {
              setActiveSlug(slug);
            }
          }
        });
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: 0,
      }
    );

    const elements = document.querySelectorAll("[data-process-row]");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToProcess = (slug: string) => {
    setActiveSlug(slug);
    const element = document.getElementById(`process-${slug}`);
    if (element) {
      const yOffset = -140; // account for sticky header & timeline bar
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const goToPrev = () => {
    if (activeIndex > 0) {
      scrollToProcess(FACILITY_PROCESS_CHAINS[activeIndex - 1].slug);
    }
  };

  const goToNext = () => {
    if (activeIndex < total - 1) {
      scrollToProcess(FACILITY_PROCESS_CHAINS[activeIndex + 1].slug);
    }
  };

  return (
    <div className="relative">
      {/* Sticky Process Chain Navigation Bar */}
      <div className="sticky top-20 z-30 mb-12">
        <div className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl shadow-lg p-3 md:p-4 max-w-5xl mx-auto">
          <div className="flex items-center justify-between gap-3">
            {/* Prev step */}
            <button
              onClick={goToPrev}
              disabled={activeIndex === 0}
              className="p-2 rounded-xl text-slate-600 hover:text-accent hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              aria-label="Scroll to previous process"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Current Process Label & Dot Sequence */}
            <div className="flex-1 min-w-0 flex flex-col items-center gap-2">
              <div className="text-xs font-mono text-slate-500 flex items-center gap-2 truncate">
                <span>Active Process:</span>
                <span className="font-bold text-accent">
                  {String(activeIndex + 1).padStart(2, "0")} / 09
                </span>
                <span className="hidden sm:inline text-slate-300">·</span>
                <span className="font-medium text-slate-900 truncate">
                  {FACILITY_PROCESS_CHAINS[activeIndex]?.name}
                </span>
              </div>

              {/* Progress Dots / Steps */}
              <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto max-w-full py-1 px-2">
                {FACILITY_PROCESS_CHAINS.map((fac, idx) => {
                  const isCurrent = fac.slug === activeSlug;
                  const isPast = idx < activeIndex;

                  return (
                    <button
                      key={fac.slug}
                      onClick={() => scrollToProcess(fac.slug)}
                      className={`group relative flex items-center justify-center p-1 transition-all ${
                        isCurrent ? "scale-125" : "hover:scale-110"
                      }`}
                      title={`${String(idx + 1).padStart(2, "0")} ${fac.name}`}
                    >
                      <span
                        className={`block rounded-full transition-all ${
                          isCurrent
                            ? "w-3 h-3 bg-accent ring-4 ring-orange-200"
                            : isPast
                            ? "w-2.5 h-2.5 bg-slate-900"
                            : "w-2.5 h-2.5 bg-slate-200 group-hover:bg-slate-400"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Next step */}
            <button
              onClick={goToNext}
              disabled={activeIndex === total - 1}
              className="p-2 rounded-xl text-slate-600 hover:text-accent hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              aria-label="Scroll to next process"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Sequential Process Rows */}
      <div className="space-y-16">
        {FACILITY_PROCESS_CHAINS.map((fac, index) => {
          const isCurrent = fac.slug === activeSlug;

          return (
            <section
              key={fac.slug}
              id={`process-${fac.slug}`}
              data-slug={fac.slug}
              data-process-row
              className={`rounded-3xl border transition-all duration-500 scroll-mt-36 overflow-hidden ${
                isCurrent
                  ? "bg-white border-accent shadow-xl shadow-accent/10 ring-1 ring-orange-200"
                  : "bg-white/80 border-slate-200 shadow-sm hover:border-slate-300"
              }`}
            >
              {/* Row Header */}
              <div className="p-8 md:p-10 border-b border-slate-100 bg-gradient-to-r from-slate-50/80 via-white to-slate-50/50">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-accent/10 text-accent font-mono text-xs font-bold rounded-full">
                        PROCESS {String(index + 1).padStart(2, "0")} OF 09
                      </span>
                      <span className="font-mono text-xs text-slate-400 uppercase tracking-wider">
                        {fac.kind}
                      </span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-display font-medium text-ink">
                      {fac.name}
                    </h2>

                    <p className="text-slate-600 text-lg mt-2 max-w-2xl leading-relaxed">
                      {fac.role}
                    </p>
                  </div>

                  <Link
                    href={`/facilities/${fac.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 text-white font-medium text-sm hover:bg-accent transition-colors shrink-0 group shadow-sm"
                  >
                    Explore Facility & Simulation
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Row Body: Stages & Technical Details */}
              <div className="p-8 md:p-10 grid lg:grid-cols-12 gap-10">
                {/* Left: Sequential Stages List */}
                <div className="lg:col-span-7">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-slate-500 font-semibold mb-5 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    Internal Manufacturing Stages ({fac.stages.length} Steps)
                  </h3>

                  <div className="space-y-4">
                    {fac.stages.map((st, sIdx) => (
                      <div
                        key={st.title}
                        className="p-5 rounded-2xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex items-baseline gap-3 mb-1.5">
                          <span className="font-mono text-xs font-bold text-accent">
                            0{sIdx + 1}
                          </span>
                          <h4 className="font-display text-lg font-medium text-ink">
                            {st.title}
                          </h4>
                        </div>
                        <p className="text-sm text-slate-600 pl-7 leading-relaxed">
                          {st.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Specs, Feeds, and Quality Checkpoints */}
                <div className="lg:col-span-5 space-y-6">
                  {/* Products this Line Feeds */}
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <h4 className="font-mono text-xs uppercase tracking-widest text-slate-700 font-semibold mb-3 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-accent" />
                      Outputs & Product Feeds
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {fac.feeds.map((feed) => (
                        <span
                          key={feed}
                          className="px-3 py-1.5 bg-white border border-slate-200 text-xs font-medium text-slate-800 rounded-lg"
                        >
                          {feed}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Quality Checkpoints */}
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <h4 className="font-mono text-xs uppercase tracking-widest text-slate-700 font-semibold mb-3 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      Quality Checkpoints
                    </h4>
                    <ul className="space-y-2.5">
                      {fac.qc.map((point) => (
                        <li key={point} className="flex items-start gap-2.5 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Specifications Quick Glance */}
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <h4 className="font-mono text-xs uppercase tracking-widest text-slate-700 font-semibold mb-3 flex items-center gap-2">
                      <Cog className="w-4 h-4 text-slate-700" />
                      Engineering Specifications
                    </h4>
                    <dl className="divide-y divide-slate-200/60 text-xs">
                      {fac.specs.slice(0, 3).map(([label, val]) => (
                        <div key={label} className="py-2 flex justify-between gap-4">
                          <dt className="text-slate-500 font-mono">{label}</dt>
                          <dd className="font-medium text-slate-900 text-right">{val}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
