import { Layers, Settings, ShieldCheck, TrendingUp, DollarSign, Users } from "lucide-react";

const reasons = [
  {
    icon: Layers,
    title: "Vertical Integration",
    description: "Multiple manufacturing processes within one coordinated ecosystem — from mould design through electronics assembly to finished goods.",
  },
  {
    icon: Settings,
    title: "OEM Manufacturing",
    description: "Manufacturing aligned to customer specifications and application requirements. Your brand, our production.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Control",
    description: "Quality checks integrated throughout the manufacturing process, from incoming material inspection to final product testing.",
  },
  {
    icon: TrendingUp,
    title: "Scalable Production",
    description: "Manufacturing infrastructure supporting different product types and production volumes as requirements evolve.",
  },
  {
    icon: DollarSign,
    title: "Manufacturing Efficiency",
    description: "Integrated processes designed to support efficient manufacturing and coordinated production.",
  },
  {
    icon: Users,
    title: "Single Manufacturing Partner",
    description: "Reduce coordination across multiple suppliers by bringing key manufacturing processes together under one roof.",
  },
];

export default function WhySheetal() {
  return (
    <section className="py-24 md:py-32 bg-mist/30" id="why-sheetal">
      <div className="container-wide">
        <div
          ref={ref}
          className="max-w-3xl mb-16 reveal-on-load"
        >
          <p className="font-mono text-accent text-sm uppercase tracking-widest mb-3">
            Why Sheetal
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-ink mb-6">
            Solving complex manufacturing challenges with ease.
          </h2>
          <p className="text-steel text-lg">
            Sheetal Electrotech offers a range of integrated manufacturing services designed around customer requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className="group p-8 border border-steel/15 bg-white hover:border-accent/30 transition-all duration-300 reveal-on-load"
              >
                <div className="w-12 h-12 bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-display font-bold text-ink mb-3">
                  {reason.title}
                </h3>
                <p className="text-steel text-sm leading-relaxed">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
