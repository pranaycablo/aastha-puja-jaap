import os
import sys

# Ensure UTF-8 output on Windows
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

DEITIES_DIR = os.path.join('public', 'images', 'deities')
AASANS_DIR = os.path.join('public', 'images', 'aasans')
MUDRAS_DIR = os.path.join('public', 'images', 'mudras')

os.makedirs(DEITIES_DIR, exist_ok=True)
os.makedirs(AASANS_DIR, exist_ok=True)
os.makedirs(MUDRAS_DIR, exist_ok=True)

def write_svg(filepath, content):
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content.strip())
    print(f"Generated: {filepath}")

# 1. SHIVA SVG
shiva_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <radialGradient id="skyGrad" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stopColor="#1E3A8A"/>
      <stop offset="50%" stopColor="#0F172A"/>
      <stop offset="100%" stopColor="#030712"/>
    </radialGradient>
    <radialGradient id="haloGlow" cx="50%" cy="45%" r="45%">
      <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8"/>
      <stop offset="50%" stopColor="#0284C7" stopOpacity="0.3"/>
      <stop offset="100%" stopColor="#0369A1" stopOpacity="0"/>
    </radialGradient>
    <linearGradient id="trishulGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#FDE047"/>
      <stop offset="50%" stopColor="#F59E0B"/>
      <stop offset="100%" stopColor="#B45309"/>
    </linearGradient>
  </defs>

  <rect width="500" height="500" rx="30" fill="url(#skyGrad)"/>

  <!-- Mount Kailash Silhouettes -->
  <polygon points="50,420 200,230 350,420" fill="#1E293B" opacity="0.6"/>
  <polygon points="180,420 330,190 470,420" fill="#334155" opacity="0.7"/>
  <polygon points="260,250 330,190 400,250" fill="#E2E8F0" opacity="0.9"/>
  <polygon points="150,280 200,230 250,280" fill="#CBD5E1" opacity="0.8"/>

  <!-- Divine Halo -->
  <circle cx="250" cy="220" r="140" fill="url(#haloGlow)"/>
  <circle cx="250" cy="220" r="110" fill="none" stroke="#38BDF8" stroke-width="2" stroke-dasharray="4,6" opacity="0.7"/>

  <!-- Crescent Moon (Chandra) -->
  <path d="M 290 120 A 35 35 0 1 0 325 155 A 28 28 0 1 1 290 120 Z" fill="#F8FAFC" filter="drop-shadow(0 0 8px #E2E8F0)"/>

  <!-- Sacred Ganges Stream from Locks -->
  <path d="M 265 110 Q 300 70 340 75 Q 360 80 345 100 Q 315 115 285 125" fill="#67E8F9" opacity="0.85"/>
  <circle cx="340" cy="75" r="4" fill="#E0F2FE"/>

  <!-- Shiva Meditative Head & Face Silhouette -->
  <path d="M 210 170 C 200 130 230 110 250 110 C 270 110 300 130 290 170 C 310 180 310 210 300 230 C 290 250 210 250 200 230 C 190 210 190 180 210 170 Z" fill="#1E1B4B"/>
  
  <!-- Face Contour -->
  <path d="M 215 190 C 215 160 285 160 285 190 C 285 240 265 260 250 265 C 235 260 215 240 215 190 Z" fill="#93C5FD" opacity="0.95"/>

  <!-- Sacred Tripundra -->
  <rect x="232" y="180" width="36" height="3" rx="1.5" fill="#FFFFFF"/>
  <rect x="230" y="186" width="40" height="3" rx="1.5" fill="#FFFFFF"/>
  <rect x="232" y="192" width="36" height="3" rx="1.5" fill="#FFFFFF"/>
  <ellipse cx="250" cy="189" rx="3" ry="5" fill="#DC2626"/>

  <!-- Meditative Closed Peaceful Eyes -->
  <path d="M 226 210 Q 235 216 244 210" fill="none" stroke="#1E293B" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M 256 210 Q 265 216 274 210" fill="none" stroke="#1E293B" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M 242 240 Q 250 245 258 240" fill="none" stroke="#1E293B" stroke-width="2" stroke-linecap="round"/>

  <!-- Rudraksha Beads in Hair & Neck -->
  <circle cx="215" cy="165" r="4" fill="#9A3412" stroke="#78350F" stroke-width="1"/>
  <circle cx="230" cy="155" r="4" fill="#9A3412" stroke="#78350F" stroke-width="1"/>
  <circle cx="250" cy="150" r="4.5" fill="#9A3412" stroke="#78350F" stroke-width="1"/>
  <circle cx="270" cy="155" r="4" fill="#9A3412" stroke="#78350F" stroke-width="1"/>
  <circle cx="285" cy="165" r="4" fill="#9A3412" stroke="#78350F" stroke-width="1"/>

  <!-- Blue Neck (Neelkanth) & Vasuki Serpent -->
  <path d="M 230 260 C 230 280 270 280 270 260" fill="#3B82F6"/>
  <path d="M 225 270 Q 250 290 275 270 Q 285 275 280 285 Q 250 300 220 285 Z" fill="#15803D" stroke="#166534" stroke-width="1.5"/>
  <circle cx="278" cy="272" r="2.5" fill="#FACC15"/>

  <!-- Meditating Torso in Lotus Posture -->
  <path d="M 170 320 C 180 275 220 275 250 275 C 280 275 320 275 330 320 C 350 380 390 410 400 440 C 370 455 130 455 100 440 C 110 410 150 380 170 320 Z" fill="#60A5FA" opacity="0.9"/>
  <path d="M 120 420 Q 250 445 380 420 L 400 450 L 100 450 Z" fill="#D97706"/>

  <!-- Trishul & Damru -->
  <rect x="365" y="100" width="8" height="340" rx="3" fill="url(#trishulGold)"/>
  <path d="M 369 70 L 369 110" stroke="url(#trishulGold)" stroke-width="6" stroke-linecap="round"/>
  <polygon points="369,40 363,75 375,75" fill="url(#trishulGold)"/>
  <path d="M 369 105 C 335 105 335 70 345 60 C 350 70 360 85 369 88" fill="url(#trishulGold)"/>
  <path d="M 369 105 C 403 105 403 70 393 60 C 388 70 378 85 369 88" fill="url(#trishulGold)"/>
  <polygon points="350,165 388,165 350,195 388,195" fill="#B45309" stroke="#FDE047" stroke-width="2"/>
  <ellipse cx="369" cy="180" rx="4" ry="4" fill="#DC2626"/>

  <text x="250" y="475" font-family="serif" font-size="22" font-weight="bold" fill="#FDE047" text-anchor="middle">ॐ नमः शिवाय</text>
