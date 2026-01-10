import type { Workout } from '@/types';

export const DEMO_WORKOUT: Workout = {
  name: 'Full Feature Demo',
  rounds: 2,
  restEx: 15,
  restRound: 60,
  cooldown: true,
  lang: 'en',
  tracker: 'whoop',
  exercises: [
    { name: 'Goblet Squats', reps: 'x12', duration: 45, weight: '16kg', equipment: 'dumbbell', video: 'https://www.youtube.com/results?search_query=goblet+squat+form' },
    { name: 'Push-ups', reps: 'x10', duration: 40, equipment: 'bodyweight', video: 'https://www.youtube.com/results?search_query=push+up+proper+form' },
    { name: 'Dumbbell Rows', reps: 'x10 each', duration: 50, weight: '12kg', equipment: 'dumbbell + bench', video: 'https://www.youtube.com/results?search_query=dumbbell+row+form' },
    { name: 'Plank', reps: '30 sec', duration: 30, equipment: 'mat', video: 'https://www.youtube.com/results?search_query=plank+proper+form' },
  ],
};
