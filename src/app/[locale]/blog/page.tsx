import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, ArrowLeft } from "lucide-react";
import { blogPosts } from "@/data/blog";

export const metadata = {
  title: "Blog & Insights | Sheetal Electrotech",
  description: "Industry insights, manufacturing best practices, and company news from Sheetal Electrotech — your trusted OEM manufacturing partner.",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen pt-32 pb-24">
      <div className="container-wide">
        {/* Header */}
        <div className="mb-16">
          <Link href="/" className="inline-flex items-center gap-2 text-steel hover:text-accent text-sm font-medium mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="font-display font-bold text-4xl md:text-6xl text-ink tracking-tight mb-6">
            Blog & Insights
          </h1>
          <p className="text-lg text-steel max-w-2xl">
            Industry insights, manufacturing best practices, and company news
            from our engineering and business teams.
          </p>
        </div>

        {/* Featured Post */}
        <Link href={`/blog/${blogPosts[0].slug}`} className="group block mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white border border-slate-200 rounded-sm overflow-hidden hover:border-accent/50 hover:shadow-lg transition-all duration-300">
            <div className="relative h-64 md:h-auto">
              <Image
                src={blogPosts[0].image}
                alt={blogPosts[0].title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-mono uppercase tracking-wider rounded-sm mb-4 w-fit">
                {blogPosts[0].category}
              </span>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-ink mb-4 group-hover:text-accent transition-colors">
                {blogPosts[0].title}
              </h2>
              <p className="text-steel mb-6 leading-relaxed">
                {blogPosts[0].excerpt}
              </p>
              <div className="flex items-center gap-6 text-sm text-steel">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {new Date(blogPosts[0].date).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {blogPosts[0].readTime}
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* All Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block bg-white border border-slate-200 rounded-sm overflow-hidden hover:border-accent/50 hover:shadow-lg transition-all duration-300">
              <div className="relative h-48">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-accent text-xs font-mono uppercase tracking-wider rounded-sm">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-display font-bold text-ink mb-3 group-hover:text-accent transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-steel text-sm mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-steel">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.date).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                  <span className="flex items-center gap-1 text-accent font-medium group-hover:gap-2 transition-all">
                    Read More <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
