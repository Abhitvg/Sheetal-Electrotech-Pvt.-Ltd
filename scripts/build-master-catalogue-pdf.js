const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Ensure output directories exist
const outputDir = path.join(__dirname, '../public/resources');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const outputPath = path.join(outputDir, 'product-catalogue.pdf');

// Helper to check if image exists and is compatible with PDFKit
function getSafeImage(relativePath) {
  if (!relativePath) return null;
  // If webp was requested, check if png version exists
  if (relativePath.endsWith('.webp')) {
    const pngRel = relativePath.replace(/\.webp$/, '.png');
    const fullPng = path.join(__dirname, '..', pngRel);
    if (fs.existsSync(fullPng)) {
      return getSafeImage(pngRel);
    }
  }
  const fullPath = path.isAbsolute(relativePath) ? relativePath : path.join(__dirname, '..', relativePath);
  if (!fs.existsSync(fullPath)) return null;

  try {
    const fd = fs.openSync(fullPath, 'r');
    const buf = Buffer.alloc(8);
    fs.readSync(fd, buf, 0, 8, 0);
    fs.closeSync(fd);

    const hex = buf.toString('hex');
    const isPng = hex.startsWith('89504e47');
    const isJpg = hex.startsWith('ffd8ffe');

    if (isPng || isJpg) {
      return fullPath;
    }
  } catch (e) {
    return null;
  }
  return null;
}

// Color Palette
const COLORS = {
  primaryDark: '#071322',
  navy: '#0b192c',
  accent: '#ff5e14',        // Sheetal Brand Orange
  accentLight: '#ff7a3d',
  cyan: '#0284c7',
  cyanLight: '#e0f2fe',
  ink: '#0f172a',
  slateDark: '#334155',
  steel: '#64748b',
  lightGray: '#f8fafc',
  cardBg: '#f1f5f9',
  border: '#cbd5e1',
  white: '#ffffff',
  green: '#10b981',
};

// Document dimensions (A4 in points: 595.28 x 841.89)
const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN = 36;
const CONTENT_W = PAGE_W - (MARGIN * 2); // 523.28

