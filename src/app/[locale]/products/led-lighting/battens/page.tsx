import ProductSubCategoryTemplate from "@/components/ProductSubCategoryTemplate";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { localizedMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Products.battens' });
  return localizedMetadata(locale, "/products/led-lighting/battens", { en: { title: t("title"), description: t("description") }, hi: { title: t("title"), description: t("description") } });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Products.battens' });

  const products = [
    {
      id: "led-batten",
      name: t("p0_name"),
      description: t("p0_desc"),
      image: "/images/products/led-batten.png",
      specs: [],
      applications: []
    },
    {
      id: "led-high-power-batten",
      name: t("p1_name"),
      description: t("p1_desc"),
      image: "/images/products/led-high-power-batten.webp",
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
