import { Flame, Calendar, Trophy, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { useAchievementStore } from '../../stores';
import { cn } from '../../utils/cn';

export function StreakDisplay() {
  const { currentStreak, longestStreak, lastActiveDate } = useAchievementStore();

  const isActiveToday = lastActiveDate === new Date().toISOString().split('T')[0];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Flame className={cn('w-5 h-5', currentStreak > 0 ? 'text-warning' : 'text-muted-foreground')} />
          <h3 className="font-semibold text-foreground">Daily Streak</h3>
        </div>
        {isActiveToday && (
          <span className="text-xs px-2 py-1 rounded-full bg-success/20 text-success">
            Active Today
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Current Streak */}
        <div className="text-center p-4 rounded-lg bg-muted/30">
          <motion.div
            key={currentStreak}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={cn(
              'text-4xl font-bold mb-1',
              currentStreak >= 7
                ? 'text-warning'
                : currentStreak >= 3
                ? 'text-success'
                : 'text-foreground'
            )}
          >
            {currentStreak}
          </motion.div>
          <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3" />
            Current
          </div>
          {currentStreak > 0 && (
            <div className="flex justify-center gap-0.5 mt-2">
              {Array.from({ length: Math.min(currentStreak, 7) }).map((_, i) => (
                <Flame
                  key={i}
                  className={cn(
                    'w-4 h-4',
                    i < currentStreak ? 'text-warning fill-warning' : 'text-muted'
                  )}
                />
              ))}
            </div>
          )}
        </div>

        {/* Longest Streak */}
        <div className="text-center p-4 rounded-lg bg-muted/30">
          <div className="text-4xl font-bold text-primary mb-1">{longestStreak}</div>
          <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
            <Trophy className="w-3 h-3" />
            Best
          </div>
          {longestStreak === currentStreak && longestStreak > 0 && (
            <div className="flex items-center justify-center gap-1 mt-2 text-xs text-success">
              <TrendingUp className="w-3 h-3" />
              New Record!
            </div>
          )}
        </div>
      </div>

      {/* Streak Tips */}
      <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/20">
        <p className="text-xs text-muted-foreground">
          {currentStreak === 0
            ? 'Start your streak by completing any activity today!'
            : currentStreak < 3
            ? `Keep going! ${3 - currentStreak} more day${3 - currentStreak !== 1 ? 's' : ''} until your first streak achievement.`
            : currentStreak < 7
            ? `Amazing! ${7 - currentStreak} more day${7 - currentStreak !== 1 ? 's' : ''} until you complete the week!`
            : 'Incredible dedication! Keep the streak alive!'}
        </p>
      </div>
    </Card>
  );
}
