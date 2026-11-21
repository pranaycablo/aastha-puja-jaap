const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const srcLogo = path.resolve('public', 'app-logo-3d.png');

async function generate() {
  if (!fs.existsSync(srcLogo)) {
    console.error('Source logo not found:', srcLogo);
    process.exit(1);
  }

  console.log('Generating perfected non-cutting icons and splash drawables from:', srcLogo);

  // 1. Android Adaptive Icons (Safe zone is 66dp in 108dp canvas = ~61%)
  // We use scale ratio 0.68 so the badge with its outer frame fits inside comfortably.
  const mipmaps = [
    { dir: 'mipmap-mdpi', size: 48, fgCanvas: 108, fgBadge: 72 },
    { dir: 'mipmap-hdpi', size: 72, fgCanvas: 162, fgBadge: 108 },
    { dir: 'mipmap-xhdpi', size: 96, fgCanvas: 216, fgBadge: 144 },
    { dir: 'mipmap-xxhdpi', size: 144, fgCanvas: 324, fgBadge: 216 },
    { dir: 'mipmap-xxxhdpi', size: 192, fgCanvas: 432, fgBadge: 288 },
  ];

  for (const m of mipmaps) {
    const targetDir = path.resolve('android', 'app', 'src', 'main', 'res', m.dir);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // A. ic_launcher.png (Legacy square launcher icon - with safe padding 85%)
    const legacySize = Math.round(m.size * 0.88);
    const legacyBadge = await sharp(srcLogo)
      .resize(legacySize, legacySize, { fit: 'contain' })
      .toBuffer();
    await sharp({
      create: {
        width: m.size,
        height: m.size,
        channels: 4,
        background: { r: 18, g: 10, b: 28, alpha: 1 } // Deep divine background matching logo
      }
    })
      .composite([{ input: legacyBadge, gravity: 'center' }])
      .png()
      .toFile(path.join(targetDir, 'ic_launcher.png'));

    // B. ic_launcher_round.png (Circular legacy icon - padded to 80% so corners never cut)
    const roundBadgeSize = Math.round(m.size * 0.78);
    const roundBadge = await sharp(srcLogo)
      .resize(roundBadgeSize, roundBadgeSize, { fit: 'contain' })
      .toBuffer();
    await sharp({
      create: {
        width: m.size,
        height: m.size,
        channels: 4,
        background: { r: 18, g: 10, b: 28, alpha: 1 }
      }
    })
      .composite([{ input: roundBadge, gravity: 'center' }])
      .png()
      .toFile(path.join(targetDir, 'ic_launcher_round.png'));

    // C. ic_launcher_foreground.png (Adaptive icon foreground - canvas fgCanvas, badge fgBadge centered with transparent background)
    const fgBadge = await sharp(srcLogo)
      .resize(m.fgBadge, m.fgBadge, { fit: 'contain' })
      .toBuffer();
    await sharp({
      create: {
        width: m.fgCanvas,
        height: m.fgCanvas,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 } // Transparent padding! Background color comes from ic_launcher_background
      }
    })
      .composite([{ input: fgBadge, gravity: 'center' }])
      .png()
      .toFile(path.join(targetDir, 'ic_launcher_foreground.png'));

    console.log(`Generated mipmap ${m.dir} with safe-zone padding.`);
  }

  // 2. Generate Dedicated Splash Drawables
  // A. res/drawable/splash_logo.png (High-res 512x512 logo for layer-list and Android 12 splash icon)
  const drawableDir = path.resolve('android', 'app', 'src', 'main', 'res', 'drawable');
  if (!fs.existsSync(drawableDir)) fs.mkdirSync(drawableDir, { recursive: true });

  await sharp(srcLogo)
    .resize(512, 512)
    .png()
    .toFile(path.join(drawableDir, 'splash_logo.png'));
  console.log('Generated res/drawable/splash_logo.png');

  // B. res/drawable/splash_icon.png for Android 12+ windowSplashScreenAnimatedIcon
  // Android 12 splash icon is masked into a circle with 160dp diameter inside a 240dp window (~66% ratio).
  // We place a 320x320 logo centered on a 480x480 transparent canvas so the circle never clips any part of the logo!
  const splashIconBadge = await sharp(srcLogo)
    .resize(320, 320, { fit: 'contain' })
    .toBuffer();
  await sharp({
    create: {
      width: 480,
      height: 480,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite([{ input: splashIconBadge, gravity: 'center' }])
    .png()
    .toFile(path.join(drawableDir, 'splash_icon.png'));
  console.log('Generated res/drawable/splash_icon.png');

  // C. Update all drawable-port-* and drawable-land-* splash.png to use the layer-list or high-res centered splash
  const splashDirs = [
    'drawable',
    'drawable-port-mdpi',
    'drawable-port-hdpi',
    'drawable-port-xhdpi',
    'drawable-port-xxhdpi',
    'drawable-port-xxxhdpi',
    'drawable-land-mdpi',
    'drawable-land-hdpi',
    'drawable-land-xhdpi',
    'drawable-land-xxhdpi',
    'drawable-land-xxxhdpi',
  ];

  // Also create a high-res centered splash bitmap for any fallback:
  // 1080x1920 with 360x360 logo centered on #FFFDF9
  const centeredSplashLogo = await sharp(srcLogo)
    .resize(380, 380, { fit: 'contain' })
    .toBuffer();

  const portraitSplash = await sharp({
    create: {
      width: 1080,
      height: 1920,
      channels: 4,
      background: { r: 255, g: 253, b: 249, alpha: 1 } // #FFFDF9
    }
  })
    .composite([{ input: centeredSplashLogo, gravity: 'center' }])
    .png()
    .toBuffer();

  for (const sDir of splashDirs) {
    const sDirPath = path.resolve('android', 'app', 'src', 'main', 'res', sDir);
    if (!fs.existsSync(sDirPath)) {
      fs.mkdirSync(sDirPath, { recursive: true });
    }
    fs.writeFileSync(path.join(sDirPath, 'splash.png'), portraitSplash);
    console.log(`Updated centered fallback in ${sDir}/splash.png`);
  }

  // 3. Web assets
  await sharp(srcLogo).resize(512, 512).png().toFile('public/icon-512.png');
  await sharp(srcLogo).resize(192, 192).png().toFile('public/icon-192.png');
  await sharp(srcLogo).resize(64, 64).png().toFile('public/favicon.png');
  console.log('Web assets updated.');

  console.log('All icons and splash assets successfully generated!');
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
