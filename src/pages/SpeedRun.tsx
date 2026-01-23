import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Zap, Timer, Target, Play, RotateCcw, Trophy, CheckCircle, XCircle } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { algorithmPatterns } from '../data/patterns';
import { problems } from '../data/problems';
import { useAchievementStore } from '../stores';
import { cn } from '../utils/cn';

type GameMode = 'pattern-blitz' | 'complexity-quiz' | null;
type GameState = 'ready' | 'playing' | 'finished';

interface BlitzQuestion {
  id: number;
  problemDescription: string;
  correctPattern: string;
  options: string[];
}

interface ComplexityQuestion {
  id: number;
  code: string;
  correctAnswer: string;
  options: string[];
}

export function SpeedRun() {
  const [gameMode, setGameMode] = useState<GameMode>(null);
  const [gameState, setGameState] = useState<GameState>('ready');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [answers, setAnswers] = useState<(boolean | null)[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const { addXP } = useAchievementStore();

  // Generate Pattern Blitz questions
  const blitzQuestions: BlitzQuestion[] = useMemo(() => {
    const shuffledProblems = [...problems].sort(() => Math.random() - 0.5).slice(0, 10);
    return shuffledProblems.map((problem, index) => {
      const correctPattern = algorithmPatterns.find((p) => p.id === problem.pattern)?.name || 'Unknown';
      const otherPatterns = algorithmPatterns
        .filter((p) => p.id !== problem.pattern)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map((p) => p.name);
      const options = [...otherPatterns, correctPattern].sort(() => Math.random() - 0.5);

      return {
        id: index,
        problemDescription: `${problem.title}: ${problem.description.slice(0, 150)}...`,
        correctPattern,
        options,
      };
    });
  }, []);

  // Generate Complexity Quiz questions
  const complexityQuestions: ComplexityQuestion[] = useMemo(() => {
    const codeSnippets = [
      { code: 'for i in range(n):\n    print(arr[i])', answer: 'O(n)' },
      { code: 'for i in range(n):\n    for j in range(n):\n        print(i, j)', answer: 'O(n²)' },
      { code: 'left, right = 0, len(arr)-1\nwhile left < right:\n    mid = (left + right) // 2\n    if arr[mid] == target: return mid\n    elif arr[mid] < target: left = mid + 1\n    else: right = mid - 1', answer: 'O(log n)' },
      { code: 'seen = set()\nfor x in arr:\n    if x in seen: return True\n    seen.add(x)\nreturn False', answer: 'O(n)' },
      { code: 'def fib(n):\n    if n <= 1: return n\n    return fib(n-1) + fib(n-2)', answer: 'O(2^n)' },
      { code: 'arr.sort()\nreturn arr[0]', answer: 'O(n log n)' },
      { code: 'heap = []\nfor x in arr:\n    heappush(heap, x)\n    if len(heap) > k:\n        heappop(heap)\nreturn heap[0]', answer: 'O(n log k)' },
      { code: 'counter = Counter(arr)\nreturn counter.most_common(1)[0]', answer: 'O(n)' },
    ];

    const allOptions = ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'O(n²)', 'O(2^n)', 'O(n log k)'];

    return codeSnippets.slice(0, 8).map((snippet, index) => {
      const otherOptions = allOptions
        .filter((o) => o !== snippet.answer)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      const options = [...otherOptions, snippet.answer].sort(() => Math.random() - 0.5);

      return {
        id: index,
        code: snippet.code,
        correctAnswer: snippet.answer,
        options,
      };
    });
  }, []);

  const totalQuestions = gameMode === 'pattern-blitz' ? blitzQuestions.length : complexityQuestions.length;
  const timePerQuestion = gameMode === 'pattern-blitz' ? 15 : 12;

  // Timer effect
  useEffect(() => {
    if (gameState !== 'playing' || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const handleTimeUp = useCallback(() => {
    if (!showResult) {
      setAnswers((prev) => [...prev, null]);
      setShowResult(true);
      setTimeout(() => {
        moveToNext();
      }, 1500);
    }
  }, [showResult]);

  const startGame = (mode: GameMode) => {
    setGameMode(mode);
    setGameState('playing');
    setCurrentQuestion(0);
    setScore(0);
    setAnswers([]);
    setTimeLeft(timePerQuestion);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleAnswer = (answer: string) => {
    if (showResult) return;

    setSelectedAnswer(answer);
    setShowResult(true);

    const questions = gameMode === 'pattern-blitz' ? blitzQuestions : complexityQuestions;
    const currentQ = questions[currentQuestion];
    const correct = gameMode === 'pattern-blitz'
      ? answer === (currentQ as BlitzQuestion).correctPattern
      : answer === (currentQ as ComplexityQuestion).correctAnswer;

    setAnswers((prev) => [...prev, correct]);
    if (correct) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      moveToNext();
    }, 1500);
  };

  const moveToNext = () => {
    if (currentQuestion >= totalQuestions - 1) {
      endGame();
    } else {
      setCurrentQuestion((prev) => prev + 1);
      setTimeLeft(timePerQuestion);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const endGame = () => {
    setGameState('finished');
    const xpEarned = score * 10 + (score === totalQuestions ? 100 : 0);
    addXP(xpEarned, `Speed Run: ${score}/${totalQuestions} correct`);
  };

  const resetGame = () => {
    setGameMode(null);
    setGameState('ready');
    setCurrentQuestion(0);
    setScore(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const currentBlitzQ = blitzQuestions[currentQuestion];
  const currentComplexityQ = complexityQuestions[currentQuestion];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <Zap className="h-8 w-8 text-warning" />
          Speed Run
        </h1>
        <p className="text-muted-foreground">
          Race against the clock with timed challenges
        </p>
      </motion.div>

      {/* Mode Selection */}
      {gameState === 'ready' && (
        <div className="grid md:grid-cols-2 gap-6">
          <Card
            className="p-6 cursor-pointer hover:border-primary/50 transition-all"
            onClick={() => startGame('pattern-blitz')}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Pattern Blitz</h3>
                <p className="text-sm text-muted-foreground">
                  Identify patterns from problem descriptions
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Timer className="w-4 h-4" />
                15 sec/question
              </span>
              <span>10 questions</span>
            </div>
            <Button variant="glow" className="w-full mt-4">
              <Play className="w-4 h-4 mr-2" />
              Start Pattern Blitz
            </Button>
          </Card>

          <Card
            className="p-6 cursor-pointer hover:border-warning/50 transition-all"
            onClick={() => startGame('complexity-quiz')}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-warning/20 flex items-center justify-center">
                <Timer className="w-6 h-6 text-warning" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Complexity Quiz</h3>
                <p className="text-sm text-muted-foreground">
                  Analyze time complexity of code snippets
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Timer className="w-4 h-4" />
                12 sec/question
              </span>
              <span>8 questions</span>
            </div>
            <Button variant="outline" className="w-full mt-4 border-warning/50 text-warning hover:bg-warning/10">
              <Play className="w-4 h-4 mr-2" />
              Start Complexity Quiz
            </Button>
          </Card>
        </div>
      )}

      {/* Game Playing */}
      {gameState === 'playing' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {/* Progress Bar */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Question {currentQuestion + 1}/{totalQuestions}
            </span>
            <Progress value={((currentQuestion + 1) / totalQuestions) * 100} className="flex-1 h-2" />
            <Badge
              className={cn(
                timeLeft <= 5 ? 'bg-error/20 text-error' : 'bg-primary/20 text-primary'
              )}
            >
              <Timer className="w-3 h-3 mr-1" />
              {timeLeft}s
            </Badge>
          </div>

          {/* Timer Progress */}
          <Progress
            value={(timeLeft / timePerQuestion) * 100}
            className={cn(
              'h-1',
              timeLeft <= 5 && '[&>div]:bg-error'
            )}
          />

          {/* Question Card */}
          <Card className="p-6">
            {gameMode === 'pattern-blitz' && currentBlitzQ && (
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Which pattern does this problem use?
                </h3>
                <p className="text-muted-foreground mb-6 p-4 rounded-lg bg-muted/30">
                  {currentBlitzQ.problemDescription}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {currentBlitzQ.options.map((option) => {
                    const isSelected = selectedAnswer === option;
                    const isCorrect = option === currentBlitzQ.correctPattern;
                    const showState = showResult && (isSelected || isCorrect);

                    return (
                      <button
                        key={option}
                        onClick={() => handleAnswer(option)}
                        disabled={showResult}
                        className={cn(
                          'p-4 rounded-lg border text-left transition-all',
                          showState && isCorrect && 'border-success bg-success/10',
                          showState && isSelected && !isCorrect && 'border-error bg-error/10',
                          !showState && 'border-border hover:border-primary/50 bg-card',
                          showResult && 'cursor-default'
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <span className={cn(
                            'font-medium',
                            showState && isCorrect && 'text-success',
                            showState && isSelected && !isCorrect && 'text-error'
                          )}>
                            {option}
                          </span>
                          {showState && isCorrect && <CheckCircle className="w-5 h-5 text-success" />}
                          {showState && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-error" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {gameMode === 'complexity-quiz' && currentComplexityQ && (
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  What is the time complexity?
                </h3>
                <pre className="text-sm p-4 rounded-lg bg-muted/50 mb-6 overflow-x-auto">
                  <code>{currentComplexityQ.code}</code>
                </pre>
                <div className="grid grid-cols-2 gap-3">
                  {currentComplexityQ.options.map((option) => {
                    const isSelected = selectedAnswer === option;
                    const isCorrect = option === currentComplexityQ.correctAnswer;
                    const showState = showResult && (isSelected || isCorrect);

                    return (
                      <button
                        key={option}
                        onClick={() => handleAnswer(option)}
                        disabled={showResult}
                        className={cn(
                          'p-4 rounded-lg border text-left transition-all',
                          showState && isCorrect && 'border-success bg-success/10',
                          showState && isSelected && !isCorrect && 'border-error bg-error/10',
                          !showState && 'border-border hover:border-primary/50 bg-card',
                          showResult && 'cursor-default'
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <span className={cn(
                            'font-medium text-lg',
                            showState && isCorrect && 'text-success',
                            showState && isSelected && !isCorrect && 'text-error'
                          )}>
                            {option}
                          </span>
                          {showState && isCorrect && <CheckCircle className="w-5 h-5 text-success" />}
                          {showState && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-error" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </Card>

          {/* Score */}
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <span>Score: {score}/{currentQuestion + (showResult ? 1 : 0)}</span>
          </div>
        </motion.div>
      )}

      {/* Game Finished */}
      {gameState === 'finished' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="p-8 text-center">
            <Trophy
              className={cn(
                'w-16 h-16 mx-auto mb-4',
                score === totalQuestions
                  ? 'text-warning fill-warning'
                  : score >= totalQuestions * 0.7
                  ? 'text-success'
                  : 'text-primary'
              )}
            />
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {score === totalQuestions
                ? 'Perfect Score!'
                : score >= totalQuestions * 0.7
                ? 'Great Job!'
                : 'Keep Practicing!'}
            </h2>
            <p className="text-4xl font-bold text-primary mb-4">
              {score}/{totalQuestions}
            </p>
            <p className="text-muted-foreground mb-6">
              You earned {score * 10 + (score === totalQuestions ? 100 : 0)} XP
            </p>

            {/* Answer Summary */}
            <div className="flex justify-center gap-1 mb-6">
              {answers.map((correct, i) => (
                <div
                  key={i}
                  className={cn(
                    'w-3 h-3 rounded-full',
                    correct === true && 'bg-success',
                    correct === false && 'bg-error',
                    correct === null && 'bg-muted'
                  )}
                />
              ))}
            </div>

            <div className="flex gap-4 justify-center">
              <Button variant="outline" onClick={resetGame}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              <Button variant="glow" onClick={() => startGame(gameMode)}>
                <Play className="w-4 h-4 mr-2" />
                Play Again
              </Button>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
