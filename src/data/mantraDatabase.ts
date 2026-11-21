import { MantraItem, DeityType, MantraCategory } from '../types';
import { CHALISA_SUNDARKAND_MANTRAS } from './chalisaSundarkandData';
import { SHABAR_TANTRIK_MANTRAS } from './shabarTantrikData';
import { DEHATI_SHABAR_MANTRAS } from './dehatiShabarData';
import { VED_UPANISHAD_GITA_MANTRAS } from './vedUpanishadGitaData';
import { GITA_COMPLETE_MANTRAS } from './gitaCompleteData';
import { RUDRI_COMPLETE_MANTRAS } from './rudriCompleteData';
import { UPANISHAD_COMPLETE_MANTRAS } from './upanishadCompleteData';
import { DEHATI_SHABAR_EXPANDED_MANTRAS } from './dehatiShabarExpandedData';
import { NAAM_JAAP_MANTRAS } from './naamJaapData';
import { SCRIPTURAL_MANTRAS } from './scripturalCategoriesData';
import { AARTI_MANTRAS } from './aartiData';
import { CANONICAL_MAHAKOSH_MANTRAS } from './canonicalMantraMahakoshData';

export const DEITY_CONFIG: Record<DeityType, { label: string; icon: string; title: string }> = {
  shiva: { label: 'भगवान शिव (महादेव)', icon: '🔱', title: 'कल्याणकारी व मोक्ष प्रदाता' },
  hanuman: { label: 'श्री हनुमान जी', icon: '🚩', title: 'संकटमोचन व अष्टसिद्धि प्रदाता' },
  krishna: { label: 'श्री कृष्ण', icon: '🪈', title: 'प्रेम, आनंद व कर्मयोग' },
  ram: { label: 'श्री राम', icon: '🏹', title: 'मर्यादा पुरुषोत्तम व तारक' },
  durga_kali: { label: 'माँ दुर्गा / महाकाली', icon: '🌸', title: 'आदिशक्ति व सर्व संहारिणी' },
  ganesha: { label: 'भगवान गणेश', icon: '🐘', title: 'विघ्नहर्ता व प्रथम पूज्य' },
  vishnu: { label: 'भगवान विष्णु (नारायण)', icon: '🐚', title: 'जगतपालक व वैकुंठपति' },
  bhairav: { label: 'काल भैरव / बटुक भैरव', icon: '📿', title: 'भय, संकट व बाधा नाशक' },
  lakshmi_kuber: { label: 'माँ लक्ष्मी व कुबेर देव', icon: '💰', title: 'अखंड धन, ऐश्वर्य व समृद्धि' },
  saraswati: { label: 'माँ सरस्वती', icon: '🪕', title: 'विद्या, बुद्धि व वाक् सिद्धि' },
  tridev: { label: 'त्रिदेव (ब्रह्मा, विष्णु, महेश)', icon: '✨', title: 'सर्व मनोकामना पूर्ति' },
  navgraha: { label: 'नवग्रह देव', icon: '☀️', title: 'ग्रह शांति व भाग्य वृद्धि' },
  baglamukhi: { label: 'माँ बगलामुखी', icon: '⚡', title: 'शत्रु स्तम्भन व विजय' },
  custom: { label: 'स्वयं का लिखा मंत्र', icon: '✍️', title: 'साधक का व्यक्तिगत मंत्र' }
};

export const CATEGORY_INFO: Record<MantraCategory, { label: string; badgeColor: string; description: string }> = {
  chalisa: {
    label: 'चालीसा संग्रह',
    badgeColor: 'bg-red-700 text-red-50 border-red-800',
    description: 'श्री हनुमान, शिव, दुर्गा, गणेश, लक्ष्मी, शनि सहित समस्त प्रमुख चालीसा पाठ'
  },
  aarti: {
    label: 'आरती संग्रह',
    badgeColor: 'bg-amber-700 text-amber-50 border-amber-800',
    description: 'श्री जगदीश, गणेश, शिव, हनुमान, दुर्गा, लक्ष्मी सहित समस्त प्रमुख महाआरती'
  },
  naam_jaap: {
    label: 'नाम जाप व पावन धुन',
    badgeColor: 'bg-rose-700 text-rose-50 border-rose-800',
    description: 'राम-राम, हरे कृष्ण, राधे-राधे, ॐ नमः शिवाय, सीताराम व हनुमान नाम का निरंतर पावन संकीर्तन'
  },
  siddhi_mantra: {
    label: 'सिद्धि महामंत्र',
    badgeColor: 'bg-cyan-700 text-cyan-50 border-cyan-800',
    description: 'महामृत्युंजय, गायत्री, श्री सूक्तम, बगलामुखी व गणेश सिद्ध महामंत्र'
  },
  tantrik_mantra: {
    label: 'तांत्रिक व शाबर मंत्र',
    badgeColor: 'bg-purple-700 text-purple-50 border-purple-800',
    description: 'हनुमान वीर शाबर, काल भैरव चौकी, माँ कामाख्या व महाकाली खड्ग शाबर'
  },
  ved: {
    label: 'वेद व उपनिषद',
    badgeColor: 'bg-amber-800 text-amber-50 border-amber-900',
    description: 'ऋग्वेद पुरुष व नासदीय सूक्त, यजुर्वेद रुद्राष्टाध्यायी व ईशावास्य उपनिषद'
  },
  granth: {
    label: 'धार्मिक ग्रन्थ व स्तोत्र',
    badgeColor: 'bg-emerald-800 text-emerald-50 border-emerald-900',
    description: 'शिव ताण्डव स्तोत्र, श्री रामरक्षा स्तोत्र, बजरंग बाण, कनकधारा व आदित्य हृदय'
  },
  ramayan: {
    label: 'श्री रामचरितमानस व रामायण',
    badgeColor: 'bg-orange-800 text-orange-50 border-orange-900',
    description: 'सम्पूर्ण सुंदरकांड, कवन सो काज, दीन दयाल व मंगल भवन संपुट चौपाई'
  },
  gita: {
    label: 'श्रीमद्भगवद्गीता',
    badgeColor: 'bg-blue-800 text-blue-50 border-blue-900',
    description: 'गीता ध्यानम्, कर्मयोग (२.४७), शरणागति (१८.६६) व आत्मा की अमरता (२.२३)'
  },
  nath_mantra: {
    label: 'नाथ संप्रदाय सिद्ध मंत्र',
    badgeColor: 'bg-amber-700 text-amber-50 border-amber-800',
    description: 'गुरु गोरखनाथ मूल महा शाबर, ॐ चैतन्य गोरक्षनाथाय नमः व नवनाथ स्मरण'
  },
  sundarkand: {
    label: 'श्री सुंदरकांड पाठ',
    badgeColor: 'bg-amber-800 text-amber-50 border-amber-900',
    description: 'गोस्वामी तुलसीदास कृत सम्पूर्ण पावन सुंदरकांड पाठ (चौपाई, दोहा व श्लोक)'
  },
  stotram: {
    label: 'दिव्य स्तोत्र व अष्टकम',
    badgeColor: 'bg-purple-800 text-purple-50 border-purple-900',
    description: 'शिव तांडव, रुद्राष्टकम, कनकधारा, बजरंग बाण, मधुराष्टकम, विष्णु सहस्रनाम'
  },
  dhan_siddhi: {
    label: 'धन व लक्ष्मी सिद्धि',
    badgeColor: 'bg-emerald-700 text-emerald-50 border-emerald-800',
    description: 'अखंड धन आगमन, दरिद्रता नाश, व्यापार वृद्धि व कुबेर कृपा हेतु'
  },
  manokamna: {
    label: 'सर्व मनोकामना पूर्ति',
    badgeColor: 'bg-indigo-700 text-indigo-50 border-indigo-800',
    description: 'रुके हुए कार्य, असंभव इच्छाओं की पूर्ति व त्रिदेव कृपा हेतु'
  },
  nath: {
    label: 'नाथ / शाबर मंत्र',
    badgeColor: 'bg-amber-700 text-amber-50 border-amber-800',
    description: 'गुरु गोरखनाथ व नवनाथ परंपरा से सिद्ध तुरंत फलदायी सरल शाबर मंत्र'
  },
  tantrik: {
    label: 'तांत्रिक व बीज मंत्र',
    badgeColor: 'bg-red-800 text-red-50 border-red-900',
    description: 'तीव्र ऊर्जा और एकाग्रता जाग्रत करने वाले शक्तिशाली एकाक्षरी व बीज मंत्र'
  },
  aghori: {
    label: 'अघोरी व महाकाल साधना',
    badgeColor: 'bg-stone-900 text-stone-100 border-stone-950',
    description: 'काल, भय, मृत्यु व समस्त नकारात्मक शक्तियों का नाश करने वाले अघोर मंत्र'
  },
  sadhu: {
    label: 'साधु, सिद्ध व नाम मंत्र',
    badgeColor: 'bg-yellow-800 text-yellow-50 border-yellow-900',
    description: 'ऋषि-मुनियों व संतों द्वारा पूजित सरल, सहज भक्ति व मोक्ष प्रदायक नाम जप'
  },
  dehati_shabar: {
    label: 'देहाती व लोक शाबर मंत्र',
    badgeColor: 'bg-emerald-800 text-emerald-50 border-emerald-900',
    description: 'ग्रामीण भारत, ब्रज, अवध व गोरखनाथ परंपरा के सिद्ध देहाती व फतह डंका शाबर मंत्र'
  },
  ved_sukta: {
    label: 'चार वेद ऋचा व सूक्त',
    badgeColor: 'bg-amber-800 text-amber-50 border-amber-900',
    description: 'ऋग्वेद (नासदीय व पुरुष सूक्त), यजुर्वेद (रुद्राष्टाध्यायी), सामवेद व अथर्ववेद सूक्त'
  },
  upanishad: {
    label: 'उपनिषद व महावाक्य',
    badgeColor: 'bg-blue-800 text-blue-50 border-blue-900',
    description: 'ईशावास्योपनिषद, माण्डूक्योपनिषद व चारों वेदों के सर्वोच्च महावाक्य (अहं ब्रह्मास्मि, तत्त्वमसि)'
  },
  gita_ramayan: {
    label: 'गीता, रामायण व महाभारत',
    badgeColor: 'bg-orange-800 text-orange-50 border-orange-900',
    description: 'श्रीमद्भगवद्गीता के अमर श्लोक, श्री रामचरितमानस सप्तकाण्ड चौपाइयां व विष्णु सहस्रनाम'
  },
  durga_saptashati: {
    label: 'श्री दुर्गा सप्तशती',
    badgeColor: 'bg-rose-800 text-rose-50 border-rose-900',
    description: 'कवच, अर्गला, कीलक, सिद्ध कुंजिका स्तोत्र एवं सम्पूर्ण १३ अध्याय'
  },
  custom: {
    label: 'कस्टम मंत्र',
    badgeColor: 'bg-teal-700 text-teal-50 border-teal-800',
    description: 'साधक द्वारा स्वयं लिखा हुआ विशेष मंत्र'
  }
};

