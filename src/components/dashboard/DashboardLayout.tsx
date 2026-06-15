import { useAuth } from '@/hooks/useAuth';
import { AnimatePresence,motion } from 'framer-motion';
import {
Bookmark,
BookOpen,
ChevronLeft,ChevronRight,
CreditCard,
FolderOpen,
History,
LayoutDashboard,
LogOut,Menu,
Settings,
Sparkles,
Wand2,
X,
Zap
} from 'lucide-react';
import { useState } from 'react';
import { Link,useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Overview', href: '/dashboard', icon: LayoutDashboard, tab: 'overview' },
  { label: 'Generate', href: '/dashboard?tab=generate', icon: Wand2, tab: 'generate' },
  { label: 'Saved Prompts', href: '/dashboard?tab=saved', icon: Bookmark, tab: 'saved' },
  { label: 'History', href: '/dashboard?tab=history', icon: History, tab: 'history' },
  { label: 'Collections', href: '/dashboard?tab=collections', icon: FolderOpen, tab: 'collections' },
  { label: 'Course', href: '/dashboard?tab=course', icon: BookOpen, tab: 'course' },
  { label: 'Billing', href: '/dashboard?tab=billing', icon: CreditCard, tab: 'billing' },
  { label: 'Settings', href: '/dashboard?tab=settings', icon: Settings, tab: 'settings' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();

  const searchParams = new URLSearchParams(location.search);
  const isActive = (item: typeof navItems[0]) => {
    if (item.tab === 'overview' && location.pathname === '/dashboard' && !searchParams.get('tab')) return true;
    return searchParams.get('tab') === item.tab;
  };

  const getInitials = (name: string) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U';
  };

  const planLabel = user?.plan_type ? user.plan_type.charAt(0).toUpperCase() + user.plan_type.slice(1) : 'Free';

  return (
    <div className="min-h-[100dvh] bg-gray-50 dark:bg-gray-950">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Hamburger */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-40 lg:hidden p-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-[100dvh] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 z-30 flex flex-col ${
          collapsed ? 'w-16' : 'w-[280px]'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="flex-1 p-4 space-y-1 overflow-y-auto">
          {/* User Info */}
          <div className={`flex items-center gap-3 mb-6 px-2 ${collapsed ? 'justify-center' : ''}`}>
            <div className="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center shrink-0">
              <span className="text-sm font-semibold text-violet-700 dark:text-violet-300">
                {getInitials(user?.full_name || 'User')}
              </span>
            </div>
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user?.full_name || 'User'}</p>
                <span className="inline-flex items-center gap-1 text-[10px] font-medium bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 px-1.5 py-0.5 rounded-full mt-0.5">
                  {planLabel}
                </span>
              </div>
            )}
          </div>

          {/* Nav Items */}
          <div className="space-y-0.5">
            {navItems.map((item) => {
              const active = isActive(item);
              return (
                <Link
                  key={item.tab}
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                  } ${collapsed ? 'justify-center' : ''}`}
                  title={collapsed ? item.label : undefined}
                >
                  {active && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-violet-600 rounded-r-full" />}
                  <item.icon className="w-5 h-5 shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </div>

          {/* Upgrade CTA */}
          {user?.plan_type === 'free' && !collapsed && (
            <div className="mt-6 p-4 bg-violet-50 dark:bg-violet-900/20 rounded-xl border border-violet-100 dark:border-violet-800/30">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-violet-600" />
                <span className="text-xs font-semibold text-violet-700 dark:text-violet-300">Upgrade to Pro</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">Get unlimited prompts and advanced features.</p>
              <Link
                to="/pricing"
                className="flex items-center justify-center gap-1.5 w-full px-3 py-2 bg-violet-600 text-white rounded-lg text-xs font-semibold hover:bg-violet-700 transition-colors"
              >
                <Zap className="w-3 h-3" />
                Upgrade Now
              </Link>
            </div>
          )}
        </div>

        {/* Bottom: Logout */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-800">
          {/* Collapse Toggle - Desktop Only */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex w-full items-center justify-center p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors mb-2"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>

          <button
            onClick={logout}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors w-full ${collapsed ? 'justify-center' : ''}`}
          >
            <LogOut className="w-4 h-4" />
            {!collapsed && <span>Log Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`transition-all duration-300 ${collapsed ? 'lg:ml-16' : 'lg:ml-[280px]'} min-h-[100dvh]`}>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="p-6 lg:p-8"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
