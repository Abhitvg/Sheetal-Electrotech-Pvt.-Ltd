import ProductSubCategoryTemplate from "@/components/ProductSubCategoryTemplate";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { localizedMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Products.bulbs' });
  return localizedMetadata(locale, "/products/led-lighting/bulbs", { en: { title: t("title"), description: t("description") }, hi: { title: t("title"), description: t("description") } });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Products.bulbs' });

  const products = [
    {
      id: "led-bulb",
      name: t("p0_name"),
      description: t("p0_desc"),
      range: "3W – 12W (B22 / E27)",
      image: "/images/products/led-bulb.png",
      specs: [
        { label: "Wattage Range", value: "3W, 5W, 7W, 9W, 12W" },
        { label: "Input Voltage", value: "100V – 300V AC (50Hz)" },
        { label: "Surge Protection", value: "4KV / 440VAC High Voltage Immune" },
        { label: "Power Factor", value: "> 0.9 PF Active Driver" },
        { label: "Luminous Efficacy", value: "105 lm/W" },
        { label: "CCT / Color", value: "6500K Cool Daylight / 3000K Warm White" },
        { label: "CRI", value: "> 80 Ra High Color Fidelity" },
        { label: "Base Type", value: "B22 / E26 / E27 Nickel-Plated Brass" },
      ],
      applications: [
        "Residential Living & Bedrooms",
        "Commercial Office Task Lighting",
        "Hospitality Corridors & Lobbies",
        "Retail Showroom Displays",
        "General Downlight Fixtures",
      ]
    },
    {
      id: "led-bulb-2",
      name: t("p1_name"),
      description: t("p1_desc"),
      range: "3W – 12W Polycarbonate Thermal Series",
      image: "/images/products/led-bulb-2.png",
      specs: [
        { label: "Wattage Range", value: "3W, 5W, 7W, 9W, 12W" },
        { label: "Beam Angle", value: "180° Omnidirectional Uniform Spread" },
        { label: "Operating Voltage", value: "100V – 300V AC (440V Withstand)" },
        { label: "Housing Material", value: "Thermally Conductive PBT with Aluminium Core" },
        { label: "Diffuser", value: "High-Transmittance Polycarbonate Dome" },
        { label: "Power Factor", value: "> 0.9 PF" },
        { label: "Surge Immunity", value: "4KV Surge Suppressor" },
      ],
      applications: [
        "Modern Architectural Interiors",
        "Executive Offices & Boardrooms",
        "Hospital Patient Rooms & Corridors",
        "Educational Institutions",
      ]
    },
    {
      id: "led-high-power-bulb",
      name: t("p2_name"),
      description: t("p2_desc"),
      range: "18W – 50W High Bay Commercial",
      image: "/images/products/led-high-power-bulb.png",
      specs: [
        { label: "Wattage Options", value: "18W, 24W, 36W, 50W" },
        { label: "Luminous Flux", value: "1,890 – 5,250 Lumens" },
        { label: "Input Voltage", value: "100V – 300V AC" },
        { label: "Surge Protection", value: "4KV / 440VAC Industrial Grade" },
        { label: "Power Factor", value: "> 0.95 PF High Efficiency" },
        { label: "Base Fittings", value: "B22 / E27 / E40 Heavy Duty" },
        { label: "Thermal Management", value: "Internal Cast Aluminium Convective Heatsink" },
      ],
      applications: [
        "Warehousing Bays & Logistics Centers",
        "Industrial Manufacturing Sheds",
        "Supermarket Aisles & High-Ceiling Retail",
        "Basement Parking Complexes",
        "Workshops & Maintenance Garages",
      ]
    },
    {
      id: "led-emergency-bulb",
      name: t("p3_name"),
      description: t("p3_desc"),
      range: "9W Inverter (Li-ion 2200mAh Auto-Backup)",
      image: "/images/products/led-emergency-bulb.webp",
      specs: [
        { label: "Mains Power", value: "9W Full Illumination (900+ lm)" },
        { label: "Backup Power", value: "3.5W Emergency Illumination (350+ lm)" },
        { label: "Backup Duration", value: "Up to 4 Hours Continuous Lighting" },
        { label: "Battery Cell", value: "2200mAh High-Cycle Lithium-Ion" },
        { label: "Switchover Time", value: "< 0.5s Automatic Mains Failure Trigger" },
        { label: "Charging Time", value: "8–10 Hours Auto Trickle Charge" },
        { label: "Surge Immunity", value: "4KV Surge Resistance" },
      ],
      applications: [
        "Emergency Evacuation Corridors & Stairwells",
        "Power-Outage Sensitive Clinics & Pharmacies",
        "Retail Billing Counters & POS Terminals",
        "Residential Emergency Backup",
      ]
    },
    {
      id: "led-candle-bulb",
      name: t("p4_name"),
      description: t("p4_desc"),
      range: "3W & 5W Flame Tip / C35",
      image: "/images/products/led-candle-bulb.png",
      specs: [
        { label: "Wattage", value: "3W & 5W" },
        { label: "Luminous Output", value: "300 lm (3W) / 500 lm (5W)" },
        { label: "Color Options", value: "3000K Warm White / 6500K Cool Daylight" },
        { label: "Beam Angle", value: "270° Ambient Decorative Glow" },
        { label: "Base Type", value: "E14 Small Edison Screw / B22 / E27" },
        { label: "Envelope Style", value: "C35 Candle with Frosted / Clear Glass" },
      ],
      applications: [
        "Crystal Chandeliers & Candelabras",
        "Decorative Wall Sconces & Lanterns",
        "Fine Dining Restaurants & Cafes",
        "Heritage Hotels & Luxury Residences",
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
