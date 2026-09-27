export type Facility = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  specs: { label: string; value: string }[];
  materials?: string[];
  highlights: { title: string; body: string }[];
};

export const facilities: Facility[] = [
  {
    slug: "injection-moulding",
    title: "Plastic Injection Moulding",
    tagline: "Design to part in one facility.",
    description:
      "Our 18+ injection moulding machines span 80T to 160T clamping force, handling materials like PP, ABS, PET, HIPS, and PC. From prototype tooling to high-volume production runs, we maintain tight tolerances with consistent quality.",
    image: "/images/moulding_factory.jpg",
    specs: [
      { label: "Clamping Force", value: "80T – 160T" },
      { label: "Machines", value: "18+" },
      { label: "Monthly Capacity", value: "1.2M pieces" },
      { label: "Tooling Lead Time", value: "4 – 6 weeks" },
    ],
    materials: ["PP", "ABS", "PET", "HIPS", "PC", "LDPE"],
    highlights: [
      {
        title: "In-House Tooling",
        body: "Our adjacent tool room designs and manufactures all moulds in-house, eliminating vendor dependency and dramatically shortening development cycles.",
      },
      {
        title: "Multi-Cavity Efficiency",
        body: "We run multi-cavity moulds for maximum throughput on high-volume orders, reducing per-unit cost significantly at scale.",
      },
      {
        title: "ISO-Controlled Environment",
        body: "The moulding floor operates under a documented ISO 9001 quality system with first-article inspection on every production run.",
      },
    ],
  },
  {
    slug: "blow-moulding",
    title: "Blow Moulding",
    tagline: "Hollow-form containers at industrial scale.",
    description:
      "Specializing in HDPE, PET, and PP rigid containers for cosmetic, pharmaceutical, and industrial packaging. Our blow moulding machines produce complex bottle geometries with consistent wall thickness.",
    image: "/images/packaging_factory.jpg",
    specs: [
      { label: "Materials", value: "HDPE / PET / PP" },
      { label: "Container Sizes", value: "30ml – 5L" },
      { label: "Monthly Capacity", value: "800K units" },
      { label: "Neck Finishes", value: "28mm, 38mm, custom" },
    ],
    materials: ["HDPE", "PET", "PP"],
    highlights: [
      {
        title: "Food & Pharma Grade",
        body: "Virgin resin only, with full traceability documentation available for regulated industries.",
      },
      {
        title: "Custom Coloring",
        body: "In-house masterbatch mixing to match any Pantone reference with a 96-hour turnaround.",
      },
      {
        title: "Integrated Labeling",
        body: "Laser engraving and hot-stamp decoration are performed inline immediately after forming.",
      },
    ],
  },
  {
    slug: "smt",
    title: "SMT & Auto Insertion",
    tagline: "The intelligence inside every luminaire.",
    description:
      "Equipped with Yamaha and Hanwha high-speed pick-and-place machines and a 6-zone reflow oven, our SMT line handles both LED light engines and driver PCBs with a pick-and-place speed of 170,000 CPH.",
    image: "/images/hero_factory.jpg",
    specs: [
      { label: "Placement Speed", value: "170K CPH" },
      { label: "Reflow Oven", value: "6-Zone" },
      { label: "Smallest Component", value: "0201 (0.6mm×0.3mm)" },
      { label: "Inspection", value: "Automated AOI" },
    ],
    highlights: [
      {
        title: "Automated Optical Inspection",
        body: "Post-reflow, every board passes through AOI cameras that detect solder bridging, component misalignment, and missing parts at line speed.",
      },
      {
        title: "Double-Sided Assembly",
        body: "Capable of populating both sides of a PCB in a single pass, supporting complex driver designs.",
      },
      {
        title: "Lead-Free Process",
        body: "Full RoHS-compliant, lead-free solder paste used throughout, with process validation reports available.",
      },
    ],
  },
  {
    slug: "tool-room",
    title: "In-House Tool Room",
    tagline: "Moulds machined. Timelines shortened.",
    description:
      "Our precision tool room houses CNC machining centres, EDM machines, and surface grinders for fabricating and maintaining all injection moulding inserts. This in-house capability is a critical strategic advantage.",
    image: "/images/tool_room.jpg",
    specs: [
      { label: "CNC Centres", value: "4-Axis & 5-Axis" },
      { label: "Surface Finish", value: "Ra 0.4 µm" },
      { label: "New Mould Lead Time", value: "4 – 6 weeks" },
      { label: "Mould Modification", value: "48-hour turnaround" },
    ],
    highlights: [
      {
        title: "Steel Grade Selection",
        body: "We use P20, H13, and S136 tool steels selected by the expected production volume and material abrasiveness.",
      },
      {
        title: "EDM Capability",
        body: "Electrical Discharge Machining for complex cavity geometries that CNC cannot reach.",
      },
      {
        title: "Mould Maintenance Program",
        body: "Preventive maintenance schedule for all production moulds to ensure consistent part quality across millions of cycles.",
      },
    ],
  },
  {
    slug: "assembly-packaging",
    title: "Assembly & Packaging",
    tagline: "The final mile. Zero compromise.",
    description:
      "A 100,000 units/day assembly operation running fully systematic conveyor lines. Integrated end-of-line high-voltage aging machines ensure every unit is burned-in before final packaging for export.",
    image: "/images/testing_lab.jpg",
    specs: [
      { label: "Daily Output", value: "100K units" },
      { label: "Aging Test", value: "250V – 320V" },
      { label: "Carton Lines", value: "Automated" },
      { label: "Packing Standards", value: "Export-grade" },
    ],
    highlights: [
      {
        title: "End-of-Line Testing",
        body: "Every single unit is powered at full rated voltage for a burn-in period before packing. Zero defective units shipped.",
      },
      {
        title: "Custom Branding",
        body: "In-line laser printing, stickering, and carton printing for your OEM brand. No batch minimums on label changes.",
      },
      {
        title: "Export Documentation",
        body: "Automated packing list and certificate generation integrated with our ERP system for rapid customs clearance.",
      },
    ],
  },
  {
    slug: "ibm-plastic",
    title: "IBM Plastic",
    tagline: "Injection Blow Moulding for precision containers.",
    description:
      "Combining injection and blow moulding processes to create flawless containers. This process ensures precise neck finishes and even wall distribution, ideal for cosmetic and pharmaceutical packaging.",
    image: "/images/packaging_factory.jpg",
    specs: [
      { label: "Process", value: "Injection Blow Moulding" },
      { label: "Tolerance", value: "High precision neck finishes" },
      { label: "Materials", value: "PET, PP, HDPE" },
      { label: "Application", value: "Cosmetics & Pharma" },
    ],
    materials: ["PET", "PP", "HDPE"],
    highlights: [
      {
        title: "Seamless Finish",
        body: "IBM eliminates the pinch-off scar found in extrusion blow moulding, providing a premium finish.",
      },
    ],
  },
  {
    slug: "manual-insertion",
    title: "Manual Insertion",
    tagline: "Skilled hand assembly for complex components.",
    description:
      "While our SMT lines handle automated placement, our dedicated manual insertion lines manage through-hole components, connectors, and custom wiring assemblies that require skilled human operators.",
    image: "/images/moulding_factory.jpg",
    specs: [
      { label: "Lines", value: "Dedicated through-hole assembly" },
      { label: "Components", value: "Connectors, capacitors, transformers" },
      { label: "Quality Check", value: "Visual and functional testing" },
    ],
    highlights: [
      {
        title: "Skilled Workforce",
        body: "Trained operators ensure precise component insertion and wave soldering preparation.",
      },
    ],
  },
  {
    slug: "laser-machine",
    title: "Laser Machine",
    tagline: "Precision engraving and branding.",
    description:
      "In-line laser engraving capabilities for permanent branding, batch coding, and detailed product information on both plastic and metal surfaces.",
    image: "/images/tool_room.jpg",
    specs: [
      { label: "Application", value: "Branding, Coding, Traceability" },
      { label: "Materials", value: "Plastics, Aluminium" },
      { label: "Speed", value: "High-speed inline processing" },
    ],
    highlights: [
      {
        title: "Permanent Marking",
        body: "Laser engraving ensures that branding and regulatory markings never wear off during the product's lifespan.",
      },
    ],
  },
  {
    slug: "research-development",
    title: "Research & Development",
    tagline: "Innovating the future of manufacturing.",
    description:
      "Our dedicated R&D team continuously explores new materials, driver designs, and moulding techniques to optimize product performance, durability, and cost-efficiency.",
    image: "/images/testing_lab.jpg",
    specs: [
      { label: "Focus Areas", value: "Thermal management, electronics design" },
      { label: "Prototyping", value: "Rapid 3D printing and tooling" },
      { label: "Testing", value: "Environmental and stress simulation" },
    ],
    highlights: [
      {
        title: "Custom Solutions",
        body: "We work directly with OEM partners to engineer bespoke solutions from the ground up.",
      },
    ],
  },
];
