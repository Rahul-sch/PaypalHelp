import { useState, useCallback } from 'react';
import { Play, Loader2, RotateCcw, Check, AlertCircle } from 'lucide-react';
import { CodeEditor } from '../shared/CodeEditor';
import { Button } from '../ui/button';
import { usePyodide } from '../../hooks/usePyodide';
import { cn } from '../../utils/cn';

interface CodePlaygroundProps {
  initialCode: string;
  expectedOutput?: string;
  title?: string;
  explanation?: string;
  readOnly?: boolean;
}

export function CodePlayground({
  initialCode,
  expectedOutput,
  title,
  explanation,
  readOnly = false,
}: CodePlaygroundProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [executionTime, setExecutionTime] = useState<number | null>(null);

  const { isLoading, isReady, loadPyodide, runPython } = usePyodide();

  const handleRun = useCallback(async () => {
    setIsRunning(true);
    setOutput(null);
    setError(null);
    setExecutionTime(null);

    try {
      if (!isReady) {
        await loadPyodide();
      }

      const result = await runPython(code);
      setOutput(result.output);
      setError(result.error);
      setExecutionTime(result.executionTime);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to run code');
    } finally {
      setIsRunning(false);
    }
  }, [code, isReady, loadPyodide, runPython]);

  const handleReset = useCallback(() => {
    setCode(initialCode);
    setOutput(null);
    setError(null);
    setExecutionTime(null);
  }, [initialCode]);

  const outputMatches =
    expectedOutput && output && normalizeOutput(output) === normalizeOutput(expectedOutput);

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      {title && (
        <div className="px-4 py-2 bg-muted/50 border-b border-border">
          <h4 className="text-sm font-medium text-foreground">{title}</h4>
        </div>
      )}

      <div className="p-4 space-y-4">
        <CodeEditor
          value={code}
          onChange={(val) => setCode(val || '')}
          language="python"
          readOnly={readOnly}
          height="200px"
        />

        <div className="flex items-center gap-2">
          <Button
            onClick={handleRun}
            disabled={isRunning || isLoading}
            variant="glow"
            size="sm"
          >
            {isRunning || isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {isLoading ? 'Loading Python...' : 'Running...'}
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Run Code
              </>
            )}
          </Button>

          {!readOnly && code !== initialCode && (
            <Button onClick={handleReset} variant="ghost" size="sm">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          )}

          {executionTime !== null && (
            <span className="text-xs text-muted-foreground ml-auto">
              Executed in {executionTime.toFixed(0)}ms
            </span>
          )}
        </div>

        {/* Output */}
        {(output || error) && (
          <div
            className={cn(
              'rounded-lg p-3 font-mono text-sm',
              error ? 'bg-destructive/10 border border-destructive/20' : 'bg-muted/50'
            )}
          >
            <div className="flex items-center gap-2 mb-2">
              {error ? (
                <AlertCircle className="w-4 h-4 text-destructive" />
              ) : outputMatches ? (
                <Check className="w-4 h-4 text-success" />
              ) : null}
              <span
                className={cn(
                  'text-xs font-medium',
                  error ? 'text-destructive' : 'text-muted-foreground'
                )}
              >
                {error ? 'Error' : 'Output'}
                {outputMatches && ' (Matches expected)'}
              </span>
            </div>
            <pre className="whitespace-pre-wrap text-foreground">
              {error || output}
            </pre>
          </div>
        )}

        {/* Expected output (if provided and different) */}
        {expectedOutput && !outputMatches && output && (
          <div className="rounded-lg p-3 bg-muted/30 font-mono text-sm">
            <span className="text-xs text-muted-foreground block mb-2">
              Expected Output
            </span>
            <pre className="whitespace-pre-wrap text-muted-foreground">
              {expectedOutput}
            </pre>
          </div>
        )}

        {/* Explanation */}
        {explanation && (
          <p className="text-sm text-muted-foreground border-l-2 border-primary/50 pl-3">
            {explanation}
          </p>
        )}
      </div>
    </div>
  );
}

function normalizeOutput(str: string): string {
  return str.trim().replace(/\s+/g, ' ');
}
