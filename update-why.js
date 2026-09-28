const fs = require('fs');

const enPath = './messages/en.json';
const hiPath = './messages/hi.json';
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const hi = JSON.parse(fs.readFileSync(hiPath, 'utf8'));

en.WhyChooseUs = {
  badge: "Service Options",
  title: "Solving complex manufacturing challenges with ease",
  subtitle: "Sheetal Electrotech offer a wide range of services to its customers, including:",
  w1Title: "Product design and development",
  w1Desc: "To help customers create new products or improve existing ones. This involves using advanced software and tools to design and prototype products before production.",
  w2Title: "Manufacturing and production",
  w2Desc: "Produce products efficiently, which can help customers meet their demand requirements. Can also scale production up or down as needed, depending on market demand.",
  w3Title: "Quality control and testing",
  w3Desc: "To ensure that products meet specific standards and regulations. This helps to ensure that products are safe and reliable.",
  w4Title: "Supply chain management",
  w4Desc: "The supply chain, including sourcing raw materials and components, managing inventory, and coordinating logistics to ensure on-time delivery of products.",
  w5Title: "After-Sales Support",
  w5Desc: "To customers, including technical support, repairs, and maintenance, to ensure that the product continues to perform at its best."
};

hi.WhyChooseUs = {
  badge: "सेवा विकल्प",
  title: "जटिल विनिर्माण चुनौतियों को आसानी से हल करना",
  subtitle: "शीतल इलेक्ट्रो-टेक अपने ग्राहकों को सेवाओं की एक विस्तृत श्रृंखला प्रदान करता है, जिसमें शामिल हैं:",
  w1Title: "उत्पाद डिजाइन और विकास",
  w1Desc: "ग्राहकों को नए उत्पाद बनाने या मौजूदा उत्पादों को बेहतर बनाने में मदद करने के लिए। इसमें उत्पादन से पहले उत्पादों को डिजाइन और प्रोटोटाइप करने के लिए उन्नत सॉफ्टवेयर और उपकरणों का उपयोग करना शामिल है।",
  w2Title: "विनिर्माण और उत्पादन",
  w2Desc: "उत्पादों का कुशलतापूर्वक उत्पादन करें, जो ग्राहकों को उनकी मांग की आवश्यकताओं को पूरा करने में मदद कर सकता है। बाजार की मांग के आधार पर आवश्यकतानुसार उत्पादन को बढ़ाया या घटाया भी जा सकता है।",
  w3Title: "गुणवत्ता नियंत्रण और परीक्षण",
  w3Desc: "यह सुनिश्चित करने के लिए कि उत्पाद विशिष्ट मानकों और नियमों को पूरा करते हैं। यह सुनिश्चित करने में मदद करता है कि उत्पाद सुरक्षित और विश्वसनीय हैं।",
  w4Title: "आपूर्ति श्रृंखला प्रबंधन",
  w4Desc: "उत्पादों की समय पर डिलीवरी सुनिश्चित करने के लिए कच्चे माल और घटकों की सोर्सिंग, इन्वेंट्री का प्रबंधन और रसद का समन्वय सहित आपूर्ति श्रृंखला।",
  w5Title: "बिक्री के बाद समर्थन",
  w5Desc: "ग्राहकों के लिए, तकनीकी सहायता, मरम्मत और रखरखाव सहित, यह सुनिश्चित करने के लिए कि उत्पाद अपना सर्वश्रेष्ठ प्रदर्शन करना जारी रखे।"
};

fs.writeFileSync(enPath, JSON.stringify(en, null, 2));
fs.writeFileSync(hiPath, JSON.stringify(hi, null, 2));

let whyCode = fs.readFileSync('./src/components/WhyChooseUs.tsx', 'utf8');

const newFeaturesArray = `const features = [
  {
    title: t("w1Title"),
    description: t("w1Desc"),
    icon: "/images/legacy/product-design.png",
  },
  {
    title: t("w2Title"),
    description: t("w2Desc"),
    icon: "/images/legacy/manufacturing.png",
  },
  {
    title: t("w3Title"),
    description: t("w3Desc"),
    icon: "/images/legacy/inspection.png",
  },
  {
    title: t("w4Title"),
    description: t("w4Desc"),
    icon: "/images/legacy/stock.png",
  },
  {
    title: t("w5Title"),
    description: t("w5Desc"),
    icon: "/images/legacy/technical-support.png",
  },
];`;

whyCode = whyCode.replace(/const features = \[[\s\S]*?\];/, newFeaturesArray);
// Fix the icon rendering
whyCode = whyCode.replace(/<feature\.icon className="w-6 h-6 text-accent group-hover:text-ink transition-colors" \/>/, '<img src={feature.icon} alt={feature.title} className="w-10 h-10 object-contain group-hover:scale-110 transition-transform" />');

fs.writeFileSync('./src/components/WhyChooseUs.tsx', whyCode);
console.log("Updated WhyChooseUs");
