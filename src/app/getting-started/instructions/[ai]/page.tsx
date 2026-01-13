'use client';

import { notFound } from 'next/navigation';
import { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button, Card, CardContent } from '@/components/ui';
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
    <div className="pt-20 pb-12 px-4 max-w-3xl mx-auto">
      {/* Platform Navigation */}
      <nav className="flex flex-wrap gap-2 mb-8">
        {AI_CONFIG_KEYS.map((key) => {
          const platform = AI_CONFIGS[key];
          const isActive = key === aiKey;
          return (
            <Link
              key={key}
              href={`/getting-started/instructions/${key}`}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/70 text-muted-foreground'
              }`}
            >
              <Image
                src={platform.logo}
                alt={platform.name}
                width={20}
                height={20}
                className={`rounded ${platform.logoInvert && !isActive ? 'invert' : ''}`}
              />
              {platform.name}
            </Link>
          );
        })}
      </nav>
      {/* Hero - One liner */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${config.color} flex items-center justify-center`}
        >
          <Image
            src={config.logo}
            alt={config.name}
            width={32}
            height={32}
            className={`rounded-lg ${config.logoInvert ? 'invert' : ''}`}
          />
        </div>
        <h1 className="text-2xl font-bold">
          {t.aiInstructions.howToUse} {config.name}
        </h1>
      </div>
    

      {/* Model Recommendation - with icon, reduced padding */}
      <Card className="mb-8 bg-primary/5 border-primary/20">
        <CardContent className="py-0">
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
              {config.screenshots[index] ? (
                <Image
                  src={config.screenshots[index]}
                  alt={`${t.aiInstructions.screenshotAlt} ${index + 1}`}
                  width={800}
                  height={450}
                  className="rounded-lg border border-border"
                  unoptimized
                />
              ) : (
                <div className="bg-muted rounded-lg h-40 flex items-center justify-center text-muted-foreground text-sm">
                  {t.aiInstructions.screenshotAlt} {index + 1}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Setup on Mobile - ChatGPT only */}
      {aiKey === 'chatgpt' && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">{t.aiInstructions.setupOnMobile}</h2>
          <div className="flex justify-center">
            <div className="rounded-2xl overflow-hidden border border-border max-h-[700px] w-auto">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="h-full max-h-[700px] w-auto"
              >
                <source src="/demo/chatgpt-setup.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      )}

      {/* CTA buttons */}
      <div className="text-center space-y-4">
        <p className="text-sm text-muted-foreground">
          {t.aiInstructions.noFileYet}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/?start=poll">
            <Button size="lg">{t.aiInstructions.getFile}</Button>
          </Link>
          <Link href="/getting-started/troubleshooting">
            <Button size="lg" variant="outline">
              🔧 {t.aiInstructions.troubleshooting.title}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
