const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const srcImage = 'C:/Users/HP/.gemini/antigravity/brain/2d0e51ce-df97-47ad-808e-969bfd498a7f/.user_uploaded/media_1794489835835_c7786c75.jpg';

async function generate() {
  if (!fs.existsSync(srcImage)) {
    console.error('Source image does not exist:', srcImage);
    process.exit(1);
  }

  console.log('Source image exists. Processing with sharp...');

  // 1. Web assets in public/
  await sharp(srcImage).resize(512, 512).png().toFile('public/app-logo-3d.png');
  await sharp(srcImage).resize(512, 512).png().toFile('public/icon-512.png');
  await sharp(srcImage).resize(192, 192).png().toFile('public/icon-192.png');
  await sharp(srcImage).resize(64, 64).png().toFile('public/favicon.png');
  console.log('Public assets generated.');

  // 2. Android mipmaps
  const mipmaps = [
    { dir: 'mipmap-mdpi', size: 48, fgSize: 108 },
    { dir: 'mipmap-hdpi', size: 72, fgSize: 162 },
    { dir: 'mipmap-xhdpi', size: 96, fgSize: 216 },
    { dir: 'mipmap-xxhdpi', size: 144, fgSize: 324 },
    { dir: 'mipmap-xxxhdpi', size: 192, fgSize: 432 },
  ];

  for (const m of mipmaps) {
    const targetDir = path.join('android', 'app', 'src', 'main', 'res', m.dir);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // Standard square launcher
    await sharp(srcImage).resize(m.size, m.size).png().toFile(path.join(targetDir, 'ic_launcher.png'));

    // Round launcher
    await sharp(srcImage).resize(m.size, m.size).png().toFile(path.join(targetDir, 'ic_launcher_round.png'));

    // Adaptive icon foreground
    await sharp(srcImage).resize(m.fgSize, m.fgSize).png().toFile(path.join(targetDir, 'ic_launcher_foreground.png'));

    console.log(`Updated ${m.dir}`);
  }

  console.log('All 3D icons generated successfully!');
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
