const fs = require('fs');

const enPath = './messages/en.json';
const hiPath = './messages/hi.json';

const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const hi = JSON.parse(fs.readFileSync(hiPath, 'utf8'));

// 1. Navigation Mega Menu
en.MegaMenu = {
  facilities: "9 In-House Facilities",
  facilitiesDesc: "Fully vertically integrated manufacturing hub based in Daman, India.",
  viewAllFacilities: "View All Facilities",
  coreProduction: "Core Production",
  finishing: "Finishing & Assembly",
  supporting: "Supporting Ops",
  moulding: "Plastic Injection Moulding",
  blow: "Blow Moulded Containers",
  smt: "SMT & Auto Insertion",
  assembly: "Assembly & Packaging",
  quality: "Quality Testing Lab",
  toolRoom: "In-House Tool Room",
  about: "About Sheetal Group",
  products: "OEM Product Lines",
  productsDesc: "White-label manufacturing for tier-1 lighting brands.",
  exploreCatalog: "Explore Catalog",
  led: "LED Lighting",
  bulbs: "LED Bulbs (3W – 50W)",
  battens: "LED Battens",
  panels: "LED Panels & Downlights",
  flood: "Flood Lights & Street Lights",
  packaging: "Rigid Packaging",
  jars: "Cosmetic Jars",
  pharma: "Pharmaceutical Bottles",
  industrial: "Industrial Containers"
};
hi.MegaMenu = {
  facilities: "9 इन-हाउस सुविधाएं",
  facilitiesDesc: "दमन, भारत में स्थित पूर्ण रूप से एकीकृत विनिर्माण केंद्र।",
  viewAllFacilities: "सभी सुविधाएं देखें",
  coreProduction: "मुख्य उत्पादन",
  finishing: "फिनिशिंग और असेंबली",
  supporting: "सहायक कार्य",
  moulding: "प्लास्टिक इंजेक्शन मोल्डिंग",
  blow: "ब्लो मोल्डेड कंटेनर",
  smt: "SMT और ऑटो इंसर्शन",
  assembly: "असेंबली और पैकेजिंग",
  quality: "क्वालिटी टेस्टिंग लैब",
  toolRoom: "इन-हाउस टूल रूम",
  about: "शीतल समूह के बारे में",
  products: "OEM उत्पाद लाइनें",
  productsDesc: "टियर-1 लाइटिंग ब्रांड्स के लिए व्हाइट-लेबल विनिर्माण।",
  exploreCatalog: "कैटलॉग देखें",
  led: "एलईडी लाइटिंग",
  bulbs: "एलईडी बल्ब (3W – 50W)",
  battens: "एलईडी बैटन",
  panels: "एलईडी पैनल और डाउनलाइट्स",
  flood: "फ्लड लाइट्स और स्ट्रीट लाइट्स",
  packaging: "कठोर पैकेजिंग",
  jars: "कॉस्मेटिक जार",
  pharma: "फार्मास्युटिकल बोतलें",
  industrial: "औद्योगिक कंटेनर"
};

// 2. Facilities Page
en.FacilitiesPage = {
  badge: "9 In-House Facilities",
  title: "One campus. Every capability.",
  subtitle: "All production operations are co-located in Daman, India. No sub-contracting, no hidden vendor dependencies — full traceability from raw material to finished goods.",
  viewFacility: "View Facility",
  ctaTitle: "See it in person.",
  ctaSubtitle: "We welcome site visits. Our Daman campus is 3 hours from Mumbai by road.",
  ctaButton: "Book a Factory Visit"
};
hi.FacilitiesPage = {
  badge: "9 इन-हाउस सुविधाएं",
  title: "एक कैंपस। हर क्षमता।",
  subtitle: "सभी उत्पादन कार्य भारत के दमन में एक ही स्थान पर स्थित हैं। कोई उप-ठेकेदारी नहीं, कोई छिपी हुई वेंडर निर्भरता नहीं — कच्चे माल से लेकर तैयार माल तक पूर्ण पता लगाने की क्षमता।",
  viewFacility: "सुविधा देखें",
  ctaTitle: "इसे व्यक्तिगत रूप से देखें।",
  ctaSubtitle: "हम साइट विजिट का स्वागत करते हैं। हमारा दमन कैंपस सड़क मार्ग से मुंबई से 3 घंटे की दूरी पर है।",
  ctaButton: "फ़ैक्टरी यात्रा बुक करें"
};

// 3. Products Page
en.ProductsPage = {
  div1: "OEM Division 01",
  div1Title: "Rigid Plastic Packaging",
  div1Desc: "Precision-moulded cosmetic jars, pharmaceutical bottles, and industrial containers. Food-grade, sterile, and highly customizable.",
  div2: "OEM Division 02",
  div2Title: "LED Lighting Solutions",
  div2Desc: "From 3W domestic bulbs to high-lumen industrial flood lights. Fully tested, BIS-certified, and ready for your brand label.",
  explore: "Explore Portfolio"
};
hi.ProductsPage = {
  div1: "OEM प्रभाग 01",
  div1Title: "कठोर प्लास्टिक पैकेजिंग",
  div1Desc: "सटीक-मोल्डेड कॉस्मेटिक जार, फार्मास्युटिकल बोतलें, और औद्योगिक कंटेनर। खाद्य-ग्रेड, बाँझ, और अत्यधिक अनुकूलन योग्य।",
  div2: "OEM प्रभाग 02",
  div2Title: "एलईडी लाइटिंग समाधान",
  div2Desc: "3W घरेलू बल्बों से लेकर हाई-ल्यूमेन औद्योगिक फ्लड लाइट्स तक। पूरी तरह से परीक्षण किया गया, बीआईएस-प्रमाणित, और आपके ब्रांड लेबल के लिए तैयार।",
  explore: "पोर्टफोलियो देखें"
};

