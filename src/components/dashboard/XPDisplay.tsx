import { motion } from 'framer-motion';
import { Zap, TrendingUp } from 'lucide-react';
import { Card } from '../ui/card';
import { Progress, CircularProgress } from '../ui/progress';
import { useAchievementStore } from '../../stores';
import { getLevelTitle, XP_PER_LEVEL } from '../../types/achievement';

export function XPDisplay() {
  const { xp, level, currentStreak, longestStreak, xpHistory } = useAchievementStore();

  // Calculate XP progress directly to avoid infinite loop
  const currentLevelXP = xp % XP_PER_LEVEL;
  const current = currentLevelXP;
  const needed = XP_PER_LEVEL;
  const percentage = (currentLevelXP / XP_PER_LEVEL) * 100;

  const levelTitle = getLevelTitle(level);

  // Get recent XP gains (last 3)
  const recentXP = xpHistory.slice(0, 3);

  return (
    <Card variant="glow" className="p-6">
      <div className="flex items-center gap-6">
        {/* Level Circle */}
        <CircularProgress value={percentage} size={100} strokeWidth={6}>
          <div className="text-center">
            <motion.span
              key={level}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-2xl font-bold text-paypal-blue"
            >
              {level}
            </motion.span>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wide">
              Level
            </div>
          </div>
        </CircularProgress>

        {/* XP Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-foreground">{levelTitle}</h3>
            <span className="px-2 py-0.5 rounded-full bg-paypal-blue/10 text-xs font-medium text-paypal-blue">
              Level {level}
            </span>
          </div>

          {/* XP Progress */}
          <div className="mb-3">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="flex items-center gap-1 text-muted-foreground">
                <Zap className="h-4 w-4 text-warning" />
                {xp.toLocaleString()} XP total
              </span>
              <span className="text-muted-foreground">
                {current} / {needed} to next level
              </span>
            </div>
            <Progress value={percentage} variant="gradient" size="lg" animated />
          </div>

          {/* Stats Row */}
          <div className="flex items-center gap-4">
            {/* Streak */}
            <div className="flex items-center gap-1.5">
              <span className="text-lg">🔥</span>
              <div>
                <div className="text-sm font-medium text-foreground">
                  {currentStreak} day streak
                </div>
                <div className="text-xs text-muted-foreground">
                  Best: {longestStreak} days
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-8 w-px bg-border" />

            {/* Recent XP */}
            <div className="flex-1">
              <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                Recent gains
              </div>
              <div className="flex flex-wrap gap-1">
                {recentXP.length > 0 ? (
                  recentXP.map((event, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-success/10 text-xs text-success"
                    >
                      +{event.amount}
                    </motion.span>
                  ))
                ) : (
                  <span className="text-xs text-muted-foreground">
                    Complete tasks to earn XP!
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

// Compact version for header or sidebar
export function XPDisplayCompact() {
  const { xp, level } = useAchievementStore();

  // Calculate percentage directly to avoid infinite loop
  const percentage = ((xp % XP_PER_LEVEL) / XP_PER_LEVEL) * 100;

  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <CircularProgress value={percentage} size={40} strokeWidth={3}>
          <span className="text-xs font-bold text-paypal-blue">{level}</span>
        </CircularProgress>
      </div>
      <div>
        <div className="text-sm font-medium text-foreground">Level {level}</div>
        <div className="text-xs text-muted-foreground">{xp.toLocaleString()} XP</div>
      </div>
    </div>
  );
}
