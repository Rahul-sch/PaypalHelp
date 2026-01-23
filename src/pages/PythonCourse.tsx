import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Code2, BookOpen, HelpCircle, Trophy, ChevronLeft } from 'lucide-react';
import { ModuleCard, LessonView, Quiz } from '../components/python';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { pythonModules, getModuleById } from '../data/pythonLessons';
import { useProgressStore } from '../stores';
import type { PythonModule } from '../types';

type ViewState =
  | { type: 'modules' }
  | { type: 'module'; moduleId: string }
  | { type: 'lesson'; moduleId: string; lessonIndex: number }
  | { type: 'quiz'; moduleId: string; quizIndex: number };

export function PythonCourse() {
  const [viewState, setViewState] = useState<ViewState>({ type: 'modules' });
  const { completedLessons, quizScores } = useProgressStore();

  // Calculate overall progress
  const totalLessons = pythonModules.reduce((sum, m) => sum + m.lessons.length, 0);
  const completedLessonCount = completedLessons.filter((id) =>
    pythonModules.some((m) => m.lessons.some((l) => l.id === id))
  ).length;
  const overallProgress = (completedLessonCount / totalLessons) * 100;

  const handleModuleClick = useCallback((moduleId: string) => {
    setViewState({ type: 'module', moduleId });
  }, []);

  const handleLessonClick = useCallback((moduleId: string, lessonIndex: number) => {
    setViewState({ type: 'lesson', moduleId, lessonIndex });
  }, []);

  const handleQuizClick = useCallback((moduleId: string, quizIndex: number) => {
    setViewState({ type: 'quiz', moduleId, quizIndex });
  }, []);

  const handleBack = useCallback(() => {
    if (viewState.type === 'lesson' || viewState.type === 'quiz') {
      setViewState({ type: 'module', moduleId: viewState.moduleId });
    } else if (viewState.type === 'module') {
      setViewState({ type: 'modules' });
    }
  }, [viewState]);

  // Render based on view state
  if (viewState.type === 'lesson') {
    const module = getModuleById(viewState.moduleId);
    if (!module) return null;

    const lesson = module.lessons[viewState.lessonIndex];
    const hasNext = viewState.lessonIndex < module.lessons.length - 1;
    const hasPrevious = viewState.lessonIndex > 0;

    return (
      <LessonView
        lesson={lesson}
        module={module}
        onComplete={() => {
          if (hasNext) {
            setViewState({
              type: 'lesson',
              moduleId: viewState.moduleId,
              lessonIndex: viewState.lessonIndex + 1,
            });
          } else {
            setViewState({ type: 'module', moduleId: viewState.moduleId });
          }
        }}
        onBack={handleBack}
        onNext={
          hasNext
            ? () =>
                setViewState({
                  type: 'lesson',
                  moduleId: viewState.moduleId,
                  lessonIndex: viewState.lessonIndex + 1,
                })
            : undefined
        }
        onPrevious={
          hasPrevious
            ? () =>
                setViewState({
                  type: 'lesson',
                  moduleId: viewState.moduleId,
                  lessonIndex: viewState.lessonIndex - 1,
                })
            : undefined
        }
        hasNext={hasNext}
        hasPrevious={hasPrevious}
      />
    );
  }

  if (viewState.type === 'quiz') {
    const module = getModuleById(viewState.moduleId);
    if (!module) return null;

    const quiz = module.quizzes[viewState.quizIndex];

    return (
      <Quiz
        quiz={quiz}
        onComplete={() => setViewState({ type: 'module', moduleId: viewState.moduleId })}
        onBack={handleBack}
      />
    );
  }

  if (viewState.type === 'module') {
    const module = getModuleById(viewState.moduleId);
    if (!module) return null;

    return (
      <ModuleDetail
        module={module}
        onBack={handleBack}
        onLessonClick={(index) => handleLessonClick(module.id, index)}
        onQuizClick={(index) => handleQuizClick(module.id, index)}
        completedLessons={completedLessons}
        quizScores={quizScores}
      />
    );
  }

  // Module list view
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <Code2 className="h-8 w-8 text-success" />
          Python Crash Course
        </h1>
        <p className="text-muted-foreground">
          Master Python fundamentals for coding interviews
        </p>
      </motion.div>

      {/* Overall Progress */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-foreground">Overall Progress</h3>
            <p className="text-sm text-muted-foreground">
              {completedLessonCount} of {totalLessons} lessons completed
            </p>
          </div>
          <div className="text-2xl font-bold text-primary">
            {Math.round(overallProgress)}%
          </div>
        </div>
        <Progress value={overallProgress} className="h-2" />
      </Card>

      {/* Module Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {pythonModules.map((module) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: module.order * 0.05 }}
          >
            <ModuleCard
              module={module}
              onClick={() => handleModuleClick(module.id)}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Module detail view component
interface ModuleDetailProps {
  module: PythonModule;
  onBack: () => void;
  onLessonClick: (index: number) => void;
  onQuizClick: (index: number) => void;
  completedLessons: string[];
  quizScores: Record<string, number>;
}

function ModuleDetail({
  module,
  onBack,
  onLessonClick,
  onQuizClick,
  completedLessons,
  quizScores,
}: ModuleDetailProps) {
  const completedCount = module.lessons.filter((l) =>
    completedLessons.includes(l.id)
  ).length;
  const progress = (completedCount / module.lessons.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{module.title}</h1>
          <p className="text-muted-foreground">{module.description}</p>
        </div>
      </div>

      {/* Progress */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">
            {completedCount} of {module.lessons.length} lessons
          </span>
          <span className="text-sm font-medium text-primary">
            {Math.round(progress)}%
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </Card>

      {/* Lessons */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          Lessons
        </h2>
        <div className="space-y-2">
          {module.lessons.map((lesson, index) => {
            const isCompleted = completedLessons.includes(lesson.id);
            return (
              <button
                key={lesson.id}
                onClick={() => onLessonClick(index)}
                className="w-full p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors text-left flex items-center gap-4"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    isCompleted
                      ? 'bg-success/20 text-success'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {isCompleted ? '✓' : index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">{lesson.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {lesson.codeExamples.length} code examples
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quizzes */}
      {module.quizzes.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-warning" />
            Quizzes
          </h2>
          <div className="space-y-2">
            {module.quizzes.map((quiz, index) => {
              const score = quizScores[quiz.id];
              const hasTaken = score !== undefined;
              return (
                <button
                  key={quiz.id}
                  onClick={() => onQuizClick(index)}
                  className="w-full p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors text-left flex items-center gap-4"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      hasTaken
                        ? score >= 80
                          ? 'bg-success/20 text-success'
                          : 'bg-warning/20 text-warning'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <Trophy className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{quiz.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {quiz.questions.length} questions
                    </p>
                  </div>
                  {hasTaken && (
                    <div className="text-right">
                      <p className="font-medium text-foreground">{score}%</p>
                      <p className="text-xs text-muted-foreground">Best score</p>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </motion.div>
  );
}
