import { LocalNotifications } from '@capacitor/local-notifications';
import { UserProfile, LanguageCode, DeityType, MantraItem } from '../types';
import { DEITY_CONFIG, DEITY_CONFIG_EN } from '../data/mantraDatabase';
import { getPersonalizedSadhanaPlan } from './mantraSuggestionEngine';
import { sadhanaHistoryManager } from './sadhanaHistoryManager';

export type NotificationCategory = 'all' | 'muhurta' | 'sadhana' | 'astrology';

export interface DivineNotification {
  id: number;
  title: string;
  body: string;
  category: 'muhurta' | 'sadhana' | 'astrology';
  muhurtaType: 'brahma' | 'madhyahna' | 'sandhya' | 'shayan' | 'streak' | 'special';
  timestamp: string;
  read: boolean;
  deityIcon: string;
  actionLabel?: string;
  actionType?: 'jaap' | 'aaj_ka_din' | 'kundali' | 'chalisa';
  suggestedMantra?: MantraItem;
}

const NOTIFICATION_HISTORY_KEY = 'aastha_jaap_notification_history';

class NotificationEngine {
  private hasPermission: boolean = false;

  constructor() {
    this.checkPermissionStatus();
  }

  async checkPermissionStatus(): Promise<boolean> {
    try {
      const status = await LocalNotifications.checkPermissions();
      this.hasPermission = status.display === 'granted';
      return this.hasPermission;
    } catch {
      // In Web browser or non-supported environment
      if ('Notification' in window) {
        this.hasPermission = Notification.permission === 'granted';
        return this.hasPermission;
      }
      return false;
    }
  }

  async requestPermission(): Promise<boolean> {
    try {
      const res = await LocalNotifications.requestPermissions();
      this.hasPermission = res.display === 'granted';
      return this.hasPermission;
    } catch {
      if ('Notification' in window) {
        const res = await Notification.requestPermission();
        this.hasPermission = res === 'granted';
        return this.hasPermission;
      }
      return false;
    }
  }

