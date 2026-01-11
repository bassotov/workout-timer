'use client';

import { useState } from 'react';
import { Header, Footer, Card, CardContent, CopyablePrompt } from '@/components/ui';
import { useLanguage } from '@/i18n';
import type { UrlCorruptionType } from '@/types/errors';

type TabType = 'general' | UrlCorruptionType;

const ERROR_TYPES: UrlCorruptionType[] = [
  'truncated',
  'invalid_base64',
  'malformed_json',
  'schema_mismatch',
  'invalid_utf8',
  'control_characters',
  'unknown',
];

export default function TroubleshootingPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>('general');

  const isGeneralTab = activeTab === 'general';
  const errorInfo = !isGeneralTab ? t.error.specific[activeTab] : null;

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <Header showNav={false} />

      <div className="pt-20 pb-12 px-4 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">{t.error.troubleshootingTitle}</h1>
        <p className="text-muted-foreground mb-6">{t.error.whyGeneric}</p>

        {/* Tab Navigation */}
        <nav className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveTab('general')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              isGeneralTab
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/70 text-muted-foreground'
            }`}
          >
            {t.error.generalTab}
          </button>
          {ERROR_TYPES.map((type) => {
            const isActive = type === activeTab;
            return (
              <button
                key={type}
                onClick={() => setActiveTab(type)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/70 text-muted-foreground'
                }`}
              >
                {t.error.specific[type].title}
              </button>
            );
          })}
        </nav>

        {isGeneralTab ? (
          <>
            {/* Troubleshooting Tips */}
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

            {/* Common Issues */}
            <Card>
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
          </>
        ) : (
          <>
            {/* Error Content */}
            <Card className="mb-6">
              <CardContent className="py-4">
                <h2 className="font-semibold text-lg mb-2 text-primary">{errorInfo?.title}</h2>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  {t.error.whyTitle}
                </h3>
                <p className="text-sm">{errorInfo?.why}</p>
              </CardContent>
            </Card>

            {/* General Tips */}
            <Card>
              <CardContent className="py-4">
                <h2 className="font-semibold mb-4">{t.error.fixSteps.title}</h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex gap-2 text-sm mb-2">
                      <span className="text-muted-foreground">1.</span>
                      <span className="font-medium">{t.error.fixSteps.step1Title}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex gap-2 text-sm mb-2">
                      <span className="text-muted-foreground">2.</span>
                      <span className="font-medium">{t.error.fixSteps.step2Title}</span>
                    </div>
                    <CopyablePrompt text={errorInfo?.prompt ?? ''} className="ml-4" />
                  </div>
                  <div>
                    <div className="flex gap-2 text-sm mb-2">
                      <span className="text-muted-foreground">3.</span>
                      <span className="font-medium">{t.error.fixSteps.step3Title}</span>
                    </div>
                    <CopyablePrompt text={t.error.fixSteps.step3Prompt} className="ml-4" />
                  </div>
                  <div>
                    <div className="flex gap-2 text-sm mb-2">
                      <span className="text-muted-foreground">4.</span>
                      <span className="font-medium">{t.error.fixSteps.step4Title}</span>
                    </div>
                    <CopyablePrompt text={t.error.fixSteps.step4Prompt} className="ml-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <Footer />
    </main>
  );
}
