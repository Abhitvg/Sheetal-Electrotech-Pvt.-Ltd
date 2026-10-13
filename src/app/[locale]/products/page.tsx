import Image from "next/image";
import { Link } from "@/i18n/routing";
import {
  ArrowRight, ArrowUpRight, Boxes, Cpu, Lightbulb, PackageCheck,
  Factory, Wrench, CircuitBoard, Layers, Cog, FlaskConical, Package, Zap, Drill
} from "lucide-react";
import { HeroTextFadeUp, HeroImageScaleIn, FamilyCardFadeUp, ProductCardFadeUp } from "@/components/ProductAnimations";
import ProductRoomWrapper from "@/components/ProductRoomWrapper";

const copy = {
  en: {
    eyebrow: "Product portfolio · OEM manufacturing",
    title: "Products built around your requirements.",
    heroTitle: ["Products,", "built around", "your requirements."],
    intro: "Explore Sheetal Electrotech's product portfolio across LED lighting, electronics and rigid plastic packaging — backed by integrated manufacturing capabilities in Daman.",
    viewLed: "Explore LED Lighting",
    viewPackaging: "Explore Rigid Packaging",
    rfq: "Discuss an OEM requirement",
    portfolio: "Portfolio architecture",
    portfolioTitle: "Core product families. One manufacturing partner.",
    portfolioText: "Move from a standard product catalogue to a specification-led OEM conversation. Share your target product, application and requirements with our team.",
    led: "LED Lighting",
    ledDesc: "Bulbs, battens, downlights, street lights, flood lights, spot lights, decorative lighting, smart LED and strip lights.",
    packaging: "Rigid Plastic Packaging",
    packagingDesc: "Bottles, jars, containers, custom packaging and injection-moulded components.",
    electronics: "Electronics",
    electronicsDesc: "Electronic products and accessories supported by in-house SMT and assembly capabilities.",
    oem: "Custom OEM",
    oemDesc: "A manufacturing pathway connecting product requirements with moulding, electronics, assembly and packing capabilities.",
    ledEyebrow: "01 / LED lighting",
    ledTitle: "Lighting for everyday, commercial and outdoor applications.",
    exploreAll: "View LED portfolio",
    packagingEyebrow: "02 / Rigid plastic packaging",
    packagingTitle: "Packaging and components shaped around the application.",
    packagingAll: "View packaging portfolio",
    capabilities: "Manufacturing backbone",
    capabilitiesTitle: "The product catalogue is only the front end.",
    capabilitiesText: "Behind every product family is an integrated manufacturing setup spanning moulding, electronics, R&D, assembly and tooling.",
    viewFacilities: "Explore manufacturing facilities",
    productsInHouse: "In-house capabilities",
    productCategories: "Core product categories",
    ctaEyebrow: "Ready to build?",
    ctaTitle: "Bring us your specification.",
    ctaText: "Share a drawing, product reference or requirement. We'll route it to the relevant manufacturing capability for discussion.",
    requestQuote: "Request a Quote",
    showroomEyebrow: "Virtual Inspection · 3D Product Engineering Suite",
    showroomTitle: "Interactive 3D Showroom",
    showroomDesc: "Inspect Sheetal's lighting luminaires in three dimensions. Orbit 360°, trigger exploded sub-assemblies, toggle CAD wireframe blueprints, and inspect real in-house manufacturing specifications.",
    showroomTags: ["360° Drag Orbit", "Exploded View", "CAD Wireframe", "3D Sub-Assembly Pins"] as const,
  },
  hi: {
    eyebrow: "उत्पाद पोर्टफोलियो · OEM विनिर्माण",
    title: "आपकी आवश्यकताओं के अनुसार तैयार उत्पाद।",
    heroTitle: ["उत्पाद,", "आपकी आवश्यकताओं", "के अनुसार तैयार।"],
    intro: "दमन में एकीकृत विनिर्माण क्षमताओं के साथ LED लाइटिंग, इलेक्ट्रॉनिक्स और कठोर प्लास्टिक पैकेजिंग में शीतल इलेक्ट्रो-टेक का उत्पाद पोर्टफोलियो देखें।",
    viewLed: "LED लाइटिंग देखें",
    viewPackaging: "कठोर पैकेजिंग देखें",
    rfq: "OEM आवश्यकता पर चर्चा करें",
    portfolio: "उत्पाद संरचना",
    portfolioTitle: "तीन उत्पाद परिवार। एक विनिर्माण भागीदार।",
    portfolioText: "मानक कैटलॉग से आगे बढ़कर स्पेसिफिकेशन-आधारित OEM चर्चा करें। अपने उत्पाद, उपयोग और आवश्यकताएं हमारी टीम के साथ साझा करें।",
    led: "LED लाइटिंग",
    ledDesc: "बल्ब, बैटन, डाउनलाइट, स्ट्रीट लाइट, फ्लड लाइट, स्पॉट लाइट, डेकोरेटिव, स्मार्ट LED और स्ट्रिप लाइट।",
    packaging: "कठोर प्लास्टिक पैकेजिंग",
    packagingDesc: "बोतलें, जार, कंटेनर, कस्टम पैकेजिंग और इंजेक्शन-मोल्डेड घटक।",
    electronics: "इलेक्ट्रॉनिक्स",
    electronicsDesc: "इन-हाउस SMT और असेंबली क्षमताओं द्वारा समर्थित इलेक्ट्रॉनिक उत्पाद और एक्सेसरीज़।",
    oem: "कस्टम OEM",
    oemDesc: "उत्पाद आवश्यकताओं को मोल्डिंग, इलेक्ट्रॉनिक्स, असेंबली और पैकिंग क्षमताओं से जोड़ने वाला विनिर्माण मार्ग।",
    ledEyebrow: "01 / LED लाइटिंग",
    ledTitle: "दैनिक, वाणिज्यिक और आउटडोर अनुप्रयोगों के लिए लाइटिंग।",
    exploreAll: "LED पोर्टफोलियो देखें",
    packagingEyebrow: "02 / कठोर प्लास्टिक पैकेजिंग",
    packagingTitle: "एप्लिकेशन के अनुसार आकार दिए गए पैकेजिंग और घटक।",
    packagingAll: "पैकेजिंग पोर्टफोलियो देखें",
    capabilities: "विनिर्माण आधार",
    capabilitiesTitle: "उत्पाद कैटलॉग केवल सामने का हिस्सा है।",
    capabilitiesText: "हर उत्पाद परिवार के पीछे मोल्डिंग, इलेक्ट्रॉनिक्स, R&D, असेंबली और टूलिंग की एकीकृत विनिर्माण व्यवस्था है।",
    viewFacilities: "विनिर्माण सुविधाएं देखें",
    productsInHouse: "इन-हाउस क्षमताएं",
    productCategories: "मुख्य उत्पाद श्रेणियां",
    ctaEyebrow: "बनाने के लिए तैयार?",
    ctaTitle: "अपनी स्पेसिफिकेशन हमारे साथ साझा करें।",
    ctaText: "ड्रॉइंग, प्रोडक्ट रेफरेंस या आवश्यकता साझा करें। हम इसे उपयुक्त विनिर्माण क्षमता तक चर्चा के लिए पहुंचाएंगे।",
    requestQuote: "कोटेशन मांगें",
    showroomEyebrow: "वर्चुअल निरीक्षण · 3D उत्पाद इंजीनियरिंग सूट",
    showroomTitle: "इंटरएक्टिव 3D शोरूम",
    showroomDesc: "शीतल के लाइटिंग ल्यूमिनेयर्स का त्रि-आयामी (3D) निरीक्षण करें। 360° घुमाएं, एक्सप्लोडेड सब-असेंबली देखें, CAD वायरफ्रेम ब्लूप्रिंट टॉगल करें और वास्तविक इन-हाउस विनिर्माण विनिर्देशों की जांच करें।",
    showroomTags: ["360° ड्रैग ऑर्बिट", "एक्सप्लोडेड व्यू", "CAD वायरफ्रेम", "3D सब-असेंबली पिन"] as const,
  }
} as const;

