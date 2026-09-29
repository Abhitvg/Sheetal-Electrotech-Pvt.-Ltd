"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    quote: "Sheetal Electrotech has been our go-to manufacturing partner for over 8 years. Their vertical integration means we get consistent quality from mould to finished product, with lead times that beat the competition.",
    author: "Procurement Head",
    company: "National Lighting Manufacturer",
    rating: 5,
  },
  {
    quote: "The SMT line quality and output is exceptional. We shifted 100% of our LED driver assembly to Sheetal and haven't looked back. Their QC testing catches issues we never could with our previous supplier.",
    author: "VP Engineering",
    company: "Top-3 Indian Electrical Manufacturer",
    rating: 5,
  },
  {
    quote: "What sets them apart is the tool room — they can iterate on mould designs in days, not weeks. For our rigid packaging line, this speed of prototyping has been a game-changer for our time-to-market.",
    author: "Product Development Director",
    company: "Multinational FMCG Corporation",
    rating: 5,
  },
  {
    quote: "From a 5,000-unit pilot run to 200,000+ monthly — Sheetal scaled with us seamlessly. Their capacity planning and transparent communication make them feel like an extension of our own team.",
    author: "Supply Chain Manager",
    company: "International Lighting OEM",
    rating: 5,
  },
];

export default function Testimonials() {
  const t = useTranslations("Testimonials");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section ref={ref} className="py-24 md:py-32 bg-ink text-paper" id="testimonials">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <p className="font-mono text-accent text-sm uppercase tracking-widest mb-4">
            Client Testimonials
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-16">
            Trusted by Industry Leaders
          </h2>

          {/* Testimonial Card */}
          <div className="relative min-h-[300px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                {/* Quote Icon */}
                <Quote className="w-10 h-10 text-accent/40 mx-auto mb-8" />

                {/* Stars */}
                <div className="flex justify-center gap-1 mb-6">
                  {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                {/* Quote Text */}
                <blockquote className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8 font-body max-w-3xl mx-auto">
                  &ldquo;{testimonials[current].quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div>
                  <p className="font-display font-bold text-white text-lg">
                    {testimonials[current].author}
                  </p>
                  <p className="text-white/50 text-sm font-mono">
                    {testimonials[current].company}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-12">
            <button
              onClick={prev}
              className="w-12 h-12 border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors rounded-sm"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === current ? "bg-accent w-6" : "bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors rounded-sm"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
