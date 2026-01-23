import { motion } from 'framer-motion';
import { CalendarDays, Construction } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';

export function BattlePlan() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <CalendarDays className="h-8 w-8 text-warning" />
          7-Day Battle Plan
        </h1>
        <p className="text-muted-foreground">Detailed hour-by-hour preparation schedule</p>
      </motion.div>

      <Card className="border-dashed border-2 border-muted">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <Construction className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Coming in Phase 5</h2>
          <p className="text-muted-foreground text-center max-w-md">
            Day-by-day schedule with checkboxes, time tracking, and Boss Battles at the end of each day.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
