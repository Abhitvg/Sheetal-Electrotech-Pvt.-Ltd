import ProductSubCategoryTemplate from "@/components/ProductSubCategoryTemplate";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { localizedMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const en = await getTranslations({ locale: "en", namespace: "Products.components" });
  const hi = await getTranslations({ locale: "hi", namespace: "Products.components" });
  return localizedMetadata(locale, "/products/rigid-packaging/components", {
    en: { title: en("title"), description: en("description") },
    hi: { title: hi("title"), description: hi("description") },
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Products.components' });

  const products = [
    {
      id: "screw-closures-caps",
      name: "Precision Injection-Moulded Closures & Caps",
      description: "High-cavitation injection-moulded screw closures, ribbed caps, and induction seal tops calibrated for leak-proof automated capping lines.",
      range: "20mm, 24mm, 28mm, 38mm, 53mm, 83mm Finishes",
      image: "/images/facilities/injection-moulding.webp",
      specs: [
        { label: "Moulding Process", value: "High-Cavitation Multi-Platen Injection Moulding" },
        { label: "Polymer Resin", value: "Virgin Polypropylene (PP) & HDPE" },
        { label: "Neck Finishes", value: "20/410, 24/410, 28/410, 38mm, 83mm Thread" },
        { label: "Wad Options", value: "EPE Foam Wad, Induction Heat Foil, Pressure Sensitive Liner" },
        { label: "Knurling", value: "Vertical Fine Ribbed, Coarse Grip, Smooth Gloss" },
      ],
      applications: [
        "Pharmaceutical Liquid & Tablet Bottles",
        "Personal Care & Cosmetic Containers",
        "Chemical & Agrochemical Jerrycans",
        "Food & Beverage Airtight Jars",
      ]
    },
    {
      id: "crc-dispensing-closures",
      name: "Child-Resistant Closures (CRC) & Dispensing Tops",
      description: "Certified child-safety closures compliant with ISO 8317 & US 16 CFR protocols with push-and-turn interlocks and flip-top dispensers.",
      range: "28mm, 33mm, 38mm CRC & 2mm–5mm Flip-Tops",
      image: "/images/moulding_factory.jpg",
      specs: [
        { label: "Safety Certification", value: "ISO 8317 & US 16 CFR 1700 Protocol Compliant" },
        { label: "Interlock Mechanism", value: "Two-Piece Push-and-Turn Internal Gear Lock" },
        { label: "Dispensing Types", value: "Flip-Top Controlled Orifice (2mm–5mm), Disc-Top, Lotion Pump" },
        { label: "Vacuum Leak Test", value: "Passed -0.6 Bar Vacuum Retention for 5 Minutes" },
        { label: "Tamper Evidence", value: "Breakaway Ring Snap on First Opening" },
      ],
      applications: [
        "Regulated Pharmaceutical Formulations",
        "Hazardous Household & Automotive Cleaners",
        "Agrochem Concentrates & Pesticides",
        "Infant-Safe Chemical Packaging",
      ]
    }
  ];

  return (
    <ProductSubCategoryTemplate
      title={t("title")}
      category="rigid-packaging"
      description={t("description")}
      products={products}
    />
  );
}
