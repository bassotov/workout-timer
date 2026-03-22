import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Troubleshooting | Workout Timer',
  description: 'Fix common issues with Workout Timer links. Solutions for broken URLs, encoding errors, and AI-generated link problems.',
  alternates: {
    canonical: 'https://workout-timer.app/getting-started/troubleshooting',
  },
};

export default function TroubleshootingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
