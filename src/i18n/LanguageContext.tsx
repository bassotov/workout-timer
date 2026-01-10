'use client';

import {
  createContext,
  useContext,
  useCallback,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import { en, type TranslationKeys } from './en';
import { ru } from './ru';
import {
  type Language,
  LANGUAGE_STORAGE_KEY,
  detectBrowserLanguage,
  isValidLanguage,
} from './languages';

const translations: Record<Language, TranslationKeys> = { en, ru };

function getTranslations(lang: Language): TranslationKeys {
  return translations[lang] || translations.en;
}

// Listeners for language changes
let listeners: Array<() => void> = [];

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

function subscribe(listener: () => void) {
  listeners = [...listeners, listener];
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function getSnapshot(): Language {
  if (typeof window === 'undefined') return 'en';

  const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (stored && isValidLanguage(stored)) {
    return stored;
  }

  // First visit - detect and store
  const detected = detectBrowserLanguage();
  localStorage.setItem(LANGUAGE_STORAGE_KEY, detected);
  return detected;
}

function getServerSnapshot(): Language {
  return 'en';
}

// Function to update language (exported for use in setLanguage)
function updateLanguage(lang: Language) {
  localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  emitChange();
}

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationKeys;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const language = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setLanguage = useCallback((lang: Language) => {
    updateLanguage(lang);
  }, []);

  const t = getTranslations(language);

  const value: LanguageContextValue = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export function LanguageHtmlUpdater() {
  // Subscribe to language changes and update the HTML lang attribute
  // Using the same external store pattern for consistency
  useSyncExternalStore(
    (onStoreChange) => {
      // Subscribe to our language store
      const unsubscribe = subscribe(onStoreChange);

      // Initial update
      document.documentElement.lang = getSnapshot();

      return unsubscribe;
    },
    () => {
      // Get current language and ensure DOM is in sync
      const lang = getSnapshot();
      if (document.documentElement.lang !== lang) {
        document.documentElement.lang = lang;
      }
      return lang;
    },
    () => 'en'
  );

  return null;
}
