const https = require('https');
const fs = require('fs');
const urls = {
  "flood-well": "https://sheetalelectrotech.com/led-flood-well-light/",
  "spot": "https://sheetalelectrotech.com/led-spot-light/",
  "decorative": "https://sheetalelectrotech.com/led-decorative-light/",
  "ceiling": "https://sheetalelectrotech.com/led-ceiling-light/",
  "down-light": "https://sheetalelectrotech.com/led-down-light/",
  "smart-bulb": "https://sheetalelectrotech.com/smart-led-bulb/",
  "led-bulb": "https://sheetalelectrotech.com/led-bulb/",
  "led-batten": "https://sheetalelectrotech.com/led-batten/"
};

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  for (const [id, url] of Object.entries(urls)) {
    const html = await fetchUrl(url);
    const descMatch = html.match(/<p>(.*?)<\/p>/g);
    // write to a file to examine
    fs.writeFileSync(`${id}_info.txt`, html);
  }
}
run();
