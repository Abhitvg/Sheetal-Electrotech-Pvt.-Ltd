const PDFDocument = require('pdfkit');
const fs = require('fs');

if (!fs.existsSync('public/resources')) {
    fs.mkdirSync('public/resources', { recursive: true });
}

// 1. Company Profile
const doc1 = new PDFDocument();
doc1.pipe(fs.createWriteStream('public/resources/company-profile.pdf'));
doc1.fontSize(24).text('Sheetal Electrotech - Company Profile', { align: 'center' });
doc1.moveDown();
doc1.fontSize(14).text('Overview: Sheetal Electrotech Private Limited is a leading OEM manufacturer.');
doc1.text('Experience: 25+ years');
doc1.text('Certifications: ISO 9001:2015, BIS Certified');
doc1.text('Facilities: Injection Moulding, IBM Plastic, Extrusion, Manual Insertion, R&D, Blow Moulding, SMT, Assembly & Packing, Tool Room.');
doc1.end();

// 2. Product Catalogue
const doc2 = new PDFDocument();
doc2.pipe(fs.createWriteStream('public/resources/product-catalogue.pdf'));
doc2.fontSize(24).text('Sheetal Electrotech - Product Catalogue', { align: 'center' });
doc2.moveDown();
doc2.fontSize(14).text('LED Lighting');
doc2.fontSize(12).text('- Bulbs\n- Battens\n- Downlights\n- Street Lights\n- Flood Lights\n- Spot Lights\n- Decorative\n- Smart LED\n- Strip Lights');
doc2.moveDown();
doc2.fontSize(14).text('Electronics');
doc2.fontSize(12).text('- Extension Boards');
doc2.moveDown();
doc2.fontSize(14).text('Rigid Packaging');
doc2.fontSize(12).text('- Containers\n- Custom Packaging\n- Components');
doc2.end();
