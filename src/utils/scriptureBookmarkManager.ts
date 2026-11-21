/**
 * scriptureBookmarkManager.ts
 * Manages single-point active reading bookmarks per scripture book
 * with auto-resume, section tracking, percentage calculation, and persistence.
 */

export interface ScriptureBookmark {
  bookId: string;
  bookTitle: string;
  categoryKey: string;
  chapterIndex: number;
  chapterTitle: string;
  sectionIndex: number;
  verseRange: string;
  shlokaNum?: number;
  percentage: number;
  timestamp: number;
  updatedAtFormatted: string;
}

const SCRIPTURE_BOOKMARK_KEY = 'aastha_scripture_bookmarks_v2';
const LAST_READ_BOOK_ID_KEY = 'aastha_last_read_book_id_v2';

class ScriptureBookmarkManager {
  /**
   * Get all active scripture bookmarks dictionary { [bookId]: ScriptureBookmark }
   */
  getAllBookmarks(): Record<string, ScriptureBookmark> {
    try {
      const data = localStorage.getItem(SCRIPTURE_BOOKMARK_KEY);
      if (!data) return {};
      return JSON.parse(data) || {};
    } catch (e) {
      console.warn('Failed to load scripture bookmarks', e);
      return {};
    }
  }

  /**
   * Get bookmark for a specific scripture book
   */
  getBookmark(bookId: string): ScriptureBookmark | null {
    const all = this.getAllBookmarks();
    return all[bookId] || null;
  }

  /**
   * Save or update bookmark for a specific book.
   * Ensures the previous bookmark for this book is automatically moved to the new location.
   */
  saveBookmark(
    params: Omit<ScriptureBookmark, 'timestamp' | 'updatedAtFormatted'>
  ): ScriptureBookmark {
    const all = this.getAllBookmarks();
    const now = new Date();
    
    const timeFormatted = now.toLocaleDateString('hi-IN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    const newBookmark: ScriptureBookmark = {
      ...params,
      timestamp: Date.now(),
      updatedAtFormatted: timeFormatted
    };

    all[params.bookId] = newBookmark;
    localStorage.setItem(SCRIPTURE_BOOKMARK_KEY, JSON.stringify(all));
    localStorage.setItem(LAST_READ_BOOK_ID_KEY, params.bookId);

    return newBookmark;
  }

  /**
   * Remove bookmark for a specific book
   */
  clearBookmark(bookId: string): void {
    const all = this.getAllBookmarks();
    if (all[bookId]) {
      delete all[bookId];
      localStorage.setItem(SCRIPTURE_BOOKMARK_KEY, JSON.stringify(all));
    }
  }

  /**
   * Get the most recently read book's bookmark across all 11 categories
   */
  getLastReadBookmark(): ScriptureBookmark | null {
    try {
      const lastId = localStorage.getItem(LAST_READ_BOOK_ID_KEY);
      if (lastId) {
        const bm = this.getBookmark(lastId);
        if (bm) return bm;
      }
      const all = Object.values(this.getAllBookmarks());
      if (all.length === 0) return null;
      all.sort((a, b) => b.timestamp - a.timestamp);
      return all[0];
    } catch {
      return null;
    }
  }
}

export const scriptureBookmarkManager = new ScriptureBookmarkManager();
