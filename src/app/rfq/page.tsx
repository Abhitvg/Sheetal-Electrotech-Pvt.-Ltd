"use client";

import { useState } from "react";
import { ArrowRight, Send, CheckCircle } from "lucide-react";

const productCategories = [
  "LED Bulbs",
  "LED Battens / Tube Lights",
  "LED Panels & Downlights",
  "Flood Lights",
  "Street Lights",
  "Custom LED OEM",
  "Injection Moulded Parts",
  "Blow Moulded Containers",
  "Custom Rigid Packaging",
];

export default function RFQPage() {
  const [submitted, setSubmitted] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [step, setStep] = useState(1);

  const toggleCategory = (cat: string) => {
    setSelected((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center">
        <div className="text-center max-w-lg px-6">
          <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-10 h-10 text-success" />
          </div>
          <h2 className="text-4xl font-display font-medium mb-4">RFQ Received.</h2>
          <p className="text-steel text-lg mb-8">
            Our technical team will review your specification and respond within <strong>48 business hours</strong> with a production-ready proposal.
          </p>
          <a href="/" className="bg-accent text-white px-8 py-4 font-medium hover:bg-orange-600 transition-colors inline-flex items-center gap-3">
            Return Home <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper">
      {/* Header */}
      <div className="bg-mist text-ink pt-36 pb-20">
        <div className="container-wide">
          <div className="max-w-3xl">
            <p className="font-mono text-accent text-sm uppercase tracking-widest mb-6 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-accent inline-block"></span>
              Start a Partnership
            </p>
            <h1 className="text-5xl md:text-7xl font-display font-medium mb-6">
              Request a Quote.
            </h1>
            <p className="text-white/60 text-xl max-w-2xl">
              Share your specification below and receive a detailed production proposal within 48 hours. No generic sales calls — a real engineering response.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="container-wide py-24">
        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-16">
          
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Step 1: Product Selection */}
            <div>
              <h3 className="font-display text-2xl font-medium mb-2">
                <span className="text-accent font-mono text-sm mr-3">01</span>
                What are you sourcing?
              </h3>
              <p className="text-steel mb-8">Select all that apply.</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {productCategories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => toggleCategory(cat)}
                    className={`text-left px-4 py-4 border text-sm transition-all duration-200 ${
                      selected.includes(cat)
                        ? "border-accent bg-accent/5 text-ink font-medium"
                        : "border-steel/20 text-steel hover:border-steel/50"
                    }`}
                  >
                    {selected.includes(cat) && (
                      <span className="text-accent mr-2">✓</span>
                    )}
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Volume & Timeline */}
            <div className="border-t border-steel/10 pt-12">
              <h3 className="font-display text-2xl font-medium mb-8">
                <span className="text-accent font-mono text-sm mr-3">02</span>
                Volume & Timeline
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-steel mb-3 uppercase tracking-wider font-mono">
                    Monthly Volume
                  </label>
                  <select className="w-full border border-steel/20 px-4 py-3 bg-white text-ink focus:outline-none focus:border-accent">
                    <option value="">Select range</option>
                    <option>1,000 – 10,000 units</option>
                    <option>10,000 – 50,000 units</option>
                    <option>50,000 – 100,000 units</option>
                    <option>100,000+ units</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-steel mb-3 uppercase tracking-wider font-mono">
                    Target Delivery
                  </label>
                  <select className="w-full border border-steel/20 px-4 py-3 bg-white text-ink focus:outline-none focus:border-accent">
                    <option value="">Select timeline</option>
                    <option>ASAP (Rush)</option>
                    <option>Within 4 weeks</option>
                    <option>Within 3 months</option>
                    <option>Planning Phase (&gt;6 months)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 3: Spec Upload & Notes */}
            <div className="border-t border-steel/10 pt-12">
              <h3 className="font-display text-2xl font-medium mb-8">
                <span className="text-accent font-mono text-sm mr-3">03</span>
                Technical Specification
              </h3>
              <div className="mb-6">
                <label className="block text-sm font-medium text-steel mb-3 uppercase tracking-wider font-mono">
                  Upload Drawings / Spec Sheet (Optional)
                </label>
                <div className="border-2 border-dashed border-steel/20 p-8 text-center hover:border-accent/50 transition-colors cursor-pointer">
                  <p className="text-steel text-sm">Drop your DXF, PDF, or STEP files here</p>
                  <p className="text-steel/50 text-xs mt-2 font-mono">Max 20MB · DXF, PDF, STEP, DWG</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-steel mb-3 uppercase tracking-wider font-mono">
                  Additional Notes
                </label>
                <textarea
                  rows={5}
                  placeholder="Describe material requirements, colour, surface finish, packaging instructions, compliance needs..."
                  className="w-full border border-steel/20 px-4 py-3 bg-white text-ink focus:outline-none focus:border-accent resize-none placeholder:text-steel/40"
                />
              </div>
            </div>

            {/* Step 4: Contact */}
            <div className="border-t border-steel/10 pt-12">
              <h3 className="font-display text-2xl font-medium mb-8">
                <span className="text-accent font-mono text-sm mr-3">04</span>
                Your Contact Details
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { label: "Full Name", placeholder: "Rajesh Mehta", type: "text" },
                  { label: "Company", placeholder: "Acme Lighting Pvt. Ltd.", type: "text" },
                  { label: "Work Email", placeholder: "r.mehta@acmelighting.com", type: "email" },
                  { label: "Phone", placeholder: "+91 98765 43210", type: "tel" },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="block text-sm font-medium text-steel mb-3 uppercase tracking-wider font-mono">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      className="w-full border border-steel/20 px-4 py-3 bg-white text-ink focus:outline-none focus:border-accent placeholder:text-steel/40"
                      required
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right: Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-mist text-ink p-8">
              <p className="font-mono text-xs uppercase tracking-widest text-white/40 mb-6">What happens next</p>
              <ol className="space-y-6 mb-10">
                {[
                  { n: "1", title: "Technical Review", body: "Our engineering team reviews your spec within 4 hours." },
                  { n: "2", title: "Capability Check", body: "We confirm which in-house facilities apply to your request." },
                  { n: "3", title: "Production Proposal", body: "A detailed proposal with pricing, lead times, and MOQs within 48 hours." },
                ].map((item) => (
                  <li key={item.n} className="flex gap-4">
                    <span className="w-8 h-8 bg-accent text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                      {item.n}
                    </span>
                    <div>
                      <p className="font-medium text-white mb-1">{item.title}</p>
                      <p className="text-white/50 text-sm">{item.body}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <button
                type="submit"
                className="w-full bg-accent text-white py-4 font-medium flex items-center justify-center gap-3 hover:bg-orange-600 transition-colors"
              >
                Submit RFQ
                <Send className="w-4 h-4" />
              </button>

              <p className="text-xs text-white/30 text-center mt-4 font-mono">
                No spam. Engineers only.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
