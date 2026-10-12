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
    specs: [],
    highlights: [{"title":"Material flexibility","body":"Materials including PP, ABS, PET, PC and PBT can be considered based on product and application requirements."},{"title":"Design to production","body":"The capability can support the workflow from design and prototyping through tooling and production."},{"title":"Cost-effective manufacturing","body":"The process is suited to repeatable production of precision plastic components with attention to consistency and production requirements."}]
  },
  {
    slug: "ibm-plastic",
    title: "Injection Blow Moulding",
    tagline: "Injection Blow Moulding (IBM) for precision containers.",
    description: "Injection Blow Moulding (IBM) is used for hollow plastic parts and supports applications such as bulb housings. The process complements Sheetal Electrotech's wider plastic manufacturing capabilities.",
    image: "/images/facilities/legacy/ibm-plastic.webp",
    fallbackImages: ["/images/products_packaging.jpg"],
    specs: [],
    highlights: [{"title":"Bulb housing focus","body":"The capability supports hollow plastic components, including bulb-housing applications."},{"title":"Selected applications","body":"The capability can be configured around specified product and application requirements."},{"title":"Integrated plastics capability","body":"IBM is supported by additional plastic manufacturing capabilities including extrusion and injection moulding."}]
  },
  {
    slug: "extrusion",
    title: "Extrusion",
    tagline: "Continuous plastic profile manufacturing for battens, housings and other formed plastic products.",
    description: "Sheetal Electrotech's extrusion capability supports the production of plastic profiles and products including battens and housings. The extrusion process forms molten plastic through a die to create continuous profiles with consistent dimensions and finish.",
    image: "/images/hero_manufacturing.jpg",
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
    fallbackImages: ["/images/facilities/manual-insertion.webp"],
    specs: [
      { label: "Assembly Method", value: "Precision Through-Hole Insertion" },
      { label: "Soldering Tech", value: "Dual-Wave & Controlled Dip Soldering" },
      { label: "Component Types", value: "Radial / Axial Capacitors, Inductors & Transformers" },
      { label: "Inspection", value: "100% Polar Alignment & Solder Joint Verification" }
    ],
    materials: ["FR4 Glass Epoxy PCBs", "MCPCB Metal Core Boards", "Copper Busbars", "Through-Hole Connectors"],
    applications: ["LED Driver Power Supplies", "Inverter Sub-Assemblies", "Industrial Control Boards"],
    highlights: [
      { title: "Through-Hole Component Placement", body: "Manual insertion is used where high-reliability through-hole components are placed into PCBs by trained operators with strict adherence to component polarity and seating tolerances." },
      { title: "Integrated Assembly Workflow", body: "Manual insertion lines feed directly into automated wave soldering conveyors, lead-trimming stations, and in-line visual inspection fixtures." },
      { title: "ESD-Safe Work Environment", body: "Complete electrostatic discharge (ESD) protected workstations with grounded wrist straps, conductive mats, and temperature-controlled soldering irons." }
    ]
  },
  {
    slug: "research-development",
    title: "R&D",
    tagline: "Product development, optical prototyping, thermal simulation and testing.",
    description: "Sheetal Electrotech’s R&D division focuses on advanced LED driver topology, thermal management, optical diffuser co-extrusion, and IoT wireless smart controls.",
    image: "/images/facilities/legacy/research-development.png",
    fallbackImages: ["/images/testing_lab.jpg", "/images/facilities/research-development.webp"],
    specs: [
      { label: "Optical Laboratory", value: "Spectroradiometer & Integrating Sphere" },
      { label: "Thermal Engineering", value: "FLIR Thermal Imaging & Fluke Multi-Channel Loggers" },
      { label: "Electrical Testing", value: "Surge Generator (6KV), Chroma AC Power Supplies" },
      { label: "Prototyping SLA", value: "High-Resolution 3D Resin Prototyping" }
    ],
    materials: ["Optical Grade Polycarbonate", "Aluminium Heatsink Extrusions", "High-Efficiency LED Packages", "Smart MCU Chipsets"],
    applications: ["BIS R-Number Certification", "Energy Star / BEE Star Rating Development", "OEM Custom Design Validations"],
    highlights: [
      { title: "Comprehensive Optical Characterization", body: "Full spectral analysis, lumen maintenance, CCT chromaticity coordinate mapping, and CRI fidelity testing in our calibrated dark room." },
      { title: "High-Surge Driver Architecture", body: "In-house development of robust 4KV to 6KV surge-immune power supplies designed for erratic grid voltage conditions across rural and industrial India." },
      { title: "Rapid Functional Prototyping", body: "Fast-turnaround turnaround from 3D concept CAD to SLA physical model fitment checks within 48 to 72 hours." }
    ]
  },
  {
    slug: "blow-moulding",
    title: "Blow Moulding",
    tagline: "Manufacturing of hollow plastic containers through continuous extrusion blow moulding.",
    description: "Sheetal Electrotech’s plastic blow moulding facility produces hollow containers including pharmaceutical bottles, chemical jerrycans, and custom packaging. Controlled parison programming ensures uniform wall thickness across complex geometries.",
    image: "/images/facilities/legacy/blow-moulding.png",
    fallbackImages: ["/images/packaging_factory.jpg", "/images/facilities/blow-moulding.webp"],
    specs: [
      { label: "Moulding Technology", value: "Continuous Extrusion & Accumulator Blow Moulding" },
      { label: "Volume Envelope", value: "50 ml to 5000 ml (5 Litres)" },
      { label: "Raw Polymers", value: "Pharma/Food Grade HDPE, LDPE & PP" },
      { label: "Parison Control", value: "Multi-Point Electronic Parison Wall Calibration" }
    ],
    materials: ["HDPE (High-Density Polyethylene)", "LDPE", "Polypropylene (PP)", "Masterbatch Pigments"],
    applications: ["Pharmaceutical Liquid Bottles", "Agricultural Pesticide Containers", "FMCG Cosmetics", "Industrial Lubricant Jerrycans"],
    highlights: [
      { title: "Wide Container Range", body: "Blow moulding supports bottle volumes from 50ml dropper vials up to 5-litre heavy-duty UN-rated chemical jerrycans." },
      { title: "Leak-Tight Neck Finishes", body: "Calibrated blow pin deflashing delivers precision neck finishes compatible with induction seals, tamper-evident caps, and child-resistant closures." },
      { title: "In-Line Leak Detection", body: "Automated high-sensitivity pressure decay leak testers verify 100% seal integrity before packaging." }
    ]
  },
  {
    slug: "smt",
    title: "SMT",
    tagline: "Surface-mount technology for electronic assembly and lighting products.",
    description: "Surface Mount Technology (SMT) lines place microscopic electronic components onto PCBs at high speeds. Features automated solder paste stencil printing, high-speed pick-and-place, multi-zone reflow ovens, and Automated Optical Inspection (AOI).",
    image: "/images/facilities/legacy/smt.png",
    fallbackImages: ["/images/smt_electronics.jpg", "/images/facilities/smt.webp"],
    specs: [
      { label: "Placement Rate", value: "High-Speed Multi-Feeder Pick & Place" },
      { label: "Inspection System", value: "In-Line Automated Optical Inspection (AOI)" },
      { label: "Reflow Profile", value: "Multi-Zone Nitrogen Atmosphere Reflow Oven" },
      { label: "Component Pitch", value: "Down to 0201 Chip & Fine-Pitch IC Packages" }
    ],
    materials: ["Lead-Free Solder Alloys (SAC305)", "FR4 & Aluminium Metal-Core PCBs", "SMD LEDs (2835, 3030, 5050)", "ICs & Power MOSFETs"],
    applications: ["LED Driver Boards", "Linear Batten MCPCB Arrays", "Smart IoT Lighting Modules", "Electronic Power Strips"],
    highlights: [
      { title: "High-Speed Automated Pick-and-Place", body: "High-precision placement heads with intelligent vision centering handle high-density LED arrays and micro-components with micron-level repeatability." },
      { title: "Automated Optical Inspection (AOI)", body: "High-resolution multi-camera AOI systems scan 100% of boards post-reflow, detecting solder bridging, tombstoning, and component misalignment." },
      { title: "Precision Thermal Profiling", body: "Continuous KIC profiling ensures optimal reflow temperature ramps to protect sensitive semiconductor junctions while guaranteeing void-free solder joints." }
    ]
  },
  {
    slug: "assembly-packing",
    title: "Assembly & Packing",
    tagline: "Systematic conveyor assembly, automated testing and bulk packaging.",
    description: "Sheetal Electrotech’s assembly and packing operation supports batten, panel and bulb products through systematic conveyor lines, high-voltage flash testing, automated aging conveyors, and protective transit packaging.",
    image: "/images/facilities/legacy/assembly-packing.png",
    fallbackImages: ["/images/product_showcase.jpg", "/images/facilities/assembly-packing.webp"],
    specs: [
      { label: "Testing Station", value: "Automated High-Voltage Flash & Earth Bond" },
      { label: "Aging Line", value: "Rotary & Conveyor Continuous Voltage Stress Aging" },
      { label: "Packaging Standards", value: "Heavy-Duty Corrugated Master Cartons with Drop Protection" },
      { label: "Daily Throughput", value: "Multi-Shift High-Volume Capability" }
    ],
    materials: ["Die-Cut EPE Foam Inserts", "Corrugated Shipping Cartons", "Anti-Static Protective Sleeves", "Barcode Tracking Labels"],
    applications: ["LED Bulbs & Battens", "Slim Downlights & 2x2 Panels", "Street Light & Flood Fixtures"],
    highlights: [
      { title: "Conveyorized Flow Line", body: "Balanced sequential workstations streamline assembly from driver wiring to ultrasonic diffuser snap-fitting with minimal material handling." },
      { title: "100% Electrical Burn-In Aging", body: "Every luminaire runs through cyclic on/off voltage surges on the automated aging carousel to catch early infant mortality before boxing." },
      { title: "Safe Transit Packaging", body: "Drop-tested packaging engineering ensures zero damage during domestic logistics and international export freight." }
    ]
  },
  {
    slug: "tool-room",
    title: "Tool Room",
    tagline: "In-house mould design, CNC milling, wire-cut EDM and precision die maintenance.",
    description: "Our fully equipped tool room designs and manufactures moulds in-house using CNC machining centers, spark erosion EDM, surface grinding and CMM inspection, supporting fast-track prototyping and guaranteed tooling longevity.",
    image: "/images/tool_room.jpg",
    fallbackImages: ["/images/facilities/tool-room.webp", "/images/moulding_factory.jpg"],
    heading: "In-House Precision Tool Room & Mould Engineering",
    capacityNote: "Equipped with CNC Vertical Machining Centers, Die Sinking EDM, precision grinding, and radial drill presses for multi-cavity injection moulds, blow moulds, and extrusion profile dies.",
    specs: [
      { label: "CNC Machining Centers", value: "High-Speed 3-Axis & 4-Axis VMC" },
      { label: "Spark Erosion Precision", value: "CNC Die Sinking & Wire Cut EDM" },
      { label: "Tool Steels", value: "Hardened P20, DIN 1.2316 & H13" },
      { label: "Machining Tolerance", value: "±0.01 mm Ultra-Precision" }
    ],
    materials: [
      "P20 Pre-Hardened Tool Steel",
      "DIN 1.2316 Corrosion-Resistant Stainless Steel",
      "H13 Hot-Work Die Steel",
      "Aluminium 7075-T6 Tooling Plate",
      "Beryllium Copper High-Conductivity Inserts"
    ],
    applications: [
      "Multi-Cavity Hot Runner Plastic Injection Moulds",
      "Extrusion Profile Calibration Dies for Battens",
      "Accumulator Head Blow Moulds for Bottles & Cans",
      "Precision Punching & Trimming Fixtures",
      "Custom CMM Quality Inspection Gauges"
    ],
    highlights: [
      {
        title: "End-to-End In-House Tooling Lifecycle",
        body: "From 3D CAD modeling and mould flow simulation to CNC machining, EDM sparking, and final bench assembly, our entire tooling lifecycle is controlled in-house, cutting development lead times by weeks."
      },
      {
        title: "Multi-Cavity High-Speed Tooling",
        body: "Engineered for high-volume production with balanced hot-runner manifold systems and optimized conformal cooling channels for rapid cycle times and zero dimensional distortion."
      },
      {
        title: "Preventive Tool Maintenance",
        body: "All production dies and moulds undergo ultrasonic cleaning, cavity polishing, and preventive maintenance after each production campaign, ensuring zero flash and consistent part geometry across millions of shots."
      }
    ]
  }
];
