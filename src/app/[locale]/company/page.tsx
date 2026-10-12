import Image from "next/image";
import { Link } from "@/i18n/routing";
import { HeroFadeUp, TimelineFadeIn, LeaderCardFadeUp } from "@/components/CompanyAnimations";
import { ArrowRight, MapPin, Award, CheckCircle2, Factory, ShieldCheck, Cpu, PackageCheck, Wrench, Quote } from "lucide-react";
import { companyFacts, companyTimeline, leadershipTeam, coreTeam } from "@/data/companyFacts";
import type { Metadata } from "next";
import { localizedMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return localizedMetadata(locale, "/company", {
    en: {
      title: "About Sheetal Electrotech | 25+ Years of Manufacturing Excellence",
      description: "Learn about Sheetal Electrotech's 25-year journey from precision packaging to full vertical integration across LED lighting, electronics, and moulding.",
    },
    hi: {
      title: "शीतल इलेक्ट्रो-टेक के बारे में | 25+ वर्षों की विनिर्माण उत्कृष्टता",
      description: "एलईडी लाइटिंग, इलेक्ट्रॉनिक्स और सटीक प्लास्टिक मोल्डिंग में शीतल इलेक्ट्रो-टेक की विनिर्माण विशेषज्ञता के बारे में जानें।",
    },
  });
}

