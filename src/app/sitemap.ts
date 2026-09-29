import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.sheetalelectrotech.com';
  const locales = ['en', 'hi'];
  
  const routes = [
    '',
    '/company',
    '/products',
    '/products/led-lighting',
    '/products/rigid-packaging',
    '/facilities',
    '/facilities/injection-moulding',
    '/facilities/blow-moulding',
    '/facilities/ibm-plastic',
    '/facilities/smt',
    '/facilities/assembly',
    '/facilities/manual-insertion',
    '/facilities/laser-machine',
    '/facilities/tool-room',
    '/quality',
    '/careers',
    '/blog',
    '/contact',
    '/rfq',
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
