import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Workout Timer | Interactive AI-Powered Exercise Timer',
  description: 'Run your AI-generated workout with an interactive timer. Tracks exercises, rest periods, rounds, and cooldown with audio cues.',
  alternates: {
    canonical: 'https://workout-timer.app/timer',
  },
};

export default function TimerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
