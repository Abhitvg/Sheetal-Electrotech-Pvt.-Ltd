import ProductSubCategoryTemplate from "@/components/ProductSubCategoryTemplate";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { localizedMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Products.decorative-lights' });
  return localizedMetadata(locale, "/products/led-lighting/decorative-lights", { en: { title: t("title"), description: t("description") }, hi: { title: t("title"), description: t("description") } });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Products.decorative-lights' });

  const products = [
    {
      id: "led-decorative-light",
      name: t("p0_name"),
      description: t("p0_desc"),
      range: "0.5W Night Lamp, 7-in-1 Color Cycle & Dual USB Charger",
      image: "/images/products/led-decorative-light.png",
      specs: [
        { label: "Power Consumption", value: "0.5W Ultra-Low Power Draw" },
        { label: "Operating Voltage", value: "100V – 300V AC (50Hz)" },
        { label: "Color Modes", value: "RGBWY Solid Colors & 7-in-1 Auto Color Cycling" },
        { label: "Form & Mounting", value: "B22 Lamp Cap, Direct 2-Pin Wall Plug, USB Fast Charger Hub" },
        { label: "Beam Diffusion", value: "220° Frosted Polycarbonate Dome" },
        { label: "USB Output (Charger Models)", value: "5V DC / 2.4A Fast Dual-Port Charging" },
      ],
      applications: [
        "Bedside Night Lighting",
        "Children's Bedrooms & Nurseries",
        "Hotel Guest Room Wayfinding",
        "Temple & Meditation Rooms",
        "Hallway & Corridor Soft Accents",
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