function buildCatalogue() {
  const doc = new PDFDocument({
    size: 'A4',
    margin: 0,
    bufferPages: true,
    info: {
      Title: 'Sheetal Electrotech - OEM & ODM Product Catalogue 2026',
      Author: 'Sheetal Electrotech Private Limited',
      Subject: 'LED Lighting, Electronics, SMT & Rigid Plastic Packaging',
      Keywords: 'LED Lighting, SMT, Injection Moulding, Blow Moulding, OEM Manufacturer, Daman',
      Creator: 'Sheetal Engineering Documentation Desk'
    }
  });

  const writeStream = fs.createWriteStream(outputPath);
  doc.pipe(writeStream);

  // Helper: Draw standard running header (for pages 2-10)
  function drawRunningHeader(categoryTitle, pageNumber) {
    // Header background bar
    doc.rect(0, 0, PAGE_W, 44).fill(COLORS.primaryDark);

    // Accent line
    doc.rect(0, 44, PAGE_W, 2.5).fill(COLORS.accent);

    // Header text
    doc.font('Helvetica-Bold').fontSize(11).fillColor(COLORS.white);
    doc.text('SHEETAL GROUP', MARGIN, 16);

    doc.font('Helvetica').fontSize(9).fillColor('#94a3b8');
    doc.text(`|   ${categoryTitle.toUpperCase()}`, MARGIN + 105, 17);

    doc.font('Helvetica-Bold').fontSize(8).fillColor(COLORS.accent);
    doc.text('2026 OEM SPECIFICATION', PAGE_W - MARGIN - 140, 17, { width: 140, align: 'right' });
  }

  // Helper: Draw standard running footer (for pages 2-10)
  function drawRunningFooter(pageNumber, totalPages = 10) {
    const footY = PAGE_H - 32;

    // Line
    doc.rect(MARGIN, footY - 8, CONTENT_W, 0.8).fill(COLORS.border);

    // Left info
    doc.font('Helvetica').fontSize(7.5).fillColor(COLORS.steel);
    doc.text('Confidential B2B Specification Guide  •  ISO 9001:2015 & BIS Certified Facility', MARGIN, footY);

    // Center web
    doc.font('Helvetica-Bold').fontSize(7.5).fillColor(COLORS.navy);
    doc.text('www.sheetalelectrotech.com', MARGIN + 220, footY);

    // Right page number
    doc.font('Helvetica-Bold').fontSize(8).fillColor(COLORS.accent);
    doc.text(`Page ${pageNumber} of ${totalPages}`, PAGE_W - MARGIN - 70, footY, { width: 70, align: 'right' });
  }

  // Helper: Draw Section Title on a page
  function drawPageSectionTitle(eyebrow, title, subtitle) {
    const startY = 62;

    // Eyebrow badge
    doc.roundedRect(MARGIN, startY, 190, 16, 3).fill(COLORS.cyanLight);
    doc.font('Helvetica-Bold').fontSize(7.5).fillColor(COLORS.cyan);
    doc.text(eyebrow.toUpperCase(), MARGIN + 8, startY + 4);

    // Title
    doc.font('Helvetica-Bold').fontSize(18).fillColor(COLORS.primaryDark);
    doc.text(title, MARGIN, startY + 22);

    // Subtitle
    if (subtitle) {
      doc.font('Helvetica').fontSize(9).fillColor(COLORS.steel);
      doc.text(subtitle, MARGIN, startY + 45, { width: CONTENT_W, lineGap: 2 });
    }
  }

  // =========================================================================
  // PAGE 1: MASTER COVER PAGE
  // =========================================================================
  function renderPage1() {
    // Dark background full bleed
    doc.rect(0, 0, PAGE_W, PAGE_H).fill(COLORS.primaryDark);

    // Diagonal decorative accent strip
    doc.save();
    doc.rect(0, 0, PAGE_W, 8).fill(COLORS.accent);
    doc.restore();

    // Top logo / emblem area
    const heroCover = getSafeImage('public/images/hero_manufacturing.jpg');
    if (heroCover) {
      // Inset photo with subtle shadow & border
      doc.save();
      doc.roundedRect(MARGIN, 130, CONTENT_W, 230, 6).clip();
      doc.image(heroCover, MARGIN, 130, { width: CONTENT_W, height: 230 });
      // Dark gradient overlay
      doc.rect(MARGIN, 130, CONTENT_W, 230).fillOpacity(0.35).fill(COLORS.primaryDark);
      doc.restore();

      // Border around photo
      doc.roundedRect(MARGIN, 130, CONTENT_W, 230, 6).lineWidth(1.5).strokeColor('rgba(255,255,255,0.2)').stroke();
    }

    // Top brand text
    doc.font('Helvetica-Bold').fontSize(26).fillColor(COLORS.white);
    doc.text('SHEETAL GROUP', MARGIN, 46);

    doc.font('Helvetica-Bold').fontSize(11).fillColor(COLORS.accent);
    doc.text('SHEETAL ELECTROTECH PRIVATE LIMITED', MARGIN, 76);

    doc.font('Helvetica').fontSize(8.5).fillColor('#94a3b8');
    doc.text('Daman Integrated Manufacturing Campus  •  Mumbai Corporate Office', MARGIN, 92);

    // Badge on top right
    doc.roundedRect(PAGE_W - MARGIN - 160, 48, 160, 26, 4).fill(COLORS.accent);
    doc.font('Helvetica-Bold').fontSize(9).fillColor(COLORS.white);
    doc.text('OFFICIAL OEM CATALOGUE', PAGE_W - MARGIN - 155, 56, { width: 150, align: 'center' });

    // Overlay Tag on Photo
    doc.roundedRect(MARGIN + 16, 320, 260, 24, 3).fillOpacity(0.9).fill(COLORS.primaryDark);
    doc.fillOpacity(1);
    doc.font('Helvetica-Bold').fontSize(8.5).fillColor(COLORS.white);
    doc.text('30,000+ SQ. FT. INTEGRATED PRODUCTION COMPLEX', MARGIN + 26, 327);

    // Title Section below hero image
    const titleY = 380;
    doc.font('Helvetica-Bold').fontSize(11).fillColor(COLORS.accent);
    doc.text('TURNKEY OEM & ODM SOLUTIONS 2026', MARGIN, titleY);

    doc.font('Helvetica-Bold').fontSize(26).fillColor(COLORS.white);
    doc.text('Industrial & Commercial', MARGIN, titleY + 16);
    doc.font('Helvetica-Bold').fontSize(26).fillColor('#38bdf8');
    doc.text('Product & Packaging Matrix', MARGIN, titleY + 44);

    doc.font('Helvetica').fontSize(10).fillColor('#cbd5e1');
    doc.text(
      'Single-roof vertically integrated manufacturing for LED Lighting, SMT Driver Electronics, and Precision Rigid Plastic Packaging. Engineered for leading enterprise brands and national distributor networks.',
      MARGIN,
      titleY + 76,
      { width: CONTENT_W, lineGap: 3 }
    );

    // 4 Verified Stats Cards
    const statsY = 505;
    const statW = (CONTENT_W - 24) / 4;
    const stats = [
      { val: '25+ Years', lbl: 'Manufacturing Excellence' },
      { val: '30,000+', lbl: 'Sq. Ft. Plant Area' },
      { val: '9 In-House', lbl: 'Turnkey Capabilities' },
      { val: '100% Tested', lbl: 'BIS & ISO 9001 Process' },
    ];

    stats.forEach((s, idx) => {
      const sx = MARGIN + idx * (statW + 8);
      doc.roundedRect(sx, statsY, statW, 64, 4).fill('#0f243e');
      doc.roundedRect(sx, statsY, statW, 64, 4).lineWidth(1).strokeColor('#1e3a5f').stroke();

      doc.font('Helvetica-Bold').fontSize(14).fillColor(COLORS.white);
      doc.text(s.val, sx + 8, statsY + 12, { width: statW - 16, align: 'center' });

      doc.font('Helvetica').fontSize(7.5).fillColor('#94a3b8');
      doc.text(s.lbl, sx + 8, statsY + 34, { width: statW - 16, align: 'center' });
    });

    // 4 Pillar Divisions Banner
    const divY = 585;
    doc.roundedRect(MARGIN, divY, CONTENT_W, 70, 4).fill('#0a1b2f');
    doc.roundedRect(MARGIN, divY, CONTENT_W, 70, 4).lineWidth(1).strokeColor('#1e3a5f').stroke();

    doc.font('Helvetica-Bold').fontSize(9).fillColor(COLORS.accent);
    doc.text('FOUR CORE MANUFACTURING DIVISIONS:', MARGIN + 16, divY + 12);

    const pillarCols = [
      { t: '1. LED Lighting OEM', d: 'Bulbs, Battens, Downlights, Street' },
      { t: '2. SMT Electronics', d: 'Automated Pick-&-Place, Drivers' },
      { t: '3. Rigid Packaging', d: 'HDPE/PP Bottles, Jars, Jerrycans' },
      { t: '4. CNC Tool Room', d: 'In-House VMC, EDM, P20 Dies' },
    ];
    const pColW = (CONTENT_W - 32) / 4;
    pillarCols.forEach((p, idx) => {
      const px = MARGIN + 16 + idx * pColW;
      doc.font('Helvetica-Bold').fontSize(8.5).fillColor(COLORS.white);
      doc.text(p.t, px, divY + 30, { width: pColW - 10 });
      doc.font('Helvetica').fontSize(7).fillColor('#94a3b8');
      doc.text(p.d, px, divY + 44, { width: pColW - 10 });
    });

    // Bottom Footer Bar on Cover
    const coverFootY = 745;
    doc.rect(0, coverFootY, PAGE_W, PAGE_H - coverFootY).fill('#040d18');
    doc.rect(0, coverFootY, PAGE_W, 1.5).fill(COLORS.accent);

    doc.font('Helvetica-Bold').fontSize(9).fillColor(COLORS.white);
    doc.text('PRIMARY INTEGRATED CAMPUS: DAMAN, U.T., INDIA  |  CORPORATE: MUMBAI', MARGIN, coverFootY + 18);

    doc.font('Helvetica').fontSize(8).fillColor('#cbd5e1');
    doc.text('Direct OEM Hotline: +91 93273 45295 / +91 99254 39405  |  info@sheetalelectrotech.com', MARGIN, coverFootY + 34);

    doc.font('Helvetica-Bold').fontSize(8).fillColor(COLORS.accent);
    doc.text('www.sheetalelectrotech.com', PAGE_W - MARGIN - 130, coverFootY + 34, { width: 130, align: 'right' });
  }

  // =========================================================================
  // PAGE 2: CORPORATE OVERVIEW & 9 IN-HOUSE CAPABILITIES
  // =========================================================================
  function renderPage2() {
    doc.addPage();
    drawRunningHeader('Company Overview & Infrastructure', 2);

    drawPageSectionTitle(
      'Turnkey Manufacturing',
      'The Sheetal Advantage: Single-Roof Manufacturing',
      'With over 25+ years of engineering excellence, Sheetal Electrotech brings raw polymer compounding, automated electronic PCB assembly, die tooling, and finished goods testing under a single coordinated manufacturing campus in Daman.'
    );

    // 4 Key Value Pillars Box
    const pillarY = 135;
    const boxW = (CONTENT_W - 18) / 3;
    const valueBoxes = [
      {
        t: 'Direct Factory Pricing',
        d: 'Eliminates 3 to 4 layers of subcontractor markup by executing moulding, electronics and assembly in-house.',
        metric: 'Zero Middlemen'
      },
      {
        t: 'Strict IP & Tool Protection',
        d: 'Enforced NDA contracts, dedicated client tool ownership, and secured digital CAD vaults protect designs.',
        metric: '100% Client Ownership'
      },
      {
        t: 'In-House Tool Room Agility',
        d: 'On-site CNC VMC and wire-cut EDM allow tool maintenance and cavity alterations in days, not weeks.',
        metric: '±0.01mm Tolerance'
      }
    ];

    valueBoxes.forEach((vb, idx) => {
      const bx = MARGIN + idx * (boxW + 9);
      doc.roundedRect(bx, pillarY, boxW, 85, 4).fill(COLORS.lightGray);
      doc.roundedRect(bx, pillarY, boxW, 85, 4).lineWidth(0.8).strokeColor(COLORS.border).stroke();

      // Top colored accent bar
      doc.roundedRect(bx, pillarY, boxW, 4, 2).fill(idx === 1 ? COLORS.accent : COLORS.navy);

      doc.font('Helvetica-Bold').fontSize(10).fillColor(COLORS.navy);
      doc.text(vb.t, bx + 10, pillarY + 12, { width: boxW - 20 });

      doc.font('Helvetica').fontSize(8).fillColor(COLORS.steel);
      doc.text(vb.d, bx + 10, pillarY + 28, { width: boxW - 20, lineGap: 1.5 });

      doc.font('Helvetica-Bold').fontSize(7.5).fillColor(COLORS.accent);
      doc.text(`✓  ${vb.metric}`, bx + 10, pillarY + 68);
    });

    // 9 Capabilities Master Table
    const tableY = 236;
    doc.font('Helvetica-Bold').fontSize(12).fillColor(COLORS.navy);
    doc.text('9 Verified In-House Manufacturing Capabilities', MARGIN, tableY);

    const capabilitiesData = [
      ['01', 'Injection Moulding', 'High-tonnage injection machines (up to 250T)', 'Housings, diffusers, bobbins, engineering plastics (PP, PC, ABS)'],
      ['02', 'SMT Electronics', 'Automated high-speed pick-&-place, nitrogen reflow, AOI', 'Driver boards, linear batten MCPCBs, smart IoT modules'],
      ['03', 'Precision Tool Room', 'CNC Vertical Machining Centers, wire-cut EDM, spark erosion', 'Multi-cavity injection dies, extrusion calibration tooling'],
      ['04', 'Continuous Extrusion', 'High-precision profile extrusion lines with cooling tanks', 'LED batten diffusers, optical profiles, formed tubes'],
      ['05', 'Hollow Blow Moulding', 'Continuous extrusion blow moulding with parison wall calibration', 'Pharmaceutical bottles, chemical jerrycans (50ml to 5L)'],
      ['06', 'Conveyor Assembly', 'Sequential balanced flow lines with ultrasonic welding', 'Turnkey assembled luminaires, blister-packed electricals'],
      ['07', 'Burn-In Aging Carousel', 'Cyclic on/off continuous voltage stress testing conveyors', '100% infant mortality screening before boxing'],
      ['08', 'Through-Hole Insertion', 'Manual ESD-protected insertion stations with wave soldering', 'Radial/axial capacitors, inductors, heavy transformers'],
      ['09', 'Photometric & BIS Lab', 'Integrating sphere, spectroradiometer, 6KV surge generator', 'Optical efficacy (>100 lm/W), thermal mapping, BIS compliance'],
    ];

    // Table Header
    const thY = tableY + 18;
    doc.rect(MARGIN, thY, CONTENT_W, 20).fill(COLORS.navy);
    doc.font('Helvetica-Bold').fontSize(8).fillColor(COLORS.white);
    doc.text('#', MARGIN + 6, thY + 6);
    doc.text('CAPABILITY', MARGIN + 28, thY + 6);
    doc.text('EQUIPMENT & INFRASTRUCTURE', MARGIN + 145, thY + 6);
    doc.text('APPLICATIONS & OUTPUT', MARGIN + 335, thY + 6);

    let rowY = thY + 20;
    capabilitiesData.forEach((row, idx) => {
      const isZebra = idx % 2 === 1;
      const rowH = 26;
      if (isZebra) {
        doc.rect(MARGIN, rowY, CONTENT_W, rowH).fill(COLORS.lightGray);
      }
      doc.rect(MARGIN, rowY, CONTENT_W, rowH).lineWidth(0.5).strokeColor(COLORS.border).stroke();

      doc.font('Helvetica-Bold').fontSize(7.5).fillColor(COLORS.accent);
      doc.text(row[0], MARGIN + 6, rowY + 8);

      doc.font('Helvetica-Bold').fontSize(8).fillColor(COLORS.ink);
      doc.text(row[1], MARGIN + 28, rowY + 8, { width: 110 });

      doc.font('Helvetica').fontSize(7.5).fillColor(COLORS.slateDark);
      doc.text(row[2], MARGIN + 145, rowY + 5, { width: 180, lineGap: 1 });

      doc.font('Helvetica').fontSize(7.5).fillColor(COLORS.steel);
      doc.text(row[3], MARGIN + 335, rowY + 5, { width: 180, lineGap: 1 });

      rowY += rowH;
    });

    // 5-Stage OEM Workflow Roadmap
    const wfY = rowY + 18;
    doc.font('Helvetica-Bold').fontSize(11).fillColor(COLORS.navy);
    doc.text('Turnkey OEM Execution Roadmap (From Blueprint to Bulk Delivery)', MARGIN, wfY);

    const stages = [
      { step: 'STAGE 1', title: 'CAD & BOM Review', dur: '24-48 Hours', desc: 'DFM feasibility & costing' },
      { step: 'STAGE 2', title: 'Tooling & Prototype', dur: '7-15 Days', desc: 'In-house CNC & SLA samples' },
      { step: 'STAGE 3', title: 'Pilot & BIS Testing', dur: 'Photometry OK', desc: 'Dark room & surge validation' },
      { step: 'STAGE 4', title: 'Automated SMT', dur: 'Scalable Shifts', desc: 'Pick-&-place & wave soldering' },
      { step: 'STAGE 5', title: '100% Aging & Dispatch', dur: 'Zero Defect', desc: 'Conveyor burn-in & drop test' },
    ];

    const stgW = (CONTENT_W - 16) / 5;
    stages.forEach((stg, idx) => {
      const sx = MARGIN + idx * (stgW + 4);
      const sy = wfY + 16;
      doc.roundedRect(sx, sy, stgW, 68, 3).fill(idx === 4 ? '#fef3c7' : COLORS.cardBg);
      doc.roundedRect(sx, sy, stgW, 68, 3).lineWidth(0.8).strokeColor(idx === 4 ? '#f59e0b' : COLORS.border).stroke();

      doc.font('Helvetica-Bold').fontSize(7).fillColor(COLORS.accent);
      doc.text(stg.step, sx + 6, sy + 6);

      doc.font('Helvetica-Bold').fontSize(8).fillColor(COLORS.navy);
      doc.text(stg.title, sx + 6, sy + 18, { width: stgW - 12 });

      doc.font('Helvetica').fontSize(7).fillColor(COLORS.steel);
      doc.text(stg.desc, sx + 6, sy + 38, { width: stgW - 12 });

      doc.font('Helvetica-Bold').fontSize(6.5).fillColor(idx === 4 ? '#b45309' : COLORS.cyan);
      doc.text(stg.dur, sx + 6, sy + 54);
    });

    drawRunningFooter(2);
  }

  // =========================================================================
  // PAGE 3: LED LIGHTING — BULBS & RETROFIT LAMPS
  // =========================================================================
  function renderPage3() {
    doc.addPage();
    drawRunningHeader('LED Lighting Division — Bulbs & Lamps', 3);

    drawPageSectionTitle(
      'Lighting Products Portfolio',
      'LED Bulbs & High-Lumen Retrofit Lamps',
      'Engineered with high-power isolated constant current drivers, high-purity aluminium heatsinks, and optical polycarbonate diffusers for superior thermal longevity and >100 lm/W luminous efficacy.'
    );

    // 4 Product Cards (2 x 2 Layout)
    const cardGridY = 135;
    const cardW = (CONTENT_W - 14) / 2;
    const cardH = 145;

    const bulbProducts = [
      {
        title: 'Standard A-Type LED Bulb',
        watts: '3W, 5W, 7W, 9W, 12W, 15W, 18W',
        img: 'public/images/led-bulb.png',
        features: [
          'Efficacy: >100 Lumens / Watt',
          'Base Cap: B22d / E27 Nickel Plated',
          'Driver: High-Surge 4KV Isolated Driver',
          'CCT: 3000K / 4000K / 6500K & 3CCT',
          'Power Factor: >0.90, THD <15%'
        ],
        specHighlight: 'BIS CRS Certified • 25,000h Life'
      },
      {
        title: 'High-Power Commercial Hammer / T-Bulb',
        watts: '15W, 18W, 24W, 30W, 36W, 40W, 50W',
        img: 'public/images/products/led-high-power-bulb.png',
        features: [
          'High Output: Up to 5,250 Lumens',
          'CCT Spectrum: 3000K / 4000K / 6500K',
          'Wide Beam: 180°-220° Glare-Free Spread',
          'Surge Protection: 4KV / 440V Cutoff',
          'Application: Warehouses, Commercial Retail'
        ],
        specHighlight: 'Heavy-Duty Thermal Housing'
      },
      {
        title: 'Inverter Emergency AC/DC Bulb',
        watts: '9W & 12W Emergency Modes',
        img: 'public/images/products/led-emergency-bulb.png',
        features: [
          'Backup: Up to 4 Hours Battery Backup',
          'Battery: High-Grade 2200mAh Li-ion',
          'Auto-Switch: Instant switchover on power cut',
          'Overcharge & Deep Discharge Protection',
          'Fast Recharging: 6-8 Hours Full Charge'
        ],
        specHighlight: 'Dual AC/DC Sensing Circuit'
      },
      {
        title: 'Smart IoT WiFi / BLE Tunable Bulb',
        watts: '9W & 12W RGB + Tunable White',
        img: 'public/images/smart-bulb.png',
        features: [
          'Control: WiFi 2.4GHz + BLE Mesh',
          'Palette: 16 Million RGB Colors',
          'Tunable CCT: 2700K to 6500K Smooth Dimming',
          'Ecosystem: Tuya, Smart Life, Alexa, Google',
          'Schedules, Music Sync & Group Controls'
        ],
        specHighlight: 'BIS Certified IoT Module'
      }
    ];

    bulbProducts.forEach((prod, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const cx = MARGIN + col * (cardW + 14);
      const cy = cardGridY + row * (cardH + 12);

      // Card outer
      doc.roundedRect(cx, cy, cardW, cardH, 4).fill(COLORS.lightGray);
      doc.roundedRect(cx, cy, cardW, cardH, 4).lineWidth(0.8).strokeColor(COLORS.border).stroke();

      // Top Header inside card
      doc.rect(cx, cy, cardW, 28).fill(COLORS.navy);
      doc.font('Helvetica-Bold').fontSize(9.5).fillColor(COLORS.white);
      doc.text(prod.title, cx + 10, cy + 8, { width: cardW - 20 });

      // Product Image
      const imgPath = getSafeImage(prod.img) || getSafeImage('public/images/led-bulb.png');
      if (imgPath) {
        doc.roundedRect(cx + 8, cy + 36, 68, 68, 3).fill(COLORS.white);
        doc.roundedRect(cx + 8, cy + 36, 68, 68, 3).lineWidth(0.5).strokeColor(COLORS.border).stroke();
        doc.image(imgPath, cx + 12, cy + 40, { width: 60, height: 60, fit: [60, 60], align: 'center', valign: 'center' });
      }

      // Wattage Tag
      doc.roundedRect(cx + 82, cy + 34, cardW - 90, 15, 2).fill(COLORS.cyanLight);
      doc.font('Helvetica-Bold').fontSize(7.5).fillColor(COLORS.cyan);
      doc.text(prod.watts, cx + 86, cy + 38);

      // Bullet Features
      let featY = cy + 54;
      doc.font('Helvetica').fontSize(7).fillColor(COLORS.slateDark);
      prod.features.slice(0, 4).forEach((feat) => {
        doc.text(`• ${feat}`, cx + 82, featY, { width: cardW - 90, lineGap: 0.5 });
        featY += 13;
      });

      // Bottom Spec Tag
      doc.roundedRect(cx + 8, cy + cardH - 22, cardW - 16, 15, 2).fill('#e2e8f0');
      doc.font('Helvetica-Bold').fontSize(7).fillColor(COLORS.accent);
      doc.text(prod.specHighlight, cx + 14, cy + cardH - 18);
    });

    // Technical Specification Table at Bottom
    const specTableY = cardGridY + (cardH * 2) + 22;
    doc.font('Helvetica-Bold').fontSize(10.5).fillColor(COLORS.navy);
    doc.text('Detailed Technical & Photometric Specifications', MARGIN, specTableY);

    const bulbTable = [
      ['SE-BLB-05W', '5W', 'B22 / E27', '>500 lm', '220-240V', '>0.90', '<15%', '4 KV', '100 pcs'],
      ['SE-BLB-09W', '9W', 'B22 / E27', '>900 lm', '220-240V', '>0.95', '<12%', '4 KV', '100 pcs'],
      ['SE-BLB-12W', '12W', 'B22 / E27', '>1200 lm', '220-240V', '>0.95', '<12%', '4 KV', '50 pcs'],
      ['SE-BLB-15W', '15W', 'B22 / E27', '>1500 lm', '220-240V', '>0.95', '<12%', '4 KV', '50 pcs'],
      ['SE-BLB-18W', '18W', 'B22 / E27', '>1800 lm', '220-240V', '>0.95', '<10%', '4 KV', '50 pcs'],
      ['SE-BLB-24W-T', '24W', 'B22 / E27', '>2400 lm', '140-300V', '>0.95', '<10%', '4 KV', '30 pcs'],
      ['SE-BLB-30W-H', '30W', 'B22 / E27', '>3000 lm', '140-300V', '>0.95', '<10%', '4 KV', '20 pcs'],
      ['SE-BLB-40W-H', '40W', 'B22 / E27', '>4000 lm', '140-300V', '>0.95', '<10%', '4 KV', '16 pcs'],
      ['SE-BLB-50W-H', '50W', 'B22 / E27', '>5000 lm', '140-300V', '>0.95', '<10%', '4 KV', '12 pcs'],
      ['SE-EMG-09W', '9W AC / 3W DC', 'B22', '>900 lm', '140-280V', '>0.90', '<15%', '4 KV', '50 pcs'],
    ];

    const bthY = specTableY + 15;
    doc.rect(MARGIN, bthY, CONTENT_W, 16).fill(COLORS.navy);
    doc.font('Helvetica-Bold').fontSize(6.8).fillColor(COLORS.white);
    const bCols = [
      { l: 'MODEL NO', x: MARGIN + 6 },
      { l: 'POWER', x: MARGIN + 70 },
      { l: 'BASE', x: MARGIN + 120 },
      { l: 'LUMENS', x: MARGIN + 175 },
      { l: 'VOLTAGE', x: MARGIN + 230 },
      { l: 'PF', x: MARGIN + 295 },
      { l: 'THD', x: MARGIN + 340 },
      { l: 'SURGE', x: MARGIN + 385 },
      { l: 'CARTON', x: MARGIN + 440 },
    ];
    bCols.forEach(c => doc.text(c.l, c.x, bthY + 4.5));

    let browY = bthY + 16;
    bulbTable.forEach((row, idx) => {
      const isZebra = idx % 2 === 1;
      const rh = 14.5;
      if (isZebra) doc.rect(MARGIN, browY, CONTENT_W, rh).fill(COLORS.lightGray);
      doc.rect(MARGIN, browY, CONTENT_W, rh).lineWidth(0.5).strokeColor(COLORS.border).stroke();

      doc.font('Helvetica-Bold').fontSize(6.8).fillColor(COLORS.ink);
      doc.text(row[0], MARGIN + 6, browY + 3.5);

      doc.font('Helvetica').fontSize(6.8).fillColor(COLORS.slateDark);
      doc.text(row[1], MARGIN + 70, browY + 3.5);
      doc.text(row[2], MARGIN + 120, browY + 3.5);
      doc.text(row[3], MARGIN + 175, browY + 3.5);
      doc.text(row[4], MARGIN + 230, browY + 3.5);
      doc.text(row[5], MARGIN + 295, browY + 3.5);
      doc.text(row[6], MARGIN + 340, browY + 3.5);
      doc.text(row[7], MARGIN + 385, browY + 3.5);
      doc.text(row[8], MARGIN + 440, browY + 3.5);

      browY += rh;
    });

    // CCT Spectrum Note below table
    doc.font('Helvetica-Bold').fontSize(6.5).fillColor(COLORS.accent);
    doc.text('* CCT Spectrum Available:', MARGIN, browY + 5);
    doc.font('Helvetica').fontSize(6.5).fillColor(COLORS.slateDark);
    doc.text('3000K (Warm White), 4000K (Natural / Neutral White), 6500K (Cool Daylight) & 3CCT Tunable Driver across all models.', MARGIN + 95, browY + 5);

    drawRunningFooter(3);
  }

  // =========================================================================
  // PAGE 4: LED LIGHTING — BATTENS & LINEAR FIXTURES
  // =========================================================================
  function renderPage4() {
    doc.addPage();
    drawRunningHeader('LED Lighting Division — Battens & Linear Fixtures', 4);

    drawPageSectionTitle(
      'Linear Illumination Portfolio',
      'LED Battens & Continuous Profile Systems',
      'Manufactured using continuous in-line optical polycarbonate extrusion dies and automated pick-and-place linear MCPCB lines. Features anti-yellowing UV diffusers and high-voltage sustained surge immunity.'
    );

    // 3 Batten Showcase Cards
    const battenCards = [
      {
        title: 'Slim Polycarbonate Batten (PC Series)',
        rating: '18W, 20W, 24W  |  Length: 4 Feet (1200 mm)',
        img: 'public/images/led-batten.png',
        desc: 'Sleek, lightweight all-polycarbonate co-extruded batten for domestic, commercial retail, and office corridors. Zero shadows and seamless end-to-end illumination.',
        points: [
          'High luminous efficacy: >100 lm/W',
          'Wide voltage operation: 140V to 300V AC',
          'Surge protection: 4KV sustained',
          'Easy snap-fit mounting bracket system',
          'UV-resistant anti-yellowing PC diffuser'
        ]
      },
      {
        title: 'Aluminium Heat Sink Batten (ALU Heavy Series)',
        rating: '28W, 36W, 40W  |  Length: 4 Feet (1200 mm)',
        img: 'public/images/products/led-high-power-batten.png',
        desc: 'Industrial-grade batten designed with heavy aircraft-grade 6063 aluminium extrusion back-channel for rapid thermal dissipation in high-ambient factories and warehouses.',
        points: [
          'Output: Up to 4,000 Lumens heavy throw',
          'Heavy aluminium channel for extended LED life',
          'High power factor: >0.98, THD <10%',
          'Class-A isolated constant current driver',
          'Suitability: Textile units, workshops, basements'
        ]
      },
      {
        title: 'Compact 1Ft / 2Ft Utility Battens',
        rating: '5W (1 Foot) & 10W (2 Feet)',
        img: 'public/images/led-batten.png',
        desc: 'Compact linear fittings engineered for cove lighting, wardrobe under-cabinet illumination, stairwells, and compact utility areas.',
        points: [
          'Compact cross-section for concealed cove pockets',
          'Available in Warm White (3000K), Neutral (4000K) & Day Light (6500K)',
          'High color rendering index (CRI >85)',
          'Pre-wired with quick-connect terminal clips',
          'Low total harmonic distortion (THD <15%)'
        ]
      }
    ];

    let bCardY = 135;
    battenCards.forEach((bc) => {
      const bH = 125;
      doc.roundedRect(MARGIN, bCardY, CONTENT_W, bH, 4).fill(COLORS.lightGray);
      doc.roundedRect(MARGIN, bCardY, CONTENT_W, bH, 4).lineWidth(0.8).strokeColor(COLORS.border).stroke();

      // Left Accent Strip
      doc.roundedRect(MARGIN, bCardY, 5, bH, 2).fill(COLORS.accent);

      // Title & Rating
      doc.font('Helvetica-Bold').fontSize(11).fillColor(COLORS.navy);
      doc.text(bc.title, MARGIN + 16, bCardY + 12);

      doc.roundedRect(MARGIN + 16, bCardY + 28, 260, 14, 2).fill(COLORS.cyanLight);
      doc.font('Helvetica-Bold').fontSize(7.5).fillColor(COLORS.cyan);
      doc.text(bc.rating, MARGIN + 22, bCardY + 31);

      // Description
      doc.font('Helvetica').fontSize(8).fillColor(COLORS.slateDark);
      doc.text(bc.desc, MARGIN + 16, bCardY + 48, { width: 330, lineGap: 1.5 });

      // Bullet points in 2 columns
      let ptY = bCardY + 76;
      doc.font('Helvetica').fontSize(7.5).fillColor(COLORS.steel);
      bc.points.slice(0, 3).forEach((pt) => {
        doc.text(`✓ ${pt}`, MARGIN + 16, ptY);
        ptY += 14;
      });
      let ptY2 = bCardY + 76;
      bc.points.slice(3).forEach((pt) => {
        doc.text(`✓ ${pt}`, MARGIN + 180, ptY2);
        ptY2 += 14;
      });

      // Product Image on Right
      const bImg = getSafeImage(bc.img) || getSafeImage('public/images/led-batten.png');
      if (bImg) {
        doc.roundedRect(PAGE_W - MARGIN - 145, bCardY + 12, 135, bH - 24, 3).fill(COLORS.white);
        doc.roundedRect(PAGE_W - MARGIN - 145, bCardY + 12, 135, bH - 24, 3).lineWidth(0.5).strokeColor(COLORS.border).stroke();
        doc.image(bImg, PAGE_W - MARGIN - 140, bCardY + 16, { width: 125, height: bH - 32, fit: [125, bH - 32], align: 'center', valign: 'center' });
      }

      bCardY += bH + 12;
    });

    // Batten Technical Table
    const bTableY = bCardY + 10;
    doc.font('Helvetica-Bold').fontSize(11).fillColor(COLORS.navy);
    doc.text('Linear Batten Technical Specifications', MARGIN, bTableY);

    const battenTableData = [
      ['SE-BAT-05W-1F', '5 Watt', '1 Foot (300mm)', '>500 lm', 'Polycarbonate', '220-240V', '4 KV', '50 Pcs'],
      ['SE-BAT-10W-2F', '10 Watt', '2 Feet (600mm)', '>1,000 lm', 'Polycarbonate', '140-300V', '4 KV', '40 Pcs'],
      ['SE-BAT-18W-4F', '18 Watt', '4 Feet (1200mm)', '>1,800 lm', 'Slim PC Co-Extrusion', '140-300V', '4 KV', '25 Pcs'],
      ['SE-BAT-20W-4F', '20 Watt', '4 Feet (1200mm)', '>2,100 lm', 'Slim PC Co-Extrusion', '140-300V', '4 KV', '25 Pcs'],
      ['SE-BAT-24W-4F', '24 Watt', '4 Feet (1200mm)', '>2,500 lm', 'PC High-Lumen', '140-300V', '4 KV', '25 Pcs'],
      ['SE-BAT-36W-AL', '36 Watt', '4 Feet (1200mm)', '>3,800 lm', '6063 Aluminium Extrusion', '140-300V', '4 KV', '20 Pcs'],
    ];

    const btThY = bTableY + 16;
    doc.rect(MARGIN, btThY, CONTENT_W, 18).fill(COLORS.navy);
    doc.font('Helvetica-Bold').fontSize(7.5).fillColor(COLORS.white);
    const btCols = [
      { l: 'MODEL NO', x: MARGIN + 8 },
      { l: 'RATED WATT', x: MARGIN + 90 },
      { l: 'LENGTH', x: MARGIN + 155 },
      { l: 'LUMEN OUTPUT', x: MARGIN + 235 },
      { l: 'BODY HOUSING', x: MARGIN + 315 },
      { l: 'SURGE', x: MARGIN + 420 },
      { l: 'PACKING', x: MARGIN + 470 },
    ];
    btCols.forEach(c => doc.text(c.l, c.x, btThY + 5));

    let btRowY = btThY + 18;
    battenTableData.forEach((row, idx) => {
      const rh = 16;
      if (idx % 2 === 1) doc.rect(MARGIN, btRowY, CONTENT_W, rh).fill(COLORS.lightGray);
      doc.rect(MARGIN, btRowY, CONTENT_W, rh).lineWidth(0.5).strokeColor(COLORS.border).stroke();

      doc.font('Helvetica-Bold').fontSize(7).fillColor(COLORS.ink);
      doc.text(row[0], MARGIN + 8, btRowY + 4);

      doc.font('Helvetica').fontSize(7).fillColor(COLORS.slateDark);
      doc.text(row[1], MARGIN + 90, btRowY + 4);
      doc.text(row[2], MARGIN + 155, btRowY + 4);
      doc.text(row[3], MARGIN + 235, btRowY + 4);
      doc.text(row[4], MARGIN + 315, btRowY + 4);
      doc.text(row[5], MARGIN + 420, btRowY + 4);
      doc.text(row[6], MARGIN + 470, btRowY + 4);

      btRowY += rh;
    });

    drawRunningFooter(4);
  }

  // =========================================================================
  // PAGE 5: LED LIGHTING — DOWNLIGHTS, SPOTS & PANELS
  // =========================================================================
  function renderPage5() {
    doc.addPage();
    drawRunningHeader('LED Lighting Division — Downlights & Architectural', 5);

    drawPageSectionTitle(
      'Architectural Downlights',
      'Recessed Downlights, Spots & Surface Panels',
      'Engineered with micro-prismatic PMMA light guide diffusers, deep anti-glare reflectors (UGR <19), and thermal engineered aluminium/thermoplastic composite housings.'
    );

    const downlightCards = [
      {
        title: 'Slim Recessed Panel Downlight',
        sub: 'Round & Square  |  3W, 6W, 12W, 15W, 18W',
        img: 'public/images/down-light.png',
        desc: 'Ultra-thin 15mm low-profile luminaire with side-lit optics for modern false ceilings. Smooth glare-free light distribution.',
        specs: ['Cutout: 75mm to 200mm', 'Efficacy: >90 lm/W', 'Spring clip mount', 'BIS CRS Certified']
      },
      {
        title: 'Deep Anti-Glare Spotlight (COB)',
        sub: 'Deep Baffle  |  3W, 6W, 9W, 12W',
        img: 'public/images/products/led-spot-light.png',
        desc: 'Precision beam angles (24° / 36°) with dark reflector cup. Ideal for retail showrooms, art galleries, and accent ceilings.',
        specs: ['CRI >90 True Color', 'UGR <19 Glare Defense', 'Adjustable swivel head', '3000K / 4000K / 6500K']
      },
      {
        title: 'Surface Mounted Ceiling Downlight',
        sub: 'Direct Ceiling  |  6W, 12W, 18W, 24W',
        img: 'public/images/products/led-ceiling-light.png',
        desc: 'Surface-mount circular and square architectural luminaires for RCC ceilings without false ceiling provisions.',
        specs: ['Surface bracket plate', 'Zero cutout required', 'Powder-coated finish', 'High PF isolated driver']
      },
      {
        title: 'Decorative Ambient Ceiling Lights',
        sub: 'Edge Glow  |  6W, 12W, 18W',
        img: 'public/images/products/led-decorative-light.png',
        desc: 'Dual-color edge glow architectural downlights with multi-mode toggle switching for mood and functional lighting.',
        specs: ['Dual-color driver switch', 'Modern acrylic trim', 'Even light dissipation', 'Aesthetic interior look']
      }
    ];

    const dGridY = 135;
    const dCardW = (CONTENT_W - 14) / 2;
    const dCardH = 145;

    downlightCards.forEach((prod, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const cx = MARGIN + col * (dCardW + 14);
      const cy = dGridY + row * (dCardH + 12);

      doc.roundedRect(cx, cy, dCardW, dCardH, 4).fill(COLORS.lightGray);
      doc.roundedRect(cx, cy, dCardW, dCardH, 4).lineWidth(0.8).strokeColor(COLORS.border).stroke();

      // Top Header inside card
      doc.rect(cx, cy, dCardW, 28).fill(COLORS.navy);
      doc.font('Helvetica-Bold').fontSize(9.5).fillColor(COLORS.white);
      doc.text(prod.title, cx + 10, cy + 8, { width: dCardW - 20 });

      // Product Image
      const imgPath = getSafeImage(prod.img) || getSafeImage('public/images/down-light.png');
      if (imgPath) {
        doc.roundedRect(cx + 8, cy + 36, 68, 68, 3).fill(COLORS.white);
        doc.roundedRect(cx + 8, cy + 36, 68, 68, 3).lineWidth(0.5).strokeColor(COLORS.border).stroke();
        doc.image(imgPath, cx + 12, cy + 40, { width: 60, height: 60, fit: [60, 60], align: 'center', valign: 'center' });
      }

      // Rating Tag
      doc.roundedRect(cx + 82, cy + 34, dCardW - 90, 15, 2).fill(COLORS.cyanLight);
      doc.font('Helvetica-Bold').fontSize(7).fillColor(COLORS.cyan);
      doc.text(prod.sub, cx + 86, cy + 38);

      // Description & Specs
      doc.font('Helvetica').fontSize(7.5).fillColor(COLORS.slateDark);
      doc.text(prod.desc, cx + 82, cy + 53, { width: dCardW - 90, lineGap: 1 });

      let spY = cy + 96;
      doc.font('Helvetica').fontSize(7).fillColor(COLORS.steel);
      prod.specs.forEach((sp) => {
        doc.text(`✓ ${sp}`, cx + 82, spY);
        spY += 10.5;
      });
    });

    // Downlights Technical Specs Table
    const dnTableY = dGridY + (dCardH * 2) + 26;
    doc.font('Helvetica-Bold').fontSize(11).fillColor(COLORS.navy);
    doc.text('Architectural Downlights Engineering Specifications', MARGIN, dnTableY);

    const dnTableData = [
      ['SE-DL-03W', '3 Watt', 'Round / Square', '65 mm', '85 mm', '>270 lm', '220-240V', '50 Pcs'],
      ['SE-DL-06W', '6 Watt', 'Round / Square', '100 mm', '120 mm', '>540 lm', '140-280V', '40 Pcs'],
      ['SE-DL-12W', '12 Watt', 'Round / Square', '150 mm', '170 mm', '>1,100 lm', '140-280V', '30 Pcs'],
      ['SE-DL-15W', '15 Watt', 'Round / Square', '175 mm', '195 mm', '>1,400 lm', '140-280V', '20 Pcs'],
      ['SE-DL-18W', '18 Watt', 'Round / Square', '200 mm', '225 mm', '>1,700 lm', '140-280V', '20 Pcs'],
      ['SE-SPOT-06W', '6 Watt (COB)', 'Deep Baffle Round', '70 mm', '85 mm', '>550 lm (36°)', '140-280V', '40 Pcs'],
      ['SE-SRF-12W', '12W Surface', 'Surface Cylinder', 'N/A', '140 mm', '>1,100 lm', '140-280V', '30 Pcs'],
    ];

    const dthY = dnTableY + 16;
    doc.rect(MARGIN, dthY, CONTENT_W, 18).fill(COLORS.navy);
    doc.font('Helvetica-Bold').fontSize(7.5).fillColor(COLORS.white);
    const dCols = [
      { l: 'MODEL NO', x: MARGIN + 8 },
      { l: 'WATTAGE', x: MARGIN + 80 },
      { l: 'FORM FACTOR', x: MARGIN + 140 },
      { l: 'CUTOUT', x: MARGIN + 225 },
      { l: 'OUTER DIA', x: MARGIN + 285 },
      { l: 'LUMEN OUTPUT', x: MARGIN + 355 },
      { l: 'VOLTAGE', x: MARGIN + 435 },
      { l: 'PACKING', x: MARGIN + 485 },
    ];
    dCols.forEach(c => doc.text(c.l, c.x, dthY + 5));

    let dRowY = dthY + 18;
    dnTableData.forEach((row, idx) => {
      const rh = 16;
      if (idx % 2 === 1) doc.rect(MARGIN, dRowY, CONTENT_W, rh).fill(COLORS.lightGray);
      doc.rect(MARGIN, dRowY, CONTENT_W, rh).lineWidth(0.5).strokeColor(COLORS.border).stroke();

      doc.font('Helvetica-Bold').fontSize(7).fillColor(COLORS.ink);
      doc.text(row[0], MARGIN + 8, dRowY + 4);

      doc.font('Helvetica').fontSize(7).fillColor(COLORS.slateDark);
      doc.text(row[1], MARGIN + 80, dRowY + 4);
      doc.text(row[2], MARGIN + 140, dRowY + 4);
      doc.text(row[3], MARGIN + 225, dRowY + 4);
      doc.text(row[4], MARGIN + 285, dRowY + 4);
      doc.text(row[5], MARGIN + 355, dRowY + 4);
      doc.text(row[6], MARGIN + 435, dRowY + 4);
      doc.text(row[7], MARGIN + 485, dRowY + 4);

      dRowY += rh;
    });

    drawRunningFooter(5);
  }

  // =========================================================================
  // PAGE 6: OUTDOOR & INDUSTRIAL — STREET & FLOOD LIGHTS
  // =========================================================================
  function renderPage6() {
    doc.addPage();
    drawRunningHeader('Outdoor & Industrial Division — Street & Flood Lights', 6);

    drawPageSectionTitle(
      'Outdoor Lighting Infrastructure',
      'Heavy-Duty IP65 Street & High-Bay Flood Lights',
      'Built with high-pressure die-cast aluminium housings, toughened safety glass, secondary optical distribution lenses, and multi-stage 4KV / 6KV lightning surge protection.'
    );

    const outdoorCards = [
      {
        title: 'Heavy-Duty IP65 Street Light (Roadway Series)',
        rating: '30W, 50W, 70W, 100W, 120W  |  Die-Cast Aluminium',
        img: 'public/images/street_light.png',
        desc: 'Engineered for municipal roads, highways, industrial compounds, and gated townships. Features Type II/III polarized roadway beam optics for uniform illumination without dark zones.',
        specs: [
          'Efficacy: Up to 120 Lumens / Watt',
          'Ingress Protection: IP65 / IP66 Waterproof',
          'Surge Protection: 4KV / 6KV SPD Integrated',
          'Pole Entry: 40mm to 60mm Spigot Mount',
          'Corrosion Resistance: Salt Spray Tested 500h'
        ]
      },
      {
        title: 'IP65 High-Power Industrial Flood & Well Light',
        rating: '50W, 100W, 150W, 200W  |  Toughened Glass Front',
        img: 'public/images/flood-well.png',
        desc: 'High-intensity area lighting for building facades, billboards, sports arenas, parking complexes, and industrial yards. High-conductivity finned rear cooling sink.',
        specs: [
          'High throw beam: 90° & 120° Symmetric Optics',
          'Mounting: 180° Heavy Heavy Swivel Bracket',
          'Impact Resistance: IK08 Mechanical Strength',
          'Driver: Constant Current Isolated 4KV Surge',
          'Thermal: Safe operation up to 50°C ambient'
        ]
      }
    ];

    let outY = 135;
    outdoorCards.forEach((oc) => {
      const oH = 150;
      doc.roundedRect(MARGIN, outY, CONTENT_W, oH, 4).fill(COLORS.lightGray);
      doc.roundedRect(MARGIN, outY, CONTENT_W, oH, 4).lineWidth(0.8).strokeColor(COLORS.border).stroke();

      doc.roundedRect(MARGIN, outY, 5, oH, 2).fill(COLORS.accent);

      doc.font('Helvetica-Bold').fontSize(11).fillColor(COLORS.navy);
      doc.text(oc.title, MARGIN + 16, outY + 12);

      doc.roundedRect(MARGIN + 16, outY + 28, 290, 15, 2).fill(COLORS.cyanLight);
      doc.font('Helvetica-Bold').fontSize(7.5).fillColor(COLORS.cyan);
      doc.text(oc.rating, MARGIN + 22, outY + 32);

      doc.font('Helvetica').fontSize(8).fillColor(COLORS.slateDark);
      doc.text(oc.desc, MARGIN + 16, outY + 50, { width: 330, lineGap: 1.5 });

      let sY = outY + 86;
      doc.font('Helvetica').fontSize(7.5).fillColor(COLORS.steel);
      oc.specs.forEach((sp) => {
        doc.text(`✓ ${sp}`, MARGIN + 16, sY);
        sY += 12;
      });

      // Image
      const oImg = getSafeImage(oc.img) || getSafeImage('public/images/street_light.png');
      if (oImg) {
        doc.roundedRect(PAGE_W - MARGIN - 145, outY + 14, 135, oH - 28, 3).fill(COLORS.white);
        doc.roundedRect(PAGE_W - MARGIN - 145, outY + 14, 135, oH - 28, 3).lineWidth(0.5).strokeColor(COLORS.border).stroke();
        doc.image(oImg, PAGE_W - MARGIN - 140, outY + 18, { width: 125, height: oH - 36, fit: [125, oH - 36], align: 'center', valign: 'center' });
      }

      outY += oH + 14;
    });

    // Outdoor Technical Table
    const otTableY = outY + 10;
    doc.font('Helvetica-Bold').fontSize(11).fillColor(COLORS.navy);
    doc.text('Outdoor Luminaires Detailed Performance Matrix', MARGIN, otTableY);

    const otTableData = [
      ['SE-STR-030W', 'Street Light', '30 Watt', '>3,600 lm', 'IP65', '4 KV / 6 KV', '40 mm', '10 Pcs'],
      ['SE-STR-050W', 'Street Light', '50 Watt', '>6,000 lm', 'IP65', '4 KV / 6 KV', '45 mm', '8 Pcs'],
      ['SE-STR-070W', 'Street Light', '70 Watt', '>8,400 lm', 'IP65', '4 KV / 6 KV', '50 mm', '6 Pcs'],
      ['SE-STR-100W', 'Street Light', '100 Watt', '>12,000 lm', 'IP66', '6 KV / 10 KV', '50 mm', '4 Pcs'],
      ['SE-STR-120W', 'Street Light', '120 Watt', '>14,400 lm', 'IP66', '6 KV / 10 KV', '60 mm', '4 Pcs'],
      ['SE-FLD-050W', 'Flood Light', '50 Watt', '>5,500 lm', 'IP65', '4 KV', 'Bracket', '10 Pcs'],
      ['SE-FLD-100W', 'Flood Light', '100 Watt', '>11,000 lm', 'IP65', '4 KV / 6 KV', 'Bracket', '6 Pcs'],
    ];

    const otThY = otTableY + 16;
    doc.rect(MARGIN, otThY, CONTENT_W, 18).fill(COLORS.navy);
    doc.font('Helvetica-Bold').fontSize(7.5).fillColor(COLORS.white);
    const otCols = [
      { l: 'MODEL NO', x: MARGIN + 8 },
      { l: 'TYPE', x: MARGIN + 85 },
      { l: 'RATED WATT', x: MARGIN + 155 },
      { l: 'LUMEN OUTPUT', x: MARGIN + 225 },
      { l: 'IP RATING', x: MARGIN + 305 },
      { l: 'SURGE (SPD)', x: MARGIN + 365 },
      { l: 'MOUNTING', x: MARGIN + 435 },
      { l: 'PACKING', x: MARGIN + 485 },
    ];
    otCols.forEach(c => doc.text(c.l, c.x, otThY + 5));

    let otRowY = otThY + 18;
    otTableData.forEach((row, idx) => {
      const rh = 16;
      if (idx % 2 === 1) doc.rect(MARGIN, otRowY, CONTENT_W, rh).fill(COLORS.lightGray);
      doc.rect(MARGIN, otRowY, CONTENT_W, rh).lineWidth(0.5).strokeColor(COLORS.border).stroke();

      doc.font('Helvetica-Bold').fontSize(7).fillColor(COLORS.ink);
      doc.text(row[0], MARGIN + 8, otRowY + 4);

      doc.font('Helvetica').fontSize(7).fillColor(COLORS.slateDark);
      doc.text(row[1], MARGIN + 85, otRowY + 4);
      doc.text(row[2], MARGIN + 155, otRowY + 4);
      doc.text(row[3], MARGIN + 225, otRowY + 4);
      doc.text(row[4], MARGIN + 305, otRowY + 4);
      doc.text(row[5], MARGIN + 365, otRowY + 4);
      doc.text(row[6], MARGIN + 435, otRowY + 4);
      doc.text(row[7], MARGIN + 485, otRowY + 4);

      otRowY += rh;
    });

    drawRunningFooter(6);
  }

  // =========================================================================
  // PAGE 7: SMT ELECTRONICS & POWER ACCESSORIES
  // =========================================================================
  function renderPage7() {
    doc.addPage();
    drawRunningHeader('Electronics Division — SMT Lines & Driver Assembly', 7);

    drawPageSectionTitle(
      'Electronics & PCB Assembly',
      'Automated SMT Lines, LED Drivers & Power Strips',
      'Operating state-of-the-art automated Surface Mount Technology lines equipped with intelligent vision pick-and-place, multi-zone nitrogen reflow ovens, and Automated Optical Inspection (AOI).'
    );

    // Electronics 3 Cards
    const elecCards = [
      {
        title: 'Isolated Constant-Current LED Driver Modules',
        rating: '5W to 120W  |  High Surge 4KV & 440V Protection',
        img: 'public/images/smt_electronics.jpg',
        desc: 'Engineered specifically for harsh and erratic voltage fluctuations common in rural and industrial grid conditions across India. Tested to survive sustained 440V phase-to-phase faults.',
        features: [
          'Power Factor: >0.98 high efficiency',
          'Total Harmonic Distortion (THD): <10%',
          'Over-voltage, short-circuit, and thermal foldback',
          'Compact form factors custom-fitted to luminaire housings'
        ]
      },
      {
        title: 'High-Speed MCPCB Surface Mount Assembly',
        rating: 'Up to 25,000 Components / Hour Placement',
        img: 'public/images/smt_electronics.jpg',
        desc: 'Automated high-speed placement of high-efficiency SMD LED packages (2835, 3030, 5050) onto FR4 glass epoxy and aluminium metal-core circuit boards with micron precision.',
        features: [
          'High thermal conductivity aluminium MCPCBs (1.0W/mK - 2.0W/mK)',
          'Lead-free SAC305 automated solder stencil printing',
          'In-line 100% camera Automated Optical Inspection (AOI)',
          'Zero bridging, zero tombstoning solder joint integrity'
        ]
      },
      {
        title: 'Surge-Protected Multi-Socket Extension Boards',
        rating: '6A & 16A Heavy Duty  |  Master Switch & Indicator',
        img: 'public/images/products/extension-board.png',
        desc: 'Precision injection-moulded fire-retardant housings with heavy solid brass/copper busbars, master overload reset breaker, and child safety shutters.',
        features: [
          '3-Socket, 4-Socket, and 6-Socket configurations',
          'Heavy-duty 100% pure copper power cord (1.5m to 3.0m)',
          'MOV surge suppression for sensitive electronics & laptops',
          'In-house moulded flame-retardant virgin polycarbonate casing'
        ]
      }
    ];

    let eCardY = 135;
    elecCards.forEach((ec) => {
      const eH = 130;
      doc.roundedRect(MARGIN, eCardY, CONTENT_W, eH, 4).fill(COLORS.lightGray);
      doc.roundedRect(MARGIN, eCardY, CONTENT_W, eH, 4).lineWidth(0.8).strokeColor(COLORS.border).stroke();

      doc.roundedRect(MARGIN, eCardY, 5, eH, 2).fill(COLORS.accent);

      doc.font('Helvetica-Bold').fontSize(11).fillColor(COLORS.navy);
      doc.text(ec.title, MARGIN + 16, eCardY + 12);

      doc.roundedRect(MARGIN + 16, eCardY + 28, 280, 15, 2).fill(COLORS.cyanLight);
      doc.font('Helvetica-Bold').fontSize(7.5).fillColor(COLORS.cyan);
      doc.text(ec.rating, MARGIN + 22, eCardY + 32);

      doc.font('Helvetica').fontSize(8).fillColor(COLORS.slateDark);
      doc.text(ec.desc, MARGIN + 16, eCardY + 48, { width: 330, lineGap: 1.5 });

      let fY = eCardY + 84;
      doc.font('Helvetica').fontSize(7.5).fillColor(COLORS.steel);
      ec.features.forEach((f) => {
        doc.text(`✓ ${f}`, MARGIN + 16, fY);
        fY += 11;
      });

      // Image
      const eImg = getSafeImage(ec.img) || getSafeImage('public/images/smt_electronics.jpg');
      if (eImg) {
        doc.roundedRect(PAGE_W - MARGIN - 145, eCardY + 14, 135, eH - 28, 3).fill(COLORS.white);
        doc.roundedRect(PAGE_W - MARGIN - 145, eCardY + 14, 135, eH - 28, 3).lineWidth(0.5).strokeColor(COLORS.border).stroke();
        doc.image(eImg, PAGE_W - MARGIN - 140, eCardY + 18, { width: 125, height: eH - 36, fit: [125, eH - 36], align: 'center', valign: 'center' });
      }

      eCardY += eH + 12;
    });

    // Electronics Specs Table
    const eTableY = eCardY + 10;
    doc.font('Helvetica-Bold').fontSize(11).fillColor(COLORS.navy);
    doc.text('Driver Modules & Electrical Parameters', MARGIN, eTableY);

    const eTableData = [
      ['SE-DRV-09W', '9 Watt Bulb', '100-300V AC', '75-90V DC', '100 mA', '>0.95', '<12%', '4 KV'],
      ['SE-DRV-20W', '20 Watt Batten', '100-300V AC', '60-80V DC', '260 mA', '>0.98', '<10%', '4 KV'],
      ['SE-DRV-36W', '36 Watt Batten', '100-300V AC', '90-120V DC', '320 mA', '>0.98', '<10%', '4 KV'],
      ['SE-DRV-50W', '50W Street/Flood', '140-300V AC', '30-42V DC', '1400 mA', '>0.98', '<10%', '6 KV'],
      ['SE-EXT-4WAY', '4-Socket Board', '250V AC, 6A', 'N/A', 'Max 1500W', 'N/A', 'N/A', 'MOV Spike Suppr.'],
      ['SE-EXT-6WAY', '6-Socket Board', '250V AC, 10A', 'N/A', 'Max 2500W', 'N/A', 'N/A', 'Overload Breaker'],
    ];

    const etThY = eTableY + 16;
    doc.rect(MARGIN, etThY, CONTENT_W, 18).fill(COLORS.navy);
    doc.font('Helvetica-Bold').fontSize(7.5).fillColor(COLORS.white);
    const etCols = [
      { l: 'MODEL NO', x: MARGIN + 8 },
      { l: 'APPLICATION', x: MARGIN + 90 },
      { l: 'INPUT VOLTAGE', x: MARGIN + 170 },
      { l: 'OUTPUT VDC', x: MARGIN + 250 },
      { l: 'CURRENT', x: MARGIN + 320 },
      { l: 'PF', x: MARGIN + 380 },
      { l: 'THD', x: MARGIN + 420 },
      { l: 'PROTECTION', x: MARGIN + 460 },
    ];
    etCols.forEach(c => doc.text(c.l, c.x, etThY + 5));

    let etRowY = etThY + 18;
    eTableData.forEach((row, idx) => {
      const rh = 16;
      if (idx % 2 === 1) doc.rect(MARGIN, etRowY, CONTENT_W, rh).fill(COLORS.lightGray);
      doc.rect(MARGIN, etRowY, CONTENT_W, rh).lineWidth(0.5).strokeColor(COLORS.border).stroke();

      doc.font('Helvetica-Bold').fontSize(7).fillColor(COLORS.ink);
      doc.text(row[0], MARGIN + 8, etRowY + 4);

      doc.font('Helvetica').fontSize(7).fillColor(COLORS.slateDark);
      doc.text(row[1], MARGIN + 90, etRowY + 4);
      doc.text(row[2], MARGIN + 170, etRowY + 4);
      doc.text(row[3], MARGIN + 250, etRowY + 4);
      doc.text(row[4], MARGIN + 320, etRowY + 4);
      doc.text(row[5], MARGIN + 380, etRowY + 4);
      doc.text(row[6], MARGIN + 420, etRowY + 4);
      doc.text(row[7], MARGIN + 460, etRowY + 4);

      etRowY += rh;
    });

    drawRunningFooter(7);
  }

  // =========================================================================
  // PAGE 8: RIGID PLASTIC PACKAGING & CUSTOM MOULDING
  // =========================================================================
  function renderPage8() {
    doc.addPage();
    drawRunningHeader('Plastics Division — Rigid Packaging & Custom Moulding', 8);

    drawPageSectionTitle(
      'Plastics & Packaging Portfolio',
      'Blow Moulded Containers, Pharma Bottles & Jars',
      'Comprehensive plastic manufacturing capabilities covering Continuous Extrusion Blow Moulding (EBM), Injection Blow Moulding (IBM), and Injection Moulding for pharmaceuticals, cosmetics, FMCG, and chemicals.'
    );

    const packCards = [
      {
        title: 'Pharmaceutical Liquid Bottles & Dropper Vials',
        capacity: '50 ml to 500 ml  |  Pharma Grade HDPE / LDPE',
        img: 'public/images/jar_product.jpg',
        desc: 'Manufactured under clean hygienic conditions using virgin food and medical grade polymers. Precision neck calibration ensures 100% leak-tight seal with induction wads, tamper-evident caps, and dropper plugs.',
        features: [
          'High chemical resistance and dimensional uniformity',
          'Standard neck finishes: 20mm, 24/410, 28/410, 32mm',
          '100% in-line pressure decay leak testing',
          'Suitable for syrups, suspensions, and sanitizers'
        ]
      },
      {
        title: 'Industrial & Chemical Jerrycans / Containers',
        capacity: '1 Litre, 2 Litre, 5 Litres  |  High-ESCR HDPE',
        img: 'public/images/packaging_factory.jpg',
        desc: 'Heavy-duty industrial containers designed for agro-chemicals, lubricants, pesticides, and cleaning reagents. Multi-point parison wall thickness control ensures structural strength and drop-test survival.',
        features: [
          'UN-Drop test compliant heavy-wall construction',
          'Integrated ergonomic sturdy carrying handles',
          'Tamper-evident vented or induction-sealed closure options',
          'High environmental stress crack resistance (ESCR)'
        ]
      },
      {
        title: 'Cosmetics Cream Jars & FMCG Containers',
        capacity: '30g, 50g, 100g, 250g, 500g  |  PP / PET / SAN',
        img: 'public/images/jar_product.jpg',
        desc: 'Double-wall and single-wall luxury cosmetic jars with high-gloss mirror surface finish. Available with custom masterbatch pigments, screen printing, and hot foil stamping.',
        features: [
          'Precision threaded screw caps with EPE foam wads',
          'Aesthetic crystal-clear PET and high-gloss PP options',
          'Smooth radii corners and zero sink mark surfaces',
          'Wide-mouth easy dispensing geometry'
        ]
      }
    ];

    let pCardY = 135;
    packCards.forEach((pc) => {
      const pH = 130;
      doc.roundedRect(MARGIN, pCardY, CONTENT_W, pH, 4).fill(COLORS.lightGray);
      doc.roundedRect(MARGIN, pCardY, CONTENT_W, pH, 4).lineWidth(0.8).strokeColor(COLORS.border).stroke();

      doc.roundedRect(MARGIN, pCardY, 5, pH, 2).fill(COLORS.accent);

      doc.font('Helvetica-Bold').fontSize(11).fillColor(COLORS.navy);
      doc.text(pc.title, MARGIN + 16, pCardY + 12);

      doc.roundedRect(MARGIN + 16, pCardY + 28, 280, 15, 2).fill(COLORS.cyanLight);
      doc.font('Helvetica-Bold').fontSize(7.5).fillColor(COLORS.cyan);
      doc.text(pc.capacity, MARGIN + 22, pCardY + 32);

      doc.font('Helvetica').fontSize(8).fillColor(COLORS.slateDark);
      doc.text(pc.desc, MARGIN + 16, pCardY + 48, { width: 330, lineGap: 1.5 });

      let fY = pCardY + 84;
      doc.font('Helvetica').fontSize(7.5).fillColor(COLORS.steel);
      pc.features.forEach((f) => {
        doc.text(`✓ ${f}`, MARGIN + 16, fY);
        fY += 11;
      });

      // Image
      const pImg = getSafeImage(pc.img) || getSafeImage('public/images/jar_product.jpg');
      if (pImg) {
        doc.roundedRect(PAGE_W - MARGIN - 145, pCardY + 14, 135, pH - 28, 3).fill(COLORS.white);
        doc.roundedRect(PAGE_W - MARGIN - 145, pCardY + 14, 135, pH - 28, 3).lineWidth(0.5).strokeColor(COLORS.border).stroke();
        doc.image(pImg, PAGE_W - MARGIN - 140, pCardY + 18, { width: 125, height: pH - 36, fit: [125, pH - 36], align: 'center', valign: 'center' });
      }

      pCardY += pH + 12;
    });

    // Packaging Specs Table
    const pTableY = pCardY + 10;
    doc.font('Helvetica-Bold').fontSize(11).fillColor(COLORS.navy);
    doc.text('Packaging Specifications & Polymer Properties', MARGIN, pTableY);

    const pTableData = [
      ['SE-BTL-050', 'Round Pharma Bottle', '50 ml', 'HDPE / PET', '20 mm Tamper-Evident', 'Syrups, Chemicals', '500 Pcs'],
      ['SE-BTL-100', 'Round Pharma Bottle', '100 ml', 'HDPE / PET', '24/410 Neck', 'Liquids, Lotions', '400 Pcs'],
      ['SE-BTL-200', 'Oval Cosmetic Bottle', '200 ml', 'HDPE / PP', '24/410 Dispenser', 'Shampoo, Lotions', '250 Pcs'],
      ['SE-CAN-1000', 'Square Jerrycan', '1,000 ml (1L)', 'High-ESCR HDPE', '32mm Seal Cap', 'Oils, Reagents', '100 Pcs'],
      ['SE-CAN-5000', 'Heavy Jerrycan', '5,000 ml (5L)', 'High-ESCR HDPE', '42mm Vented Seal', 'Agro-Chemicals', '40 Pcs'],
      ['SE-JAR-100G', 'Double-Wall Cream Jar', '100 Grams', 'PP / SAN', 'Screw Cap + EPE Wad', 'Cosmetic Creams', '200 Pcs'],
    ];

    const ptThY = pTableY + 16;
    doc.rect(MARGIN, ptThY, CONTENT_W, 18).fill(COLORS.navy);
    doc.font('Helvetica-Bold').fontSize(7.5).fillColor(COLORS.white);
    const ptCols = [
      { l: 'MODEL NO', x: MARGIN + 8 },
      { l: 'CONTAINER TYPE', x: MARGIN + 85 },
      { l: 'CAPACITY', x: MARGIN + 180 },
      { l: 'POLYMERS', x: MARGIN + 250 },
      { l: 'NECK / CLOSURE', x: MARGIN + 320 },
      { l: 'TYPICAL USE', x: MARGIN + 420 },
      { l: 'MOQ', x: MARGIN + 480 },
    ];
    ptCols.forEach(c => doc.text(c.l, c.x, ptThY + 5));

    let ptRowY = ptThY + 18;
    pTableData.forEach((row, idx) => {
      const rh = 16;
      if (idx % 2 === 1) doc.rect(MARGIN, ptRowY, CONTENT_W, rh).fill(COLORS.lightGray);
      doc.rect(MARGIN, ptRowY, CONTENT_W, rh).lineWidth(0.5).strokeColor(COLORS.border).stroke();

      doc.font('Helvetica-Bold').fontSize(7).fillColor(COLORS.ink);
      doc.text(row[0], MARGIN + 8, ptRowY + 4);

      doc.font('Helvetica').fontSize(7).fillColor(COLORS.slateDark);
      doc.text(row[1], MARGIN + 85, ptRowY + 4);
      doc.text(row[2], MARGIN + 180, ptRowY + 4);
      doc.text(row[3], MARGIN + 250, ptRowY + 4);
      doc.text(row[4], MARGIN + 320, ptRowY + 4);
      doc.text(row[5], MARGIN + 420, ptRowY + 4);
      doc.text(row[6], MARGIN + 480, ptRowY + 4);

      ptRowY += rh;
    });

    drawRunningFooter(8);
  }

  // =========================================================================
  // PAGE 9: TOOL ROOM & TESTING INFRASTRUCTURE
  // =========================================================================
  function renderPage9() {
    doc.addPage();
    drawRunningHeader('Manufacturing Infrastructure — Tool Room & Quality Lab', 9);

    drawPageSectionTitle(
      'Advanced Tooling & Testing',
      'In-House Precision Tool Room & Photometric Testing Lab',
      'Maintaining complete sovereign control over tooling assets, mould modifications, and rigorous electrical, photometric, and environmental quality assurance inside our Daman complex.'
    );

    // Two Big Focus Sections: 1. Tool Room | 2. Testing Lab
    const secW = (CONTENT_W - 14) / 2;
    const secH = 260;
    const secY = 135;

    // LEFT BOX: IN-HOUSE TOOL ROOM
    doc.roundedRect(MARGIN, secY, secW, secH, 4).fill(COLORS.lightGray);
    doc.roundedRect(MARGIN, secY, secW, secH, 4).lineWidth(0.8).strokeColor(COLORS.border).stroke();
    doc.rect(MARGIN, secY, secW, 28).fill(COLORS.navy);
    doc.font('Helvetica-Bold').fontSize(10).fillColor(COLORS.white);
    doc.text('IN-HOUSE PRECISION TOOL ROOM', MARGIN + 10, secY + 8);

    const toolImg = getSafeImage('public/images/tool_room.jpg');
    if (toolImg) {
      doc.roundedRect(MARGIN + 10, secY + 36, secW - 20, 90, 3).fill(COLORS.white);
      doc.image(toolImg, MARGIN + 10, secY + 36, { width: secW - 20, height: 90, fit: [secW - 20, 90], align: 'center' });
    }

    let trY = secY + 134;
    doc.font('Helvetica-Bold').fontSize(8.5).fillColor(COLORS.navy);
    doc.text('Tooling Infrastructure & Capabilities:', MARGIN + 10, trY);

    const toolPoints = [
      'High-Speed CNC Vertical Machining Centers (VMC 3-Axis & 4-Axis)',
      'CNC Spark Erosion (Die Sinking) & Wire-Cut EDM detailing',
      'Hardened Tool Steels: P20, DIN 1.2316, H13 & Beryllium Copper',
      'Precision Machining Tolerance: ±0.01 mm repeatability',
      'Fast-track 7 to 15-day turnaround from 3D CAD to pilot sample',
      'Preventive ultrasonic tool cleaning & cavity polishing after runs'
    ];
    trY += 14;
    doc.font('Helvetica').fontSize(7.5).fillColor(COLORS.slateDark);
    toolPoints.forEach((tp) => {
      doc.text(`• ${tp}`, MARGIN + 10, trY, { width: secW - 20, lineGap: 1 });
      trY += 15;
    });

    // RIGHT BOX: PHOTOMETRIC & RELIABILITY LAB
    const rx = MARGIN + secW + 14;
    doc.roundedRect(rx, secY, secW, secH, 4).fill(COLORS.lightGray);
    doc.roundedRect(rx, secY, secW, secH, 4).lineWidth(0.8).strokeColor(COLORS.border).stroke();
    doc.rect(rx, secY, secW, 28).fill(COLORS.navy);
    doc.font('Helvetica-Bold').fontSize(10).fillColor(COLORS.white);
    doc.text('IN-HOUSE PHOTOMETRIC & TESTING LAB', rx + 10, secY + 8);

    const labImg = getSafeImage('public/images/testing_lab.jpg');
    if (labImg) {
      doc.roundedRect(rx + 10, secY + 36, secW - 20, 90, 3).fill(COLORS.white);
      doc.image(labImg, rx + 10, secY + 36, { width: secW - 20, height: 90, fit: [secW - 20, 90], align: 'center' });
    }

    let lbY = secY + 134;
    doc.font('Helvetica-Bold').fontSize(8.5).fillColor(COLORS.navy);
    doc.text('Optical, Surge & Reliability Testing:', rx + 10, lbY);

    const labPoints = [
      'Calibrated Integrating Sphere & Dark Room Spectroradiometer',
      'Spectral analysis, total lumen flux, CCT chromaticity & CRI mapping',
      '6KV Lightning Surge Simulation Generator (IEC 61000-4-5)',
      'High-voltage cyclic burn-in voltage stress conveyor line',
      'FLIR thermal imaging & multi-channel thermocouple temperature logs',
      'In-line pressure decay leak testing for blow-moulded packaging'
    ];
    lbY += 14;
    doc.font('Helvetica').fontSize(7.5).fillColor(COLORS.slateDark);
    labPoints.forEach((lp) => {
      doc.text(`• ${lp}`, rx + 10, lbY, { width: secW - 20, lineGap: 1 });
      lbY += 15;
    });

    // Quality Certifications Banner
    const certY = secY + secH + 20;
    doc.font('Helvetica-Bold').fontSize(11).fillColor(COLORS.navy);
    doc.text('Regulatory Certifications & Quality Accreditations', MARGIN, certY);

    const certBoxes = [
      { t: 'BIS CRS Certified', d: 'Compulsory Registration Scheme compliant for safety & energy ratings' },
      { t: 'ISO 9001:2015', d: 'Certified Quality Management System with complete lot traceability' },
      { t: 'ESD-Safe Cleanroom', d: 'Grounded workstation wrist straps, conductive flooring & static defense' },
      { t: 'Transit Drop Tested', d: 'Drop-tested master corrugated export packaging ensuring zero field damage' }
    ];

    const cBoxW = (CONTENT_W - 18) / 4;
    certBoxes.forEach((cb, idx) => {
      const cx = MARGIN + idx * (cBoxW + 6);
      const cy = certY + 16;
      doc.roundedRect(cx, cy, cBoxW, 70, 3).fill(COLORS.cardBg);
      doc.roundedRect(cx, cy, cBoxW, 70, 3).lineWidth(0.8).strokeColor(COLORS.border).stroke();

      doc.font('Helvetica-Bold').fontSize(8.5).fillColor(COLORS.accent);
      doc.text(cb.t, cx + 8, cy + 10, { width: cBoxW - 16 });

      doc.font('Helvetica').fontSize(7).fillColor(COLORS.slateDark);
      doc.text(cb.d, cx + 8, cy + 26, { width: cBoxW - 16, lineGap: 1.5 });
    });

    drawRunningFooter(9);
  }

  // =========================================================================
  // PAGE 10: OEM ENGAGEMENT FRAMEWORK & CONTACT DIRECTORY
  // =========================================================================
  function renderPage10() {
    doc.addPage();
    drawRunningHeader('OEM Engagement & Direct Contact Directory', 10);

    drawPageSectionTitle(
      'Partnership Framework',
      'Start Your OEM Project With Sheetal Electrotech',
      'We welcome brand principals, electrical distributors, product developers, and procurement directors to collaborate on customized turnkey manufacturing.'
    );

    // 5-Step Engagement Protocol
    const engY = 135;
    doc.roundedRect(MARGIN, engY, CONTENT_W, 110, 4).fill(COLORS.lightGray);
    doc.roundedRect(MARGIN, engY, CONTENT_W, 110, 4).lineWidth(0.8).strokeColor(COLORS.border).stroke();

    doc.rect(MARGIN, engY, CONTENT_W, 24).fill(COLORS.navy);
    doc.font('Helvetica-Bold').fontSize(9).fillColor(COLORS.white);
    doc.text('TURNKEY OEM PROCUREMENT & ENGAGEMENT PROTOCOL', MARGIN + 12, engY + 7);

    const steps = [
      { n: 'STEP 1', t: 'CAD / Spec Submission', d: 'Share 3D STEP, Gerber, or requirement brief under strict NDA' },
      { n: 'STEP 2', t: '24h DFM & Costing', d: 'Engineering review of moldability, driver topology, and volume pricing' },
      { n: 'STEP 3', t: 'Tooling & Prototyping', d: 'In-house CNC tool fabrication and functional SLA pilot samples' },
      { n: 'STEP 4', t: 'Lab & BIS Certification', d: 'Full photometric dark room characterization and sample sign-off' },
      { n: 'STEP 5', t: 'Mass SMT & Dispatch', d: 'Full-scale conveyor assembly, 100% burn-in aging, and freight dispatch' },
    ];

    const sColW = (CONTENT_W - 20) / 5;
    steps.forEach((st, idx) => {
      const sx = MARGIN + 8 + idx * (sColW + 2);
      const sy = engY + 34;

      doc.font('Helvetica-Bold').fontSize(7.5).fillColor(COLORS.accent);
      doc.text(st.n, sx, sy);

      doc.font('Helvetica-Bold').fontSize(8).fillColor(COLORS.navy);
      doc.text(st.t, sx, sy + 12, { width: sColW - 6 });

      doc.font('Helvetica').fontSize(7).fillColor(COLORS.steel);
      doc.text(st.d, sx, sy + 32, { width: sColW - 6, lineGap: 1 });
    });

    // Dual Facility Cards: Daman Plant vs Mumbai Corporate
    const facY = engY + 124;
    const fCardW = (CONTENT_W - 14) / 2;
    const fCardH = 175;

    // DAMAN PRIMARY COMPLEX
    doc.roundedRect(MARGIN, facY, fCardW, fCardH, 4).fill('#f8fafc');
    doc.roundedRect(MARGIN, facY, fCardW, fCardH, 4).lineWidth(1).strokeColor(COLORS.accent).stroke();
    doc.rect(MARGIN, facY, fCardW, 28).fill(COLORS.primaryDark);

    doc.font('Helvetica-Bold').fontSize(10).fillColor(COLORS.white);
    doc.text('DAMAN INTEGRATED COMPLEX (PRIMARY PLANT)', MARGIN + 12, facY + 8);

    doc.font('Helvetica-Bold').fontSize(8.5).fillColor(COLORS.accent);
    doc.text('30,000+ Sq. Ft. Manufacturing & Tooling Campus', MARGIN + 12, facY + 38);

    doc.font('Helvetica').fontSize(8).fillColor(COLORS.slateDark);
    doc.text(
      'Address: Survey No. / Plot C-1/1, 2, 3,\nGIDC Industrial Area,\nDaman - 396215, U.T., India\n\n' +
      'Key Facilities On-Site:\n' +
      '• SMT Cleanroom Lines & Wave Soldering\n' +
      '• High-Tonnage Plastic Injection Moulding\n' +
      '• Continuous Profile Extrusion Lines\n' +
      '• CNC Tool Room & Spark Erosion EDM\n' +
      '• Photometric Dark Room Integrating Sphere',
      MARGIN + 12,
      facY + 54,
      { width: fCardW - 24, lineGap: 1.5 }
    );

    // MUMBAI CORPORATE OFFICE
    const mx = MARGIN + fCardW + 14;
    doc.roundedRect(mx, facY, fCardW, fCardH, 4).fill('#f8fafc');
    doc.roundedRect(mx, facY, fCardW, fCardH, 4).lineWidth(1).strokeColor(COLORS.navy).stroke();
    doc.rect(mx, facY, fCardW, 28).fill(COLORS.navy);

    doc.font('Helvetica-Bold').fontSize(10).fillColor(COLORS.white);
    doc.text('MUMBAI CORPORATE HEADQUARTERS', mx + 12, facY + 8);

    doc.font('Helvetica-Bold').fontSize(8.5).fillColor(COLORS.cyan);
    doc.text('Corporate Affairs & Client Liaison Office', mx + 12, facY + 38);

    doc.font('Helvetica').fontSize(8).fillColor(COLORS.slateDark);
    doc.text(
      'Address: 204, Western Edge II,\nOff Western Express Highway,\nBehind Metro Station, Borivali / Goregaon (East),\nMumbai - 400066, Maharashtra, India\n\n' +
      'Logistics Connectivity:\n' +
      '• 18 km from Vapi Railway Junction\n' +
      '• Direct access to NH-48 Mumbai-Surat Corridor\n' +
      '• 160 km from Nhava Sheva (JNPT) Container Port\n' +
      '• Surat Airport: 125 km  |  Mumbai Airport: 165 km',
      mx + 12,
      facY + 54,
      { width: fCardW - 24, lineGap: 1.5 }
    );

    // Fast Contact Action Banner
    const ctaBoxY = facY + fCardH + 16;
    doc.roundedRect(MARGIN, ctaBoxY, CONTENT_W, 110, 4).fill(COLORS.primaryDark);

    doc.font('Helvetica-Bold').fontSize(14).fillColor(COLORS.white);
    doc.text('Direct Engineering Intake & RFQ Desk', MARGIN + 18, ctaBoxY + 16);

    doc.font('Helvetica').fontSize(8.5).fillColor('#94a3b8');
    doc.text(
      'Our senior engineering team reviews STEP, IGES, Gerber, and PDF specifications with a guaranteed 4-hour initial response SLA.',
      MARGIN + 18,
      ctaBoxY + 34,
      { width: CONTENT_W - 36, lineGap: 2 }
    );

    doc.roundedRect(MARGIN + 18, ctaBoxY + 62, 175, 30, 3).fill(COLORS.accent);
    doc.font('Helvetica-Bold').fontSize(9).fillColor(COLORS.white);
    doc.text('DIRECT PHONE HOTLINES:', MARGIN + 26, ctaBoxY + 68);
    doc.font('Helvetica-Bold').fontSize(10).fillColor(COLORS.white);
    doc.text('+91 93273 45295  /  +91 99254 39405', MARGIN + 26, ctaBoxY + 79);

    doc.roundedRect(MARGIN + 205, ctaBoxY + 62, 160, 30, 3).fill('#1e3a5f');
    doc.font('Helvetica-Bold').fontSize(8).fillColor('#38bdf8');
    doc.text('OFFICIAL TECHNICAL EMAIL:', MARGIN + 213, ctaBoxY + 68);
    doc.font('Helvetica-Bold').fontSize(9.5).fillColor(COLORS.white);
    doc.text('info@sheetalelectrotech.com', MARGIN + 213, ctaBoxY + 79);

    doc.roundedRect(MARGIN + 377, ctaBoxY + 62, 130, 30, 3).fill('#059669');
    doc.font('Helvetica-Bold').fontSize(8).fillColor(COLORS.white);
    doc.text('ONLINE CAD PORTAL:', MARGIN + 385, ctaBoxY + 68);
    doc.font('Helvetica-Bold').fontSize(8.5).fillColor(COLORS.white);
    doc.text('sheetalelectrotech.com/rfq', MARGIN + 385, ctaBoxY + 79);

    drawRunningFooter(10);
  }

  // Execute all pages
  renderPage1();
  renderPage2();
  renderPage3();
  renderPage4();
  renderPage5();
  renderPage6();
  renderPage7();
  renderPage8();
  renderPage9();
  renderPage10();

  doc.end();

  writeStream.on('finish', () => {
    const stats = fs.statSync(outputPath);
    console.log(`Master Catalogue PDF generated successfully! Size: ${(stats.size / 1024).toFixed(1)} KB at ${outputPath}`);
  });
}

buildCatalogue();
