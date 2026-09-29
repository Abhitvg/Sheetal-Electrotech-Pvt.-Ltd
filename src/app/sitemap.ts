import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.sheetalelectrotech.com';
  const locales = ['en', 'hi'];
  
  const routes = [
    '',
    '/company',
    '/products',
    '/products/led-lighting',
    '/products/led-lighting/bulbs',
    '/products/led-lighting/battens',
    '/products/led-lighting/downlights',
    '/products/led-lighting/street-lights',
    '/products/led-lighting/flood-lights',
    '/products/led-lighting/spot-lights',
    '/products/led-lighting/decorative-lights',
    '/products/led-lighting/smart-led',
    '/products/led-lighting/strip-lights',
    '/products/electronics',
    '/products/electronics/extension-boards',
    '/products/rigid-packaging',
    '/products/rigid-packaging/bottles',
    '/products/rigid-packaging/jars',
    '/products/rigid-packaging/containers',
    '/products/rigid-packaging/custom',
    '/products/rigid-packaging/components',
    '/facilities',
    '/facilities/injection-moulding',
    '/facilities/ibm-plastic',
    '/facilities/extrusion',
    '/facilities/blow-moulding',
    '/facilities/manual-insertion',
    '/facilities/research-development',
    '/facilities/smt',
    '/facilities/assembly-packing',
    '/facilities/tool-room',
    '/quality',
    '/careers',
    '/insights',
    '/contact',
    '/rfq',
    '/led-bulb-manufacturer-india',
    '/gallery',
    '/privacy',
    '/terms'
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  routes.forEach((route) => {
    locales.forEach((locale) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
      });
    });
  });

  return sitemapEntries;
}