</svg>'''

# 2. HANUMAN SVG
hanuman_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <radialGradient id="saffronSky" cx="50%" cy="35%" r="65%">
      <stop offset="0%" stopColor="#EA580C"/>
      <stop offset="50%" stopColor="#9A3412"/>
      <stop offset="100%" stopColor="#431407"/>
    </radialGradient>
    <radialGradient id="solarGlow" cx="50%" cy="40%" r="45%">
      <stop offset="0%" stopColor="#FDE047" stopOpacity="0.9"/>
      <stop offset="60%" stopColor="#F97316" stopOpacity="0.4"/>
      <stop offset="100%" stopColor="#EA580C" stopOpacity="0"/>
    </radialGradient>
    <linearGradient id="goldGada" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#FEF08A"/>
      <stop offset="50%" stopColor="#F59E0B"/>
      <stop offset="100%" stopColor="#B45309"/>
    </linearGradient>
  </defs>

  <rect width="500" height="500" rx="30" fill="url(#saffronSky)"/>
  <circle cx="250" cy="200" r="140" fill="url(#solarGlow)"/>

  <!-- Mountain in Hand -->
  <polygon points="70,190 120,120 170,150 190,190" fill="#15803D" stroke="#86EFAC" stroke-width="2"/>
  <circle cx="125" cy="135" r="5" fill="#FACC15"/>
  <text x="130" y="160" font-size="14" fill="#FEF08A">✨</text>

  <!-- Crown -->
  <polygon points="250,70 215,135 285,135" fill="url(#goldGada)" stroke="#CA8A04" stroke-width="2"/>
  <circle cx="250" cy="95" r="6" fill="#DC2626"/>

  <!-- Face -->
  <path d="M 210 150 C 210 130 290 130 290 150 C 295 190 285 225 250 230 C 215 225 205 190 210 150 Z" fill="#F97316"/>
  <path d="M 244 140 L 244 175 Q 250 185 256 175 L 256 140" fill="#FDE047"/>
  <line x1="250" y1="140" x2="250" y2="180" stroke="#DC2626" stroke-width="2.5"/>

  <ellipse cx="232" cy="165" rx="9" ry="6" fill="#FFFFFF"/>
  <circle cx="233" cy="165" r="3.5" fill="#1C1917"/>
  <ellipse cx="268" cy="165" rx="9" ry="6" fill="#FFFFFF"/>
  <circle cx="267" cy="165" r="3.5" fill="#1C1917"/>

  <path d="M 225 185 C 225 210 275 210 275 185 Z" fill="#EA580C"/>
  <path d="M 235 195 Q 250 205 265 195" fill="none" stroke="#7C2D12" stroke-width="2" stroke-linecap="round"/>

  <!-- Torso & Janeu -->
  <path d="M 170 250 C 160 300 170 370 250 370 C 330 370 340 300 330 250 Z" fill="#F97316"/>
  <path d="M 195 245 Q 250 300 295 360" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-dasharray="6,3"/>

  <!-- Ram Locket -->
  <rect x="238" y="260" width="24" height="18" rx="4" fill="url(#goldGada)" stroke="#DC2626" stroke-width="1"/>
  <text x="250" y="273" font-size="9" font-weight="black" fill="#DC2626" text-anchor="middle">राम</text>

  <!-- Arms & Gada -->
  <path d="M 180 250 C 130 240 120 200 125 180" stroke="#F97316" stroke-width="28" stroke-linecap="round" fill="none"/>
  <path d="M 320 250 C 360 260 380 300 375 340" stroke="#F97316" stroke-width="28" stroke-linecap="round" fill="none"/>
  <rect x="365" y="260" width="10" height="170" rx="4" fill="url(#goldGada)" transform="rotate(-15, 370, 340)"/>
  <ellipse cx="345" cy="245" rx="32" ry="24" fill="url(#goldGada)" stroke="#B45309" stroke-width="2" transform="rotate(-15, 345, 245)"/>

  <!-- Curled Tail -->
  <path d="M 210 370 C 120 370 80 220 120 100 C 140 50 180 40 200 55 C 210 65 200 80 185 80 C 150 80 120 160 180 320" fill="none" stroke="#EA580C" stroke-width="12" stroke-linecap="round"/>
  <path d="M 170 370 C 170 430 330 430 330 370 Z" fill="#DC2626"/>

  <text x="250" y="475" font-family="serif" font-size="22" font-weight="bold" fill="#FEF08A" text-anchor="middle">🚩 जय श्री राम • जय हनुमान 🚩</text>
</svg>'''

# 3. RAM SVG
ram_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <radialGradient id="ramSky" cx="50%" cy="30%" r="70%">
      <stop offset="0%" stopColor="#1E1B4B"/>
      <stop offset="40%" stopColor="#312E81"/>
      <stop offset="100%" stopColor="#0F172A"/>
    </radialGradient>
    <radialGradient id="ramHalo" cx="50%" cy="35%" r="45%">
      <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.85"/>
      <stop offset="60%" stopColor="#F59E0B" stopOpacity="0.4"/>
      <stop offset="100%" stopColor="#D97706" stopOpacity="0"/>
    </radialGradient>
    <linearGradient id="bowGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#FDE047"/>
      <stop offset="50%" stopColor="#D97706"/>
      <stop offset="100%" stopColor="#78350F"/>
    </linearGradient>
  </defs>

  <rect width="500" height="500" rx="30" fill="url(#ramSky)"/>
  <circle cx="250" cy="180" r="135" fill="url(#ramHalo)"/>

  <!-- Kodanda Bow -->
  <path d="M 120 70 C 70 200 70 320 120 440" fill="none" stroke="url(#bowGold)" stroke-width="10" stroke-linecap="round"/>
  <line x1="120" y1="70" x2="120" y2="440" stroke="#FDE047" stroke-width="1.5" stroke-dasharray="5,2"/>

  <!-- Crown -->
  <polygon points="250,55 210,125 290,125" fill="url(#bowGold)" stroke="#FEF08A" stroke-width="2"/>
  <circle cx="250" cy="80" r="7" fill="#DC2626"/>

  <!-- Face -->
  <path d="M 215 140 C 215 125 285 125 285 140 C 290 185 280 220 250 225 C 220 220 210 185 215 140 Z" fill="#93C5FD"/>
  <path d="M 242 135 L 242 170 Q 250 178 258 170 L 258 135" fill="#FFFFFF"/>
  <line x1="250" y1="135" x2="250" y2="175" stroke="#DC2626" stroke-width="2.5"/>

  <ellipse cx="233" cy="160" rx="9" ry="5.5" fill="#FFFFFF"/>
  <circle cx="234" cy="160" r="3.5" fill="#1E293B"/>
  <ellipse cx="267" cy="160" rx="9" ry="5.5" fill="#FFFFFF"/>
  <circle cx="266" cy="160" r="3.5" fill="#1E293B"/>

  <path d="M 242 195 Q 250 200 258 195" fill="none" stroke="#1E293B" stroke-width="2" stroke-linecap="round"/>
  <path d="M 170 230 C 160 300 180 390 250 390 C 320 390 340 300 330 230 Z" fill="#FACC15"/>

  <text x="250" y="475" font-family="serif" font-size="22" font-weight="bold" fill="#FEF08A" text-anchor="middle">🏹 सियावर रामचंद्र की जय 🏹</text>
