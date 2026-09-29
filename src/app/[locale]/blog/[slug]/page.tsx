import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} | Sheetal Electrotech Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) notFound();

  return (
    <main className="min-h-screen pt-32 pb-24">
      {/* Hero Image */}
      <div className="relative h-[40vh] md:h-[50vh] mb-12">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b192c] via-[#0b192c]/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="container-wide">
            <span className="inline-block px-3 py-1 bg-accent text-white text-xs font-mono uppercase tracking-wider rounded-sm mb-4">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-white max-w-4xl leading-tight">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="container-wide">
        <div className="max-w-3xl mx-auto">
          {/* Back Link */}
          <Link href="/blog" className="inline-flex items-center gap-2 text-steel hover:text-accent text-sm font-medium mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-steel mb-12 pb-8 border-b border-slate-200">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>

          {/* Content */}
          <article className="prose prose-lg prose-slate max-w-none
            prose-headings:font-display prose-headings:text-ink prose-headings:tracking-tight
            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-ink/80 prose-p:leading-[1.8]
            prose-strong:text-ink
            prose-li:text-ink/80
            prose-a:text-accent prose-a:no-underline hover:prose-a:underline
          ">
            {post.content.split("\n").map((line, i) => {
              const trimmed = line.trim();
              if (!trimmed) return null;
              if (trimmed.startsWith("## ")) {
                return <h2 key={i}>{trimmed.slice(3)}</h2>;
              }
              if (trimmed.startsWith("### ")) {
                return <h3 key={i}>{trimmed.slice(4)}</h3>;
              }
              if (trimmed.startsWith("- **")) {
                const match = trimmed.match(/- \*\*(.+?)\*\* — (.+)/);
                if (match) {
                  return <li key={i}><strong>{match[1]}</strong> — {match[2]}</li>;
                }
              }
              if (trimmed.startsWith("- ")) {
                return <li key={i}>{trimmed.slice(2)}</li>;
              }
              if (trimmed.match(/^\d+\.\s\*\*/)) {
                const match = trimmed.match(/^\d+\.\s\*\*(.+?)\*\*\s*—?\s*(.*)/);
                if (match) {
                  return <p key={i}><strong>{match[1]}</strong> {match[2] ? `— ${match[2]}` : ""}</p>;
                }
              }
              return <p key={i}>{trimmed}</p>;
            })}
          </article>

          {/* CTA */}
          <div className="mt-16 p-8 bg-ink text-white rounded-sm">
            <h3 className="font-display font-bold text-2xl mb-3">Ready to Manufacture?</h3>
            <p className="text-white/70 mb-6">
              Get a custom quote for your LED lighting or packaging project.
            </p>
            <Link href="/rfq" className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-display font-bold text-sm uppercase tracking-wider hover:bg-blue-600 transition-colors rounded-sm">
              Request Quote
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
