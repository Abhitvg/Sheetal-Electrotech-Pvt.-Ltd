const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '../public/resources');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const outputPath = path.join(outputDir, 'sheetal-lighting-technical-specifications.csv');

// BOM for Excel UTF-8 compliance
const BOM = '\uFEFF';

const sections = [
  {
    title: 'SHEETAL ELECTROTECH PRIVATE LIMITED — MASTER LIGHTING SPECIFICATIONS (2026)',
    subtitle: 'OEM / ODM Manufacturing Division • Daman Industrial Zone • BIS CRS / CE / RoHS Certified',
    date: 'Generated: October 2026'
  },
  {
    sectionName: 'SECTION 1: LINEAR LED BATTEN LUMINAIRE SERIES (1 FT / 2 FT / 4 FT / 5 FT)',
    headers: ['S.No.', 'Model / Wattage', 'CCT Spectrum Available', 'Lumen Output', 'Efficacy', 'Beam Angle', 'Rated Operating Voltage & Frequency', 'Input Current', 'Power Factor (PF)', 'Surge Protection', 'Length / Profile', 'Housing Construction'],
    rows: [
      ['1', '5W / 6W Utility', '3000K / 4000K / 6500K / 7000K', '600 lm', '100 lm/W', '120°', '220-240V AC, 50Hz (100-300V Withstand)', '30 mA', '> 0.90', '4KV, 440VAC', '300 mm (1 Ft)', 'PC-PC Co-Extrusion'],
      ['2', '10W Utility', '3000K / 4000K / 6500K / 7000K', '1100 lm', '110 lm/W', '120°', '220-240V AC, 50Hz (100-300V Withstand)', '52 mA', '> 0.90', '4KV, 440VAC', '600 mm (2 Ft)', 'PC-PC Co-Extrusion'],
      ['3', '20W Compact', '3000K / 4000K / 6500K / 7000K', '2200 lm', '110 lm/W', '120°', '220-240V AC, 50Hz (100-300V Withstand)', '102 mA', '> 0.95', '4KV, 440VAC', '1100 mm (4 Ft)', 'PC-PC Co-Extrusion'],
      ['4', '20W Slim Profile', '3000K / 4000K / 6500K / 7000K', '2200 lm', '110 lm/W', '120°', '220-240V AC, 50Hz (100-300V Withstand)', '102 mA', '> 0.95', '4KV, 440VAC', '1135 mm (4 Ft)', 'PC-PC Co-Extrusion'],
      ['5', '20W High Lumen', '3000K / 4000K / 6500K / 7000K', '2200 lm', '110 lm/W', '120°', '220-240V AC, 50Hz (100-300V Withstand)', '102 mA', '> 0.95', '4KV, 440VAC', '1185 mm (4 Ft)', 'PC-PC Co-Extrusion'],
      ['6', '22W High-Efficiency', '3000K / 4000K / 6500K / 7000K', '2420 lm', '110 lm/W', '120°', '220-240V AC, 50Hz (100-300V Withstand)', '108 mA', '> 0.95', '4KV, 440VAC', '1185 mm (4 Ft)', 'PC-PC Co-Extrusion'],
      ['7', '24W Heavy Duty', '3000K / 4000K / 6500K / 7000K', '2640 lm', '110 lm/W', '120°', '220-240V AC, 50Hz (100-300V Withstand)', '115 mA', '> 0.95', '4KV, 440VAC', '1135 mm (4 Ft)', 'PC-PC Co-Extrusion'],
      ['8', '24W Pro Series', '3000K / 4000K / 6500K / 7000K', '2640 lm', '110 lm/W', '120°', '220-240V AC, 50Hz (100-300V Withstand)', '115 mA', '> 0.95', '4KV, 440VAC', '1185 mm (4 Ft)', 'PC-PC Co-Extrusion'],
      ['9', '28W Commercial', '3000K / 4000K / 6500K / 7000K', '3080 lm', '110 lm/W', '120°', '220-240V AC, 50Hz (100-300V Withstand)', '135 mA', '> 0.95', '4KV, 440VAC', '1185 mm (4 Ft)', '6063 Extruded Aluminium'],
      ['10', '36W Twin Output', '3000K / 4000K / 6500K / 7000K', '3960 lm', '110 lm/W', '120°', '220-240V AC, 50Hz (100-300V Withstand)', '168 mA', '> 0.95', '4KV, 440VAC', '1200 mm (4 Ft)', '6063 Extruded Aluminium'],
      ['11', '40W Commercial Bay', '3000K / 4000K / 6500K / 7000K', '4400 lm', '110 lm/W', '120°', '220-240V AC, 50Hz (100-300V Withstand)', '186 mA', '> 0.95', '4KV, 440VAC', '1200 mm (4 Ft)', '6063 Extruded Aluminium'],
      ['12', '50W Industrial High-Bay', '3000K / 4000K / 6500K / 7000K', '5500 lm', '110 lm/W', '120°', '220-240V AC, 50Hz (100-300V Withstand)', '232 mA', '> 0.95', '4KV, 440VAC', '1500 mm (5 Ft)', 'Heavy ALU Industrial Chassis'],
      ['13', '9W (T-Batten)', '3000K / 4000K / 6500K / 7000K', '990 lm', '110 lm/W', '300°', '220-240V AC, 50Hz (100-300V Withstand)', '45 mA', '> 0.90', '4KV, 440VAC', '604 mm (2 Ft)', 'Wide Spread Cylindrical Tube'],
      ['14', '20W (T-Batten)', '3000K / 4000K / 6500K / 7000K', '2200 lm', '110 lm/W', '300°', '220-240V AC, 50Hz (100-300V Withstand)', '102 mA', '> 0.95', '4KV, 440VAC', '1200 mm (4 Ft)', 'Wide Spread Cylindrical Tube'],
      ['15', '22W (T-Batten)', '3000K / 4000K / 6500K / 7000K', '2420 lm', '110 lm/W', '300°', '220-240V AC, 50Hz (100-300V Withstand)', '108 mA', '≥ 0.95', '4KV, 440VAC', '1200 mm (4 Ft)', 'Wide Spread Cylindrical Tube'],
      ['16', '36W (T-Batten)', '3000K / 4000K / 6500K / 7000K', '3960 lm', '110 lm/W', '300°', '220-240V AC, 50Hz (100-300V Withstand)', '168 mA', '≥ 0.95', '4KV, 440VAC', '1200 mm (4 Ft)', 'Wide Spread Cylindrical Tube'],
      ['17', '40W (T-Batten)', '3000K / 4000K / 6500K / 7000K', '4400 lm', '110 lm/W', '300°', '220-240V AC, 50Hz (100-300V Withstand)', '186 mA', '≥ 0.95', '4KV, 440VAC', '1200 mm (4 Ft)', 'Wide Spread Cylindrical Tube'],
      ['18', '50W (T-Batten)', '3000K / 4000K / 6500K / 7000K', '5500 lm', '110 lm/W', '300°', '220-240V AC, 50Hz (100-300V Withstand)', '232 mA', '≥ 0.95', '4KV, 440VAC', '1500 mm (5 Ft)', 'Wide Spread Cylindrical Tube'],
    ]
  },
  {
    sectionName: 'SECTION 2: STANDARD RETROFIT A-TYPE LED BULBS (B22 / E27)',
    headers: ['S.No.', 'Model / Wattage', 'CCT Spectrum Available', 'Luminous Flux', 'Efficacy', 'Beam Angle', 'Operating Voltage', 'Driver Surge', 'Power Factor (PF)', 'Base Cap', 'Outer Shell'],
    rows: [
      ['1', '3W Decorative Accent', '3000K / 4000K / 6500K', '300 lm', '100 lm/W', '220°', '140-300V AC', '4KV Isolated', '> 0.90', 'B22 / E27', 'Polycarbonate Housing'],
      ['2', '5W Residential', '3000K / 4000K / 6500K', '500 lm', '100 lm/W', '220°', '140-300V AC', '4KV Isolated', '> 0.90', 'B22 / E27', 'Polycarbonate Housing'],
      ['3', '7W Standard Home', '3000K / 4000K / 6500K', '700 lm', '100 lm/W', '220°', '140-300V AC', '4KV Isolated', '> 0.92', 'B22 / E27', 'Polycarbonate Housing'],
      ['4', '9W Best Seller', '3000K / 4000K / 6500K', '900 lm', '100 lm/W', '220°', '140-300V AC', '4KV Isolated', '> 0.95', 'B22 / E27', 'Thermal Plastic / Aluminium'],
      ['5', '12W High Brightness', '3000K / 4000K / 6500K', '1200 lm', '100 lm/W', '220°', '140-300V AC', '4KV Isolated', '> 0.95', 'B22 / E27', 'Thermal Plastic / Aluminium'],
      ['6', '15W Commercial Retrofit', '3000K / 4000K / 6500K', '1500 lm', '100 lm/W', '220°', '140-300V AC', '4KV Isolated', '> 0.95', 'B22 / E27', 'Aluminium Insert Core'],
      ['7', '18W High Output A-Type', '3000K / 4000K / 6500K', '1800 lm', '100 lm/W', '220°', '140-300V AC', '4KV Isolated', '> 0.95', 'B22 / E27', 'Aluminium Insert Core'],
    ]
  },
  {
    sectionName: 'SECTION 3: HIGH-POWER COMMERCIAL & INDUSTRIAL BULBS (T-BULB / HAMMER)',
    headers: ['S.No.', 'Model / Wattage', 'CCT Spectrum Available', 'Luminous Flux', 'Efficacy', 'Beam Angle', 'Operating Voltage', 'Driver Surge', 'Power Factor (PF)', 'Base Cap', 'Outer Shell'],
    rows: [
      ['1', '15W Commercial T-Bulb', '3000K / 4000K / 6500K', '1575 lm', '105 lm/W', '180°', '100-300V AC', '4KV / 440VAC Cutoff', '> 0.95', 'B22 / E27', 'Heavy Die-Cast Core'],
      ['2', '18W Commercial T-Bulb', '3000K / 4000K / 6500K', '1890 lm', '105 lm/W', '180°', '100-300V AC', '4KV / 440VAC Cutoff', '> 0.95', 'B22 / E27', 'Heavy Die-Cast Core'],
      ['3', '24W High Power Hammer', '3000K / 4000K / 6500K', '2520 lm', '105 lm/W', '180°', '100-300V AC', '4KV / 440VAC Cutoff', '> 0.95', 'B22 / E27', 'Heavy Die-Cast Core'],
      ['4', '30W High Power Hammer', '3000K / 4000K / 6500K', '3150 lm', '105 lm/W', '180°', '100-300V AC', '4KV / 440VAC Cutoff', '> 0.95', 'B22 / E27', 'Heavy Die-Cast Core'],
      ['5', '36W High Power Hammer', '3000K / 4000K / 6500K', '3780 lm', '105 lm/W', '180°', '100-300V AC', '4KV / 440VAC Cutoff', '> 0.95', 'B22 / E27', 'Heavy Die-Cast Core'],
      ['6', '40W High Bay Retrofit', '3000K / 4000K / 6500K', '4200 lm', '105 lm/W', '180°', '100-300V AC', '4KV / 440VAC Cutoff', '> 0.95', 'B22 / E27', 'Heavy Die-Cast Core'],
      ['7', '50W Industrial Heavy Bay', '3000K / 4000K / 6500K', '5250 lm', '105 lm/W', '180°', '100-300V AC', '4KV / 440VAC Cutoff', '> 0.95', 'B22 / E27', 'Heavy Die-Cast Core'],
    ]
  }
];

let lines = [];
lines.push(`"${sections[0].title}"`);
lines.push(`"${sections[0].subtitle}"`);
lines.push(`"${sections[0].date}"`);
lines.push('');

for (let s of sections.slice(1)) {
  lines.push(`"${s.sectionName}"`);
  lines.push(s.headers.map(h => `"${h.replace(/"/g, '""')}"`).join(','));
  for (let r of s.rows) {
    lines.push(r.map(c => `"${c.replace(/"/g, '""')}"`).join(','));
  }
  lines.push('');
}

const csvOutput = BOM + lines.join('\r\n');
fs.writeFileSync(outputPath, csvOutput, 'utf8');

console.log(`Master Specifications Spreadsheet generated successfully at ${outputPath} (${Buffer.byteLength(csvOutput)} bytes)`);
