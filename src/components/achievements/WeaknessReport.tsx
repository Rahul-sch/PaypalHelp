import { useMemo } from 'react';
import { AlertTriangle, TrendingDown, Target, Lightbulb } from 'lucide-react';
import { Card } from '../ui/card';
import { Progress } from '../ui/progress';
import { useProgressStore } from '../../stores';
import { algorithmPatterns } from '../../data/patterns';
import { cn } from '../../utils/cn';

interface WeaknessItem {
  id: string;
  name: string;
  failRate: number;
  attempts: number;
}

export function WeaknessReport() {
  const { weaknessData, problemAttempts, problemStatus, patternMastery } = useProgressStore();

  const weakestPatterns = useMemo(() => {
    const items: WeaknessItem[] = [];

    for (const [patternId, failures] of Object.entries(weaknessData.patternFailures)) {
      const pattern = algorithmPatterns.find((p) => p.id === patternId);
      if (pattern && failures > 0) {
        const mastery = patternMastery[patternId] || 0;
        // Higher failures + lower mastery = weaker
        const failRate = (failures / (failures + mastery)) * 100;
        items.push({
          id: patternId,
          name: pattern.name,
          failRate,
          attempts: failures,
        });
      }
    }

    return items.sort((a, b) => b.failRate - a.failRate).slice(0, 5);
  }, [weaknessData.patternFailures, patternMastery]);

  const commonMistakes = useMemo(() => {
    const items: { type: string; count: number }[] = [];

    for (const [type, count] of Object.entries(weaknessData.mistakeTypes)) {
      if (count > 0) {
        items.push({ type, count });
      }
    }

    return items.sort((a, b) => b.count - a.count).slice(0, 5);
  }, [weaknessData.mistakeTypes]);

  const recommendations = useMemo(() => {
    const recs: string[] = [];

    // Based on weakest patterns
    if (weakestPatterns.length > 0) {
      recs.push(`Focus on the "${weakestPatterns[0].name}" pattern - practice more problems`);
    }

    // Based on problem attempts
    const totalAttempts = Object.values(problemAttempts).reduce((a, b) => a + b, 0);
    const solvedCount = Object.values(problemStatus).filter(
      (s) => s === 'solved' || s === 'reviewed'
    ).length;

    if (totalAttempts > 0 && solvedCount / totalAttempts < 0.5) {
      recs.push('Spend more time understanding problems before coding');
    }

    // Based on common mistakes
    if (commonMistakes.some((m) => m.type === 'edge-cases')) {
      recs.push('Practice identifying edge cases before implementing');
    }
    if (commonMistakes.some((m) => m.type === 'time-complexity')) {
      recs.push('Review time complexity analysis for common patterns');
    }
    if (commonMistakes.some((m) => m.type === 'syntax')) {
      recs.push('Practice writing Python syntax without IDE help');
    }

    // Default recommendations
    if (recs.length === 0) {
      recs.push('Keep practicing - your progress is being tracked');
      recs.push('Try explaining your solutions out loud for better retention');
    }

    return recs.slice(0, 4);
  }, [weakestPatterns, commonMistakes, problemAttempts, problemStatus]);

  const hasData = weakestPatterns.length > 0 || commonMistakes.length > 0;

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <AlertTriangle className="w-5 h-5 text-warning" />
        <h3 className="font-semibold text-foreground">Weakness Analysis</h3>
      </div>

      {!hasData ? (
        <div className="text-center py-8">
          <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            Not enough data yet. Keep practicing to identify your weak areas!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Weakest Patterns */}
          {weakestPatterns.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <TrendingDown className="w-4 h-4 text-error" />
                <span className="text-sm font-medium text-foreground">Patterns to Improve</span>
              </div>
              <div className="space-y-2">
                {weakestPatterns.map((pattern) => (
                  <div key={pattern.id} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-foreground">{pattern.name}</span>
                      <span className="text-muted-foreground">
                        {pattern.attempts} struggle{pattern.attempts !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <Progress
                      value={pattern.failRate}
                      className={cn(
                        'h-1.5',
                        pattern.failRate > 70
                          ? '[&>div]:bg-error'
                          : pattern.failRate > 40
                          ? '[&>div]:bg-warning'
                          : '[&>div]:bg-success'
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Common Mistakes */}
          {commonMistakes.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-warning" />
                <span className="text-sm font-medium text-foreground">Common Mistakes</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {commonMistakes.map((mistake) => (
                  <span
                    key={mistake.type}
                    className="px-3 py-1 text-xs rounded-full bg-warning/10 text-warning border border-warning/20"
                  >
                    {formatMistakeType(mistake.type)} ({mistake.count})
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Recommendations</span>
            </div>
            <ul className="space-y-2">
              {recommendations.map((rec, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="text-primary mt-0.5">•</span>
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </Card>
  );
}

function formatMistakeType(type: string): string {
  const labels: Record<string, string> = {
    'edge-cases': 'Edge Cases',
    'time-complexity': 'Time Complexity',
    'space-complexity': 'Space Complexity',
    syntax: 'Syntax Errors',
    logic: 'Logic Errors',
    'off-by-one': 'Off-by-One',
    'null-check': 'Null Checks',
    'boundary': 'Boundary Conditions',
  };
  return labels[type] || type.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}
