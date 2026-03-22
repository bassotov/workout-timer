import type { Metadata } from 'next';

const AI_NAMES: Record<string, string> = {
  chatgpt: 'ChatGPT',
  claude: 'Claude',
  gemini: 'Gemini',
  grok: 'Grok',
  perplexity: 'Perplexity',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ai: string }>;
}): Promise<Metadata> {
  const { ai } = await params;
  const name = AI_NAMES[ai] || ai;

  return {
    title: `How to Use Workout Timer with ${name} | Setup Guide`,
    description: `Step-by-step guide to set up Workout Timer with ${name}. Learn how to generate personalised workout timers using ${name} AI.`,
    alternates: {
      canonical: `https://workout-timer.app/getting-started/instructions/${ai}`,
    },
  };
}

export default function AIInstructionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
