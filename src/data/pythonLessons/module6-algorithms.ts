import type { PythonModule } from '../../types';

export const module6Algorithms: PythonModule = {
  id: 'module-6-algorithms',
  title: 'Built-in Algorithms',
  description: 'heapq, bisect, and sorting techniques for interviews',
  icon: 'Binary',
  order: 6,
  lessons: [
    {
      id: 'lesson-6-1',
      moduleId: 'module-6-algorithms',
      title: 'heapq Module',
      content: `Python's \`heapq\` implements a min-heap using a list. Essential for priority queues and top-K problems.

**Key Functions:**
- \`heappush(heap, item)\`: Add item, O(log n)
- \`heappop(heap)\`: Remove smallest, O(log n)
- \`heapify(list)\`: Convert list to heap, O(n)
- \`nlargest/nsmallest(n, iterable)\`: Get top/bottom n

**Note:** Python only has min-heap. For max-heap, negate values.`,
      codeExamples: [
        {
          id: 'ex-6-1-1',
          title: 'Heap Basics',
          code: `import heapq

# Create heap from list
nums = [5, 3, 1, 4, 2]
heapq.heapify(nums)  # O(n) - converts in place
print(f"Heapified: {nums}")  # [1, 2, 5, 4, 3] - heap property

# Push and pop
heapq.heappush(nums, 0)
print(f"After push 0: {nums}")

smallest = heapq.heappop(nums)
print(f"Popped: {smallest}, Heap: {nums}")

# Peek without removing (just index 0)
print(f"Peek (min): {nums[0]}")

# Push and pop in one operation
result = heapq.heappushpop(nums, 10)  # Push then pop
print(f"pushpop(10): returned {result}, heap: {nums}")

# Replace root with new value
result = heapq.heapreplace(nums, 0)  # Pop then push
print(f"replace(0): returned {result}, heap: {nums}")

# Get n largest/smallest
data = [3, 1, 4, 1, 5, 9, 2, 6, 5]
print(f"3 largest: {heapq.nlargest(3, data)}")
print(f"3 smallest: {heapq.nsmallest(3, data)}")`,
          language: 'python',
          explanation: 'heapq uses a list as underlying storage. Index 0 is always the minimum. heapify is O(n), push/pop are O(log n).',
          expectedOutput: `Heapified: [1, 2, 5, 4, 3]
After push 0: [0, 2, 1, 4, 3, 5]
Popped: 0, Heap: [1, 2, 5, 4, 3]
Peek (min): 1
pushpop(10): returned 1, heap: [2, 3, 5, 4, 10]
replace(0): returned 2, heap: [0, 3, 5, 4, 10]
3 largest: [9, 6, 5]
3 smallest: [1, 1, 2]`,
          isRunnable: true,
        },
        {
          id: 'ex-6-1-2',
          title: 'Max Heap and Custom Objects',
          code: `import heapq

# Max heap: negate values
nums = [5, 3, 1, 4, 2]
max_heap = [-x for x in nums]
heapq.heapify(max_heap)
print(f"Max heap (negated): {max_heap}")

# Get max
largest = -heapq.heappop(max_heap)
print(f"Popped max: {largest}")

# Custom objects using tuples (priority, data)
# Heap compares by first element of tuple
tasks = []
heapq.heappush(tasks, (2, "Medium task"))
heapq.heappush(tasks, (1, "High priority"))
heapq.heappush(tasks, (3, "Low priority"))

print("Processing tasks by priority:")
while tasks:
    priority, task = heapq.heappop(tasks)
    print(f"  Priority {priority}: {task}")

# Kth largest element
def find_kth_largest(nums, k):
    """O(n log k) using min-heap of size k."""
    heap = []
    for num in nums:
        heapq.heappush(heap, num)
        if len(heap) > k:
            heapq.heappop(heap)  # Remove smallest
    return heap[0]  # Kth largest is min of k largest

nums = [3, 2, 1, 5, 6, 4]
k = 2
print(f"{k}th largest in {nums}: {find_kth_largest(nums, k)}")`,
          language: 'python',
          explanation: 'For max-heap, negate values. Tuples are compared element by element. The Kth largest pattern is very common.',
          expectedOutput: `Max heap (negated): [-5, -4, -1, -3, -2]
Popped max: 5
Processing tasks by priority:
  Priority 1: High priority
  Priority 2: Medium task
  Priority 3: Low priority
2th largest in [3, 2, 1, 5, 6, 4]: 5`,
          isRunnable: true,
        },
      ],
      keyPoints: [
        'heapq is min-heap only; negate for max-heap',
        'heapify is O(n), push/pop are O(log n)',
        'Use tuples (priority, data) for custom ordering',
        'For Kth largest: maintain min-heap of size k',
      ],
    },
    {
      id: 'lesson-6-2',
      moduleId: 'module-6-algorithms',
      title: 'bisect Module',
      content: `\`bisect\` provides binary search on sorted lists.

**Key Functions:**
- \`bisect_left(a, x)\`: Leftmost index where x should be inserted
- \`bisect_right(a, x)\`: Rightmost index where x should be inserted
- \`insort_left/right\`: Insert while maintaining sort

**Use cases:** Searching sorted data, maintaining sorted lists, finding ranges.`,
      codeExamples: [
        {
          id: 'ex-6-2-1',
          title: 'Binary Search with bisect',
          code: `import bisect

# bisect_left: leftmost position
nums = [1, 3, 3, 3, 5, 7]
print(f"Array: {nums}")
print(f"bisect_left(3): {bisect.bisect_left(nums, 3)}")   # 1
print(f"bisect_right(3): {bisect.bisect_right(nums, 3)}") # 4

# Find element (check if exists)
def binary_search(arr, x):
    i = bisect.bisect_left(arr, x)
    if i != len(arr) and arr[i] == x:
        return i
    return -1

print(f"Index of 3: {binary_search(nums, 3)}")
print(f"Index of 4: {binary_search(nums, 4)}")

# Count occurrences
def count_occurrences(arr, x):
    left = bisect.bisect_left(arr, x)
    right = bisect.bisect_right(arr, x)
    return right - left

print(f"Count of 3: {count_occurrences(nums, 3)}")

# Find range (first and last position)
def search_range(arr, target):
    left = bisect.bisect_left(arr, target)
    if left == len(arr) or arr[left] != target:
        return [-1, -1]
    right = bisect.bisect_right(arr, target) - 1
    return [left, right]

print(f"Range of 3: {search_range(nums, 3)}")`,
          language: 'python',
          explanation: 'bisect_left finds leftmost insertion point, bisect_right finds rightmost. The difference counts occurrences.',
          expectedOutput: `Array: [1, 3, 3, 3, 5, 7]
bisect_left(3): 1
bisect_right(3): 4
Index of 3: 1
Index of 4: -1
Count of 3: 3
Range of 3: [1, 3]`,
          isRunnable: true,
        },
        {
          id: 'ex-6-2-2',
          title: 'Maintaining Sorted List',
          code: `import bisect

# Insert while keeping sorted
scores = [70, 80, 90]
bisect.insort(scores, 75)
bisect.insort(scores, 95)
bisect.insort(scores, 85)
print(f"Scores after insorts: {scores}")

# Grade boundaries
def get_grade(score):
    breakpoints = [60, 70, 80, 90]  # F, D, C, B, A
    grades = 'FDCBA'
    i = bisect.bisect(breakpoints, score)
    return grades[i]

for score in [33, 65, 77, 89, 95]:
    print(f"Score {score}: Grade {get_grade(score)}")

# Find floor and ceiling
def floor_ceiling(arr, x):
    """Find largest element <= x and smallest element >= x."""
    i = bisect.bisect_left(arr, x)
    floor_val = arr[i-1] if i > 0 else None
    ceil_val = arr[i] if i < len(arr) else None
    return floor_val, ceil_val

arr = [1, 3, 5, 7, 9]
print(f"Floor/ceiling of 4 in {arr}: {floor_ceiling(arr, 4)}")
print(f"Floor/ceiling of 5 in {arr}: {floor_ceiling(arr, 5)}")
print(f"Floor/ceiling of 10 in {arr}: {floor_ceiling(arr, 10)}")`,
          language: 'python',
          explanation: 'insort maintains sort order during insertion. Use bisect for grade-like mappings efficiently.',
          expectedOutput: `Scores after insorts: [70, 75, 80, 85, 90, 95]
Score 33: Grade F
Score 65: Grade D
Score 77: Grade C
Score 89: Grade B
Score 95: Grade A
Floor/ceiling of 4 in [1, 3, 5, 7, 9]: (3, 5)
Floor/ceiling of 5 in [1, 3, 5, 7, 9]: (3, 5)
Floor/ceiling of 10 in [1, 3, 5, 7, 9]: (9, None)`,
          isRunnable: true,
        },
      ],
      keyPoints: [
        'bisect_left: leftmost insertion point (for lower bound)',
        'bisect_right: rightmost insertion point (for upper bound)',
        'right - left gives count of element in sorted array',
        'insort maintains sort while inserting O(n)',
      ],
    },
    {
      id: 'lesson-6-3',
      moduleId: 'module-6-algorithms',
      title: 'Advanced Sorting',
      content: `Python's \`sorted()\` and \`list.sort()\` use Timsort (hybrid of merge sort and insertion sort).

**Key Parameters:**
- \`key\`: Function to extract comparison key
- \`reverse\`: Sort in descending order

**Common Patterns:**
- Sort by multiple criteria using tuple keys
- Sort with custom comparator using \`functools.cmp_to_key\``,
      codeExamples: [
        {
          id: 'ex-6-3-1',
          title: 'Custom Sorting',
          code: `# Sort by custom key
words = ["banana", "Apple", "cherry", "date"]
print(f"Default: {sorted(words)}")
print(f"By length: {sorted(words, key=len)}")
print(f"Case-insensitive: {sorted(words, key=str.lower)}")
print(f"By last char: {sorted(words, key=lambda x: x[-1])}")

# Sort by multiple criteria
students = [
    ("Alice", 85, 22),
    ("Bob", 85, 20),
    ("Charlie", 90, 21),
    ("David", 85, 21),
]

# Sort by score (desc), then age (asc)
sorted_students = sorted(students, key=lambda x: (-x[1], x[2]))
print(f"By score desc, age asc:")
for s in sorted_students:
    print(f"  {s}")

# Sort objects/dicts
people = [
    {"name": "Alice", "age": 30},
    {"name": "Bob", "age": 25},
    {"name": "Charlie", "age": 30},
]

by_age_name = sorted(people, key=lambda p: (p["age"], p["name"]))
print(f"People by age, name: {[p['name'] for p in by_age_name]}")

# Stable sort demonstration
pairs = [(1, 'b'), (2, 'a'), (1, 'a'), (2, 'b')]
print(f"Original: {pairs}")
sorted_pairs = sorted(pairs, key=lambda x: x[0])
print(f"Stable sort by first: {sorted_pairs}")  # Equal keys maintain original order`,
          language: 'python',
          explanation: 'Use negative values for descending in tuple keys. Python\'s sort is stable - equal elements keep original order.',
          expectedOutput: `Default: ['Apple', 'banana', 'cherry', 'date']
By length: ['date', 'Apple', 'banana', 'cherry']
Case-insensitive: ['Apple', 'banana', 'cherry', 'date']
By last char: ['banana', 'Apple', 'date', 'cherry']
By score desc, age asc:
  ('Charlie', 90, 21)
  ('Bob', 85, 20)
  ('David', 85, 21)
  ('Alice', 85, 22)
People by age, name: ['Bob', 'Charlie', 'Alice']
Original: [(1, 'b'), (2, 'a'), (1, 'a'), (2, 'b')]
Stable sort by first: [(1, 'b'), (1, 'a'), (2, 'a'), (2, 'b')]`,
          isRunnable: true,
        },
        {
          id: 'ex-6-3-2',
          title: 'Custom Comparator',
          code: `from functools import cmp_to_key

# Custom comparator: returns negative, zero, or positive
def compare_versions(v1, v2):
    """Compare version strings like '1.2.3' vs '1.10.0'."""
    parts1 = [int(x) for x in v1.split('.')]
    parts2 = [int(x) for x in v2.split('.')]

    for p1, p2 in zip(parts1, parts2):
        if p1 < p2:
            return -1
        if p1 > p2:
            return 1

    return len(parts1) - len(parts2)

versions = ['1.10.0', '1.2.3', '1.2.10', '2.0.0', '1.2.3']
sorted_versions = sorted(versions, key=cmp_to_key(compare_versions))
print(f"Sorted versions: {sorted_versions}")

# Largest number problem
def largest_number(nums):
    """Arrange numbers to form largest possible number."""
    def compare(a, b):
        # Compare "ab" vs "ba"
        if a + b > b + a:
            return -1  # a should come first
        elif a + b < b + a:
            return 1
        return 0

    strs = [str(n) for n in nums]
    strs.sort(key=cmp_to_key(compare))

    # Handle all zeros case
    if strs[0] == '0':
        return '0'
    return ''.join(strs)

nums = [3, 30, 34, 5, 9]
print(f"Largest number from {nums}: {largest_number(nums)}")

nums2 = [10, 2]
print(f"Largest number from {nums2}: {largest_number(nums2)}")`,
          language: 'python',
          explanation: 'cmp_to_key converts old-style comparators to key functions. The largest number problem is a classic interview question.',
          expectedOutput: `Sorted versions: ['1.2.3', '1.2.3', '1.2.10', '1.10.0', '2.0.0']
Largest number from [3, 30, 34, 5, 9]: 9534330
Largest number from [10, 2]: 210`,
          isRunnable: true,
        },
      ],
      keyPoints: [
        'Use tuple keys for multi-criteria sort',
        'Negate numeric values for descending order in tuples',
        'Python sort is stable (preserves order of equal elements)',
        'cmp_to_key converts comparator to key function',
      ],
    },
  ],
  quizzes: [
    {
      id: 'quiz-6',
      moduleId: 'module-6-algorithms',
      title: 'Algorithms Quiz',
      questions: [
        {
          id: 'q6-1',
          question: 'How do you implement max-heap with heapq?',
          options: [
            'Use heapq.maxheap()',
            'Negate all values',
            'Set reverse=True',
            'Use heapq.heapify(reverse=True)',
          ],
          correctAnswer: 1,
          explanation: 'heapq only supports min-heap. For max-heap, negate values when pushing and negate again when popping.',
        },
        {
          id: 'q6-2',
          question: 'What is the time complexity of heapify?',
          options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
          correctAnswer: 2,
          explanation: 'heapify runs in O(n) time, not O(n log n). This is because most nodes are near the leaves.',
        },
        {
          id: 'q6-3',
          question: 'bisect_left([1,3,3,5], 3) returns:',
          options: ['1', '2', '3', '0'],
          correctAnswer: 0,
          explanation: 'bisect_left finds the leftmost position where 3 could be inserted, which is index 1.',
        },
        {
          id: 'q6-4',
          question: 'How to sort by score descending, then name ascending?',
          options: [
            'key=lambda x: (x.score, x.name)',
            'key=lambda x: (-x.score, x.name)',
            'key=lambda x: (x.score, -x.name)',
            'key=lambda x: (-x.score, -x.name)',
          ],
          correctAnswer: 1,
          explanation: 'Negate numeric values for descending. Strings can\'t be negated, but default ascending works here.',
        },
        {
          id: 'q6-5',
          question: 'For top K elements, what size heap do you maintain?',
          options: ['K', 'N', 'N-K', 'log K'],
          correctAnswer: 0,
          explanation: 'Maintain a heap of size K. For top K largest, use min-heap; pop smallest when size exceeds K.',
        },
      ],
    },
  ],
};
