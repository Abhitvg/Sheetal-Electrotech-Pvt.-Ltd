import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ArrowRight, ArrowUpRight, BookOpen, Factory, Settings2 } from "lucide-react";
import { insights } from "@/data/insights";
import type { Metadata } from "next";
import { getPageCopy, localizedMetadata } from "@/lib/seo";
import { legacyInsightImages } from "@/data/legacyMedia";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return localizedMetadata(locale, "/insights", getPageCopy("insights"));
}

const CATEGORY_ICONS: Record<string, any> = {
  "LED Knowledge": BookOpen,
  "Manufacturing": Factory,
  "Product & Engineering": Settings2,
};

const CATEGORY_ORDER = ["LED Knowledge", "Manufacturing", "Product & Engineering"] as const;

function readingTime(content: [string, ...string[]][]) {
  const text = content.flat().join(" ");
  const words = text.replace(/[*_#]/g, "").split(/\\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default function InsightsIndexPage() {
  const groupedInsights = insights.reduce((acc, post) => {
    if (!acc[post.category]) acc[post.category] = [];
    acc[post.category].push(post);
    return acc;
  }, {} as Record<string, typeof insights>);

  const categories = CATEGORY_ORDER.filter(
    (category) => (groupedInsights[category]?.length ?? 0) > 0
  );
  const featured = insights.find((post) => post.slug === "benefits-of-led-lighting") ?? insights[0];
  const featuredImage = featured ? legacyInsightImages[featured.slug]?.[0] : undefined;

  return (
    <main className="min-h-screen bg-paper text-ink">
      <section className="relative overflow-hidden bg-[#071322] text-white">
        <div className="absolute inset-0 opacity-40 bg-[linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute -left-36 -top-48 h-[420px] w-[420px] rounded-full border border-white/5" />
        <div className="absolute -right-40 bottom-[-220px] h-[520px] w-[520px] rounded-full border border-white/5" />
        <div className="relative z-10 container-wide pt-32 md:pt-40 pb-20 md:pb-28">
          <div className="max-w-5xl">
            <p className="font-mono text-accent text-xs md:text-sm uppercase tracking-[.22em] mb-5">
              Sheetal Electrotech · Insights & Knowledge
            </p>
            <h1 className="text-5xl md:text-7xl xl:text-[88px] font-display font-medium leading-[.93] tracking-tight">
              Manufacturing.
              <span className="block text-white/45">Lighting.</span>
              <span className="block">Engineering.</span>
            </h1>
            <p className="mt-8 max-w-3xl text-white/65 text-lg md:text-xl leading-relaxed">
              Practical, source-based knowledge from the official Sheetal Electrotech archive—covering LED lighting, manufacturing processes and product engineering.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              {categories.map((category) => (
                <a
                  key={category}
                  href={`#${category.replace(/ /g, "-").toLowerCase()}`}
                  className="inline-flex items-center gap-2 border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                >
                  {category}
                  <span aria-hidden="true" className="text-accent">↓</span>
                </a>
              ))}
            </div>
          </div>

          <div className="mt-14 pt-7 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl">
            <div>
              <p className="font-display text-3xl md:text-4xl">{insights.length}</p>
              <p className="text-white/40 text-xs uppercase tracking-widest mt-1">Articles</p>
            </div>
            <div>
              <p className="font-display text-3xl md:text-4xl">{categories.length}</p>
              <p className="text-white/40 text-xs uppercase tracking-widest mt-1">Knowledge Areas</p>
            </div>
            <div>
              <p className="font-display text-3xl md:text-4xl">9</p>
              <p className="text-white/40 text-xs uppercase tracking-widest mt-1">Capabilities</p>
            </div>
            <div>
              <p className="font-display text-3xl md:text-4xl">25+</p>
              <p className="text-white/40 text-xs uppercase tracking-widest mt-1">Years</p>
            </div>
          </div>
        </div>
      </section>

      {featured && (
        <section className="py-20 md:py-28 border-b border-steel/10">
          <div className="container-wide">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
              <div>
                <p className="font-mono text-accent text-xs uppercase tracking-[.2em] mb-3">Featured knowledge</p>
                <h2 className="text-3xl md:text-5xl font-display font-medium">Start with the fundamentals.</h2>
              </div>
              <Link
                href={`/insights/${featured.slug}`}
                className="inline-flex items-center gap-2 text-accent text-sm font-medium uppercase tracking-wider"
              >
                Read featured article <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <Link href={`/insights/${featured.slug}`} className="group grid lg:grid-cols-[1.12fr_.88fr] bg-ink text-white overflow-hidden">
              <div className="relative min-h-[360px] lg:min-h-[500px] bg-mist overflow-hidden">
                {featuredImage ? (
                  <Image
                    src={featuredImage}
                    alt={`${featured.title} — official Sheetal Electrotech source image`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 56vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-full w-full bg-mist" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#071322]/75 via-transparent to-transparent" />
                <div className="absolute left-6 top-6 flex items-center gap-2">
                  <span className="px-3 py-1.5 border border-white/20 bg-black/20 backdrop-blur-sm font-mono text-[10px] uppercase tracking-widest">
                    {featured.category}
                  </span>
                  <span className="px-3 py-1.5 border border-white/20 bg-black/20 backdrop-blur-sm font-mono text-[10px] uppercase tracking-widest">
                    {readingTime(featured.content)} min read
                  </span>
                </div>
              </div>

              <div className="p-8 md:p-12 lg:p-14 flex flex-col justify-between">
                <div>
                  <p className="font-mono text-accent text-[10px] uppercase tracking-widest mb-5">01 · Featured article</p>
                  <h3 className="text-3xl md:text-5xl font-display font-medium leading-tight mb-6">{featured.title}</h3>
                  <p className="text-white/65 text-base md:text-lg leading-relaxed">{featured.excerpt}</p>
                </div>

                <div className="mt-10 grid gap-3">
                  {featured.keyStat && (
                    <div className="border border-white/10 bg-white/5 p-5">
                      <p className="font-mono text-[10px] uppercase tracking-widest text-accent mb-2">Key stat</p>
                      <p className="text-2xl md:text-3xl font-display font-medium">{featured.keyStat}</p>
                    </div>
                  )}
                  {featured.pullQuote && (
                    <blockquote className="border-l-2 border-accent pl-5 text-white/75 text-sm md:text-base leading-relaxed">
                      “{featured.pullQuote}”
                    </blockquote>
                  )}
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      <section className="py-20 md:py-28">
        <div className="container-wide">
          <div className="grid lg:grid-cols-[220px_1fr] gap-12 lg:gap-16">
            <aside className="hidden lg:block">
              <div className="sticky top-32">
                <p className="text-xs font-mono uppercase tracking-widest text-steel mb-6">Explore</p>
                <nav className="border-l border-steel/10">
                  {categories.map((category) => (
                    <a
                      key={category}
                      href={`#${category.replace(/ /g, "-").toLowerCase()}`}
                      className="block py-2 pl-5 -ml-px border-l border-transparent text-sm text-steel hover:text-ink hover:border-accent transition-colors"
                    >
                      {category}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            <div className="space-y-24">
              {categories.map((category) => {
                const posts = groupedInsights[category] ?? [];
                const Icon = CATEGORY_ICONS[category];
                return (
                  <section
                    key={category}
                    id={category.replace(/ /g, "-").toLowerCase()}
                    className="scroll-mt-28"
                  >
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-9">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-mist border border-steel/10 flex items-center justify-center text-accent">
                          <Icon className="w-5 h-5" strokeWidth={1.6} />
                        </div>
                        <div>
                          <p className="text-[10px] font-mono uppercase tracking-widest text-steel mb-1">
                            {String(posts.length).padStart(2, "0")} articles
                          </p>
                          <h2 className="text-3xl md:text-4xl font-display font-medium">{category}</h2>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      {posts.map((post, index) => {
                        const image = legacyInsightImages[post.slug]?.[0];
                        const minutes = readingTime(post.content);
                        return (
                          <Link
                            key={post.slug}
                            href={`/insights/${post.slug}`}
                            className="group bg-white border border-steel/10 overflow-hidden hover:border-accent/40 hover:shadow-xl transition-all duration-300"
                          >
                            <div className="relative">
                              {image ? (
                                <div className="aspect-[16/9] relative bg-mist overflow-hidden">
                                  <Image
                                    src={image}
                                    alt={`${post.title} — official source image`}
                                    fill
                                    priority={index < 2}
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                  />
                                </div>
                              ) : (
                                <div className="aspect-[16/9] bg-mist" />
                              )}
                              <div className="absolute left-4 top-4 flex items-center gap-2">
                                <span className="px-2.5 py-1 bg-ink text-white text-[10px] font-mono uppercase tracking-widest">
                                  {category}
                                </span>
                                <span className="px-2.5 py-1 bg-white/90 text-ink text-[10px] font-mono uppercase tracking-widest backdrop-blur-sm">
                                  {minutes} min
                                </span>
                              </div>
                            </div>

                            <div className="p-7 md:p-8">
                              <div className="flex items-start justify-between gap-4 mb-4">
                                <p className="font-mono text-[10px] uppercase tracking-widest text-steel">
                                  {String(index + 1).padStart(2, "0")} · Knowledge
                                </p>
                                <ArrowUpRight className="w-4 h-4 text-steel group-hover:text-accent transition-colors shrink-0" />
                              </div>
                              <h3 className="text-xl md:text-2xl font-display font-medium leading-tight group-hover:text-accent transition-colors">
                                {post.title}
                              </h3>
                              <p className="mt-4 text-steel text-sm leading-relaxed">{post.excerpt}</p>

                              {post.keyTakeaways[0] && (
                                <p className="mt-6 border-l-2 border-accent pl-4 text-xs leading-relaxed text-ink/70">
                                  <span className="font-semibold text-ink">Key takeaway:</span> {post.keyTakeaways[0]}
                                </p>
                              )}

                              <div className="mt-7 pt-5 border-t border-steel/10 flex items-center justify-between gap-4">
                                <span className="text-sm font-medium text-ink">Read article <span className="text-accent">→</span></span>
                                <span className="text-[10px] font-mono uppercase tracking-widest text-steel/60">
                                  Updated {new Date(post.dateModified + "T00:00:00Z").toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" })}
                                </span>
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
