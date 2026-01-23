import { useEffect, useState, createContext, useContext, useCallback, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertTriangle, Info, Trophy, Star, Flame, Sparkles } from 'lucide-react';
import { cn } from '../../utils/cn';
import { fireAchievementConfetti, fireLevelUpConfetti, fireConfetti } from '../../utils/confetti';

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'achievement' | 'levelup' | 'streak' | 'xp';

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
}

interface ToastContextValue {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  showAchievement: (title: string, description?: string) => void;
  showLevelUp: (level: number) => void;
  showStreak: (days: number) => void;
  showXP: (amount: number, reason: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { ...toast, id }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showAchievement = useCallback((title: string, description?: string) => {
    addToast({
      type: 'achievement',
      title,
      description,
      duration: 5000,
    });
    fireAchievementConfetti();
  }, [addToast]);

  const showLevelUp = useCallback((level: number) => {
    addToast({
      type: 'levelup',
      title: `Level ${level}!`,
      description: 'Keep up the great work!',
      duration: 5000,
    });
    fireLevelUpConfetti();
  }, [addToast]);

  const showStreak = useCallback((days: number) => {
    addToast({
      type: 'streak',
      title: `${days} Day Streak!`,
      description: days >= 7 ? 'Incredible dedication!' : 'Keep it going!',
      duration: 4000,
    });
    if (days >= 7) {
      fireConfetti();
    }
  }, [addToast]);

  const showXP = useCallback((amount: number, reason: string) => {
    addToast({
      type: 'xp',
      title: `+${amount} XP`,
      description: reason,
      duration: 3000,
    });
  }, [addToast]);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, showAchievement, showLevelUp, showStreak, showXP }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
        ))}
      </AnimatePresence>
    </div>
  );
}

interface ToastItemProps {
  toast: Toast;
  onRemove: (id: string) => void;
}

function ToastItem({ toast, onRemove }: ToastItemProps) {
  const { id, type, title, description, duration = 4000 } = toast;

  useEffect(() => {
    const timer = setTimeout(() => onRemove(id), duration);
    return () => clearTimeout(timer);
  }, [id, duration, onRemove]);

  const icons: Record<ToastType, React.ReactNode> = {
    success: <CheckCircle className="w-5 h-5 text-success" />,
    error: <AlertTriangle className="w-5 h-5 text-error" />,
    warning: <AlertTriangle className="w-5 h-5 text-warning" />,
    info: <Info className="w-5 h-5 text-primary" />,
    achievement: <Trophy className="w-5 h-5 text-warning" />,
    levelup: <Star className="w-5 h-5 text-warning fill-warning" />,
    streak: <Flame className="w-5 h-5 text-warning fill-warning" />,
    xp: <Sparkles className="w-5 h-5 text-success" />,
  };

  const bgColors: Record<ToastType, string> = {
    success: 'bg-success/10 border-success/30',
    error: 'bg-error/10 border-error/30',
    warning: 'bg-warning/10 border-warning/30',
    info: 'bg-primary/10 border-primary/30',
    achievement: 'bg-gradient-to-r from-warning/20 to-primary/20 border-warning/30',
    levelup: 'bg-gradient-to-r from-primary/20 to-purple-500/20 border-primary/30',
    streak: 'bg-gradient-to-r from-warning/20 to-error/20 border-warning/30',
    xp: 'bg-success/10 border-success/30',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      className={cn(
        'flex items-start gap-3 p-4 rounded-lg border backdrop-blur-sm shadow-lg',
        bgColors[type]
      )}
    >
      <div className="flex-shrink-0">{icons[type]}</div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-foreground">{title}</p>
        {description && (
          <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
        )}
      </div>
      <button
        onClick={() => onRemove(id)}
        className="flex-shrink-0 p-1 rounded hover:bg-muted transition-colors"
      >
        <X className="w-4 h-4 text-muted-foreground" />
      </button>
    </motion.div>
  );
}
