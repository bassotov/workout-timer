'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Header, Footer, Card, CardContent } from '@/components/ui';
import { useLanguage } from '@/i18n';

export default function GettingStartedPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <Header showNav={false} />

      <div className="pt-20 pb-12 px-4 max-w-2xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🎉</div>
          <h1 className="text-2xl font-bold">{t.gettingStarted.title}</h1>
        </div>

        {/* What You Got */}
        <Card className="mb-6 bg-primary/5 border-primary/20">
          <CardContent className="py-4">
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
            href="/troubleshooting"
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
          <Card className="hover:bg-muted/50 transition-colors">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-2">
                <Image src="/logos/chatgpt.png" alt="ChatGPT" width={28} height={28} className="rounded-lg" />
                <h3 className="font-semibold text-sm">ChatGPT</h3>
              </div>
              <ol className="text-xs text-muted-foreground space-y-0.5 list-decimal list-inside">
                {t.gettingStarted.setup.chatgpt.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
              <Link href="/instructions/chatgpt" className="text-xs text-primary hover:underline mt-2 inline-block">
                {t.gettingStarted.setup.detailedGuide} →
              </Link>
            </CardContent>
          </Card>

          {/* Claude */}
          <Card className="hover:bg-muted/50 transition-colors">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-2">
                <Image src="/logos/claude.png" alt="Claude" width={28} height={28} className="rounded-lg" />
                <h3 className="font-semibold text-sm">Claude</h3>
              </div>
              <ol className="text-xs text-muted-foreground space-y-0.5 list-decimal list-inside">
                {t.gettingStarted.setup.claude.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
              <Link href="/instructions/claude" className="text-xs text-primary hover:underline mt-2 inline-block">
                {t.gettingStarted.setup.detailedGuide} →
              </Link>
            </CardContent>
          </Card>

          {/* Gemini */}
          <Card className="hover:bg-muted/50 transition-colors">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-2">
                <Image src="/logos/gemini.png" alt="Gemini" width={28} height={28} className="rounded-lg" />
                <h3 className="font-semibold text-sm">Gemini</h3>
              </div>
              <ol className="text-xs text-muted-foreground space-y-0.5 list-decimal list-inside">
                {t.gettingStarted.setup.gemini.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
              <Link href="/instructions/gemini" className="text-xs text-primary hover:underline mt-2 inline-block">
                {t.gettingStarted.setup.detailedGuide} →
              </Link>
            </CardContent>
          </Card>

          {/* Other */}
          <Card className="hover:bg-muted/50 transition-colors">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center">
                  <span className="text-sm">💭</span>
                </div>
                <h3 className="font-semibold text-sm">{t.gettingStarted.setup.otherTitle}</h3>
              </div>
              <ol className="text-xs text-muted-foreground space-y-0.5 list-decimal list-inside">
                {t.gettingStarted.setup.other.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>

        {/* Tips */}
        <Card className="mb-8">
          <CardContent className="py-4">
            <h2 className="font-semibold mb-3 flex items-center gap-2">
              <span>💡</span>
              {t.gettingStarted.tips.title}
            </h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {t.gettingStarted.tips.items.map((tip, i) => (
                <li key={i} className="flex gap-2">
                  <span>•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

      </div>

      <Footer />
    </main>
  );
}
