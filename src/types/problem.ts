import type { PatternCategory } from './pattern';

export type ProblemDifficulty = 'Easy' | 'Medium' | 'Hard';
export type ProblemStatus = 'not-started' | 'attempted' | 'solved' | 'reviewed';

export interface Problem {
  id: string;
  title: string;
  difficulty: ProblemDifficulty;
  leetcodeUrl: string;
  leetcodeNumber: number;
  patterns: PatternCategory[];
  isPayPalTagged: boolean;
  isPremium: boolean;
  backupUrl?: string; // NeetCode.io link for premium problems
  timeTarget: number; // minutes
  description: string;
  examples: ProblemExample[];
  constraints: string[];
  umpire: UMPIREWalkthrough;
  solution: SolutionCode;
  hints: string[];
  commonMistakes: string[];
  followUpQuestions: string[];
  similarProblems: string[];
}

export interface ProblemExample {
  input: string;
  output: string;
  explanation?: string;
}

export interface UMPIREWalkthrough {
  understand: string[];
  match: string;
  plan: string[];
  implement: string;
  review: string[];
  evaluate: {
    time: string;
    space: string;
    explanation: string;
  };
}

export interface SolutionCode {
  code: string;
  language: 'python';
  lineByLineExplanation: LineExplanation[];
}

export interface LineExplanation {
  lineStart: number;
  lineEnd?: number;
  explanation: string;
}

export interface ProblemAttempt {
  problemId: string;
  status: ProblemStatus;
  timeSpent: number; // milliseconds
  attempts: number;
  lastAttemptedAt: string;
  hintsUsed: number;
  notes: string;
}
