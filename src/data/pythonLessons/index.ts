import { module1Basics } from './module1-basics';
import { module2ControlFlow } from './module2-control-flow';
import { module3DataStructures } from './module3-data-structures';
import { module4Functions } from './module4-functions';
import { module5Collections } from './module5-collections';
import { module6Algorithms } from './module6-algorithms';
import { module7Advanced } from './module7-advanced';
import { module8Patterns } from './module8-patterns';
import type { PythonModule } from '../../types';

export const pythonModules: PythonModule[] = [
  module1Basics,
  module2ControlFlow,
  module3DataStructures,
  module4Functions,
  module5Collections,
  module6Algorithms,
  module7Advanced,
  module8Patterns,
];

export {
  module1Basics,
  module2ControlFlow,
  module3DataStructures,
  module4Functions,
  module5Collections,
  module6Algorithms,
  module7Advanced,
  module8Patterns,
};

// Helper to get module by ID
export function getModuleById(id: string): PythonModule | undefined {
  return pythonModules.find((m) => m.id === id);
}

// Helper to get lesson by ID
export function getLessonById(lessonId: string) {
  for (const module of pythonModules) {
    const lesson = module.lessons.find((l) => l.id === lessonId);
    if (lesson) {
      return { module, lesson };
    }
  }
  return undefined;
}

// Helper to get quiz by ID
export function getQuizById(quizId: string) {
  for (const module of pythonModules) {
    const quiz = module.quizzes.find((q) => q.id === quizId);
    if (quiz) {
      return { module, quiz };
    }
  }
  return undefined;
}

// Get total lesson count
export function getTotalLessonCount(): number {
  return pythonModules.reduce((sum, m) => sum + m.lessons.length, 0);
}

// Get total quiz count
export function getTotalQuizCount(): number {
  return pythonModules.reduce((sum, m) => sum + m.quizzes.length, 0);
}
