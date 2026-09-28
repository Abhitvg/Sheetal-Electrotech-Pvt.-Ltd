const fs = require('fs');
const path = require('path');

const en = require('./messages/en.json');
const hi = require('./messages/hi.json');

// --- Add Translations ---
en.CTA = {
  badge: "Start Manufacturing",
  titlePrefix: "Ready to Scale Your ",
  titleHighlight: "Production?",
  subtitle: "Whether you need 5,000 units or 500,000 — our vertically integrated facility is ready. Get a custom quote with pricing and lead time estimates in 24 hours.",
  rfqButton: "Start RFQ Process",
  contactButton: "Contact Sales"
};
hi.CTA = {
  badge: "उत्पादन शुरू करें",
  titlePrefix: "क्या आप अपना ",
  titleHighlight: "उत्पादन बढ़ाने के लिए तैयार हैं?",
  subtitle: "चाहे आपको 5,000 यूनिट्स चाहिए या 500,000 — हमारी सुविधा तैयार है। 24 घंटे में मूल्य निर्धारण और समय का अनुमान प्राप्त करें।",
  rfqButton: "RFQ प्रक्रिया शुरू करें",
  contactButton: "सेल्स से संपर्क करें"
};

en.TrustWall = {
  subtitle: "OEM Partner for",
  title: "Trusted by India's leading electrical brands."
};
hi.TrustWall = {
  subtitle: "के लिए OEM पार्टनर",
  title: "भारत के अग्रणी इलेक्ट्रिक ब्रांडों का भरोसा।"
};

en.ProductShowcase = {
  badge: "Our Products",
  title: "Engineered for Performance.",
  subtitle: "We manufacture high-precision components and complete assemblies for demanding industries.",
  led: "LED Lighting",
  ledDesc: "Housing, drivers, and complete turnkey assembly.",
  packaging: "Rigid Packaging",
  packagingDesc: "Bottles, caps, and custom molded containers.",
  explore: "Explore Catalog"
};
hi.ProductShowcase = {
  badge: "हमारे उत्पाद",
  title: "प्रदर्शन के लिए इंजीनियर किए गए।",
  subtitle: "हम मांग वाले उद्योगों के लिए उच्च-सटीक घटक और पूर्ण असेंबली का निर्माण करते हैं।",
  led: "एलईडी लाइटिंग",
  ledDesc: "हाउसिंग, ड्राइवर, और पूर्ण टर्नकी असेंबली।",
  packaging: "कठोर पैकेजिंग",
  packagingDesc: "बोतलें, ढक्कन, और कस्टम मोल्डेड कंटेनर।",
  explore: "कैटलॉग देखें"
};

en.Capabilities = {
  badge: "Core Capabilities",
  title: "9 Facilities. 1 Campus.",
  subtitle: "Every step of the manufacturing process happens here. No outsourcing, complete quality control.",
  c1Title: "Tooling & Molding",
  c1Desc: "High precision injection and blow molding.",
  c2Title: "SMT Electronics",
  c2Desc: "PCB assembly with automated placement.",
  c3Title: "Assembly & Testing",
  c3Desc: "End-to-end product assembly and QA.",
  explore: "Explore Facilities"
};
hi.Capabilities = {
  badge: "मुख्य क्षमताएं",
  title: "9 सुविधाएं। 1 कैंपस।",
  subtitle: "विनिर्माण प्रक्रिया का हर कदम यहीं होता है। कोई आउटसोर्सिंग नहीं, पूर्ण गुणवत्ता नियंत्रण।",
  c1Title: "टूलिंग और मोल्डिंग",
  c1Desc: "उच्च परिशुद्धता इंजेक्शन और ब्लो मोल्डिंग।",
  c2Title: "SMT इलेक्ट्रॉनिक्स",
  c2Desc: "स्वचालित प्लेसमेंट के साथ पीसीबी असेंबली।",
  c3Title: "असेंबली और परीक्षण",
  c3Desc: "एंड-टू-एंड उत्पाद असेंबली और QA।",
  explore: "सुविधाएं देखें"
};

en.WhyChooseUs = {
  badge: "The Sheetal Advantage",
  title: "Why Partner With Us?",
  subtitle: "We eliminate supply chain fragmentation by bringing every capability under one roof.",
  w1Title: "Vertical Integration",
  w1Desc: "From raw plastic and aluminum to the finished boxed product.",
  w2Title: "Quality Control",
  w2Desc: "In-house testing lab ensures every batch meets global standards.",
  w3Title: "Scale & Speed",
  w3Desc: "High-volume capacity ensures we meet your aggressive timelines."
};
hi.WhyChooseUs = {
  badge: "शीतल का लाभ",
  title: "हमारे साथ साझेदारी क्यों करें?",
  subtitle: "हम हर क्षमता को एक छत के नीचे लाकर आपूर्ति श्रृंखला विखंडन को खत्म करते हैं।",
  w1Title: "लंबवत एकीकरण",
  w1Desc: "कच्चे प्लास्टिक और एल्यूमीनियम से लेकर तैयार बॉक्स वाले उत्पाद तक।",
  w2Title: "गुणवत्ता नियंत्रण",
  w2Desc: "इन-हाउस परीक्षण लैब सुनिश्चित करती है कि हर बैच वैश्विक मानकों को पूरा करे।",
  w3Title: "पैमाना और गति",
  w3Desc: "उच्च-मात्रा क्षमता सुनिश्चित करती है कि हम आपकी आक्रामक समयसीमा को पूरा करें।"
};