</svg>'''

# 4. KRISHNA SVG
krishna_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <radialGradient id="krishnaSky" cx="50%" cy="30%" r="70%">
      <stop offset="0%" stopColor="#1E1B4B"/>
      <stop offset="40%" stopColor="#2E1065"/>
      <stop offset="100%" stopColor="#0B0314"/>
    </radialGradient>
    <radialGradient id="krishnaHalo" cx="50%" cy="35%" r="45%">
      <stop offset="0%" stopColor="#FACC15" stopOpacity="0.85"/>
      <stop offset="60%" stopColor="#C084FC" stopOpacity="0.4"/>
      <stop offset="100%" stopColor="#A855F7" stopOpacity="0"/>
    </radialGradient>
  </defs>

  <rect width="500" height="500" rx="30" fill="url(#krishnaSky)"/>
  <circle cx="250" cy="180" r="140" fill="url(#krishnaHalo)"/>

  <!-- Peacock Feather -->
  <ellipse cx="280" cy="70" rx="28" ry="42" fill="#047857" transform="rotate(25, 280, 70)"/>
  <ellipse cx="280" cy="70" rx="18" ry="26" fill="#0284C7" transform="rotate(25, 280, 70)"/>
  <circle cx="280" cy="70" r="5" fill="#FDE047"/>

  <!-- Crown -->
  <polygon points="250,90 215,140 285,140" fill="#F59E0B" stroke="#FDE047" stroke-width="2"/>
  <circle cx="250" cy="115" r="5" fill="#EF4444"/>

  <!-- Face -->
  <path d="M 215 150 C 215 130 285 130 285 150 C 290 195 280 230 250 235 C 220 230 210 195 215 150 Z" fill="#60A5FA"/>
  <path d="M 244 145 L 244 175 Q 250 185 256 175 L 256 145" fill="#FEF08A"/>
  <circle cx="250" cy="180" r="2.5" fill="#EF4444"/>

  <ellipse cx="233" cy="172" rx="9" ry="5.5" fill="#FFFFFF"/>
  <circle cx="234" cy="172" r="3.5" fill="#0F172A"/>
  <ellipse cx="267" cy="172" rx="9" ry="5.5" fill="#FFFFFF"/>
  <circle cx="266" cy="172" r="3.5" fill="#0F172A"/>

  <!-- Flute -->
  <rect x="130" y="205" width="240" height="12" rx="6" fill="#FDE047" stroke="#B45309" stroke-width="1.5" transform="rotate(-12, 250, 210)"/>
  <path d="M 175 250 C 165 320 180 400 250 400 C 320 400 335 320 325 250 Z" fill="#EAB308"/>

  <text x="250" y="475" font-family="serif" font-size="22" font-weight="bold" fill="#FEF08A" text-anchor="middle">🪈 हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे 🪈</text>
</svg>'''

# 5. DURGA SVG
durga_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <radialGradient id="durgaSky" cx="50%" cy="30%" r="70%">
      <stop offset="0%" stopColor="#991B1B"/>
      <stop offset="45%" stopColor="#7F1D1D"/>
      <stop offset="100%" stopColor="#280505"/>
    </radialGradient>
    <radialGradient id="durgaHalo" cx="50%" cy="35%" r="45%">
      <stop offset="0%" stopColor="#FDE047" stopOpacity="0.9"/>
      <stop offset="55%" stopColor="#F97316" stopOpacity="0.4"/>
      <stop offset="100%" stopColor="#DC2626" stopOpacity="0"/>
    </radialGradient>
  </defs>

  <rect width="500" height="500" rx="30" fill="url(#durgaSky)"/>
  <circle cx="250" cy="180" r="145" fill="url(#durgaHalo)"/>

  <!-- Weapons -->
  <circle cx="410" cy="110" r="22" fill="#FDE047" stroke="#EA580C" stroke-width="2"/>
  <circle cx="100" cy="300" r="16" fill="#F43F5E"/>

  <polygon points="250,50 205,120 295,120" fill="#F59E0B" stroke="#FEF08A" stroke-width="2"/>
  <circle cx="250" cy="75" r="7" fill="#DC2626"/>

  <!-- Face -->
  <path d="M 215 135 C 215 115 285 115 285 135 C 290 180 280 220 250 225 C 220 220 210 180 215 135 Z" fill="#FED7AA"/>
  <circle cx="250" cy="150" r="5" fill="#DC2626"/>
  <ellipse cx="250" cy="162" rx="3" ry="5.5" fill="#DC2626"/>

  <ellipse cx="232" cy="178" rx="10" ry="6.5" fill="#FFFFFF"/>
  <circle cx="233" cy="178" r="4" fill="#1C1917"/>
  <ellipse cx="268" cy="178" rx="10" ry="6.5" fill="#FFFFFF"/>
  <circle cx="267" cy="178" r="4" fill="#1C1917"/>

  <!-- Red Saree -->
  <path d="M 170 240 C 160 320 180 400 250 400 C 320 400 340 320 330 240 Z" fill="#DC2626"/>

  <text x="250" y="475" font-family="serif" font-size="22" font-weight="bold" fill="#FEF08A" text-anchor="middle">🌸 ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे 🌸</text>
</svg>'''

# 6. GANESHA SVG
ganesha_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <radialGradient id="ganeshSky" cx="50%" cy="30%" r="70%">
      <stop offset="0%" stopColor="#C2410C"/>
      <stop offset="50%" stopColor="#7C2D12"/>
      <stop offset="100%" stopColor="#2A0B05"/>
    </radialGradient>
    <radialGradient id="ganeshHalo" cx="50%" cy="35%" r="45%">
      <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.85"/>
      <stop offset="60%" stopColor="#F97316" stopOpacity="0.4"/>
      <stop offset="100%" stopColor="#EA580C" stopOpacity="0"/>
    </radialGradient>
  </defs>

  <rect width="500" height="500" rx="30" fill="url(#ganeshSky)"/>
  <circle cx="250" cy="190" r="145" fill="url(#ganeshHalo)"/>

  <!-- Crown -->
  <polygon points="250,50 200,130 300,130" fill="#F59E0B" stroke="#FEF08A" stroke-width="2"/>
  <circle cx="250" cy="80" r="8" fill="#DC2626"/>

  <!-- Large Ears -->
  <path d="M 200 140 C 120 120 110 230 190 230" fill="#F97316" stroke="#C2410C" stroke-width="2"/>
  <path d="M 300 140 C 380 120 390 230 310 230" fill="#F97316" stroke="#C2410C" stroke-width="2"/>

  <!-- Trunk with Modak -->
  <path d="M 235 150 C 235 190 240 250 210 270 C 180 290 160 260 170 240 C 175 230 190 235 185 248 C 180 258 195 268 215 250 C 230 235 250 200 250 150 Z" fill="#FB923C"/>
  <circle cx="250" cy="140" r="4" fill="#DC2626"/>

  <ellipse cx="225" cy="165" rx="7" ry="4.5" fill="#FFFFFF"/>
  <circle cx="226" cy="165" r="2.5" fill="#1E293B"/>
  <ellipse cx="275" cy="165" rx="7" ry="4.5" fill="#FFFFFF"/>
  <circle cx="274" cy="165" r="2.5" fill="#1E293B"/>

  <path d="M 160 300 C 150 420 350 420 340 300 Z" fill="#FACC15"/>

  <text x="250" y="475" font-family="serif" font-size="22" font-weight="bold" fill="#FEF08A" text-anchor="middle">🐘 श्री गणेशाय नमः • विघ्नहर्ता 🐘</text>
</svg>'''

