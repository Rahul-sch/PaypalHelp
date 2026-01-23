import type { AlgorithmPattern, PatternKeywordMap } from '../types';

export const algorithmPatterns: AlgorithmPattern[] = [
  // 1. Prefix Sum
  {
    id: 'prefix-sum',
    name: 'Prefix Sum',
    description: 'Pre-compute cumulative sums to answer range queries in O(1) time. Build an array where each element is the sum of all elements up to that index.',
    keywords: [
      'sum', 'subarray', 'range', 'cumulative', 'continuous',
      'contiguous', 'total', 'query', 'sum between', 'sum of elements'
    ],
    whenToUse: [
      'Need to calculate sum of elements in a range multiple times',
      'Finding subarrays with a target sum',
      'Counting subarrays with specific sum properties',
      'Need O(1) range sum queries after O(n) preprocessing',
    ],
    templateCode: `def prefix_sum_template(nums):
    n = len(nums)
    # Build prefix sum array
    prefix = [0] * (n + 1)
    for i in range(n):
        prefix[i + 1] = prefix[i] + nums[i]

    # Query sum from index i to j (inclusive)
    def range_sum(i, j):
        return prefix[j + 1] - prefix[i]

    return range_sum

# Example: Subarray Sum Equals K
def subarray_sum(nums, k):
    count = 0
    curr_sum = 0
    # {prefix_sum: count of occurrences}
    prefix_counts = {0: 1}

    for num in nums:
        curr_sum += num
        # If (curr_sum - k) exists, we found subarrays
        if curr_sum - k in prefix_counts:
            count += prefix_counts[curr_sum - k]
        prefix_counts[curr_sum] = prefix_counts.get(curr_sum, 0) + 1

    return count`,
    codeExplanation: 'Build prefix[i] = sum of nums[0..i-1]. Range sum from i to j = prefix[j+1] - prefix[i]. For subarray sum problems, use a hashmap to track prefix sums.',
    timeComplexity: 'O(n) preprocessing, O(1) per query',
    spaceComplexity: 'O(n)',
    practiceProblems: ['303', '560', '974'], // Range Sum Query, Subarray Sum Equals K, Subarray Sums Divisible by K
  },

  // 2. Two Pointers
  {
    id: 'two-pointers',
    name: 'Two Pointers',
    description: 'Use two pointers moving towards each other or in the same direction to solve problems in a single pass. Works best on sorted arrays or when searching for pairs.',
    keywords: [
      'sorted', 'pair', 'two sum', 'triplet', 'closest',
      'opposite', 'palindrome', 'reverse', 'container', 'water',
      'duplicate', 'remove', 'in-place'
    ],
    whenToUse: [
      'Array is sorted or can be sorted',
      'Looking for pairs that satisfy a condition',
      'Need to compare elements from both ends',
      'Removing duplicates in-place',
      'Palindrome checking',
    ],
    templateCode: `# Pattern 1: Opposite direction (sorted array)
def two_sum_sorted(nums, target):
    left, right = 0, len(nums) - 1

    while left < right:
        curr_sum = nums[left] + nums[right]
        if curr_sum == target:
            return [left, right]
        elif curr_sum < target:
            left += 1  # Need larger sum
        else:
            right -= 1  # Need smaller sum

    return []

# Pattern 2: Same direction (remove duplicates)
def remove_duplicates(nums):
    if not nums:
        return 0

    write = 1  # Position to write next unique element
    for read in range(1, len(nums)):
        if nums[read] != nums[read - 1]:
            nums[write] = nums[read]
            write += 1

    return write

# Pattern 3: Three pointers (3Sum)
def three_sum(nums):
    nums.sort()
    result = []

    for i in range(len(nums) - 2):
        if i > 0 and nums[i] == nums[i-1]:
            continue  # Skip duplicates

        left, right = i + 1, len(nums) - 1
        while left < right:
            total = nums[i] + nums[left] + nums[right]
            if total == 0:
                result.append([nums[i], nums[left], nums[right]])
                left += 1
                right -= 1
                while left < right and nums[left] == nums[left-1]:
                    left += 1
            elif total < 0:
                left += 1
            else:
                right -= 1

    return result`,
    codeExplanation: 'For sorted arrays, start pointers at opposite ends. Move left pointer right if sum too small, right pointer left if sum too large. For same-direction, use read/write pointers.',
    timeComplexity: 'O(n) or O(n²) for 3Sum',
    spaceComplexity: 'O(1)',
    practiceProblems: ['167', '15', '11'], // Two Sum II, 3Sum, Container With Most Water
  },

  // 3. Sliding Window
  {
    id: 'sliding-window',
    name: 'Sliding Window',
    description: 'Maintain a window of elements and slide it across the array. Use for finding subarrays/substrings that meet certain criteria.',
    keywords: [
      'substring', 'subarray', 'window', 'consecutive', 'contiguous',
      'longest', 'shortest', 'maximum', 'minimum', 'at most k',
      'exactly k', 'distinct', 'unique', 'anagram'
    ],
    whenToUse: [
      'Finding longest/shortest subarray with a property',
      'Subarray with sum/product constraints',
      'Substring with character frequency conditions',
      'Fixed-size window problems',
      'Variable-size window with constraints',
    ],
    templateCode: `# Pattern 1: Fixed-size window
def fixed_window(nums, k):
    n = len(nums)
    window_sum = sum(nums[:k])
    max_sum = window_sum

    for i in range(k, n):
        window_sum += nums[i] - nums[i - k]  # Slide window
        max_sum = max(max_sum, window_sum)

    return max_sum

# Pattern 2: Variable-size window (longest with condition)
def longest_substring_k_distinct(s, k):
    char_count = {}
    left = 0
    max_len = 0

    for right in range(len(s)):
        # Expand window
        char_count[s[right]] = char_count.get(s[right], 0) + 1

        # Shrink window while invalid
        while len(char_count) > k:
            char_count[s[left]] -= 1
            if char_count[s[left]] == 0:
                del char_count[s[left]]
            left += 1

        # Update result
        max_len = max(max_len, right - left + 1)

    return max_len

# Pattern 3: Minimum window substring
def min_window(s, t):
    from collections import Counter
    need = Counter(t)
    have = {}
    have_count, need_count = 0, len(need)
    result = ""
    left = 0

    for right in range(len(s)):
        char = s[right]
        have[char] = have.get(char, 0) + 1

        if char in need and have[char] == need[char]:
            have_count += 1

        while have_count == need_count:
            if not result or right - left + 1 < len(result):
                result = s[left:right + 1]

            have[s[left]] -= 1
            if s[left] in need and have[s[left]] < need[s[left]]:
                have_count -= 1
            left += 1

    return result`,
    codeExplanation: 'Expand window by moving right pointer. When constraint violated, shrink by moving left pointer. Track window state with hashmap for character counts.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(k) where k is alphabet/distinct elements',
    practiceProblems: ['3', '76', '438'], // Longest Substring Without Repeating, Minimum Window Substring, Find All Anagrams
  },

  // 4. Fast & Slow Pointers (Floyd's)
  {
    id: 'fast-slow-pointers',
    name: 'Fast & Slow Pointers',
    description: "Floyd's Tortoise and Hare algorithm. Use two pointers moving at different speeds to detect cycles or find middle of linked list.",
    keywords: [
      'cycle', 'loop', 'circular', 'linked list', 'middle',
      'happy number', 'duplicate', 'meeting point', 'tortoise', 'hare'
    ],
    whenToUse: [
      'Detecting cycles in linked list or sequence',
      'Finding the start of a cycle',
      'Finding middle of linked list',
      'Happy number problem',
      'Finding duplicate in array (cycle detection)',
    ],
    templateCode: `# Pattern 1: Cycle detection in linked list
def has_cycle(head):
    if not head or not head.next:
        return False

    slow = head
    fast = head

    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True

    return False

# Pattern 2: Find cycle start
def detect_cycle_start(head):
    if not head or not head.next:
        return None

    # Phase 1: Detect cycle
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            break
    else:
        return None  # No cycle

    # Phase 2: Find start
    slow = head
    while slow != fast:
        slow = slow.next
        fast = fast.next

    return slow

# Pattern 3: Find middle of linked list
def find_middle(head):
    slow = fast = head

    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next

    return slow  # Middle node

# Pattern 4: Find duplicate number (array as linked list)
def find_duplicate(nums):
    # Treat array as linked list: index -> value
    slow = fast = nums[0]

    # Phase 1: Find meeting point
    while True:
        slow = nums[slow]
        fast = nums[nums[fast]]
        if slow == fast:
            break

    # Phase 2: Find cycle start (duplicate)
    slow = nums[0]
    while slow != fast:
        slow = nums[slow]
        fast = nums[fast]

    return slow`,
    codeExplanation: 'Fast moves 2x speed of slow. If cycle exists, they meet inside cycle. To find cycle start, reset slow to head, then both move at same speed until they meet.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    practiceProblems: ['141', '142', '287'], // Linked List Cycle, Linked List Cycle II, Find the Duplicate Number
  },

  // 5. Linked List Reversal
  {
    id: 'linked-list-reversal',
    name: 'Linked List Reversal',
    description: 'Reverse a linked list in-place by manipulating next pointers. Foundation for many linked list problems.',
    keywords: [
      'reverse', 'linked list', 'in-place', 'swap', 'pairs',
      'k-group', 'nodes', 'next pointer'
    ],
    whenToUse: [
      'Reversing entire linked list',
      'Reversing a portion of linked list',
      'Reversing in k-groups',
      'Swapping nodes in pairs',
      'Checking palindrome linked list',
    ],
    templateCode: `# Pattern 1: Reverse entire linked list
def reverse_list(head):
    prev = None
    curr = head

    while curr:
        next_temp = curr.next  # Save next
        curr.next = prev       # Reverse pointer
        prev = curr            # Move prev forward
        curr = next_temp       # Move curr forward

    return prev  # New head

# Pattern 2: Reverse between positions m and n
def reverse_between(head, m, n):
    if not head or m == n:
        return head

    dummy = ListNode(0)
    dummy.next = head
    prev = dummy

    # Move to position m
    for _ in range(m - 1):
        prev = prev.next

    # Reverse from m to n
    curr = prev.next
    for _ in range(n - m):
        next_node = curr.next
        curr.next = next_node.next
        next_node.next = prev.next
        prev.next = next_node

    return dummy.next

# Pattern 3: Reverse in k-groups
def reverse_k_group(head, k):
    # Count nodes
    count = 0
    curr = head
    while curr:
        count += 1
        curr = curr.next

    dummy = ListNode(0)
    dummy.next = head
    prev_group_end = dummy

    while count >= k:
        group_start = prev_group_end.next
        prev = None
        curr = group_start

        # Reverse k nodes
        for _ in range(k):
            next_temp = curr.next
            curr.next = prev
            prev = curr
            curr = next_temp

        # Connect with previous group
        prev_group_end.next = prev
        group_start.next = curr
        prev_group_end = group_start
        count -= k

    return dummy.next`,
    codeExplanation: 'Use three pointers: prev, curr, next. Save next, reverse curr->next to point to prev, advance prev to curr, advance curr to saved next. Repeat.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    practiceProblems: ['206', '92', '25'], // Reverse Linked List, Reverse Linked List II, Reverse Nodes in k-Group
  },

  // 6. Monotonic Stack
  {
    id: 'monotonic-stack',
    name: 'Monotonic Stack',
    description: 'Maintain a stack where elements are always in increasing or decreasing order. Used to find next greater/smaller elements efficiently.',
    keywords: [
      'next greater', 'next smaller', 'previous greater', 'previous smaller',
      'histogram', 'rectangle', 'temperature', 'stock span',
      'buildings', 'can see'
    ],
    whenToUse: [
      'Finding next greater/smaller element for each position',
      'Largest rectangle in histogram',
      'Daily temperatures (days until warmer)',
      'Stock span problems',
      'Trapping rain water',
    ],
    templateCode: `# Pattern 1: Next Greater Element
def next_greater(nums):
    n = len(nums)
    result = [-1] * n
    stack = []  # Store indices

    for i in range(n):
        # Pop elements smaller than current
        while stack and nums[stack[-1]] < nums[i]:
            idx = stack.pop()
            result[idx] = nums[i]
        stack.append(i)

    return result

# Pattern 2: Largest Rectangle in Histogram
def largest_rectangle(heights):
    stack = []  # Store indices
    max_area = 0
    heights.append(0)  # Sentinel to flush stack

    for i, h in enumerate(heights):
        start = i
        while stack and stack[-1][1] > h:
            idx, height = stack.pop()
            max_area = max(max_area, height * (i - idx))
            start = idx
        stack.append((start, h))

    return max_area

# Pattern 3: Daily Temperatures
def daily_temperatures(temps):
    n = len(temps)
    result = [0] * n
    stack = []  # Store indices

    for i in range(n):
        while stack and temps[stack[-1]] < temps[i]:
            prev_idx = stack.pop()
            result[prev_idx] = i - prev_idx
        stack.append(i)

    return result

# Pattern 4: Trapping Rain Water
def trap(height):
    stack = []
    water = 0

    for i, h in enumerate(height):
        while stack and height[stack[-1]] < h:
            bottom = stack.pop()
            if not stack:
                break
            width = i - stack[-1] - 1
            bounded_height = min(h, height[stack[-1]]) - height[bottom]
            water += width * bounded_height
        stack.append(i)

    return water`,
    codeExplanation: 'For next greater: iterate left to right, pop smaller elements (they found their answer). For histogram: pop when seeing smaller height, calculate area using popped height and width.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    practiceProblems: ['84', '739', '42'], // Largest Rectangle, Daily Temperatures, Trapping Rain Water
  },

  // 7. Top K Elements
  {
    id: 'top-k-elements',
    name: 'Top K Elements',
    description: 'Use a heap (priority queue) to efficiently find the k largest or smallest elements. Min-heap for k largest, max-heap for k smallest.',
    keywords: [
      'top k', 'k largest', 'k smallest', 'kth', 'frequent',
      'closest', 'heap', 'priority queue', 'sort partially'
    ],
    whenToUse: [
      'Finding k largest/smallest elements',
      'Finding kth largest/smallest element',
      'K most frequent elements',
      'K closest points to origin',
      'Merge k sorted lists',
    ],
    templateCode: `import heapq

# Pattern 1: K Largest Elements (use min-heap of size k)
def k_largest(nums, k):
    # Min-heap: smallest of k largest stays on top
    heap = []
    for num in nums:
        heapq.heappush(heap, num)
        if len(heap) > k:
            heapq.heappop(heap)  # Remove smallest
    return heap  # Contains k largest

# Pattern 2: Kth Largest Element
def find_kth_largest(nums, k):
    heap = []
    for num in nums:
        heapq.heappush(heap, num)
        if len(heap) > k:
            heapq.heappop(heap)
    return heap[0]  # Kth largest

# Pattern 3: K Most Frequent
def top_k_frequent(nums, k):
    from collections import Counter
    count = Counter(nums)
    # Use min-heap with frequency as key
    heap = []
    for num, freq in count.items():
        heapq.heappush(heap, (freq, num))
        if len(heap) > k:
            heapq.heappop(heap)
    return [num for freq, num in heap]

# Pattern 4: K Closest Points
def k_closest(points, k):
    # Max-heap (negate distance) to keep k smallest
    heap = []
    for x, y in points:
        dist = -(x*x + y*y)  # Negate for max-heap behavior
        heapq.heappush(heap, (dist, [x, y]))
        if len(heap) > k:
            heapq.heappop(heap)
    return [point for dist, point in heap]

# Pattern 5: Merge K Sorted Lists
def merge_k_lists(lists):
    heap = []
    for i, lst in enumerate(lists):
        if lst:
            heapq.heappush(heap, (lst.val, i, lst))

    dummy = ListNode(0)
    curr = dummy

    while heap:
        val, i, node = heapq.heappop(heap)
        curr.next = node
        curr = curr.next
        if node.next:
            heapq.heappush(heap, (node.next.val, i, node.next))

    return dummy.next`,
    codeExplanation: 'For k largest: use min-heap of size k. New element added, if heap > k, pop smallest. At end, heap contains k largest. Python heapq is min-heap by default.',
    timeComplexity: 'O(n log k)',
    spaceComplexity: 'O(k)',
    practiceProblems: ['215', '347', '973'], // Kth Largest, Top K Frequent, K Closest Points
  },

  // 8. Merge Intervals
  {
    id: 'merge-intervals',
    name: 'Merge Intervals',
    description: 'Sort intervals by start time, then merge overlapping ones. Used for scheduling, calendar, and range problems.',
    keywords: [
      'interval', 'merge', 'overlap', 'meeting', 'schedule',
      'calendar', 'range', 'insert', 'room', 'conflict'
    ],
    whenToUse: [
      'Merging overlapping intervals',
      'Finding if intervals overlap',
      'Inserting interval into sorted list',
      'Meeting room scheduling',
      'Finding gaps in intervals',
    ],
    templateCode: `# Pattern 1: Merge Overlapping Intervals
def merge_intervals(intervals):
    if not intervals:
        return []

    # Sort by start time
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]

    for start, end in intervals[1:]:
        if start <= merged[-1][1]:  # Overlapping
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])

    return merged

# Pattern 2: Insert Interval
def insert_interval(intervals, new):
    result = []
    i = 0
    n = len(intervals)

    # Add all intervals ending before new starts
    while i < n and intervals[i][1] < new[0]:
        result.append(intervals[i])
        i += 1

    # Merge overlapping intervals
    while i < n and intervals[i][0] <= new[1]:
        new[0] = min(new[0], intervals[i][0])
        new[1] = max(new[1], intervals[i][1])
        i += 1
    result.append(new)

    # Add remaining intervals
    result.extend(intervals[i:])
    return result

# Pattern 3: Meeting Rooms II (min rooms needed)
def min_meeting_rooms(intervals):
    import heapq
    if not intervals:
        return 0

    intervals.sort(key=lambda x: x[0])
    heap = []  # End times of ongoing meetings

    for start, end in intervals:
        if heap and heap[0] <= start:
            heapq.heappop(heap)  # Room freed up
        heapq.heappush(heap, end)

    return len(heap)

# Alternative: Event-based approach
def min_rooms_events(intervals):
    events = []
    for start, end in intervals:
        events.append((start, 1))   # Meeting starts
        events.append((end, -1))    # Meeting ends

    events.sort()
    rooms = max_rooms = 0

    for time, delta in events:
        rooms += delta
        max_rooms = max(max_rooms, rooms)

    return max_rooms`,
    codeExplanation: 'Sort by start time. For merging: if current start <= previous end, merge by taking max end. For meeting rooms: use min-heap of end times to track ongoing meetings.',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    practiceProblems: ['56', '57', '253'], // Merge Intervals, Insert Interval, Meeting Rooms II
  },

  // 9. Binary Search
  {
    id: 'binary-search',
    name: 'Binary Search',
    description: 'Divide search space in half each iteration. Works on sorted arrays or when searching for a value that satisfies a monotonic condition.',
    keywords: [
      'sorted', 'search', 'find', 'first', 'last', 'minimum',
      'maximum', 'rotated', 'peak', 'boundary', 'position',
      'target', 'insert position'
    ],
    whenToUse: [
      'Searching in sorted array',
      'Finding first/last occurrence',
      'Searching in rotated sorted array',
      'Finding peak element',
      'Binary search on answer space',
    ],
    templateCode: `# Pattern 1: Standard Binary Search
def binary_search(nums, target):
    left, right = 0, len(nums) - 1

    while left <= right:
        mid = left + (right - left) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1

# Pattern 2: Find First and Last Position
def search_range(nums, target):
    def find_first():
        left, right = 0, len(nums) - 1
        while left <= right:
            mid = left + (right - left) // 2
            if nums[mid] >= target:
                right = mid - 1
            else:
                left = mid + 1
        return left

    def find_last():
        left, right = 0, len(nums) - 1
        while left <= right:
            mid = left + (right - left) // 2
            if nums[mid] <= target:
                left = mid + 1
            else:
                right = mid - 1
        return right

    first = find_first()
    if first >= len(nums) or nums[first] != target:
        return [-1, -1]
    return [first, find_last()]

# Pattern 3: Search in Rotated Array
def search_rotated(nums, target):
    left, right = 0, len(nums) - 1

    while left <= right:
        mid = left + (right - left) // 2
        if nums[mid] == target:
            return mid

        # Left half is sorted
        if nums[left] <= nums[mid]:
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        # Right half is sorted
        else:
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1

    return -1

# Pattern 4: Binary Search on Answer
def smallest_divisor(nums, threshold):
    left, right = 1, max(nums)

    def compute_sum(divisor):
        return sum((num + divisor - 1) // divisor for num in nums)

    while left < right:
        mid = left + (right - left) // 2
        if compute_sum(mid) <= threshold:
            right = mid
        else:
            left = mid + 1

    return left`,
    codeExplanation: 'Standard: left <= right, mid = left + (right-left)//2. For first occurrence: move right when nums[mid] >= target. For rotated: check which half is sorted.',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    practiceProblems: ['34', '33', '1283'], // First and Last Position, Search in Rotated Array, Find Smallest Divisor
  },

  // 10. BFS
  {
    id: 'bfs',
    name: 'Breadth-First Search',
    description: 'Explore all nodes at current depth before moving to next depth. Uses a queue. Best for finding shortest path in unweighted graphs.',
    keywords: [
      'shortest path', 'level', 'distance', 'nearest', 'minimum steps',
      'grid', 'matrix', 'connected', 'island', 'layer', 'neighbors',
      'unweighted', 'graph traversal'
    ],
    whenToUse: [
      'Finding shortest path in unweighted graph',
      'Level-order tree traversal',
      'Finding connected components',
      'Minimum steps to reach target',
      'Word ladder problems',
    ],
    templateCode: `from collections import deque

# Pattern 1: Level Order Traversal
def level_order(root):
    if not root:
        return []

    result = []
    queue = deque([root])

    while queue:
        level = []
        level_size = len(queue)

        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

        result.append(level)

    return result

# Pattern 2: Shortest Path in Grid
def shortest_path(grid):
    if not grid or grid[0][0] == 1:
        return -1

    rows, cols = len(grid), len(grid[0])
    if grid[rows-1][cols-1] == 1:
        return -1

    queue = deque([(0, 0, 1)])  # row, col, distance
    visited = {(0, 0)}
    directions = [(-1,0), (1,0), (0,-1), (0,1), (-1,-1), (-1,1), (1,-1), (1,1)]

    while queue:
        r, c, dist = queue.popleft()

        if r == rows - 1 and c == cols - 1:
            return dist

        for dr, dc in directions:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and \\
               grid[nr][nc] == 0 and (nr, nc) not in visited:
                visited.add((nr, nc))
                queue.append((nr, nc, dist + 1))

    return -1

# Pattern 3: Number of Islands
def num_islands(grid):
    if not grid:
        return 0

    rows, cols = len(grid), len(grid[0])
    count = 0

    def bfs(r, c):
        queue = deque([(r, c)])
        grid[r][c] = '0'  # Mark visited

        while queue:
            r, c = queue.popleft()
            for dr, dc in [(-1,0), (1,0), (0,-1), (0,1)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == '1':
                    grid[nr][nc] = '0'
                    queue.append((nr, nc))

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                bfs(r, c)
                count += 1

    return count`,
    codeExplanation: 'Use a queue (FIFO). Process all nodes at current level before next level. Track visited to avoid cycles. Distance increments by 1 per level.',
    timeComplexity: 'O(V + E) or O(m*n) for grid',
    spaceComplexity: 'O(V) or O(m*n) for grid',
    practiceProblems: ['102', '200', '127'], // Level Order Traversal, Number of Islands, Word Ladder
  },

  // 11. DFS
  {
    id: 'dfs',
    name: 'Depth-First Search',
    description: 'Explore as far as possible along each branch before backtracking. Uses recursion or explicit stack. Good for exploring all paths.',
    keywords: [
      'path', 'tree', 'graph', 'traverse', 'explore', 'visit',
      'recursive', 'stack', 'pre-order', 'in-order', 'post-order',
      'all paths', 'cycle detection'
    ],
    whenToUse: [
      'Tree traversal (pre/in/post-order)',
      'Finding all paths from source to target',
      'Detecting cycles in graph',
      'Topological sorting',
      'Checking if path exists',
    ],
    templateCode: `# Pattern 1: Tree DFS (recursive)
def dfs_tree(root):
    def dfs(node):
        if not node:
            return

        # Pre-order: process before children
        print(node.val)
        dfs(node.left)
        dfs(node.right)
        # Post-order: process after children

    dfs(root)

# Pattern 2: All Paths from Source to Target
def all_paths(graph):
    # graph is adjacency list, find all paths from 0 to n-1
    target = len(graph) - 1
    result = []

    def dfs(node, path):
        if node == target:
            result.append(path[:])
            return

        for neighbor in graph[node]:
            path.append(neighbor)
            dfs(neighbor, path)
            path.pop()  # Backtrack

    dfs(0, [0])
    return result

# Pattern 3: DFS with Stack (iterative)
def dfs_iterative(root):
    if not root:
        return []

    result = []
    stack = [root]

    while stack:
        node = stack.pop()
        result.append(node.val)

        # Push right first so left is processed first
        if node.right:
            stack.append(node.right)
        if node.left:
            stack.append(node.left)

    return result

# Pattern 4: Cycle Detection in Directed Graph
def has_cycle(num_nodes, edges):
    from collections import defaultdict
    graph = defaultdict(list)
    for u, v in edges:
        graph[u].append(v)

    # 0: unvisited, 1: in current path, 2: done
    state = [0] * num_nodes

    def dfs(node):
        if state[node] == 1:  # Found cycle
            return True
        if state[node] == 2:  # Already processed
            return False

        state[node] = 1  # Mark as in path
        for neighbor in graph[node]:
            if dfs(neighbor):
                return True
        state[node] = 2  # Mark as done
        return False

    for i in range(num_nodes):
        if state[i] == 0 and dfs(i):
            return True
    return False`,
    codeExplanation: 'DFS explores depth-first using recursion or stack. Track visited nodes. For cycles in directed graph: use 3 states (unvisited, in-path, done).',
    timeComplexity: 'O(V + E) or O(n) for tree',
    spaceComplexity: 'O(V) for recursion stack',
    practiceProblems: ['104', '797', '207'], // Maximum Depth of Binary Tree, All Paths, Course Schedule
  },

  // 12. Backtracking
  {
    id: 'backtracking',
    name: 'Backtracking',
    description: 'Build solutions incrementally, abandoning paths that cannot lead to valid solutions. Used for combinatorial problems.',
    keywords: [
      'combination', 'permutation', 'subset', 'generate', 'all possible',
      'n-queens', 'sudoku', 'palindrome partition', 'word search',
      'letter combinations'
    ],
    whenToUse: [
      'Generating all permutations/combinations/subsets',
      'Solving constraint satisfaction (Sudoku, N-Queens)',
      'Finding all valid arrangements',
      'Word search in grid',
      'Phone number letter combinations',
    ],
    templateCode: `# Pattern 1: Subsets
def subsets(nums):
    result = []

    def backtrack(start, path):
        result.append(path[:])  # Add current subset

        for i in range(start, len(nums)):
            path.append(nums[i])
            backtrack(i + 1, path)
            path.pop()  # Backtrack

    backtrack(0, [])
    return result

# Pattern 2: Permutations
def permutations(nums):
    result = []

    def backtrack(path, used):
        if len(path) == len(nums):
            result.append(path[:])
            return

        for i in range(len(nums)):
            if used[i]:
                continue
            used[i] = True
            path.append(nums[i])
            backtrack(path, used)
            path.pop()
            used[i] = False

    backtrack([], [False] * len(nums))
    return result

# Pattern 3: Combination Sum
def combination_sum(candidates, target):
    result = []

    def backtrack(start, path, remaining):
        if remaining == 0:
            result.append(path[:])
            return
        if remaining < 0:
            return

        for i in range(start, len(candidates)):
            path.append(candidates[i])
            backtrack(i, path, remaining - candidates[i])  # Can reuse
            path.pop()

    backtrack(0, [], target)
    return result

# Pattern 4: N-Queens
def solve_n_queens(n):
    result = []
    board = [['.'] * n for _ in range(n)]

    def is_valid(row, col):
        for i in range(row):
            if board[i][col] == 'Q':
                return False
        for i, j in zip(range(row-1, -1, -1), range(col-1, -1, -1)):
            if board[i][j] == 'Q':
                return False
        for i, j in zip(range(row-1, -1, -1), range(col+1, n)):
            if board[i][j] == 'Q':
                return False
        return True

    def backtrack(row):
        if row == n:
            result.append([''.join(r) for r in board])
            return

        for col in range(n):
            if is_valid(row, col):
                board[row][col] = 'Q'
                backtrack(row + 1)
                board[row][col] = '.'

    backtrack(0)
    return result`,
    codeExplanation: 'Build solution step by step. At each step, try all valid choices. If stuck, backtrack by undoing last choice. Use pruning to skip invalid paths early.',
    timeComplexity: 'O(k^n) or O(n!) depending on problem',
    spaceComplexity: 'O(n) for recursion depth',
    practiceProblems: ['78', '46', '39'], // Subsets, Permutations, Combination Sum
  },

  // 13. Dynamic Programming
  {
    id: 'dynamic-programming',
    name: 'Dynamic Programming',
    description: 'Break problem into overlapping subproblems and store solutions. Choose between top-down (memoization) or bottom-up (tabulation).',
    keywords: [
      'maximum', 'minimum', 'count ways', 'optimal', 'longest',
      'shortest', 'number of ways', 'can reach', 'partition',
      'subsequence', 'substring', 'knapsack'
    ],
    whenToUse: [
      'Optimization problems (max/min)',
      'Counting problems (number of ways)',
      'Problems with overlapping subproblems',
      'Problems with optimal substructure',
      'When seeing "longest", "shortest", "count ways"',
    ],
    templateCode: `# Pattern 1: 1D DP - Climbing Stairs
def climb_stairs(n):
    if n <= 2:
        return n

    # dp[i] = ways to reach step i
    prev2, prev1 = 1, 2
    for i in range(3, n + 1):
        curr = prev1 + prev2
        prev2, prev1 = prev1, curr

    return prev1

# Pattern 2: 2D DP - Unique Paths
def unique_paths(m, n):
    # dp[i][j] = ways to reach (i, j)
    dp = [[1] * n for _ in range(m)]

    for i in range(1, m):
        for j in range(1, n):
            dp[i][j] = dp[i-1][j] + dp[i][j-1]

    return dp[m-1][n-1]

# Pattern 3: 0/1 Knapsack
def knapsack(weights, values, capacity):
    n = len(weights)
    # dp[i][w] = max value with first i items and capacity w
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]

    for i in range(1, n + 1):
        for w in range(capacity + 1):
            # Don't take item i
            dp[i][w] = dp[i-1][w]
            # Take item i (if possible)
            if weights[i-1] <= w:
                dp[i][w] = max(dp[i][w],
                              dp[i-1][w - weights[i-1]] + values[i-1])

    return dp[n][capacity]

# Pattern 4: Longest Common Subsequence
def lcs(text1, text2):
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i-1] == text2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])

    return dp[m][n]

# Pattern 5: Partition Equal Subset Sum
def can_partition(nums):
    total = sum(nums)
    if total % 2:
        return False

    target = total // 2
    dp = [False] * (target + 1)
    dp[0] = True

    for num in nums:
        for j in range(target, num - 1, -1):
            dp[j] = dp[j] or dp[j - num]

    return dp[target]`,
    codeExplanation: 'Define state (dp[i] = ?), find recurrence relation, handle base cases, fill table in right order. Space optimization: if dp[i] only depends on previous row, use 1D array.',
    timeComplexity: 'O(n*m) typically, varies by problem',
    spaceComplexity: 'O(n*m) or O(n) with optimization',
    practiceProblems: ['70', '62', '416'], // Climbing Stairs, Unique Paths, Partition Equal Subset Sum
  },

  // 14. Union Find
  {
    id: 'union-find',
    name: 'Union Find (Disjoint Set)',
    description: 'Track connected components efficiently with union and find operations. Uses path compression and union by rank for near O(1) operations.',
    keywords: [
      'connected', 'component', 'group', 'union', 'disjoint',
      'friend', 'circle', 'redundant', 'connection', 'network'
    ],
    whenToUse: [
      'Tracking connected components',
      'Detecting cycles in undirected graph',
      'Finding redundant connections',
      'Grouping elements (friend circles)',
      'Dynamic connectivity queries',
    ],
    templateCode: `class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n
        self.count = n  # Number of components

    def find(self, x):
        # Path compression
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x, y):
        px, py = self.find(x), self.find(y)
        if px == py:
            return False  # Already connected

        # Union by rank
        if self.rank[px] < self.rank[py]:
            px, py = py, px
        self.parent[py] = px
        if self.rank[px] == self.rank[py]:
            self.rank[px] += 1

        self.count -= 1
        return True

    def connected(self, x, y):
        return self.find(x) == self.find(y)

# Example: Number of Provinces (Friend Circles)
def find_provinces(is_connected):
    n = len(is_connected)
    uf = UnionFind(n)

    for i in range(n):
        for j in range(i + 1, n):
            if is_connected[i][j]:
                uf.union(i, j)

    return uf.count

# Example: Redundant Connection
def find_redundant(edges):
    n = len(edges)
    uf = UnionFind(n + 1)

    for u, v in edges:
        if not uf.union(u, v):
            return [u, v]  # This edge creates cycle

    return []

# Example: Number of Islands II (Dynamic)
def num_islands_ii(m, n, positions):
    uf = UnionFind(m * n)
    grid = [[0] * n for _ in range(m)]
    result = []
    count = 0
    directions = [(-1,0), (1,0), (0,-1), (0,1)]

    for r, c in positions:
        if grid[r][c] == 1:
            result.append(count)
            continue

        grid[r][c] = 1
        count += 1
        idx = r * n + c

        for dr, dc in directions:
            nr, nc = r + dr, c + dc
            if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] == 1:
                nidx = nr * n + nc
                if uf.union(idx, nidx):
                    count -= 1

        result.append(count)

    return result`,
    codeExplanation: 'Path compression: point directly to root during find. Union by rank: attach smaller tree under larger. Together give near O(1) amortized operations.',
    timeComplexity: 'O(α(n)) ≈ O(1) per operation',
    spaceComplexity: 'O(n)',
    practiceProblems: ['547', '684', '305'], // Number of Provinces, Redundant Connection, Number of Islands II
  },

  // 15. Trie
  {
    id: 'trie',
    name: 'Trie (Prefix Tree)',
    description: 'Tree structure for efficient string prefix operations. Each node represents a character, paths from root spell out words.',
    keywords: [
      'prefix', 'word', 'dictionary', 'autocomplete', 'search',
      'starts with', 'spell check', 'word break', 'add and search'
    ],
    whenToUse: [
      'Prefix-based searches (autocomplete)',
      'Dictionary implementation',
      'Word search problems',
      'Longest common prefix',
      'Word break problems',
    ],
    templateCode: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True

    def search(self, word):
        node = self._find_node(word)
        return node is not None and node.is_end

    def starts_with(self, prefix):
        return self._find_node(prefix) is not None

    def _find_node(self, prefix):
        node = self.root
        for char in prefix:
            if char not in node.children:
                return None
            node = node.children[char]
        return node

# Example: Word Search II (with Trie)
def find_words(board, words):
    trie = Trie()
    for word in words:
        trie.insert(word)

    rows, cols = len(board), len(board[0])
    result = set()

    def dfs(r, c, node, path):
        if node.is_end:
            result.add(path)

        if r < 0 or r >= rows or c < 0 or c >= cols:
            return

        char = board[r][c]
        if char not in node.children:
            return

        board[r][c] = '#'  # Mark visited
        next_node = node.children[char]

        for dr, dc in [(-1,0), (1,0), (0,-1), (0,1)]:
            dfs(r + dr, c + dc, next_node, path + char)

        board[r][c] = char  # Restore

    for r in range(rows):
        for c in range(cols):
            dfs(r, c, trie.root, '')

    return list(result)

# Example: Longest Word in Dictionary
def longest_word(words):
    trie = Trie()
    for word in words:
        trie.insert(word)

    result = ''
    for word in words:
        # Check if all prefixes exist
        valid = True
        for i in range(1, len(word)):
            if not trie.search(word[:i]):
                valid = False
                break

        if valid:
            if len(word) > len(result) or \\
               (len(word) == len(result) and word < result):
                result = word

    return result`,
    codeExplanation: 'Each node has children dict and is_end flag. Insert: traverse/create nodes for each char, mark end. Search: traverse, check is_end. StartsWith: just traverse.',
    timeComplexity: 'O(m) per operation where m is word length',
    spaceComplexity: 'O(n*m) where n is number of words',
    practiceProblems: ['208', '212', '720'], // Implement Trie, Word Search II, Longest Word in Dictionary
  },
];

// Keyword to pattern mapping for the pattern detector
export const patternKeywordMap: PatternKeywordMap[] = [
  { pattern: 'prefix-sum', keywords: ['sum', 'subarray', 'range query', 'cumulative', 'continuous sum'], weight: 1 },
  { pattern: 'two-pointers', keywords: ['sorted array', 'pair', 'two sum', 'triplet', 'palindrome', 'reverse', 'in-place'], weight: 1 },
  { pattern: 'sliding-window', keywords: ['substring', 'subarray', 'window', 'consecutive', 'longest', 'shortest', 'at most k', 'distinct'], weight: 1 },
  { pattern: 'fast-slow-pointers', keywords: ['cycle', 'linked list', 'middle', 'loop', 'circular', 'duplicate in array'], weight: 1 },
  { pattern: 'linked-list-reversal', keywords: ['reverse linked list', 'swap nodes', 'k-group', 'pairs'], weight: 1 },
  { pattern: 'monotonic-stack', keywords: ['next greater', 'next smaller', 'histogram', 'rectangle', 'temperature', 'span'], weight: 1 },
  { pattern: 'top-k-elements', keywords: ['top k', 'k largest', 'k smallest', 'kth', 'frequent', 'closest', 'heap'], weight: 1 },
  { pattern: 'merge-intervals', keywords: ['interval', 'merge', 'overlap', 'meeting room', 'schedule', 'calendar'], weight: 1 },
  { pattern: 'binary-search', keywords: ['sorted', 'search', 'find position', 'rotated', 'peak', 'first occurrence', 'last occurrence'], weight: 1 },
  { pattern: 'bfs', keywords: ['shortest path', 'level', 'nearest', 'minimum steps', 'grid', 'layer by layer', 'unweighted'], weight: 1 },
  { pattern: 'dfs', keywords: ['path', 'tree traversal', 'all paths', 'explore', 'recursive', 'pre-order', 'post-order'], weight: 1 },
  { pattern: 'backtracking', keywords: ['combination', 'permutation', 'subset', 'generate all', 'n-queens', 'sudoku', 'word search'], weight: 1 },
  { pattern: 'dynamic-programming', keywords: ['maximum', 'minimum', 'count ways', 'longest subsequence', 'knapsack', 'partition', 'optimal'], weight: 1 },
  { pattern: 'union-find', keywords: ['connected component', 'group', 'disjoint', 'redundant connection', 'friend circle', 'network'], weight: 1 },
  { pattern: 'trie', keywords: ['prefix', 'dictionary', 'autocomplete', 'word search', 'starts with', 'spell check'], weight: 1 },
];

// Helper function to get pattern by ID
export function getPatternById(id: string): AlgorithmPattern | undefined {
  return algorithmPatterns.find(p => p.id === id);
}
