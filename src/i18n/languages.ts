export const SUPPORTED_LANGUAGES = ['en', 'ru'] as const;
export type Language = (typeof SUPPORTED_LANGUAGES)[number];

export const LANGUAGE_NAMES: Record<Language, string> = {
  en: 'English',
  ru: 'Русский',
};

export const LANGUAGE_FLAGS: Record<Language, string> = {
  en: '🇬🇧',
  ru: '🇷🇺',
};

export const LANGUAGE_STORAGE_KEY = 'workout-language';

export function isValidLanguage(lang: string): lang is Language {
  return SUPPORTED_LANGUAGES.includes(lang as Language);
}

export function detectBrowserLanguage(): Language {
  return 'en';
}
