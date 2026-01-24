import type { PayPalProblem } from '../types';

/**
 * PayPal Frequently Asked Interview Problems
 * Extracted from actual PayPal interview data
 * These appear regularly in PayPal technical interviews
 */
export const paypalFrequentProblems: PayPalProblem[] = [
  // EASY PROBLEMS
  { leetcodeId: 1, title: 'Two Sum', difficulty: 'easy', acceptanceRate: 56.3, starred: true },
  { leetcodeId: 121, title: 'Best Time to Buy and Sell Stock', difficulty: 'easy', acceptanceRate: 55.0, starred: true },
  { leetcodeId: 202, title: 'Happy Number', difficulty: 'easy', acceptanceRate: 58.6 },
  { leetcodeId: 206, title: 'Reverse Linked List', difficulty: 'easy', acceptanceRate: 79.7, starred: true },
  { leetcodeId: 283, title: 'Move Zeroes', difficulty: 'easy', acceptanceRate: 63.1 },
  { leetcodeId: 387, title: 'First Unique Character in a String', difficulty: 'easy', acceptanceRate: 64.2, starred: true },
  { leetcodeId: 437, title: 'Find All Anagrams in a String', difficulty: 'easy', acceptanceRate: 73.6 },
  { leetcodeId: 724, title: 'Find Pivot Index', difficulty: 'easy', acceptanceRate: 67.2 },
  { leetcodeId: 1046, title: 'Last Stone Weight', difficulty: 'easy', acceptanceRate: 66.1 },
  { leetcodeId: 1160, title: 'Find Words That Can Be Formed by Characters', difficulty: 'easy', acceptanceRate: 77.2 },
  { leetcodeId: 2062, title: 'Count Vowel Substrings of a String', difficulty: 'easy', acceptanceRate: 72.3 },
  { leetcodeId: 2586, title: 'Count the Number of Vowel Strings in Range', difficulty: 'easy', acceptanceRate: 73.8 },
  { leetcodeId: 30, title: 'Valid Parentheses', difficulty: 'easy', acceptanceRate: 43.0 },
  { leetcodeId: 55, title: 'Jump Game', difficulty: 'easy', acceptanceRate: 50.7 },
  { leetcodeId: 70, title: 'Climbing Stairs', difficulty: 'easy', acceptanceRate: 53.5 },
  { leetcodeId: 112, title: 'Path Sum', difficulty: 'easy', acceptanceRate: 53.6 },
  { leetcodeId: 138, title: 'Copy List with Random Pointer', difficulty: 'easy', acceptanceRate: 52.6 },
  { leetcodeId: 227, title: 'Delete Node in a Linked List', difficulty: 'easy', acceptanceRate: 83.0 },
  { leetcodeId: 295, title: 'Find Median from Data Stream', difficulty: 'easy', acceptanceRate: 53.5 },

  // MEDIUM PROBLEMS
  { leetcodeId: 3, title: 'Longest Substring Without Repeating Characters', difficulty: 'medium', acceptanceRate: 47.4, starred: true },
  { leetcodeId: 6, title: 'Zigzag Conversion', difficulty: 'medium', acceptanceRate: 52.4 },
  { leetcodeId: 11, title: 'Container With Most Water', difficulty: 'medium', acceptanceRate: 44.1, starred: true },
  { leetcodeId: 33, title: 'Search in Rotated Sorted Array', difficulty: 'medium', acceptanceRate: 43.8 },
  { leetcodeId: 34, title: 'Find First and Last Position of Element in Sorted Array', difficulty: 'medium', acceptanceRate: 47.5 },
  { leetcodeId: 36, title: 'Valid Sudoku', difficulty: 'medium', acceptanceRate: 63.9 },
  { leetcodeId: 48, title: 'Rotate Image', difficulty: 'medium', acceptanceRate: 78.0, starred: true },
  { leetcodeId: 49, title: 'Group Anagrams', difficulty: 'medium', acceptanceRate: 71.5, starred: true },
  { leetcodeId: 53, title: 'Maximum Subarray', difficulty: 'medium', acceptanceRate: 53.5 },
  { leetcodeId: 56, title: 'Merge Intervals', difficulty: 'medium', acceptanceRate: 50.0, starred: true },
  { leetcodeId: 75, title: 'Sort Colors', difficulty: 'medium', acceptanceRate: 63.2 },
  { leetcodeId: 78, title: 'Subsets', difficulty: 'medium', acceptanceRate: 83.0 },
  { leetcodeId: 79, title: 'Word Search', difficulty: 'medium', acceptanceRate: 40.5 },
  { leetcodeId: 105, title: 'Construct Binary Tree from Preorder and Inorder', difficulty: 'medium', acceptanceRate: 51.6 },
  { leetcodeId: 128, title: 'Longest Consecutive Sequence', difficulty: 'medium', acceptanceRate: 47.0 },
  { leetcodeId: 146, title: 'LRU Cache', difficulty: 'medium', acceptanceRate: 45.9, starred: true },
  { leetcodeId: 162, title: 'Find Peak Element', difficulty: 'medium', acceptanceRate: 50.0 },
  { leetcodeId: 198, title: 'House Robber', difficulty: 'medium', acceptanceRate: 52.8 },
  { leetcodeId: 200, title: 'Number of Islands', difficulty: 'medium', acceptanceRate: 63.0, starred: true },
  { leetcodeId: 215, title: 'Kth Largest Element in an Array', difficulty: 'medium', acceptanceRate: 68.9, starred: true },
  { leetcodeId: 221, title: 'Maximal Square', difficulty: 'medium', acceptanceRate: 48.4 },
  { leetcodeId: 230, title: 'Kth Smallest Element in a BST', difficulty: 'medium', acceptanceRate: 71.6 },
  { leetcodeId: 238, title: 'Product of Array Except Self', difficulty: 'medium', acceptanceRate: 68.1, starred: true },
  { leetcodeId: 253, title: 'Meeting Rooms II', difficulty: 'medium', acceptanceRate: 51.8, isPremium: true },
  { leetcodeId: 300, title: 'Longest Increasing Subsequence', difficulty: 'medium', acceptanceRate: 54.6 },
  { leetcodeId: 322, title: 'Coin Change', difficulty: 'medium', acceptanceRate: 47.7, starred: true },
  { leetcodeId: 347, title: 'Top K Frequent Elements', difficulty: 'medium', acceptanceRate: 65.2, starred: true },
  { leetcodeId: 402, title: 'Remove K Digits', difficulty: 'medium', acceptanceRate: 73.6 },
  { leetcodeId: 416, title: 'Partition Equal Subset Sum', difficulty: 'medium', acceptanceRate: 47.6 },
  { leetcodeId: 528, title: 'Random Pick with Weight', difficulty: 'medium', acceptanceRate: 48.6 },
  { leetcodeId: 560, title: 'Subarray Sum Equals K', difficulty: 'medium', acceptanceRate: 48.1, starred: true },
  { leetcodeId: 647, title: 'Palindromic Substrings', difficulty: 'medium', acceptanceRate: 72.1 },
  { leetcodeId: 697, title: 'Degree of an Array', difficulty: 'medium', acceptanceRate: 57.7 },
  { leetcodeId: 713, title: 'Subarray Product Less Than K', difficulty: 'medium', acceptanceRate: 53.4 },
  { leetcodeId: 735, title: 'Asteroid Collision', difficulty: 'medium', acceptanceRate: 46.1 },
  { leetcodeId: 767, title: 'Reorganize String', difficulty: 'medium', acceptanceRate: 56.9 },
  { leetcodeId: 801, title: 'Minimum Swaps To Make Sequences Increasing', difficulty: 'medium', acceptanceRate: 62.4 },
  { leetcodeId: 875, title: 'Koko Eating Bananas', difficulty: 'medium', acceptanceRate: 63.1 },
  { leetcodeId: 894, title: 'All Possible Full Binary Trees', difficulty: 'medium', acceptanceRate: 85.4 },
  { leetcodeId: 945, title: 'Minimum Increment to Make Array Unique', difficulty: 'medium', acceptanceRate: 63.0, starred: true },
  { leetcodeId: 1010, title: 'Pairs of Songs With Total Durations Divisible by 60', difficulty: 'medium', acceptanceRate: 53.8 },
  { leetcodeId: 1060, title: 'Missing Element in Sorted Array', difficulty: 'medium', acceptanceRate: 58.2, isPremium: true },
  { leetcodeId: 1188, title: 'Design Bounded Blocking Queue', difficulty: 'medium', acceptanceRate: 73.4, isPremium: true },
  { leetcodeId: 1229, title: 'Meeting Scheduler', difficulty: 'medium', acceptanceRate: 53.2, isPremium: true },
  { leetcodeId: 1268, title: 'Search Suggestions System', difficulty: 'medium', acceptanceRate: 65.1, starred: true },
  { leetcodeId: 1283, title: 'Find the Smallest Divisor Given a Threshold', difficulty: 'medium', acceptanceRate: 64.7 },
  { leetcodeId: 1353, title: 'Maximum Number of Events That Can Be Attended', difficulty: 'medium', acceptanceRate: 38.7 },
  { leetcodeId: 1358, title: 'Number of Substrings Containing All Three Characters', difficulty: 'medium', acceptanceRate: 73.1 },
  { leetcodeId: 1405, title: 'Longest Happy String', difficulty: 'medium', acceptanceRate: 70.7 },
  { leetcodeId: 1589, title: 'Maximum Sum Obtained of Any Permutation', difficulty: 'medium', acceptanceRate: 38.7 },
  { leetcodeId: 1644, title: 'Lowest Common Ancestor of a Binary Tree II', difficulty: 'medium', acceptanceRate: 54.8, isPremium: true },
  { leetcodeId: 1671, title: 'Minimum Number of Removals to Make Mountain Array', difficulty: 'medium', acceptanceRate: 58.4 },
  { leetcodeId: 1838, title: 'Frequency of the Most Frequent Element', difficulty: 'medium', acceptanceRate: 57.0 },
  { leetcodeId: 1963, title: 'Minimum Number of Swaps to Make the String Balanced', difficulty: 'medium', acceptanceRate: 78.1 },
  { leetcodeId: 2183, title: 'Count Array Pairs Divisible by K', difficulty: 'medium', acceptanceRate: 29.2 },
  { leetcodeId: 2302, title: 'Count Subarrays With Score Less Than K', difficulty: 'medium', acceptanceRate: 53.8 },
  { leetcodeId: 2380, title: 'Time Needed to Rearrange a Binary String', difficulty: 'medium', acceptanceRate: 53.9 },
  { leetcodeId: 2554, title: 'Maximum Number of Integers to Choose From a Range I', difficulty: 'medium', acceptanceRate: 47.6 },
  { leetcodeId: 2557, title: 'Maximum Number of Integers to Choose From a Range II', difficulty: 'medium', acceptanceRate: 35.3 },
  { leetcodeId: 2559, title: 'Count Vowel Strings in Ranges', difficulty: 'medium', acceptanceRate: 67.8 },
  { leetcodeId: 355, title: 'Design Twitter', difficulty: 'medium', acceptanceRate: 43.2 },
  { leetcodeId: 509, title: 'Fibonacci Number', difficulty: 'medium', acceptanceRate: 55.7 },
  { leetcodeId: 1046, title: 'Last Stone Weight', difficulty: 'medium', acceptanceRate: 66.1 },
  { leetcodeId: 148, title: 'Sort List', difficulty: 'medium', acceptanceRate: 60.7 },
  { leetcodeId: 130, title: 'Surrounded Regions', difficulty: 'medium', acceptanceRate: 50.0 },
  { leetcodeId: 31, title: 'Next Permutation', difficulty: 'medium', acceptanceRate: 37.7, starred: true },
  { leetcodeId: 1940, title: 'Longest Common Subsequence Between Sorted Arrays', difficulty: 'medium', acceptanceRate: 54.8, isPremium: true },
  { leetcodeId: 2060, title: 'Check if an Original String Exists Given Two Encoded Strings', difficulty: 'medium', acceptanceRate: 68.9, isPremium: true },
  { leetcodeId: 2491, title: 'Divide Players Into Teams of Equal Skill', difficulty: 'medium', acceptanceRate: 68.5 },

  // HARD PROBLEMS
  { leetcodeId: 4, title: 'Median of Two Sorted Arrays', difficulty: 'hard', acceptanceRate: 44.8, starred: true },
  { leetcodeId: 41, title: 'First Missing Positive', difficulty: 'hard', acceptanceRate: 41.8, starred: true },
  { leetcodeId: 42, title: 'Trapping Rain Water', difficulty: 'hard', acceptanceRate: 65.9, starred: true },
  { leetcodeId: 44, title: 'Wildcard Matching', difficulty: 'hard', acceptanceRate: 52.6 },
  { leetcodeId: 68, title: 'Text Justification', difficulty: 'hard', acceptanceRate: 49.9, starred: true },
  { leetcodeId: 72, title: 'Edit Distance', difficulty: 'hard', acceptanceRate: 55.4 },
  { leetcodeId: 76, title: 'Minimum Window Substring', difficulty: 'hard', acceptanceRate: 44.9, starred: true },
  { leetcodeId: 84, title: 'Largest Rectangle in Histogram', difficulty: 'hard', acceptanceRate: 47.3, starred: true },
  { leetcodeId: 124, title: 'Binary Tree Maximum Path Sum', difficulty: 'hard', acceptanceRate: 41.8 },
  { leetcodeId: 212, title: 'Word Search II', difficulty: 'hard', acceptanceRate: 37.8, starred: true },
  { leetcodeId: 297, title: 'Serialize and Deserialize Binary Tree', difficulty: 'hard', acceptanceRate: 59.0 },
  { leetcodeId: 780, title: 'Reaching Points', difficulty: 'hard', acceptanceRate: 35.8 },
  { leetcodeId: 895, title: 'Maximum Frequency Stack', difficulty: 'hard', acceptanceRate: 68.3 },
  { leetcodeId: 1969, title: 'Minimum Non-Zero Product of the Array Elements', difficulty: 'hard', acceptanceRate: 38.7 },
  { leetcodeId: 1999, title: 'Smallest Greater Multiple Made of Two Digits', difficulty: 'hard', acceptanceRate: 48.2 },
  { leetcodeId: 2056, title: 'Number of Valid Move Combinations On Chessboard', difficulty: 'hard', acceptanceRate: 46.2 },
  { leetcodeId: 2183, title: 'Count Array Pairs Divisible by K', difficulty: 'hard', acceptanceRate: 29.2 },
  { leetcodeId: 2402, title: 'Meeting Rooms III', difficulty: 'hard', acceptanceRate: 48.9, starred: true },
  { leetcodeId: 2524, title: 'Maximum Frequency Score of a Subarray', difficulty: 'hard', acceptanceRate: 37.4 },
  { leetcodeId: 1676, title: 'Lowest Common Ancestor of a Binary Tree IV', difficulty: 'hard', acceptanceRate: 54.0, isPremium: true },
  { leetcodeId: 2628, title: 'JSON Deep Equal', difficulty: 'hard', acceptanceRate: 64.9 },
  { leetcodeId: 2940, title: 'Find Building Where Alice and Bob Can Meet', difficulty: 'hard', acceptanceRate: 64.7, starred: true },
];

