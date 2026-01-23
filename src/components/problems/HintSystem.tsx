import { useState } from 'react';
import { Lightbulb, Lock, Unlock, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../ui/card';
import { cn } from '../../utils/cn';

interface HintSystemProps {
  hints: string[];
}

export function HintSystem({ hints }: HintSystemProps) {
  const [revealedHints, setRevealedHints] = useState<number[]>([]);

  const revealHint = (index: number) => {
    if (!revealedHints.includes(index)) {
      setRevealedHints([...revealedHints, index]);
    }
  };

  const hideHint = (index: number) => {
    setRevealedHints(revealedHints.filter((i) => i !== index));
  };

  const toggleHint = (index: number) => {
    if (revealedHints.includes(index)) {
      hideHint(index);
    } else {
      revealHint(index);
    }
  };

  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-5 h-5 text-warning" />
        <h3 className="font-semibold text-foreground">Hints</h3>
        <span className="text-xs text-muted-foreground ml-auto">
          {revealedHints.length}/{hints.length} revealed
        </span>
      </div>

      <div className="space-y-3">
        {hints.map((hint, index) => {
          const isRevealed = revealedHints.includes(index);
          const isNextToReveal = !isRevealed && index === revealedHints.length;
          const isLocked = !isRevealed && index > revealedHints.length;

          return (
            <div
              key={index}
              className={cn(
                'rounded-lg border transition-all',
                isRevealed
                  ? 'border-warning/30 bg-warning/5'
                  : isNextToReveal
                  ? 'border-primary/30 bg-primary/5 cursor-pointer hover:border-primary/50'
                  : 'border-border bg-muted/30 opacity-50'
              )}
            >
              <button
                onClick={() => isNextToReveal ? revealHint(index) : isRevealed ? toggleHint(index) : undefined}
                disabled={isLocked}
                className="w-full p-3 flex items-center gap-3 text-left"
              >
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
                    isRevealed
                      ? 'bg-warning/20 text-warning'
                      : isNextToReveal
                      ? 'bg-primary/20 text-primary'
                      : 'bg-muted text-muted-foreground'
                  )}
                >
                  {isRevealed ? (
                    <Unlock className="w-4 h-4" />
                  ) : (
                    <Lock className="w-4 h-4" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">
                      Hint {index + 1}
                    </span>
                    {isNextToReveal && (
                      <span className="text-xs text-primary">Click to reveal</span>
                    )}
                    {isLocked && (
                      <span className="text-xs text-muted-foreground">
                        Reveal previous hints first
                      </span>
                    )}
                  </div>

                  <AnimatePresence>
                    {isRevealed && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-sm text-muted-foreground mt-2"
                      >
                        {hint}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {isRevealed && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleHint(index);
                    }}
                    className="p-1 rounded hover:bg-muted"
                  >
                    <EyeOff className="w-4 h-4 text-muted-foreground" />
                  </button>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {revealedHints.length < hints.length && (
        <p className="text-xs text-muted-foreground mt-4 text-center">
          Try solving before revealing hints!
        </p>
      )}
    </Card>
  );
}
