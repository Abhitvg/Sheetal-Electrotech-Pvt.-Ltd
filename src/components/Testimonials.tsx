import { Settings2 } from "lucide-react";

export default function Testimonials() {
  return (
    <section className="py-24 md:py-32 bg-ink text-paper" id="approach">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="relative min-h-[300px] flex items-center justify-center">
            <div className="text-center">
              <Settings2 className="w-10 h-10 text-accent/40 mx-auto mb-8" />

              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-8 max-w-3xl mx-auto leading-tight">
                Built for Long-Term Manufacturing Partnerships
              </h2>

              <p className="text-xl md:text-2xl text-white/70 leading-relaxed font-body max-w-2xl mx-auto">
                Our integrated manufacturing capabilities are designed to support OEM requirements from product development through production and assembly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