# 7. LAKSHMI SVG
lakshmi_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <radialGradient id="lakshmiSky" cx="50%" cy="30%" r="70%">
      <stop offset="0%" stopColor="#831843"/>
      <stop offset="50%" stopColor="#500724"/>
      <stop offset="100%" stopColor="#1E030D"/>
    </radialGradient>
    <radialGradient id="lakshmiHalo" cx="50%" cy="35%" r="45%">
      <stop offset="0%" stopColor="#FDE047" stopOpacity="0.85"/>
      <stop offset="60%" stopColor="#F472B6" stopOpacity="0.4"/>
      <stop offset="100%" stopColor="#BE185D" stopOpacity="0"/>
    </radialGradient>
  </defs>

  <rect width="500" height="500" rx="30" fill="url(#lakshmiSky)"/>
  <circle cx="250" cy="180" r="145" fill="url(#lakshmiHalo)"/>

  <!-- Gold Coins Shower -->
  <g fill="#FDE047" stroke="#CA8A04" stroke-width="1.5">
    <circle cx="340" cy="270" r="9"/>
    <circle cx="355" cy="295" r="8"/>
    <circle cx="335" cy="320" r="9"/>
    <circle cx="360" cy="345" r="7.5"/>
    <circle cx="340" cy="370" r="8.5"/>
  </g>

  <polygon points="250,55 210,125 290,125" fill="#F59E0B" stroke="#FEF08A" stroke-width="2"/>
  <circle cx="250" cy="80" r="7" fill="#E11D48"/>

  <!-- Face -->
  <path d="M 215 140 C 215 120 285 120 285 140 C 290 185 280 220 250 225 C 220 220 210 185 215 140 Z" fill="#FED7AA"/>
  <circle cx="250" cy="155" r="4.5" fill="#E11D48"/>

  <ellipse cx="233" cy="172" rx="9" ry="5.5" fill="#FFFFFF"/>
  <circle cx="234" cy="172" r="3.5" fill="#1C1917"/>
  <ellipse cx="267" cy="172" rx="9" ry="5.5" fill="#FFFFFF"/>
  <circle cx="266" cy="172" r="3.5" fill="#1C1917"/>

  <!-- Lotus Pedestal -->
  <ellipse cx="250" cy="425" rx="140" ry="30" fill="#FB7185"/>
  <ellipse cx="250" cy="420" rx="120" ry="22" fill="#F43F5E"/>

  <text x="250" y="475" font-family="serif" font-size="22" font-weight="bold" fill="#FEF08A" text-anchor="middle">🪙 ॐ श्रीं ह्रीं क्लीं महालक्ष्म्यै नमः 🪙</text>
</svg>'''

# 8. SARASWATI SVG
saraswati_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <radialGradient id="saraswatiSky" cx="50%" cy="30%" r="70%">
      <stop offset="0%" stopColor="#1E293B"/>
      <stop offset="50%" stopColor="#0F172A"/>
      <stop offset="100%" stopColor="#020617"/>
    </radialGradient>
    <radialGradient id="saraswatiHalo" cx="50%" cy="35%" r="45%">
      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9"/>
      <stop offset="60%" stopColor="#67E8F9" stopOpacity="0.4"/>
      <stop offset="100%" stopColor="#06B6D4" stopOpacity="0"/>
    </radialGradient>
  </defs>

  <rect width="500" height="500" rx="30" fill="url(#saraswatiSky)"/>
  <circle cx="250" cy="180" r="145" fill="url(#saraswatiHalo)"/>

  <!-- Veena -->
  <ellipse cx="140" cy="290" rx="32" ry="24" fill="#B45309" stroke="#FDE047" stroke-width="2"/>
  <rect x="150" y="270" width="220" height="14" rx="4" fill="#78350F" stroke="#FDE047" stroke-width="1.5" transform="rotate(-30, 260, 275)"/>
  <ellipse cx="340" cy="180" rx="20" ry="16" fill="#B45309" stroke="#FDE047" stroke-width="1.5"/>

  <!-- Face -->
  <path d="M 215 140 C 215 120 285 120 285 140 C 290 185 280 220 250 225 C 220 220 210 185 215 140 Z" fill="#FED7AA"/>
  <circle cx="250" cy="155" r="4" fill="#0284C7"/>

  <ellipse cx="233" cy="172" rx="9" ry="5.5" fill="#FFFFFF"/>
  <circle cx="234" cy="172" r="3.5" fill="#0F172A"/>
  <ellipse cx="267" cy="172" rx="9" ry="5.5" fill="#FFFFFF"/>
  <circle cx="266" cy="172" r="3.5" fill="#0F172A"/>

  <!-- White Robes -->
  <path d="M 170 240 C 160 320 180 390 250 390 C 320 390 340 320 330 240 Z" fill="#F8FAFC"/>

  <text x="250" y="475" font-family="serif" font-size="22" font-weight="bold" fill="#FEF08A" text-anchor="middle">🪷 ॐ ऐं सरस्वत्यै नमः • विद्या दायिनी 🪷</text>
</svg>'''