/**
 * Get problems by difficulty
 */
export function getPayPalProblemsByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): PayPalProblem[] {
  return paypalFrequentProblems.filter((p) => p.difficulty === difficulty);
}

/**
 * Get starred/important PayPal problems
 */
export function getStarredPayPalProblems(): PayPalProblem[] {
  return paypalFrequentProblems.filter((p) => p.starred);
}

/**
 * Get premium problems
 */
export function getPremiumPayPalProblems(): PayPalProblem[] {
  return paypalFrequentProblems.filter((p) => p.isPremium);
}

/**
 * Search PayPal problems by title
 */
export function searchPayPalProblems(query: string): PayPalProblem[] {
  const lowerQuery = query.toLowerCase();
  return paypalFrequentProblems.filter((p) =>
    p.title.toLowerCase().includes(lowerQuery) || p.leetcodeId.toString().includes(lowerQuery)
  );
}

/**
 * Get problem statistics
 */
export function getPayPalProblemStats() {
  const total = paypalFrequentProblems.length;
  const easy = paypalFrequentProblems.filter((p) => p.difficulty === 'easy').length;
  const medium = paypalFrequentProblems.filter((p) => p.difficulty === 'medium').length;
  const hard = paypalFrequentProblems.filter((p) => p.difficulty === 'hard').length;
  const starred = paypalFrequentProblems.filter((p) => p.starred).length;
  const premium = paypalFrequentProblems.filter((p) => p.isPremium).length;

  return { total, easy, medium, hard, starred, premium };
}
