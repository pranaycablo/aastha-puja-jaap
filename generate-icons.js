import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const svgPath = path.resolve('public', 'logo.svg');
const svgBuffer = fs.readFileSync(svgPath);

const targets = [
  // Web / PWA
  { path: 'public/icon-512.png', size: 512 },
  { path: 'public/icon-192.png', size: 192 },
  { path: 'public/favicon.png', size: 64 },

  // Android Mipmaps
  { path: 'android/app/src/main/res/mipmap-mdpi/ic_launcher.png', size: 48 },
  { path: 'android/app/src/main/res/mipmap-mdpi/ic_launcher_round.png', size: 48 },
  { path: 'android/app/src/main/res/mipmap-mdpi/ic_launcher_foreground.png', size: 108 },

  { path: 'android/app/src/main/res/mipmap-hdpi/ic_launcher.png', size: 72 },
  { path: 'android/app/src/main/res/mipmap-hdpi/ic_launcher_round.png', size: 72 },
  { path: 'android/app/src/main/res/mipmap-hdpi/ic_launcher_foreground.png', size: 162 },

  { path: 'android/app/src/main/res/mipmap-xhdpi/ic_launcher.png', size: 96 },
  { path: 'android/app/src/main/res/mipmap-xhdpi/ic_launcher_round.png', size: 96 },
  { path: 'android/app/src/main/res/mipmap-xhdpi/ic_launcher_foreground.png', size: 216 },

  { path: 'android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png', size: 144 },
  { path: 'android/app/src/main/res/mipmap-xxhdpi/ic_launcher_round.png', size: 144 },
  { path: 'android/app/src/main/res/mipmap-xxhdpi/ic_launcher_foreground.png', size: 324 },

  { path: 'android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png', size: 192 },
  { path: 'android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.png', size: 192 },
  { path: 'android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_foreground.png', size: 432 },
];

async function generate() {
  console.log('Generating high-res divine icons...');
  for (const t of targets) {
    const fullPath = path.resolve(t.path);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    await sharp(svgBuffer)
      .resize(t.size, t.size)
      .png()
      .toFile(fullPath);
    console.log(`Generated: ${t.path} (${t.size}x${t.size})`);
  }
  console.log('All icons generated successfully!');
}

generate().catch(console.error);