export default function CompanyPage() {
  const campusDivisions = [
    {
      title: "Plastic Injection & Tooling Hub",
      division: "Division 01 · Tooling & Moulding",
      image: "/images/moulding_factory.jpg",
      description: "Multi-ton Milacron & Engel injection moulding lines coupled with our in-house CNC tool room for rapid die development.",
      icon: Factory,
    },
    {
      title: "High-Speed SMT & Cleanroom Assembly",
      division: "Division 02 · Electronics",
      image: "/images/smt_electronics.jpg",
      description: "Automated pick-and-place lines, wave soldering, Automated Optical Inspection (AOI), and continuous burn-in aging racks.",
      icon: Cpu,
    },
    {
      title: "Blow Moulding & Rigid Packaging",
      division: "Division 03 · Rigid Packaging",
      image: "/images/packaging_factory.jpg",
      description: "Continuous accumulator extrusion blow moulding lines manufacturing industrial containers, bottles, jars, and precision caps.",
      icon: PackageCheck,
    },
  ];

  return (
    <div className="bg-paper text-ink min-h-screen">

      {/* Hero Section with Authentic Industrial Photography */}
      <section className="relative min-h-[740px] flex items-center overflow-hidden pt-40 pb-20">
        <div className="absolute inset-0">
          <Image
            src="/images/hero_factory.jpg"
            alt="Sheetal Electrotech integrated manufacturing facility campus at Daman"
            fill
            sizes="100vw"
            priority
            className="object-cover object-center"
          />
          {/* Multi-stop architectural industrial overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-slate-900/65" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
        </div>

        <div className="relative z-10 container-wide text-paper w-full">
          <HeroFadeUp>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/20 border border-accent/40 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <p className="font-mono text-accent text-xs uppercase tracking-widest font-semibold">
                Est. 1999 · Daman & Mumbai, India · OEM / ODM Partner
              </p>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-medium text-white mb-6 leading-tight max-w-4xl">
              Built from the factory floor up.
            </h1>

            <p className="text-white/80 text-lg sm:text-xl max-w-3xl mb-10 leading-relaxed font-sans">
              25+ years of engineering rigor and vertical integration across LED lighting, electronics manufacturing, and high-precision rigid packaging.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-12">
              <Link
                href="/facilities"
                className="inline-flex items-center gap-2 bg-accent text-ink px-7 py-3.5 font-medium hover:bg-orange-600 transition-colors shadow-lg shadow-accent/20"
              >
                Explore Capabilities <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/rfq"
                className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/20 px-7 py-3.5 font-medium hover:bg-white hover:text-ink transition-colors backdrop-blur-sm"
              >
                Request a Quote
              </Link>
            </div>

            {/* Quick metrics chip row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/15 max-w-4xl">
              <div>
                <p className="text-2xl font-display font-bold text-white">25+ Years</p>
                <p className="text-xs font-mono uppercase tracking-wider text-white/60">Industrial Track Record</p>
              </div>
              <div>
                <p className="text-2xl font-display font-bold text-white">30,000+ Sq. Ft.</p>
                <p className="text-xs font-mono uppercase tracking-wider text-white/60">Integrated Facility</p>
              </div>
              <div>
                <p className="text-2xl font-display font-bold text-white">9 Divisions</p>
                <p className="text-xs font-mono uppercase tracking-wider text-white/60">In-House Manufacturing</p>
              </div>
              <div>
                <p className="text-2xl font-display font-bold text-white">BIS & ISO</p>
                <p className="text-xs font-mono uppercase tracking-wider text-white/60">Certified Quality</p>
              </div>
            </div>
          </HeroFadeUp>
        </div>
      </section>

      {/* Integrated Campus & Production Divisions Showcase */}
      <section className="bg-white py-16 md:py-20 border-b border-slate-200">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <p className="font-mono text-accent text-xs uppercase tracking-[.25em] mb-2 font-semibold">
                Daman Manufacturing Campus · Infrastructure Overview
              </p>
              <h2 className="text-3xl md:text-4xl font-display font-medium text-ink">
                Vertically Integrated Under One Roof
              </h2>
            </div>
            <p className="text-slate-600 text-sm md:text-base max-w-md">
              From raw engineering polymers and silicon dies to certified luminaires and tested packaging, our facilities eliminate third-party delays.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {campusDivisions.map((division) => {
              const Icon = division.icon;
              return (
                <div
                  key={division.title}
                  className="group bg-paper border border-slate-200 overflow-hidden hover:border-accent/40 hover:shadow-xl transition-all duration-500 flex flex-col"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                    <Image
                      src={division.image}
                      alt={division.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                      <span className="font-mono text-[11px] tracking-wider uppercase px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-sm border border-white/10">
                        {division.division}
                      </span>
                      <Icon className="w-4 h-4 text-accent" />
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display text-xl font-bold text-ink mb-2">
                        {division.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {division.description}
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-slate-500">
                      <span>Daman Unit I & II</span>
                      <Link href="/facilities" className="text-accent group-hover:translate-x-1 transition-transform">
                        Explore →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Production Performance Metrics */}
      <section className="bg-mist text-ink py-16 border-b border-steel/10">
        <div className="container-wide grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { value: companyFacts.experience, label: "Years of Experience", note: "Continuous operations since 1999" },
            { value: companyFacts.manufacturingArea, label: "Sq. Ft. Manufacturing Area", note: "Integrated multi-facility industrial campus" },
            { value: companyFacts.capabilities, label: "In-House Capabilities", note: "Tooling, moulding, SMT, lab & assembly" },
          ].map((stat) => (
            <div key={stat.label} className="border-l-2 border-accent pl-6">
              <p className="text-5xl md:text-6xl font-display font-medium text-ink mb-2">{stat.value}</p>
              <p className="font-mono text-xs uppercase tracking-widest text-ink/70 font-semibold mb-1">{stat.label}</p>
              <p className="text-xs text-steel">{stat.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Us Description & Founder's Statement */}
      <section className="section-padding border-b border-steel/10 bg-paper">
        <div className="container-wide">
          <div className="grid lg:grid-cols-[1.1fr_.9fr] gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Corporate Story & Core Pillars */}
            <div>
              <p className="font-mono text-accent text-xs uppercase tracking-[.25em] mb-3 font-semibold">
                Corporate Profile
              </p>
              <h2 className="text-3xl md:text-5xl font-display font-medium text-ink mb-8 leading-tight">
                Welcome to Sheetal Group
              </h2>
              <div className="text-steel text-lg leading-relaxed space-y-6">
                <p>
                  Sheetal Group is an established manufacturer of precision plastic components, LED luminaires, and electronic assemblies with 25+ years of operational experience. Founded by Surendra Singh in 1999, the enterprise operates an integrated manufacturing hub in Daman combining injection moulding, blow moulding, extrusion, surface mount technology, and tool engineering.
                </p>
                <p>
                  We supply custom and standard components to leading Indian and multinational brands. By keeping mould making, circuit assembly, photometric validation, and packaging under one corporate umbrella, we safeguard quality and guarantee rapid turnaround from CAD drawings to container shipments.
                </p>
              </div>

              {/* Three Value Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
                <div className="p-4 bg-mist border border-steel/15 rounded-sm">
                  <ShieldCheck className="w-6 h-6 text-accent mb-2" />
                  <h4 className="font-display font-bold text-sm text-ink mb-1">Zero Job-Work Dependency</h4>
                  <p className="text-xs text-steel">Full vertical custody of each manufacturing process.</p>
                </div>
                <div className="p-4 bg-mist border border-steel/15 rounded-sm">
                  <Award className="w-6 h-6 text-accent mb-2" />
                  <h4 className="font-display font-bold text-sm text-ink mb-1">Rigorous Standards</h4>
                  <p className="text-xs text-steel">BIS compliance and ISO 9001 certified quality control.</p>
                </div>
                <div className="p-4 bg-mist border border-steel/15 rounded-sm">
                  <Wrench className="w-6 h-6 text-accent mb-2" />
                  <h4 className="font-display font-bold text-sm text-ink mb-1">In-House Tooling</h4>
                  <p className="text-xs text-steel">High-speed CNC & EDM mould making and die repair.</p>
                </div>
              </div>
            </div>
            
            {/* Right Column: Founder's Statement with Authentic Studio Portrait */}
            <div className="bg-white p-8 md:p-10 border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-accent/5 rounded-bl-full pointer-events-none" />
              
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-200">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-accent shrink-0 bg-slate-100 shadow-md">
                  <Image
                    src="/images/team/surendra-singh.png"
                    alt="Surendra Singh, Founder & Chairman of Sheetal Group"
                    fill
                    sizes="80px"
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold text-ink">Director&apos;s Statement</h3>
                  <p className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
                    Message from Founder & Chairman
                  </p>
                </div>
              </div>

              <div className="text-steel leading-relaxed space-y-4">
                <div className="relative bg-mist/60 border-l-4 border-accent p-5 mb-6">
                  <Quote className="w-8 h-8 text-accent/20 absolute top-2 right-2" />
                  <blockquote className="text-lg font-display italic text-ink/90 leading-snug">
                    &ldquo;Our mission is to solve complex manufacturing challenges with ease and offer cost-effective solutions that enable our customers to achieve their goals.&rdquo;
                  </blockquote>
                </div>

                <p className="font-medium text-ink">Dear Valued Partners & Clients,</p>
                <p className="text-sm">
                  At Sheetal Group, we are committed to providing our customers with high-quality products and services that exceed their expectations. Our success is directly linked to the satisfaction of our customers, and we are committed to providing them with outstanding technical support, reliable deliveries, and long-term partnership.
                </p>

                <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
                  <div>
                    <p className="font-display font-bold text-lg text-ink">Surendra Singh</p>
                    <p className="font-mono text-xs uppercase tracking-widest text-accent">Founder & Chairman</p>
                  </div>
                  <span className="font-mono text-xs text-slate-400">Sheetal Group</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Historical Milestones Timeline */}
      <section className="section-padding bg-mist/40 border-b border-steel/10">
        <div className="container-wide">
          <div className="max-w-2xl mb-16">
            <p className="font-mono text-accent text-xs uppercase tracking-[.25em] mb-2 font-semibold">
              Evolution & Heritage
            </p>
            <h2 className="text-3xl md:text-5xl font-display font-medium text-ink mb-4">
              25 Years in the Making
            </h2>
            <p className="text-steel text-lg">
              Each step was a deliberate vertical integration, not an accident of growth.
            </p>
          </div>

          <div className="relative">
            {/* Vertical timeline guide line */}
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

                  {/* Node Dot */}
                  <div className="hidden md:flex items-start pt-[7px]">
                    <div className={`w-3 h-3 rounded-full border-2 flex-shrink-0 ${
                      m.year === "Today" ? "bg-accent border-accent" : "bg-paper border-steel/40"
                    }`} />
                  </div>

                  {/* Milestone Content Card */}
                  <div className="flex-1 bg-white p-6 border border-slate-200/80 shadow-sm rounded-sm">
                    <h4 className="font-display text-xl font-bold text-ink mb-2">{m.title}</h4>
                    <p className="text-steel text-sm leading-relaxed max-w-xl">{m.body}</p>
                  </div>
                </TimelineFadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Executive Leadership Team — Formatted as Elegant Leadership Profiles */}
      <section className="section-padding border-b border-steel/10 bg-white">
        <div className="container-wide">
          <div className="max-w-2xl mb-16">
            <p className="font-mono text-accent text-xs uppercase tracking-[.25em] mb-2 font-semibold">
              Leadership & Governance
            </p>
            <h2 className="text-3xl md:text-5xl font-display font-medium text-ink mb-4">
              Executive Leadership
            </h2>
            <p className="text-steel text-lg">
              Meet the executive leadership driving Sheetal Group&apos;s growth and operational excellence.
            </p>
          </div>

          {/* Directors — Formatted as Horizontal Executive Profiles */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {leadershipTeam.map((leader) => (
              <LeaderCardFadeUp key={leader.name}>
                <div className="flex flex-col sm:flex-row items-center sm:items-stretch bg-white border border-slate-200/90 shadow-sm hover:border-accent/40 hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="relative w-full sm:w-52 md:w-60 h-72 sm:h-auto shrink-0 bg-slate-50 border-b sm:border-b-0 sm:border-r border-slate-200/70">
                    <Image
                      src={leader.photo!}
                      alt={`${leader.name} - ${leader.role}`}
                      fill
                      sizes="(max-width: 640px) 100vw, 240px"
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="p-7 sm:p-8 flex flex-col justify-between flex-1">
                    <div>
                      <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold block mb-2">
                        {leader.role}
                      </span>
                      <h3 className="text-2xl font-display font-bold text-ink mb-3">{leader.name}</h3>
                      <div className="w-10 h-[2px] bg-accent/40 mb-4" />
                      <p className="text-slate-600 text-sm leading-relaxed">{leader.note}</p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-400">
                      <span>Executive Board</span>
                      <span>Sheetal Group</span>
                    </div>
                  </div>
                </div>
              </LeaderCardFadeUp>
            ))}
          </div>
          
          {/* Functional Operations Management Grid */}
          <div className="mt-16">
            <h3 className="text-2xl font-display font-bold text-ink mb-2">Operational Department Heads</h3>
            <p className="text-steel text-sm mb-8">Specialized leaders overseeing plant reliability, finance, R&D, and quality assurance.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {coreTeam.map((leader) => (
                <div key={leader.name} className="border border-steel/15 p-6 bg-paper hover:border-accent/40 transition-colors flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-accent font-semibold block mb-2">
                      {leader.role}
                    </span>
                    <h4 className="text-lg font-display font-bold text-ink mb-2">{leader.name}</h4>
                    <div className="w-6 h-[1px] bg-accent/40 mb-3" />
                    <p className="text-steel text-xs leading-relaxed">{leader.note}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-steel/10 flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                    <span>Daman Operations</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications & Quality Mandates */}
      <section className="section-padding bg-mist/30 border-b border-steel/10">
        <div className="container-wide text-center">
          <p className="font-mono text-accent text-xs uppercase tracking-[.25em] mb-2 font-semibold">
            Quality Verification
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-medium text-ink mb-4">
            Certified Manufacturing Standards
          </h2>
          <p className="text-steel text-lg mb-12 max-w-2xl mx-auto">
            Committed to rigorous engineering standards, zero-defect quality assurance, and domestic and global regulatory compliance.
          </p>
          <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
            {[
              "ISO 9001:2015 Certified QMS",
              "BIS (Bureau of Indian Standards) Registered",
              "RoHS & CE Directive Compliance",
              "Internal Photometric & Goniophotometer Lab",
              "5S Lean Floor Governance",
            ].map((cert) => (
              <div key={cert} className="bg-white border border-steel/15 px-8 py-5 font-mono text-xs uppercase tracking-widest text-ink flex items-center gap-3 shadow-sm hover:border-accent transition-colors">
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                <span>{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing & Corporate Locations */}
      <section className="section-padding border-b border-steel/10 bg-white">
        <div className="container-wide">
          <div className="max-w-2xl mb-16">
            <p className="font-mono text-accent text-xs uppercase tracking-[.25em] mb-2 font-semibold">
              Presence & Footprint
            </p>
            <h2 className="text-3xl md:text-5xl font-display font-medium text-ink mb-4">
              Where We Operate
            </h2>
            <p className="text-steel text-lg">
              Strategically located in India&apos;s leading Western industrial corridor for seamless logistics and export access.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                city: "Daman",
                type: "Primary Manufacturing Campus (Unit I & II)",
                address: "Survey No. 168/28 and 168/29, Opp. Givaudan India Pvt. Ltd, Dhabel, Daman and Diu - 396210",
                note: "All 9 production divisions. Injection moulding, SMT electronics cleanroom, blow moulding, extrusion, R&D testing lab, and in-house tool room.",
              },
              {
                city: "Mumbai",
                type: "Corporate & Commercial Office",
                address: "Goregaon East, Mumbai 400063, Maharashtra, India",
                note: "Key account management, OEM client consulting, global export logistics, finance, and enterprise supply chain coordination.",
              },
            ].map((loc) => (
              <div key={loc.city} className="border border-steel/15 p-10 bg-paper hover:border-accent/40 hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="w-5 h-5 text-accent" />
                  <span className="font-mono text-xs uppercase tracking-widest text-steel font-semibold">{loc.type}</span>
                </div>
                <h3 className="text-3xl font-display font-bold text-ink mb-3">{loc.city}</h3>
                <p className="text-steel text-sm mb-6 leading-relaxed">{loc.address}</p>
                <p className="text-sm text-ink border-l-2 border-accent pl-4 bg-white/70 py-2">{loc.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-20 bg-accent text-ink">
        <div className="container-wide flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-ink/70 font-semibold block mb-2">
              Ready to Partner With Sheetal Group?
            </span>
            <h3 className="text-3xl md:text-5xl font-display font-medium mb-3">
              Solve complex manufacturing challenges with ease.
            </h3>
            <p className="text-ink/80 text-lg max-w-xl">
              Submit your engineering specifications, tooling requirements, or target production volumes to our team.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/rfq"
              className="bg-white text-ink px-9 py-4 font-bold text-base hover:bg-slate-900 hover:text-white transition-colors flex items-center gap-3 whitespace-nowrap shadow-xl"
            >
              Start an RFQ <ArrowRight className="w-5 h-5 text-accent" />
            </Link>
            <Link
              href="/facilities"
              className="border-2 border-ink text-ink px-8 py-4 font-bold text-base hover:bg-ink hover:text-white transition-colors whitespace-nowrap"
            >
              View All Facilities
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
