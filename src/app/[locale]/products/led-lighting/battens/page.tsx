import ProductSubCategoryTemplate from "@/components/ProductSubCategoryTemplate";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Products.battens' });
  return { title: `${t('title')} | Sheetal Electrotech` };
}

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'Products.battens' });

  const products = [
    {
      id: "led-batten",
      name: t("p0_name"),
      description: t("p0_desc"),
      image: "/images/products/led-batten.png",
      specs: [],
      applications: []
    },
    {
      id: "led-high-power-batten",
      name: t("p1_name"),
      description: t("p1_desc"),
      image: "/images/products/led-high-power-batten.webp",
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
