import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ArrowRight, Phone, Mail } from "lucide-react";

export default function CTASection() {
  const t = useTranslations("CTA");

  return (
    <section className="relative py-24 md:py-32 overflow-hidden" id="cta">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero_factory.jpg"
          alt="Manufacturing facility"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b192c]/95 via-[#0b192c]/90 to-[#0b192c]/80" />
      </div>

      {/* Content */}
      <div className="container-wide relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <p className="font-mono text-accent text-sm uppercase tracking-widest mb-4">
            {t("badge")}
          </p>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
            {t("titlePrefix")} {" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              {t("titleHighlight")}
            </span>
          </h2>
          <p className="text-white/70 text-lg mb-12 max-w-xl leading-relaxed">
            {t("subtitle")}
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <Link
              href="/rfq"
              className="group flex items-center gap-3 px-8 py-4 bg-accent text-white font-display font-bold text-sm uppercase tracking-wider hover:bg-blue-600 transition-all duration-300 rounded-sm"
            >
              {t("rfqButton")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-3 px-8 py-4 border border-white/30 text-white font-display font-medium text-sm uppercase tracking-wider hover:bg-white/10 transition-all duration-300 rounded-sm"
            >
              {t("contactButton")}
            </Link>
          </div>

          {/* Quick Contact */}
          <div className="flex flex-wrap gap-8 text-white/60 text-sm">
            <a href="mailto:info@sheetalelectrotech.com" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Mail className="w-4 h-4" />
              info@sheetalelectrotech.com
            </a>
            <a href="tel:+919327345295" className="flex items-center gap-2 hover:text-accent transition-colors">
              <Phone className="w-4 h-4" />
              +91 93273 45295
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
