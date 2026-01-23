import * as LucideIcons from 'lucide-react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import type { Achievement } from '../../types/achievement';
import { rarityColors, rarityBgColors } from '../../data/achievements';
import { cn } from '../../utils/cn';

interface AchievementCardProps {
  achievement: Achievement;
  isUnlocked: boolean;
  onClick?: () => void;
}

export function AchievementCard({ achievement, isUnlocked, onClick }: AchievementCardProps) {
  const IconComponent =
    (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[
      achievement.icon
    ] || LucideIcons.Award;

  return (
    <motion.div
      whileHover={{ scale: isUnlocked ? 1.02 : 1 }}
      whileTap={{ scale: isUnlocked ? 0.98 : 1 }}
    >
      <Card
        className={cn(
          'p-4 cursor-pointer transition-all border-2',
          isUnlocked
            ? cn(rarityColors[achievement.rarity], rarityBgColors[achievement.rarity])
            : 'border-muted bg-muted/10 opacity-60 grayscale'
        )}
        onClick={onClick}
      >
        <div className="flex items-start gap-3">
          <div
            className={cn(
              'w-12 h-12 rounded-lg flex items-center justify-center',
              isUnlocked ? rarityBgColors[achievement.rarity] : 'bg-muted/30'
            )}
          >
            {isUnlocked ? (
              <IconComponent
                className={cn(
                  'w-6 h-6',
                  achievement.rarity === 'legendary'
                    ? 'text-warning'
                    : achievement.rarity === 'epic'
                    ? 'text-purple-400'
                    : achievement.rarity === 'rare'
                    ? 'text-primary'
                    : 'text-muted-foreground'
                )}
              />
            ) : (
              <Lock className="w-6 h-6 text-muted-foreground" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className={cn('font-semibold truncate', isUnlocked ? 'text-foreground' : 'text-muted-foreground')}>
                {achievement.title}
              </h4>
              <Badge
                className={cn(
                  'text-xs capitalize',
                  isUnlocked ? rarityColors[achievement.rarity] : 'bg-muted text-muted-foreground'
                )}
              >
                {achievement.rarity}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {achievement.description}
            </p>
            {isUnlocked && (
              <div className="flex items-center gap-1 mt-2 text-xs text-success">
                <LucideIcons.Sparkles className="w-3 h-3" />
                +{achievement.xpReward} XP
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
