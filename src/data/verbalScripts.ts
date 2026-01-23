export interface UMPIREScript {
  phase: 'understand' | 'match' | 'plan' | 'implement' | 'review' | 'evaluate';
  title: string;
  description: string;
  scripts: string[];
  tips: string[];
}

export const umpireScripts: UMPIREScript[] = [
  {
    phase: 'understand',
    title: 'Understand the Problem',
    description: 'Clarify the problem, inputs, outputs, and constraints before coding',
    scripts: [
      "Let me make sure I understand the problem correctly. We're given [input] and need to return [output].",
      "Before I start, I'd like to clarify a few things. What happens if [edge case]?",
      "Can I assume the input is always valid, or should I handle invalid inputs?",
      "What's the expected size of the input? This will help me think about time complexity.",
      "Let me repeat the problem back to you to make sure I understand: [restate problem].",
    ],
    tips: [
      "Don't rush - spending time understanding saves time later",
      'Ask about edge cases: empty input, single element, duplicates',
      'Clarify constraints: size limits, value ranges, sorted/unsorted',
      'Write down examples as you discuss them',
    ],
  },
  {
    phase: 'match',
    title: 'Match to Patterns',
    description: 'Identify which algorithm patterns might apply to this problem',
    scripts: [
      "This reminds me of [pattern name] problems because [reason].",
      "I see we need to find [target], which often suggests using [pattern].",
      "The constraint about [constraint] makes me think of [pattern] approach.",
      "Since we're dealing with [data structure], I'd consider [pattern].",
      "There are a few approaches we could take: [list options]. I think [choice] is best because [reason].",
    ],
    tips: [
      'Verbalize your thought process - interviewers want to see how you think',
      "It's okay to mention multiple patterns before choosing",
      'Explain WHY a pattern fits, not just WHICH one',
      'Connect the problem characteristics to pattern indicators',
    ],
  },
  {
    phase: 'plan',
    title: 'Plan the Approach',
    description: 'Outline your solution step by step before coding',
    scripts: [
      "Here's my approach at a high level: First, [step 1]. Then, [step 2]. Finally, [step 3].",
      "I'll use [data structure] to [purpose]. This will help because [reason].",
      "Let me walk through an example: Given [input], first we'd [step], which gives us [intermediate]...",
      "Before coding, let me trace through with the example: [trace through steps].",
      "The key insight is [insight]. This lets us [optimization].",
    ],
    tips: [
      'Plan BEFORE you code - this shows organization',
      'Walk through an example by hand to verify your approach',
      'Identify potential issues before they surprise you in code',
      'Get buy-in: "Does this approach make sense before I start coding?"',
    ],
  },
  {
    phase: 'implement',
    title: 'Implement the Solution',
    description: 'Write clean code while explaining your thought process',
    scripts: [
      "I'll start by initializing [data structure] for [purpose].",
      "This loop iterates through [collection] to [purpose].",
      "Here I'm checking [condition] to handle the edge case of [case].",
      "I'm using [technique] here because [reason].",
      "Let me add a comment here to clarify: [comment].",
    ],
    tips: [
      "Talk while you code - silence is uncomfortable for everyone",
      "Write clean, readable code even under pressure",
      "If you get stuck, verbalize it: 'I'm thinking about how to...'",
      "It's okay to write pseudocode first if it helps",
    ],
  },
  {
    phase: 'review',
    title: 'Review and Test',
    description: 'Trace through your code with examples and fix bugs',
    scripts: [
      "Let me trace through with our example: [trace through].",
      "For the edge case of [case], let's verify: [trace].",
      "I notice a potential issue here: [issue]. Let me fix that.",
      "The happy path works. Let me also check [edge case].",
      "Looking at my code, I want to double-check [area].",
    ],
    tips: [
      "Always test with at least one example",
      "Test edge cases: empty input, single element, duplicates",
      "Check boundary conditions and off-by-one errors",
      "If you find a bug, stay calm and fix it methodically",
    ],
  },
  {
    phase: 'evaluate',
    title: 'Evaluate Complexity',
    description: 'Analyze and explain the time and space complexity',
    scripts: [
      "The time complexity is O([complexity]) because [reason].",
      "The space complexity is O([complexity]) because we're using [data structure] that stores [what].",
      "The dominant factor in time complexity is [factor].",
      "We could potentially improve this to O([better]) by [optimization], but that would add complexity.",
      "In terms of tradeoffs, we're prioritizing [time/space] efficiency here.",
    ],
    tips: [
      "Always be ready to discuss complexity - it shows depth",
      "Mention tradeoffs if relevant",
      "If there's a better solution, mention it even if you didn't implement it",
      "Understand the difference between average and worst case",
    ],
  },
];

