import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground',
        secondary: 'border-transparent bg-secondary text-secondary-foreground',
        destructive: 'border-transparent bg-destructive text-destructive-foreground',
        success: 'border-transparent bg-success text-white',
        warning: 'border-transparent bg-warning text-white',
        outline: 'border-border text-foreground',
        paypal: 'border-transparent bg-paypal-blue text-white',
        'paypal-outline': 'border-paypal-blue text-paypal-blue bg-paypal-blue/10',
        easy: 'border-transparent bg-success/20 text-success',
        medium: 'border-transparent bg-warning/20 text-warning',
        hard: 'border-transparent bg-destructive/20 text-destructive',
        glow: 'border-paypal-blue/50 bg-paypal-blue/20 text-paypal-light shadow-[0_0_10px_rgba(0,112,186,0.3)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
}

function Badge({ className, variant, icon, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </div>
  );
}

// Difficulty badge helper
function DifficultyBadge({ difficulty }: { difficulty: 'Easy' | 'Medium' | 'Hard' }) {
  const variantMap = {
    Easy: 'easy',
    Medium: 'medium',
    Hard: 'hard',
  } as const;

  return <Badge variant={variantMap[difficulty]}>{difficulty}</Badge>;
}

// Status badge helper
function StatusBadge({
  status,
}: {
  status: 'not-started' | 'attempted' | 'solved' | 'reviewed';
}) {
  const config = {
    'not-started': { variant: 'outline' as const, label: 'Not Started' },
    attempted: { variant: 'warning' as const, label: 'Attempted' },
    solved: { variant: 'success' as const, label: 'Solved' },
    reviewed: { variant: 'paypal' as const, label: 'Reviewed' },
  };

  const { variant, label } = config[status];
  return <Badge variant={variant}>{label}</Badge>;
}

// Mastery badge helper
function MasteryBadge({ level }: { level: 0 | 1 | 2 | 3 }) {
  const config = {
    0: { variant: 'outline' as const, label: 'Not Started' },
    1: { variant: 'warning' as const, label: 'Learning' },
    2: { variant: 'paypal' as const, label: 'Familiar' },
    3: { variant: 'success' as const, label: 'Mastered' },
  };

  const { variant, label } = config[level];
  return <Badge variant={variant}>{label}</Badge>;
}

export { Badge, badgeVariants, DifficultyBadge, StatusBadge, MasteryBadge };
