"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";

const milestones = [
  { year: "1999", title: "Founded", body: "Sheetal Electrotech established in Daman with a single injection moulding machine and a focus on rigid plastic packaging." },
  { year: "2004", title: "LED Transition Begins", body: "Early adoption of LED technology as a manufacturing focus, well ahead of market inflection. First OEM contracts signed." },
  { year: "2010", title: "SMT Line Commissioned", body: "First in-house Surface Mount Technology line operational. This vertical integration eliminates PCB vendor dependency." },
  { year: "2014", title: "ISO 9001 Certified", body: "Quality Management System formally certified. Unlocks tier-1 OEM contracts with major Indian brands." },
  { year: "2018", title: "9-Facility Campus", body: "Completion of our integrated Daman campus spanning all 9 in-house operations on a single footprint." },
  { year: "2022", title: "Export Scale-Up", body: "International OEM supply agreements signed. CE marking obtained. Export capacity exceeds 30% of total output." },
  { year: "Today", title: "100K Units/Day", body: "Operating at full campus capacity. Actively onboarding new OEM partners for the next growth phase." },
];

const leadership = [
  { name: "Sheetal Patel", role: "Founder & Managing Director", note: "25+ years in plastics and electronics manufacturing." },
  { name: "Operations Director", role: "Plant Operations", note: "Oversees all 9 in-house facilities and 300+ person workforce." },
  { name: "Technical Head", role: "Product Engineering", note: "Leads new product development and tooling design." },
];

export default function CompanyPage() {
  return (
    <div className="bg-paper text-ink min-h-screen">

      {/* Hero */}
      <div className="relative h-[75vh] min-h-[550px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/img2/8.jpg" alt="Sheetal Electrotech Team" fill sizes="100vw" className="object-cover object-top" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
        </div>
        <div className="relative z-10 container-wide text-paper pb-20 pt-36">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-mono text-accent text-sm uppercase tracking-widest mb-4">
              Est. 1999 · Daman, India
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-medium text-white mb-6 leading-tight">
              Built from the factory floor up.
            </h1>
            <p className="text-white/70 text-xl max-w-2xl">
              25 years of vertical integration. One campus. The manufacturing partner that removes risk from your supply chain.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Positioning Statement */}
      <section className="section-padding border-b border-steel/10">
        <div className="container-wide max-w-4xl">
          <p className="text-3xl md:text-5xl font-display font-medium leading-[1.3] text-ink">
            We don't sell products. We <em className="not-italic text-accent">own production</em> — from mould design through final packing — so your brand never has to juggle five vendors again.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-mist/40">
        <div className="container-wide">
          <div className="max-w-2xl mb-16">
            <h2 className="mb-4">25 Years in the Making</h2>
            <p className="text-steel text-lg">Each step was a deliberate vertical integration, not an accident of growth.</p>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="hidden md:block absolute left-[120px] top-0 bottom-0 w-[1px] bg-steel/20" />

            <div className="space-y-0 divide-y divide-steel/10 md:divide-none">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="flex flex-col md:flex-row gap-4 md:gap-12 py-8 md:py-10"
                >
                  {/* Year */}
                  <div className="md:w-[120px] flex-shrink-0 flex md:justify-end items-start pt-1">
                    <span className={`font-mono text-sm font-bold ${m.year === "Today" ? "text-accent" : "text-steel"}`}>
                      {m.year}
                    </span>
                  </div>

                  {/* Dot */}
                  <div className="hidden md:flex items-start pt-[7px]">
                    <div className={`w-3 h-3 rounded-full border-2 flex-shrink-0 ${
                      m.year === "Today" ? "bg-accent border-accent" : "bg-paper border-steel/40"
                    }`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h4 className="font-display text-xl font-medium text-ink mb-2">{m.title}</h4>
                    <p className="text-steel leading-relaxed max-w-lg">{m.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-ink text-paper py-20">
        <div className="container-wide grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { value: "25+", label: "Years operating" },
            { value: "9", label: "In-house facilities" },
            { value: "300+", label: "Team members" },
            { value: "50+", label: "Active OEM clients" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-5xl md:text-6xl font-display font-medium text-white mb-3">{stat.value}</p>
              <p className="font-mono text-xs uppercase tracking-widest text-white/40">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Locations */}
      <section className="section-padding border-b border-steel/10">
        <div className="container-wide">
          <h2 className="mb-16">Where We Operate</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                city: "Daman",
                type: "Manufacturing Hub",
                address: "Survey No. 364/1-11, Shree Ganesh Industrial Estate, Kachigam, Daman 396210",
                note: "All 9 production facilities. Primary R&D. Tool room. Quality lab.",
              },
              {
                city: "Mumbai",
                type: "Corporate Office",
                address: "Goregaon East, Mumbai 400063, Maharashtra",
                note: "Sales, business development, and key account management.",
              },
            ].map((loc) => (
              <div key={loc.city} className="border border-steel/15 p-10 hover:border-accent/30 transition-colors">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="w-5 h-5 text-accent" />
                  <span className="font-mono text-xs uppercase tracking-widest text-steel">{loc.type}</span>
                </div>
                <h3 className="text-3xl font-display mb-3">{loc.city}</h3>
                <p className="text-steel text-sm mb-6 leading-relaxed">{loc.address}</p>
                <p className="text-sm text-ink border-l-2 border-accent pl-4">{loc.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-24 bg-accent text-white">
        <div className="container-wide flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-3xl md:text-4xl font-display font-medium mb-2">Ready to build together?</h3>
            <p className="text-white/80">Share your spec and get a proposal in 48 hours.</p>
          </div>
          <Link
            href="/rfq"
            className="bg-white text-accent px-10 py-5 font-bold text-lg hover:bg-ink hover:text-white transition-colors flex items-center gap-3 whitespace-nowrap"
          >
            Start an RFQ <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

    </div>
  );
}
