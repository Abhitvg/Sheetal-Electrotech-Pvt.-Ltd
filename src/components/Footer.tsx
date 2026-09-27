import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-mist text-ink pt-24 pb-12 border-t border-slate-200">
      <div className="container-wide">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-24">
          
          {/* Brand Col */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-sm bg-accent text-ink flex items-center justify-center font-display font-bold text-lg">
                SE
              </div>
              <span className="font-display font-bold tracking-tight text-xl text-ink">
                Sheetal Group
              </span>
            </Link>
            <p className="text-ink/60 text-sm max-w-sm">
              A vertically integrated OEM manufacturing partner for global lighting and packaging brands. Based in India, scaling globally.
            </p>
            
            {/* Certifications Mini-Strip */}
            <div className="mt-4 flex gap-4">
              <div className="border border-slate-200 px-3 py-1.5 text-xs font-mono text-ink/70">ISO 9001:2015</div>
              <div className="border border-slate-200 px-3 py-1.5 text-xs font-mono text-ink/70">BIS Certified</div>
            </div>
          </div>

          {/* Nav Col 1 */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-ink/40 mb-6">Facilities</h4>
            <ul className="space-y-4 text-sm text-ink/80">
              <li><Link href="/facilities/injection-moulding" className="hover:text-accent transition-colors">Injection Moulding</Link></li>
              <li><Link href="/facilities/blow-moulding" className="hover:text-accent transition-colors">Blow Moulding</Link></li>
              <li><Link href="/facilities/smt" className="hover:text-accent transition-colors">SMT & Auto Insertion</Link></li>
              <li><Link href="/facilities/assembly" className="hover:text-accent transition-colors">Assembly & Packing</Link></li>
              <li><Link href="/facilities/tool-room" className="hover:text-accent transition-colors">Tool Room</Link></li>
            </ul>
          </div>

          {/* Nav Col 2 */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-ink/40 mb-6">Products</h4>
            <ul className="space-y-4 text-sm text-ink/80">
              <li><Link href="/products/led" className="hover:text-accent transition-colors">LED Lighting Portfolio</Link></li>
              <li><Link href="/products/rigid-packaging" className="hover:text-accent transition-colors">Rigid Plastic Packaging</Link></li>
            </ul>
            
            <h4 className="font-mono text-xs uppercase tracking-widest text-ink/40 mb-6 mt-12">Company</h4>
            <ul className="space-y-4 text-sm text-ink/80">
              <li><Link href="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link href="/esg" className="hover:text-accent transition-colors">ESG & Sustainability</Link></li>
              <li><Link href="/quality" className="hover:text-accent transition-colors">Quality Assurance</Link></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-ink/40 mb-6">Contact & Locations</h4>
            <div className="space-y-6 text-sm text-ink/80">
              <div>
                <p className="font-medium text-ink mb-1">Daman (Manufacturing Hub)</p>
                <p className="text-ink/60">Survey No. 364/1-11, Shree Ganesh Ind. Est.<br/>Kachigam, Daman 396210, India</p>
              </div>
              <div>
                <p className="font-medium text-ink mb-1">Mumbai (Corporate)</p>
                <p className="text-ink/60">Goregaon East, Mumbai 400063, India</p>
              </div>
              <div className="pt-4">
                <a href="mailto:info@sheetalgroup.co.in" className="flex items-center gap-1 hover:text-accent transition-colors">
                  info@sheetalgroup.co.in <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-ink/40">
          <p>© {new Date().getFullYear()} Sheetal Electrotech Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-ink transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-ink transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
