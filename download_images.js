const https = require('https');
const fs = require('fs');
const path = require('path');

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

function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

async function run() {
  for (const [id, url] of Object.entries(urls)) {
    try {
      console.log(`Fetching ${url}...`);
      const html = await fetchUrl(url);
      const match = html.match(/<meta property="og:image" content="([^"]+)"/);
      if (match && match[1]) {
        let imageUrl = match[1];
        let ext = path.extname(imageUrl).split('?')[0];
        if (!ext) ext = '.png';
        const dest = path.join(__dirname, `public/images/${id}${ext}`);
        console.log(`Found image: ${imageUrl}. Downloading to ${dest}...`);
        await downloadImage(imageUrl, dest);
        console.log(`Success: ${id}`);
      } else {
        console.log(`No og:image found for ${id}`);
      }
    } catch (err) {
      console.error(`Error processing ${id}:`, err);
    }
  }
}

run();
