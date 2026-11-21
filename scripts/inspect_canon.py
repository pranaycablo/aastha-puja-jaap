import re
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('src/data/gitaCompleteData.ts', 'r', encoding='utf-8') as f:
    gita_raw = f.read()

print("gitaCompleteData length:", len(gita_raw))
pattern = r"id:\s*'(gita-ch-\d+)',\s*name:\s*'([^']+)'"
matches = re.findall(pattern, gita_raw)
print(f"Found {len(matches)} Gita chapters in gitaCompleteData:")
for m in matches:
    print(" -", m[0], ":", m[1])

with open('src/data/ramayanData.ts', 'r', encoding='utf-8') as f:
    ramayan_raw = f.read()

pattern_ram = r"id:\s*'(ramayan-kand-\d+)',\s*name:\s*'([^']+)'"
matches_ram = re.findall(pattern_ram, ramayan_raw)
print(f"\nFound {len(matches_ram)} Ramayan Kandas in ramayanData:")
for m in matches_ram:
    print(" -", m[0], ":", m[1])

with open('src/data/durgaSaptashatiData.ts', 'r', encoding='utf-8') as f:
    durga_raw = f.read()

pattern_durga = r"id:\s*'([^']+)',\s*name:\s*'([^']+)'"
matches_durga = re.findall(pattern_durga, durga_raw)
print(f"\nFound {len(matches_durga)} items in durgaSaptashatiData:")
for m in matches_durga:
    print(" -", m[0], ":", m[1])
