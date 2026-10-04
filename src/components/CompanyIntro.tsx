import { companyFacts } from "@/data/companyFacts";

const divisions = [
  { label: "LED Lighting", desc: "Bulbs, battens, downlights, street lights, flood lights and more." },
  { label: "Electronics", desc: "PCB assembly, driver circuits and electronic sub-assemblies." },
  { label: "Rigid Plastic Packaging", desc: "Bottles, containers, jars and custom moulded packaging." },
  { label: "OEM Manufacturing", desc: "Manufacturing solutions developed around customer specifications." },
];

export default function CompanyIntro() {
  return (
    <section className="py-24 md:py-32 bg-paper border-b border-steel/10" id="company-intro">
      <div className="container-wide">
        <div
          ref={ref}
          className="max-w-4xl mb-20 reveal-on-load"
        >
          <p className="font-mono text-accent text-sm uppercase tracking-widest mb-4">
            {companyFacts.experience} Years of Manufacturing Expertise
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-ink mb-8 leading-tight">
            Integrated manufacturing under one ecosystem.
          </h2>
          <p className="text-steel text-lg md:text-xl leading-relaxed max-w-3xl">
            Sheetal Group is an Indian manufacturer and supplier specializing in LED lighting,
            electronics and rigid plastic packaging. With more than 25 years of industry experience,
            the company combines product development, moulding, electronics manufacturing, assembly
            and quality processes under one manufacturing ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {divisions.map((div, i) => (
            <div
              key={div.label}
              className="border border-steel/15 p-8 bg-white hover:border-accent/30 transition-colors reveal-on-load"
            >
              <p className="font-mono text-accent text-xs uppercase tracking-widest mb-3">
                0{i + 1}
              </p>
              <h3 className="text-xl font-display font-bold text-ink mb-3">{div.label}</h3>
              <p className="text-steel text-sm leading-relaxed">{div.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
