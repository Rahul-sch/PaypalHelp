import { Star, Sparkles, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { useAchievementStore } from '../../stores';
import { cn } from '../../utils/cn';

export function LevelProgress() {
  const { xp, level, currentTitle, getXPToNextLevel, getLevelTitle, xpHistory } = useAchievementStore();
  const { current, needed, percentage } = getXPToNextLevel();

  const recentXP = xpHistory.slice(0, 5);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-warning fill-warning" />
          <h3 className="font-semibold text-foreground">Level Progress</h3>
        </div>
        <Badge className="bg-primary/20 text-primary">
          {currentTitle}
        </Badge>
      </div>

      {/* Level Display */}
      <div className="flex items-center gap-4 mb-4">
        <motion.div
          key={level}
          initial={{ scale: 1.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-paypal-light flex items-center justify-center"
        >
          <span className="text-2xl font-bold text-white">{level}</span>
        </motion.div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-foreground">Level {level}</span>
            <span className="text-sm text-muted-foreground">
              {current.toLocaleString()} / {needed.toLocaleString()} XP
            </span>
          </div>
          <Progress value={percentage} className="h-3" />
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-muted-foreground">
              {getLevelTitle()}
            </span>
            <span className="text-xs text-primary">
              {Math.round(percentage)}% to Level {level + 1}
            </span>
          </div>
        </div>
      </div>

      {/* Total XP */}
      <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-warning" />
          <span className="text-sm text-muted-foreground">Total XP</span>
        </div>
        <span className="text-lg font-bold text-foreground">{xp.toLocaleString()}</span>
      </div>

      {/* Recent XP Gains */}
      {recentXP.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-success" />
            <span className="text-sm font-medium text-foreground">Recent Activity</span>
          </div>
          <div className="space-y-1">
            {recentXP.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-muted-foreground truncate">{event.reason}</span>
                <span className={cn('font-medium', event.amount > 0 ? 'text-success' : 'text-error')}>
                  +{event.amount} XP
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
