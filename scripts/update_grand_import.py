# -*- coding: utf-8 -*-

path = 'src/data/grandScriptureCanonData.ts'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

target = '''import {
  BRAHMA_SUTRAS_BOOK,
  SAMKHYA_DARSHANA_BOOK
} from './canonicalScriptures/darshanasCanonData';'''

replacement = '''import {
  BRAHMA_SUTRAS_BOOK,
  SAMKHYA_DARSHANA_BOOK,
  PATANJALI_YOGA_SUTRAS_BOOK
} from './canonicalScriptures/darshanasCanonData';'''

content = content.replace(target, replacement)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated grandScriptureCanonData.ts import!")
