import { ScriptureChapter } from '../data/grandScriptureCanonData';

const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/pranaycablo/aastha-puja-jaap/main/public/data/scriptures';
const MEMORY_CACHE = new Map<string, ScriptureChapter>();

export class CloudScriptureLoader {
  private getCacheKey(bookId: string, chapterNum: number): string {
    return `aastha_cloud_scripture_${bookId}_ch_${chapterNum}`;
  }

  /**
   * Check if chapter is already available in memory or localStorage cache
   */
  public getCachedChapter(bookId: string, chapterNum: number): ScriptureChapter | null {
    const key = this.getCacheKey(bookId, chapterNum);
    
    // 1. Memory cache
    if (MEMORY_CACHE.has(key)) {
      return MEMORY_CACHE.get(key)!;
    }

    // 2. LocalStorage cache
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        const parsed = JSON.parse(stored) as ScriptureChapter;
        MEMORY_CACHE.set(key, parsed);
        return parsed;
      }
    } catch {}

    return null;
  }

  /**
   * Save chapter to cache
   */
  public saveToCache(bookId: string, chapterNum: number, chapter: ScriptureChapter): void {
    const key = this.getCacheKey(bookId, chapterNum);
    MEMORY_CACHE.set(key, chapter);
    try {
      localStorage.setItem(key, JSON.stringify(chapter));
    } catch (e) {
      console.warn('LocalStorage save quota exceeded, stored in memory cache only:', e);
    }
  }

  /**
   * Load chapter: checks cache -> fetches from GitHub Raw CDN -> falls back to local or bundled data
   */
  public async loadChapter(
    bookId: string,
    chapterNum: number,
    bundledFallback?: ScriptureChapter
  ): Promise<ScriptureChapter> {
    // 1. Check local cache
    const cached = this.getCachedChapter(bookId, chapterNum);
    if (cached) {
      return cached;
    }

    // 2. If chapter 1 and bundledFallback exists, cache and return immediately
    if (chapterNum === 1 && bundledFallback) {
      this.saveToCache(bookId, chapterNum, bundledFallback);
      return bundledFallback;
    }

    // 3. Fetch from GitHub Raw CDN
    const githubUrl = `${GITHUB_RAW_BASE}/${bookId}/chapter_${chapterNum}.json`;
    const localUrl = `/data/scriptures/${bookId}/chapter_${chapterNum}.json`;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      // Try GitHub CDN first
      let response = await fetch(githubUrl, {
        signal: controller.signal,
        cache: 'no-cache'
      }).catch(() => null);

      clearTimeout(timeoutId);

      // Fallback to local server if GitHub fails or in sandbox
      if (!response || !response.ok) {
        response = await fetch(localUrl).catch(() => null);
      }

      if (response && response.ok) {
        const chapterData = (await response.json()) as ScriptureChapter;
        this.saveToCache(bookId, chapterNum, chapterData);
        return chapterData;
      }
    } catch (e) {
      console.warn(`Cloud fetch failed for ${bookId} chapter ${chapterNum}:`, e);
    }

    // 4. Return bundled fallback if available
    if (bundledFallback) {
      this.saveToCache(bookId, chapterNum, bundledFallback);
      return bundledFallback;
    }

    throw new Error(`अध्याय ${chapterNum} लोड नहीं हो सका। कृपया इंटरनेट कनेक्शन जांचें।`);
  }

  /**
   * Preload next chapter quietly in background for zero-latency reading
   */
  public preloadNextChapter(bookId: string, nextChapterNum: number): void {
    if (this.getCachedChapter(bookId, nextChapterNum)) return;
    
    setTimeout(() => {
      this.loadChapter(bookId, nextChapterNum).catch(() => {
        // Silent fail on background preload
      });
    }, 1500);
  }
}

export const cloudScriptureLoader = new CloudScriptureLoader();
