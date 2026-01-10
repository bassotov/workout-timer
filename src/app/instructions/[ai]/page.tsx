'use client';

import { notFound } from 'next/navigation';
import { use } from 'react';
import Link from 'next/link';
import { Header, Footer, Button, Card, CardContent } from '@/components/ui';
import { AI_CONFIGS, AI_CONFIG_KEYS, type AIConfigKey } from '@/config';
import { useLanguage } from '@/i18n';

interface PageProps {
  params: Promise<{ ai: string }>;
}

export default function InstructionPage({ params }: PageProps) {
  const { ai } = use(params);
  const { t } = useLanguage();

  // Validate AI param
  if (!AI_CONFIG_KEYS.includes(ai as AIConfigKey)) {
    notFound();
  }

  const aiKey = ai as AIConfigKey;
  const config = AI_CONFIGS[aiKey];
  const aiTranslations = t.aiInstructions[aiKey];

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <Header showNav={false} />

      <div className="pt-20 pb-12 px-4 max-w-2xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-8">
          <div
            className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${config.color} mb-4`}
          >
            <span className="text-4xl">{config.icon}</span>
          </div>
          <h1 className="text-3xl font-bold mb-3">
            {t.aiInstructions.howToUse} {config.name}
          </h1>
          <p className="text-muted-foreground">{aiTranslations.description}</p>
        </div>

        {/* Steps */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="font-semibold mb-4">{t.aiInstructions.setupSteps}</h2>
            <ol className="space-y-3">
              {aiTranslations.steps.map((step, index) => (
                <li key={index} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-medium">
                    {index + 1}
                  </span>
                  <span className="text-sm pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            {t.aiInstructions.noFileYet}
          </p>
          <Link href="/">
            <Button size="lg">{t.aiInstructions.getFile}</Button>
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
