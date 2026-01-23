import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  FileCode,
  Puzzle,
  Code,
  Flame,
  Target,
  ArrowRight,
  Quote,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { CountdownTimer } from '../components/dashboard/CountdownTimer';
import { XPDisplay } from '../components/dashboard/XPDisplay';
import { StatsCard } from '../components/dashboard/StatsCard';
import { useProgressStore, useAchievementStore } from '../stores';

// Motivational quotes
const quotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
  { text: "The best error message is the one that never shows up.", author: "Thomas Fuchs" },
  { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
  { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
  { text: "Any fool can write code that a computer can understand.", author: "Martin Fowler" },
  { text: "Programming isn't about what you know; it's about what you can figure out.", author: "Chris Pine" },
];

export function Dashboard() {
  const navigate = useNavigate();
  const { currentStreak } = useAchievementStore();
  const progress = useProgressStore();

  // Get a quote based on the day
  const todayQuote = quotes[new Date().getDate() % quotes.length];

  // Calculate stats
  const problemsSolved = progress.getSolvedProblemsCount();
  const patternsMastered = progress.getMasteredPatternsCount();
  const lessonsCompleted = progress.getCompletedLessonsCount();

  const stats = [
    {
      title: 'Problems Solved',
      value: problemsSolved,
      total: 15, // Total PayPal problems
      icon: FileCode,
      color: 'paypal-blue',
      href: '/problems',
    },
    {
      title: 'Patterns Mastered',
      value: patternsMastered,
      total: 15,
      icon: Puzzle,
      color: 'paypal-light',
      href: '/patterns',
    },
    {
      title: 'Python Lessons',
      value: lessonsCompleted,
      total: 32, // Total lessons
      icon: Code,
      color: 'success',
      href: '/python',
    },
    {
      title: 'Current Streak',
      value: currentStreak,
      suffix: 'days',
      icon: Flame,
      color: 'warning',
      href: '/achievements',
    },
  ];

  // Today's recommended tasks
  const todaysTasks = [
    { id: '1', title: 'Complete Python Basics module', type: 'python', xp: 50 },
    { id: '2', title: 'Study Two Pointers pattern', type: 'pattern', xp: 50 },
    { id: '3', title: 'Solve Two Sum problem', type: 'problem', xp: 100 },
    { id: '4', title: 'Practice UMPIRE walkthrough', type: 'verbal', xp: 30 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Your interview preparation command center
          </p>
        </div>
      </motion.div>

      {/* Countdown Timer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <CountdownTimer />
      </motion.div>

      {/* XP Display */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <XPDisplay />
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <StatsCard
              title={stat.title}
              value={stat.value}
              total={stat.total}
              suffix={stat.suffix}
              icon={stat.icon}
              color={stat.color}
              onClick={() => navigate(stat.href)}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Today's Focus */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-paypal-blue" />
                Today's Focus
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={() => navigate('/battleplan')}>
                View Plan
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {todaysTasks.map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-border text-paypal-blue focus:ring-paypal-blue"
                      />
                      <span className="text-sm text-foreground">{task.title}</span>
                    </div>
                    <Badge variant="paypal-outline" className="text-xs">
                      +{task.xp} XP
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions + Quote */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Start</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                <Button
                  variant="outline"
                  className="justify-start h-auto py-3"
                  onClick={() => navigate('/python')}
                >
                  <Code className="h-5 w-5 mr-3 text-success" />
                  <div className="text-left">
                    <div className="font-medium">Continue Python Course</div>
                    <div className="text-xs text-muted-foreground">
                      {lessonsCompleted}/32 lessons completed
                    </div>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="justify-start h-auto py-3"
                  onClick={() => navigate('/problems')}
                >
                  <FileCode className="h-5 w-5 mr-3 text-paypal-blue" />
                  <div className="text-left">
                    <div className="font-medium">Practice Problems</div>
                    <div className="text-xs text-muted-foreground">
                      {problemsSolved}/15 solved
                    </div>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="justify-start h-auto py-3"
                  onClick={() => navigate('/patterns')}
                >
                  <Puzzle className="h-5 w-5 mr-3 text-paypal-light" />
                  <div className="text-left">
                    <div className="font-medium">Study Patterns</div>
                    <div className="text-xs text-muted-foreground">
                      {patternsMastered}/15 mastered
                    </div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Motivational Quote */}
          <Card variant="glass" className="relative overflow-hidden">
            <div className="absolute top-2 right-2 opacity-10">
              <Quote className="h-20 w-20 text-paypal-blue" />
            </div>
            <CardContent className="pt-6">
              <blockquote className="relative z-10">
                <p className="text-lg text-foreground italic mb-2">
                  "{todayQuote.text}"
                </p>
                <footer className="text-sm text-muted-foreground">
                  — {todayQuote.author}
                </footer>
              </blockquote>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
