import type { PythonModule } from '../../types';

export const module2ControlFlow: PythonModule = {
  id: 'module-2-control-flow',
  title: 'Control Flow',
  description: 'Conditionals, loops, and flow control statements',
  icon: 'GitBranch',
  order: 2,
  lessons: [
    {
      id: 'lesson-2-1',
      moduleId: 'module-2-control-flow',
      title: 'Conditionals',
      content: `Python uses indentation to define code blocks. The \`if\`, \`elif\`, \`else\` structure handles conditional logic.

**Key Points:**
- No parentheses needed around conditions
- Colon after each condition
- Indentation defines scope (typically 4 spaces)
- \`elif\` is short for "else if"

**Ternary Operator:**
\`value_if_true if condition else value_if_false\``,
      codeExamples: [
        {
          id: 'ex-2-1-1',
          title: 'If-Elif-Else',
          code: `score = 85

if score >= 90:
    grade = 'A'
elif score >= 80:
    grade = 'B'
elif score >= 70:
    grade = 'C'
elif score >= 60:
    grade = 'D'
else:
    grade = 'F'

print(f"Score {score} = Grade {grade}")

# Multiple conditions
age = 25
has_license = True

if age >= 18 and has_license:
    print("Can drive")
elif age >= 18:
    print("Need license")
else:
    print("Too young")`,
          language: 'python',
          explanation: 'elif chains are checked in order; first matching condition wins. Use "and"/"or" for compound conditions.',
          expectedOutput: `Score 85 = Grade B
Can drive`,
          isRunnable: true,
        },
        {
          id: 'ex-2-1-2',
          title: 'Ternary and Truthiness',
          code: `# Ternary operator
age = 20
status = "adult" if age >= 18 else "minor"
print(f"Age {age}: {status}")

# Nested ternary (use sparingly)
x = 0
sign = "positive" if x > 0 else "negative" if x < 0 else "zero"
print(f"{x} is {sign}")

# Truthiness in conditions
items = [1, 2, 3]
if items:  # Non-empty list is truthy
    print(f"Has {len(items)} items")

name = ""
if not name:  # Empty string is falsy
    name = "Anonymous"
print(f"Name: {name}")

# Common pattern: default value
value = None
result = value or "default"
print(f"Result: {result}")`,
          language: 'python',
          explanation: 'The ternary operator is great for simple conditions. Leverage Python\'s truthiness for cleaner code.',
          expectedOutput: `Age 20: adult
0 is zero
Has 3 items
Name: Anonymous
Result: default`,
          isRunnable: true,
        },
      ],
      keyPoints: [
        'Indentation defines code blocks (4 spaces recommended)',
        'No parentheses needed around conditions',
        'Ternary: value_if_true if condition else value_if_false',
        'Use truthiness: if items: instead of if len(items) > 0:',
      ],
    },
    {
      id: 'lesson-2-2',
      moduleId: 'module-2-control-flow',
      title: 'For Loops',
      content: `Python's \`for\` loop iterates over sequences (lists, strings, ranges, etc.).

**range() Function:**
- \`range(n)\`: 0 to n-1
- \`range(start, end)\`: start to end-1
- \`range(start, end, step)\`: with step

**Useful Functions:**
- \`enumerate()\`: Get index and value
- \`zip()\`: Iterate multiple sequences together
- \`reversed()\`: Iterate backwards`,
      codeExamples: [
        {
          id: 'ex-2-2-1',
          title: 'Basic For Loops',
          code: `# Iterate over list
fruits = ['apple', 'banana', 'cherry']
for fruit in fruits:
    print(f"I like {fruit}")

print()

# Using range
for i in range(5):
    print(f"Count: {i}")

print()

# range with start, end, step
for i in range(2, 10, 2):  # Even numbers from 2 to 8
    print(i, end=" ")
print()

# Iterate over string
word = "Python"
for char in word:
    print(char, end="-")
print()`,
          language: 'python',
          explanation: 'For loops iterate over any iterable. range() generates numbers on-demand (lazy evaluation).',
          expectedOutput: `I like apple
I like banana
I like cherry

Count: 0
Count: 1
Count: 2
Count: 3
Count: 4

2 4 6 8
P-y-t-h-o-n-`,
          isRunnable: true,
        },
        {
          id: 'ex-2-2-2',
          title: 'Enumerate and Zip',
          code: `# enumerate - get index and value
names = ['Alice', 'Bob', 'Charlie']
for i, name in enumerate(names):
    print(f"{i}: {name}")

print()

# Start enumerate from different index
for i, name in enumerate(names, start=1):
    print(f"Person #{i}: {name}")

print()

# zip - iterate multiple sequences
scores = [85, 92, 78]
for name, score in zip(names, scores):
    print(f"{name}: {score}")

print()

# zip with unequal lengths (stops at shortest)
a = [1, 2, 3, 4, 5]
b = ['a', 'b', 'c']
for x, y in zip(a, b):
    print(f"({x}, {y})", end=" ")
print()`,
          language: 'python',
          explanation: 'enumerate() is cleaner than manual indexing. zip() pairs elements from multiple iterables.',
          expectedOutput: `0: Alice
1: Bob
2: Charlie

Person #1: Alice
Person #2: Bob
Person #3: Charlie

Alice: 85
Bob: 92
Charlie: 78

(1, a) (2, b) (3, c) `,
          isRunnable: true,
        },
      ],
      keyPoints: [
        'Use "for x in sequence:" not "for i in range(len(sequence)):"',
        'enumerate() gives (index, value) pairs',
        'zip() combines multiple iterables',
        'range() is lazy - good for large ranges',
      ],
    },
    {
      id: 'lesson-2-3',
      moduleId: 'module-2-control-flow',
      title: 'While Loops and Control',
      content: `\`while\` loops repeat while a condition is true. Use \`break\` and \`continue\` for flow control.

**Keywords:**
- \`break\`: Exit the loop immediately
- \`continue\`: Skip to next iteration
- \`else\`: Runs if loop completes without break

**Common Patterns:**
- while True with break for input validation
- Sentinel values for termination`,
      codeExamples: [
        {
          id: 'ex-2-3-1',
          title: 'While Loops',
          code: `# Basic while
count = 0
while count < 5:
    print(f"Count: {count}")
    count += 1

print()

# while with break
numbers = [1, 2, 3, -1, 4, 5]
total = 0
for num in numbers:
    if num < 0:
        print(f"Found negative: {num}, stopping")
        break
    total += num
print(f"Sum before negative: {total}")

print()

# while True pattern
attempts = 0
while True:
    attempts += 1
    print(f"Attempt {attempts}")
    if attempts >= 3:
        print("Max attempts reached")
        break`,
          language: 'python',
          explanation: 'while True with break is common for input validation and retry logic. Always ensure there is a way to exit.',
          expectedOutput: `Count: 0
Count: 1
Count: 2
Count: 3
Count: 4

Found negative: -1, stopping
Sum before negative: 6

Attempt 1
Attempt 2
Attempt 3
Max attempts reached`,
          isRunnable: true,
        },
        {
          id: 'ex-2-3-2',
          title: 'Continue and Else',
          code: `# continue - skip iteration
print("Skip even numbers:")
for i in range(10):
    if i % 2 == 0:
        continue
    print(i, end=" ")
print()

print()

# for-else: else runs if no break
def find_prime_factor(n):
    for i in range(2, n):
        if n % i == 0:
            print(f"{n} is divisible by {i}")
            break
    else:
        print(f"{n} is prime")

find_prime_factor(17)
find_prime_factor(15)

print()

# Nested loop break
for i in range(3):
    for j in range(3):
        if i == j == 1:
            print("Breaking inner loop")
            break
        print(f"({i}, {j})", end=" ")
    print()`,
          language: 'python',
          explanation: 'The else clause on loops is unique to Python - it runs when the loop completes normally (no break).',
          expectedOutput: `Skip even numbers:
1 3 5 7 9

17 is prime
15 is divisible by 3

(0, 0) (0, 1) (0, 2)
(1, 0) Breaking inner loop
(2, 0) (2, 1) (2, 2) `,
          isRunnable: true,
        },
      ],
      keyPoints: [
        'break exits the loop, continue skips to next iteration',
        'for-else and while-else run if no break occurred',
        'while True with break is a common pattern',
        'break only exits the innermost loop',
      ],
    },
  ],
  quizzes: [
    {
      id: 'quiz-2',
      moduleId: 'module-2-control-flow',
      title: 'Control Flow Quiz',
      questions: [
        {
          id: 'q2-1',
          question: 'What does range(2, 8, 2) produce?',
          options: ['[2, 4, 6, 8]', '[2, 4, 6]', '[2, 3, 4, 5, 6, 7]', '[0, 2, 4, 6]'],
          correctAnswer: 1,
          explanation: 'range(2, 8, 2) starts at 2, ends before 8, with step 2: 2, 4, 6.',
        },
        {
          id: 'q2-2',
          question: 'What happens in a for loop\'s else clause?',
          options: [
            'Always executes',
            'Executes if loop was empty',
            'Executes if no break occurred',
            'Executes if break occurred',
          ],
          correctAnswer: 2,
          explanation: 'The else clause runs only if the loop completes without encountering a break.',
        },
        {
          id: 'q2-3',
          question: 'What is the output of: print("a" if False else "b" if False else "c")?',
          options: ['a', 'b', 'c', 'Error'],
          correctAnswer: 2,
          explanation: 'Ternary operators chain right-to-left. First condition is False, so we evaluate "b" if False else "c", which gives "c".',
        },
        {
          id: 'q2-4',
          question: 'enumerate(["a", "b"], start=10) produces:',
          options: [
            '[(10, "a"), (11, "b")]',
            '[(0, "a"), (1, "b")]',
            '[(10, "a"), (10, "b")]',
            'Error',
          ],
          correctAnswer: 0,
          explanation: 'enumerate with start=10 begins counting from 10, producing (10, "a"), (11, "b").',
        },
        {
          id: 'q2-5',
          question: 'What does continue do in a loop?',
          options: [
            'Exits the loop',
            'Skips to next iteration',
            'Restarts from beginning',
            'Pauses execution',
          ],
          correctAnswer: 1,
          explanation: 'continue skips the rest of the current iteration and moves to the next one.',
        },
      ],
    },
  ],
};
