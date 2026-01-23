import { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, BookOpen, Code, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';
import type { PythonLesson, PythonModule } from '../../types';
import { CodePlayground } from './CodePlayground';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useProgressStore, useAchievementStore } from '../../stores';
import { cn } from '../../utils/cn';

interface LessonViewProps {
  lesson: PythonLesson;
  module: PythonModule;
  onComplete: () => void;
  onBack: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
}

export function LessonView({
  lesson,
  module,
  onComplete,
  onBack,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious,
}: LessonViewProps) {
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
  const { completedLessons, completeLesson } = useProgressStore();
  const { addXP } = useAchievementStore();

  const isCompleted = completedLessons.includes(lesson.id);
  const currentExample = lesson.codeExamples[currentExampleIndex];

  const handleMarkComplete = () => {
    if (!isCompleted) {
      completeLesson(lesson.id);
      addXP(25, 'Completed a lesson');
    }
    onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <span>{module.title}</span>
            <span>/</span>
            <span>Lesson {module.lessons.indexOf(lesson) + 1}</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
            {lesson.title}
            {isCompleted && (
              <Badge variant="success">
                <Check className="w-3 h-3 mr-1" />
                Completed
              </Badge>
            )}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Theory */}
        <div className="space-y-6">
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Concept</h3>
            </div>
            <div className="prose prose-invert prose-sm max-w-none">
              {lesson.content.split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-muted-foreground whitespace-pre-wrap">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Key Points */}
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-warning" />
              <h3 className="font-semibold text-foreground">Key Points</h3>
            </div>
            <ul className="space-y-2">
              {lesson.keyPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-primary mt-1">•</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: Code Examples */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Code className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Code Examples</h3>
            <div className="flex-1" />
            <div className="flex items-center gap-1">
              {lesson.codeExamples.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentExampleIndex(i)}
                  className={cn(
                    'w-2 h-2 rounded-full transition-colors',
                    i === currentExampleIndex ? 'bg-primary' : 'bg-muted hover:bg-muted-foreground'
                  )}
                />
              ))}
            </div>
          </div>

          {currentExample && (
            <CodePlayground
              key={currentExample.id}
              initialCode={currentExample.code}
              expectedOutput={currentExample.expectedOutput}
              title={currentExample.title}
              explanation={currentExample.explanation}
            />
          )}

          {/* Example navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentExampleIndex((i) => i - 1)}
              disabled={currentExampleIndex === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Example {currentExampleIndex + 1} of {lesson.codeExamples.length}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentExampleIndex((i) => i + 1)}
              disabled={currentExampleIndex === lesson.codeExamples.length - 1}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-border">
        <Button
          variant="ghost"
          onClick={onPrevious}
          disabled={!hasPrevious}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous Lesson
        </Button>

        <Button
          variant={isCompleted ? 'default' : 'glow'}
          onClick={handleMarkComplete}
        >
          {isCompleted ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Completed
            </>
          ) : (
            'Mark as Complete (+25 XP)'
          )}
        </Button>

        <Button
          variant="ghost"
          onClick={onNext}
          disabled={!hasNext}
        >
          Next Lesson
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </motion.div>
  );
}