export const DEITY_CONFIG_EN: Record<DeityType, { label: string; icon: string; title: string }> = {
  shiva: { label: 'Lord Shiva (Mahadev)', icon: '🔱', title: 'Auspiciousness & Liberation' },
  hanuman: { label: 'Lord Hanuman Ji', icon: '🚩', title: 'Remover of Obstacles & Strength' },
  krishna: { label: 'Lord Krishna', icon: '🪈', title: 'Divine Love & Karma Yoga' },
  ram: { label: 'Lord Rama', icon: '🏹', title: 'Righteousness & Supreme Protector' },
  durga_kali: { label: 'Maa Durga / Mahakali', icon: '🌸', title: 'Supreme Shakti & Protection' },
  ganesha: { label: 'Lord Ganesha', icon: '🐘', title: 'Remover of Hurdles & Wisdom' },
  vishnu: { label: 'Lord Vishnu (Narayan)', icon: '🐚', title: 'Preserver of the Universe' },
  bhairav: { label: 'Kaal Bhairav / Batuk', icon: '📿', title: 'Destroyer of Fear & Negativity' },
  lakshmi_kuber: { label: 'Maa Lakshmi & Kuber', icon: '💰', title: 'Abundance, Wealth & Prosperity' },
  saraswati: { label: 'Maa Saraswati', icon: '🪕', title: 'Wisdom, Knowledge & Arts' },
  tridev: { label: 'Tridev (Brahma, Vishnu, Mahesh)', icon: '✨', title: 'Fulfillment of All Wishes' },
  navgraha: { label: 'Navgraha Deities', icon: '☀️', title: 'Planetary Peace & Good Fortune' },
  baglamukhi: { label: 'Maa Baglamukhi', icon: '⚡', title: 'Victory & Overcoming Enemies' },
  custom: { label: 'Custom Mantra', icon: '✍️', title: 'Personal Mantra Chanting' }
};

export const CATEGORY_INFO_EN: Record<MantraCategory, { label: string; badgeColor: string; description: string }> = {
  chalisa: {
    label: 'Chalisa Sangrah',
    badgeColor: 'bg-red-700 text-red-50 border-red-800',
    description: 'Complete sacred 40-verse devotional hymns of Hindu deities'
  },
  aarti: {
    label: 'Aarti Sangrah',
    badgeColor: 'bg-amber-700 text-amber-50 border-amber-800',
    description: 'Complete holy Aartis of major deities for daily worship and sandhya arati'
  },
  naam_jaap: {
    label: 'Naam Jaap & Akhand Dhun',
    badgeColor: 'bg-rose-700 text-rose-50 border-rose-800',
    description: 'Continuous holy chanting of Ram-Ram, Hare Krishna, Radhe Radhe, Om Namah Shivaya'
  },
  siddhi_mantra: {
    label: 'Siddhi Mahamantras',
    badgeColor: 'bg-cyan-700 text-cyan-50 border-cyan-800',
    description: 'Vedic and Tantric Siddhi Mahamantras with exact anushthan count and rules'
  },
  tantrik_mantra: {
    label: 'Tantrik & Shabar Mantras',
    badgeColor: 'bg-purple-700 text-purple-50 border-purple-800',
    description: 'Fast-acting protective mantras from Agamic and Gorakhnath traditions'
  },
  ved: {
    label: 'Veda & Upanishads',
    badgeColor: 'bg-amber-800 text-amber-50 border-amber-900',
    description: 'Pristine Vedic Suktas and Upanishadic Mahavakyas for enlightenment'
  },
  granth: {
    label: 'Pavitra Granth & Stotras',
    badgeColor: 'bg-emerald-800 text-emerald-50 border-emerald-900',
    description: 'Classical devotional hymns like Shiva Tandav, Ramraksha & Bajrang Baan'
  },
  ramayan: {
    label: 'Ramayana & Sundarkand',
    badgeColor: 'bg-orange-800 text-orange-50 border-orange-900',
    description: 'Complete Sundarkand paath and miraculous samput chaupais from Ramcharitmanas'
  },
  gita: {
    label: 'Shrimad Bhagavad Gita',
    badgeColor: 'bg-blue-800 text-blue-50 border-blue-900',
    description: 'Immortal shlokas of Lord Krishna teaching Karma Yoga and Bhakti Yoga'
  },
  nath_mantra: {
    label: 'Nath Sampradaya Mantras',
    badgeColor: 'bg-amber-700 text-amber-50 border-amber-800',
    description: 'Authentic Nath Siddha mantras invoking Guru Gorakhnath and Navnaths'
  },
  sundarkand: {
    label: 'Shri Sundarkand Paath',
    badgeColor: 'bg-amber-800 text-amber-50 border-amber-900',
    description: 'Complete sacred Sundarkand from Ramcharitmanas by Goswami Tulsidas'
  },
  stotram: {
    label: 'Divine Stotrams & Ashtakams',
    badgeColor: 'bg-purple-800 text-purple-50 border-purple-900',
    description: 'Shiva Tandav, Rudrashtakam, Kanakadhara, Bajrang Baan & Vishnu Stotrams'
  },
  dhan_siddhi: {
    label: 'Wealth & Prosperity Siddhi',
    badgeColor: 'bg-emerald-700 text-emerald-50 border-emerald-800',
    description: 'Continuous inflow of abundance and blessings of Goddess Lakshmi'
  },
  manokamna: {
    label: 'Wish Fulfillment',
    badgeColor: 'bg-indigo-700 text-indigo-50 border-indigo-800',
    description: 'Resolving pending works and fulfillment of noble intentions'
  },
  nath: {
    label: 'Nath & Shabar Mantras',
    badgeColor: 'bg-amber-700 text-amber-50 border-amber-800',
    description: 'Fast-acting mantras from the revered Gorakhnath lineage'
  },
  tantrik: {
    label: 'Tantrik & Beej Mantras',
    badgeColor: 'bg-red-800 text-red-50 border-red-900',
    description: 'High-energy seed syllables for deep meditative power'
  },
  aghori: {
    label: 'Aghori & Mahakal Sadhana',
    badgeColor: 'bg-stone-900 text-stone-100 border-stone-950',
    description: 'Powerful chants for dispelling all fears, mortality and negativity'
  },
  sadhu: {
    label: 'Saint & Name Chanting',
    badgeColor: 'bg-yellow-800 text-yellow-50 border-yellow-900',
    description: 'Simple, pure devotional name chanting for inner bliss and peace'
  },
  dehati_shabar: {
    label: 'Dehati Folk Shabar Chants',
    badgeColor: 'bg-emerald-800 text-emerald-50 border-emerald-900',
    description: 'Ancient rural, Braj & Avadh awakening chants including Bajrangi Fateh Danka'
  },
  ved_sukta: {
    label: 'Four Vedas Hymns & Suktas',
    badgeColor: 'bg-amber-800 text-amber-50 border-amber-900',
    description: 'Rigveda (Nasadiya & Purusha), Yajurveda Rudrashtadhyayi, Samaveda & Atharvaveda'
  },
  upanishad: {
    label: 'Upanishads & Mahavakyas',
    badgeColor: 'bg-blue-800 text-blue-50 border-blue-900',
    description: 'Isha Upanishad, Mandukya, and supreme Mahavakyas (Aham Brahmasmi, Tat Tvam Asi)'
  },
  gita_ramayan: {
    label: 'Gita, Ramayana & Mahabharata',
    badgeColor: 'bg-orange-800 text-orange-50 border-orange-900',
    description: 'Bhagavad Gita core shlokas, Ramcharitmanas Saptakand Chaupais, Vishnu Sahasranama'
  },
  durga_saptashati: {
    label: 'Shri Durga Saptashati',
    badgeColor: 'bg-rose-800 text-rose-50 border-rose-900',
    description: 'Devi Kavacham, Argala, Keelak, Siddha Kunjika Stotram and complete 13 chapters'
  },
  custom: {
    label: 'Custom Mantra',
    badgeColor: 'bg-teal-700 text-teal-50 border-teal-800',
    description: 'Your own personal mantra entered manually'
  }
};

