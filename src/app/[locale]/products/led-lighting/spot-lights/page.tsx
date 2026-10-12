import ProductSubCategoryTemplate from "@/components/ProductSubCategoryTemplate";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { localizedMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Products.spot-lights' });
  return localizedMetadata(locale, "/products/led-lighting/spot-lights", { en: { title: t("title"), description: t("description") }, hi: { title: t("title"), description: t("description") } });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Products.spot-lights' });

  const products = [
    {
      id: "led-spot-light",
      name: t("p0_name"),
      description: t("p0_desc"),
      range: "3W, 4W, 5W GU10 / MR16 / G9 Bi-Pin",
      image: "/images/products/led-spot-light.png",
      specs: [
        { label: "Optical Designs", value: "50° Precision Lens, 120° Frosted Diffuser & 300° G9 Capsule" },
        { label: "Wattage Options", value: "3W, 4W, 5W" },
        { label: "Input Voltage", value: "100V – 300V AC (GU10) & 12V DC (GU5.3 MR16)" },
        { label: "Luminous Efficacy", value: "100 lm/W" },
        { label: "Base Fittings", value: "GU10 Twist-Lock, GU5.3 Bi-Pin, G9 Capsule" },
        { label: "Body Construction", value: "Die-Cast Thermal Aluminium with Anodized Finish" },
        { label: "Color Quality", value: "CRI > 85 Ra High-Definition Visuals" },
      ],
      applications: [
        "Jewelry & Watch Display Counters",
        "Museum & Art Gallery Spotlighting",
        "Retail Mannequin & Window Displays",
        "Accent Wall Grazing & Niche Lighting",
        "Hospitality Bar & Counter Lighting",
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
