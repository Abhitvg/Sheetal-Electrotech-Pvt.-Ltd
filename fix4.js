const fs = require('fs');

function replace(file, search, replaceStr) {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes(search)) {
    content = content.replace(search, replaceStr);
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated', file);
  } else {
    console.log('Not found in', file, ':', search);
  }
}

replace(
  'messages/en.json',
  '"subtitle": "Whether you need 5,000 units or 500,000 — our vertically integrated facility is ready. Get a custom quote with pricing and lead time estimates in 24 hours."',
  '"subtitle": "Whether you are developing a new product or scaling an existing production requirement, our manufacturing team can work with your specifications. Submit your requirements and our team will get back to you with the next steps."'
);

replace(
  'messages/hi.json',
  '"subtitle": "चाहे आपको 5,000 यूनिट्स चाहिए या 500,000 — हमारी सुविधा तैयार है। 24 घंटे में मूल्य निर्धारण और समय का अनुमान प्राप्त करें।"',
  '"subtitle": "चाहे आप एक नया उत्पाद विकसित कर रहे हों या मौजूदा उत्पादन आवश्यकता को बढ़ा रहे हों, हमारी विनिर्माण टीम आपके विनिर्देशों के साथ काम कर सकती है। अपनी आवश्यकताएं सबमिट करें और हमारी टीम अगले चरणों के साथ आपसे संपर्क करेगी।"'
);

