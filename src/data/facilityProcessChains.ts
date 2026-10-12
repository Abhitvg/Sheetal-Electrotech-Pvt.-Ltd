export interface ProcessStage {
  title: string;
  description: string;
}

export interface FacilityProcessChain {
  id: string;
  slug: string;
  name: string;
  kind: string;
  role: string;
  headline: string;
  summary: string;
  cycleName: string;
  schematicType: "injection-machine" | "flow-diagram";
  stages: ProcessStage[];
  specs: [string, string][];
  feeds: string[];
  qc: string[];
}

export const FACILITY_PROCESS_CHAINS: FacilityProcessChain[] = [
  {
    id: "injection",
    slug: "injection-moulding",
    name: "Injection Moulding",
    kind: "Plastic Moulding",
    role: "Shapes precision housings, bodies, and rigid packaging components.",
    headline: "Precision injection moulding, from hardened steel tool to finished part.",
    summary:
      "High-tonnage injection moulding machines with microprocessor control produce dimensionally stable housings for LED bulbs, downlights, and rigid FMCG packaging under ISO 9001:2015 quality assurance.",
    cycleName: "Moulding Cycle",
    schematicType: "injection-machine",
    stages: [
      {
        title: "Clamp",
        description: "The moving platen closes against the fixed platen, locking the hardened steel mould shut under high clamping pressure.",
      },
      {
        title: "Inject",
        description: "Thermoplastic granules melted in the heated barrel are driven by the reciprocating screw into the mould cavity under controlled pressure.",
      },
      {
        title: "Cool",
        description: "The part sets to the precise mould geometry while integrated conformal cooling circuits dissipate thermal energy.",
      },
      {
        title: "Eject",
        description: "The mould opens, precision ejector pins advance the part, and it drops for robotic pickup, dimensional inspection, and staging.",
      },
    ],
    specs: [
      ["Process", "High-pressure plastic injection moulding"],
      ["Materials Processed", "Polycarbonate (PC), PBT, ABS, Polypropylene (PP), HDPE"],
      ["Tooling", "In-house CNC-machined hardened steel moulds"],
      ["Cycle Times", "12s – 45s depending on wall thickness"],
      ["Tolerances", "±0.05 mm precision dimensional control"],
    ],
    feeds: [
      "LED Bulb Thermally-Conductive Housings",
      "Downlight & Spotlight Bodies",
      "Rigid Packaging Jars & Containers",
      "Custom FMCG & Electrical Components",
    ],
    qc: [
      "Incoming raw polymer melt flow index (MFI) verification",
      "First-off part CMM dimensional and cosmetic inspection",
      "Continuous optical and digital wall thickness verification",
      "ISO 9001:2015 weight variance and drop-impact testing",
    ],
  },
  {
    id: "blow",
    slug: "blow-moulding",
    name: "Blow Moulding",
    kind: "Hollow Plastics",
    role: "Forms hollow bottles, containers, and chemical packaging.",
    headline: "Extrusion blow moulding for durable hollow packaging.",
    summary:
      "Continuous extrusion blow moulding forms seamless plastic containers and hollow technical parts with uniform wall thickness and leak-proof neck finishes.",
    cycleName: "Blow Cycle",
    schematicType: "flow-diagram",
    stages: [
      {
        title: "Parison Extrude",
        description: "A molten tubular plastic parison is continuously extruded downward from the die head between split mould halves.",
      },
      {
        title: "Clamp & Inflate",
        description: "Mould halves close, sealing the bottom, and a blow pin injects filtered compressed air to expand the parison against the cavity.",
      },
      {
        title: "Cool & Solidify",
        description: "Chilled water circuits cool the plastic rapidly against cavity walls, fixing wall geometry and neck threads.",
      },
      {
        title: "De-flash & Inspect",
        description: "The mould opens, automated deflashing shears top and bottom excess flash, and containers undergo optical leak testing.",
      },
    ],
    specs: [
      ["Process", "Extrusion Blow Moulding (EBM)"],
      ["Products", "Rigid bottles (50ml – 5L), agrochemical containers, pharma jars"],
      ["Materials Processed", "HDPE, LDPE, Polypropylene (PP)"],
      ["Neck Precision", "Thread gauge verified for child-resistant & tamper-evident caps"],
    ],
    feeds: [
      "Rigid Plastic Bottles",
      "Pharma & FMCG Containers",
      "Chemical & Industrial Packaging",
    ],
    qc: [
      "Continuous parison wall-thickness ultrasonic gauging",
      "Automated pressurized helium/air leak detection",
      "Cap torque and neck seal integrity verification",
      "Drop testing from 1.5m at ambient & cold temperatures",
    ],
  },
  {
    id: "ibm",
    slug: "ibm-plastic",
    name: "IBM Plastic",
    kind: "Precision Hollow Plastics",
    role: "Produces hollow parts with flash-free, high-precision neck finishes.",
    headline: "Injection blow moulding for pharmaceutical-grade containers.",
    summary:
      "Combining precision injection moulding with blow moulding, IBM creates flash-free neck threads and flawless container wall distributions in a single 3-station machine.",
    cycleName: "IBM Cycle",
    schematicType: "flow-diagram",
    stages: [
      {
        title: "Inject Preform",
        description: "Polymer is injection moulded onto core rods inside a preform cavity, creating dimensionally perfect neck threads with zero flash.",
      },
      {
        title: "Index & Blow",
        description: "The core rod indexes 120° to the blow station where air inflates the hot preform to full container volume.",
      },
      {
        title: "Cool & Strip",
        description: "The part cools, indexes to the stripping station, and is gently stripped onto a clean conveyor for camera inspection.",
      },
    ],
    specs: [
      ["Process", "3-Station Injection Blow Moulding (IBM)"],
      ["Neck Quality", "Flash-free, ISO thread tolerance, hermetic seal ready"],
      ["Materials", "HDPE, PP, Polycarbonate, PET"],
      ["Cleanliness", "Enclosed environment, oil-free pneumatics"],
    ],
    feeds: [
      "Precision Pharma Jars",
      "LED Bulb Hollow Housings",
      "Cosmetic Bottles & Dispensers",
    ],
    qc: [
      "100% optical camera neck-thread inspection",
      "Micro-orifice vacuum leak detection",
      "Gram-weight stability monitoring (±0.1g)",
    ],
  },
  {
    id: "extrusion",
    slug: "extrusion",
    name: "Extrusion",
    kind: "Continuous Profiles",
    role: "Produces continuous plastic profiles and diffusers for LED battens.",
    headline: "High-precision extrusion for continuous profiles and optical diffusers.",
    summary:
      "Continuous profile extrusion lines produce high-efficiency optical diffusers and co-extruded aluminium-plastic channels for LED linear lighting and industrial profiles.",
    cycleName: "Extrusion Line",
    schematicType: "flow-diagram",
    stages: [
      {
        title: "Hopper Feed",
        description: "Optical-grade polycarbonate pellets with UV stabilizers are fed into the barrel with gravimetric dosing.",
      },
      {
        title: "Melt & Form",
        description: "A precision single-screw extruder melts and homogeneously mixes polymer, forcing it through a profile die.",
      },
      {
        title: "Vacuum Calibrate",
        description: "The molten profile enters a vacuum calibration sizing tank with chilled water spray, freezing cross-sectional dimensions.",
      },
      {
        title: "Caterpillar Pull & Cut",
        description: "A dual-belt caterpillar hauler draws the profile smoothly to an automated planetary cut-off saw for exact lengths.",
      },
    ],
    specs: [
      ["Process", "Continuous Profile & Optical Diffuser Extrusion"],
      ["Transmittance", "88% – 92% diffused light transmission with zero LED hot-spots"],
      ["Materials", "Optical Polycarbonate, PMMA, Rigid PVC"],
      ["Length Tolerances", "Cut-to-length accuracy ±0.5 mm"],
    ],
    feeds: [
      "T5 & T8 LED Batten Diffusers",
      "Linear Trunking Channels",
      "Custom Architectural Plastic Profiles",
    ],
    qc: [
      "Continuous laser profile dimension and wall-thickness monitoring",
      "Spectrophotometer color uniformity and optical haze testing",
      "Impact resistance and thermal expansion stability tests",
    ],
  },
  {
    id: "smt",
    slug: "smt",
    name: "SMT & Electronics",
    kind: "Surface-Mount Electronics",
    role: "Populates high-density PCBAs for LED light engines and driver circuits.",
    headline: "High-speed automated surface-mount assembly with vision inspection.",
    summary:
      "Dual-lane high-speed pick-and-place lines assemble LED boards and constant-current driver electronics with solder paste inspection, multi-zone reflow, and automated optical validation.",
    cycleName: "SMT Flow",
    schematicType: "flow-diagram",
    stages: [
      {
        title: "Stencil Printing",
        description: "Automatic stencil printer applies lead-free solder paste with laser-cut stencils and dual-squeegee pressure control.",
      },
      {
        title: "Vision Pick & Place",
        description: "High-speed multi-head mounter places passive components and power ICs, followed by high-accuracy LED placement.",
      },
      {
        title: "Multi-Zone Reflow",
        description: "Board traverses an 8-zone nitrogen-purged reflow oven with precision temperature profiles preventing thermal stress.",
      },
      {
        title: "AOI & ICT Testing",
        description: "Automated Optical Inspection verifies component alignment, polarity, and solder fillets before in-circuit testing.",
      },
    ],
    specs: [
      ["Placement Speed", "Up to 45,000 components per hour (CPH)"],
      ["Components Handled", "0402 passives up to 45mm QFPs, CSP LEDs, power ICs"],
      ["PCB Types", "FR-4, Metal Core (MCPCB), CEM-1, flexible substrates"],
      ["Standards", "IPC-A-610 Class 2 & Class 3 compliance"],
    ],
    feeds: [
      "LED Bulb Engine Boards (MCPCB)",
      "Batten & Downlight Arrays",
      "High-Efficiency Constant Current Drivers",
      "IoT WiFi & Bluetooth Smart Modules",
    ],
    qc: [
      "3D Solder Paste Inspection (SPI) for volume & height",
      "Automated Optical Inspection (AOI) post-reflow",
      "100% electrical parameter and photometric flux verification",
    ],
  },
  {
    id: "manual",
    slug: "manual-insertion",
    name: "Manual Insertion",
    kind: "Through-Hole Electronics",
    role: "Handles heavy components, transformers, and low-volume custom electronics.",
    headline: "Precision through-hole assembly and wave soldering for rugged power electronics.",
    summary:
      "Trained operators place electrolytic capacitors, inductors, transformers, and terminal blocks with conveyor-fed dual-wave soldering and thorough joint verification.",
    cycleName: "Insertion Flow",
    schematicType: "flow-diagram",
    stages: [
      {
        title: "BOM Kitting",
        description: "Barcoded kits of verified components, pre-bent leads, and bare boards are delivered to static-dissipative workstations.",
      },
      {
        title: "Hand Insertion",
        description: "Skilled operators place through-hole transformers, inductors, and connectors according to color-coded visual SOPs.",
      },
      {
        title: "Wave Soldering",
        description: "Boards travel over preheaters and through dual-wave solder baths with nitrogen inerting for clean, bridging-free fillets.",
      },
      {
        title: "Lead Trim & Verify",
        description: "Automated lead shearers trim excess wire, followed by magnification inspection and continuity checks.",
      },
    ],
    specs: [
      ["Process", "Through-Hole Technology (THT) & Dual-Wave Soldering"],
      ["Best Suited For", "Heavy power transformers, high-joule MOVs, large electrolytic caps"],
      ["Solder Alloy", "Lead-Free RoHS compliant SAC305 / Sn99.3Cu0.7"],
    ],
    feeds: [
      "High-Surge LED Street Light Drivers (4kV/6kV)",
      "Industrial High-Bay Power Supplies",
      "Heavy-Duty Power Extension Boards",
    ],
    qc: [
      "ESD wrist-strap and mat resistance verification daily",
      "100% visual solder meniscus and wetting angle inspection",
      "Hi-Pot dielectric withstand isolation testing (1.5kV – 3.75kV)",
    ],
  },
  {
    id: "assembly",
    slug: "assembly-packing",
    name: "Assembly & Packing",
    kind: "Final Assembly & Testing",
    role: "Integrates housings, electronics, and diffusers into tested, packaged products.",
    headline: "Systematic conveyor assembly, aging burn-in, and final brand packaging.",
    summary:
      "Where all internal capabilities converge: precision torque assembly, potting, thermal compound application, 100% electrical aging, and custom OEM packaging.",
    cycleName: "Assembly Line",
    schematicType: "flow-diagram",
    stages: [
      {
        title: "Kit & Sub-assembly",
        description: "Moulded bodies, SMT engines, drivers, and fasteners are matched on continuous pallet conveyors.",
      },
      {
        title: "Mechanical Joining",
        description: "Thermal grease is automatically dispensed; parts are joined via pneumatic ultrasonic welding or torque drivers.",
      },
      {
        title: "High-Voltage Burn-in",
        description: "Assembled luminaires undergo continuous cycling burn-in under elevated voltage conditions to weed out infant mortality.",
      },
      {
        title: "OEM Pack & Label",
        description: "Luminaires are custom laser-marked with brand serials, packed into client-branded blister/corrugate packs, and sealed.",
      },
    ],
    specs: [
      ["Lines", "Multi-station synchronized conveyor lines with calibrated torque tools"],
      ["Burn-in Capacity", "Over 10,000 units aged daily with cycle switching"],
      ["Packaging", "Custom retail color cartons, export shippers, barcode labeling"],
    ],
    feeds: [
      "Retail-Ready LED Bulbs & Battens",
      "Commercial Downlights & Panels",
      "Municipal IP66 Street Lights",
    ],
    qc: [
      "100% automated electrical aging and power factor verification",
      "Lux/Lumen photometric and CCT color temperature testing",
      "Ground bond and high-voltage dielectric isolation check",
    ],
  },
  {
    id: "tool",
    slug: "tool-room",
    name: "Tool Room",
    kind: "Tooling & Die Engineering",
    role: "Designs, CNC-machines, and maintains moulds to keep tooling 100% in-house.",
    headline: "In-house CNC machining, EDM, and precision mould maintenance.",
    summary:
      "Owning our tool room ensures proprietary customer designs remain confidential, prototyping turnaround is rapid, and production moulds are kept in pristine condition.",
    cycleName: "Tooling Cycle",
    schematicType: "flow-diagram",
    stages: [
      {
        title: "CAD/CAM Design",
        description: "Mould designers model cavity layouts, gating systems, and conformal cooling circuits in 3D CAD/CAM software.",
      },
      {
        title: "Precision Machining",
        description: "Pre-hardened tool steel (P20/H13) is machined on high-speed CNC milling centres and mirror-finish spark EDM machines.",
      },
      {
        title: "Trial & CMM Scan",
        description: "First trial parts are moulded, scanned on Coordinate Measuring Machines, and fine-tuned for shrinkage.",
      },
      {
        title: "Preventive Care",
        description: "Moulds undergo scheduled ultrasonic cleaning, parting line refurbishment, and pin lubrication every 25,000 cycles.",
      },
    ],
    specs: [
      ["Equipment", "High-speed CNC VMCs, precision wire-EDM, surface grinders"],
      ["Steel Grades", "P20, H13, 2316 stainless for corrosive resins"],
      ["Capability", "Multi-cavity injection moulds up to 32 cavities, extrusion dies"],
    ],
    feeds: [
      "All Internal Plastic Moulding Lines",
      "Custom Client OEM Tooling Programs",
      "Rapid Prototyping & Pilot Moulds",
    ],
    qc: [
      "Tool steel hardness testing (Rockwell C scale)",
      "CMM dimensional inspection of cavity inserts (±5 microns)",
      "First Article Inspection Report (FAIR) sign-off prior to volume run",
    ],
  },
  {
    id: "rnd",
    slug: "research-development",
    name: "R&D & Engineering",
    kind: "Research & Development",
    role: "Pioneers energy-efficient optical, thermal, and electronic architectures.",
    headline: "Engineering future-ready lighting and high-performance polymer packaging.",
    summary:
      "Our Daman engineering lab bridges theoretical physics and factory-floor manufacturability, optimizing lumen efficacy, thermal dissipation, and sustainable plastics.",
    cycleName: "R&D Pathway",
    schematicType: "flow-diagram",
    stages: [
      {
        title: "Concept & Simulation",
        description: "Engineers simulate thermal dissipation (CFD) and optical ray-tracing to meet target lux and thermal junction specs.",
      },
      {
        title: "Rapid Prototyping",
        description: "3D-printed SLA resin models and quick-turn PCB prototypes are fabricated for physical fit and proof of concept.",
      },
      {
        title: "Stress Testing",
        description: "Prototypes are tested inside integrating spheres, thermal shock chambers, and surge generators up to 10kV.",
      },
      {
        title: "Production Release",
        description: "Verified designs are converted to manufacturing bills of materials, assembly SOPs, and released to tooling.",
      },
    ],
    specs: [
      ["Testing Tools", "2-Metre Integrating Sphere, Spectroradiometer, Surge Generator"],
      ["Specialties", "Thermal management, high-CRI drivers, smart BLE/WiFi mesh"],
      ["Compliance", "BIS (Bureau of Indian Standards), BEE Star Rating, CE"],
    ],
    feeds: [
      "High-Efficiency >120 lm/W Luminaires",
      "Smart App-Controlled Lighting",
      "Custom Industrial OEM Designs",
    ],
    qc: [
      "Thermal junction temperature under continuous 45°C ambient",
      "Surge immunity up to 4kV line-to-line, 6kV line-to-ground",
      "Total Harmonic Distortion (THD) < 10% on power drivers",
    ],
  },
];

export function getFacilityProcessChain(slug: string): FacilityProcessChain | undefined {
  return FACILITY_PROCESS_CHAINS.find((f) => f.slug === slug || f.id === slug);
}
