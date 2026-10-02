import { Link } from "@/i18n/routing";
import { ArrowLeft, ArrowRight, Package } from "lucide-react";
import { insights } from "@/data/insights";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

export const dynamic = "force-static";
export const revalidate = 3600;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    insights.map((post) => ({ locale, slug: post.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = insights.find((item) => item.slug === slug);

  if (!post) {
    return {
      title: "Insight Not Found | Sheetal Electrotech",
      description: "Sheetal Electrotech technical knowledge and manufacturing insights.",
    };
  }

  return {
    title: `${post.title} | Sheetal Electrotech Insights`,
    description: post.excerpt,
    alternates: {
      canonical: `https://sheetalelectrotech.com/en/insights/${slug}`,
    },
  };
}

function renderContent(content: string) {
  const lines = content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

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
            {match ? (
              <>
                <strong>{match[1]}</strong>
                {match[2]}
              </>
            ) : (
              item
            )}
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
}

export default async function InsightPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const post = insights.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-paper pt-32 pb-24">
      <div className="container-wide">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-steel hover:text-accent text-sm font-medium mb-12 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Insights
          </Link>

          <header className="mb-14">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-3 py-1.5 bg-accent/10 text-accent text-[10px] font-mono uppercase tracking-widest">
                {post.category}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-steel/60">
                Technical Knowledge
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-medium tracking-tight leading-[.98] mb-7">
              {post.title}
            </h1>

            <p className="max-w-3xl text-lg md:text-xl text-steel leading-relaxed">
              {post.excerpt}
            </p>
          </header>

          <div className="border-t border-steel/10 pt-12">
            <article className="max-w-3xl prose prose-lg prose-slate
              prose-headings:font-display prose-headings:font-medium prose-headings:text-ink prose-headings:tracking-tight
              prose-h2:text-3xl prose-h2:mt-14 prose-h2:mb-6 prose-h2:pb-4 prose-h2:border-b prose-h2:border-slate-200
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
              prose-p:text-ink/80 prose-p:leading-[1.85]
              prose-ul:my-8 prose-ul:space-y-3 prose-ul:pl-6
              prose-li:text-ink/80 prose-li:leading-[1.75]
              prose-strong:text-ink prose-strong:font-medium
              prose-a:text-accent
            ">
              {renderContent(post.content)}
            </article>
          </div>

          {post.relatedProducts?.length ? (
            <section className="mt-16 max-w-3xl border border-steel/10 bg-mist/40 p-7 md:p-9">
              <h2 className="text-xs font-mono uppercase tracking-widest text-steel mb-6 flex items-center gap-2">
                <Package className="w-4 h-4 text-accent" />
                Explore related products
              </h2>

              <div className="flex flex-wrap gap-3">
                {post.relatedProducts.map((product) => (
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
          ) : null}

          <section className="mt-10 max-w-3xl bg-ink text-white p-8 md:p-10">
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
            <span>{post.category}</span>
          </div>
        </div>
      </div>
    </main>
  );
}