# 9. VISHNU SVG
vishnu_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <radialGradient id="vishnuSky" cx="50%" cy="30%" r="70%">
      <stop offset="0%" stopColor="#1E3A8A"/>
      <stop offset="50%" stopColor="#172554"/>
      <stop offset="100%" stopColor="#050B1E"/>
    </radialGradient>
    <radialGradient id="vishnuHalo" cx="50%" cy="35%" r="45%">
      <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.85"/>
      <stop offset="60%" stopColor="#38BDF8" stopOpacity="0.4"/>
      <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0"/>
    </radialGradient>
  </defs>

  <rect width="500" height="500" rx="30" fill="url(#vishnuSky)"/>
  <circle cx="250" cy="180" r="140" fill="url(#vishnuHalo)"/>

  <!-- Chakra & Shankha -->
  <circle cx="390" cy="130" r="24" fill="#FDE047" stroke="#EA580C" stroke-width="2"/>
  <ellipse cx="110" cy="130" rx="18" ry="12" fill="#FFFFFF" stroke="#FDE047" stroke-width="2"/>

  <!-- Face -->
  <path d="M 215 145 C 215 125 285 125 285 145 C 290 190 280 225 250 230 C 220 225 210 190 215 145 Z" fill="#60A5FA"/>
  <path d="M 242 140 L 242 175 Q 250 183 258 175 L 258 140" fill="#FFFFFF"/>
  <line x1="250" y1="140" x2="250" y2="180" stroke="#DC2626" stroke-width="2.5"/>

  <ellipse cx="233" cy="172" rx="9" ry="5.5" fill="#FFFFFF"/>
  <circle cx="234" cy="172" r="3.5" fill="#0F172A"/>
  <ellipse cx="267" cy="172" rx="9" ry="5.5" fill="#FFFFFF"/>
  <circle cx="266" cy="172" r="3.5" fill="#0F172A"/>

  <path d="M 170 245 C 160 325 180 395 250 395 C 320 395 340 325 330 245 Z" fill="#FACC15"/>

  <text x="250" y="475" font-family="serif" font-size="22" font-weight="bold" fill="#FEF08A" text-anchor="middle">🐚 ॐ नमो भगवते वासुदेवाय 🐚</text>
</svg>'''

# 10. SURYA SVG
surya_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <radialGradient id="suryaSky" cx="50%" cy="30%" r="70%">
      <stop offset="0%" stopColor="#EA580C"/>
      <stop offset="50%" stopColor="#9A3412"/>
      <stop offset="100%" stopColor="#431407"/>
    </radialGradient>
    <radialGradient id="sunBlaze" cx="50%" cy="40%" r="50%">
      <stop offset="0%" stopColor="#FEF08A"/>
      <stop offset="40%" stopColor="#FDE047"/>
      <stop offset="70%" stopColor="#F97316"/>
      <stop offset="100%" stopColor="#EA580C" stopOpacity="0"/>
    </radialGradient>
  </defs>

  <rect width="500" height="500" rx="30" fill="url(#suryaSky)"/>
  <circle cx="250" cy="200" r="160" fill="url(#sunBlaze)"/>

  <!-- Face -->
  <polygon points="250,75 210,135 290,135" fill="#FEF08A" stroke="#EA580C" stroke-width="2"/>
  <path d="M 215 145 C 215 125 285 125 285 145 C 290 190 280 225 250 230 C 220 225 210 190 215 145 Z" fill="#FDE047"/>
  <circle cx="250" cy="160" r="5" fill="#DC2626"/>

  <ellipse cx="233" cy="175" rx="8" ry="5" fill="#FFFFFF"/>
  <circle cx="234" cy="175" r="3" fill="#1C1917"/>
  <ellipse cx="267" cy="175" rx="8" ry="5" fill="#FFFFFF"/>
  <circle cx="266" cy="175" r="3" fill="#1C1917"/>

  <text x="250" y="475" font-family="serif" font-size="22" font-weight="bold" fill="#FEF08A" text-anchor="middle">☀️ ॐ सूर्याय नमः • दिनकर प्रभाकर ☀️</text>
</svg>'''

# WRITE DEITIES
write_svg(os.path.join(DEITIES_DIR, 'shiva.svg'), shiva_svg)
write_svg(os.path.join(DEITIES_DIR, 'hanuman.svg'), hanuman_svg)
write_svg(os.path.join(DEITIES_DIR, 'ram.svg'), ram_svg)
write_svg(os.path.join(DEITIES_DIR, 'krishna.svg'), krishna_svg)
write_svg(os.path.join(DEITIES_DIR, 'durga.svg'), durga_svg)
write_svg(os.path.join(DEITIES_DIR, 'ganesha.svg'), ganesha_svg)
write_svg(os.path.join(DEITIES_DIR, 'lakshmi.svg'), lakshmi_svg)
write_svg(os.path.join(DEITIES_DIR, 'saraswati.svg'), saraswati_svg)
write_svg(os.path.join(DEITIES_DIR, 'vishnu.svg'), vishnu_svg)
write_svg(os.path.join(DEITIES_DIR, 'surya.svg'), surya_svg)

# ====================================================================
# 2. AASANS (SITTING POSTURES)
# ====================================================================

padmasana_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <radialGradient id="asanBg" cx="50%" cy="40%" r="65%">
      <stop offset="0%" stopColor="#1E1B4B"/>
      <stop offset="60%" stopColor="#0F172A"/>
      <stop offset="100%" stopColor="#020617"/>
    </radialGradient>
    <radialGradient id="chakraGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8"/>
      <stop offset="50%" stopColor="#D97706" stopOpacity="0.3"/>
      <stop offset="100%" stopColor="#B45309" stopOpacity="0"/>
    </radialGradient>
  </defs>

  <rect width="500" height="500" rx="30" fill="url(#asanBg)"/>

  <!-- Mat -->
  <ellipse cx="250" cy="420" rx="190" ry="35" fill="#78350F" stroke="#F59E0B" stroke-width="2"/>
  <ellipse cx="250" cy="420" rx="170" ry="25" fill="#D97706"/>

  <!-- Chakras -->
  <line x1="250" y1="120" x2="250" y2="410" stroke="#FDE047" stroke-width="3" stroke-dasharray="6,4" opacity="0.8"/>
  <circle cx="250" cy="150" r="18" fill="url(#chakraGlow)"/>
  <circle cx="250" cy="270" r="18" fill="url(#chakraGlow)"/>
  <circle cx="250" cy="380" r="18" fill="url(#chakraGlow)"/>

  <!-- Head -->
  <circle cx="250" cy="140" r="32" fill="#FED7AA" stroke="#EA580C" stroke-width="2"/>
  <circle cx="250" cy="105" r="12" fill="#78350F"/>
  <circle cx="250" cy="138" r="3" fill="#DC2626"/>

  <!-- Torso -->
  <path d="M 190 200 C 190 270 210 320 250 320 C 290 320 310 270 310 200 Z" fill="#EA580C" stroke="#C2410C" stroke-width="2"/>

  <!-- Arms with Gyan Mudra -->
  <path d="M 190 210 C 150 250 130 320 140 370" fill="none" stroke="#FED7AA" stroke-width="20" stroke-linecap="round"/>
  <circle cx="140" cy="370" r="9" fill="#FED7AA" stroke="#EA580C" stroke-width="2"/>

  <path d="M 310 210 C 350 250 370 320 360 370" fill="none" stroke="#FED7AA" stroke-width="20" stroke-linecap="round"/>
  <circle cx="360" cy="370" r="9" fill="#FED7AA" stroke="#EA580C" stroke-width="2"/>

  <!-- Crossed Legs of Padmasana -->
  <path d="M 220 320 C 160 330 110 360 135 390 C 170 410 230 400 280 370" fill="#EA580C" stroke="#C2410C" stroke-width="2"/>
  <path d="M 280 320 C 340 330 390 360 365 390 C 330 410 270 400 220 370" fill="#EA580C" stroke="#C2410C" stroke-width="2"/>

  <!-- Soles of Feet turned upward -->
  <ellipse cx="215" cy="365" rx="20" ry="10" fill="#FED7AA" stroke="#EA580C" stroke-width="1.5" transform="rotate(-15, 215, 365)"/>
  <ellipse cx="285" cy="365" rx="20" ry="10" fill="#FED7AA" stroke="#EA580C" stroke-width="1.5" transform="rotate(15, 285, 365)"/>

  <text x="250" y="465" font-family="serif" font-size="20" font-weight="bold" fill="#FEF08A" text-anchor="middle">🧘 पद्मासन (कमलासन) • मेरुदण्ड सीधा</text>
