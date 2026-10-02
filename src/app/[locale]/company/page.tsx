import Image from "next/image";
import { Link } from "@/i18n/routing";
import { HeroFadeUp, TimelineFadeIn, LeaderCardFadeUp } from "@/components/CompanyAnimations";
import { ArrowRight, MapPin } from "lucide-react";
import { companyFacts, companyTimeline, leadershipTeam, coreTeam } from "@/data/companyFacts";
import { legacyCompanyImages } from "@/data/legacyMedia";

export default function CompanyPage() {
  return (
    <div className="bg-paper text-ink min-h-screen">

      {/* Hero */}
      <div className="relative h-[75vh] min-h-[550px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={legacyCompanyImages[0]}
            alt="Sheetal Electrotech official company photography"
            fill
            sizes="100vw"
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/75 to-ink/30" />
        </div>
        <div className="relative z-10 container-wide text-paper pb-20 pt-36">
          <HeroFadeUp>
            <p className="font-mono text-accent text-sm uppercase tracking-widest mb-4">
              Est. 1999 · Daman, India
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-medium text-white mb-6 leading-tight">
              Built from the factory floor up.
            </h1>
            <p className="text-white/80 text-xl max-w-2xl mb-8 leading-relaxed">
              25+ years of manufacturing expertise across LED lighting, electronics and rigid plastic packaging.
            </p>
            <Link
              href="/facilities"
              className="inline-flex items-center gap-2 bg-white text-ink px-6 py-3 font-medium hover:bg-accent hover:text-white transition-colors"
            >
              Explore Capabilities <ArrowRight className="w-4 h-4" />
            </Link>
          </HeroFadeUp>
        </div>
      </div>

      <section className="bg-paper py-10 border-b border-steel/10">
        <div className="container-wide grid grid-cols-2 md:grid-cols-3 gap-3">
          {legacyCompanyImages.map((src, i) => (
            <div key={src} className="relative aspect-[16/9] overflow-hidden bg-mist border border-steel/10">
              <img
                src={src}
                alt={`Sheetal Electrotech official company image ${i + 1}`}
                loading="lazy"
                className="h-full w-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Stats Banner directly below */}
      <section className="bg-mist text-ink py-16 border-b border-steel/10">
        <div className="container-wide grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { value: companyFacts.experience, label: "Years of Experience" },
            { value: companyFacts.manufacturingArea, label: "Sq. Ft. Manufacturing Area" },
            { value: companyFacts.capabilities, label: "In-House Capabilities" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-5xl md:text-6xl font-display font-medium text-ink mb-3">{stat.value}</p>
              <p className="font-mono text-xs uppercase tracking-widest text-ink/60">{stat.label}</p>
            </div>
          ))}
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
              {companyTimeline.map((m, i) => (
                <TimelineFadeIn key={m.year} delay={i * 0.07}>
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
                </TimelineFadeIn>
              ))}
            </div>
          </div>
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
                  Sheetal Group is an established manufacturer of plastic products, LED lighting, and electronics with 25+ years of operational experience. Founded by Surendra Singh in 1999, the company operates a vertically integrated facility combining injection molding, blow molding, extrusion, and related manufacturing processes.
                </p>
                <p>
                  We provide a broad range of custom and standardized plastic components, alongside technical manufacturing of energy-efficient LED lighting and electronic assemblies. Our dedicated tool room and strict quality management systems allow us to maintain precision and consistency across all our core capabilities.
                </p>
              </div>
            </div>
            
            {/* Director's Statement */}
            <div className="bg-white p-10 border border-steel/15 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-mist rounded-bl-full -z-10 opacity-50" />
              <h2 className="mb-8 text-3xl font-display text-ink">Director&apos;s Statement</h2>
              <div className="text-steel leading-relaxed space-y-4">
                <blockquote className="text-xl font-display italic text-ink/80 border-l-4 border-accent pl-6 mb-8">
                  &ldquo;Our mission is to solve complex manufacturing challenges with ease and offer cost-effective solutions that enable our customers to achieve their goals.&rdquo;
                </blockquote>
                <p><strong>Dear valued customers,</strong></p>
                <p>
                  At Sheetal Group, we are committed to providing our customers with high-quality products and services that exceed their expectations. Our success is directly linked to the satisfaction of our customers, and we are committed to providing them with outstanding support and service.
                </p>
                <div className="mt-8 pt-6 border-t border-steel/10">
                  <p className="font-display font-medium text-lg text-ink">Surendra Singh</p>
                  <p className="font-mono text-xs uppercase tracking-widest text-accent mt-1">Founder</p>
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

          {/* Directors — with photos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
            {leadershipTeam.map((leader) => (
              <LeaderCardFadeUp key={leader.name}>
                <div className="relative w-full aspect-[4/5] overflow-hidden">
                  <Image
                    src={leader.photo!}
                    alt={leader.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-700"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-display font-medium text-ink mb-1">{leader.name}</h3>
                  <p className="font-mono text-xs uppercase tracking-widest text-accent mb-4">{leader.role}</p>
                  <div className="w-8 h-[1px] bg-steel/30 mb-4" />
                  <p className="text-steel text-sm leading-relaxed">{leader.note}</p>
                </div>
              </LeaderCardFadeUp>
            ))}
          </div>
          
          {/* Rest of Team — text cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreTeam.map((leader) => (
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

      {/* Certifications */}
      <section className="section-padding bg-mist/30">
        <div className="container-wide text-center">
          <h2 className="mb-4">Our Certifications</h2>
          <p className="text-steel text-lg mb-12">Committed to the highest standards of manufacturing quality.</p>
          <div className="flex flex-wrap justify-center gap-6">
            {companyFacts.certifications.map((cert) => (
              <div key={cert} className="bg-white border border-steel/15 px-8 py-4 font-mono text-sm uppercase tracking-widest text-ink flex items-center gap-3 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-accent" />
                {cert}
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
            <p className="text-ink/80">Submit your requirements and our team will get back to you with the next steps.</p>
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
