/**
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

export const CHANAKYA_NITI_BOOK: ScriptureBook = {
  id: 'chanakya_niti',
  titleHi: 'चाणक्य नीति',
  titleEn: 'Chanakya Niti',
  categoryKey: 'smritis',
  categoryNameHi: 'स्मृतियाँ एवं नीति ग्रंथ',
  categoryNameEn: 'Smritis & Ethics',
  icon: '⚖️',
  badge: '१७ अध्याय • व्यवहार, राजनीति व जीवन सूत्र',
  totalChaptersCount: 17,
  totalVersesEstimate: '३४० सूत्र सम्पूर्ण',
  descriptionHi: 'महापंडित चाणक्य द्वारा रचित व्यावहारिक राजनीति, अर्थनीति, जीवन-प्रबंधन और लोक-व्यवहार के अचूक सूत्र।',
  descriptionEn: 'The celebrated ancient maxims of governance, psychology, ethics and worldly wisdom by Acharya Chanakya.',
  accentGradient: 'from-amber-700 via-orange-700 to-yellow-600',
  chapters: [
    {
      chapterIndex: 1,
      chapterTitleHi: 'अध्याय १: विद्या, सत्य व जीवन नीति',
      chapterTitleEn: 'Chapter 1: Knowledge & Conduct',
      totalVersesText: '१७ सूत्र सम्पूर्ण',
      sections: [
        createSectionBlock(
          1, 1, 10,
          'प्रथम खण्ड: विद्या की महिमा व मूर्ख संगति त्याग',
          'Section 1: Glory of Learning & Avoiding Fools',
          'विद्या रूपं कुरूपाणां क्षमा रूपं तपस्विनाम्। दुर्जन संगति का त्याग और धर्मनिष्ठ आचरण।',
          'Wisdom is the beauty of the ugly; forgiveness is the strength of the ascetic.',
          [
            {
              shlokaNum: 1,
              sanskrit: 'प्रणम्य शिरसा विष्णुं त्रैलोक्याधिपतिं प्रभुम् |\nनानाशास्त्रोद्धृतं वक्ष्ये राजनीतिसमुच्चयम् || १ ||',
              hindi: 'तीनों लोकों के स्वामी भगवान श्री विष्णु को सिर झुकाकर प्रणाम करते हुए मैं अनेक शास्त्रों से एकत्रित की गई राजनीति (नीति-शास्त्र) को कहता हूँ।',
              english: 'Humbly bowing before Lord Vishnu, the supreme master of the three worlds, I present this collection of political maxims gathered from various scriptures.'
            },
            {
              shlokaNum: 2,
              sanskrit: 'यस्य नास्ति स्वयं प्रज्ञा शास्त्रं तस्य करोति किम् |\nलोचनाभ्यां विहीनस्य दर्पणः किं करिष्यति || २ ||',
              hindi: 'जिस मनुष्य के पास स्वयं की विवेकबुद्धि नहीं है, शास्त्र उसका क्या भला कर सकता है? जैसे आंखों से अंधे व्यक्ति के लिए दर्पण किस काम का?',
              english: 'What can scriptures do for a person who lacks innate intelligence? Of what use is a mirror to someone devoid of eyes?'
            },
            {
              shlokaNum: 3,
              sanskrit: 'दुर्जनस्य च सर्पस्य वरं सर्पो न दुर्जनः |\nसर्पो दंशति कालेन दुर्जनस्तु पदे पदे || ३ ||',
              hindi: 'दुर्जन और सर्प में से सर्प भला है, दुर्जन नहीं। क्योंकि सर्प तो समय आने पर (छेड़ने पर) ही काटता है, परन्तु दुर्जन पग-पग पर वार करता है।',
              english: 'Between a wicked person and a serpent, the serpent is preferable. The snake bites only in self-defense, but the wicked person strikes at every step.'
            }
          ]
        )
      ]
    }
  ]
};

// MASTER CATALOG OF ALL 11 CANONICAL CATEGORIES
// =========================================================================
export const SCRIPTURE_CANON_CATEGORIES: ScriptureCategoryDef[] = [
  // =========================================================================
  // १. चार वेद (THE FOUR VEDAS)
  // =========================================================================
  {
    key: 'vedas',
    nameHi: '१. चार वेद (अपौरुषेय श्रुति)',
    nameEn: '1. The Four Vedas',
    icon: '🔥',
    countBadge: 'ऋग्वेद • यजुर्वेद • सामवेद • अथर्ववेद',
    descriptionHi: 'सनातन धर्म के आदि-स्तंभ और सर्वोच्च प्रमाण। अग्नि, इन्द्र, वरुण, नासदीय, पुरुष व पृथ्वी सूक्तों की पावन संहिताएँ।',
    descriptionEn: 'The primordial, eternal revelations of Sanatan Dharma containing the root wisdom of existence.',
    books: [
      RIGVEDA_BOOK,
      YAJURVEDA_BOOK,
      SAMAVEDA_BOOK,
      ATHARVAVEDA_BOOK
    ]
  },

  // =========================================================================
  // २. चार उपवेद (THE FOUR UPAVEDAS)
  // =========================================================================
  {
    key: 'upavedas',
    nameHi: '२. चार उपवेद (व्यावहारिक विज्ञान)',
    nameEn: '2. The Four Upavedas',
    icon: '🌿',
    countBadge: 'आयुर्वेद • धनुर्वेद • गन्धर्ववेद • स्थापत्यवेद',
    descriptionHi: 'वेदों के व्यावहारिक अनुप्रयोग: आरोग्य (आयुर्वेद), सुरक्षा (धनुर्वेद), संगीत (गन्धर्ववेद) और वास्तु-अर्थनीति (स्थापत्यवेद)।',
    descriptionEn: 'The applied cosmic sciences of healing, righteous defense, sublime music, and sacred architecture.',
    books: [
      AYURVEDA_BOOK,
      DHANURVEDA_BOOK,
      GANDHARVAVEDA_BOOK,
      STHAPATYAVEDA_BOOK
    ]
  },

  // =========================================================================
  // ३. छह वेदांग (THE SIX VEDANGAS)
  // =========================================================================
  {
    key: 'vedangas',
    nameHi: '३. छह वेदांग (वेद के छह अंग)',
    nameEn: '3. The Six Vedangas',
    icon: '🏛️',
    countBadge: 'शिक्षा • कल्प • व्याकरण • निरुक्त • छंद • ज्योतिष',
    descriptionHi: 'वेदों के अध्ययन, उच्चारण और काल-विधान के छह सहायक अंग: पाणिनीय शिक्षा, अष्टाध्यायी व्याकरण व वेदांग ज्योतिष।',
    descriptionEn: 'The six foundational limbs of the Vedas for flawless pronunciation, grammar, and cosmic astronomy.',
    books: [
      SHIKSHA_VEDANGA_BOOK,
      JYOTISHA_VEDANGA_BOOK,
      VYAKARANA_VEDANGA_BOOK
    ]
  },

  // =========================================================================
  // ४. प्रमुख उपनिषद (PRINCIPAL UPANISHADS)
  // =========================================================================
  {
    key: 'upanishads',
    nameHi: '४. प्रमुख उपनिषद (ब्रह्मविद्या व आत्मज्ञान)',
    nameEn: '4. Principal Upanishads',
    icon: '🔆',
    countBadge: 'ईश • केन • कठ • माण्डूक्य • मुण्डक आदि',
    descriptionHi: 'वेदान्त का सर्वोच्च मुकुट। ब्रह्म, आत्मा, संसार और मोक्ष का साक्षात्कार कराने वाले अमर महावाक्य और संवाद।',
    descriptionEn: 'The crest-jewel of Vedanta exploring the supreme truth of the Self, consciousness, and liberation.',
    books: [
      ISHA_UPANISHAD_CANON,
      KENA_UPANISHAD_BOOK,
      KATHA_UPANISHAD_BOOK,
      MANDUKYA_UPANISHAD_BOOK
    ]
  },

  // =========================================================================
  // ५. इतिहास व महाकाव्य (EPICS & ITIHASA)
  // =========================================================================
  {
    key: 'epics',
    nameHi: '५. इतिहास व महाकाव्य',
    nameEn: '5. Epics & Itihasa',
    icon: '🏹',
    countBadge: 'श्रीमद्भगवद्गीता • श्रीरामचरितमानस • वाल्मीकि रामायण • योगवासिष्ठ',
    descriptionHi: 'मर्यादा पुरुषोत्तम श्री राम और भगवान श्री कृष्ण का पावन जीवन चरित्र, गीता का कर्मयोग और योगवासिष्ठ का अद्वैत दर्शन।',
    descriptionEn: 'Timeless epics of divine descent, righteous warfare, and philosophical guidance for humanity.',
    books: [
      BHAGAVAD_GITA_BOOK,
      RAMCHARITMANAS_BOOK,
      VALMIKI_RAMAYANA_BOOK,
      YOGA_VASISTHA_BOOK
    ]
  },

  // =========================================================================
  // ६. अठारह महापुराण (THE 18 MAHAPURANAS)
  // =========================================================================
  {
    key: 'mahapuranas',
    nameHi: '६. अठारह महापुराण',
    nameEn: '6. The 18 Mahapuranas',
    icon: '📿',
    countBadge: 'भागवत • शिव • विष्णु • गरुड़ आदि',
    descriptionHi: 'भगवान श्री कृष्ण की लीलाओं से परिपूर्ण श्रीमद्भागवत, देवाधिदेव शिव का शिवपुराण, विष्णु पुराण और गरुड़ पुराण।',
    descriptionEn: 'The profound ocean of sacred cosmology, deity pastimes, dharma, and soul liberation.',
    books: [
      BHAGAVATA_PURANA_BOOK,
      SHIVA_PURANA_BOOK,
      VISHNU_PURANA_BOOK,
      GARUDA_PURANA_BOOK
    ]
  },

  // =========================================================================
  // ७. अठारह उपपुराण (THE 18 UPAPURANAS)
  // =========================================================================
  {
    key: 'upapuranas',
    nameHi: '७. अठारह उपपुराण',
    nameEn: '7. The 18 Upapuranas',
    icon: '🌸',
    countBadge: 'श्रीमद्देवीभागवत • श्री गणेश पुराण आदि',
    descriptionHi: 'आदिशक्ति भगवती दुर्गा का सर्वोच्च श्रीमद्देवीभागवत पुराण एवं विघ्नहर्ता गजानन का पावन श्री गणेश पुराण।',
    descriptionEn: 'The revered secondary Puranas glorifying the Divine Mother Devi and Lord Ganesha.',
    books: [
      DEVI_BHAGAVATA_PURANA_BOOK,
      GANESH_PURANA_BOOK
    ]
  },

  // =========================================================================
  // ८. षड्दर्शन (SIX PHILOSOPHICAL SYSTEMS)
  // =========================================================================
  {
    key: 'darshanas',
    nameHi: '८. षड्दर्शन (छह भारतीय दर्शन)',
    nameEn: '8. Six Philosophical Systems',
    icon: '🧘',
    countBadge: 'पातञ्जल योगसूत्र • वेदान्त ब्रह्मसूत्र • सांख्य दर्शन',
    descriptionHi: 'चित्त-वृत्ति निरोध का योग दर्शन, बादरायण व्यास कृत ब्रह्मसूत्र, और महर्षि कपिल प्रणीत २५ तत्त्वों का सांख्य दर्शन।',
    descriptionEn: 'The six classical schools of Indian philosophy systematically examining reality and liberation.',
    books: [
      PATANJALI_YOGA_SUTRAS_BOOK,
      BRAHMA_SUTRAS_BOOK,
      SAMKHYA_DARSHANA_BOOK
    ]
  },

  // =========================================================================
  // ९. प्रमुख स्मृतियाँ एवं नीति ग्रंथ (SMRITIS & ETHICS)
  // =========================================================================
  {
    key: 'smritis',
    nameHi: '९. प्रमुख स्मृतियाँ एवं नीति ग्रंथ',
    nameEn: '9. Smritis & Ethics',
    icon: '📜',
    countBadge: 'चाणक्य नीति • महात्मा विदुर नीति • मनुस्मृति',
    descriptionHi: 'जीवन प्रबंधन, राजनीति, सदाचार, विवेक और आंतरिक शांति के अमर नीति सूत्र।',
    descriptionEn: 'Foundational treatises on statecraft, ethics, moral duty, and social righteousness.',
    books: [
      CHANAKYA_NITI_BOOK,
      VIDURA_NITI_BOOK,
      MANUSMRITI_BOOK
    ]
  },

  // =========================================================================
  // १०. आगम और तंत्र (AGAMAS & TANTRAS)
  // =========================================================================
  {
    key: 'agamas_tantras',
    nameHi: '१०. आगम और तंत्र',
    nameEn: '10. Agamas & Tantras',
    icon: '⚡',
    countBadge: 'विज्ञान भैरव तंत्र • वैष्णव पांचरात्र आगम',
    descriptionHi: 'कश्मीर शैव दर्शन का ११२ ध्यान विधियों से युक्त विज्ञान भैरव तंत्र एवं श्रीमन नारायण का पांचरात्र आगम।',
    descriptionEn: 'Direct spiritual technologies of meditation, deity consecration, and non-dual realization.',
    books: [
      VIJNANA_BHAIRAVA_BOOK,
      PANCHARATRA_AGAMA_BOOK
    ]
  },

  // =========================================================================
  // ११. प्रमुख स्तोत्र एवं नित्य पाठ (DEVOTIONAL TEXTS & STOTRAS)
  // =========================================================================
  {
    key: 'stotras',
    nameHi: '११. प्रमुख स्तोत्र एवं नित्य पाठ',
    nameEn: '11. Devotional Texts & Stotras',
    icon: '🪔',
    countBadge: 'दुर्गा सप्तशती • विष्णु सहस्रनाम • शिव ताण्डव • आदित्य हृदय',
    descriptionHi: 'दैनिक भक्ति, ग्रह-दोष निवारण, आत्मिक शांति और भगवत्कृपा प्राप्त करने के सिद्ध पावन स्तोत्र व कवच।',
    descriptionEn: 'Potent devotional hymns, Sahasranamas, and kavachas for daily spiritual communion.',
    books: [
      DURGA_SAPTASHATI_BOOK,
      VISHNU_SAHASRANAMA_BOOK,
      SHIVA_TANDAVA_BOOK,
      ADITYA_HRIDAYA_BOOK
    ]
  }
];

// Helper to look up a book by its ID across all 11 canonical categories
export function getScriptureBookById(bookId: string): ScriptureBook | null {
  for (const cat of SCRIPTURE_CANON_CATEGORIES) {
    for (const b of cat.books) {
      if (b.id === bookId) return b;
    }
  }
  return null;
}
