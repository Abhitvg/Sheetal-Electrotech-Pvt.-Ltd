import { useTranslations } from "next-intl";

const logos = [
  { name: "TATA", style: "font-bold tracking-tight" },
  { name: "CROMPTON", style: "font-medium tracking-widest uppercase text-lg" },
  { name: "LEDVANCE", style: "font-bold tracking-widest text-lg" },
  { name: "ORIENT", style: "font-semibold tracking-wide" },
  { name: "HPCL", style: "font-bold italic tracking-tight" },
  { name: "UPL", style: "font-black tracking-widest" },
  { name: "TATA", style: "font-bold tracking-tight" },
  { name: "CROMPTON", style: "font-medium tracking-widest uppercase text-lg" },
  { name: "LEDVANCE", style: "font-bold tracking-widest text-lg" },
  { name: "ORIENT", style: "font-semibold tracking-wide" },
  { name: "HPCL", style: "font-bold italic tracking-tight" },
  { name: "UPL", style: "font-black tracking-widest" },
];

export default function TrustWall() {
  const t = useTranslations("TrustWall");
  return (
    <section className="py-20 bg-paper border-y border-slate-200 overflow-hidden" id="trust">
      <div
      >
        <p className="text-center font-mono text-xs uppercase tracking-[0.3em] text-steel mb-12">
          Trusted by Industry Leaders
        </p>

        {/* Infinite Marquee */}
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-paper to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-paper to-transparent z-10" />

          <div className="flex animate-marquee">
            {logos.map((logo, i) => (
              <div
                key={i}
                className="flex-shrink-0 mx-12 flex items-center justify-center"
              >
                <span
                  className={`text-2xl md:text-3xl font-display text-ink/30 hover:text-ink/70 transition-colors duration-500 select-none whitespace-nowrap ${logo.style}`}
                >
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
