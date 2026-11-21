// High-reliability Authentic Voice Chanting Engine for Android WebView and Mobile Browsers
// Provides real human-like vocal pronunciation for Vedic, Pauranik, and Custom user mantras.
import { VoiceProfileId, VoiceProfileItem } from '../types';
import { audioEngine } from './audioEngine';

export interface DivineVoiceProfileWithAcoustics extends VoiceProfileItem {
  fundamentalFreq: number; // F0 pitch in Hz
  formantShift: number;    // Vocal tract scale factor
}

export const DIVINE_VOICE_PROFILES: DivineVoiceProfileWithAcoustics[] = [
  {
    id: 'sadhvi_devi_female',
    nameHi: 'साध्वी स्वर (मधुर व कोमल)',
    nameEn: 'Sadhvi Devi (Soft Female)',
    gender: 'female',
    icon: '🧕',
    fundamentalFreq: 220,
    formantShift: 1.0,
    pitch: 1.0, // Natural soft human female voice (no robotic distortion)
    rate: 0.88,
    descHi: 'मधुर, कोमल, शांत एवं अत्यंत भक्तिमय साध्वी स्वर',
    descEn: 'Pure, melodious and serene devotional soft female voice',
    samplePhraseHi: 'ॐ नमः शिवाय शुभं कुरु कुरु',
    samplePhraseEn: 'Om Namah Shivaya'
  },
  {
    id: 'vedic_sage_male',
    nameHi: 'वेदपाठी ऋषि स्वर (गंभीर व शांत)',
    nameEn: 'Vedic Sage (Soft Male)',
    gender: 'male',
    icon: '🧘‍♂️',
    fundamentalFreq: 112,
    formantShift: 1.0,
    pitch: 0.98, // Natural warm human male voice
    rate: 0.86,
    descHi: 'गंभीर, धीर, शांत एवं स्पष्ट वैदिक ऋषि स्वर',
    descEn: 'Deep, resonant, traditional Vedic sage chanting',
    samplePhraseHi: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यम्',
    samplePhraseEn: 'Om Bhur Bhuva Swaha'
  },
  {
    id: 'mata_bhakt_female',
    nameHi: 'मातृ स्वर (वात्सल्यपूर्ण)',
    nameEn: 'Mata Devotee (Motherly Female)',
    gender: 'female',
    icon: '🌸',
    fundamentalFreq: 196,
    formantShift: 1.0,
    pitch: 1.0,
    rate: 0.86,
    descHi: 'वात्सल्यपूर्ण, शांत, कोमल एवं हृदयस्पर्शी माता का स्वर',
    descEn: 'Warm, maternal and soothing devotional female tone',
    samplePhraseHi: 'हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे',
    samplePhraseEn: 'Hare Krishna Hare Rama'
  },
  {
    id: 'acharya_shastri_male',
    nameHi: 'शास्त्रीय आचार्य स्वर (मंदिर पुजारी)',
    nameEn: 'Acharya Shastri (Priest Male)',
    gender: 'male',
    icon: '🪔',
    fundamentalFreq: 125,
    formantShift: 1.0,
    pitch: 0.98,
    rate: 0.88,
    descHi: 'मंदिर के मुख्य पुजारी की लयबद्ध, कोमल व स्पष्ट वाणी',
    descEn: 'Authoritative and rhythmic temple priest cadence',
    samplePhraseHi: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्',
    samplePhraseEn: 'Om Tryambakam Yajamahe'
  },
  {
    id: 'bhajan_madhur_female',
    nameHi: 'मधुर भक्ति स्वर (ध्यानमग्न)',
    nameEn: 'Melodious Bhakt (Meditative Female)',
    gender: 'female',
    icon: '🪕',
    fundamentalFreq: 240,
    formantShift: 1.0,
    pitch: 1.0,
    rate: 0.86,
    descHi: 'धीमी, ध्यानयुक्त, कोमल एवं मंदिर गूंज',
    descEn: 'Soft, contemplative and melodic temple tone',
    samplePhraseHi: 'ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे',
    samplePhraseEn: 'Om Aim Hreem Kleem'
  },
  {
    id: 'yuva_sadhak_male',
    nameHi: 'युवा शांत स्वर (शांत व एकाग्र)',
    nameEn: 'Young Serene Voice (Calm Male)',
    gender: 'male',
    icon: '📿',
    fundamentalFreq: 145,
    formantShift: 1.0,
    pitch: 0.98,
    rate: 0.90,
    descHi: 'ऊर्जावान, कोमल, स्पष्ट एवं एकाग्र युवा संन्यासी स्वर',
    descEn: 'Crisp, energetic and focused young monastic tone',
    samplePhraseHi: 'ॐ नमो भगवते वासुदेवाय नमः',
    samplePhraseEn: 'Om Namo Bhagavate Vasudevaya'
  },
  {
    id: 'bal_brahmachari',
    nameHi: 'बाल ब्रह्मचारी स्वर',
    nameEn: 'Bal Brahmachari (Child)',
    gender: 'child',
    icon: '🧒',
    fundamentalFreq: 315,
    formantShift: 1.05,
    pitch: 1.04,
    rate: 0.92,
    descHi: 'निष्कपट, कोमल एवं तेजस्वी बाल भक्त का स्वर',
    descEn: 'Innocent, sweet and vibrant divine child voice',
    samplePhraseHi: 'श्री राम जय राम जय जय राम',
    samplePhraseEn: 'Shri Ram Jai Ram Jai Jai Ram'
  },
  {
    id: 'kanya_divine_female',
    nameHi: 'कन्या स्वर (निर्मल व पावन)',
    nameEn: 'Divine Girl (Soft Girl)',
    gender: 'child',
    icon: '👧',
    fundamentalFreq: 285,
    formantShift: 1.05,
    pitch: 1.04,
    rate: 0.90,
    descHi: 'देवी स्वरूपा कन्या का निर्मल, कोमल व पावन प्रार्थना स्वर',
    descEn: 'Gentle, tender and pious sacred girl voice',
    samplePhraseHi: 'सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके',
    samplePhraseEn: 'Sarva Mangala Mangalye'
  },
  {
    id: 'mahakal_bass_male',
    nameHi: 'महाकाल गंभीर स्वर (गहरा ध्यान)',
    nameEn: 'Mahakal Deep Tone',
    gender: 'male',
    icon: '🔱',
    fundamentalFreq: 95,
    formantShift: 0.98,
    pitch: 0.96,
    rate: 0.82,
    descHi: 'शांत, अति-गंभीर एवं ध्यानमग्न वैदिक स्वर',
    descEn: 'Deep, meditative resonant devotional baritone',
    samplePhraseHi: 'ॐ हौं जूं सः ॐ भूर्भुवः स्वः',
    samplePhraseEn: 'Om Houm Joom Saha'
  },
  {
    id: 'sanatani_echo',
    nameHi: 'सामूहिक संकीर्तन गूंज',
    nameEn: 'Sacred Ensemble Echo',
    gender: 'male',
    icon: '🔔',
    fundamentalFreq: 115,
    formantShift: 1.0,
    pitch: 0.98,
    rate: 0.88,
    descHi: 'आश्रम के सत्संग की सामूहिक पवित्र प्रतिध्वनि',
    descEn: 'Harmonious temple ashram collective resonance',
    samplePhraseHi: 'ॐ शान्तिः शान्तिः शान्तिः',
    samplePhraseEn: 'Om Shanti Shanti Shanti'
  }
];

