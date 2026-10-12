import { Link } from "@/i18n/routing";
import { FACILITY_PROCESS_CHAINS } from "@/data/facilityProcessChains";
import { ArrowLeft, ArrowRight, Layers } from "lucide-react";

interface Props {
  currentSlug: string;
  variant?: "inline" | "sticky" | "bottom-cards";
}

export default function ProcessChainNav({ currentSlug, variant = "inline" }: Props) {
  const currentIndex = FACILITY_PROCESS_CHAINS.findIndex((f) => f.slug === currentSlug);
  const currentFacility = FACILITY_PROCESS_CHAINS[currentIndex] || FACILITY_PROCESS_CHAINS[0];
  const total = FACILITY_PROCESS_CHAINS.length;

  const prevFacility = currentIndex > 0 ? FACILITY_PROCESS_CHAINS[currentIndex - 1] : null;
  const nextFacility = currentIndex < total - 1 ? FACILITY_PROCESS_CHAINS[currentIndex + 1] : null;

  if (variant === "bottom-cards") {
    return (
      <div className="grid md:grid-cols-2 gap-6 my-16">
        {prevFacility ? (
          <Link
            href={`/facilities/${prevFacility.slug}`}
            className="group block p-7 rounded-2xl bg-white border border-slate-200 hover:border-accent hover:shadow-md transition-all text-left"
          >
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-accent" />
              <span>Step {String(currentIndex).padStart(2, "0")} of 09 · Previous Facility</span>
            </div>
            <h4 className="text-xl font-display font-medium text-ink group-hover:text-accent transition-colors">
              {prevFacility.name}
            </h4>
            <p className="text-xs text-slate-600 mt-1 line-clamp-2">{prevFacility.role}</p>
          </Link>
        ) : (
          <div className="p-7 rounded-2xl bg-slate-50 border border-slate-200 opacity-60">
            <span className="text-xs font-mono text-slate-600 uppercase tracking-widest block mb-2">
              Start of Manufacturing Chain
            </span>
            <h4 className="text-xl font-display font-medium text-slate-600">
              01 {currentFacility.name}
            </h4>
          </div>
        )}

        {nextFacility ? (
          <Link
            href={`/facilities/${nextFacility.slug}`}
            className="group block p-7 rounded-2xl bg-white border border-slate-200 hover:border-accent hover:shadow-md transition-all text-right"
          >
            <div className="flex items-center justify-end gap-2 text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">
              <span>Next Facility · Step {String(currentIndex + 2).padStart(2, "0")} of 09</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-accent" />
            </div>
            <h4 className="text-xl font-display font-medium text-ink group-hover:text-accent transition-colors">
              {nextFacility.name}
            </h4>
            <p className="text-xs text-slate-600 mt-1 line-clamp-2">{nextFacility.role}</p>
          </Link>
        ) : (
          <div className="p-7 rounded-2xl bg-slate-50 border border-slate-200 opacity-60 text-right">
            <span className="text-xs font-mono text-slate-600 uppercase tracking-widest block mb-2">
              End of Manufacturing Chain
            </span>
            <h4 className="text-xl font-display font-medium text-slate-600">
              09 {currentFacility.name}
            </h4>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm my-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Previous step */}
        {prevFacility ? (
          <Link
            href={`/facilities/${prevFacility.slug}`}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-600 hover:text-accent hover:bg-slate-50 transition-colors"
            title={`Previous: ${prevFacility.name}`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Prev:</span> {prevFacility.name}
          </Link>
        ) : (
          <span className="px-3 py-1.5 text-xs font-mono text-slate-300 select-none">
            Chain Origin
          </span>
        )}

        {/* Center: 9-stage sequence with dots */}
        <div className="flex flex-col items-center gap-2">
          <div className="text-[11px] font-mono text-slate-500 flex items-center gap-2">
            <span>Process Step</span>
            <span className="font-bold text-accent">
              {String(currentIndex + 1).padStart(2, "0")} of 09
            </span>
            <span>·</span>
            <span className="font-medium text-slate-900">{currentFacility.name}</span>
          </div>

          <div className="flex items-center gap-2">
            {FACILITY_PROCESS_CHAINS.map((fac, idx) => {
              const isCurrent = fac.slug === currentSlug;
              const isPast = idx < currentIndex;

              return (
                <Link
                  key={fac.slug}
                  href={`/facilities/${fac.slug}`}
                  title={`${String(idx + 1).padStart(2, "0")} ${fac.name}`}
                  className={`group relative flex items-center justify-center transition-all ${
                    isCurrent ? "scale-125" : "hover:scale-110"
                  }`}
                >
                  <span
                    className={`block w-2.5 h-2.5 rounded-full transition-all ${
                      isCurrent
                        ? "bg-accent ring-4 ring-orange-100"
                        : isPast
                        ? "bg-slate-900"
                        : "bg-slate-200 hover:bg-slate-400"
                    }`}
                  />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right: Next step or Processes overview link */}
        <div className="flex items-center gap-2">
          {nextFacility ? (
            <Link
              href={`/facilities/${nextFacility.slug}`}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-600 hover:text-accent hover:bg-slate-50 transition-colors"
              title={`Next: ${nextFacility.name}`}
            >
              <span className="hidden sm:inline">Next:</span> {nextFacility.name}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <Link
              href="/processes"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-accent hover:bg-orange-50 font-semibold transition-colors"
            >
              <Layers className="w-3.5 h-3.5" /> View Full Chain
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
