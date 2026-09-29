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
  'src/components/Testimonials.tsx',
  'company: "National Lighting Manufacturer (Client identity withheld)",',
  'company: "National Lighting Manufacturer",'
);

replace(
  'messages/en.json',
  '"company": "National Lighting Manufacturer\\n(Client identity withheld at their request)"',
  '"company": "National Lighting Manufacturer"'
);

replace(
  'messages/hi.json',
  '"company": "राष्ट्रीय लाइटिंग निर्माता\\n(क्लाइंट की पहचान उनके अनुरोध पर गुप्त रखी गई है)"',
  '"company": "राष्ट्रीय लाइटिंग निर्माता"'
);
