export interface DaySchedule {
  day: number;
  date: string;
  title: string;
  theme: string;
  blocks: ScheduleBlock[];
  bossBattle?: BossBattle;
}

export interface ScheduleBlock {
  id: string;
  timeOfDay: 'morning' | 'afternoon' | 'evening';
  duration: string; // e.g., "2 hours"
  tasks: ScheduleTask[];
}

export interface ScheduleTask {
  id: string;
  title: string;
  description?: string;
  type: TaskType;
  linkedContent?: {
    type: 'python-module' | 'pattern' | 'problem' | 'android-topic';
    id: string;
  };
  xpReward: number;
}

export type TaskType =
  | 'python-lesson'
  | 'python-quiz'
  | 'pattern-study'
  | 'pattern-quiz'
  | 'problem-solve'
  | 'verbal-practice'
  | 'android-review'
  | 'mock-interview'
  | 'review'
  | 'rest';

export interface BossBattle {
  id: string;
  name: string;
  description: string;
  challenges: BossChallenge[];
  timeLimit: number; // minutes
  rewards: {
    xp: number;
    badge?: string;
    title?: string;
  };
}

export interface BossChallenge {
  id: string;
  type: 'pattern-quiz' | 'coding-problem' | 'verbal-explanation';
  content: string;
}

export interface CompletedTask {
  taskId: string;
  day: number;
  completedAt: string;
  timeSpent?: number; // minutes
}

export interface DayProgress {
  day: number;
  completedTasks: string[];
  totalTasks: number;
  progressPercentage: number;
  bossBattleCompleted: boolean;
}
