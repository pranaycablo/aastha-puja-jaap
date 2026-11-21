import os
import sys

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

DEITIES_DIR = os.path.join('public', 'images', 'deities')
MUDRAS_DIR = os.path.join('public', 'images', 'mudras')

def write_svg(filepath, content):
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content.strip())
    print(f"Generated: {filepath}")

# VAYU MUDRA SVG
vayu_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <radialGradient id="vayuBg" cx="50%" cy="40%" r="65%">
      <stop offset="0%" stopColor="#164E63"/>
      <stop offset="60%" stopColor="#0E7490"/>
      <stop offset="100%" stopColor="#083344"/>
    </radialGradient>
  </defs>
  <rect width="500" height="500" rx="30" fill="url(#vayuBg)"/>
  <text x="250" y="45" font-family="serif" font-size="22" font-weight="bold" fill="#FEF08A" text-anchor="middle">४. वायु मुद्रा (वात व चंचलता शमन)</text>
  <!-- 3 Straight Fingers -->
  <rect x="230" y="80" width="22" height="190" rx="11" fill="#FED7AA" stroke="#0E7490" stroke-width="2"/>
  <rect x="260" y="100" width="22" height="170" rx="11" fill="#FED7AA" stroke="#0E7490" stroke-width="2"/>
  <rect x="290" y="120" width="20" height="150" rx="10" fill="#FED7AA" stroke="#0E7490" stroke-width="2"/>
  <!-- Folded Index Finger Pressed into Thumb Base -->
  <path d="M 210 240 C 190 200 170 200 170 260 C 170 290 210 290 220 250" fill="none" stroke="#FDBA74" stroke-width="22" stroke-linecap="round"/>
  <!-- Thumb Pressing Over Index -->
  <path d="M 160 310 C 160 250 190 230 220 230" fill="none" stroke="#FED7AA" stroke-width="24" stroke-linecap="round"/>
  <circle cx="210" cy="235" r="8" fill="#22D3EE"/>
  <text x="250" y="465" font-family="serif" font-size="18" font-weight="bold" fill="#FEF08A" text-anchor="middle">तर्जनी अंगूठे की जड़ में • वात रोग व अशांति दूर करे</text>
</svg>'''

# APANA MUDRA SVG
apana_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <radialGradient id="apanaBg" cx="50%" cy="40%" r="65%">
      <stop offset="0%" stopColor="#1E1B4B"/>
      <stop offset="60%" stopColor="#2E1065"/>
      <stop offset="100%" stopColor="#0B0314"/>
    </radialGradient>
  </defs>
  <rect width="500" height="500" rx="30" fill="url(#apanaBg)"/>
  <text x="250" y="45" font-family="serif" font-size="22" font-weight="bold" fill="#FEF08A" text-anchor="middle">५. अपान मुद्रा (शुद्धिकरण व विषहरण)</text>
  <!-- Index and Little Finger Straight Up -->
  <rect x="180" y="100" width="22" height="170" rx="11" fill="#FED7AA" stroke="#EA580C" stroke-width="2"/>
  <rect x="300" y="120" width="20" height="150" rx="10" fill="#FED7AA" stroke="#EA580C" stroke-width="2"/>
  <!-- Middle + Ring Fingers Touching Thumb -->
  <path d="M 230 250 C 235 210 240 180 250 180 C 260 180 265 210 270 250" fill="none" stroke="#FDBA74" stroke-width="22" stroke-linecap="round"/>
  <path d="M 180 300 C 190 240 220 200 250 200" fill="none" stroke="#FED7AA" stroke-width="24" stroke-linecap="round"/>
  <circle cx="250" cy="195" r="8" fill="#F43F5E"/>
  <text x="250" y="465" font-family="serif" font-size="18" font-weight="bold" fill="#FEF08A" text-anchor="middle">मध्यमा + अनामिका + अंगूठा • शरीर व नाभि चक्र शुद्धि</text>
</svg>'''

# CHINMAYA MUDRA SVG
chinmaya_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <radialGradient id="chinBg" cx="50%" cy="40%" r="65%">
      <stop offset="0%" stopColor="#1E1B4B"/>
      <stop offset="60%" stopColor="#0F172A"/>
      <stop offset="100%" stopColor="#020617"/>
    </radialGradient>
  </defs>
  <rect width="500" height="500" rx="30" fill="url(#chinBg)"/>
  <text x="250" y="45" font-family="serif" font-size="22" font-weight="bold" fill="#FEF08A" text-anchor="middle">६. चिन्मय मुद्रा (प्राण संचय)</text>
  <!-- Gyan Circle with Thumb and Index -->
  <circle cx="230" cy="190" r="45" fill="none" stroke="#FED7AA" stroke-width="22"/>
  <circle cx="245" cy="165" r="8" fill="#F59E0B"/>
  <!-- Remaining 3 Fingers Curled into Palm -->
  <ellipse cx="300" cy="240" rx="30" ry="40" fill="#FED7AA" stroke="#EA580C" stroke-width="2"/>
  <text x="250" y="465" font-family="serif" font-size="18" font-weight="bold" fill="#FEF08A" text-anchor="middle">ज्ञान मुद्रा + मुट्ठी बंद • आध्यात्मिक ऊर्जा का संचय</text>
