import React, { useState, useEffect } from 'react';
import { UserProfile, LanguageCode, MantraItem } from '../types';
import { notificationEngine, DivineNotification, NotificationCategory } from '../utils/notificationEngine';
import { AdMobNativeCard } from './AdMobNativeCard';
import {
  Bell,
  X,
  CheckCheck,
  Sparkles,
  Flame,
  ArrowRight,
  ShieldCheck,
  Clock,
  Trash2,
  CheckCircle2
} from 'lucide-react';

interface NotificationCenterModalProps {
  userProfile: UserProfile;
  language?: LanguageCode;
  onClose: () => void;
  onStartJaapFromNotification: (suggestedMantra?: MantraItem) => void;
  onOpenAajKaDin?: () => void;
  onOpenChalisa?: () => void;
}

export const NotificationCenterModal: React.FC<NotificationCenterModalProps> = ({
  userProfile,
  language = 'hi',
  onClose,
  onStartJaapFromNotification,
  onOpenAajKaDin,
  onOpenChalisa
}) => {
  const isHindi = language === 'hi';
  const [notifications, setNotifications] = useState<DivineNotification[]>([]);
  const [activeCategory, setActiveCategory] = useState<NotificationCategory>('all');
  const [permissionGranted, setPermissionGranted] = useState<boolean>(true);
  const [isRequesting, setIsRequesting] = useState<boolean>(false);

  useEffect(() => {
    // Load notification history
    const list = notificationEngine.populateNotificationHistory(userProfile);
    setNotifications(list);

    // Check system permission
    notificationEngine.checkPermissionStatus().then((has) => {
      setPermissionGranted(has);
    });
  }, [userProfile]);

  const handleRequestPermission = async () => {
    setIsRequesting(true);
    const granted = await notificationEngine.requestPermission();
    setPermissionGranted(granted);
    if (granted) {
      await notificationEngine.scheduleDailyDivineReminders(userProfile);
      alert(
        isHindi
          ? 'शुभ सूचनाएं सक्रिय हो गई हैं! आपको ब्रह्म मुहूर्त, सांध्य काल व नित्य साधना की पावन सूचनाएं प्राप्त होंगी।'
          : 'Divine notifications enabled! You will receive reminders for Brahma Muhurta, twilight sadhana, and daily streak.'
      );
    }
    setIsRequesting(false);
  };

  const handleMarkAllRead = () => {
    notificationEngine.markAllAsRead();
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleNotificationClick = (item: DivineNotification) => {
    notificationEngine.markAsRead(item.id);
    setNotifications((prev) => prev.map((n) => (n.id === item.id ? { ...n, read: true } : n)));
    onClose();
    if (item.actionType === 'aaj_ka_din' && onOpenAajKaDin) {
      onOpenAajKaDin();
    } else if (item.actionType === 'chalisa' && onOpenChalisa) {
      onOpenChalisa();
    } else {
      onStartJaapFromNotification(item.suggestedMantra);
    }
  };

  const handleClearHistory = () => {
    if (window.confirm(isHindi ? 'क्या आप सभी सूचनाएं हटाना चाहते हैं?' : 'Clear all notification history?')) {
      notificationEngine.clearHistory();
      setNotifications([]);
    }
  };

  // Filtered notifications
  const filteredNotifications = notifications.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-2.5 sm:p-4 select-none animate-fadeIn">
      <div className="bg-[#FFFDF9] w-full max-w-lg rounded-3xl shadow-2xl border-2 border-amber-400/90 flex flex-col max-h-[92vh] overflow-hidden">
        {/* Pro Header */}
        <div className="bg-gradient-to-r from-[#5C0F08] via-[#85180C] to-[#5C0F08] text-white p-4 flex items-center justify-between border-b-2 border-amber-400/80 shadow-md">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-yellow-300 via-amber-400 to-yellow-500 text-stone-950 flex items-center justify-center text-xl shadow-[0_0_12px_rgba(245,158,11,0.5)] ring-1.5 ring-yellow-200 shrink-0">
              🔔
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <span>{isHindi ? 'आस्था दैनिक सूचनाएं' : 'Aastha Daily Notifications'}</span>
                {unreadCount > 0 && (
                  <span className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded-full font-black shadow-xs ring-1 ring-white">
                    {unreadCount} {isHindi ? 'नया' : 'new'}
                  </span>
                )}
              </h2>
              <p className="text-[11px] text-amber-200/90 font-bold">
                {isHindi ? 'इष्टदेव स्मरण, मुहूर्त व नित्य साधना अलर्ट' : 'Personalized Muhurta & Sadhana Alerts'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/20 active:scale-95 transition-all text-amber-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pro Category Filter Bar */}
        <div className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 border-b border-amber-200 overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 rounded-xl font-black text-xs shrink-0 transition-all ${
              activeCategory === 'all'
                ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-xs'
                : 'bg-white/80 text-orange-950 border border-amber-200 hover:bg-orange-100/50'
            }`}
          >
            🌟 {isHindi ? `सभी (${notifications.length})` : `All (${notifications.length})`}
          </button>

          <button
            type="button"
            onClick={() => setActiveCategory('muhurta')}
            className={`px-3 py-1.5 rounded-xl font-black text-xs shrink-0 transition-all ${
              activeCategory === 'muhurta'
                ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-xs'
                : 'bg-white/80 text-orange-950 border border-amber-200 hover:bg-orange-100/50'
            }`}
          >
            ⏰ {isHindi ? 'पावन मुहूर्त' : 'Muhurta'}
          </button>

          <button
            type="button"
            onClick={() => setActiveCategory('sadhana')}
            className={`px-3 py-1.5 rounded-xl font-black text-xs shrink-0 transition-all ${
              activeCategory === 'sadhana'
                ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-xs'
                : 'bg-white/80 text-orange-950 border border-amber-200 hover:bg-orange-100/50'
            }`}
          >
            📿 {isHindi ? 'साधना व जप' : 'Sadhana'}
          </button>

          <button
            type="button"
            onClick={() => setActiveCategory('astrology')}
            className={`px-3 py-1.5 rounded-xl font-black text-xs shrink-0 transition-all ${
              activeCategory === 'astrology'
                ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-xs'
                : 'bg-white/80 text-orange-950 border border-amber-200 hover:bg-orange-100/50'
            }`}
          >
            🪐 {isHindi ? 'पंचांग व ग्रह' : 'Astrology'}
          </button>
        </div>

        {/* Permission Banner if not enabled */}
        {!permissionGranted ? (
          <div className="bg-amber-100/90 border-b border-amber-300 p-3 flex items-center justify-between gap-2 shadow-2xs">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-xl shrink-0">⏰</span>
              <p className="text-xs text-amber-950 font-medium">
                {isHindi
                  ? 'ब्रह्म मुहूर्त, गोधूलि व सांध्य जाप पर समयबद्ध सूचना पाने हेतु अनुमति दें।'
                  : 'Enable notifications to receive Brahma Muhurta & twilight sadhana alerts.'}
              </p>
            </div>
            <button
              onClick={handleRequestPermission}
              disabled={isRequesting}
              className="px-3.5 py-1.5 bg-gradient-to-r from-orange-600 to-amber-600 text-white text-xs font-black rounded-xl shadow-xs hover:brightness-105 active:scale-95 whitespace-nowrap shrink-0"
            >
              {isHindi ? 'चालू करें' : 'Enable'}
            </button>
          </div>
        ) : (
          <div className="bg-emerald-50 border-b border-emerald-200 px-3.5 py-1.5 flex items-center justify-between text-[11px] text-emerald-900 font-bold">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{isHindi ? 'दैनिक पावन मुहूर्त सूचनाएं सक्रिय हैं' : 'Daily divine reminders active'}</span>
            </span>
            <span className="text-[10px] text-emerald-700 font-mono">100% Shastra Timed</span>
          </div>
        )}

        {/* Actions Bar */}
        <div className="px-4 py-2 bg-[#FFFDF9] border-b border-orange-100 flex items-center justify-between text-xs">
          <span className="text-orange-950 font-black flex items-center gap-1 truncate max-w-[220px]">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>{userProfile.name ? `श्री ${userProfile.name} जी की सूचनाएं` : (isHindi ? 'दैनिक पावन सूचनाएं' : 'Divine Notifications')}</span>
          </span>
          <div className="flex items-center gap-3">
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="text-orange-700 hover:text-orange-900 font-black flex items-center gap-1 active:scale-95 transition-transform"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>{isHindi ? 'सभी पढ़ा गया' : 'Mark read'}</span>
              </button>
            )}
            <button
              onClick={handleClearHistory}
              className="text-gray-400 hover:text-rose-600 p-1 rounded-lg transition-colors"
              title={isHindi ? 'इतिहास साफ़ करें' : 'Clear history'}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Notifications Scroll List */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 scrollbar-thin">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12 space-y-2">
              <span className="text-4xl block">🪔</span>
              <p className="text-xs font-bold text-gray-500">
                {isHindi ? 'इस श्रेणी में कोई नई सूचना नहीं है।' : 'No notifications in this category.'}
              </p>
            </div>
          ) : (
            filteredNotifications.map((item, index) => (
              <React.Fragment key={item.id}>
                {/* Pro Notification Card */}
                <div
                  className={`p-3.5 rounded-3xl border-2 transition-all ${
                    item.read
                      ? 'bg-white border-amber-200/80 shadow-2xs'
                      : 'bg-gradient-to-r from-amber-50/90 via-orange-50/70 to-amber-50/90 border-amber-400 shadow-sm ring-1 ring-amber-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2.5">
                      <span className="w-10 h-10 rounded-2xl bg-amber-100/90 border border-amber-300 flex items-center justify-center text-xl shrink-0 shadow-2xs">
                        {item.deityIcon}
                      </span>
                      <div>
                        <h4 className="text-xs sm:text-sm font-black text-amber-950 leading-tight">
                          {item.title}
                        </h4>
                        <span className="text-[10px] text-amber-800 font-bold flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3 inline text-amber-600" />
                          <span>{item.timestamp}</span>
                        </span>
                      </div>
                    </div>
                    {!item.read && (
                      <span className="w-2.5 h-2.5 rounded-full bg-red-600 ring-2 ring-white shrink-0 mt-1" />
                    )}
                  </div>

                  <p className="text-xs text-stone-700 leading-relaxed mb-3 pl-1 font-medium">
                    {item.body}
                  </p>

                  <div className="flex items-center justify-between border-t border-amber-200/60 pt-2.5">
                    <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300/60 uppercase tracking-wider">
                      {item.muhurtaType === 'brahma'
                        ? (isHindi ? 'ब्रह्म मुहूर्त' : 'Brahma Muhurta')
                        : item.muhurtaType === 'madhyahna'
                        ? (isHindi ? 'अभिजित वेला' : 'Abhijit Muhurta')
                        : item.muhurtaType === 'sandhya'
                        ? (isHindi ? 'सांध्य वंदन' : 'Evening Twilight')
                        : item.muhurtaType === 'streak'
                        ? (isHindi ? 'अखंड साधना' : 'Streak Guard')
                        : item.muhurtaType === 'shayan'
                        ? (isHindi ? 'रात्रि शांति' : 'Night Peace')
                        : (isHindi ? 'ग्रह-गोचर' : 'Astrology')}
                    </span>

                    <button
                      onClick={() => handleNotificationClick(item)}
                      className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-black text-xs shadow-xs hover:brightness-105 active:scale-95 transition-all"
                    >
                      <span>{item.actionLabel || (isHindi ? 'अभी शुरू करें ❯' : 'Open ❯')}</span>
                    </button>
                  </div>
                </div>

                {/* Preloaded Native Ad between notifications */}
                {index === 1 && (
                  <AdMobNativeCard
                    language={language}
                    variant="native_advanced"
                    slotName="Notification Stream 1"
                  />
                )}
              </React.Fragment>
            ))
          )}
        </div>

        {/* Pro Footer */}
        <div className="p-3 bg-gradient-to-r from-orange-50 to-amber-50 border-t border-amber-200 flex items-center justify-between text-xs">
          <span className="text-[11px] text-orange-950 font-bold">
            {isHindi ? 'दैनिक ५ पावन वेलाओं में स्वतः स्मरण' : 'Automated 5-Muhurta Reminders'}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-black text-xs rounded-xl shadow-xs hover:brightness-105 active:scale-95 transition-all"
          >
            {isHindi ? 'पूर्ण (बंद करें)' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
