import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FileCode, Search, Filter, BarChart3, CheckCircle, Circle, AlertTriangle } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { ProblemCard, ProblemView } from '../components/problems';
import { problems } from '../data/problems';
import { useProgressStore } from '../stores';
import type { ProblemStatus } from '../types';

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

  const { problemStatus } = useProgressStore();

  // Calculate stats
  const stats = useMemo(() => {
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

  // Filter and search problems
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
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <FileCode className="h-8 w-8 text-paypal-blue" />
          PayPal Problem Bank
        </h1>
        <p className="text-muted-foreground">
          {stats.total} curated problems from real PayPal interviews
        </p>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">Progress</span>
          </div>
          <div className="text-2xl font-bold text-foreground">
            {Math.round(stats.progress)}%
          </div>
          <Progress value={stats.progress} className="h-1.5 mt-2" />
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-success" />
            <span className="text-xs text-muted-foreground">Solved</span>
          </div>
          <div className="text-2xl font-bold text-success">{stats.solved}</div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-warning" />
            <span className="text-xs text-muted-foreground">Attempted</span>
          </div>
          <div className="text-2xl font-bold text-warning">{stats.attempted}</div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Circle className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Not Started</span>
          </div>
          <div className="text-2xl font-bold text-muted-foreground">{stats.notStarted}</div>
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
            <ProblemCard
              problem={problem}
              onClick={() => handleProblemClick(problem.id)}
            />
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProblems.length === 0 && (
        <Card className="p-12 text-center">
          <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No problems found
          </h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
        </Card>
      )}
    </div>
  );
}
