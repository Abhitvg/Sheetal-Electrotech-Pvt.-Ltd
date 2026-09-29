import { Link } from "@/i18n/routing";
import { ArrowLeft, ArrowRight, Package } from "lucide-react";
import { insights } from "@/data/insights";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { localizedMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return insights.map((post) => ({ slug: post.slug }));
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

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
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

          {/* Content */}
          <article className="prose prose-lg prose-slate max-w-none
            prose-headings:font-display prose-headings:font-medium prose-headings:text-ink prose-headings:tracking-tight
            prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:pb-4 prose-h2:border-b prose-h2:border-slate-200
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-ink/80 prose-p:leading-[1.8]
            prose-strong:text-ink prose-strong:font-medium
            prose-ul:list-none prose-ul:pl-0
            prose-li:text-ink/80 prose-li:relative prose-li:pl-6
            prose-a:text-accent prose-a:no-underline hover:prose-a:underline
            [&_li]:before:content-[''] [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-3 [&_li]:before:w-1.5 [&_li]:before:h-1.5 [&_li]:before:bg-accent [&_li]:before:rounded-sm
          ">
            {/* Custom markdown renderer for basic formatting */}
            {post.content.split("\n").map((line, i) => {
              const trimmed = line.trim();
              if (!trimmed) return null;
              
              if (trimmed.startsWith("## ")) {
                return <h2 key={i}>{trimmed.slice(3)}</h2>;
              }
              if (trimmed.startsWith("### ")) {
                return <h3 key={i}>{trimmed.slice(4)}</h3>;
              }
              if (trimmed.startsWith("* **")) {
                const match = trimmed.match(/\*\s\*\*(.+?)\*\*(.*)/);
                if (match) {
                  return <li key={i}><strong>{match[1]}</strong>{match[2]}</li>;
                }
              }
              if (trimmed.startsWith("* ")) {
                return <li key={i}>{trimmed.slice(2)}</li>;
              }
              
              return <p key={i}>{trimmed}</p>;
            })}
          </article>

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
