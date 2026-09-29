const PDFDocument = require('pdfkit');
const fs = require('fs');

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
    doc.fontSize(12).text('Established OEM manufacturer and supplier of plastic products, LED lighting, and electronics with over 25+ Years of experience in the industry.');
    doc.moveDown();
    doc.text('Manufacturing Area: 30,000+ Sq. Ft.');
    doc.text('Capabilities: 9 In-House Capabilities');
    doc.moveDown();
    
    // Capabilities
    doc.fontSize(18).text('Manufacturing Facilities & Capabilities');
    doc.moveDown();
    const facilities = [
      { title: 'Injection Moulding', desc: 'Precision injection moulding machines up to 250 tons, capable of processing various engineering plastics for durable product housings.' },
      { title: 'IBM Plastic', desc: 'Injection Blow Moulding facility producing high-quality PC/PET/PP containers and diffuser domes.' },
      { title: 'Blow Moulding', desc: 'Advanced blow moulding machines for manufacturing rigid packaging containers.' },
      { title: 'Extrusion', desc: 'Profile extrusion lines for LED battens and custom industrial plastic profiles.' },
      { title: 'SMT', desc: 'Automated Surface Mount Technology lines for high-precision LED MCPCB and driver board population.' },
      { title: 'Manual Insertion', desc: 'Dedicated lines for through-hole components and specialized electronics assembly.' },
      { title: 'Assembly & Packing', desc: 'Streamlined final assembly lines with integrated end-of-line testing and custom packaging capabilities.' },
      { title: 'Tool Room', desc: 'In-house tool room supporting maintenance and modifications for faster product development.' },
      { title: 'R&D', desc: 'In-house photometric and electrical testing laboratory ensuring product compliance and reliability.' }
    ];
    facilities.forEach(facility => {
        doc.fontSize(14).text(facility.title);
        doc.fontSize(10).text(facility.desc);
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
    doc.fontSize(12).text('- Quality Control Process');
    doc.text('- BIS Certified');
    doc.addPage();

    // Leadership
    doc.fontSize(24).text('Leadership Team', { underline: true });
    doc.moveDown();
    const leadership = [
        { name: 'Surendra Singh', role: 'Founder & Chairman', note: 'Establishing the vision and foundational expertise in manufacturing.' },
        { name: 'Ajay Singh', role: 'CEO of Sheetal Group', note: 'Leading overall corporate operations and strategic business growth.' },
        { name: 'Suresh Prasad Arya', role: 'Head of Research and Development', note: 'Leading product innovation and engineering development.' }
    ];
    leadership.forEach(leader => {
        doc.fontSize(14).text(leader.name);
        doc.fontSize(12).text(leader.role);
        doc.fontSize(10).text(leader.note);
        doc.moveDown();
    });

    // Contact
    doc.addPage();
    doc.fontSize(24).text('Contact Us', { underline: true });
    doc.moveDown();
    doc.fontSize(14).text('Registered Office & Manufacturing Unit');
    doc.fontSize(10).text('C-97, Sector 5, Bawana Industrial Area\nNew Delhi - 110039, India');
    doc.text('+91 99999 87310');
    doc.text('+91 98114 47310');
    doc.text('info@sheetalelectrotech.com');

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
    
    const categories = [
        {
            name: 'LED Lighting',
            description: 'Comprehensive OEM LED lighting solutions',
            subcategories: [
                {
                    name: 'LED Bulbs',
                    items: [
                        { name: 'T Bulb', desc: 'High lumen output T-shape LED bulbs' },
                        { name: 'A Type Bulb', desc: 'Standard A-type LED bulbs for general illumination' },
                        { name: 'High Power Bulb', desc: 'High wattage LED bulbs for commercial spaces' },
                        { name: 'AC/DC Bulb', desc: 'Inverter bulbs with battery backup' }
                    ]
                },
                {
                    name: 'LED Battens',
                    items: [
                        { name: 'PC Batten', desc: 'Polycarbonate body LED tube lights' },
                        { name: 'Aluminium Batten', desc: 'Aluminium extrusion body for better heat dissipation' }
                    ]
                },
                {
                    name: 'Downlights',
                    items: [
                        { name: 'Deep Light', desc: 'Recessed deep LED downlights' },
                        { name: 'Concealed Light', desc: 'Standard concealed ceiling lights' },
                        { name: 'Surface Light', desc: 'Surface mounted LED ceiling lights' },
                        { name: 'Surface Ring', desc: 'Decorative surface ring fixtures' }
                    ]
                }
            ]
        },
        {
            name: 'Electronics',
            description: 'Electrical accessories and components',
            subcategories: [
                {
                    name: 'Extension Boards',
                    items: [
                        { name: 'Extension Board', desc: 'Multi-socket extension boards with surge protection' }
                    ]
                }
            ]
        },
        {
            name: 'Rigid Packaging',
            description: 'Plastic packaging containers and components',
            subcategories: [
                {
                    name: 'Containers',
                    items: [
                        { name: 'Plastic Jars', desc: 'PET/PP jars for FMCG packaging' },
                        { name: 'Bottles', desc: 'Blow moulded plastic bottles' }
                    ]
                }
            ]
        }
    ];

    categories.forEach(category => {
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
                doc.fontSize(10).text(item.desc);
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
