import { useCallback,useMemo } from 'react';
import { useLanguage } from './useLanguage';
import type { LanguageCode } from '../lib/languages';
import { about } from '../lib/translations/about';
import { auth } from '../lib/translations/auth';
import { common } from '../lib/translations/common';
import { contact } from '../lib/translations/contact';
import { course } from '../lib/translations/course';
import { footer } from '../lib/translations/footer';
import { generator } from '../lib/translations/generator';
import { homepage } from '../lib/translations/homepage';
import { knowledge } from '../lib/translations/knowledge';
import { navbar } from '../lib/translations/navbar';
import { pricing } from '../lib/translations/pricing';

// All translation dictionaries keyed by prefix
const TRANSLATIONS = {
  nav: navbar,
  footer: footer,
  home: homepage,
  common: common,
  pricing: pricing,
  course: course,
  gen: generator,
  auth: auth,
  contact: contact,
  about: about,
  knowledge: knowledge,
};

type TranslationDictionary = Record<LanguageCode, Record<string, string>>;

export type TranslationKey =
  | `nav.${keyof (typeof navbar)['en']}`
  | `footer.${keyof (typeof footer)['en']}`
  | `home.${keyof (typeof homepage)['en']}`
  | `common.${keyof (typeof common)['en']}`
  | `pricing.${keyof (typeof pricing)['en']}`
  | `course.${keyof (typeof course)['en']}`
  | `gen.${keyof (typeof generator)['en']}`
  | `auth.${keyof (typeof auth)['en']}`
  | `contact.${keyof (typeof contact)['en']}`
  | `about.${keyof (typeof about)['en']}`
  | `knowledge.${keyof (typeof knowledge)['en']}`
  | string;

/**
 * Looks up a translation key across all dictionaries.
 * Falls back to English, then returns the key itself.
 */
function lookupTranslation(key: string, lang: LanguageCode): string {
  const parts = key.split('.');
  if (parts.length < 2) return key;

  const prefix = parts[0];
  const rest = parts.slice(1).join('.');

  const dict = TRANSLATIONS[prefix as keyof typeof TRANSLATIONS];
  if (!dict) return key;

  return dict[lang]?.[rest] ?? dict['en']?.[rest] ?? key;
}

export interface UseTranslationReturn {
  /** Translate a key (e.g., t('nav.login')) */
  t: (key: string) => string;
  /** Current language code */
  language: LanguageCode;
  /** Direct access to a specific dictionary section */
  page: (dictPrefix: string) => Record<string, string>;
}

export function useTranslation(): UseTranslationReturn {
  const { language } = useLanguage();

  const t = useCallback(
    (key: string): string => {
      return lookupTranslation(key, language);
    },
    [language]
  );

  const page = useCallback(
    (dictPrefix: string): Record<string, string> => {
      const dict = TRANSLATIONS[dictPrefix as keyof typeof TRANSLATIONS];
      if (!dict) return {};
      return { ...(dict['en'] ?? {}), ...(dict[language] ?? {}) };
    },
    [language]
  );

  return useMemo(
    () => ({
      t,
      language,
      page,
    }),
    [t, language, page]
  );
}

/**
 * Helper hook that returns a flattened dictionary for a single page section.
 * Usage: const nav = usePageTranslations('nav'); console.log(nav['login'])
 */
export function usePageTranslations(source: string | TranslationDictionary): Record<string, string> {
  const { language } = useLanguage();

  return useMemo(() => {
    const dict = typeof source === 'string'
      ? TRANSLATIONS[source as keyof typeof TRANSLATIONS]
      : source;
    if (!dict) return {};
    return { ...(dict['en'] ?? {}), ...(dict[language] ?? {}) };
  }, [language, source]);
}

/** Direct lookup without hook — useful outside React components */
export function translate(key: string, lang: LanguageCode): string {
  return lookupTranslation(key, lang);
}
