import type { PythonModule } from '../../types';

export const module7Advanced: PythonModule = {
  id: 'module-7-advanced',
  title: 'Advanced Python',
  description: 'Generators, decorators, context managers, and walrus operator',
  icon: 'Sparkles',
  order: 7,
  lessons: [
    {
      id: 'lesson-7-1',
      moduleId: 'module-7-advanced',
      title: 'Generators',
      content: `Generators produce values lazily using \`yield\`. They are memory-efficient for large sequences.

**Key Concepts:**
- \`yield\` pauses function and returns value
- Generator expressions: \`(x for x in range(n))\`
- Can only be iterated once
- Use for infinite sequences or large data`,
      codeExamples: [
        {
          id: 'ex-7-1-1',
          title: 'Generator Functions',
          code: `# Generator function with yield
def count_up_to(n):
    """Generate numbers from 1 to n."""
    i = 1
    while i <= n:
        yield i
        i += 1

# Using the generator
gen = count_up_to(5)
print(f"Generator object: {gen}")
print(f"First: {next(gen)}")
print(f"Second: {next(gen)}")
print(f"Rest: {list(gen)}")  # Exhausts remaining

# In a loop
print("Fresh generator:")
for num in count_up_to(3):
    print(f"  {num}")

# Fibonacci generator (infinite)
def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

fib = fibonacci()
first_10 = [next(fib) for _ in range(10)]
print(f"First 10 Fibonacci: {first_10}")

# Generator vs list memory
import sys
list_comp = [x**2 for x in range(1000)]
gen_exp = (x**2 for x in range(1000))
print(f"List size: {sys.getsizeof(list_comp)} bytes")
print(f"Generator size: {sys.getsizeof(gen_exp)} bytes")`,
          language: 'python',
          explanation: 'Generators are lazy - they produce values on demand. Great for large/infinite sequences.',
          expectedOutput: `Generator object: <generator object count_up_to at 0x...>
First: 1
Second: 2
Rest: [3, 4, 5]
Fresh generator:
  1
  2
  3
First 10 Fibonacci: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
List size: 8856 bytes
Generator size: 200 bytes`,
          isRunnable: true,
        },
        {
          id: 'ex-7-1-2',
          title: 'Generator Expressions and yield from',
          code: `# Generator expression
squares = (x**2 for x in range(5))
print(f"Sum of squares: {sum(squares)}")

# Can only iterate once!
squares = (x**2 for x in range(5))
print(f"First iteration: {list(squares)}")
print(f"Second iteration: {list(squares)}")  # Empty!

# yield from - delegate to another generator
def flatten(nested):
    """Flatten nested lists."""
    for item in nested:
        if isinstance(item, list):
            yield from flatten(item)  # Delegate
        else:
            yield item

nested = [1, [2, 3, [4, 5]], 6]
print(f"Flattened: {list(flatten(nested))}")

# yield from vs loop
def chain_generators(*gens):
    for gen in gens:
        yield from gen  # Cleaner than: for x in gen: yield x

gen1 = (x for x in [1, 2])
gen2 = (x for x in [3, 4])
print(f"Chained: {list(chain_generators(gen1, gen2))}")

# Send values to generator (advanced)
def running_average():
    total = 0
    count = 0
    average = None
    while True:
        value = yield average
        if value is not None:
            total += value
            count += 1
            average = total / count

avg = running_average()
next(avg)  # Prime the generator
print(f"After 10: {avg.send(10)}")
print(f"After 20: {avg.send(20)}")
print(f"After 30: {avg.send(30)}")`,
          language: 'python',
          explanation: 'yield from delegates to sub-generators. Generators can also receive values via send().',
          expectedOutput: `Sum of squares: 30
First iteration: [0, 1, 4, 9, 16]
Second iteration: []
Flattened: [1, 2, 3, 4, 5, 6]
Chained: [1, 2, 3, 4]
After 10: 10.0
After 20: 15.0
After 30: 20.0`,
          isRunnable: true,
        },
      ],
      keyPoints: [
        'yield makes a function a generator',
        'Generators are lazy and memory-efficient',
        'Can only iterate through a generator once',
        'yield from delegates to another iterable/generator',
      ],
    },
    {
      id: 'lesson-7-2',
      moduleId: 'module-7-advanced',
      title: 'Decorators',
      content: `Decorators wrap functions to extend behavior without modifying the original function.

**Syntax:**
\`\`\`python
@decorator
def function():
    pass
\`\`\`

**Common Uses:**
- Logging, timing, caching
- Authentication, validation
- Retry logic`,
      codeExamples: [
        {
          id: 'ex-7-2-1',
          title: 'Basic Decorators',
          code: `import time
from functools import wraps

# Basic decorator
def timer(func):
    @wraps(func)  # Preserves function metadata
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} took {end - start:.4f}s")
        return result
    return wrapper

@timer
def slow_function():
    """A slow function."""
    time.sleep(0.1)
    return "done"

result = slow_function()
print(f"Result: {result}")
print(f"Function name: {slow_function.__name__}")
print(f"Docstring: {slow_function.__doc__}")

# Decorator with arguments
def repeat(times):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for _ in range(times):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(times=3)
def greet(name):
    print(f"Hello, {name}!")

greet("Alice")`,
          language: 'python',
          explanation: '@wraps preserves the original function\'s name and docstring. Decorator with arguments needs an extra layer.',
          expectedOutput: `slow_function took 0.100Xs
Result: done
Function name: slow_function
Docstring: A slow function.
Hello, Alice!
Hello, Alice!
Hello, Alice!`,
          isRunnable: true,
        },
        {
          id: 'ex-7-2-2',
          title: 'Practical Decorators',
          code: `from functools import wraps, lru_cache

# Memoization decorator
def memoize(func):
    cache = {}
    @wraps(func)
    def wrapper(*args):
        if args not in cache:
            cache[args] = func(*args)
        return cache[args]
    return wrapper

@memoize
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(f"fib(30): {fibonacci(30)}")  # Fast with memoization

# Built-in lru_cache (better)
@lru_cache(maxsize=None)
def fib_lru(n):
    if n < 2:
        return n
    return fib_lru(n-1) + fib_lru(n-2)

print(f"fib_lru(50): {fib_lru(50)}")
print(f"Cache info: {fib_lru.cache_info()}")

# Retry decorator
def retry(max_attempts=3, exceptions=(Exception,)):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except exceptions as e:
                    if attempt == max_attempts - 1:
                        raise
                    print(f"Attempt {attempt + 1} failed: {e}")
            return None
        return wrapper
    return decorator

@retry(max_attempts=3)
def unreliable_function():
    import random
    if random.random() < 0.7:
        raise ValueError("Random failure")
    return "Success!"

# Note: This might succeed or fail based on random
try:
    result = unreliable_function()
    print(f"Result: {result}")
except ValueError as e:
    print(f"All attempts failed: {e}")`,
          language: 'python',
          explanation: 'lru_cache is the built-in memoization decorator. Retry decorators are common for network operations.',
          expectedOutput: `fib(30): 832040
fib_lru(50): 12586269025
Cache info: CacheInfo(hits=48, misses=51, maxsize=None, currsize=51)
...`,
          isRunnable: true,
        },
      ],
      keyPoints: [
        'Decorators wrap functions to add behavior',
        'Use @wraps to preserve function metadata',
        'lru_cache is built-in memoization',
        'Decorators with arguments need three nested functions',
      ],
    },
    {
      id: 'lesson-7-3',
      moduleId: 'module-7-advanced',
      title: 'Walrus Operator',
      content: `The walrus operator \`:=\` (Python 3.8+) assigns and returns a value in a single expression.

**Use Cases:**
- Assignment in conditions
- Avoiding repeated computation
- While loop initialization`,
      codeExamples: [
        {
          id: 'ex-7-3-1',
          title: 'Walrus Operator',
          code: `# Without walrus (repeat computation)
data = [1, 2, 3, 4, 5]
if len(data) > 3:
    print(f"Length {len(data)} is more than 3")

# With walrus (compute once)
if (n := len(data)) > 3:
    print(f"Length {n} is more than 3")

# In list comprehensions
# Filter and keep the computed value
numbers = [1, 2, 3, 4, 5]
squares_over_10 = [square for n in numbers if (square := n**2) > 10]
print(f"Squares over 10: {squares_over_10}")

# While loop pattern
# Traditional
lines = []
import io
data = io.StringIO("line1\\nline2\\nline3")
while True:
    line = data.readline()
    if not line:
        break
    lines.append(line.strip())
print(f"Traditional: {lines}")

# With walrus
data = io.StringIO("line1\\nline2\\nline3")
lines = []
while (line := data.readline()):
    lines.append(line.strip())
print(f"With walrus: {lines}")

# Regex matching
import re
text = "My email is test@example.com"
if (match := re.search(r'\\w+@\\w+\\.\\w+', text)):
    print(f"Found email: {match.group()}")

# Debug print pattern
values = [1, 2, 3]
if (count := len(values)) > 2:
    print(f"Processing {count} values: {values}")`,
          language: 'python',
          explanation: 'The walrus operator avoids computing the same expression twice. Use parentheses around the assignment.',
          expectedOutput: `Length 5 is more than 3
Length 5 is more than 3
Squares over 10: [16, 25]
Traditional: ['line1', 'line2', 'line3']
With walrus: ['line1', 'line2', 'line3']
Found email: test@example.com
Processing 3 values: [1, 2, 3]`,
          isRunnable: true,
        },
      ],
      keyPoints: [
        ':= assigns and returns value in one expression',
        'Requires parentheses in most contexts',
        'Great for avoiding repeated computation',
        'Useful in while loops and comprehensions',
      ],
    },
  ],
  quizzes: [
    {
      id: 'quiz-7',
      moduleId: 'module-7-advanced',
      title: 'Advanced Python Quiz',
      questions: [
        {
          id: 'q7-1',
          question: 'What happens when you iterate a generator twice?',
          options: [
            'Same values both times',
            'Second iteration is empty',
            'Error is raised',
            'Generator resets automatically',
          ],
          correctAnswer: 1,
          explanation: 'Generators can only be iterated once. After exhaustion, they produce no more values.',
        },
        {
          id: 'q7-2',
          question: 'What does @wraps(func) do in a decorator?',
          options: [
            'Calls the function twice',
            'Preserves original function metadata',
            'Makes the function faster',
            'Caches the function result',
          ],
          correctAnswer: 1,
          explanation: '@wraps copies __name__, __doc__, and other attributes from the original function.',
        },
        {
          id: 'q7-3',
          question: 'What is the walrus operator?',
          options: ['::', ':=', '==:', '=:'],
          correctAnswer: 1,
          explanation: ':= is the walrus operator, which assigns and returns a value in one expression.',
        },
        {
          id: 'q7-4',
          question: 'What does yield from do?',
          options: [
            'Yields all values at once',
            'Delegates to another iterable',
            'Returns from the generator',
            'Creates a new generator',
          ],
          correctAnswer: 1,
          explanation: 'yield from delegates to another iterable, yielding each of its values.',
        },
        {
          id: 'q7-5',
          question: '@lru_cache is used for:',
          options: [
            'Logging function calls',
            'Memoizing function results',
            'Limiting function execution time',
            'Retrying failed functions',
          ],
          correctAnswer: 1,
          explanation: 'lru_cache caches function results based on arguments for memoization.',
        },
      ],
    },
  ],
};
