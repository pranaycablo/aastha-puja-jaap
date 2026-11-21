/**
 * Google AdMob Configuration for Divya Jaap App
 * 
 * निर्देश (Instructions):
 * 1. अपने Google AdMob अकाउंट (https://admob.google.com) में जाकर नया App जोड़ें।
 * 2. प्राप्त Ad Unit IDs को नीचे दिए गए स्थानों में दर्ज करें।
 * 3. टेस्टिंग के समय IS_TEST_MODE को true रखें ताकि AdMob खाता सुरक्षित रहे।
 * 4. Play Store पर पब्लिश करते समय IS_TEST_MODE को false करें।
 */

export interface AdMobConfigType {
  // Google AdMob Application ID (Also update in AndroidManifest.xml)
  admobAppId: string;
  
  // Banner Ad Unit ID (नीचे बॉटम में दिखने वाला बैनर विज्ञापन)
  bannerAdUnitId: string;
  
  // Native Advanced Ad Unit ID (नोटिफिकेशन व सूची के बीच दिखने वाला विज्ञापन)
  nativeAdvancedAdUnitId: string;
  
  // Rewarded Video Ad Unit ID (जाप शुरू करने से पहले दिखने वाला रिवॉर्डेड विज्ञापन)
  rewardedAdUnitId: string;
  
  // Interstitial Ad Unit ID (सत्र समाप्त होने पर दिखने वाला विज्ञापन)
  interstitialAdUnitId: string;

  // Test Mode toggle (Google official test IDs used when true)
  isTestMode: boolean;
}

// Google Official Test Ad Unit IDs (सुरक्षित परीक्षण हेतु मानक टेस्ट आईडी)
export const GOOGLE_TEST_AD_UNITS = {
  appId: 'ca-app-pub-3940256099942544~3347511713',
  banner: 'ca-app-pub-3940256099942544/6300978111',
  nativeAdvanced: 'ca-app-pub-3940256099942544/2247696110',
  rewarded: 'ca-app-pub-3940256099942544/5224354917',
  interstitial: 'ca-app-pub-3940256099942544/1033173712'
};

// उपयोगकर्ता की वास्तविक AdMob आईडी (User's Real AdMob IDs):
// यहां अपनी असली AdMob आईडी डालें (Replace with your actual AdMob IDs):
export const USER_PRODUCTION_AD_UNITS = {
  appId: 'ca-app-pub-3940256099942544~3347511713', // <-- अपनी असली AdMob App ID यहां डालें
  banner: 'ca-app-pub-3940256099942544/6300978111', // <-- अपनी असली Banner ID यहां डालें
  nativeAdvanced: 'ca-app-pub-3940256099942544/2247696110', // <-- अपनी असली Native Advanced ID यहां डालें
  rewarded: 'ca-app-pub-3940256099942544/5224354917', // <-- अपनी असली Rewarded ID यहां डालें
  interstitial: 'ca-app-pub-3940256099942544/1033173712' // <-- अपनी असली Interstitial ID यहां डालें
};

// वर्तमान विज्ञापन सेटिंग्स
export const ADMOB_SETTINGS: AdMobConfigType = {
  isTestMode: true, // लाइव रिलीज में अपनी असली आईडी डालने पर इसे false कर दें
  admobAppId: GOOGLE_TEST_AD_UNITS.appId,
  bannerAdUnitId: GOOGLE_TEST_AD_UNITS.banner,
  nativeAdvancedAdUnitId: GOOGLE_TEST_AD_UNITS.nativeAdvanced,
  rewardedAdUnitId: GOOGLE_TEST_AD_UNITS.rewarded,
  interstitialAdUnitId: GOOGLE_TEST_AD_UNITS.interstitial
};

/**
 * Get active Ad Unit ID based on test or live configuration
 */
export const getActiveAdUnit = (
  adType: 'banner' | 'nativeAdvanced' | 'rewarded' | 'interstitial'
): string => {
  if (ADMOB_SETTINGS.isTestMode) {
    return GOOGLE_TEST_AD_UNITS[adType];
  }
  return USER_PRODUCTION_AD_UNITS[adType] || GOOGLE_TEST_AD_UNITS[adType];
};
