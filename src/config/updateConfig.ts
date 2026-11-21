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
  version: '2.6.0',
  versionCode: 6,
  releaseDate: '2026-11-21'
};

// रिमोट सर्वर का लिंक जहाँ version.json फाइल रखी जाएगी:
export const UPDATE_MANIFEST_URL = 'https://raw.githubusercontent.com/pranaycablo/aastha-puja-jaap/main/version.json';

// यदि सर्वर ऑफलाइन हो या नेटवर्क परीक्षण हेतु डिफॉल्ट रिमोट मैनिफेस्ट
export const DEFAULT_ONLINE_MANIFEST: AppVersionManifest = {
  latestVersion: '2.6.0',
  versionCode: 6,
  minSupportedVersion: '1.0.0',
  forceUpdate: false,
  title: 'आस्था : पूजा जाप (Aastha : Puja Jaap) v2.6 Golden Release',
  releaseDate: '21 नवम्बर 2026',
  releaseNotesHi: [
    'श्रीमद्भगवद्गीता के सम्पूर्ण १८ अध्याय व श्रीरामचरितमानस के सातों काण्ड',
    'श्री दुर्गा सप्तशती सम्पूर्ण चण्डी पाठ व पातञ्जल योगसूत्र सम्पूर्ण ४ पाद',
    'अगला पृष्ठ लोड करें (Load Next Page) एवं श्लोक पॉज/ऑटो-रिज़्यूम सुविधा',
    'चार धाम व २४x७ लाइव मन्दिर दर्शन, सनातन मन्त्र महाकोश व वैदिक कुण्डली'
  ],
  releaseNotesEn: [
    'All 18 chapters of Bhagavad Gita and all 7 Kandas of Ramcharitmanas',
    'Complete Durga Saptashati Chandi Path and Patanjali Yoga Sutras',
    'Load Next Page feature and Shloka pause/auto-resume bookmarking',
    'Char Dham 24x7 Live Darshan, Mantra Mahakosh and Vedic Kundali'
  ],
  apkDownloadUrl: 'https://github.com/pranaycablo/aastha-puja-jaap/releases/download/v2.6.0/Aastha-Puja-Jaap-v2.6-FINAL-GOLDEN.apk',
  playStoreUrl: 'https://play.google.com/store/apps/details?id=com.divyajaap.app'
};
