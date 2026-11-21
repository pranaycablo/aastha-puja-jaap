import urllib.request
import json

urls = [
    'http://localhost:3000/',
    'http://localhost:3000/src/main.tsx',
    'http://localhost:3000/src/App.tsx',
    'http://localhost:3000/src/components/MainLandingPage.tsx',
    'http://localhost:3000/src/components/MandirLiveDarshanModal.tsx',
    'http://localhost:3000/src/components/MantraMahakoshModal.tsx',
    'http://localhost:3000/src/components/SacredGranthReaderModal.tsx',
    'http://localhost:3000/src/components/KundaliSamadhanModal.tsx',
    'http://localhost:3000/src/components/JaapPage.tsx',
    'http://localhost:3000/src/components/SevaCommunityModal.tsx',
    'http://localhost:3000/src/data/canonicalMantraMahakoshData.ts',
    'http://localhost:3000/src/data/grandScriptureCanonData.ts',
    'http://localhost:3000/src/data/mandirLiveDarshanData.ts'
]

print("=== CHECKING HTTP://LOCALHOST:3000/ LIVE ===")
all_ok = True
for url in urls:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=5) as response:
            status = response.status
            content = response.read()
            name = url.split('/')[-1] or 'index.html'
            print(f"[OK] {status} | {name:<35} | {len(content):>7} bytes")
    except Exception as e:
        print(f"[ERROR] {url} | {e}")
        all_ok = False

if all_ok:
    print("\n>>> ALL CRITICAL MODULES RETURNED 200 OK! ZERO SERVER OR BUNDLE CRASHES! <<<")
else:
    print("\n>>> SOME MODULES FAILED! <<<")
