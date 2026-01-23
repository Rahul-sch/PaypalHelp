import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useSettingsStore } from '../../stores';
import { cn } from '../../utils/cn';

export function MainLayout() {
  const { sidebarCollapsed } = useSettingsStore();
  const [_settingsOpen, setSettingsOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <div
        className={cn(
          'transition-all duration-300',
          sidebarCollapsed ? 'ml-16' : 'ml-64'
        )}
      >
        <Header onOpenSettings={() => setSettingsOpen(true)} />

        <main className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* TODO: Settings Modal will be added here */}
    </div>
  );
}
