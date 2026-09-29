import ProductSubCategoryTemplate from "@/components/ProductSubCategoryTemplate";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Products.jars' });
  return { title: `${t('title')} | Sheetal Electrotech` };
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
