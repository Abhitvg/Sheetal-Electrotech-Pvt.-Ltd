import type { Metadata } from "next";

export const SITE_URL = "https://sheetalelectrotech.com";

const productDetailCopy: Record<string, { en: { title: string; description: string }; hi: { title: string; description: string } }> = {
  "/products/led-lighting/bulbs": {
    en: { title: "LED Bulbs | Sheetal Electrotech", description: "Energy-efficient LED bulbs for residential, commercial and industrial applications, designed and manufactured in-house." },
    hi: { title: "LED बल्ब | शीतल इलेक्ट्रो-टेक", description: "आवासीय, वाणिज्यिक और औद्योगिक अनुप्रयोगों के लिए ऊर्जा-कुशल LED बल्ब, इन-हाउस डिजाइन और विनिर्माण के साथ।" }
  },
  "/products/led-lighting/battens": {
    en: { title: "LED Battens | Sheetal Electrotech", description: "Linear LED lighting solutions for residential, commercial and industrial spaces, available in multiple lengths and configurations." },
    hi: { title: "LED बैटन | शीतल इलेक्ट्रो-टेक", description: "आवासीय, वाणिज्यिक और औद्योगिक स्थानों के लिए लीनियर LED लाइटिंग समाधान, विभिन्न लंबाई और कॉन्फ़िगरेशन में।" }
  },
  "/products/led-lighting/downlights": {
    en: { title: "LED Downlights & Panels | Sheetal Electrotech", description: "Explore LED downlights, ceiling lights and surface ring products manufactured to specified requirements." },
    hi: { title: "LED डाउनलाइट और पैनल | शीतल इलेक्ट्रो-टेक", description: "निर्धारित आवश्यकताओं के अनुसार निर्मित LED डाउनलाइट, सीलिंग लाइट और सरफेस रिंग उत्पाद देखें।" }
  },
  "/products/led-lighting/street-lights": {
    en: { title: "LED Street Lights | Sheetal Electrotech", description: "LED street lighting products for outdoor illumination and infrastructure applications." },
    hi: { title: "LED स्ट्रीट लाइट | शीतल इलेक्ट्रो-टेक", description: "आउटडोर रोशनी और इंफ्रास्ट्रक्चर अनुप्रयोगों के लिए LED स्ट्रीट लाइट उत्पाद।" }
  },
  "/products/led-lighting/flood-lights": {
    en: { title: "LED Flood Lights | Sheetal Electrotech", description: "High-power LED flood and well-light products for outdoor, industrial and area illumination." },
    hi: { title: "LED फ्लड लाइट | शीतल इलेक्ट्रो-टेक", description: "आउटडोर, औद्योगिक और क्षेत्रीय रोशनी के लिए हाई-पावर LED फ्लड और वेल-लाइट उत्पाद।" }
  },
  "/products/led-lighting/spot-lights": {
    en: { title: "LED Spot Lights | Sheetal Electrotech", description: "Directional LED spot lighting products for focused and accent illumination." },
    hi: { title: "LED स्पॉट लाइट | शीतल इलेक्ट्रो-टेक", description: "फोकस्ड और एक्सेंट रोशनी के लिए डायरेक्शनल LED स्पॉट लाइट उत्पाद।" }
  },
  "/products/led-lighting/decorative-lights": {
    en: { title: "Decorative LED Lighting | Sheetal Electrotech", description: "Decorative LED lighting products designed for aesthetic and ambient illumination." },
    hi: { title: "डेकोरेटिव LED लाइटिंग | शीतल इलेक्ट्रो-टेक", description: "सौंदर्यात्मक और एम्बिएंट रोशनी के लिए डिजाइन किए गए डेकोरेटिव LED लाइटिंग उत्पाद।" }
  },
  "/products/led-lighting/smart-led": {
    en: { title: "Smart LED Lighting | Sheetal Electrotech", description: "Smart LED lighting products for connected lighting applications." },
    hi: { title: "स्मार्ट LED लाइटिंग | शीतल इलेक्ट्रो-टेक", description: "कनेक्टेड लाइटिंग अनुप्रयोगों के लिए स्मार्ट LED लाइटिंग उत्पाद।" }
  },
  "/products/led-lighting/strip-lights": {
    en: { title: "LED Strip Lights | Sheetal Electrotech", description: "Flexible LED strip lighting products for accent, cove and interior illumination." },
    hi: { title: "LED स्ट्रिप लाइट | शीतल इलेक्ट्रो-टेक", description: "एक्सेंट, कोव और इंटीरियर रोशनी के लिए फ्लेक्सिबल LED स्ट्रिप लाइट उत्पाद।" }
  },
  "/products/electronics/extension-boards": {
    en: { title: "Extension Boards | Sheetal Electrotech", description: "Safe and durable extension boards and electronic accessories from Sheetal Electrotech." },
    hi: { title: "एक्सटेंशन बोर्ड | शीतल इलेक्ट्रो-टेक", description: "शीतल इलेक्ट्रो-टेक के सुरक्षित और टिकाऊ एक्सटेंशन बोर्ड तथा इलेक्ट्रॉनिक एक्सेसरीज़।" }
  },
  "/products/rigid-packaging/bottles": {
    en: { title: "Plastic Bottles | Sheetal Electrotech", description: "Blow-moulded and injection-stretch blow-moulded plastic bottles for diverse packaging applications." },
    hi: { title: "प्लास्टिक बोतलें | शीतल इलेक्ट्रो-टेक", description: "विभिन्न पैकेजिंग अनुप्रयोगों के लिए ब्लो-मोल्डेड और इंजेक्शन-स्ट्रेच ब्लो-मोल्डेड प्लास्टिक बोतलें।" }
  },
  "/products/rigid-packaging/jars": {
    en: { title: "Plastic Jars & Containers | Sheetal Electrotech", description: "Wide-mouth plastic jars and custom containers manufactured for secure sealing and specified requirements." },
    hi: { title: "प्लास्टिक जार और कंटेनर | शीतल इलेक्ट्रो-टेक", description: "सुरक्षित सीलिंग और निर्धारित आवश्यकताओं के लिए निर्मित वाइड-माउथ प्लास्टिक जार और कस्टम कंटेनर।" }
  },
  "/products/rigid-packaging/containers": {
    en: { title: "Plastic Containers | Sheetal Electrotech", description: "Rigid plastic containers manufactured for storage and packaging requirements." },
    hi: { title: "प्लास्टिक कंटेनर | शीतल इलेक्ट्रो-टेक", description: "स्टोरेज और पैकेजिंग आवश्यकताओं के लिए निर्मित कठोर प्लास्टिक कंटेनर।" }
  },
  "/products/rigid-packaging/custom": {
    en: { title: "Custom Plastic Packaging | Sheetal Electrotech", description: "Custom-moulded rigid plastic packaging developed around specific product and packaging requirements." },
    hi: { title: "कस्टम प्लास्टिक पैकेजिंग | शीतल इलेक्ट्रो-टेक", description: "विशिष्ट उत्पाद और पैकेजिंग आवश्यकताओं के अनुसार विकसित कस्टम-मोल्डेड कठोर प्लास्टिक पैकेजिंग।" }
  },
  "/products/rigid-packaging/components": {
    en: { title: "Injection-Moulded Components | Sheetal Electrotech", description: "Injection-moulded plastic components, housings and enclosures manufactured to specified requirements." },
    hi: { title: "इंजेक्शन-मोल्डेड घटक | शीतल इलेक्ट्रो-टेक", description: "निर्धारित आवश्यकताओं के अनुसार निर्मित इंजेक्शन-मोल्डेड प्लास्टिक घटक, हाउसिंग और एनक्लोजर।" }
  }
};

