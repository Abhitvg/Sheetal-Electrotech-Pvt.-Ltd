const fs = require('fs');
const path = require('path');

const legacy = JSON.parse(fs.readFileSync('legacy_products.json', 'utf8'));

// Mapping slug to route
const routeMap = {
  "led-bulb": "led-lighting/bulbs",
  "led-bulb-2": "led-lighting/bulbs",
  "led-high-power-bulb": "led-lighting/bulbs",
  "led-emergency-bulb": "led-lighting/bulbs",
  "led-candle-bulb": "led-lighting/bulbs",
  "smart-led-bulb": "led-lighting/smart-led",
  "led-batten": "led-lighting/battens",
  "led-high-power-batten": "led-lighting/battens",
  "led-down-light": "led-lighting/downlights",
  "led-down-lighter": "led-lighting/downlights",
  "led-down-light-3": "led-lighting/downlights",
  "led-ceiling-light": "led-lighting/downlights",
  "led-street-light-2": "led-lighting/street-lights",
  "led-flood-well-light": "led-lighting/flood-lights",
  "led-spot-light": "led-lighting/spot-lights",
  "led-decorative-light": "led-lighting/decorative-lights",
  "led-strip-lights": "led-lighting/strip-lights",
  "extension-board": "electronics/extension-boards"
};

const categoryData = {};

legacy.forEach(p => {
  const route = routeMap[p.title];
  if (!route) return;
  if (!categoryData[route]) categoryData[route] = [];
  
  // Clean up the name
  let cleanName = p.title.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  if (cleanName === "Led Bulb 2") cleanName = "Premium LED Bulb";
  if (cleanName === "Led Street Light 2") cleanName = "LED Street Light";
  if (cleanName === "Led Down Light 3") cleanName = "LED Down Light (Series 3)";
  if (cleanName === "Led Down Lighter") cleanName = "LED Down Lighter";
  
  // Fix the image path
  const imgPath = p.localImg || p.img;
  
  categoryData[route].push({
    id: p.title,
    name: cleanName,
    image: imgPath,
    specs: p.specs.length ? p.specs : ["High Quality", "Energy Efficient", "Long Lifespan"],
    apps: ["Commercial", "Residential", "Industrial"] // Fake apps since scrape failed
  });
});

const getPageTemplate = (route, items) => {
  const namespace = route.split('/').pop();
  
  let productsCode = items.map((item, idx) => {
    return `    {
      id: "${item.id}",
      name: t("p${idx}_name"),
      description: t("p${idx}_desc"),
      image: "${item.image}",
      specs: [
${item.specs.map((s, i) => `        { label: t("p${idx}_s${i}_l"), value: t("p${idx}_s${i}_v") }`).join(',\n')}
      ],
      applications: [
${item.apps.map((a, i) => `        t("p${idx}_a${i}")`).join(',\n')}
      ]
    }`;
  }).join(',\n');

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
${productsCode}
  ];

  return (
    <ProductSubCategoryTemplate
      title={t("title")}
      category="${route.split('/')[0]}"
      description={t("description")}
      products={products}
    />
  );
}
`;
};

// Generate pages
Object.keys(categoryData).forEach(route => {
  const items = categoryData[route];
  const dir = path.join('src/app/[locale]/products', route);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'page.tsx'), getPageTemplate(route, items));
});

// Update JSONs
const enJson = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));
const hiJson = JSON.parse(fs.readFileSync('messages/hi.json', 'utf8'));

Object.keys(categoryData).forEach(route => {
  const namespace = route.split('/').pop();
  const items = categoryData[route];
  
  if (!enJson.Products[namespace]) enJson.Products[namespace] = {};
  if (!hiJson.Products[namespace]) hiJson.Products[namespace] = {};
  
  items.forEach((item, idx) => {
    enJson.Products[namespace][`p${idx}_name`] = item.name;
    hiJson.Products[namespace][`p${idx}_name`] = item.name;
    
    enJson.Products[namespace][`p${idx}_desc`] = `High-quality ${item.name} manufactured to exact specifications.`;
    hiJson.Products[namespace][`p${idx}_desc`] = `सटीक विशिष्टताओं के अनुसार निर्मित उच्च गुणवत्ता वाला ${item.name}।`;
    
    item.specs.forEach((s, i) => {
      enJson.Products[namespace][`p${idx}_s${i}_l`] = `Feature ${i+1}`;
      hiJson.Products[namespace][`p${idx}_s${i}_l`] = `फ़ीचर ${i+1}`;
      enJson.Products[namespace][`p${idx}_s${i}_v`] = s;
      hiJson.Products[namespace][`p${idx}_s${i}_v`] = s;
    });
    
    item.apps.forEach((a, i) => {
      enJson.Products[namespace][`p${idx}_a${i}`] = a;
      hiJson.Products[namespace][`p${idx}_a${i}`] = a;
    });
  });
});

fs.writeFileSync('messages/en.json', JSON.stringify(enJson, null, 2), 'utf8');
fs.writeFileSync('messages/hi.json', JSON.stringify(hiJson, null, 2), 'utf8');

console.log("Product mapping complete!");
