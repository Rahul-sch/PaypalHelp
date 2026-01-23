import { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ExternalLink,
  Check,
  Play,
  Pause,
  RotateCcw,
  Copy,
  Eye,
  EyeOff,
  Clock,
  Target,
  Lightbulb,
  Code,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { motion } from 'framer-motion';
import type { Problem, ProblemStatus } from '../../types';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { HintSystem } from './HintSystem';
import { CodeEditor } from '../shared';
import { useProgressStore, useAchievementStore } from '../../stores';
import { cn } from '../../utils/cn';

interface ProblemViewProps {
  problem: Problem;
  onBack: () => void;
}

const difficultyColors = {
  easy: 'bg-success/20 text-success',
  medium: 'bg-warning/20 text-warning',
  hard: 'bg-error/20 text-error',
};

const umpireSteps = [
  { key: 'understand', label: 'Understand', icon: Target, color: 'text-primary' },
  { key: 'match', label: 'Match', icon: Lightbulb, color: 'text-warning' },
  { key: 'plan', label: 'Plan', icon: CheckCircle, color: 'text-success' },
  { key: 'implement', label: 'Implement', icon: Code, color: 'text-primary' },
  { key: 'review', label: 'Review', icon: AlertCircle, color: 'text-warning' },
  { key: 'evaluate', label: 'Evaluate', icon: Clock, color: 'text-success' },
] as const;

export function ProblemView({ problem, onBack }: ProblemViewProps) {
  const [activeTab, setActiveTab] = useState('description');
  const [showSolution, setShowSolution] = useState(false);
  const [copied, setCopied] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  const { problemStatus, problemTimes, updateProblemStatus, recordProblemTime } = useProgressStore();
  const { addXP } = useAchievementStore();

  const problemIdStr = String(problem.id);
  const status = (problemStatus[problemIdStr] || 'not-started') as ProblemStatus;
  const bestTime = problemTimes[problemIdStr];

  // Timer logic
  useEffect(() => {
    let interval: number | undefined;

    if (timerRunning) {
      interval = window.setInterval(() => {
        setElapsedTime((prev) => prev + 1000);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning]);

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000) % 60;
    const minutes = Math.floor(ms / 60000);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleStartTimer = () => {
    setTimerRunning(true);
    if (status === 'not-started') {
      updateProblemStatus(problemIdStr, 'attempted');
    }
  };

  const handlePauseTimer = () => {
    setTimerRunning(false);
  };

  const handleResetTimer = () => {
    setTimerRunning(false);
    setElapsedTime(0);
  };

  const handleMarkSolved = () => {
    updateProblemStatus(problemIdStr, 'solved');
    recordProblemTime(problemIdStr, elapsedTime);
    addXP(100, `Solved ${problem.title}`);
    setTimerRunning(false);
  };

  const handleMarkReviewed = () => {
    updateProblemStatus(problemIdStr, 'reviewed');
    addXP(25, `Reviewed ${problem.title}`);
  };

  const handleCopySolution = async () => {
    await navigator.clipboard.writeText(problem.solution);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm text-muted-foreground">#{problem.leetcodeId}</span>
            <Badge className={difficultyColors[problem.difficulty]}>
              {problem.difficulty}
            </Badge>
            {problem.isPremium && (
              <Badge className="bg-warning/20 text-warning">Premium</Badge>
            )}
            {(status === 'solved' || status === 'reviewed') && (
              <Badge variant="success">
                <Check className="w-3 h-3 mr-1" />
                {status === 'reviewed' ? 'Reviewed' : 'Solved'}
              </Badge>
            )}
          </div>
          <h1 className="text-2xl font-bold text-foreground">{problem.title}</h1>
        </div>
        <a
          href={problem.leetcodeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border hover:bg-muted transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          LeetCode
        </a>
      </div>

      {/* Timer & Actions */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Timer */}
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-muted-foreground" />
              <span className="text-2xl font-mono font-bold text-foreground">
                {formatTime(elapsedTime)}
              </span>
            </div>

            {/* Timer Controls */}
            <div className="flex items-center gap-1">
              {!timerRunning ? (
                <Button size="sm" variant="ghost" onClick={handleStartTimer}>
                  <Play className="w-4 h-4" />
                </Button>
              ) : (
                <Button size="sm" variant="ghost" onClick={handlePauseTimer}>
                  <Pause className="w-4 h-4" />
                </Button>
              )}
              <Button size="sm" variant="ghost" onClick={handleResetTimer}>
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>

            {bestTime && (
              <span className="text-sm text-muted-foreground">
                Best: {Math.round(bestTime / 60000)}m
              </span>
            )}
          </div>

          {/* Status Actions */}
          <div className="flex items-center gap-2">
            {status !== 'solved' && status !== 'reviewed' && (
              <Button variant="glow" onClick={handleMarkSolved}>
                <Check className="w-4 h-4 mr-2" />
                Mark Solved (+100 XP)
              </Button>
            )}
            {status === 'solved' && (
              <Button variant="default" onClick={handleMarkReviewed}>
                <CheckCircle className="w-4 h-4 mr-2" />
                Mark Reviewed (+25 XP)
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Problem Description & UMPIRE */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="umpire">UMPIRE</TabsTrigger>
              <TabsTrigger value="solution">Solution</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-4">
              <Card className="p-6">
                <pre className="whitespace-pre-wrap text-sm text-muted-foreground font-sans leading-relaxed">
                  {problem.description}
                </pre>

                {/* Pattern */}
                <div className="mt-6 pt-4 border-t border-border">
                  <span className="text-sm text-muted-foreground">Pattern: </span>
                  <Badge variant="outline">
                    {problem.pattern.replace(/-/g, ' ')}
                  </Badge>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="umpire" className="mt-4 space-y-4">
              {umpireSteps.map((step) => {
                const Icon = step.icon;
                const content = step.key === 'evaluate'
                  ? problem.umpire.evaluate
                  : problem.umpire[step.key];

                return (
                  <Card key={step.key} className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon className={cn('w-5 h-5', step.color)} />
                      <h3 className="font-semibold text-foreground">{step.label}</h3>
                    </div>

                    {step.key === 'implement' ? (
                      <div className="rounded-lg overflow-hidden border border-border">
                        <CodeEditor
                          value={content as string}
                          language="python"
                          height="300px"
                          readOnly
                        />
                      </div>
                    ) : step.key === 'evaluate' ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Time:</span>
                            <code className="px-2 py-1 rounded bg-muted text-sm">
                              {(content as { timeComplexity: string }).timeComplexity}
                            </code>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Space:</span>
                            <code className="px-2 py-1 rounded bg-muted text-sm">
                              {(content as { spaceComplexity: string }).spaceComplexity}
                            </code>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {(content as { explanation: string }).explanation}
                        </p>
                      </div>
                    ) : (
                      <ul className="space-y-2">
                        {(content as string[]).map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-primary mt-1">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </Card>
                );
              })}
            </TabsContent>

            <TabsContent value="solution" className="mt-4 space-y-4">
              <Card className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Code className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-foreground">Solution</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowSolution(!showSolution)}
                    >
                      {showSolution ? (
                        <>
                          <EyeOff className="w-4 h-4 mr-1" />
                          Hide
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4 mr-1" />
                          Show
                        </>
                      )}
                    </Button>
                    {showSolution && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCopySolution}
                      >
                        {copied ? (
                          <>
                            <Check className="w-4 h-4 mr-1 text-success" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 mr-1" />
                            Copy
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>

                {showSolution ? (
                  <div className="rounded-lg overflow-hidden border border-border">
                    <CodeEditor
                      value={problem.solution}
                      language="python"
                      height="400px"
                      readOnly
                    />
                  </div>
                ) : (
                  <div className="p-8 rounded-lg border border-dashed border-border bg-muted/30 text-center">
                    <EyeOff className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Solution hidden. Try solving first!
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowSolution(true)}
                      className="mt-2"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Reveal Solution
                    </Button>
                  </div>
                )}
              </Card>

              {/* Test Cases */}
              <Card className="p-4">
                <h3 className="font-semibold text-foreground mb-3">Test Cases</h3>
                <div className="space-y-2">
                  {problem.testCases.map((tc, i) => (
                    <div key={i} className="p-3 rounded-lg bg-muted/30 border border-border">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Input: </span>
                        <code className="text-foreground">{tc.input}</code>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Expected: </span>
                        <code className="text-success">{tc.expected}</code>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right: Hints & Info */}
        <div className="space-y-6">
          {/* Hints */}
          <HintSystem hints={problem.hints} />

          {/* Companies */}
          <Card className="p-4">
            <h3 className="font-semibold text-foreground mb-3">Companies</h3>
            <div className="flex flex-wrap gap-2">
              {problem.companies.map((company) => (
                <Badge
                  key={company}
                  variant={company === 'PayPal' ? 'default' : 'outline'}
                  className={company === 'PayPal' ? 'bg-primary/20 text-primary' : ''}
                >
                  {company}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Premium Warning */}
          {problem.isPremium && problem.neetcodeUrl && (
            <Card className="p-4 border-warning/30 bg-warning/5">
              <h3 className="font-semibold text-foreground mb-2">Premium Problem</h3>
              <p className="text-sm text-muted-foreground mb-3">
                This is a LeetCode Premium problem. You can practice a similar version on NeetCode.
              </p>
              <a
                href={problem.neetcodeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                <ExternalLink className="w-3 h-3" />
                Practice on NeetCode
              </a>
            </Card>
          )}
        </div>
      </div>
    </motion.div>
  );
}
