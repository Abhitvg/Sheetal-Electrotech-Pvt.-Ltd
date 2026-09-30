import { mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";

const assets = {
  "injection-moulding": {
    url: "https://sheetalelectrotech.com/wp-content/uploads/2023/04/MG_8394-768x512.jpeg",
    file: "injection-moulding.jpeg",
  },
  "ibm-plastic": {
    url: "https://sheetalelectrotech.com/wp-content/uploads/2023/05/PHOTO-2023-04-25-22-26-42-35-jpg.webp",
    file: "ibm-plastic.webp",
  },
  "manual-insertion": {
    url: "https://sheetalelectrotech.com/wp-content/uploads/2023/04/IMG_8686.png",
    file: "manual-insertion.png",
  },
  "research-development": {
    url: "https://sheetalelectrotech.com/wp-content/uploads/2023/04/IMG_8742.png",
    file: "research-development.png",
  },
  "blow-moulding": {
    url: "https://sheetalelectrotech.com/wp-content/uploads/2023/05/blow.png",
    file: "blow-moulding.png",
  },
  "smt": {
    url: "https://sheetalelectrotech.com/wp-content/uploads/2023/04/IMG_8730.png",
    file: "smt.png",
  },
  "assembly-packing": {
    url: "https://sheetalelectrotech.com/wp-content/uploads/2023/04/IMG_8803.png",
    file: "assembly-packing.png",
  },
  "extrusion-context": {
    url: "https://sheetalelectrotech.com/wp-content/uploads/2023/04/Screenshot-2023-04-15-at-11.05.08-AM.png",
    file: "extrusion-context.png",
  },
};

const root = process.cwd();
const outputDir = path.join(root, "public", "images", "facilities", "legacy");
await mkdir(outputDir, { recursive: true });

for (const [slug, asset] of Object.entries(assets)) {
  const response = await fetch(asset.url, {
    headers: { "user-agent": "Sheetal-Electrotech-asset-migration/1.0" },
  });

  if (!response.ok) {
    throw new Error(`Failed to download ${slug}: HTTP ${response.status}`);
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.startsWith("image/")) {
    throw new Error(`Unexpected content type for ${slug}: ${contentType}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  if (buffer.length < 1024) {
    throw new Error(`Downloaded file for ${slug} is unexpectedly small.`);
  }

  await writeFile(path.join(outputDir, asset.file), buffer);
}

const dataPath = path.join(root, "src", "data", "facilities.ts");
let source = await readFile(dataPath, "utf8");

for (const [slug, asset] of Object.entries(assets)) {
  const local = `/images/facilities/legacy/${asset.file}`;
  const block = new RegExp(`(slug: "${slug}"[\\s\\S]*?image: )"[^"]+"`);
  source = source.replace(block, `$1"${local}"`);
}

await writeFile(dataPath, source);
console.log("Imported official legacy facility photographs and switched facility data to local assets.");