export interface ComplexityTemplate {
  id: string;
  title: string;
  complexity: string;
  explanation: string;
  examples: string[];
}

export const complexityTemplates: ComplexityTemplate[] = [
  {
    id: 'o1',
    title: 'Constant Time',
    complexity: 'O(1)',
    explanation: 'The operation takes the same time regardless of input size.',
    examples: [
      'Array index access: arr[i]',
      'Hash map lookup: map.get(key)',
      'Stack push/pop',
      'Math operations',
    ],
  },
  {
    id: 'ologn',
    title: 'Logarithmic Time',
    complexity: 'O(log n)',
    explanation: 'The input is divided in half each step, like binary search.',
    examples: [
      'Binary search',
      'Finding in balanced BST',
      'Heap operations',
      'Exponentiation by squaring',
    ],
  },
  {
    id: 'on',
    title: 'Linear Time',
    complexity: 'O(n)',
    explanation: 'We visit each element once.',
    examples: [
      'Single loop through array',
      'Two pointers (one pass)',
      'Linear search',
      'Building a hash map',
    ],
  },
  {
    id: 'onlogn',
    title: 'Linearithmic Time',
    complexity: 'O(n log n)',
    explanation: "We do O(log n) work for each of n elements, or we're sorting.",
    examples: [
      'Merge sort, Quick sort (average)',
      'Heap sort',
      'Building a balanced BST',
      'Some divide and conquer algorithms',
    ],
  },
  {
    id: 'on2',
    title: 'Quadratic Time',
    complexity: 'O(n²)',
    explanation: 'Nested loops where each iterates up to n times.',
    examples: [
      'Nested loops over array',
      'Bubble sort, Selection sort',
      'Checking all pairs',
      'Some DP problems',
    ],
  },
  {
    id: 'o2n',
    title: 'Exponential Time',
    complexity: 'O(2^n)',
    explanation: 'Each element doubles the work - usually means exploring all subsets.',
    examples: [
      'All subsets generation',
      'Recursive Fibonacci (naive)',
      'Backtracking without pruning',
      'Traveling salesman (brute force)',
    ],
  },
  {
    id: 'on!',
    title: 'Factorial Time',
    complexity: 'O(n!)',
    explanation: 'All permutations - grows extremely fast.',
    examples: [
      'All permutations generation',
      'Traveling salesman (all routes)',
      'Brute force combinatorics',
    ],
  },
];

export interface MockInterviewQuestion {
  id: string;
  category: 'behavioral' | 'technical' | 'system';
  question: string;
  tips: string[];
  followUps?: string[];
}

export const mockInterviewQuestions: MockInterviewQuestion[] = [
  {
    id: 'intro',
    category: 'behavioral',
    question: 'Tell me about yourself and your background.',
    tips: [
      'Keep it to 2-3 minutes',
      'Focus on relevant experience',
      'End with why you\'re excited about this role',
    ],
  },
  {
    id: 'project',
    category: 'behavioral',
    question: 'Tell me about a challenging technical project you worked on.',
    tips: [
      'Use STAR format: Situation, Task, Action, Result',
      'Quantify impact if possible',
      'Mention what you learned',
    ],
    followUps: [
      'What would you do differently?',
      'How did you handle disagreements?',
      'What was the biggest technical challenge?',
    ],
  },
  {
    id: 'conflict',
    category: 'behavioral',
    question: 'Describe a time you had a conflict with a teammate.',
    tips: [
      'Focus on resolution, not the conflict itself',
      'Show empathy and communication skills',
      'Demonstrate growth and learning',
    ],
  },
  {
    id: 'why-paypal',
    category: 'behavioral',
    question: 'Why do you want to work at PayPal?',
    tips: [
      'Research PayPal\'s mission and products',
      'Connect your goals to their work',
      'Be specific about what excites you',
    ],
  },
  {
    id: 'questions',
    category: 'behavioral',
    question: 'Do you have any questions for me?',
    tips: [
      'Always have 2-3 thoughtful questions prepared',
      'Ask about team, projects, growth opportunities',
      'Don\'t ask about salary in first rounds',
    ],
  },
];

export function getUMPIREByPhase(phase: string): UMPIREScript | undefined {
  return umpireScripts.find((s) => s.phase === phase);
}
