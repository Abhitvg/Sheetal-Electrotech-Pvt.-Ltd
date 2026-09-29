const fs = require('fs');
const path = require('path');

const ledLightingCategories = [
  { slug: "downlights", title: "LED Downlights & Panels", desc: "Sleek downlights and ceiling panels.", img: "/images/legacy/Photo13.webp" },
  { slug: "street-lights", title: "LED Street Lights", desc: "Durable and bright street luminaires.", img: "/images/legacy/4-3.webp" },
  { slug: "flood-lights", title: "LED Flood Lights", desc: "High-power flood lights for outdoors.", img: "/images/legacy/10-3.webp" },
  { slug: "spot-lights", title: "LED Spot Lights", desc: "Precision spot lighting.", img: "/images/legacy/Photo13.webp" },
  { slug: "decorative-lights", title: "Decorative Lighting", desc: "Aesthetic LED fixtures.", img: "/images/legacy/4-3.webp" },
  { slug: "smart-led", title: "Smart LED Lighting", desc: "IoT enabled smart lighting.", img: "/images/legacy/10-3.webp" },
  { slug: "strip-lights", title: "LED Strip Lights", desc: "Flexible LED strips.", img: "/images/legacy/Photo13.webp" }
];

const rigidPackagingCategories = [
  { slug: "containers", title: "Containers", desc: "Durable storage containers.", img: "/images/legacy/4-3.webp" },
  { slug: "custom", title: "Custom Packaging", desc: "Tailored packaging designs.", img: "/images/legacy/10-3.webp" },
  { slug: "components", title: "Injection-Moulded Components", desc: "High-precision components.", img: "/images/legacy/Photo13.webp" }
];

const electronicsCategories = [
  { slug: "extension-boards", title: "Extension Boards", desc: "Safe and durable power extensions.", img: "/images/legacy/4-3.webp" }
];

function createPageCode(categoryPath, namespace) {
  return `import ProductSubCategoryTemplate from "@/components/ProductSubCategoryTemplate";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Products.${namespace}' });
  return { title: \`\${t('title')} | Sheetal Electrotech\` };
}

export default async function Page({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'Products.${namespace}' });

  const products = [
    {
      id: "product-1",
      name: t("p1_name"),
      range: t("p1_range"),
      image: "/images/legacy/Photo13.webp",
      specs: [
        { label: t("p1_s1_l"), value: t("p1_s1_v") },
        { label: t("p1_s2_l"), value: t("p1_s2_v") },
        { label: t("p1_s3_l"), value: t("p1_s3_v") },
      ],
    }
  ];

  return (
    <ProductSubCategoryTemplate
      title={t("title")}
      category="${categoryPath}"
      description={t("description")}
      products={products}
    />
  );
}
`;
}

function processCategories(parentDir, cats, parentCatName) {
  for (const cat of cats) {
    const dir = path.join('src/app/[locale]/products', parentDir, cat.slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'page.tsx'), createPageCode(parentDir, cat.slug));
  }
}

// 1. Create page.tsx files
processCategories('led-lighting', ledLightingCategories);
processCategories('rigid-packaging', rigidPackagingCategories);
processCategories('electronics', electronicsCategories);

// Create electronics root
const electronicsRoot = `import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";

const subCategories = [
  {
    title: "Extension Boards",
    description: "Safe and durable power extensions.",
    href: "/products/electronics/extension-boards",
    image: "/images/legacy/4-3.webp"
  }
];

export default function ElectronicsPage() {
  return (
    <div className="min-h-screen bg-paper pb-24">
      <div className="bg-mist text-ink pt-32 pb-16 border-b border-steel/10">
        <div className="container-wide">
          <Link href="/products" className="text-steel hover:text-accent text-sm font-mono uppercase tracking-widest mb-4 inline-block">
            ← Back to Products
          </Link>
          <h1 className="text-5xl md:text-7xl font-display font-medium mb-6">
            Electronics & Accessories
          </h1>
          <p className="text-steel text-xl max-w-2xl">
            Reliable electronic products manufactured in-house.
          </p>
        </div>
      </div>
      <div className="container-wide py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {subCategories.map((cat) => (
            <Link key={cat.title} href={cat.href} className="group block bg-white border border-steel/15 hover:border-accent/30 transition-all overflow-hidden">
              <div className="h-64 relative bg-mist p-8 flex items-center justify-center">
                <Image src={cat.image} alt={cat.title} fill className="object-contain p-8 group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-8">
                <h2 className="text-2xl font-display font-bold text-ink mb-2 flex items-center justify-between">
                  {cat.title}
                  <ArrowRight className="w-5 h-5 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                </h2>
                <p className="text-steel">{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
`;
fs.writeFileSync(path.join('src/app/[locale]/products/electronics', 'page.tsx'), electronicsRoot);

// 2. Update JSON files
const enJsonPath = 'messages/en.json';
const hiJsonPath = 'messages/hi.json';

const allCats = [...ledLightingCategories, ...rigidPackagingCategories, ...electronicsCategories];

function getTranslationsObj(cats, isHindi) {
  const obj = {};
  for (const cat of cats) {
    obj[cat.slug] = {
      title: isHindi ? (cat.title + " (HI)") : cat.title,
      description: isHindi ? (cat.desc + " (HI)") : cat.desc,
      p1_name: isHindi ? "उत्पाद 1" : "Product 1",
      p1_range: "Various",
      p1_s1_l: isHindi ? "सामग्री" : "Material",
      p1_s1_v: "Standard",
      p1_s2_l: isHindi ? "आयाम" : "Dimensions",
      p1_s2_v: "Standard",
      p1_s3_l: isHindi ? "अनुप्रयोग" : "Applications",
      p1_s3_v: "Various",
    };
  }
  return obj;
}

const enJson = JSON.parse(fs.readFileSync(enJsonPath, 'utf8'));
const hiJson = JSON.parse(fs.readFileSync(hiJsonPath, 'utf8'));

Object.assign(enJson.Products, getTranslationsObj(allCats, false));
Object.assign(hiJson.Products, getTranslationsObj(allCats, true));

fs.writeFileSync(enJsonPath, JSON.stringify(enJson, null, 2), 'utf8');
fs.writeFileSync(hiJsonPath, JSON.stringify(hiJson, null, 2), 'utf8');

console.log("Created all product files and updated JSON.");
