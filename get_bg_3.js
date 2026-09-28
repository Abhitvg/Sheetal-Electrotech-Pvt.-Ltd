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
  await getBg('public/images/products_led.jpg');
  await getBg('public/images/led_bulb_product.jpg');
  await getBg('public/images/smart-bulb.png');
  await getBg('public/images/down-light.png');
}
run();
