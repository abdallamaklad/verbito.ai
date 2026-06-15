import { useEffect,useRef,useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import type { LanguageCode } from '../../lib/languages';
import { LANGUAGES } from '../../lib/languages';

interface LanguageSelectorProps {
  /** 'navbar' for compact inline style, 'footer' for larger dropdown */
  variant?: 'navbar' | 'footer';
  className?: string;
}

/**
 * LanguageSelector — Globe icon dropdown for switching languages.
 *
 * Variants:
 *   - 'navbar': Compact, minimal inline selector for the top nav.
 *   - 'footer': Larger dropdown with native names for the footer area.
 */
export function LanguageSelector({ variant = 'navbar', className = '' }: LanguageSelectorProps) {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find((l) => l.code === language) ?? LANGUAGES[0];

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  const handleSelect = (code: LanguageCode) => {
    setLanguage(code);
    setOpen(false);
  };

  const isNavbar = variant === 'navbar';

  return (
    <div ref={ref} className={`relative inline-block text-left ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={
          isNavbar
            ? 'inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500'
            : 'inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm font-medium text-slate-200 hover:border-slate-500 hover:bg-slate-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500'
        }
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Select language"
      >
        <GlobeIcon className="h-4 w-4" />
        <span>{isNavbar ? currentLang.flag : `${currentLang.flag} ${currentLang.nativeName}`}</span>
        <ChevronIcon className={`h-3 w-3 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          className={
            isNavbar
              ? 'absolute right-0 z-50 mt-2 w-44 rounded-lg border border-slate-700 bg-slate-800 shadow-xl ring-1 ring-black/10'
              : 'absolute left-0 z-50 mt-2 w-52 rounded-lg border border-slate-700 bg-slate-800 shadow-xl ring-1 ring-black/10'
          }
          role="listbox"
          aria-label="Languages"
        >
          <div className="py-1">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                role="option"
                aria-selected={lang.code === language}
                onClick={() => handleSelect(lang.code)}
                className={`flex w-full items-center gap-2.5 px-3 py-2 text-sm transition-colors ${
                  lang.code === language
                    ? 'bg-indigo-600/20 text-indigo-300 font-medium'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <span className="text-base" aria-hidden="true">
                  {lang.flag}
                </span>
                <span>{lang.nativeName}</span>
                {lang.code === language && (
                  <CheckIcon className="ml-auto h-3.5 w-3.5 text-indigo-400" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- SVG Icons ---------- */

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
