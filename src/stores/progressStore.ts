import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { ProblemStatus, MasteryLevel } from '../types';

interface WeaknessData {
  patternFailures: Record<string, number>;
  mistakeTypes: Record<string, number>;
}

interface ProgressState {
  // Version for migration
  version: number;

  // Python Progress
  completedLessons: string[];
  quizScores: Record<string, number>;

  // Pattern Progress
  patternMastery: Record<string, MasteryLevel>;

  // Problem Progress
  problemStatus: Record<string, ProblemStatus>;
  problemTimes: Record<string, number>; // best time in ms
  problemAttempts: Record<string, number>;
  problemHintsUsed: Record<string, number>;
  problemNotes: Record<string, string>;

  // Verbal Progress
  verbalPracticesCompleted: number;

  // Android Progress
  reviewedTopics: string[];

  // Battle Plan Progress
  completedTasks: Record<string, string[]>; // day -> task IDs

  // Weakness tracking
  weaknessData: WeaknessData;

  // Actions
  completeLesson: (lessonId: string) => void;
  recordQuizScore: (quizId: string, score: number) => void;
  updatePatternMastery: (patternId: string, level: MasteryLevel) => void;
  updateProblemStatus: (problemId: string, status: ProblemStatus) => void;
  recordProblemTime: (problemId: string, time: number) => void;
  incrementProblemAttempts: (problemId: string) => void;
  incrementProblemHints: (problemId: string) => void;
  setProblemNotes: (problemId: string, notes: string) => void;
  completeTask: (day: string, taskId: string) => void;
  uncompleteTask: (day: string, taskId: string) => void;
  markTopicReviewed: (topicId: string) => void;
  incrementVerbalPractices: () => void;
  recordPatternFailure: (patternId: string) => void;
  recordMistakeType: (mistakeType: string) => void;
  resetProgress: () => void;

  // Computed
  getCompletedLessonsCount: () => number;
  getSolvedProblemsCount: () => number;
  getMasteredPatternsCount: () => number;
  getTaskCompletionForDay: (day: string, totalTasks: number) => number;
}

const initialWeaknessData: WeaknessData = {
  patternFailures: {},
  mistakeTypes: {},
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      version: 1,
      completedLessons: [],
      quizScores: {},
      patternMastery: {},
      problemStatus: {},
      problemTimes: {},
      problemAttempts: {},
      problemHintsUsed: {},
      problemNotes: {},
      verbalPracticesCompleted: 0,
      reviewedTopics: [],
      completedTasks: {},
      weaknessData: initialWeaknessData,

      completeLesson: (lessonId) => {
        set((state) => ({
          completedLessons: state.completedLessons.includes(lessonId)
            ? state.completedLessons
            : [...state.completedLessons, lessonId],
        }));
      },

      recordQuizScore: (quizId, score) => {
        set((state) => ({
          quizScores: {
            ...state.quizScores,
            [quizId]: Math.max(state.quizScores[quizId] || 0, score),
          },
        }));
      },

      updatePatternMastery: (patternId, level) => {
        set((state) => ({
          patternMastery: { ...state.patternMastery, [patternId]: level },
        }));
      },

      updateProblemStatus: (problemId, status) => {
        set((state) => ({
          problemStatus: { ...state.problemStatus, [problemId]: status },
        }));
      },

      recordProblemTime: (problemId, time) => {
        set((state) => ({
          problemTimes: {
            ...state.problemTimes,
            [problemId]: state.problemTimes[problemId]
              ? Math.min(state.problemTimes[problemId], time)
              : time,
          },
        }));
      },

      incrementProblemAttempts: (problemId) => {
        set((state) => ({
          problemAttempts: {
            ...state.problemAttempts,
            [problemId]: (state.problemAttempts[problemId] || 0) + 1,
          },
        }));
      },

      incrementProblemHints: (problemId) => {
        set((state) => ({
          problemHintsUsed: {
            ...state.problemHintsUsed,
            [problemId]: Math.min((state.problemHintsUsed[problemId] || 0) + 1, 3),
          },
        }));
      },

      setProblemNotes: (problemId, notes) => {
        set((state) => ({
          problemNotes: { ...state.problemNotes, [problemId]: notes },
        }));
      },

      completeTask: (day, taskId) => {
        set((state) => ({
          completedTasks: {
            ...state.completedTasks,
            [day]: state.completedTasks[day]
              ? state.completedTasks[day].includes(taskId)
                ? state.completedTasks[day]
                : [...state.completedTasks[day], taskId]
              : [taskId],
          },
        }));
      },

      uncompleteTask: (day, taskId) => {
        set((state) => ({
          completedTasks: {
            ...state.completedTasks,
            [day]: (state.completedTasks[day] || []).filter((id) => id !== taskId),
          },
        }));
      },

      markTopicReviewed: (topicId) => {
        set((state) => ({
          reviewedTopics: state.reviewedTopics.includes(topicId)
            ? state.reviewedTopics
            : [...state.reviewedTopics, topicId],
        }));
      },

      incrementVerbalPractices: () => {
        set((state) => ({
          verbalPracticesCompleted: state.verbalPracticesCompleted + 1,
        }));
      },

      recordPatternFailure: (patternId) => {
        set((state) => ({
          weaknessData: {
            ...state.weaknessData,
            patternFailures: {
              ...state.weaknessData.patternFailures,
              [patternId]: (state.weaknessData.patternFailures[patternId] || 0) + 1,
            },
          },
        }));
      },

      recordMistakeType: (mistakeType) => {
        set((state) => ({
          weaknessData: {
            ...state.weaknessData,
            mistakeTypes: {
              ...state.weaknessData.mistakeTypes,
              [mistakeType]: (state.weaknessData.mistakeTypes[mistakeType] || 0) + 1,
            },
          },
        }));
      },

      resetProgress: () => {
        set({
          completedLessons: [],
          quizScores: {},
          patternMastery: {},
          problemStatus: {},
          problemTimes: {},
          problemAttempts: {},
          problemHintsUsed: {},
          problemNotes: {},
          verbalPracticesCompleted: 0,
          reviewedTopics: [],
          completedTasks: {},
          weaknessData: initialWeaknessData,
        });
      },

      getCompletedLessonsCount: () => get().completedLessons.length,

      getSolvedProblemsCount: () =>
        Object.values(get().problemStatus).filter((s) => s === 'solved' || s === 'reviewed').length,

      getMasteredPatternsCount: () =>
        Object.values(get().patternMastery).filter((m) => m >= 2).length,

      getTaskCompletionForDay: (day, totalTasks) => {
        const completed = get().completedTasks[day]?.length || 0;
        return totalTasks > 0 ? (completed / totalTasks) * 100 : 0;
      },
    }),
    {
      name: 'paypal-prep-progress',
      version: 1,
      storage: createJSONStorage(() => localStorage),
      migrate: (persistedState: unknown, version: number) => {
        // Handle migrations when version changes
        if (version === 0) {
          // Migration from version 0 to 1
          return { ...(persistedState as ProgressState), version: 1 };
        }
        return persistedState as ProgressState;
      },
    }
  )
);
