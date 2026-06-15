export type LanguageCode = 'en' | 'es' | 'fr' | 'de' | 'ar';

export interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  rtl: boolean;
}

export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '\u{1F1EC}\u{1F1E7}', rtl: false },
  { code: 'es', name: 'Spanish', nativeName: 'Espa\u00F1ol', flag: '\u{1F1EA}\u{1F1F8}', rtl: false },
  { code: 'fr', name: 'French', nativeName: 'Fran\u00E7ais', flag: '\u{1F1EB}\u{1F1F7}', rtl: false },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '\u{1F1E9}\u{1F1EA}', rtl: false },
  { code: 'ar', name: 'Arabic', nativeName: '\u0627\u0644\u0639\u0631\u0628\u064A\u0629', flag: '\u{1F1F8}\u{1F1E6}', rtl: true },
];

export const DEFAULT_LANGUAGE: LanguageCode = 'en';
