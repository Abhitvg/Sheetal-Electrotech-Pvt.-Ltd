#!/usr/bin/env node

import { mkdir, writeFile, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const ORIGIN = "https://sheetalelectrotech.com";
const HOST = new URL(ORIGIN).hostname;
const OUT = path.join(process.cwd(), "legacy-site-extract");
const PAGES = path.join(OUT, "pages");
const IMAGES = path.join(OUT, "images");
const MAX_PAGES = 250;
const MAX_IMAGE_BYTES = 25 * 1024 * 1024;

const seeds = [
  "/", "/about-us/", "/products/", "/contact/", "/careers/", "/manufacturing-units/",
  "/facts/", "/benefits-of-led/", "/know-about-colors/", "/what-is-right-light/",
  "/what-is-ip/", "/what-is-lumens/", "/know-about-products-safety/", "/comparison/",
  "/injection-moulding/", "/injection-blow-moulding-work-with-sheetal-electrotech/",
  "/extrusion-product-work-with-sheetal-electrotech/", "/manualinsertion/", "/research/",
  "/plastic-blow-moulding/", "/smt-machine/", "/assembly-and-packing/",
  "/lazer-machine/", "/laser-machine/", "/blog/", "/led-gyan/",
  "/led-batten/", "/led-high-power-batten/", "/led-decorative-light/", "/led-strip-lights/",
  "/led-bulb/", "/led-bulb-2/", "/led-high-power-bulb/", "/led-emergency-bulb/",
  "/led-candle-bulb/", "/led-spot-light/", "/led-spot-g9-bulb/", "/led-street-light-2/",
  "/led-flood-well-light/", "/extension-board/", "/led-down-light/", "/led-down-lighter/",
  "/led-down-lighter-2/", "/led-down-light-3/", "/led-ceiling-light/", "/smart-led-bulb/"
];

const imageExt = /\.(?:jpe?g|png|webp|gif|svg|avif|ico)(?:\?.*)?$/i;

function absoluteUrl(raw, base) {
  if (!raw) return null;
  raw = raw.trim().replace(/^['"]|['"]$/g, "");
  if (!raw || raw.startsWith("data:") || raw.startsWith("blob:")) return null;
  try {
    const u = new URL(raw, base);
    if (u.protocol !== "https:" && u.protocol !== "http:") return null;
    return u.toString();
  } catch {
    return null;
  }
}

function sameSite(u) {
  try {
    const url = new URL(u);
    return url.hostname === HOST || url.hostname === `www.${HOST}`;
  } catch {
    return false;
  }
}

function normalizePageUrl(raw) {
  const rawUrl = absoluteUrl(raw, ORIGIN);
  if (!rawUrl || !sameSite(rawUrl)) return null;
  const u = new URL(rawUrl);
  u.hash = "";
  u.search = "";
  if (!u.pathname.endsWith("/") && !imageExt.test(u.pathname)) u.pathname += "/";
  return u.toString();
}

function slugForUrl(url) {
  const u = new URL(url);
  let slug = u.pathname.replace(/^\//, "").replace(/\/$/, "");
  if (!slug) slug = "home";
  return slug.replace(/[^a-zA-Z0-9._-]+/g, "_").slice(0, 180);
}

function cleanText(s) {
  return s.replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<svg[\s\S]*?<\/svg>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&#8211;|&ndash;/gi, "–")
    .replace(/&#8212;|&mdash;/gi, "—")
    .replace(/&amp;/gi, "&")
    .replace(/&#8217;|&rsquo;/gi, "’")
    .replace(/&#8220;|&ldquo;/gi, "“")
    .replace(/&#8221;|&rdquo;/gi, "”")
    .replace(/\s+/g, " ")
    .trim();
}

function textToMarkdown(html) {
  let body = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, "");
  body = body.replace(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi,
    (_, level, inner) => `\n\n${"#".repeat(Number(level))} ${cleanText(inner)}\n\n`);
  body = body.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi,
    (_, inner) => `\n- ${cleanText(inner)}`);
  body = body.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi,
    (_, inner) => `\n\n${cleanText(inner)}\n\n`);
  body = body.replace(/<br\s*\/?>(?:\s*)/gi, "\n");
  return cleanText(body).replace(/\n +/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
}

function extractMeta(html, pattern) {
  const m = html.match(pattern);
  return m ? cleanText(m[1]) : "";
}

function extractImages(html, pageUrl) {
  const found = new Set();
  const attrs = ["src", "data-src", "data-lazy-src", "poster"];
  for (const attr of attrs) {
    const re = new RegExp(`${attr}\s*=\s*["']([^"']+)["']`, "gi");
    for (const m of html.matchAll(re)) {
      const u = absoluteUrl(m[1], pageUrl);
      if (u && sameSite(u) && imageExt.test(new URL(u).pathname)) found.add(u);
    }
  }
  for (const attr of ["srcset", "data-srcset"]) {
    const re = new RegExp(`${attr}\s*=\s*["']([^"']+)["']`, "gi");
    for (const m of html.matchAll(re)) {
      for (const candidate of m[1].split(",")) {
        const raw = candidate.trim().split(/\s+/)[0];
        const u = absoluteUrl(raw, pageUrl);
        if (u && sameSite(u) && imageExt.test(new URL(u).pathname)) found.add(u);
      }
    }
  }
  for (const m of html.matchAll(/url\((?:\s*["']?)([^)"']+)(?:["']?\s*)\)/gi)) {
    const u = absoluteUrl(m[1], pageUrl);
    if (u && sameSite(u) && imageExt.test(new URL(u).pathname)) found.add(u);
  }
  return [...found];
}

function extractLinks(html, pageUrl) {
  const found = new Set();
  for (const m of html.matchAll(/<a[^>]+href\s*=\s*["']([^"']+)["']/gi)) {
    const u = normalizePageUrl(m[1]);
    if (u && !imageExt.test(new URL(u).pathname)) found.add(u);
  }
  return [...found];
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      "user-agent": "Mozilla/5.0 (compatible; SheetalLegacyExtractor/1.0)",
      "accept": "text/html,application/xhtml+xml"
    },
    redirect: "follow"
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return { html: await response.text(), finalUrl: response.url, contentType: response.headers.get("content-type") || "" };
}

async function downloadImage(url) {
  const u = new URL(url);
  const ext = path.extname(u.pathname) || ".bin";
  const base = path.basename(u.pathname, ext).replace(/[^a-zA-Z0-9._-]+/g, "_").slice(0, 100) || "image";
  const hash = crypto.createHash("sha1").update(url).digest("hex").slice(0, 10);
  const outName = `${base}__${hash}${ext}`;
  const filePath = path.join(IMAGES, outName);
  if (existsSync(filePath)) return { url, file: outName, status: "already-present" };

  const response = await fetch(url, {
    headers: { "user-agent": "Mozilla/5.0 (compatible; SheetalLegacyExtractor/1.0)" },
    redirect: "follow"
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const contentType = response.headers.get("content-type") || "";
  const buffer = Buffer.from(await response.arrayBuffer());
  if (buffer.length > MAX_IMAGE_BYTES) throw new Error(`image exceeds ${MAX_IMAGE_BYTES} bytes`);
  await writeFile(filePath, buffer);
  return { url, file: outName, status: "downloaded", contentType, bytes: buffer.length };
}

await mkdir(PAGES, { recursive: true });
await mkdir(IMAGES, { recursive: true });

const queue = seeds.map(normalizePageUrl).filter(Boolean);
const queued = new Set(queue);
const visited = new Set();
const pages = [];
const imageUrls = new Set();

while (queue.length && visited.size < MAX_PAGES) {
  const url = queue.shift();
  if (!url || visited.has(url)) continue;
  visited.add(url);

  try {
    const result = await fetchText(url);
    if (!result.contentType.includes("text/html")) continue;

    const finalUrl = normalizePageUrl(result.finalUrl) || url;
    const { html } = result;
    const title = extractMeta(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
    const description = extractMeta(html, /<meta[^>]+(?:name|property)=["']description["'][^>]+content=["']([^"']*)["']/i)
      || extractMeta(html, /<meta[^>]+content=["']([^"']*)["'][^>]+(?:name|property)=["']description["']/i);
    const canonical = extractMeta(html, /<link[^>]+rel=["'][^"']*canonical[^"']*["'][^>]+href=["']([^"']+)["']/i)
      || extractMeta(html, /<link[^>]+href=["']([^"']+)["'][^>]+rel=["'][^"']*canonical[^"']*["']/i);
    const images = extractImages(html, finalUrl);
    images.forEach((u) => imageUrls.add(u));

    const text = textToMarkdown(html);
    const slug = slugForUrl(finalUrl);
    await writeFile(path.join(PAGES, `${slug}.html`), html, "utf8");
    await writeFile(path.join(PAGES, `${slug}.md`),
      `# ${title || slug}\n\nSource: ${finalUrl}\n\nDescription: ${description || "(none)"}\n\nCanonical: ${canonical || "(none)"}\n\n${text}\n`,
      "utf8"
    );

    pages.push({
      url: finalUrl,
      sourceUrl: url,
      slug,
      title,
      description,
      canonical,
      images,
      extractedAt: new Date().toISOString()
    });

    for (const link of extractLinks(html, finalUrl)) {
      if (!queued.has(link) && !visited.has(link)) {
        queued.add(link);
        queue.push(link);
      }
    }

    console.log(`PAGE ${visited.size}: ${finalUrl} [${images.length} images]`);
  } catch (error) {
    pages.push({ url, status: "failed", error: String(error), extractedAt: new Date().toISOString() });
    console.error(`FAILED: ${url}: ${String(error)}`);
  }
}

const imageManifest = [];
for (const url of imageUrls) {
  try {
    imageManifest.push(await downloadImage(url));
    console.log(`IMAGE: ${url}`);
  } catch (error) {
    imageManifest.push({ url, status: "failed", error: String(error) });
    console.error(`IMAGE FAILED: ${url}: ${String(error)}`);
  }
}

pages.sort((a,b) => a.url.localeCompare(b.url));
imageManifest.sort((a,b) => a.url.localeCompare(b.url));

await writeFile(path.join(OUT, "site-map.json"), JSON.stringify({
  origin: ORIGIN,
  generatedAt: new Date().toISOString(),
  maxPages: MAX_PAGES,
  pagesFound: pages.length,
  pages: pages.map(({url,title,description,canonical,images,status,error}) => ({url,title,description,canonical,images,status,error}))
}, null, 2));

await writeFile(path.join(OUT, "image-manifest.json"), JSON.stringify({
  origin: ORIGIN,
  generatedAt: new Date().toISOString(),
  imagesFound: imageManifest.length,
  images: imageManifest
}, null, 2));

await writeFile(path.join(OUT, "extraction-report.md"),
  `# Sheetal Electrotech legacy-site extraction\n\nGenerated: ${new Date().toISOString()}\n\nPages crawled: ${pages.length}\nImages discovered: ${imageUrls.size}\nImages downloaded: ${imageManifest.filter(x => x.status === "downloaded" || x.status === "already-present").length}\nImage failures: ${imageManifest.filter(x => x.status === "failed").length}\n\nThe extractor seeds the official site navigation, product catalogue, facilities, knowledge pages and known legacy routes, then follows same-origin links discovered in those pages. Raw HTML, cleaned Markdown text and image manifests are retained for migration/reference.\n`
);

console.log(`DONE: ${pages.length} pages, ${imageUrls.size} unique images.`);