</svg>'''

siddhasana_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <radialGradient id="siddhaBg" cx="50%" cy="40%" r="65%">
      <stop offset="0%" stopColor="#1E293B"/>
      <stop offset="60%" stopColor="#0F172A"/>
      <stop offset="100%" stopColor="#020617"/>
    </radialGradient>
  </defs>

  <rect width="500" height="500" rx="30" fill="url(#siddhaBg)"/>

  <ellipse cx="250" cy="420" rx="180" ry="32" fill="#78350F" stroke="#F59E0B" stroke-width="2"/>
  <ellipse cx="250" cy="420" rx="160" ry="22" fill="#B45309"/>

  <!-- Head -->
  <circle cx="250" cy="145" r="32" fill="#FED7AA" stroke="#EA580C" stroke-width="2"/>
  <circle cx="250" cy="110" r="12" fill="#78350F"/>
  <circle cx="250" cy="143" r="3" fill="#DC2626"/>

  <path d="M 195 200 C 195 270 215 320 250 320 C 285 320 305 270 305 200 Z" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="2"/>

  <!-- Arms -->
  <path d="M 195 210 C 155 250 135 320 145 370" fill="none" stroke="#FED7AA" stroke-width="20" stroke-linecap="round"/>
  <circle cx="145" cy="370" r="9" fill="#FED7AA" stroke="#78350F" stroke-width="2"/>

  <path d="M 305 210 C 345 250 365 320 355 370" fill="none" stroke="#FED7AA" stroke-width="20" stroke-linecap="round"/>
  <circle cx="355" cy="370" r="9" fill="#FED7AA" stroke="#78350F" stroke-width="2"/>

  <!-- Siddhasana Heel at Perineum -->
  <path d="M 210 320 C 150 330 110 365 140 395 C 180 410 240 400 280 370" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="2"/>
  <path d="M 290 320 C 350 330 390 365 360 395 C 320 410 260 400 220 370" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="2"/>
  <ellipse cx="250" cy="390" rx="16" ry="12" fill="#FED7AA" stroke="#78350F" stroke-width="1.5"/>

  <text x="250" y="465" font-family="serif" font-size="20" font-weight="bold" fill="#FEF08A" text-anchor="middle">🧘 सिद्धासन (मुक्तासन) • अष्टसिद्धि प्रदायक</text>
</svg>'''

sukhasana_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <radialGradient id="sukhaBg" cx="50%" cy="40%" r="65%">
      <stop offset="0%" stopColor="#1E1B4B"/>
      <stop offset="60%" stopColor="#2E1065"/>
      <stop offset="100%" stopColor="#0B0314"/>
    </radialGradient>
  </defs>

  <rect width="500" height="500" rx="30" fill="url(#sukhaBg)"/>
  <ellipse cx="250" cy="420" rx="180" ry="32" fill="#78350F" stroke="#F59E0B" stroke-width="2"/>

  <circle cx="250" cy="140" r="32" fill="#FED7AA" stroke="#EA580C" stroke-width="2"/>
  <circle cx="250" cy="105" r="12" fill="#78350F"/>
  <circle cx="250" cy="138" r="3" fill="#DC2626"/>

  <path d="M 195 200 C 195 270 215 320 250 320 C 285 320 305 270 305 200 Z" fill="#F97316" stroke="#C2410C" stroke-width="2"/>

  <path d="M 195 210 C 160 250 145 320 155 365" fill="none" stroke="#FED7AA" stroke-width="18" stroke-linecap="round"/>
  <circle cx="155" cy="365" r="9" fill="#FED7AA"/>

  <path d="M 305 210 C 340 250 355 320 345 365" fill="none" stroke="#FED7AA" stroke-width="18" stroke-linecap="round"/>
  <circle cx="345" cy="365" r="9" fill="#FED7AA"/>

  <!-- Simple Cross Legs -->
  <path d="M 210 320 C 150 330 120 370 160 395 C 200 410 250 400 280 375" fill="#F97316" stroke="#C2410C" stroke-width="2"/>
  <path d="M 290 320 C 350 330 380 370 340 395 C 300 410 250 400 220 375" fill="#F97316" stroke="#C2410C" stroke-width="2"/>

  <text x="250" y="465" font-family="serif" font-size="20" font-weight="bold" fill="#FEF08A" text-anchor="middle">🧘 सुखासन (सहजासन) • नित्य नित्य शांति</text>
</svg>'''

vajrasana_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <radialGradient id="vajraBg" cx="50%" cy="40%" r="65%">
      <stop offset="0%" stopColor="#1E3A8A"/>
      <stop offset="60%" stopColor="#0F172A"/>
      <stop offset="100%" stopColor="#020617"/>
    </radialGradient>
  </defs>

  <rect width="500" height="500" rx="30" fill="url(#vajraBg)"/>
  <ellipse cx="250" cy="425" rx="160" ry="28" fill="#78350F" stroke="#F59E0B" stroke-width="2"/>

  <circle cx="250" cy="130" r="30" fill="#FED7AA" stroke="#EA580C" stroke-width="2"/>
  <circle cx="250" cy="98" r="10" fill="#78350F"/>
  <circle cx="250" cy="128" r="3" fill="#DC2626"/>

  <path d="M 205 190 C 205 260 220 300 250 300 C 280 300 295 260 295 190 Z" fill="#F59E0B" stroke="#B45309" stroke-width="2"/>

  <!-- Palms on Thighs -->
  <path d="M 205 200 L 210 320" fill="none" stroke="#FED7AA" stroke-width="18" stroke-linecap="round"/>
  <rect x="195" y="320" width="30" height="15" rx="7" fill="#FED7AA" stroke="#78350F" stroke-width="1.5"/>

  <path d="M 295 200 L 290 320" fill="none" stroke="#FED7AA" stroke-width="18" stroke-linecap="round"/>
  <rect x="275" y="320" width="30" height="15" rx="7" fill="#FED7AA" stroke="#78350F" stroke-width="1.5"/>

  <!-- Folded Knees -->
  <path d="M 205 300 C 190 330 170 380 190 410 C 210 420 290 420 310 410 C 330 380 310 330 295 300 Z" fill="#D97706" stroke="#92400E" stroke-width="2"/>

  <text x="250" y="465" font-family="serif" font-size="20" font-weight="bold" fill="#FEF08A" text-anchor="middle">🧘 वज्रासन (हीरक आसन) • पाचन व स्थिरता</text>
</svg>'''

