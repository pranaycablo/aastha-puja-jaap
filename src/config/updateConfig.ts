/**
 * Auto-Update Configuration for Divya Jaap App
 * 
 * जब भी आप नया ऐप अपडेट जारी करें:
 * 1. अपनी वेबसाइट, गिटहब (GitHub Raw) या किसी भी होस्टिंग पर version.json फाइल अपलोड करें।
 * 2. UPDATE_MANIFEST_URL में उस json फाइल का सीधा लिंक दर्ज करें।
 * 3. जब भी यूजर ऑनलाइन आएगा, ऐप स्वतः जांच करेगा और अपडेट उपलब्ध होने पर यूजर को स्वतः अपडेट कर देगा।
 */

export interface AppVersionManifest {
  latestVersion: string;          // उदा. "1.1.0"
  versionCode: number;            // उदा. 2
  minSupportedVersion: string;     // उदा. "1.0.0" (इससे पुराना होने पर अनिवार्य अपडेट)
  forceUpdate: boolean;           // true होने पर बिना अपडेट के आगे नहीं बढ़ेगा
  title: string;                  // "आस्था : पूजा जाप नया अपडेट"
  releaseDate: string;            // "11 नवम्बर 2026"
  releaseNotesHi: string[];       // हिन्दी में नए फीचर्स की सूची
  releaseNotesEn: string[];       // अंग्रेजी में नए फीचर्स की सूची
  apkDownloadUrl: string;         // सीधे APK डाउनलोड का लिंक
  playStoreUrl: string;           // गूगल प्ले स्टोर का लिंक
}

export const APP_CURRENT_VERSION = {
  version: '2.0.0',
  versionCode: 2,
  releaseDate: '2026-11-12'
};

// रिमोट सर्वर का लिंक जहाँ version.json फाइल रखी जाएगी:
// (User can replace with their actual GitHub raw url or server url)
export const UPDATE_MANIFEST_URL = 'https://raw.githubusercontent.com/hindu-zaap/divya-jaap/main/version.json';

// यदि सर्वर ऑफलाइन हो या नेटवर्क परीक्षण हेतु डिफॉल्ट रिमोट मैनिफेस्ट
export const DEFAULT_ONLINE_MANIFEST: AppVersionManifest = {
  latestVersion: '2.0.0',
  versionCode: 2,
  minSupportedVersion: '1.0.0',
  forceUpdate: false,
  title: 'आस्था : पूजा जाप (Aastha : Puja Jaap) - महा-अपडेट v2.0',
  releaseDate: '12 नवम्बर 2026',
  releaseNotesHi: [
    'पावन नाम जप संकीर्तन (राम, कृष्ण, राधे-राधे, ॐ नमः शिवाय, सीताराम, हनुमान)',
    'संपूर्ण १८ अध्याय श्रीमद्भगवद्गीता व शुक्ला यजुर्वेद रुद्राष्टाध्यायी',
    'हाथों की पोरों पर १०८ करमाला जप सचित्र विधान (याज्ञवल्क्य स्मृति)',
    'बैठने के ४ दिव्य आसन व ८ पावन हस्त मुद्राएं (सचित्र दर्शन)',
    'नाद विज्ञान: उपांशु सौम्य ध्वनि, हर मनके पर मंदिर घंटी व १०८वें पर शंखनाद'
  ],
  releaseNotesEn: [
    'Holy Naam Jaap Chanting (Ram, Krishna, Radhe, Shiva, Sitaram, Hanuman)',
    'Complete 18 Chapters of Srimad Bhagavad Gita & Shukla Yajurveda Rudri',
    'Kar-Mala Hand Finger Joints 108 Counting Illustrated Guide',
    '4 Sacred Sitting Asanas & 8 Classical Hasta Mudras with visual diagrams',
    'Divine Sound Science: Soft chanting, temple bell on every bead, conch blast'
  ],
  apkDownloadUrl: 'https://github.com/hindu-zaap/divya-jaap/releases/latest/download/Divya-Jaap-v2.0-RELEASE.apk',
  playStoreUrl: 'https://play.google.com/store/apps/details?id=com.divyajaap.app'
};
