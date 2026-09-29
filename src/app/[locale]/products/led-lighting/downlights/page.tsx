import ProductSubCategoryTemplate from "@/components/ProductSubCategoryTemplate";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Products.downlights' });
  return { title: `${t('title')} | Sheetal Electrotech` };
}

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'Products.downlights' });

  const products = [
    {
      id: "led-down-light",
      name: t("p0_name"),
      description: t("p0_desc"),
      image: "/images/products/led-down-light.webp",
      specs: [],
      applications: []
    },
    {
      id: "led-down-lighter",
      name: t("p1_name"),
      description: t("p1_desc"),
      image: "/images/products/led-down-lighter.webp",
      specs: [],
      applications: []
    },
    {
      id: "led-down-light-3",
      name: t("p2_name"),
      description: t("p2_desc"),
      image: "/images/products/led-down-light-3.webp",
      specs: [],
      applications: []
    },
    {
      id: "led-ceiling-light",
      name: t("p3_name"),
      description: t("p3_desc"),
      image: "/images/products/led-ceiling-light.png",
      specs: [],
      applications: []
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
