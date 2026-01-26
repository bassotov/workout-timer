'use client';

import { useState, type ReactNode } from 'react';
import { Card, CardContent, CopyablePrompt } from '@/components/ui';
import { useLanguage } from '@/i18n';
import type { UrlCorruptionType } from '@/types/errors';

type TabType = 'general' | 'link-errors';

function highlightKeyPhrases(text: string, phrases: string[]): ReactNode {
  let result: ReactNode[] = [text];

  for (const phrase of phrases) {
    const newResult: ReactNode[] = [];
    for (const part of result) {
      if (typeof part === 'string' && part.toLowerCase().includes(phrase.toLowerCase())) {
        const index = part.toLowerCase().indexOf(phrase.toLowerCase());
        const before = part.slice(0, index);
        const match = part.slice(index, index + phrase.length);
        const after = part.slice(index + phrase.length);
        if (before) newResult.push(before);
        newResult.push(<span key={`${phrase}-${index}`} className="text-primary font-medium">{match}</span>);
        if (after) newResult.push(after);
      } else {
        newResult.push(part);
      }
    }
    result = newResult;
  }

  return <>{result}</>;
}

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

  return (
    <div className="pt-28 pb-15 px-4 max-w-2xl mx-auto flex-1">
      {/* Tab Navigation */}
      <nav className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('general')}
          className={`px-7 py-1.5 rounded-full text-sm font-medium transition-colors ${
            activeTab === 'general'
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted hover:bg-muted/70 text-muted-foreground'
          }`}
        >
          {t.error.generalTab}
        </button>
        <button
          onClick={() => setActiveTab('link-errors')}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            activeTab === 'link-errors'
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted hover:bg-muted/70 text-muted-foreground'
          }`}
        >
          {t.error.linkErrorsTab}
        </button>
      </nav>

      {activeTab === 'general' ? (
        <div className="space-y-6">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            💡 {t.aiInstructions.troubleshooting.title}
          </h1>

          {/* Block 1 */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <span className="bg-primary text-black w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
              <span className="underline decoration-wavy decoration-primary/50 underline-offset-4">
                {t.aiInstructions.troubleshooting.block1.title}
              </span>
            </h3>
            <ul className="space-y-3 ml-5">
              {t.aiInstructions.troubleshooting.block1.tips.map((tip, index) => (
                <li key={index} className="flex gap-2">
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">
                    {highlightKeyPhrases(tip, [
                      'regenerate the link',
                      'перегенерировать ссылку',
                      'switching to a thinking but slower model',
                      'думающую, но медленную модель',
                      'Including an instruction',
                      'Добавление инструкции',
                    ])}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Block 2 */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <span className="bg-primary text-black w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold shrink-0">2</span>
              <span className="underline decoration-wavy decoration-primary/50 underline-offset-4">
                {t.aiInstructions.troubleshooting.block2.title}
              </span>
            </h3>
            <ul className="space-y-3 ml-5">
              {t.aiInstructions.troubleshooting.block2.tips.map((tip, index) => (
                <li key={index} className="flex gap-2">
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">
                    {highlightKeyPhrases(tip, [
                      'non-Latin alphabet',
                      'нелатинским алфавитом',
                      'experiment with exercise formats',
                      'экспериментируете с нестандартными форматами',
                    ])}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            🔧 {t.aiInstructions.troubleshooting.linkErrorsTitle}
          </h1>
          {ERROR_TYPES.map((type) => {
            const errorInfo = t.error.specific[type];
            return (
              <Card key={type}>
                <CardContent className="py-0">
                  <h3 className="font-semibold text-primary mb-2">{errorInfo.title}</h3>
                  <p className="text-sm mb-3">{errorInfo.why}</p>
                  <CopyablePrompt text={errorInfo.prompt} />
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Help text */}
      <p className="text-sm text-muted-foreground mt-25 text-center">
        {t.aiInstructions.troubleshooting.needHelp}{' '}
        <a
          href={`mailto:${t.aiInstructions.troubleshooting.supportEmail}`}
          className="text-primary hover:underline"
        >
          {t.aiInstructions.troubleshooting.supportEmail}
        </a>
      </p>
    </div>
  );
}
