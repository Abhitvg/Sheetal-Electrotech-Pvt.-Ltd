import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ArrowLeft, ArrowRight, Clock3, ListTree, Package, Quote } from "lucide-react";
import { insights } from "@/data/insights";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { localizedMetadata } from "@/lib/seo";
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
  if (!match) return <p>{text}</p>;

  return (
    <p className="border-l-2 border-accent/50 bg-mist/50 px-5 py-4 text-ink/70 text-[0.96em]">
      <span className="font-semibold text-ink">{match[1]}</span>{match[2]}
    </p>
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
      title: `${post.title} | Sheetal Electrotech Insights`,
      description: post.excerpt,
    },
    hi: {
      title: `${post.title} | Sheetal Electrotech Insights`,
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

  const image = legacyInsightImages[post.slug]?.[0]
    ?? "https://sheetalelectrotech.com/wp-content/uploads/2023/04/energy.png";
  const articleUrl = `https://sheetalelectrotech.com/${locale}/insights/${post.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    author: {
      "@type": "Organization",
      name: "Sheetal Electrotech",
      url: "https://sheetalelectrotech.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Sheetal Electrotech",
      url: "https://sheetalelectrotech.com",
      logo: {
        "@type": "ImageObject",
        url: "https://sheetalelectrotech.com/wp-content/uploads/2023/04/seplr.png",
      },
    },
    image,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `https://sheetalelectrotech.com/${locale}` },
      { "@type": "ListItem", position: 2, name: "Insights", item: `https://sheetalelectrotech.com/${locale}/insights` },
      { "@type": "ListItem", position: 3, name: post.category, item: `https://sheetalelectrotech.com/${locale}/insights#${post.category.replace(/ /g, "-").toLowerCase()}` },
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
    <main className="min-h-screen bg-paper pt-32 pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      <div className="container-wide">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-steel hover:text-accent text-sm font-medium mb-10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Insights
          </Link>

          <div className="grid lg:grid-cols-[minmax(0,1fr)_280px] gap-12 lg:gap-20">
            <article>
              <header className="mb-12">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="px-3 py-1.5 bg-accent/10 text-accent text-[10px] font-mono uppercase tracking-widest">
                    {post.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-steel">
                    <Clock3 className="w-3.5 h-3.5" />
                    {minutes} min read
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-steel/70">
                    Updated {displayDate(post.dateModified)}
                  </span>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-medium tracking-tight leading-[.98] mb-7">
                  {post.title}
                </h1>

                <p className="max-w-3xl text-lg md:text-xl text-steel leading-relaxed">
                  {post.excerpt}
                </p>
              </header>

              <section className="border border-steel/10 bg-mist/50 p-7 md:p-9 mb-12">
                <div className="flex items-center gap-2 text-accent mb-5">
                  <ListTree className="w-4 h-4" />
                  <p className="font-mono text-[10px] uppercase tracking-[.2em]">Key takeaways</p>
                </div>
                <ul className="space-y-3">
                  {post.keyTakeaways.map((takeaway) => (
                    <li key={takeaway} className="flex gap-3 text-sm md:text-base text-ink/80 leading-relaxed">
                      <span className="mt-2 h-1.5 w-1.5 bg-accent shrink-0" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {post.pullQuote && (
                <blockquote className="my-12 border-y border-steel/10 py-8">
                  <div className="flex gap-4 items-start">
                    <Quote className="w-7 h-7 text-accent shrink-0 mt-1" />
                    <p className="text-2xl md:text-3xl font-display leading-tight text-ink">
                      {post.pullQuote}
                    </p>
                  </div>
                </blockquote>
              )}

              {post.visuals?.length ? (
                <div className="grid md:grid-cols-2 gap-4 mb-14">
                  {post.visuals.map((visual, index) => (
                    <figure key={visual.src} className={post.visuals && post.visuals.length === 1 ? "md:col-span-2" : ""}>
                      <div className="relative aspect-[16/10] overflow-hidden bg-mist border border-steel/10">
                        <Image
                          src={visual.src}
                          alt={visual.title}
                          fill
                          priority={index === 0}
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover"
                        />
                      </div>
                      <figcaption className="mt-3 text-xs text-steel leading-relaxed">{visual.caption}</figcaption>
                    </figure>
                  ))}
                </div>
              ) : null}

              <div className="border-t border-steel/10 pt-12">
                <div className="max-w-3xl prose prose-lg prose-slate
                  prose-headings:font-display prose-headings:font-medium prose-headings:text-ink prose-headings:tracking-tight
                  prose-h2:text-3xl prose-h2:mt-14 prose-h2:mb-5 prose-h2:pb-4 prose-h2:border-b prose-h2:border-slate-200
                  prose-p:text-ink/80 prose-p:leading-[1.9]
                  prose-ul:my-8 prose-ul:space-y-3 prose-ul:pl-6
                  prose-li:text-ink/80 prose-li:leading-[1.75]
                  prose-strong:text-ink prose-strong:font-medium
                ">
                  {post.content.map(([heading, ...paragraphs], index) => {
                    const title = heading.replace(/^##\s*/, "");
                    const id = slugifyHeading(title);
                    return (
                      <section key={heading + index} id={id} className="scroll-mt-28">
                        <h2>{title}</h2>
                        {paragraphs.map((paragraph, paragraphIndex) => (
                          <div key={paragraph + paragraphIndex}>
                            {renderParagraph(paragraph)}
                          </div>
                        ))}
                      </section>
                    );
                  })}
                </div>
              </div>

              {post.faq?.length ? (
                <section className="mt-16 max-w-3xl">
                  <div className="mb-6">
                    <p className="font-mono text-[10px] uppercase tracking-[.2em] text-accent mb-2">Frequently asked questions</p>
                    <h2 className="text-3xl font-display font-medium">Common questions</h2>
                  </div>
                  <div className="space-y-3">
                    {post.faq.map((item) => (
                      <details key={item.q} className="group border border-steel/10 bg-white px-6 py-5">
                        <summary className="cursor-pointer list-none flex items-center justify-between gap-5 font-medium">
                          <span>{item.q}</span>
                          <span className="text-accent text-xl leading-none group-open:rotate-45 transition-transform">+</span>
                        </summary>
                        <p className="pt-4 pr-8 text-sm text-steel leading-relaxed">{item.a}</p>
                      </details>
                    ))}
                  </div>
                </section>
              ) : null}

              <section className="mt-16 max-w-3xl border border-steel/10 bg-mist/40 p-7 md:p-9">
                <h2 className="text-xs font-mono uppercase tracking-widest text-steel mb-6 flex items-center gap-2">
                  <Package className="w-4 h-4 text-accent" />
                  Explore related products
                </h2>
                <div className="flex flex-wrap gap-3">
                  {(post.relatedProducts ?? []).map((product) => (
                    <Link
                      key={product.name}
                      href={product.href}
                      className="group inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-steel/10 text-sm font-medium text-ink hover:border-accent hover:text-accent transition-colors"
                    >
                      {product.name}
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ))}
                </div>
              </section>

              {related.length ? (
                <section className="mt-12 max-w-3xl">
                  <div className="flex items-end justify-between gap-6 mb-6">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[.2em] text-accent mb-2">Keep reading</p>
                      <h2 className="text-3xl font-display font-medium">Related {post.category}</h2>
                    </div>
                    <Link href="/insights" className="hidden sm:inline-flex items-center gap-2 text-accent text-sm font-medium">
                      All insights <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    {related.slice(0, 3).map((item) => (
                      <Link
                        key={item.slug}
                        href={`/insights/${item.slug}`}
                        className="group bg-white border border-steel/10 overflow-hidden hover:border-accent/40 hover:shadow-md transition-all"
                      >
                        {legacyImageFor(item.slug) && (
                          <div className="relative aspect-[4/3] bg-mist overflow-hidden">
                            <Image
                              src={legacyImageFor(item.slug)!}
                              alt={item.title}
                              fill
                              sizes="(max-width: 768px) 33vw"
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        )}
                        <div className="p-5">
                          <p className="font-mono text-[10px] uppercase tracking-widest text-steel mb-3">
                            {readingTime(item)} min read
                          </p>
                          <h3 className="font-display text-lg font-medium leading-tight group-hover:text-accent transition-colors">
                            {item.title}
                          </h3>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              ) : null}

              <section className="mt-12 max-w-3xl bg-ink text-white p-8 md:p-10">
                <p className="font-mono text-[10px] uppercase tracking-[.2em] text-accent mb-4">
                  Source context
                </p>
                <h2 className="text-3xl md:text-4xl font-display font-medium text-white mb-4">
                  Discuss your manufacturing requirement.
                </h2>
                <p className="text-white/65 leading-relaxed max-w-2xl mb-7">
                  Share a drawing, product reference or manufacturing requirement and our team can review the relevant capability with you.
                </p>
                <Link
                  href="/rfq"
                  className="inline-flex items-center gap-2 text-accent font-medium uppercase tracking-wider text-sm hover:text-white transition-colors"
                >
                  Request a Quote
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </section>

              <div className="mt-8 flex flex-wrap gap-4 justify-between border-t border-steel/10 pt-5 text-[10px] font-mono uppercase tracking-widest text-steel/60">
                <span>Official Sheetal Electrotech knowledge archive</span>
                <a href={post.sourceUrl} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">
                  View source
                </a>
              </div>
            </article>

            {headings.length >= 3 && (
              <aside className="hidden lg:block">
                <div className="sticky top-32 border-l border-steel/10 pl-6">
                  <p className="font-mono text-[10px] uppercase tracking-[.2em] text-steel mb-5">On this page</p>
                  <nav className="space-y-3">
                    {headings.map((heading, index) => (
                      <a
                        key={heading.id}
                        href={`#${heading.id}`}
                        className="block text-sm text-steel hover:text-accent transition-colors leading-relaxed"
                      >
                        <span className="font-mono text-[10px] text-steel/50 mr-2">{String(index + 1).padStart(2, "0")}</span>
                        {heading.label}
                      </a>
                    ))}
                  </nav>
                </div>
              </aside>
            )}
          </div>

          {headings.length >= 3 && (
            <details className="lg:hidden mt-12 border border-steel/10 bg-white">
              <summary className="cursor-pointer list-none px-5 py-4 flex items-center justify-between font-medium">
                <span className="inline-flex items-center gap-2">
                  <ListTree className="w-4 h-4 text-accent" />
                  Table of contents
                </span>
                <span className="text-accent">+</span>
              </summary>
              <nav className="px-5 pb-5 space-y-3">
                {headings.map((heading, index) => (
                  <a key={heading.id} href={`#${heading.id}`} className="block text-sm text-steel hover:text-accent leading-relaxed">
                    <span className="font-mono text-[10px] text-steel/50 mr-2">{String(index + 1).padStart(2, "0")}</span>
                    {heading.label}
                  </a>
                ))}
              </nav>
            </details>
          )}
        </div>
      </div>
    </main>
  );
}

function legacyImageFor(slug: string) {
  return legacyInsightImages[slug]?.[0] ?? null;
}
