import React from 'react';
import { UserProfile, LanguageCode } from '../types';
import { getTranslations } from '../utils/i18n';
import { Bell, User } from 'lucide-react';

interface HeaderProps {
  userProfile: UserProfile;
  onOpenProfile: () => void;
  onOpenSeva?: () => void;
  onOpenMantraLibrary?: () => void;
  onToggleLanguage?: () => void;
  onOpenNotifications?: () => void;
  unreadNotificationsCount?: number;
  onOpenKundali?: () => void;
  onOpenHastRekha?: () => void;
  onOpenAnkaJyotish?: () => void;
  onOpenSamadhan?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  userProfile,
  onOpenProfile,
  onOpenSeva,
  onOpenNotifications,
  unreadNotificationsCount = 0
}) => {
  const lang: LanguageCode = userProfile.language || 'hi';
  const t = getTranslations(lang);

  return (
    <header className="w-full bg-gradient-to-r from-[#5C0F08] via-[#85180C] to-[#5C0F08] border-b-2 border-amber-400/90 shadow-[0_4px_20px_rgba(0,0,0,0.3)] text-white sticky top-0 z-40 select-none">
      <div className="max-w-xl mx-auto px-3.5 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between">
        {/* High Contrast Ultra-Recognizable Sanatan Logo & Branding */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Logo with Radiant 24K Gold Aura Frame */}
          <div className="p-0.5 rounded-2xl bg-gradient-to-br from-yellow-300 via-amber-400 to-yellow-500 shadow-[0_0_14px_rgba(245,158,11,0.6)] ring-2 ring-yellow-200/90 shrink-0 transition-transform active:scale-95">
            <img
              src="/logo.svg"
              alt="Aastha : Puja Jaap"
              className="w-11 h-11 sm:w-12 sm:h-12 object-contain rounded-[14px] bg-[#140202]"
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-1.5 leading-none">
              <h1 className="text-xl sm:text-2xl font-black tracking-wide text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                {lang === 'hi' ? 'आस्था' : 'Aastha'}
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-yellow-300 via-amber-400 to-amber-500 text-stone-950 font-black text-[10px] tracking-wider shadow-sm border border-yellow-200 uppercase">
                {lang === 'hi' ? 'पूजा जाप' : 'Puja Jaap'}
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] font-bold text-amber-200/90 tracking-widest mt-1">
              {lang === 'hi' ? 'सनातन नित्य साधना व अंक ज्ञान' : 'Sanatan Sadhana & Vedic Samhita'}
            </p>
          </div>
        </div>

        {/* High Contrast Notification, Seva & Profile Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Seva / Donation / Rating Button */}
          {onOpenSeva && (
            <button
              type="button"
              onClick={onOpenSeva}
              className="p-2 sm:p-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-stone-950 font-black text-xs transition-all active:scale-95 shadow-md border border-yellow-200 flex items-center gap-1"
              title={lang === 'hi' ? 'धर्म सेवा, दान व सहयोग' : 'Seva & Support'}
              aria-label="Seva"
            >
              <span className="text-sm">🪔</span>
              <span className="hidden sm:inline text-[11px] font-black">सेवा</span>
            </button>
          )}

          {/* Notification Button */}
          {onOpenNotifications && (
            <button
              type="button"
              onClick={onOpenNotifications}
              className="relative p-2.5 rounded-2xl bg-black/25 hover:bg-black/40 border-1.5 border-amber-300/60 text-amber-100 transition-all active:scale-95 shadow-sm hover:border-amber-300"
              title={lang === 'hi' ? 'सूचनाएं' : 'Notifications'}
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-amber-300 stroke-[2.4]" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red-600 text-white text-[10px] font-black flex items-center justify-center shadow-md ring-2 ring-white">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>
          )}

          {/* Profile Button */}
          <button
            type="button"
            onClick={onOpenProfile}
            className="p-2.5 rounded-2xl bg-black/25 hover:bg-black/40 border-1.5 border-amber-300/60 text-amber-100 transition-all active:scale-95 shadow-sm hover:border-amber-300 flex items-center justify-center"
            title={t.profileBtn}
            aria-label="Profile"
          >
            <User className="w-5 h-5 text-amber-300 stroke-[2.4]" />
          </button>
        </div>
      </div>
    </header>
  );
};
