import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  FileCode,
  Search,
  Filter,
  BarChart3,
  CheckCircle,
  Circle,
  AlertTriangle,
  Star,
  Lock,
  ExternalLink,
  TrendingUp,
} from 'lucide-react';
import { Card } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ProblemCard, ProblemView } from '../components/problems';
import { problems } from '../data/problems';
import {
  paypalFrequentProblems,
  getPayPalProblemStats,
} from '../data/paypalProblems';
import { useProgressStore } from '../stores';
import { cn } from '../utils/cn';
import type { ProblemStatus, PayPalProblem } from '../types';

type ViewState =
  | { type: 'list' }
  | { type: 'detail'; problemId: number };

type DifficultyFilter = 'all' | 'easy' | 'medium' | 'hard';
type StatusFilter = 'all' | 'not-started' | 'attempted' | 'solved' | 'reviewed';

export function ProblemBank() {
  const [viewState, setViewState] = useState<ViewState>({ type: 'list' });
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [activeTab, setActiveTab] = useState('detailed');
  const [showStarredOnly, setShowStarredOnly] = useState(false);

  const { problemStatus } = useProgressStore();

  // Calculate stats for detailed problems
  const detailedStats = useMemo(() => {
    let solved = 0;
    let attempted = 0;
    let notStarted = 0;

    for (const problem of problems) {
      const problemIdStr = String(problem.id);
      const status = (problemStatus[problemIdStr] || 'not-started') as ProblemStatus;
      if (status === 'solved' || status === 'reviewed') solved++;
      else if (status === 'attempted') attempted++;
      else notStarted++;
    }

    const progress = (solved / problems.length) * 100;

    return { solved, attempted, notStarted, progress, total: problems.length };
  }, [problemStatus]);

  // Get PayPal frequent stats
  const paypalStats = useMemo(() => getPayPalProblemStats(), []);

  // Filter and search detailed problems
  const filteredProblems = useMemo(() => {
    let filtered = [...problems];

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.pattern.toLowerCase().includes(query) ||
          p.companies.some((c) => c.toLowerCase().includes(query))
      );
    }

    // Apply difficulty filter
    if (difficultyFilter !== 'all') {
      filtered = filtered.filter((p) => p.difficulty === difficultyFilter);
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((p) => {
        const problemIdStr = String(p.id);
        const status = (problemStatus[problemIdStr] || 'not-started') as ProblemStatus;
        if (statusFilter === 'solved') {
          return status === 'solved' || status === 'reviewed';
        }
        return status === statusFilter;
      });
    }

    return filtered;
  }, [searchQuery, difficultyFilter, statusFilter, problemStatus]);

  // Filter PayPal frequent problems
  const filteredPayPalProblems = useMemo(() => {
    let filtered = [...paypalFrequentProblems];

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) || p.leetcodeId.toString().includes(query)
      );
    }

    // Apply difficulty filter
    if (difficultyFilter !== 'all') {
      filtered = filtered.filter((p) => p.difficulty === difficultyFilter);
    }

    // Apply starred filter
    if (showStarredOnly) {
      filtered = filtered.filter((p) => p.starred);
    }

    return filtered;
  }, [searchQuery, difficultyFilter, showStarredOnly]);

  const handleProblemClick = useCallback((problemId: number) => {
    setViewState({ type: 'detail', problemId });
  }, []);

  const handleBack = useCallback(() => {
    setViewState({ type: 'list' });
  }, []);

  // Detail view
  if (viewState.type === 'detail') {
    const problem = problems.find((p) => p.id === viewState.problemId);
    if (!problem) return null;

    return <ProblemView problem={problem} onBack={handleBack} />;
  }

  // List view
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <FileCode className="h-8 w-8 text-paypal-blue" />
          PayPal Problem Bank
        </h1>
        <p className="text-muted-foreground">
          {detailedStats.total} detailed problems + {paypalStats.total} PayPal frequent
        </p>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="detailed">
            Detailed Problems ({detailedStats.total})
          </TabsTrigger>
          <TabsTrigger value="frequent">
            PayPal Frequent ({paypalStats.total})
          </TabsTrigger>
        </TabsList>

        {/* Detailed Problems Tab */}
        <TabsContent value="detailed">
          <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="w-4 h-4 text-primary" />
                  <span className="text-xs text-muted-foreground">Progress</span>
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {Math.round(detailedStats.progress)}%
                </div>
                <Progress value={detailedStats.progress} className="h-1.5 mt-2" />
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-xs text-muted-foreground">Solved</span>
                </div>
                <div className="text-2xl font-bold text-success">{detailedStats.solved}</div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-warning" />
                  <span className="text-xs text-muted-foreground">Attempted</span>
                </div>
                <div className="text-2xl font-bold text-warning">{detailedStats.attempted}</div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Circle className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Not Started</span>
                </div>
                <div className="text-2xl font-bold text-muted-foreground">
                  {detailedStats.notStarted}
                </div>
              </Card>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by title, pattern, or company..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <select
                  value={difficultyFilter}
                  onChange={(e) => setDifficultyFilter(e.target.value as DifficultyFilter)}
                  className="px-3 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">All Difficulties</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
                  className="px-3 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">All Status</option>
                  <option value="not-started">Not Started</option>
                  <option value="attempted">Attempted</option>
                  <option value="solved">Solved</option>
                </select>
              </div>
            </div>

            {/* Problem List */}
            <div className="space-y-3">
              {filteredProblems.map((problem, index) => (
                <motion.div
                  key={problem.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <ProblemCard problem={problem} onClick={() => handleProblemClick(problem.id)} />
                </motion.div>
              ))}
            </div>

            {/* Empty State */}
            {filteredProblems.length === 0 && (
              <Card className="p-12 text-center">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No problems found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* PayPal Frequent Problems Tab */}
        <TabsContent value="frequent">
          <div className="space-y-6">
            {/* PayPal Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Card className="p-4 bg-paypal-blue/5 border-paypal-blue/20">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-paypal-blue" />
                  <span className="text-xs text-muted-foreground">Total</span>
                </div>
                <div className="text-2xl font-bold text-foreground">{paypalStats.total}</div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Circle className="w-4 h-4 text-success" />
                  <span className="text-xs text-muted-foreground">Easy</span>
                </div>
                <div className="text-2xl font-bold text-success">{paypalStats.easy}</div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Circle className="w-4 h-4 text-warning" />
                  <span className="text-xs text-muted-foreground">Medium</span>
                </div>
                <div className="text-2xl font-bold text-warning">{paypalStats.medium}</div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Circle className="w-4 h-4 text-error" />
                  <span className="text-xs text-muted-foreground">Hard</span>
                </div>
                <div className="text-2xl font-bold text-error">{paypalStats.hard}</div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 text-amber-400" />
                  <span className="text-xs text-muted-foreground">Starred</span>
                </div>
                <div className="text-2xl font-bold text-amber-400">{paypalStats.starred}</div>
              </Card>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by title or number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <select
                  value={difficultyFilter}
                  onChange={(e) => setDifficultyFilter(e.target.value as DifficultyFilter)}
                  className="px-3 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">All Difficulties</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>

                <button
                  onClick={() => setShowStarredOnly(!showStarredOnly)}
                  className={cn(
                    'px-3 py-2 rounded-lg border transition-all flex items-center gap-2',
                    showStarredOnly
                      ? 'bg-amber-400/20 border-amber-400/50 text-amber-400'
                      : 'border-border text-muted-foreground hover:border-primary'
                  )}
                >
                  <Star className="w-4 h-4" />
                  Starred Only
                </button>
              </div>
            </div>

            {/* PayPal Problems Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredPayPalProblems.map((problem, index) => (
                <PayPalProblemCard key={problem.leetcodeId} problem={problem} index={index} />
              ))}
            </div>

            {/* Empty State */}
            {filteredPayPalProblems.length === 0 && (
              <Card className="p-12 text-center">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No problems found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// PayPal Problem Card Component
interface PayPalProblemCardProps {
  problem: PayPalProblem;
  index: number;
}

function PayPalProblemCard({ problem, index }: PayPalProblemCardProps) {
  const difficultyColors = {
    easy: 'text-success border-success/30 bg-success/5',
    medium: 'text-warning border-warning/30 bg-warning/5',
    hard: 'text-error border-error/30 bg-error/5',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.02 }}
    >
      <a
        href={`https://leetcode.com/problems/${problem.title.toLowerCase().replace(/\s+/g, '-')}/`}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <Card className={cn('p-4 border transition-all hover:shadow-lg hover:border-primary/50', difficultyColors[problem.difficulty])}>
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-muted-foreground">#{problem.leetcodeId}</span>
              {problem.starred && <Star className="w-4 h-4 text-amber-400 fill-amber-400" />}
              {problem.isPremium && <Lock className="w-3 h-3 text-warning" />}
            </div>
            <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          </div>
          <h3 className="font-semibold text-foreground mb-2 text-sm leading-tight">
            {problem.title}
          </h3>
          <div className="flex items-center justify-between">
            <span className={cn('text-xs font-medium capitalize', difficultyColors[problem.difficulty].split(' ')[0])}>
              {problem.difficulty}
            </span>
            {problem.acceptanceRate && (
              <span className="text-xs text-muted-foreground">
                {problem.acceptanceRate.toFixed(1)}%
              </span>
            )}
          </div>
        </Card>
      </a>
    </motion.div>
  );
}
