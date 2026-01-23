import type { PatternDetectorResult, PatternCategory } from '../types';
import { patternKeywordMap, algorithmPatterns } from '../data/patterns';

interface MatchScore {
  pattern: PatternCategory;
  score: number;
  matchedKeywords: string[];
}

// Normalize text for matching
function normalizeText(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ');
}

// Find all keyword matches in text
function findKeywordMatches(text: string, keywords: string[]): string[] {
  const normalizedInputText = normalizeText(text);
  const matches: string[] = [];

  for (const keyword of keywords) {
    const normalizedKeyword = normalizeText(keyword);
    if (normalizedInputText.includes(normalizedKeyword)) {
      matches.push(keyword);
    }
  }

  return matches;
}

// Detect the algorithm pattern from problem description
export function detectPattern(problemText: string): PatternDetectorResult {
  const scores: MatchScore[] = [];

  // Calculate score for each pattern
  for (const mapping of patternKeywordMap) {
    const matchedKeywords = findKeywordMatches(problemText, mapping.keywords);

    // Also check the full pattern's keywords
    const pattern = algorithmPatterns.find(p => p.id === mapping.pattern);
    if (pattern) {
      const patternKeywordMatches = findKeywordMatches(problemText, pattern.keywords);
      matchedKeywords.push(...patternKeywordMatches.filter(k => !matchedKeywords.includes(k)));
    }

    if (matchedKeywords.length > 0) {
      scores.push({
        pattern: mapping.pattern,
        score: matchedKeywords.length * mapping.weight,
        matchedKeywords: [...new Set(matchedKeywords)], // Remove duplicates
      });
    }
  }

  // Sort by score descending
  scores.sort((a, b) => b.score - a.score);

  // Calculate confidence based on score distribution
  const maxScore = scores.length > 0 ? scores[0].score : 0;
  const confidence = Math.min(95, Math.max(0, maxScore * 15));

  // Get primary and secondary patterns
  const primaryPattern = scores.length > 0 ? scores[0].pattern : null;
  const secondaryPatterns = scores
    .slice(1, 4)
    .filter(s => s.score >= maxScore * 0.5)
    .map(s => s.pattern);

  // Collect all highlighted keywords
  const highlightedKeywords = scores.length > 0
    ? [...new Set(scores.flatMap(s => s.matchedKeywords))]
    : [];

  // Generate suggested approach
  let suggestedApproach = '';
  if (primaryPattern) {
    const pattern = algorithmPatterns.find(p => p.id === primaryPattern);
    if (pattern) {
      suggestedApproach = generateApproach(pattern.name, pattern.whenToUse);
    }
  }

  return {
    primaryPattern,
    confidence,
    secondaryPatterns,
    highlightedKeywords,
    suggestedApproach,
  };
}

// Generate a suggested approach based on pattern
function generateApproach(patternName: string, whenToUse: string[]): string {
  const tips = whenToUse.slice(0, 2).join('. ');
  return `This problem appears to be a ${patternName} pattern. ${tips}. Consider applying the ${patternName} template as a starting point.`;
}

// Highlight keywords in text
export function highlightKeywordsInText(
  text: string,
  keywords: string[]
): { text: string; highlights: { start: number; end: number; keyword: string }[] } {
  const highlights: { start: number; end: number; keyword: string }[] = [];
  const lowerText = text.toLowerCase();

  for (const keyword of keywords) {
    const lowerKeyword = keyword.toLowerCase();
    let index = 0;

    while ((index = lowerText.indexOf(lowerKeyword, index)) !== -1) {
      highlights.push({
        start: index,
        end: index + keyword.length,
        keyword,
      });
      index += keyword.length;
    }
  }

  // Sort by start position
  highlights.sort((a, b) => a.start - b.start);

  return { text, highlights };
}

// Get pattern suggestions based on problem constraints
export function getPatternHints(constraints: {
  isSorted?: boolean;
  isLinkedList?: boolean;
  isTree?: boolean;
  isGraph?: boolean;
  findMinMax?: boolean;
  countWays?: boolean;
  findSubarray?: boolean;
  findSubstring?: boolean;
}): PatternCategory[] {
  const suggestions: PatternCategory[] = [];

  if (constraints.isSorted) {
    suggestions.push('binary-search', 'two-pointers');
  }
  if (constraints.isLinkedList) {
    suggestions.push('fast-slow-pointers', 'linked-list-reversal');
  }
  if (constraints.isTree) {
    suggestions.push('dfs', 'bfs');
  }
  if (constraints.isGraph) {
    suggestions.push('bfs', 'dfs', 'union-find');
  }
  if (constraints.findMinMax || constraints.countWays) {
    suggestions.push('dynamic-programming');
  }
  if (constraints.findSubarray) {
    suggestions.push('sliding-window', 'prefix-sum', 'two-pointers');
  }
  if (constraints.findSubstring) {
    suggestions.push('sliding-window', 'trie');
  }

  return [...new Set(suggestions)];
}