const RAW_PRELOADED_MANTRAS: MantraItem[] = [
  // ==========================================
  // CANONICAL MANTRA MAHAKOSH (9 Master Categories)
  // ==========================================
  ...CANONICAL_MAHAKOSH_MANTRAS,
  // ==========================================
  // SCRIPTURAL MASTER MANTRAS (100% Authentic Researched)
  // ==========================================
  ...SCRIPTURAL_MANTRAS,
  // ==========================================
  // 1. धन, लक्ष्मी व कुबेर सिद्धि मंत्र (DHAN SIDDHI)
  // ==========================================
  {
    id: 'dhan-1',
    name: 'कनकधारा महालक्ष्मी बीज मंत्र',
    text: 'ॐ श्रीं ह्रीं क्लीं त्रिभुवन महालक्ष्म्यै अस्मांक दारिद्र्य नाशय प्रचुर धन देहि देहि क्लीं ह्रीं श्रीं ॐ',
    deity: 'lakshmi_kuber',
    deityLabel: 'माँ लक्ष्मी',
    category: 'dhan_siddhi',
    categoryLabel: 'धन व लक्ष्मी सिद्धि',
    meaning: 'हे तीनों लोकों की स्वामिनी महालक्ष्मी, मेरी दरिद्रता का नाश कर प्रचुर धन व ऐश्वर्य प्रदान करें।',
    bestTiming: 'शुक्रवार, दिवाली, रवि-पुष्य योग, ब्रह्म मुहूर्त अथवा प्रदोष काल',
    benefits: 'अकस्मात धन लाभ, कर्ज मुक्ति, व्यापार में असीम वृद्धि और स्थिर लक्ष्मी का वास।',
    siddhiVidhi: 'शुक्ल पक्ष के किसी भी शुक्रवार से आरंभ करें। 21 दिनों तक नित्य 11 माला जप करें। अंतिम दिन 1 माला का खीर से हवन करें।',
    samagri: 'कमलगट्टे की माला या स्फटिक माला, लाल या गुलाबी रेशमी आसन, शुद्ध गाय के घी का दीपक, गुलाब के इत्र, सफेद कमल पुष्प या लाल गुलाब, खीर का भोग।',
    niyam: 'उत्तर या पूर्व दिशा की ओर मुख रखें। साधना के दिनों में पूर्ण ब्रह्मचर्य व सात्विक आहार अनिवार्य है। किसी से कटु वचन न बोलें।',
    targetCountSiddhi: '21 दिनों में कुल 231 माला (लगभग 25,000 जप)'
  },
  {
    id: 'dhan-2',
    name: 'कुबेर अष्टलक्ष्मी धन आकर्षण मंत्र',
    text: 'ॐ यक्षाय कुबेराय वैश्रवणाय धनधान्याधिपतये धनधान्यसमृद्धिं मे देहि दापय स्वाहा',
    deity: 'lakshmi_kuber',
    deityLabel: 'कुबेर देव',
    category: 'dhan_siddhi',
    categoryLabel: 'धन व लक्ष्मी सिद्धि',
    meaning: 'समस्त यक्षों के राजा, धन-धान्य के स्वामी कुबेर देव मुझ पर कृपा कर समृद्धि प्रदान करें।',
    bestTiming: 'त्रयोदशी, धनतेरस, बृहस्पतिवार अथवा रविवार संध्या',
    benefits: 'तिजोरी कभी खाली नहीं रहती, गुप्त धन व भूमि-भवन लाभ, व्यापार में रुकी हुई उधारी की वापसी।',
    siddhiVidhi: 'धनतेरस या किसी भी शुक्ल पक्ष की त्रयोदशी से शुरू कर 40 दिनों तक प्रतिदिन 5 माला जप करें।',
    samagri: 'कमलगट्टे की माला, पीले वस्त्र व पीला आसन, चमेली या तिल के तेल का दीपक, साबुत धनिया, 5 कौड़ी व 5 गोमती चक्र।',
    niyam: 'उत्तर दिशा (कुबेर दिशा) की ओर मुख करके बैठें। दीप को जप पूरा होने तक प्रज्वलित रखें।',
    targetCountSiddhi: '40 दिनों में कुल 200 माला'
  },
  {
    id: 'dhan-3',
    name: 'कमला महाविद्या तांत्रिक धन मंत्र',
    text: 'ॐ ह्रीं अष्ट महालक्ष्म्यै नमः। ॐ श्रीं ह्रीं क्लीं ऐं सौः ॐ ह्रीं क ए ई ल ह्रीं ह स क ह ल ह्रीं स क ल ह्रीं सौः ऐं क्लीं ह्रीं श्रीं',
    deity: 'lakshmi_kuber',
    deityLabel: 'माँ कमला (दस महाविद्या)',
    category: 'tantrik',
    categoryLabel: 'तांत्रिक व बीज मंत्र',
    meaning: 'दस महाविद्याओं में दसवीं महाविद्या कमला देवी जो साक्षात सौभाग्य और राजसत्ता की अधिष्ठात्री हैं।',
    bestTiming: 'दीपावली की रात्रि, पूर्णिमा अथवा शुक्रवार निशीथ काल (रात्रि 11 से 1)',
    benefits: 'राजयोग की प्राप्ति, दिवालियापन से मुक्ति, चारों दिशाओं से स्थायी संपदा का आगमन।',
    siddhiVidhi: 'शुभ मुहूर्त में कुबेर यंत्र या श्री यंत्र के समक्ष 1.25 लाख जप का संकल्प लें। नित्य 31 माला 40 दिन तक करें।',
    samagri: 'स्फटिक माला या कमलगट्टा माला, रक्त चंदन, लाल गुलाब, शुद्ध देसी घी का चौमुखी दीपक, अनार का भोग।',
    niyam: 'भूमि शयन, एक समय भोजन, साधना काल में किसी को मंत्र या अनुभव न बताएं।',
    targetCountSiddhi: '1,25,000 जप (1157 माला)'
  },
  {
    id: 'dhan-4',
    name: 'गोरखनाथी शाबर धनदाता मंत्र',
    text: 'ॐ नमो आदेश गुरु को। सोने का कलश, चांदी की थाली, भरे कुबेर भंडार निराली। रिद्धि आवे, सिद्धि आवे, लक्ष्मी जी घर में पाँव टिकावै। फुरो मंत्र ईश्वरो वाचा।',
    deity: 'lakshmi_kuber',
    deityLabel: 'गुरु गोरखनाथ परंपरा',
    category: 'nath',
    categoryLabel: 'नाथ / शाबर मंत्र',
    meaning: 'गुरु गोरखनाथ की आज्ञा से लक्ष्मी और कुबेर का घर में स्थायी वास का शाबर विधान।',
    bestTiming: 'दीपावली, होली, ग्रहण काल अथवा किसी भी रवि-पुष्य योग में',
    benefits: 'अत्यंत तीव्र गति से दरिद्रता दूर होना, रोजगार व कारोबार में तत्काल लाभ।',
    siddhiVidhi: 'ग्रहण काल या दीपावली की रात्रि में 1008 बार (10 माला) जप करने से यह मंत्र जाग्रत व सिद्ध हो जाता है। बाद में रोज 1 माला जपें।',
    samagri: 'रुद्राक्ष माला, धूपबत्ती, सरसों के तेल का दीपक, गुड़ व बताशे का भोग।',
    niyam: 'साधक को स्वच्छ धोती पहननी चाहिए। दिशा पूर्व रहेगी।',
    targetCountSiddhi: 'ग्रहण काल में 10 माला (1080 जप)'
  },

  // ==========================================
  // 2. त्रिदेव व सर्व मनोकामना पूर्ति मंत्र (MANOKAMNA)
  // ==========================================
  {
    id: 'mano-1',
    name: 'त्रिदेव सर्व मनोकामना सिद्धि महामंत्र',
    text: 'ॐ ब्रह्मा मुरारिस्त्रिपुरान्तकारी भानुः शशी भूमिसुतो बुधश्च। गुरुश्च शुक्रः शनिराहुकेतवः कुर्वन्तु सर्वे मम सुप्रभातम्॥',
    deity: 'tridev',
    deityLabel: 'त्रिदेव व नवग्रह',
    category: 'manokamna',
    categoryLabel: 'सर्व मनोकामना पूर्ति',
    meaning: 'ब्रह्मा, विष्णु, शिव और समस्त नवग्रह मेरी प्रातः वेला को मंगलमय करें व समस्त इच्छाएं पूर्ण करें।',
    bestTiming: 'प्रातः काल सूर्योदय के समय (ब्रह्म मुहूर्त)',
    benefits: 'समस्त ग्रहों के अशुभ फल दूर होना, रुके हुए जटिल कार्य स्वतः सिद्ध होना, सर्व मनोकामना सिद्धि।',
    siddhiVidhi: 'प्रतिदिन प्रातः स्नान के तुरंत बाद सूर्यदेव को अर्घ्य देकर 3 माला का नित्य पाठ करें। 41 दिन का नियम रखें।',
    samagri: 'तुलसी या रुद्राक्ष माला, तांबे के पात्र में जल, रोली, अक्षत, लाल पुष्प।',
    niyam: 'पूर्व दिशा की ओर मुख करें। आलस्य त्यागकर सूर्योदय से पूर्व शैया त्यागें।',
    targetCountSiddhi: '41 दिन नित्य 3 माला (123 माला)'
  },
  {
    id: 'mano-2',
    name: 'भगवान विष्णु नारायण सर्वकामप्रद मंत्र',
    text: 'ॐ नमो नारायणाय। ॐ श्रीं ह्रीं क्लीं नमो भगवते वासुदेवाय सर्वकार्यसिद्धिं कुरु कुरु स्वाहा॥',
    deity: 'vishnu',
    deityLabel: 'भगवान विष्णु',
    category: 'manokamna',
    categoryLabel: 'सर्व मनोकामना पूर्ति',
    meaning: 'हे जगतपालक परमेश्वर नारायण, मेरे समस्त धर्म, अर्थ, काम और मोक्ष के कार्यों को सिद्ध करें।',
    bestTiming: 'एकादशी, गुरुवार, पूर्णिमा प्रातः काल',
    benefits: 'असाध्य कार्य सिद्ध होना, संतान प्राप्ति, पारिवारिक सुख और जीवन के समस्त संतापों का अंत।',
    siddhiVidhi: 'किसी भी एकादशी से 21 दिनों तक प्रतिदिन 11 माला जप करें। भगवान विष्णु को पीले फल व तुलसी दल अर्पित करें।',
    samagri: 'तुलसी की माला या वैजयंती माला, पीला आसन, केसर-चंदन, पीले कनेर के फूल, गाय के घी का दीपक।',
    niyam: 'तुलसी दल बिना स्नान के न तोड़ें। एकादशी को चावल का पूर्ण त्याग रखें।',
    targetCountSiddhi: '21 दिनों में 231 माला'
  },
  {
    id: 'mano-3',
    name: 'ब्रह्मा जी का सृष्टि कर्ता मंत्र',
    text: 'ॐ वेदात्मने विद्महे हिरण्यगर्भाय धीमहि तन्नो ब्रह्मा प्रचोदयात्',
    deity: 'tridev',
    deityLabel: 'भगवान ब्रह्मा',
    category: 'granth',
    categoryLabel: 'ग्रंथ व वैदिक मंत्र',
    meaning: 'वेद स्वरूप, हिरण्यगर्भ भगवान ब्रह्मा हमारी बुद्धि और अंतःकरण को सन्मार्ग पर प्रेरित करें।',
    bestTiming: 'ब्रह्म मुहूर्त (प्रातः 4:00 से 5:30 बजे)',
    benefits: 'बुद्धि, ज्ञान, रचनात्मकता का विकास, परीक्षा व साक्षात्कार में सर्वोच्च सफलता।',
    siddhiVidhi: 'नित्य ब्रह्म मुहूर्त में 1 माला जप 108 दिनों तक लगातार करें।',
    samagri: 'सफेद चंदन की माला, सफेद आसन, गाय का कच्चा दूध, मिश्री व सफेद पुष्प।',
    niyam: 'साधक को सत्य भाषण और मानसिक पवित्रता रखनी होती है।',
    targetCountSiddhi: '108 दिन प्रतिदिन 1 माला (108 माला)'
  },
  {
    id: 'mano-4',
    name: 'त्रिशूलधारी रुद्र मनोकामना शाबर मंत्र',
    text: 'ॐ नमो आदेश गुरु को। बावन वीर चौंसठ जोगिनी, चले महादेव का बाण। जहाँ लगाऊँ वहाँ लागे, मेरी मनसा सिद्ध करे भगवान। वाचा फुरे, गोरखनाथ की आन।',
    deity: 'shiva',
    deityLabel: 'भगवान शिव',
    category: 'nath',
    categoryLabel: 'नाथ / शाबर मंत्र',
    meaning: 'देवाधिदेव महादेव और गुरु गोरखनाथ की आन से मन की समस्त अभिलाषाओं को तत्काल पूर्ण करने की शाबर प्रार्थना।',
    bestTiming: 'सोमवार प्रदोष काल अथवा मासिक शिवरात्रि',
    benefits: 'कोर्ट कचहरी में सफलता, शत्रु से सुलह, मनचाहा कार्य संपन्न होना।',
    siddhiVidhi: 'सोमवार को शिवालय में जाकर शिवलिंग पर जल चढ़ाएं और धूप-दीप दिखाकर 11 माला का 7 दिन अनुष्ठान करें।',
    samagri: 'रुद्राक्ष माला, बिल्वपत्र, धतूरा, सफेद चंदन, गाय का घी, भस्म।',
    niyam: 'साधना के दौरान तामसिक भोजन (प्याज, लहसुन आदि) वर्जित रहेगा।',
    targetCountSiddhi: '7 दिनों में कुल 77 माला'
  },

  // ==========================================
  // 3. भगवान शिव (SHIVA) के महामंत्र
  // ==========================================
  {
    id: 'shiva-1',
    name: 'पंचाक्षरी शिव मूल मंत्र',
    text: 'ॐ नमः शिवाय',
    deity: 'shiva',
    deityLabel: 'भगवान शिव',
    category: 'sadhu',
    categoryLabel: 'साधु व नाम मंत्र',
    meaning: 'समस्त ब्रह्मांड के स्वामी परम कल्याणकारी शिव को मेरा बारम्बार प्रणाम।',
    bestTiming: 'सदा सर्वदा, विशेषतः ब्रह्म मुहूर्त, प्रदोष काल व सोमवार',
    benefits: 'मानसिक अशांति का शमन, कुंडली के समस्त दोषों का निवारण और आत्मिक आनंद।',
    siddhiVidhi: 'सवा लाख (1,25,000) जप का संकल्प लें। 40 दिनों में नित्य 31 माला जपें।',
    samagri: 'रुद्राक्ष माला, कुश या ऊनी आसन, गंगाजल, भस्म, सफेद चंदन, घी का दीपक।',
    niyam: 'उत्तर या पूर्व दिशा में मुख। प्रतिदिन शिवलिंग का ध्यान करें।',
    targetCountSiddhi: '1,25,000 जप (1157 माला)'
  },
  {
    id: 'shiva-2',
    name: 'महामृत्युंजय वैदिक संजीवनी मंत्र',
    text: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात्॥',
    deity: 'shiva',
    deityLabel: 'भगवान शिव',
    category: 'granth',
    categoryLabel: 'ग्रंथ व वैदिक मंत्र',
    meaning: 'हम त्रिनेत्रधारी शिव की उपासना करते हैं, जो पालनकर्ता हैं। वे हमें मृत्यु के बंधनों से मुक्त कर अमृतत्व प्रदान करें।',
    bestTiming: 'प्रातः काल सूर्योदय से पूर्व',
    benefits: 'अकाल मृत्यु से रक्षा, गंभीर रोगों से मुक्ति, लंबी आयु व कायाकल्प।',
    siddhiVidhi: 'सवा लाख जप महामृत्युंजय यंत्र या शिवलिंग के सामने 41 दिनों में पूरा करें। दशांश हवन अनिवार्य है।',
    samagri: 'पंचमुखी रुद्राक्ष माला, दूर्वा, बेलपत्र, दूध-शहद मिश्रित जल, तिल व घी।',
    niyam: 'उच्चारण में कोई त्रुटि न हो। जप करते समय रीढ़ की हड्डी सीधी रखें।',
    targetCountSiddhi: '1,25,000 जप'
  },
  {
    id: 'shiva-3',
    name: 'अघोर रुद्र महामंत्र',
    text: 'ॐ अघोरेभ्योऽथ घोरेभ्यो घोरघोरतरेभ्यः। सर्वेभ्यः सर्वशर्वेभ्यो नमस्ते अस्तु रुद्ररूपेभ्यः॥',
    deity: 'shiva',
    deityLabel: 'भगवान शिव',
    category: 'aghori',
    categoryLabel: 'अघोरी व महाकाल साधना',
    meaning: 'जो शांत हैं, जो घोर हैं और जो अति घोर हैं—उन समस्त रुद्र रूपों को मेरा कोटि-कोटि नमन।',
    bestTiming: 'अर्धरात्रि (11 बजे से 1 बजे के मध्य), सोमवार अथवा कृष्ण चतुर्दशी',
    benefits: 'समस्त भूत-प्रेत, तांत्रिक बाधा, अकाल मृत्यु भय और गुप्त शत्रुओं का तत्काल समूल नाश।',
    siddhiVidhi: '21 दिनों तक रात्रि के समय उत्तर दिशा में मुख कर नित्य 11 माला जपें।',
    samagri: 'काले रुद्राक्ष की माला, काला या लाल ऊनी आसन, सरसों के तेल का दीपक, भस्म, धतूरा।',
    niyam: 'मन में पूर्ण निर्भयता होनी चाहिए। साधना कक्ष में कोई अन्य व्यक्ति न आए।',
    targetCountSiddhi: '21 दिनों में 231 माला'
  },
  {
    id: 'shiva-4',
    name: 'शिव तांत्रिक संजीवनी बीज',
    text: 'ॐ हौं जूं सः ॐ भूर्भुवः स्वः ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात् ॐ स्वः भुवः भूः ॐ सः जूं हौं ॐ',
    deity: 'shiva',
    deityLabel: 'भगवान शिव',
    category: 'tantrik',
    categoryLabel: 'तांत्रिक व बीज मंत्र',
    meaning: 'हौं, जूं, सः - इन बीजों से युक्त मृत्युंजय शक्ति का आह्वान।',
    bestTiming: 'प्रदोष काल अथवा सोमवती अमावस्या',
    benefits: 'असाध्य रोगों का निवारण, प्राण रक्षा और प्रचंड आत्मिक बल।',
    siddhiVidhi: '11 दिनों तक लगातार 11 माला प्रतिदिन जपें।',
    samagri: 'रुद्राक्ष माला, तांबे का लोटा, गंगाजल, आक के फूल।',
    niyam: 'साधक को जमीन पर कंबल बिछाकर सोना चाहिए।',
    targetCountSiddhi: '11 दिनों में 121 माला'
  },
  {
    id: 'shiva-5',
    name: 'रुद्राष्टकम स्तुति बीज मंत्र',
    text: 'नमामीशमीशान निर्वाणरूपं विभुं व्यापकं ब्रह्मवेदस्वरूपम्। निजं निर्गुणं निर्विकल्पं निरीहं चिदाकाशमाकाशवासं भजेऽहम्॥',
    deity: 'shiva',
    deityLabel: 'भगवान शिव',
    category: 'granth',
    categoryLabel: 'ग्रंथ व वैदिक मंत्र',
    meaning: 'ईशान दिशा के स्वामी, मोक्ष रूप, सर्वव्यापी परब्रह्म शिव को मैं भजता हूँ।',
    bestTiming: 'संध्या काल आरती के उपरांत',
    benefits: 'शनि की साढ़ेसाती व ढैय्या से मुक्ति, मानसिक क्लेश शांति।',
    siddhiVidhi: 'प्रतिदिन संध्या समय 3 बार रुद्राष्टकम का पाठ 40 दिन तक करें।',
    samagri: 'रुद्राक्ष माला, घी का दीपक, कपूर।',
    niyam: 'पवित्र वस्त्र धारण करें।',
    targetCountSiddhi: '40 दिन में नित्य 3 पाठ'
  },
  {
    id: 'shiva-6',
    name: 'गोरखनाथी शिव शाबर जंजीरा',
    text: 'ॐ नमो आदेश गुरु को। शिव का रूप गोरख अवधूता, कंठ बिराजे कैलाश का राजा, घट-घट व्यापै ॐ कार का बाजा। आदेश आदेश आदेश।',
    deity: 'shiva',
    deityLabel: 'भगवान शिव',
    category: 'nath',
    categoryLabel: 'नाथ / शाबर मंत्र',
    meaning: 'नवनाथ परंपरा अनुसार देवाधिदेव महादेव का प्रत्यक्ष कृपा आह्वान।',
    bestTiming: 'प्रातः स्नान के तुरंत बाद',
    benefits: 'कार्य में रुकावट का तत्काल निवारण, यात्रा में पूर्ण सुरक्षा।',
    siddhiVidhi: 'किसी भी शुभ दिन 108 बार जप करके 1 माला का हवन करें।',
    samagri: 'रुद्राक्ष माला, गुग्गुल की धूप, तिल का तेल।',
    niyam: 'दिशा उत्तर रहेगी।',
    targetCountSiddhi: '1 दिन में 108 जप'
  },

  // ==========================================
  // 4. श्री हनुमान जी (HANUMAN) के महामंत्र
  // ==========================================
  {
    id: 'hanuman-1',
    name: 'हनुमान मूल नाम मंत्र',
    text: 'ॐ हनुमते नमः',
    deity: 'hanuman',
    deityLabel: 'श्री हनुमान जी',
    category: 'sadhu',
    categoryLabel: 'साधु व नाम मंत्र',
    meaning: 'पवनपुत्र, अतुलित बलशाली श्री हनुमान जी को मेरा सादर प्रणाम।',
    bestTiming: 'प्रातः अथवा संध्या, विशेष रूप से मंगलवार व शनिवार',
    benefits: 'साहस, आत्मविश्वास, भूत-बाधा नाश और भयमुक्ति।',
    siddhiVidhi: 'मंगलवार से शुरू कर 21 दिनों तक नित्य 11 माला जप करें।',
    samagri: 'लाल चंदन या रुद्राक्ष माला, लाल आसन, चमेली के तेल में सिंदूर, बूंदी का भोग।',
    niyam: 'पूर्ण ब्रह्मचर्य का पालन अनिवार्य है। स्त्रियों का आदर करें।',
    targetCountSiddhi: '21 दिनों में 231 माला'
  },
  {
    id: 'hanuman-2',
    name: 'हनुमत् मारुतात्मज एकाक्षरी बीज मंत्र',
    text: 'ॐ हं हनुमते रुद्रात्मकाय हुं फट्',
    deity: 'hanuman',
    deityLabel: 'श्री हनुमान जी',
    category: 'tantrik',
    categoryLabel: 'तांत्रिक व बीज मंत्र',
    meaning: 'रुद्र अवतार मारुतिनंदन का बीज मंत्र जो शत्रुओं और दुष्ट शक्तियों को क्षण में भस्म करता है।',
    bestTiming: 'रात्रिकाल 9 से 11 बजे, मंगलवार व शनिवार',
    benefits: 'कोर्ट-कचहरी विजय, शत्रुओं का दमन, प्रचंड सुरक्षा घेरा।',
    siddhiVidhi: '11 दिनों तक प्रतिदिन 11 माला का अनुष्ठान करें। अंतिम दिन गुड़-चने का भोग बांटें।',
    samagri: 'मूंगा माला या रुद्राक्ष माला, चमेली के तेल का दीपक, लाल लंगोट या ध्वजा।',
    niyam: 'दक्षिण दिशा की ओर मुख करें। साधना के दौरान मौन रहें।',
    targetCountSiddhi: '11 दिनों में 121 माला'
  },
  {
    id: 'hanuman-3',
    name: 'पंचमुखी वीर हनुमान रक्षा मंत्र',
    text: 'ॐ नमो भगवते पञ्चवदनाय पूर्वमुखाय वानराय सकलशत्रुसंहारकाय स्वाहा।',
    deity: 'hanuman',
    deityLabel: 'श्री हनुमान जी',
    category: 'aghori',
    categoryLabel: 'अघोरी व महाकाल साधना',
    meaning: 'पांच मुख वाले महाबली वीर हनुमान जो समस्त दिशाओं के शत्रुओं का दमन करते हैं।',
    bestTiming: 'मध्यरात्रि अथवा घोर संकट के समय',
    benefits: 'प्रचंड रक्षा कवच, तांत्रिक क्रियाओं का तत्काल नाश।',
    siddhiVidhi: 'शनिवार की रात्रि में पंचमुखी हनुमान जी के चित्र के समक्ष 21 माला जपें।',
    samagri: 'काली हकीक या रुद्राक्ष माला, सिंदूर, चमेली का तेल, लौंग व इलायची।',
    niyam: 'निर्भय मन से जप करें।',
    targetCountSiddhi: '21 माला (2268 जप)'
  },
  {
    id: 'hanuman-4',
    name: 'हनुमान जंजीरा शाबर मंत्र',
    text: 'ॐ नमो वज्र का कोठा जिसमें पिण्ड हमारा पैठा। ईश्वर कुंजी, ब्रह्मा का ताला, मेरे आठों धाम का यती हनुमंत रखवाला।',
    deity: 'hanuman',
    deityLabel: 'श्री हनुमान जी',
    category: 'nath',
    categoryLabel: 'नाथ / शाबर मंत्र',
    meaning: 'यति हनुमान जी साधक के शरीर को वज्र की भांति अभेद्य सुरक्षित करते हैं।',
    bestTiming: 'मंगलवार प्रातः अथवा संकट काल',
    benefits: 'घर और शरीर का अभेद्य रक्षा घेरा, नजर दोष का खात्मा।',
    siddhiVidhi: 'मंगलवार को हनुमान मंदिर में सिंदूर अर्पण कर 108 बार पाठ करें।',
    samagri: 'तुलसी या रुद्राक्ष माला, लाल फूल, गुड़-चना।',
    niyam: 'दिशा पूर्व या दक्षिण।',
    targetCountSiddhi: '108 जप'
  },
  {
    id: 'hanuman-5',
    name: 'रोग नाशक हनुमान बाहुक मंत्र',
    text: 'नासै रोग हरै सब पीरा। जपत निरंतर हनुमत बीरा॥',
    deity: 'hanuman',
    deityLabel: 'श्री हनुमान जी',
    category: 'granth',
    categoryLabel: 'ग्रंथ व वैदिक मंत्र',
    meaning: 'हनुमान जी के नाम का निरंतर जप समस्त शारीरिक व मानसिक रोगों का नाश करता है।',
    bestTiming: 'प्रातः काल स्नान के बाद',
    benefits: 'शारीरिक व्याधियों, जोड़ों के दर्द, असाध्य रोगों में राहत।',
    siddhiVidhi: 'एक तांबे के पात्र में जल रखकर 108 बार इस चौपाई का जप करें और वह जल रोगी को पिलाएं।',
    samagri: 'तांबे का पात्र, गंगाजल, तुलसी पत्र।',
    niyam: 'मन में पूर्ण श्रद्धा और आस्था रखें।',
    targetCountSiddhi: 'नित्य 108 जप'
  },

  // ==========================================
  // 5. श्री कृष्ण व नारायण (KRISHNA / VISHNU)
  // ==========================================
  {
    id: 'krishna-1',
    name: 'महामंत्र (हरे कृष्ण)',
    text: 'हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे। हरे राम हरे राम राम राम हरे हरे॥',
    deity: 'krishna',
    deityLabel: 'श्री कृष्ण',
    category: 'sadhu',
    categoryLabel: 'साधु व नाम मंत्र',
    meaning: 'हे सर्व-आकर्षक भगवान श्री कृष्ण व आनंददाता श्री राम, मुझे अपनी प्रेमाभक्ति में लगाएं।',
    bestTiming: 'ब्रह्म मुहूर्त, उठते-बैठते हर समय',
    benefits: 'कलियुग में समस्त पापों का नाश, परम शांति, भक्ति व मोक्ष।',
    siddhiVidhi: 'नित्य 16 माला का नियम जीवन भर रखें। न्यूनतम 1 माला प्रतिदिन।',
    samagri: 'तुलसी की 108 मनके की माला, गोमुखी (जप थैली)।',
    niyam: 'तुलसी माला नाभि से नीचे न जाए। पवित्र स्थान पर जपें।',
    targetCountSiddhi: 'नित्य 16 माला (1728 जप)'
  },
  {
    id: 'krishna-2',
    name: 'द्वादशाक्षर वासुदेव महामंत्र',
    text: 'ॐ नमो भगवते वासुदेवाय',
    deity: 'krishna',
    deityLabel: 'श्री कृष्ण',
    category: 'granth',
    categoryLabel: 'ग्रंथ व वैदिक मंत्र',
    meaning: 'वासुदेव के पुत्र सर्वव्यापक परमेश्वर श्री कृष्ण को मेरा नमन।',
    bestTiming: 'प्रातः काल सूर्योदय के समय',
    benefits: 'मोक्ष प्रदायक, पितृ दोष शांति, कुल में सद्बुद्धि व यश।',
    siddhiVidhi: 'सवा लाख जप 40 दिनों में पूरा करें।',
    samagri: 'तुलसी या चंदन माला, पीला आसन, मक्खन-मिश्री का भोग।',
    niyam: 'पूर्व दिशा की ओर मुख करें।',
    targetCountSiddhi: '1,25,000 जप'
  },
  {
    id: 'krishna-3',
    name: 'कामदेव-कृष्ण वशीकरण क्लीं बीज',
    text: 'ॐ क्लीं कृष्णाय गोविंदाय गोपीजनवल्लभाय स्वाहा',
    deity: 'krishna',
    deityLabel: 'श्री कृष्ण',
    category: 'tantrik',
    categoryLabel: 'तांत्रिक व बीज मंत्र',
    meaning: 'क्लीं कामबीज युक्त कृष्ण मंत्र जो समस्त ऐश्वर्य व आकर्षण का केंद्र है।',
    bestTiming: 'संध्या काल गोधूलि वेला',
    benefits: 'सम्मोहन शक्ति, वाणी में मिठास, दांपत्य प्रेम और व्यापारिक आकर्षण।',
    siddhiVidhi: '21 दिनों तक प्रतिदिन 5 माला जप करें।',
    samagri: 'वैजयंती माला, पीले फूल, इत्र, माखन मिश्री।',
    niyam: 'किसी का अहित करने की नीयत से जप न करें।',
    targetCountSiddhi: '21 दिनों में 105 माला'
  },
  {
    id: 'krishna-4',
    name: 'संतान गोपाल मंत्र',
    text: 'ॐ श्रीं ह्रीं क्लीं ग्लौं देवकीसुत गोविन्द वासुदेव जगत्पते। देहि मे तनयं कृष्ण त्वामहं शरणं गतः॥',
    deity: 'krishna',
    deityLabel: 'श्री कृष्ण',
    category: 'granth',
    categoryLabel: 'ग्रंथ व वैदिक मंत्र',
    meaning: 'हे देवकीनंदन, जगतपति भगवान कृष्ण, मैं आपकी शरण में हूँ, मुझे सुयोग्य संतान प्रदान करें।',
    bestTiming: 'प्रातः काल पति-पत्नी दोनों साथ जपें',
    benefits: 'संतान बाधा निवारण, स्वस्थ व तेजस्वी संतान की प्राप्ति।',
    siddhiVidhi: 'लड्डू गोपाल की स्थापना कर 1.25 लाख जप का संकल्प लें। नित्य 11 माला दोनों मिलकर करें।',
    samagri: 'तुलसी माला, पीले वस्त्र, तुलसी मंजरी, गाय का ताजा दूध, माखन।',
    niyam: 'गोपाल जी की बालक की भांति सेवा करें।',
    targetCountSiddhi: '1,25,000 जप'
  },

  // ==========================================
  // 6. माँ दुर्गा व काली (DURGA / KALI)
  // ==========================================
  {
    id: 'durga-1',
    name: 'नवार्ण महामंत्र (सप्तशती)',
    text: 'ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे',
    deity: 'durga_kali',
    deityLabel: 'माँ दुर्गा',
    category: 'granth',
    categoryLabel: 'ग्रंथ व वैदिक मंत्र',
    meaning: 'महासरस्वती (ऐं), महालक्ष्मी (ह्रीं), महाकाली (क्लीं) स्वरूप चामुण्डा देवी को नमन।',
    bestTiming: 'नवरात्रि, शुक्रवार, संध्या काल अथवा प्रातः',
    benefits: 'तीनों लोकों में कोई कार्य असंभव नहीं रहता, ज्ञान, धन, बल और अभय की प्राप्ति।',
    siddhiVidhi: 'नवरात्रि के 9 दिनों में प्रतिदिन 18 माला जप करें (कुल 162 माला = लगभग 18,000 जप)।',
    samagri: 'लाल चंदन या रुद्राक्ष माला, लाल आसन, घी का अखण्ड दीपक, हलवा-चना का भोग।',
    niyam: 'साधक को जमीन पर सोना चाहिए और कन्या पूजन अवश्य करना चाहिए।',
    targetCountSiddhi: '18,000 जप'
  },
  {
    id: 'durga-2',
    name: 'काली एकाक्षरी व त्र्यक्षरी बीज मंत्र',
    text: 'ॐ क्रीं क्रीं क्रीं हूं हूं ह्रीं ह्रीं दक्षिणे कालिके क्रीं क्रीं क्रीं हूं हूं ह्रीं ह्रीं स्वाहा',
    deity: 'durga_kali',
    deityLabel: 'माँ काली',
    category: 'tantrik',
    categoryLabel: 'तांत्रिक व बीज मंत्र',
    meaning: 'शमशानवासिनी, कालविनाशिनी दक्षिणा काली का परम शक्तिशाली बीज मंत्र।',
    bestTiming: 'अमावस्या की रात्रि, मंगलवार अर्धरात्रि',
    benefits: 'शत्रु विनाश, तंत्र काट, कुंडली शक्ति जाग्रत होना, असीम आत्मिक शक्ति।',
    siddhiVidhi: '21 दिनों तक रात्रि 10 बजे के बाद 11 माला जपें।',
    samagri: 'काले हकीक की माला, काला या लाल कम्बल, सरसों के तेल का दीपक, गुड़ व लौंग।',
    niyam: 'साधक का मन विचलित न हो। एकांत कक्ष में जप करें।',
    targetCountSiddhi: '21 दिनों में 231 माला'
  },
  {
    id: 'durga-3',
    name: 'दुर्गा दुर्गतिनाशिनी नाम मंत्र',
    text: 'ॐ दुं दुर्गायै नमः',
    deity: 'durga_kali',
    deityLabel: 'माँ दुर्गा',
    category: 'sadhu',
    categoryLabel: 'साधु व नाम मंत्र',
    meaning: 'समस्त दुखों और दुर्गति का नाश करने वाली माँ दुर्गा को प्रणाम।',
    bestTiming: 'प्रातः अथवा संध्या वेला',
    benefits: 'पारिवारिक संकट दूर होना, भय मुक्ति, सुख-शांति।',
    siddhiVidhi: '40 दिनों तक नित्य 5 माला जप करें।',
    samagri: 'कमलगट्टा या रुद्राक्ष माला, लाल गुड़हल के फूल।',
    niyam: 'उत्तर या पूर्व दिशा।',
    targetCountSiddhi: '40 दिनों में 200 माला'
  },
  {
    id: 'durga-4',
    name: 'सर्व बाधा प्रशमनं दुर्गा सप्तशती श्लोक',
    text: 'सर्वाबाधाप्रशमनं त्रैलोक्यस्याखिलेश्वरि। एवमेव त्वया कार्यमस्मद्वैरिविनाशनम्॥',
    deity: 'durga_kali',
    deityLabel: 'माँ दुर्गा',
    category: 'granth',
    categoryLabel: 'ग्रंथ व वैदिक मंत्र',
    meaning: 'हे अखिलेश्वरी, तीनों लोकों की समस्त बाधाओं को शांत करें और हमारे शत्रुओं का नाश करें।',
    bestTiming: 'संकट के समय किसी भी दिन',
    benefits: 'कोर्ट केस, जमीनी विवाद, व्यापारिक मंदी का तत्काल शमन।',
    siddhiVidhi: '108 बार नित्य 21 दिन तक जप करें।',
    samagri: 'लाल आसन, घी का दीपक, लौंग का जोड़ा।',
    niyam: 'शुद्ध भाव से माँ की स्तुति करें।',
    targetCountSiddhi: '21 दिनों में 21 माला'
  },

  // ==========================================
  // 7. माँ बगलामुखी (BAGLAMUKHI) - शत्रु स्तम्भन
  // ==========================================
  {
    id: 'bagla-1',
    name: 'माँ बगलामुखी अष्टोत्तर शतनाम बीज मंत्र',
    text: 'ॐ ह्लीं बगलामुखि सर्वदुष्टानां वाचं मुखं पदं स्तम्भय जिह्वां कीलय बुद्धिं विनाशय ह्लीं ॐ स्वाहा',
    deity: 'baglamukhi',
    deityLabel: 'माँ बगलामुखी',
    category: 'tantrik',
    categoryLabel: 'तांत्रिक व बीज मंत्र',
    meaning: 'हे पीताम्बरा बगलामुखी, समस्त दुष्टों की वाणी, मुख, पैर को स्तम्भित कर उनकी कुबुद्धि का नाश करें।',
    bestTiming: 'रात्रि 9 बजे के बाद, गुरुवार अथवा मंगलवार',
    benefits: 'शत्रु पराजय, कोर्ट कचहरी में निश्चित विजय, झूठे आरोपों से मुक्ति, स्तम्भन शक्ति।',
    siddhiVidhi: '36 अक्षरी मंत्र का 36 दिनों में 1 लाख जप (प्रतिदिन लगभग 28 माला) का विधान है।',
    samagri: 'हल्दी की माला (हरिद्रा माला), पीले वस्त्र, पीला आसन, पीला फल, बेसन के लड्डू का भोग।',
    niyam: 'पूर्व या उत्तर दिशा। पीले रंग की अनिवार्यता। मन में बदले की नहीं, रक्षा की भावना रखें।',
    targetCountSiddhi: '1,00,000 जप (926 माला)'
  },
  {
    id: 'bagla-2',
    name: 'बगलामुखी गायत्री मंत्र',
    text: 'ॐ सौभाग्यायै विद्महे पीताम्बरायै धीमहि तन्नो बगला प्रचोदयात्',
    deity: 'baglamukhi',
    deityLabel: 'माँ बगलामुखी',
    category: 'granth',
    categoryLabel: 'ग्रंथ व वैदिक मंत्र',
    meaning: 'सौभाग्यदात्री, पीताम्बरा बगलामुखी देवी हमारी बुद्धि को विजय व सत्य की ओर प्रेरित करें।',
    bestTiming: 'प्रातः काल सूर्योदय के समय',
    benefits: 'सात्विक सुरक्षा घेरा, वाद-विवाद में जीत, वाणी में ओज।',
    siddhiVidhi: 'प्रतिदिन 3 माला का नित्य जप 41 दिन तक करें।',
    samagri: 'हल्दी की माला, पीले कनेर के फूल।',
    niyam: 'झूठ बोलने से बचें।',
    targetCountSiddhi: '41 दिन नित्य 3 माला'
  },

  // ==========================================
  // 8. श्री राम (RAM) के महामंत्र
  // ==========================================
  {
    id: 'ram-1',
    name: 'तारक राम नाम मंत्र',
    text: 'श्री राम जय राम जय जय राम',
    deity: 'ram',
    deityLabel: 'श्री राम',
    category: 'sadhu',
    categoryLabel: 'साधु व नाम मंत्र',
    meaning: 'समस्त जीवों को भवसागर से पार कराने वाला परम तारक मंत्र।',
    bestTiming: 'सदा सर्वदा, प्रातः व संध्या',
    benefits: 'मानसिक अशांति, पापों का क्षय, पारिवारिक सौहार्द, मोक्ष।',
    siddhiVidhi: '13 करोड़ राम नाम जप की महान परंपरा है। प्रतिदिन न्यूनतम 11 माला का नियम लें।',
    samagri: 'तुलसी की माला, गोमुखी, शुद्ध आसन।',
    niyam: 'कोई कठोर नियम नहीं, केवल हृदय में निष्कपट प्रेम चाहिए।',
    targetCountSiddhi: 'नित्य 11 माला'
  },
  {
    id: 'ram-2',
    name: 'रामायण सिद्ध संपुट चौपाई',
    text: 'दीनदयाल बिरिदु संभारी। हरहु नाथ मम संकट भारी॥',
    deity: 'ram',
    deityLabel: 'श्री राम',
    category: 'granth',
    categoryLabel: 'ग्रंथ व वैदिक मंत्र',
    meaning: 'हे दीनों पर दया करने वाले रघुनाथ, अपने स्वभाव को याद कर मेरे भारी संकट को हर लीजिए।',
    bestTiming: 'प्रातः पूजा के समय',
    benefits: 'असाध्य संकट से उबरना, मन में अटूट संबल का संचार।',
    siddhiVidhi: 'प्रतिदिन 108 बार (1 माला) का पाठ 40 दिन तक करें।',
    samagri: 'तुलसी माला, घी का दीपक, मिश्री का भोग।',
    niyam: 'प्रभु राम के चरणों में पूर्ण समर्पण रखें।',
    targetCountSiddhi: '40 दिन में 40 माला'
  },
  {
    id: 'ram-3',
    name: 'श्री राम रक्षा स्तोत्र बीज श्लोक',
    text: 'रामाय रामभद्राय रामचन्द्राय वेधसे। रघुनाथाय नाथाय सीतायाः पतये नमः॥',
    deity: 'ram',
    deityLabel: 'श्री राम',
    category: 'granth',
    categoryLabel: 'ग्रंथ व वैदिक मंत्र',
    meaning: 'कल्याणकारी रामभद्र, सीतापति मर्यादा पुरुषोत्तम राम को मेरा बारम्बार प्रणाम।',
    bestTiming: 'प्रातः काल सूर्योदय के समय',
    benefits: 'समस्त प्रकार की आपदाओं से रक्षा, कुल की वृद्धि।',
    siddhiVidhi: 'प्रतिदिन 3 माला का जप 21 दिन तक करें।',
    samagri: 'तुलसी माला, पीले पुष्प।',
    niyam: 'पूर्व दिशा की ओर मुख करें।',
    targetCountSiddhi: '21 दिन नित्य 3 माला'
  },

  // ==========================================
  // 9. भगवान गणेश (GANESHA) - विघ्नहर्ता
  // ==========================================
  {
    id: 'ganesh-1',
    name: 'गणेश मूल नाम मंत्र',
    text: 'ॐ गं गणपतये नमः',
    deity: 'ganesha',
    deityLabel: 'भगवान गणेश',
    category: 'sadhu',
    categoryLabel: 'साधु व नाम मंत्र',
    meaning: 'समस्त गणों के स्वामी, विघ्नहर्ता भगवान गणेश को मेरा नमन।',
    bestTiming: 'किसी भी शुभ कार्य के आरंभ में, बुधवार प्रातः',
    benefits: 'रुके हुए कार्यों का निर्विघ्न संपन्न होना, बुद्धि व रिद्धि-सिद्धि का लाभ।',
    siddhiVidhi: 'बुधवार से शुरू कर 21 दिनों तक नित्य 11 माला जप करें। दुर्वा अर्पित करें।',
    samagri: 'रुद्राक्ष या लाल चंदन माला, लाल आसन, 21 दूर्वा दल, मोदक या गुड़ का भोग।',
    niyam: 'पूर्व दिशा की ओर मुख। प्रथम पूज्य के रूप में पहले स्मरण करें।',
    targetCountSiddhi: '21 दिनों में 231 माला'
  },
  {
    id: 'ganesh-2',
    name: 'उच्छिष्ट गणेश तांत्रिक धन मंत्र',
    text: 'ॐ हस्तिपिशाचिलिखे स्वाहा',
    deity: 'ganesha',
    deityLabel: 'भगवान गणेश',
    category: 'tantrik',
    categoryLabel: 'तांत्रिक व बीज मंत्र',
    meaning: 'उच्छिष्ट गणपति का अत्यंत तीव्र तांत्रिक सिद्धि मंत्र जो दरिद्रता का नाश करता है।',
    bestTiming: 'शुक्ल पक्ष की चतुर्थी, रात्रिकाल',
    benefits: 'त्वरित धन लाभ, कर्ज से मुक्ति, व्यापार में अभूतपूर्व उन्नति।',
    siddhiVidhi: '11 दिनों तक रात्रि के समय 11 माला का अनुष्ठान करें।',
    samagri: 'लाल चंदन माला, लाल वस्त्र, तिल के तेल का दीपक, गुड़ व धनिया।',
    niyam: 'इस साधना में पवित्रता का विशेष ध्यान रखें।',
    targetCountSiddhi: '11 दिनों में 121 माला'
  },
  {
    id: 'ganesh-3',
    name: 'गणेश गायत्री मंत्र',
    text: 'ॐ एकदन्ताय विद्महे वक्रतुण्डाय धीमहि तन्नो दन्तिः प्रचोदयात्',
    deity: 'ganesha',
    deityLabel: 'भगवान गणेश',
    category: 'granth',
    categoryLabel: 'ग्रंथ व वैदिक मंत्र',
    meaning: 'एकदंत, वक्रतुण्ड भगवान गणेश हमारी बुद्धि को ज्ञान व विवेक की ओर प्रेरित करें।',
    bestTiming: 'प्रातः काल अध्ययन से पूर्व',
    benefits: 'विद्यार्थियों के लिए एकाग्रता, तीव्र स्मरण शक्ति व परीक्षा में सफलता।',
    siddhiVidhi: 'नित्य 1 माला का जप 40 दिन तक करें।',
    samagri: 'रुद्राक्ष माला, पीले पुष्प, मोदक।',
    niyam: 'प्रतिदिन सूर्योदय के बाद जपें।',
    targetCountSiddhi: '40 दिन में 40 माला'
  },

  // ==========================================
  // 10. माँ सरस्वती (SARASWATI) - विद्या व बुद्धि
  // ==========================================
  {
    id: 'saraswati-1',
    name: 'सरस्वती एकाक्षरी ऐं बीज मंत्र',
    text: 'ॐ ऐं सरस्वत्यै ऐं नमः',
    deity: 'saraswati',
    deityLabel: 'माँ सरस्वती',
    category: 'tantrik',
    categoryLabel: 'तांत्रिक व बीज मंत्र',
    meaning: 'वाग्देवी माँ सरस्वती का "ऐं" वाग्बीज युक्त मंत्र जो समस्त ज्ञान का स्रोत है।',
    bestTiming: 'प्रातः काल ब्रह्म मुहूर्त अथवा वसंत पंचमी',
    benefits: 'स्मरण शक्ति में चमत्कारी वृद्धि, वाणी में आकर्षण, संगीत व कला में सिद्धि।',
    siddhiVidhi: 'वसंत पंचमी या किसी भी शुक्ल पक्ष के गुरुवार से 40 दिन तक नित्य 5 माला जपें।',
    samagri: 'स्फटिक माला या सफेद चंदन माला, सफेद वस्त्र, सफेद पुष्प, मिश्री व दूध का भोग।',
    niyam: 'उत्तर या पूर्व दिशा। पुस्तकों और लेखनी का कभी अनादर न करें।',
    targetCountSiddhi: '40 दिनों में 200 माला'
  },
  {
    id: 'saraswati-2',
    name: 'सरस्वती विद्या प्रदायक पौराणिक श्लोक',
    text: 'सरस्वति नमस्तुभ्यं वरदे कामरूपिणि। विद्यारम्भं करिष्यामि सिद्धिर्भवतु मे सदा॥',
    deity: 'saraswati',
    deityLabel: 'माँ सरस्वती',
    category: 'granth',
    categoryLabel: 'ग्रंथ व वैदिक मंत्र',
    meaning: 'हे वरदायिनी माँ सरस्वती, मैं विद्या अध्ययन प्रारंभ कर रहा हूँ, मुझे सदा सफलता प्रदान करें।',
    bestTiming: 'प्रतिदिन पढ़ाई शुरू करने से पहले',
    benefits: 'कठिन विषय सरलता से समझ आना, स्मरण शक्ति सुदृढ़ होना।',
    siddhiVidhi: 'नित्य 11 बार या 1 माला का पाठ करें।',
    samagri: 'सफेद पुष्प, धूपबत्ती।',
    niyam: 'मन को शांत व एकाग्र रखें।',
    targetCountSiddhi: 'नित्य 1 माला'
  },

  // ==========================================
  // 11. काल भैरव (BHAIRAV) - बाधा नाशक
  // ==========================================
  {
    id: 'bhairav-1',
    name: 'काल भैरव एकाक्षरी तीव्र मंत्र',
    text: 'ॐ भ्रं भैरवाय वम वम ह्रीं फट् स्वाहा',
    deity: 'bhairav',
    deityLabel: 'काल भैरव',
    category: 'tantrik',
    categoryLabel: 'तांत्रिक व बीज मंत्र',
    meaning: 'भैरव बीज "भ्रं" युक्त उग्र मंत्र जो समस्त दिशाओं के अंधकार व बाधाओं को काटता है।',
    bestTiming: 'शनिवार अथवा रविवार मध्यरात्रि',
    benefits: 'शत्रु स्तम्भन, नजर दोष, तांत्रिक क्रियाओं का तत्काल भंजन।',
    siddhiVidhi: 'रविवार की रात्रि में भैरव मंदिर में तेल का दीपक जलाकर 11 माला का 7 दिन जप करें।',
    samagri: 'रुद्राक्ष माला, सरसों के तेल का चौमुखी दीपक, उड़द के पकोड़े, काले तिल, इमरती।',
    niyam: 'दक्षिण दिशा। साधना के बाद कुत्तों को मीठी रोटी अवश्य खिलाएं।',
    targetCountSiddhi: '7 दिनों में 77 माला'
  },
  {
    id: 'bhairav-2',
    name: 'बटुक भैरव आपदुद्धारक मंत्र',
    text: 'ॐ ह्रीं बटुकाय आपदुद्धारणाय कुरु कुरु बटुकाय ह्रीं ॐ स्वाहा',
    deity: 'bhairav',
    deityLabel: 'काल भैरव / बटुक भैरव',
    category: 'aghori',
    categoryLabel: 'अघोरी व महाकाल साधना',
    meaning: 'समस्त आपत्तियों व संकटों से उबारने वाले बाल स्वरूप बटुक भैरव का शरण मंत्र।',
    bestTiming: 'संध्या काल 7 से 9 बजे',
    benefits: 'अचानक आने वाले संकट, बीमारी व कोर्ट कचहरी के भय से मुक्ति।',
    siddhiVidhi: '21 दिनों तक नित्य 5 माला जप करें।',
    samagri: 'रुद्राक्ष माला, चमेली या तिल का तेल, दूध व बताशे का भोग।',
    niyam: 'बटुक भैरव सौम्य हैं, अतः बालकों को कुछ न कुछ मीठा खिलाएं।',
    targetCountSiddhi: '21 दिनों में 105 माला'
  },
  {
    id: 'bhairav-3',
    name: 'भैरव शाबर हांक मंत्र',
    text: 'ॐ नमो आदेश गुरु को। काला भैरों, गोरा भैरों, बावन बीर का सरदार, हाथ खप्पर त्रिशूल विराजे, दुष्टों को संहार। आदेश आदेश।',
    deity: 'bhairav',
    deityLabel: 'काल भैरव',
    category: 'nath',
    categoryLabel: 'नाथ / शाबर मंत्र',
    meaning: 'नवनाथ परंपरा अनुसार भैरवनाथ की प्रत्यक्ष हांक का सिद्ध मंत्र।',
    bestTiming: 'रविवार रात्रिकाल',
    benefits: 'घर और संपत्ति की अभेद्य पहरेदारी।',
    siddhiVidhi: 'रविवार को 108 बार जप करके काले कुत्ते को भोजन कराएं।',
    samagri: 'काली उड़द, सरसों का तेल, कच्चा दूध।',
    niyam: 'मन में पूर्ण शुचिता रखें।',
    targetCountSiddhi: '108 जप'
  },

  // ==========================================
  // 12. नवग्रह शांति व दोष निवारण (NAVGRAHA)
  // ==========================================
  {
    id: 'nav-1',
    name: 'सूर्य देव गायत्री व आरोग्य मंत्र',
    text: 'ॐ आदित्याय विद्महे मार्तण्डाय धीमहि तन्नो सूर्यः प्रचोदयात्। ॐ घृणि सूर्याय नमः॥',
    deity: 'navgraha',
    deityLabel: 'सूर्य देव',
    category: 'granth',
    categoryLabel: 'ग्रंथ व वैदिक मंत्र',
    meaning: 'समस्त जगत के चक्षु, तेजस्वी भगवान सूर्य हमें स्वास्थ्य, तेज व ओज प्रदान करें।',
    bestTiming: 'रविवार प्रातः सूर्योदय के समय',
    benefits: 'नेत्र रोग व हृदय रोग से मुक्ति, सरकारी नौकरी व पिता से सहयोग, यश व प्रतिष्ठा।',
    siddhiVidhi: 'तांबे के लोटे में जल, कुमकुम व लाल फूल डालकर सूर्य को अर्घ्य दें और 11 माला जपें।',
    samagri: 'लाल चंदन माला, तांबे का पात्र, गुड़, लाल पुष्प।',
    niyam: 'पूर्व दिशा की ओर मुख। सूर्योदय से पहले उठना अनिवार्य।',
    targetCountSiddhi: '40 रविवार नित्य 11 माला'
  },
  {
    id: 'nav-2',
    name: 'शनि देव तांत्रिक शांति मंत्र',
    text: 'ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः। ॐ शं शनैश्चराय नमः॥',
    deity: 'navgraha',
    deityLabel: 'शनि देव',
    category: 'tantrik',
    categoryLabel: 'तांत्रिक व बीज मंत्र',
    meaning: 'सूर्यपुत्र, कर्मफलदाता भगवान शनिदेव के चरणों में मेरा प्रणाम।',
    bestTiming: 'शनिवार संध्या काल, पीपल वृक्ष के नीचे',
    benefits: 'शनि की साढ़ेसाती, ढैय्या व महादशा के अशुभ प्रभावों का शमन।',
    siddhiVidhi: 'शनिवार को पीपल के वृक्ष के नीचे सरसों के तेल का दीपक जलाकर 21 माला का 11 शनिवार जप करें।',
    samagri: 'काले घोड़े की नाल की मुद्रिका या रुद्राक्ष माला, सरसों का तेल, काले तिल, लोहे की कील।',
    niyam: 'पश्चिम दिशा। किसी निर्धन या असहाय व्यक्ति को भोजन कराएं।',
    targetCountSiddhi: '11 शनिवार में 231 माला'
  },
  {
    id: 'nav-3',
    name: 'राहु बीज शांति मंत्र',
    text: 'ॐ भ्रां भ्रीं भ्रौं सः राहवे नमः',
    deity: 'navgraha',
    deityLabel: 'राहु देव',
    category: 'tantrik',
    categoryLabel: 'तांत्रिक व बीज मंत्र',
    meaning: 'छाया ग्रह राहु की पीड़ा शांत करने वाला वैदिक बीज मंत्र।',
    bestTiming: 'शनिवार रात्रिकाल',
    benefits: 'कालसर्प दोष से मुक्ति, अचानक होने वाली दुर्घटनाओं व मानसिक भ्रम से रक्षा।',
    siddhiVidhi: '18,000 जप 40 दिनों में पूरा करें।',
    samagri: 'काली हकीक माला, काले वस्त्र, उड़द, नारियल।',
    niyam: 'दक्षिण दिशा। मन में संयम रखें।',
    targetCountSiddhi: '18,000 जप (167 माला)'
  },
  {
    id: 'nav-4',
    name: 'बृहस्पति गुरु ज्ञान व विवाह मंत्र',
    text: 'ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः',
    deity: 'navgraha',
    deityLabel: 'बृहस्पति देव',
    category: 'tantrik',
    categoryLabel: 'तांत्रिक व बीज मंत्र',
    meaning: 'देवगुरु बृहस्पति का बीज मंत्र जो धर्म, ज्ञान और भाग्य का कारक है।',
    bestTiming: 'गुरुवार प्रातः काल',
    benefits: 'विवाह में आने वाली बाधाओं का निवारण, भाग्य वृद्धि, उच्च शिक्षा व धन।',
    siddhiVidhi: '19,000 जप 40 दिनों में पूरा करें। केले के वृक्ष की पूजा करें।',
    samagri: 'हल्दी की माला या पीले चंदन की माला, चने की दाल, गुड़, पीले फूल।',
    niyam: 'गुरुवार को नमक का त्याग करें।',
    targetCountSiddhi: '19,000 जप (176 माला)'
  },

  // ==========================================
  // 13. गायत्री महामंत्र (सर्व वेदों का सार)
  // ==========================================
  {
    id: 'gayatri-1',
    name: 'वेदमाता गायत्री महामंत्र',
    text: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्॥',
    deity: 'tridev',
    deityLabel: 'वेदमाता गायत्री',
    category: 'granth',
    categoryLabel: 'ग्रंथ व वैदिक मंत्र',
    meaning: 'उस प्राणस्वरूप, दुखनाशक, सुखस्वरूप, श्रेष्ठ, तेजस्वी, पापनाशक, देवस्वरूप परमात्मा को हम अंतःकरण में धारण करें, जो हमारी बुद्धि को सन्मार्ग पर प्रेरित करे।',
    bestTiming: 'त्रिकाल संध्या (प्रातः सूर्योदय, दोपहर व सायं सूर्यास्त)',
    benefits: 'आत्म साक्षात्कार, बुद्धि की प्रचंड शुद्धि, समस्त पापों का भस्म होना, दिव्य तेज।',
    siddhiVidhi: 'गायत्री अनुष्ठान 24,000 जप (9 दिन) अथवा सवा लाख जप (40 दिन) में संपन्न किया जाता है।',
    samagri: 'तुलसी या रुद्राक्ष माला, कुश का आसन, तांबे का लोटा, गाय का घी, सफेद या पीले वस्त्र।',
    niyam: 'पूर्व दिशा की ओर मुख। शुद्ध शाकाहार, ब्रह्मचर्य और प्रतिदिन नियमित समय पर जप।',
    targetCountSiddhi: '24,000 जप (222 माला)'
  },
  ...CHALISA_SUNDARKAND_MANTRAS,
  ...SHABAR_TANTRIK_MANTRAS,
  ...DEHATI_SHABAR_MANTRAS,
  ...DEHATI_SHABAR_EXPANDED_MANTRAS,
  ...VED_UPANISHAD_GITA_MANTRAS,
  ...GITA_COMPLETE_MANTRAS,
  ...RUDRI_COMPLETE_MANTRAS,
  ...UPANISHAD_COMPLETE_MANTRAS,
  ...NAAM_JAAP_MANTRAS,
  ...AARTI_MANTRAS
];

