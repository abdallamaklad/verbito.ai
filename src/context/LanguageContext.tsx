import { useCallback,useEffect,useState,type ReactNode } from 'react';
import type { LanguageCode } from '../lib/languages';
import { DEFAULT_LANGUAGE,LANGUAGES } from '../lib/languages';
import { LanguageContext,type LanguageContextValue } from './language-context';

const STORAGE_KEY = 'verbito-language';

function getInitialLanguage(): LanguageCode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY) as LanguageCode | null;
    if (stored && LANGUAGES.some((l) => l.code === stored)) {
      return stored;
    }
  } catch {
    // localStorage not available (e.g., SSR / incognito)
  }
  return DEFAULT_LANGUAGE;
}

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<LanguageCode>(getInitialLanguage);

  const setLanguage = useCallback((code: LanguageCode) => {
    if (!LANGUAGES.some((l) => l.code === code)) return;
    setLanguageState(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      // ignore
    }
  }, []);

  const languageConfig = LANGUAGES.find((l) => l.code === language) ?? LANGUAGES[0];
  const isRTL = languageConfig.rtl;
  const dir = isRTL ? 'rtl' : 'ltr';

  // Sync <html> lang and dir attributes
  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute('lang', language);
    html.setAttribute('dir', dir);

    if (isRTL) {
      html.classList.add('rtl');
    } else {
      html.classList.remove('rtl');
    }
  }, [language, dir, isRTL]);

  // Listen for storage changes from other tabs
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        const code = e.newValue as LanguageCode;
        if (LANGUAGES.some((l) => l.code === code)) {
          setLanguageState(code);
        }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const value: LanguageContextValue = {
    language,
    setLanguage,
    dir,
    isRTL,
    languageConfig,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
