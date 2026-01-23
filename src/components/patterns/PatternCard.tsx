import { Star } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import type { AlgorithmPattern, MasteryLevel } from '../../types';
import { useProgressStore } from '../../stores';
import { cn } from '../../utils/cn';

interface PatternCardProps {
  pattern: AlgorithmPattern;
  onClick: () => void;
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

const patternIcons: Record<string, string> = {
  'prefix-sum': 'Calculator',
  'two-pointers': 'ArrowLeftRight',
  'sliding-window': 'PanelLeftClose',
  'fast-slow-pointers': 'Rabbit',
  'linked-list-reversal': 'Undo2',
  'monotonic-stack': 'Layers',
  'top-k-elements': 'Trophy',
  'merge-intervals': 'Merge',
  'binary-search': 'Search',
  'bfs': 'Radio',
  'dfs': 'TreeDeciduous',
  'backtracking': 'RotateCcw',
  'dynamic-programming': 'Table2',
  'union-find': 'Users',
  'trie': 'Network',
};

export function PatternCard({ pattern, onClick }: PatternCardProps) {
  const { patternMastery } = useProgressStore();
  const mastery = (patternMastery[pattern.id] || 0) as MasteryLevel;

  const iconName = patternIcons[pattern.id] || 'Code';
  const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[iconName] || LucideIcons.Code;

  const progressValue = (mastery / 3) * 100;

  return (
    <Card
      variant={mastery === 3 ? 'gradient' : 'default'}
      className={cn(
        'p-5 cursor-pointer transition-all hover:scale-[1.02]',
        mastery === 3 && 'border-success/30'
      )}
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            'w-12 h-12 rounded-lg flex items-center justify-center',
            mastery === 3
              ? 'bg-success/20 text-success'
              : 'bg-primary/20 text-primary'
          )}
        >
          <IconComponent className="w-6 h-6" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-foreground truncate">
              {pattern.name}
            </h3>
            <Badge className={cn('text-xs', masteryColors[mastery])}>
              {masteryLabels[mastery]}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {pattern.description}
          </p>

          {/* Progress & Stats */}
          <div className="space-y-2">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <LucideIcons.Clock className="w-3 h-3" />
                {pattern.timeComplexity}
              </span>
              <span className="flex items-center gap-1">
                <LucideIcons.HardDrive className="w-3 h-3" />
                {pattern.spaceComplexity}
              </span>
            </div>
            <Progress value={progressValue} className="h-1.5" />
          </div>

          {/* Keywords Preview */}
          <div className="mt-3 flex flex-wrap gap-1">
            {pattern.keywords.slice(0, 4).map((keyword) => (
              <span
                key={keyword}
                className="px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground"
              >
                {keyword}
              </span>
            ))}
            {pattern.keywords.length > 4 && (
              <span className="px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground">
                +{pattern.keywords.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Mastery Stars */}
        <div className="flex flex-col gap-0.5">
          {[1, 2, 3].map((level) => (
            <Star
              key={level}
              className={cn(
                'w-4 h-4',
                level <= mastery
                  ? 'fill-warning text-warning'
                  : 'text-muted-foreground/30'
              )}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}