// Deduplicate mantras by ID & normalized text so each mantra appears only once in the entire app
export const PRELOADED_MANTRAS: MantraItem[] = (() => {
  const seenIds = new Set<string>();
  const seenTexts = new Set<string>();
  const cleanList: MantraItem[] = [];

  for (const m of RAW_PRELOADED_MANTRAS) {
    if (!m || !m.id || !m.text) continue;
    // Normalize text (ignore spaces, punctuation, devanagari danda)
    const normText = m.text.replace(/[\s\n\r॥।0-9०-९]/g, '').slice(0, 35);
    if (seenIds.has(m.id) || (normText.length >= 12 && seenTexts.has(normText))) {
      continue;
    }
    seenIds.add(m.id);
    if (normText.length >= 12) {
      seenTexts.add(normText);
    }
    cleanList.push(m);
  }
  return cleanList;
})();

export const DHARMIK_PRODUCTS: any[] = [
  {
    id: 'p1',
    title: 'प्रामाणिक 108 मनका पंचमुखी रुद्राक्ष माला',
    subtitle: 'नेपाली प्रमाणित रुद्राक्ष - शिव, महामृत्युंजय व भैरव साधना हेतु सर्वोत्तम',
    category: 'माला व जप साधन',
    price: '₹499',
    rating: 4.9,
    ratingCount: 1420,
    imageUrl: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=300&q=80',
    affiliateUrl: 'https://www.amazon.in/s?k=rudraksha+mala+original',
    badge: 'सर्वाधिक लोकप्रिय'
  },
  {
    id: 'p2',
    title: 'प्राकृतिक शुद्ध श्याम तुलसी कंठी व जप माला (108)',
    subtitle: 'वृंदावन धाम से अभिमंत्रित - राम, कृष्ण व विष्णु महामंत्र जप हेतु',
    category: 'माला व जप साधन',
    price: '₹299',
    rating: 4.8,
    ratingCount: 980,
    imageUrl: 'https://images.unsplash.com/photo-1617791160505-6f00b51616ec?auto=format&fit=crop&w=300&q=80',
    affiliateUrl: 'https://www.amazon.in/s?k=tulsi+mala+original',
    badge: 'वैष्णव प्रिय'
  },
  {
    id: 'p3',
    title: 'प्राकृतिक कमलगट्टे की 108 मनका लक्ष्मी माला',
    subtitle: 'कनकधारा व कुबेर साधना द्वारा अखंड धन व समृद्धि आकर्षण हेतु',
    category: 'धन सिद्धि साधन',
    price: '₹349',
    rating: 4.9,
    ratingCount: 820,
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=300&q=80',
    affiliateUrl: 'https://www.amazon.in/s?k=kamalgatta+mala+original',
    badge: 'लक्ष्मी सिद्धि'
  },
  {
    id: 'p4',
    title: 'पीली हल्दी (हरिद्रा) की 108 मनका माला',
    subtitle: 'माँ बगलामुखी व देवगुरु बृहस्पति साधना हेतु अत्यंत प्रभावशाली',
    category: 'शत्रु स्तम्भन',
    price: '₹299',
    rating: 4.7,
    ratingCount: 430,
    imageUrl: 'https://images.unsplash.com/photo-1567591370504-2065e9ef028c?auto=format&fit=crop&w=300&q=80',
    affiliateUrl: 'https://www.amazon.in/s?k=haldi+mala+original',
    badge: 'बगलामुखी प्रिय'
  }
];
