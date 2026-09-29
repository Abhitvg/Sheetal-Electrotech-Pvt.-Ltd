const fs = require('fs');

function addKeys(file, isHi) {
  let json = JSON.parse(fs.readFileSync(file, 'utf8'));
  json.Products.electronics = isHi ? "इलेक्ट्रॉनिक्स" : "Electronics & Accessories";
  json.Products.electronicsDesc = isHi ? "इन-हाउस निर्मित विश्वसनीय इलेक्ट्रॉनिक उत्पाद।" : "Reliable electronic products manufactured in-house.";
  fs.writeFileSync(file, JSON.stringify(json, null, 2));
}

addKeys('messages/en.json', false);
addKeys('messages/hi.json', true);
console.log("Added electronics keys");
