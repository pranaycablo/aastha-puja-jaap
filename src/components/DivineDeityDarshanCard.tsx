import React from 'react';
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
  // Normalize deity
  const normalizedKey = (deityType || '').toLowerCase();

  const getDeityTheme = () => {
    if (normalizedKey.includes('hanuman')) {
      return {
        name: 'श्री हनुमान जी महाराज',
        tag: 'संकटमोचन • अष्टसिद्धि नौ निधि के दाता',
        icon: '🚩',
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
        icon: '💰',
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
        bgGradient: 'from-sky-700 via-indigo-700 to-purple-800',
        borderColor: 'border-sky-300',
        haloGlow: '#E0E7FF',
        shlokaText: 'या कुन्देन्दुतुषारहारधवला या शुभ्रवस्त्रावृता या वीणावरदण्डमण्डितकरा या श्वेतपद्मासना।'
      };
    }
    if (normalizedKey.includes('shyam') || normalizedKey.includes('khatu')) {
      return {
        name: 'शीश के दानी भगवान खाटू श्याम',
        tag: 'हारे का सहारा • लखदातारी • मोर्वी नन्दन',
        icon: '🌸',
        bgGradient: 'from-amber-600 via-rose-700 to-indigo-900',
        borderColor: 'border-amber-400',
        haloGlow: '#F59E0B',
        shlokaText: 'हारे के सहारे श्याम प्यारे की जय। तीन बाण धारी शीश के दानी नमोऽस्तु ते।'
      };
    }
    if (normalizedKey.includes('vishnu') || normalizedKey.includes('narayan')) {
      return {
        name: 'जगतपालक भगवान श्री हरि विष्णु',
        tag: 'शंख-चक्र-गदा-पद्मधारी • क्षीरसागरवासी',
        icon: '🐚',
        bgGradient: 'from-amber-600 via-yellow-600 to-cyan-800',
        borderColor: 'border-yellow-400',
        haloGlow: '#FBBF24',
        shlokaText: 'शान्ताकारं भुजगशयनं पद्मनाभं सुरेशं विश्वाधारं गगनसदृशं मेघवर्णं शुभाङ्गम्।'
      };
    }
    if (normalizedKey.includes('radha')) {
      return {
        name: 'श्री किशोरी जी राधा रानी',
        tag: 'वृन्दावन ईश्वरी • वृषभानु नन्दिनी • कृष्ण वल्लभा',
        icon: '🦚',
        bgGradient: 'from-rose-600 via-pink-600 to-amber-700',
        borderColor: 'border-pink-300',
        haloGlow: '#F472B6',
        shlokaText: 'तप्तकाञ्चनगौराङ्गी राधे वृन्दावनेश्वरी। वृषभानुसुते देवि प्रणमामि हरिप्रिये॥'
      };
    }
    if (normalizedKey.includes('ganga')) {
      return {
        name: 'पतित पावनी माँ गंगा',
        tag: 'मोक्षदायिनी • त्रिपथगा • विष्णुपदी',
        icon: '🌊',
        bgGradient: 'from-cyan-700 via-sky-600 to-blue-800',
        borderColor: 'border-cyan-300',
        haloGlow: '#38BDF8',
        shlokaText: 'गङ्गे च यमुने चैव गोदावरि सरस्वति। नर्मदे सिन्धु कावेरि जलेऽस्मिन् संनिधिं कुरु॥'
      };
    }
    if (normalizedKey.includes('kuber')) {
      return {
        name: 'धनपति यक्षराज भगवान कुबेर',
        tag: 'अधिपति उत्तर दिशा • नव निधि दाता',
        icon: '🪙',
        bgGradient: 'from-amber-600 via-yellow-500 to-emerald-800',
        borderColor: 'border-yellow-300',
        haloGlow: '#FDE047',
        shlokaText: 'ॐ यक्षाय कुबेराय वैश्रवणाय धनधान्याधिपतये धनधान्यसमृद्धिं मे देहि दापय स्वाहा।'
      };
    }
    if (normalizedKey.includes('navgraha')) {
      return {
        name: 'समस्त नवग्रह देवता मण्डल',
        tag: 'सूर्य-सोम-मङ्गल-बुध-गुरु-शुक्र-शनि-राहु-केतु',
        icon: '🪐',
        bgGradient: 'from-purple-800 via-indigo-800 to-amber-700',
        borderColor: 'border-amber-300',
        haloGlow: '#C084FC',
        shlokaText: 'ब्रह्मामुरारिस्त्रिपुरान्तकारी भानुः शशी भूमिसुतो बुधश्च गुरुश्च शुक्रः शनिराहुकेतवः कुर्वन्तु सर्वे मम सुप्रभातम्॥'
      };
    }
    if (normalizedKey.includes('baglamukhi')) {
      return {
        name: 'माँ पीताम्बरा बगलामुखी',
        tag: 'ब्रह्मास्त्र विद्या • शत्रु स्तम्भिनी • दशमहाविद्या',
        icon: '💛',
        bgGradient: 'from-yellow-600 via-amber-600 to-orange-700',
        borderColor: 'border-yellow-300',
        haloGlow: '#FACC15',
        shlokaText: 'ॐ ह्लीं बगलामुखि सर्वदुष्टानां वाचं मुखं पदं स्तम्भय जिह्वां कीलय बुद्धिं विनाशय ह्लीं ॐ स्वाहा।'
      };
    }
    if (normalizedKey.includes('santoshi')) {
      return {
        name: 'माँ संतोषी (सुख-संतोष दायिनी)',
        tag: 'गणेश सुता • रिद्धि-सिद्धि पोषिता • सुखदात्री',
        icon: '🌺',
        bgGradient: 'from-rose-600 via-amber-600 to-red-700',
        borderColor: 'border-rose-300',
        haloGlow: '#FB7185',
        shlokaText: 'जय सन्तोषी माँ नमो नमः। सुख-शान्ति की खानि कृपामयी वरदायिनी नमोऽस्तु ते॥'
      };
    }
    if (normalizedKey.includes('tulsi')) {
      return {
        name: 'माँ भगवती तुलसी (वृंदा)',
        tag: 'हरिप्रिया • वास्तु दोष नाशिनी • मोक्षदात्री',
        icon: '🌿',
        bgGradient: 'from-emerald-700 via-teal-700 to-amber-700',
        borderColor: 'border-emerald-300',
        haloGlow: '#34D399',
        shlokaText: 'वृन्दा वृन्दावनी विश्वपूजिता विश्वपावनी। पुष्पसारा नन्दिनी च तुलसी कृष्णजीवनी॥'
      };
    }
    if (normalizedKey.includes('sheetla')) {
      return {
        name: 'आरोग्यदायिनी माँ शीतला',
        tag: 'शीतलता प्रदायिनी • रोग-ताप नाशिनी',
        icon: '🪷',
        bgGradient: 'from-sky-700 via-teal-700 to-indigo-800',
        borderColor: 'border-teal-300',
        haloGlow: '#2DD4BF',
        shlokaText: 'वन्देऽहं शीतलां देवीं रासभस्थां दिगम्बराम्। मार्जनीकलशोपेतां शूर्पालङ्कृतमस्तकाम्॥'
      };
    }
    if (normalizedKey.includes('vishwakarma')) {
      return {
        name: 'देवशिल्पी भगवान विश्वकर्मा',
        tag: 'सृष्टि शिल्पी • वास्तु अधिपति • यंत्र विधाता',
        icon: '⚙️',
        bgGradient: 'from-amber-700 via-orange-700 to-blue-800',
        borderColor: 'border-amber-400',
        haloGlow: '#F59E0B',
        shlokaText: 'विश्वकर्मन् नमस्तुभ्यं विश्वात्मा विश्वसम्भवः। शिल्पकर्मप्रवर्तकाय देवाय नमो नमः॥'
      };
    }
    if (normalizedKey.includes('parashuram')) {
      return {
        name: 'चिरंजीवी भगवान परशुराम',
        tag: 'भृगुकुल भूषण • षष्ठावतार • परशुधर',
        icon: '🪓',
        bgGradient: 'from-red-800 via-amber-700 to-orange-800',
        borderColor: 'border-amber-400',
        haloGlow: '#F97316',
        shlokaText: 'अश्वत्थामा बलिर्व्यासो हनूमांश्च विभीषणः। कृपः परशुरामश्च सप्तैते चिरजीविनः॥'
      };
    }
    if (normalizedKey.includes('dattatreya')) {
      return {
        name: 'भगवान श्री दत्तात्रेय (अवधूत)',
        tag: 'ब्रह्मा-विष्णु-महेश त्रिदेवावतार • जगद्गुरु',
        icon: '🕉️',
        bgGradient: 'from-amber-600 via-orange-700 to-purple-800',
        borderColor: 'border-amber-300',
        haloGlow: '#F59E0B',
        shlokaText: 'गुरुर्ब्रह्मा गुरुर्विष्णुः गुरुर्देवो महेश्वरः। गुरुः साक्षात् परं ब्रह्म तस्मै श्रीगुरवे नमः॥'
      };
    }
    if (normalizedKey.includes('gorakhnath') || normalizedKey.includes('nath')) {
      return {
        name: 'महायोगी श्री गुरु गोरखनाथ',
        tag: 'हठयोग प्रवर्तक • नवनाथ शिरोमणि • शाबर प्रणेता',
        icon: '🧘‍♂️',
        bgGradient: 'from-orange-700 via-amber-800 to-stone-900',
        borderColor: 'border-amber-400',
        haloGlow: '#FB923C',
        shlokaText: 'ॐ गुरुजी सत नमो आदेश। अलख निरंजन जय गुरु गोरखनाथ॥'
      };
    }
    if (normalizedKey.includes('surya') || normalizedKey.includes('aditya')) {
      return {
        name: 'भगवान श्री भुवन भास्कर सूर्यदेव',
        tag: 'प्रत्यक्ष देवता • आरोग्य व तेज प्रदाता • जगच्चक्षु',
        icon: '☀️',
        bgGradient: 'from-amber-600 via-orange-600 to-red-700',
        borderColor: 'border-yellow-300',
        haloGlow: '#FDE047',
        shlokaText: 'आदित्यस्य नमस्कारं ये कुर्वन्ति दिने दिने। आयुः प्रज्ञा बलं वीर्यं तेजस्तेषां च जायते॥'
      };
    }
    if (normalizedKey.includes('shani')) {
      return {
        name: 'न्याय के देवता भगवान श्री शनिदेव',
        tag: 'कर्मफलदाता • सूर्यपुत्र • छायात्मज',
        icon: '⚖️',
        bgGradient: 'from-blue-900 via-indigo-950 to-slate-900',
        borderColor: 'border-blue-400',
        haloGlow: '#60A5FA',
        shlokaText: 'नीलांजनसमाभासं रविपुत्रं यमाग्रजम्। छायामार्तण्डसम्भूतं तं नमामि शनैश्चरम्॥'
      };
    }
    if (normalizedKey.includes('bhairav')) {
      return {
        name: 'भगवान श्री काल भैरव',
        tag: 'काशी के कोतवाल • अष्टभैरव • भयभंजन',
        icon: '⚔️',
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
        bgGradient: 'from-yellow-600 via-amber-600 to-orange-700',
        borderColor: 'border-yellow-300',
        haloGlow: '#FDE047',
        shlokaText: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्॥'
      };
    }
    if (normalizedKey.includes('ved')) {
      return {
        name: 'चतुर्मुख ब्रह्मा व वैदिक ज्ञान ज्योति',
        tag: 'अपौरुषेय श्रुति • सत्यमेव जयते',
        icon: '🔥',
        bgGradient: 'from-amber-700 via-orange-800 to-red-800',
        borderColor: 'border-amber-400',
        haloGlow: '#F59E0B',
        shlokaText: 'ऋचां त्वः पोषमास्ते पुपुष्वान् गायत्रं त्वो गायति शक्वरीषु।'
      };
    }

    // Default universal divine theme
    return {
      name: title || 'सच्चिदानंद परब्रह्म परमात्मा',
      tag: subtitle || 'सनातन सत्य • अखंड शांति',
      icon: '🕉️',
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
        <div className="w-10 h-10 rounded-xl bg-black/25 flex items-center justify-center text-xl shrink-0 border border-white/20">
          {theme.icon}
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
        {/* Deity Icon Avatar with Sacred Halo */}
        <div className="relative shrink-0">
          <div
            className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-black/35 backdrop-blur-xs border-2 border-amber-300/50 flex items-center justify-center text-3xl sm:text-4xl shadow-inner ring-4 ring-amber-400/20"
          >
            {theme.icon}
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
