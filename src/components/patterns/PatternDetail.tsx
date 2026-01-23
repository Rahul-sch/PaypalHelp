import { useState } from 'react';
import { ChevronLeft, Star, CheckCircle, Copy, Check, ExternalLink, Clock, HardDrive, Lightbulb, Code, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import type { AlgorithmPattern, MasteryLevel } from '../../types';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { useProgressStore, useAchievementStore } from '../../stores';
import { cn } from '../../utils/cn';
import { CodeEditor } from '../shared';

interface PatternDetailProps {
  pattern: AlgorithmPattern;
  onBack: () => void;
}

const masteryLabels: Record<MasteryLevel, string> = {
  0: 'Not Started',
  1: 'Learning',
  2: 'Familiar',
  3: 'Mastered',
};

const masteryColors: Record<MasteryLevel, string> = {
  0: 'bg-muted text-muted-foreground',
  1: 'bg-warning/20 text-warning',
  2: 'bg-primary/20 text-primary',
  3: 'bg-success/20 text-success',
};

export function PatternDetail({ pattern, onBack }: PatternDetailProps) {
  const [copied, setCopied] = useState(false);
  const { patternMastery, updatePatternMastery } = useProgressStore();
  const { addXP } = useAchievementStore();

  const mastery = (patternMastery[pattern.id] || 0) as MasteryLevel;

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(pattern.templateCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleIncreaseMastery = () => {
    if (mastery < 3) {
      const newMastery = (mastery + 1) as MasteryLevel;
      updatePatternMastery(pattern.id, newMastery);
      addXP(50, `Leveled up ${pattern.name} mastery`);
    }
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
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
            {pattern.name}
            <Badge className={cn('text-sm', masteryColors[mastery])}>
              {masteryLabels[mastery]}
            </Badge>
          </h1>
          <p className="text-muted-foreground">{pattern.description}</p>
        </div>
        {/* Mastery Stars */}
        <div className="flex items-center gap-1">
          {[1, 2, 3].map((level) => (
            <button
              key={level}
              onClick={level === mastery + 1 ? handleIncreaseMastery : undefined}
              className={cn(
                'transition-transform',
                level === mastery + 1 && 'hover:scale-125 cursor-pointer'
              )}
            >
              <Star
                className={cn(
                  'w-6 h-6',
                  level <= mastery
                    ? 'fill-warning text-warning'
                    : level === mastery + 1
                    ? 'text-warning/50 hover:text-warning'
                    : 'text-muted-foreground/30'
                )}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Complexity & Keywords */}
      <div className="flex flex-wrap gap-4">
        <Card className="p-4 flex items-center gap-3">
          <Clock className="w-5 h-5 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">Time Complexity</p>
            <p className="font-mono text-sm text-foreground">{pattern.timeComplexity}</p>
          </div>
        </Card>
        <Card className="p-4 flex items-center gap-3">
          <HardDrive className="w-5 h-5 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">Space Complexity</p>
            <p className="font-mono text-sm text-foreground">{pattern.spaceComplexity}</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: When to Use & Keywords */}
        <div className="space-y-6">
          {/* When to Use */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-success" />
              <h3 className="font-semibold text-foreground">When to Use</h3>
            </div>
            <ul className="space-y-2">
              {pattern.whenToUse.map((use, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  {use}
                </li>
              ))}
            </ul>
          </Card>

          {/* Keywords */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-warning" />
              <h3 className="font-semibold text-foreground">Recognition Keywords</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {pattern.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary border border-primary/20"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </Card>

          {/* Practice Problems */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Code className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Practice Problems</h3>
            </div>
            <div className="space-y-2">
              {pattern.practiceProblems.map((problemId) => (
                <a
                  key={problemId}
                  href={`https://leetcode.com/problems/${problemId}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors"
                >
                  <span className="text-sm text-foreground">
                    LeetCode #{problemId}
                  </span>
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </a>
              ))}
            </div>
          </Card>
        </div>

        {/* Right: Template Code */}
        <div className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Template Code</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopyCode}
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
            </div>
            <div className="rounded-lg overflow-hidden border border-border">
              <CodeEditor
                value={pattern.templateCode}
                language="python"
                height="400px"
                readOnly
              />
            </div>
          </Card>

          {/* Code Explanation */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-warning" />
              <h3 className="font-semibold text-foreground">Key Insight</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {pattern.codeExplanation}
            </p>
          </Card>
        </div>
      </div>

      {/* Mark Mastery Button */}
      {mastery < 3 && (
        <div className="flex justify-center pt-4">
          <Button variant="glow" onClick={handleIncreaseMastery}>
            <Star className="w-4 h-4 mr-2" />
            Level Up Mastery (+50 XP)
          </Button>
        </div>
      )}
    </motion.div>
  );
}
