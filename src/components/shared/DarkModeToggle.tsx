import { Moon,Sun } from 'lucide-react';
import { useEffect,useState } from 'react';

function getInitialDarkMode() {
  if (typeof window === 'undefined') return false;
  const saved = localStorage.getItem('verbito-dark-mode');
  if (saved === 'true') return true;
  if (saved === 'false') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(getInitialDarkMode);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem('verbito-dark-mode', String(next));
  };

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}
