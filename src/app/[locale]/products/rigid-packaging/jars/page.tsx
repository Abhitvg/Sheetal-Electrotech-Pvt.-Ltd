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
      description: "Rigid plastic jar and container formats supported by integrated moulding capabilities.",
      range: "Configured to requirement",
      image: "https://sheetalelectrotech.com/wp-content/uploads/2023/05/blow.png",
      specs: [],
    },
    {
      id: "custom-containers",
      name: t("p2_name"),
      description: "Custom moulded packaging formats developed around the required geometry and application.",
      range: "Custom",
      image: "https://sheetalelectrotech.com/wp-content/uploads/2023/05/blow.png",
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