  /**
   * Schedule recurring divine notifications customized for the user's Isht Devta & Name
   */
  async scheduleDailyDivineReminders(profile: UserProfile): Promise<void> {
    const isHindi = profile.language === 'hi';
    const deityList = isHindi ? DEITY_CONFIG : DEITY_CONFIG_EN;
    const deity = (deityList && deityList[profile.ishtDevta]) ? deityList[profile.ishtDevta] : (deityList ? deityList.shiva : { label: 'महादेव' });
    const deityLabel = deity?.label ? deity.label.split('(')[0].trim() : 'महादेव';
    const hasName = Boolean(profile.name && profile.name.trim() !== '' && profile.name !== 'साधक');
    const userDisplayName = hasName ? profile.name.trim() : '';

    try {
      // Check and request runtime notification permission if needed (Android 13+ support)
      const hasPerm = await this.checkPermissionStatus();
      if (!hasPerm) {
        await this.requestPermission();
      }

      // Clear previous pending reminders to prevent duplicate stacking
      const pending = await LocalNotifications.getPending();
      if (pending.notifications.length > 0) {
        await LocalNotifications.cancel({ notifications: pending.notifications });
      }

      const plan = getPersonalizedSadhanaPlan(profile, profile.language);

      // 1. Brahma Muhurta Reminder (05:00 AM) - Single-Focus Primary Isht Mantra
      const brahmaTitle = isHindi
        ? (hasName ? `🔱 ब्रह्म मुहूर्त: श्री ${userDisplayName} जी • ${plan.primaryIshtMantra.nameHi}` : `🔱 ब्रह्म मुहूर्त: ${plan.primaryIshtMantra.nameHi}`)
        : (hasName ? `🔱 Sacred Dawn: ${userDisplayName} ji • ${plan.primaryIshtMantra.nameHi}` : `🔱 Sacred Dawn: ${plan.primaryIshtMantra.nameHi}`);
      const brahmaBody = isHindi
        ? `ब्रह्म मुहूर्त का समय अमृततुल्य है। अपने इष्ट ${plan.ishtDevtaNameHi} का ध्यान कर "${plan.primaryIshtMantra.nameHi}" की १ नित्य माला (१०८ जप) करें।`
        : `Brahma Muhurta is intensely auspicious. Meditate upon ${plan.ishtDevtaNameHi} and chant 1 sacred mala.`;

      // 2. Madhyahna Abhijit Muhurta (12:00 PM) - Midday peace
      const madhyahnaTitle = isHindi
        ? `☀️ मध्याह्न विजय वेला • आज ${plan.optionalDayAlignment.dayNameHi}`
        : `☀️ Midday Abhijit Muhurta`;
      const madhyahnaBody = isHindi
        ? `${plan.optionalDayAlignment.noteHi} मन को एकाग्र कर ॐकार का मानसिक जप करें।`
        : `The most victorious window of the day is here. Recite sacred mantras.`;

      // 3. Sandhya Aarti Kaal Reminder (06:30 PM) - Primary Isht Paath
      const sandhyaTitle = isHindi
        ? `🪔 सांध्य वेला: ${plan.primaryIshtPaath.titleHi}`
        : (hasName ? `🪔 Twilight Aarti: ${userDisplayName} ji` : `🪔 Twilight Aarti`);
      const sandhyaBody = isHindi
        ? (hasName
            ? `श्री ${userDisplayName} जी, गोधूलि वेला में नित्य सांध्य दीप प्रज्वलित कर "${plan.primaryIshtPaath.titleHi}" का पाठ अथवा इष्ट नाम स्मरण करें।`
            : `गोधूलि वेला में नित्य सांध्य दीप प्रज्वलित कर "${plan.primaryIshtPaath.titleHi}" का पाठ अथवा इष्ट नाम स्मरण करें।`)
        : `Twilight chanting grants profound tranquility. Light the sacred evening lamp.`;

      // 4. Streak Protector Reminder (08:30 PM)
      const streakTitle = isHindi
        ? `🔥 अखंड साधना संकल्प (${profile.dailyStreak || 1} दिन पूर्ण)`
        : `🔥 Sadhana Streak (${profile.dailyStreak || 1} Days Active)`;
      const streakBody = isHindi
        ? (hasName
            ? `श्री ${userDisplayName} जी, आज की दैनिक साधना पूर्ण कर अपनी अविरल निरंतरता (Streak) सुरक्षित रखें।`
            : `आज की दैनिक साधना पूर्ण कर अपनी अविरल निरंतरता (Streak) सुरक्षित रखें।`)
        : (hasName
            ? `${userDisplayName} ji, complete today's sacred chanting to keep your unbroken streak alive!`
            : `Complete today's sacred chanting to keep your unbroken streak alive!`);

      // 5. Ratri Shayan Shanti Jaap (09:45 PM)
      const ratriTitle = isHindi
        ? `🌙 रात्रि विश्राम पूर्व शान्ति जाप`
        : `🌙 Night Peace & Tranquility Chanting`;
      const ratriBody = isHindi
        ? `शयन से पूर्व १०८ मणकों का जाप दिनभर के तनाव, चिंता व नकारात्मक विचारों का शमन करता है।`
        : `Chant for 5 tranquil minutes to release all stress and surrender into peaceful sleep.`;

      // Create Android Notification Channel for Android 8.0+ (API 26+)
      try {
        await LocalNotifications.createChannel({
          id: 'aastha_jaap_reminders',
          name: isHindi ? 'आस्था : पूजा जाप' : 'Aastha : Puja Jaap Reminders',
          description: isHindi ? 'दैनिक वैदिक साधना, मुहूर्त व ग्रह गोचर अलर्ट' : 'Daily sadhana, auspicious muhurta & astrological reminders',
          importance: 4,
          visibility: 1
        });
      } catch (channelErr) {
        // Ignored on Web/iOS platforms
      }

      // Schedule with LocalNotifications
      await LocalNotifications.schedule({
        notifications: [
          {
            id: 101,
            title: brahmaTitle,
            body: brahmaBody,
            channelId: 'aastha_jaap_reminders',
            schedule: {
              on: { hour: 5, minute: 0 },
              repeats: true,
              allowWhileIdle: true
            },
            smallIcon: 'ic_launcher'
          },
          {
            id: 102,
            title: madhyahnaTitle,
            body: madhyahnaBody,
            channelId: 'aastha_jaap_reminders',
            schedule: {
              on: { hour: 12, minute: 0 },
              repeats: true,
              allowWhileIdle: true
            },
            smallIcon: 'ic_launcher'
          },
          {
            id: 103,
            title: sandhyaTitle,
            body: sandhyaBody,
            channelId: 'aastha_jaap_reminders',
            schedule: {
              on: { hour: 18, minute: 30 },
              repeats: true,
              allowWhileIdle: true
            },
            smallIcon: 'ic_launcher'
          },
          {
            id: 104,
            title: streakTitle,
            body: streakBody,
            channelId: 'aastha_jaap_reminders',
            schedule: {
              on: { hour: 20, minute: 30 },
              repeats: true,
              allowWhileIdle: true
            },
            smallIcon: 'ic_launcher'
          },
          {
            id: 105,
            title: ratriTitle,
            body: ratriBody,
            channelId: 'aastha_jaap_reminders',
            schedule: {
              on: { hour: 21, minute: 45 },
              repeats: true,
              allowWhileIdle: true
            },
            smallIcon: 'ic_launcher'
          }
        ]
      });

      // Populate notification history in Notification Center
      this.populateNotificationHistory(profile);
      await this.checkAndNotifyMissedJaap(profile);
    } catch (e) {
      console.warn('Could not schedule native notifications:', e);
      this.populateNotificationHistory(profile);
    }
  }

