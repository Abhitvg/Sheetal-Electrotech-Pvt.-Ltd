/**
 * Centralized company data — ONLY verified facts from the existing public site.
 * Every statistic displayed anywhere on the site MUST reference this file.
 * Do NOT add claims that are not documented on sheetalelectrotech.com or confirmed by the company.
 */

export const companyFacts = {
  experience: "25+",
  experienceLabel: "Years of Excellence",
  manufacturingArea: "30,000+",
  manufacturingAreaLabel: "Sq. Ft. Manufacturing Area",
  capabilities: "9",
  capabilitiesLabel: "In-House Capabilities",
  certifications: ["ISO 9001:2015", "BIS Certified"] as const,
} as const;

/**
 * The nine manufacturing capabilities verified from the old site.
 * Source: sheetalelectrotech.com facility pages
 */
export const manufacturingCapabilities = [
  { step: "01", title: "Injection Moulding", description: "Precision plastic injection moulding for housings, diffusers and components." },
  { step: "02", title: "Blow Moulding", description: "Blow moulded containers, bottles and packaging." },
  { step: "03", title: "Extrusion", description: "Plastic extrusion for profiles, tubes and continuous components." },
  { step: "04", title: "SMT & Electronics", description: "Surface mount technology and electronic component assembly." },
  { step: "05", title: "Manual Insertion", description: "Through-hole component insertion and hand soldering." },
  { step: "06", title: "Assembly & Packing", description: "Product assembly, testing and packaging." },
  { step: "07", title: "R&D / Product Development", description: "Product design, prototyping and development." },
  { step: "08", title: "Tool Room", description: "In-house mould and tool design and fabrication." },
  { step: "09", title: "Quality Control", description: "Testing, inspection and quality assurance." },
] as const;

/**
 * Product categories verified from the old site navigation.
 */
export const productCategories = {
  ledLighting: [
    "LED Bulbs",
    "LED Battens",
    "LED Downlights",
    "LED Street Lights",
    "LED Flood Lights",
    "LED Spot Lights",
    "LED Decorative Lights",
    "Smart LED Lighting",
  ],
  plasticPackaging: [
    "Bottles",
    "Containers",
    "Jars",
    "Custom Packaging",
    "Injection-Moulded Components",
  ],
} as const;

/**
 * Industries served — only those documented on the old site.
 */
export const industriesServed = [
  { name: "Lighting", description: "LED lighting solutions and components." },
  { name: "Electronics", description: "Electronic products and assemblies." },
  { name: "Pharmaceutical", description: "Rigid packaging for pharmaceutical applications." },
  { name: "Packaging", description: "Custom plastic packaging solutions." },
  { name: "Consumer Products", description: "Plastic and electronic consumer products." },
  
] as const;

/**
 * Leadership team — verified from sheetalelectrotech.com/about-us/
 */
export const leadershipTeam = [
  { name: "Surendra Singh", role: "Chairman of Sheetal Group", note: "Founder & visionary driving Sheetal Group's expansion and strategic direction.", photo: "/images/team/surendra-singh.png" },
  { name: "Ajay Singh", role: "CEO of Sheetal Group", note: "Leading overall corporate operations and strategic business growth.", photo: "/images/team/ajay-singh.png" },
] as const;

export const coreTeam = [
  { name: "Ishvernath Thakur", role: "CFO", note: "Overseeing financial planning, risk management, and record-keeping." },
  { name: "Prem Singh", role: "Head of Operations", note: "Managing day-to-day manufacturing operations and production efficiency." },
  { name: "Rajesh Nandola", role: "Head of Accountancy", note: "Responsible for accounting, audits, and financial reporting." },
  { name: "Pankaj S Dudhekar", role: "Head of Purchase", note: "Managing supply chain, procurement, and vendor relationships." },
  { name: "Raju Sharma", role: "Human Resource Management", note: "Fostering company culture, recruitment, and employee relations." },
  { name: "Suresh Prasad Arya", role: "Head of Research and Development", note: "Leading product innovation and engineering development." },
  { name: "Manjit Yadav", role: "Head of Quality Department", note: "Ensuring strict quality control and compliance with BIS standards." },
] as const;

/**
 * Company timeline — documented milestones only.
 * Do NOT invent achievements to fill gaps.
 */
export const companyTimeline = [
  { year: "1999", title: "Founded", body: "Sheetal Electrotech established in Daman with an initial focus on rigid plastic packaging." },
  { year: "2004", title: "LED Manufacturing Begins", body: "Early adoption of LED technology as a manufacturing focus. First OEM contracts signed." },
  { year: "2010", title: "SMT Line Commissioned", body: "First in-house Surface Mount Technology line operational, enabling vertical integration of electronics assembly." },
  { year: "2014", title: "ISO 9001 Certified", body: "Quality Management System formally certified, unlocking tier-1 OEM partnerships." },
  { year: "2018", title: "Integrated Campus", body: "Completion of the integrated Daman campus with multiple in-house manufacturing operations." },
  { year: "Today", title: "Scaling Forward", body: "Continuing to expand capabilities and onboard new OEM partners." },
] as const;
