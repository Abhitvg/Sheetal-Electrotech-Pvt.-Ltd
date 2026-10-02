import QualityProcessInteractive from "@/components/QualityProcessInteractive";

export default function QualityPage() {
  return (
    <div className="bg-paper min-h-screen text-ink">
      
      {/* Hero Header */}
      <div className="pt-40 pb-20 px-6 container-wide">
        <div className="max-w-4xl">
          <p className="font-mono text-accent text-sm uppercase tracking-widest mb-6 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-accent inline-block"></span>
            Quality & Compliance
          </p>
          <h1 className="text-5xl md:text-7xl font-display font-medium mb-8">
            Built into every stage of manufacturing.
          </h1>
          <p className="text-steel text-xl max-w-2xl">
            We don't just manufacture; we validate. Our in-house testing and robust inspection processes support compliance with domestic BIS standards and our own internal quality metrics.
          </p>
        </div>
      </div>

      <QualityProcessInteractive />

      {/* Certifications & Compliance Download Strip */}
      <section className="bg-mist text-ink py-24">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16 border-b border-slate-200 pb-8">
            <div>
              <h2 className="text-3xl md:text-5xl font-display font-medium mb-4">Certifications</h2>
              <p className="text-ink/60">Our manufacturing capabilities are supported by industry-recognized quality standards.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="border border-slate-200 p-8 flex flex-col gap-6 bg-white">
              <div className="w-16 h-16 bg-slate-100 flex items-center justify-center rounded-sm text-ink font-display text-xl font-bold">
                ISO
              </div>
              <div>
                <h4 className="text-xl font-medium mb-2">ISO 9001:2015</h4>
                <p className="text-base text-ink/70 leading-relaxed">
                  Certified Quality Management System covering our design, manufacturing and supply operations.
                </p>
              </div>
            </div>
            
            <div className="border border-slate-200 p-8 flex flex-col gap-6 bg-white">
              <div className="w-16 h-16 bg-slate-100 flex items-center justify-center rounded-sm text-ink font-display text-xl font-bold">
                BIS
              </div>
              <div>
                <h4 className="text-xl font-medium mb-2">BIS Certified</h4>
                <p className="text-base text-ink/70 leading-relaxed">
                  Products manufactured in compliance with Bureau of Indian Standards requirements for safety and performance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
