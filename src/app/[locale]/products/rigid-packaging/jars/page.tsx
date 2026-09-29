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

export default async function JarsPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'Products.jars' });

  const products = [
    {
      id: "pp-jars",
      name: t("p1_name"),
      range: t("p1_range"),
      image: "/images/legacy/Photo8.webp",
      specs: [],
    },
    {
      id: "custom-containers",
      name: t("p2_name"),
      range: t("p2_range"),
      image: "/images/legacy/Photo12.webp",
      specs: [],
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
