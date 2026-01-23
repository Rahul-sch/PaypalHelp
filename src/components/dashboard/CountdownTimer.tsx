import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';
import { Card } from '../ui/card';
import { getCountdownTo, formatDate } from '../../utils/timeUtils';
import { useSettingsStore } from '../../stores';
import { cn } from '../../utils/cn';

export function CountdownTimer() {
  const { interviewDate, interviewerNames } = useSettingsStore();
  const [countdown, setCountdown] = useState(getCountdownTo(interviewDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdownTo(interviewDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [interviewDate]);

  if (countdown.isExpired) {
    return (
      <Card className="p-6 bg-gradient-to-br from-success/20 to-success/5 border-success/30">
        <div className="text-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-4xl mb-2"
          >
            🎉
          </motion.div>
          <h2 className="text-2xl font-bold text-success">Interview Day!</h2>
          <p className="text-muted-foreground mt-2">You've got this! Good luck!</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      {/* Gradient Header */}
      <div className="bg-gradient-to-r from-paypal-navy via-paypal-blue to-paypal-light p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-white/80" />
            <span className="text-white/80 text-sm">Interview Countdown</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-white/60" />
            <span className="text-white/60 text-xs">{formatDate(interviewDate)}</span>
          </div>
        </div>

        {/* Countdown Display */}
        <div className="flex items-center justify-center gap-4">
          <CountdownUnit value={countdown.days} label="Days" />
          <Separator />
          <CountdownUnit value={countdown.hours} label="Hours" />
          <Separator />
          <CountdownUnit value={countdown.minutes} label="Min" />
          <Separator />
          <CountdownUnit value={countdown.seconds} label="Sec" />
        </div>
      </div>

      {/* Interview Details */}
      <div className="p-4 bg-card">
        <div className="grid grid-cols-2 gap-4">
          <InterviewRound
            round={1}
            time="12:00 PM EST"
            interviewer={interviewerNames.round1}
          />
          <InterviewRound
            round={2}
            time="3:00 PM EST"
            interviewer={interviewerNames.round2}
          />
        </div>
      </div>
    </Card>
  );
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center">
      <motion.div
        key={value}
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={cn(
          'text-4xl md:text-5xl font-mono font-bold text-white',
          value <= 1 && label === 'Days' && 'countdown-pulse text-warning'
        )}
      >
        {String(value).padStart(2, '0')}
      </motion.div>
      <div className="text-xs text-white/60 uppercase tracking-wide mt-1">
        {label}
      </div>
    </div>
  );
}

function Separator() {
  return (
    <div className="text-3xl text-white/40 font-mono">:</div>
  );
}

function InterviewRound({
  round,
  time,
  interviewer,
}: {
  round: number;
  time: string;
  interviewer: string;
}) {
  return (
    <div className="p-3 rounded-lg bg-muted/50">
      <div className="text-xs text-muted-foreground mb-1">Round {round}</div>
      <div className="text-sm font-medium text-foreground">{time}</div>
      <div className="text-xs text-paypal-light mt-1">with {interviewer}</div>
    </div>
  );
}
