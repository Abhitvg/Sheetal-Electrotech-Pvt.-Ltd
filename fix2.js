const fs = require('fs');

function replace(file, search, replaceStr) {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes(search)) {
    content = content.replace(search, replaceStr);
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated', file);
  } else {
    console.log('Not found in', file, ':', search);
  }
}

replace(
  'messages/hi.json',
  '"description": "एलईडी लाइटिंग और कठोर प्लास्टिक पैकेजिंग के लिए वर्टिकली इंटीग्रेटेड ओईएम मैन्युफैक्चरिंग पार्टनर।",',
  '"description": "एलईडी लाइटिंग, इलेक्ट्रॉनिक्स और कठोर प्लास्टिक पैकेजिंग के लिए वर्टिकली इंटीग्रेटेड मैन्युफैक्चरिंग पार्टनर।",'
);

replace(
  'src/components/IndustriesServed.tsx',
  'Industries We Serve',
  'Industries & Applications'
);

replace(
  'messages/en.json',
  '"author": "Procurement Head",',
  '"author": "Procurement Head",'
);

replace(
  'messages/en.json',
  '"company": "Leading National Lighting Brand"',
  '"company": "National Lighting Manufacturer\\n(Client identity withheld at their request)"'
);

replace(
  'messages/hi.json',
  '"company": "लीडिंग नेशनल लाइटिंग ब्रांड"',
  '"company": "राष्ट्रीय लाइटिंग निर्माता\\n(क्लाइंट की पहचान उनके अनुरोध पर गुप्त रखी गई है)"'
);

// We need to also change "Industries We Serve" in en.json if it's there
