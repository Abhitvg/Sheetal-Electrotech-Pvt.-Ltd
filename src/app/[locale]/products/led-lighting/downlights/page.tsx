import ProductSubCategoryTemplate from "@/components/ProductSubCategoryTemplate";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { localizedMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Products.downlights' });
  return localizedMetadata(locale, "/products/led-lighting/downlights", { en: { title: t("title"), description: t("description") }, hi: { title: t("title"), description: t("description") } });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Products.downlights' });

  const products = [
    {
      id: "led-down-light",
      name: t("p0_name"),
      description: t("p0_desc"),
      range: "3W, 5W, 6W, 12W, 15W Concealed & Junction Box",
      image: "/images/products/led-down-light.webp",
      specs: [
        { label: "Wattage Options", value: "3W, 5W, 6W, 12W, 15W" },
        { label: "Cutout Size", value: "Φ 2.0\" (Junction Box) to Φ 7.9\" (Recessed)" },
        { label: "Input Voltage", value: "100V – 300V AC (50Hz)" },
        { label: "Surge Protection", value: "4KV / 440VAC High Voltage Protection" },
        { label: "Luminous Efficacy", value: "100 lm/W" },
        { label: "Beam Angle", value: "120° Wide Ceiling Flood" },
        { label: "Driver", value: "External Isolated Constant-Current Driver" },
      ],
      applications: [
        "Residential Living Rooms & Bedrooms",
        "Concealed Junction Box Slab Mounting",
        "False Ceilings (POP / Gypsum / Grid)",
        "Commercial Office Cabins",
        "Hospitality Foyers & Corridors",
      ]
    },
    {
      id: "led-down-lighter",
      name: t("p1_name"),
      description: t("p1_desc"),
      range: "5W, 10W, 15W, 20W Slim Edge-Lit Panel",
      image: "/images/products/led-down-lighter.webp",
      specs: [
        { label: "Wattage Options", value: "5W, 10W, 15W, 20W" },
        { label: "Profile Depth", value: "Ultra-Slim < 15 mm Form Factor" },
        { label: "Rim Construction", value: "Die-Cast Aluminium with Anti-Glare Bezel" },
        { label: "Optical Light Guide", value: "Laser-Dotted PMMA Light Guide Plate (Non-Yellowing)" },
        { label: "Voltage Band", value: "100V – 300V AC" },
        { label: "Surge Endurance", value: "4KV / 440VAC" },
      ],
      applications: [
        "Low-Plenum Depth Ceilings",
        "Conference Rooms & Meeting Rooms",
        "Executive Suites & Boardrooms",
        "Healthcare Clinics & Patient Rooms",
      ]
    },
    {
      id: "led-down-light-3",
      name: t("p2_name"),
      description: t("p2_desc"),
      range: "6W & 12W Dual Trim (Round & Square)",
      image: "/images/products/led-down-light-3.webp",
      specs: [
        { label: "Trim Geometry", value: "Round & Square Architectural Trims" },
        { label: "Wattage", value: "6W & 12W" },
        { label: "Operating Voltage", value: "100V – 300V AC" },
        { label: "Surge Resistance", value: "4KV / 440VAC" },
        { label: "Color Quality", value: "CRI > 80 Ra, 6500K / 3000K Options" },
        { label: "Luminous Efficacy", value: "100 lm/W" },
      ],
      applications: [
        "Designer Residential Interiors",
        "Boutique Showrooms & Fashion Stores",
        "Restaurant Ambient Downlighting",
        "Art Galleries & Reception Desks",
      ]
    },
    {
      id: "led-ceiling-light",
      name: t("p3_name"),
      description: t("p3_desc"),
      range: "24W, 36W, 40W, 50W (2×2 Ft & 1×4 Ft Modular Panels)",
      image: "/images/products/led-ceiling-light.png",
      specs: [
        { label: "Dimensions", value: "595 × 595 mm (2×2 Ft) & 1195 × 295 mm (1×4 Ft)" },
        { label: "Wattage Options", value: "24W, 36W, 40W, 50W" },
        { label: "Luminous Efficacy", value: "110 – 120 lm/W High Efficiency" },
        { label: "Power Factor & THD", value: "≥ 0.95 PF, THD < 10%" },
        { label: "Surge Immunity", value: "4KV / 440VAC Surge Protection" },
        { label: "Frame", value: "Seamless Extruded Aluminium Thermal Frame" },
      ],
      applications: [
        "Corporate IT Offices & Workstations",
        "Hospitals & Cleanroom Environments",
        "University Lecture Theatres & Libraries",
        "Banking Halls & Commercial Centers",
      ]
    },
    {
      id: "surface-ring",
      name: t("p4_name"),
      description: t("p4_desc"),
      range: "Universal Surface Mounting Conversion Ring",
      image: "/images/products/surface-ring.png",
      specs: [
        { label: "Material", value: "High-Impact UV-Stabilized Polycarbonate" },
        { label: "Mounting Style", value: "Direct Ceiling Surface Screw-Fix Adaptor" },
        { label: "Compatibility", value: "Converts Standard 3W–15W Concealed Downlights to Surface Mount" },
        { label: "Finish", value: "Architectural Matte White & Matte Grey" },
        { label: "Thermal Stability", value: "Heat Resistant up to 125°C Flame Deflection" },
      ],
      applications: [
        "Solid RCC Slab Ceilings (Non-False Ceiling)",
        "Industrial Corridor Retrofit Upgrades",
        "Residential Renovations without Ceiling Modification",
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
