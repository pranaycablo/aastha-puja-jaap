/**
 * sadhanaHistoryManager.ts
 * Manages comprehensive Japa History, daily sessions, and sadhana logs
 * with persistent storage, weekly analysis, and Sankalp verification.
 */

export interface JapaHistoryEntry {
  id: string;
  date: string; // Formatted date: "19 Nov 2026"
  isoDate: string; // YYYY-MM-DD
  timestamp: number;
  timeString: string; // e.g. "08:45 PM"
  mantraId: string;
  mantraName: string;
  beadsCount: number;
  malasCount: number;
  targetMalas: number;
  completed: boolean;
  durationMinutes: number;
  sankalpPlan?: string;
  deityName?: string;
}

const HISTORY_STORAGE_KEY = 'aastha_japa_history_records_v1';
const ACTIVE_SANKALP_KEY = 'aastha_active_sankalp_plan_v1';

export interface ActiveSankalp {
  id: string;
  planName: string; // e.g. "११ दिवसीय शांति संकल्प" or "दैनिक नित्य नियम"
  targetDays: number;
  dailyTargetMalas: number;
  mantraId: string;
  mantraName: string;
  startDate: string; // YYYY-MM-DD
  daysCompleted: number;
  totalChantsCompleted: number;
  status: 'active' | 'completed' | 'paused';
}

class SadhanaHistoryManager {
  /**
   * Get all recorded japa sessions sorted by most recent first
   * Strictly real user records only - Zero dummy/demo data
   */
  getHistory(): JapaHistoryEntry[] {
    try {
      const data = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (!data) {
        return [];
      }
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.error('Failed to load japa history', e);
      return [];
    }
  }

  /**
   * Save a newly completed or updated japa session
   */
  saveSession(
    record: Omit<JapaHistoryEntry, 'id' | 'timestamp' | 'date' | 'isoDate' | 'timeString'>
  ): JapaHistoryEntry {
    const history = this.getHistory();
    const now = new Date();
    
    const formattedDate = now.toLocaleDateString('hi-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
    
    const timeString = now.toLocaleTimeString('hi-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    const isoDate = now.toISOString().split('T')[0];

    const newEntry: JapaHistoryEntry = {
      id: `japa_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      timestamp: Date.now(),
      date: formattedDate,
      isoDate,
      timeString,
      ...record
    };

    const updated = [newEntry, ...history].slice(0, 100); // keep last 100 sessions
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));

    // Update active sankalp if matched
    this.updateActiveSankalpProgress(record.malasCount, record.beadsCount);

    return newEntry;
  }

  /**
   * Check if user has performed japa today
   */
  hasChantedToday(): boolean {
    const today = new Date().toISOString().split('T')[0];
    const history = this.getHistory();
    return history.some((h) => h.isoDate === today && (h.malasCount > 0 || h.beadsCount >= 10));
  }

  /**
   * Today's total completed malas
   */
  getTodayTotals(): { malas: number; beads: number; sessionsCount: number } {
    const today = new Date().toISOString().split('T')[0];
    const history = this.getHistory();
    const todayRecords = history.filter((h) => h.isoDate === today);
    
    return {
      malas: todayRecords.reduce((acc, r) => acc + (r.malasCount || 0), 0),
      beads: todayRecords.reduce((acc, r) => acc + (r.beadsCount || 0), 0),
      sessionsCount: todayRecords.length
    };
  }

  /**
   * Weekly breakdown for the past 7 days
   */
  getWeeklySummary(): { dayLabel: string; date: string; malas: number; beads: number; targetDone: boolean }[] {
    const history = this.getHistory();
    const result = [];
    const daysHindi = ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'];

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const iso = d.toISOString().split('T')[0];
      const dayName = daysHindi[d.getDay()];

      const dayRecords = history.filter((h) => h.isoDate === iso);
      const malas = dayRecords.reduce((acc, r) => acc + (r.malasCount || 0), 0);
      const beads = dayRecords.reduce((acc, r) => acc + (r.beadsCount || 0), 0);

      result.push({
        dayLabel: dayName,
        date: d.toLocaleDateString('hi-IN', { day: 'numeric', month: 'short' }),
        malas,
        beads,
        targetDone: malas >= 1 || beads >= 108
      });
    }

    return result;
  }

  /**
   * Get Active Sankalp Plan
   */
  getActiveSankalp(): ActiveSankalp | null {
    try {
      const data = localStorage.getItem(ACTIVE_SANKALP_KEY);
      if (!data) return null;
      return JSON.parse(data);
    } catch {
      return null;
    }
  }

  /**
   * Set or update active sankalp plan
   */
  setActiveSankalp(sankalp: Omit<ActiveSankalp, 'id' | 'startDate' | 'daysCompleted' | 'totalChantsCompleted' | 'status'>): ActiveSankalp {
    const active: ActiveSankalp = {
      id: `sankalp_${Date.now()}`,
      startDate: new Date().toISOString().split('T')[0],
      daysCompleted: 0,
      totalChantsCompleted: 0,
      status: 'active',
      ...sankalp
    };
    localStorage.setItem(ACTIVE_SANKALP_KEY, JSON.stringify(active));
    return active;
  }

  private updateActiveSankalpProgress(malasAdded: number, beadsAdded: number) {
    const sankalp = this.getActiveSankalp();
    if (!sankalp || sankalp.status !== 'active') return;

    sankalp.totalChantsCompleted += beadsAdded;
    if (malasAdded >= sankalp.dailyTargetMalas) {
      sankalp.daysCompleted = Math.min(sankalp.targetDays, sankalp.daysCompleted + 1);
      if (sankalp.daysCompleted >= sankalp.targetDays && sankalp.targetDays > 0) {
        sankalp.status = 'completed';
      }
    }
    localStorage.setItem(ACTIVE_SANKALP_KEY, JSON.stringify(sankalp));
  }

  clearHistory(): void {
    localStorage.removeItem(HISTORY_STORAGE_KEY);
  }
}

export const sadhanaHistoryManager = new SadhanaHistoryManager();
