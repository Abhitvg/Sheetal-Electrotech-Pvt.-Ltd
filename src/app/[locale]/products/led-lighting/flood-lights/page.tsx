import ProductSubCategoryTemplate from "@/components/ProductSubCategoryTemplate";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { localizedMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Products.flood-lights' });
  return localizedMetadata(locale, "/products/led-lighting/flood-lights", { en: { title: t("title"), description: t("description") }, hi: { title: t("title"), description: t("description") } });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Products.flood-lights' });

  const products = [
    {
      id: "led-flood-well-light",
      name: t("p0_name"),
      description: t("p0_desc"),
      range: "20W – 100W Flood & 40W/50W Well-Glass",
      image: "/images/products/led-flood-well-light.png",
      specs: [
        { label: "Luminaire Options", value: "Flood Light (20W–100W) & Industrial Well-Glass (40W/50W)" },
        { label: "Ingress Protection", value: "IP66 Weatherproof / Dust-Tight Seal" },
        { label: "Surge Protection", value: "5KV – 6KV Heavy Surge Suppression" },
        { label: "Operating Voltage", value: "100V – 300V AC (440V Withstand)" },
        { label: "Enclosure Material", value: "Heavy-Duty Die-Cast Aluminium with Corrosion-Resistant Powder Coating" },
        { label: "Optical Cover", value: "4mm Toughened Thermal Shock Proof Glass" },
        { label: "Mounting Bracket", value: "Heavy-Gauge Steel 180° Swivel Cradle Mount" },
      ],
      applications: [
        "Stadiums & Sports Playgrounds",
        "Industrial Yards, Loading Bays & Warehouses",
        "Architectural Facades & Monument Uplighting",
        "Heavy Engineering Plants & Hazardous Foundries",
        "High-Mast Lighting & Security Perimeters",
      ]
    }
  ];

  return (
    <ProductSubCategoryTemplate
      title={t("title")}
      category="led-lighting"
      description={t("description")}
      products={products}
    />
  );
}
