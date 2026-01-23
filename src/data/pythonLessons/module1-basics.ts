import type { PythonModule } from '../../types';

export const module1Basics: PythonModule = {
  id: 'module-1-basics',
  title: 'Python Basics',
  description: 'Variables, data types, operators, and string formatting',
  icon: 'Code',
  order: 1,
  lessons: [
    {
      id: 'lesson-1-1',
      moduleId: 'module-1-basics',
      title: 'Variables and Data Types',
      content: `Python is dynamically typed, meaning you don't need to declare variable types explicitly.

**Basic Data Types:**
- \`int\`: Integer numbers (1, 42, -17)
- \`float\`: Decimal numbers (3.14, -0.5)
- \`str\`: Strings ("hello", 'world')
- \`bool\`: Boolean (True, False)
- \`None\`: Represents absence of value

**Type Checking:**
Use \`type()\` to check a variable's type, or \`isinstance()\` for type verification.`,
      codeExamples: [
        {
          id: 'ex-1-1-1',
          title: 'Basic Variables',
          code: `# Integer
age = 25
print(f"Age: {age}, Type: {type(age)}")

# Float
price = 19.99
print(f"Price: {price}, Type: {type(price)}")

# String
name = "PayPal"
print(f"Name: {name}, Type: {type(name)}")

# Boolean
is_active = True
print(f"Active: {is_active}, Type: {type(is_active)}")

# None
result = None
print(f"Result: {result}, Type: {type(result)}")`,
          language: 'python',
          explanation: 'Python infers types automatically. Use f-strings for clean output formatting.',
          expectedOutput: `Age: 25, Type: <class 'int'>
Price: 19.99, Type: <class 'float'>
Name: PayPal, Type: <class 'str'>
Active: True, Type: <class 'bool'>
Result: None, Type: <class 'NoneType'>`,
          isRunnable: true,
        },
        {
          id: 'ex-1-1-2',
          title: 'Type Conversion',
          code: `# String to int
num_str = "42"
num_int = int(num_str)
print(f"String '{num_str}' to int: {num_int}")

# Int to float
x = 5
x_float = float(x)
print(f"Int {x} to float: {x_float}")

# Number to string
value = 100
value_str = str(value)
print(f"Int {value} to string: '{value_str}'")

# Boolean conversion
print(f"bool(0): {bool(0)}")
print(f"bool(1): {bool(1)}")
print(f"bool(''): {bool('')}")
print(f"bool('hello'): {bool('hello')}")`,
          language: 'python',
          explanation: 'Use int(), float(), str(), bool() for explicit type conversion. Empty values are falsy.',
          expectedOutput: `String '42' to int: 42
Int 5 to float: 5.0
Int 100 to string: '100'
bool(0): False
bool(1): True
bool(''): False
bool('hello'): True`,
          isRunnable: true,
        },
      ],
      keyPoints: [
        'Python is dynamically typed - no need to declare types',
        'Use type() to check variable types',
        'Common types: int, float, str, bool, None',
        'Empty values (0, "", [], {}) are falsy in boolean context',
      ],
    },
    {
      id: 'lesson-1-2',
      moduleId: 'module-1-basics',
      title: 'Operators',
      content: `Python supports various operators for arithmetic, comparison, and logical operations.

**Arithmetic Operators:**
\`+\`, \`-\`, \`*\`, \`/\` (float division), \`//\` (integer division), \`%\` (modulo), \`**\` (power)

**Comparison Operators:**
\`==\`, \`!=\`, \`<\`, \`>\`, \`<=\`, \`>=\`

**Logical Operators:**
\`and\`, \`or\`, \`not\`

**Identity Operators:**
\`is\`, \`is not\` (compare object identity, not value)`,
      codeExamples: [
        {
          id: 'ex-1-2-1',
          title: 'Arithmetic Operations',
          code: `a, b = 17, 5

print(f"Addition: {a} + {b} = {a + b}")
print(f"Subtraction: {a} - {b} = {a - b}")
print(f"Multiplication: {a} * {b} = {a * b}")
print(f"Float Division: {a} / {b} = {a / b}")
print(f"Integer Division: {a} // {b} = {a // b}")
print(f"Modulo: {a} % {b} = {a % b}")
print(f"Power: {a} ** 2 = {a ** 2}")

# Negative modulo (Python-specific)
print(f"-17 % 5 = {-17 % 5}")  # Result is positive`,
          language: 'python',
          explanation: 'The // operator performs floor division. Python\'s modulo always returns a non-negative result when the divisor is positive.',
          expectedOutput: `Addition: 17 + 5 = 22
Subtraction: 17 - 5 = 12
Multiplication: 17 * 5 = 85
Float Division: 17 / 5 = 3.4
Integer Division: 17 // 5 = 3
Modulo: 17 % 5 = 2
Power: 17 ** 2 = 289
-17 % 5 = 3`,
          isRunnable: true,
        },
        {
          id: 'ex-1-2-2',
          title: 'Comparison and Logical',
          code: `x, y = 10, 20

# Comparison
print(f"{x} == {y}: {x == y}")
print(f"{x} < {y}: {x < y}")
print(f"{x} >= 10: {x >= 10}")

# Chained comparison (Python-specific)
print(f"5 < {x} < 15: {5 < x < 15}")

# Logical operators
print(f"True and False: {True and False}")
print(f"True or False: {True or False}")
print(f"not True: {not True}")

# Short-circuit evaluation
print(f"0 or 'default': {0 or 'default'}")
print(f"'value' and 'other': {'value' and 'other'}")`,
          language: 'python',
          explanation: 'Python supports chained comparisons. Logical operators use short-circuit evaluation and return the actual value, not just True/False.',
          expectedOutput: `10 == 20: False
10 < 20: True
10 >= 10: True
5 < 10 < 15: True
True and False: False
True or False: True
not True: False
0 or 'default': default
'value' and 'other': other`,
          isRunnable: true,
        },
      ],
      keyPoints: [
        '// is integer division, / is float division',
        'Python supports chained comparisons: a < b < c',
        'and/or return actual values, not just booleans',
        'Use "is" for identity comparison (same object), "==" for value comparison',
      ],
    },
    {
      id: 'lesson-1-3',
      moduleId: 'module-1-basics',
      title: 'String Formatting',
      content: `Python offers multiple ways to format strings. F-strings (Python 3.6+) are the most readable and efficient.

**Methods:**
1. **f-strings**: \`f"Hello {name}"\` - Most recommended
2. **format()**: \`"Hello {}".format(name)\`
3. **% formatting**: \`"Hello %s" % name\` - Legacy

**F-string Features:**
- Expressions: \`f"{2 + 2}"\`
- Formatting: \`f"{value:.2f}"\` (2 decimal places)
- Alignment: \`f"{text:>10}"\` (right-align, 10 chars)
- Debug: \`f"{var=}"\` (shows var=value)`,
      codeExamples: [
        {
          id: 'ex-1-3-1',
          title: 'F-string Basics',
          code: 'name = "PayPal"\namount = 1234.5678\nitems = 3\n\n# Basic interpolation\nprint(f"Welcome to {name}!")\n\n# Expressions in f-strings\nprint(f"Total: {items} items = ${amount * items:.2f}")\n\n# Formatting numbers\nprint(f"Amount: ${amount:.2f}")\nprint(f"Amount with commas: ${amount:,.2f}")\nprint(f"Percentage: {0.856:.1%}")\n\n# Padding and alignment\nprint(f"{\'Left\':<10}|{\'Center\':^10}|{\'Right\':>10}")\n\n# Debug format (Python 3.8+)\nx = 42\nprint(f"{x=}, {x*2=}")',
          language: 'python',
          explanation: 'F-strings support expressions, formatting specs, and even debugging output with the = specifier.',
          expectedOutput: 'Welcome to PayPal!\nTotal: 3 items = $3703.70\nAmount: $1234.57\nAmount with commas: $1,234.57\nPercentage: 85.6%\nLeft      |  Center  |     Right\nx=42, x*2=84',
          isRunnable: true,
        },
        {
          id: 'ex-1-3-2',
          title: 'String Methods',
          code: `text = "  PayPal Interview Prep  "

# Case methods
print(f"Upper: '{text.upper()}'")
print(f"Lower: '{text.lower()}'")
print(f"Title: '{text.title()}'")

# Whitespace
print(f"Strip: '{text.strip()}'")
print(f"Replace: '{text.replace('PayPal', 'Interview')}'")

# Search
print(f"'Pay' in text: {'Pay' in text}")
print(f"Index of 'Interview': {text.find('Interview')}")
print(f"Starts with 'Pay': {text.strip().startswith('Pay')}")

# Split and join
words = "one,two,three".split(",")
print(f"Split: {words}")
print(f"Join: {'-'.join(words)}")`,
          language: 'python',
          explanation: 'String methods are essential for data processing. Use strip() for cleaning input, split()/join() for parsing.',
          expectedOutput: `Upper: '  PAYPAL INTERVIEW PREP  '
Lower: '  paypal interview prep  '
Title: '  Paypal Interview Prep  '
Strip: 'PayPal Interview Prep'
Replace: '  Interview Interview Prep  '
'Pay' in text: True
Index of 'Interview': 9
Starts with 'Pay': True
Split: ['one', 'two', 'three']
Join: one-two-three`,
          isRunnable: true,
        },
      ],
      keyPoints: [
        'Always prefer f-strings for readability',
        'Use :.2f for 2 decimal places, :, for thousands separator',
        'String methods return new strings (strings are immutable)',
        'split() and join() are inverse operations',
      ],
    },
  ],
  quizzes: [
    {
      id: 'quiz-1',
      moduleId: 'module-1-basics',
      title: 'Python Basics Quiz',
      questions: [
        {
          id: 'q1-1',
          question: 'What is the result of 17 // 5 in Python?',
          options: ['3.4', '3', '2', '4'],
          correctAnswer: 1,
          explanation: 'The // operator performs integer (floor) division, which returns 3 for 17 // 5.',
        },
        {
          id: 'q1-2',
          question: 'What does f"{x=}" print when x = 42?',
          options: ['42', 'x=42', 'x = 42', 'Error'],
          correctAnswer: 1,
          explanation: 'The = specifier in f-strings (Python 3.8+) prints both the variable name and its value.',
        },
        {
          id: 'q1-3',
          question: 'What is the result of bool("")?',
          options: ['True', 'False', 'None', 'Error'],
          correctAnswer: 1,
          explanation: 'Empty strings are falsy in Python, so bool("") returns False.',
        },
        {
          id: 'q1-4',
          question: 'What does "hello" and "world" return?',
          options: ['True', 'False', '"hello"', '"world"'],
          correctAnswer: 3,
          explanation: 'Python\'s "and" returns the last value if all are truthy. Since both strings are truthy, it returns "world".',
        },
        {
          id: 'q1-5',
          question: 'What is the result of -17 % 5 in Python?',
          options: ['-2', '2', '3', '-3'],
          correctAnswer: 2,
          explanation: 'Python\'s modulo always returns a result with the same sign as the divisor. -17 = -4*5 + 3, so -17 % 5 = 3.',
        },
      ],
    },
  ],
};
