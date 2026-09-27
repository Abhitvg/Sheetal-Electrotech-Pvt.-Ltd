"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { ArrowRight, Send, CheckCircle, Loader2, UploadCloud } from "lucide-react";
import { submitRfq } from "@/app/actions/rfq";
import { track } from "@vercel/analytics";
import { useSearchParams } from "next/navigation";

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

function RFQFormContent() {
  const [submitted, setSubmitted] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [lastTrackedStep, setLastTrackedStep] = useState(0);
  
  const searchParams = useSearchParams();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const utmSource = searchParams.get("utm_source") || "";
  const utmMedium = searchParams.get("utm_medium") || "";
  const utmCampaign = searchParams.get("utm_campaign") || "";

  useEffect(() => {
    track("rfq_view");
  }, []);

  const trackStep = (step: number) => {
    if (step > lastTrackedStep) {
      track("rfq_step_reached", { step });
      setLastTrackedStep(step);
    }
  };

  const toggleCategory = (cat: string) => {
    setSelected((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
    trackStep(1);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
      trackStep(3);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    trackStep(4);
    track("rfq_submit_attempt");

    const formData = new FormData(e.currentTarget);
    
    // Append manually managed state
    selected.forEach(cat => formData.append("categories", cat));

    try {
      const result = await submitRfq(formData);
      if (result.success) {
        setSubmitted(true);
        track("rfq_submit_success", { categories: selected.join(",") });
      } else {
        setError(result.message);
        track("rfq_submit_error", { message: result.message });
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      track("rfq_submit_error", { message: "Unexpected error" });
    } finally {
      setLoading(false);
    }
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
          <a href="/" className="bg-accent text-ink px-8 py-4 font-medium hover:bg-orange-600 transition-colors inline-flex items-center gap-3">
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
            <p className="text-ink/60 text-xl max-w-2xl">
              Share your specification below and receive a detailed production proposal within 48 hours. No generic sales calls — a real engineering response.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="container-wide py-24">
        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-16">
          
          <input type="hidden" name="utm_source" value={utmSource} />
          <input type="hidden" name="utm_medium" value={utmMedium} />
          <input type="hidden" name="utm_campaign" value={utmCampaign} />

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
                Volume & Target Delivery
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-steel mb-3 uppercase tracking-wider font-mono">
                    Monthly Volume
                  </label>
                  <select name="volume" required onChange={() => trackStep(2)} className="w-full border border-steel/20 px-4 py-3 bg-white text-ink focus:outline-none focus:border-accent">
                    <option value="">Select range</option>
                    <option value="1000-10000">1,000 – 10,000 units</option>
                    <option value="10000-50000">10,000 – 50,000 units</option>
                    <option value="50000-100000">50,000 – 100,000 units</option>
                    <option value="100000+">100,000+ units</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-steel mb-3 uppercase tracking-wider font-mono">
                    Target Delivery
                  </label>
                  <select name="timeline" required onChange={() => trackStep(2)} className="w-full border border-steel/20 px-4 py-3 bg-white text-ink focus:outline-none focus:border-accent">
                    <option value="">Select timeline</option>
                    <option value="rush">ASAP (Rush)</option>
                    <option value="4_weeks">Within 4 weeks</option>
                    <option value="3_months">Within 3 months</option>
                    <option value="planning">Planning Phase (&gt;6 months)</option>
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
                <input 
                  type="file" 
                  name="file" 
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden" 
                  accept=".pdf,.dxf,.step,.stp,.dwg" 
                />
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-steel/20 p-8 flex flex-col items-center justify-center hover:border-accent/50 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <UploadCloud className="w-6 h-6 text-steel mb-3" />
                  <p className="text-steel text-sm">{fileName ? <span className="font-medium text-ink">{fileName}</span> : "Click to select DXF, PDF, or STEP files"}</p>
                  <p className="text-steel/50 text-xs mt-2 font-mono">Max 20MB · DXF, PDF, STEP, DWG</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-steel mb-3 uppercase tracking-wider font-mono">
                  Additional Notes
                </label>
                <textarea
                  name="notes"
                  rows={5}
                  onChange={() => trackStep(3)}
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
                  { label: "Full Name", name: "fullName", placeholder: "Rajesh Mehta", type: "text" },
                  { label: "Company", name: "company", placeholder: "Acme Lighting Pvt. Ltd.", type: "text" },
                  { label: "Work Email", name: "email", placeholder: "r.mehta@acmelighting.com", type: "email" },
                  { label: "Phone", name: "phone", placeholder: "+91 98765 43210", type: "tel" },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="block text-sm font-medium text-steel mb-3 uppercase tracking-wider font-mono">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      onChange={() => trackStep(4)}
                      className="w-full border border-steel/20 px-4 py-3 bg-white text-ink focus:outline-none focus:border-accent placeholder:text-steel/40"
                      required
                    />
                  </div>
                ))}
              </div>
              
              {/* Honeypot for Spam Protection */}
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] top-[-9999px]" />
            </div>

          </div>

          {/* Right: Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-mist text-ink p-8">
              <p className="font-mono text-xs uppercase tracking-widest text-ink/40 mb-6">What happens next</p>
              <ol className="space-y-6 mb-10">
                {[
                  { n: "1", title: "Technical Review", body: "Our engineering team reviews your spec within 4 hours." },
                  { n: "2", title: "Capability Check", body: "We confirm which in-house facilities apply to your request." },
                  { n: "3", title: "Production Proposal", body: "A detailed proposal with pricing, lead times, and MOQs within 48 hours." },
                ].map((item) => (
                  <li key={item.n} className="flex gap-4">
                    <span className="w-8 h-8 bg-accent text-ink text-sm font-bold flex items-center justify-center flex-shrink-0">
                      {item.n}
                    </span>
                    <div>
                      <p className="font-medium text-ink mb-1">{item.title}</p>
                      <p className="text-ink/50 text-sm">{item.body}</p>
                    </div>
                  </li>
                ))}
              </ol>

              {error && (
               <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm">
                 {error}
               </div>
              )}

              <button
                type="submit"
                disabled={loading || selected.length === 0}
                className="w-full bg-accent text-ink py-4 font-medium flex items-center justify-center gap-3 hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>Processing <Loader2 className="w-4 h-4 animate-spin" /></>
                ) : (
                  <>Submit RFQ <Send className="w-4 h-4" /></>
                )}
              </button>

              <p className="text-xs text-ink/30 text-center mt-4 font-mono">
                No spam. Engineers only.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function RFQPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-paper pt-36 pb-20 text-center">Loading...</div>}>
      <RFQFormContent />
    </Suspense>
  );
}
