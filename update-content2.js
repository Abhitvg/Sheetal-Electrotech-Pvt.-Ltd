const fs = require('fs');

// 1. Update facilities.ts
let facilitiesCode = fs.readFileSync('./src/data/facilities.ts', 'utf8');

// Injection Moulding
facilitiesCode = facilitiesCode.replace(
  /"Our 18\+ injection moulding machines[^"]+"/, 
  '"It involves injecting molten plastic material into a mold cavity under high pressure, which then cools and solidifies to form a precise, high-quality plastic part."'
);
facilitiesCode = facilitiesCode.replace(/\/images\/moulding_factory\.jpg/g, '/images/legacy/Photo1.webp');

// IBM Plastic
facilitiesCode = facilitiesCode.replace(
  /"Combining injection and blow moulding processes[^"]+"/,
  '"Injection blow molding (IBM) is a manufacturing process used to produce hollow plastic parts. It is a variation of blow molding, which is used to create hollow objects from thermoplastic materials such as pe, pp, and ps."'
);

// Extruder Machine (Wait, old code had Tool Room instead of Extruder. I will replace tool-room with extruder)
facilitiesCode = facilitiesCode.replace(/slug: "tool-room"/, 'slug: "extruder"');
facilitiesCode = facilitiesCode.replace(/title: "In-House Tool Room"/, 'title: "Extruder Machine Plastic"');
facilitiesCode = facilitiesCode.replace(
  /"Our precision tool room houses[^"]+"/,
  '"The extrusion machine is a versatile tool for producing a wide range of plastic products, including batten, with a high degree of precision and consistency."'
);
facilitiesCode = facilitiesCode.replace(/\/images\/tool_room\.jpg/g, '/images/legacy/Photo2.webp');

// SMT Machine
facilitiesCode = facilitiesCode.replace(
  /"Equipped with Yamaha and Hanwha[^"]+"/,
  '"Surface Mount Technology machine is a type of electronic manufacturing equipment used in the production of printed circuit boards. SMT machines are used to place surface-mount devices onto a PCB."'
);
facilitiesCode = facilitiesCode.replace(/\/images\/hero_factory\.jpg/g, '/images/legacy/Photo3.webp');

// Assembly & Packing
facilitiesCode = facilitiesCode.replace(
  /"A 100,000 units\/day assembly operation[^"]+"/,
  '"The assembly and packing line is a key component of modern manufacturing, allowing for the rapid production and delivery of high-quality goods to customers around the world."'
);
facilitiesCode = facilitiesCode.replace(/\/images\/testing_lab\.jpg/g, '/images/legacy/Photo4.webp');

// Blow Moulding
facilitiesCode = facilitiesCode.replace(
  /"Specializing in HDPE, PET, and PP rigid containers[^"]+"/,
  '"A plastic blow molding machine is a type of manufacturing equipment used to produce hollow plastic products such as bottles, containers, and tanks. The process involves melting plastic resin and then blowing it into a mold to create a desired shape."'
);
facilitiesCode = facilitiesCode.replace(/\/images\/packaging_factory\.jpg/g, '/images/legacy/Photo5.webp');

// R&D
facilitiesCode = facilitiesCode.replace(
  /"Our dedicated R&D team continuously explores[^"]+"/,
  '"R&D efforts in LED lighting and plastic materials are focused on creating sustainable, energy-efficient, and cost-effective lighting solutions that can meet the growing demand for eco-friendly products."'
);

// Manual Insertion
facilitiesCode = facilitiesCode.replace(
  /"While our SMT lines handle automated placement[^"]+"/,
  '"Manual insertion is ideal for low-volume or custom products, while automatic insertion is more efficient for high-volume production runs."'
);

fs.writeFileSync('./src/data/facilities.ts', facilitiesCode);


// 2. Update company/page.tsx
let companyCode = fs.readFileSync('./src/app/[locale]/company/page.tsx', 'utf8');

const newAboutText = `                  Sheetal Group is a leading manufacturer and supplier of plastic products, LED lighting, and electronics with over 25 years of experience in the industry. Founded by Surendra Singh, the company has established itself as a trusted name in the market, thanks to its commitment to quality, innovation, and customer satisfaction. With expertise in injection molding, blow molding, extrusion, and other plastic manufacturing processes, Sheetal Group offers a wide range of high-quality plastic products that cater to various industries and applications. From automotive components to consumer goods, their products are known for their durability, functionality, and cost-effectiveness. In addition to plastic products, Sheetal Group also specializes in LED lighting and electronics. Their cutting-edge LED lighting solutions are designed to be energy-efficient, long-lasting, and environmentally friendly, making them an ideal choice for commercial and residential applications. What sets Sheetal Group apart from its competitors is its ability to develop new and innovative products with the lowest possible cost, thanks to the expertise of its founder and skilled team. Whether you need custom plastic products, LED lighting solutions, or electronics, Sheetal Group has the expertise and experience to deliver quality products that meet your needs. At Sheetal Group, our mission is to provide our customers with the best possible products and services, while maintaining the highest standards of quality, safety, and sustainability.`;

companyCode = companyCode.replace(/<p>[\s\S]*?The Sheetal Group, with its flagship company[\s\S]*?<\/p>/, `<p>\n${newAboutText}\n</p>`);
companyCode = companyCode.replace(/<p>\n\s*The Sheetal Group was founded by Surendra Singh[\s\S]*?<\/p>/, '');
companyCode = companyCode.replace(/<p>\n\s*The LED lighting solutions offered[\s\S]*?<\/p>/, '');
companyCode = companyCode.replace(/<p>\n\s*The company’s in-house facilities[\s\S]*?<\/p>/, '');

companyCode = companyCode.replace(/\/images\/company_team\.jpg/g, '/images/legacy/IMG_8752-removebg-preview.png');

fs.writeFileSync('./src/app/[locale]/company/page.tsx', companyCode);

// 3. Service Options to Homepage? Or just replace images on the homepage?
// The user asked to "put all the images and get data of the website from here populate all the pages with the content".
// Let's replace the images on the products and facilities page too.
let productsPage = fs.readFileSync('./src/app/[locale]/products/page.tsx', 'utf8');
productsPage = productsPage.replace(/\/images\/products_packaging\.jpg/g, '/images/legacy/1-jpg.webp');
productsPage = productsPage.replace(/\/images\/products_led\.jpg/g, '/images/legacy/8-jpg.webp');
fs.writeFileSync('./src/app/[locale]/products/page.tsx', productsPage);

console.log("Updated facilities and company content.");
