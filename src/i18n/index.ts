import { en, type TranslationKeys } from './en';
import { ru } from './ru';
import { type Language } from './languages';

const translations: Record<Language, TranslationKeys> = { en, ru };

export function getTranslations(lang: Language = 'en'): TranslationKeys {
  return translations[lang] || translations.en;
}

// Simple function for use in components (prefer useLanguage() context hook)
export function useTranslations(lang: Language = 'en') {
  return getTranslations(lang);
}

export type { TranslationKeys };
export { en, ru };

// Re-export language utilities
export {
  type Language,
  SUPPORTED_LANGUAGES,
  LANGUAGE_NAMES,
  LANGUAGE_FLAGS,
  isValidLanguage,
  detectBrowserLanguage,
} from './languages';

// Re-export context and hooks
export {
  LanguageProvider,
  useLanguage,
  LanguageHtmlUpdater,
} from './LanguageContext';
