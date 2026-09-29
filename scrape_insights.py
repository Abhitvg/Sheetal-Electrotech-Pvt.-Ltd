import urllib.request
from bs4 import BeautifulSoup
import json
import os
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

urls = {
    "facts": "https://sheetalelectrotech.com/facts/",
    "choosing-right": "https://sheetalelectrotech.com/choosing-right-led-light/",
    "manual-insertion": "https://sheetalelectrotech.com/manualinsertion/",
    "research": "https://sheetalelectrotech.com/research/",
    "ibm": "https://sheetalelectrotech.com/injection-blow-moulding-work-with-sheetal-electrotech/",
    "injection-moulding": "https://sheetalelectrotech.com/injection-moulding/"
}

results = {}

for name, url in urls.items():
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        html = urllib.request.urlopen(req, context=ctx).read()
        soup = BeautifulSoup(html, 'html.parser')
        
        # Try to find the main content
        content_div = soup.find('div', class_='elementor-widget-theme-post-content')
        if not content_div:
            content_div = soup.find('main')
        if not content_div:
            content_div = soup.body
            
        paragraphs = []
        for p in content_div.find_all(['p', 'h1', 'h2', 'h3', 'h4', 'li']):
            text = p.get_text(strip=True)
            if text and len(text) > 10:
                paragraphs.append(text)
                
        results[name] = paragraphs
        print(f"Scraped {name}")
    except Exception as e:
        print(f"Failed {name}: {e}")

with open('legacy_insights.json', 'w') as f:
    json.dump(results, f, indent=2)

print("Done.")
