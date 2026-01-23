import type { Problem } from '../types';

export const problems: Problem[] = [
  // 1. Two Sum (#1) - Easy
  {
    id: 1,
    title: 'Two Sum',
    difficulty: 'easy',
    leetcodeId: 1,
    leetcodeUrl: 'https://leetcode.com/problems/two-sum/',
    companies: ['PayPal', 'Google', 'Amazon', 'Microsoft', 'Apple'],
    pattern: 'two-pointers',
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

Example 1:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2:
Input: nums = [3,2,4], target = 6
Output: [1,2]

Example 3:
Input: nums = [3,3], target = 6
Output: [0,1]

Constraints:
- 2 <= nums.length <= 10^4
- -10^9 <= nums[i] <= 10^9
- -10^9 <= target <= 10^9
- Only one valid answer exists.`,
    umpire: {
      understand: [
        'We need to find TWO numbers that add up to target',
        'Return the INDICES, not the values',
        'Cannot use the same element twice (same index)',
        'Exactly one solution exists',
        'Can return in any order',
      ],
      match: [
        'Hash Map - Store complements for O(1) lookup',
        'Two Pointers - Would work if sorted, but loses indices',
        'Brute Force - Check all pairs O(n²)',
      ],
      plan: [
        'Create a hash map to store {value: index}',
        'Iterate through array',
        'For each number, calculate complement = target - num',
        'Check if complement exists in hash map',
        'If found, return [complement_index, current_index]',
        'If not found, add current {num: index} to hash map',
      ],
      implement: `def twoSum(nums, target):
    # Hash map to store {value: index}
    seen = {}

    for i, num in enumerate(nums):
        complement = target - num

        # Check if complement already seen
        if complement in seen:
            return [seen[complement], i]

        # Store current number and index
        seen[num] = i

    return []  # No solution (per problem, won't happen)`,
      review: [
        'Works with negative numbers',
        'Handles duplicates correctly (same value, different indices)',
        'Returns indices in order they were found',
        'Single pass through array',
      ],
      evaluate: {
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        explanation: 'Single pass through n elements, hash map stores at most n elements',
      },
    },
    hints: [
      'What mathematical relationship exists between the two numbers we need?',
      'If we know one number, can we calculate what the other must be?',
      'A hash map can give us O(1) lookup - what should we store in it?',
    ],
    solution: `def twoSum(nums, target):
    """
    Find two numbers that add up to target, return their indices.

    Approach: Use hash map to store seen numbers and their indices.
    For each number, check if its complement (target - num) was already seen.
    """
    seen = {}  # {value: index}

    for i, num in enumerate(nums):
        complement = target - num

        if complement in seen:
            # Found the pair!
            return [seen[complement], i]

        # Remember this number for future lookups
        seen[num] = i

    return []`,
    testCases: [
      { input: 'nums = [2,7,11,15], target = 9', expected: '[0, 1]' },
      { input: 'nums = [3,2,4], target = 6', expected: '[1, 2]' },
      { input: 'nums = [3,3], target = 6', expected: '[0, 1]' },
    ],
  },

  // 2. Longest Substring Without Repeating Characters (#3) - Medium
  {
    id: 3,
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'medium',
    leetcodeId: 3,
    leetcodeUrl: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
    companies: ['PayPal', 'Amazon', 'Microsoft', 'Bloomberg', 'Apple'],
    pattern: 'sliding-window',
    description: `Given a string s, find the length of the longest substring without repeating characters.

Example 1:
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.

Example 2:
Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.

Example 3:
Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, not a subsequence.

Constraints:
- 0 <= s.length <= 5 * 10^4
- s consists of English letters, digits, symbols and spaces.`,
    umpire: {
      understand: [
        'Find LONGEST substring (contiguous) with ALL UNIQUE characters',
        'Substring, not subsequence - must be contiguous',
        'Can include any character (letters, digits, symbols, spaces)',
        'Empty string returns 0',
        'Single character returns 1',
      ],
      match: [
        'Sliding Window - Expand/contract window based on character frequency',
        'Two Pointers - Track window boundaries',
        'Hash Set/Map - Track characters in current window',
      ],
      plan: [
        'Use sliding window with two pointers (left, right)',
        'Use hash map to store last seen index of each character',
        'Expand window by moving right pointer',
        'When duplicate found, move left pointer past the previous occurrence',
        'Track maximum window size',
      ],
      implement: `def lengthOfLongestSubstring(s):
    char_index = {}  # {character: last_seen_index}
    left = 0
    max_length = 0

    for right in range(len(s)):
        char = s[right]

        # If char seen and within current window, shrink window
        if char in char_index and char_index[char] >= left:
            left = char_index[char] + 1

        # Update last seen index
        char_index[char] = right

        # Update max length
        max_length = max(max_length, right - left + 1)

    return max_length`,
      review: [
        'Edge case: empty string returns 0',
        'Edge case: all same characters returns 1',
        'Window shrinking handles duplicates correctly',
        'Works with any character type',
      ],
      evaluate: {
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(min(m, n))',
        explanation: 'Single pass through string. Space is min of string length and character set size.',
      },
    },
    hints: [
      'Think about when you would need to shrink your window',
      'A hash map can tell you where you last saw each character',
      'When you see a duplicate, where should you move your left pointer?',
    ],
    solution: `def lengthOfLongestSubstring(s):
    """
    Find longest substring with all unique characters.

    Sliding window approach: Expand right, shrink left when duplicate found.
    """
    char_index = {}  # Track last seen index of each char
    left = 0
    max_len = 0

    for right, char in enumerate(s):
        # If duplicate found within current window
        if char in char_index and char_index[char] >= left:
            # Move left past the previous occurrence
            left = char_index[char] + 1

        # Update character's last seen position
        char_index[char] = right

        # Update maximum length
        max_len = max(max_len, right - left + 1)

    return max_len`,
    testCases: [
      { input: 's = "abcabcbb"', expected: '3' },
      { input: 's = "bbbbb"', expected: '1' },
      { input: 's = "pwwkew"', expected: '3' },
      { input: 's = ""', expected: '0' },
    ],
  },

  // 3. Find First and Last Position of Element in Sorted Array (#34) - Medium
  {
    id: 34,
    title: 'Find First and Last Position of Element in Sorted Array',
    difficulty: 'medium',
    leetcodeId: 34,
    leetcodeUrl: 'https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/',
    companies: ['PayPal', 'Facebook', 'LinkedIn', 'Amazon', 'Microsoft'],
    pattern: 'binary-search',
    description: `Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value.

If target is not found in the array, return [-1, -1].

You must write an algorithm with O(log n) runtime complexity.

Example 1:
Input: nums = [5,7,7,8,8,10], target = 8
Output: [3,4]

Example 2:
Input: nums = [5,7,7,8,8,10], target = 6
Output: [-1,-1]

Example 3:
Input: nums = [], target = 0
Output: [-1,-1]

Constraints:
- 0 <= nums.length <= 10^5
- -10^9 <= nums[i] <= 10^9
- nums is a non-decreasing array.
- -10^9 <= target <= 10^9`,
    umpire: {
      understand: [
        'Array is SORTED in non-decreasing order',
        'Find FIRST and LAST position of target',
        'Target might appear multiple times',
        'Return [-1, -1] if not found',
        'Must be O(log n) - binary search required',
      ],
      match: [
        'Binary Search - Required for O(log n)',
        'Two binary searches: one for first, one for last position',
        'Variation: find leftmost and rightmost occurrence',
      ],
      plan: [
        'Binary search for first occurrence: when found, continue searching left',
        'Binary search for last occurrence: when found, continue searching right',
        'Return [-1, -1] if first position not found',
      ],
      implement: `def searchRange(nums, target):
    def findFirst():
        left, right = 0, len(nums) - 1
        while left <= right:
            mid = left + (right - left) // 2
            if nums[mid] >= target:
                right = mid - 1
            else:
                left = mid + 1
        return left

    def findLast():
        left, right = 0, len(nums) - 1
        while left <= right:
            mid = left + (right - left) // 2
            if nums[mid] <= target:
                left = mid + 1
            else:
                right = mid - 1
        return right

    first = findFirst()

    # Check if target exists
    if first >= len(nums) or nums[first] != target:
        return [-1, -1]

    return [first, findLast()]`,
      review: [
        'Empty array handled: returns [-1, -1]',
        'Single element array works correctly',
        'Target not in array returns [-1, -1]',
        'Multiple occurrences handled',
      ],
      evaluate: {
        timeComplexity: 'O(log n)',
        spaceComplexity: 'O(1)',
        explanation: 'Two binary searches, each O(log n). Constant extra space.',
      },
    },
    hints: [
      'How would you modify binary search to find the leftmost occurrence?',
      'When you find target, should you stop or keep searching?',
      'You need two slightly different binary searches',
    ],
    solution: `def searchRange(nums, target):
    """
    Find first and last position of target in sorted array.

    Two binary searches: one biased left, one biased right.
    """
    def find_first():
        left, right = 0, len(nums) - 1
        while left <= right:
            mid = left + (right - left) // 2
            # When found, keep searching left
            if nums[mid] >= target:
                right = mid - 1
            else:
                left = mid + 1
        return left

    def find_last():
        left, right = 0, len(nums) - 1
        while left <= right:
            mid = left + (right - left) // 2
            # When found, keep searching right
            if nums[mid] <= target:
                left = mid + 1
            else:
                right = mid - 1
        return right

    first = find_first()

    # Validate that target exists
    if first >= len(nums) or nums[first] != target:
        return [-1, -1]

    return [first, find_last()]`,
    testCases: [
      { input: 'nums = [5,7,7,8,8,10], target = 8', expected: '[3, 4]' },
      { input: 'nums = [5,7,7,8,8,10], target = 6', expected: '[-1, -1]' },
      { input: 'nums = [], target = 0', expected: '[-1, -1]' },
    ],
  },

  // 4. Subsets (#78) - Medium
  {
    id: 78,
    title: 'Subsets',
    difficulty: 'medium',
    leetcodeId: 78,
    leetcodeUrl: 'https://leetcode.com/problems/subsets/',
    companies: ['PayPal', 'Facebook', 'Amazon', 'Bloomberg', 'Apple'],
    pattern: 'backtracking',
    description: `Given an integer array nums of unique elements, return all possible subsets (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.

Example 1:
Input: nums = [1,2,3]
Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]

Example 2:
Input: nums = [0]
Output: [[],[0]]

Constraints:
- 1 <= nums.length <= 10
- -10 <= nums[i] <= 10
- All the numbers of nums are unique.`,
    umpire: {
      understand: [
        'Generate ALL possible subsets (power set)',
        'Include empty subset []',
        'No duplicate subsets in result',
        'All elements in nums are unique',
        'Order of subsets doesn\'t matter',
      ],
      match: [
        'Backtracking - Build subsets incrementally',
        'Bit manipulation - Each bit represents include/exclude',
        'Iterative - For each number, add to existing subsets',
      ],
      plan: [
        'Use backtracking with start index',
        'At each position, decide to include or not include current element',
        'Add current subset to result at each step',
        'Move to next index, recurse, then backtrack',
      ],
      implement: `def subsets(nums):
    result = []

    def backtrack(start, path):
        # Add current subset (including empty)
        result.append(path[:])

        # Try adding each remaining element
        for i in range(start, len(nums)):
            path.append(nums[i])
            backtrack(i + 1, path)
            path.pop()  # Backtrack

    backtrack(0, [])
    return result`,
      review: [
        'Empty subset is included',
        'No duplicates because we only look forward (start index)',
        'All 2^n subsets generated',
        'Order doesn\'t matter for correctness',
      ],
      evaluate: {
        timeComplexity: 'O(n × 2^n)',
        spaceComplexity: 'O(n)',
        explanation: '2^n subsets, each takes O(n) to copy. Recursion depth is n.',
      },
    },
    hints: [
      'For each element, you have two choices: include it or not',
      'How many total subsets will there be for n elements?',
      'Backtracking can help you explore all combinations',
    ],
    solution: `def subsets(nums):
    """
    Generate all subsets using backtracking.

    At each position, we can include or exclude the element.
    """
    result = []

    def backtrack(start, path):
        # Add current subset to result
        result.append(path[:])  # Make a copy!

        # Try adding each remaining element
        for i in range(start, len(nums)):
            path.append(nums[i])      # Include
            backtrack(i + 1, path)    # Recurse
            path.pop()                # Backtrack (exclude)

    backtrack(0, [])
    return result`,
    testCases: [
      { input: 'nums = [1,2,3]', expected: '[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]' },
      { input: 'nums = [0]', expected: '[[],[0]]' },
    ],
  },

  // 5. Largest Rectangle in Histogram (#84) - Hard
  {
    id: 84,
    title: 'Largest Rectangle in Histogram',
    difficulty: 'hard',
    leetcodeId: 84,
    leetcodeUrl: 'https://leetcode.com/problems/largest-rectangle-in-histogram/',
    companies: ['PayPal', 'Amazon', 'Google', 'Microsoft', 'Adobe'],
    pattern: 'monotonic-stack',
    description: `Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.

Example 1:
Input: heights = [2,1,5,6,2,3]
Output: 10
Explanation: The largest rectangle has an area = 10 units.

Example 2:
Input: heights = [2,4]
Output: 4

Constraints:
- 1 <= heights.length <= 10^5
- 0 <= heights[i] <= 10^4`,
    umpire: {
      understand: [
        'Each bar has width 1 and given height',
        'Find rectangle with MAXIMUM area',
        'Rectangle can span multiple bars',
        'Height of rectangle limited by shortest bar it spans',
      ],
      match: [
        'Monotonic Stack - Track bars that could extend right',
        'When smaller bar found, calculate areas for taller bars',
        'Stack stores indices, not heights',
      ],
      plan: [
        'Use increasing monotonic stack (stores indices)',
        'For each bar, pop taller bars and calculate their areas',
        'Width = current_index - stack_top - 1 (or from start if stack empty)',
        'Add sentinel (height 0) at end to flush remaining bars',
      ],
      implement: `def largestRectangleArea(heights):
    stack = []  # Stores indices
    max_area = 0
    heights.append(0)  # Sentinel to flush stack

    for i, h in enumerate(heights):
        start = i

        # Pop taller bars and calculate their areas
        while stack and heights[stack[-1]] > h:
            idx = stack.pop()
            height = heights[idx]
            # Width extends from popped index to current
            width = i if not stack else i - stack[-1] - 1
            max_area = max(max_area, height * width)

        stack.append(i)

    heights.pop()  # Remove sentinel
    return max_area`,
      review: [
        'Sentinel ensures all bars are processed',
        'Width calculation handles edge cases',
        'Stack maintains indices for width calculation',
        'Each bar pushed and popped at most once',
      ],
      evaluate: {
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        explanation: 'Each bar pushed and popped at most once. Stack can hold at most n bars.',
      },
    },
    hints: [
      'When can a bar no longer extend its rectangle to the right?',
      'A monotonic stack can help track bars that could still extend',
      'When you pop a bar from stack, you can calculate its maximum rectangle',
    ],
    solution: `def largestRectangleArea(heights):
    """
    Find largest rectangle area using monotonic stack.

    Key insight: A bar's rectangle ends when we find a shorter bar.
    """
    stack = []  # Store indices
    max_area = 0
    heights.append(0)  # Sentinel to process all bars

    for i, h in enumerate(heights):
        # Pop bars that can't extend further right
        while stack and heights[stack[-1]] > h:
            height = heights[stack.pop()]
            # Width: from after stack top to before current
            width = i if not stack else i - stack[-1] - 1
            max_area = max(max_area, height * width)

        stack.append(i)

    heights.pop()  # Clean up sentinel
    return max_area`,
    testCases: [
      { input: 'heights = [2,1,5,6,2,3]', expected: '10' },
      { input: 'heights = [2,4]', expected: '4' },
    ],
  },

  // 6. Construct Binary Tree from Preorder and Inorder Traversal (#105) - Medium
  {
    id: 105,
    title: 'Construct Binary Tree from Preorder and Inorder Traversal',
    difficulty: 'medium',
    leetcodeId: 105,
    leetcodeUrl: 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/',
    companies: ['PayPal', 'Amazon', 'Microsoft', 'Facebook', 'Google'],
    pattern: 'dfs',
    description: `Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree and inorder is the inorder traversal of the same tree, construct and return the binary tree.

Example 1:
Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
Output: [3,9,20,null,null,15,7]

Example 2:
Input: preorder = [−1], inorder = [−1]
Output: [−1]

Constraints:
- 1 <= preorder.length <= 3000
- inorder.length == preorder.length
- -3000 <= preorder[i], inorder[i] <= 3000
- preorder and inorder consist of unique values.
- Each value of inorder also appears in preorder.
- preorder is guaranteed to be the preorder traversal of the tree.
- inorder is guaranteed to be the inorder traversal of the tree.`,
    umpire: {
      understand: [
        'Preorder: root, left, right',
        'Inorder: left, root, right',
        'First element of preorder is always the root',
        'In inorder, elements left of root are left subtree, right are right subtree',
        'All values are unique',
      ],
      match: [
        'DFS/Recursion - Build tree recursively',
        'Divide and Conquer - Split arrays at root position',
        'Hash Map - O(1) lookup for root position in inorder',
      ],
      plan: [
        'Create hash map of inorder values to indices',
        'First element of preorder is root',
        'Find root in inorder - splits left and right subtrees',
        'Recursively build left subtree, then right subtree',
        'Use indices to track subarrays without slicing',
      ],
      implement: `def buildTree(preorder, inorder):
    # Map inorder values to indices for O(1) lookup
    inorder_map = {val: idx for idx, val in enumerate(inorder)}

    def build(pre_start, pre_end, in_start, in_end):
        if pre_start > pre_end:
            return None

        # Root is first element of preorder
        root_val = preorder[pre_start]
        root = TreeNode(root_val)

        # Find root position in inorder
        root_idx = inorder_map[root_val]

        # Calculate left subtree size
        left_size = root_idx - in_start

        # Build left subtree
        root.left = build(
            pre_start + 1,
            pre_start + left_size,
            in_start,
            root_idx - 1
        )

        # Build right subtree
        root.right = build(
            pre_start + left_size + 1,
            pre_end,
            root_idx + 1,
            in_end
        )

        return root

    return build(0, len(preorder) - 1, 0, len(inorder) - 1)`,
      review: [
        'Hash map gives O(1) root lookup in inorder',
        'Index tracking avoids array slicing (more efficient)',
        'Left subtree size determines split point',
        'Base case handles empty subtrees',
      ],
      evaluate: {
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        explanation: 'Visit each node once. Hash map uses O(n) space, recursion stack O(h) where h is height.',
      },
    },
    hints: [
      'What can you learn from the first element of preorder?',
      'How does finding the root in inorder help you?',
      'How many elements are in the left subtree?',
    ],
    solution: `def buildTree(preorder, inorder):
    """
    Reconstruct binary tree from preorder and inorder traversals.

    Key insight: Preorder gives root, inorder tells us left/right split.
    """
    # O(1) lookup for root position in inorder
    inorder_map = {val: i for i, val in enumerate(inorder)}

    def build(pre_start, pre_end, in_start, in_end):
        if pre_start > pre_end:
            return None

        # Root is first in preorder
        root_val = preorder[pre_start]
        root = TreeNode(root_val)

        # Find root in inorder
        root_idx = inorder_map[root_val]
        left_size = root_idx - in_start

        # Recursively build subtrees
        root.left = build(pre_start + 1, pre_start + left_size,
                         in_start, root_idx - 1)
        root.right = build(pre_start + left_size + 1, pre_end,
                          root_idx + 1, in_end)

        return root

    return build(0, len(preorder) - 1, 0, len(inorder) - 1)`,
    testCases: [
      { input: 'preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]', expected: '[3,9,20,null,null,15,7]' },
      { input: 'preorder = [-1], inorder = [-1]', expected: '[-1]' },
    ],
  },

  // 7. Number of Islands (#200) - Medium
  {
    id: 200,
    title: 'Number of Islands',
    difficulty: 'medium',
    leetcodeId: 200,
    leetcodeUrl: 'https://leetcode.com/problems/number-of-islands/',
    companies: ['PayPal', 'Amazon', 'Microsoft', 'Bloomberg', 'Facebook'],
    pattern: 'bfs',
    description: `Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

Example 1:
Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1

Example 2:
Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3

Constraints:
- m == grid.length
- n == grid[i].length
- 1 <= m, n <= 300
- grid[i][j] is '0' or '1'.`,
    umpire: {
      understand: [
        'Grid contains "1" (land) and "0" (water)',
        'Island = connected "1"s horizontally/vertically',
        'Diagonal connections don\'t count',
        'Count TOTAL number of separate islands',
        'Grid is surrounded by water (edges)',
      ],
      match: [
        'BFS - Flood fill to mark visited land',
        'DFS - Same approach, recursive',
        'Union-Find - Connect adjacent land cells',
      ],
      plan: [
        'Iterate through all cells',
        'When "1" found, increment island count',
        'BFS/DFS to mark all connected land as visited',
        'Can mark visited by changing "1" to "0" or using separate visited set',
      ],
      implement: `def numIslands(grid):
    if not grid:
        return 0

    rows, cols = len(grid), len(grid[0])
    count = 0

    def bfs(r, c):
        queue = [(r, c)]
        grid[r][c] = '0'  # Mark visited

        while queue:
            row, col = queue.pop(0)
            # Check 4 directions
            for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nr, nc = row + dr, col + dc
                if (0 <= nr < rows and 0 <= nc < cols
                    and grid[nr][nc] == '1'):
                    grid[nr][nc] = '0'  # Mark visited
                    queue.append((nr, nc))

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                count += 1
                bfs(r, c)

    return count`,
      review: [
        'Marking visited in-place avoids extra space',
        'BFS ensures all connected land is found',
        'Each cell visited at most once',
        'Empty grid returns 0',
      ],
      evaluate: {
        timeComplexity: 'O(m × n)',
        spaceComplexity: 'O(min(m, n))',
        explanation: 'Visit each cell once. BFS queue can hold at most min(m,n) cells in worst case.',
      },
    },
    hints: [
      'When you find an island ("1"), how do you ensure you don\'t count it twice?',
      'What traversal can help you find all connected land cells?',
      'Can you modify the grid to mark cells as visited?',
    ],
    solution: `def numIslands(grid):
    """
    Count islands using BFS flood fill.

    For each unvisited land, increment count and mark entire island visited.
    """
    if not grid:
        return 0

    rows, cols = len(grid), len(grid[0])
    count = 0

    def bfs(r, c):
        queue = [(r, c)]
        grid[r][c] = '0'  # Mark visited

        while queue:
            row, col = queue.pop(0)
            for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nr, nc = row + dr, col + dc
                if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == '1':
                    grid[nr][nc] = '0'
                    queue.append((nr, nc))

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                count += 1
                bfs(r, c)

    return count`,
    testCases: [
      { input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', expected: '1' },
      { input: 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]', expected: '3' },
    ],
  },

  // 8. Kth Largest Element in an Array (#215) - Medium
  {
    id: 215,
    title: 'Kth Largest Element in an Array',
    difficulty: 'medium',
    leetcodeId: 215,
    leetcodeUrl: 'https://leetcode.com/problems/kth-largest-element-in-an-array/',
    companies: ['PayPal', 'Facebook', 'Amazon', 'Microsoft', 'Apple'],
    pattern: 'top-k-elements',
    description: `Given an integer array nums and an integer k, return the kth largest element in the array.

Note that it is the kth largest element in the sorted order, not the kth distinct element.

Can you solve it without sorting?

Example 1:
Input: nums = [3,2,1,5,6,4], k = 2
Output: 5

Example 2:
Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
Output: 4

Constraints:
- 1 <= k <= nums.length <= 10^5
- -10^4 <= nums[i] <= 10^4`,
    umpire: {
      understand: [
        'Find the kth LARGEST element',
        'Not kth distinct - duplicates count',
        'k=1 means the maximum',
        'k=n means the minimum',
        'Can solve without full sort',
      ],
      match: [
        'Min-Heap of size k - Keep k largest elements',
        'QuickSelect - Partition-based selection',
        'Sort - Simple but O(n log n)',
      ],
      plan: [
        'Use min-heap of size k',
        'Add elements to heap',
        'If heap size > k, remove minimum',
        'At end, heap top is kth largest',
      ],
      implement: `import heapq

def findKthLargest(nums, k):
    # Min-heap to keep k largest elements
    heap = []

    for num in nums:
        heapq.heappush(heap, num)
        if len(heap) > k:
            heapq.heappop(heap)  # Remove smallest

    return heap[0]  # Kth largest`,
      review: [
        'Min-heap keeps smallest of k largest at top',
        'After processing all elements, heap has k largest',
        'Heap top is the kth largest',
        'Works with duplicates',
      ],
      evaluate: {
        timeComplexity: 'O(n log k)',
        spaceComplexity: 'O(k)',
        explanation: 'Process n elements, each heap operation is O(log k). Heap holds k elements.',
      },
    },
    hints: [
      'Think about what a min-heap of size k would contain',
      'If you keep pushing to a size-k heap, what stays?',
      'QuickSelect is O(n) average but more complex',
    ],
    solution: `import heapq

def findKthLargest(nums, k):
    """
    Find kth largest using min-heap of size k.

    The heap keeps the k largest elements, with smallest at top.
    """
    heap = []

    for num in nums:
        heapq.heappush(heap, num)
        if len(heap) > k:
            heapq.heappop(heap)  # Remove smallest of k+1

    return heap[0]  # kth largest`,
    testCases: [
      { input: 'nums = [3,2,1,5,6,4], k = 2', expected: '5' },
      { input: 'nums = [3,2,3,1,2,4,5,5,6], k = 4', expected: '4' },
    ],
  },

  // 9. Meeting Rooms II (#253) - Medium (PREMIUM)
  {
    id: 253,
    title: 'Meeting Rooms II',
    difficulty: 'medium',
    leetcodeId: 253,
    leetcodeUrl: 'https://leetcode.com/problems/meeting-rooms-ii/',
    neetcodeUrl: 'https://neetcode.io/problems/meeting-schedule-ii',
    isPremium: true,
    companies: ['PayPal', 'Amazon', 'Facebook', 'Google', 'Bloomberg'],
    pattern: 'merge-intervals',
    description: `Given an array of meeting time intervals consisting of start and end times [[s1,e1],[s2,e2],...] (si < ei), find the minimum number of conference rooms required.

Example 1:
Input: intervals = [[0,30],[5,10],[15,20]]
Output: 2

Example 2:
Input: intervals = [[7,10],[2,4]]
Output: 1

Constraints:
- 1 <= intervals.length <= 10^4
- 0 <= starti < endi <= 10^6`,
    umpire: {
      understand: [
        'Find MINIMUM number of rooms needed',
        'Intervals represent meeting [start, end)',
        'Two meetings need separate rooms if they overlap',
        'End time = start time is NOT an overlap',
      ],
      match: [
        'Min-Heap - Track end times of ongoing meetings',
        'Event-based - Count concurrent meetings at any point',
        'Chronological ordering - Sort by start time',
      ],
      plan: [
        'Sort meetings by start time',
        'Use min-heap to track end times of ongoing meetings',
        'For each meeting: if room freed up (heap top <= start), reuse it',
        'Otherwise, add new room',
        'Max heap size = min rooms needed',
      ],
      implement: `import heapq

def minMeetingRooms(intervals):
    if not intervals:
        return 0

    # Sort by start time
    intervals.sort(key=lambda x: x[0])

    # Min-heap of end times
    heap = []

    for start, end in intervals:
        # If earliest ending meeting is done, reuse room
        if heap and heap[0] <= start:
            heapq.heappop(heap)

        # Add current meeting's end time
        heapq.heappush(heap, end)

    return len(heap)`,
      review: [
        'Sorting ensures we process meetings in order',
        'Heap top = earliest ending meeting',
        'Pop only if room is freed before new meeting starts',
        'Heap size = concurrent meetings = rooms needed',
      ],
      evaluate: {
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(n)',
        explanation: 'Sort is O(n log n). Each meeting has at most one push/pop O(log n). Heap holds at most n meetings.',
      },
    },
    hints: [
      'Think about what happens at each meeting start time',
      'Which meeting should you check to see if a room is available?',
      'A min-heap can efficiently track the earliest ending meeting',
    ],
    solution: `import heapq

def minMeetingRooms(intervals):
    """
    Find minimum meeting rooms using min-heap of end times.

    For each meeting, check if any room is free (earliest end <= start).
    """
    if not intervals:
        return 0

    # Sort by start time
    intervals.sort(key=lambda x: x[0])

    # Heap tracks end times of ongoing meetings
    heap = []  # min-heap

    for start, end in intervals:
        # Reuse room if one is free
        if heap and heap[0] <= start:
            heapq.heappop(heap)

        # Add this meeting's end time
        heapq.heappush(heap, end)

    return len(heap)  # Number of rooms needed`,
    testCases: [
      { input: 'intervals = [[0,30],[5,10],[15,20]]', expected: '2' },
      { input: 'intervals = [[7,10],[2,4]]', expected: '1' },
    ],
  },

  // 10. Partition Equal Subset Sum (#416) - Medium
  {
    id: 416,
    title: 'Partition Equal Subset Sum',
    difficulty: 'medium',
    leetcodeId: 416,
    leetcodeUrl: 'https://leetcode.com/problems/partition-equal-subset-sum/',
    companies: ['PayPal', 'Amazon', 'Facebook', 'Google', 'Apple'],
    pattern: 'dynamic-programming',
    description: `Given an integer array nums, return true if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or false otherwise.

Example 1:
Input: nums = [1,5,11,5]
Output: true
Explanation: The array can be partitioned as [1, 5, 5] and [11].

Example 2:
Input: nums = [1,2,3,5]
Output: false
Explanation: The array cannot be partitioned into equal sum subsets.

Constraints:
- 1 <= nums.length <= 200
- 1 <= nums[i] <= 100`,
    umpire: {
      understand: [
        'Partition into TWO subsets with EQUAL sum',
        'Use each element exactly once',
        'Total sum must be even (otherwise impossible)',
        'Each subset must sum to total/2',
        'This is subset sum problem where target = total/2',
      ],
      match: [
        'Dynamic Programming - 0/1 Knapsack variant',
        'Subset Sum - Can we make sum = total/2?',
        'DP array - dp[i] = can we make sum i?',
      ],
      plan: [
        'If total sum is odd, return false',
        'Target = total / 2',
        'Use 1D DP: dp[j] = can we make sum j?',
        'For each num, update dp in reverse order',
        'Return dp[target]',
      ],
      implement: `def canPartition(nums):
    total = sum(nums)

    # If odd sum, can't partition equally
    if total % 2:
        return False

    target = total // 2

    # dp[j] = True if we can make sum j
    dp = [False] * (target + 1)
    dp[0] = True  # Sum of 0 always possible (empty subset)

    for num in nums:
        # Iterate backwards to avoid using same number twice
        for j in range(target, num - 1, -1):
            dp[j] = dp[j] or dp[j - num]

    return dp[target]`,
      review: [
        'Odd total handled early',
        'Reverse iteration prevents using num twice',
        'dp[0] = True is base case (empty subset)',
        'Space-optimized 1D DP',
      ],
      evaluate: {
        timeComplexity: 'O(n × sum)',
        spaceComplexity: 'O(sum)',
        explanation: 'For each of n numbers, iterate through target sums. DP array size is sum/2.',
      },
    },
    hints: [
      'If total sum is odd, can you ever partition equally?',
      'What sum does each partition need to have?',
      'This is similar to the subset sum problem',
    ],
    solution: `def canPartition(nums):
    """
    Check if array can be partitioned into two equal sum subsets.

    Reduces to: can we find a subset with sum = total/2?
    """
    total = sum(nums)

    # Odd sum can't be split equally
    if total % 2:
        return False

    target = total // 2
    dp = [False] * (target + 1)
    dp[0] = True  # Empty subset has sum 0

    for num in nums:
        # Reverse to avoid reusing num
        for j in range(target, num - 1, -1):
            dp[j] = dp[j] or dp[j - num]

    return dp[target]`,
    testCases: [
      { input: 'nums = [1,5,11,5]', expected: 'true' },
      { input: 'nums = [1,2,3,5]', expected: 'false' },
    ],
  },

  // 11. Find the Smallest Divisor Given a Threshold (#1283) - Medium
  {
    id: 1283,
    title: 'Find the Smallest Divisor Given a Threshold',
    difficulty: 'medium',
    leetcodeId: 1283,
    leetcodeUrl: 'https://leetcode.com/problems/find-the-smallest-divisor-given-a-threshold/',
    companies: ['PayPal', 'Google', 'Amazon'],
    pattern: 'binary-search',
    description: `Given an array of integers nums and an integer threshold, we will choose a positive integer divisor, divide all the array by it, and sum the division's results. Find the smallest divisor such that the result mentioned above is less than or equal to threshold.

Each result of the division is rounded to the nearest integer greater than or equal to that element. (For example: 7/3 = 3 and 10/2 = 5).

The test cases are generated so that there will be an answer.

Example 1:
Input: nums = [1,2,5,9], threshold = 6
Output: 5
Explanation: We can get a sum to 17 (1+1+1+2) if the divisor is 1.
If the divisor is 4 we can get a sum of 7 (1+1+2+3) and if the divisor is 5 the sum will be 5 (1+1+1+2).

Example 2:
Input: nums = [44,22,33,11,1], threshold = 5
Output: 44

Constraints:
- 1 <= nums.length <= 5 * 10^4
- 1 <= nums[i] <= 10^6
- nums.length <= threshold <= 10^6`,
    umpire: {
      understand: [
        'Divide each element by divisor, round UP (ceiling)',
        'Sum all rounded results',
        'Find SMALLEST divisor where sum <= threshold',
        'Larger divisor = smaller sum',
        'Divisor range: 1 to max(nums)',
      ],
      match: [
        'Binary Search on Answer - Search for smallest valid divisor',
        'Monotonic property: larger divisor → smaller sum',
        'Check if divisor is valid in O(n)',
      ],
      plan: [
        'Binary search on divisor from 1 to max(nums)',
        'For each mid, calculate sum of ceiling divisions',
        'If sum <= threshold, try smaller divisor (go left)',
        'If sum > threshold, need larger divisor (go right)',
        'Return the smallest valid divisor',
      ],
      implement: `def smallestDivisor(nums, threshold):
    def compute_sum(divisor):
        # Sum of ceiling divisions
        return sum((num + divisor - 1) // divisor for num in nums)

    left, right = 1, max(nums)

    while left < right:
        mid = left + (right - left) // 2

        if compute_sum(mid) <= threshold:
            right = mid  # Try smaller divisor
        else:
            left = mid + 1  # Need larger divisor

    return left`,
      review: [
        'Ceiling division: (num + divisor - 1) // divisor',
        'Binary search finds smallest valid divisor',
        'Right boundary is max(nums) because larger is pointless',
        'Left boundary is 1 (minimum positive divisor)',
      ],
      evaluate: {
        timeComplexity: 'O(n log m)',
        spaceComplexity: 'O(1)',
        explanation: 'Binary search O(log m) where m = max(nums). Each check is O(n).',
      },
    },
    hints: [
      'Larger divisors give smaller sums - what search property does this suggest?',
      'What\'s the range of possible divisors?',
      'Binary search can find the boundary between valid and invalid divisors',
    ],
    solution: `def smallestDivisor(nums, threshold):
    """
    Binary search for smallest divisor where sum <= threshold.

    Key insight: Larger divisor → smaller sum (monotonic).
    """
    def calc_sum(divisor):
        # Ceiling division: (a + b - 1) // b
        return sum((num + divisor - 1) // divisor for num in nums)

    left, right = 1, max(nums)

    while left < right:
        mid = left + (right - left) // 2

        if calc_sum(mid) <= threshold:
            right = mid  # Valid, try smaller
        else:
            left = mid + 1  # Invalid, need larger

    return left`,
    testCases: [
      { input: 'nums = [1,2,5,9], threshold = 6', expected: '5' },
      { input: 'nums = [44,22,33,11,1], threshold = 5', expected: '44' },
    ],
  },
];

// Helper functions
export function getProblemById(id: number): Problem | undefined {
  return problems.find(p => p.id === id);
}

export function getProblemsByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): Problem[] {
  return problems.filter(p => p.difficulty === difficulty);
}

export function getProblemsByPattern(pattern: string): Problem[] {
  return problems.filter(p => p.pattern === pattern);
}

export function getProblemsForPayPal(): Problem[] {
  return problems.filter(p => p.companies.includes('PayPal'));
}
