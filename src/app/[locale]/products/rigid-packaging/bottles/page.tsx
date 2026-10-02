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

export default async function BottlesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Products.bottles' });

  const products = [
    {
      id: "hdpe-bottles",
      name: t("p1_name"),
      description: "Plastic bottle formats supported through Sheetal Electrotech’s blow moulding and injection blow moulding capabilities.",
      range: "Configured to requirement",
      image: "https://sheetalelectrotech.com/wp-content/uploads/2023/05/blow.png",
      specs: [],
    },
    {
      id: "pet-bottles",
      name: t("p2_name"),
      description: "Hollow plastic product formats developed around specified size, geometry and application requirements.",
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
