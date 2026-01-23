import { motion } from 'framer-motion';
import { FileCode, Construction } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';

export function ProblemBank() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <FileCode className="h-8 w-8 text-paypal-blue" />
          PayPal Problem Bank
        </h1>
        <p className="text-muted-foreground">
          Curated problems specifically reported in PayPal interviews
        </p>
      </motion.div>

      <Card className="border-dashed border-2 border-muted">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <Construction className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Coming in Phase 3
          </h2>
          <p className="text-muted-foreground text-center max-w-md">
            11+ PayPal-confirmed problems with full UMPIRE walkthroughs,
            progressive hints, and solution explanations.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
