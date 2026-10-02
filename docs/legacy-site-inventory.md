# Legacy Site Inventory & Migration Map

Generated from the completed official-site extraction on 2026-10-02T09:40:26.705Z.

**50 pages crawled · 490 unique images downloaded · 0 image download failures.**

Source: `https://sheetalelectrotech.com/` (official Sheetal Electrotech site).

## Page inventory

| Legacy URL | Title | Images | New destination |
|---|---|---:|---|
| / | Sheetal Electrotech– Solving Complex Manufacturing Challenges With Ease | 53 | /en |
| /about-us | About Us – Sheetal Electrotech Private Limited | 7 | /en/company |
| /assembly-and-packing | Assembly And Packing – Sheetal Electrotech Private Limited | 18 | /en/facilities/assembly-packing |
| /benefits-of-led | Benefits Of LED – Sheetal Electrotech Private Limited | 23 | /en/insights/benefits-of-led-lighting |
| /blog | Blog – Sheetal Electrotech Private Limited | 149 | /en/insights |
| /careers | Careers – Sheetal Electrotech Private Limited | 4 | /en/careers |
| /comparision | Comparison – Sheetal Electrotech Private Limited | 8 | /en/insights |
| /comparison |  | 0 | Needs mapping |
| /contact | Contact – Sheetal Electrotech Private Limited | 4 | /en/contact |
| /extension-board | Extension Board – Sheetal Electrotech Private Limited | 13 | /en/products/electronics/extension-boards |
| /extrusion-product-work-with-sheetal-electrotech | Extrusion Product Work With Sheetal Electrotech – Sheetal Electrotech Private Limited | 18 | /en/facilities/extrusion |
| /facilites | Facilites – Sheetal Electrotech Private Limited | 18 | /en/facilities |
| /facts | FACTS – Sheetal Electrotech Private Limited | 4 | /en/insights |
| /injection-blow-moulding-work-with-sheetal-electrotech | Injection Blow Moulding Work With Sheetal Electrotech. – Sheetal Electrotech Private Limited | 7 | /en/facilities/ibm-plastic |
| /injection-moulding | Why Sheetal Electrotech For Plastic Injection Moulding? – Sheetal Electrotech Private Limited | 8 | /en/facilities/injection-moulding |
| /know-about-colors | Know About Colors – Sheetal Electrotech Private Limited | 6 | /en/insights |
| /know-about-products-safety | Know About Products Safety – Sheetal Electrotech Private Limited | 11 | /en/insights |
| /laser-machine |  | 0 | Needs mapping |
| /lazer-machine |  | 0 | Needs mapping |
| /led-batten | Led Batten – Sheetal Electrotech Private Limited | 9 | /en/products/led-lighting/battens |
| /led-bulb-2 | Led Bulb-2 – Sheetal Electrotech Private Limited | 14 | /en/products/led-lighting/bulbs |
| /led-bulb | Led Bulb – Sheetal Electrotech Private Limited | 14 | /en/products/led-lighting/bulbs |
| /led-candle-bulb | Led Candle Bulb – Sheetal Electrotech Private Limited | 8 | /en/products/led-lighting/bulbs |
| /led-ceiling-light | Led Ceiling Light – Sheetal Electrotech Private Limited | 7 | /en/products/led-lighting/downlights |
| /led-decorative-light | Led Decorative Light – Sheetal Electrotech Private Limited | 10 | /en/products/led-lighting/decorative-lights |
| /led-down-light-3 | Led Down Light - 3 – Sheetal Electrotech Private Limited | 18 | /en/products/led-lighting/downlights |
| /led-down-light | Led Down Light – Sheetal Electrotech Private Limited | 13 | /en/products/led-lighting/downlights |
| /led-down-lighter-2 |  | 0 | Needs mapping |
| /led-down-lighter | Led Down Lighter – Sheetal Electrotech Private Limited | 18 | /en/products/led-lighting/downlights |
| /led-emergency-bulb | Led Emergency Bulb – Sheetal Electrotech Private Limited | 9 | /en/products/led-lighting/bulbs |
| /led-flood-well-light | Led Flood & Well Light – Sheetal Electrotech Private Limited | 8 | /en/products/led-lighting/flood-lights |
| /led-gyan | Led Gyan – Sheetal Electrotech Private Limited | 5 | /en/insights |
| /led-high-power-batten | Led High Power Batten – Sheetal Electrotech Private Limited | 16 | /en/products/led-lighting/battens |
| /led-high-power-bulb | Led High Power Bulb – Sheetal Electrotech Private Limited | 7 | /en/products/led-lighting/bulbs |
| /led-spot-g9-bulb |  | 0 | Needs mapping |
| /led-spot-light | Led Spot Light – Sheetal Electrotech Private Limited | 16 | /en/products/led-lighting/spot-lights |
| /led-street-light-2 | Led Street Light – Sheetal Electrotech Private Limited | 12 | /en/products/led-lighting/street-lights |
| /led-strip-lights | Led Strip Lights – Sheetal Electrotech Private Limited | 7 | /en/products/led-lighting/strip-lights |
| /manualinsertion | Manual Insertion – Sheetal Electrotech Private Limited | 17 | /en/facilities/manual-insertion |
| /manufacturing-units | Manufacturing Units – Sheetal Electrotech Private Limited | 6 | /en/facilities |
| /need-to-know-about-leds | Need To Know About LEDs – Sheetal Electrotech Private Limited | 4 | /en/insights |
| /plastic-blow-moulding | Plastic Blow Moulding – Sheetal Electrotech Private Limited | 5 | /en/facilities/blow-moulding |
| /privacy-policy | Privacy Policy – Sheetal Electrotech Private Limited | 4 | /en/privacy |
| /products | Products – Sheetal Electrotech Private Limited | 118 | /en/products |
| /research | Research & Development – Sheetal Electrotech Private Limited | 18 | /en/facilities/research-development |
| /smart-led-bulb | Smart Led Bulb – Sheetal Electrotech Private Limited | 10 | /en/products/led-lighting/smart-led |
| /smt-machine | SMT Machine – Sheetal Electrotech Private Limited | 19 | /en/facilities/smt |
| /what-is-ip | What Is IP? – Sheetal Electrotech Private Limited | 22 | /en/insights |
| /what-is-lumens | What Is LUMENS? – Sheetal Electrotech Private Limited | 7 | /en/insights |
| /what-is-right-light | What Is Right Light? – Sheetal Electrotech Private Limited | 12 | /en/insights |

