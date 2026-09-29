const fs = require('fs');
const https = require('https');
const path = require('path');

const products = JSON.parse(fs.readFileSync('legacy_products.json', 'utf8'));
const outDir = path.join('public', 'images', 'products');

fs.mkdirSync(outDir, { recursive: true });

async function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}' (${res.statusCode})`));
        return;
      }
      const file = fs.createWriteStream(filename);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', err => reject(err));
  });
}

async function run() {
  for (const p of products) {
    if (p.img) {
      const ext = path.extname(new URL(p.img).pathname);
      const filename = path.join(outDir, `${p.title}${ext}`);
      try {
        await downloadImage(p.img, filename);
        console.log(`Downloaded ${filename}`);
        p.localImg = `/images/products/${p.title}${ext}`;
      } catch (e) {
        console.error(e.message);
      }
    }
  }
  fs.writeFileSync('legacy_products.json', JSON.stringify(products, null, 2));
}

run();
