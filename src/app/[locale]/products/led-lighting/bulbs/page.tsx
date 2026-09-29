import ProductSubCategoryTemplate from "@/components/ProductSubCategoryTemplate";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Products.bulbs' });
  return { title: `${t('title')} | Sheetal Electrotech` };
}

export default async function LEDBulbsPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'Products.bulbs' });
  
  const products = [
    {
      id: "led-bulb-standard",
      name: t("p1_name"),
      range: t("p1_range"),
      image: "/images/legacy/Photo13.webp",
      specs: [
        { label: t("p1_s1_l"), value: t("p1_s1_v") },
        { label: t("p1_s2_l"), value: t("p1_s2_v") },
        { label: t("p1_s3_l"), value: t("p1_s3_v") },
      ],
    },
    {
      id: "led-bulb-premium",
      name: t("p2_name"),
      range: t("p2_range"),
      image: "/images/legacy/Photo15.webp",
      specs: [
        { label: t("p2_s1_l"), value: t("p2_s1_v") },
        { label: t("p2_s2_l"), value: t("p2_s2_v") },
        { label: t("p2_s3_l"), value: t("p2_s3_v") },
      ],
    },
    {
      id: "high-power-bulb",
      name: t("p3_name"),
      range: t("p3_range"),
      image: "/images/legacy/po-jpg.webp",
      specs: [
        { label: t("p3_s1_l"), value: t("p3_s1_v") },
        { label: t("p3_s2_l"), value: t("p3_s2_v") },
        { label: t("p3_s3_l"), value: t("p3_s3_v") },
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
