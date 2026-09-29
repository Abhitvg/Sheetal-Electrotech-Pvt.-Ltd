import ProductSubCategoryTemplate from "@/components/ProductSubCategoryTemplate";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Products.street-lights' });
  return { title: `${t('title')} | Sheetal Electrotech` };
}

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'Products.street-lights' });

  const products = [
    {
      id: "led-street-light-2",
      name: t("p0_name"),
      description: t("p0_desc"),
      image: "/images/products/led-street-light-2.png",
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
