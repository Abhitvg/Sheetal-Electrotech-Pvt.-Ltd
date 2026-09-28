export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  image: string;
  readTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "vertical-integration-advantage",
    title: "Why Vertical Integration Gives You a Competitive Edge in LED Manufacturing",
    excerpt: "Discover how controlling every production stage — from injection moulding to final assembly — reduces costs, improves quality, and slashes lead times for OEM buyers.",
    content: `
## The Problem with Multi-Vendor Supply Chains

Most LED lighting brands rely on 3-5 different suppliers for components: one for plastic housings, another for PCBs, another for drivers, and yet another for final assembly. Each handoff introduces:

- **Quality inconsistency** — different suppliers have different QC standards
- **Communication overhead** — coordinating across multiple vendors burns time
- **Extended lead times** — sequential dependencies create bottlenecks
- **Hidden costs** — logistics between vendors, quality rejections, and rework

## The Sheetal Electrotech Approach

At Sheetal Electrotech, we've invested 25+ years in building a truly vertically integrated manufacturing ecosystem. Under one 50,000+ sq. ft. roof in Daman, we operate:

1. **Injection Moulding (80T–160T)** — We mould our own housings, diffusers, and packaging
2. **SMT & Auto Insertion** — Fuji and Hanwha high-speed lines for PCB assembly
3. **Manual Insertion** — For through-hole components
4. **Assembly Lines** — Automated and semi-automated final assembly
5. **Testing Lab** — 100% quality control with BIS and ISO certification
6. **Tool Room** — In-house mould design and rapid prototyping

## The Results

Our clients consistently report:
- **30-40% shorter lead times** compared to multi-vendor setups
- **15-20% lower total cost** when accounting for logistics and rejection rates
- **Near-zero defect rates** thanks to end-to-end quality control

## Conclusion

When you choose a vertically integrated partner, you're not just buying components — you're buying predictability, quality, and speed. That's the Sheetal Electrotech advantage.
    `,
    date: "2026-09-15",
    author: "Sheetal Electrotech Team",
    category: "Manufacturing",
    image: "/images/moulding_factory.jpg",
    readTime: "5 min read",
  },
  {
    slug: "smt-quality-control",
    title: "How Our SMT Lines Achieve 99.97% First-Pass Yield",
    excerpt: "An inside look at our automated optical inspection, reflow profiling, and statistical process control that delivers near-perfect electronics assembly.",
    content: `
## The Challenge of High-Volume Electronics

Surface Mount Technology (SMT) assembly at scale is unforgiving. When you're placing 170,000+ components per hour, even a 0.1% defect rate means hundreds of faulty boards daily.

## Our SMT Process

### Pick and Place
Our Fuji and Hanwha pick-and-place machines achieve placement accuracy of ±0.03mm. Component feeders are bar-code verified to prevent wrong-part errors.

### Reflow Soldering
Thermal profiling is calibrated for each product variant. Our nitrogen-atmosphere reflow ovens reduce oxidation and improve solder joint quality.

### Automated Optical Inspection (AOI)
Every board passes through AOI machines that check for:
- Missing components
- Tombstoning
- Insufficient solder
- Bridging
- Polarity errors

### Statistical Process Control
Real-time SPC charts track key metrics. Any drift triggers immediate alerts, allowing our engineers to adjust before defects occur.

## The Result: 99.97% First-Pass Yield

This systematic approach delivers a first-pass yield of 99.97% — meaning fewer than 3 boards per 10,000 require rework. For our OEM clients, this translates directly to lower costs and faster delivery.
    `,
    date: "2026-09-01",
    author: "Engineering Team",
    category: "Quality",
    image: "/images/smt_electronics.jpg",
    readTime: "4 min read",
  },
  {
    slug: "led-lighting-trends-2026",
    title: "LED Lighting Trends for 2026: What OEM Buyers Need to Know",
    excerpt: "From smart lighting integration to sustainable packaging, here are the key trends shaping the LED manufacturing industry this year.",
    content: `
## 1. Smart Lighting Goes Mainstream

WiFi and Bluetooth-enabled LED bulbs are no longer premium-only. Our smart bulb line now includes budget-friendly options with app control, voice assistant compatibility, and scheduling features.

## 2. Higher Efficacy, Lower Cost

LED chip efficiency continues to improve. Our latest 9W bulb delivers the same 900 lumens as our previous 12W model, reducing material costs and enabling more competitive pricing.

## 3. Sustainable Packaging

Buyers increasingly demand recyclable packaging. We've transitioned our standard packaging to FSC-certified cardboard with soy-based inks, reducing plastic use by 60%.

## 4. Customization at Scale

OEM buyers want differentiated products. Our in-house tool room enables custom housing designs with MOQs as low as 5,000 units — making differentiation accessible to mid-sized brands.

## 5. Export Market Growth

International demand for Indian-manufactured LED products is surging, driven by competitive pricing and improving quality perceptions. Our BIS and export certifications position us well for this trend.

## What This Means for You

If you're sourcing LED lighting products in 2026, prioritize partners who can offer smart variants, sustainable packaging, and customization flexibility. That's exactly what we've built our facility to deliver.
    `,
    date: "2026-08-20",
    author: "Business Development",
    category: "Industry",
    image: "/images/product_showcase.jpg",
    readTime: "3 min read",
  },
];
