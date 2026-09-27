const https = require('https');
const fs = require('fs');

const url = "https://sheetalelectrotech.com/led-street-light-2/";

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('street_light_html.txt', data);
    console.log("Saved to street_light_html.txt");
  });
}).on('error', console.error);
