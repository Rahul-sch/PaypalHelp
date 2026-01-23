import { motion } from 'framer-motion';
import { MessageSquare, Construction } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';

export function VerbalTrainer() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <MessageSquare className="h-8 w-8 text-accent" />
          Verbal Walkthrough Trainer
        </h1>
        <p className="text-muted-foreground">
          Practice explaining problems out loud with UMPIRE framework
        </p>
      </motion.div>

      <Card className="border-dashed border-2 border-muted">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <Construction className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Coming in Phase 6</h2>
          <p className="text-muted-foreground text-center max-w-md">
            UMPIRE framework guide, voice practice with Web Speech API, and mock interview simulator.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
