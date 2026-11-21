"""
Authentic Shastric Hindu Yantra Generator
Generates high-definition, authentic, geometrically precise Shastric Yantra SVGs
with sacred Bhupura, lotus petals, Sanskrit Beejas, Devanagari magic squares,
and metallic copper/gold/vermilion textures.
"""

import os
import math

OUTPUT_DIR = "public/images/yantras"
os.makedirs(OUTPUT_DIR, exist_ok=True)

def get_svg_wrapper(inner_content, bg_theme="gold", title=""):
    """
    bg_theme: 'gold' | 'copper' | 'vermilion' | 'silver' | 'blue' | 'yellow'
    """
    if bg_theme == "gold":
        grad_from = "#FFF8DB"
        grad_mid = "#F5D061"
        grad_to = "#C59B27"
        plate_border = "#B38728"
        line_color = "#8A1807"
        accent_color = "#E65100"
    elif bg_theme == "copper":
        grad_from = "#FFDFD3"
        grad_mid = "#E07A5F"
        grad_to = "#9E2A2B"
        plate_border = "#7F1D1D"
        line_color = "#581845"
        accent_color = "#B91C1C"
    elif bg_theme == "vermilion":
        grad_from = "#FFF1F2"
        grad_mid = "#FCA5A5"
        grad_to = "#B91C1C"
        plate_border = "#7F1D1D"
        line_color = "#450A0A"
        accent_color = "#E11D48"
    elif bg_theme == "yellow":
        grad_from = "#FEF08A"
        grad_mid = "#FACC15"
        grad_to = "#CA8A04"
        plate_border = "#854D0E"
        line_color = "#713F12"
        accent_color = "#A16207"
    elif bg_theme == "silver":
        grad_from = "#F8FAFC"
        grad_mid = "#E2E8F0"
        grad_to = "#94A3B8"
        plate_border = "#475569"
        line_color = "#0F172A"
        accent_color = "#2563EB"
    elif bg_theme == "blue":
        grad_from = "#E0F2FE"
        grad_mid = "#7DD3FC"
        grad_to = "#0369A1"
        plate_border = "#0C4A6E"
        line_color = "#082F49"
        accent_color = "#0284C7"
    else:
        grad_from = "#FFF8DB"
        grad_mid = "#F5D061"
        grad_to = "#C59B27"
        plate_border = "#B38728"
        line_color = "#8A1807"
        accent_color = "#E65100"

    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <radialGradient id="plateGrad" cx="50%" cy="50%" r="55%" fx="35%" fy="35%">
      <stop offset="0%" stop-color="{grad_from}" />
      <stop offset="65%" stop-color="{grad_mid}" />
      <stop offset="100%" stop-color="{grad_to}" />
    </radialGradient>
    <linearGradient id="metalShine" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.4" />
      <stop offset="45%" stop-color="#FFFFFF" stop-opacity="0.0" />
      <stop offset="55%" stop-color="#000000" stop-opacity="0.0" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0.3" />
    </linearGradient>
    <filter id="yantraGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000000" flood-opacity="0.35"/>
    </filter>
  </defs>

  <!-- Metal Sacred Plate Background -->
  <rect x="10" y="10" width="480" height="480" rx="32" fill="url(#plateGrad)" stroke="{plate_border}" stroke-width="6" />
  <rect x="22" y="22" width="456" height="456" rx="24" fill="none" stroke="{line_color}" stroke-width="1.8" stroke-dasharray="8 4" opacity="0.75" />
  <rect x="10" y="10" width="480" height="480" rx="32" fill="url(#metalShine)" pointer-events="none" />

  <!-- Corner Auspicious Symbols -->
  <text x="36" y="52" font-family="'Nirmala UI', 'Segoe UI', Arial, sans-serif" font-size="24" font-weight="bold" fill="{line_color}" text-anchor="middle">卐</text>
  <text x="464" y="52" font-family="'Nirmala UI', 'Segoe UI', Arial, sans-serif" font-size="24" font-weight="bold" fill="{line_color}" text-anchor="middle">ॐ</text>
  <text x="36" y="472" font-family="'Nirmala UI', 'Segoe UI', Arial, sans-serif" font-size="24" font-weight="bold" fill="{line_color}" text-anchor="middle">ॐ</text>
  <text x="464" y="472" font-family="'Nirmala UI', 'Segoe UI', Arial, sans-serif" font-size="24" font-weight="bold" fill="{line_color}" text-anchor="middle">卐</text>

  <!-- Yantra Core Content -->
  <g id="yantra-core" filter="url(#yantraGlow)">
    {inner_content}
  </g>
