import { Link } from "@/i18n/routing";
import { ArrowRight, BookOpen, Factory, Settings2, Package } from "lucide-react";
import { insights } from "@/data/insights";
import type { Metadata } from "next";
import { getPageCopy, localizedMetadata } from "@/lib/seo";
import { legacyInsightImages } from "@/data/legacyMedia";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return localizedMetadata(locale, "/insights", getPageCopy("insights"));
}

const CATEGORY_ICONS: Record<string, any> = {
  "LED Knowledge": BookOpen,
  "Manufacturing": Factory,
  "Product & Engineering": Settings2,
  "Packaging": Package,
};

export default function InsightsIndexPage() {
  // Group insights by category
  const groupedInsights = insights.reduce((acc, post) => {
    if (!acc[post.category]) acc[post.category] = [];
    acc[post.category].push(post);
    return acc;
  }, {} as Record<string, typeof insights>);

  const categories = ["LED Knowledge", "Manufacturing", "Product & Engineering", "Packaging"];

  return (
    <main className="min-h-screen bg-paper pt-32 pb-24 text-ink">
      <div className="container-wide">
        {/* Header */}
        <div className="max-w-3xl mb-24">
          <p className="font-mono text-accent text-sm uppercase tracking-widest mb-6 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-accent inline-block"></span>
            Insights & Knowledge
          </p>
          <h1 className="text-5xl md:text-7xl font-display font-medium mb-8">
            Manufacturing & Technical Insights
          </h1>
          <p className="text-steel text-xl leading-relaxed">
            Practical information on LED lighting, manufacturing processes, product development, and the technologies behind our solutions.
          </p>
        </div>

        {/* Content Structure */}
        <div className="grid lg:grid-cols-12 gap-16">
          {/* Left Sidebar: Categories Navigation */}
          <div className="lg:col-span-3 hidden lg:block">
            <div className="sticky top-32">
              <h3 className="text-xs font-mono uppercase tracking-widest text-steel mb-8">Categories</h3>
              <nav className="flex flex-col gap-4 border-l border-slate-200">
                {categories.map((category) => (
                  <a 
                    key={category} 
                    href={`#${category.replace(/ /g, "-").toLowerCase()}`}
                    className="pl-6 text-ink/70 hover:text-accent transition-colors font-medium border-l border-transparent hover:border-accent -ml-[1px]"
                  >
                    {category}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Right Content: Articles by Category */}
          <div className="lg:col-span-9 space-y-24">
            {categories.map((category) => {
              const posts = groupedInsights[category];
              const Icon = CATEGORY_ICONS[category];

              return (
                <section key={category} id={category.replace(/ /g, "-").toLowerCase()} className="scroll-mt-32">
                  <div className="flex items-center gap-4 mb-10 pb-4 border-b border-slate-200">
                    <div className="w-12 h-12 bg-slate-100 flex items-center justify-center text-accent">
                      {Icon && <Icon className="w-5 h-5" />}
                    </div>
                    <h2 className="text-3xl font-display font-medium">{category}</h2>
                  </div>
                  
                  {posts && posts.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-6">
                      {posts.map((post) => (
                        <Link
                          key={post.slug}
                          href={`/insights/${post.slug}`}
                          className="group bg-white border border-slate-200 overflow-hidden hover:border-accent/50 hover:shadow-lg transition-all duration-300"
                        >
                          {legacyInsightImages[post.slug]?.[0] && (
                            <div className="aspect-[16/9] bg-mist overflow-hidden">
                              <img
                                src={legacyInsightImages[post.slug][0]}
                                alt={`${post.title} — official Sheetal Electrotech image`}
                                loading="lazy"
                                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                              />
                            </div>
                          )}
                          <div className="p-8">
                            <h3 className="text-xl font-medium mb-4 group-hover:text-accent transition-colors">{post.title}</h3>
                            <p className="text-steel text-sm leading-relaxed mb-8">{post.excerpt}</p>
                            <div className="flex items-center gap-2 text-xs font-medium text-accent">
                              Read Article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 bg-slate-50 border border-slate-200 border-dashed text-steel/70 text-sm">
                      Articles in this category are being updated from our legacy knowledge base.
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
