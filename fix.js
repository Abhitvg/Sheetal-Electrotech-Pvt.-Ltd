const fs = require('fs');
const path = require('path');

function replace(file, search, replace) {
  const p = path.join(__dirname, file);
  if (!fs.existsSync(p)) return console.log('File not found:', p);
  let content = fs.readFileSync(p, 'utf8');
  if (content.includes(search)) {
    content = content.replace(search, replace);
    fs.writeFileSync(p, content, 'utf8');
    console.log('Updated', file);
  } else {
    console.log('Search string not found in', file);
  }
}

replace(
  'messages/en.json',
  '"description": "Vertically integrated OEM manufacturing partner for LED lighting and rigid plastic packaging."',
  '"description": "Vertically integrated manufacturing partner for LED lighting, electronics and rigid plastic packaging."'
);

replace(
  'messages/hi.json',
  '"description": "एलईडी प्रकाश व्यवस्था और कठोर प्लास्टिक पैकेजिंग के लिए लंबवत एकीकृत OEM निर्माण भागीदार।",',
  '"description": "एलईडी प्रकाश व्यवस्था, इलेक्ट्रॉनिक्स और कठोर प्लास्टिक पैकेजिंग के लिए लंबवत एकीकृत निर्माण भागीदार।",'
);

replace(
  'src/components/Industries.tsx',
  'Industries We Serve',
  'Industries & Applications'
);

// We need to replace Industries We Serve in IndustriesServed.tsx since the component name is IndustriesServed.tsx. Let's check first.