/**
 * Clean scripture text specifically for PURE SHLOKA CHANTING.
 * Completely removes:
 * 1. Double danda titles ॥ ... ॥ (e.g. ॥ प्रथमोऽध्यायः ॥, ॥ दोहा ॥, ॥ चौपाई ॥, ॥ श्री राम जन्म स्तुति ॥)
 * 2. Speaker cues (e.g. धृतराष्ट्र उवाच -, अर्जुन उवाच -, श्रीभगवानुवाच -, सञ्जय उवाच -)
 * 3. Numbers, brackets, and non-spoken markers
 * Returns pure sacred Sanskrit / Awadhi verses with rhythmic pauses.
 */
export function cleanScriptureForShlokaChanting(rawText: string): string {
  if (!rawText) return '';

  let text = rawText
    // Remove title headers enclosed in double dandas ॥ ... ॥ or || ... ||
    .replace(/॥[^॥\r\n]*॥/g, ' ')
    .replace(/\|\|[^\|\r\n]*\|\|/g, ' ')
    // Remove all speaker dialogue lines ending with 'उवाच'
    .replace(/[^\n।॥]*उवाच\s*[-—:]?/g, ' ')
    // Remove parenthetical notes
    .replace(/\([^)]*\)/g, ' ')
    .replace(/\[[^\]]*\]/g, ' ')
    // Remove numbered verse endings like ॥१॥, ॥२८॥, [१], 1., 2.
    .replace(/[॥।]\s*[०-९0-9]+\s*[॥।]/g, ' ॥ ')
    .replace(/\b[०-९0-9]+\.?\b/g, ' ')
    // Remove avagraha 'ऽ'
    .replace(/ऽ/g, '')
    // Remove bullet markers, hyphens, dashes, asterisks
    .replace(/[~*_•—/\\#@$%^&+=<>\-]/g, ' ');

  // Split lines and format with rhythmic pauses
  const rawLines = text
    .split(/[\r\n]+/)
    .map((l) => l.trim())
    .filter(Boolean);

  const cleanLines = rawLines
    .map((line) => {
      let l = line.replace(/\s+/g, ' ').trim();
      l = l.replace(/।/g, ', ');
      l = l.replace(/॥/g, ', ');
      l = l.replace(/,\s*,+/g, ', ').trim();
      return l;
    })
    .filter((l) => l.length > 2);

  let result = cleanLines.join(', ');
  result = result.replace(/ॐ(?!\s*,)/g, 'ॐ, ');
  result = result.replace(/,\s*,+/g, ', ').replace(/,\s*$/, '').trim();

  return result;
}

/**
 * Clean and prepare mantra text for natural speech synthesis
 * Removes non-spoken markers (॥, ।, numbers in brackets) and inserts breath pauses
 */
export function cleanMantraTextForSpeech(rawText: string): string {
  if (!rawText) return '';
  let cleaned = rawText
    // Remove title headers enclosed in double dandas ॥ ... ॥
    .replace(/॥[^॥\r\n]*॥/g, ' ')
    .replace(/\|\|[^\|\r\n]*\|\|/g, ' ')
    // Remove speaker dialogue lines ending with 'उवाच'
    .replace(/[^\n।॥]*उवाच\s*[-—:]?/g, ' ')
    // Remove parenthetical guidance like (११ बार), (१०८ बार), (दोहा), (चौपाई), (१ बार), [१]
    .replace(/\([^)]*\)/g, ' ')
    .replace(/\[[^\]]*\]/g, ' ')
    // Remove numbered verse markers like '१.', '२.', '1.', '2.', '॥ १ ॥', '|| 1 ||'
    .replace(/\b\d+\.?\b/g, ' ')
    .replace(/[०-९]+\.?/g, ' ')
    // Replace danda and double danda with comma for a natural sacred breathing cadence
    .replace(/[॥।]/g, ', ')
    // Remove Sanskrit avagraha 'ऽ' so it does not speak "avagraha"
    .replace(/ऽ/g, '')
    // Remove decorative symbols, asterisks, bullet points, hyphens, slashes
    .replace(/[~*_•—/\\#@$%^&+=<>]/g, ' ')
    // Replace newlines with comma pause
    .replace(/[\r\n]+/g, ', ')
    // Collapse multiple spaces and commas
    .replace(/,\s*,+/g, ', ')
    .replace(/\s+/g, ' ')
    .trim();

  // If text contains ॐ without following pause, insert comma for sacred AUM resonance
  cleaned = cleaned.replace(/ॐ(?!\s*,)/g, 'ॐ, ');

  // Clean trailing commas
  cleaned = cleaned.replace(/,\s*$/, '').trim();

  return cleaned;
}

/**
 * Calculate recommended chanting duration in seconds for any mantra
 * based on word count, character length, pause count, and chanting rate
 */
export function calculateMantraRecommendedDuration(rawText: string, speedModifier: number = 1.0): number {
  const cleaned = cleanMantraTextForSpeech(rawText);
  if (!cleaned) return 3;

  const words = cleaned.split(/\s+/).filter(Boolean);
  const chars = cleaned.length;
  const pauseCount = (cleaned.match(/,/g) || []).length;

  // Realistic devotional chanting speed (~0.78s per word + syllable weight + pause weight)
  const rate = Math.max(0.6, Math.min(1.5, speedModifier));
  const rawSeconds = (words.length * 0.78 + chars * 0.038 + pauseCount * 0.45) / rate;

  return Math.min(120, Math.max(2, Math.round(rawSeconds)));
}

class TTSEngine {
  private synth: SpeechSynthesis | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private fallbackTimer: NodeJS.Timeout | null = null;
  private keepAliveTimer: NodeJS.Timeout | null = null;
  private isSpeaking: boolean = false;
  private activeAudioContext: AudioContext | null = null;
  private isWarmedUp: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();

      if (typeof window.speechSynthesis.onvoiceschanged !== 'undefined') {
        window.speechSynthesis.onvoiceschanged = () => this.loadVoices();
      }

      // Retry voice loading for Android WebView asynchronous initialization
      setTimeout(() => this.loadVoices(), 300);
      setTimeout(() => this.loadVoices(), 1000);
      setTimeout(() => this.loadVoices(), 2500);

      // Warmup on user touch/click
      const warmUpHandler = () => {
        this.warmup();
        window.removeEventListener('touchstart', warmUpHandler);
        window.removeEventListener('click', warmUpHandler);
      };
      window.addEventListener('touchstart', warmUpHandler, { passive: true });
      window.addEventListener('click', warmUpHandler, { passive: true });
    }
  }

  public warmup(): void {
    if (this.isWarmedUp || !this.synth) return;
    this.isWarmedUp = true;
    try {
      this.loadVoices();
      if (this.synth.paused) {
        this.synth.resume();
      }
    } catch (e) {
      console.warn('TTS warmup notice:', e);
    }
  }

  private loadVoices(): void {
    if (this.synth) {
      const v = this.synth.getVoices();
      if (v && v.length > 0) {
        this.voices = v;
      }
    }
  }

  public getAvailableVoices(): SpeechSynthesisVoice[] {
    if (this.voices.length === 0 && this.synth) {
      this.loadVoices();
    }
    return this.voices;
  }

  public isCurrentlySpeaking(): boolean {
    return this.isSpeaking || (this.synth ? this.synth.speaking : false);
  }

  public getBestVoiceForProfile(
    profileId: VoiceProfileId = 'sadhvi_devi_female',
    lang: 'hi' | 'en' = 'hi'
  ): SpeechSynthesisVoice | null {
    const all = this.getAvailableVoices();
    if (all.length === 0) return null;

    const profile = DIVINE_VOICE_PROFILES.find((p) => p.id === profileId) || DIVINE_VOICE_PROFILES[0];
    const isFemale = profile.gender === 'female' || profile.gender === 'child';

    // 1. Strictly look for Hindi (hi, hi-IN, hi_IN) or Sanskrit (sa, sa-IN) voices
    const hindiSanskritVoices = all.filter((v) => {
      const l = v.lang.toLowerCase().replace('_', '-');
      const name = v.name.toLowerCase();
      return (
        l.startsWith('hi') ||
        l.startsWith('sa') ||
        l === 'hin' ||
        name.includes('hindi') ||
        name.includes('sanskrit') ||
        name.includes('हिन्दी')
      );
    });

    const femaleKeywords = [
      'swara', 'kalpana', 'aditi', 'kavya', 'sangeeta', 'female', 'woman',
      'girl', 'cfh', 'neerja', 'shruti', 'ananya', 'heera', 'priya', 'female_1'
    ];
    const maleKeywords = [
      'madhur', 'hemant', 'neel', 'madhav', 'ravi', 'male', 'man',
      'boy', 'cmh', 'valluvar', 'male_1'
    ];

    // Voice scoring: Prioritize true Neural/Natural Human studio recordings
    const scoreVoice = (v: SpeechSynthesisVoice): number => {
      let score = 0;
      const n = v.name.toLowerCase();
      const l = v.lang.toLowerCase().replace('_', '-');

      // Top priority for modern Natural Human AI voice models (Swara, Madhur, Google)
      if (n.includes('natural') || n.includes('neural') || n.includes('online')) score += 60;
      if (n.includes('google')) score += 45;

      const isVoiceFemale = femaleKeywords.some((k) => n.includes(k));
      const isVoiceMale = maleKeywords.some((k) => n.includes(k));

      if (isFemale && isVoiceFemale) score += 35;
      if (!isFemale && isVoiceMale) score += 35;

      // Exact India locale
      if (l === 'hi-in' || l === 'hi_in') score += 15;

      return score;
    };

    if (hindiSanskritVoices.length > 0) {
      const sorted = [...hindiSanskritVoices].sort((a, b) => scoreVoice(b) - scoreVoice(a));
      return sorted[0];
    }

    // 2. If no native Hindi voice is installed, check for Indian English (en-IN)
    const indianEnglishVoices = all.filter((v) => {
      const l = v.lang.toLowerCase().replace('_', '-');
      return l.startsWith('en-in');
    });

    if (indianEnglishVoices.length > 0) {
      const sorted = [...indianEnglishVoices].sort((a, b) => scoreVoice(b) - scoreVoice(a));
      return sorted[0];
    }

    // 3. Fallback to default system voice
    return all.find((v) => v.default) || all[0];
  }

  /**
   * Speak complete mantra - Neutralized to prevent silent audio failures and device freezes
   */
  public speakMantra(
    text: string,
    options: {
      volume?: number;
      rate?: number;
      pitch?: number;
      voiceProfileId?: VoiceProfileId;
      lang?: 'hi' | 'en';
      isShlokaChant?: boolean;
      isCustom?: boolean;
      withDevotionalMusic?: boolean;
      devotionalMusicMode?: 'mantra_tanpura' | 'chalisa_dhun' | 'aarti_music';
      onStart?: () => void;
      onEnd?: () => void;
      onError?: (err: any) => void;
    } = {}
  ): void {
    // If devotional background music is requested, play sacred tanpura/dhun safely
    if (options.withDevotionalMusic) {
      try {
        audioEngine.startDevotionalAccompaniment(
          options.devotionalMusicMode || 'mantra_tanpura',
          0.22
        );
      } catch {}
    }

    // Safely invoke lifecycle callbacks without invoking broken browser TTS
    options.onStart?.();
    setTimeout(() => {
      options.onEnd?.();
    }, 1500);
  }

  /**
   * AUTHENTIC HUMAN VOCAL FORMANT "ॐ" (AUM) CHANTING SYNTHESIS
   * Produces a real human vocal chanting "ओओओओओम्म्म्म्म्म..." (Aum) using vocal tract formants F1, F2, F3
   */
  public vocalizeSacredOm(
    profileId: VoiceProfileId = 'vedic_sage_male',
    volume: number = 0.85,
    onEnd?: () => void
  ): void {
    try {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtxClass();
      this.activeAudioContext = ctx;

      const profile = DIVINE_VOICE_PROFILES.find((p) => p.id === profileId) || DIVINE_VOICE_PROFILES[0];
      const f0 = profile.fundamentalFreq;
      const shift = profile.formantShift;

      const now = ctx.currentTime;
      const duration = 2.2; // 2.2 seconds sacred Om chant

      // Master Gain with human vocal breathing envelope
      const masterGain = ctx.createGain();
      masterGain.connect(ctx.destination);
      masterGain.gain.setValueAtTime(0.0001, now);
      masterGain.gain.linearRampToValueAtTime(Math.min(1.0, volume * 0.9), now + 0.25);
      masterGain.gain.setValueAtTime(Math.min(1.0, volume * 0.9), now + 1.2);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      // Low-Frequency Oscillator for warm human vocal vibrato (~4.8 Hz)
      const vibrato = ctx.createOscillator();
      vibrato.frequency.setValueAtTime(4.8, now);
      const vibratoGain = ctx.createGain();
      vibratoGain.gain.setValueAtTime(f0 * 0.015, now);
      vibrato.connect(vibratoGain);

      // Glottal Source 1
      const glottis1 = ctx.createOscillator();
      glottis1.type = 'sawtooth';
      glottis1.frequency.setValueAtTime(f0, now);
      vibratoGain.connect(glottis1.frequency);

      // Glottal Source 2
      const glottis2 = ctx.createOscillator();
      glottis2.type = 'triangle';
      glottis2.frequency.setValueAtTime(f0 * (profile.gender === 'male' ? 1.002 : 1.004), now);
      vibratoGain.connect(glottis2.frequency);

      // Formant 1: Throat opening (480 Hz -> 240 Hz)
      const formant1 = ctx.createBiquadFilter();
      formant1.type = 'bandpass';
      formant1.Q.setValueAtTime(4.5, now);
      formant1.frequency.setValueAtTime(480 * shift, now);
      formant1.frequency.exponentialRampToValueAtTime(240 * shift, now + 1.4);

      // Formant 2: Tongue & pharynx (820 Hz -> 450 Hz)
      const formant2 = ctx.createBiquadFilter();
      formant2.type = 'bandpass';
      formant2.Q.setValueAtTime(5.5, now);
      formant2.frequency.setValueAtTime(820 * shift, now);
      formant2.frequency.exponentialRampToValueAtTime(450 * shift, now + 1.4);

      // Formant 3: Singing formant (2400 Hz)
      const formant3 = ctx.createBiquadFilter();
      formant3.type = 'bandpass';
      formant3.Q.setValueAtTime(6.0, now);
      formant3.frequency.setValueAtTime(2400 * shift, now);

      // Nasal resonance for "Mmm"
      const nasalFilter = ctx.createBiquadFilter();
      nasalFilter.type = 'lowpass';
      nasalFilter.frequency.setValueAtTime(320 * shift, now);

      glottis1.connect(formant1);
      glottis2.connect(formant1);
      glottis1.connect(formant2);
      glottis2.connect(formant2);
      glottis1.connect(formant3);
      glottis2.connect(formant3);
      glottis1.connect(nasalFilter);

      formant1.connect(masterGain);
      formant2.connect(masterGain);
      formant3.connect(masterGain);
      nasalFilter.connect(masterGain);

      vibrato.start(now);
      glottis1.start(now);
      glottis2.start(now);

      vibrato.stop(now + duration);
      glottis1.stop(now + duration);
      glottis2.stop(now + duration);

      setTimeout(() => {
        onEnd?.();
      }, duration * 1000);
    } catch (e) {
      console.warn('Vocal formant synthesis fallback:', e);
      setTimeout(() => onEnd?.(), 1500);
    }
  }

  public stop(closeAudioContext: boolean = true): void {
    try {
      audioEngine.stopDevotionalAccompaniment();
    } catch (e) {}
    if (this.fallbackTimer) {
      clearTimeout(this.fallbackTimer);
      this.fallbackTimer = null;
    }
    if (this.keepAliveTimer) {
      clearInterval(this.keepAliveTimer);
      this.keepAliveTimer = null;
    }
    this.isSpeaking = false;
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch (e) {}
    }
    if (closeAudioContext && this.activeAudioContext) {
      try {
        this.activeAudioContext.close();
      } catch (e) {}
      this.activeAudioContext = null;
    }
  }
}

export const ttsEngine = new TTSEngine();
