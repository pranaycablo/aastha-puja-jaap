# -*- coding: utf-8 -*-
"""
Fix splash screen icon and images to strictly adhere to Android 12+ SplashScreen safe zone:
- Icon window: 512x512 px
- Safe zone circle: diameter 290 px (56.6% of 512), completely avoiding any circular mask clipping
- Generates clean, crisp splash screens for all densities with sacred ivory background #FFFDF9
"""

import os
from PIL import Image, ImageDraw, ImageOps

BG_COLOR = (255, 253, 249, 255) # #FFFDF9

# Load master logo
master_path = 'public/logo.png'
if not os.path.exists(master_path):
    print("Master logo not found at public/logo.png!")
    exit(1)

master_logo = Image.open(master_path).convert("RGBA")
print(f"Loaded master logo: {master_logo.size}")

# 1. Create Android 12+ splash_icon.png (512x512)
# Android 12 enforces a circular mask with diameter = 160/288 = 55.55%
# To guarantee 0% clipping, logo diameter should be <= 285px
icon_size = 512
safe_diameter = 280
splash_icon = Image.new("RGBA", (icon_size, icon_size), (0, 0, 0, 0))

# Resize master logo with smooth LANCZOS
resized_logo = master_logo.resize((safe_diameter, safe_diameter), Image.Resampling.LANCZOS)

# Create a rounded mask for the logo so its corners are smooth and elegant
mask = Image.new('L', (safe_diameter, safe_diameter), 0)
draw = ImageDraw.Draw(mask)
corner_radius = 42
draw.rounded_rectangle([(0, 0), (safe_diameter, safe_diameter)], radius=corner_radius, fill=255)

# Paste centered
pos = ((icon_size - safe_diameter) // 2, (icon_size - safe_diameter) // 2)
splash_icon.paste(resized_logo, pos, mask)

# Save splash_icon.png and splash_logo.png
splash_icon.save('android/app/src/main/res/drawable/splash_icon.png', 'PNG')
print("Saved android/app/src/main/res/drawable/splash_icon.png (with safe circular zone)")

# Also create splash_logo.png
splash_logo = Image.new("RGBA", (512, 512), (0, 0, 0, 0))
splash_logo.paste(resized_logo, pos, mask)
splash_logo.save('android/app/src/main/res/drawable/splash_logo.png', 'PNG')

# 2. Function to generate portrait splash screen
def create_portrait_splash(width, height):
    img = Image.new("RGBA", (width, height), BG_COLOR)
    # Target logo width: ~42% of screen width, max 450px, min 140px
    target_w = max(140, min(int(width * 0.42), 460))
    target_h = target_w
    
    logo_scaled = master_logo.resize((target_w, target_h), Image.Resampling.LANCZOS)
    
    # Rounded corners for elegant appearance
    corner_r = int(target_w * 0.16)
    m = Image.new('L', (target_w, target_h), 0)
    d = ImageDraw.Draw(m)
    d.rounded_rectangle([(0, 0), (target_w, target_h)], radius=corner_r, fill=255)
    
    # Center slightly above middle (golden ratio: 45% from top)
    pos_x = (width - target_w) // 2
    pos_y = int(height * 0.42) - (target_h // 2)
    
    img.paste(logo_scaled, (pos_x, pos_y), m)
    return img

# Function to generate landscape splash screen
def create_landscape_splash(width, height):
    img = Image.new("RGBA", (width, height), BG_COLOR)
    target_h = max(140, min(int(height * 0.45), 400))
    target_w = target_h
    logo_scaled = master_logo.resize((target_w, target_h), Image.Resampling.LANCZOS)
    corner_r = int(target_w * 0.16)
    m = Image.new('L', (target_w, target_h), 0)
    d = ImageDraw.Draw(m)
    d.rounded_rectangle([(0, 0), (target_w, target_h)], radius=corner_r, fill=255)
    pos_x = (width - target_w) // 2
    pos_y = (height - target_h) // 2
    img.paste(logo_scaled, (pos_x, pos_y), m)
    return img

# Generate portrait splash screens
splash_portrait_configs = [
    ('android/app/src/main/res/drawable/splash.png', 1080, 1920),
    ('android/app/src/main/res/drawable-port-hdpi/splash.png', 480, 800),
    ('android/app/src/main/res/drawable-port-mdpi/splash.png', 320, 480),
    ('android/app/src/main/res/drawable-port-xhdpi/splash.png', 720, 1280),
    ('android/app/src/main/res/drawable-port-xxhdpi/splash.png', 960, 1600),
    ('android/app/src/main/res/drawable-port-xxxhdpi/splash.png', 1280, 1920)
]

for path, w, h in splash_portrait_configs:
    os.makedirs(os.path.dirname(path), exist_ok=True)
    splash_img = create_portrait_splash(w, h)
    splash_img.save(path, 'PNG')
    print(f"Generated {path} ({w}x{h})")

# Generate landscape splash screens
splash_land_configs = [
    ('android/app/src/main/res/drawable-land-hdpi/splash.png', 800, 480),
    ('android/app/src/main/res/drawable-land-mdpi/splash.png', 480, 320),
    ('android/app/src/main/res/drawable-land-xhdpi/splash.png', 1280, 720),
    ('android/app/src/main/res/drawable-land-xxhdpi/splash.png', 1600, 960),
    ('android/app/src/main/res/drawable-land-xxxhdpi/splash.png', 1920, 1280)
]

for path, w, h in splash_land_configs:
    os.makedirs(os.path.dirname(path), exist_ok=True)
    splash_img = create_landscape_splash(w, h)
    splash_img.save(path, 'PNG')
    print(f"Generated {path} ({w}x{h})")

print("All splash screens fixed and generated successfully!")
