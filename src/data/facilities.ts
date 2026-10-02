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
  portfolio?: { title: string; body: string }[];
  applications?: string[];
  approvedBrands?: string[];
  capacityNote?: string;
  heading?: string;
};

export const facilities: Facility[] = [
  {
    slug: "injection-moulding",
    title: "Injection Moulding",
    tagline: "Injection moulding for precision plastic components and products.",
    description: "Sheetal Electrotech supports plastic injection moulding for precision plastic components and products, with materials including PP, ABS, PET, PC and PBT. The capability supports design, prototyping, tooling and production workflows.",
    image: "/images/facilities/legacy/injection-moulding.jpeg",
    fallbackImages: ["/images/moulding_factory.jpg"],
    specs: [{"label":"Machine range","value":"80–160 tons"}],
    highlights: [{"title":"Material flexibility","body":"Materials including PP, ABS, PET, PC and PBT can be considered based on product and application requirements."},{"title":"Design to production","body":"The capability can support the workflow from design and prototyping through tooling and production."},{"title":"Cost-effective manufacturing","body":"The process is suited to repeatable production of precision plastic components with attention to consistency and production requirements."}]
  },
  {
    slug: "ibm-plastic",
    title: "Injection Blow Moulding",
    tagline: "Injection Blow Moulding (IBM) for precision containers.",
    description: "Injection Blow Moulding (IBM) is used for hollow plastic parts and supports applications such as bulb housings. The process complements Sheetal Electrotech's wider plastic manufacturing capabilities.",
    image: "/images/facilities/legacy/ibm-plastic.webp",
    fallbackImages: ["/images/products_packaging.jpg"],
    specs: [{"label":"Bulb housing capacity","value":"Up to 9 lakh / month"}],
    highlights: [{"title":"Bulb housing focus","body":"The capability supports hollow plastic components, including bulb-housing applications."},{"title":"Selected applications","body":"The capability can be configured around specified product and application requirements."},{"title":"Integrated plastics capability","body":"IBM is supported by additional plastic manufacturing capabilities including extrusion and injection moulding."}]
  },
  {
    slug: "extrusion",
    title: "Extrusion",
    tagline: "Continuous plastic profile manufacturing for battens, housings and other formed plastic products.",
    description: "Sheetal Electrotech's extrusion capability supports the production of plastic profiles and products including battens and housings. The extrusion process forms molten plastic through a die to create continuous profiles with consistent dimensions and finish.",
    image: "https://sheetalelectrotech.com/wp-content/uploads/2023/04/Screenshot-2023-04-15-at-11.05.08-AM.png",
    fallbackImages: ["/images/hero_manufacturing.jpg"],
    heading: "Extrusion product works with Sheetal Electrotech",
    capacityNote: "Extrusion supports continuous production of plastic profiles and formed products to specified dimensions and application requirements.",
    portfolio: [
      { title: "Plastic Battens", body: "Extrusion supports the manufacture of plastic batten profiles used in lighting products." },
      { title: "Plastic Housings", body: "Profile-based housings and formed plastic parts can be produced around specified product requirements." },
      { title: "Custom Extruded Products", body: "Extrusion can be applied to residential, commercial and industrial product requirements." }
    ],
    applications: ["Residential", "Commercial", "Industrial"],
    approvedBrands: ["RK Lighting", "Elite", "Crompton", "Lumisons"],
    specs: [],
    highlights: [
      { title: "Consistent Profile Formation", body: "Extrusion is suited to continuous plastic profiles where dimensional consistency and repeatable forming are important." },
      { title: "Manufacturing Experience", body: "Extrusion operations are supported by technical and production teams focused on repeatable profile manufacturing." },
      { title: "Quality Focus", body: "Production focuses on material selection, process consistency, dimensional control and application requirements." }
    ]
  },
  {
    slug: "manual-insertion",
    title: "Manual Insertion",
    tagline: "Manual component insertion and assembly operations.",
    description: "Manual insertion is the hand placement of electronic components into printed circuit boards (PCBs). It supports through-hole component placement and can complement PCB, SMT, cable and box-build assembly operations.",
    image: "/images/facilities/legacy/manual-insertion.png",
    fallbackImages: ["/images/legacy/manufacturing.png"],
    specs: [],
    highlights: [{"title":"Through-hole component placement","body":"Manual insertion is used where components are placed into PCBs by hand with attention to accurate and precise placement."},{"title":"Complementary assembly","body":"Manual insertion can be integrated with PCB assembly, SMT assembly, cable assembly and box-build workflows."},{"title":"Experienced operations","body":"Operations combine trained assembly personnel with appropriate tools and process controls."}]
  },
  {
    slug: "research-development",
    title: "R&D",
    tagline: "Product development, prototyping and manufacturing process support.",
    description: "Sheetal Electrotech’s R&D work focuses on LED lighting and electronics, with attention to energy efficiency, product durability and longevity, and the development of products for changing market requirements and emerging technologies.",
    image: "/images/facilities/legacy/research-development.png",
    fallbackImages: ["/images/legacy/product-design.png"],
    specs: [],
    highlights: [{"title":"Energy efficiency","body":"R&D focuses on LED lighting and electronics, with attention to energy efficiency, product durability, longevity and application-specific development."},{"title":"Durability and longevity","body":"R&D also addresses longer product life and reduced maintenance requirements."},{"title":"Specialized lighting applications","body":"R&D can support application-focused lighting development for different indoor and outdoor environments."}]
  },
  {
    slug: "blow-moulding",
    title: "Blow Moulding",
    tagline: "Manufacturing of hollow plastic containers through blow moulding.",
    description: "Sheetal Electrotech’s plastic blow moulding operation supports hollow plastic products including bottles, containers and tanks. Production can be configured around product geometry, material and volume requirements.",
    image: "/images/facilities/legacy/blow-moulding.png",
    fallbackImages: ["/images/packaging_factory.jpg"],
    specs: [{"label":"Container range","value":"10 ml–25 litres"},{"label":"Machines","value":"18"}],
    applications: ["Pharmaceutical","Agricultural","Packing"],
    highlights: [{"title":"Wide container range","body":"Blow moulding supports a range of hollow plastic product formats and container applications."},{"title":"Sector coverage","body":"Applications can include pharmaceutical, agricultural and packaging requirements."},{"title":"Application requirements","body":"Production can be developed around customer-specific specifications and application requirements."}]
  },
  {
    slug: "smt",
    title: "SMT",
    tagline: "Surface-mount technology for electronic assembly and lighting products.",
    description: "Surface Mount Technology (SMT) assembly places electronic components directly onto printed circuit boards. The capability supports precision component placement, inspection, reflow and testing for electronic assemblies.",
    image: "/images/facilities/legacy/smt.png",
    fallbackImages: ["/images/smt_electronics.jpg"],
    specs: [{"label":"HT-F7S","value":"170k cph"},{"label":"RT-2","value":"22k cph"},{"label":"HT-E6T","value":"20k cph"},{"label":"Reflow","value":"6-zone SMT reflow oven"}],
    highlights: [{"title":"High-speed placement","body":"SMT production supports high-speed component placement with process controls suited to repeatable electronic assembly."},{"title":"Vision-assisted accuracy","body":"Vision-assisted inspection supports accurate component placement and process verification."},{"title":"Component flexibility","body":"Typical surface-mount components include resistors, capacitors, ICs, MOSFETs, diodes and LEDs, depending on the assembly."},{"title":"Inspection and testing","body":"Inspection and testing can be incorporated into the assembly workflow before finished products are released."}]
  },
  {
    slug: "assembly-packing",
    title: "Assembly & Packing",
    tagline: "Product assembly, inspection and packing operations.",
    description: "Sheetal Electrotech’s assembly and packing operation supports batten, panel and downlight products through a systematic conveyor-based process, followed by product-specific packing and electrical aging tests.",
    image: "/images/facilities/legacy/assembly-packing.png",
    fallbackImages: ["/images/product_showcase.jpg"],
    specs: [{"label":"Daily capacity","value":"Up to 100k units"},{"label":"Aging test range","value":"100V–320V"}],
    highlights: [{"title":"Systematic conveyor assembly","body":"Conveyor-based assembly supports organized, repeatable production and can be configured around product-specific workflows."},{"title":"Flexible packing","body":"The packing system can use different materials and packaging configurations based on product requirements."},{"title":"Aging test","body":"Product testing can include aging and electrical checks appropriate to the product specification."}]
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
