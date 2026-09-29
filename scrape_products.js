const fs = require('fs');
const https = require('https');

const urls = [
  "https://sheetalelectrotech.com/led-bulb/",
  "https://sheetalelectrotech.com/led-bulb-2/",
  "https://sheetalelectrotech.com/led-high-power-bulb/",
  "https://sheetalelectrotech.com/led-emergency-bulb/",
  "https://sheetalelectrotech.com/led-candle-bulb/",
  "https://sheetalelectrotech.com/smart-led-bulb/",
  "https://sheetalelectrotech.com/led-batten/",
  "https://sheetalelectrotech.com/led-high-power-batten/",
  "https://sheetalelectrotech.com/led-down-light/",
  "https://sheetalelectrotech.com/led-down-lighter/",
  "https://sheetalelectrotech.com/led-down-light-3/",
  "https://sheetalelectrotech.com/led-ceiling-light/",
  "https://sheetalelectrotech.com/led-street-light-2/",
  "https://sheetalelectrotech.com/led-flood-well-light/",
  "https://sheetalelectrotech.com/led-spot-light/",
  "https://sheetalelectrotech.com/led-decorative-light/",
  "https://sheetalelectrotech.com/led-strip-lights/",
  "https://sheetalelectrotech.com/extension-board/"
];

async function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', err => reject(err));
  });
}

async function scrapeAll() {
  const products = [];
  for (const url of urls) {
    try {
      const html = await fetchUrl(url);
      
      const titleMatch = html.match(/<h1[^>]*>(.*?)<\/h1>/i) || html.match(/<h2[^>]*class="elementor-heading-title"[^>]*>(.*?)<\/h2>/i);
      const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : url.split('/').filter(Boolean).pop();
      
      // Look for images
      let img = "";
      const imgMatches = html.match(/<img[^>]+src="([^">]+)"/gi);
      if (imgMatches) {
        for (const m of imgMatches) {
          if (m.includes('wp-content/uploads') && !m.includes('logo') && !m.includes('icon')) {
            const src = m.match(/src="([^">]+)"/)[1];
            if (src.match(/\.(jpg|jpeg|png|webp)$/i)) {
              img = src;
              break;
            }
          }
        }
      }

      // Try to extract specifications (li elements)
      const listMatches = html.match(/<li[^>]*>(.*?)<\/li>/gi);
      const specs = [];
      if (listMatches) {
        listMatches.forEach(li => {
          const text = li.replace(/<[^>]+>/g, '').trim();
          if (text.length > 3 && text.length < 150 && !text.includes('Menu')) {
            specs.push(text);
          }
        });
      }

      products.push({
        url,
        title,
        img,
        specs: specs.slice(0, 10) // Limit to top 10 relevant sounding specs
      });
      console.log(`Scraped ${title}`);
    } catch (e) {
      console.error(`Failed ${url}:`, e.message);
    }
  }
  fs.writeFileSync('legacy_products.json', JSON.stringify(products, null, 2));
  console.log("Done. Saved to legacy_products.json");
}

scrapeAll();
