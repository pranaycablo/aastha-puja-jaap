import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('src/data/grandScriptureCanonData.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find line of CHANAKYA_NITI_BOOK
start_chanakya = -1
end_chanakya = -1

for i, l in enumerate(lines):
    if 'export const CHANAKYA_NITI_BOOK:' in l:
        start_chanakya = i
    if start_chanakya != -1 and 'export const SCRIPTURE_CANON_CATEGORIES:' in l:
        end_chanakya = i
        break

print(f"CHANAKYA_NITI_BOOK range: lines {start_chanakya+1} to {end_chanakya+1}")

chanakya_block = "".join(lines[start_chanakya:end_chanakya])
# Keep from start of SCRIPTURE_CANON_CATEGORIES to end
categories_block = "".join(lines[end_chanakya:])

header_and_imports = """/**
 * grandScriptureCanonData.ts
 * Comprehensive Master Repository for all 11 Canonical Categories of Sanatan Dharma Scriptures.
 * Structured into natural 10-12 shloka "स्वाध्याय खण्ड" (Reading Sections) with
 * complete Sanskrit, Hindi, and English translations.
 */

import {
  RIGVEDA_BOOK,
  YAJURVEDA_BOOK,
  SAMAVEDA_BOOK,
  ATHARVAVEDA_BOOK
} from './canonicalScriptures/vedasCanonData';

import {
  AYURVEDA_BOOK,
  DHANURVEDA_BOOK,
  GANDHARVAVEDA_BOOK,
  STHAPATYAVEDA_BOOK,
  SHIKSHA_VEDANGA_BOOK,
  JYOTISHA_VEDANGA_BOOK,
  VYAKARANA_VEDANGA_BOOK
} from './canonicalScriptures/upavedasVedangasCanonData';

import {
  ISHA_UPANISHAD_BOOK as ISHA_UPANISHAD_CANON,
  KENA_UPANISHAD_BOOK,
  KATHA_UPANISHAD_BOOK,
  MANDUKYA_UPANISHAD_BOOK
} from './canonicalScriptures/upanishadsCanonData';

import {
  VALMIKI_RAMAYANA_BOOK,
  YOGA_VASISTHA_BOOK
} from './canonicalScriptures/epicsCanonData';

import {
  BHAGAVATA_PURANA_BOOK,
  SHIVA_PURANA_BOOK,
  VISHNU_PURANA_BOOK,
  GARUDA_PURANA_BOOK
} from './canonicalScriptures/mahapuranasCanonData';

import {
  DEVI_BHAGAVATA_PURANA_BOOK,
  GANESH_PURANA_BOOK
} from './canonicalScriptures/upapuranasCanonData';

import {
  BRAHMA_SUTRAS_BOOK,
  SAMKHYA_DARSHANA_BOOK,
  PATANJALI_YOGA_SUTRAS_BOOK
} from './canonicalScriptures/darshanasCanonData';

import {
  MANUSMRITI_BOOK,
  VIDURA_NITI_BOOK
} from './canonicalScriptures/smritisNitiCanonData';

import {
  VIJNANA_BHAIRAVA_BOOK,
  PANCHARATRA_AGAMA_BOOK
} from './canonicalScriptures/agamasTantrasCanonData';

import {
  VISHNU_SAHASRANAMA_BOOK,
  SHIVA_TANDAVA_BOOK,
  ADITYA_HRIDAYA_BOOK
} from './canonicalScriptures/stotrasCanonData';

// 100% Complete Canonical Editions (All Chapters & Sections)
import { BHAGAVAD_GITA_BOOK } from './canonicalScriptures/gitaCompleteCanonData';
import { RAMCHARITMANAS_BOOK } from './canonicalScriptures/ramcharitmanasCompleteCanonData';
import { DURGA_SAPTASHATI_BOOK } from './canonicalScriptures/durgaSaptashatiCompleteCanonData';

export { BHAGAVAD_GITA_BOOK, RAMCHARITMANAS_BOOK, DURGA_SAPTASHATI_BOOK };

export interface ScriptureVerseUnit {
  shlokaNum: number;
  sanskrit: string;
  hindi: string;
  english: string;
}

export interface ScriptureSectionBlock {
  sectionIndex: number;
  verseRange: string; // e.g. "श्लोक १ - १२"
  sectionTitleHi: string;
  sectionTitleEn: string;
  tattvaBodhaHi: string;
  tattvaBodhaEn: string;
  verses: ScriptureVerseUnit[];
}

export interface ScriptureChapter {
  chapterIndex: number;
  chapterTitleHi: string;
  chapterTitleEn: string;
  totalVersesText: string;
  sections: ScriptureSectionBlock[];
}

export interface ScriptureBook {
  id: string;
  titleHi: string;
  titleEn: string;
  categoryKey: string;
  categoryNameHi: string;
  categoryNameEn: string;
  icon: string;
  badge: string;
  totalChaptersCount: number;
  totalVersesEstimate: string;
  descriptionHi: string;
  descriptionEn: string;
  accentGradient: string;
  chapters: ScriptureChapter[];
}

export interface ScriptureCategoryDef {
  key: string;
  nameHi: string;
  nameEn: string;
  icon: string;
  countBadge: string;
  descriptionHi: string;
  descriptionEn: string;
  books: ScriptureBook[];
}

export function createSectionBlock(
  sectionIndex: number,
  startNum: number,
  endNum: number,
  titleHi: string,
  titleEn: string,
  tattvaHi: string,
  tattvaEn: string,
  versesList: ScriptureVerseUnit[]
): ScriptureSectionBlock {
  return {
    sectionIndex,
    verseRange: `श्लोक ${startNum} - ${endNum}`,
    sectionTitleHi: titleHi,
    sectionTitleEn: titleEn,
    tattvaBodhaHi: tattvaHi,
    tattvaBodhaEn: tattvaEn,
    verses: versesList
  };
}

"""

full_updated_content = header_and_imports + chanakya_block + categories_block

with open('src/data/grandScriptureCanonData.ts', 'w', encoding='utf-8') as f:
    f.write(full_updated_content)

print("grandScriptureCanonData.ts successfully updated with 100% complete books!")
