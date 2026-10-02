import { Link } from "@/i18n/routing";
import { ArrowLeft, ArrowRight, Package } from "lucide-react";
import { insights } from "@/data/insights";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { localizedMetadata } from "@/lib/seo";
import { routing } from "@/i18n/routing";
import { legacyInsightImages } from "@/data/legacyMedia";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    insights.map((post) => ({ locale, slug: post.slug }))
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = insights.find((p) => p.slug === slug);
  if (!post) return { title: "Insight Not Found" };
  return localizedMetadata(locale, `/insights/${slug}`, {
    en: { title: `${post.title} | Sheetal Electrotech Insights`, description: post.excerpt },
    hi: { title: `${post.title} | शीतल इलेक्ट्रो-टेक अंतर्दृष्टि`, description: post.excerpt },
  });
}

export default async function InsightPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { slug } = await params;
  const post = insights.find((p) => p.slug === slug);

  if (!post) notFound();

  return (
    <main className="min-h-screen pt-32 pb-24 bg-paper">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto">
          {/* Back Link */}
          <Link href="/insights" className="inline-flex items-center gap-2 text-steel hover:text-accent text-sm font-medium mb-12 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Insights
          </Link>

          {/* Header */}
          <div className="mb-16">
            <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-mono uppercase tracking-wider rounded-sm mb-6">
              {post.category}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-ink leading-tight mb-8">
              {post.title}
            </h1>
            <p className="text-xl text-steel leading-relaxed">
              {post.excerpt}
            </p>
          </div>

          <div className="w-full h-[1px] bg-slate-200 mb-16" />
          {legacyInsightImages[post.slug]?.length ? (
            <div className="mb-16">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {(legacyInsightImages[post.slug] ?? []).slice(0, 3).map((src, index) => (
                  <div key={src} className="aspect-[4/3] bg-mist overflow-hidden border border-steel/10">
                    <img
                      src={src}
                      alt={`${post.title} — official source image ${index + 1}`}
                      loading={index === 0 ? "eager" : "lazy"}
                      onError={(event) => { event.currentTarget.style.visibility = "hidden"; }}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {/* Content */}
          <article className="prose prose-lg prose-slate max-w-none
            prose-headings:font-display prose-headings:font-medium prose-headings:text-ink prose-headings:tracking-tight
            prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:pb-4 prose-h2:border-b prose-h2:border-slate-200
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-ink/80 prose-p:leading-[1.85]
            prose-strong:text-ink prose-strong:font-medium
            prose-ul:my-8 prose-ul:space-y-3 prose-ul:pl-6
            prose-li:text-ink/80 prose-li:leading-[1.75]
            prose-a:text-accent prose-a:no-underline hover:prose-a:underline
          ">
            {(() => {
              const lines = post.content.split("\n").map((line) => line.trim()).filter(Boolean);
              const blocks: React.ReactNode[] = [];

              for (let i = 0; i < lines.length; i++) {
                const line = lines[i];

                if (line.startsWith("## ")) {
                  blocks.push(<h2 key={i}>{line.slice(3)}</h2>);
                  continue;
                }

                if (line.startsWith("### ")) {
                  blocks.push(<h3 key={i}>{line.slice(4)}</h3>);
                  continue;
                }

                if (line.startsWith("* ")) {
                  const items: React.ReactNode[] = [];
                  while (i < lines.length && lines[i].startsWith("* ")) {
                    const item = lines[i].slice(2);
                    const match = item.match(/^\*\*(.+?)\*\*(.*)$/);
                    items.push(
                      <li key={`${i}-item`}>
                        {match ? <><strong>{match[1]}</strong>{match[2]}</> : item}
                      </li>
                    );
                    i++;
                  }
                  i--;
                  blocks.push(<ul key={`list-${i}`}>{items}</ul>);
                  continue;
                }

                blocks.push(<p key={i}>{line}</p>);
              }

              return blocks;
            })()}
          </article>

          <div className="mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-y border-steel/10 py-5 text-xs text-steel">
            <span className="font-mono uppercase tracking-widest">Source: Official Sheetal Electrotech legacy knowledge archive</span>
            <span className="font-mono uppercase tracking-widest">{post.category}</span>
          </div>

          {/* Related Products / CTA */}
          {post.relatedProducts && post.relatedProducts.length > 0 && (
            <div className="mt-20 p-8 border border-slate-200 bg-white">
              <h3 className="text-xs font-mono uppercase tracking-widest text-steel mb-6 flex items-center gap-2">
                <Package className="w-4 h-4" />
                Explore Related Products
              </h3>
              <div className="flex flex-wrap gap-3">
                {post.relatedProducts.map((product) => (
                  <Link 
                    key={product.name} 
                    href={product.href}
                    className="px-4 py-2 bg-slate-50 border border-slate-200 text-sm font-medium text-ink hover:text-accent hover:border-accent hover:shadow-sm transition-all group flex items-center gap-2"
                  >
                    {product.name}
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 p-10 bg-ink text-white">
            <h3 className="font-display font-medium text-3xl mb-4">Discuss your requirements</h3>
            <p className="text-white/70 mb-8 max-w-lg">
              Our engineering team is ready to review your specifications and provide technical guidance for your manufacturing project.
            </p>
            <Link href="/rfq" className="inline-flex items-center gap-2 text-accent font-mono text-sm uppercase tracking-wider hover:text-white transition-colors group">
              Contact Engineering <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
