import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const svgPath = path.resolve('public', 'logo.svg');
const svgBuffer = fs.readFileSync(svgPath);

const splashDirs = [
  'android/app/src/main/res/drawable',
  'android/app/src/main/res/drawable-port-mdpi',
  'android/app/src/main/res/drawable-port-hdpi',
  'android/app/src/main/res/drawable-port-xhdpi',
  'android/app/src/main/res/drawable-port-xxhdpi',
  'android/app/src/main/res/drawable-port-xxxhdpi',
  'android/app/src/main/res/drawable-land-mdpi',
  'android/app/src/main/res/drawable-land-hdpi',
  'android/app/src/main/res/drawable-land-xhdpi',
  'android/app/src/main/res/drawable-land-xxhdpi',
  'android/app/src/main/res/drawable-land-xxxhdpi',
];

async function generateSplash() {
  console.log('Generating seamless splash images...');
  
  // Create a 200x200 logo
  const logoBuffer = await sharp(svgBuffer)
    .resize(200, 200)
    .png()
    .toBuffer();

  for (const dir of splashDirs) {
    const fullDir = path.resolve(dir);
    if (!fs.existsSync(fullDir)) {
      fs.mkdirSync(fullDir, { recursive: true });
    }
    const outPath = path.join(fullDir, 'splash.png');

    // Create a 480x800 canvas with #FFFDF9 background and composite logo in center
    await sharp({
      create: {
        width: 480,
        height: 800,
        channels: 4,
        background: { r: 255, g: 253, b: 249, alpha: 1 } // #FFFDF9
      }
    })
      .composite([{ input: logoBuffer, gravity: 'center' }])
      .png()
      .toFile(outPath);

    console.log(`Updated splash in ${dir}`);
  }

  console.log('Seamless splash generated successfully!');
}

generateSplash().catch(console.error);
