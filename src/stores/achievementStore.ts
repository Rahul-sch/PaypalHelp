import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { XP_PER_LEVEL, calculateLevel, XP_REWARDS } from '../types/achievement';
import { getTodayString, isConsecutiveDay, isSameDay } from '../utils/timeUtils';

interface XPEvent {
  amount: number;
  reason: string;
  timestamp: string;
}

interface AchievementState {
  // Version for migration
  version: number;

  // XP and Level
  xp: number;
  level: number;

  // Streaks
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string | null;

  // Achievements
  unlockedAchievements: string[];

  // Titles
  titles: string[];
  currentTitle: string;

  // XP History (last 50 events)
  xpHistory: XPEvent[];

  // Actions
  addXP: (amount: number, reason: string) => void;
  updateStreak: () => boolean; // Returns true if streak increased
  unlockAchievement: (achievementId: string) => boolean; // Returns true if newly unlocked
  addTitle: (title: string) => void;
  setCurrentTitle: (title: string) => void;
  checkAndUpdateStreak: () => void;
  resetAchievements: () => void;

  // Computed
  getXPToNextLevel: () => { current: number; needed: number; percentage: number };
  getLevelTitle: () => string;
  hasAchievement: (achievementId: string) => boolean;
}

export const useAchievementStore = create<AchievementState>()(
  persist(
    (set, get) => ({
      version: 1,
      xp: 0,
      level: 1,
      currentStreak: 0,
      longestStreak: 0,
      lastActiveDate: null,
      unlockedAchievements: [],
      titles: ['Novice'],
      currentTitle: 'Novice',
      xpHistory: [],

      addXP: (amount, reason) => {
        set((state) => {
          const newXP = state.xp + amount;
          const newLevel = calculateLevel(newXP);
          const leveledUp = newLevel > state.level;

          // Add to history (keep last 50)
          const newEvent: XPEvent = {
            amount,
            reason,
            timestamp: new Date().toISOString(),
          };
          const newHistory = [newEvent, ...state.xpHistory].slice(0, 50);

          // Check if we should update titles on level up
          let newTitles = state.titles;
          if (leveledUp) {
            const levelTitle = getLevelTitleForLevel(newLevel);
            if (!state.titles.includes(levelTitle)) {
              newTitles = [...state.titles, levelTitle];
            }
          }

          return {
            xp: newXP,
            level: newLevel,
            xpHistory: newHistory,
            titles: newTitles,
          };
        });

        // Also update streak when XP is added
        get().checkAndUpdateStreak();
      },

      updateStreak: () => {
        const today = getTodayString();
        const { lastActiveDate, currentStreak, longestStreak } = get();

        if (lastActiveDate && isSameDay(lastActiveDate, today)) {
          return false; // Already updated today
        }

        let newStreak = 1;
        if (lastActiveDate && isConsecutiveDay(lastActiveDate, today)) {
          newStreak = currentStreak + 1;
        }

        set({
          currentStreak: newStreak,
          longestStreak: Math.max(longestStreak, newStreak),
          lastActiveDate: today,
        });

        return newStreak > currentStreak;
      },

      checkAndUpdateStreak: () => {
        const today = getTodayString();
        const { lastActiveDate } = get();

        if (!lastActiveDate || !isSameDay(lastActiveDate, today)) {
          get().updateStreak();
        }
      },

      unlockAchievement: (achievementId) => {
        const state = get();
        if (state.unlockedAchievements.includes(achievementId)) {
          return false; // Already unlocked
        }

        set({
          unlockedAchievements: [...state.unlockedAchievements, achievementId],
        });
        return true;
      },

      addTitle: (title) => {
        set((state) => {
          if (state.titles.includes(title)) return state;
          return { titles: [...state.titles, title] };
        });
      },

      setCurrentTitle: (title) => {
        const state = get();
        if (state.titles.includes(title)) {
          set({ currentTitle: title });
        }
      },

      resetAchievements: () => {
        set({
          xp: 0,
          level: 1,
          currentStreak: 0,
          longestStreak: 0,
          lastActiveDate: null,
          unlockedAchievements: [],
          titles: ['Novice'],
          currentTitle: 'Novice',
          xpHistory: [],
        });
      },

      getXPToNextLevel: () => {
        const { xp } = get();
        const currentLevelXP = xp % XP_PER_LEVEL;
        return {
          current: currentLevelXP,
          needed: XP_PER_LEVEL,
          percentage: (currentLevelXP / XP_PER_LEVEL) * 100,
        };
      },

      getLevelTitle: () => {
        const { level } = get();
        return getLevelTitleForLevel(level);
      },

      hasAchievement: (achievementId) => {
        return get().unlockedAchievements.includes(achievementId);
      },
    }),
    {
      name: 'paypal-prep-achievements',
      version: 1,
      storage: createJSONStorage(() => localStorage),
      migrate: (persistedState: unknown, version: number) => {
        if (version === 0) {
          return { ...(persistedState as AchievementState), version: 1 };
        }
        return persistedState as AchievementState;
      },
    }
  )
);

function getLevelTitleForLevel(level: number): string {
  if (level <= 5) return 'Novice';
  if (level <= 10) return 'Apprentice';
  if (level <= 15) return 'Practitioner';
  if (level <= 20) return 'Expert';
  return 'Master';
}

// Helper hook to add XP with common rewards
export function useXPReward() {
  const addXP = useAchievementStore((state) => state.addXP);

  return {
    lessonComplete: () => addXP(XP_REWARDS.LESSON_COMPLETE, 'Completed a lesson'),
    quizPass: () => addXP(XP_REWARDS.QUIZ_PASS, 'Passed a quiz'),
    quizPerfect: () => addXP(XP_REWARDS.QUIZ_PERFECT, 'Perfect quiz score'),
    patternLearned: () => addXP(XP_REWARDS.PATTERN_LEARNED, 'Learned a pattern'),
    patternMastered: () => addXP(XP_REWARDS.PATTERN_MASTERED, 'Mastered a pattern'),
    problemAttempted: () => addXP(XP_REWARDS.PROBLEM_ATTEMPTED, 'Attempted a problem'),
    problemSolved: () => addXP(XP_REWARDS.PROBLEM_SOLVED, 'Solved a problem'),
    problemReviewed: () => addXP(XP_REWARDS.PROBLEM_REVIEWED, 'Reviewed a problem'),
    verbalPractice: () => addXP(XP_REWARDS.VERBAL_PRACTICE, 'Verbal practice session'),
    androidTopic: () => addXP(XP_REWARDS.ANDROID_TOPIC, 'Reviewed Android topic'),
    taskComplete: () => addXP(XP_REWARDS.TASK_COMPLETE, 'Completed a task'),
    dailyStreak: () => addXP(XP_REWARDS.DAILY_STREAK, 'Daily streak bonus'),
    bossBattleWin: () => addXP(XP_REWARDS.BOSS_BATTLE_WIN, 'Won a boss battle'),
  };
}
