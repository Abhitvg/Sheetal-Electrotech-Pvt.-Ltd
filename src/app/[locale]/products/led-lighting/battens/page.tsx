import ProductSubCategoryTemplate from "@/components/ProductSubCategoryTemplate";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Products.battens' });
  return { title: `${t('title')} | Sheetal Electrotech` };
}

export default async function LEDBattensPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'Products.battens' });

  const products = [
    {
      id: "led-batten",
      name: t("p1_name"),
      range: t("p1_range"),
      image: "/images/legacy/10-3.webp",
      specs: [
        { label: t("p1_s1_l"), value: t("p1_s1_v") },
        { label: t("p1_s2_l"), value: t("p1_s2_v") },
        { label: t("p1_s3_l"), value: t("p1_s3_v") },
      ],
    },
    {
      id: "high-power-led-batten",
      name: t("p2_name"),
      range: t("p2_range"),
      image: "/images/legacy/4-3.webp",
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
      category="led-lighting"
      description={t("description")}
      products={products}
    />
  );
}
