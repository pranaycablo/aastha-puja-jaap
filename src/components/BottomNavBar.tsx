import React from 'react';
import { LanguageCode } from '../types';
import {
  Home,
  BookOpen,
  Award,
  Settings,
  Sparkles
} from 'lucide-react';

export type BottomNavTab = 'home' | 'jaap' | 'mantra' | 'guide' | 'setup' | 'siddhi' | 'alerts';

interface NavItem {
  id: BottomNavTab;
  label: string;
  sublabel: string;
  badge?: number;
}

interface BottomNavBarProps {
  activeTab: BottomNavTab;
  onTabChange: (tab: BottomNavTab) => void;
  language?: LanguageCode;
  unreadAlertsCount?: number;
}

// Crisp Vector Icon for Mala Jaap (Sacred 108 Rosary)
const MalaIcon: React.FC<{ active: boolean }> = ({ active }) => (
  <svg
    viewBox="0 0 24 24"
    width="22"
    height="22"
    fill="none"
    className={`transition-all duration-200 ${active ? 'scale-110 drop-shadow-[0_0_10px_rgba(253,224,71,0.85)]' : 'opacity-90'}`}
  >
    <circle cx="12" cy="11" r="7.5" stroke="currentColor" strokeWidth="1.8" strokeDasharray="2 1.5" />
    <circle cx="12" cy="3.5" r="1.6" fill="currentColor" />
    <circle cx="16.5" cy="5" r="1.3" fill="currentColor" />
    <circle cx="19.2" cy="8.5" r="1.3" fill="currentColor" />
    <circle cx="19.5" cy="13" r="1.3" fill="currentColor" />
    <circle cx="17" cy="16.8" r="1.3" fill="currentColor" />
    <circle cx="12" cy="18.5" r="1.3" fill="currentColor" />
    <circle cx="7" cy="16.8" r="1.3" fill="currentColor" />
    <circle cx="4.5" cy="13" r="1.3" fill="currentColor" />
    <circle cx="4.8" cy="8.5" r="1.3" fill="currentColor" />
    <circle cx="7.5" cy="5" r="1.3" fill="currentColor" />
    {/* Meru Bead & Sacred Tassel */}
    <path d="M11 18.5L13 18.5L12.5 20.5L11.5 20.5Z" fill="currentColor" />
    <path d="M12 20.5L10 23.5M12 20.5L12 23.8M12 20.5L14 23.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onTabChange,
  language = 'hi'
}) => {
  const isHindi = language === 'hi';

  const navItems: NavItem[] = [
    {
      id: 'home',
      label: isHindi ? 'होम' : 'Home',
      sublabel: isHindi ? 'मुख्य द्वार' : 'Sanctum'
    },
    {
      id: 'jaap',
      label: isHindi ? 'जाप' : 'Jaap',
      sublabel: isHindi ? 'साधना माला' : 'Mala Jaap'
    },
    {
      id: 'mantra',
      label: isHindi ? 'मंत्र' : 'Mantras',
      sublabel: isHindi ? 'सर्व श्रेणियां' : 'Chants'
    },
    {
      id: 'siddhi',
      label: isHindi ? 'प्रगति' : 'Records',
      sublabel: isHindi ? 'सिद्धि व रिकॉर्ड' : 'Siddhi'
    },
    {
      id: 'setup',
      label: isHindi ? 'सेटिंग्स' : 'Settings',
      sublabel: isHindi ? 'प्रोफ़ाइल व दान' : 'Profile'
    }
  ];

  const renderIcon = (tabId: BottomNavTab, isActive: boolean) => {
    const iconClass = `w-5 h-5 transition-transform duration-200 ${
      isActive
        ? 'text-yellow-300 scale-110 drop-shadow-[0_0_10px_rgba(253,224,71,0.85)]'
        : 'text-amber-200/80 group-hover:text-amber-100 group-hover:scale-105'
    }`;

    switch (tabId) {
      case 'home':
        return <Home className={iconClass} strokeWidth={isActive ? 2.6 : 2} />;
      case 'jaap':
        return (
          <div className={isActive ? 'text-yellow-300' : 'text-amber-200/80 group-hover:text-amber-100'}>
            <MalaIcon active={isActive} />
          </div>
        );
      case 'mantra':
        return <Sparkles className={iconClass} strokeWidth={isActive ? 2.6 : 2} />;
      case 'siddhi':
        return <Award className={iconClass} strokeWidth={isActive ? 2.6 : 2} />;
      case 'setup':
        return <Settings className={iconClass} strokeWidth={isActive ? 2.6 : 2} />;
      default:
        return <BookOpen className={iconClass} strokeWidth={2} />;
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-r from-[#5C0F08] via-[#85180C] to-[#5C0F08] border-t-2 border-amber-400/90 shadow-[0_-6px_25px_rgba(92,15,8,0.6)] backdrop-blur-xl select-none safe-bottom">
      <div className="max-w-lg mx-auto flex items-center justify-around px-2 py-1.5 sm:py-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onTabChange(item.id)}
              className="flex-1 flex flex-col items-center justify-center py-1 px-1 rounded-2xl transition-all duration-200 relative group active:scale-95"
            >
              {/* Pro-Level Active 3D Temple Shrine Dock & Beacon */}
              {isActive && (
                <>
                  {/* Top 24K Radiant Gold Beacon Bar */}
                  <div className="absolute -top-1.5 w-8 h-1 rounded-full bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-400 shadow-[0_0_10px_#FDE047]" />
                  {/* Glowing Shrine Capsule */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/40 to-black/50 rounded-2xl border-1.5 border-amber-400/90 shadow-[0_0_16px_rgba(245,158,11,0.4)] -z-10" />
                </>
              )}

              {/* Inactive Subtle Hover Capsule */}
              {!isActive && (
                <div className="absolute inset-0 rounded-2xl hover:bg-black/20 transition-all -z-10" />
              )}

              {/* Icon */}
              <div className="relative leading-none mb-1 flex items-center justify-center">
                {renderIcon(item.id, isActive)}
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 min-w-[16px] h-4 px-1 rounded-full bg-red-600 text-white text-[9px] font-black flex items-center justify-center shadow-md ring-1 ring-white">
                    {item.badge}
                  </span>
                )}
              </div>

              {/* Tab Title: Radiant 24K High Gradient Gold Text */}
              <span
                className={`tracking-wide text-center leading-tight transition-all duration-150 ${
                  isActive
                    ? 'text-xs sm:text-[13px] font-black bg-gradient-to-r from-[#FFFEEA] via-[#FDE047] to-[#F59E0B] bg-clip-text text-transparent drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]'
                    : 'text-[11px] sm:text-xs font-bold text-amber-200/90 group-hover:text-amber-100'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
