import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Contact Us | Sheetal Electrotech",
  description: "Get in touch with Sheetal Electrotech for RFQs, partnership inquiries, and support. Locate our manufacturing hub in Daman and corporate office in Mumbai.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-32 pb-24">
      <div className="container-narrow">
        <div className="mb-16">
          <h1 className="font-display font-bold text-4xl md:text-5xl text-ink tracking-tight mb-6">
            Get in Touch
          </h1>
          <p className="text-lg text-ink/70">
            Whether you need a custom quote, have a partnership inquiry, or want to learn more about our manufacturing capabilities, our team is ready to help.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-12">
            <div>
              <h2 className="font-display font-bold text-2xl text-ink mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-mist flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium text-ink">Email Us</h3>
                    <p className="text-sm text-ink/60 mb-2">For general inquiries and support</p>
                    <a href="mailto:info@sheetalelectrotech.com" className="text-accent hover:underline font-medium">info@sheetalelectrotech.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-mist flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium text-ink">Call Us</h3>
                    <p className="text-sm text-ink/60 mb-2">Mon–Sun: 9:00 AM – 5:00 PM</p>
                    <p className="text-accent font-medium">+91 93273 45295</p>
                    <p className="text-accent font-medium">+91 99254 39405</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-display font-bold text-2xl text-ink mb-6">Our Locations</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-mist flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium text-ink">Manufacturing Hub (Daman)</h3>
                    <p className="text-sm text-ink/70 mt-1">
                      Survey No. 168/28 & 168/29, Opp. Givaudan India Pvt. Ltd<br/>
                      Dhabel, Daman and Diu – 396210
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-mist flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium text-ink">Corporate Office (Mumbai)</h3>
                    <p className="text-sm text-ink/70 mt-1">
                      Goregaon East, Mumbai 400063, India
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <div className="glass-card p-8 relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
              
              <h2 className="font-display font-bold text-2xl text-ink mb-4 relative z-10">Request a Quote</h2>
              <p className="text-ink/70 mb-8 relative z-10">
                Ready to start your next manufacturing project? Our RFQ portal is designed for B2B buyers to quickly submit specifications.
              </p>
              
              <Link href="/rfq" className="btn-primary w-full justify-center relative z-10">
                Go to RFQ Portal
              </Link>
              
              <div className="mt-8 pt-8 border-t border-slate-200 relative z-10">
                <h3 className="font-medium text-ink mb-2">Need immediate assistance?</h3>
                <p className="text-sm text-ink/60 mb-4">
                  For urgent matters regarding ongoing production runs or logistics, please refer to the contact details provided in your service agreement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
