"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";

export default function Navigation() {
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  
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
    { name: t("facilities"), href: "/facilities", hasMegaMenu: true },
    { name: t("products"), href: "/products", hasMegaMenu: true },
    { name: t("quality"), href: "/quality", hasMegaMenu: false },
    { name: t("company"), href: "/company", hasMegaMenu: false },
    { name: t("blog"), href: "/blog", hasMegaMenu: false },
    { name: t("contact"), href: "/contact", hasMegaMenu: false },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          !isHomepage || isScrolled || activeMegaMenu || isMobileMenuOpen
            ? "glass-card !border-x-0 !border-t-0 py-4"
            : "bg-transparent py-6"
        }`}
        onMouseLeave={() => setActiveMegaMenu(null)}
      >
        <div className="container-wide flex justify-between items-center">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 z-50 relative">
            <div className={`w-8 h-8 rounded-sm flex items-center justify-center font-display font-bold text-lg ${
              !isHomepage || isScrolled || activeMegaMenu || isMobileMenuOpen ? "bg-accent text-white" : "bg-white text-ink"
            }`}>
              SE
            </div>
            <span className={`font-display font-bold tracking-tight text-xl ${
              !isHomepage || isScrolled || activeMegaMenu || isMobileMenuOpen ? "text-ink" : "text-white"
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
                    !isHomepage || isScrolled || activeMegaMenu ? "text-ink/80" : "text-white/90"
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
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>
            <Link 
              href="/rfq" 
              className={`hidden md:flex text-sm font-medium px-6 py-2.5 transition-colors rounded-full ${
                !isHomepage || isScrolled || activeMegaMenu
                  ? "bg-accent text-white hover:bg-blue-600"
                  : "bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white hover:text-ink"
              }`}
            >
              {t("requestQuote")}
            </Link>
            
            <button 
              className={`lg:hidden ${!isHomepage || isScrolled || isMobileMenuOpen ? "text-ink" : "text-white"}`}
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
              className="absolute top-full left-0 w-full glass-card !border-x-0 !border-t-0 shadow-2xl"
            >
              <div className="container-wide py-12">
                {activeMegaMenu === "Facilities" && (
                  <div className="grid grid-cols-4 gap-12">
                    <div className="col-span-1">
                      <h3 className="text-ink mb-4">9 In-House Facilities</h3>
                      <p className="text-ink/60 text-sm mb-6">Fully vertically integrated manufacturing hub based in Daman, India.</p>
                      <Link href="/facilities" className="text-accent flex items-center gap-2 text-sm font-medium hover:text-ink transition-colors">
                        View All Facilities <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                    <div className="col-span-3 grid grid-cols-3 gap-8">
                      <div>
                        <p className="font-mono text-ink/40 text-xs uppercase mb-4">Core Production</p>
                        <ul className="space-y-3">
                          <li><Link href="/facilities/injection-moulding" className="text-ink/80 hover:text-accent text-sm">Plastic Injection Moulding</Link></li>
                          <li><Link href="/facilities/blow-moulding" className="text-ink/80 hover:text-accent text-sm">Blow Moulded Containers</Link></li>
                          <li><Link href="/facilities/smt" className="text-ink/80 hover:text-accent text-sm">SMT & Auto Insertion</Link></li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-mono text-ink/40 text-xs uppercase mb-4">Finishing & Assembly</p>
                        <ul className="space-y-3">
                          <li><Link href="/facilities/assembly-packaging" className="text-ink/80 hover:text-accent text-sm">Assembly & Packaging</Link></li>
                          <li><Link href="/quality" className="text-ink/80 hover:text-accent text-sm">Quality Testing Lab</Link></li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-mono text-ink/40 text-xs uppercase mb-4">Supporting Ops</p>
                        <ul className="space-y-3">
                          <li><Link href="/facilities/tool-room" className="text-ink/80 hover:text-accent text-sm">In-House Tool Room</Link></li>
                          <li><Link href="/company" className="text-ink/80 hover:text-accent text-sm">About Sheetal Group</Link></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeMegaMenu === "Products" && (
                  <div className="grid grid-cols-4 gap-12">
                    <div className="col-span-1">
                      <h3 className="text-ink mb-4">OEM Product Lines</h3>
                      <p className="text-ink/60 text-sm mb-6">White-label manufacturing for tier-1 lighting brands.</p>
                      <Link href="/products" className="text-accent flex items-center gap-2 text-sm font-medium hover:text-ink transition-colors">
                        Explore Catalog <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                    <div className="col-span-3 grid grid-cols-2 gap-12 border-l border-slate-200 pl-12">
                      <div>
                        <p className="font-mono text-ink/40 text-xs uppercase mb-4">LED Lighting</p>
                        <ul className="space-y-3">
                          <li><Link href="/products/led-lighting" className="text-ink/80 hover:text-accent text-sm">LED Bulbs (3W – 50W)</Link></li>
                          <li><Link href="/products/led-lighting" className="text-ink/80 hover:text-accent text-sm">LED Battens</Link></li>
                          <li><Link href="/products/led-lighting" className="text-ink/80 hover:text-accent text-sm">LED Panels & Downlights</Link></li>
                          <li><Link href="/products/led-lighting" className="text-ink/80 hover:text-accent text-sm">Flood Lights & Street Lights</Link></li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-mono text-ink/40 text-xs uppercase mb-4">Rigid Packaging</p>
                        <ul className="space-y-3">
                          <li><Link href="/products/rigid-packaging" className="text-ink/80 hover:text-accent text-sm">Cosmetic Jars</Link></li>
                          <li><Link href="/products/rigid-packaging" className="text-ink/80 hover:text-accent text-sm">Pharmaceutical Bottles</Link></li>
                          <li><Link href="/products/rigid-packaging" className="text-ink/80 hover:text-accent text-sm">Industrial Containers</Link></li>
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
            className="fixed inset-0 bg-paper/95 backdrop-blur-xl z-40 lg:hidden pt-24 px-6"
          >
            <div className="flex flex-col gap-6 text-xl">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className="text-ink font-display border-b border-slate-200 pb-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                href="/rfq"
                className="bg-accent text-ink text-center py-4 font-medium mt-4"
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
