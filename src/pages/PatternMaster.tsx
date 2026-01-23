import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Puzzle, Search, Filter, Star, BarChart3 } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { PatternCard, PatternDetail, PatternDetector } from '../components/patterns';
import { algorithmPatterns } from '../data/patterns';
import { useProgressStore } from '../stores';
import type { PatternCategory, MasteryLevel } from '../types';
import { cn } from '../utils/cn';

type ViewState =
  | { type: 'list' }
  | { type: 'detail'; patternId: PatternCategory };

type FilterOption = 'all' | 'not-started' | 'learning' | 'familiar' | 'mastered';

export function PatternMaster() {
  const [viewState, setViewState] = useState<ViewState>({ type: 'list' });
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<FilterOption>('all');
  const [showDetector, setShowDetector] = useState(false);

  const { patternMastery } = useProgressStore();

  // Calculate overall stats
  const stats = useMemo(() => {
    let mastered = 0;
    let familiar = 0;
    let learning = 0;
    let notStarted = 0;

    for (const pattern of algorithmPatterns) {
      const level = (patternMastery[pattern.id] || 0) as MasteryLevel;
      if (level === 3) mastered++;
      else if (level === 2) familiar++;
      else if (level === 1) learning++;
      else notStarted++;
    }

    const totalProgress = ((mastered * 3 + familiar * 2 + learning * 1) / (algorithmPatterns.length * 3)) * 100;

    return { mastered, familiar, learning, notStarted, totalProgress };
  }, [patternMastery]);

  // Filter and search patterns
  const filteredPatterns = useMemo(() => {
    let patterns = [...algorithmPatterns];

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      patterns = patterns.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.keywords.some((k) => k.toLowerCase().includes(query))
      );
    }

    // Apply filter
    if (filter !== 'all') {
      patterns = patterns.filter((p) => {
        const level = (patternMastery[p.id] || 0) as MasteryLevel;
        switch (filter) {
          case 'not-started':
            return level === 0;
          case 'learning':
            return level === 1;
          case 'familiar':
            return level === 2;
          case 'mastered':
            return level === 3;
          default:
            return true;
        }
      });
    }

    return patterns;
  }, [searchQuery, filter, patternMastery]);

  const handlePatternClick = useCallback((patternId: PatternCategory) => {
    setViewState({ type: 'detail', patternId });
  }, []);

  const handleBack = useCallback(() => {
    setViewState({ type: 'list' });
  }, []);

  // Detail view
  if (viewState.type === 'detail') {
    const pattern = algorithmPatterns.find((p) => p.id === viewState.patternId);
    if (!pattern) return null;

    return <PatternDetail pattern={pattern} onBack={handleBack} />;
  }

  // List view
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <Puzzle className="h-8 w-8 text-paypal-light" />
          Pattern Master
        </h1>
        <p className="text-muted-foreground">
          Master 15 essential algorithm patterns for coding interviews
        </p>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">Overall</span>
          </div>
          <div className="text-2xl font-bold text-foreground">
            {Math.round(stats.totalProgress)}%
          </div>
          <Progress value={stats.totalProgress} className="h-1.5 mt-2" />
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-4 h-4 fill-warning text-warning" />
            <span className="text-xs text-muted-foreground">Mastered</span>
          </div>
          <div className="text-2xl font-bold text-success">{stats.mastered}</div>
        </Card>

        <Card className="p-4">
          <div className="text-xs text-muted-foreground mb-2">Familiar</div>
          <div className="text-2xl font-bold text-primary">{stats.familiar}</div>
        </Card>

        <Card className="p-4">
          <div className="text-xs text-muted-foreground mb-2">Learning</div>
          <div className="text-2xl font-bold text-warning">{stats.learning}</div>
        </Card>

        <Card className="p-4">
          <div className="text-xs text-muted-foreground mb-2">Not Started</div>
          <div className="text-2xl font-bold text-muted-foreground">{stats.notStarted}</div>
        </Card>
      </div>

      {/* Pattern Detector Toggle */}
      <Card
        className={cn(
          'p-4 cursor-pointer transition-all',
          showDetector ? 'border-primary' : 'hover:border-primary/50'
        )}
        onClick={() => setShowDetector(!showDetector)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Search className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Pattern Detector</h3>
              <p className="text-sm text-muted-foreground">
                Paste a problem description to identify the pattern
              </p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: showDetector ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <svg
              className="w-5 h-5 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </motion.div>
        </div>
      </Card>

      {/* Pattern Detector (Collapsible) */}
      <motion.div
        initial={false}
        animate={{
          height: showDetector ? 'auto' : 0,
          opacity: showDetector ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <PatternDetector onPatternSelect={handlePatternClick} />
      </motion.div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search patterns by name or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as FilterOption)}
            className="px-3 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Patterns</option>
            <option value="not-started">Not Started</option>
            <option value="learning">Learning</option>
            <option value="familiar">Familiar</option>
            <option value="mastered">Mastered</option>
          </select>
        </div>
      </div>

      {/* Pattern Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredPatterns.map((pattern, index) => (
          <motion.div
            key={pattern.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
          >
            <PatternCard
              pattern={pattern}
              onClick={() => handlePatternClick(pattern.id)}
            />
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredPatterns.length === 0 && (
        <Card className="p-12 text-center">
          <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No patterns found
          </h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
        </Card>
      )}
    </div>
  );
}
