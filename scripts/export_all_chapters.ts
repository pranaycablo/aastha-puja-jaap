import fs from 'fs';
import path from 'path';
import { SCRIPTURE_CANON_CATEGORIES } from '../src/data/grandScriptureCanonData';

const baseOutDir = path.join(process.cwd(), 'public', 'data', 'scriptures');
if (!fs.existsSync(baseOutDir)) {
  fs.mkdirSync(baseOutDir, { recursive: true });
}

let totalBooks = 0;
let totalChapters = 0;

for (const cat of SCRIPTURE_CANON_CATEGORIES) {
  for (const book of cat.books) {
    totalBooks++;
    const bookDir = path.join(baseOutDir, book.id);
    if (!fs.existsSync(bookDir)) {
      fs.mkdirSync(bookDir, { recursive: true });
    }

    // Write metadata index
    const metaIndex = {
      id: book.id,
      titleHi: book.titleHi,
      titleEn: book.titleEn,
      subtitleHi: book.subtitleHi,
      totalChapters: book.chapters ? book.chapters.length : 0,
      categoryKey: cat.key,
      categoryTitle: cat.titleHi
    };
    fs.writeFileSync(path.join(bookDir, 'index.json'), JSON.stringify(metaIndex, null, 2), 'utf-8');

    // Write each chapter
    if (book.chapters && book.chapters.length > 0) {
      book.chapters.forEach((chapter, idx) => {
        totalChapters++;
        const chapterNum = chapter.chapterIndex || idx + 1;
        const chapterFile = path.join(bookDir, `chapter_${chapterNum}.json`);
        fs.writeFileSync(chapterFile, JSON.stringify(chapter, null, 2), 'utf-8');
      });
    }
  }
}

console.log(`Successfully exported ${totalChapters} chapters across ${totalBooks} books to ${baseOutDir}`);
