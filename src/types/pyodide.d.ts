declare module 'pyodide' {
  export interface PyodideInterface {
    runPythonAsync: (code: string) => Promise<unknown>;
    globals: {
      get: (key: string) => unknown;
    };
  }

  export interface LoadPyodideOptions {
    indexURL?: string;
  }

  export function loadPyodide(options?: LoadPyodideOptions): Promise<PyodideInterface>;
}
