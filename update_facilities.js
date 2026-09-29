const fs = require('fs');

const data = `export type Facility = {
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
    title: "Injection Moulding",
    tagline: "Design to part in one facility.",
    description: "It involves injecting molten plastic material into a mold cavity under high pressure, which then cools and solidifies to form a precise, high-quality plastic part.",
    image: "/images/facilities/injection-moulding.png",
    specs: [],
    materials: ["PP", "ABS", "PET", "HIPS", "PC", "LDPE"],
    highlights: []
  },
  {
    slug: "ibm-plastic",
    title: "IBM Plastic",
    tagline: "Injection Blow Moulding for precision containers.",
    description: "Injection blow molding (IBM) is a manufacturing process used to produce hollow plastic parts. It is a variation of blow molding, which is used to create hollow objects from thermoplastic materials such as pe, pp, and ps.",
    image: "/images/facilities/ibm-plastic.png",
    specs: [],
    materials: ["PET", "PP", "HDPE"],
    highlights: []
  },
  {
    slug: "extrusion",
    title: "Extrusion",
    tagline: "Continuous plastic profile manufacturing.",
    description: "The extrusion machine is a versatile tool for producing a wide range of plastic products, including batten, with a high degree of precision and consistency.",
    image: "/images/facilities/extrusion.png",
    specs: [],
    highlights: []
  },
  {
    slug: "manual-insertion",
    title: "Manual Insertion",
    tagline: "Skilled hand assembly for complex components.",
    description: "Manual insertion is ideal for low-volume or custom products, while automatic insertion is more efficient for high-volume production runs.",
    image: "/images/facilities/manual-insertion.png",
    specs: [],
    highlights: []
  },
  {
    slug: "research-development",
    title: "R&D",
    tagline: "Innovating the future of manufacturing.",
    description: "R&D efforts in LED lighting and plastic materials are focused on creating sustainable, energy-efficient, and cost-effective lighting solutions that can meet the growing demand for eco-friendly products.",
    image: "/images/facilities/research-development.png",
    specs: [],
    highlights: []
  },
  {
    slug: "blow-moulding",
    title: "Blow Moulding",
    tagline: "Hollow-form containers at industrial scale.",
    description: "A plastic blow molding machine is a type of manufacturing equipment used to produce hollow plastic products such as bottles, containers, and tanks. The process involves melting plastic resin and then blowing it into a mold to create a desired shape.",
    image: "/images/facilities/blow-moulding.png",
    specs: [],
    materials: ["HDPE", "PET", "PP"],
    highlights: []
  },
  {
    slug: "smt",
    title: "SMT",
    tagline: "The intelligence inside every luminaire.",
    description: "Surface Mount Technology machine is a type of electronic manufacturing equipment used in the production of printed circuit boards. SMT machines are used to place surface-mount devices onto a PCB.",
    image: "/images/facilities/smt.png",
    specs: [],
    highlights: []
  },
  {
    slug: "assembly-packing",
    title: "Assembly & Packing",
    tagline: "The final mile. Zero compromise.",
    description: "The assembly and packing line is a key component of modern manufacturing, allowing for the rapid production and delivery of high-quality goods to customers around the world.",
    image: "/images/facilities/assembly-packing.png",
    specs: [],
    highlights: []
  },
  {
    slug: "tool-room",
    title: "Tool Room",
    tagline: "In-house precision mould manufacturing.",
    description: "Our fully equipped tool room designs and manufactures all moulds in-house using CNC machining, EDM, and precision grinding, enabling rapid prototyping and eliminating vendor dependency.",
    image: "/images/facilities/tool-room.png",
    specs: [],
    highlights: []
  }
];
`;

fs.writeFileSync('src/data/facilities.ts', data);
console.log('Updated src/data/facilities.ts');
