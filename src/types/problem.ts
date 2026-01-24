import type { PatternCategory } from './pattern';

export type ProblemDifficulty = 'easy' | 'medium' | 'hard';
export type ProblemStatus = 'not-started' | 'attempted' | 'solved' | 'reviewed';

export interface Problem {
  id: number;
  title: string;
  difficulty: ProblemDifficulty;
  leetcodeId: number;
  leetcodeUrl: string;
  neetcodeUrl?: string; // NeetCode.io link for premium problems
  companies: string[];
  pattern: PatternCategory;
  description: string;
  isPremium?: boolean;
  paypalFrequent?: boolean; // PayPal frequently asks this
  umpire: UMPIREWalkthrough;
  hints: string[];
  solution: string;
  testCases: TestCase[];
}

// Lightweight version for PayPal frequent problems list
export interface PayPalProblem {
  leetcodeId: number;
  title: string;
  difficulty: ProblemDifficulty;
  acceptanceRate?: number;
  isPremium?: boolean;
  starred?: boolean; // User marked as important
}

export interface TestCase {
  input: string;
  expected: string;
}

export interface UMPIREWalkthrough {
  understand: string[];
  match: string[];
  plan: string[];
  implement: string;
  review: string[];
  evaluate: {
    timeComplexity: string;
    spaceComplexity: string;
    explanation: string;
  };
}

export interface ProblemAttempt {
  problemId: number;
  status: ProblemStatus;
  timeSpent: number; // milliseconds
  attempts: number;
  lastAttemptedAt: string;
  hintsUsed: number;
  notes: string;
}
