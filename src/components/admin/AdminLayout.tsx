import { motion } from 'framer-motion';
import {
BarChart3,
CreditCard,FileText,FolderOpen,
GraduationCap,
LayoutDashboard,
Mail,
Menu,
Settings,
Users,
X
} from 'lucide-react';
import { useState } from 'react';

const tabs = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'payments', label: 'Payments', icon: CreditCard },
  { id: 'blog', label: 'Blog Posts', icon: FileText },
  { id: 'prompts', label: 'Prompt Library', icon: FolderOpen },
  { id: 'course', label: 'Course', icon: GraduationCap },
  { id: 'leads', label: 'Leads', icon: Mail },
  { id: 'settings', label: 'Settings', icon: Settings },
];

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function AdminLayout({ children, activeTab, onTabChange }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-[100dvh] bg-gray-950 text-gray-100 pt-16">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-16 left-0 right-0 z-40 bg-gray-900 border-b border-gray-800 px-4 py-3 flex items-center justify-between">
        <span className="font-heading font-semibold text-white">Admin Panel</span>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg text-gray-400 hover:bg-gray-800"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-16 lg:top-16 left-0 h-[calc(100dvh-4rem)] bg-gray-900 border-r border-gray-800 z-30 transition-all duration-300 overflow-y-auto ${
            sidebarOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full lg:translate-x-0 lg:w-16'
          }`}
        >
          <div className="p-4 space-y-1 mt-12 lg:mt-0">
            {/* Logo */}
            <div className={`flex items-center gap-2 px-3 py-4 mb-2 ${!sidebarOpen ? 'lg:hidden' : ''}`}>
              <BarChart3 className="w-6 h-6 text-violet-400" />
              <span className="font-heading font-bold text-white">Admin</span>
            </div>

            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-violet-600/20 text-violet-300 border border-violet-600/30'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                  }`}
                  title={!sidebarOpen ? tab.label : undefined}
                >
                  <tab.icon className="w-5 h-5 shrink-0" />
                  {sidebarOpen && <span>{tab.label}</span>}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-w-0 p-4 lg:p-8 mt-12 lg:mt-0">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
