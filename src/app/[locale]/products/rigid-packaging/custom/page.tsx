import ProductSubCategoryTemplate from "@/components/ProductSubCategoryTemplate";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { localizedMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const en = await getTranslations({ locale: "en", namespace: "Products.custom" });
  const hi = await getTranslations({ locale: "hi", namespace: "Products.custom" });
  return localizedMetadata(locale, "/products/rigid-packaging/custom", {
    en: { title: en("title"), description: en("description") },
    hi: { title: hi("title"), description: hi("description") },
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Products.custom' });

  const products = [
    {
      id: "custom-blow-moulding",
      name: "Bespoke Tooling & Custom Blow-Moulded Geometries",
      description: "End-to-end tooling cycle from parametric 3D CAD modeling to in-house CNC tool room fabrication and multi-cavity serial manufacturing.",
      range: "Bespoke OEM Formats & Tooling",
      image: "/images/packaging_factory.jpg",
      specs: [
        { label: "Engineering Scope", value: "3D CAD Concept → SLA Prototyping → In-House Tool Room → Serial Production" },
        { label: "Mould Tool Steels", value: "Hardened P20, DIN 1.2316 Stainless Steel & Aircraft Aluminium 7075" },
        { label: "Dimensional Tolerance", value: "Precision Machining within ±0.02 mm" },
        { label: "Quality Validation", value: "CMM Coordinate Measuring, Drop Impact, Top-Load Compressive Stress" },
      ],
      applications: [
        "Patented Proprietary Brand Bottles",
        "Dual-Chamber & Multi-Compartment Dispensing Systems",
        "Ergonomic Contour Grip Formats",
        "Unique Aesthetic Shapes for FMCG Market Differentiation",
      ]
    },
    {
      id: "custom-technical-mouldings",
      name: "High-Tolerance Technical Injection Mouldings",
      description: "Precision-moulded structural plastic enclosures, instrument housings, and optical lens components for electrical, lighting and OEM applications.",
      range: "Micro-Precision to 350T Press Components",
      image: "/images/tool_room.jpg",
      specs: [
        { label: "Machine Capacity", value: "50 Ton to 350 Ton Microprocessor Injection Moulding Presses" },
        { label: "Engineered Resins", value: "Polycarbonate (PC), Nylon 6/66 (PA), ABS, PBT, Polypropylene" },
        { label: "Shot Weight Envelope", value: "5 grams to 650 grams per Cycle" },
        { label: "Flame Retardancy", value: "UL94 V-0 and V-2 Self-Extinguishing Engineering Grades" },
        { label: "Secondary Operations", value: "Ultrasonic Plastic Welding, Pad Printing, Laser Marking & Sub-Assembly" },
      ],
      applications: [
        "LED Lighting Driver Housings & Reflectors",
        "Electronic Enclosures & Terminal Blocks",
        "Automotive Dashboard & Electrical Brackets",
        "Medical Device Shells & Consumable Components",
      ]
    }
  ];

  return (
    <ProductSubCategoryTemplate
      title={t("title")}
      category="rigid-packaging"
      description={t("description")}
      products={products}
    />
  );
}
