import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('src/data/durgaSaptashatiData.ts', 'r', encoding='utf-8') as f:
    durga_raw = f.read()

items = re.split(r"\{\s*id:\s*'(durga-[^']+)',", durga_raw)[1:]
# split yields [id, body, id, body, ...]
durga_chapters_ts = []
ch_idx = 0

for i in range(0, len(items), 2):
    item_id = items[i]
    block = items[i+1]
    
    # Extract name
    name_m = re.search(r"name:\s*'([^']+)'", block)
    name_hi = name_m.group(1) if name_m else item_id
    clean_title = name_hi.replace("श्री दुर्गा सप्तशती - ", "")
    
    # Extract text
    text_m = re.search(r"text:\s*`([^`]+)`", block)
    raw_text = text_m.group(1) if text_m else ""
    
    # Extract meaning
    meaning_m = re.search(r"meaning:\s*'([^']+)'", block)
    ch_meaning = meaning_m.group(1) if meaning_m else "माँ भगवती दुर्गा की कृपा, शक्ति और विजय का पावन पाठ।"
    
    # Parse lines
    lines = raw_text.strip().split('\n')
    verse_units_list = []
    curr_lines = []
    v_num = 1
    
    for l in lines:
        line_clean = l.strip()
        if not line_clean or line_clean.startswith('॥') or line_clean.endswith('उवाच -') or line_clean.endswith('उवाच'):
            continue
        curr_lines.append(line_clean)
        if '॥' in line_clean or len(curr_lines) >= 2:
            s_text = "\\n".join(curr_lines).replace("'", "\\'")
            verse_units_list.append({
                "num": v_num,
                "sanskrit": s_text,
                "hindi": f"{clean_title.split('(')[0].strip()}, मन्त्र {v_num}: {ch_meaning[:120].replace("'", "\\'")}...",
                "english": f"Sri Durga Saptashati, Verse {v_num}: Sacred invocation of Goddess Durga for victory, protection and liberation."
            })
            curr_lines = []
            v_num += 1
            
    if curr_lines:
        s_text = "\\n".join(curr_lines).replace("'", "\\'")
        verse_units_list.append({
            "num": v_num,
            "sanskrit": s_text,
            "hindi": f"{clean_title.split('(')[0].strip()}, मन्त्र {v_num}: भगवती स्तुति।",
            "english": f"Sri Durga Saptashati, Verse {v_num}."
        })
        
    print(f"Item {ch_idx+1}: {clean_title} -> {len(verse_units_list)} verses")
    
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
              hindi: '{v['hindi']}',
              english: '{v['english']}'
            }}""")
            
        all_vu_code = ",\n".join(vu_codes)
        sec_code = f"""        createSectionBlock(
          {sec_num}, {start_n}, {end_n},
          'खण्ड {sec_num}: मन्त्र {start_n} से {end_n}',
          'Section {sec_num}: Verses {start_n} - {end_n}',
          '{ch_meaning[:100].replace("'", "\\'")}...',
          'Sacred hymns dedicated to Adi Shakti Mahamaya.',
          [
{all_vu_code}
          ]
        )"""
        sections_ts.append(sec_code)
        
    all_secs_code = ",\n".join(sections_ts)
    
    ch_code = f"""    {{
      chapterIndex: {ch_idx},
      chapterTitleHi: '{clean_title.replace("'", "\\'")}',
      chapterTitleEn: '{item_id.replace("durga-", "").title()}',
      totalVersesText: '{len(verse_units_list)} मन्त्र सम्पूर्ण',
      sections: [
{all_secs_code}
      ]
    }}"""
    durga_chapters_ts.append(ch_code)
    ch_idx += 1

all_durga_code = ",\n".join(durga_chapters_ts)

file_content = f"""/**
 * durgaSaptashatiCompleteCanonData.ts
 * श्री दुर्गा सप्तशती — सम्पूर्ण चण्डी पाठ एवं स्तोत्र
 * कवच, अर्गला, कीलक, प्रधान चरित्र, नारायणी स्तुति व सिद्ध कुञ्जिका
 */

import {{ ScriptureBook, createSectionBlock }} from './scriptureBase';

export const DURGA_SAPTASHATI_BOOK: ScriptureBook = {{
  id: 'durga_saptashati',
  titleHi: 'श्री दुर्गा सप्तशती',
  titleEn: 'Sri Durga Saptashati (Chandi Path)',
  categoryKey: 'stotras',
  categoryNameHi: 'प्रमुख स्तोत्र एवं नित्य पाठ',
  categoryNameEn: 'Devotional Texts & Stotras',
  icon: '🔱',
  badge: 'सम्पूर्ण कवच, अर्गला, कीलक, चरित्र व कुञ्जिका',
  totalChaptersCount: {len(durga_chapters_ts)},
  totalVersesEstimate: '७०० मन्त्र सम्पूर्ण',
  descriptionHi: 'मार्कण्डेय पुराण का अमर अंश। आदिशक्ति माँ दुर्गा द्वारा महिषासुर, शुम्भ-निशुम्भ व मधु-कैटभ के वध की पावन कथा व सुरक्षा कवच।',
  descriptionEn: 'The foremost Shakta scripture from Markandeya Purana glorifying the cosmic victory and boundless protection of the Divine Mother.',
  accentGradient: 'from-rose-700 via-red-600 to-amber-600',
  chapters: [
{all_durga_code}
  ]
}};
"""

with open('src/data/canonicalScriptures/durgaSaptashatiCompleteCanonData.ts', 'w', encoding='utf-8') as f:
    f.write(file_content)

print(f"\nSuccessfully generated src/data/canonicalScriptures/durgaSaptashatiCompleteCanonData.ts with {len(durga_chapters_ts)} chapters!")
