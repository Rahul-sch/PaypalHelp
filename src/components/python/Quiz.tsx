import { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Check, X, Trophy, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Quiz as QuizType, QuizQuestion } from '../../types';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Progress } from '../ui/progress';
import { useProgressStore, useAchievementStore } from '../../stores';
import { cn } from '../../utils/cn';

interface QuizProps {
  quiz: QuizType;
  onComplete: (score: number) => void;
  onBack: () => void;
}

export function Quiz({ quiz, onComplete, onBack }: QuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(quiz.questions.length).fill(null)
  );
  const [isFinished, setIsFinished] = useState(false);

  const { recordQuizScore, quizScores } = useProgressStore();
  const { addXP } = useAchievementStore();

  const currentQuestion = quiz.questions[currentIndex];
  const progress = ((currentIndex + 1) / quiz.questions.length) * 100;
  const previousBestScore = quizScores[quiz.id] || 0;

  const handleSelectAnswer = useCallback((index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  }, [showResult]);

  const handleSubmitAnswer = useCallback(() => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers];
    newAnswers[currentIndex] = selectedAnswer;
    setAnswers(newAnswers);
    setShowResult(true);
  }, [selectedAnswer, answers, currentIndex]);

  const handleNext = useCallback(() => {
    if (currentIndex < quiz.questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Calculate score
      const correctCount = answers.filter(
        (ans, i) => ans === quiz.questions[i].correctAnswer
      ).length;
      const score = Math.round((correctCount / quiz.questions.length) * 100);

      // Record score and award XP
      recordQuizScore(quiz.id, score);

      // XP based on score
      let xpEarned = 0;
      if (score === 100) {
        xpEarned = 100;
      } else if (score >= 80) {
        xpEarned = 75;
      } else if (score >= 60) {
        xpEarned = 50;
      } else {
        xpEarned = 25;
      }

      // Bonus XP for beating previous best
      if (score > previousBestScore) {
        xpEarned += 25;
      }

      addXP(xpEarned, `Quiz score: ${score}%`);
      setIsFinished(true);
    }
  }, [currentIndex, quiz.questions, answers, recordQuizScore, quiz.id, addXP, previousBestScore]);

  const handleRetry = useCallback(() => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setAnswers(new Array(quiz.questions.length).fill(null));
    setIsFinished(false);
  }, [quiz.questions.length]);

  // Calculate final score
  const correctCount = answers.filter(
    (ans, i) => ans === quiz.questions[i].correctAnswer
  ).length;
  const score = Math.round((correctCount / quiz.questions.length) * 100);

  if (isFinished) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto"
      >
        <Card variant="gradient" className="p-8 text-center">
          <Trophy
            className={cn(
              'w-16 h-16 mx-auto mb-4',
              score === 100
                ? 'text-yellow-400'
                : score >= 80
                ? 'text-primary'
                : 'text-muted-foreground'
            )}
          />
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Quiz Complete!
          </h2>
          <p className="text-4xl font-bold text-primary mb-4">{score}%</p>
          <p className="text-muted-foreground mb-6">
            You got {correctCount} out of {quiz.questions.length} questions correct.
          </p>

          {score > previousBestScore && previousBestScore > 0 && (
            <p className="text-success mb-4">
              New personal best! (+25 bonus XP)
            </p>
          )}

          <div className="flex gap-3 justify-center">
            <Button variant="ghost" onClick={handleRetry}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            <Button variant="glow" onClick={() => onComplete(score)}>
              Continue
            </Button>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back
        </Button>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-foreground">{quiz.title}</h1>
          <p className="text-sm text-muted-foreground">
            Question {currentIndex + 1} of {quiz.questions.length}
          </p>
        </div>
      </div>

      {/* Progress */}
      <Progress value={progress} className="h-2" />

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <QuestionCard
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            showResult={showResult}
            onSelectAnswer={handleSelectAnswer}
          />
        </motion.div>
      </AnimatePresence>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        {!showResult ? (
          <Button
            variant="glow"
            onClick={handleSubmitAnswer}
            disabled={selectedAnswer === null}
          >
            Submit Answer
          </Button>
        ) : (
          <Button variant="glow" onClick={handleNext}>
            {currentIndex < quiz.questions.length - 1 ? (
              <>
                Next Question
                <ChevronRight className="w-4 h-4 ml-1" />
              </>
            ) : (
              'Finish Quiz'
            )}
          </Button>
        )}
      </div>
    </div>
  );
}

interface QuestionCardProps {
  question: QuizQuestion;
  selectedAnswer: number | null;
  showResult: boolean;
  onSelectAnswer: (index: number) => void;
}

function QuestionCard({
  question,
  selectedAnswer,
  showResult,
  onSelectAnswer,
}: QuestionCardProps) {
  return (
    <Card className="p-6 space-y-6">
      <div>
        <h3 className="text-lg font-medium text-foreground mb-4">
          {question.question}
        </h3>

        {question.codeSnippet && (
          <pre className="bg-muted/50 rounded-lg p-4 text-sm font-mono mb-4 overflow-x-auto">
            {question.codeSnippet}
          </pre>
        )}
      </div>

      <div className="space-y-3">
        {question.options.map((option, i) => {
          const isSelected = selectedAnswer === i;
          const isCorrect = i === question.correctAnswer;
          const showCorrect = showResult && isCorrect;
          const showWrong = showResult && isSelected && !isCorrect;

          return (
            <button
              key={i}
              onClick={() => onSelectAnswer(i)}
              disabled={showResult}
              className={cn(
                'w-full p-4 rounded-lg border-2 text-left transition-all',
                'flex items-center gap-3',
                !showResult && isSelected && 'border-primary bg-primary/10',
                !showResult && !isSelected && 'border-border hover:border-muted-foreground',
                showCorrect && 'border-success bg-success/10',
                showWrong && 'border-destructive bg-destructive/10',
                showResult && !isSelected && !isCorrect && 'opacity-50'
              )}
            >
              <span
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
                  'border-2 flex-shrink-0',
                  !showResult && isSelected && 'border-primary bg-primary text-primary-foreground',
                  !showResult && !isSelected && 'border-muted-foreground text-muted-foreground',
                  showCorrect && 'border-success bg-success text-white',
                  showWrong && 'border-destructive bg-destructive text-white'
                )}
              >
                {showCorrect ? (
                  <Check className="w-4 h-4" />
                ) : showWrong ? (
                  <X className="w-4 h-4" />
                ) : (
                  String.fromCharCode(65 + i)
                )}
              </span>
              <span className="text-foreground">{option}</span>
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {showResult && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="pt-4 border-t border-border"
        >
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Explanation: </span>
            {question.explanation}
          </p>
        </motion.div>
      )}
    </Card>
  );
}
