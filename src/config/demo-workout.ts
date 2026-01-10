import { getTranslations, type Language } from '@/i18n';
import type { Workout } from '@/types';

const EXERCISE_VIDEOS = [
  'https://www.youtube.com/results?search_query=goblet+squat+form',
  'https://www.youtube.com/results?search_query=push+up+proper+form',
  'https://www.youtube.com/results?search_query=dumbbell+row+form',
  'https://www.youtube.com/results?search_query=plank+proper+form',
];

const EXERCISE_DURATIONS = [45, 40, 50, 30];

export function getDemoWorkout(lang: Language = 'en'): Workout {
  const t = getTranslations(lang);
  return {
    name: t.demoWorkout.name,
    rounds: 2,
    restEx: 15,
    restRound: 60,
    cooldown: true,
    lang,
    tracker: 'whoop',
    exercises: t.demoWorkout.exercises.map((ex, i) => ({
      ...ex,
      duration: EXERCISE_DURATIONS[i],
      video: EXERCISE_VIDEOS[i],
    })),
  };
}

// Keep backward compatibility export
export const DEMO_WORKOUT = getDemoWorkout('en');
