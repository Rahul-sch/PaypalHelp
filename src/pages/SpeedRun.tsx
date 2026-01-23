import { motion } from 'framer-motion';
import { Zap, Construction } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';

export function SpeedRun() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <Zap className="h-8 w-8 text-warning" />
          Speed Run
        </h1>
        <p className="text-muted-foreground">Race against the clock with timed challenges</p>
      </motion.div>

      <Card className="border-dashed border-2 border-muted">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <Construction className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Coming in Phase 6</h2>
          <p className="text-muted-foreground text-center max-w-md">
            Pattern Blitz, Code Sprint, and Complexity Quiz modes with local leaderboards.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
