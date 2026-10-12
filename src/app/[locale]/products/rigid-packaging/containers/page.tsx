import ProductSubCategoryTemplate from "@/components/ProductSubCategoryTemplate";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { localizedMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const en = await getTranslations({ locale: "en", namespace: "Products.containers" });
  const hi = await getTranslations({ locale: "hi", namespace: "Products.containers" });
  return localizedMetadata(locale, "/products/rigid-packaging/containers", {
    en: { title: en("title"), description: en("description") },
    hi: { title: hi("title"), description: hi("description") },
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Products.containers' });

  const products = [
    {
      id: "hdpe-industrial-containers",
      name: "HDPE Industrial Jerrycans & Heavy-Duty Cans",
      description: "Chemical-grade accumulator blow-moulded jerrycans with tamper-evident ratchet closures, anti-glug pour necks, and UN-rated drop strength.",
      range: "1 Litre – 5 Litres UN-Certified Spec",
      image: "/images/packaging_factory.jpg",
      specs: [
        { label: "Moulding Process", value: "Accumulator Head Extrusion Blow Moulding" },
        { label: "Polymer Resin", value: "Virgin High-Molecular Weight HDPE" },
        { label: "Volume Capacities", value: "1 Litre, 2 Litre, 5 Litre (UN Rated)" },
        { label: "Neck Finish", value: "38mm / 50mm Tamper-Evident Ratchet Thread" },
        { label: "Pouring Dynamics", value: "Integrated Anti-Glug Internal Breather Airway" },
        { label: "Drop & Impact Test", value: "Certified 1.8 Metre Free Fall Drop Test at -18°C" },
      ],
      applications: [
        "Industrial Specialty Chemicals & Reagents",
        "Agricultural Formulations & Pesticides",
        "Automotive Engine Oils & Glycol Coolants",
        "Hospital & Commercial Disinfectant Bulks",
      ]
    },
    {
      id: "bulk-food-containers",
      name: "Wide-Mouth Food & Nutraceutical Bulk Containers",
      description: "US FDA food-contact compliant PET and PP containers engineered for protein powders, dry food ingredients, and hermetic induction sealing.",
      range: "250 ml – 2500 ml",
      image: "/images/products_packaging.jpg",
      specs: [
        { label: "Moulding Process", value: "Injection Stretch Blow Moulding & Precision Injection" },
        { label: "Polymer Resin", value: "US FDA 21 CFR Compliant Food-Grade PET & PP" },
        { label: "Neck Diameter", value: "Φ 83mm, Φ 100mm, Φ 120mm Extra-Wide Mouth" },
        { label: "Closure Compatibility", value: "Ribbed Easy-Grip Cap with Induction Foil Seal" },
        { label: "Moisture Barrier", value: "Ultra-Low Water Vapour Transmission Rate (WVTR)" },
      ],
      applications: [
        "Whey Protein, Creatine & Sports Nutrition Powders",
        "Nutraceutical Powders & Granules",
        "Bakery Ingredients, Dry Confectionery & Candies",
        "Health Supplements & Botanical Powders",
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
