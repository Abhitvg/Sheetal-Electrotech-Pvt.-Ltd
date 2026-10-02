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
      id: "product-1",
      name: t("p1_name"),
      description: "Rigid plastic container formats supported by Sheetal Electrotech’s integrated moulding processes.",
      range: "Configured to requirement",
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
