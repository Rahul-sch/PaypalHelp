import { motion } from 'framer-motion';
import { Code2, Construction } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';

export function PythonCourse() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <Code2 className="h-8 w-8 text-success" />
          Python Crash Course
        </h1>
        <p className="text-muted-foreground">
          Master Python fundamentals for coding interviews
        </p>
      </motion.div>

      <Card className="border-dashed border-2 border-muted">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <Construction className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Coming in Phase 2
          </h2>
          <p className="text-muted-foreground text-center max-w-md">
            8 interactive modules covering Python basics to interview patterns.
            Complete with runnable code examples powered by Pyodide.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
