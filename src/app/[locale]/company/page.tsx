"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
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
  { name: "Surendra Singh", role: "Chairman of Sheetal Group", note: "Founder & visionary driving Sheetal Group's expansion and strategic direction." },
  { name: "Ajay Singh", role: "CEO of Sheetal Group", note: "Leading overall corporate operations and strategic business growth." },
  { name: "Ishvernath Thakur", role: "CFO", note: "Overseeing financial planning, risk management, and record-keeping." },
  { name: "Prem Singh", role: "Head of Operations", note: "Managing day-to-day manufacturing operations and production efficiency." },
  { name: "Rajesh Nandola", role: "Head of Accountacy", note: "Responsible for accounting, audits, and financial reporting." },
  { name: "Pankaj S Dudhekar", role: "Head of Purchase", partner: true, note: "Managing supply chain, procurement, and vendor relationships." },
  { name: "Raju Sharma", role: "Human Resource Management", note: "Fostering company culture, recruitment, and employee relations." },
  { name: "Suresh Prasad Arya", role: "Head of Research and Development", note: "Leading product innovation and engineering development." },
  { name: "Manjit Yadav", role: "Head of Quality Department", note: "Ensuring strict quality control and compliance with BIS/CE standards." },
];

export default function CompanyPage() {
  return (
    <div className="bg-paper text-ink min-h-screen">

      {/* Hero */}
      <div className="relative h-[75vh] min-h-[550px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/legacy/IMG_8752-removebg-preview.png" alt="Sheetal Electrotech Team" fill sizes="100vw" className="object-cover object-top" priority />
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
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-medium text-ink mb-6 leading-tight">
              Built from the factory floor up.
            </h1>
            <p className="text-ink/70 text-xl max-w-2xl">
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
      <section className="bg-mist text-ink py-20">
        <div className="container-wide grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { value: "25+", label: "Years operating" },
            { value: "9", label: "In-house facilities" },
            { value: "300+", label: "Team members" },
            { value: "50+", label: "Active OEM clients" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-5xl md:text-6xl font-display font-medium text-ink mb-3">{stat.value}</p>
              <p className="font-mono text-xs uppercase tracking-widest text-ink/40">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

    {/* About Us Description */}
      <section className="section-padding border-b border-steel/10 bg-mist/20">
        <div className="container-wide max-w-5xl">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="mb-8">Welcome to Sheetal Group</h2>
              <div className="text-steel text-lg leading-relaxed space-y-6">
                <p>
                  Sheetal Group is a leading manufacturer and supplier of plastic products, LED lighting, and electronics with over 25 years of experience in the industry. Founded by Surendra Singh, the company has established itself as a trusted name in the market, thanks to its commitment to quality, innovation, and customer satisfaction. With expertise in injection molding, blow molding, extrusion, and other plastic manufacturing processes, Sheetal Group offers a wide range of high-quality plastic products that cater to various industries and applications. From automotive components to consumer goods, their products are known for their durability, functionality, and cost-effectiveness. In addition to plastic products, Sheetal Group also specializes in LED lighting and electronics. Their cutting-edge LED lighting solutions are designed to be energy-efficient, long-lasting, and environmentally friendly, making them an ideal choice for commercial and residential applications. What sets Sheetal Group apart from its competitors is its ability to develop new and innovative products with the lowest possible cost, thanks to the expertise of its founder and skilled team. Whether you need custom plastic products, LED lighting solutions, or electronics, Sheetal Group has the expertise and experience to deliver quality products that meet your needs. At Sheetal Group, our mission is to provide our customers with the best possible products and services, while maintaining the highest standards of quality, safety, and sustainability.
</p>
                
                
                
              </div>
            </div>
            
            {/* Director's Statement */}
            <div className="bg-white p-10 border border-steel/15 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-mist rounded-bl-full -z-10 opacity-50" />
              <h2 className="mb-8 text-3xl font-display text-ink">Director&apos;s Statement</h2>
              <div className="text-steel leading-relaxed space-y-4">
                <blockquote className="text-xl font-display italic text-ink/80 border-l-4 border-accent pl-6 mb-8">
                  &ldquo;Effortlessly Tackling Complex Manufacturing Challenges with Cost-Effective Solutions. Committed to Innovation, Sustainability, and Customer Satisfaction.&rdquo;
                </blockquote>
                <p><strong>Dear valued customers,</strong></p>
                <p>
                  At Sheetal Group, we are committed to providing our customers with high-quality products and services that exceed their expectations. Our mission is to solve complex manufacturing challenges with ease and offer cost-effective solutions that enable our customers to achieve their goals.
                </p>
                <p>
                  We are constantly innovating and improving our manufacturing processes to ensure that we remain at the forefront of the industry. Sustainability is a top priority for us, and we are always exploring new ways to reduce our environmental impact while delivering exceptional products and services.
                </p>
                <p>
                  Our success is directly linked to the satisfaction of our customers, and we are committed to providing them with outstanding support and service. We understand the importance of building strong and lasting relationships with our customers and stakeholders, and we are dedicated to earning and maintaining their trust.
                </p>
                <div className="mt-8 pt-6 border-t border-steel/10">
                  <p className="font-display font-medium text-lg text-ink">Surendra Singh</p>
                  <p className="font-mono text-xs uppercase tracking-widest text-accent mt-1">Director</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="section-padding border-b border-steel/10">
        <div className="container-wide">
          <div className="mb-16">
            <h2 className="mb-4">Our Team</h2>
            <p className="text-steel text-lg">Meet the core team members driving Sheetal Group.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadership.map((leader) => (
              <div key={leader.name} className="border border-steel/15 p-8 bg-paper">
                <h3 className="text-2xl font-display font-medium text-ink mb-2">{leader.name}</h3>
                <p className="font-mono text-xs uppercase tracking-widest text-accent mb-4">{leader.role}</p>
                <div className="w-8 h-[1px] bg-steel/30 mb-4" />
                <p className="text-steel text-sm leading-relaxed">{leader.note}</p>
              </div>
            ))}
          </div>
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
                address: "Survey No. 168/28 and 168/29, Opp. Givaudan India Pvt. Ltd, Dhabel, Daman and Diu - 396210",
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
      <section className="py-24 bg-accent text-ink">
        <div className="container-wide flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-3xl md:text-4xl font-display font-medium mb-2">Ready to build together?</h3>
            <p className="text-ink/80">Share your spec and get a proposal in 48 hours.</p>
          </div>
          <Link
            href="/rfq"
            className="bg-white text-accent px-10 py-5 font-bold text-lg hover:bg-paper hover:text-ink transition-colors flex items-center gap-3 whitespace-nowrap"
          >
            Start an RFQ <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

    </div>
  );
}
