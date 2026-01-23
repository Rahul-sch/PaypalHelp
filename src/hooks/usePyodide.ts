import { useState, useCallback, useRef, useEffect } from 'react';

interface PyodideState {
  isLoading: boolean;
  isReady: boolean;
  error: string | null;
}

interface ExecutionResult {
  output: string;
  error: string | null;
  executionTime: number;
}

interface PyodideInterface {
  runPythonAsync: (code: string) => Promise<unknown>;
  globals: {
    get: (key: string) => unknown;
  };
}

// Singleton for Pyodide instance
let pyodideInstance: PyodideInterface | null = null;
let pyodideLoadingPromise: Promise<PyodideInterface> | null = null;

const EXECUTION_TIMEOUT = 5000; // 5 seconds
const PYODIDE_CDN_URL = 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/';

// Load Pyodide script dynamically
function loadPyodideScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    // Check if already loaded
    if ((window as unknown as { loadPyodide?: unknown }).loadPyodide) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = `${PYODIDE_CDN_URL}pyodide.js`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Pyodide script'));
    document.head.appendChild(script);
  });
}

export function usePyodide() {
  const [state, setState] = useState<PyodideState>({
    isLoading: false,
    isReady: !!pyodideInstance,
    error: null,
  });

  const outputBuffer = useRef<string[]>([]);
  const workerRef = useRef<Worker | null>(null);

  // Load Pyodide lazily
  const loadPyodide = useCallback(async (): Promise<PyodideInterface> => {
    if (pyodideInstance) {
      setState({ isLoading: false, isReady: true, error: null });
      return pyodideInstance;
    }

    if (pyodideLoadingPromise) {
      setState({ isLoading: true, isReady: false, error: null });
      return pyodideLoadingPromise;
    }

    setState({ isLoading: true, isReady: false, error: null });

    pyodideLoadingPromise = (async () => {
      try {
        // Load the Pyodide script first
        await loadPyodideScript();

        // Now use the global loadPyodide function
        const globalLoadPyodide = (window as unknown as {
          loadPyodide: (options: { indexURL: string }) => Promise<PyodideInterface>
        }).loadPyodide;

        if (!globalLoadPyodide) {
          throw new Error('Pyodide failed to initialize');
        }

        pyodideInstance = await globalLoadPyodide({
          indexURL: PYODIDE_CDN_URL,
        });

        // Set up stdout capture
        await pyodideInstance.runPythonAsync(`
import sys
from io import StringIO
        `);

        setState({ isLoading: false, isReady: true, error: null });
        return pyodideInstance;
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Failed to load Python engine';
        setState({ isLoading: false, isReady: false, error: errorMsg });
        pyodideLoadingPromise = null;
        throw err;
      }
    })();

    return pyodideLoadingPromise;
  }, []);

  // Execute Python code with timeout
  const runPython = useCallback(async (code: string): Promise<ExecutionResult> => {
    const startTime = performance.now();
    outputBuffer.current = [];

    try {
      const pyodide = await loadPyodide();

      // Wrap code to capture stdout
      const wrappedCode = `
import sys
from io import StringIO

_stdout_capture = StringIO()
_stderr_capture = StringIO()
_old_stdout = sys.stdout
_old_stderr = sys.stderr
sys.stdout = _stdout_capture
sys.stderr = _stderr_capture

_result = None
_error = None

try:
${code.split('\n').map(line => '    ' + line).join('\n')}
except Exception as e:
    _error = str(e)
finally:
    sys.stdout = _old_stdout
    sys.stderr = _old_stderr

_output = _stdout_capture.getvalue()
_err_output = _stderr_capture.getvalue()
`;

      // Execute with timeout
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => {
          reject(new Error(`Execution timed out after ${EXECUTION_TIMEOUT / 1000} seconds`));
        }, EXECUTION_TIMEOUT);
      });

      const executionPromise = pyodide.runPythonAsync(wrappedCode);

      await Promise.race([executionPromise, timeoutPromise]);

      // Get captured output
      const output = pyodide.globals.get('_output') as string || '';
      const errOutput = pyodide.globals.get('_err_output') as string || '';
      const error = pyodide.globals.get('_error') as string | null;

      const executionTime = performance.now() - startTime;

      if (error) {
        return {
          output: output + errOutput,
          error,
          executionTime,
        };
      }

      return {
        output: output + errOutput,
        error: null,
        executionTime,
      };
    } catch (err) {
      const executionTime = performance.now() - startTime;
      return {
        output: '',
        error: err instanceof Error ? err.message : 'Unknown error',
        executionTime,
      };
    }
  }, [loadPyodide]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, []);

  return {
    ...state,
    loadPyodide,
    runPython,
  };
}
