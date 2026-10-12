"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, Check, Copy, Sparkles, ShieldCheck } from "lucide-react";

export interface FaqItem {
  question: string;
  answer: string;
  topic: string;
}

interface InsightsFaqAccordionProps {
  faqs: FaqItem[];
}

export default function InsightsFaqAccordion({ faqs }: InsightsFaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeTopic, setActiveTopic] = useState<string>("All");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const topics = ["All", ...Array.from(new Set(faqs.map((f) => f.topic)))];

  const filteredFaqs = activeTopic === "All"
    ? faqs
    : faqs.filter((f) => f.topic === activeTopic);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const copyAnswer = (text: string, idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="w-full">
      {/* Topic Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        <span className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1 mr-1">
          <Sparkles className="w-3.5 h-3.5 text-accent" /> Filter Topics:
        </span>
        {topics.map((t) => (
          <button
            key={t}
            onClick={() => {
              setActiveTopic(t);
              setOpenIndex(0);
            }}
            className={`text-xs px-3 py-1.5 rounded-sm border transition-all ${
              activeTopic === t
                ? "bg-ink text-white border-ink font-semibold"
                : "bg-paper text-slate-600 border-slate-200 hover:border-accent hover:text-ink"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {filteredFaqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={faq.question}
              className={`border transition-all duration-300 rounded-sm overflow-hidden ${
                isOpen
                  ? "bg-white border-accent/60 shadow-md ring-1 ring-accent/15"
                  : "bg-white border-slate-200 hover:border-slate-300"
              }`}
            >
              <button
                onClick={() => toggle(index)}
                className="w-full text-left p-6 md:p-7 flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
                aria-expanded={isOpen}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`mt-0.5 p-1 rounded-sm shrink-0 transition-colors ${
                      isOpen ? "bg-accent/15 text-accent" : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="inline-block px-2 py-0.5 mb-2 text-[10px] font-mono uppercase tracking-wider font-semibold bg-slate-100 text-slate-600 border border-slate-200/80 rounded-xs">
                      {faq.topic}
                    </span>
                    <h3
                      className={`text-base md:text-lg font-display font-bold leading-snug transition-colors ${
                        isOpen ? "text-accent" : "text-ink"
                      }`}
                    >
                      {faq.question}
                    </h3>
                  </div>
                </div>

                <div
                  className={`p-1.5 rounded-sm shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180 bg-accent text-ink" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-6 md:px-7 pb-6 pt-1 border-t border-slate-100">
                  <div className="bg-slate-50/70 p-5 rounded-sm border-l-2 border-accent text-slate-700 text-sm md:text-base leading-relaxed font-sans mb-4">
                    {faq.answer}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400 pt-2">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                      Verified by Sheetal Electrotech Technical Directorate
                    </span>
                    <button
                      onClick={(e) => copyAnswer(faq.answer, index, e)}
                      className="inline-flex items-center gap-1 text-accent hover:text-ink font-semibold transition-colors"
                      title="Copy authoritative answer to clipboard"
                    >
                      {copiedIndex === index ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-600">Copied to Clipboard!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Answer for RFP</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
