const fs = require('fs');

const enFile = 'messages/en.json';
const hiFile = 'messages/hi.json';

const en = JSON.parse(fs.readFileSync(enFile, 'utf8'));
const hi = JSON.parse(fs.readFileSync(hiFile, 'utf8'));

en.Products = {
  bulbs: {
    title: "LED Bulbs",
    description: "Energy-efficient LED bulbs for residential, commercial, and industrial applications. Designed and manufactured in-house.",
    p1_name: "Standard LED Bulb",
    p1_range: "3W – 15W",
    p1_s1_l: "Wattage Range", p1_s1_v: "3W, 5W, 7W, 9W, 12W, 15W",
    p1_s2_l: "Base Type", p1_s2_v: "B22 / E27",
    p1_s3_l: "Efficacy", p1_s3_v: "100 lm/W",
    p2_name: "Premium LED Bulb",
    p2_range: "5W – 18W",
    p2_s1_l: "Wattage Range", p2_s1_v: "5W – 18W",
    p2_s2_l: "Base Type", p2_s2_v: "B22 / E27",
    p2_s3_l: "Design", p2_s3_v: "Sleek architectural",
    p3_name: "High Power LED Bulb",
    p3_range: "30W – 150W",
    p3_s1_l: "Wattage Range", p3_s1_v: "30W – 150W",
    p3_s2_l: "Base Type", p3_s2_v: "B22 / E27 / E40",
    p3_s3_l: "Application", p3_s3_v: "Industrial, High Bay"
  },
  battens: {
    title: "LED Battens",
    description: "Linear LED lighting solutions for residential, commercial, and industrial spaces. Available in multiple lengths and IP ratings.",
    p1_name: "LED Batten",
    p1_range: "10W – 40W",
    p1_s1_l: "Wattage Range", p1_s1_v: "10W – 40W",
    p1_s2_l: "Length", p1_s2_v: "600mm / 1200mm / 1500mm",
    p1_s3_l: "IP Rating", p1_s3_v: "IP20 / IP65",
    p2_name: "High Power LED Batten",
    p2_range: "30W – 60W",
    p2_s1_l: "Wattage Range", p2_s1_v: "30W – 60W",
    p2_s2_l: "Length", p2_s2_v: "1200mm / 1500mm",
    p2_s3_l: "Housing", p2_s3_v: "Aluminum Extrusion"
  },
  bottles: {
    title: "Plastic Bottles",
    description: "High-quality blow-moulded and injection-stretch blow-moulded bottles for pharmaceutical, chemical, and FMCG sectors.",
    p1_name: "HDPE Bottles",
    p1_range: "100ml – 5L",
    p1_s1_l: "Material", p1_s1_v: "HDPE",
    p1_s2_l: "Cap Sizes", p1_s2_v: "28mm / 38mm",
    p1_s3_l: "Applications", p1_s3_v: "Chemicals, Pharmaceuticals",
    p2_name: "PET Bottles",
    p2_range: "200ml – 2L",
    p2_s1_l: "Material", p2_s1_v: "PET",
    p2_s2_l: "Clarity", p2_s2_v: "High Transparency",
    p2_s3_l: "Applications", p2_s3_v: "Beverages, Personal Care"
  },
  jars: {
    title: "Plastic Jars & Containers",
    description: "Wide-mouth jars and custom containers manufactured to strict tolerances for secure sealing and optimal shelf appeal.",
    p1_name: "PP Jars",
    p1_range: "50g – 1kg",
    p1_s1_l: "Material", p1_s1_v: "Polypropylene (PP)",
    p1_s2_l: "Design", p1_s2_v: "Wide mouth, screw cap",
    p1_s3_l: "Applications", p1_s3_v: "Cosmetics, Food",
    p2_name: "Custom Containers",
    p2_range: "Custom",
    p2_s1_l: "Material", p2_s1_v: "PP / PET / HDPE",
    p2_s2_l: "Moulding", p2_s2_v: "Injection / Blow Moulding",
    p2_s3_l: "Applications", p2_s3_v: "OEM Specific"
  }
};