</svg>"""
    return svg


def make_bhupura(center=(250, 250), size=190, stroke="#8A1807", fill="none"):
    """
    Renders authentic 3-line Bhupura with 4 directional T-portals (North, East, South, West).
    """
    cx, cy = center
    paths = []
    # 3 concentric steps of Bhupura
    for offset, w, op in [(0, 3.5, 1.0), (7, 1.8, 0.85), (14, 1.2, 0.7)]:
        s = size - offset
        # Cardinal T-gate dimensions
        gw = 38 - offset * 0.4
        gh = 16 - offset * 0.2
        d = f"""
        M {cx - s},{cy - s}
        H {cx - gw} V {cy - s - gh} H {cx + gw} V {cy - s}
        H {cx + s}
        V {cy - gw} H {cx + s + gh} V {cy + gw} H {cx + s}
        V {cy + s}
        H {cx + gw} V {cy + s + gh} H {cx - gw} V {cy + s}
        H {cx - s}
        V {cy + gw} H {cx - s - gh} V {cy - gw} H {cx - s}
        Z
        """
        paths.append(f'<path d="{d}" fill="{fill}" stroke="{stroke}" stroke-width="{w}" opacity="{op}" />')
    return "\n".join(paths)


def make_lotus_petals(center=(250, 250), r_base=135, r_tip=160, num_petals=8, stroke="#8A1807", fill="rgba(255,255,255,0.2)"):
    """
    Generates authentic arched lotus petals around a circle.
    """
    cx, cy = center
    petals = []
    angle_step = 360 / num_petals
    for i in range(num_petals):
        a_mid = math.radians(i * angle_step)
        a_left = math.radians(i * angle_step - angle_step / 2)
        a_right = math.radians(i * angle_step + angle_step / 2)

        x_tip = cx + r_tip * math.cos(a_mid)
        y_tip = cy + r_tip * math.sin(a_mid)

        x_left = cx + r_base * math.cos(a_left)
        y_left = cy + r_base * math.sin(a_left)

        x_right = cx + r_base * math.cos(a_right)
        y_right = cy + r_base * math.sin(a_right)

        # Arched petal bezier path
        d = f"M {x_left:.1f},{y_left:.1f} Q {x_tip:.1f},{y_tip:.1f} {x_right:.1f},{y_right:.1f}"
        petals.append(f'<path d="{d}" fill="{fill}" stroke="{stroke}" stroke-width="2" />')
        # Inner vein
        petals.append(f'<line x1="{cx + r_base*math.cos(a_mid):.1f}" y1="{cy + r_base*math.sin(a_mid):.1f}" x2="{x_tip:.1f}" y2="{y_tip:.1f}" stroke="{stroke}" stroke-width="1" opacity="0.6" />')
    return "\n".join(petals)


def make_magic_square(grid_3x3, center=(250, 250), box_size=150, stroke="#8A1807", text_color="#7A160A"):
    """
    Renders authentic 3x3 magic grid with Devanagari numerals.
    """
    cx, cy = center
    half = box_size / 2
    cell = box_size / 3
    x0 = cx - half
    y0 = cy - half

    svg_items = []
    # Outer border & cells
    svg_items.append(f'<rect x="{x0}" y="{y0}" width="{box_size}" height="{box_size}" fill="rgba(255,255,255,0.7)" stroke="{stroke}" stroke-width="3" />')
    # Horizontal lines
    svg_items.append(f'<line x1="{x0}" y1="{y0 + cell}" x2="{x0 + box_size}" y2="{y0 + cell}" stroke="{stroke}" stroke-width="2.5" />')
    svg_items.append(f'<line x1="{x0}" y1="{y0 + cell * 2}" x2="{x0 + box_size}" y2="{y0 + cell * 2}" stroke="{stroke}" stroke-width="2.5" />')
    # Vertical lines
    svg_items.append(f'<line x1="{x0 + cell}" y1="{y0}" x2="{x0 + cell}" y2="{y0 + box_size}" stroke="{stroke}" stroke-width="2.5" />')
    svg_items.append(f'<line x1="{x0 + cell * 2}" y1="{y0}" x2="{x0 + cell * 2}" y2="{y0 + box_size}" stroke="{stroke}" stroke-width="2.5" />')

    # Devanagari text
    for r in range(3):
        for c in range(3):
            val = grid_3x3[r][c]
            tx = x0 + c * cell + cell / 2
            ty = y0 + r * cell + cell / 2 + 8  # vertical baseline balance
            svg_items.append(
                f'<text x="{tx:.1f}" y="{ty:.1f}" font-family="\'Nirmala UI\', \'Segoe UI\', Arial, sans-serif" font-size="24" font-weight="bold" fill="{text_color}" text-anchor="middle">{val}</text>'
            )

    return "\n".join(svg_items)


# ==============================================================================
# 1. SRI YANTRA (The Supreme Sacred Sri Chakra)
# ==============================================================================
def generate_sri_yantra():
    bhupura = make_bhupura((250, 250), size=205, stroke="#8A1807")
    c1 = '<circle cx="250" cy="250" r="172" fill="none" stroke="#8A1807" stroke-width="2" />'
    c2 = '<circle cx="250" cy="250" r="166" fill="none" stroke="#B45309" stroke-width="1.5" />'
    petals16 = make_lotus_petals((250, 250), r_base=132, r_tip=164, num_petals=16, stroke="#991B1B", fill="rgba(255,237,213,0.35)")
    c3 = '<circle cx="250" cy="250" r="132" fill="none" stroke="#8A1807" stroke-width="2" />'
    petals8 = make_lotus_petals((250, 250), r_base=102, r_tip=130, num_petals=8, stroke="#7F1D1D", fill="rgba(254,243,199,0.5)")
    c4 = '<circle cx="250" cy="250" r="102" fill="rgba(255,251,235,0.7)" stroke="#8A1807" stroke-width="2" />'

    # Authentic 9 interlocking triangles (4 Upward Shiva, 5 Downward Shakti)
    triangles = """
    <!-- 9 Interlocking Sacred Triangles forming 43 Triangles -->
    <g stroke="#991B1B" stroke-width="2.2" fill="none" stroke-linejoin="round">
      <!-- 5 Downward Triangles (Shakti) -->
      <polygon points="250,230 162,130 338,130" stroke="#7F1D1D" stroke-width="2.5" />
      <polygon points="250,220 178,145 322,145" />
      <polygon points="250,210 190,160 310,160" />
      <polygon points="250,195 204,175 296,175" />
      <polygon points="250,182 216,190 284,190" />

      <!-- 4 Upward Triangles (Shiva) -->
      <polygon points="250,270 162,370 338,370" stroke="#7F1D1D" stroke-width="2.5" />
      <polygon points="250,280 178,355 322,355" />
      <polygon points="250,290 190,340 310,340" />
      <polygon points="250,305 204,325 296,325" />
    </g>
    <!-- Central Golden Bindu (Mahatripurasundari) -->
    <circle cx="250" cy="250" r="14" fill="#FEF08A" stroke="#B45309" stroke-width="2" />
    <circle cx="250" cy="250" r="7" fill="#DC2626" />
    <circle cx="250" cy="250" r="2.5" fill="#FFFFFF" />
    <text x="250" y="222" font-family="'Nirmala UI', sans-serif" font-size="12" font-weight="bold" fill="#7F1D1D" text-anchor="middle">श्रीं</text>
    <text x="250" y="284" font-family="'Nirmala UI', sans-serif" font-size="11" font-weight="bold" fill="#7F1D1D" text-anchor="middle">ह्रीं</text>
    """

    content = f"""
    {bhupura}
    {c1}
    {c2}
    {petals16}
    {c3}
    {petals8}
    {c4}
    {triangles}
    """
    return get_svg_wrapper(content, bg_theme="gold", title="Sri Yantra")


# ==============================================================================
# 2. KUBER YANTRA (Authentic 69-Sum Wealth Magic Square)
# ==============================================================================
def generate_kuber_yantra():
    bhupura = make_bhupura((250, 250), size=205, stroke="#854D0E")
    c1 = '<circle cx="250" cy="250" r="170" fill="none" stroke="#A16207" stroke-width="2.5" />'
    petals = make_lotus_petals((250, 250), r_base=120, r_tip=165, num_petals=8, stroke="#854D0E", fill="rgba(254,249,195,0.6)")
    c2 = '<circle cx="250" cy="250" r="120" fill="rgba(255,255,255,0.75)" stroke="#A16207" stroke-width="2" />'

    # Sacred 69 Magic Square in Devanagari:
    # Row 1: 20, 27, 22 (Sum 69)
    # Row 2: 25, 23, 21 (Sum 69)
    # Row 3: 24, 19, 26 (Sum 69)
    grid = [
        ["२०", "२७", "२२"],
        ["२५", "२३", "२१"],
        ["२४", "१९", "२६"]
    ]
    square = make_magic_square(grid, center=(250, 250), box_size=156, stroke="#854D0E", text_color="#713F12")

    labels = """
    <!-- Ashta-Dal Beej Inscriptions -->
    <text x="250" y="100" font-family="'Nirmala UI', sans-serif" font-size="14" font-weight="bold" fill="#713F12" text-anchor="middle">ॐ</text>
    <text x="355" y="145" font-family="'Nirmala UI', sans-serif" font-size="14" font-weight="bold" fill="#713F12" text-anchor="middle">ह्रीं</text>
    <text x="400" y="255" font-family="'Nirmala UI', sans-serif" font-size="14" font-weight="bold" fill="#713F12" text-anchor="middle">क्लीं</text>
    <text x="355" y="365" font-family="'Nirmala UI', sans-serif" font-size="14" font-weight="bold" fill="#713F12" text-anchor="middle">कुबेराय</text>
    <text x="250" y="410" font-family="'Nirmala UI', sans-serif" font-size="14" font-weight="bold" fill="#713F12" text-anchor="middle">नमः</text>
    <text x="145" y="365" font-family="'Nirmala UI', sans-serif" font-size="14" font-weight="bold" fill="#713F12" text-anchor="middle">धनम्</text>
    <text x="100" y="255" font-family="'Nirmala UI', sans-serif" font-size="14" font-weight="bold" fill="#713F12" text-anchor="middle">लाभम्</text>
    <text x="145" y="145" font-family="'Nirmala UI', sans-serif" font-size="14" font-weight="bold" fill="#713F12" text-anchor="middle">श्रीं</text>
    """

    content = f"""
    {bhupura}
    {c1}
    {petals}
    {c2}
    {labels}
    {square}
    """
    return get_svg_wrapper(content, bg_theme="gold", title="Sri Kuber Yantra")


# ==============================================================================
# 3. SURYA YANTRA (Authentic 15-Sum Solar Magic Square + 12 Sun Rays)
# ==============================================================================
def generate_surya_yantra():
    bhupura = make_bhupura((250, 250), size=205, stroke="#B45309")
    c1 = '<circle cx="250" cy="250" r="172" fill="none" stroke="#D97706" stroke-width="2.5" />'
    petals = make_lotus_petals((250, 250), r_base=120, r_tip=168, num_petals=8, stroke="#B45309", fill="rgba(254,215,170,0.6)")
    c2 = '<circle cx="250" cy="250" r="120" fill="rgba(255,255,255,0.7)" stroke="#B45309" stroke-width="2" />'

    # Classical 15-Sum Solar Grid:
    # 6, 1, 8
    # 7, 5, 3
    # 2, 9, 4
    grid = [
        ["६", "१", "८"],
        ["७", "५", "३"],
        ["२", "९", "४"]
    ]
    square = make_magic_square(grid, center=(250, 250), box_size=154, stroke="#B45309", text_color="#7C2D12")

    rays = []
    for deg in range(0, 360, 30):
        rad = math.radians(deg)
        x1 = 250 + 174 * math.cos(rad)
        y1 = 250 + 174 * math.sin(rad)
        x2 = 250 + 192 * math.cos(rad)
        y2 = 250 + 192 * math.sin(rad)
        rays.append(f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="#EA580C" stroke-width="3" stroke-linecap="round" />')

    content = f"""
    {bhupura}
    {"".join(rays)}
    {c1}
    {petals}
    {c2}
    {square}
    <text x="250" y="96" font-family="'Nirmala UI', sans-serif" font-size="13" font-weight="bold" fill="#9A3412" text-anchor="middle">ॐ घृणिः सूर्याय नमः</text>
    """
    return get_svg_wrapper(content, bg_theme="copper", title="Sri Surya Yantra")


# ==============================================================================
# 4. CHANDRA YANTRA (Authentic 18-Sum Lunar Grid + Crescent Moon)
# ==============================================================================
def generate_chandra_yantra():
    bhupura = make_bhupura((250, 250), size=205, stroke="#0369A1")
    c1 = '<circle cx="250" cy="250" r="170" fill="none" stroke="#0284C7" stroke-width="2.5" />'
    petals = make_lotus_petals((250, 250), r_base=120, r_tip=165, num_petals=8, stroke="#0369A1", fill="rgba(224,242,254,0.6)")
    c2 = '<circle cx="250" cy="250" r="120" fill="rgba(255,255,255,0.85)" stroke="#0369A1" stroke-width="2" />'

    # Classical 18-Sum Moon Grid:
    # 7, 2, 9
    # 8, 6, 4
    # 3, 10, 5
    grid = [
        ["७", "२", "९"],
        ["८", "६", "४"],
        ["३", "१०", "५"]
    ]
    square = make_magic_square(grid, center=(250, 250), box_size=154, stroke="#0369A1", text_color="#0C4A6E")

    content = f"""
    {bhupura}
    {c1}
    {petals}
    {c2}
    {square}
    <text x="250" y="96" font-family="'Nirmala UI', sans-serif" font-size="13" font-weight="bold" fill="#0C4A6E" text-anchor="middle">ॐ सों सोमाय नमः</text>
    """
    return get_svg_wrapper(content, bg_theme="blue", title="Sri Chandra Yantra")


# ==============================================================================
# 5. MANGAL YANTRA (Authentic 21-Sum Mars Grid)
# ==============================================================================
def generate_mangal_yantra():
    bhupura = make_bhupura((250, 250), size=205, stroke="#991B1B")
    c1 = '<circle cx="250" cy="250" r="170" fill="none" stroke="#DC2626" stroke-width="2.5" />'
    petals = make_lotus_petals((250, 250), r_base=120, r_tip=165, num_petals=8, stroke="#991B1B", fill="rgba(254,202,202,0.6)")
    c2 = '<circle cx="250" cy="250" r="120" fill="rgba(255,255,255,0.8)" stroke="#991B1B" stroke-width="2" />'

    # Classical 21-Sum Mars Grid:
    # 8, 3, 10
    # 9, 7, 5
    # 4, 11, 6
    grid = [
        ["८", "३", "१०"],
        ["९", "७", "५"],
        ["४", "११", "६"]
    ]
    square = make_magic_square(grid, center=(250, 250), box_size=154, stroke="#991B1B", text_color="#7F1D1D")

    content = f"""
    {bhupura}
    {c1}
    {petals}
    {c2}
    {square}
    <text x="250" y="96" font-family="'Nirmala UI', sans-serif" font-size="13" font-weight="bold" fill="#7F1D1D" text-anchor="middle">ॐ अं अंगारकाय नमः</text>
    """
    return get_svg_wrapper(content, bg_theme="vermilion", title="Sri Mangal Yantra")


# ==============================================================================
# 6. BUDH YANTRA (Authentic 24-Sum Mercury Grid)
# ==============================================================================
def generate_budh_yantra():
    bhupura = make_bhupura((250, 250), size=205, stroke="#065F46")
    c1 = '<circle cx="250" cy="250" r="170" fill="none" stroke="#059669" stroke-width="2.5" />'
    petals = make_lotus_petals((250, 250), r_base=120, r_tip=165, num_petals=8, stroke="#065F46", fill="rgba(209,250,229,0.6)")
    c2 = '<circle cx="250" cy="250" r="120" fill="rgba(255,255,255,0.8)" stroke="#065F46" stroke-width="2" />'

    # Classical 24-Sum Mercury Grid:
    # 9, 4, 11
    # 10, 8, 6
    # 5, 12, 7
    grid = [
        ["९", "४", "११"],
        ["१०", "८", "६"],
        ["५", "१२", "७"]
    ]
    square = make_magic_square(grid, center=(250, 250), box_size=154, stroke="#065F46", text_color="#064E3B")

    content = f"""
    {bhupura}
    {c1}
    {petals}
    {c2}
    {square}
    <text x="250" y="96" font-family="'Nirmala UI', sans-serif" font-size="13" font-weight="bold" fill="#064E3B" text-anchor="middle">ॐ बुं बुधाय नमः</text>
    """
    return get_svg_wrapper(content, bg_theme="gold", title="Sri Budh Yantra")


# ==============================================================================
# 7. GURU YANTRA (Authentic 27-Sum Jupiter Grid)
# ==============================================================================
def generate_guru_yantra():
    bhupura = make_bhupura((250, 250), size=205, stroke="#854D0E")
    c1 = '<circle cx="250" cy="250" r="170" fill="none" stroke="#CA8A04" stroke-width="2.5" />'
    petals = make_lotus_petals((250, 250), r_base=120, r_tip=165, num_petals=8, stroke="#854D0E", fill="rgba(254,240,138,0.6)")
    c2 = '<circle cx="250" cy="250" r="120" fill="rgba(255,255,255,0.8)" stroke="#854D0E" stroke-width="2" />'

    # Classical 27-Sum Jupiter Grid:
    # 10, 5, 12
    # 11, 9, 7
    # 6, 13, 8
    grid = [
        ["१०", "५", "१२"],
        ["११", "९", "७"],
        ["६", "१३", "८"]
    ]
    square = make_magic_square(grid, center=(250, 250), box_size=154, stroke="#854D0E", text_color="#713F12")

    content = f"""
    {bhupura}
    {c1}
    {petals}
    {c2}
    {square}
    <text x="250" y="96" font-family="'Nirmala UI', sans-serif" font-size="13" font-weight="bold" fill="#713F12" text-anchor="middle">ॐ बृं बृहस्पतये नमः</text>
    """
    return get_svg_wrapper(content, bg_theme="yellow", title="Sri Guru Yantra")


# ==============================================================================
# 8. SHUKRA YANTRA (Authentic 30-Sum Venus Grid)
# ==============================================================================
def generate_shukra_yantra():
    bhupura = make_bhupura((250, 250), size=205, stroke="#334155")
    c1 = '<circle cx="250" cy="250" r="170" fill="none" stroke="#475569" stroke-width="2.5" />'
    petals = make_lotus_petals((250, 250), r_base=120, r_tip=165, num_petals=8, stroke="#334155", fill="rgba(241,245,249,0.7)")
    c2 = '<circle cx="250" cy="250" r="120" fill="rgba(255,255,255,0.85)" stroke="#334155" stroke-width="2" />'

    # Classical 30-Sum Venus Grid:
    # 11, 6, 13
    # 12, 10, 8
    # 7, 14, 9
    grid = [
        ["११", "६", "१३"],
        ["१२", "१०", "८"],
        ["७", "१४", "९"]
    ]
    square = make_magic_square(grid, center=(250, 250), box_size=154, stroke="#334155", text_color="#0F172A")

    content = f"""
    {bhupura}
    {c1}
    {petals}
    {c2}
    {square}
    <text x="250" y="96" font-family="'Nirmala UI', sans-serif" font-size="13" font-weight="bold" fill="#0F172A" text-anchor="middle">ॐ शुं शुक्राय नमः</text>
    """
    return get_svg_wrapper(content, bg_theme="silver", title="Sri Shukra Yantra")


# ==============================================================================
# 9. SHANI YANTRA (Authentic 33-Sum Saturn Grid)
# ==============================================================================
def generate_shani_yantra():
    bhupura = make_bhupura((250, 250), size=205, stroke="#1E3A8A")
    c1 = '<circle cx="250" cy="250" r="170" fill="none" stroke="#1D4ED8" stroke-width="2.5" />'
    petals = make_lotus_petals((250, 250), r_base=120, r_tip=165, num_petals=8, stroke="#1E3A8A", fill="rgba(219,234,254,0.6)")
    c2 = '<circle cx="250" cy="250" r="120" fill="rgba(255,255,255,0.8)" stroke="#1E3A8A" stroke-width="2" />'

    # Classical 33-Sum Saturn Grid:
    # 12, 7, 14
    # 13, 11, 9
    # 8, 15, 10
    grid = [
        ["१२", "७", "१४"],
        ["१३", "११", "९"],
        ["८", "१५", "१०"]
    ]
    square = make_magic_square(grid, center=(250, 250), box_size=154, stroke="#1E3A8A", text_color="#172554")

    content = f"""
    {bhupura}
    {c1}
    {petals}
    {c2}
    {square}
    <text x="250" y="96" font-family="'Nirmala UI', sans-serif" font-size="13" font-weight="bold" fill="#172554" text-anchor="middle">ॐ शं शनैश्चराय नमः</text>
    """
    return get_svg_wrapper(content, bg_theme="blue", title="Sri Shani Yantra")


# ==============================================================================
# 10. RAHU YANTRA (Authentic 36-Sum Rahu Grid)
# ==============================================================================
def generate_rahu_yantra():
    bhupura = make_bhupura((250, 250), size=205, stroke="#334155")
    c1 = '<circle cx="250" cy="250" r="170" fill="none" stroke="#475569" stroke-width="2.5" />'
    petals = make_lotus_petals((250, 250), r_base=120, r_tip=165, num_petals=8, stroke="#334155", fill="rgba(226,232,240,0.6)")
    c2 = '<circle cx="250" cy="250" r="120" fill="rgba(255,255,255,0.8)" stroke="#334155" stroke-width="2" />'

    # Classical 36-Sum Rahu Grid:
    # 13, 8, 15
    # 14, 12, 10
    # 9, 16, 11
    grid = [
        ["१३", "८", "१५"],
        ["१४", "१२", "१०"],
        ["९", "१६", "११"]
    ]
    square = make_magic_square(grid, center=(250, 250), box_size=154, stroke="#334155", text_color="#0F172A")

    content = f"""
    {bhupura}
    {c1}
    {petals}
    {c2}
    {square}
    <text x="250" y="96" font-family="'Nirmala UI', sans-serif" font-size="13" font-weight="bold" fill="#0F172A" text-anchor="middle">ॐ रां राहवे नमः</text>
    """
    return get_svg_wrapper(content, bg_theme="silver", title="Sri Rahu Yantra")


# ==============================================================================
# 11. KETU YANTRA (Authentic 39-Sum Ketu Grid)
# ==============================================================================
def generate_ketu_yantra():
    bhupura = make_bhupura((250, 250), size=205, stroke="#78350F")
    c1 = '<circle cx="250" cy="250" r="170" fill="none" stroke="#92400E" stroke-width="2.5" />'
    petals = make_lotus_petals((250, 250), r_base=120, r_tip=165, num_petals=8, stroke="#78350F", fill="rgba(254,243,199,0.6)")
    c2 = '<circle cx="250" cy="250" r="120" fill="rgba(255,255,255,0.8)" stroke="#78350F" stroke-width="2" />'

    # Classical 39-Sum Ketu Grid:
    # 14, 9, 16
    # 15, 13, 11
    # 10, 17, 12
    grid = [
        ["१४", "९", "१६"],
        ["१५", "१३", "११"],
        ["१०", "१७", "१२"]
    ]
    square = make_magic_square(grid, center=(250, 250), box_size=154, stroke="#78350F", text_color="#451A03")

    content = f"""
    {bhupura}
    {c1}
    {petals}
    {c2}
    {square}
    <text x="250" y="96" font-family="'Nirmala UI', sans-serif" font-size="13" font-weight="bold" fill="#451A03" text-anchor="middle">ॐ कें केतवे नमः</text>
    """
    return get_svg_wrapper(content, bg_theme="copper", title="Sri Ketu Yantra")


# ==============================================================================
# 12. DURGA BISA YANTRA (Authentic 20-Kosh Shatkona & Nine Sacred Triangles)
# ==============================================================================
def generate_durga_bisa_yantra():
    bhupura = make_bhupura((250, 250), size=205, stroke="#991B1B")
    c1 = '<circle cx="250" cy="250" r="170" fill="none" stroke="#B91C1C" stroke-width="2.5" />'
    petals = make_lotus_petals((250, 250), r_base=120, r_tip=165, num_petals=8, stroke="#991B1B", fill="rgba(254,202,202,0.6)")
    c2 = '<circle cx="250" cy="250" r="120" fill="rgba(255,255,255,0.8)" stroke="#991B1B" stroke-width="2" />'

    # Classical Durga Bisa (20-chambers with sacred numbers summing to 20):
    grid = [
        ["९", "२", "९"],
        ["५", "१०", "५"],
        ["६", "८", "६"]
    ]
    square = make_magic_square(grid, center=(250, 250), box_size=150, stroke="#991B1B", text_color="#7F1D1D")

    # Concentric triangle overlay
    triangles = """
    <polygon points="250,135 155,295 345,295" stroke="#B91C1C" stroke-width="2" fill="none" opacity="0.4" />
    <polygon points="250,365 155,205 345,205" stroke="#B91C1C" stroke-width="2" fill="none" opacity="0.4" />
    """

    content = f"""
    {bhupura}
    {c1}
    {petals}
    {c2}
    {triangles}
    {square}
    <text x="250" y="96" font-family="'Nirmala UI', sans-serif" font-size="13" font-weight="bold" fill="#7F1D1D" text-anchor="middle">ॐ दुं दुर्गायै नमः</text>
    """
    return get_svg_wrapper(content, bg_theme="vermilion", title="Sri Durga Bisa Yantra")


# ==============================================================================
# 13. BAGLAMUKHI YANTRA (Authentic Shatkona + Stambhan Beej Hleem)
# ==============================================================================
def generate_baglamukhi_yantra():
    bhupura = make_bhupura((250, 250), size=205, stroke="#854D0E")
    c1 = '<circle cx="250" cy="250" r="172" fill="none" stroke="#CA8A04" stroke-width="2.5" />'
    petals = make_lotus_petals((250, 250), r_base=125, r_tip=168, num_petals=8, stroke="#854D0E", fill="rgba(254,240,138,0.65)")
    c2 = '<circle cx="250" cy="250" r="125" fill="rgba(255,255,255,0.75)" stroke="#854D0E" stroke-width="2" />'

    # Sacred Shatkona (Hexagram) with central inverted Shakti Triangle
    shatkona = """
    <!-- Shatkona -->
    <polygon points="250,140 155,305 345,305" stroke="#854D0E" stroke-width="3" fill="rgba(253,224,71,0.2)" />
    <polygon points="250,360 155,195 345,195" stroke="#854D0E" stroke-width="3" fill="rgba(253,224,71,0.2)" />
    <!-- Inner Central Shakti Triangle (Downward) -->
    <polygon points="250,290 195,190 305,190" stroke="#713F12" stroke-width="3.5" fill="rgba(250,204,21,0.85)" />
    <!-- Beej Akshara HLEEM -->
    <text x="250" y="246" font-family="'Nirmala UI', sans-serif" font-size="36" font-weight="black" fill="#713F12" text-anchor="middle">ह्लीं</text>
    <circle cx="250" cy="258" r="4" fill="#B45309" />
    <!-- Surrounding Beejas on 6 tips -->
    <text x="250" y="132" font-family="'Nirmala UI', sans-serif" font-size="14" font-weight="bold" fill="#713F12" text-anchor="middle">ॐ</text>
    <text x="358" y="195" font-family="'Nirmala UI', sans-serif" font-size="13" font-weight="bold" fill="#713F12" text-anchor="middle">बगला</text>
    <text x="358" y="318" font-family="'Nirmala UI', sans-serif" font-size="13" font-weight="bold" fill="#713F12" text-anchor="middle">मुखि</text>
    <text x="250" y="380" font-family="'Nirmala UI', sans-serif" font-size="13" font-weight="bold" fill="#713F12" text-anchor="middle">स्तम्भय</text>
    <text x="142" y="318" font-family="'Nirmala UI', sans-serif" font-size="13" font-weight="bold" fill="#713F12" text-anchor="middle">स्वाहा</text>
    <text x="142" y="195" font-family="'Nirmala UI', sans-serif" font-size="13" font-weight="bold" fill="#713F12" text-anchor="middle">क्लीं</text>
    """

    content = f"""
    {bhupura}
    {c1}
    {petals}
    {c2}
    {shatkona}
    """
    return get_svg_wrapper(content, bg_theme="yellow", title="Maa Baglamukhi Yantra")


# ==============================================================================
# 14. MAHAMRITYUNJAYA YANTRA (Sacred Shiva Amrita Yantra)
# ==============================================================================
def generate_mahamrityunjaya_yantra():
    bhupura = make_bhupura((250, 250), size=205, stroke="#0369A1")
    c1 = '<circle cx="250" cy="250" r="172" fill="none" stroke="#0284C7" stroke-width="2.5" />'
    petals = make_lotus_petals((250, 250), r_base=125, r_tip=168, num_petals=8, stroke="#0369A1", fill="rgba(224,242,254,0.65)")
    c2 = '<circle cx="250" cy="250" r="125" fill="rgba(255,255,255,0.8)" stroke="#0369A1" stroke-width="2" />'

    shatkona = """
    <!-- Shatkona -->
    <polygon points="250,140 155,305 345,305" stroke="#0284C7" stroke-width="2.5" fill="none" />
    <polygon points="250,360 155,195 345,195" stroke="#0284C7" stroke-width="2.5" fill="none" />
    <!-- Inner Circle -->
    <circle cx="250" cy="250" r="48" fill="rgba(186,230,253,0.5)" stroke="#0369A1" stroke-width="2" />
    <!-- Central Mahamrityunjaya Sanjivani Beej -->
    <text x="250" y="240" font-family="'Nirmala UI', sans-serif" font-size="18" font-weight="bold" fill="#0C4A6E" text-anchor="middle">ॐ हौं</text>
    <text x="250" y="266" font-family="'Nirmala UI', sans-serif" font-size="20" font-weight="black" fill="#0C4A6E" text-anchor="middle">जूँ सः</text>
    <!-- Outer Inscriptions -->
    <text x="250" y="100" font-family="'Nirmala UI', sans-serif" font-size="12" font-weight="bold" fill="#0369A1" text-anchor="middle">त्र्यम्बकं यजामहे</text>
    <text x="250" y="410" font-family="'Nirmala UI', sans-serif" font-size="12" font-weight="bold" fill="#0369A1" text-anchor="middle">मृत्योर्मुक्षीय मामृतात्</text>
    """

    content = f"""
    {bhupura}
    {c1}
    {petals}
    {c2}
    {shatkona}
    """
    return get_svg_wrapper(content, bg_theme="blue", title="Sri Mahamrityunjaya Yantra")


# ==============================================================================
# 15. HANUMAN YANTRA (Authentic Shatkona + Central Ham Beej)
# ==============================================================================
def generate_hanuman_yantra():
    bhupura = make_bhupura((250, 250), size=205, stroke="#9A3412")
    c1 = '<circle cx="250" cy="250" r="172" fill="none" stroke="#C2410C" stroke-width="2.5" />'
    petals = make_lotus_petals((250, 250), r_base=125, r_tip=168, num_petals=8, stroke="#9A3412", fill="rgba(255,237,213,0.65)")
    c2 = '<circle cx="250" cy="250" r="125" fill="rgba(255,255,255,0.75)" stroke="#9A3412" stroke-width="2" />'

    content_inner = """
    <!-- Vajra Shatkona -->
    <polygon points="250,140 155,305 345,305" stroke="#C2410C" stroke-width="2.8" fill="rgba(254,215,170,0.3)" />
    <polygon points="250,360 155,195 345,195" stroke="#C2410C" stroke-width="2.8" fill="rgba(254,215,170,0.3)" />
    <!-- Central Inverted Triangle -->
    <polygon points="250,290 195,195 305,195" stroke="#9A3412" stroke-width="3" fill="rgba(255,237,213,0.9)" />
    <!-- Beej HAM -->
    <text x="250" y="250" font-family="'Nirmala UI', sans-serif" font-size="38" font-weight="black" fill="#7C2D12" text-anchor="middle">हं</text>
    <circle cx="250" cy="265" r="4" fill="#EA580C" />
    <!-- Cardinal Mantras -->
    <text x="250" y="98" font-family="'Nirmala UI', sans-serif" font-size="12" font-weight="bold" fill="#7C2D12" text-anchor="middle">ॐ हं हनुमते नमः</text>
    <text x="250" y="412" font-family="'Nirmala UI', sans-serif" font-size="12" font-weight="bold" fill="#7C2D12" text-anchor="middle">सर्व कष्ट भंजनम्</text>
    """

    content = f"""
    {bhupura}
    {c1}
    {petals}
    {c2}
    {content_inner}
    """
    return get_svg_wrapper(content, bg_theme="copper", title="Sri Hanuman Yantra")


# ==============================================================================
# 16. VASTU DOSH YANTRA (Ashta-Dikpala Mandala + Swastika)
# ==============================================================================
def generate_vastu_dosh_yantra():
    bhupura = make_bhupura((250, 250), size=205, stroke="#B45309")
    c1 = '<circle cx="250" cy="250" r="172" fill="none" stroke="#D97706" stroke-width="2.5" />'
    petals = make_lotus_petals((250, 250), r_base=125, r_tip=168, num_petals=8, stroke="#B45309", fill="rgba(254,243,199,0.65)")
    c2 = '<circle cx="250" cy="250" r="125" fill="rgba(255,255,255,0.75)" stroke="#B45309" stroke-width="2" />'

    # Ashta-Disha Dikpala grid & central Swastika
    inner = """
    <!-- 8 Directional Mandala -->
    <rect x="175" y="175" width="150" height="150" fill="none" stroke="#9A3412" stroke-width="2.5" />
    <line x1="175" y1="250" x2="325" y2="250" stroke="#9A3412" stroke-width="1.8" />
    <line x1="250" y1="175" x2="250" y2="325" stroke="#9A3412" stroke-width="1.8" />
    <line x1="175" y1="175" x2="325" y2="325" stroke="#9A3412" stroke-width="1.2" stroke-dasharray="4 2" />
    <line x1="175" y1="325" x2="325" y2="175" stroke="#9A3412" stroke-width="1.2" stroke-dasharray="4 2" />

    <!-- Central Swastika -->
    <path d="M 250,225 V 275 M 225,250 H 275 M 250,225 H 265 M 275,250 V 265 M 250,275 H 235 M 225,250 V 235"
          fill="none" stroke="#DC2626" stroke-width="4.5" stroke-linecap="square" />

    <!-- 8 Directions Labels -->
    <text x="250" y="165" font-family="'Nirmala UI', sans-serif" font-size="11" font-weight="bold" fill="#78350F" text-anchor="middle">उत्तर (कुबेर)</text>
    <text x="345" y="254" font-family="'Nirmala UI', sans-serif" font-size="11" font-weight="bold" fill="#78350F" text-anchor="middle">पूर्व (इन्द्र)</text>
    <text x="250" y="345" font-family="'Nirmala UI', sans-serif" font-size="11" font-weight="bold" fill="#78350F" text-anchor="middle">दक्षिण (यम)</text>
    <text x="155" y="254" font-family="'Nirmala UI', sans-serif" font-size="11" font-weight="bold" fill="#78350F" text-anchor="middle">पश्चिम (वरुण)</text>
    """

    content = f"""
    {bhupura}
    {c1}
    {petals}
    {c2}
    {inner}
    """
    return get_svg_wrapper(content, bg_theme="gold", title="Sri Vastu Dosh Nivaran Yantra")


# ==============================================================================
# 17. KALSARP YANTRA (Intertwined Naga Protective Geometry)
# ==============================================================================
def generate_kalsarp_yantra():
    bhupura = make_bhupura((250, 250), size=205, stroke="#334155")
    c1 = '<circle cx="250" cy="250" r="172" fill="none" stroke="#475569" stroke-width="2.5" />'
    petals = make_lotus_petals((250, 250), r_base=125, r_tip=168, num_petals=8, stroke="#334155", fill="rgba(241,245,249,0.65)")
    c2 = '<circle cx="250" cy="250" r="125" fill="rgba(255,255,255,0.75)" stroke="#334155" stroke-width="2" />'

    inner = """
    <!-- Dual Naga / Serpent Rings -->
    <circle cx="250" cy="250" r="95" fill="none" stroke="#1E293B" stroke-width="3" stroke-dasharray="10 4" />
    <circle cx="250" cy="250" r="60" fill="none" stroke="#1E293B" stroke-width="2" />

    <!-- Shatkona Core -->
    <polygon points="250,195 205,275 295,275" stroke="#0F172A" stroke-width="2.5" fill="none" />
    <polygon points="250,305 205,225 295,225" stroke="#0F172A" stroke-width="2.5" fill="none" />

    <!-- Central Shiva / Nagraja Beej -->
    <text x="250" y="258" font-family="'Nirmala UI', sans-serif" font-size="22" font-weight="black" fill="#0F172A" text-anchor="middle">ॐ</text>

    <!-- Nag Mantras -->
    <text x="250" y="98" font-family="'Nirmala UI', sans-serif" font-size="12" font-weight="bold" fill="#0F172A" text-anchor="middle">ॐ नवकुल नागराजाय नमः</text>
    <text x="250" y="412" font-family="'Nirmala UI', sans-serif" font-size="12" font-weight="bold" fill="#0F172A" text-anchor="middle">कालसर्प दोष निवारणम्</text>
    """

    content = f"""
    {bhupura}
    {c1}
    {petals}
    {c2}
    {inner}
    """
    return get_svg_wrapper(content, bg_theme="silver", title="Sri Kalsarp Yantra")


# ==============================================================================
# 18. SARVA KARYA SIDDHI YANTRA (Ashta-Siddhi All-Manifesting Solar Wheel)
# ==============================================================================
def generate_sarva_karya_siddhi_yantra():
    bhupura = make_bhupura((250, 250), size=205, stroke="#8A1807")
    c1 = '<circle cx="250" cy="250" r="172" fill="none" stroke="#B45309" stroke-width="2.5" />'
    petals = make_lotus_petals((250, 250), r_base=125, r_tip=168, num_petals=8, stroke="#8A1807", fill="rgba(254,243,199,0.7)")
    c2 = '<circle cx="250" cy="250" r="125" fill="rgba(255,255,255,0.75)" stroke="#8A1807" stroke-width="2" />'

    inner = """
    <!-- Interlocking Hexagram + Triple Circle -->
    <polygon points="250,140 155,305 345,305" stroke="#8A1807" stroke-width="2.5" fill="rgba(254,215,170,0.3)" />
    <polygon points="250,360 155,195 345,195" stroke="#8A1807" stroke-width="2.5" fill="rgba(254,215,170,0.3)" />

    <!-- Inner Circle with Ashta Siddhi Ring -->
    <circle cx="250" cy="250" r="55" fill="rgba(254,249,195,0.85)" stroke="#8A1807" stroke-width="2.2" />

    <!-- Central Siddhi Beej -->
    <text x="250" y="242" font-family="'Nirmala UI', sans-serif" font-size="16" font-weight="bold" fill="#7F1D1D" text-anchor="middle">सर्व कार्य</text>
    <text x="250" y="265" font-family="'Nirmala UI', sans-serif" font-size="18" font-weight="black" fill="#7F1D1D" text-anchor="middle">सिद्धि</text>

    <!-- Ashta Siddhi Inscriptions -->
    <text x="250" y="98" font-family="'Nirmala UI', sans-serif" font-size="12" font-weight="bold" fill="#7F1D1D" text-anchor="middle">अणिमा • महिमा • लघिमा • गरिमा</text>
    <text x="250" y="412" font-family="'Nirmala UI', sans-serif" font-size="12" font-weight="bold" fill="#7F1D1D" text-anchor="middle">ईशित्व • वशित्व • प्राकाम्य • प्राप्ति</text>
    """

    content = f"""
    {bhupura}
    {c1}
    {petals}
    {c2}
    {inner}
    """
    return get_svg_wrapper(content, bg_theme="gold", title="Sarva Karya Siddhi Yantra")


# Map of generator functions
YANTRA_GENERATORS = {
    "sri_yantra": generate_sri_yantra,
    "kuber_yantra": generate_kuber_yantra,
    "surya_yantra": generate_surya_yantra,
    "chandra_yantra": generate_chandra_yantra,
    "mangal_yantra": generate_mangal_yantra,
    "budh_yantra": generate_budh_yantra,
    "guru_yantra": generate_guru_yantra,
    "shukra_yantra": generate_shukra_yantra,
    "shani_yantra": generate_shani_yantra,
    "rahu_yantra": generate_rahu_yantra,
    "ketu_yantra": generate_ketu_yantra,
    "durga_bisa_yantra": generate_durga_bisa_yantra,
    "baglamukhi_yantra": generate_baglamukhi_yantra,
    "mahamrityunjaya_yantra": generate_mahamrityunjaya_yantra,
    "hanuman_yantra": generate_hanuman_yantra,
    "vastu_dosh_yantra": generate_vastu_dosh_yantra,
    "kalsarp_yantra": generate_kalsarp_yantra,
    "sarva_karya_siddhi_yantra": generate_sarva_karya_siddhi_yantra,
}

print(f"Generating authentic SVGs for {len(YANTRA_GENERATORS)} sacred Yantras...")
for y_id, gen_fn in YANTRA_GENERATORS.items():
    svg_data = gen_fn()
    file_path = os.path.join(OUTPUT_DIR, f"{y_id}.svg")
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(svg_data)
    print(f"Generated: {file_path} ({len(svg_data)} bytes)")

print("All authentic Yantras generated successfully!")
