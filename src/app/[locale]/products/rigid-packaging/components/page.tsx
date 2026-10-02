import ProductSubCategoryTemplate from "@/components/ProductSubCategoryTemplate";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { localizedMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const en = await getTranslations({ locale: "en", namespace: "Products.components" });
  const hi = await getTranslations({ locale: "hi", namespace: "Products.components" });
  return localizedMetadata(locale, "/products/rigid-packaging/components", {
    en: { title: en("title"), description: en("description") },
    hi: { title: hi("title"), description: hi("description") },
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Products.components' });

  const products = [
    {
      id: "product-1",
      name: t("p1_name"),
      range: "Configured to requirement",
      description: "Injection-moulded plastic components, housings and specified parts for OEM requirements.",
      image: "https://sheetalelectrotech.com/wp-content/uploads/2023/04/MG_8394.jpeg",
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
