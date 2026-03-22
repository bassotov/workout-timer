import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Restore Your File | Workout Timer',
  description: 'Lost your Workout Timer setup file? Enter your email to re-download your personalised AI workout instructions.',
  alternates: {
    canonical: 'https://workout-timer.app/restore',
  },
};

export default function RestoreLayout({ children }: { children: React.ReactNode }) {
  return children;
}
