# -*- coding: utf-8 -*-
import re

with open('src/data/mantraDatabase.ts', 'r', encoding='utf-8') as f:
    content = f.read()

ids = re.findall(r"id:\s*['\"]([^'\"]+)['\"]", content)
print('Total IDs found in mantraDatabase:', len(ids))
unique_ids = set()
duplicates = []
for i in ids:
    if i in unique_ids:
        duplicates.append(i)
    else:
        unique_ids.add(i)

print('Unique IDs:', len(unique_ids))
print('Duplicates count:', len(duplicates))
if duplicates:
    print('Duplicates sample:', duplicates[:15])
