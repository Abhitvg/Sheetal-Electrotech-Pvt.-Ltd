"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Facilities", href: "/facilities", hasMegaMenu: true },
    { name: "Products", href: "/products", hasMegaMenu: true },
    { name: "Quality", href: "/quality", hasMegaMenu: false },
    { name: "Company", href: "/company", hasMegaMenu: false },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled || activeMegaMenu || isMobileMenuOpen
            ? "bg-ink border-b border-white/10 py-4"
            : "bg-transparent py-6"
        }`}
        onMouseLeave={() => setActiveMegaMenu(null)}
      >
        <div className="container-wide flex justify-between items-center">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 z-50 relative">
            <div className={`w-8 h-8 rounded-sm flex items-center justify-center font-display font-bold text-lg ${
              isScrolled || activeMegaMenu || isMobileMenuOpen ? "bg-accent text-white" : "bg-white text-ink"
            }`}>
              SE
            </div>
            <span className={`font-display font-bold tracking-tight text-xl ${
              isScrolled || activeMegaMenu || isMobileMenuOpen ? "text-white" : "text-white"
            }`}>
              Sheetal Group
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => setActiveMegaMenu(link.hasMegaMenu ? link.name : null)}
              >
                <Link
                  href={link.href}
                  className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-accent ${
                    isScrolled || activeMegaMenu ? "text-white/80" : "text-white"
                  }`}
                >
                  {link.name}
                  {link.hasMegaMenu && (
                    <ChevronDown className={`w-4 h-4 transition-transform ${activeMegaMenu === link.name ? "rotate-180 text-accent" : ""}`} />
                  )}
                </Link>
              </div>
            ))}
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4 z-50 relative">
            <Link 
              href="/rfq" 
              className={`hidden md:flex text-sm font-medium px-6 py-2.5 transition-colors ${
                isScrolled || activeMegaMenu
                  ? "bg-white text-ink hover:bg-accent hover:text-white"
                  : "bg-white/10 text-white backdrop-blur-sm border border-white/20 hover:bg-white hover:text-ink"
              }`}
            >
              Request Quote
            </Link>
            
            <button 
              className="lg:hidden text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mega Menu Dropdown */}
        <AnimatePresence>
          {activeMegaMenu && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 w-full bg-ink border-b border-white/10 shadow-2xl"
            >
              <div className="container-wide py-12">
                {activeMegaMenu === "Facilities" && (
                  <div className="grid grid-cols-4 gap-12">
                    <div className="col-span-1">
                      <h3 className="text-white mb-4">9 In-House Facilities</h3>
                      <p className="text-white/60 text-sm mb-6">Fully vertically integrated manufacturing hub based in Daman, India.</p>
                      <Link href="/facilities" className="text-accent flex items-center gap-2 text-sm font-medium hover:text-white transition-colors">
                        View All Facilities <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                    <div className="col-span-3 grid grid-cols-3 gap-8">
                      <div>
                        <p className="font-mono text-white/40 text-xs uppercase mb-4">Core Production</p>
                        <ul className="space-y-3">
                          <li><Link href="/facilities/injection-moulding" className="text-white/80 hover:text-accent text-sm">Plastic Injection Moulding</Link></li>
                          <li><Link href="/facilities/blow-moulding" className="text-white/80 hover:text-accent text-sm">Blow Moulded Containers</Link></li>
                          <li><Link href="/facilities/smt" className="text-white/80 hover:text-accent text-sm">SMT & Auto Insertion</Link></li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-mono text-white/40 text-xs uppercase mb-4">Finishing & Assembly</p>
                        <ul className="space-y-3">
                          <li><Link href="/facilities/assembly-packaging" className="text-white/80 hover:text-accent text-sm">Assembly & Packaging</Link></li>
                          <li><Link href="/quality" className="text-white/80 hover:text-accent text-sm">Quality Testing Lab</Link></li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-mono text-white/40 text-xs uppercase mb-4">Supporting Ops</p>
                        <ul className="space-y-3">
                          <li><Link href="/facilities/tool-room" className="text-white/80 hover:text-accent text-sm">In-House Tool Room</Link></li>
                          <li><Link href="/company" className="text-white/80 hover:text-accent text-sm">About Sheetal Group</Link></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeMegaMenu === "Products" && (
                  <div className="grid grid-cols-4 gap-12">
                    <div className="col-span-1">
                      <h3 className="text-white mb-4">OEM Product Lines</h3>
                      <p className="text-white/60 text-sm mb-6">White-label manufacturing for tier-1 lighting brands.</p>
                      <Link href="/products" className="text-accent flex items-center gap-2 text-sm font-medium hover:text-white transition-colors">
                        Explore Catalog <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                    <div className="col-span-3 grid grid-cols-2 gap-12 border-l border-white/10 pl-12">
                      <div>
                        <p className="font-mono text-white/40 text-xs uppercase mb-4">LED Lighting</p>
                        <ul className="space-y-3">
                          <li><Link href="/products/led-lighting" className="text-white/80 hover:text-accent text-sm">LED Bulbs (3W – 50W)</Link></li>
                          <li><Link href="/products/led-lighting" className="text-white/80 hover:text-accent text-sm">LED Battens</Link></li>
                          <li><Link href="/products/led-lighting" className="text-white/80 hover:text-accent text-sm">LED Panels & Downlights</Link></li>
                          <li><Link href="/products/led-lighting" className="text-white/80 hover:text-accent text-sm">Flood Lights & Street Lights</Link></li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-mono text-white/40 text-xs uppercase mb-4">Rigid Packaging</p>
                        <ul className="space-y-3">
                          <li><Link href="/products/rigid-packaging" className="text-white/80 hover:text-accent text-sm">Cosmetic Jars</Link></li>
                          <li><Link href="/products/rigid-packaging" className="text-white/80 hover:text-accent text-sm">Pharmaceutical Bottles</Link></li>
                          <li><Link href="/products/rigid-packaging" className="text-white/80 hover:text-accent text-sm">Industrial Containers</Link></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      
      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-ink z-40 lg:hidden pt-24 px-6"
          >
            <div className="flex flex-col gap-6 text-xl">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className="text-white font-display border-b border-white/10 pb-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                href="/rfq"
                className="bg-accent text-white text-center py-4 font-medium mt-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Request Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
