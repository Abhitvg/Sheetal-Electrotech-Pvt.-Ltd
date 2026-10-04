import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { ArrowRight, ArrowUpRight, Boxes, Cpu, Lightbulb, PackageCheck } from "lucide-react";
import { HeroTextFadeUp, HeroImageScaleIn, FamilyCardFadeUp, ProductCardFadeUp } from "@/components/ProductAnimations";

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

export default function ProductsHub() {
  const locale = useLocale() === "hi" ? "hi" : "en";
  const t = copy[locale];

  const families = [
    { number: "01", title: t.led, desc: t.ledDesc, icon: Lightbulb, href: "/products/led-lighting", image: "/images/products/led-bulb.png" },
    { number: "02", title: t.packaging, desc: t.packagingDesc, icon: PackageCheck, href: "/products/rigid-packaging", image: "/images/jar_product.jpg" },
    { number: "03", title: t.electronics, desc: t.electronicsDesc, icon: Cpu, href: "/products/electronics", image: "/images/products/extension-board.webp" },
    { number: "04", title: t.oem, desc: t.oemDesc, icon: Boxes, href: "/rfq", image: "/images/moulding_factory.jpg" },
  ];

  return (
    <main className="bg-paper text-ink">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#071322] text-white">
        <div className="absolute inset-0 opacity-40 bg-[linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute -left-40 -top-40 w-[520px] h-[520px] rounded-full border border-white/5" />
        <div className="absolute -right-40 bottom-[-220px] w-[620px] h-[620px] rounded-full border border-white/5" />

        <div className="relative z-10 container-wide pt-32 md:pt-40 pb-16 md:pb-24">
          <div className="grid lg:grid-cols-[.95fr_1.05fr] gap-12 lg:gap-20 items-center">
            <HeroTextFadeUp>
              <p className="font-mono text-accent text-xs md:text-sm uppercase tracking-[.22em] mb-6">
                {t.eyebrow}
              </p>

              <h1 className="text-5xl md:text-7xl xl:text-[88px] font-display font-medium leading-[.92] tracking-tight max-w-3xl">
                {t.heroTitle[0]}
                <span className="block text-white/45">{t.heroTitle[1]}</span>
                <span className="block">{t.heroTitle[2]}</span>
              </h1>

              <p className="mt-8 text-white/65 text-lg md:text-xl leading-relaxed max-w-2xl">
                {t.intro}
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/products/led-lighting"
                  className="inline-flex items-center gap-3 bg-white text-ink px-6 py-4 font-medium hover:bg-accent hover:text-white transition-colors"
                >
                  {t.viewLed}<ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/products/rigid-packaging"
                  className="inline-flex items-center gap-3 border border-white/20 text-white px-6 py-4 font-medium hover:bg-white/10 transition-colors"
                >
                  {t.viewPackaging}<ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="mt-12 pt-7 border-t border-white/10 grid grid-cols-3 gap-5 max-w-xl">
                <div>
                  <p className="font-display text-3xl md:text-4xl">25+</p>
                  <p className="text-white/45 text-xs uppercase tracking-widest mt-1">Years</p>
                </div>
                <div>
                  <p className="font-display text-3xl md:text-4xl">9</p>
                  <p className="text-white/45 text-xs uppercase tracking-widest mt-1">Capabilities</p>
                </div>
                <div>
                  <p className="font-display text-3xl md:text-4xl">30K+</p>
                  <p className="text-white/45 text-xs uppercase tracking-widest mt-1">Sq. Ft.</p>
                </div>
              </div>
            </HeroTextFadeUp>

            <HeroImageScaleIn>
              <div className="grid grid-cols-12 grid-rows-2 gap-3 min-h-[520px]">
                <div className="col-span-7 row-span-2 relative overflow-hidden border border-white/10 bg-white/5">
                  <Image
                    src="/images/products/led-bulb.png"
                    alt="LED Bulbs"
                    fill
                    sizes="(max-width: 1024px) 58vw, 420px"
                    className="object-contain p-10 md:p-14"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071322]/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute left-5 bottom-5">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-white/45">01</p>
                    <p className="font-display text-xl">LED Lighting</p>
                  </div>
                </div>

                <div className="col-span-5 relative overflow-hidden border border-white/10 bg-[#f2f3f5]">
                  <Image
                    src="/images/jar_product.jpg"
                    alt="Rigid Plastic Packaging"
                    fill
                    sizes="(max-width: 1024px) 40vw, 300px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute left-4 bottom-4">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-white/60">02</p>
                    <p className="font-display text-lg text-white">Packaging</p>
                  </div>
                </div>

                <div className="col-span-5 relative overflow-hidden border border-white/10 bg-white/5">
                  <img
                    src={legacyProductImages["extension-board"]?.[0] ?? "/images/exension-board-jpg.webp"}
                    alt="Electronics and extension boards"
                    loading="lazy"
                    className="h-full w-full object-contain p-8"
                  />
                  <div className="absolute left-4 bottom-4">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-white/45">03</p>
                    <p className="font-display text-lg">Electronics</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 right-4 md:right-6 bg-accent text-ink px-5 py-3 shadow-xl">
                <p className="font-mono text-[10px] uppercase tracking-widest">OEM / Contract Manufacturing</p>
              </div>
            </HeroImageScaleIn>
          </div>
        </div>
      </section>

      {/* FAMILY ARCHITECTURE */}
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
                  <Link href={family.href} className="group relative block h-[430px] overflow-hidden bg-ink text-white">
                    <img src={family.image} alt={family.title} loading={i === 0 ? "eager" : "lazy"} className="absolute inset-0 h-full w-full object-cover opacity-65 group-hover:scale-105 group-hover:opacity-80 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071322]/95 via-[#071322]/45 to-[#071322]/5" />
                    <div className="relative z-10 h-full flex flex-col justify-between p-7">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs tracking-widest text-accent">{family.number}</span>
                        <Icon className="w-6 h-6 text-white/70" strokeWidth={1.4} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-display font-medium mb-3">{family.title}</h3>
                        <p className="text-white/70 text-sm leading-relaxed mb-6">{family.desc}</p>
                        <div className="inline-flex items-center gap-2 text-accent text-sm font-medium">
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

      {/* LED PORTFOLIO */}
      <section className="py-24 md:py-32 bg-mist border-y border-steel/10">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div className="max-w-3xl">
              <p className="font-mono text-accent text-sm uppercase tracking-widest mb-3">{t.ledEyebrow}</p>
              <h2 className="text-4xl md:text-6xl font-display font-medium leading-tight">{t.ledTitle}</h2>
            </div>
            <Link href="/products/led-lighting" className="inline-flex items-center gap-2 text-accent font-medium text-sm uppercase tracking-wider">
              {t.exploreAll}<ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {ledProducts.map(([name, image, href], i) => (
              <ProductCardFadeUp key={name} delay={i * .03}>
                <Link href={href} className="group block bg-white border border-steel/10 overflow-hidden">
                  <div className="relative aspect-[4/3] bg-[#f5f6f8] overflow-hidden">
                    <Image src={image} alt={name} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-contain p-8 group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3 bg-ink text-white font-mono text-[10px] px-2 py-1 opacity-80">{String(i + 1).padStart(2, "0")}</div>
                  </div>
                  <div className="p-5 flex items-center justify-between gap-4">
                    <span className="font-display font-medium text-lg group-hover:text-accent transition-colors">{name}</span>
                    <ArrowRight className="w-4 h-4 text-accent opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </div>
                </Link>
              </ProductCardFadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGING */}
      <section className="py-24 md:py-32">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div className="max-w-3xl">
              <p className="font-mono text-accent text-sm uppercase tracking-widest mb-3">{t.packagingEyebrow}</p>
              <h2 className="text-4xl md:text-6xl font-display font-medium leading-tight">{t.packagingTitle}</h2>
            </div>
            <Link href="/products/rigid-packaging" className="inline-flex items-center gap-2 text-accent font-medium text-sm uppercase tracking-wider">
              {t.packagingAll}<ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {packagingProducts.map(([name, image, href], i) => (
              <Link key={name} href={href} className="group block bg-white border border-steel/10 overflow-hidden">
                <div className="relative h-64 bg-mist overflow-hidden">
                  <Image src={image} alt={name} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/55 to-transparent" />
                  <span className="absolute bottom-4 left-4 text-white font-mono text-[10px] uppercase tracking-widest">0{i + 1} / Packaging</span>
                </div>
                <div className="p-6 flex items-center justify-between gap-4">
                  <span className="font-display font-medium">{name}</span>
                  <ArrowUpRight className="w-4 h-4 text-accent" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* MANUFACTURING BACKBONE */}
      <section className="bg-[#071322] text-white py-24 md:py-32">
        <div className="container-wide grid lg:grid-cols-[1fr_1.2fr] gap-16 items-start">
          <div>
            <p className="font-mono text-accent text-sm uppercase tracking-widest mb-4">{t.capabilities}</p>
            <h2 className="text-4xl md:text-6xl font-display font-medium leading-tight">{t.capabilitiesTitle}</h2>
            <p className="text-white/65 text-lg leading-relaxed mt-6 max-w-xl">{t.capabilitiesText}</p>
            <Link href="/facilities" className="inline-flex items-center gap-3 mt-8 bg-white text-ink px-6 py-4 font-medium hover:bg-accent hover:text-white transition-colors">
              {t.viewFacilities}<ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {[
              "Injection Moulding",
              "IBM Plastic",
              "Extrusion",
              "Blow Moulding",
              "SMT",
              "Manual Insertion",
              "Assembly & Packing",
              "R&D",
              "Tool Room",
            ].map((item, i) => (
              <div key={item} className="bg-[#071322] p-6 min-h-[120px] flex flex-col justify-between">
                <span className="font-mono text-[10px] text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-lg">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-accent text-ink">
        <div className="container-wide flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[.2em] mb-4">{t.ctaEyebrow}</p>
            <h2 className="text-4xl md:text-6xl font-display font-medium leading-tight">{t.ctaTitle}</h2>
            <p className="mt-6 text-ink/70 text-lg max-w-2xl leading-relaxed">{t.ctaText}</p>
          </div>
          <Link href="/rfq" className="inline-flex items-center justify-center gap-3 bg-ink text-white px-8 py-5 font-medium hover:bg-white hover:text-ink transition-colors whitespace-nowrap">
            {t.requestQuote}<ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
