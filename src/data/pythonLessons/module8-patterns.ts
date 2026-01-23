import type { PythonModule } from '../../types';

export const module8Patterns: PythonModule = {
  id: 'module-8-patterns',
  title: 'Interview Code Patterns',
  description: 'Common Python idioms and patterns for coding interviews',
  icon: 'Code',
  order: 8,
  lessons: [
    {
      id: 'lesson-8-1',
      moduleId: 'module-8-patterns',
      title: 'Two Pointers Setup',
      content: `Two pointers is a fundamental pattern for array problems. Know these common setups:

**Types:**
1. **Same direction**: Both start at beginning (fast-slow)
2. **Opposite ends**: Start at both ends, move toward center
3. **Different arrays**: One pointer per array`,
      codeExamples: [
        {
          id: 'ex-8-1-1',
          title: 'Two Pointer Patterns',
          code: `# Pattern 1: Opposite ends (sorted array)
def two_sum_sorted(nums, target):
    """Find two numbers that sum to target."""
    left, right = 0, len(nums) - 1
    while left < right:
        current_sum = nums[left] + nums[right]
        if current_sum == target:
            return [left, right]
        elif current_sum < target:
            left += 1
        else:
            right -= 1
    return []

nums = [1, 2, 3, 4, 6]
print(f"Two sum sorted: {two_sum_sorted(nums, 6)}")

# Pattern 2: Same direction (remove duplicates)
def remove_duplicates(nums):
    """Remove duplicates in-place, return new length."""
    if not nums:
        return 0
    write = 1  # Position to write next unique
    for read in range(1, len(nums)):
        if nums[read] != nums[read - 1]:
            nums[write] = nums[read]
            write += 1
    return write

nums = [1, 1, 2, 2, 3]
new_len = remove_duplicates(nums)
print(f"After remove dups: {nums[:new_len]}")

# Pattern 3: Fast-slow (cycle detection)
def has_cycle_simulation(nums):
    """Simulate linked list cycle with array."""
    if not nums:
        return False
    slow = fast = 0
    while True:
        slow = nums[slow] % len(nums)
        fast = nums[fast] % len(nums)
        fast = nums[fast] % len(nums)
        if slow == fast:
            return True
        if fast == 0 or slow == 0:  # Simplified termination
            break
    return False`,
          language: 'python',
          explanation: 'Two pointers often gives O(n) solution for problems that might seem to need O(n²).',
          expectedOutput: `Two sum sorted: [0, 3]
After remove dups: [1, 2, 3]`,
          isRunnable: true,
        },
        {
          id: 'ex-8-1-2',
          title: 'Container With Most Water',
          code: `def max_area(height):
    """
    Find two lines that form container with most water.
    Classic two-pointer problem.
    """
    left, right = 0, len(height) - 1
    max_water = 0

    while left < right:
        # Area = width * min(height)
        width = right - left
        h = min(height[left], height[right])
        max_water = max(max_water, width * h)

        # Move the shorter line (greedy choice)
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1

    return max_water

heights = [1, 8, 6, 2, 5, 4, 8, 3, 7]
print(f"Max area: {max_area(heights)}")

# Three pointers: Sort colors (Dutch flag)
def sort_colors(nums):
    """Sort array of 0s, 1s, 2s in-place."""
    low, mid, high = 0, 0, len(nums) - 1

    while mid <= high:
        if nums[mid] == 0:
            nums[low], nums[mid] = nums[mid], nums[low]
            low += 1
            mid += 1
        elif nums[mid] == 1:
            mid += 1
        else:  # nums[mid] == 2
            nums[mid], nums[high] = nums[high], nums[mid]
            high -= 1

colors = [2, 0, 2, 1, 1, 0]
sort_colors(colors)
print(f"Sorted colors: {colors}")`,
          language: 'python',
          explanation: 'Container problem: always move shorter line. Dutch flag uses three pointers for three-way partitioning.',
          expectedOutput: `Max area: 49
Sorted colors: [0, 0, 1, 1, 2, 2]`,
          isRunnable: true,
        },
      ],
      keyPoints: [
        'Opposite ends: for sorted arrays, palindromes, container problems',
        'Same direction: for removing elements, partitioning',
        'Fast-slow: for cycle detection, finding middle',
        'Always consider which pointer to move and why',
      ],
    },
    {
      id: 'lesson-8-2',
      moduleId: 'module-8-patterns',
      title: 'Sliding Window',
      content: `Sliding window maintains a "window" of elements while iterating. Essential for substring/subarray problems.

**Types:**
1. **Fixed size**: Window size is given
2. **Variable size**: Find min/max window satisfying condition`,
      codeExamples: [
        {
          id: 'ex-8-2-1',
          title: 'Sliding Window Patterns',
          code: `# Fixed window: Max sum of k consecutive elements
def max_sum_subarray(nums, k):
    """Find maximum sum of k consecutive elements."""
    if len(nums) < k:
        return 0

    # Initial window
    window_sum = sum(nums[:k])
    max_sum = window_sum

    # Slide window
    for i in range(k, len(nums)):
        window_sum += nums[i] - nums[i - k]  # Add new, remove old
        max_sum = max(max_sum, window_sum)

    return max_sum

nums = [2, 1, 5, 1, 3, 2]
print(f"Max sum (k=3): {max_sum_subarray(nums, 3)}")

# Variable window: Longest substring without repeating
def length_of_longest_substring(s):
    """Length of longest substring without repeating characters."""
    char_index = {}  # Last seen index of each char
    max_len = 0
    start = 0  # Window start

    for end, char in enumerate(s):
        # If char seen and inside current window
        if char in char_index and char_index[char] >= start:
            start = char_index[char] + 1  # Shrink window

        char_index[char] = end
        max_len = max(max_len, end - start + 1)

    return max_len

s = "abcabcbb"
print(f"Longest unique substring in '{s}': {length_of_longest_substring(s)}")

# Minimum window substring
def min_window(s, t):
    """Find minimum window in s containing all chars of t."""
    from collections import Counter

    if not t or not s:
        return ""

    need = Counter(t)
    have = {}
    required = len(need)
    formed = 0

    left = 0
    min_len = float('inf')
    result = ""

    for right, char in enumerate(s):
        # Expand window
        have[char] = have.get(char, 0) + 1
        if char in need and have[char] == need[char]:
            formed += 1

        # Contract window
        while formed == required:
            if right - left + 1 < min_len:
                min_len = right - left + 1
                result = s[left:right + 1]

            left_char = s[left]
            have[left_char] -= 1
            if left_char in need and have[left_char] < need[left_char]:
                formed -= 1
            left += 1

    return result

s, t = "ADOBECODEBANC", "ABC"
print(f"Min window containing '{t}' in '{s}': {min_window(s, t)}")`,
          language: 'python',
          explanation: 'Fixed window: slide by adding one, removing one. Variable window: expand until valid, then shrink to minimize.',
          expectedOutput: `Max sum (k=3): 9
Longest unique substring in 'abcabcbb': 3
Min window containing 'ABC' in 'ADOBECODEBANC': BANC`,
          isRunnable: true,
        },
      ],
      keyPoints: [
        'Fixed window: add right element, remove left element',
        'Variable window: expand to satisfy, shrink to minimize',
        'Use hashmap to track window contents',
        'Track "formed" count for substring matching',
      ],
    },
    {
      id: 'lesson-8-3',
      moduleId: 'module-8-patterns',
      title: 'Hash Map Patterns',
      content: `Hash maps (dicts) are essential for O(1) lookups. Common patterns:

1. **Frequency counting**
2. **Two Sum pattern** (complement lookup)
3. **Prefix sum + hash map**
4. **Index mapping**`,
      codeExamples: [
        {
          id: 'ex-8-3-1',
          title: 'Hash Map Patterns',
          code: `# Two Sum: complement lookup
def two_sum(nums, target):
    """Return indices of two numbers that add to target."""
    seen = {}  # value -> index
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

nums = [2, 7, 11, 15]
print(f"Two sum indices: {two_sum(nums, 9)}")

# Subarray sum equals K (prefix sum + hashmap)
def subarray_sum(nums, k):
    """Count subarrays that sum to k."""
    count = 0
    prefix_sum = 0
    prefix_counts = {0: 1}  # Empty prefix has sum 0

    for num in nums:
        prefix_sum += num
        # If (prefix_sum - k) exists, we found subarray(s)
        if prefix_sum - k in prefix_counts:
            count += prefix_counts[prefix_sum - k]
        prefix_counts[prefix_sum] = prefix_counts.get(prefix_sum, 0) + 1

    return count

nums = [1, 1, 1]
print(f"Subarrays summing to 2: {subarray_sum(nums, 2)}")

# Group anagrams
def group_anagrams(strs):
    """Group strings that are anagrams."""
    from collections import defaultdict

    groups = defaultdict(list)
    for s in strs:
        # Key: sorted string (anagrams have same sorted form)
        key = tuple(sorted(s))
        groups[key].append(s)

    return list(groups.values())

words = ["eat", "tea", "tan", "ate", "nat", "bat"]
print(f"Grouped anagrams: {group_anagrams(words)}")

# First non-repeating character
def first_unique_char(s):
    """Return index of first non-repeating character."""
    from collections import Counter
    counts = Counter(s)
    for i, char in enumerate(s):
        if counts[char] == 1:
            return i
    return -1

print(f"First unique in 'leetcode': {first_unique_char('leetcode')}")`,
          language: 'python',
          explanation: 'Hash maps turn O(n²) problems into O(n). Prefix sum + hashmap is powerful for subarray problems.',
          expectedOutput: `Two sum indices: [0, 1]
Subarrays summing to 2: 2
Grouped anagrams: [['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']]
First unique in 'leetcode': 0`,
          isRunnable: true,
        },
      ],
      keyPoints: [
        'Two Sum: store seen values, check for complement',
        'Prefix sum: prefix_sum[j] - prefix_sum[i] = sum(i+1, j)',
        'Anagrams: use sorted string or character count as key',
        'Track both value and index when needed',
      ],
    },
    {
      id: 'lesson-8-4',
      moduleId: 'module-8-patterns',
      title: 'Recursion Templates',
      content: `Master these recursive patterns for DFS, backtracking, and divide-and-conquer.

**Templates:**
1. DFS on trees/graphs
2. Backtracking (permutations, combinations)
3. Divide and conquer (merge sort style)`,
      codeExamples: [
        {
          id: 'ex-8-4-1',
          title: 'Backtracking Template',
          code: `# Subsets (backtracking)
def subsets(nums):
    """Generate all subsets."""
    result = []

    def backtrack(start, current):
        result.append(current[:])  # Add copy of current

        for i in range(start, len(nums)):
            current.append(nums[i])     # Choose
            backtrack(i + 1, current)   # Explore
            current.pop()               # Unchoose

    backtrack(0, [])
    return result

print(f"Subsets of [1,2,3]: {subsets([1, 2, 3])}")

# Permutations
def permutations(nums):
    """Generate all permutations."""
    result = []

    def backtrack(current, remaining):
        if not remaining:
            result.append(current[:])
            return

        for i, num in enumerate(remaining):
            current.append(num)
            backtrack(current, remaining[:i] + remaining[i+1:])
            current.pop()

    backtrack([], nums)
    return result

print(f"Permutations of [1,2]: {permutations([1, 2])}")

# Combinations (n choose k)
def combinations(n, k):
    """Generate all combinations of k numbers from 1 to n."""
    result = []

    def backtrack(start, current):
        if len(current) == k:
            result.append(current[:])
            return

        # Pruning: need at least (k - len(current)) more elements
        for i in range(start, n - (k - len(current)) + 2):
            current.append(i)
            backtrack(i + 1, current)
            current.pop()

    backtrack(1, [])
    return result

print(f"C(4,2): {combinations(4, 2)}")`,
          language: 'python',
          explanation: 'Backtracking template: choose, explore (recurse), unchoose. Pruning speeds up by skipping invalid branches.',
          expectedOutput: `Subsets of [1,2,3]: [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]]
Permutations of [1,2]: [[1, 2], [2, 1]]
C(4,2): [[1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]]`,
          isRunnable: true,
        },
        {
          id: 'ex-8-4-2',
          title: 'DFS and Graph Templates',
          code: `# DFS on graph
def dfs_paths(graph, start, end):
    """Find all paths from start to end."""
    result = []

    def dfs(node, path):
        if node == end:
            result.append(path[:])
            return

        for neighbor in graph.get(node, []):
            if neighbor not in path:  # Avoid cycles
                path.append(neighbor)
                dfs(neighbor, path)
                path.pop()

    dfs(start, [start])
    return result

graph = {
    'A': ['B', 'C'],
    'B': ['D', 'E'],
    'C': ['E'],
    'D': ['E'],
    'E': []
}
print(f"All paths A->E: {dfs_paths(graph, 'A', 'E')}")

# Number of islands (grid DFS)
def num_islands(grid):
    """Count number of islands (connected 1s)."""
    if not grid:
        return 0

    rows, cols = len(grid), len(grid[0])
    count = 0

    def dfs(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols:
            return
        if grid[r][c] != '1':
            return

        grid[r][c] = '0'  # Mark visited
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                dfs(r, c)
                count += 1

    return count

grid = [
    ['1', '1', '0', '0', '0'],
    ['1', '1', '0', '0', '0'],
    ['0', '0', '1', '0', '0'],
    ['0', '0', '0', '1', '1']
]
print(f"Number of islands: {num_islands(grid)}")`,
          language: 'python',
          explanation: 'Grid DFS: check bounds, mark visited, recurse to neighbors. Graph DFS: track visited in path for cycle detection.',
          expectedOutput: `All paths A->E: [['A', 'B', 'D', 'E'], ['A', 'B', 'E'], ['A', 'C', 'E']]
Number of islands: 3`,
          isRunnable: true,
        },
      ],
      keyPoints: [
        'Backtracking: choose-explore-unchoose pattern',
        'Copy current state when adding to results',
        'Grid DFS: check bounds first, mark visited',
        'Graph DFS: use set or path for visited tracking',
      ],
    },
  ],
  quizzes: [
    {
      id: 'quiz-8',
      moduleId: 'module-8-patterns',
      title: 'Interview Patterns Quiz',
      questions: [
        {
          id: 'q8-1',
          question: 'In two-pointer for sorted arrays, when do you move the left pointer?',
          options: [
            'When sum is too large',
            'When sum is too small',
            'Always move left first',
            'Randomly',
          ],
          correctAnswer: 1,
          explanation: 'Move left pointer when sum is too small (need larger values), move right when too large.',
        },
        {
          id: 'q8-2',
          question: 'Sliding window: to find minimum window satisfying a condition, you:',
          options: [
            'Only expand the window',
            'Only shrink the window',
            'Expand until valid, then shrink to minimize',
            'Shrink until invalid, then expand',
          ],
          correctAnswer: 2,
          explanation: 'Expand to find a valid window, then shrink from left while still valid to find minimum.',
        },
        {
          id: 'q8-3',
          question: 'In Two Sum, what do you store in the hash map?',
          options: [
            'Only the values',
            'Only the indices',
            'Value as key, index as value',
            'Index as key, value as value',
          ],
          correctAnswer: 2,
          explanation: 'Store value -> index mapping so you can look up if complement exists and get its index.',
        },
        {
          id: 'q8-4',
          question: 'In backtracking, what does "unchoose" mean?',
          options: [
            'Delete the element permanently',
            'Skip to the next element',
            'Restore state after recursion returns',
            'Mark element as visited',
          ],
          correctAnswer: 2,
          explanation: 'Unchoose restores the previous state after exploring a path, allowing other paths to be explored.',
        },
        {
          id: 'q8-5',
          question: 'Prefix sum + hash map solves which problem efficiently?',
          options: [
            'Finding maximum element',
            'Counting subarrays with given sum',
            'Sorting the array',
            'Finding duplicates',
          ],
          correctAnswer: 1,
          explanation: 'Prefix sums allow O(1) subarray sum queries; hash map counts how many times each prefix sum occurred.',
        },
      ],
    },
  ],
};
