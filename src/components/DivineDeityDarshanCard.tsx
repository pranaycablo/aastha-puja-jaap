import React, { useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';

export type DeityImageType =
  | 'hanuman'
  | 'shiva'
  | 'ram'
  | 'krishna'
  | 'durga'
  | 'ganesha'
  | 'lakshmi'
  | 'saraswati'
  | 'vishnu'
  | 'surya'
  | 'bhairav'
  | 'gita'
  | 'vedas';

interface DivineDeityDarshanCardProps {
  deityType: DeityImageType | string;
  title?: string;
  subtitle?: string;
  shloka?: string;
  size?: 'banner' | 'card' | 'compact';
}

export const DivineDeityDarshanCard: React.FC<DivineDeityDarshanCardProps> = ({
  deityType,
  title,
  subtitle,
  shloka,
  size = 'banner'
}) => {
  const [imageError, setImageError] = useState(false);

  // Normalize deity
  const normalizedKey = (deityType || '').toLowerCase();

  const getDeityTheme = () => {
    if (normalizedKey.includes('hanuman')) {
      return {
        name: 'श्री हनुमान जी महाराज',
        tag: 'संकटमोचन • अष्टसिद्धि नौ निधि के दाता',
        icon: '🚩',
        imageSrc: '/images/deities/hanuman.svg',
        bgGradient: 'from-orange-600 via-red-600 to-amber-700',
        borderColor: 'border-amber-400',
        haloGlow: '#F59E0B',
        shlokaText: 'मनोजवं मारुततुल्यवेगं जितेन्द्रियं बुद्धिमतां वरिष्ठम्।'
      };
    }
    if (normalizedKey.includes('shiv') || normalizedKey.includes('mahadev') || normalizedKey.includes('rudra')) {
      return {
        name: 'देवाधिदेव महादेव शिव',
        tag: 'कैलासपति • त्रिनेत्रधारी • कर्पूरगौरम्',
        icon: '🔱',
        imageSrc: '/images/deities/shiva.svg',
        bgGradient: 'from-cyan-800 via-sky-800 to-indigo-900',
        borderColor: 'border-cyan-300',
        haloGlow: '#38BDF8',
        shlokaText: 'कर्पूरगौरं करुणावतारं संसारसारं भुजगेन्द्रहारम्।'
      };
    }
    if (normalizedKey.includes('ram') || normalizedKey.includes('sundarkand') || normalizedKey.includes('sita')) {
      return {
        name: 'मर्यादा पुरुषोत्तम श्री राम व जानकी',
        tag: 'रघुकुल तिलक • धनुर्धारी • तारक ब्रह्म',
        icon: '🏹',
        imageSrc: '/images/deities/ram.svg',
        bgGradient: 'from-amber-600 via-orange-600 to-rose-700',
        borderColor: 'border-amber-300',
        haloGlow: '#FBBF24',
        shlokaText: 'रामो विग्रहवान् धर्मः साधुः सत्यपराक्रमः।'
      };
    }
    if (normalizedKey.includes('krishna') || normalizedKey.includes('gita')) {
      return {
        name: 'भगवान श्री द्वारकाधीश कृष्ण',
        tag: 'मुरलीधर • पीताम्बरधारी • जगद्गुरु',
        icon: '🪈',
        imageSrc: '/images/deities/krishna.svg',
        bgGradient: 'from-indigo-800 via-purple-800 to-amber-700',
        borderColor: 'border-amber-300',
        haloGlow: '#A855F7',
        shlokaText: 'वसुदेवसुतं देवं कंसचाणूरमर्दनम् देवकीपरमानन्दं कृष्णं वन्दे जगद्गुरुम्।'
      };
    }
    if (normalizedKey.includes('durga') || normalizedKey.includes('kali') || normalizedKey.includes('shakti')) {
      return {
        name: 'भगवती माँ जगदम्बा दुर्गा',
        tag: 'आदिशक्ति • महिषासुरमर्दिनी • सिंहवाहिनी',
        icon: '🌸',
        imageSrc: '/images/deities/durga.svg',
        bgGradient: 'from-rose-700 via-red-700 to-orange-800',
        borderColor: 'border-rose-300',
        haloGlow: '#F43F5E',
        shlokaText: 'सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके शरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते।'
      };
    }
    if (normalizedKey.includes('ganesh')) {
      return {
        name: 'प्रथम पूज्य भगवान श्री गणेश',
        tag: 'विघ्नहर्ता • मोदकप्रिय • गजानन',
        icon: '🐘',
        imageSrc: '/images/deities/ganesha.svg',
        bgGradient: 'from-orange-600 via-amber-600 to-yellow-600',
        borderColor: 'border-yellow-300',
        haloGlow: '#F59E0B',
        shlokaText: 'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा।'
      };
    }
    if (normalizedKey.includes('lakshmi')) {
      return {
        name: 'माँ महालक्ष्मी',
        tag: 'अष्टलक्ष्मी • धन-धान्य ऐश्वर्य प्रदायिनी',
        icon: '🪙',
        imageSrc: '/images/deities/lakshmi.svg',
        bgGradient: 'from-amber-600 via-yellow-600 to-rose-600',
        borderColor: 'border-yellow-300',
        haloGlow: '#FDE047',
        shlokaText: 'नमस्तेऽस्तु महामाये श्रीपीठे सुरपूजिते शङ्खचक्रगदाहस्ते महालक्ष्मि नमोऽस्तु ते।'
      };
    }
    if (normalizedKey.includes('saraswati')) {
      return {
        name: 'विद्या की देवी माँ सरस्वती',
        tag: 'वीणावादिनी • हंसवाहिनी • वाग्देवी',
        icon: '🪕',
        imageSrc: '/images/deities/saraswati.svg',
        bgGradient: 'from-sky-700 via-indigo-700 to-purple-800',
        borderColor: 'border-sky-300',
        haloGlow: '#E0E7FF',
        shlokaText: 'या कुन्देन्दुतुषारहारधवला या शुभ्रवस्त्रावृता या वीणावरदण्डमण्डितकरा या श्वेतपद्मासना।'
      };
    }
    if (normalizedKey.includes('vishnu') || normalizedKey.includes('narayan')) {
      return {
        name: 'जगतपालक भगवान श्री हरि विष्णु',
        tag: 'शंख-चक्र-गदा-पद्मधारी • क्षीरसागरवासी',
        icon: '🐚',
        imageSrc: '/images/deities/vishnu.svg',
        bgGradient: 'from-blue-800 via-indigo-800 to-amber-700',
        borderColor: 'border-amber-300',
        haloGlow: '#38BDF8',
        shlokaText: 'शान्ताकारं भुजगशयनं पद्मनाभं सुरेशं विश्वाधारं गगनसदृशं मेघवर्णं शुभाङ्गम्।'
      };
    }
    if (normalizedKey.includes('surya') || normalizedKey.includes('aditya') || normalizedKey.includes('sun')) {
      return {
        name: 'भगवान श्री भुवन भास्कर सूर्यदेव',
        tag: 'प्रत्यक्ष देवता • आरोग्य प्रदाता • सप्त-अश्व रथ',
        icon: '☀️',
        imageSrc: '/images/deities/surya.svg',
        bgGradient: 'from-amber-500 via-orange-600 to-red-700',
        borderColor: 'border-amber-300',
        haloGlow: '#FBBF24',
        shlokaText: 'आदित्यस्य नमस्कारं ये कुर्वन्ति दिने दिने। जन्मान्तरसहस्रेषु दारिद्र्यं नोपजायते॥'
      };
    }
    if (normalizedKey.includes('bhairav')) {
      return {
        name: 'भगवान श्री काल भैरव',
        tag: 'काशी के कोतवाल • अष्टभैरव • भयभंजन',
        icon: '⚔️',
        imageSrc: '/images/deities/bhairav.svg',
        bgGradient: 'from-red-900 via-stone-900 to-indigo-950',
        borderColor: 'border-red-400',
        haloGlow: '#EF4444',
        shlokaText: 'देवराजसेव्यमानपावनाङ्घ्रिपङ्कजं व्यालयज्ञसूत्रमिन्दुशेखरं कृपाकरम्।'
      };
    }
    if (normalizedKey.includes('gayatri')) {
      return {
        name: 'वेदमाता भगवती गायत्री',
        tag: 'सद्बुद्धि प्रदायिनी • समस्त वेदों की जननी',
        icon: '🪷',
        imageSrc: '/images/deities/gayatri.svg',
        bgGradient: 'from-yellow-600 via-amber-600 to-orange-700',
        borderColor: 'border-yellow-300',
        haloGlow: '#FDE047',
        shlokaText: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्॥'
      };
    }
    if (normalizedKey.includes('shani')) {
      return {
        name: 'न्याय के देवता भगवान श्री शनिदेव',
        tag: 'कर्मफलदाता • सूर्यपुत्र • छायात्मज',
        icon: '⚖️',
        imageSrc: '/images/deities/shani.svg',
        bgGradient: 'from-blue-900 via-indigo-950 to-slate-900',
        borderColor: 'border-blue-400',
        haloGlow: '#60A5FA',
        shlokaText: 'नीलांजनसमाभासं रविपुत्रं यमाग्रजम्। छायामार्तण्डसम्भूतं तं नमामि शनैश्चरम्॥'
      };
    }

    // Default universal divine theme
    return {
      name: title || 'सच्चिदानंद परब्रह्म परमात्मा',
      tag: subtitle || 'सनातन सत्य • अखंड शांति',
      icon: '🕉️',
      imageSrc: '/images/deities/shiva.svg',
      bgGradient: 'from-amber-700 via-orange-800 to-purple-900',
      borderColor: 'border-amber-400',
      haloGlow: '#FBBF24',
      shlokaText: shloka || 'ॐ द्यौः शान्तिरन्तरिक्षं शान्तिः पृथिवी शान्तिरापः शान्तिरोषधयः शान्तिः।'
    };
  };

  const theme = getDeityTheme();
  const displayTitle = title || theme.name;
  const displaySubtitle = subtitle || theme.tag;
  const displayShloka = shloka || theme.shlokaText;

  if (size === 'compact') {
    return (
      <div className={`p-2.5 rounded-2xl bg-gradient-to-r ${theme.bgGradient} text-white border-2 ${theme.borderColor} shadow-md flex items-center gap-2.5`}>
        <div className="w-10 h-10 rounded-xl overflow-hidden bg-black/25 flex items-center justify-center shrink-0 border border-white/20">
          {!imageError ? (
            <img
              src={theme.imageSrc}
              alt={displayTitle}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <span className="text-xl">{theme.icon}</span>
          )}
        </div>
        <div className="min-w-0">
          <h4 className="text-xs font-black truncate text-amber-100">{displayTitle}</h4>
          <p className="text-[10px] text-amber-200/80 truncate">{displaySubtitle}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${theme.bgGradient} text-white border-2 ${theme.borderColor} shadow-xl p-4 sm:p-5 select-none`}>
      {/* Radiant Glowing Background Aura */}
      <div
        className="absolute -right-8 -top-8 w-44 h-44 rounded-full blur-2xl opacity-30 pointer-events-none"
        style={{ backgroundColor: theme.haloGlow }}
      />
      <div
        className="absolute -left-8 -bottom-8 w-36 h-36 rounded-full blur-2xl opacity-25 pointer-events-none"
        style={{ backgroundColor: theme.haloGlow }}
      />

      {/* Decorative Traditional Corner Motifs */}
      <div className="absolute top-2 left-3 text-amber-300/40 text-[10px] font-serif">卐</div>
      <div className="absolute top-2 right-3 text-amber-300/40 text-[10px] font-serif">ॐ</div>
      <div className="absolute bottom-2 left-3 text-amber-300/40 text-[10px] font-serif">ॐ</div>
      <div className="absolute bottom-2 right-3 text-amber-300/40 text-[10px] font-serif">卐</div>

      <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-3.5 text-center sm:text-left">
        {/* Deity Authentic Portrait Image with Sacred Halo */}
        <div className="relative shrink-0">
          <div
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-black/35 backdrop-blur-xs border-2 border-amber-300/60 flex items-center justify-center shadow-lg ring-4 ring-amber-400/20"
          >
            {!imageError ? (
              <img
                src={theme.imageSrc}
                alt={displayTitle}
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                onError={() => setImageError(true)}
              />
            ) : (
              <span className="text-3xl sm:text-4xl">{theme.icon}</span>
            )}
          </div>
          <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 items-center justify-center text-[8px] text-slate-950 font-black">
              ✨
            </span>
          </span>
        </div>

        {/* Deity Name, Title & Sacred Shloka */}
        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 bg-black/30 px-2 py-0.5 rounded-full border border-amber-400/30">
              {displaySubtitle}
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-black text-amber-100 tracking-wide">
            {displayTitle}
          </h3>

          <p className="text-[11.5px] font-sanskrit text-amber-200/90 leading-relaxed italic border-t border-white/10 pt-1">
            "{displayShloka}"
          </p>
        </div>
      </div>
    </div>
  );
};
