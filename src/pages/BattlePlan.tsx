import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  CalendarDays,
  CheckCircle2,
  Circle,
  Clock,
  Trophy,
  ExternalLink,
  Swords,
  Flame,
  Sun,
  Sunset,
  Moon,
} from 'lucide-react';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Button } from '../components/ui/button';
import { battlePlanSchedule, getTotalTasksForDay, type ScheduleTask } from '../data/schedule';
import { useProgressStore, useAchievementStore } from '../stores';
import { cn } from '../utils/cn';

const typeIcons: Record<string, string> = {
  python: '🐍',
  pattern: '🧩',
  problem: '💻',
  verbal: '🎤',
  android: '📱',
  review: '📚',
  mock: '🎯',
  boss: '⚔️',
};

const typeColors: Record<string, string> = {
  python: 'bg-green-500/20 text-green-400 border-green-500/30',
  pattern: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  problem: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  verbal: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  android: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  review: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  mock: 'bg-red-500/20 text-red-400 border-red-500/30',
  boss: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
};

export function BattlePlan() {
  const [selectedDay, setSelectedDay] = useState(1);
  const { completedTasks, completeTask, uncompleteTask } = useProgressStore();
  const { addXP } = useAchievementStore();

  const currentDaySchedule = battlePlanSchedule.find((d) => d.day === selectedDay);

  const dayStats = useMemo(() => {
    return battlePlanSchedule.map((day) => {
      const totalTasks = getTotalTasksForDay(day.day);
      const completed = completedTasks[`day-${day.day}`]?.length || 0;
      const percentage = totalTasks > 0 ? (completed / totalTasks) * 100 : 0;
      return { day: day.day, completed, total: totalTasks, percentage };
    });
  }, [completedTasks]);

  const currentStats = dayStats.find((s) => s.day === selectedDay);

  const handleTaskToggle = (task: ScheduleTask) => {
    const dayKey = `day-${selectedDay}`;
    const isCompleted = completedTasks[dayKey]?.includes(task.id);

    if (isCompleted) {
      uncompleteTask(dayKey, task.id);
    } else {
      completeTask(dayKey, task.id);
      addXP(task.xpReward, task.title);
    }
  };

  const isTaskCompleted = (taskId: string) => {
    return completedTasks[`day-${selectedDay}`]?.includes(taskId) || false;
  };

  const renderTaskList = (tasks: ScheduleTask[], period: string, icon: React.ReactNode) => (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        {icon}
        {period}
      </div>
      {tasks.map((task) => {
        const completed = isTaskCompleted(task.id);
        return (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={cn(
              'p-4 rounded-lg border transition-all cursor-pointer',
              completed
                ? 'border-success/30 bg-success/5'
                : 'border-border bg-card hover:border-primary/30'
            )}
            onClick={() => handleTaskToggle(task)}
          >
            <div className="flex items-start gap-3">
              <button className="mt-1 flex-shrink-0">
                {completed ? (
                  <CheckCircle2 className="w-5 h-5 text-success" />
                ) : (
                  <Circle className="w-5 h-5 text-muted-foreground" />
                )}
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={cn('font-medium', completed && 'line-through text-muted-foreground')}>
                    {task.title}
                  </span>
                  <Badge className={cn('text-xs border', typeColors[task.type])}>
                    {typeIcons[task.type]} {task.type}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{task.description}</p>

                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {task.duration} min
                  </span>
                  <span className="flex items-center gap-1 text-success">
                    +{task.xpReward} XP
                  </span>
                  {task.link && (
                    <Link
                      to={task.link}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1 text-primary hover:underline"
                    >
                      Open <ExternalLink className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <CalendarDays className="h-8 w-8 text-warning" />
          7-Day Battle Plan
        </h1>
        <p className="text-muted-foreground">
          Your structured path to PayPal interview success
        </p>
      </motion.div>

      {/* Day Selector */}
      <div className="grid grid-cols-7 gap-2">
        {battlePlanSchedule.map((day) => {
          const stats = dayStats.find((s) => s.day === day.day);
          const isComplete = stats && stats.completed === stats.total && stats.total > 0;
          const isSelected = selectedDay === day.day;

          return (
            <button
              key={day.day}
              onClick={() => setSelectedDay(day.day)}
              className={cn(
                'p-3 rounded-lg border transition-all text-center',
                isSelected
                  ? 'border-primary bg-primary/10'
                  : 'border-border bg-card hover:border-primary/30',
                isComplete && 'border-success/50'
              )}
            >
              <div className="text-xs text-muted-foreground">Day</div>
              <div
                className={cn(
                  'text-2xl font-bold',
                  isSelected ? 'text-primary' : 'text-foreground'
                )}
              >
                {day.day}
              </div>
              {isComplete ? (
                <CheckCircle2 className="w-4 h-4 text-success mx-auto mt-1" />
              ) : (
                <div className="h-4 mt-1">
                  <Progress value={stats?.percentage || 0} className="h-1" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Current Day Overview */}
      {currentDaySchedule && (
        <motion.div
          key={selectedDay}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-bold text-foreground">
                    Day {selectedDay}: {currentDaySchedule.title}
                  </h2>
                  {selectedDay === 7 && (
                    <Badge className="bg-warning/20 text-warning border-warning/30">
                      Interview Day!
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground">{currentDaySchedule.description}</p>
              </div>

              <div className="text-right">
                <div className="text-sm text-muted-foreground">Progress</div>
                <div className="text-2xl font-bold text-primary">
                  {currentStats?.completed}/{currentStats?.total}
                </div>
                <Progress
                  value={currentStats?.percentage || 0}
                  className="w-24 h-2 mt-1"
                />
              </div>
            </div>

            {/* Focus Area */}
            <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20 mb-6">
              <Flame className="w-5 h-5 text-primary" />
              <span className="text-sm">
                <span className="font-medium text-foreground">Today's Focus:</span>{' '}
                <span className="text-muted-foreground">{currentDaySchedule.focus}</span>
              </span>
            </div>

            {/* Task Lists */}
            <div className="space-y-8">
              {renderTaskList(
                currentDaySchedule.tasks.morning,
                'Morning',
                <Sun className="w-4 h-4 text-yellow-400" />
              )}
              {renderTaskList(
                currentDaySchedule.tasks.afternoon,
                'Afternoon',
                <Sunset className="w-4 h-4 text-orange-400" />
              )}
              {renderTaskList(
                currentDaySchedule.tasks.evening,
                'Evening',
                <Moon className="w-4 h-4 text-purple-400" />
              )}
            </div>

            {/* Boss Battle */}
            {currentDaySchedule.bossBattle && (
              <Card className="mt-8 p-6 border-warning/30 bg-gradient-to-br from-warning/10 to-error/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-warning/20 flex items-center justify-center">
                    <Swords className="w-6 h-6 text-warning" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-lg">
                      Boss Battle: {currentDaySchedule.bossBattle.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {currentDaySchedule.bossBattle.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {currentDaySchedule.bossBattle.challenges.map((challenge, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <Trophy className="w-4 h-4 text-warning" />
                      {challenge}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-warning">
                    Reward: +{currentDaySchedule.bossBattle.xpReward} XP
                  </span>
                  <Button variant="glow" size="sm">
                    Start Boss Battle
                  </Button>
                </div>
              </Card>
            )}
          </Card>
        </motion.div>
      )}
    </div>
  );
}
