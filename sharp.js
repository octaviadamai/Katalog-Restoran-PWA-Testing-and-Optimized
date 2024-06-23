const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const target = path.resolve(__dirname, 'src/public/images');
const destination = path.resolve(__dirname, 'src/public/images');

fs.readdirSync(target).forEach((image) => {
  sharp(`${target}/${image}`)
    .resize(1200)
    .toFile(path.resolve(__dirname, `${destination}/${image.split('.').slice(0, -1).join('.')}-large.jpg`));

  sharp(`${target}/${image}`)
    .resize(650)
    .toFile(path.resolve(__dirname, `${destination}/${image.split('.').slice(0, -1).join('.')}-medium.jpg`));

  sharp(`${target}/${image}`)
    .resize(480)
    .toFile(path.resolve(__dirname, `${destination}/${image.split('.').slice(0, -1).join('.')}-small.jpg`));

  sharp(`${target}/${image}`).toFile(path.resolve(__dirname, `${destination}/${image.split('.').slice(0, -1).join('.')}.jpg`));
});
