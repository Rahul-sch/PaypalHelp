import { lazy, Suspense } from 'react';

const MonacoEditor = lazy(() => import('@monaco-editor/react'));

interface CodeEditorProps {
  value: string;
  onChange?: (value: string | undefined) => void;
  language?: string;
  readOnly?: boolean;
  height?: string | number;
  showLineNumbers?: boolean;
}

function CodeEditorSkeleton({ height }: { height: string | number }) {
  return (
    <div
      className="bg-[#1e1e1e] rounded-lg flex items-center justify-center animate-pulse"
      style={{ height }}
    >
      <div className="text-muted-foreground text-sm">Loading editor...</div>
    </div>
  );
}

export function CodeEditor({
  value,
  onChange,
  language = 'python',
  readOnly = false,
  height = '300px',
  showLineNumbers = true,
}: CodeEditorProps) {
  return (
    <Suspense fallback={<CodeEditorSkeleton height={height} />}>
      <div className="rounded-lg overflow-hidden border border-border">
        <MonacoEditor
          height={height}
          language={language}
          theme="vs-dark"
          value={value}
          onChange={onChange}
          options={{
            readOnly,
            minimap: { enabled: false },
            lineNumbers: showLineNumbers ? 'on' : 'off',
            scrollBeyondLastLine: false,
            fontSize: 14,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            tabSize: 4,
            automaticLayout: true,
            padding: { top: 12, bottom: 12 },
            wordWrap: 'on',
            folding: true,
            contextmenu: false,
            overviewRulerBorder: false,
            hideCursorInOverviewRuler: true,
            renderLineHighlight: 'none',
            selectionHighlight: false,
            occurrencesHighlight: 'off' as const,
          }}
        />
      </div>
    </Suspense>
  );
}
