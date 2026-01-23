export type PatternCategory =
  | 'prefix-sum'
  | 'two-pointers'
  | 'sliding-window'
  | 'fast-slow-pointers'
  | 'linked-list-reversal'
  | 'monotonic-stack'
  | 'top-k-elements'
  | 'merge-intervals'
  | 'binary-search'
  | 'bfs'
  | 'dfs'
  | 'backtracking'
  | 'dynamic-programming'
  | 'union-find'
  | 'trie';

export type MasteryLevel = 0 | 1 | 2 | 3; // None, Learning, Familiar, Mastered

export interface AlgorithmPattern {
  id: PatternCategory;
  name: string;
  description: string;
  keywords: string[];
  whenToUse: string[];
  templateCode: string;
  codeExplanation: string;
  timeComplexity: string;
  spaceComplexity: string;
  practiceProblems: string[];
  visualExplanation?: string;
}

export interface PatternDetectorResult {
  primaryPattern: PatternCategory | null;
  confidence: number;
  secondaryPatterns: PatternCategory[];
  highlightedKeywords: string[];
  suggestedApproach: string;
}

export interface PatternKeywordMap {
  pattern: PatternCategory;
  keywords: string[];
  weight: number;
}