  /**
   * Check if user has missed today's Jaap or has an active pending sankalp,
   * and fire or schedule an urgent divine notification to keep their streak & punya intact.
   */
  async checkAndNotifyMissedJaap(profile: UserProfile): Promise<boolean> {
    const isHindi = profile.language === 'hi';
    const hasName = Boolean(profile.name && profile.name.trim() !== '' && profile.name !== 'साधक');
    const userDisplayName = hasName ? profile.name.trim() : '';

    const chantedToday = sadhanaHistoryManager.hasChantedToday();
    const todayTotals = sadhanaHistoryManager.getTodayTotals();
    const activeSankalp = sadhanaHistoryManager.getActiveSankalp();

    // If user has fulfilled their daily target (at least 1 mala or their sankalp quota), no reminder needed
    if (chantedToday && (!activeSankalp || todayTotals.malas >= activeSankalp.dailyTargetMalas)) {
      return false;
    }

    const plan = getPersonalizedSadhanaPlan(profile, profile.language);
    const targetMalas = activeSankalp ? activeSankalp.dailyTargetMalas : 1;
    const remainingMalas = Math.max(1, targetMalas - todayTotals.malas);

    const alertTitle = isHindi
      ? (hasName ? `🔔 श्री ${userDisplayName} जी: आज का जप शेष है!` : `🔔 आज का पावन जप शेष है!`)
      : (hasName ? `🔔 ${userDisplayName} ji: Today's Chanting Incomplete!` : `🔔 Today's Chanting Incomplete!`);

    const alertBody = isHindi
      ? activeSankalp
        ? `आपके "${activeSankalp.planName}" का आज का लक्ष्य (${remainingMalas} माला) अभी शेष है। सोने से पूर्व "${plan.primaryIshtMantra.nameHi}" का जप कर पुण्य अर्जित करें।`
        : `आज आपने अभी तक नित्य जप पूर्ण नहीं किया है। अपनी अखंड निरंतरता (${profile.dailyStreak || 1} दिन) सुरक्षित रखने हेतु १ माला अवश्य फेरें।`
      : `You have pending chanting for today. Complete your sacred mala to maintain your daily streak!`;

    // 1. In-App Notification Center alert: prepend to history
    try {
      const history = this.getNotificationHistory();
      const existingAlert = history.find((h) => h.id === 999);
      if (!existingAlert) {
        const missedNotification: DivineNotification = {
          id: 999,
          title: alertTitle,
          body: alertBody,
          category: 'sadhana',
          muhurtaType: 'streak',
          timestamp: isHindi ? 'आज सांध्य स्मरण' : 'Today Evening Alert',
          read: false,
          deityIcon: '📿',
          actionLabel: isHindi ? '📿 अभी जप पूरा करें' : 'Chant Now',
          actionType: 'jaap',
          suggestedMantra: plan.primaryIshtMantra.mantraItem
        };
        localStorage.setItem(NOTIFICATION_HISTORY_KEY, JSON.stringify([missedNotification, ...history]));
      }
    } catch (e) {
      console.warn(e);
    }

    // 2. Schedule push notification if supported
    try {
      const hasPerm = await this.checkPermissionStatus();
      if (hasPerm) {
        await LocalNotifications.schedule({
          notifications: [
            {
              id: 999,
              title: alertTitle,
              body: alertBody,
              channelId: 'aastha_jaap_reminders',
              schedule: { at: new Date(Date.now() + 1000 * 10) }, // 10 seconds later
              smallIcon: 'ic_launcher'
            }
          ]
        });
      }
    } catch {
      // Ignored
    }

    return true;
  }

