"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Search, X, ArrowUpRight, Clock, Calendar, BookOpen, Factory, Settings2, Filter, Sparkles, CheckCircle2 } from "lucide-react";
import type { InsightPost } from "@/data/insights";

interface InsightsExplorerProps {
  insights: InsightPost[];
  legacyInsightImages: Record<string, string[]>;
}

const CATEGORIES = ["All", "LED Knowledge", "Manufacturing", "Product & Engineering"] as const;
type CategoryType = (typeof CATEGORIES)[number];

const QUICK_TAGS = [
  { label: "BIS Standards", query: "bis" },
  { label: "SMT Assembly", query: "smt" },
  { label: "Color Temp (CCT)", query: "cct" },
  { label: "Injection Moulding", query: "injection" },
  { label: "Lumens & Efficacy", query: "lumens" },
  { label: "IP Protection", query: "ip" },
  { label: "Blow Moulding", query: "blow" },
  { label: "Quality Testing", query: "quality" },
];

function readingTime(post: InsightPost) {
  const text = post.content
    .flatMap(([heading, ...paragraphs]) => [heading, ...paragraphs])
    .join(" ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function formatDate(date: string) {
  return new Date(date + "T00:00:00Z").toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function InsightsExplorer({
  insights,
  legacyInsightImages,
}: InsightsExplorerProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "readTime" | "title">("featured");

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: insights.length };
    insights.forEach((post) => {
      counts[post.category] = (counts[post.category] || 0) + 1;
    });
    return counts;
  }, [insights]);

  // Filtered and sorted insights
  const filteredInsights = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return insights
      .filter((post) => {
        // Category filter
        if (selectedCategory !== "All" && post.category !== selectedCategory) {
          return false;
        }

        // Search query filter
        if (!q) return true;

        const titleMatch = post.title.toLowerCase().includes(q);
        const excerptMatch = post.excerpt.toLowerCase().includes(q);
        const categoryMatch = post.category.toLowerCase().includes(q);
        const takeawaysMatch = post.keyTakeaways.some((t) => t.toLowerCase().includes(q));
        const contentMatch = post.content.some(([h, ...paras]) =>
          h.toLowerCase().includes(q) || paras.some((p) => p.toLowerCase().includes(q))
        );

        return titleMatch || excerptMatch || categoryMatch || takeawaysMatch || contentMatch;
      })
      .sort((a, b) => {
        if (sortBy === "readTime") {
          return readingTime(a) - readingTime(b);
        }
        if (sortBy === "title") {
          return a.title.localeCompare(b.title);
        }
        return 0; // Default order in array
      });
  }, [insights, selectedCategory, searchQuery, sortBy]);

  const handleClear = () => {
    setSearchQuery("");
    setSelectedCategory("All");
  };

  return (
    <div className="w-full">
      {/* Controls & Search Console */}
      <div className="bg-white border border-slate-200/90 shadow-sm p-6 md:p-8 rounded-sm mb-10">
        
        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by keyword, BIS standards, tooling parameters, SMT assembly, CCT..."
            className="w-full pl-12 pr-10 py-3.5 bg-paper border border-slate-200 text-ink text-base rounded-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-slate-400 font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-ink transition-colors"
              aria-label="Clear search"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Quick Tags / Trending Topics */}
        <div className="flex flex-wrap items-center gap-2 mb-6 pt-1">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1 mr-1">
            <Sparkles className="w-3.5 h-3.5 text-accent" /> Topics:
          </span>
          {QUICK_TAGS.map((tag) => (
            <button
              key={tag.label}
              onClick={() => setSearchQuery(tag.query)}
              className={`text-xs px-2.5 py-1 rounded-sm border transition-all ${
                searchQuery.toLowerCase() === tag.query
                  ? "bg-accent text-ink border-accent font-semibold"
                  : "bg-paper text-slate-600 border-slate-200 hover:border-accent/50 hover:text-ink"
              }`}
            >
              #{tag.label}
            </button>
          ))}
        </div>

        {/* Categories Tab Row & Sort Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 border-t border-slate-100">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-xs md:text-sm font-medium rounded-sm border transition-all flex items-center gap-2 ${
                    isSelected
                      ? "bg-ink text-white border-ink shadow-sm"
                      : "bg-paper text-slate-700 border-slate-200 hover:border-slate-300 hover:text-ink"
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                      isSelected ? "bg-white/20 text-white" : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {categoryCounts[cat] || 0}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Sort Control */}
          <div className="flex items-center gap-2 text-xs text-slate-500 shrink-0">
            <span className="font-mono uppercase tracking-wider">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-paper border border-slate-200 text-ink py-1.5 px-3 rounded-sm text-xs focus:outline-none focus:border-accent cursor-pointer"
            >
              <option value="featured">Featured Order</option>
              <option value="readTime">Shortest Read</option>
              <option value="title">Alphabetical (A-Z)</option>
            </select>
          </div>

        </div>

      </div>

      {/* Results Meta Bar */}
      <div className="flex items-center justify-between mb-8 pb-3 border-b border-slate-200 text-sm text-slate-500 font-mono">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-accent" />
          <span>
            Showing <strong className="text-ink">{filteredInsights.length}</strong> of{" "}
            {insights.length} technical guides
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </span>
        </div>
        {(searchQuery || selectedCategory !== "All") && (
          <button
            onClick={handleClear}
            className="text-accent hover:underline text-xs flex items-center gap-1 uppercase tracking-wider"
          >
            Reset Filters ↺
          </button>
        )}
      </div>

      {/* Articles Grid */}
      {filteredInsights.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInsights.map((post, index) => {
            const image = legacyInsightImages[post.slug]?.[0];
            const minutes = readingTime(post);

            return (
              <Link
                key={post.slug}
                href={`/insights/${post.slug}`}
                className="group bg-white border border-slate-200/90 overflow-hidden hover:border-accent/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Article Thumbnail */}
                  <div className="relative aspect-[16/9] bg-slate-900 overflow-hidden">
                    {image ? (
                      <Image
                        src={image}
                        alt={`${post.title} — Sheetal Electrotech official engineering knowledge`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-500 text-xs font-mono">
                        Sheetal Electrotech Technical Archive
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Floating Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-2.5 py-1 bg-black/75 backdrop-blur-md text-white text-[10px] font-mono uppercase tracking-widest border border-white/10 rounded-sm">
                        {post.category}
                      </span>
                      <span className="px-2.5 py-1 bg-accent text-ink text-[10px] font-mono uppercase tracking-widest font-bold rounded-sm shadow-sm flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {minutes} min
                      </span>
                    </div>
                  </div>

                  {/* Article Content Header */}
                  <div className="p-6 md:p-7">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3">
                      <span>GUIDE #{String(index + 1).padStart(2, "0")}</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>{formatDate(post.dateModified)}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-display font-bold text-ink mb-3 group-hover:text-accent transition-colors leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Key takeaway highlight box */}
                    {post.keyTakeaways?.[0] && (
                      <div className="mt-4 p-3.5 bg-paper border-l-2 border-accent text-xs text-slate-700 leading-relaxed rounded-r-sm">
                        <p className="font-semibold text-ink text-[11px] uppercase tracking-wider mb-1 flex items-center gap-1 text-accent">
                          <CheckCircle2 className="w-3 h-3" /> Core Takeaway:
                        </p>
                        <p className="line-clamp-2">{post.keyTakeaways[0]}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="px-6 md:px-7 py-4 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-ink group-hover:bg-accent/5 transition-colors">
                  <span className="group-hover:text-accent flex items-center gap-1">
                    Read Technical Guide
                    <ArrowUpRight className="w-3.5 h-3.5 text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                  <span className="font-mono text-[11px] text-slate-400 font-normal">
                    Daman Hub
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        /* Empty Search State */
        <div className="bg-white border border-slate-200 p-12 text-center rounded-sm max-w-xl mx-auto my-12">
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
            <Search className="w-6 h-6" />
          </div>
          <h4 className="text-xl font-display font-bold text-ink mb-2">No Matching Technical Guides</h4>
          <p className="text-slate-600 text-sm mb-6">
            We couldn&apos;t find any articles matching &ldquo;{searchQuery}&rdquo;. Try another term or reset your filters.
          </p>
          <button
            onClick={handleClear}
            className="inline-flex items-center gap-2 bg-ink text-white px-6 py-2.5 text-xs font-mono uppercase tracking-widest rounded-sm hover:bg-accent hover:text-ink transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
}
