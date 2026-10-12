import ProductSubCategoryTemplate from "@/components/ProductSubCategoryTemplate";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { localizedMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const en = await getTranslations({ locale: "en", namespace: "Products.jars" });
  const hi = await getTranslations({ locale: "hi", namespace: "Products.jars" });
  return localizedMetadata(locale, "/products/rigid-packaging/jars", {
    en: { title: en("title"), description: en("description") },
    hi: { title: hi("title"), description: hi("description") },
  });
}

export default async function JarsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Products.jars' });

  const products = [
    {
      id: "pp-jars",
      name: t("p1_name"),
      description: "Precision-moulded polypropylene (PP) and HDPE wide-mouth jars engineered for cosmetic creams, pharmaceuticals, and nutraceutical products.",
      range: "50 gm – 500 gm Single & Double-Wall Jars",
      image: "/images/jar_product.jpg",
      specs: [
        { label: "Polymer Resin", value: "Medical & Food Grade Virgin Polypropylene (PP) / HDPE" },
        { label: "Wall Construction", value: "Single-Wall Standard & Double-Wall Luxury Profile" },
        { label: "Closure Sealing", value: "EPE Foam Wad, Induction Heat Foil or Shive Liner" },
        { label: "Mouth Opening", value: "Wide-Mouth Ergonomic Thread for Effortless Dispensing" },
        { label: "Surface Finish", value: "High-Gloss Mirror, Matte Frosted & Custom Color Masterbatch" },
      ],
      applications: [
        "Cosmetic Face Creams, Balms & Scrubs",
        "Dermatological Ointments & Pharmaceutical Gels",
        "Nutraceutical Powders & Protein Supplements",
        "Food Pastes, Confectionery & Premium Spices",
      ]
    },
    {
      id: "custom-containers",
      name: t("p2_name"),
      description: "Custom bulk containers and technical blow-moulded hollow parts engineered with integrated carry handles and interlock stacking.",
      range: "500 ml – 5000 ml (5 Litres)",
      image: "/images/packaging_factory.jpg",
      specs: [
        { label: "Moulding Process", value: "Heavy-Duty Accumulator Head Extrusion Blow Moulding" },
        { label: "Polymer Resin", value: "High Molecular Weight Blow Moulding Grade HDPE" },
        { label: "Handle Design", value: "Integrated Ergonomic Hollow Carry Handle" },
        { label: "Stackability", value: "Interlocking Recessed Base & Crown for High Tier Stacking" },
        { label: "UN Testing", value: "Certified Hydraulic Pressure Leak-Proof & Drop Tested" },
      ],
      applications: [
        "Commercial Detergents & Sanitizer Bulks",
        "Agricultural Pesticides & Liquid Fertilizers",
        "Automotive Lubricants, Coolants & Brake Fluids",
        "Chemical Formulation Packaging",
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