const ledProducts = [
  ["LED Bulbs", "/images/products/led-bulb.png", "/products/led-lighting/bulbs"],
  ["LED Battens", "/images/products/led-batten.png", "/products/led-lighting/battens"],
  ["LED Downlights", "/images/products/led-down-light.webp", "/products/led-lighting/downlights"],
  ["Street Lights", "/images/products/led-street-light-2.png", "/products/led-lighting/street-lights"],
  ["Flood / Well Lights", "/images/products/led-flood-well-light.png", "/products/led-lighting/flood-lights"],
  ["Spot Lights", "/images/products/led-spot-light.png", "/products/led-lighting/spot-lights"],
  ["Decorative Lights", "/images/products/led-decorative-light.png", "/products/led-lighting/decorative-lights"],
  ["Smart LED", "/images/products/smart-led-bulb.png", "/products/led-lighting/smart-led"],
  ["Strip Lights", "/images/products/led-strip-lights.png", "/products/led-lighting/strip-lights"],
] as const;

const packagingProducts = [
  ["Plastic Bottles", "/images/products_packaging.jpg", "/products/rigid-packaging/bottles"],
  ["Jars & Containers", "/images/jar_product.jpg", "/products/rigid-packaging/jars"],
  ["Custom Packaging", "/images/packaging_factory.jpg", "/products/rigid-packaging/custom"],
  ["Injection-Moulded Components", "/images/moulding_factory.jpg", "/products/rigid-packaging/components"],
] as const;

