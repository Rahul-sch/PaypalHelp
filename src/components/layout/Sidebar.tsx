import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Code2,
  Puzzle,
  FileCode,
  MessageSquare,
  Smartphone,
  CalendarDays,
  Trophy,
  Zap,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useSettingsStore } from '../../stores';
import { useAchievementStore } from '../../stores';
import { Button } from '../ui/button';

const navItems = [
  {
    title: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
    description: 'Overview & countdown',
  },
  {
    title: 'Python Course',
    href: '/python',
    icon: Code2,
    description: 'Learn Python basics',
  },
  {
    title: 'Pattern Master',
    href: '/patterns',
    icon: Puzzle,
    description: '15 algorithm patterns',
  },
  {
    title: 'Problem Bank',
    href: '/problems',
    icon: FileCode,
    description: 'PayPal problems',
  },
  {
    title: 'Verbal Trainer',
    href: '/verbal',
    icon: MessageSquare,
    description: 'UMPIRE practice',
  },
  {
    title: 'Android Ref',
    href: '/android',
    icon: Smartphone,
    description: 'Quick reference',
  },
  {
    title: 'Battle Plan',
    href: '/battleplan',
    icon: CalendarDays,
    description: '7-day schedule',
  },
  {
    title: 'Achievements',
    href: '/achievements',
    icon: Trophy,
    description: 'XP & badges',
  },
  {
    title: 'Speed Run',
    href: '/speed',
    icon: Zap,
    description: 'Timed challenges',
  },
];

export function Sidebar() {
  const location = useLocation();
  const { sidebarCollapsed, toggleSidebar } = useSettingsStore();
  const { level, xp } = useAchievementStore();

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen border-r border-border bg-card transition-all duration-300',
        sidebarCollapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div
          className={cn(
            'flex h-16 items-center border-b border-border px-4',
            sidebarCollapsed ? 'justify-center' : 'gap-3'
          )}
        >
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-paypal-blue to-paypal-light flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">PP</span>
          </div>
          {!sidebarCollapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-lg font-bold text-foreground whitespace-nowrap"
            >
              Interview Prep
            </motion.span>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;

            return (
              <NavLink
                key={item.href}
                to={item.href}
                className={cn(
                  'relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all group',
                  isActive
                    ? 'bg-paypal-blue/10 text-paypal-blue'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                  sidebarCollapsed && 'justify-center px-2'
                )}
                title={sidebarCollapsed ? item.title : undefined}
              >
                <Icon className={cn('h-5 w-5 flex-shrink-0', isActive && 'text-paypal-blue')} />
                {!sidebarCollapsed && (
                  <div className="flex flex-col min-w-0">
                    <span className="font-medium truncate">{item.title}</span>
                    <span className="text-xs text-muted-foreground truncate">
                      {item.description}
                    </span>
                  </div>
                )}
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-paypal-blue rounded-r"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                {/* Tooltip for collapsed state */}
                {sidebarCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-card border border-border rounded-md shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                    <span className="text-sm font-medium">{item.title}</span>
                  </div>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Level Badge */}
        {!sidebarCollapsed && (
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-paypal-navy/30 to-paypal-blue/30">
              <div className="h-10 w-10 rounded-full bg-paypal-blue flex items-center justify-center">
                <span className="text-white font-bold">{level}</span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground">Level {level}</p>
                <p className="text-xs text-muted-foreground">{xp.toLocaleString()} XP</p>
              </div>
            </div>
          </div>
        )}

        {/* Collapse Toggle */}
        <div className="p-2 border-t border-border">
          <Button
            variant="ghost"
            size={sidebarCollapsed ? 'icon' : 'default'}
            onClick={toggleSidebar}
            className={cn('w-full', !sidebarCollapsed && 'justify-start')}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <>
                <ChevronLeft className="h-4 w-4 mr-2" />
                Collapse
              </>
            )}
          </Button>
        </div>

        {/* Settings Link */}
        <div className="p-2 border-t border-border">
          <NavLink
            to="/settings"
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all text-muted-foreground hover:bg-muted hover:text-foreground',
              sidebarCollapsed && 'justify-center px-2'
            )}
          >
            <Settings className="h-5 w-5" />
            {!sidebarCollapsed && <span>Settings</span>}
          </NavLink>
        </div>
      </div>
    </aside>
  );
}
