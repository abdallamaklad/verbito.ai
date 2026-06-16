import { AnimatePresence,motion } from 'framer-motion';
import { BookOpen,ChevronDown,CreditCard,FolderOpen,LayoutDashboard,Lightbulb,LogIn,Menu,Sparkles,UserPlus,X,Zap } from 'lucide-react';
import { useEffect,useState } from 'react';
import { Link,useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { usePageTranslations } from '@/hooks/useTranslation';
import { navbar as navTranslations } from '@/lib/translations/navbar';
import DarkModeToggle from '../shared/DarkModeToggle';
import { LanguageSelector } from '../shared/LanguageSelector';

const navLinks = [
  { labelKey: 'promptGenerator', href: '/prompt-generator', icon: Zap },
  { labelKey: 'pricing', href: '/pricing', icon: CreditCard },
  { labelKey: 'course', href: '/course/master-prompt-engineering', icon: BookOpen },
  { labelKey: 'knowledge', href: '/knowledge', icon: Lightbulb },
  { labelKey: 'prompts', href: '/prompts', icon: FolderOpen },
];

const resourcesDropdown = [
  { labelKey: 'knowledgeHub', href: '/knowledge', icon: Lightbulb },
  { labelKey: 'promptLibrary', href: '/prompts', icon: FolderOpen },
  { labelKey: 'freeTools', href: '/tools/free-ai-prompt-generator', icon: Sparkles },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const location = useLocation();
  const { isLoggedIn, loading, logout } = useAuth();
  const nt = usePageTranslations(navTranslations);
  const forceSolid = location.pathname === '/login' || location.pathname === '/signup';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => location.pathname === href;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-400 ${
          scrolled || forceSolid
            ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-0.5 shrink-0">
            <span className="font-heading font-bold text-xl tracking-tight text-gray-900 dark:text-white">
              verbito
            </span>
            <span className="font-heading font-bold text-xl text-violet-600">.ai</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'text-violet-600 bg-violet-50 dark:bg-violet-900/20'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                {nt[link.labelKey]}
              </Link>
            ))}

            {/* Resources Dropdown */}
            <div className="relative">
              <button
                onClick={() => setResourcesOpen(!resourcesOpen)}
                onBlur={() => setTimeout(() => setResourcesOpen(false), 150)}
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                {nt.resources}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${resourcesOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {resourcesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg py-2"
                  >
                    {resourcesDropdown.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <item.icon className="w-4 h-4 text-violet-500" />
                        {nt[item.labelKey]}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Desktop Right */}
          <div className="hidden lg:flex items-center gap-3">
            <DarkModeToggle />
            <LanguageSelector />
            {isLoggedIn ? (
              <>
                <Link
                  to="/dashboard"
                  className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {nt.dashboard}
                </Link>
                <button
                  type="button"
                  onClick={() => { void logout(); }}
                  className="px-5 py-2 text-sm font-semibold bg-gray-900 text-white rounded-lg hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 transition-colors shadow-sm"
                >
                  {nt.logout}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {loading ? nt.account : nt.login}
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2 text-sm font-semibold bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors shadow-sm"
                >
                  {nt.signup}
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <DarkModeToggle />
            <LanguageSelector />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white dark:bg-gray-950 pt-16"
          >
            <div className="px-6 py-8 space-y-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-lg font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900"
                  >
                    <link.icon className="w-5 h-5 text-violet-500" />
                    {nt[link.labelKey]}
                  </Link>
                </motion.div>
              ))}

              <div className="pt-4 border-t border-gray-200 dark:border-gray-800 mt-4">
                <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{nt.resources}</p>
                {resourcesDropdown.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (navLinks.length + i) * 0.05 }}
                  >
                    <Link
                      to={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-lg font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900"
                    >
                      <item.icon className="w-5 h-5 text-violet-500" />
                      {nt[item.labelKey]}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="pt-6 space-y-3">
                {isLoggedIn ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      {nt.dashboard}
                    </Link>
                    <button
                      type="button"
                      onClick={() => { setMobileOpen(false); void logout(); }}
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gray-900 text-white dark:bg-white dark:text-gray-900 font-semibold"
                    >
                      <LogIn className="w-4 h-4" />
                      {nt.logout}
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium"
                    >
                      <LogIn className="w-4 h-4" />
                      {loading ? nt.account : nt.login}
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-violet-600 text-white font-semibold"
                    >
                      <UserPlus className="w-4 h-4" />
                      {nt.signup}
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
