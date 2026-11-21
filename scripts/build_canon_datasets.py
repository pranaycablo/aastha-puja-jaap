# -*- coding: utf-8 -*-
"""
build_canon_datasets.py
Generates comprehensive canonical TypeScript scripture modules for all 11 categories:
1. vedasCanonData.ts
2. upavedasVedangasCanonData.ts
3. upanishadsCanonData.ts
4. epicsCanonData.ts
5. mahapuranasCanonData.ts
6. upapuranasCanonData.ts
7. darshanasCanonData.ts
8. smritisNitiCanonData.ts
9. agamasTantrasCanonData.ts
10. stotrasCanonData.ts
"""
import os
import sys

# Ensure UTF-8 output
sys.stdout.reconfigure(encoding='utf-8')

os.makedirs('src/data/canonicalScriptures', exist_ok=True)
print("Generating canonical scripture datasets...")
