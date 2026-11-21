import React, { useState } from 'react';
import { X, Sparkles, User, Play, Clock, ShieldCheck, Heart } from 'lucide-react';
import { UserProfile, MantraItem } from '../types';
import { NAAM_SAMPUTIT_TEMPLATES, NaamSamputitTemplate } from '../data/naamSamputitMantraData';

interface NaamSamputitMantraModalProps {
  userProfile: UserProfile;
  onClose: () => void;
  onStartJaapWithMantra: (mantra: MantraItem) => void;
  isHi?: boolean;
}

export const NaamSamputitMantraModal: React.FC<NaamSamputitMantraModalProps> = ({
  userProfile,
  onClose,
  onStartJaapWithMantra,
  isHi = true
}) => {
  const [userName, setUserName] = useState<string>(
    userProfile?.name && userProfile.name.trim() && userProfile.name !== 'साधक'
      ? userProfile.name.trim()
      : 'साधक'
  );

  const [selectedTemplate, setSelectedTemplate] = useState<NaamSamputitTemplate>(
    NAAM_SAMPUTIT_TEMPLATES[0]
  );

  // Render dynamic mantra with current name
  const renderedMantra = selectedTemplate.templateMantra.replace(
    /\{NAME\}/g,
    userName.trim() || (isHi ? 'साधक' : 'Devotee')
  );

  const renderedMeaning = selectedTemplate.meaningHi.replace(
    /\{NAME\}/g,
    userName.trim() || (isHi ? 'साधक' : 'Devotee')
  );

  const handleLaunchJaap = () => {
    const customMantraItem: MantraItem = {
      id: `naam-samputit-${selectedTemplate.id}-${Date.now()}`,
      name: `${userName.trim() || 'साधक'} - ${selectedTemplate.titleHi}`,
      text: renderedMantra,
      deity: selectedTemplate.deityId as any,
      deityLabel: selectedTemplate.deityNameHi,
      category: 'naam_jaap',
      categoryLabel: isHi ? 'नाम संपुटित महामंत्र' : 'Name-Embedded Chanting',
      meaning: renderedMeaning,
      benefits: selectedTemplate.benefitsHi,
      bestTiming: selectedTemplate.timingHi,
      pujaSamagri: selectedTemplate.malaTypeHi,
      isCustom: true
    };

    onStartJaapWithMantra(customMantraItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 select-none animate-fadeIn">
      <div className="bg-[#FFFDF9] w-full max-w-lg rounded-3xl shadow-2xl border-2 border-amber-400 overflow-hidden flex flex-col max-h-[92vh]">
        {/* HEADER */}
        <div className="p-4 bg-gradient-to-r from-[#7C1D13] via-[#9A3412] to-[#7C1D13] text-white flex items-center justify-between shadow-md shrink-0 border-b border-amber-400/50">
          <div className="flex items-center gap-2.5">
            <span className="w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-300/40 text-2xl flex items-center justify-center shadow-xs">
              ✨
            </span>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-400 text-stone-950">
                  {isHi ? 'शास्त्र सम्मत संपुट' : 'Personalized'}
                </span>
                <span className="text-[10px] text-amber-200 font-bold">
                  {isHi ? 'शीघ्र फलदायी' : 'Fast Manifestation'}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-amber-100 tracking-wide mt-0.5">
                {isHi ? 'नाम-सहित संपुटित सिद्ध जप महामंत्र' : 'Name-Embedded Sacred Mantras'}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all active:scale-90 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-3.5 sm:p-4 overflow-y-auto space-y-3.5 flex-1">
          {/* EXPLANATORY SECRET BOX */}
          <div className="p-3 bg-gradient-to-r from-amber-100/90 via-orange-100/80 to-amber-100/90 border border-amber-400/80 rounded-2xl text-[11px] text-amber-950 leading-relaxed shadow-2xs">
            <strong className="block font-black text-amber-900 mb-0.5 text-xs">
              ⚡ नाम संपुटित जप का शास्त्रीय रहस्य:
            </strong>
            सनातन ऋषि परम्परा के अनुसार, जब साधक किसी बीज अथवा महामंत्र में अपना नाम संपुटित करके १०८ बार जप करता है, तो मंत्र का कंपन सीधे उसके सूक्ष्म शरीर और आभा मंडल से जुड़ जाता है। इससे प्रारब्ध दोष शीघ्र कटते हैं और संकल्प का फल अति शीघ्र प्राप्त होता है।
          </div>

          {/* NAME INPUT BOX */}
          <div className="p-3 rounded-2xl bg-white border-2 border-amber-300 shadow-xs">
            <label className="text-xs font-black text-orange-950 flex items-center justify-between mb-1.5">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-orange-600" />
                <span>{isHi ? 'मंत्र में संपुटित होने वाला आपका नाम:' : 'Your Name for Mantra:'}</span>
              </span>
              <span className="text-[10px] text-orange-700 font-semibold">
                (बदलने हेतु टैप करें)
              </span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder={isHi ? 'अपना नाम दर्ज करें' : 'Enter name'}
                className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-amber-300 bg-amber-50/50 text-sm font-black text-stone-900 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
              <span className="absolute right-3 top-2.5 text-base">✏️</span>
            </div>
          </div>

          {/* DEITY TEMPLATE SELECTOR CHIPS */}
          <div>
            <span className="text-xs font-black text-orange-950 block mb-1.5">
              {isHi ? 'अपने अभीष्ट देवी / देवता चुनें:' : 'Select Deity Template:'}
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {NAAM_SAMPUTIT_TEMPLATES.map((tmpl) => {
                const isSelected = selectedTemplate.id === tmpl.id;
                return (
                  <button
                    key={tmpl.id}
                    type="button"
                    onClick={() => setSelectedTemplate(tmpl)}
                    className={`p-2 rounded-xl text-left border transition-all flex items-center gap-2 cursor-pointer active:scale-95 ${
                      isSelected
                        ? 'border-orange-600 bg-orange-100/90 shadow-xs ring-1 ring-orange-500'
                        : 'border-amber-200 bg-white hover:bg-amber-50'
                    }`}
                  >
                    <span className="text-lg shrink-0">{tmpl.deityIcon}</span>
                    <span className="text-[11px] font-black text-stone-900 truncate">
                      {tmpl.deityNameHi}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ENERGIZED GOLDEN MANTRA DISPLAY CARD */}
          <div className="bg-gradient-to-br from-[#2D0905] via-[#4A0E08] to-[#2D0905] border-2 border-yellow-400 rounded-3xl p-4 sm:p-5 text-center text-white shadow-xl relative overflow-hidden">
            <div className="text-[10px] font-black uppercase tracking-widest text-yellow-300 mb-1">
              ॥ सिद्ध नाम-संपुटित महामंत्र ॥
            </div>

            <h3 className="text-sm font-black text-amber-200 mb-3">
              {selectedTemplate.titleHi}
            </h3>

            {/* THE MANTRA WITH NAME HIGHLIGHTED */}
            <div className="p-3.5 bg-black/40 rounded-2xl border border-yellow-400/40 text-amber-100 font-serif text-base sm:text-lg font-black leading-relaxed shadow-inner">
              {renderedMantra}
            </div>

            {/* MEANING */}
            <p className="text-[11px] text-amber-200/90 mt-3 italic leading-relaxed">
              <strong>भावार्थ:</strong> {renderedMeaning}
            </p>
          </div>

          {/* BENEFIT & TIMING */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950">
              <div className="flex items-center gap-1 font-black mb-0.5 text-emerald-900">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>शीघ्र फलश्रुति:</span>
              </div>
              <p className="leading-snug font-medium text-[11px]">{selectedTemplate.benefitsHi}</p>
            </div>

            <div className="p-3 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950">
              <div className="flex items-center gap-1 font-black mb-0.5 text-amber-900">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>श्रेष्ठ समय व माला:</span>
              </div>
              <p className="leading-snug font-medium text-[11px]">
                {selectedTemplate.timingHi} • {selectedTemplate.malaTypeHi}
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM ACTION */}
        <div className="p-3.5 bg-white border-t border-orange-200 flex flex-col sm:flex-row gap-2 shrink-0">
          <button
            type="button"
            onClick={handleLaunchJaap}
            className="flex-1 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-green-600 to-teal-700 text-white font-black text-sm shadow-xl hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 ring-2 ring-emerald-300 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>📿 इस नाम मन्त्र को १०८ माला काउंटर पर जपें</span>
          </button>
        </div>
      </div>
    </div>
  );
};
