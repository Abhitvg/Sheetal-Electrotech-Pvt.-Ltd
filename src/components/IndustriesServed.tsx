import { industriesServed } from "@/data/companyFacts";
import { Lightbulb, Cpu, Pill, Package, ShoppingBag, Car } from "lucide-react";

const icons = [Lightbulb, Cpu, Pill, Package, ShoppingBag, Car];

export default function IndustriesServed() {
  return (
    <section className="py-24 md:py-32 bg-paper border-t border-steel/10" id="industries">
      <div className="container-wide">
        <div
          ref={ref}
          className="max-w-3xl mb-16 reveal-on-load"
        >
          <p className="font-mono text-accent text-sm uppercase tracking-widest mb-3">
            Industries
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-ink mb-6">
            Industries & Applications
          </h2>
          <p className="text-steel text-lg">
            Manufacturing solutions across multiple industry verticals.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {industriesServed.map((industry, i) => {
            const Icon = icons[i] || Package;
            return (
              <div
                key={industry.name}
                className="group border border-steel/15 p-6 bg-white text-center hover:border-accent/30 transition-all reveal-on-load"
              >
                <div className="w-12 h-12 bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display font-bold text-ink text-sm mb-2">{industry.name}</h3>
                <p className="text-steel text-xs leading-relaxed">{industry.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
