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
  'company: "Leading National Lighting Brand",',
  'company: "National Lighting Manufacturer (Client identity withheld)",'
);

replace(
  'src/data/companyFacts.ts',
  '{ name: "Automotive", description: "Components and applications for the automotive sector." },',
  ''
);

