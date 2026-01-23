export interface PythonModule {
  id: string;
  title: string;
  description: string;
  icon: string;
  lessons: PythonLesson[];
  quizzes: Quiz[];
  order: number;
}

export interface PythonLesson {
  id: string;
  moduleId: string;
  title: string;
  content: string;
  codeExamples: CodeExample[];
  keyPoints: string[];
}

export interface CodeExample {
  id: string;
  title: string;
  code: string;
  language: 'python';
  explanation: string;
  expectedOutput?: string;
  isRunnable: boolean;
}

export interface Quiz {
  id: string;
  moduleId: string;
  title: string;
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  codeSnippet?: string;
}

export interface QuizResult {
  quizId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number[];
  completedAt: string;
}
