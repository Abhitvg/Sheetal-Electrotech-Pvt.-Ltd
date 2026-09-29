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

export default async function BottlesPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'Products.bottles' });

  const products = [
    {
      id: "hdpe-bottles",
      name: t("p1_name"),
      range: t("p1_range"),
      image: "/images/legacy/Photo7.webp",
      specs: [],
    },
    {
      id: "pet-bottles",
      name: t("p2_name"),
      range: t("p2_range"),
      image: "/images/legacy/Photo9.webp",
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
