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

  if (!AI_CONFIG_KEYS.includes(ai as AIConfigKey)) {
    notFound();
  }

  const aiKey = ai as AIConfigKey;
  const config = AI_CONFIGS[aiKey];
  const aiTranslations = t.aiInstructions[aiKey];

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <Header showNav={false} />

      <div className="pt-20 pb-12 px-4 max-w-3xl mx-auto">
        {/* Hero - One liner */}
        <div className="flex items-center gap-3 mb-1">
          <div
            className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${config.color} flex items-center justify-center`}
          >
            <span className="text-2xl">{config.icon}</span>
          </div>
          <h1 className="text-2xl font-bold">
            {t.aiInstructions.howToUse} {config.name}
          </h1>
        </div>
        <p className="text-muted-foreground mb-8 ml-15">{aiTranslations.subtitle}</p>

        {/* Model Recommendation - with icon, reduced padding */}
        <Card className="mb-8 bg-primary/5 border-primary/20">
          <CardContent className="py-3">
            <div className="flex items-start gap-3">
              <span className="text-lg">💡</span>
              <div>
                <p className="font-semibold">{aiTranslations.modelTip.title}</p>
                <p className="text-sm text-muted-foreground">{aiTranslations.modelTip.subtitle}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timeline Steps with connecting lines between steps */}
        <div className="mb-8">
          {aiTranslations.steps.map((step, index) => (
            <div key={index} className="flex gap-4">
              {/* Step number + line column */}
              <div className="flex flex-col items-center w-8 flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-semibold text-sm">
                  {index + 1}
                </div>
                {/* Line connecting to next step */}
                {index < aiTranslations.steps.length - 1 && (
                  <div className="w-px bg-border flex-grow my-2" />
                )}
              </div>
              {/* Step content */}
              <div className="flex-1 min-w-0 pb-6">
                <p className="font-medium mb-2 pt-1">{step}</p>
                <div className="bg-muted rounded-lg h-40 flex items-center justify-center text-muted-foreground text-sm">
                  {t.aiInstructions.screenshotAlt} {index + 1}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Troubleshooting - equal padding, icon */}
        <Card className="mb-4">
          <CardContent className="py-4">
            <h2 className="font-semibold mb-3 flex items-center gap-2">
              <span>🔧</span>
              {t.aiInstructions.troubleshooting.title}
            </h2>
            <ul className="space-y-2 text-sm">
              {t.aiInstructions.troubleshooting.tips.map((tip, index) => (
                <li key={index} className="flex gap-2 text-muted-foreground">
                  <span>•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Common Issues - equal padding, icon */}
        <Card className="mb-8">
          <CardContent className="py-4">
            <h2 className="font-semibold mb-3 flex items-center gap-2">
              <span>❓</span>
              {t.aiInstructions.commonIssues.title}
            </h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-medium text-sm">{t.aiInstructions.commonIssues.encoding.title}</h3>
                <p className="text-sm text-muted-foreground">{t.aiInstructions.commonIssues.encoding.description}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm">{t.aiInstructions.commonIssues.truncation.title}</h3>
                <p className="text-sm text-muted-foreground">{t.aiInstructions.commonIssues.truncation.description}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm">{t.aiInstructions.commonIssues.cyrillic.title}</h3>
                <p className="text-sm text-muted-foreground">{t.aiInstructions.commonIssues.cyrillic.description}</p>
              </div>
            </div>
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
