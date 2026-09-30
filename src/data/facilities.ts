export type Facility = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  fallbackImages?: string[];
  specs: { label: string; value: string }[];
  materials?: string[];
  highlights: { title: string; body: string }[];
};

export const facilities: Facility[] = [
  {
    slug: "injection-moulding",
    title: "Injection Moulding",
    tagline: "Injection moulding for precision plastic components and products.",
    description: "It involves injecting molten plastic material into a mold cavity under high pressure, which then cools and solidifies to form a precise, high-quality plastic part.",
    image: "/images/facilities/legacy/injection-moulding.jpeg",
    fallbackImages: ["/images/moulding_factory.jpg"],
    specs: [],
    highlights: []
  },
  {
    slug: "ibm-plastic",
    title: "Injection Blow Moulding",
    tagline: "Injection Blow Moulding (IBM) for precision containers.",
    description: "Injection blow molding (IBM) is a manufacturing process used to produce hollow plastic parts. It is a variation of blow molding, which is used to create hollow objects from thermoplastic materials such as pe, pp, and ps.",
    image: "/images/facilities/legacy/ibm-plastic.webp",
    fallbackImages: ["/images/products_packaging.jpg"],
    specs: [],
    highlights: []
  },
  {
    slug: "extrusion",
    title: "Extrusion",
    tagline: "Continuous plastic profile manufacturing.",
    description: "The extrusion machine is a versatile tool for producing a wide range of plastic products, including batten, with a high degree of precision and consistency.",
    image: "https://sheetalelectrotech.com/wp-content/uploads/2023/04/Screenshot-2023-04-15-at-11.05.08-AM.png",
    fallbackImages: ["/images/hero_manufacturing.jpg"],
    specs: [],
    highlights: []
  },
  {
    slug: "manual-insertion",
    title: "Manual Insertion",
    tagline: "Manual component insertion and assembly operations.",
    description: "Manual insertion is ideal for low-volume or custom products, while automatic insertion is more efficient for high-volume production runs.",
    image: "/images/facilities/legacy/manual-insertion.png",
    fallbackImages: ["/images/legacy/manufacturing.png"],
    specs: [],
    highlights: []
  },
  {
    slug: "research-development",
    title: "R&D",
    tagline: "Product development, prototyping and manufacturing process support.",
    description: "R&D efforts in LED lighting and plastic materials are focused on creating sustainable, energy-efficient, and cost-effective lighting solutions that can meet the growing demand for eco-friendly products.",
    image: "/images/facilities/legacy/research-development.png",
    fallbackImages: ["/images/legacy/product-design.png"],
    specs: [],
    highlights: []
  },
  {
    slug: "blow-moulding",
    title: "Blow Moulding",
    tagline: "Manufacturing of hollow plastic containers through blow moulding.",
    description: "A plastic blow molding machine is a type of manufacturing equipment used to produce hollow plastic products such as bottles, containers, and tanks. The process involves melting plastic resin and then blowing it into a mold to create a desired shape.",
    image: "/images/facilities/legacy/blow-moulding.png",
    fallbackImages: ["/images/packaging_factory.jpg"],
    specs: [],
    highlights: []
  },
  {
    slug: "smt",
    title: "SMT",
    tagline: "Surface-mount technology for electronic assembly and lighting products.",
    description: "Surface Mount Technology machine is a type of electronic manufacturing equipment used in the production of printed circuit boards. SMT machines are used to place surface-mount devices onto a PCB.",
    image: "/images/facilities/legacy/smt.png",
    fallbackImages: ["/images/smt_electronics.jpg"],
    specs: [],
    highlights: []
  },
  {
    slug: "assembly-packing",
    title: "Assembly & Packing",
    tagline: "Product assembly, inspection and packing operations.",
    description: "The assembly and packing line is a key component of modern manufacturing, allowing for the rapid production and delivery of high-quality goods to customers around the world.",
    image: "/images/facilities/legacy/assembly-packing.png",
    fallbackImages: ["/images/product_showcase.jpg"],
    specs: [],
    highlights: []
  },
  {
    slug: "tool-room",
    title: "Tool Room",
    tagline: "Tooling and mould support for in-house manufacturing and product development.",
    description: "Our fully equipped tool room designs and manufactures moulds in-house using CNC machining, EDM, and precision grinding, supporting in-house tooling and faster product development.",
    image: "/images/tool_room.jpg",
    specs: [],
    highlights: []
  }
];
