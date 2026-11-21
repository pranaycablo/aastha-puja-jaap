import React, { useState } from 'react';
import { AppVersionManifest } from '../config/updateConfig';
import { updateEngine } from '../utils/updateEngine';
import { LanguageCode } from '../types';
import {
  Sparkles,
  DownloadCloud,
  CheckCircle2,
  X,
  ExternalLink,
  ShieldCheck,
  Zap,
  ArrowRight
} from 'lucide-react';

interface AutoUpdateModalProps {
  manifest: AppVersionManifest;
  isMandatory?: boolean;
  language?: LanguageCode;
  onClose: () => void;
}

export const AutoUpdateModal: React.FC<AutoUpdateModalProps> = ({
  manifest,
  isMandatory = false,
  language = 'hi',
  onClose
}) => {
  const isHindi = language === 'hi';
  const [isUpdating, setIsUpdating] = useState(false);

  const notes = isHindi ? manifest.releaseNotesHi : manifest.releaseNotesEn;

  const handleUpdateNow = async () => {
    setIsUpdating(true);
    await updateEngine.startUpdate(manifest);
    setTimeout(() => {
      setIsUpdating(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 select-none animate-fadeIn">
      <div className="bg-[#FFFDF9] w-full max-w-md rounded-3xl shadow-2xl border-2 border-amber-400 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-700 via-amber-600 to-orange-800 text-white p-5 relative">
          {!isMandatory && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/20 active:scale-95 transition-all text-amber-200"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/30 border border-amber-300/50 flex items-center justify-center text-2xl shadow-inner">
              ✨
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest bg-amber-400 text-orange-950 px-2 py-0.5 rounded">
                {isHindi ? 'नया संस्करण उपलब्ध' : 'NEW VERSION AVAILABLE'}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-amber-100 mt-0.5">
                {manifest.title}
              </h3>
              <p className="text-xs text-orange-200">
                {isHindi
                  ? `संस्करण ${manifest.latestVersion} • ${manifest.releaseDate}`
                  : `Version ${manifest.latestVersion} • ${manifest.releaseDate}`}
              </p>
            </div>
          </div>
        </div>

        {/* Update Highlights */}
        <div className="p-5 flex-1 overflow-y-auto">
          <div className="bg-orange-50/80 rounded-2xl p-4 border border-orange-200/80 mb-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-orange-950 mb-2.5 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-orange-600" />
              <span>{isHindi ? 'इस नए अपडेट में क्या नया है:' : "What's New in This Update:"}</span>
            </h4>
            <ul className="space-y-2">
              {notes.map((note, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-gray-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950 text-xs">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              {isHindi
                ? 'सुरक्षित व आधिकारिक अपडेट। आपका पिछला जाप डाटा व आंकड़े सुरक्षित रहेंगे।'
                : '100% Secure & official update. Your existing chanting stats are safely preserved.'}
            </span>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 bg-orange-50/90 border-t border-orange-200 flex flex-col gap-2">
          <button
            onClick={handleUpdateNow}
            disabled={isUpdating}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 text-white font-black text-sm sm:text-base shadow-xl hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 ring-2 ring-orange-400"
          >
            <DownloadCloud className="w-5 h-5 text-amber-200" />
            <span>
              {isUpdating
                ? (isHindi ? 'अपडेट आरंभ हो रहा है...' : 'Launching Update...')
                : (isHindi ? 'अभी स्वतः अपडेट करें ❯' : 'Update Automatically Now ❯')}
            </span>
          </button>

          {!isMandatory && (
            <button
              onClick={onClose}
              className="w-full py-2 text-xs font-bold text-orange-800 hover:text-orange-950 text-center transition-all"
            >
              {isHindi ? 'बाद में याद दिलाएं' : 'Remind Me Later'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