  /**
   * Populate notification history for in-app Divine Notification Center
   */
  populateNotificationHistory(profile: UserProfile): DivineNotification[] {
    const isHindi = profile.language === 'hi';
    const plan = getPersonalizedSadhanaPlan(profile, profile.language);
    const hasName = Boolean(plan.userName && plan.userName.trim() !== '' && plan.userName !== 'साधक');
    const userDisplayName = hasName ? plan.userName.trim() : '';

    const sampleNotifications: DivineNotification[] = [
      {
        id: 1,
        title: isHindi
          ? (hasName ? `🔱 प्रातः ब्रह्म मुहूर्त: श्री ${userDisplayName} जी • ${plan.primaryIshtMantra.nameHi}` : `🔱 प्रातः ब्रह्म मुहूर्त: ${plan.primaryIshtMantra.nameHi}`)
          : (hasName ? `🔱 Sacred Dawn: ${userDisplayName} ji • ${plan.primaryIshtMantra.nameHi}` : `🔱 Sacred Dawn: ${plan.primaryIshtMantra.nameHi}`),
        body: isHindi
          ? `आज ${plan.dayInfo.dayNameHi.split('(')[0]} का अमृत काल है। अपने इष्ट ${plan.ishtDevtaNameHi} का ध्यान कर "${plan.primaryIshtMantra.nameHi}" की १ नित्य माला (१०८ जप) करें।`
          : `Auspicious Brahma Muhurta. Chant 1 sacred mala of "${plan.primaryIshtMantra.nameHi}" for inner peace and divine grace.`,
        category: 'muhurta',
        muhurtaType: 'brahma',
        timestamp: isHindi ? 'आज प्रातः ५:०० बजे' : 'Today 5:00 AM',
        read: false,
        deityIcon: '📿',
        actionLabel: isHindi ? `📿 "${plan.primaryIshtMantra.nameHi.slice(0, 14)}..." जपें` : 'Chant Now',
        actionType: 'jaap',
        suggestedMantra: plan.primaryIshtMantra.mantraItem
      },
      {
        id: 2,
        title: isHindi
          ? `☀️ मध्याह्न विजय वेला • आज ${plan.optionalDayAlignment.dayNameHi}`
          : `☀️ Midday Abhijit Muhurta`,
        body: isHindi
          ? `${plan.optionalDayAlignment.noteHi} मन को एकाग्र कर ॐकार का मानसिक जप करें।`
          : `Midday astrological window. Meditate upon supreme consciousness.`,
        category: 'muhurta',
        muhurtaType: 'madhyahna',
        timestamp: isHindi ? 'दोपहर १२:०० बजे' : 'Today 12:00 PM',
        read: false,
        deityIcon: '☀️',
        actionLabel: isHindi ? `📿 ध्यान व जप` : 'Chant Now',
        actionType: 'jaap'
      },
      {
        id: 3,
        title: isHindi
          ? `📖 सांध्य वेला: ${plan.primaryIshtPaath.titleHi}`
          : `📖 Twilight Devotion: ${plan.primaryIshtPaath.titleHi}`,
        body: isHindi
          ? (hasName
              ? `श्री ${userDisplayName} जी, गोधूलि वेला में नित्य सांध्य दीप प्रज्वलित कर "${plan.primaryIshtPaath.titleHi}" का पाठ अथवा इष्ट नाम स्मरण करें।`
              : `गोधूलि वेला में नित्य सांध्य दीप प्रज्वलित कर "${plan.primaryIshtPaath.titleHi}" का पाठ अथवा इष्ट नाम स्मरण करें।`)
          : `Twilight Aarti hour. Light the sacred lamp and recite "${plan.primaryIshtPaath.titleHi}".`,
        category: 'muhurta',
        muhurtaType: 'sandhya',
        timestamp: isHindi ? 'आज सायं ६:३० बजे' : 'Today 6:30 PM',
        read: false,
        deityIcon: '📖',
        actionLabel: isHindi ? `📖 ${plan.primaryIshtPaath.titleHi.slice(0, 14)}...` : 'Read Paath',
        actionType: 'chalisa'
      },
      {
        id: 4,
        title: isHindi
          ? `🪐 आज का दिन: व्यक्तिगत पंचांग व ग्रह-गोचर`
          : `🪐 Today's Outlook: Personalized Panchang`,
        body: isHindi
          ? (hasName
              ? `श्री ${userDisplayName} जी, आज आपके मूलांक ${plan.moolank} के अनुसार शुभ रंग (${plan.dayInfo.auspiciousColorHi}), अंक व दिशा शूल की गणना उपलब्ध है।`
              : `आज के शुभ रंग (${plan.dayInfo.auspiciousColorHi}), अंक व दिशा शूल की गणना उपलब्ध है।`)
          : (hasName
              ? `${userDisplayName} ji, your personalized lucky color, numbers and cosmic muhurtas are ready.`
              : `Today's lucky color, numbers and cosmic muhurtas are ready.`),
        category: 'astrology',
        muhurtaType: 'special',
        timestamp: isHindi ? 'आज प्रातः ७:०० बजे' : 'Today 7:00 AM',
        read: false,
        deityIcon: '🪐',
        actionLabel: isHindi ? '🌅 आज का दिन देखें' : 'View Today\'s Guide',
        actionType: 'aaj_ka_din'
      },
      {
        id: 5,
        title: isHindi
          ? `🔥 अखंड साधना संकल्प (${profile.dailyStreak || 1} दिन पूर्ण)`
          : `🔥 Sadhana Streak (${profile.dailyStreak || 1} Days Active)`,
        body: isHindi
          ? `आपकी साधना अविरल चल रही है। कुल ${profile.totalMalasCompletedAllTime || 0} मालाएं पूर्ण हो चुकी हैं। आज का नित्य लक्ष्य पूर्ण कर अपनी ऊर्जा को अखंड रखें।`
          : `Your sadhana is unbroken. Total ${profile.totalMalasCompletedAllTime || 0} malas completed. Keep your sacred devotion alive!`,
        category: 'sadhana',
        muhurtaType: 'streak',
        timestamp: isHindi ? 'आज सायं ८:३० बजे' : 'Today 8:30 PM',
        read: true,
        deityIcon: '🔥',
        actionLabel: isHindi ? '📿 लक्ष्य पूर्ण करें' : 'Complete Daily Goal',
        actionType: 'jaap'
      },
      {
        id: 6,
        title: isHindi
          ? `🌙 रात्रि शान्ति व आत्म-समर्पण जप`
          : `🌙 Night Calm & Meditative Surrender`,
        body: isHindi
          ? `शयन से पूर्व १०८ मणकों का जाप दिनभर के तनाव, चिंता व नकारात्मक विचारों का शमन कर सुखद निद्रा प्रदान करता है।`
          : `Chanting 108 beads before sleep dissolves worldly anxiety and brings deep meditative tranquility.`,
        category: 'sadhana',
        muhurtaType: 'shayan',
        timestamp: isHindi ? 'कल रात्रि ९:४५ बजे' : 'Yesterday 9:45 PM',
        read: true,
        deityIcon: '✨',
        actionLabel: isHindi ? '📿 शांति जप' : 'Night Chanting',
        actionType: 'jaap'
      }
    ];

    try {
      const todayDateKey = new Date().toDateString();
      const existingDate = localStorage.getItem('aastha_notification_date_key');
      if (existingDate !== todayDateKey) {
        localStorage.setItem('aastha_notification_date_key', todayDateKey);
        localStorage.setItem(NOTIFICATION_HISTORY_KEY, JSON.stringify(sampleNotifications));
        return sampleNotifications;
      }
      const existing = localStorage.getItem(NOTIFICATION_HISTORY_KEY);
      if (!existing) {
        localStorage.setItem(NOTIFICATION_HISTORY_KEY, JSON.stringify(sampleNotifications));
        return sampleNotifications;
      }
      return JSON.parse(existing);
    } catch {
      return sampleNotifications;
    }
  }

  getNotificationHistory(): DivineNotification[] {
    try {
      const saved = localStorage.getItem(NOTIFICATION_HISTORY_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn(e);
    }
    return [];
  }

  getUnreadCount(): number {
    const list = this.getNotificationHistory();
    return list.filter((n) => !n.read).length;
  }

  markAllAsRead(): void {
    try {
      const list = this.getNotificationHistory();
      const updated = list.map((n) => ({ ...n, read: true }));
      localStorage.setItem(NOTIFICATION_HISTORY_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }
  }

  markAsRead(id: number): void {
    try {
      const list = this.getNotificationHistory();
      const updated = list.map((n) => (n.id === id ? { ...n, read: true } : n));
      localStorage.setItem(NOTIFICATION_HISTORY_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }
  }

  deleteNotification(id: number): void {
    try {
      const list = this.getNotificationHistory();
      const updated = list.filter((n) => n.id !== id);
      localStorage.setItem(NOTIFICATION_HISTORY_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }
  }

  clearHistory(): void {
    try {
      localStorage.removeItem(NOTIFICATION_HISTORY_KEY);
    } catch (e) {
      console.warn(e);
    }
  }
}

export const notificationEngine = new NotificationEngine();
