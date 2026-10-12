import ProductSubCategoryTemplate from "@/components/ProductSubCategoryTemplate";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { localizedMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Products.battens' });
  return localizedMetadata(locale, "/products/led-lighting/battens", { en: { title: t("title"), description: t("description") }, hi: { title: t("title"), description: t("description") } });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Products.battens' });

  const products = [
    {
      id: "led-batten",
      name: t("p0_name"),
      description: t("p0_desc"),
      range: "5W, 10W, 20W, 24W (1 Ft, 2 Ft, 4 Ft)",
      image: "/images/products/led-batten.png",
      specs: [
        { label: "Wattage Options", value: "5W, 10W, 20W, 24W" },
        { label: "Length / Form", value: "300 mm (1 Ft), 600 mm (2 Ft), 1135–1185 mm (4 Ft)" },
        { label: "Input Voltage", value: "100V – 300V AC (440V Withstand)" },
        { label: "Surge Protection", value: "4KV / 440VAC Industrial Grade" },
        { label: "Power Factor", value: "≥ 0.9 PF Low THD Driver" },
        { label: "Luminous Efficacy", value: "100 lm/W" },
        { label: "Housing Material", value: "PC-PC Co-Extruded Polycarbonate Body" },
        { label: "Beam Angle", value: "120° Uniform Diffuse Lighting" },
      ],
      applications: [
        "Corporate Offices & Workstations",
        "School & College Classrooms",
        "Residential Kitchens & Hallways",
        "Basement Parking & Garages",
        "Under-Cabinet & Cove Linear Accents",
      ]
    },
    {
      id: "led-high-power-batten",
      name: t("p1_name"),
      description: t("p1_desc"),
      range: "22W – 36W High-Lumen T-Batten (300° Spread)",
      image: "/images/products/led-high-power-batten.webp",
      specs: [
        { label: "Wattage Options", value: "22W, 24W, 28W, 36W" },
        { label: "Beam Angle", value: "300° Cylindrical Beam Angle" },
        { label: "Input Voltage", value: "100V – 300V AC Wide Operating Band" },
        { label: "Surge Protection", value: "4KV Surge Immunity" },
        { label: "Construction", value: "Heavy-Duty Extruded Aluminium Spine with PC Diffuser" },
        { label: "Power Factor", value: "≥ 0.95 PF High Efficiency" },
        { label: "Luminous Efficacy", value: "110 – 115 lm/W Ultra Bright" },
      ],
      applications: [
        "Warehouses & Logistics Sheds",
        "Manufacturing Lines & Assembly Floors",
        "Commercial Supermarkets & Wholesale Depots",
        "High-Ceiling Commercial Corridors",
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
