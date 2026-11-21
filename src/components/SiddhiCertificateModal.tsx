import React from 'react';
import { UserProfile, MantraItem } from '../types';
import { DEITY_CONFIG, DEITY_CONFIG_EN } from '../data/mantraDatabase';
import { getTranslations } from '../utils/i18n';
import { Award, Share2, X, Sparkles, CheckCircle2 } from 'lucide-react';

interface SiddhiCertificateModalProps {
  userProfile: UserProfile;
  mantra: MantraItem;
  completedMalas: number;
  onClose: () => void;
}

export const SiddhiCertificateModal: React.FC<SiddhiCertificateModalProps> = ({
  userProfile,
  mantra,
  completedMalas,
  onClose
}) => {
  const lang = userProfile.language || 'hi';
  const t = getTranslations(lang);
  const deityConfig = lang === 'hi' ? DEITY_CONFIG : DEITY_CONFIG_EN;
  const deity = deityConfig[userProfile.ishtDevta] || deityConfig.shiva;
  const deityLabel = deity?.label ? deity.label.split('(')[0].trim() : (lang === 'hi' ? 'भगवान शिव' : 'Lord Shiva');

  const currentDate = new Date().toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const handleShare = () => {
    const text = lang === 'hi'
      ? `🚩 आस्था सिद्धि प्रमाण पत्र 🚩\nनाम: ${userProfile.name}\nगोत्र: ${userProfile.gotra}\nइष्टदेव: ${deityLabel}\nमंत्र: ${mantra.text}\nसंपन्न माला: ${completedMalas} (${completedMalas * 108} जाप)\nतिथि: ${currentDate}\n\nआस्था : पूजा जाप ऐप द्वारा प्रमाणित 🔱`
      : `🚩 Aastha Siddhi Certificate 🚩\nName: ${userProfile.name}\nGotra: ${userProfile.gotra}\nDeity: ${deityLabel}\nMantra: ${mantra.text}\nCompleted Malas: ${completedMalas} (${completedMalas * 108} chants)\nDate: ${currentDate}\n\nCertified by Aastha : Puja Jaap App 🔱`;

    if (navigator.share) {
      navigator.share({
        title: t.certTitle,
        text: text
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(text);
      alert(lang === 'hi' ? 'प्रमाण पत्र विवरण कॉपी हो गया है! अब आप व्हाट्सएप पर शेयर कर सकते हैं।' : 'Certificate details copied! You can now paste and share on WhatsApp.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 select-none animate-fadeIn">
      <div className="bg-[#FFFDF9] w-full max-w-lg rounded-3xl border-4 border-amber-500/80 shadow-2xl p-5 sm:p-7 relative overflow-hidden flex flex-col text-center">
        {/* Background Auspicious Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none text-9xl">
          🕉️
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-orange-100 hover:bg-orange-200 text-orange-900 flex items-center justify-center transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Certificate Outer Border Frame */}
        <div className="border-2 border-dashed border-amber-600/50 p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-amber-50/60 via-orange-50/30 to-amber-50/60">
          {/* Header */}
          <div className="text-center mb-3">
            <span className="text-3xl">🔱</span>
            <h2 className="text-xl sm:text-2xl font-bold font-sanskrit text-orange-950 mt-1">
              {t.certTitle}
            </h2>
            <p className="text-[11px] text-orange-800 font-semibold tracking-wider">
              {t.certSub}
            </p>
          </div>

          <div className="w-16 h-0.5 bg-amber-500 mx-auto mb-3" />

          {/* Attestation Text */}
          <p className="text-xs text-gray-700 mb-2">
            {t.certRecipient}
          </p>

          <h3 className="text-2xl font-black text-orange-900 tracking-wide mb-1">
            {userProfile.name}
          </h3>

          <p className="text-xs text-amber-900 font-bold mb-3">
            {t.certGotra}: <span className="text-orange-950">{userProfile.gotra}</span> • {t.certKuldevta}: <span className="text-orange-950">{userProfile.kulDevta}</span>
          </p>

          {/* Mantra Box */}
          <div className="bg-white/90 border border-orange-200 rounded-xl p-3 mb-3 shadow-inner">
            <span className="text-[10px] text-gray-500 block mb-1">
              {t.certMantraChanted}
            </span>
            <p className="text-sm font-bold font-sanskrit text-amber-950">
              {mantra.text}
            </p>
          </div>

          {/* Stats Badges */}
          <div className="grid grid-cols-2 gap-2 text-left mb-3">
            <div className="bg-orange-100/70 p-2.5 rounded-xl border border-orange-200">
              <span className="text-[10px] text-orange-800 block">
                {t.certTotalChants}
              </span>
              <strong className="text-base text-orange-950 font-bold">
                {completedMalas} {t.malaLabel} ({completedMalas * 108} {t.beadOutOf.split('/')[0].trim()})
              </strong>
            </div>

            <div className="bg-amber-100/70 p-2.5 rounded-xl border border-amber-200">
              <span className="text-[10px] text-amber-800 block">
                {t.certIshtdev}:
              </span>
              <strong className="text-sm text-amber-950 font-bold flex items-center gap-1">
                <span>{deity.icon}</span>
                <span>{deity.label.split('(')[0]}</span>
              </strong>
            </div>
          </div>

          {/* Completion Date */}
          <p className="text-[11px] text-gray-600 mb-2">
            {t.certCompletedOn} <strong>{currentDate}</strong>
          </p>

          {/* Golden Seal */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500 text-amber-950 font-black text-xs shadow-md">
            <Award className="w-4 h-4 fill-amber-950" />
            <span>{t.certAuspiciousSeal}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 mt-4">
          <button
            onClick={handleShare}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold text-xs sm:text-sm shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>{t.certShareWhatsapp}</span>
          </button>

          <button
            onClick={onClose}
            className="py-3 px-4 rounded-xl border border-gray-300 text-gray-700 font-bold text-xs hover:bg-gray-100 active:scale-95 transition-all"
          >
            {t.certClose}
          </button>
        </div>
      </div>
    </div>
  );
};
