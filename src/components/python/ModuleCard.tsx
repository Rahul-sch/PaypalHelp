import { Check, Lock, BookOpen, HelpCircle } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import type { PythonModule } from '../../types';
import { useProgressStore } from '../../stores';
import { cn } from '../../utils/cn';

interface ModuleCardProps {
  module: PythonModule;
  isLocked?: boolean;
  onClick: () => void;
}

export function ModuleCard({ module, isLocked = false, onClick }: ModuleCardProps) {
  const { completedLessons, quizScores } = useProgressStore();

  // Calculate progress
  const completedLessonCount = module.lessons.filter((l) =>
    completedLessons.includes(l.id)
  ).length;
  const totalLessons = module.lessons.length;
  const lessonProgress = (completedLessonCount / totalLessons) * 100;

  // Quiz progress
  const quizzesTaken = module.quizzes.filter((q) => quizScores[q.id] !== undefined).length;
  const bestQuizScore = Math.max(
    0,
    ...module.quizzes.map((q) => quizScores[q.id] || 0)
  );

  // Get icon component
  const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[module.icon] || BookOpen;

  const isCompleted = lessonProgress === 100 && quizzesTaken === module.quizzes.length;

  return (
    <Card
      variant={isCompleted ? 'gradient' : 'default'}
      className={cn(
        'p-6 cursor-pointer transition-all hover:scale-[1.02]',
        isLocked && 'opacity-50 cursor-not-allowed'
      )}
      onClick={isLocked ? undefined : onClick}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            'w-12 h-12 rounded-lg flex items-center justify-center',
            isCompleted
              ? 'bg-success/20 text-success'
              : 'bg-primary/20 text-primary'
          )}
        >
          {isLocked ? (
            <Lock className="w-6 h-6" />
          ) : isCompleted ? (
            <Check className="w-6 h-6" />
          ) : (
            <IconComponent className="w-6 h-6" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-foreground truncate">
              {module.title}
            </h3>
            {isCompleted && (
              <Badge variant="success">
                Complete
              </Badge>
            )}
          </div>

          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {module.description}
          </p>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <BookOpen className="w-3 h-3" />
              <span>
                {completedLessonCount}/{totalLessons} lessons
              </span>
              {module.quizzes.length > 0 && (
                <>
                  <span className="text-border">•</span>
                  <HelpCircle className="w-3 h-3" />
                  <span>
                    {quizzesTaken}/{module.quizzes.length} quizzes
                  </span>
                </>
              )}
            </div>
            <Progress value={lessonProgress} className="h-1.5" />
          </div>

          {/* Best quiz score */}
          {bestQuizScore > 0 && (
            <p className="text-xs text-muted-foreground mt-2">
              Best quiz score: {bestQuizScore}%
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
