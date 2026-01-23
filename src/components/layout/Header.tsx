import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Settings, Bell, Keyboard } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useAchievementStore } from '../../stores';
import { useSettingsStore } from '../../stores';
import { getCountdownTo } from '../../utils/timeUtils';
import { cn } from '../../utils/cn';

interface HeaderProps {
  onOpenSettings?: () => void;
}

export function Header({ onOpenSettings }: HeaderProps) {
  const { xp, level, currentStreak } = useAchievementStore();
  const { interviewDate, toggleKeyboardShortcuts } = useSettingsStore();
  const [countdown, setCountdown] = useState(getCountdownTo(interviewDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdownTo(interviewDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [interviewDate]);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
      {/* Left: Countdown */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {countdown.isExpired ? (
            <Badge variant="success" className="text-sm px-3 py-1">
              Interview Day!
            </Badge>
          ) : (
            <>
              <span className="text-sm text-muted-foreground">Interview in</span>
              <div className="flex items-center gap-1.5">
                <CountdownUnit value={countdown.days} label="d" />
                <span className="text-muted-foreground">:</span>
                <CountdownUnit value={countdown.hours} label="h" />
                <span className="text-muted-foreground">:</span>
                <CountdownUnit value={countdown.minutes} label="m" />
                <span className="text-muted-foreground">:</span>
                <CountdownUnit value={countdown.seconds} label="s" />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Right: Stats and Actions */}
      <div className="flex items-center gap-4">
        {/* Streak */}
        {currentStreak > 0 && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-warning/10 border border-warning/30"
          >
            <span className={cn('text-lg', currentStreak >= 3 && 'fire-flicker')}>
              🔥
            </span>
            <span className="text-sm font-medium text-warning">
              {currentStreak} day{currentStreak !== 1 ? 's' : ''}
            </span>
          </motion.div>
        )}

        {/* XP */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-paypal-blue/10 border border-paypal-blue/30">
          <Zap className="h-4 w-4 text-paypal-blue" />
          <span className="text-sm font-medium text-paypal-blue">
            {xp.toLocaleString()} XP
          </span>
        </div>

        {/* Level Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-paypal-navy/20 border border-paypal-navy/30">
          <span className="text-sm font-medium text-paypal-light">Lv. {level}</span>
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-border" />

        {/* Keyboard Shortcuts */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleKeyboardShortcuts}
          title="Keyboard shortcuts (?)"
        >
          <Keyboard className="h-5 w-5" />
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" title="Notifications">
          <Bell className="h-5 w-5" />
        </Button>

        {/* Settings */}
        <Button variant="ghost" size="icon" onClick={onOpenSettings} title="Settings">
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex items-baseline">
      <motion.span
        key={value}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-lg font-mono font-bold text-paypal-blue"
      >
        {String(value).padStart(2, '0')}
      </motion.span>
      <span className="text-xs text-muted-foreground ml-0.5">{label}</span>
    </div>
  );
}
