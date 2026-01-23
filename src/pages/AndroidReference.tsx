import { motion } from 'framer-motion';
import { Smartphone, Construction } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';

export function AndroidReference() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <Smartphone className="h-8 w-8 text-success" />
          Android Fundamentals
        </h1>
        <p className="text-muted-foreground">Quick reference for Android concepts</p>
      </motion.div>

      <Card className="border-dashed border-2 border-muted">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <Construction className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Coming in Phase 5</h2>
          <p className="text-muted-foreground text-center max-w-md">
            Activity/Fragment lifecycle, MVVM, RecyclerView, Coroutines, and security topics as flashcards.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