en.Testimonials = {
  badge: "Client Success",
  title: "What Our Partners Say",
  subtitle: "Long-term relationships built on reliability, precision, and trust."
};
hi.Testimonials = {
  badge: "ग्राहक की सफलता",
  title: "हमारे भागीदार क्या कहते हैं",
  subtitle: "विश्वसनीयता, सटीकता और विश्वास पर बने दीर्घकालिक संबंध।"
};

fs.writeFileSync('./messages/en.json', JSON.stringify(en, null, 2));
fs.writeFileSync('./messages/hi.json', JSON.stringify(hi, null, 2));

// --- Update Components ---
function updateComponent(filePath, replaceMap) {
  let content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes('useTranslations')) {
    content = content.replace(/from "react";|from "next\/image";|from "lucide-react";/, '$&\nimport { useTranslations } from "next-intl";');
    content = content.replace(/export default function [a-zA-Z]+\(\) \{/, '$&\n  const t = useTranslations(arguments.callee.name.replace("Section", ""));');
    
    // Quick hack for component name matching translation key
    const compNameMatch = content.match(/export default function ([a-zA-Z]+)\(\) \{/);
    if(compNameMatch) {
      let tKey = compNameMatch[1].replace('Section', '');
      content = content.replace(/useTranslations\(.*?\)/, `useTranslations("${tKey}")`);
    }
  }
  
  for (const [search, replace] of Object.entries(replaceMap)) {
    content = content.replace(search, replace);
  }
  
  fs.writeFileSync(filePath, content);
}

// CTASection
updateComponent('./src/components/CTASection.tsx', {
  'Start Manufacturing': '{t("badge")}',
  'Ready to Scale Your{" "}': '{t("titlePrefix")} {" "}',
  'Production?': '{t("titleHighlight")}',
  'Whether you need 5,000 units or 500,000 — our vertically integrated facility\\n            is ready. Get a custom quote with pricing and lead time estimates in 24 hours.': '{t("subtitle")}',
  'Start RFQ Process': '{t("rfqButton")}',
  'Contact Sales': '{t("contactButton")}'
});

// TrustWall
updateComponent('./src/components/TrustWall.tsx', {
  'OEM Partner for': '{t("subtitle")}',
  'Trusted by India\\\'s leading electrical brands.': '{t("title")}'
});

// ProductShowcase
updateComponent('./src/components/ProductShowcase.tsx', {
  'Our Products': '{t("badge")}',
  'Engineered for Performance.': '{t("title")}',
  'We manufacture high-precision components and complete assemblies\\n            for demanding industries.': '{t("subtitle")}',
  'LED Lighting': '{t("led")}',
  'Housing, drivers, and complete turnkey assembly.': '{t("ledDesc")}',
  'Rigid Packaging': '{t("packaging")}',
  'Bottles, caps, and custom molded containers.': '{t("packagingDesc")}',
  'Explore Catalog': '{t("explore")}'
});

// CapabilitiesSection
updateComponent('./src/components/CapabilitiesSection.tsx', {
  'Core Capabilities': '{t("badge")}',
  '9 Facilities. 1 Campus.': '{t("title")}',
  'Every step of the manufacturing process happens here. No sub-\\n            contracting, no hidden vendor dependencies — full traceability from raw\\n            material to finished goods.': '{t("subtitle")}',
  'Tooling & Molding': '{t("c1Title")}',
  'High precision injection and blow molding.': '{t("c1Desc")}',
  'SMT Electronics': '{t("c2Title")}',
  'PCB assembly with automated placement.': '{t("c2Desc")}',
  'Assembly & Testing': '{t("c3Title")}',
  'End-to-end product assembly and QA.': '{t("c3Desc")}',
  'Explore Facilities': '{t("explore")}'
});

// WhyChooseUs
updateComponent('./src/components/WhyChooseUs.tsx', {
  'The Sheetal Advantage': '{t("badge")}',
  'Why Partner With Us?': '{t("title")}',
  'We eliminate supply chain fragmentation by bringing every capability\\n            under one roof.': '{t("subtitle")}',
  'Vertical Integration': '{t("w1Title")}',
  'From raw plastic and aluminum to the finished boxed product.': '{t("w1Desc")}',
  'Quality Control': '{t("w2Title")}',
  'In-house testing lab ensures every batch meets global standards.': '{t("w2Desc")}',
  'Scale & Speed': '{t("w3Title")}',
  'High-volume capacity ensures we meet your aggressive timelines.': '{t("w3Desc")}'
});

// Testimonials
updateComponent('./src/components/Testimonials.tsx', {
  'Client Success': '{t("badge")}',
  'What Our Partners Say': '{t("title")}',
  'Long-term relationships built on reliability, precision, and trust.': '{t("subtitle")}'
});

console.log("Translation injection complete.");
