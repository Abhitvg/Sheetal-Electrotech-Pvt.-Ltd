import ProductSubCategoryTemplate from "@/components/ProductSubCategoryTemplate";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { localizedMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const en = await getTranslations({ locale: "en", namespace: "Products.bottles" });
  const hi = await getTranslations({ locale: "hi", namespace: "Products.bottles" });
  return localizedMetadata(locale, "/products/rigid-packaging/bottles", {
    en: { title: en("title"), description: en("description") },
    hi: { title: hi("title"), description: hi("description") },
  });
}

export default async function BottlesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Products.bottles' });

  const products = [
    {
      id: "hdpe-bottles",
      name: t("p1_name"),
      description: "High-density polyethylene (HDPE) bottles manufactured via continuous extrusion blow moulding (EBM) with calibrated neck finishes and uniform wall distribution.",
      range: "50 ml – 1000 ml Standard & Custom Formats",
      image: "/images/products_packaging.jpg",
      specs: [
        { label: "Moulding Process", value: "Continuous Extrusion Blow Moulding (EBM)" },
        { label: "Polymer Resin", value: "100% Virgin Food & Pharma Grade HDPE" },
        { label: "Capacity Range", value: "50 ml, 100 ml, 200 ml, 500 ml, 1000 ml" },
        { label: "Neck Standards", value: "24/410, 28/410, 38mm CRC Ratchet & Tamper Evident" },
        { label: "Chemical Resistance", value: "High Resistance to Acids, Alkalis, Solvents & Oils" },
        { label: "Wall Control", value: "Parison-Programmed Uniform Wall Thickness" },
      ],
      applications: [
        "Pharmaceutical Syrups & Liquid Medicines",
        "Personal Care Lotions, Shampoos & Handwash",
        "Agrochemical Emulsions & Pesticides",
        "Industrial Cleaning Chemicals & Lubricants",
      ]
    },
    {
      id: "pet-bottles",
      name: t("p2_name"),
      description: "Optical-grade polyethylene terephthalate (PET) precision bottles manufactured via single and two-stage ISBM with flash-free neck finishes.",
      range: "15 ml – 500 ml Glass-Clear Formats",
      image: "/images/jar_product.jpg",
      specs: [
        { label: "Moulding Process", value: "Injection Stretch Blow Moulding (ISBM)" },
        { label: "Polymer Resin", value: "Optical-Grade Virgin PET (Polyethylene Terephthalate)" },
        { label: "Clarity & Gloss", value: "92%+ Glass-Like Optical Transparency" },
        { label: "Neck Precision", value: "Flash-Free Injection-Moulded Neck Threads" },
        { label: "Barrier Properties", value: "High Oxygen & Moisture Vapour Retention" },
        { label: "Impact Strength", value: "Shatter-Proof Drop Tested up to 1.5 Metres" },
      ],
      applications: [
        "Pharmaceutical Eye Drops & Nasal Sprays",
        "Cosmetic Serums, Toners & Fragrance Bottles",
        "Sanitizers, Hand Rubs & Healthcare Liquids",
        "Food Flavourings & Premium Syrups",
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
