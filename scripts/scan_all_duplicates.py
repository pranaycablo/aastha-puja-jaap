# -*- coding: utf-8 -*-
import glob
import re

all_mantra_files = glob.glob('src/data/*.ts') + glob.glob('src/data/canonicalScriptures/*.ts')
print(f"Scanning {len(all_mantra_files)} files...")

seen_ids = {}
duplicate_ids = []

for fpath in all_mantra_files:
    with open(fpath, 'r', encoding='utf-8') as f:
        text = f.read()
    matches = re.findall(r"id:\s*['\"]([^'\"]+)['\"]", text)
    for mid in matches:
        if mid in seen_ids:
            duplicate_ids.append((mid, seen_ids[mid], fpath))
        else:
            seen_ids[mid] = fpath

print("Total unique IDs across codebase:", len(seen_ids))
print("Total cross-file duplicate IDs:", len(duplicate_ids))
for dup in duplicate_ids[:10]:
    print(f"Duplicate ID '{dup[0]}' in {dup[1]} and {dup[2]}")
