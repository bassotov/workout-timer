export type CoachingStyleId = 'motivator' | 'drill' | 'friendly' | 'analytical';

export interface CoachingStyle {
  id: CoachingStyleId;
  label: { en: string; ru: string };
  description: { en: string; ru: string };
}

export const COACHING_STYLES: Record<CoachingStyleId, CoachingStyle> = {
  motivator: {
    id: 'motivator',
    label: { en: 'Motivator', ru: 'Мотиватор' },
    description: { en: 'Enthusiastic and encouraging', ru: 'Энергичный и вдохновляющий' },
  },
  drill: {
    id: 'drill',
    label: { en: 'Drill Sergeant', ru: 'Сержант' },
    description: { en: 'Direct and no-nonsense', ru: 'Прямой и без лишних слов' },
  },
  friendly: {
    id: 'friendly',
    label: { en: 'Friendly Coach', ru: 'Дружелюбный тренер' },
    description: { en: 'Warm and supportive', ru: 'Тёплый и поддерживающий' },
  },
  analytical: {
    id: 'analytical',
    label: { en: 'Data-Driven', ru: 'Аналитик' },
    description: { en: 'Analytical and precise', ru: 'Аналитичный и точный' },
  },
} as const;