fs.writeFileSync(enPath, JSON.stringify(en, null, 2));
fs.writeFileSync(hiPath, JSON.stringify(hi, null, 2));


// Now patch components

function updateComponent(filePath, replaceMap, addImport = true) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (addImport && !content.includes('useTranslations')) {
    if (content.includes('import { useState }')) {
      content = content.replace('import { useState }', 'import { useState }\nimport { useTranslations } from "next-intl"');
    } else if (content.includes('import Image')) {
      content = content.replace('import Image', 'import { useTranslations } from "next-intl"\nimport Image');
    }
    
    const compNameMatch = content.match(/export default function ([a-zA-Z]+)\(\) \{/);
    if (compNameMatch) {
      let tKey = compNameMatch[1];
      if (filePath.includes('Navigation')) tKey = 'MegaMenu';
      if (filePath.includes('facilities/page')) tKey = 'FacilitiesPage';
      if (filePath.includes('products/page')) tKey = 'ProductsPage';
      
      content = content.replace(/export default function [a-zA-Z]+\(\) \{/, `$&\n  const t = useTranslations("${tKey}");`);
    }
  }

  for (const [search, replace] of Object.entries(replaceMap)) {
    content = content.replace(search, replace);
  }
  
  fs.writeFileSync(filePath, content);
}


updateComponent('./src/app/[locale]/facilities/page.tsx', {
  '9 In-House Facilities': '{t("badge")}',
  'One campus. Every capability.': '{t("title")}',
  'All production operations are co-located in Daman, India. No sub-contracting, no hidden vendor dependencies — full traceability from raw material to finished goods.': '{t("subtitle")}',
  'View Facility': '{t("viewFacility")}',
  'See it in person.': '{t("ctaTitle")}',
  'We welcome site visits. Our Daman campus is 3 hours from Mumbai by road.': '{t("ctaSubtitle")}',
  'Book a Factory Visit': '{t("ctaButton")}'
});

updateComponent('./src/app/[locale]/products/page.tsx', {
  'OEM Division 01': '{t("div1")}',
  'Rigid Plastic Packaging': '{t("div1Title")}',
  'Precision-moulded cosmetic jars, pharmaceutical bottles, and industrial containers. Food-grade, sterile, and highly customizable.': '{t("div1Desc")}',
  'OEM Division 02': '{t("div2")}',
  'LED Lighting Solutions': '{t("div2Title")}',
  'From 3W domestic bulbs to high-lumen industrial flood lights. Fully tested, BIS-certified, and ready for your brand label.': '{t("div2Desc")}',
  'Explore Portfolio': '{t("explore")}'
});


let navContent = fs.readFileSync('./src/components/Navigation.tsx', 'utf8');
navContent = navContent.replace(/export default function Navigation\(\) \{/, `export default function Navigation() {\n  const tMega = useTranslations("MegaMenu");`);
navContent = navContent.replace(/"9 In-House Facilities"/g, '{tMega("facilities")}');
navContent = navContent.replace(/"Fully vertically integrated manufacturing hub based in Daman, India."/g, '{tMega("facilitiesDesc")}');
navContent = navContent.replace(/View All Facilities/g, '{tMega("viewAllFacilities")}');
navContent = navContent.replace(/"Core Production"/g, '{tMega("coreProduction")}');
navContent = navContent.replace(/"Finishing & Assembly"/g, '{tMega("finishing")}');
navContent = navContent.replace(/"Supporting Ops"/g, '{tMega("supporting")}');
navContent = navContent.replace(/"Plastic Injection Moulding"/g, '{tMega("moulding")}');
navContent = navContent.replace(/"Blow Moulded Containers"/g, '{tMega("blow")}');
navContent = navContent.replace(/"SMT & Auto Insertion"/g, '{tMega("smt")}');
navContent = navContent.replace(/"Assembly & Packaging"/g, '{tMega("assembly")}');
navContent = navContent.replace(/"Quality Testing Lab"/g, '{tMega("quality")}');
navContent = navContent.replace(/"In-House Tool Room"/g, '{tMega("toolRoom")}');
navContent = navContent.replace(/"About Sheetal Group"/g, '{tMega("about")}');
navContent = navContent.replace(/"OEM Product Lines"/g, '{tMega("products")}');
navContent = navContent.replace(/"White-label manufacturing for tier-1 lighting brands."/g, '{tMega("productsDesc")}');
navContent = navContent.replace(/Explore Catalog/g, '{tMega("exploreCatalog")}');
navContent = navContent.replace(/"LED Lighting"/g, '{tMega("led")}');
navContent = navContent.replace(/"LED Bulbs \(3W – 50W\)"/g, '{tMega("bulbs")}');
navContent = navContent.replace(/"LED Battens"/g, '{tMega("battens")}');
navContent = navContent.replace(/"LED Panels & Downlights"/g, '{tMega("panels")}');
navContent = navContent.replace(/"Flood Lights & Street Lights"/g, '{tMega("flood")}');
navContent = navContent.replace(/"Rigid Packaging"/g, '{tMega("packaging")}');
navContent = navContent.replace(/"Cosmetic Jars"/g, '{tMega("jars")}');
navContent = navContent.replace(/"Pharmaceutical Bottles"/g, '{tMega("pharma")}');
navContent = navContent.replace(/"Industrial Containers"/g, '{tMega("industrial")}');
fs.writeFileSync('./src/components/Navigation.tsx', navContent);

console.log("Pages patched!");
