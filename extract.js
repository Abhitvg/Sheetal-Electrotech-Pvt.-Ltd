const fs = require('fs');
const html = fs.readFileSync('tmp_assets/index.html', 'utf8');
const cheerio = require('cheerio');
const $ = cheerio.load(html);

let md = "# Extracted Content\n\n";

$('section, div.elementor-section').each((i, el) => {
  const text = $(el).text().replace(/\s+/g, ' ').trim();
  if (text.length > 50) {
    md += `## Section ${i}\n${text}\n\n`;
  }
});

fs.writeFileSync('tmp_assets/content.md', md);
console.log("Extracted");
