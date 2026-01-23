import { motion } from 'framer-motion';
import { type LucideIcon, FileCode, Puzzle, Code, Flame } from 'lucide-react';
import { Card } from '../ui/card';
import { Progress } from '../ui/progress';
import { cn } from '../../utils/cn';

interface StatsCardProps {
  title: string;
  value: number;
  total?: number;
  suffix?: string;
  icon: LucideIcon;
  color: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  onClick?: () => void;
}

export function StatsCard({
  title,
  value,
  total,
  suffix,
  icon: Icon,
  color,
  trend,
  onClick,
}: StatsCardProps) {
  const percentage = total ? (value / total) * 100 : null;

  return (
    <Card
      className={cn(
        'p-4 transition-all duration-200',
        onClick && 'cursor-pointer hover:shadow-md hover:border-paypal-blue/30'
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className={cn(
            'h-10 w-10 rounded-lg flex items-center justify-center',
            color === 'paypal-blue' && 'bg-paypal-blue/10',
            color === 'paypal-light' && 'bg-paypal-light/10',
            color === 'success' && 'bg-success/10',
            color === 'warning' && 'bg-warning/10',
            color === 'error' && 'bg-error/10'
          )}
        >
          <Icon
            className={cn(
              'h-5 w-5',
              color === 'paypal-blue' && 'text-paypal-blue',
              color === 'paypal-light' && 'text-paypal-light',
              color === 'success' && 'text-success',
              color === 'warning' && 'text-warning',
              color === 'error' && 'text-error'
            )}
          />
        </div>
        {trend && (
          <div
            className={cn(
              'flex items-center gap-0.5 text-xs font-medium',
              trend.isPositive ? 'text-success' : 'text-error'
            )}
          >
            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
          </div>
        )}
      </div>

      <div className="space-y-1">
        <div className="text-sm text-muted-foreground">{title}</div>
        <div className="flex items-baseline gap-1">
          <motion.span
            key={value}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-2xl font-bold text-foreground"
          >
            {value}
          </motion.span>
          {total && (
            <span className="text-sm text-muted-foreground">/ {total}</span>
          )}
          {suffix && (
            <span className="text-sm text-muted-foreground">{suffix}</span>
          )}
        </div>
      </div>

      {percentage !== null && (
        <div className="mt-3">
          <Progress
            value={percentage}
            variant={
              percentage >= 80
                ? 'success'
                : percentage >= 50
                ? 'paypal'
                : 'default'
            }
            size="sm"
          />
        </div>
      )}
    </Card>
  );
}

// Preset stats cards for common use
export function ProblemsStatsCard({
  solved,
  total,
  onClick,
}: {
  solved: number;
  total: number;
  onClick?: () => void;
}) {
  return (
    <StatsCard
      title="Problems Solved"
      value={solved}
      total={total}
      icon={FileCode}
      color="paypal-blue"
      onClick={onClick}
    />
  );
}

export function PatternsStatsCard({
  mastered,
  total,
  onClick,
}: {
  mastered: number;
  total: number;
  onClick?: () => void;
}) {
  return (
    <StatsCard
      title="Patterns Mastered"
      value={mastered}
      total={total}
      icon={Puzzle}
      color="paypal-light"
      onClick={onClick}
    />
  );
}

export function LessonsStatsCard({
  completed,
  total,
  onClick,
}: {
  completed: number;
  total: number;
  onClick?: () => void;
}) {
  return (
    <StatsCard
      title="Python Lessons"
      value={completed}
      total={total}
      icon={Code}
      color="success"
      onClick={onClick}
    />
  );
}

export function StreakStatsCard({
  streak,
  onClick,
}: {
  streak: number;
  onClick?: () => void;
}) {
  return (
    <StatsCard
      title="Current Streak"
      value={streak}
      suffix="days"
      icon={Flame}
      color="warning"
      onClick={onClick}
    />
  );
}
