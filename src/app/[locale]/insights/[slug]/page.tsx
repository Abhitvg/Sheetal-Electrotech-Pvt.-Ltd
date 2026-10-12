import Image from "next/image";
import { Link } from "@/i18n/routing";
import {
  ArrowLeft,
  ArrowRight,
  Clock3,
  ListTree,
  Package,
  Quote,
  CheckCircle2,
  Download,
  FileText,
  ShieldCheck,
  ChevronRight,
  UserCheck,
  Sparkles,
  Award,
  Layers,
  HelpCircle,
  Share2
} from "lucide-react";
import { insights } from "@/data/insights";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { localizedMetadata, SITE_URL } from "@/lib/seo";
import { routing } from "@/i18n/routing";
import { legacyInsightImages } from "@/data/legacyMedia";

export const dynamic = "force-static";
export const revalidate = 3600;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    insights.map((post) => ({ locale, slug: post.slug }))
  );
}

function readingTime(post: (typeof insights)[number]) {
  const text = post.content
    .flatMap(([heading, ...paragraphs]) => [heading, ...paragraphs])
    .join(" ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function displayDate(date: string) {
  return new Date(date + "T00:00:00Z").toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

function slugifyHeading(heading: string) {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function renderParagraph(text: string) {
  const match = text.match(/^(General (?:industry|lighting|process|manufacturing|engineering) context:|General lighting guidance:|General industry guidance:|General process guidance:)(.*)$/i);
  if (!match) {
    return <p className="text-slate-700 text-base md:text-lg leading-[1.85] font-sans mb-6">{text}</p>;
  }

  return (
    <div className="my-6 border-l-4 border-accent bg-paper border border-slate-200 p-5 rounded-r-xs shadow-xs">
      <p className="font-mono text-xs uppercase tracking-widest text-accent font-semibold mb-1 flex items-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5" /> {match[1]}
      </p>
      <p className="text-slate-700 text-sm md:text-base leading-relaxed font-sans">
        {match[2]}
      </p>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = insights.find((item) => item.slug === slug);

  if (!post) {
    return {
      title: "Insight Not Found | Sheetal Electrotech",
      description: "Sheetal Electrotech technical knowledge and manufacturing insights.",
    };
  }

  return localizedMetadata(locale, `/insights/${slug}`, {
    en: {
      title: `${post.title} | Sheetal Electrotech Engineering Insights`,
      description: post.excerpt,
    },
    hi: {
      title: `${post.title} | शीतल इलेक्ट्रो-टेक इंजीनियरिंग अंतर्दृष्टि`,
      description: post.excerpt,
    },
  });
}

export default async function InsightPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = insights.find((item) => item.slug === slug);

  if (!post) notFound();

  const minutes = readingTime(post);
  const headings = post.content.map(([heading]) => ({
    label: heading.replace(/^##\s*/, ""),
    id: slugifyHeading(heading.replace(/^##\s*/, "")),
  }));

  const related = post.relatedInsights
    .map((relatedSlug) => insights.find((item) => item.slug === relatedSlug))
    .filter(Boolean) as typeof insights;

  const heroImage = legacyInsightImages[post.slug]?.[0] || "/images/product_showcase.jpg";
  const secondaryImage = legacyInsightImages[post.slug]?.[1] || "/images/testing_lab.jpg";
  const articleUrl = `${SITE_URL}/${locale}/insights/${post.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    author: {
      "@type": "Organization",
      name: "Sheetal Electrotech Engineering Directorate",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Sheetal Electrotech",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/logo.webp`,
      },
    },
    image: `${SITE_URL}${heroImage.startsWith("/") ? heroImage : "/" + heroImage}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Insights & Knowledge", item: `${SITE_URL}/${locale}/insights` },
      { "@type": "ListItem", position: 3, name: post.category, item: `${SITE_URL}/${locale}/insights` },
      { "@type": "ListItem", position: 4, name: post.title, item: articleUrl },
    ],
  };

  const faqSchema = post.faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      }
    : null;

  return (
    <main className="min-h-screen bg-paper text-ink">
      {/* Structured Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      {/* Hero Header: Luxury Industrial Blueprint Aesthetic */}
      <section className="relative overflow-hidden bg-slate-950 text-white border-b border-slate-800 pt-32 md:pt-36 pb-16 md:pb-24">
        {/* Subtle Blueprint Grid Pattern */}
        <div className="absolute inset-0 opacity-15 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-accent/15 blur-3xl pointer-events-none" />
        <div className="absolute -right-32 bottom-[-150px] h-[450px] w-[450px] rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 container-wide">
          {/* Breadcrumb Path & Back Link */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Link href="/" className="hover:text-accent transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <Link href="/insights" className="hover:text-accent transition-colors">
                Insights &amp; Knowledge
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <span className="text-accent font-semibold">{post.category}</span>
            </nav>

            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-accent transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to All Insights
            </Link>
          </div>

          <div className="max-w-4xl">
            {/* Meta Badges */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-accent/20 text-accent text-[11px] font-mono font-semibold uppercase tracking-widest border border-accent/40 rounded-xs">
                {post.category}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest text-slate-400 bg-white/5 border border-white/10 px-3 py-1 rounded-xs">
                <Clock3 className="w-3.5 h-3.5 text-accent" />
                {minutes} min read
              </span>
              <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400">
                Updated {displayDate(post.dateModified)}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1 rounded-xs">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified OEM Spec
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-medium tracking-tight leading-[1.05] mb-6 text-white">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="max-w-3xl text-lg md:text-xl text-slate-300 leading-relaxed font-sans mb-10">
              {post.excerpt}
            </p>

            {/* Hero Photo Banner - Framed Blueprint Showcase */}
            <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-sm overflow-hidden border border-white/15 shadow-2xl bg-slate-900 group">
              <Image
                src={heroImage}
                alt={`${post.title} — official Sheetal Electrotech manufacturing and engineering documentation`}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover opacity-90 group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />

              {/* Blueprint Corner Watermarks */}
              <div className="absolute top-4 left-4 font-mono text-[10px] text-white/80 bg-black/70 backdrop-blur-md px-3 py-1 rounded-xs border border-white/10">
                SHEETAL ELECTROTECH · DAMAN MANUFACTURING CAMPUS
              </div>

              {/* Bottom Technical Strip */}
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-300 bg-slate-950/85 backdrop-blur-md p-3.5 rounded-xs border border-white/10">
                <span className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-accent" />
                  <span>ISO 9001:2015 &amp; BIS CRS Quality Benchmark</span>
                </span>
                <span className="text-accent font-semibold">
                  Division 07 / 09 · Precision Verification
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout with Sticky Sidebar */}
      <div className="container-wide py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_300px] gap-12 lg:gap-16">
            {/* Left Column: Article Body */}
            <article>
              {/* Key Takeaways Box: Blueprint Aesthetic */}
              <section className="bg-slate-950 text-white border border-slate-800 p-7 md:p-9 mb-12 rounded-sm shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-36 h-36 bg-accent/10 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-center gap-2 text-accent mb-5">
                  <CheckCircle2 className="w-4 h-4" />
                  <p className="font-mono text-xs uppercase tracking-[.2em] font-semibold">
                    Key Engineering Takeaways
                  </p>
                </div>
                <ul className="space-y-3.5">
                  {post.keyTakeaways.map((takeaway) => (
                    <li key={takeaway} className="flex items-start gap-3 text-sm md:text-base text-slate-200 leading-relaxed">
                      <span className="mt-1.5 h-2 w-2 rounded-full bg-accent shrink-0" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Pull Quote Box */}
              {post.pullQuote && (
                <blockquote className="my-10 bg-white border-y-2 border-accent py-8 px-6 md:px-10 shadow-xs">
                  <div className="flex gap-4 items-start">
                    <Quote className="w-8 h-8 text-accent shrink-0 mt-1" />
                    <div>
                      <p className="text-xl md:text-2xl font-display font-medium leading-relaxed text-ink italic">
                        “{post.pullQuote}”
                      </p>
                      <p className="mt-3 font-mono text-[11px] text-slate-500 uppercase tracking-widest">
                        — Sheetal Electrotech Technical Directorate · Daman Campus
                      </p>
                    </div>
                  </div>
                </blockquote>
              )}

              {/* Secondary Visual Showcase (Perfect Placement) */}
              {secondaryImage && secondaryImage !== heroImage && (
                <figure className="my-12 bg-white border border-slate-200 p-3 rounded-sm shadow-sm">
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-950 rounded-xs">
                    <Image
                      src={secondaryImage}
                      alt={`${post.title} — shop-floor manufacturing and laboratory test setup`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 65vw"
                      className="object-cover"
                    />
                    <div className="absolute bottom-3 right-3 font-mono text-[9px] text-white/80 bg-black/70 backdrop-blur-xs px-2.5 py-1 rounded-xs border border-white/10">
                      DAMAN TESTING &amp; MOULDING DIVISION
                    </div>
                  </div>
                  <figcaption className="mt-3 px-2 text-xs text-slate-500 font-mono leading-relaxed flex items-center justify-between">
                    <span>Shop-floor verification setup at Sheetal Electrotech, Daman.</span>
                    <span className="text-accent font-semibold">REF #FAC-VER-26</span>
                  </figcaption>
                </figure>
              )}

              {/* Formatted Article Content with Explicit Headings */}
              <div className="border-t border-slate-200 pt-10">
                {post.content.map(([heading, ...paragraphs], index) => {
                  const title = heading.replace(/^##\s*/, "");
                  const id = slugifyHeading(title);
                  return (
                    <section key={heading + index} id={id} className="scroll-mt-32 mb-12">
                      <h2 className="text-2xl md:text-3xl font-display font-bold text-ink mb-5 pb-3 border-b border-slate-200 flex items-center gap-3">
                        <span className="font-mono text-accent text-sm font-semibold tracking-wider bg-accent/10 px-2.5 py-1 rounded-xs">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span>{title}</span>
                      </h2>
                      {paragraphs.map((paragraph, paragraphIndex) => (
                        <div key={paragraph + paragraphIndex}>
                          {renderParagraph(paragraph)}
                        </div>
                      ))}
                    </section>
                  );
                })}
              </div>

              {/* FAQ Section with Clean Accordion Styling */}
              {post.faq?.length ? (
                <section className="mt-16 bg-white border border-slate-200 p-8 rounded-sm shadow-sm">
                  <div className="mb-6">
                    <div className="flex items-center gap-2 text-accent mb-2">
                      <HelpCircle className="w-4 h-4" />
                      <p className="font-mono text-[10px] uppercase tracking-[.2em] font-semibold">
                        Frequently Asked Questions
                      </p>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-ink">
                      Technical Q&amp;A on {post.title}
                    </h2>
                  </div>
                  <div className="space-y-4">
                    {post.faq.map((item) => (
                      <details key={item.q} className="group border border-slate-200 bg-paper p-5 rounded-xs transition-all">
                        <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-semibold text-ink text-base">
                          <span>{item.q}</span>
                          <span className="text-accent font-mono text-xl group-open:rotate-45 transition-transform duration-200">
                            +
                          </span>
                        </summary>
                        <p className="pt-3 text-sm md:text-base text-slate-600 leading-relaxed font-sans border-t border-slate-200/60 mt-3">
                          {item.a}
                        </p>
                      </details>
                    ))}
                  </div>
                </section>
              ) : null}

              {/* Related Products Strip */}
              {post.relatedProducts && post.relatedProducts.length > 0 && (
                <section className="mt-12 bg-white border border-slate-200 p-7 md:p-8 rounded-sm shadow-sm">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-5 flex items-center gap-2">
                    <Package className="w-4 h-4 text-accent" />
                    Relevant Manufactured Products
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {post.relatedProducts.map((product) => (
                      <Link
                        key={product.name}
                        href={product.href}
                        className="group inline-flex items-center gap-2 px-4 py-2.5 bg-paper border border-slate-200 text-sm font-semibold text-ink hover:border-accent hover:text-accent hover:bg-white transition-all rounded-xs"
                      >
                        {product.name}
                        <ArrowRight className="w-3.5 h-3.5 text-accent group-hover:translate-x-1 transition-transform" />
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* E-E-A-T Editorial Verification Card */}
              <section className="mt-12 bg-slate-900 text-white border border-slate-800 p-6 md:p-8 rounded-sm shadow-md">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-5 border-b border-white/10">
                  <div className="w-12 h-12 bg-accent text-ink rounded-sm flex items-center justify-center font-display font-bold text-lg shrink-0">
                    SPA
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-display font-bold text-base text-white">
                        Suresh Prasad Arya
                      </h4>
                      <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-mono border border-emerald-500/30 rounded-xs">
                        Verified Author
                      </span>
                    </div>
                    <p className="text-accent text-xs font-mono">
                      Head of Research &amp; Development (R&amp;D) · Sheetal Electrotech Daman
                    </p>
                  </div>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed font-sans mt-4">
                  Reviewed for accuracy against Indian Standard specifications (IS 16102, IS 10322, IS 15885) and internal factory quality assurance benchmarks at Plot No. 43, 52/2 &amp; 53/1, Silvassa Road, Daman.
                </p>
              </section>

              {/* Related Insights Grid */}
              {related.length ? (
                <section className="mt-16">
                  <div className="flex items-end justify-between gap-6 mb-8 pb-3 border-b border-slate-200">
                    <div>
                      <p className="font-mono text-accent text-xs uppercase tracking-[.2em] font-semibold mb-1">
                        Continue Reading
                      </p>
                      <h3 className="text-2xl md:text-3xl font-display font-bold text-ink">
                        Related Technical Guides
                      </h3>
                    </div>
                    <Link
                      href="/insights"
                      className="hidden sm:inline-flex items-center gap-1.5 text-accent text-xs font-mono font-semibold uppercase tracking-wider hover:underline"
                    >
                      All Insights <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    {related.slice(0, 3).map((item) => {
                      const relImg = legacyInsightImages[item.slug]?.[0] || "/images/product_showcase.jpg";
                      return (
                        <Link
                          key={item.slug}
                          href={`/insights/${item.slug}`}
                          className="group bg-white border border-slate-200 rounded-sm overflow-hidden hover:border-accent hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                        >
                          <div>
                            <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden">
                              <Image
                                src={relImg}
                                alt={item.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                              />
                              <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-black/80 backdrop-blur-xs text-white text-[9px] font-mono uppercase tracking-widest border border-white/10 rounded-xs">
                                {item.category}
                              </div>
                            </div>
                            <div className="p-5">
                              <p className="font-mono text-[10px] uppercase tracking-widest text-slate-400 mb-2">
                                {readingTime(item)} min read
                              </p>
                              <h4 className="font-display text-base font-bold text-ink group-hover:text-accent transition-colors leading-snug line-clamp-2">
                                {item.title}
                              </h4>
                            </div>
                          </div>
                          <div className="px-5 py-2.5 bg-slate-50 border-t border-slate-100 text-xs font-semibold text-accent flex items-center justify-between">
                            <span>Read Guide</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </section>
              ) : null}

              {/* Source Context Disclaimer */}
              <div className="mt-12 flex flex-wrap gap-4 justify-between border-t border-slate-200 pt-5 text-[11px] font-mono uppercase tracking-widest text-slate-500">
                <span>Official Sheetal Electrotech Engineering Knowledge Base</span>
                <a
                  href={post.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-accent transition-colors underline"
                >
                  View Archive Source
                </a>
              </div>
            </article>

            {/* Right Column: Sticky Sidebar with Table of Contents & Catalogue Downloads */}
            <aside className="space-y-8">
              {/* Sticky Table of Contents */}
              {headings.length >= 2 && (
                <div className="sticky top-32 bg-white border border-slate-200 p-6 rounded-sm shadow-sm space-y-6">
                  <div>
                    <div className="flex items-center gap-2 text-accent mb-1">
                      <ListTree className="w-4 h-4" />
                      <p className="font-mono text-[10px] uppercase tracking-[.2em] font-semibold">
                        Table of Contents
                      </p>
                    </div>
                    <h4 className="text-base font-display font-bold text-ink">
                      In This Article
                    </h4>
                  </div>
                  <nav className="space-y-2.5 border-t border-slate-100 pt-4">
                    {headings.map((heading, index) => (
                      <a
                        key={heading.id}
                        href={`#${heading.id}`}
                        className="block text-xs font-sans text-slate-600 hover:text-accent hover:translate-x-1 transition-all leading-snug"
                      >
                        <span className="font-mono text-[10px] text-accent font-semibold mr-2">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {heading.label}
                      </a>
                    ))}
                  </nav>

                  {/* Catalogue Download Box inside Sidebar */}
                  <div className="pt-5 border-t border-slate-100">
                    <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 font-semibold">
                      Engineering Submittals
                    </p>
                    <a
                      href="/resources/product-catalogue.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 bg-accent text-ink py-2.5 px-3 font-bold text-xs uppercase tracking-wider rounded-xs hover:bg-slate-900 hover:text-white transition-colors mb-2.5"
                    >
                      <Download className="w-3.5 h-3.5" /> Product Catalogue
                    </a>
                    <a
                      href="/resources/Sheetal-update.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 bg-paper text-ink border border-slate-200 py-2.5 px-3 font-semibold text-xs uppercase tracking-wider rounded-xs hover:border-accent hover:text-accent transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5" /> 37MB Master Dossier
                    </a>
                  </div>

                  {/* Sticky RFQ Mini-Card */}
                  <div className="pt-4 border-t border-slate-100 bg-slate-950 text-white p-5 rounded-xs">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-accent font-semibold mb-1">
                      Custom OEM Requirements?
                    </p>
                    <p className="text-slate-300 text-xs mb-4 leading-relaxed">
                      Discuss high-volume manufacturing, tooling design, or driver modifications with our engineers.
                    </p>
                    <Link
                      href="/rfq"
                      className="w-full inline-flex items-center justify-center gap-2 bg-white text-ink py-2.5 px-3 font-bold text-xs uppercase tracking-wider rounded-xs hover:bg-accent hover:text-ink transition-colors"
                    >
                      Request a Quote <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
