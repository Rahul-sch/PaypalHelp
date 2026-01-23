import type { PythonModule } from '../../types';

export const module3DataStructures: PythonModule = {
  id: 'module-3-data-structures',
  title: 'Data Structures',
  description: 'Lists, dictionaries, sets, tuples, and comprehensions',
  icon: 'Database',
  order: 3,
  lessons: [
    {
      id: 'lesson-3-1',
      moduleId: 'module-3-data-structures',
      title: 'Lists',
      content: `Lists are ordered, mutable sequences. They are the most commonly used data structure in Python.

**Key Operations:**
- Access: \`lst[0]\`, \`lst[-1]\` (last element)
- Slice: \`lst[1:4]\`, \`lst[::2]\` (every other)
- Modify: \`lst[0] = x\`, \`lst.append(x)\`
- Remove: \`lst.pop()\`, \`lst.remove(x)\`

**Time Complexities:**
- Access/Assign: O(1)
- Append/Pop (end): O(1)
- Insert/Delete (middle): O(n)
- Search: O(n)`,
      codeExamples: [
        {
          id: 'ex-3-1-1',
          title: 'List Basics',
          code: `# Creating lists
nums = [1, 2, 3, 4, 5]
mixed = [1, "hello", 3.14, True]
empty = []

# Accessing elements
print(f"First: {nums[0]}, Last: {nums[-1]}")
print(f"Second to last: {nums[-2]}")

# Slicing: [start:end:step]
print(f"nums[1:4]: {nums[1:4]}")      # [2, 3, 4]
print(f"nums[:3]: {nums[:3]}")         # [1, 2, 3]
print(f"nums[2:]: {nums[2:]}")         # [3, 4, 5]
print(f"nums[::2]: {nums[::2]}")       # [1, 3, 5]
print(f"nums[::-1]: {nums[::-1]}")     # Reversed

# Modifying
nums[0] = 10
print(f"After nums[0] = 10: {nums}")

# Length and membership
print(f"Length: {len(nums)}, 3 in nums: {3 in nums}")`,
          language: 'python',
          explanation: 'Lists support negative indexing and powerful slicing. Slicing creates a new list.',
          expectedOutput: `First: 1, Last: 5
Second to last: 4
nums[1:4]: [2, 3, 4]
nums[:3]: [1, 2, 3]
nums[2:]: [3, 4, 5]
nums[::2]: [1, 3, 5]
nums[::-1]: [5, 4, 3, 2, 1]
After nums[0] = 10: [10, 2, 3, 4, 5]
Length: 5, 3 in nums: True`,
          isRunnable: true,
        },
        {
          id: 'ex-3-1-2',
          title: 'List Methods',
          code: `nums = [3, 1, 4, 1, 5, 9, 2, 6]

# Adding elements
nums.append(7)          # Add to end
nums.insert(0, 0)       # Insert at index
print(f"After append and insert: {nums}")

# Removing elements
nums.pop()              # Remove and return last
nums.pop(0)             # Remove at index
nums.remove(1)          # Remove first occurrence of value
print(f"After removals: {nums}")

# Sorting
nums.sort()             # In-place sort
print(f"Sorted: {nums}")

nums.sort(reverse=True) # Descending
print(f"Descending: {nums}")

# sorted() returns new list (original unchanged)
original = [3, 1, 2]
sorted_new = sorted(original)
print(f"Original: {original}, New sorted: {sorted_new}")

# Other methods
nums = [1, 2, 2, 3]
print(f"Count of 2: {nums.count(2)}")
print(f"Index of 3: {nums.index(3)}")

# Extend vs append
a = [1, 2]
a.extend([3, 4])  # Adds elements individually
print(f"After extend: {a}")

b = [1, 2]
b.append([3, 4])  # Adds list as single element
print(f"After append list: {b}")`,
          language: 'python',
          explanation: 'Know the difference between sort() (modifies in-place) and sorted() (returns new list). extend() flattens, append() nests.',
          expectedOutput: `After append and insert: [0, 3, 1, 4, 1, 5, 9, 2, 6, 7]
After removals: [3, 4, 1, 5, 9, 2, 6]
Sorted: [1, 2, 3, 4, 5, 6, 9]
Descending: [9, 6, 5, 4, 3, 2, 1]
Original: [3, 1, 2], New sorted: [1, 2, 3]
Count of 2: 2
Index of 3: 3
After extend: [1, 2, 3, 4]
After append list: [1, 2, [3, 4]]`,
          isRunnable: true,
        },
      ],
      keyPoints: [
        'Lists are mutable and ordered',
        'Negative indexing: lst[-1] is the last element',
        'Slicing creates a copy: lst[:] copies the whole list',
        'sort() is in-place, sorted() returns new list',
      ],
    },
    {
      id: 'lesson-3-2',
      moduleId: 'module-3-data-structures',
      title: 'Dictionaries',
      content: `Dictionaries store key-value pairs with O(1) average lookup.

**Key Operations:**
- Access: \`d[key]\`, \`d.get(key, default)\`
- Add/Update: \`d[key] = value\`
- Delete: \`del d[key]\`, \`d.pop(key)\`
- Iterate: \`d.keys()\`, \`d.values()\`, \`d.items()\`

**Note:** Since Python 3.7+, dicts maintain insertion order.`,
      codeExamples: [
        {
          id: 'ex-3-2-1',
          title: 'Dictionary Basics',
          code: `# Creating dictionaries
person = {'name': 'Alice', 'age': 30, 'city': 'NYC'}
empty = {}
from_pairs = dict([('a', 1), ('b', 2)])

print(f"person: {person}")
print(f"from_pairs: {from_pairs}")

# Accessing values
print(f"Name: {person['name']}")

# get() with default (avoids KeyError)
print(f"Country: {person.get('country', 'Unknown')}")

# Adding/updating
person['email'] = 'alice@email.com'
person['age'] = 31  # Update existing
print(f"Updated: {person}")

# Deleting
del person['email']
age = person.pop('age')
print(f"Popped age: {age}")
print(f"After deletions: {person}")

# Membership (checks keys)
print(f"'name' in person: {'name' in person}")
print(f"'Alice' in person: {'Alice' in person}")`,
          language: 'python',
          explanation: 'Use .get() to avoid KeyError when the key might not exist. "in" checks keys, not values.',
          expectedOutput: `person: {'name': 'Alice', 'age': 30, 'city': 'NYC'}
from_pairs: {'a': 1, 'b': 2}
Name: Alice
Country: Unknown
Updated: {'name': 'Alice', 'age': 31, 'city': 'NYC', 'email': 'alice@email.com'}
Popped age: 31
After deletions: {'name': 'Alice', 'city': 'NYC'}
'name' in person: True
'Alice' in person: False`,
          isRunnable: true,
        },
        {
          id: 'ex-3-2-2',
          title: 'Dictionary Iteration',
          code: `scores = {'Alice': 95, 'Bob': 87, 'Charlie': 92}

# Iterate over keys (default)
print("Keys:")
for name in scores:
    print(f"  {name}")

# Iterate over values
print("Values:", list(scores.values()))

# Iterate over key-value pairs
print("Items:")
for name, score in scores.items():
    print(f"  {name}: {score}")

# Dictionary comprehension
doubled = {k: v * 2 for k, v in scores.items()}
print(f"Doubled: {doubled}")

# Filter with comprehension
passing = {k: v for k, v in scores.items() if v >= 90}
print(f"Passing (>=90): {passing}")

# Merging dictionaries
defaults = {'theme': 'dark', 'lang': 'en'}
user_prefs = {'lang': 'es'}
merged = {**defaults, **user_prefs}  # user_prefs overrides
print(f"Merged: {merged}")

# Python 3.9+ merge operator
# merged = defaults | user_prefs`,
          language: 'python',
          explanation: 'Use .items() for key-value iteration. Dict comprehensions are powerful for transforming data.',
          expectedOutput: `Keys:
  Alice
  Bob
  Charlie
Values: [95, 87, 92]
Items:
  Alice: 95
  Bob: 87
  Charlie: 92
Doubled: {'Alice': 190, 'Bob': 174, 'Charlie': 184}
Passing (>=90): {'Alice': 95, 'Charlie': 92}
Merged: {'theme': 'dark', 'lang': 'es'}`,
          isRunnable: true,
        },
      ],
      keyPoints: [
        'Use .get(key, default) to avoid KeyError',
        '.items() returns key-value pairs for iteration',
        'Dict comprehensions: {k: v for k, v in ...}',
        'Merge with {**d1, **d2} or d1 | d2 (Python 3.9+)',
      ],
    },
    {
      id: 'lesson-3-3',
      moduleId: 'module-3-data-structures',
      title: 'Sets and Tuples',
      content: `**Sets** are unordered collections of unique elements with O(1) lookup.

**Tuples** are immutable sequences, often used for multiple return values.

**When to use:**
- Set: Need uniqueness, fast lookup, set operations
- Tuple: Return multiple values, dict keys, immutable data`,
      codeExamples: [
        {
          id: 'ex-3-3-1',
          title: 'Sets',
          code: `# Creating sets
numbers = {1, 2, 3, 2, 1}  # Duplicates removed
print(f"Set: {numbers}")

from_list = set([1, 2, 2, 3, 3, 3])
print(f"From list: {from_list}")

# Adding and removing
numbers.add(4)
numbers.discard(5)  # No error if missing
print(f"After add/discard: {numbers}")

# Set operations
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

print(f"Union (|): {a | b}")
print(f"Intersection (&): {a & b}")
print(f"Difference (-): {a - b}")
print(f"Symmetric diff (^): {a ^ b}")

# Subset/superset
print(f"{{1,2}} <= {{1,2,3}}: {set([1,2]) <= set([1,2,3])}")

# Fast membership testing
large_list = list(range(10000))
large_set = set(large_list)
print(f"9999 in set: O(1) lookup: {9999 in large_set}")`,
          language: 'python',
          explanation: 'Sets are perfect for removing duplicates and fast membership testing. Use set operations for comparing collections.',
          expectedOutput: `Set: {1, 2, 3}
From list: {1, 2, 3}
After add/discard: {1, 2, 3, 4}
Union (|): {1, 2, 3, 4, 5, 6}
Intersection (&): {3, 4}
Difference (-): {1, 2}
Symmetric diff (^): {1, 2, 5, 6}
{1,2} <= {1,2,3}: True
9999 in set: O(1) lookup: True`,
          isRunnable: true,
        },
        {
          id: 'ex-3-3-2',
          title: 'Tuples',
          code: `# Creating tuples
point = (3, 4)
single = (1,)  # Comma required for single element
from_list = tuple([1, 2, 3])

print(f"Point: {point}")
print(f"Single: {single}, type: {type(single)}")
print(f"Without comma: {type((1))}")  # Just int!

# Unpacking
x, y = point
print(f"Unpacked: x={x}, y={y}")

# Multiple return values (tuple)
def min_max(numbers):
    return min(numbers), max(numbers)

lo, hi = min_max([3, 1, 4, 1, 5])
print(f"Min: {lo}, Max: {hi}")

# Swap variables
a, b = 1, 2
a, b = b, a
print(f"Swapped: a={a}, b={b}")

# Tuples as dict keys (immutable)
locations = {(0, 0): 'origin', (1, 0): 'right'}
print(f"Tuple as key: {locations[(0, 0)]}")

# Named tuples for clarity
from collections import namedtuple
Point = namedtuple('Point', ['x', 'y'])
p = Point(3, 4)
print(f"Named tuple: {p.x}, {p.y}")`,
          language: 'python',
          explanation: 'Tuples are great for returning multiple values and as dict keys (unlike lists). Use named tuples for self-documenting code.',
          expectedOutput: `Point: (3, 4)
Single: (1,), type: <class 'tuple'>
Without comma: <class 'int'>
Unpacked: x=3, y=4
Min: 1, Max: 5
Swapped: a=2, b=1
Tuple as key: origin
Named tuple: 3, 4`,
          isRunnable: true,
        },
      ],
      keyPoints: [
        'Sets: unordered, unique elements, O(1) lookup',
        'Use set() to remove duplicates from a list',
        'Tuples are immutable, can be dict keys',
        'Single element tuple needs comma: (1,) not (1)',
      ],
    },
    {
      id: 'lesson-3-4',
      moduleId: 'module-3-data-structures',
      title: 'Comprehensions',
      content: `Comprehensions are concise ways to create lists, sets, and dicts.

**Syntax:**
- List: \`[expr for x in iterable if condition]\`
- Set: \`{expr for x in iterable}\`
- Dict: \`{key: value for x in iterable}\`
- Generator: \`(expr for x in iterable)\` (lazy)`,
      codeExamples: [
        {
          id: 'ex-3-4-1',
          title: 'List Comprehensions',
          code: `# Basic list comprehension
squares = [x**2 for x in range(1, 6)]
print(f"Squares: {squares}")

# With condition
evens = [x for x in range(10) if x % 2 == 0]
print(f"Evens: {evens}")

# Transform and filter
words = ['Hello', 'WORLD', 'Python']
lower_long = [w.lower() for w in words if len(w) > 4]
print(f"Lower long words: {lower_long}")

# Nested loops (flatten)
matrix = [[1, 2], [3, 4], [5, 6]]
flat = [num for row in matrix for num in row]
print(f"Flattened: {flat}")

# Conditional expression in comprehension
nums = [1, -2, 3, -4, 5]
absolute = [x if x >= 0 else -x for x in nums]
print(f"Absolute: {absolute}")

# Multiple conditions
filtered = [x for x in range(20) if x % 2 == 0 if x % 3 == 0]
print(f"Divisible by 2 and 3: {filtered}")`,
          language: 'python',
          explanation: 'List comprehensions replace map() and filter() with cleaner syntax. Multiple for clauses create nested loops.',
          expectedOutput: `Squares: [1, 4, 9, 16, 25]
Evens: [0, 2, 4, 6, 8]
Lower long words: ['hello', 'world', 'python']
Flattened: [1, 2, 3, 4, 5, 6]
Absolute: [1, 2, 3, 4, 5]
Divisible by 2 and 3: [0, 6, 12, 18]`,
          isRunnable: true,
        },
        {
          id: 'ex-3-4-2',
          title: 'Set, Dict, and Generator',
          code: `# Set comprehension (removes duplicates)
nums = [1, 2, 2, 3, 3, 3]
unique_squares = {x**2 for x in nums}
print(f"Unique squares: {unique_squares}")

# Dict comprehension
words = ['hello', 'world', 'python']
word_lengths = {w: len(w) for w in words}
print(f"Word lengths: {word_lengths}")

# Invert a dictionary
inverted = {v: k for k, v in word_lengths.items()}
print(f"Inverted: {inverted}")

# Filter dict
scores = {'Alice': 85, 'Bob': 72, 'Charlie': 91}
passing = {k: v for k, v in scores.items() if v >= 80}
print(f"Passing: {passing}")

# Generator expression (lazy, memory efficient)
gen = (x**2 for x in range(5))
print(f"Generator type: {type(gen)}")
print(f"Sum of squares: {sum(gen)}")

# Generators are one-time use
gen2 = (x for x in range(3))
print(f"First iteration: {list(gen2)}")
print(f"Second iteration: {list(gen2)}")  # Empty!`,
          language: 'python',
          explanation: 'Generator expressions use () and are memory efficient for large sequences. They can only be iterated once.',
          expectedOutput: `Unique squares: {1, 4, 9}
Word lengths: {'hello': 5, 'world': 5, 'python': 6}
Inverted: {5: 'world', 6: 'python'}
Passing: {'Alice': 85, 'Charlie': 91}
Generator type: <class 'generator'>
Sum of squares: 30
First iteration: [0, 1, 2]
Second iteration: []`,
          isRunnable: true,
        },
      ],
      keyPoints: [
        '[expr for x in iter if cond] - list comprehension',
        '{key: val for x in iter} - dict comprehension',
        '(expr for x in iter) - generator (lazy, single use)',
        'Comprehensions are cleaner than map/filter',
      ],
    },
  ],
  quizzes: [
    {
      id: 'quiz-3',
      moduleId: 'module-3-data-structures',
      title: 'Data Structures Quiz',
      questions: [
        {
          id: 'q3-1',
          question: 'What is the output of [1, 2, 3][::-1]?',
          options: ['[1, 2, 3]', '[3, 2, 1]', '[1, 3]', 'Error'],
          correctAnswer: 1,
          explanation: '[::-1] is a slice with step -1, which reverses the list.',
        },
        {
          id: 'q3-2',
          question: 'What\'s the difference between list.sort() and sorted(list)?',
          options: [
            'No difference',
            'sort() returns new list, sorted() modifies in-place',
            'sort() modifies in-place, sorted() returns new list',
            'sorted() is faster',
          ],
          correctAnswer: 2,
          explanation: 'sort() modifies the list in-place and returns None. sorted() returns a new sorted list.',
        },
        {
          id: 'q3-3',
          question: 'How do you check if key "x" exists in dict d?',
          options: ['"x" in d.keys()', '"x" in d', 'd.has_key("x")', 'd.contains("x")'],
          correctAnswer: 1,
          explanation: '"x" in d is the Pythonic way. It checks keys by default and is O(1).',
        },
        {
          id: 'q3-4',
          question: 'What is type((1))?',
          options: ['tuple', 'int', 'list', 'Error'],
          correctAnswer: 1,
          explanation: '(1) is just an integer in parentheses. For a single-element tuple, use (1,) with a comma.',
        },
        {
          id: 'q3-5',
          question: 'What does {1, 2, 3} & {2, 3, 4} return?',
          options: ['{1, 2, 3, 4}', '{2, 3}', '{1, 4}', 'Error'],
          correctAnswer: 1,
          explanation: '& is the intersection operator for sets, returning elements present in both sets.',
        },
      ],
    },
  ],
};