const pageCopy = {
  home: {
    en: {
      title: "Sheetal Electrotech | LED Lighting, Electronics & OEM Manufacturing",
      description: "Sheetal Electrotech is an Indian manufacturer of LED lighting, electronics and plastic products, with 25+ years of manufacturing experience and 9 in-house capabilities."
    },
    hi: {
      title: "शीतल इलेक्ट्रो-टेक | एलईडी लाइटिंग, इलेक्ट्रॉनिक्स और ओईएम विनिर्माण",
      description: "शीतल इलेक्ट्रो-टेक एलईडी लाइटिंग, इलेक्ट्रॉनिक्स और प्लास्टिक उत्पादों का भारतीय निर्माता है, जिसके पास 25+ वर्षों का विनिर्माण अनुभव और 9 इन-हाउस क्षमताएं हैं।"
    }
  },
  company: {
    en: {
      title: "About Sheetal Electrotech | 25+ Years of Manufacturing",
      description: "Learn about Sheetal Electrotech, its 25+ years of manufacturing experience, leadership and capabilities across LED lighting, electronics and plastic products."
    },
    hi: {
      title: "शीतल इलेक्ट्रो-टेक के बारे में | 25+ वर्षों का विनिर्माण अनुभव",
      description: "शीतल इलेक्ट्रो-टेक, 25+ वर्षों के विनिर्माण अनुभव, नेतृत्व और एलईडी लाइटिंग, इलेक्ट्रॉनिक्स तथा प्लास्टिक उत्पादों की क्षमताओं के बारे में जानें।"
    }
  },
  products: {
    en: {
      title: "Products | LED Lighting, Electronics & Rigid Plastic Packaging",
      description: "Explore Sheetal Electrotech product ranges across LED lighting, electronics and rigid plastic packaging."
    },
    hi: {
      title: "उत्पाद | एलईडी लाइटिंग, इलेक्ट्रॉनिक्स और कठोर प्लास्टिक पैकेजिंग",
      description: "एलईडी लाइटिंग, इलेक्ट्रॉनिक्स और कठोर प्लास्टिक पैकेजिंग में शीतल इलेक्ट्रो-टेक की उत्पाद श्रेणियां देखें।"
    }
  },
  ledLighting: {
    en: {
      title: "LED Lighting Manufacturer | Sheetal Electrotech",
      description: "Explore LED bulbs, battens, downlights, street lights, flood lights, spot lights, decorative lighting, smart LED and strip lights."
    },
    hi: {
      title: "एलईडी लाइटिंग निर्माता | शीतल इलेक्ट्रो-टेक",
      description: "एलईडी बल्ब, बैटन, डाउनलाइट, स्ट्रीट लाइट, फ्लड लाइट, स्पॉट लाइट, डेकोरेटिव, स्मार्ट एलईडी और स्ट्रिप लाइट देखें।"
    }
  },
  electronics: {
    en: {
      title: "Electronics & Accessories | Sheetal Electrotech",
      description: "Explore electronics and accessories manufactured by Sheetal Electrotech, including extension boards."
    },
    hi: {
      title: "इलेक्ट्रॉनिक्स और एक्सेसरीज़ | शीतल इलेक्ट्रो-टेक",
      description: "शीतल इलेक्ट्रो-टेक द्वारा निर्मित इलेक्ट्रॉनिक्स और एक्सेसरीज़, जिनमें एक्सटेंशन बोर्ड शामिल हैं, देखें।"
    }
  },
  rigidPackaging: {
    en: {
      title: "Rigid Plastic Packaging Manufacturer | Sheetal Electrotech",
      description: "Explore rigid plastic packaging capabilities for bottles, jars, containers, custom packaging and injection-moulded components."
    },
    hi: {
      title: "कठोर प्लास्टिक पैकेजिंग निर्माता | शीतल इलेक्ट्रो-टेक",
      description: "बोतल, जार, कंटेनर, कस्टम पैकेजिंग और इंजेक्शन-मोल्डेड घटकों के लिए कठोर प्लास्टिक पैकेजिंग क्षमताएं देखें।"
    }
  },
  facilities: {
    en: {
      title: "Manufacturing Facilities | Sheetal Electrotech",
      description: "Explore 9 in-house manufacturing capabilities in Daman, including injection moulding, IBM, extrusion, R&D, SMT, assembly and tool room."
    },
    hi: {
      title: "विनिर्माण सुविधाएं | शीतल इलेक्ट्रो-टेक",
      description: "दमन में 9 इन-हाउस विनिर्माण क्षमताओं को देखें, जिनमें इंजेक्शन मोल्डिंग, IBM, एक्सट्रूज़न, R&D, SMT, असेंबली और टूल रूम शामिल हैं।"
    }
  },
  quality: {
    en: {
      title: "Quality & Compliance | Sheetal Electrotech",
      description: "Learn about Sheetal Electrotech's quality, inspection and testing approach for LED lighting, electronics and plastic products."
    },
    hi: {
      title: "गुणवत्ता और अनुपालन | शीतल इलेक्ट्रो-टेक",
      description: "एलईडी लाइटिंग, इलेक्ट्रॉनिक्स और प्लास्टिक उत्पादों के लिए शीतल इलेक्ट्रो-टेक की गुणवत्ता, निरीक्षण और परीक्षण प्रक्रियाओं के बारे में जानें।"
    }
  },
  careers: {
    en: {
      title: "Careers | Sheetal Electrotech",
      description: "Explore career opportunities at Sheetal Electrotech across engineering, manufacturing and business functions."
    },
    hi: {
      title: "करियर | शीतल इलेक्ट्रो-टेक",
      description: "इंजीनियरिंग, विनिर्माण और व्यावसायिक कार्यों में शीतल इलेक्ट्रो-टेक के करियर अवसर देखें।"
    }
  },
  gallery: {
    en: {
      title: "Factory Gallery | Sheetal Electrotech",
      description: "View Sheetal Electrotech's manufacturing, facility and product photography."
    },
    hi: {
      title: "फैक्टरी गैलरी | शीतल इलेक्ट्रो-टेक",
      description: "शीतल इलेक्ट्रो-टेक की विनिर्माण, सुविधा और उत्पाद तस्वीरें देखें।"
    }
  },
  insights: {
    en: {
      title: "Insights & Knowledge | Sheetal Electrotech",
      description: "Practical information on LED lighting, manufacturing, product development, packaging and engineering."
    },
    hi: {
      title: "अंतर्दृष्टि और ज्ञान | शीतल इलेक्ट्रो-टेक",
      description: "एलईडी लाइटिंग, विनिर्माण, उत्पाद विकास, पैकेजिंग और इंजीनियरिंग पर उपयोगी जानकारी।"
    }
  },
  contact: {
    en: {
      title: "Contact Sheetal Electrotech | Daman Manufacturing",
      description: "Contact Sheetal Electrotech for manufacturing enquiries, product information, factory visits and business discussions."
    },
    hi: {
      title: "शीतल इलेक्ट्रो-टेक से संपर्क | दमन विनिर्माण",
      description: "विनिर्माण पूछताछ, उत्पाद जानकारी, फैक्टरी विजिट और व्यावसायिक चर्चा के लिए शीतल इलेक्ट्रो-टेक से संपर्क करें।"
    }
  },
  rfq: {
    en: {
      title: "Request a Quote | Sheetal Electrotech",
      description: "Submit your product or manufacturing requirements to Sheetal Electrotech for an RFQ discussion."
    },
    hi: {
      title: "कोटेशन मांगें | शीतल इलेक्ट्रो-टेक",
      description: "RFQ चर्चा के लिए अपने उत्पाद या विनिर्माण संबंधी आवश्यकताएं शीतल इलेक्ट्रो-टेक को भेजें।"
    }
  },
  privacy: {
    en: {
      title: "Privacy Policy | Sheetal Electrotech",
      description: "Privacy Policy for Sheetal Electrotech."
    },
    hi: {
      title: "गोपनीयता नीति | शीतल इलेक्ट्रो-टेक",
      description: "शीतल इलेक्ट्रो-टेक की गोपनीयता नीति।"
    }
  },
  terms: {
    en: {
      title: "Terms of Service | Sheetal Electrotech",
      description: "Terms of Service for Sheetal Electrotech."
    },
    hi: {
      title: "सेवा की शर्तें | शीतल इलेक्ट्रो-टेक",
      description: "शीतल इलेक्ट्रो-टेक की सेवा की शर्तें।"
    }
  }
} as const;

export function localizedUrl(locale: string, path = "") {
  return `${SITE_URL}/${locale}${path}`;
}

export function localizedMetadata(
  locale: string,
  path: string,
  copy: { en: { title: string; description: string }; hi: { title: string; description: string } }
): Metadata {
  const currentLocale = locale === "hi" ? "hi" : "en";
  const effectiveCopy = productDetailCopy[path] ?? copy;
  const title = effectiveCopy[currentLocale].title;
  const description = effectiveCopy[currentLocale].description;
  const enUrl = localizedUrl("en", path);
  const hiUrl = localizedUrl("hi", path);

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: localizedUrl(currentLocale, path),
      languages: {
        en: enUrl,
        hi: hiUrl,
        "x-default": enUrl,
      },
    },
    openGraph: {
      type: "website",
      siteName: "Sheetal Electrotech",
      locale: currentLocale === "hi" ? "hi_IN" : "en_IN",
      url: localizedUrl(currentLocale, path),
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function getPageCopy(page: keyof typeof pageCopy) {
  return pageCopy[page];
}
