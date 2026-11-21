import React, { useState, useEffect, useRef } from 'react';
import { X, Calendar, Clock, Flame, CheckCircle2, Award, Sparkles, TrendingUp, RefreshCw, ChevronRight, Download, Upload, ShieldCheck, Database } from 'lucide-react';
import { sadhanaHistoryManager, JapaHistoryEntry, ActiveSankalp } from '../utils/sadhanaHistoryManager';
import { UserProfile, LanguageCode } from '../types';
import { AdMobNativeCard } from './AdMobNativeCard';

interface SadhanaHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  language?: LanguageCode;
  onSelectMantraForJaap?: (mantraName: string) => void;
}

export const SadhanaHistoryModal: React.FC<SadhanaHistoryModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  language = 'hi',
  onSelectMantraForJaap
}) => {
  const isHi = language === 'hi';
  const [activeTab, setActiveTab] = useState<'sessions' | 'weekly' | 'sankalp' | 'backup'>('sessions');
  const [history, setHistory] = useState<JapaHistoryEntry[]>([]);
  const [activeSankalp, setActiveSankalp] = useState<ActiveSankalp | null>(null);
  const [todayStats, setTodayStats] = useState({ malas: 0, beads: 0, sessionsCount: 0 });
  const [weeklySummary, setWeeklySummary] = useState<any[]>([]);
  const [backupStatus, setBackupStatus] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const loadData = () => {
    const list = sadhanaHistoryManager.getHistory();
    setHistory(list);
    setActiveSankalp(sadhanaHistoryManager.getActiveSankalp());
    setTodayStats(sadhanaHistoryManager.getTodayTotals());
    setWeeklySummary(sadhanaHistoryManager.getWeeklySummary());
  };

  const handleExportBackup = () => {
    try {
      const backupData = {
        app: 'Aastha : Puja Jaap',
        version: '2.6.0',
        exportedAt: new Date().toISOString(),
        userProfile,
        japaHistory: history,
        activeSankalp,
        unlockedTiers: localStorage.getItem('divya_jaap_unlocked_tiers')
          ? JSON.parse(localStorage.getItem('divya_jaap_unlocked_tiers')!)
          : {},
        bookmarks: localStorage.getItem('aastha_scripture_bookmarks')
          ? JSON.parse(localStorage.getItem('aastha_scripture_bookmarks')!)
          : []
      };

      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `Aastha_Sadhana_Backup_${userProfile.name || 'User'}_${new Date().toISOString().split('T')[0]}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();

      setBackupStatus(isHi ? '✓ बैकअप फाइल सफलतापूर्वक डाउनलोड हो गई!' : '✓ Backup downloaded successfully!');
      setTimeout(() => setBackupStatus(null), 4000);
    } catch (e) {
      setBackupStatus(isHi ? 'बैकअप डाउनलोड में त्रुटि आई।' : 'Failed to export backup.');
    }
  };

  const handleImportBackup = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const parsed = JSON.parse(text);

        if (!parsed.app || !parsed.userProfile) {
          throw new Error('अमान्य बैकअप फाइल');
        }

        if (parsed.userProfile) {
          localStorage.setItem('aastha_user_profile_v2', JSON.stringify(parsed.userProfile));
        }
        if (parsed.japaHistory) {
          localStorage.setItem('aastha_japa_history_records_v1', JSON.stringify(parsed.japaHistory));
        }
        if (parsed.activeSankalp) {
          localStorage.setItem('aastha_active_sankalp_plan_v1', JSON.stringify(parsed.activeSankalp));
        }
        if (parsed.unlockedTiers) {
          localStorage.setItem('divya_jaap_unlocked_tiers', JSON.stringify(parsed.unlockedTiers));
        }
        if (parsed.bookmarks) {
          localStorage.setItem('aastha_scripture_bookmarks', JSON.stringify(parsed.bookmarks));
        }

        loadData();
        setBackupStatus(isHi ? '✓ समस्त साधना डेटा व इतिहास सफलतापूर्वक रिस्टोर हो गया! ऐप रीलोड हो रहा है...' : '✓ Data restored successfully! Reloading...');
        setTimeout(() => {
          window.location.reload();
        }, 1200);
      } catch (err) {
        setBackupStatus(isHi ? 'त्रुटि: बैकअप फाइल सही नहीं है।' : 'Error: Invalid backup file.');
      }
    };
    reader.readAsText(file);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-[#180A2D] via-[#100620] to-[#0A0414] text-white rounded-3xl border border-amber-500/30 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Top Header */}
        <div className="relative px-5 pt-5 pb-4 bg-gradient-to-r from-orange-900/40 via-amber-900/30 to-purple-950/50 border-b border-amber-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-950/60 border border-amber-300/40">
              <Calendar className="w-6 h-6 text-amber-100" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-500/30">
                  {isHi ? 'साधना पंजिका' : 'SADHANA JOURNAL'}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold">
                  <Flame className="w-3.5 h-3.5 fill-emerald-400" />
                  {userProfile.dailyStreak || 1} {isHi ? 'दिवस अखंड' : 'Days'}
                </span>
              </div>
              <h2 className="text-lg font-black text-amber-100 mt-0.5">
                {userProfile.name} {isHi ? 'जी का जाप इतिहास' : "'s Chanting History"}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-amber-200 border border-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick KPI Cards Bar */}
        <div className="p-4 grid grid-cols-3 gap-2 bg-black/30 border-b border-white/5">
          <div className="bg-amber-950/30 border border-amber-500/25 rounded-2xl p-2.5 text-center">
            <span className="text-[10px] text-amber-300/80 font-bold block">{isHi ? 'आज का जाप' : 'Today'}</span>
            <span className="text-xl font-black text-amber-300 font-mono mt-0.5 block">
              {todayStats.malas} <span className="text-xs font-medium text-amber-400/80">{isHi ? 'माला' : 'malas'}</span>
            </span>
            <span className="text-[9px] text-amber-200/60">({todayStats.beads} {isHi ? 'मंत्र' : 'beads'})</span>
          </div>

          <div className="bg-orange-950/30 border border-orange-500/25 rounded-2xl p-2.5 text-center">
            <span className="text-[10px] text-orange-300/80 font-bold block">{isHi ? 'कुल मालाएं' : 'Total Malas'}</span>
            <span className="text-xl font-black text-orange-300 font-mono mt-0.5 block">
              {userProfile.totalMalasCompletedAllTime}
            </span>
            <span className="text-[9px] text-orange-200/60">{isHi ? 'आजीवन' : 'All-time'}</span>
          </div>

          <div className="bg-emerald-950/30 border border-emerald-500/25 rounded-2xl p-2.5 text-center">
            <span className="text-[10px] text-emerald-300/80 font-bold block">{isHi ? 'कुल मंत्र' : 'Total Chants'}</span>
            <span className="text-xl font-black text-emerald-300 font-mono mt-0.5 block">
              {userProfile.totalBeadsAllTime.toLocaleString('en-IN')}
            </span>
            <span className="text-[9px] text-emerald-200/60">{isHi ? 'पुण्य संचय' : 'Punya'}</span>
          </div>
        </div>

        {/* Segmented Tab Controls */}
        <div className="px-4 pt-3 pb-1 flex gap-2">
          <button
            onClick={() => setActiveTab('sessions')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'sessions'
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-black shadow-md'
                : 'bg-white/5 text-amber-200/70 hover:bg-white/10'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            {isHi ? 'सत्र इतिहास' : 'Sessions'}
          </button>

          <button
            onClick={() => setActiveTab('weekly')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'weekly'
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-black shadow-md'
                : 'bg-white/5 text-amber-200/70 hover:bg-white/10'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            {isHi ? 'साप्ताहिक तालिका' : '7-Day Trend'}
          </button>

          <button
            onClick={() => setActiveTab('sankalp')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'sankalp'
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-black shadow-md'
                : 'bg-white/5 text-amber-200/70 hover:bg-white/10'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            {isHi ? 'सक्रिय संकल्प' : 'Sankalp'}
          </button>

          <button
            onClick={() => setActiveTab('backup')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'backup'
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-black shadow-md'
                : 'bg-white/5 text-amber-200/70 hover:bg-white/10'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            {isHi ? 'बैकअप' : 'Backup'}
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1 scrollbar-thin">
          
          {/* TAB 1: SESSIONS HISTORY */}
          {activeTab === 'sessions' && (
            <div className="space-y-2.5">
              {history.length === 0 ? (
                <div className="text-center py-10 px-4 bg-white/5 rounded-2xl border border-white/10">
                  <span className="text-4xl block mb-2">📿</span>
                  <p className="text-sm font-bold text-amber-200">
                    {isHi ? 'अभी तक कोई जाप सत्र दर्ज नहीं है' : 'No chanting sessions recorded yet'}
                  </p>
                  <p className="text-xs text-amber-300/60 mt-1">
                    {isHi
                      ? 'जाप पृष्ठ पर जाकर माला फेरें, आपकी प्रत्येक पूर्ण माला यहाँ सुरक्षित हो जाएगी।'
                      : 'Begin chanting in the Jaap screen to automatically log your sacred sessions here.'}
                  </p>
                </div>
              ) : (
                history.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl bg-gradient-to-r from-[#20103A] to-[#160B29] border border-amber-500/20 hover:border-amber-400/40 transition-all flex items-center justify-between gap-3 shadow-md"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-xl shrink-0 mt-0.5">
                        {item.malasCount >= item.targetMalas ? '📿' : '✨'}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-black text-amber-200">{item.mantraName}</h4>
                          {item.completed && (
                            <span className="inline-flex items-center gap-0.5 text-[9px] font-black text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30">
                              <CheckCircle2 className="w-2.5 h-2.5" />
                              {isHi ? 'सम्पन्न' : 'Done'}
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-amber-300/70 mt-1">
                          <span className="flex items-center gap-1 font-mono text-amber-100 font-bold">
                            <Sparkles className="w-3 h-3 text-amber-400" />
                            {item.malasCount} {isHi ? 'माला' : 'malas'} ({item.beadsCount} {isHi ? 'मंत्र' : 'beads'})
                          </span>
                          {item.durationMinutes > 0 && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-amber-400/70" />
                              {item.durationMinutes} {isHi ? 'मिनट' : 'min'}
                            </span>
                          )}
                          <span>📅 {item.date} • {item.timeString}</span>
                        </div>
                        {item.sankalpPlan && (
                          <span className="inline-block mt-1 text-[10px] text-orange-300/80 bg-orange-950/40 px-2 py-0.5 rounded-full border border-orange-500/20">
                            🚩 {item.sankalpPlan}
                          </span>
                        )}
                      </div>
                    </div>

                    {onSelectMantraForJaap && (
                      <button
                        onClick={() => {
                          onSelectMantraForJaap(item.mantraName);
                          onClose();
                        }}
                        className="p-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 shrink-0 border border-amber-400/30 active:scale-95 transition-all"
                        title={isHi ? 'पुनः जप करें' : 'Chant again'}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 4: DATA BACKUP & RESTORE */}
          {activeTab === 'backup' && (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#281347] to-[#190B2E] border border-amber-500/30 space-y-3 shadow-lg">
                <div className="flex items-center gap-2.5">
                  <span className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-xl shadow-xs">
                    💾
                  </span>
                  <div>
                    <h4 className="text-sm font-black text-amber-100">
                      {isHi ? 'आध्यात्मिक साधना डेटा बैकअप' : 'Sadhana Data Backup'}
                    </h4>
                    <p className="text-[11px] text-amber-300/70">
                      {isHi ? 'मोबाइल बदलने पर भी जाप, माला व संकल्प कभी न खोएं' : 'Preserve your chanting history and records safely'}
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-black/40 rounded-xl border border-white/10 text-xs text-amber-200/90 space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-300 font-bold">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>{isHi ? 'बैकअप में क्या सुरक्षित होगा?' : 'What gets backed up?'}</span>
                  </div>
                  <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-amber-200/80">
                    <li>{isHi ? 'आपकी प्रोफ़ाइल (नाम, जन्म विवरण, इष्टदेव)' : 'Your Profile and Isht Devta'}</li>
                    <li>{isHi ? 'समस्त जाप सत्र एवं कुल माला संख्या' : 'All Chanting sessions and total malas'}</li>
                    <li>{isHi ? 'अनलॉक कुण्डली व अंक ज्योतिष रिपोर्ट्स' : 'Unlocked Reports and Scripture Bookmarks'}</li>
                  </ul>
                </div>

                {backupStatus && (
                  <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs font-bold text-center animate-fadeIn">
                    {backupStatus}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2 pt-1">
                  {/* Export Button */}
                  <button
                    type="button"
                    onClick={handleExportBackup}
                    className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-black text-xs shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>{isHi ? 'बैकअप डाउनलोड' : 'Download Backup'}</span>
                  </button>

                  {/* Import Button */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-amber-200 font-black text-xs border border-amber-400/40 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                    <span>{isHi ? 'रिस्टोर करें' : 'Restore Data'}</span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json"
                    onChange={handleImportBackup}
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: WEEKLY BREAKDOWN */}
          {activeTab === 'weekly' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#20103A] border border-amber-500/25">
                <h4 className="text-xs font-black text-amber-300 uppercase tracking-wider mb-3">
                  📊 {isHi ? 'गत ७ दिवस की दैनिक जप निरंतरता' : 'Past 7 Days Chanting Trend'}
                </h4>
                <div className="grid grid-cols-7 gap-1.5 pt-2">
                  {weeklySummary.map((day, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <div className="h-24 w-full bg-white/5 rounded-xl p-1 flex flex-col justify-end items-center relative overflow-hidden border border-white/5">
                        {day.malas > 0 ? (
                          <div
                            className="w-full rounded-lg bg-gradient-to-t from-orange-600 via-amber-500 to-amber-300 flex items-center justify-center transition-all duration-500"
                            style={{ height: `${Math.min(100, Math.max(25, day.malas * 25))}%` }}
                          >
                            <span className="text-[10px] font-black text-slate-950 font-mono">
                              {day.malas}M
                            </span>
                          </div>
                        ) : (
                          <span className="text-[10px] text-white/20 mb-1">-</span>
                        )}
                      </div>
                      <span className="text-[10px] font-bold text-amber-200 mt-1.5">{day.dayLabel}</span>
                      <span className="text-[9px] text-amber-300/60 font-mono">{day.date}</span>
                      {day.targetDone && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-0.5"></span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-950/40 to-orange-950/30 border border-amber-500/30 text-xs text-amber-200/90 leading-relaxed">
                <span className="font-bold text-amber-300 block mb-1">
                  💡 {isHi ? 'शास्त्र सम्मत निरंतरता नियम:' : 'Sacred Consistency Rule:'}
                </span>
                {isHi
                  ? 'शास्त्रों में कहा गया है कि जप में एक दिन का भी विराम आने से पूर्व संचित तप का तेज क्षीण होता है। यदि समय कम हो तो भी कम से कम १ माला नित्य अवश्य फेरें।'
                  : 'Tradition dictates maintaining an unbroken daily rhythm. Even on busy days, completing at least 1 mala sustains spiritual momentum.'}
              </div>
            </div>
          )}

          {/* TAB 3: ACTIVE SANKALP */}
          {activeTab === 'sankalp' && (
            <div className="space-y-3">
              {activeSankalp ? (
                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#281347] to-[#190B2E] border border-amber-500/30 shadow-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-black text-amber-400 uppercase tracking-wider bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                        🚩 {activeSankalp.status === 'completed' ? (isHi ? 'सम्पन्न संकल्प' : 'Completed') : (isHi ? 'प्रगतिशील संकल्प' : 'Active Sankalp')}
                      </span>
                      <h4 className="text-base font-black text-amber-100 mt-1">{activeSankalp.planName}</h4>
                      <p className="text-xs text-amber-300/80">{activeSankalp.mantraName}</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-2xl">
                      🏆
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-amber-200">
                      <span>{isHi ? 'साधना प्रगति' : 'Progress'}</span>
                      <span className="font-mono text-amber-300">
                        {activeSankalp.daysCompleted} / {activeSankalp.targetDays} {isHi ? 'दिवस' : 'Days'}
                      </span>
                    </div>
                    <div className="h-3 w-full bg-black/40 rounded-full overflow-hidden p-0.5 border border-amber-500/20">
                      <div
                        className="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-400 rounded-full transition-all duration-700"
                        style={{
                          width: `${Math.min(100, Math.max(5, (activeSankalp.daysCompleted / (activeSankalp.targetDays || 1)) * 100))}%`
                        }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                    <div className="p-2.5 rounded-xl bg-black/30 border border-white/5">
                      <span className="text-[10px] text-amber-300/70 block">{isHi ? 'दैनिक लक्ष्य' : 'Daily Quota'}</span>
                      <span className="text-sm font-bold text-amber-200 font-mono">
                        {activeSankalp.dailyTargetMalas} {isHi ? 'माला / दिन' : 'malas/day'}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-black/30 border border-white/5">
                      <span className="text-[10px] text-amber-300/70 block">{isHi ? 'कुल संचित मंत्र' : 'Chants Done'}</span>
                      <span className="text-sm font-bold text-emerald-300 font-mono">
                        {activeSankalp.totalChantsCompleted}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center space-y-2">
                  <span className="text-4xl block mb-1">🚩</span>
                  <h4 className="text-sm font-bold text-amber-200">
                    {isHi ? 'कोई संकल्प सक्रिय नहीं है' : 'No active sankalp'}
                  </h4>
                  <p className="text-xs text-amber-300/70 max-w-xs mx-auto">
                    {isHi
                      ? 'सुझाव पृष्ठ से ११, २१ अथवा ४१ दिवसीय अनुष्ठान संकल्प धारण करें और प्रभु कृपा के भागी बनें।'
                      : 'Choose an 11, 21 or 41 days sadhana sankalp from the Divine Suggestions to activate real-time tracking.'}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: DATA BACKUP & RESTORE */}
          {activeTab === 'backup' && (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#281347] to-[#190B2E] border border-amber-500/30 space-y-3 shadow-lg">
                <div className="flex items-center gap-2.5">
                  <span className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-xl shadow-xs">
                    💾
                  </span>
                  <div>
                    <h4 className="text-sm font-black text-amber-100">
                      {isHi ? 'आध्यात्मिक साधना डेटा बैकअप' : 'Sadhana Data Backup'}
                    </h4>
                    <p className="text-[11px] text-amber-300/70">
                      {isHi ? 'मोबाइल बदलने पर भी जाप, माला व संकल्प कभी न खोएं' : 'Preserve your chanting history and records safely'}
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-black/40 rounded-xl border border-white/10 text-xs text-amber-200/90 space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-300 font-bold">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>{isHi ? 'बैकअप में क्या सुरक्षित होगा?' : 'What gets backed up?'}</span>
                  </div>
                  <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-amber-200/80">
                    <li>{isHi ? 'आपकी प्रोफ़ाइल (नाम, जन्म विवरण, इष्टदेव)' : 'Your Profile and Isht Devta'}</li>
                    <li>{isHi ? 'समस्त जाप सत्र एवं कुल माला संख्या' : 'All Chanting sessions and total malas'}</li>
                    <li>{isHi ? 'अनलॉक कुण्डली व अंक ज्योतिष रिपोर्ट्स' : 'Unlocked Reports and Scripture Bookmarks'}</li>
                  </ul>
                </div>

                {backupStatus && (
                  <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs font-bold text-center animate-fadeIn">
                    {backupStatus}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2 pt-1">
                  {/* Export Button */}
                  <button
                    type="button"
                    onClick={handleExportBackup}
                    className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-black text-xs shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>{isHi ? 'बैकअप डाउनलोड' : 'Download Backup'}</span>
                  </button>

                  {/* Import Button */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-amber-200 font-black text-xs border border-amber-400/40 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                    <span>{isHi ? 'रिस्टोर करें' : 'Restore Data'}</span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json"
                    onChange={handleImportBackup}
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Integrated Compact Native Ad for High-CTR monetization */}
          <div className="pt-1">
            <AdMobNativeCard variant="compact" />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-gradient-to-t from-black via-black/80 to-transparent border-t border-amber-500/20 flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 font-black text-sm shadow-lg shadow-orange-950/60 active:scale-98 transition-all flex items-center justify-center gap-1.5"
          >
            {isHi ? 'साधना जारी रखें' : 'Continue Sadhana'}
          </button>
        </div>

      </div>
    </div>
  );
};
