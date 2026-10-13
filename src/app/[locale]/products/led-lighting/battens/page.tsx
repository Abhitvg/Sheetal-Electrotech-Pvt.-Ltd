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
      range: "5W – 50W (1 Ft, 2 Ft, 4 Ft, 5 Ft Profiles)",
      image: "/images/products/led-batten.png",
      specs: [
        { label: "Wattage Options", value: "5W, 10W, 20W, 22W, 24W, 28W, 36W, 40W, 50W" },
        { label: "CCT Spectrum", value: "3000K (Warm), 4000K (Neutral), 6500K (Cool Day), 7000K (Ultra Daylight) & 3CCT" },
        { label: "Lumen Output", value: "2,200 Lumens (20W), up to 5,500 Lumens (50W)" },
        { label: "Operating Voltage", value: "220V–240V AC, 50Hz (100V–300V Wide Band Withstand)" },
        { label: "Rated Current", value: "102 mA (@ 20W 2200 lm, 220–240VAC)" },
        { label: "Length / Form", value: "300 mm (1 Ft), 600 mm (2 Ft), 1135–1185 mm (4 Ft), 1500 mm (5 Ft)" },
        { label: "Surge Protection", value: "4KV / 440VAC Industrial Grade" },
        { label: "Power Factor", value: "≥ 0.95 PF Low THD Driver" },
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
      range: "22W – 50W High-Lumen T-Batten (300° Spread)",
      image: "/images/products/led-high-power-batten.webp",
      specs: [
        { label: "Wattage Options", value: "22W, 24W, 28W, 36W, 40W, 50W" },
        { label: "CCT Options", value: "3000K / 4000K / 6500K / 7000K (Ultra Daylight)" },
        { label: "Lumen Output", value: "2,420 lm to 5,500 lm (110 lm/W Ultra Bright)" },
        { label: "Rated Current", value: "108 mA to 232 mA (@ 220–240V AC, 50Hz)" },
        { label: "Beam Angle", value: "300° Cylindrical Beam Angle" },
        { label: "Input Voltage", value: "220V–240V AC, 50Hz (100V–300V AC Withstand)" },
        { label: "Surge Protection", value: "4KV Surge Immunity" },
        { label: "Construction", value: "Heavy-Duty Extruded Aluminium Spine with PC Diffuser" },
        { label: "Power Factor", value: "≥ 0.95 PF High Efficiency" },
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
