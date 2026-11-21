# -*- coding: utf-8 -*-
"""
assemble_canon.py
Updates src/data/grandScriptureCanonData.ts with all 11 canonical categories
and fully populated scripture books.
"""
import sys
sys.stdout.reconfigure(encoding='utf-8')

# Let's read existing grandScriptureCanonData.ts up to BHAGAVAD_GITA_BOOK definition
with open('src/data/grandScriptureCanonData.ts', 'r', encoding='utf-8') as f:
    orig = f.read()

# Locate where SCRIPTURE_CANON_CATEGORIES starts
cat_start_idx = orig.find('export const SCRIPTURE_CANON_CATEGORIES: ScriptureCategoryDef[] = [')
if cat_start_idx == -1:
    print("ERROR: could not find SCRIPTURE_CANON_CATEGORIES")
    sys.exit(1)

# Extract everything before SCRIPTURE_CANON_CATEGORIES
header_and_existing_books = orig[:cat_start_idx]

# Check imports at top
import_addition = """
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
  SAMKHYA_DARSHANA_BOOK
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
"""

# Place imports right after existing imports at the top
first_export_idx = header_and_existing_books.find('export interface ScriptureVerseUnit')
if first_export_idx != -1:
    header_with_imports = header_and_existing_books[:first_export_idx] + import_addition + "\n" + header_and_existing_books[first_export_idx:]
else:
    header_with_imports = import_addition + "\n" + header_and_existing_books

new_categories_code = """export const SCRIPTURE_CANON_CATEGORIES: ScriptureCategoryDef[] = [
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
"""

final_content = header_with_imports + new_categories_code

with open('src/data/grandScriptureCanonData.ts', 'w', encoding='utf-8') as f:
    f.write(final_content)

print("grandScriptureCanonData.ts updated with all 11 canonical categories!")
