import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { companyFacts, leadershipTeam, companyLocations } from '../src/data/companyFacts';
import { facilities } from '../src/data/facilities';
import { products } from '../src/data/products';

if (!fs.existsSync('public/resources')) {
    fs.mkdirSync('public/resources', { recursive: true });
}

function createCompanyProfile() {
    const doc = new PDFDocument({ margin: 50 });
    doc.pipe(fs.createWriteStream('public/resources/company-profile.pdf'));

    // Cover Page
    doc.fontSize(36).text('Sheetal Electrotech', { align: 'center', underline: true });
    doc.moveDown();
    doc.fontSize(20).text('Company Profile', { align: 'center' });
    doc.moveDown(4);
    doc.fontSize(14).text('OEM Manufacturer of Plastic Products, LED Lighting & Electronics', { align: 'center' });
    doc.addPage();

    // About Us
    doc.fontSize(24).text('About Sheetal Electrotech', { underline: true });
    doc.moveDown();
    doc.fontSize(12).text(`Established OEM manufacturer and supplier of plastic products, LED lighting, and electronics with over ${companyFacts.experience} of experience in the industry.`);
    doc.moveDown();
    doc.text(`Manufacturing Area: ${companyFacts.manufacturingArea}`);
    doc.text(`Capabilities: ${companyFacts.capabilities}`);
    doc.moveDown();
    
    // Capabilities
    doc.fontSize(18).text('Manufacturing Facilities & Capabilities');
    doc.moveDown();
    facilities.forEach(facility => {
        doc.fontSize(14).text(facility.title);
        doc.fontSize(10).text(facility.description);
        doc.moveDown();
    });
    doc.addPage();

    // Categories
    doc.fontSize(24).text('Product Categories', { underline: true });
    doc.moveDown();
    doc.fontSize(12).text('1. LED Lighting');
    doc.text('2. Electronics (Extension Boards)');
    doc.text('3. Rigid Packaging');
    doc.moveDown();
    doc.text('We offer full OEM and private-label manufacturing capabilities across all product lines.');
    doc.moveDown();

    // Quality & Certifications
    doc.fontSize(24).text('Quality & Certifications', { underline: true });
    doc.moveDown();
    companyFacts.certifications.forEach(cert => {
        doc.fontSize(12).text(`- ${cert}`);
    });
    doc.addPage();

    // Leadership
    doc.fontSize(24).text('Leadership Team', { underline: true });
    doc.moveDown();
    leadershipTeam.forEach(leader => {
        doc.fontSize(14).text(leader.name);
        doc.fontSize(12).text(leader.role);
        doc.fontSize(10).text(leader.note);
        doc.moveDown();
    });

    // Contact
    doc.addPage();
    doc.fontSize(24).text('Contact Us', { underline: true });
    doc.moveDown();
    companyLocations.forEach(loc => {
        doc.fontSize(14).text(loc.title);
        doc.fontSize(10).text(loc.address);
        loc.phones.forEach(phone => doc.text(phone));
        doc.text(loc.email);
        doc.moveDown();
    });

    doc.end();
}

function createProductCatalogue() {
    const doc = new PDFDocument({ margin: 50 });
    doc.pipe(fs.createWriteStream('public/resources/product-catalogue.pdf'));

    // Cover Page
    doc.fontSize(36).text('Sheetal Electrotech', { align: 'center', underline: true });
    doc.moveDown();
    doc.fontSize(20).text('Product Catalogue', { align: 'center' });
    doc.moveDown(4);
    doc.fontSize(14).text('LED Lighting, Electronics & Packaging', { align: 'center' });
    
    products.forEach(category => {
        doc.addPage();
        doc.fontSize(28).text(category.name, { align: 'center', underline: true });
        doc.moveDown();
        doc.fontSize(14).text(category.description, { align: 'center' });
        doc.moveDown(2);

        category.subcategories.forEach(sub => {
            doc.addPage();
            doc.fontSize(20).text(sub.name, { underline: true });
            doc.moveDown();
            
            sub.items.forEach(item => {
                doc.fontSize(14).text(item.name);
                doc.fontSize(10).text(item.description);
                if (item.specs && item.specs.length > 0) {
                    doc.moveDown(0.5);
                    doc.text('Specifications:');
                    item.specs.forEach(spec => {
                        doc.text(`- ${spec.label}: ${spec.value}`);
                    });
                }
                if (item.applications && item.applications.length > 0) {
                    doc.moveDown(0.5);
                    doc.text('Applications:');
                    item.applications.forEach(app => {
                        doc.text(`- ${app}`);
                    });
                }
                doc.moveDown();
            });
        });
    });

    // CTA
    doc.addPage();
    doc.fontSize(24).text('Request a Quote', { align: 'center', underline: true });
    doc.moveDown();
    doc.fontSize(14).text('Contact us at info@sheetalelectrotech.com to request pricing, samples, or discuss OEM manufacturing requirements.', { align: 'center' });

    doc.end();
}

createCompanyProfile();
createProductCatalogue();
console.log("Rich PDFs generated successfully.");
