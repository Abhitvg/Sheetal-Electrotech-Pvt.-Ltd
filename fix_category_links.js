const fs = require('fs');

// led-lighting
let ledPage = fs.readFileSync('src/app/[locale]/products/led-lighting/page.tsx', 'utf8');
const newLedCats = `  {
    title: "LED Downlights & Panels",
    description: "Sleek downlights and ceiling panels.",
    href: "/products/led-lighting/downlights",
    image: "/images/legacy/Photo13.webp"
  },
  {
    title: "LED Street Lights",
    description: "Durable and bright street luminaires.",
    href: "/products/led-lighting/street-lights",
    image: "/images/legacy/4-3.webp"
  },
  {
    title: "LED Flood Lights",
    description: "High-power flood lights for outdoors.",
    href: "/products/led-lighting/flood-lights",
    image: "/images/legacy/10-3.webp"
  },
  {
    title: "LED Spot Lights",
    description: "Precision spot lighting.",
    href: "/products/led-lighting/spot-lights",
    image: "/images/legacy/Photo13.webp"
  },
  {
    title: "Decorative Lighting",
    description: "Aesthetic LED fixtures.",
    href: "/products/led-lighting/decorative-lights",
    image: "/images/legacy/4-3.webp"
  },
  {
    title: "Smart LED Lighting",
    description: "IoT enabled smart lighting.",
    href: "/products/led-lighting/smart-led",
    image: "/images/legacy/10-3.webp"
  },
  {
    title: "LED Strip Lights",
    description: "Flexible LED strips.",
    href: "/products/led-lighting/strip-lights",
    image: "/images/legacy/Photo13.webp"
  }`;
ledPage = ledPage.replace('];', ",\n" + newLedCats + '\n];');
fs.writeFileSync('src/app/[locale]/products/led-lighting/page.tsx', ledPage);


// rigid-packaging
let rigidPage = fs.readFileSync('src/app/[locale]/products/rigid-packaging/page.tsx', 'utf8');
const newRigidCats = `  {
    title: "Containers",
    description: "Durable storage containers.",
    href: "/products/rigid-packaging/containers",
    image: "/images/legacy/4-3.webp"
  },
  {
    title: "Custom Packaging",
    description: "Tailored packaging designs.",
    href: "/products/rigid-packaging/custom",
    image: "/images/legacy/10-3.webp"
  },
  {
    title: "Injection-Moulded Components",
    description: "High-precision components.",
    href: "/products/rigid-packaging/components",
    image: "/images/legacy/Photo13.webp"
  }`;
rigidPage = rigidPage.replace('];', ",\n" + newRigidCats + '\n];');
fs.writeFileSync('src/app/[locale]/products/rigid-packaging/page.tsx', rigidPage);

// top level products
let rootPage = fs.readFileSync('src/app/[locale]/products/page.tsx', 'utf8');
if (!rootPage.includes('/products/electronics')) {
  const newRootCat = `  {
    title: t("electronics"),
    description: t("electronicsDesc"),
    href: "/products/electronics",
    image: "/images/legacy/Photo13.webp",
    itemCount: 1
  }`;
  rootPage = rootPage.replace('];', ",\n" + newRootCat + '\n];');
  fs.writeFileSync('src/app/[locale]/products/page.tsx', rootPage);
  console.log("Updated top level products");
}

console.log("Updated category links.");
