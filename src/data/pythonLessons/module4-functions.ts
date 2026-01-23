import type { PythonModule } from '../../types';

export const module4Functions: PythonModule = {
  id: 'module-4-functions',
  title: 'Functions',
  description: 'Function definitions, arguments, lambdas, and scope',
  icon: 'Braces',
  order: 4,
  lessons: [
    {
      id: 'lesson-4-1',
      moduleId: 'module-4-functions',
      title: 'Function Basics',
      content: `Functions are defined with the \`def\` keyword. They can take parameters and return values.

**Key Concepts:**
- Parameters vs Arguments
- Return values (None if no return)
- Docstrings for documentation
- Type hints (optional but recommended)`,
      codeExamples: [
        {
          id: 'ex-4-1-1',
          title: 'Basic Functions',
          code: `# Basic function
def greet(name):
    """Greet a person by name."""
    return f"Hello, {name}!"

print(greet("Alice"))

# Function with type hints
def add(a: int, b: int) -> int:
    """Add two numbers."""
    return a + b

print(f"add(3, 5) = {add(3, 5)}")

# Multiple return values (tuple)
def min_max(numbers):
    """Return min and max of a list."""
    return min(numbers), max(numbers)

lo, hi = min_max([3, 1, 4, 1, 5, 9])
print(f"Min: {lo}, Max: {hi}")

# Early return
def is_even(n):
    if n % 2 == 0:
        return True
    return False

# Simplified
def is_even_simple(n):
    return n % 2 == 0

print(f"is_even(4): {is_even(4)}")
print(f"is_even(7): {is_even(7)}")`,
          language: 'python',
          explanation: 'Functions return None by default. Type hints are optional but help with code clarity and IDE support.',
          expectedOutput: `Hello, Alice!
add(3, 5) = 8
Min: 1, Max: 9
is_even(4): True
is_even(7): False`,
          isRunnable: true,
        },
        {
          id: 'ex-4-1-2',
          title: 'Arguments',
          code: `# Default arguments
def power(base, exponent=2):
    return base ** exponent

print(f"power(3): {power(3)}")       # Uses default
print(f"power(3, 3): {power(3, 3)}") # Override default

# Keyword arguments
def describe(name, age, city="Unknown"):
    return f"{name}, {age} years old, from {city}"

# Call with keyword args (order doesn't matter)
print(describe(age=25, name="Bob", city="NYC"))
print(describe("Alice", city="LA", age=30))

# IMPORTANT: Default mutable argument trap!
def bad_append(item, lst=[]):  # DON'T DO THIS
    lst.append(item)
    return lst

print(bad_append(1))  # [1]
print(bad_append(2))  # [1, 2] - Oops!

# Correct way
def good_append(item, lst=None):
    if lst is None:
        lst = []
    lst.append(item)
    return lst

print(good_append(1))  # [1]
print(good_append(2))  # [2] - Correct!`,
          language: 'python',
          explanation: 'Never use mutable defaults like [] or {}. Use None and create inside the function.',
          expectedOutput: `power(3): 9
power(3, 3): 27
Bob, 25 years old, from NYC
Alice, 30 years old, from LA
[1]
[1, 2]
[1]
[2]`,
          isRunnable: true,
        },
      ],
      keyPoints: [
        'Functions return None if no explicit return',
        'Type hints are optional but recommended',
        'NEVER use mutable default arguments like []',
        'Use keyword arguments for clarity',
      ],
    },
    {
      id: 'lesson-4-2',
      moduleId: 'module-4-functions',
      title: '*args and **kwargs',
      content: `Python allows functions to accept variable numbers of arguments.

**\*args:** Collects positional arguments into a tuple
**\*\*kwargs:** Collects keyword arguments into a dict

These are essential for writing flexible, reusable functions.`,
      codeExamples: [
        {
          id: 'ex-4-2-1',
          title: 'Variable Arguments',
          code: `# *args - variable positional arguments
def sum_all(*args):
    """Sum any number of arguments."""
    print(f"args: {args}, type: {type(args)}")
    return sum(args)

print(f"sum_all(1, 2): {sum_all(1, 2)}")
print(f"sum_all(1, 2, 3, 4, 5): {sum_all(1, 2, 3, 4, 5)}")

print()

# **kwargs - variable keyword arguments
def print_info(**kwargs):
    """Print all keyword arguments."""
    print(f"kwargs: {kwargs}")
    for key, value in kwargs.items():
        print(f"  {key}: {value}")

print_info(name="Alice", age=30, city="NYC")

print()

# Combining all types
def combined(required, *args, default="default", **kwargs):
    print(f"required: {required}")
    print(f"args: {args}")
    print(f"default: {default}")
    print(f"kwargs: {kwargs}")

combined("first", "a", "b", "c", default="custom", x=1, y=2)`,
          language: 'python',
          explanation: 'Order matters: regular args, *args, keyword-only args, **kwargs. This is the most flexible function signature.',
          expectedOutput: `args: (1, 2), type: <class 'tuple'>
sum_all(1, 2): 3
args: (1, 2, 3, 4, 5), type: <class 'tuple'>
sum_all(1, 2, 3, 4, 5): 15

kwargs: {'name': 'Alice', 'age': 30, 'city': 'NYC'}
  name: Alice
  age: 30
  city: NYC

required: first
args: ('a', 'b', 'c')
default: custom
kwargs: {'x': 1, 'y': 2}`,
          isRunnable: true,
        },
        {
          id: 'ex-4-2-2',
          title: 'Unpacking Arguments',
          code: `# Unpacking list/tuple with *
def add_three(a, b, c):
    return a + b + c

numbers = [1, 2, 3]
print(f"add_three(*[1,2,3]): {add_three(*numbers)}")

# Unpacking dict with **
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

params = {"name": "Alice", "greeting": "Hi"}
print(f"greet(**params): {greet(**params)}")

# Combining unpacking
args = [1, 2]
kwargs = {"c": 3}
print(f"Mixed unpacking: {add_three(*args, **kwargs)}")

# Forwarding arguments (decorator pattern)
def wrapper(func):
    def inner(*args, **kwargs):
        print(f"Calling {func.__name__}")
        return func(*args, **kwargs)
    return inner

@wrapper
def multiply(a, b):
    return a * b

print(f"multiply(3, 4): {multiply(3, 4)}")`,
          language: 'python',
          explanation: 'Use * to unpack sequences into positional args, ** to unpack dicts into keyword args. Essential for decorators.',
          expectedOutput: `add_three(*[1,2,3]): 6
greet(**params): Hi, Alice!
Mixed unpacking: 6
Calling multiply
multiply(3, 4): 12`,
          isRunnable: true,
        },
      ],
      keyPoints: [
        '*args captures extra positional args as tuple',
        '**kwargs captures extra keyword args as dict',
        'Order: positional, *args, keyword-only, **kwargs',
        'Use * and ** to unpack when calling functions',
      ],
    },
    {
      id: 'lesson-4-3',
      moduleId: 'module-4-functions',
      title: 'Lambda and Higher-Order Functions',
      content: `**Lambda** functions are anonymous, single-expression functions.

**Higher-order functions** take functions as arguments or return them:
- \`map(func, iterable)\`: Apply func to each element
- \`filter(func, iterable)\`: Keep elements where func returns True
- \`sorted(iterable, key=func)\`: Sort by custom key`,
      codeExamples: [
        {
          id: 'ex-4-3-1',
          title: 'Lambda Functions',
          code: `# Lambda syntax: lambda args: expression
square = lambda x: x ** 2
print(f"square(5): {square(5)}")

# Multiple arguments
add = lambda a, b: a + b
print(f"add(3, 4): {add(3, 4)}")

# Conditional expression in lambda
sign = lambda x: "positive" if x > 0 else "negative" if x < 0 else "zero"
print(f"sign(-5): {sign(-5)}")
print(f"sign(0): {sign(0)}")

# Lambda with default arguments
greet = lambda name, greeting="Hello": f"{greeting}, {name}!"
print(greet("Alice"))
print(greet("Bob", "Hi"))

# When to use lambda vs def
# Lambda: short, one-time use, especially for key functions
# def: multiple statements, reusable, needs docstring

# Immediately invoked lambda (rare but valid)
result = (lambda x: x + 1)(5)
print(f"IIFE lambda: {result}")`,
          language: 'python',
          explanation: 'Lambdas are best for short, throwaway functions. For anything complex, use regular def.',
          expectedOutput: `square(5): 25
add(3, 4): 7
sign(-5): negative
sign(0): zero
Hello, Alice!
Hi, Bob!
IIFE lambda: 6`,
          isRunnable: true,
        },
        {
          id: 'ex-4-3-2',
          title: 'Map, Filter, Sorted',
          code: `numbers = [1, 2, 3, 4, 5]

# map - apply function to each element
squared = list(map(lambda x: x**2, numbers))
print(f"Squared: {squared}")

# Comprehension equivalent (preferred)
squared_comp = [x**2 for x in numbers]
print(f"Squared (comp): {squared_comp}")

# filter - keep elements matching condition
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(f"Evens: {evens}")

# Comprehension equivalent
evens_comp = [x for x in numbers if x % 2 == 0]
print(f"Evens (comp): {evens_comp}")

# sorted with key function
words = ["banana", "Apple", "cherry", "Date"]
print(f"Default sort: {sorted(words)}")
print(f"Case-insensitive: {sorted(words, key=str.lower)}")
print(f"By length: {sorted(words, key=len)}")

# Sort by multiple criteria
people = [("Alice", 30), ("Bob", 25), ("Charlie", 30)]
# Sort by age, then by name
by_age_name = sorted(people, key=lambda p: (p[1], p[0]))
print(f"By age, name: {by_age_name}")

# Reverse sort
print(f"Descending age: {sorted(people, key=lambda p: p[1], reverse=True)}")`,
          language: 'python',
          explanation: 'List comprehensions are usually cleaner than map/filter. Sorted\'s key parameter is extremely powerful.',
          expectedOutput: `Squared: [1, 4, 9, 16, 25]
Squared (comp): [1, 4, 9, 16, 25]
Evens: [2, 4]
Evens (comp): [2, 4]
Default sort: ['Apple', 'Date', 'banana', 'cherry']
Case-insensitive: ['Apple', 'banana', 'cherry', 'Date']
By length: ['Date', 'Apple', 'banana', 'cherry']
By age, name: [('Bob', 25), ('Alice', 30), ('Charlie', 30)]
Descending age: [('Alice', 30), ('Charlie', 30), ('Bob', 25)]`,
          isRunnable: true,
        },
      ],
      keyPoints: [
        'Lambda: lambda args: single_expression',
        'Prefer comprehensions over map/filter for readability',
        'sorted(key=...) is powerful for custom sorting',
        'Return tuples from key function for multi-criteria sort',
      ],
    },
  ],
  quizzes: [
    {
      id: 'quiz-4',
      moduleId: 'module-4-functions',
      title: 'Functions Quiz',
      questions: [
        {
          id: 'q4-1',
          question: 'What happens if you use [] as a default argument?',
          options: [
            'Works correctly every time',
            'The list is shared between all calls',
            'Syntax error',
            'Creates a new list each call',
          ],
          correctAnswer: 1,
          explanation: 'Mutable default arguments are created once and shared. Use None as default instead.',
        },
        {
          id: 'q4-2',
          question: 'What does *args collect?',
          options: [
            'Keyword arguments as dict',
            'Positional arguments as tuple',
            'All arguments as list',
            'Required arguments only',
          ],
          correctAnswer: 1,
          explanation: '*args collects extra positional arguments into a tuple.',
        },
        {
          id: 'q4-3',
          question: 'What is sorted(["b", "A", "c"], key=str.lower)?',
          options: ['["A", "b", "c"]', '["b", "A", "c"]', '["c", "b", "A"]', '["A", "c", "b"]'],
          correctAnswer: 0,
          explanation: 'key=str.lower sorts by lowercase values but preserves original strings.',
        },
        {
          id: 'q4-4',
          question: 'Which is a valid lambda?',
          options: [
            'lambda x: x + 1; return x',
            'lambda x: x + 1',
            'lambda: return 1',
            'lambda x { return x }',
          ],
          correctAnswer: 1,
          explanation: 'Lambda can only contain a single expression, no statements like return.',
        },
        {
          id: 'q4-5',
          question: 'What does func(*[1,2,3]) do?',
          options: [
            'Passes [1,2,3] as one argument',
            'Unpacks list into three arguments',
            'Syntax error',
            'Creates a tuple',
          ],
          correctAnswer: 1,
          explanation: '* unpacks the list, so func receives three separate arguments: 1, 2, 3.',
        },
      ],
    },
  ],
};
