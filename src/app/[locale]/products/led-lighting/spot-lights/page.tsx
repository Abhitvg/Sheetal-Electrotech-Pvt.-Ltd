import ProductSubCategoryTemplate from "@/components/ProductSubCategoryTemplate";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Products.spot-lights' });
  return { title: `${t('title')} | Sheetal Electrotech` };
}

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'Products.spot-lights' });

  const products = [
    {
      id: "product-1",
      name: t("p1_name"),
      range: t("p1_range"),
      image: "/images/legacy/Photo13.webp",
      specs: [
        { label: t("p1_s1_l"), value: t("p1_s1_v") },
        { label: t("p1_s2_l"), value: t("p1_s2_v") },
        { label: t("p1_s3_l"), value: t("p1_s3_v") },
      ],
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
