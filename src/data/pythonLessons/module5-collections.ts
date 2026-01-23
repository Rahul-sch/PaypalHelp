import type { PythonModule } from '../../types';

export const module5Collections: PythonModule = {
  id: 'module-5-collections',
  title: 'Collections Module',
  description: 'Counter, defaultdict, deque, and other specialized containers',
  icon: 'Package',
  order: 5,
  lessons: [
    {
      id: 'lesson-5-1',
      moduleId: 'module-5-collections',
      title: 'Counter',
      content: `\`Counter\` is a dict subclass for counting hashable objects. Essential for frequency counting problems.

**Key Methods:**
- \`most_common(n)\`: Top n most common elements
- \`elements()\`: Iterator over elements (count times each)
- Arithmetic: +, -, &, | operations between counters`,
      codeExamples: [
        {
          id: 'ex-5-1-1',
          title: 'Counter Basics',
          code: `from collections import Counter

# Count elements
letters = Counter("mississippi")
print(f"Counter: {letters}")
print(f"Count of 'i': {letters['i']}")
print(f"Count of 'x' (missing): {letters['x']}")  # Returns 0

# From list
words = ['apple', 'banana', 'apple', 'cherry', 'banana', 'apple']
word_counts = Counter(words)
print(f"Word counts: {word_counts}")

# Most common
print(f"Top 2: {word_counts.most_common(2)}")

# Update counts
word_counts.update(['apple', 'date'])
print(f"After update: {word_counts}")

# Subtract counts
word_counts.subtract(['apple', 'apple'])
print(f"After subtract: {word_counts}")

# Total count
print(f"Total: {sum(word_counts.values())}")`,
          language: 'python',
          explanation: 'Counter returns 0 for missing keys (unlike regular dict). Perfect for frequency problems.',
          expectedOutput: `Counter: Counter({'i': 4, 's': 4, 'p': 2, 'm': 1})
Count of 'i': 4
Count of 'x' (missing): 0
Word counts: Counter({'apple': 3, 'banana': 2, 'cherry': 1})
Top 2: [('apple', 3), ('banana', 2)]
After update: Counter({'apple': 4, 'banana': 2, 'cherry': 1, 'date': 1})
After subtract: Counter({'apple': 2, 'banana': 2, 'cherry': 1, 'date': 1})
Total: 6`,
          isRunnable: true,
        },
        {
          id: 'ex-5-1-2',
          title: 'Counter Operations',
          code: `from collections import Counter

c1 = Counter(a=3, b=1)
c2 = Counter(a=1, b=2)

# Addition
print(f"c1 + c2: {c1 + c2}")

# Subtraction (keeps only positive)
print(f"c1 - c2: {c1 - c2}")

# Intersection (min of each)
print(f"c1 & c2: {c1 & c2}")

# Union (max of each)
print(f"c1 | c2: {c1 | c2}")

# Check if anagram
def is_anagram(s1, s2):
    return Counter(s1.lower().replace(" ", "")) == Counter(s2.lower().replace(" ", ""))

print(f"'listen' anagram of 'silent': {is_anagram('listen', 'silent')}")
print(f"'hello' anagram of 'world': {is_anagram('hello', 'world')}")

# Most frequent character
text = "aabbbcccc"
most_frequent = Counter(text).most_common(1)[0]
print(f"Most frequent in '{text}': {most_frequent}")`,
          language: 'python',
          explanation: 'Counter arithmetic is useful for comparing histograms. Anagram checking is a classic Counter use case.',
          expectedOutput: `c1 + c2: Counter({'a': 4, 'b': 3})
c1 - c2: Counter({'a': 2})
c1 & c2: Counter({'a': 1, 'b': 1})
c1 | c2: Counter({'a': 3, 'b': 2})
'listen' anagram of 'silent': True
'hello' anagram of 'world': False
Most frequent in 'aabbbcccc': ('c', 4)`,
          isRunnable: true,
        },
      ],
      keyPoints: [
        'Counter returns 0 for missing keys, not KeyError',
        'most_common(n) returns list of (element, count) tuples',
        'Counter comparison is perfect for anagram checking',
        '+, -, &, | work between Counters',
      ],
    },
    {
      id: 'lesson-5-2',
      moduleId: 'module-5-collections',
      title: 'defaultdict',
      content: `\`defaultdict\` provides a default value for missing keys, eliminating key existence checks.

**Common defaults:**
- \`int\`: 0 (for counting)
- \`list\`: [] (for grouping)
- \`set\`: set() (for unique grouping)
- Custom factory function`,
      codeExamples: [
        {
          id: 'ex-5-2-1',
          title: 'defaultdict Basics',
          code: `from collections import defaultdict

# defaultdict with int (counting)
counts = defaultdict(int)
for char in "hello":
    counts[char] += 1  # No need to check if key exists
print(f"Counts: {dict(counts)}")

# Compare with regular dict
regular = {}
for char in "hello":
    # Without defaultdict, need this:
    # if char not in regular:
    #     regular[char] = 0
    regular[char] = regular.get(char, 0) + 1
print(f"Regular dict: {regular}")

# defaultdict with list (grouping)
groups = defaultdict(list)
words = [("fruit", "apple"), ("fruit", "banana"), ("veg", "carrot")]
for category, item in words:
    groups[category].append(item)
print(f"Groups: {dict(groups)}")

# defaultdict with set (unique grouping)
unique_groups = defaultdict(set)
pairs = [("a", 1), ("a", 2), ("a", 1), ("b", 3)]
for key, val in pairs:
    unique_groups[key].add(val)
print(f"Unique groups: {dict(unique_groups)}")`,
          language: 'python',
          explanation: 'defaultdict eliminates boilerplate key existence checks. Choose the factory based on your use case.',
          expectedOutput: `Counts: {'h': 1, 'e': 1, 'l': 2, 'o': 1}
Regular dict: {'h': 1, 'e': 1, 'l': 2, 'o': 1}
Groups: {'fruit': ['apple', 'banana'], 'veg': ['carrot']}
Unique groups: {'a': {1, 2}, 'b': {3}}`,
          isRunnable: true,
        },
        {
          id: 'ex-5-2-2',
          title: 'Graph Adjacency List',
          code: `from collections import defaultdict

# Building a graph (adjacency list)
edges = [(0, 1), (0, 2), (1, 2), (2, 3)]

# Using defaultdict
graph = defaultdict(list)
for u, v in edges:
    graph[u].append(v)
    graph[v].append(u)  # For undirected graph

print("Adjacency list:")
for node in sorted(graph.keys()):
    print(f"  {node}: {graph[node]}")

# Get neighbors safely (even for non-existent nodes)
print(f"Neighbors of 0: {graph[0]}")
print(f"Neighbors of 99: {graph[99]}")  # Returns [], no error

# Nested defaultdict (2D structure)
matrix = defaultdict(lambda: defaultdict(int))
matrix[0][1] = 5
matrix[1][2] = 10
print(f"matrix[0][1]: {matrix[0][1]}")
print(f"matrix[99][99]: {matrix[99][99]}")  # 0, no error

# Word grouping by first letter
words = ["apple", "ant", "banana", "bear", "cat"]
by_letter = defaultdict(list)
for word in words:
    by_letter[word[0]].append(word)
print(f"By first letter: {dict(by_letter)}")`,
          language: 'python',
          explanation: 'defaultdict is perfect for graphs and grouping operations. Nested defaultdict handles 2D sparse data.',
          expectedOutput: `Adjacency list:
  0: [1, 2]
  1: [0, 2]
  2: [0, 1, 3]
  3: [2]
Neighbors of 0: [1, 2]
Neighbors of 99: []
matrix[0][1]: 5
matrix[99][99]: 0
By first letter: {'a': ['apple', 'ant'], 'b': ['banana', 'bear'], 'c': ['cat']}`,
          isRunnable: true,
        },
      ],
      keyPoints: [
        'defaultdict(int) for counting, defaultdict(list) for grouping',
        'Accessing missing key creates it with default value',
        'Use lambda for nested defaultdict',
        'Perfect for building graphs and adjacency lists',
      ],
    },
    {
      id: 'lesson-5-3',
      moduleId: 'module-5-collections',
      title: 'deque',
      content: `\`deque\` (double-ended queue) provides O(1) operations at both ends.

**Advantages over list:**
- O(1) append/pop from both ends
- Thread-safe
- Optional maxlen for bounded queues

**Use cases:** BFS, sliding windows, recent items cache`,
      codeExamples: [
        {
          id: 'ex-5-3-1',
          title: 'deque Basics',
          code: `from collections import deque

# Create deque
d = deque([1, 2, 3])
print(f"Deque: {d}")

# Add to both ends - O(1)
d.append(4)        # Right end
d.appendleft(0)    # Left end
print(f"After appends: {d}")

# Remove from both ends - O(1)
right = d.pop()       # From right
left = d.popleft()    # From left
print(f"Popped: left={left}, right={right}")
print(f"After pops: {d}")

# Compare with list (O(n) for left operations)
# list.insert(0, x) is O(n)
# list.pop(0) is O(n)

# Rotate
d = deque([1, 2, 3, 4, 5])
d.rotate(2)   # Rotate right by 2
print(f"Rotate right 2: {d}")
d.rotate(-2)  # Rotate left by 2
print(f"Rotate left 2: {d}")

# Extend both ends
d.extend([6, 7])
d.extendleft([0, -1])  # Note: inserted in reverse order
print(f"After extends: {d}")`,
          language: 'python',
          explanation: 'deque is much faster than list for operations at the beginning. Essential for BFS.',
          expectedOutput: `Deque: deque([1, 2, 3])
After appends: deque([0, 1, 2, 3, 4])
Popped: left=0, right=4
After pops: deque([1, 2, 3])
Rotate right 2: deque([4, 5, 1, 2, 3])
Rotate left 2: deque([1, 2, 3, 4, 5])
After extends: deque([-1, 0, 1, 2, 3, 4, 5, 6, 7])`,
          isRunnable: true,
        },
        {
          id: 'ex-5-3-2',
          title: 'deque Use Cases',
          code: `from collections import deque

# BFS using deque
def bfs_levels(graph, start):
    """BFS returning nodes by level."""
    visited = {start}
    queue = deque([start])
    levels = []

    while queue:
        level_size = len(queue)
        level = []
        for _ in range(level_size):
            node = queue.popleft()  # O(1)
            level.append(node)
            for neighbor in graph.get(node, []):
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)
        levels.append(level)

    return levels

graph = {0: [1, 2], 1: [3], 2: [3], 3: []}
print(f"BFS levels from 0: {bfs_levels(graph, 0)}")

# Bounded deque (maxlen) - keeps last n items
recent = deque(maxlen=3)
for i in range(5):
    recent.append(i)
    print(f"After adding {i}: {list(recent)}")

# Sliding window maximum helper
def sliding_window_max(nums, k):
    """Max in each window of size k."""
    d = deque()  # Stores indices
    result = []

    for i, num in enumerate(nums):
        # Remove elements outside window
        while d and d[0] <= i - k:
            d.popleft()
        # Remove smaller elements
        while d and nums[d[-1]] < num:
            d.pop()
        d.append(i)

        if i >= k - 1:
            result.append(nums[d[0]])

    return result

nums = [1, 3, -1, -3, 5, 3, 6, 7]
print(f"Sliding max (k=3): {sliding_window_max(nums, 3)}")`,
          language: 'python',
          explanation: 'deque is essential for BFS (O(1) popleft). maxlen creates auto-trimming bounded queues.',
          expectedOutput: `BFS levels from 0: [[0], [1, 2], [3]]
After adding 0: [0]
After adding 1: [0, 1]
After adding 2: [0, 1, 2]
After adding 3: [1, 2, 3]
After adding 4: [2, 3, 4]
Sliding max (k=3): [3, 3, 5, 5, 6, 7]`,
          isRunnable: true,
        },
      ],
      keyPoints: [
        'deque provides O(1) append/pop at both ends',
        'Use popleft() for BFS (not list.pop(0) which is O(n))',
        'maxlen creates bounded deque that auto-discards old items',
        'deque is ideal for sliding window problems',
      ],
    },
  ],
  quizzes: [
    {
      id: 'quiz-5',
      moduleId: 'module-5-collections',
      title: 'Collections Quiz',
      questions: [
        {
          id: 'q5-1',
          question: 'What does Counter("aab")["x"] return?',
          options: ['KeyError', 'None', '0', 'undefined'],
          correctAnswer: 2,
          explanation: 'Counter returns 0 for missing keys, unlike regular dict which raises KeyError.',
        },
        {
          id: 'q5-2',
          question: 'What is the time complexity of deque.popleft()?',
          options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
          correctAnswer: 0,
          explanation: 'deque provides O(1) operations at both ends, unlike list which is O(n) for pop(0).',
        },
        {
          id: 'q5-3',
          question: 'defaultdict(list) creates what for missing keys?',
          options: ['None', '[]', '0', 'KeyError'],
          correctAnswer: 1,
          explanation: 'defaultdict(list) calls list() for missing keys, creating empty list [].',
        },
        {
          id: 'q5-4',
          question: 'What does deque([1,2,3], maxlen=2) contain?',
          options: ['[1, 2, 3]', '[1, 2]', '[2, 3]', 'Error'],
          correctAnswer: 2,
          explanation: 'With maxlen=2, only the last 2 elements are kept: [2, 3].',
        },
        {
          id: 'q5-5',
          question: 'How do you get the most common element from Counter?',
          options: [
            'counter.max()',
            'counter.most_common(1)[0]',
            'max(counter)',
            'counter.top(1)',
          ],
          correctAnswer: 1,
          explanation: 'most_common(1) returns [(element, count)] for the top 1, so [0] gets the tuple.',
        },
      ],
    },
  ],
};
