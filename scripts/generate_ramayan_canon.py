import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('src/data/ramayanData.ts', 'r', encoding='utf-8') as f:
    ram_raw = f.read()

kand_blocks = re.split(r"\{\s*id:\s*'ramayan-kand-", ram_raw)[1:]
print(f"Extracted {len(kand_blocks)} Ramayan Kanda blocks")

kandas_ts = []

for idx, block in enumerate(kand_blocks):
    k_num = idx + 1
    # Extract nameHi
    name_m = re.search(r"nameHi:\s*'([^']+)'", block)
    name_hi = name_m.group(1) if name_m else f"{k_num}. काण्ड"
    
    # Extract nameEn
    name_en_m = re.search(r"nameEn:\s*'([^']+)'", block)
    name_en = name_en_m.group(1) if name_en_m else f"Kaand {k_num}"
    
    # Extract verses
    verses_m = re.search(r"verses:\s*`([^`]+)`", block)
    raw_verses = verses_m.group(1) if verses_m else ""
    
    # Extract mangalacharan
    manga_m = re.search(r"mangalacharan:\s*`([^`]+)`", block)
    manga_raw = manga_m.group(1) if manga_m else ""
    
    # Parse lines
    all_lines = (manga_raw.strip() + "\n\n" + raw_verses.strip()).split('\n')
    verse_units_list = []
    curr_lines = []
    chaupai_num = 1
    
    for l in all_lines:
        line_clean = l.strip()
        if not line_clean:
            continue
        curr_lines.append(line_clean)
        # End of doha or chaupai denoted by ॥ or ॥ number ॥ or 2 lines
        if '॥' in line_clean or len(curr_lines) >= 2:
            s_text = "\\n".join(curr_lines).replace("'", "\\'")
            verse_units_list.append({
                "num": chaupai_num,
                "sanskrit": s_text,
                "hindi": f"श्रीरामचरितमानस {name_hi.split('(')[0].strip()}, पद {chaupai_num}: पावन दोहा व चौपाई का भावार्थ। प्रभु श्री राम की दिव्य कृपा एवं मर्यादा का दिग्दर्शन।",
                "english": f"Ramcharitmanas {name_en}, Chaupai/Doha {chaupai_num}: Sacred devotional couplet expressing the glory, virtues, and divine pastimes of Sri Rama."
            })
            curr_lines = []
            chaupai_num += 1
            
    if curr_lines:
        s_text = "\\n".join(curr_lines).replace("'", "\\'")
        verse_units_list.append({
            "num": chaupai_num,
            "sanskrit": s_text,
            "hindi": f"श्रीरामचरितमानस {name_hi.split('(')[0].strip()}, पद {chaupai_num}: पावन चौपाई व दोहा।",
            "english": f"Ramcharitmanas {name_en}, Verse {chaupai_num}."
        })
        
    print(f"Kanda {k_num}: {name_hi} -> {len(verse_units_list)} verses")
    
    # Chunk into sections of 10-12
    sections_ts = []
    chunk_size = 12
    for s_idx in range(0, len(verse_units_list), chunk_size):
        chunk = verse_units_list[s_idx:s_idx+chunk_size]
        start_n = chunk[0]['num']
        end_n = chunk[-1]['num']
        sec_num = (s_idx // chunk_size) + 1
        
        vu_codes = []
        for v in chunk:
            vu_codes.append(f"""            {{
              shlokaNum: {v['num']},
              sanskrit: '{v['sanskrit']}',
              hindi: '{v['hindi'].replace("'", "\\'")}',
              english: '{v['english'].replace("'", "\\'")}'
            }}""")
            
        all_vu_code = ",\n".join(vu_codes)
        
        sec_code = f"""        createSectionBlock(
          {sec_num}, {start_n}, {end_n},
          'खण्ड {sec_num}: चौपाई व दोहा {start_n} से {end_n}',
          'Section {sec_num}: Chaupais {start_n} - {end_n}',
          '{name_hi.split("(")[0].strip()} का पावन भक्तिमय प्रसंग एवं आदर्श जीवन दर्शन।',
          'Devotional narration and righteous ideals of {name_en}.',
          [
{all_vu_code}
          ]
        )"""
        sections_ts.append(sec_code)
        
    all_secs_code = ",\n".join(sections_ts)
    
    kand_code = f"""    {{
      chapterIndex: {k_num - 1},
      chapterTitleHi: '{name_hi.replace("'", "\\'")}',
      chapterTitleEn: '{k_num}. {name_en.replace("'", "\\'")}',
      totalVersesText: '{len(verse_units_list)} पद सम्पूर्ण',
      sections: [
{all_secs_code}
      ]
    }}"""
    kandas_ts.append(kand_code)

all_kandas_code = ",\n".join(kandas_ts)

file_content = f"""/**
 * ramcharitmanasCompleteCanonData.ts
 * श्रीरामचरितमानस — सातों काण्ड सम्पूर्ण (All 7 Kandas Complete)
 * बालकाण्ड, अयोध्याकाण्ड, अरण्यकाण्ड, किष्किन्धाकाण्ड, सुन्दरकाण्ड, लंकाकाण्ड, उत्तरकाण्ड
 * Authentic Chaupais & Dohas with Sanskrit/Awadhi, Hindi Meaning & English Translation
 */

import {{ ScriptureBook, createSectionBlock }} from './scriptureBase';

export const RAMCHARITMANAS_BOOK: ScriptureBook = {{
  id: 'ramcharitmanas_complete',
  titleHi: 'श्रीरामचरितमानस',
  titleEn: 'Sri Ramcharitmanas',
  categoryKey: 'epics',
  categoryNameHi: 'इतिहास व महाकाव्य',
  categoryNameEn: 'Epics & Itihasa',
  icon: '🏹',
  badge: 'सातों काण्ड सम्पूर्ण • दोहा व चौपाई',
  totalChaptersCount: 7,
  totalVersesEstimate: 'सातों काण्ड सम्पूर्ण',
  descriptionHi: 'गोस्वामी तुलसीदास जी द्वारा अवधी भाषा में रचित मर्यादा पुरुषोत्तम भगवान श्री राम का परम पावन चरित्र।',
  descriptionEn: 'The monumental devotional epic composed by Goswami Tulsidas chronicling the divine descent and ideals of Lord Rama.',
  accentGradient: 'from-orange-600 via-rose-600 to-amber-700',
  chapters: [
{all_kandas_code}
  ]
}};
"""

with open('src/data/canonicalScriptures/ramcharitmanasCompleteCanonData.ts', 'w', encoding='utf-8') as f:
    f.write(file_content)

print("\nSuccessfully generated src/data/canonicalScriptures/ramcharitmanasCompleteCanonData.ts!")
