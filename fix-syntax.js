const fs = require('fs');

const files = [
  './src/components/CTASection.tsx',
  './src/components/TrustWall.tsx',
  './src/components/ProductShowcase.tsx',
  './src/components/CapabilitiesSection.tsx',
  './src/components/WhyChooseUs.tsx',
  './src/components/Testimonials.tsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Fix double parenthesis syntax error
  content = content.replace(/\)\);/g, ');');
  
  // Fix double quotes around variables in objects/arrays
  content = content.replace(/"\{t\("([^"]+)"\)\}"/g, 't("$1")');
  
  // Fix multi-line string replacements that were missed
  if (file.includes('CTASection')) {
    content = content.replace(/Whether you need 5,000 units or 500,000 — our vertically integrated facility\s+is ready. Get a custom quote with pricing and lead time estimates in 24 hours./s, '{t("subtitle")}');
  }
  
  if (file.includes('ProductShowcase')) {
    content = content.replace(/We manufacture high-precision components and complete assemblies\s+for demanding industries./s, '{t("subtitle")}');
  }
  
  if (file.includes('CapabilitiesSection')) {
    content = content.replace(/Every step of the manufacturing process happens here. No sub-\s+contracting, no hidden vendor dependencies — full traceability from raw\s+material to finished goods./s, '{t("subtitle")}');
  }
  
  if (file.includes('WhyChooseUs')) {
    content = content.replace(/We eliminate supply chain fragmentation by bringing every capability\s+under one roof./s, '{t("subtitle")}');
  }

  fs.writeFileSync(file, content);
}

console.log("Fixes applied.");
