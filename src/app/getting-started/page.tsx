'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui';
import { useLanguage } from '@/i18n';

export default function GettingStartedPage() {
  const { t } = useLanguage();

  return (
    <div className="pt-20 pb-12 px-4 max-w-2xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🎉</div>
          <h1 className="text-2xl font-bold">{t.gettingStarted.title}</h1>
        </div>

        {/* What You Got */}
        <Card className="mb-6 bg-primary/5 border-primary/20">
          <CardContent className="py-0">
            <h2 className="font-semibold mb-2 flex items-center gap-2">
              <span>📄</span>
              {t.gettingStarted.whatYouGot.title}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t.gettingStarted.whatYouGot.description}
            </p>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <h2 className="text-xl font-bold mb-4">{t.gettingStarted.quickLinks}</h2>
        <div className="grid grid-cols-2 gap-3 mb-8">
          <Link
            href="/restore"
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-muted font-medium text-sm hover:bg-muted/70 transition-colors"
          >
            <span>🔄</span>
            {t.gettingStarted.links.restore.title}
          </Link>

          <Link
            href="/timer"
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-muted font-medium text-sm hover:bg-muted/70 transition-colors"
          >
            <span>⏱️</span>
            {t.gettingStarted.links.timer.title}
          </Link>

          <Link
            href="/getting-started/troubleshooting"
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-muted font-medium text-sm hover:bg-muted/70 transition-colors"
          >
            <span>🔧</span>
            {t.gettingStarted.links.troubleshooting.title}
          </Link>

          <a
            href="mailto:support@workout-timer.app?subject=Feedback%20on%20Workout%20Timer"
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-muted font-medium text-sm hover:bg-muted/70 transition-colors"
          >
            <span>💡</span>
            {t.gettingStarted.links.feedback.title}
          </a>
        </div>

        {/* Setup by Platform */}
        <h2 className="text-xl font-bold mb-4">{t.gettingStarted.setup.title}</h2>

        <div className="grid grid-cols-2 gap-3 mb-8">
          {/* ChatGPT */}
          <Link href="/getting-started/instructions/chatgpt">
            <Card className="hover:bg-muted/50 hover:border-primary/50 transition-all cursor-pointer">
              <CardContent className="py-3 flex flex-col items-center gap-1">
                <div className="flex items-center gap-2">
                  <Image src="/logos/chatgpt.png" alt="ChatGPT" width={24} height={24} className="rounded invert" />
                  <span className="font-semibold">ChatGPT</span>
                </div>
                <span className="text-xs text-muted-foreground">{t.gettingStarted.setup.detailedGuide}</span>
              </CardContent>
            </Card>
          </Link>

          {/* Claude */}
          <Link href="/getting-started/instructions/claude">
            <Card className="hover:bg-muted/50 hover:border-primary/50 transition-all cursor-pointer">
              <CardContent className="py-3 flex flex-col items-center gap-1">
                <div className="flex items-center gap-2">
                  <Image src="/logos/claude.png" alt="Claude" width={24} height={24} className="rounded" />
                  <span className="font-semibold">Claude</span>
                </div>
                <span className="text-xs text-muted-foreground">{t.gettingStarted.setup.detailedGuide}</span>
              </CardContent>
            </Card>
          </Link>

          {/* Gemini */}
          <Link href="/getting-started/instructions/gemini">
            <Card className="hover:bg-muted/50 hover:border-primary/50 transition-all cursor-pointer">
              <CardContent className="py-3 flex flex-col items-center gap-1">
                <div className="flex items-center gap-2">
                  <Image src="/logos/gemini.png" alt="Gemini" width={24} height={24} className="rounded" />
                  <span className="font-semibold">Gemini</span>
                </div>
                <span className="text-xs text-muted-foreground">{t.gettingStarted.setup.detailedGuide}</span>
              </CardContent>
            </Card>
          </Link>

          {/* Grok */}
          <Link href="/getting-started/instructions/grok">
            <Card className="hover:bg-muted/50 hover:border-primary/50 transition-all cursor-pointer">
              <CardContent className="py-3 flex flex-col items-center gap-1">
                <div className="flex items-center gap-2">
                  <Image src="/logos/grok.png" alt="Grok" width={24} height={24} className="rounded invert" />
                  <span className="font-semibold">Grok</span>
                </div>
                <span className="text-xs text-muted-foreground">{t.gettingStarted.setup.detailedGuide}</span>
              </CardContent>
            </Card>
          </Link>

          {/* Perplexity */}
          <Link href="/getting-started/instructions/perplexity">
            <Card className="hover:bg-muted/50 hover:border-primary/50 transition-all cursor-pointer">
              <CardContent className="py-3 flex flex-col items-center gap-1">
                <div className="flex items-center gap-2">
                  <Image src="/logos/perplexity.png" alt="Perplexity" width={24} height={24} className="rounded invert" />
                  <span className="font-semibold">Perplexity</span>
                </div>
                <span className="text-xs text-muted-foreground">{t.gettingStarted.setup.detailedGuide}</span>
              </CardContent>
            </Card>
          </Link>

          {/* Other */}
          <Card>
            <CardContent className="py-3 flex flex-col items-center gap-1">
              <span className="font-semibold">{t.gettingStarted.setup.otherTitle}</span>
              <span className="text-xs text-muted-foreground">{t.gettingStarted.setup.otherHint}</span>
            </CardContent>
          </Card>
        </div>

        {/* Tips */}
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span>💡</span>
          {t.gettingStarted.tips.title}
        </h2>
        <ul className="space-y-2 text-mb mb-8">
          {t.gettingStarted.tips.items.map((tip, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-primary">•</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>

    </div>
  );
}
