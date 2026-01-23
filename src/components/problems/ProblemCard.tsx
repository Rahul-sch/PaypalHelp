import { ExternalLink, CheckCircle, Circle, Clock, AlertTriangle } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import type { Problem, ProblemStatus } from '../../types';
import { useProgressStore } from '../../stores';
import { cn } from '../../utils/cn';

interface ProblemCardProps {
  problem: Problem;
  onClick: () => void;
}

const difficultyColors = {
  easy: 'bg-success/20 text-success',
  medium: 'bg-warning/20 text-warning',
  hard: 'bg-error/20 text-error',
};

const statusIcons = {
  'not-started': Circle,
  attempted: AlertTriangle,
  solved: CheckCircle,
  reviewed: CheckCircle,
};

const statusColors = {
  'not-started': 'text-muted-foreground',
  attempted: 'text-warning',
  solved: 'text-success',
  reviewed: 'text-primary',
};

export function ProblemCard({ problem, onClick }: ProblemCardProps) {
  const { problemStatus, problemTimes } = useProgressStore();
  const problemIdStr = String(problem.id);
  const status = (problemStatus[problemIdStr] || 'not-started') as ProblemStatus;
  const bestTime = problemTimes[problemIdStr];

  const StatusIcon = statusIcons[status];

  return (
    <Card
      variant={status === 'solved' || status === 'reviewed' ? 'gradient' : 'default'}
      className={cn(
        'p-4 cursor-pointer transition-all hover:scale-[1.02]',
        status === 'reviewed' && 'border-primary/30'
      )}
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        {/* Status Icon */}
        <div
          className={cn(
            'w-10 h-10 rounded-lg flex items-center justify-center',
            status === 'solved' || status === 'reviewed'
              ? 'bg-success/20'
              : 'bg-muted'
          )}
        >
          <StatusIcon className={cn('w-5 h-5', statusColors[status])} />
        </div>

        <div className="flex-1 min-w-0">
          {/* Title Row */}
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm text-muted-foreground">#{problem.leetcodeId}</span>
            <h3 className="font-semibold text-foreground truncate flex-1">
              {problem.title}
            </h3>
            {problem.isPremium && (
              <Badge className="bg-warning/20 text-warning text-xs">Premium</Badge>
            )}
          </div>

          {/* Tags Row */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge className={difficultyColors[problem.difficulty]}>
              {problem.difficulty}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {problem.pattern.replace(/-/g, ' ')}
            </Badge>
          </div>

          {/* Stats Row */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            {bestTime && (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Best: {Math.round(bestTime / 60000)}m
              </span>
            )}
            <span className="flex items-center gap-1">
              {problem.companies.slice(0, 2).join(', ')}
              {problem.companies.length > 2 && ` +${problem.companies.length - 2}`}
            </span>
          </div>
        </div>

        {/* External Link */}
        <a
          href={problem.leetcodeUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </Card>
  );
}
