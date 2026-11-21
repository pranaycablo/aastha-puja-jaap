/**
 * scriptureBase.ts
 * Core types and construction helpers for all 11 Canonical Scripture Categories.
 * Provides pure language segregation: Sanskrit, Hindi, English,
 * and 10-12 shloka reading blocks with pause-points.
 */

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
