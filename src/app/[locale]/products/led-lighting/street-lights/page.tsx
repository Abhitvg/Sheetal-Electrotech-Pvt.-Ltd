import ProductSubCategoryTemplate from "@/components/ProductSubCategoryTemplate";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { localizedMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Products.street-lights' });
  return localizedMetadata(locale, "/products/led-lighting/street-lights", { en: { title: t("title"), description: t("description") }, hi: { title: t("title"), description: t("description") } });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Products.street-lights' });

  const products = [
    {
      id: "led-street-light-2",
      name: t("p0_name"),
      description: t("p0_desc"),
      range: "20W, 30W, 40W, 50W, 60W, 80W, 100W",
      image: "/images/products/led-street-light-2.png",
      specs: [
        { label: "Wattage Options", value: "20W, 30W, 40W, 50W, 60W, 80W, 100W" },
        { label: "Ingress Protection", value: "IP66 Dust-Tight & Heavy Rain Weatherproof" },
        { label: "Surge Immunity", value: "5KV – 6KV Lightning Surge Protection" },
        { label: "Beam Distribution", value: "120° Batwing Roadway Optical Lens" },
        { label: "Operating Voltage", value: "100V – 300V AC (440V Sustained Withstand)" },
        { label: "Body Construction", value: "High-Pressure All Die-Cast Aluminium ADC12" },
        { label: "Spigot / Pipe Mounting", value: "Φ 40 mm – Φ 60 mm Adjustable Pole Entry" },
        { label: "Luminous Efficacy", value: "100 lm/W System Efficiency" },
      ],
      applications: [
        "National & State Highway Roadways",
        "Municipal City Streets & Urban Avenues",
        "Industrial Township Perimeters & Plants",
        "Smart City Parks & Public Walkways",
        "University & Hospital Campus Roads",
      ]
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
