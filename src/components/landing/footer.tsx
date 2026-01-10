'use client';

import Link from 'next/link';
import { useLanguage } from '@/i18n';

const AI_PLATFORMS = [
  { name: 'ChatGPT', href: '/instructions/chatgpt' },
  { name: 'Claude', href: '/instructions/claude' },
  { name: 'Gemini', href: '/instructions/gemini' },
] as const;

export function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="border-t border-white/10 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 pb-6 pt-8 ">
        {/* Main footer grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="font-bold text-lg">
              Workout Timer
            </Link>
            <p className="text-muted-foreground text-sm mt-2">
              {t.footer?.tagline ?? 'AI-powered workout timer'}
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-sm mb-3">
              {t.footer?.product ?? 'Product'}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`/timer?lang=${language}`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.footer?.timerDemo ?? 'Timer Demo'}
                </Link>
              </li>
              <li>
                <a
                  href="#hero"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.footer?.getStarted ?? 'Get Started'}
                </a>
              </li>
              <li>
                <Link
                  href="/restore"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.footer?.restoreFile ?? 'Restore File'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-sm mb-3">
              {t.footer?.resources ?? 'Resources'}
            </h3>
            <ul className="space-y-2">
              {AI_PLATFORMS.map((platform) => (
                <li key={platform.href}>
                  <Link
                    href={platform.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {platform.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-sm mb-3">
              {t.footer?.legal ?? 'Legal'}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.footer?.privacy ?? 'Privacy'}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t.footer?.terms ?? 'Terms'}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-white/10">
          <p className="text-sm text-muted-foreground text-center">
            {t.footer?.copyright ?? '© 2026 Workout Timer. All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
