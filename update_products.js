const fs = require('fs');
const file = 'src/app/[locale]/products/led-lighting/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const replacement = `const ledProducts = [
  {
    id: "led-batten",
    name: "Led Batten",
    range: "10W – 40W",
    image: "/images/legacy/10-3.webp",
    bg: "bg-[#3d4231]",
    description: "LED batten lights are an energy-efficient alternative to traditional fluorescent tube lights.",
    specs: [
      { label: "Wattage Range", value: "10W – 40W" },
      { label: "Length", value: "600mm / 1200mm / 1500mm" },
      { label: "Luminous Efficacy", value: "≥100 lm/W" },
      { label: "IP Rating", value: "IP20 / IP65" },
      { label: "Certification", value: "BIS, CE" },
    ],
  },
  {
    id: "high-power-led-batten",
    name: "High Power Led Batten",
    range: "30W – 60W",
    image: "/images/legacy/4-3.webp",
    bg: "bg-[#3d4231]",
    description: "High intensity LED battens for large indoor areas and industrial spaces, offering excellent durability.",
    specs: [
      { label: "Wattage Range", value: "30W – 60W" },
      { label: "Length", value: "1200mm / 1500mm" },
      { label: "Luminous Efficacy", value: "≥120 lm/W" },
      { label: "Housing", value: "Aluminum Extrusion" },
    ],
  },
  {
    id: "led-decorative-light",
    name: "Led Decorative Light",
    range: "Varies",
    image: "/images/legacy/11-jpg.webp",
    bg: "bg-white",
    description: "LED decorative lights are a type of LED lighting fixture that provide decorative and ambient lighting in various indoor settings.",
    specs: [
      { label: "Applications", value: "Hospitality, Residential" },
      { label: "Styles", value: "Pendant, Wall Sconce, Chandelier" },
    ],
  },
  {
    id: "led-strip-light",
    name: "Led Strip Light",
    range: "5m – 50m rolls",
    image: "/images/legacy/Photo11.webp",
    bg: "bg-white",
    description: "Flexible LED strip lights for cove lighting, architectural accents, and decorative applications.",
    specs: [
      { label: "LED Type", value: "SMD 2835 / 5050" },
      { label: "LED Density", value: "60/120/240 LEDs per meter" },
      { label: "Voltage", value: "12V DC / 24V DC / 220V AC" },
    ],
  },
  {
    id: "led-bulb",
    name: "Led Bulb",
    range: "3W – 15W",
    image: "/images/legacy/Photo13.webp",
    bg: "bg-[#717478]",
    description: "Standard LED bulbs with energy-efficient illumination for daily residential and commercial use.",
    specs: [
      { label: "Wattage Range", value: "3W, 5W, 7W, 9W, 12W, 15W" },
      { label: "Base Type", value: "B22 / E27" },
    ],
  },
  {
    id: "led-bulb-2",
    name: "Led Bulb 2",
    range: "5W – 18W",
    image: "/images/premium_led_bulb_1790620610882.jpg", 
    bg: "bg-[#433b2e]",
    description: "Premium LED bulbs offering higher lumens and a sleeker design for modern spaces.",
    specs: [
      { label: "Wattage Range", value: "5W – 18W" },
      { label: "Base Type", value: "B22 / E27" },
    ],
  },
  {
    id: "high-power-led-bulb",
    name: "High Power Led Bulb",
    range: "30W – 150W",
    image: "/images/legacy/po-jpg.webp",
    bg: "bg-[#3d4231]",
    description: "High-wattage LED bulbs designed for large spaces such as warehouses, industrial sheds, and high-ceiling environments.",
    specs: [
      { label: "Wattage Range", value: "30W, 40W, 50W, 80W, 100W, 150W" },
      { label: "Luminous Efficacy", value: "≥110 lm/W" },
      { label: "Base Type", value: "B22 / E27 / E40" },
    ],
  },
  {
    id: "led-emergency-bulb",
    name: "Led Emergency Bulb",
    range: "9W – 15W",
    image: "/images/legacy/Photo10.webp",
    bg: "bg-[#3d4231]",
    description: "Inverter LED bulbs with a built-in lithium-ion battery for backup lighting during grid outages.",
    specs: [
      { label: "Wattage", value: "9W, 12W, 15W" },
      { label: "Backup Time", value: "Up to 4 hours" },
    ],
  },
  {
    id: "led-candle-bulb",
    name: "Led Candle Bulb",
    range: "3W – 7W",
    image: "/images/legacy/3-3.webp",
    bg: "bg-[#717478]",
    description: "Elegant LED candle bulbs designed for chandeliers and decorative wall sconces.",
    specs: [
      { label: "Wattage Range", value: "3W, 5W, 7W" },
      { label: "Base Type", value: "E14 / E27 / B22" },
      { label: "Shape", value: "Candle, Flame tip" },
    ],
  },
  {
    id: "led-spot-g9",
    name: "Led Spot & G9 Bulb",
    range: "3W – 15W",
    image: "/images/legacy/9-3.webp",
    bg: "bg-[#3d4231]",
    description: "Compact Led Spot and G9 bulbs for directional and precise illumination in decorative fixtures.",
    specs: [
      { label: "Wattage Range", value: "3W – 15W" },
      { label: "Base Type", value: "G9 / GU10" },
    ],
  },
  {
    id: "led-street-light",
    name: "Led Street Light",
    range: "20W – 150W",
    image: "/images/legacy/1-3.webp",
    bg: "bg-[#3d4231]",
    description: "LED street lights provide high-quality illumination on public streets and highways.",
    specs: [
      { label: "Wattage Range", value: "20W - 150W" },
      { label: "IP Rating", value: "IP 66" },
      { label: "Surge Limit", value: "5KV" },
    ],
  },
  {
    id: "well-glass-flood",
    name: "Well Glass & Flood li.",
    range: "20W – 200W",
    image: "/images/legacy/9-2.webp",
    bg: "bg-[#3d4231]",
    description: "Outdoor lighting fixtures designed to illuminate large areas with high-intensity, directional light.",
    specs: [
      { label: "Wattage Range", value: "20W – 200W" },
      { label: "IP Rating", value: "IP65" },
    ],
  },
  {
    id: "extension-board",
    name: "Extension Board",
    range: "Various",
    image: "/images/legacy/exension-board-jpg.webp",
    bg: "bg-[#394234]",
    description: "High-quality, heavy-duty electrical extension boards with surge protection.",
    specs: [
      { label: "Sockets", value: "3 / 4 / 6 way universal" },
      { label: "Protection", value: "Overload & Surge protection" },
    ],
  },
  {
    id: "led-down-lighter",
    name: "Led Down Lighter",
    range: "6W – 24W",
    image: "/images/legacy/9-jpg.webp",
    bg: "bg-[#7a7c7b]",
    description: "Premium downlighter with copper interior finish for elegant architectural lighting.",
    specs: [
      { label: "Wattage Range", value: "6W – 24W" },
      { label: "Housing", value: "Die-cast Aluminum" },
    ],
  },
  {
    id: "led-down-lighter-2",
    name: "Led Down Lighter-2",
    range: "3W – 18W",
    image: "/images/legacy/Photo1.webp",
    bg: "bg-[#fefefe]",
    description: "Deep-recessed LED down lighters with specialized reflectors for low glare.",
    specs: [
      { label: "Wattage Range", value: "3W, 6W, 12W, 15W, 18W" },
      { label: "Shape", value: "Round / Square" },
    ],
  },
  {
    id: "led-down-lighter-3",
    name: "Led Down Lighter-3",
    range: "6W – 24W",
    image: "/images/legacy/10-jpg.webp",
    bg: "bg-[#fefefe]",
    description: "Standard recessed LED downlights for commercial and residential applications.",
    specs: [
      { label: "Wattage Range", value: "6W – 24W" },
      { label: "Cut-out Sizes", value: "3 inch - 8 inch" },
    ],
  },
  {
    id: "led-ceiling-light",
    name: "Led Ceiling Light",
    range: "12W – 36W",
    image: "/images/legacy/ceiling-jpg.webp",
    bg: "bg-[#fdfdfd]",
    description: "LED ceiling lights installed onto ceilings for ambient lighting in indoor spaces.",
    specs: [
      { label: "Wattage Range", value: "12W – 36W" },
      { label: "Shape", value: "Square" },
    ],
  },
  {
    id: "smart-led-bulb",
    name: "Smart Led Bulb",
    range: "7W – 12W",
    image: "/images/legacy/Photo14.webp",
    bg: "bg-white",
    description: "Smart LED bulbs offering 16 million colors and CCT tuning via Wi-Fi connectivity.",
    specs: [
      { label: "Wattage Range", value: "7W – 12W" },
      { label: "Colors", value: "16 Million RGB + CCT" },
      { label: "Connectivity", value: "Wi-Fi 2.4GHz / BLE" },
    ],
  }
];`;

const startIdx = content.indexOf('const ledProducts = [');
const endIdx = content.indexOf('];\n\nexport default function LEDLightingPage()') + 2;

if (startIdx !== -1 && endIdx !== -1) {
  content = content.substring(0, startIdx) + replacement + content.substring(endIdx);
  fs.writeFileSync(file, content);
  console.log('Successfully updated ledProducts array.');
} else {
  console.error('Could not find the array bounds.');
}
