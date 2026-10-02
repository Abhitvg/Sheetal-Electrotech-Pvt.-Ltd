import ProductSubCategoryTemplate from "@/components/ProductSubCategoryTemplate";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { localizedMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Products.bulbs' });
  return localizedMetadata(locale, "/products/led-lighting/bulbs", { en: { title: t("title"), description: t("description") }, hi: { title: t("title"), description: t("description") } });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Products.bulbs' });

  const products = [
    {
      id: "led-bulb",
      name: t("p0_name"),
      description: t("p0_desc"),
      image: "/images/products/led-bulb.png",
      specs: [],
      applications: []
    },
    {
      id: "led-bulb-2",
      name: t("p1_name"),
      description: t("p1_desc"),
      image: "/images/products/led-bulb-2.png",
      specs: [],
      applications: []
    },
    {
      id: "led-high-power-bulb",
      name: t("p2_name"),
      description: t("p2_desc"),
      image: "/images/products/led-high-power-bulb.png",
      specs: [],
      applications: []
    },
    {
      id: "led-emergency-bulb",
      name: t("p3_name"),
      description: t("p3_desc"),
      image: "/images/products/led-emergency-bulb.webp",
      specs: [],
      applications: []
    },
    {
      id: "led-candle-bulb",
      name: t("p4_name"),
      description: t("p4_desc"),
      image: "/images/products/led-candle-bulb.png",
      specs: [],
      applications: []
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
