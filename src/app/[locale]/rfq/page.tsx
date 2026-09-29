"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { ArrowRight, Send, CheckCircle, Loader2, UploadCloud } from "lucide-react";
import { submitRfq } from "@/app/actions/rfq";
import { track } from "@vercel/analytics";
import { useSearchParams } from "next/navigation";

function RFQFormContent() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  
  const searchParams = useSearchParams();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const utmSource = searchParams.get("utm_source") || "";
  const utmMedium = searchParams.get("utm_medium") || "";
  const utmCampaign = searchParams.get("utm_campaign") || "";

  useEffect(() => {
    track("rfq_view");
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    track("rfq_submit_attempt");

    const formData = new FormData(e.currentTarget);

    try {
      const result = await submitRfq(formData);
      if (result.success) {
        setSubmitted(true);
        track("rfq_submit_success");
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
          <div className="w-20 h-20 bg-[#10b981]/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-10 h-10 text-[#10b981]" />
          </div>
          <h2 className="text-4xl font-display font-medium text-ink mb-4">RFQ Received.</h2>
          <p className="text-steel text-lg mb-8">
            Our technical team will review your specification and respond promptly with a production-ready proposal.
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
      <div className="bg-mist text-ink pt-36 pb-20 border-b border-steel/10">
        <div className="container-wide">
          <div className="max-w-3xl">
            <p className="font-mono text-accent text-sm uppercase tracking-widest mb-6 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-accent inline-block"></span>
              Start a Partnership
            </p>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 text-ink">
              Request a Quote
            </h1>
            <p className="text-steel text-lg md:text-xl max-w-2xl leading-relaxed">
              Share your requirements below and receive a detailed production proposal. No generic sales calls — a real engineering response.
            </p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="container-wide py-24">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-12 bg-white p-8 md:p-12 border border-steel/15 shadow-sm">
            
            <input type="hidden" name="utm_source" value={utmSource} />
            <input type="hidden" name="utm_medium" value={utmMedium} />
            <input type="hidden" name="utm_campaign" value={utmCampaign} />

            <input type="hidden" name="website" value="" />

            <fieldset className="space-y-4">
              <legend className="block text-sm font-medium text-ink uppercase tracking-wider">
                Manufacturing Requirement <span className="text-accent">*</span>
              </legend>
              <div className="grid sm:grid-cols-2 gap-3">
                {["LED Lighting", "Electronics", "Rigid Plastic Packaging", "Custom OEM Manufacturing"].map((category) => (
                  <label key={category} className="flex items-center gap-3 border border-steel/20 bg-paper px-4 py-3 cursor-pointer hover:border-accent/50">
                    <input type="checkbox" name="categories" value={category} className="accent-accent" />
                    <span className="text-sm text-ink">{category}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="block text-sm font-medium text-ink uppercase tracking-wider">
                  Monthly Volume <span className="text-accent">*</span>
                </label>
                <select required name="volume" className="w-full bg-paper border border-steel/20 px-4 py-4 text-ink focus:border-accent focus:ring-1 focus:ring-accent outline-none">
                  <option value="">Select volume</option>
                  <option value="Below 10,000 units">Below 10,000 units</option>
                  <option value="10,000–50,000 units">10,000–50,000 units</option>
                  <option value="50,000–100,000 units">50,000–100,000 units</option>
                  <option value="100,000+ units">100,000+ units</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-ink uppercase tracking-wider">
                  Target Timeline <span className="text-accent">*</span>
                </label>
                <select required name="timeline" className="w-full bg-paper border border-steel/20 px-4 py-4 text-ink focus:border-accent focus:ring-1 focus:ring-accent outline-none">
                  <option value="">Select timeline</option>
                  <option value="Within 1 month">Within 1 month</option>
                  <option value="1–3 months">1–3 months</option>
                  <option value="3–6 months">3–6 months</option>
                  <option value="6+ months">6+ months</option>
                </select>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 text-red-700 p-4 rounded-sm border border-red-200">
                {error}
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="block text-sm font-medium text-ink uppercase tracking-wider">
                  Full Name <span className="text-accent">*</span>
                </label>
                <input
                  required
                  name="fullName"
                  type="text"
                  className="w-full bg-paper border border-steel/20 px-4 py-4 text-ink focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-ink uppercase tracking-wider">
                  Company Name <span className="text-accent">*</span>
                </label>
                <input
                  required
                  name="company"
                  type="text"
                  className="w-full bg-paper border border-steel/20 px-4 py-4 text-ink focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                  placeholder="ACME Corp"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="block text-sm font-medium text-ink uppercase tracking-wider">
                  Work Email <span className="text-accent">*</span>
                </label>
                <input
                  required
                  name="email"
                  type="email"
                  className="w-full bg-paper border border-steel/20 px-4 py-4 text-ink focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                  placeholder="john@acmecorp.com"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-ink uppercase tracking-wider">
                  Phone Number
                </label>
                <input
                  name="phone"
                  type="tel"
                  className="w-full bg-paper border border-steel/20 px-4 py-4 text-ink focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-ink uppercase tracking-wider">
                Requirements / Project Details <span className="text-accent">*</span>
              </label>
              <textarea
                required
                name="notes"
                rows={6}
                className="w-full bg-paper border border-steel/20 px-4 py-4 text-ink focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all resize-none"
                placeholder="Describe the product, materials, specifications, expected quantities, and any other requirements."
              />
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-ink uppercase tracking-wider">
                Drawings / BOM (Optional)
              </label>
              <div 
                className="border-2 border-dashed border-steel/20 bg-paper p-8 text-center cursor-pointer hover:border-accent/50 hover:bg-mist/30 transition-all flex flex-col items-center justify-center"
                onClick={() => fileInputRef.current?.click()}
              >
                <UploadCloud className="w-8 h-8 text-steel mb-3" />
                <p className="text-ink font-medium mb-1">
                  {fileName ? fileName : "Upload Files"}
                </p>
                <p className="text-steel text-sm">
                  {fileName ? "Click to change file" : "Upload a PDF, DXF, STEP, or DWG file (Max 20MB)"}
                </p>
                <input
                  ref={fileInputRef}
                  name="file"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-accent text-white px-8 py-5 font-display font-bold uppercase tracking-widest hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting RFQ...
                  </>
                ) : (
                  <>
                    Submit RFQ <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function RFQPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-paper flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-accent animate-spin" />
      </div>
    }>
      <RFQFormContent />
    </Suspense>
  );
}
