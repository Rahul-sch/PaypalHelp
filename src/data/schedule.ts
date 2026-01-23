import type { PatternCategory } from '../types/pattern';

export interface ScheduleTask {
  id: string;
  title: string;
  description: string;
  duration: number; // minutes
  type: 'python' | 'pattern' | 'problem' | 'verbal' | 'android' | 'review' | 'mock' | 'boss';
  link?: string; // Optional link to resource
  patternId?: PatternCategory;
  problemId?: number;
  xpReward: number;
}

export interface DaySchedule {
  day: number;
  title: string;
  focus: string;
  description: string;
  totalHours: number;
  tasks: {
    morning: ScheduleTask[];
    afternoon: ScheduleTask[];
    evening: ScheduleTask[];
  };
  bossBattle?: {
    title: string;
    description: string;
    challenges: string[];
    xpReward: number;
  };
}

export const battlePlanSchedule: DaySchedule[] = [
  {
    day: 1,
    title: 'Foundation Day',
    focus: 'Python Fundamentals + Array Patterns',
    description: 'Build a solid foundation with Python basics and essential array patterns',
    totalHours: 8,
    tasks: {
      morning: [
        {
          id: 'd1-m1',
          title: 'Python Crash Course: Basics',
          description: 'Variables, types, operators, f-strings',
          duration: 60,
          type: 'python',
          link: '/python',
          xpReward: 50,
        },
        {
          id: 'd1-m2',
          title: 'Python Crash Course: Control Flow',
          description: 'If/elif/else, loops, break/continue',
          duration: 45,
          type: 'python',
          link: '/python',
          xpReward: 50,
        },
        {
          id: 'd1-m3',
          title: 'Prefix Sum Pattern',
          description: 'Learn the prefix sum technique',
          duration: 45,
          type: 'pattern',
          patternId: 'prefix-sum',
          link: '/patterns',
          xpReward: 75,
        },
      ],
      afternoon: [
        {
          id: 'd1-a1',
          title: 'Two Pointers Pattern',
          description: 'Master the two-pointer technique',
          duration: 60,
          type: 'pattern',
          patternId: 'two-pointers',
          link: '/patterns',
          xpReward: 75,
        },
        {
          id: 'd1-a2',
          title: 'Solve: Two Sum',
          description: 'Apply hash map technique',
          duration: 30,
          type: 'problem',
          problemId: 1,
          link: '/problems',
          xpReward: 100,
        },
        {
          id: 'd1-a3',
          title: 'UMPIRE Practice: Two Sum',
          description: 'Verbally walk through the solution',
          duration: 15,
          type: 'verbal',
          link: '/verbal',
          xpReward: 30,
        },
      ],
      evening: [
        {
          id: 'd1-e1',
          title: 'Sliding Window Pattern',
          description: 'Learn fixed and dynamic windows',
          duration: 60,
          type: 'pattern',
          patternId: 'sliding-window',
          link: '/patterns',
          xpReward: 75,
        },
        {
          id: 'd1-e2',
          title: 'Solve: Longest Substring Without Repeating',
          description: 'Apply sliding window',
          duration: 45,
          type: 'problem',
          problemId: 3,
          link: '/problems',
          xpReward: 100,
        },
        {
          id: 'd1-e3',
          title: 'Review Day 1',
          description: 'Review all patterns learned today',
          duration: 30,
          type: 'review',
          xpReward: 25,
        },
      ],
    },
    bossBattle: {
      title: 'The Array Apprentice',
      description: 'Prove your mastery of array patterns',
      challenges: [
        'Solve a random array problem in 25 minutes',
        'Explain Two Pointers verbally using UMPIRE',
        'Write Sliding Window template from memory',
      ],
      xpReward: 500,
    },
  },
  {
    day: 2,
    title: 'Data Structures Day',
    focus: 'Python Collections + Stack/Linked List',
    description: 'Master Python data structures and their algorithmic applications',
    totalHours: 8,
    tasks: {
      morning: [
        {
          id: 'd2-m1',
          title: 'Python: Data Structures',
          description: 'Lists, dicts, sets, tuples, comprehensions',
          duration: 60,
          type: 'python',
          link: '/python',
          xpReward: 50,
        },
        {
          id: 'd2-m2',
          title: 'Python: Collections Module',
          description: 'Counter, defaultdict, deque',
          duration: 45,
          type: 'python',
          link: '/python',
          xpReward: 50,
        },
        {
          id: 'd2-m3',
          title: 'Review: Array Patterns',
          description: 'Quick review of Day 1 patterns',
          duration: 30,
          type: 'review',
          xpReward: 25,
        },
      ],
      afternoon: [
        {
          id: 'd2-a1',
          title: 'Monotonic Stack Pattern',
          description: 'Learn stack-based problem solving',
          duration: 60,
          type: 'pattern',
          patternId: 'monotonic-stack',
          link: '/patterns',
          xpReward: 75,
        },
        {
          id: 'd2-a2',
          title: 'Solve: Largest Rectangle in Histogram',
          description: 'Classic monotonic stack problem',
          duration: 45,
          type: 'problem',
          problemId: 84,
          link: '/problems',
          xpReward: 150,
        },
        {
          id: 'd2-a3',
          title: 'Linked List Patterns',
          description: 'Fast-slow pointers, reversal',
          duration: 45,
          type: 'pattern',
          patternId: 'fast-slow-pointers',
          link: '/patterns',
          xpReward: 75,
        },
      ],
      evening: [
        {
          id: 'd2-e1',
          title: 'Android: Activity Lifecycle',
          description: 'Learn the 7 lifecycle methods',
          duration: 45,
          type: 'android',
          link: '/android',
          xpReward: 40,
        },
        {
          id: 'd2-e2',
          title: 'UMPIRE Practice Session',
          description: 'Practice verbal explanations',
          duration: 30,
          type: 'verbal',
          link: '/verbal',
          xpReward: 30,
        },
        {
          id: 'd2-e3',
          title: 'Review Day 2',
          description: 'Review stacks and linked lists',
          duration: 30,
          type: 'review',
          xpReward: 25,
        },
      ],
    },
    bossBattle: {
      title: 'The Stack Master',
      description: 'Conquer stack and linked list challenges',
      challenges: [
        'Explain when to use monotonic stack',
        'Solve a linked list problem in 20 minutes',
        'Draw Activity lifecycle from memory',
      ],
      xpReward: 500,
    },
  },
  {
    day: 3,
    title: 'Tree Day',
    focus: 'Binary Trees + DFS/BFS',
    description: 'Master tree traversals and tree-based problem solving',
    totalHours: 8,
    tasks: {
      morning: [
        {
          id: 'd3-m1',
          title: 'BFS Pattern',
          description: 'Level-order traversal and applications',
          duration: 60,
          type: 'pattern',
          patternId: 'bfs',
          link: '/patterns',
          xpReward: 75,
        },
        {
          id: 'd3-m2',
          title: 'DFS Pattern',
          description: 'Pre/in/post order traversals',
          duration: 60,
          type: 'pattern',
          patternId: 'dfs',
          link: '/patterns',
          xpReward: 75,
        },
        {
          id: 'd3-m3',
          title: 'Solve: Number of Islands',
          description: 'Apply BFS/DFS on grid',
          duration: 45,
          type: 'problem',
          problemId: 200,
          link: '/problems',
          xpReward: 100,
        },
      ],
      afternoon: [
        {
          id: 'd3-a1',
          title: 'Solve: Construct Binary Tree',
          description: 'Build tree from traversals',
          duration: 45,
          type: 'problem',
          problemId: 105,
          link: '/problems',
          xpReward: 100,
        },
        {
          id: 'd3-a2',
          title: 'Tree Problem Practice',
          description: 'Additional tree problems',
          duration: 60,
          type: 'problem',
          link: '/problems',
          xpReward: 75,
        },
        {
          id: 'd3-a3',
          title: 'UMPIRE: Tree Problems',
          description: 'Practice explaining tree solutions',
          duration: 30,
          type: 'verbal',
          link: '/verbal',
          xpReward: 30,
        },
      ],
      evening: [
        {
          id: 'd3-e1',
          title: 'Android: Fragment Lifecycle',
          description: 'Fragment vs Activity lifecycle',
          duration: 45,
          type: 'android',
          link: '/android',
          xpReward: 40,
        },
        {
          id: 'd3-e2',
          title: 'Android: MVVM Architecture',
          description: 'ViewModel, LiveData basics',
          duration: 45,
          type: 'android',
          link: '/android',
          xpReward: 40,
        },
        {
          id: 'd3-e3',
          title: 'Review Day 3',
          description: 'Review tree patterns',
          duration: 30,
          type: 'review',
          xpReward: 25,
        },
      ],
    },
    bossBattle: {
      title: 'The Tree Titan',
      description: 'Prove your tree traversal mastery',
      challenges: [
        'Solve a medium tree problem in 25 minutes',
        'Explain DFS vs BFS trade-offs',
        'Implement both iterative and recursive DFS',
      ],
      xpReward: 500,
    },
  },
  {
    day: 4,
    title: 'Advanced Patterns Day',
    focus: 'Heap + Binary Search + Backtracking',
    description: 'Master advanced algorithmic patterns',
    totalHours: 8,
    tasks: {
      morning: [
        {
          id: 'd4-m1',
          title: 'Top K Elements Pattern',
          description: 'Heap-based problem solving',
          duration: 60,
          type: 'pattern',
          patternId: 'top-k-elements',
          link: '/patterns',
          xpReward: 75,
        },
        {
          id: 'd4-m2',
          title: 'Solve: Kth Largest Element',
          description: 'Apply heap pattern',
          duration: 45,
          type: 'problem',
          problemId: 215,
          link: '/problems',
          xpReward: 100,
        },
        {
          id: 'd4-m3',
          title: 'Binary Search Pattern',
          description: 'Search in sorted arrays and beyond',
          duration: 60,
          type: 'pattern',
          patternId: 'binary-search',
          link: '/patterns',
          xpReward: 75,
        },
      ],
      afternoon: [
        {
          id: 'd4-a1',
          title: 'Solve: Find First and Last Position',
          description: 'Binary search boundaries',
          duration: 45,
          type: 'problem',
          problemId: 34,
          link: '/problems',
          xpReward: 100,
        },
        {
          id: 'd4-a2',
          title: 'Solve: Find Smallest Divisor',
          description: 'Binary search on answer',
          duration: 45,
          type: 'problem',
          problemId: 1283,
          link: '/problems',
          xpReward: 100,
        },
        {
          id: 'd4-a3',
          title: 'Backtracking Pattern',
          description: 'Generate combinations/permutations',
          duration: 60,
          type: 'pattern',
          patternId: 'backtracking',
          link: '/patterns',
          xpReward: 75,
        },
      ],
      evening: [
        {
          id: 'd4-e1',
          title: 'Solve: Subsets',
          description: 'Classic backtracking problem',
          duration: 45,
          type: 'problem',
          problemId: 78,
          link: '/problems',
          xpReward: 100,
        },
        {
          id: 'd4-e2',
          title: 'Android: RecyclerView',
          description: 'ViewHolder, Adapter patterns',
          duration: 45,
          type: 'android',
          link: '/android',
          xpReward: 40,
        },
        {
          id: 'd4-e3',
          title: 'Review Day 4',
          description: 'Review advanced patterns',
          duration: 30,
          type: 'review',
          xpReward: 25,
        },
      ],
    },
    bossBattle: {
      title: 'The Pattern Champion',
      description: 'Master advanced algorithmic patterns',
      challenges: [
        'Implement binary search for rotated sorted array',
        'Generate all valid parentheses using backtracking',
        'Explain heap vs quickselect for Top K',
      ],
      xpReward: 500,
    },
  },
  {
    day: 5,
    title: 'Dynamic Programming Day',
    focus: 'DP Fundamentals + Interval Patterns',
    description: 'Conquer dynamic programming and interval problems',
    totalHours: 8,
    tasks: {
      morning: [
        {
          id: 'd5-m1',
          title: 'Dynamic Programming Pattern',
          description: 'Memoization vs tabulation',
          duration: 90,
          type: 'pattern',
          patternId: 'dynamic-programming',
          link: '/patterns',
          xpReward: 100,
        },
        {
          id: 'd5-m2',
          title: 'Solve: Partition Equal Subset Sum',
          description: 'Classic DP problem',
          duration: 60,
          type: 'problem',
          problemId: 416,
          link: '/problems',
          xpReward: 150,
        },
      ],
      afternoon: [
        {
          id: 'd5-a1',
          title: 'Merge Intervals Pattern',
          description: 'Interval manipulation techniques',
          duration: 45,
          type: 'pattern',
          patternId: 'merge-intervals',
          link: '/patterns',
          xpReward: 75,
        },
        {
          id: 'd5-a2',
          title: 'Solve: Meeting Rooms II',
          description: 'Classic interval problem',
          duration: 45,
          type: 'problem',
          problemId: 253,
          link: '/problems',
          xpReward: 150,
        },
        {
          id: 'd5-a3',
          title: 'UMPIRE: DP Problems',
          description: 'Practice explaining DP solutions',
          duration: 45,
          type: 'verbal',
          link: '/verbal',
          xpReward: 40,
        },
      ],
      evening: [
        {
          id: 'd5-e1',
          title: 'Android: Coroutines Basics',
          description: 'async/await, suspend functions',
          duration: 45,
          type: 'android',
          link: '/android',
          xpReward: 40,
        },
        {
          id: 'd5-e2',
          title: 'DP Practice Problems',
          description: 'Additional DP practice',
          duration: 60,
          type: 'problem',
          link: '/problems',
          xpReward: 75,
        },
        {
          id: 'd5-e3',
          title: 'Review Day 5',
          description: 'Review DP patterns',
          duration: 30,
          type: 'review',
          xpReward: 25,
        },
      ],
    },
    bossBattle: {
      title: 'The DP Dragon',
      description: 'Slay dynamic programming challenges',
      challenges: [
        'Identify DP state and transitions for a new problem',
        'Convert memoization to tabulation',
        'Explain time/space complexity of DP solution',
      ],
      xpReward: 500,
    },
  },
  {
    day: 6,
    title: 'Mock Interview Day',
    focus: 'Full Practice + Weak Area Review',
    description: 'Simulate real interview conditions',
    totalHours: 8,
    tasks: {
      morning: [
        {
          id: 'd6-m1',
          title: 'Mock Interview #1',
          description: '45-minute timed session',
          duration: 60,
          type: 'mock',
          link: '/verbal',
          xpReward: 150,
        },
        {
          id: 'd6-m2',
          title: 'Review Mock #1',
          description: 'Analyze performance',
          duration: 30,
          type: 'review',
          xpReward: 25,
        },
        {
          id: 'd6-m3',
          title: 'Weak Pattern Practice',
          description: 'Focus on identified weaknesses',
          duration: 60,
          type: 'pattern',
          link: '/patterns',
          xpReward: 50,
        },
      ],
      afternoon: [
        {
          id: 'd6-a1',
          title: 'Mock Interview #2',
          description: '45-minute timed session',
          duration: 60,
          type: 'mock',
          link: '/verbal',
          xpReward: 150,
        },
        {
          id: 'd6-a2',
          title: 'Review Mock #2',
          description: 'Analyze performance',
          duration: 30,
          type: 'review',
          xpReward: 25,
        },
        {
          id: 'd6-a3',
          title: 'Speed Run: Patterns',
          description: 'Quick pattern recognition',
          duration: 45,
          type: 'pattern',
          link: '/speed',
          xpReward: 75,
        },
      ],
      evening: [
        {
          id: 'd6-e1',
          title: 'Android: Security Basics',
          description: 'Permissions, ProGuard, encryption',
          duration: 45,
          type: 'android',
          link: '/android',
          xpReward: 40,
        },
        {
          id: 'd6-e2',
          title: 'Full Pattern Review',
          description: 'Review all 15 patterns',
          duration: 60,
          type: 'review',
          link: '/patterns',
          xpReward: 50,
        },
        {
          id: 'd6-e3',
          title: 'Rest & Mental Prep',
          description: 'Light review, early rest',
          duration: 30,
          type: 'review',
          xpReward: 25,
        },
      ],
    },
    bossBattle: {
      title: 'The Mock Master',
      description: 'Excel under interview pressure',
      challenges: [
        'Complete mock interview with 80%+ score',
        'Explain solution without hesitation',
        'Handle follow-up questions smoothly',
      ],
      xpReward: 500,
    },
  },
  {
    day: 7,
    title: 'Interview Day!',
    focus: 'Final Prep + Confidence Building',
    description: 'Your PayPal interviews are today!',
    totalHours: 4,
    tasks: {
      morning: [
        {
          id: 'd7-m1',
          title: 'Light Review',
          description: 'Quick pattern templates review',
          duration: 30,
          type: 'review',
          link: '/patterns',
          xpReward: 25,
        },
        {
          id: 'd7-m2',
          title: 'UMPIRE Warm-up',
          description: 'Practice one easy problem verbally',
          duration: 20,
          type: 'verbal',
          link: '/verbal',
          xpReward: 20,
        },
        {
          id: 'd7-m3',
          title: 'Technical Setup Check',
          description: 'Test camera, mic, IDE',
          duration: 15,
          type: 'review',
          xpReward: 10,
        },
        {
          id: 'd7-m4',
          title: 'Round 1: Jake Foster',
          description: '12:00 PM EST - Good luck!',
          duration: 60,
          type: 'mock',
          xpReward: 500,
        },
      ],
      afternoon: [
        {
          id: 'd7-a1',
          title: 'Break & Refresh',
          description: 'Rest between rounds',
          duration: 30,
          type: 'review',
          xpReward: 10,
        },
        {
          id: 'd7-a2',
          title: 'Quick Android Review',
          description: 'If needed for Round 2',
          duration: 30,
          type: 'android',
          link: '/android',
          xpReward: 20,
        },
        {
          id: 'd7-a3',
          title: 'Round 2: Andres Santana',
          description: '3:00 PM EST - You got this!',
          duration: 60,
          type: 'mock',
          xpReward: 500,
        },
      ],
      evening: [
        {
          id: 'd7-e1',
          title: 'Celebrate!',
          description: "You've completed your prep journey!",
          duration: 0,
          type: 'review',
          xpReward: 1000,
        },
      ],
    },
    bossBattle: {
      title: 'The PayPal Champion',
      description: 'Complete your PayPal interview journey',
      challenges: [
        'Complete both interview rounds',
        'Apply UMPIRE framework effectively',
        'Show enthusiasm and ask great questions',
      ],
      xpReward: 2000,
    },
  },
];

export function getScheduleForDay(day: number): DaySchedule | undefined {
  return battlePlanSchedule.find((s) => s.day === day);
}

export function getAllTasks(): ScheduleTask[] {
  const tasks: ScheduleTask[] = [];
  for (const day of battlePlanSchedule) {
    tasks.push(...day.tasks.morning);
    tasks.push(...day.tasks.afternoon);
    tasks.push(...day.tasks.evening);
  }
  return tasks;
}

export function getTaskById(taskId: string): ScheduleTask | undefined {
  return getAllTasks().find((t) => t.id === taskId);
}

export function getTotalTasksForDay(day: number): number {
  const schedule = getScheduleForDay(day);
  if (!schedule) return 0;
  return (
    schedule.tasks.morning.length +
    schedule.tasks.afternoon.length +
    schedule.tasks.evening.length
  );
}
