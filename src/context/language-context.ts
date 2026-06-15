import { createContext } from 'react';
import type { LanguageCode } from '../lib/languages';
import { LANGUAGES } from '../lib/languages';

export interface LanguageContextValue {
  language: LanguageCode;
  setLanguage: (code: LanguageCode) => void;
  dir: 'ltr' | 'rtl';
  isRTL: boolean;
  languageConfig: (typeof LANGUAGES)[number];
}

export const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);
