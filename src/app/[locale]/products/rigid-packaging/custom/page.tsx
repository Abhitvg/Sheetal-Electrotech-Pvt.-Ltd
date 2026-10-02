import ProductSubCategoryTemplate from "@/components/ProductSubCategoryTemplate";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { localizedMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const en = await getTranslations({ locale: "en", namespace: "Products.custom" });
  const hi = await getTranslations({ locale: "hi", namespace: "Products.custom" });
  return localizedMetadata(locale, "/products/rigid-packaging/custom", {
    en: { title: en("title"), description: en("description") },
    hi: { title: hi("title"), description: hi("description") },
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Products.custom' });

  const products = [
    {
      id: "product-1",
      name: t("p1_name"),
      range: "Custom",
      description: "Custom moulded packaging developed against defined product, tooling and manufacturing requirements.",
      image: "https://sheetalelectrotech.com/wp-content/uploads/2023/04/IMG_8665.png",
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