</svg>'''

# SHANKH MUDRA SVG
shankh_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <radialGradient id="shankhBg" cx="50%" cy="40%" r="65%">
      <stop offset="0%" stopColor="#1E3A8A"/>
      <stop offset="60%" stopColor="#0F172A"/>
      <stop offset="100%" stopColor="#020617"/>
    </radialGradient>
  </defs>
  <rect width="500" height="500" rx="30" fill="url(#shankhBg)"/>
  <text x="250" y="45" font-family="serif" font-size="22" font-weight="bold" fill="#FEF08A" text-anchor="middle">७. शंख मुद्रा (कंठ शुद्धि व ॐ नाद)</text>
  <!-- Conch Silhouette formed by hands -->
  <ellipse cx="250" cy="250" rx="90" ry="120" fill="#FED7AA" stroke="#FDE047" stroke-width="3" transform="rotate(-20, 250, 250)"/>
  <ellipse cx="250" cy="250" rx="50" ry="80" fill="#FDBA74" stroke="#EA580C" stroke-width="2" transform="rotate(-20, 250, 250)"/>
  <text x="250" y="465" font-family="serif" font-size="18" font-weight="bold" fill="#FEF08A" text-anchor="middle">शंख के समान हस्त मुद्रा • विशुद्ध चक्र व वाणी सिद्धि</text>
</svg>'''

# BHAIRAV SVG
bhairav_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <radialGradient id="bhairavBg" cx="50%" cy="30%" r="70%">
      <stop offset="0%" stopColor="#7F1D1D"/>
      <stop offset="60%" stopColor="#18181B"/>
      <stop offset="100%" stopColor="#09090B"/>
    </radialGradient>
  </defs>
  <rect width="500" height="500" rx="30" fill="url(#bhairavBg)"/>
  <circle cx="250" cy="180" r="140" fill="#EF4444" opacity="0.4"/>
  <line x1="365" y1="80" x2="365" y2="400" stroke="#FDE047" stroke-width="8"/>
  <polygon points="365,50 355,85 375,85" fill="#FDE047"/>
  <!-- Face -->
  <path d="M 215 145 C 215 125 285 125 285 145 C 290 190 280 225 250 230 C 220 225 210 190 215 145 Z" fill="#FCA5A5"/>
  <circle cx="250" cy="155" r="6" fill="#DC2626"/>
  <text x="250" y="475" font-family="serif" font-size="22" font-weight="bold" fill="#FEF08A" text-anchor="middle">⚔️ ॐ भ्रं भैरवाय नमः • काशी के कोतवाल ⚔️</text>
</svg>'''

# GAYATRI SVG
gayatri_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <radialGradient id="gayatriBg" cx="50%" cy="30%" r="70%">
      <stop offset="0%" stopColor="#F59E0B"/>
      <stop offset="50%" stopColor="#B45309"/>
      <stop offset="100%" stopColor="#451A03"/>
    </radialGradient>
  </defs>
  <rect width="500" height="500" rx="30" fill="url(#gayatriBg)"/>
  <circle cx="250" cy="190" r="145" fill="#FEF08A" opacity="0.6"/>
  <!-- 5 Sacred Head Highlights -->
  <circle cx="170" cy="160" r="24" fill="#FED7AA"/>
  <circle cx="210" cy="140" r="26" fill="#FED7AA"/>
  <circle cx="250" cy="130" r="28" fill="#FED7AA"/>
  <circle cx="290" cy="140" r="26" fill="#FED7AA"/>
  <circle cx="330" cy="160" r="24" fill="#FED7AA"/>
  <!-- Red Lotus Seat -->
  <ellipse cx="250" cy="420" rx="140" ry="28" fill="#F43F5E"/>
  <text x="250" y="475" font-family="serif" font-size="22" font-weight="bold" fill="#FEF08A" text-anchor="middle">🪷 ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यम् 🪷</text>
</svg>'''

# SHANI SVG
shani_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <radialGradient id="shaniBg" cx="50%" cy="30%" r="70%">
      <stop offset="0%" stopColor="#1E3A8A"/>
      <stop offset="50%" stopColor="#0F172A"/>
      <stop offset="100%" stopColor="#020617"/>
    </radialGradient>
  </defs>
  <rect width="500" height="500" rx="30" fill="url(#shaniBg)"/>
  <circle cx="250" cy="190" r="140" fill="#3B82F6" opacity="0.4"/>
  <!-- Crow Vahana Silhouette -->
  <ellipse cx="330" cy="380" rx="40" ry="20" fill="#0F172A"/>
  <!-- Face -->
  <path d="M 215 145 C 215 125 285 125 285 145 C 290 190 280 225 250 230 C 220 225 210 190 215 145 Z" fill="#93C5FD"/>
  <circle cx="250" cy="155" r="5" fill="#2563EB"/>
  <text x="250" y="475" font-family="serif" font-size="22" font-weight="bold" fill="#FEF08A" text-anchor="middle">⚖️ ॐ शं शनैश्चराय नमः • न्याय देवता ⚖️</text>
</svg>'''

write_svg(os.path.join(MUDRAS_DIR, 'vayu_mudra.svg'), vayu_svg)
write_svg(os.path.join(MUDRAS_DIR, 'apana_mudra.svg'), apana_svg)
write_svg(os.path.join(MUDRAS_DIR, 'chinmaya_mudra.svg'), chinmaya_svg)
write_svg(os.path.join(MUDRAS_DIR, 'shankh_mudra.svg'), shankh_svg)
write_svg(os.path.join(DEITIES_DIR, 'bhairav.svg'), bhairav_svg)
write_svg(os.path.join(DEITIES_DIR, 'gayatri.svg'), gayatri_svg)
write_svg(os.path.join(DEITIES_DIR, 'shani.svg'), shani_svg)

print("More assets generated successfully!")
