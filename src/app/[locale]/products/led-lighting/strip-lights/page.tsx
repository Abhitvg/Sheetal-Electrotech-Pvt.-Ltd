import ProductSubCategoryTemplate from "@/components/ProductSubCategoryTemplate";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { localizedMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Products.strip-lights' });
  return localizedMetadata(locale, "/products/led-lighting/strip-lights", { en: { title: t("title"), description: t("description") }, hi: { title: t("title"), description: t("description") } });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Products.strip-lights' });

  const products = [
    {
      id: "led-strip-lights",
      name: t("p0_name"),
      description: t("p0_desc"),
      range: "12V / 24V DC Constant Voltage Flexible PCB (5m Rolls)",
      image: "/images/products/led-strip-lights.png",
      specs: [
        { label: "Input Voltage", value: "12V DC & 24V DC Constant Voltage" },
        { label: "LED Density", value: "60, 120, 240 LEDs / Metre High Density" },
        { label: "Wattage Range", value: "4.8W, 9.6W, 14.4W, 18W per Metre" },
        { label: "Ingress Protection", value: "IP20 Bare Indoor / IP65 Silicone Encapsulated Weatherproof" },
        { label: "Color Options", value: "Warm White (3000K), Neutral White (4000K), Daylight (6500K), RGB & RGBW" },
        { label: "Adhesive Backing", value: "Heavy-Bond 3M VHB Thermal Adhesive Tape" },
        { label: "Cut Interval", value: "Every 25 mm (12V) or 50 mm (24V)" },
      ],
      applications: [
        "Architectural Ceiling Cove Indirect Lighting",
        "Under-Counter Kitchen & Cabinet Illumination",
        "Building Facade Linear Contour Accents",
        "Signage & Acrylic Letter Channel Lighting",
        "Aluminium Profile Recessed Step & Handrail Lights",
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
