import ProductSubCategoryTemplate from "@/components/ProductSubCategoryTemplate";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Products.bottles' });
  return { title: `${t('title')} | Sheetal Electrotech` };
}

export default async function BottlesPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'Products.bottles' });

  const products = [
    {
      id: "hdpe-bottles",
      name: t("p1_name"),
      range: t("p1_range"),
      image: "/images/legacy/Photo7.webp",
      specs: [
        { label: t("p1_s1_l"), value: t("p1_s1_v") },
        { label: t("p1_s2_l"), value: t("p1_s2_v") },
        { label: t("p1_s3_l"), value: t("p1_s3_v") },
      ],
    },
    {
      id: "pet-bottles",
      name: t("p2_name"),
      range: t("p2_range"),
      image: "/images/legacy/Photo9.webp",
      specs: [
        { label: t("p2_s1_l"), value: t("p2_s1_v") },
        { label: t("p2_s2_l"), value: t("p2_s2_v") },
        { label: t("p2_s3_l"), value: t("p2_s3_v") },
      ],
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
