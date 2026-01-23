import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { DEFAULT_INTERVIEW_DATE } from '../utils/timeUtils';

interface SettingsState {
  // Version for migration
  version: number;

  // Interview settings
  interviewDate: string;
  interviewerNames: {
    round1: string;
    round2: string;
  };

  // Study settings
  pomodoroLength: number; // minutes
  breakLength: number; // minutes
  soundEnabled: boolean;
  notificationsEnabled: boolean;

  // UI settings
  sidebarCollapsed: boolean;
  showKeyboardShortcuts: boolean;

  // Actions
  setInterviewDate: (date: string) => void;
  setInterviewerNames: (round1: string, round2: string) => void;
  setPomodoroLength: (minutes: number) => void;
  setBreakLength: (minutes: number) => void;
  toggleSound: () => void;
  toggleNotifications: () => void;
  toggleSidebar: () => void;
  toggleKeyboardShortcuts: () => void;
  resetSettings: () => void;
}

const defaultSettings = {
  version: 1,
  interviewDate: DEFAULT_INTERVIEW_DATE,
  interviewerNames: {
    round1: 'Jake Foster',
    round2: 'Andres Santana',
  },
  pomodoroLength: 50,
  breakLength: 10,
  soundEnabled: true,
  notificationsEnabled: true,
  sidebarCollapsed: false,
  showKeyboardShortcuts: false,
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...defaultSettings,

      setInterviewDate: (date) => set({ interviewDate: date }),

      setInterviewerNames: (round1, round2) =>
        set({ interviewerNames: { round1, round2 } }),

      setPomodoroLength: (minutes) =>
        set({ pomodoroLength: Math.max(1, Math.min(120, minutes)) }),

      setBreakLength: (minutes) =>
        set({ breakLength: Math.max(1, Math.min(60, minutes)) }),

      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),

      toggleNotifications: () =>
        set((state) => ({ notificationsEnabled: !state.notificationsEnabled })),

      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

      toggleKeyboardShortcuts: () =>
        set((state) => ({ showKeyboardShortcuts: !state.showKeyboardShortcuts })),

      resetSettings: () => set(defaultSettings),
    }),
    {
      name: 'paypal-prep-settings',
      version: 1,
      storage: createJSONStorage(() => localStorage),
      migrate: (persistedState: unknown, version: number) => {
        if (version === 0) {
          return { ...(persistedState as SettingsState), version: 1 };
        }
        return persistedState as SettingsState;
      },
    }
  )
);
