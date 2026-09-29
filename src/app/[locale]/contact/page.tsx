"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Send, Clock, ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/routing";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");
    
    const formData = new FormData(e.currentTarget);
    const { submitContact } = await import("@/app/actions/contact");
    const result = await submitContact(formData);
    
    setIsSubmitting(false);
    if (result.success) {
      setSubmitted(true);
    } else {
      setErrorMsg(result.message);
    }
  };

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
            Get in Touch
          </h1>
          <p className="text-lg text-steel max-w-2xl">
            Whether you need a custom quote, have a partnership inquiry, or want to learn
            more about our manufacturing capabilities, our team is ready to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 p-12 rounded-sm text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send className="w-7 h-7 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-display font-bold text-ink mb-3">
                  Message Sent Successfully!
                </h3>
                <p className="text-steel mb-6">
                  Thank you for reaching out. Our team will respond as soon as possible.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setFormState({ name: "", email: "", phone: "", company: "", subject: "", message: "" }); }}
                  className="btn-primary"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white border border-slate-200 p-8 md:p-12 rounded-sm">
                <h2 className="text-2xl font-display font-bold text-ink mb-8">
                  Send Us a Message
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-ink mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-200 rounded-sm text-ink bg-white focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-200 rounded-sm text-ink bg-white focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                      placeholder="john@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-200 rounded-sm text-ink bg-white focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink mb-2">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={formState.company}
                      onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-200 rounded-sm text-ink bg-white focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                      placeholder="Company Name"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-ink mb-2">Subject *</label>
                  <select
                    name="subject"
                    required
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-sm text-ink bg-white focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                  >
                    <option value="">Select a subject</option>
                    <option value="rfq">Request for Quote</option>
                    <option value="partnership">Partnership Inquiry</option>
                    <option value="product">Product Information</option>
                    <option value="careers">Careers</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="mb-8">
                  <label className="block text-sm font-medium text-ink mb-2">Message *</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-sm text-ink bg-white focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors resize-none"
                    placeholder="Tell us about your requirements..."
                  />
                </div>

                {errorMsg && (
                  <div className="mb-6 p-4 bg-red-50 text-red-600 border border-red-200 rounded-sm text-sm">
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Send Message
                    </span>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Contact Info */}
            <div className="bg-white border border-slate-200 p-8 rounded-sm">
              <h3 className="text-lg font-display font-bold text-ink mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent/10 flex items-center justify-center rounded-sm shrink-0">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-ink text-sm">Email Us</p>
                    <a href="mailto:info@sheetalelectrotech.com" className="text-accent text-sm hover:underline">
                      info@sheetalelectrotech.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent/10 flex items-center justify-center rounded-sm shrink-0">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-ink text-sm">Call Us</p>
                    <p className="text-accent text-sm">+91 93273 45295</p>
                    <p className="text-accent text-sm">+91 99254 39405</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent/10 flex items-center justify-center rounded-sm shrink-0">
                    <Clock className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-ink text-sm">Business Hours</p>
                    <p className="text-steel text-sm">Mon – Sat: 9:00 AM – 5:00 PM IST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Locations */}
            <div className="bg-white border border-slate-200 p-8 rounded-sm">
              <h3 className="text-lg font-display font-bold text-ink mb-6">Our Locations</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent/10 flex items-center justify-center rounded-sm shrink-0">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-ink text-sm">Manufacturing Hub (Daman)</p>
                    <p className="text-steel text-xs mt-1">
                      Survey No. 168/28 & 168/29, Opp. Givaudan India Pvt. Ltd,
                      Dhabel, Daman and Diu – 396210
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent/10 flex items-center justify-center rounded-sm shrink-0">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-ink text-sm">Corporate Office (Mumbai)</p>
                    <p className="text-steel text-xs mt-1">
                      Goregaon East, Mumbai 400063, India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick RFQ */}
            <div className="bg-ink p-8 rounded-sm text-white">
              <h3 className="font-display font-bold text-lg mb-3">Need a Quote?</h3>
              <p className="text-white/70 text-sm mb-6">
                Use our RFQ portal for faster processing of manufacturing inquiries.
              </p>
              <Link href="/rfq" className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white font-display font-bold text-sm uppercase tracking-wider hover:bg-blue-600 transition-colors rounded-sm">
                Go to RFQ Portal
              </Link>
            </div>
          </div>
        </div>

        {/* Google Map */}
        <div className="mt-16">
          <h2 className="text-2xl font-display font-bold text-ink mb-6">Find Us</h2>
          <div className="w-full h-[400px] bg-slate-100 border border-slate-200 rounded-sm overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3745.123456789!2d72.8494!3d20.4142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be0d0a0a0a0a0a0%3A0x0!2sDhabel%2C%20Daman!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sheetal Electrotech Location"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
