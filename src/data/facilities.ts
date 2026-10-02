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
  legacyHeading?: string;
};

export const facilities: Facility[] = [
  {
    slug: "injection-moulding",
    title: "Injection Moulding",
    tagline: "Injection moulding for precision plastic components and products.",
    description: "Sheetal Electrotech supports plastic injection moulding using a range of materials including PP, ABS, PET, PC and PBT. The legacy site describes injection moulding machines ranging from 80 to 160 tons, with support across design, prototyping, tooling and production.",
    image: "/images/facilities/legacy/injection-moulding.jpeg",
    fallbackImages: ["/images/moulding_factory.jpg"],
    specs: [{"label":"Machine range","value":"80–160 tons"}],
    highlights: [{"title":"Material flexibility","body":"The official legacy material lists PP, ABS, PET, PC, PBT and more among the materials supported for injection moulding."},{"title":"Design to production","body":"The team supports design and prototyping through tooling and production, according to the official legacy site."},{"title":"Cost-effective manufacturing","body":"The legacy site positions injection moulding around cost-effective solutions, precision parts and timely project delivery."}]
  },
  {
    slug: "ibm-plastic",
    title: "Injection Blow Moulding",
    tagline: "Injection Blow Moulding (IBM) for precision containers.",
    description: "Injection Blow Moulding (IBM) is used for hollow plastic parts and is a key capability for bulb housings. The official legacy site describes a capacity of 9 lakh bulb housings per month and cites work with Orient, Ledvance and Bright Elite.",
    image: "/images/facilities/legacy/ibm-plastic.webp",
    fallbackImages: ["/images/products_packaging.jpg"],
    specs: [{"label":"Bulb housing capacity","value":"Up to 9 lakh / month"}],
    highlights: [{"title":"Bulb housing focus","body":"The official legacy page specifically describes injection blow moulding work for bulb housing."},{"title":"Selected customers cited by legacy source","body":"The official page names Orient, Ledvance and Bright Elite among brands the company has worked with."},{"title":"Integrated plastics capability","body":"IBM is supported by additional plastic manufacturing capabilities including extrusion and injection moulding."}]
  },
  {
    slug: "extrusion",
    title: "Extrusion",
    tagline: "Continuous plastic profile manufacturing for battens, housings and other formed plastic products.",
    description: "Sheetal Electrotech's extrusion capability supports the production of plastic profiles and products including battens and housings. The extrusion process forms molten plastic through a die to create continuous profiles with consistent dimensions and finish.",
    image: "https://sheetalelectrotech.com/wp-content/uploads/2023/04/Screenshot-2023-04-15-at-11.05.08-AM.png",
    fallbackImages: ["/images/hero_manufacturing.jpg"],
    legacyHeading: "Extrusion product works with Sheetal Electrotech",
    capacityNote: "The legacy company page describes capacity of up to 12 lakh pieces per month for extruder machine products.",
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
      { title: "Manufacturing Experience", body: "The legacy company material describes an experienced team of technicians and engineers supporting extrusion product manufacturing." },
      { title: "Quality Focus", body: "The legacy material emphasizes quality, service, materials and production methods throughout the manufacturing process." }
    ]
  },
  {
    slug: "manual-insertion",
    title: "Manual Insertion",
    tagline: "Manual component insertion and assembly operations.",
    description: "Manual insertion is the hand placement of electronic components into printed circuit boards (PCBs). The official legacy site describes an experienced team, advanced tools and techniques, and complementary PCB, SMT, cable and box-build assembly services.",
    image: "/images/facilities/legacy/manual-insertion.png",
    fallbackImages: ["/images/legacy/manufacturing.png"],
    specs: [],
    highlights: [{"title":"Through-hole component placement","body":"Manual insertion is used where components are placed into PCBs by hand with attention to accurate and precise placement."},{"title":"Complementary assembly","body":"The official legacy page lists PCB assembly, SMT assembly, cable assembly and box build assembly as complementary services."},{"title":"Experienced operations","body":"The legacy material describes experienced professionals and technology-supported manual insertion operations."}]
  },
  {
    slug: "research-development",
    title: "R&D",
    tagline: "Product development, prototyping and manufacturing process support.",
    description: "Sheetal Electrotech’s R&D work focuses on LED lighting and electronics, with attention to energy efficiency, product durability and longevity, and the development of products for changing market requirements and emerging technologies.",
    image: "/images/facilities/legacy/research-development.png",
    fallbackImages: ["/images/legacy/product-design.png"],
    specs: undefined,
    highlights: [{"title":"Energy efficiency","body":"The official legacy site describes R&D aimed at LED lighting solutions that use minimal energy while maintaining high-quality illumination."},{"title":"Durability and longevity","body":"R&D also addresses longer product life and reduced maintenance requirements."},{"title":"Specialized lighting applications","body":"The legacy page cites LED lighting solutions for indoor farming and outdoor farming as examples of application-focused product development."}]
  },
  {
    slug: "blow-moulding",
    title: "Blow Moulding",
    tagline: "Manufacturing of hollow plastic containers through blow moulding.",
    description: "Sheetal Electrotech’s plastic blow moulding operation supports hollow plastic products including bottles, containers and tanks. The official legacy site describes machines handling products from 10 ml to 25 litres and a total of 18 machines.",
    image: "/images/facilities/legacy/blow-moulding.png",
    fallbackImages: ["/images/packaging_factory.jpg"],
    specs: [{"label":"Container range","value":"10 ml–25 litres"},{"label":"Machines","value":"18"}],
    applications: ["Pharmaceutical","Agricultural","Packing"],
    highlights: [{"title":"Wide container range","body":"The official legacy material describes blow moulding equipment designed for products from 10 ml to 25 litres."},{"title":"Sector coverage","body":"The legacy site cites pharmaceutical, agricultural and packing industries."},{"title":"Customers cited by legacy source","body":"The official page names UPL, HPCL, BPCL and TATA among customers served."}]
  },
  {
    slug: "smt",
    title: "SMT",
    tagline: "Surface-mount technology for electronic assembly and lighting products.",
    description: "Surface Mount Technology (SMT) assembly places electronic components directly onto printed circuit boards. The official legacy site describes high-speed, high-precision equipment, advanced vision systems, multiple SMT machines and six-zone reflow capability.",
    image: "/images/facilities/legacy/smt.png",
    fallbackImages: ["/images/smt_electronics.jpg"],
    specs: [{"label":"HT-F7S","value":"170k cph"},{"label":"RT-2","value":"22k cph"},{"label":"HT-E6T","value":"20k cph"},{"label":"Reflow","value":"6-zone SMT reflow oven"}],
    highlights: [{"title":"High-speed placement","body":"The legacy page lists HT-F7S, RT-2 and HT-E6T SMT machines for high-speed, high-precision component placement."},{"title":"Vision-assisted accuracy","body":"The official page describes advanced vision systems for accurate PCB component placement."},{"title":"Component flexibility","body":"The legacy source lists surface-mount resistors, capacitors, IC, MOSFET, diode and LED among component types supported."},{"title":"Inspection and testing","body":"The official page describes in-line testing and inspection plus end-of-line testing before products leave the facility."}]
  },
  {
    slug: "assembly-packing",
    title: "Assembly & Packing",
    tagline: "Product assembly, inspection and packing operations.",
    description: "Sheetal Electrotech’s assembly and packing operation supports batten, panel and downlight products through a systematic conveyor-based process, followed by product-specific packing and electrical aging tests.",
    image: "/images/facilities/legacy/assembly-packing.png",
    fallbackImages: ["/images/product_showcase.jpg"],
    specs: [{"label":"Daily capacity","value":"Up to 100k units"},{"label":"Aging test range","value":"100V–320V"}],
    highlights: [{"title":"Systematic conveyor assembly","body":"The official legacy page describes a conveyor system designed for efficient and accurate assembly with a daily capacity of up to 100k units."},{"title":"Flexible packing","body":"The packing system can use different materials and packaging configurations based on product requirements."},{"title":"Aging test","body":"The official source describes an aging machine handling 100V to 320V for testing and validating products under varied voltage conditions."}]
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
