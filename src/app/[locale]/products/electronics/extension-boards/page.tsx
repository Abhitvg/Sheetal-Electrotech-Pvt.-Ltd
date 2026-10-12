import ProductSubCategoryTemplate from "@/components/ProductSubCategoryTemplate";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { localizedMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Products.extension-boards' });
  return localizedMetadata(locale, "/products/electronics/extension-boards", { en: { title: t("title"), description: t("description") }, hi: { title: t("title"), description: t("description") } });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Products.extension-boards' });

  const products = [
    {
      id: "extension-board",
      name: t("p0_name"),
      description: t("p0_desc"),
      range: "4-Way & 6-Way Surge Protected Power Strip",
      image: "/images/products/extension-board.webp",
      specs: [
        { label: "Rated Voltage & Frequency", value: "240V AC, 50/60 Hz" },
        { label: "Current & Power Capacity", value: "10A Max / 2400W Resistive Load" },
        { label: "Surge Protection", value: "High-Energy MOV Surge Absorber (10,000A Spike Clamping)" },
        { label: "Overload Breaker", value: "Built-In Resettable Thermal Circuit Breaker" },
        { label: "Socket Configurations", value: "Universal International Multi-Pin Sockets" },
        { label: "Housing Material", value: "High-Impact Flame-Retardant Engineered PC / ABS" },
        { label: "Contact Blades", value: "Heavy-Gauge Phosphor Bronze for Low Resistance" },
        { label: "Cord Length", value: "1.5m / 2.0m / 2.5m Pure Copper 3-Core Cable with Moulded Plug" },
      ],
      applications: [
        "Home Entertainment & TV Media Consoles",
        "Computer Workstations & Server Racks",
        "Industrial Electronic Testing Benches",
        "Commercial Offices & Co-Working Hubs",
        "Laboratory Instrumentation & Audio Gear",
      ]
    }
  ];

  return (
    <ProductSubCategoryTemplate
      title={t("title")}
      category="electronics"
      description={t("description")}
      products={products}
    />
  );
}
