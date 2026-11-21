import re
import os
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open('src/data/yantraMahakoshData.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# match block by block
blocks = text.split("id: '")
print(f"Total blocks: {len(blocks) - 1}")

yantras = []
for b in blocks[1:]:
    lines = b.split('\n')
    y_id = lines[0].split("'")[0]
    
    name_m = re.search(r"nameHi:\s*'([^']+)'", b)
    name_hi = name_m.group(1) if name_m else "Unknown"
    
    cat_m = re.search(r"category:\s*'([^']+)'", b)
    cat = cat_m.group(1) if cat_m else "unknown"
    
    geom_m = re.search(r"geometryType:\s*'([^']+)'", b)
    geom = geom_m.group(1) if geom_m else "unknown"
    
    beej_m = re.search(r"beejMantra:\s*'([^']+)'", b)
    beej = beej_m.group(1) if beej_m else ""
    
    accent_m = re.search(r"accentColor:\s*'([^']+)'", b)
    accent = accent_m.group(1) if accent_m else "#D97706"
    
    ink_m = re.search(r"drawingInkColorHex:\s*'([^']+)'", b)
    ink = ink_m.group(1) if ink_m else "#DC2626"
    
    yantras.append({
        'id': y_id,
        'name': name_hi,
        'category': cat,
        'geometry': geom,
        'beej': beej,
        'accent': accent,
        'ink': ink
    })

print(f"Extracted {len(yantras)} yantras:")
for y in yantras:
    print(f" - {y['id']}: {y['name']} [{y['geometry']}, {y['accent']}]")