hi.Products = {
  bulbs: {
    title: "LED बल्ब",
    description: "आवासीय, वाणिज्यिक और औद्योगिक अनुप्रयोगों के लिए ऊर्जा-कुशल LED बल्ब। हमारे इन-हाउस प्लांट में डिजाइन और निर्मित।",
    p1_name: "मानक LED बल्ब",
    p1_range: "3W – 15W",
    p1_s1_l: "वाट क्षमता", p1_s1_v: "3W, 5W, 7W, 9W, 12W, 15W",
    p1_s2_l: "बेस प्रकार", p1_s2_v: "B22 / E27",
    p1_s3_l: "दक्षता", p1_s3_v: "100 lm/W",
    p2_name: "प्रीमियम LED बल्ब",
    p2_range: "5W – 18W",
    p2_s1_l: "वाट क्षमता", p2_s1_v: "5W – 18W",
    p2_s2_l: "बेस प्रकार", p2_s2_v: "B22 / E27",
    p2_s3_l: "डिज़ाइन", p2_s3_v: "स्लीक आर्किटेक्चरल",
    p3_name: "हाई पावर LED बल्ब",
    p3_range: "30W – 150W",
    p3_s1_l: "वाट क्षमता", p3_s1_v: "30W – 150W",
    p3_s2_l: "बेस प्रकार", p3_s2_v: "B22 / E27 / E40",
    p3_s3_l: "अनुप्रयोग", p3_s3_v: "औद्योगिक, हाई बे"
  },
  battens: {
    title: "LED बैटन",
    description: "आवासीय, वाणिज्यिक और औद्योगिक स्थानों के लिए लीनियर LED लाइटिंग समाधान। कई लंबाई और IP रेटिंग में उपलब्ध।",
    p1_name: "LED बैटन",
    p1_range: "10W – 40W",
    p1_s1_l: "वाट क्षमता", p1_s1_v: "10W – 40W",
    p1_s2_l: "लंबाई", p1_s2_v: "600mm / 1200mm / 1500mm",
    p1_s3_l: "IP रेटिंग", p1_s3_v: "IP20 / IP65",
    p2_name: "हाई पावर LED बैटन",
    p2_range: "30W – 60W",
    p2_s1_l: "वाट क्षमता", p2_s1_v: "30W – 60W",
    p2_s2_l: "लंबाई", p2_s2_v: "1200mm / 1500mm",
    p2_s3_l: "हाउसिंग", p2_s3_v: "एल्यूमिनियम एक्सट्रूज़न"
  },
  bottles: {
    title: "प्लास्टिक की बोतलें",
    description: "फार्मास्युटिकल, रसायन और FMCG क्षेत्रों के लिए उच्च गुणवत्ता वाली ब्लो-मोल्डेड और इंजेक्शन-स्ट्रेच ब्लो-मोल्डेड बोतलें।",
    p1_name: "HDPE बोतलें",
    p1_range: "100ml – 5L",
    p1_s1_l: "सामग्री", p1_s1_v: "HDPE",
    p1_s2_l: "कैप साइज़", p1_s2_v: "28mm / 38mm",
    p1_s3_l: "अनुप्रयोग", p1_s3_v: "रसायन, फार्मास्यूटिकल्स",
    p2_name: "PET बोतलें",
    p2_range: "200ml – 2L",
    p2_s1_l: "सामग्री", p2_s1_v: "PET",
    p2_s2_l: "स्पष्टता", p2_s2_v: "उच्च पारदर्शिता",
    p2_s3_l: "अनुप्रयोग", p2_s3_v: "पेय पदार्थ, व्यक्तिगत देखभाल"
  },
  jars: {
    title: "प्लास्टिक जार और कंटेनर",
    description: "सुरक्षित सीलिंग और इष्टतम शेल्फ अपील के लिए सख्त सहनशीलता के अनुसार निर्मित वाइड-माउथ जार और कस्टम कंटेनर।",
    p1_name: "PP जार",
    p1_range: "50g – 1kg",
    p1_s1_l: "सामग्री", p1_s1_v: "पॉलीप्रोपाइलीन (PP)",
    p1_s2_l: "डिज़ाइन", p1_s2_v: "वाइड माउथ, स्क्रू कैप",
    p1_s3_l: "अनुप्रयोग", p1_s3_v: "सौंदर्य प्रसाधन, भोजन",
    p2_name: "कस्टम कंटेनर",
    p2_range: "कस्टम",
    p2_s1_l: "सामग्री", p2_s1_v: "PP / PET / HDPE",
    p2_s2_l: "मोल्डिंग", p2_s2_v: "इंजेक्शन / ब्लो मोल्डिंग",
    p2_s3_l: "अनुप्रयोग", p2_s3_v: "OEM विशिष्ट"
  }
};

fs.writeFileSync(enFile, JSON.stringify(en, null, 2));
fs.writeFileSync(hiFile, JSON.stringify(hi, null, 2));

console.log("Translations added.");