## Migration implementation status — 2026-10-02

The completed extraction archive is now wired into the application in these areas:

- `src/data/legacyMedia.ts`: selected official legacy image sets for facilities, products, insights, company photography and gallery presentation.
- Facility detail pages: official legacy photography galleries, with the relevant manufacturing capability's source images presented alongside the modern page.
- Product subcategory pages: official legacy product images added as source thumbnails alongside the modern catalogue presentation.
- Insights: legacy knowledge content migrated into the current insight posts for LED benefits, beam angles, CCT, IP ratings, lumens, manual insertion, R&D, and IBM; BIS safety content is also represented as a dedicated insight.
- Gallery: official legacy imagery is filterable by Facilities, Products and Knowledge.
- Legacy URL preservation: legacy product, facility, blog/knowledge and company URLs now redirect permanently to their localized modern destinations where a destination exists.
- Rigid packaging: category imagery now uses official manufacturing photography from the legacy blow moulding, IBM and injection moulding sources instead of generic/LED imagery.

### Automated verification

GitHub Actions workflow `Next.js Build Check` was added to run `npm ci` and `npm run build` on pushes and pull requests to `main`.

A prior post-migration build completed successfully at commit `98a33d8a8d95fb4302a629e2735c971037ef5228`. Subsequent content/media changes are being checked by the latest workflow run before deployment verification.