const capIcons = [Factory, Layers, Zap, Package, CircuitBoard, Drill, Cog, FlaskConical, Wrench];

export default async function ProductsHub({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale === "hi" ? "hi" : "en";
  const t = copy[locale];

  const families = [
    { number: "01", title: t.led, desc: t.ledDesc, icon: Lightbulb, href: "/products/led-lighting", image: "/images/products/led-bulb.png" },
    { number: "02", title: t.packaging, desc: t.packagingDesc, icon: PackageCheck, href: "/products/rigid-packaging", image: "/images/jar_product.jpg" },
    { number: "03", title: t.electronics, desc: t.electronicsDesc, icon: Cpu, href: "/products/electronics", image: "/images/products/extension-board.webp" },
    { number: "04", title: t.oem, desc: t.oemDesc, icon: Boxes, href: "/rfq", image: "/images/moulding_factory.jpg" },
  ];

  const capabilityNames = [
    "Injection Moulding",
    "IBM Plastic",
    "Extrusion",
    "Blow Moulding",
    "SMT",
    "Manual Insertion",
    "Assembly & Packing",
    "R&D",
    "Tool Room",
  ];

  return (
    <main className="bg-paper text-ink">
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative overflow-hidden bg-[#071322] text-white">
        {/* Subtle grid + decorative circles */}
        <div className="absolute inset-0 opacity-30 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute -left-40 -top-40 w-[520px] h-[520px] rounded-full border border-white/[.04]" />
        <div className="absolute -right-40 bottom-[-220px] w-[620px] h-[620px] rounded-full border border-white/[.04]" />
        {/* Soft radial glow behind hero image grid */}
        <div className="absolute right-0 top-1/3 w-[600px] h-[600px] bg-accent/[.06] rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 container-wide pt-32 md:pt-40 pb-20 md:pb-28">
          <div className="grid lg:grid-cols-[.95fr_1.05fr] gap-12 lg:gap-20 items-center">
            <HeroTextFadeUp>
              <p className="font-mono text-accent text-xs md:text-sm uppercase tracking-[.22em] mb-6">
                {t.eyebrow}
              </p>

              <h1 className="text-5xl md:text-7xl xl:text-[88px] font-display font-medium leading-[.92] tracking-tight max-w-3xl">
                {t.heroTitle[0]}
                <span className="block text-white/40">{t.heroTitle[1]}</span>
                <span className="block bg-gradient-to-r from-white via-white to-accent bg-clip-text text-transparent">{t.heroTitle[2]}</span>
              </h1>

              <p className="mt-8 text-white/60 text-lg md:text-xl leading-relaxed max-w-2xl">
                {t.intro}
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/products/led-lighting"
                  className="inline-flex items-center gap-3 bg-white text-ink px-7 py-4 rounded-lg font-medium hover:bg-accent hover:text-white transition-all duration-300 hover:shadow-[0_0_24px_rgba(0,102,255,.35)]"
                >
                  {t.viewLed}<ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/products/rigid-packaging"
                  className="inline-flex items-center gap-3 border border-white/20 text-white px-7 py-4 rounded-lg font-medium hover:bg-white/10 hover:border-white/40 transition-all duration-300"
                >
                  {t.viewPackaging}<ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Stats bar */}
              <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-3 gap-6 max-w-xl">
                {[
                  { value: "25+", label: "Years" },
                  { value: "9", label: "Capabilities" },
                  { value: "30K+", label: "Sq. Ft." },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="font-display text-4xl md:text-5xl bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">{stat.value}</p>
                    <p className="text-white/40 text-xs uppercase tracking-[.18em] mt-2 font-mono">{stat.label}</p>
                  </div>
                ))}
              </div>
            </HeroTextFadeUp>

            <HeroImageScaleIn>
              <div className="grid grid-cols-12 grid-rows-2 gap-3 min-h-[520px]">
                {/* LED – large card */}
                <div className="col-span-7 row-span-2 relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 group">
                  <Image
                    src="/images/products/led-bulb.png"
                    alt="LED Bulbs"
                    fill
                    sizes="(max-width: 1024px) 58vw, 420px"
                    className="object-contain p-10 md:p-14 group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071322]/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute left-5 bottom-5">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-white/45">01</p>
                    <p className="font-display text-xl">LED Lighting</p>
                  </div>
                </div>

                {/* Packaging */}
                <div className="col-span-5 relative overflow-hidden rounded-2xl border border-white/10 bg-[#f2f3f5] group">
                  <Image
                    src="/images/jar_product.jpg"
                    alt="Rigid Plastic Packaging"
                    fill
                    sizes="(max-width: 1024px) 40vw, 300px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute left-4 bottom-4">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-white/60">02</p>
                    <p className="font-display text-lg text-white">Packaging</p>
                  </div>
                </div>

                {/* Electronics */}
                <div className="col-span-5 relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 group">
                  <Image
                    src="/images/products/extension-board.webp"
                    alt="Electronics and extension boards"
                    fill
                    sizes="(max-width: 1024px) 40vw, 300px"
                    className="object-contain p-8 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute left-4 bottom-4">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-white/45">03</p>
                    <p className="font-display text-lg">Electronics</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-5 right-4 md:right-6 bg-accent text-white px-5 py-3 rounded-lg shadow-[0_4px_24px_rgba(0,102,255,.3)]">
                <p className="font-mono text-[10px] uppercase tracking-widest">OEM / Contract Manufacturing</p>
              </div>
            </HeroImageScaleIn>
          </div>
        </div>
      </section>

      {/* ═══════════════ FAMILY ARCHITECTURE ═══════════════ */}
      <section className="py-24 md:py-32">
        <div className="container-wide">
          <div className="max-w-3xl mb-16">
            <p className="font-mono text-accent text-sm uppercase tracking-widest mb-3">{t.portfolio}</p>
            <h2 className="text-4xl md:text-6xl font-display font-medium leading-tight">{t.portfolioTitle}</h2>
            <p className="text-steel text-lg leading-relaxed mt-6">{t.portfolioText}</p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
            {families.map((family, i) => {
              const Icon = family.icon;
              return (
                <FamilyCardFadeUp key={family.number} delay={i * .06}>
                  <Link href={family.href} className="group relative block h-[440px] overflow-hidden rounded-2xl bg-ink text-white shadow-lg hover:shadow-2xl transition-shadow duration-500">
                    <Image
                      src={family.image}
                      alt={family.title}
                      fill
                      priority={i === 0}
                      sizes="(max-width: 1280px) 50vw, 25vw"
                      className="object-cover opacity-60 group-hover:scale-105 group-hover:opacity-80 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071322] via-[#071322]/50 to-transparent" />
                    <div className="relative z-10 h-full flex flex-col justify-between p-7">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full">{family.number}</span>
                        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/10">
                          <Icon className="w-5 h-5 text-white/80" strokeWidth={1.4} />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-2xl font-display font-medium mb-3">{family.title}</h3>
                        <p className="text-white/65 text-sm leading-relaxed mb-6">{family.desc}</p>
                        <div className="inline-flex items-center gap-2 text-accent text-sm font-medium group-hover:gap-3 transition-all">
                          Explore <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </FamilyCardFadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ 3D INTERACTIVE SHOWROOM ═══════════════ */}
      <section id="3d-showroom" className="py-12 md:py-16 bg-[#040d18] text-white border-y border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-15 bg-[radial-gradient(#ff5e14_1px,transparent_1px)] [background-size:28px_28px]" />
        {/* Accent glow orbs */}
        <div className="absolute -left-32 top-1/4 w-[400px] h-[400px] bg-accent/[.06] rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute right-0 bottom-0 w-[350px] h-[350px] bg-orange-500/[.04] rounded-full blur-[100px] pointer-events-none" />

        <div className="container-wide relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-8">
            <div className="max-w-3xl">
              <span className="font-mono text-xs uppercase tracking-[.25em] text-accent mb-3 block font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                {t.showroomEyebrow}
              </span>
              <h2 className="text-4xl md:text-6xl font-display font-medium text-white leading-tight">
                {t.showroomTitle}
              </h2>
              <p className="text-white/65 text-lg leading-relaxed mt-4">
                {t.showroomDesc}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-white/60">
              {t.showroomTags.map((tag) => (
                <span key={tag} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-colors cursor-default">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <ProductRoomWrapper />
        </div>
      </section>

      {/* ═══════════════ LED PORTFOLIO ═══════════════ */}
      <section className="py-24 md:py-32 bg-mist border-y border-steel/10">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div className="max-w-3xl">
              <p className="font-mono text-accent text-sm uppercase tracking-widest mb-3">{t.ledEyebrow}</p>
              <h2 className="text-4xl md:text-6xl font-display font-medium leading-tight">{t.ledTitle}</h2>
            </div>
            <Link href="/products/led-lighting" className="inline-flex items-center gap-2 text-accent font-medium text-sm uppercase tracking-wider hover:gap-3 transition-all">
              {t.exploreAll}<ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {ledProducts.map(([name, image, href], i) => (
              <ProductCardFadeUp key={name} delay={i * .03}>
                <Link href={href} className="group block bg-white rounded-xl border border-steel/10 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-[#f8f9fb] to-[#eef1f5] overflow-hidden">
                    <Image src={image} alt={name} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-contain p-8 group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-3 left-3 bg-ink/90 text-white font-mono text-[10px] px-2.5 py-1 rounded-md">{String(i + 1).padStart(2, "0")}</div>
                  </div>
                  <div className="p-5 flex items-center justify-between gap-4 border-t border-steel/5">
                    <span className="font-display font-medium text-lg group-hover:text-accent transition-colors">{name}</span>
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="w-3.5 h-3.5 text-accent" />
                    </div>
                  </div>
                </Link>
              </ProductCardFadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ PACKAGING ═══════════════ */}
      <section className="py-24 md:py-32">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div className="max-w-3xl">
              <p className="font-mono text-accent text-sm uppercase tracking-widest mb-3">{t.packagingEyebrow}</p>
              <h2 className="text-4xl md:text-6xl font-display font-medium leading-tight">{t.packagingTitle}</h2>
            </div>
            <Link href="/products/rigid-packaging" className="inline-flex items-center gap-2 text-accent font-medium text-sm uppercase tracking-wider hover:gap-3 transition-all">
              {t.packagingAll}<ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {packagingProducts.map(([name, image, href], i) => (
              <ProductCardFadeUp key={name} delay={i * .05}>
                <Link href={href} className="group block bg-white rounded-xl border border-steel/10 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                  <div className="relative h-64 bg-mist overflow-hidden rounded-t-xl">
                    <Image src={image} alt={name} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent" />
                    <span className="absolute bottom-4 left-4 text-white font-mono text-[10px] uppercase tracking-widest bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-md">0{i + 1} / Packaging</span>
                  </div>
                  <div className="p-6 flex items-center justify-between gap-4">
                    <span className="font-display font-medium group-hover:text-accent transition-colors">{name}</span>
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                      <ArrowUpRight className="w-3.5 h-3.5 text-accent" />
                    </div>
                  </div>
                </Link>
              </ProductCardFadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ MANUFACTURING BACKBONE ═══════════════ */}
      <section className="bg-[#071322] text-white py-24 md:py-32 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-accent/[.04] rounded-full blur-[120px] pointer-events-none" />

        <div className="container-wide relative z-10 grid lg:grid-cols-[1fr_1.2fr] gap-16 items-start">
          <div>
            <p className="font-mono text-accent text-sm uppercase tracking-widest mb-4">{t.capabilities}</p>
            <h2 className="text-4xl md:text-6xl font-display font-medium leading-tight">{t.capabilitiesTitle}</h2>
            <p className="text-white/60 text-lg leading-relaxed mt-6 max-w-xl">{t.capabilitiesText}</p>
            <Link href="/facilities" className="inline-flex items-center gap-3 mt-10 bg-white text-ink px-7 py-4 rounded-lg font-medium hover:bg-accent hover:text-white transition-all duration-300 hover:shadow-[0_0_24px_rgba(0,102,255,.35)]">
              {t.viewFacilities}<ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {capabilityNames.map((item, i) => {
              const Icon = capIcons[i] || Cog;
              return (
                <div key={item} className="group bg-white/[.04] hover:bg-white/[.08] border border-white/[.08] hover:border-accent/30 rounded-xl p-6 min-h-[130px] flex flex-col justify-between transition-all duration-300 cursor-default">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-accent/80">{String(i + 1).padStart(2, "0")}</span>
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity">
                      <Icon className="w-4 h-4 text-accent" strokeWidth={1.5} />
                    </div>
                  </div>
                  <span className="font-display text-lg group-hover:text-accent/90 transition-colors">{item}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="relative py-24 md:py-32 bg-accent text-ink overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.06)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
        <div className="absolute -right-32 -top-32 w-[400px] h-[400px] rounded-full bg-white/10 blur-[80px] pointer-events-none" />

        <div className="container-wide relative z-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[.2em] mb-4 text-ink/60">{t.ctaEyebrow}</p>
            <h2 className="text-4xl md:text-6xl font-display font-medium leading-tight">{t.ctaTitle}</h2>
            <p className="mt-6 text-ink/65 text-lg max-w-2xl leading-relaxed">{t.ctaText}</p>
          </div>
          <Link href="/rfq" className="inline-flex items-center justify-center gap-3 bg-ink text-white px-8 py-5 rounded-lg font-medium hover:bg-white hover:text-ink transition-all duration-300 shadow-xl hover:shadow-2xl whitespace-nowrap">
            {t.requestQuote}<ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
