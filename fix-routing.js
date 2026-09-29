const fs = require('fs');
const path = require('path');

// 1. Move privacy page
const oldPrivacyPath = path.join(__dirname, 'src/app/privacy');
const newPrivacyPath = path.join(__dirname, 'src/app/[locale]/privacy');
if (fs.existsSync(oldPrivacyPath)) {
  if (!fs.existsSync(newPrivacyPath)) {
    fs.mkdirSync(newPrivacyPath, { recursive: true });
  }
  fs.renameSync(path.join(oldPrivacyPath, 'page.tsx'), path.join(newPrivacyPath, 'page.tsx'));
  fs.rmdirSync(oldPrivacyPath);
  console.log("Moved privacy page");
}

// 2. Rename proxy.ts to middleware.ts
const proxyPath = path.join(__dirname, 'src/proxy.ts');
const middlewarePath = path.join(__dirname, 'src/middleware.ts');
if (fs.existsSync(proxyPath)) {
  fs.renameSync(proxyPath, middlewarePath);
  console.log("Renamed proxy.ts to middleware.ts");
}

// 3. Replace imports
const filesToFix = [
  'src/app/[locale]/privacy/page.tsx',
  'src/app/[locale]/facilities/page.tsx',
  'src/app/[locale]/terms/page.tsx',
  'src/app/[locale]/company/page.tsx',
  'src/app/[locale]/contact/page.tsx',
  'src/app/[locale]/products/page.tsx',
  'src/app/[locale]/blog/[slug]/page.tsx',
  'src/app/[locale]/careers/page.tsx',
  'src/app/[locale]/products/rigid-packaging/page.tsx',
  'src/app/[locale]/blog/page.tsx',
  'src/app/[locale]/products/led-lighting/page.tsx',
  'src/components/ProductShowcase.tsx',
  'src/components/CapabilitiesSection.tsx',
  'src/components/Hero.tsx',
  'src/components/CTASection.tsx'
];

for (const file of filesToFix) {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/import Link from "next\/link";/g, 'import { Link } from "@/i18n/routing";');
    content = content.replace(/import Link from 'next\/link';/g, 'import { Link } from "@/i18n/routing";');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Fixed imports in", file);
  } else {
    console.log("File not found:", file);
  }
}