# WRITE AASANS
write_svg(os.path.join(AASANS_DIR, 'padmasana.svg'), padmasana_svg)
write_svg(os.path.join(AASANS_DIR, 'siddhasana.svg'), siddhasana_svg)
write_svg(os.path.join(AASANS_DIR, 'sukhasana.svg'), sukhasana_svg)
write_svg(os.path.join(AASANS_DIR, 'vajrasana.svg'), vajrasana_svg)

# ====================================================================
# 3. HASTA MUDRAS & KAR MALA
# ====================================================================

kar_mala_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <radialGradient id="handBg" cx="50%" cy="40%" r="65%">
      <stop offset="0%" stopColor="#1E1B4B"/>
      <stop offset="60%" stopColor="#0F172A"/>
      <stop offset="100%" stopColor="#020617"/>
    </radialGradient>
    <linearGradient id="palmSkin" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#FED7AA"/>
      <stop offset="60%" stopColor="#FDBA74"/>
      <stop offset="100%" stopColor="#FB923C"/>
    </linearGradient>
  </defs>

  <rect width="500" height="500" rx="30" fill="url(#handBg)"/>
  <text x="250" y="38" font-family="serif" font-size="20" font-weight="bold" fill="#FEF08A" text-anchor="middle">🖐️ शास्त्रोक्त कर-माला (१० पोर जप विधान)</text>

  <!-- Palm & Wrist -->
  <path d="M 170 420 C 160 350 140 280 180 230 L 320 230 C 360 280 340 350 330 420 Z" fill="url(#palmSkin)" stroke="#EA580C" stroke-width="2.5"/>

  <!-- Thumb & Fingers -->
  <path d="M 175 320 C 130 300 90 260 110 220 C 125 190 155 220 180 250" fill="url(#palmSkin)" stroke="#EA580C" stroke-width="2.5"/>
  <path d="M 180 230 C 175 160 175 110 195 110 C 215 110 215 160 215 230" fill="url(#palmSkin)" stroke="#EA580C" stroke-width="2.5"/>
  <path d="M 220 230 C 215 140 215 80 240 80 C 265 80 265 140 260 230" fill="url(#palmSkin)" stroke="#EA580C" stroke-width="2.5"/>
  <path d="M 265 230 C 265 150 270 100 290 100 C 310 100 310 150 305 230" fill="url(#palmSkin)" stroke="#EA580C" stroke-width="2.5"/>
  <path d="M 310 230 C 315 170 325 140 345 140 C 365 140 360 170 350 230" fill="url(#palmSkin)" stroke="#EA580C" stroke-width="2.5"/>

  <!-- Meru Prohibition -->
  <rect x="230" y="210" width="20" height="15" rx="3" fill="#DC2626" opacity="0.8"/>
  <text x="240" y="222" font-size="10" font-weight="bold" fill="#FFFFFF" text-anchor="middle">मेरु ❌</text>

  <!-- 10 Nodes -->
  <circle cx="285" cy="180" r="16" fill="#16A34A" stroke="#FEF08A" stroke-width="2.5"/>
  <text x="285" y="186" font-size="14" font-weight="900" fill="#FFFFFF" text-anchor="middle">१</text>

  <circle cx="285" cy="225" r="14" fill="#EA580C" stroke="#FEF08A" stroke-width="2"/>
  <text x="285" y="230" font-size="12" font-weight="900" fill="#FFFFFF" text-anchor="middle">२</text>

  <circle cx="335" cy="225" r="14" fill="#EA580C" stroke="#FEF08A" stroke-width="2"/>
  <text x="335" y="230" font-size="12" font-weight="900" fill="#FFFFFF" text-anchor="middle">३</text>

  <circle cx="335" cy="185" r="14" fill="#EA580C" stroke="#FEF08A" stroke-width="2"/>
  <text x="335" y="190" font-size="12" font-weight="900" fill="#FFFFFF" text-anchor="middle">४</text>

  <circle cx="335" cy="150" r="14" fill="#EA580C" stroke="#FEF08A" stroke-width="2"/>
  <text x="335" y="155" font-size="12" font-weight="900" fill="#FFFFFF" text-anchor="middle">५</text>

  <circle cx="285" cy="120" r="14" fill="#EA580C" stroke="#FEF08A" stroke-width="2"/>
  <text x="285" y="125" font-size="12" font-weight="900" fill="#FFFFFF" text-anchor="middle">६</text>

  <circle cx="240" cy="100" r="14" fill="#EA580C" stroke="#FEF08A" stroke-width="2"/>
  <text x="240" y="105" font-size="12" font-weight="900" fill="#FFFFFF" text-anchor="middle">७</text>

  <circle cx="195" cy="130" r="14" fill="#EA580C" stroke="#FEF08A" stroke-width="2"/>
  <text x="195" y="135" font-size="12" font-weight="900" fill="#FFFFFF" text-anchor="middle">८</text>

  <circle cx="195" cy="175" r="14" fill="#EA580C" stroke="#FEF08A" stroke-width="2"/>
  <text x="195" y="180" font-size="12" font-weight="900" fill="#FFFFFF" text-anchor="middle">९</text>

  <circle cx="195" cy="225" r="16" fill="#2563EB" stroke="#FEF08A" stroke-width="2.5"/>
  <text x="195" y="231" font-size="13" font-weight="900" fill="#FFFFFF" text-anchor="middle">१०</text>

  <!-- Flow Line -->
  <path d="M 285 180 L 285 225 L 335 225 L 335 185 L 335 150 L 285 120 L 240 100 L 195 130 L 195 175 L 195 225" fill="none" stroke="#FDE047" stroke-width="2.5" stroke-dasharray="5,3"/>

  <text x="250" y="465" font-family="serif" font-size="17" font-weight="bold" fill="#FEF08A" text-anchor="middle">"अनामिका मध्यमारभ्य प्रदक्षिणेन तर्जनीमूलपर्यन्तम्"</text>
