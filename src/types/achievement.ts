export type AchievementCategory =
  | 'python'
  | 'patterns'
  | 'problems'
  | 'verbal'
  | 'android'
  | 'streak'
  | 'speed'
  | 'general';

export type AchievementRequirementType =
  | 'count'
  | 'streak'
  | 'time'
  | 'score'
  | 'completion';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
  xpReward: number;
  category: AchievementCategory;
  requirement: AchievementRequirement;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface AchievementRequirement {
  type: AchievementRequirementType;
  target: number;
  metric: string; // What we're measuring
}

export interface UnlockedAchievement {
  achievementId: string;
  unlockedAt: string;
  progress: number; // 0-100
}

export interface UserProgress {
  xp: number;
  level: number;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string | null;
  totalProblemsolved: number;
  totalTimeStudied: number; // minutes
  titles: string[];
  currentTitle: string;
}

export interface XPEvent {
  amount: number;
  reason: string;
  timestamp: string;
}

export const XP_REWARDS = {
  LESSON_COMPLETE: 25,
  QUIZ_PASS: 50,
  QUIZ_PERFECT: 100,
  PATTERN_LEARNED: 50,
  PATTERN_MASTERED: 150,
  PROBLEM_ATTEMPTED: 25,
  PROBLEM_SOLVED: 100,
  PROBLEM_REVIEWED: 25,
  VERBAL_PRACTICE: 30,
  ANDROID_TOPIC: 20,
  TASK_COMPLETE: 15,
  DAILY_STREAK: 50,
  BOSS_BATTLE_WIN: 500,
} as const;

export const XP_PER_LEVEL = 500;

export function calculateLevel(xp: number): number {
  return Math.floor(xp / XP_PER_LEVEL) + 1;
}

export function xpToNextLevel(xp: number): { current: number; needed: number; percentage: number } {
  const currentLevelXP = xp % XP_PER_LEVEL;
  return {
    current: currentLevelXP,
    needed: XP_PER_LEVEL,
    percentage: (currentLevelXP / XP_PER_LEVEL) * 100,
  };
}

export function getLevelTitle(level: number): string {
  if (level <= 5) return 'Novice';
  if (level <= 10) return 'Apprentice';
  if (level <= 15) return 'Practitioner';
  if (level <= 20) return 'Expert';
  return 'Master';
}
