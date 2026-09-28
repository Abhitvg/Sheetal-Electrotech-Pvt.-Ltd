const sharp = require('sharp');
async function getBg(file) {
  try {
    const { data } = await sharp(file).extract({ left: 0, top: 0, width: 1, height: 1 }).raw().toBuffer({ resolveWithObject: true });
    console.log(file, `rgb(${data[0]}, ${data[1]}, ${data[2]})`);
  } catch(e) {
    console.log(file, 'error');
  }
}
async function run() {
  await getBg('public/images/legacy/10-3.webp');
  await getBg('public/images/legacy/4-3.webp');
  await getBg('public/images/legacy/1-3.webp');
  await getBg('public/images/legacy/3-3.webp');
  await getBg('public/images/legacy/Photo1.webp');
  await getBg('public/images/legacy/ceiling-jpg.webp');
  await getBg('public/images/legacy/exension-board-jpg.webp');
}
run();
