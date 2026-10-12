import ProductSubCategoryTemplate from "@/components/ProductSubCategoryTemplate";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { localizedMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Products.smart-led' });
  return localizedMetadata(locale, "/products/led-lighting/smart-led", { en: { title: t("title"), description: t("description") }, hi: { title: t("title"), description: t("description") } });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Products.smart-led' });

  const products = [
    {
      id: "smart-led-bulb",
      name: t("p0_name"),
      description: t("p0_desc"),
      range: "9W, 12W, 15W Wi-Fi + BLE, RF Remote & Radar Sensor",
      image: "/images/products/smart-led-bulb.png",
      specs: [
        { label: "Wireless Connectivity", value: "Wi-Fi (2.4GHz) + Bluetooth Low Energy (BLE Mesh)" },
        { label: "Color Palette", value: "16 Million RGB Colors + Tunable White (2700K Warm to 6500K Cool)" },
        { label: "Dimming Control", value: "Smooth Stepless Dimming (1% to 100%)" },
        { label: "Alternative Control Options", value: "2.4GHz Handheld RF Remote, Wall-Switch Step CCT, Microwave Radar" },
        { label: "Smart Ecosystem", value: "Amazon Alexa, Google Home & Smart Life App Compatible" },
        { label: "Voltage Range", value: "100V – 300V AC (Surge Protected)" },
        { label: "Power Factor", value: "> 0.9 PF High Efficiency" },
      ],
      applications: [
        "Smart Home Automation Systems",
        "Hospitality Guest Ambiance & Scene Control",
        "Corridors & Restrooms (Microwave Radar Motion Auto-On)",
        "Entertainment Centers & Gaming Setups",
        "Commercial Retail Dynamic Lighting",
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
