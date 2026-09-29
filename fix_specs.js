const fs = require('fs');
const path = require('path');

function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walkDir(fullPath));
    } else if (file === 'page.tsx') {
      results.push(fullPath);
    }
  });
  return results;
}

const files = walkDir('src/app/[locale]/products');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('specs: [')) {
    // We want to replace the specs array and applications array with empty arrays
    // Regex to match specs: [\s\S]*?],
    content = content.replace(/specs:\s*\[[\s\S]*?\],/g, 'specs: [],');
    content = content.replace(/applications:\s*\[[\s\S]*?\]/g, 'applications: []');
    
    // Also, for the ones using t("p0_s0_l") etc in the template string, just empty them.
    fs.writeFileSync(file, content, 'utf8');
  }
});

console.log("Cleared fake specs and apps.");
