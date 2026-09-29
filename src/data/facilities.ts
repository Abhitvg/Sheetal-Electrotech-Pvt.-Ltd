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
      "It involves injecting molten plastic material into a mold cavity under high pressure, which then cools and solidifies to form a precise, high-quality plastic part.",
    image: "/images/legacy/Photo1.webp",
    specs: [
      { label: "Clamping Force", value: "80T – 160T" },
      { label: "Process", value: "Multi-cavity moulds" },
      { label: "Tooling", value: "In-house tool room" },
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
      "A plastic blow molding machine is a type of manufacturing equipment used to produce hollow plastic products such as bottles, containers, and tanks. The process involves melting plastic resin and then blowing it into a mold to create a desired shape.",
    image: "/images/legacy/Photo5.webp",
    specs: [
      { label: "Materials", value: "HDPE / PET / PP" },
      { label: "Container Sizes", value: "30ml – 5L" },
      { label: "Capability", value: "Bottles, containers, jars" },
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
      "Surface Mount Technology machine is a type of electronic manufacturing equipment used in the production of printed circuit boards. SMT machines are used to place surface-mount devices onto a PCB.",
    image: "/images/legacy/Photo3.webp",
    specs: [
      { label: "Technology", value: "Surface Mount" },
      { label: "Reflow Oven", value: "Multi-Zone" },
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
    slug: "extruder",
    title: "Extruder Machine Plastic",
    tagline: "Moulds machined. Timelines shortened.",
    description:
      "The extrusion machine is a versatile tool for producing a wide range of plastic products, including batten, with a high degree of precision and consistency.",
    image: "/images/legacy/Photo2.webp",
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
      "The assembly and packing line is a key component of modern manufacturing, allowing for the rapid production and delivery of high-quality goods to customers around the world.",
    image: "/images/legacy/Photo4.webp",
    specs: [
      { label: "Process", value: "End-to-end assembly" },
      { label: "Testing", value: "Full voltage burn-in" },
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
      "Injection blow molding (IBM) is a manufacturing process used to produce hollow plastic parts. It is a variation of blow molding, which is used to create hollow objects from thermoplastic materials such as pe, pp, and ps.",
    image: "/images/legacy/Photo5.webp",
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
      "Manual insertion is ideal for low-volume or custom products, while automatic insertion is more efficient for high-volume production runs.",
    image: "/images/legacy/Photo1.webp",
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
    image: "/images/legacy/Photo2.webp",
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
      "R&D efforts in LED lighting and plastic materials are focused on creating sustainable, energy-efficient, and cost-effective lighting solutions that can meet the growing demand for eco-friendly products.",
    image: "/images/legacy/Photo4.webp",
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
