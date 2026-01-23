import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Filter, Search, Star } from 'lucide-react';
import { Card } from '../components/ui/card';
import {
  AchievementCard,
  LevelProgress,
  StreakDisplay,
  WeaknessReport,
} from '../components/achievements';
import { useAchievementStore } from '../stores';
import { achievements, achievementCategories, getAchievementsByCategory } from '../data/achievements';
import type { AchievementCategory } from '../types/achievement';
import { cn } from '../utils/cn';

export function Achievements() {
  const [categoryFilter, setCategoryFilter] = useState<'all' | AchievementCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showUnlockedOnly, setShowUnlockedOnly] = useState(false);

  const { unlockedAchievements, hasAchievement } = useAchievementStore();

  const filteredAchievements = useMemo(() => {
    let filtered = categoryFilter === 'all' ? achievements : getAchievementsByCategory(categoryFilter);

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.title.toLowerCase().includes(query) ||
          a.description.toLowerCase().includes(query)
      );
    }

    if (showUnlockedOnly) {
      filtered = filtered.filter((a) => hasAchievement(a.id));
    }

    return filtered;
  }, [categoryFilter, searchQuery, showUnlockedOnly, hasAchievement]);

  const stats = useMemo(() => {
    const total = achievements.length;
    const unlocked = unlockedAchievements.length;
    const legendary = achievements.filter((a) => a.rarity === 'legendary' && hasAchievement(a.id)).length;

    return { total, unlocked, legendary };
  }, [unlockedAchievements, hasAchievement]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <Trophy className="h-8 w-8 text-warning" />
          Achievements
        </h1>
        <p className="text-muted-foreground">
          Track your progress and unlock rewards
        </p>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <div className="text-3xl font-bold text-foreground">{stats.unlocked}</div>
          <div className="text-xs text-muted-foreground">Unlocked</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-3xl font-bold text-muted-foreground">{stats.total - stats.unlocked}</div>
          <div className="text-xs text-muted-foreground">Remaining</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-3xl font-bold text-warning">{stats.legendary}</div>
          <div className="text-xs text-muted-foreground">Legendary</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-3xl font-bold text-primary">
            {Math.round((stats.unlocked / stats.total) * 100)}%
          </div>
          <div className="text-xs text-muted-foreground">Complete</div>
        </Card>
      </div>

      {/* Progress Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <LevelProgress />
        <StreakDisplay />
      </div>

      {/* Weakness Report */}
      <WeaknessReport />

      {/* Achievements Section */}
      <div>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search achievements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as 'all' | AchievementCategory)}
              className="px-3 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {achievementCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Unlocked Only Toggle */}
          <button
            onClick={() => setShowUnlockedOnly(!showUnlockedOnly)}
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors',
              showUnlockedOnly
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border bg-card text-muted-foreground hover:text-foreground'
            )}
          >
            <Star className={cn('w-4 h-4', showUnlockedOnly && 'fill-primary')} />
            Unlocked
          </button>
        </div>

        {/* Achievement Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredAchievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
            >
              <AchievementCard
                achievement={achievement}
                isUnlocked={hasAchievement(achievement.id)}
              />
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAchievements.length === 0 && (
          <Card className="p-12 text-center">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No achievements found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