</svg>'''

gyan_mudra_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <radialGradient id="gyanBg" cx="50%" cy="40%" r="65%">
      <stop offset="0%" stopColor="#1E1B4B"/>
      <stop offset="60%" stopColor="#0F172A"/>
      <stop offset="100%" stopColor="#020617"/>
    </radialGradient>
    <radialGradient id="touchGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="#FEF08A"/>
      <stop offset="40%" stopColor="#F59E0B" stopOpacity="0.8"/>
      <stop offset="100%" stopColor="#D97706" stopOpacity="0"/>
    </radialGradient>
  </defs>

  <rect width="500" height="500" rx="30" fill="url(#gyanBg)"/>
  <text x="250" y="45" font-family="serif" font-size="22" font-weight="bold" fill="#FEF08A" text-anchor="middle">१. ज्ञान मुद्रा (चिन्मुद्रा)</text>

  <!-- 3 Extended Fingers -->
  <path d="M 230 300 C 270 280 370 240 430 220 C 445 215 450 235 435 245 L 260 320" fill="#FED7AA" stroke="#EA580C" stroke-width="2"/>
  <path d="M 240 310 C 280 295 380 260 440 245 C 455 240 460 260 445 270 L 260 335" fill="#FED7AA" stroke="#EA580C" stroke-width="2"/>
  <path d="M 245 325 C 285 315 375 285 435 275 C 450 270 455 290 440 300 L 260 350" fill="#FED7AA" stroke="#EA580C" stroke-width="2"/>

  <!-- Index & Thumb Circle -->
  <path d="M 220 290 C 210 230 200 170 250 160 C 290 150 290 200 270 225" fill="none" stroke="#FED7AA" stroke-width="24" stroke-linecap="round"/>
  <path d="M 190 330 C 190 270 220 220 260 215" fill="none" stroke="#FED7AA" stroke-width="24" stroke-linecap="round"/>

  <!-- Touch Point Sparkle -->
  <circle cx="265" cy="220" r="28" fill="url(#touchGlow)"/>
  <circle cx="265" cy="220" r="7" fill="#FFFFFF"/>
  <text x="265" y="195" font-size="12" font-weight="black" fill="#FEF08A" text-anchor="middle">अग्नि + वायु मिलन</text>

  <text x="250" y="465" font-family="serif" font-size="18" font-weight="bold" fill="#FEF08A" text-anchor="middle">तर्जनी व अंगूठे का स्पर्श • मन की एकाग्रता व शांति</text>
</svg>'''

dhyana_mudra_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <radialGradient id="dhyanBg" cx="50%" cy="40%" r="65%">
      <stop offset="0%" stopColor="#1E1B4B"/>
      <stop offset="60%" stopColor="#0F172A"/>
      <stop offset="100%" stopColor="#020617"/>
    </radialGradient>
    <radialGradient id="stillGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="#38BDF8"/>
      <stop offset="50%" stopColor="#0284C7" stopOpacity="0.4"/>
      <stop offset="100%" stopColor="#0369A1" stopOpacity="0"/>
    </radialGradient>
  </defs>

  <rect width="500" height="500" rx="30" fill="url(#dhyanBg)"/>
  <text x="250" y="45" font-family="serif" font-size="22" font-weight="bold" fill="#FEF08A" text-anchor="middle">२. ध्यान मुद्रा (भैरव मुद्रा)</text>

  <!-- Hands in Lap -->
  <path d="M 100 400 Q 250 360 400 400 L 420 440 L 80 440 Z" fill="#EA580C"/>
  <path d="M 120 320 C 160 330 200 350 250 350 C 300 350 340 330 380 320" fill="none" stroke="#FED7AA" stroke-width="26" stroke-linecap="round"/>
  <path d="M 150 290 C 180 305 210 325 250 325 C 290 325 320 305 350 290" fill="none" stroke="#FDBA74" stroke-width="24" stroke-linecap="round"/>

  <!-- Touching Thumbs -->
  <path d="M 200 280 C 220 240 235 220 248 220" fill="none" stroke="#FED7AA" stroke-width="18" stroke-linecap="round"/>
  <path d="M 300 280 C 280 240 265 220 252 220" fill="none" stroke="#FED7AA" stroke-width="18" stroke-linecap="round"/>

  <circle cx="250" cy="220" r="32" fill="url(#stillGlow)"/>
  <circle cx="250" cy="220" r="7" fill="#FFFFFF"/>

  <text x="250" y="465" font-family="serif" font-size="18" font-weight="bold" fill="#FEF08A" text-anchor="middle">बाएं हाथ पर दाहिना हाथ • दोनों अंगूठे स्पर्श • विचारशून्यता</text>
</svg>'''

prana_mudra_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <radialGradient id="pranaBg" cx="50%" cy="40%" r="65%">
      <stop offset="0%" stopColor="#1E1B4B"/>
      <stop offset="60%" stopColor="#0F172A"/>
      <stop offset="100%" stopColor="#020617"/>
    </radialGradient>
    <radialGradient id="pranaGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="#22C55E"/>
      <stop offset="50%" stopColor="#16A34A" stopOpacity="0.5"/>
      <stop offset="100%" stopColor="#15803D" stopOpacity="0"/>
    </radialGradient>
  </defs>

  <rect width="500" height="500" rx="30" fill="url(#pranaBg)"/>
  <text x="250" y="45" font-family="serif" font-size="22" font-weight="bold" fill="#FEF08A" text-anchor="middle">३. प्राण मुद्रा (ऊर्जा व ओज)</text>

  <!-- Straight Upright Fingers -->
  <rect x="200" y="100" width="22" height="170" rx="11" fill="#FED7AA" stroke="#EA580C" stroke-width="2"/>
  <rect x="230" y="80" width="22" height="190" rx="11" fill="#FED7AA" stroke="#EA580C" stroke-width="2"/>

  <!-- Ring & Little Touching Thumb -->
  <path d="M 270 260 C 275 220 285 190 260 190 C 240 190 235 225 240 260" fill="none" stroke="#FDBA74" stroke-width="18" stroke-linecap="round"/>
  <path d="M 300 260 C 305 230 310 200 270 200" fill="none" stroke="#FDBA74" stroke-width="16" stroke-linecap="round"/>
  <path d="M 170 300 C 170 240 220 200 260 200" fill="none" stroke="#FED7AA" stroke-width="22" stroke-linecap="round"/>

  <circle cx="260" cy="200" r="28" fill="url(#pranaGlow)"/>
  <circle cx="260" cy="200" r="6" fill="#FFFFFF"/>

  <text x="250" y="465" font-family="serif" font-size="18" font-weight="bold" fill="#FEF08A" text-anchor="middle">अनामिका + कनिष्ठिका + अंगूठा • आलस्य नाश व प्रचंड ओज</text>
</svg>'''

# WRITE MUDRAS
write_svg(os.path.join(MUDRAS_DIR, 'kar_mala.svg'), kar_mala_svg)
write_svg(os.path.join(MUDRAS_DIR, 'gyan_mudra.svg'), gyan_mudra_svg)
write_svg(os.path.join(MUDRAS_DIR, 'dhyana_mudra.svg'), dhyana_mudra_svg)
write_svg(os.path.join(MUDRAS_DIR, 'prana_mudra.svg'), prana_mudra_svg)

print("All divine SVG assets generated successfully!")
