import React, { useState, useCallback } from 'react';
import { Search, Sparkles, Target, ArrowRight, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { detectPattern, highlightKeywordsInText } from '../../utils/patternMatcher';
import { getPatternById } from '../../data/patterns';
import type { PatternDetectorResult, PatternCategory } from '../../types';

interface PatternDetectorProps {
  onPatternSelect?: (patternId: PatternCategory) => void;
}

export function PatternDetector({ onPatternSelect }: PatternDetectorProps) {
  const [problemText, setProblemText] = useState('');
  const [result, setResult] = useState<PatternDetectorResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = useCallback(() => {
    if (!problemText.trim()) return;

    setIsAnalyzing(true);

    // Simulate a brief analysis delay for UX
    setTimeout(() => {
      const detectionResult = detectPattern(problemText);
      setResult(detectionResult);
      setIsAnalyzing(false);
    }, 500);
  }, [problemText]);

  const handleClear = () => {
    setProblemText('');
    setResult(null);
  };

  const renderHighlightedText = () => {
    if (!result || result.highlightedKeywords.length === 0) {
      return <span>{problemText}</span>;
    }

    const { highlights } = highlightKeywordsInText(problemText, result.highlightedKeywords);

    if (highlights.length === 0) {
      return <span>{problemText}</span>;
    }

    const parts: React.ReactElement[] = [];
    let lastIndex = 0;

    // Merge overlapping highlights
    const mergedHighlights: { start: number; end: number }[] = [];
    for (const h of highlights) {
      if (mergedHighlights.length === 0 || h.start > mergedHighlights[mergedHighlights.length - 1].end) {
        mergedHighlights.push({ start: h.start, end: h.end });
      } else {
        mergedHighlights[mergedHighlights.length - 1].end = Math.max(
          mergedHighlights[mergedHighlights.length - 1].end,
          h.end
        );
      }
    }

    for (let i = 0; i < mergedHighlights.length; i++) {
      const { start, end } = mergedHighlights[i];

      // Add text before highlight
      if (start > lastIndex) {
        parts.push(
          <span key={`text-${i}`}>{problemText.slice(lastIndex, start)}</span>
        );
      }

      // Add highlighted text
      parts.push(
        <mark
          key={`highlight-${i}`}
          className="bg-warning/30 text-warning-foreground px-1 rounded"
        >
          {problemText.slice(start, end)}
        </mark>
      );

      lastIndex = end;
    }

    // Add remaining text
    if (lastIndex < problemText.length) {
      parts.push(
        <span key="text-end">{problemText.slice(lastIndex)}</span>
      );
    }

    return <>{parts}</>;
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-foreground">Pattern Detector</h3>
        <Badge variant="default" className="text-xs">AI-Powered</Badge>
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        Paste any LeetCode problem description and we'll identify the algorithm pattern.
      </p>

      {/* Input Area */}
      <div className="space-y-4">
        <div className="relative">
          <textarea
            value={problemText}
            onChange={(e) => setProblemText(e.target.value)}
            placeholder="Paste a problem description here...&#10;&#10;Example: Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target."
            className="w-full h-40 p-4 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {problemText && (
            <button
              onClick={handleClear}
              className="absolute top-2 right-2 p-1 rounded hover:bg-muted text-muted-foreground"
            >
              ×
            </button>
          )}
        </div>

        <div className="flex gap-2">
          <Button
            variant="glow"
            onClick={handleAnalyze}
            disabled={!problemText.trim() || isAnalyzing}
            className="flex-1"
          >
            {isAnalyzing ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <Search className="w-4 h-4 mr-2" />
                </motion.div>
                Analyzing...
              </>
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Detect Pattern
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Results */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-6 space-y-4"
          >
            {/* Primary Pattern */}
            {result.primaryPattern ? (
              <div className="p-4 rounded-lg border border-success/30 bg-success/5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-success" />
                    <span className="font-semibold text-foreground">Primary Pattern</span>
                  </div>
                  <Badge className="bg-success/20 text-success">
                    {result.confidence}% confidence
                  </Badge>
                </div>

                <button
                  onClick={() => onPatternSelect?.(result.primaryPattern!)}
                  className="w-full p-3 mt-2 rounded-lg bg-success/10 hover:bg-success/20 transition-colors flex items-center justify-between group"
                >
                  <span className="text-lg font-semibold text-success">
                    {getPatternById(result.primaryPattern)?.name}
                  </span>
                  <ArrowRight className="w-5 h-5 text-success group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ) : (
              <div className="p-4 rounded-lg border border-warning/30 bg-warning/5">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-warning" />
                  <span className="text-warning">No clear pattern detected</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Try pasting more context or a different problem description.
                </p>
              </div>
            )}

            {/* Secondary Patterns */}
            {result.secondaryPatterns.length > 0 && (
              <div className="p-4 rounded-lg border border-border bg-card">
                <span className="text-sm text-muted-foreground">Also consider:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {result.secondaryPatterns.map((patternId) => (
                    <button
                      key={patternId}
                      onClick={() => onPatternSelect?.(patternId)}
                      className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                    >
                      {getPatternById(patternId)?.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Highlighted Keywords */}
            {result.highlightedKeywords.length > 0 && (
              <div className="p-4 rounded-lg border border-border bg-card">
                <span className="text-sm text-muted-foreground mb-2 block">
                  Detected Keywords:
                </span>
                <div className="flex flex-wrap gap-1">
                  {result.highlightedKeywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="px-2 py-0.5 text-xs rounded-full bg-warning/20 text-warning"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Suggested Approach */}
            {result.suggestedApproach && (
              <div className="p-4 rounded-lg border border-primary/30 bg-primary/5">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">Suggested Approach</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {result.suggestedApproach}
                </p>
              </div>
            )}

            {/* Highlighted Problem Text Preview */}
            {result.highlightedKeywords.length > 0 && problemText && (
              <div className="p-4 rounded-lg border border-border bg-muted/30">
                <span className="text-sm text-muted-foreground mb-2 block">
                  Problem with keywords highlighted:
                </span>
                <p className="text-sm text-foreground whitespace-pre-wrap">
                  {renderHighlightedText()}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
