const fs = require('fs');
const path = require('path');

const src = 'C:\\Users\\selva\\.gemini\\antigravity-ide\\brain\\643ccfa5-deb9-4bd2-83c2-8358214cdf1e\\hero_namaste_clean_white_1784697881489.png';
const dest = path.join(__dirname, 'images', 'hero-namaste.png');

try {
  fs.copyFileSync(src, dest);
  console.log('Successfully updated images/hero-namaste.png with exact clean white background image!');
} catch (err) {
  console.error('Error copying file:', err);
}
