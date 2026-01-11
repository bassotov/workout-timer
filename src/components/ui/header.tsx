'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { LanguageSwitcher } from './language-switcher';
import { Button } from './button';
import { useLanguage } from '@/i18n';

interface HeaderProps {
  showLanguageSwitcher?: boolean;
  showNav?: boolean;
  className?: string;
  onCtaClick?: () => void;
}

const NAV_ITEMS = [
  { labelKey: 'howItWorks', href: '#how-it-works' },
  { labelKey: 'benefits', href: '#benefits' },
  { labelKey: 'pricing', href: '#pricing' },
] as const;

export function Header({
  showLanguageSwitcher = true,
  showNav = true,
  className,
  onCtaClick,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  // Close menu on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    }
    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen]);

  // Close menu on navigation
  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  const navLabels: Record<string, string> = {
    howItWorks: t.nav?.howItWorks ?? 'How It Works',
    benefits: t.nav?.benefits ?? 'Benefits',
    pricing: t.nav?.pricing ?? 'Pricing',
  };

  return (
    <header
      ref={menuRef}
      className={`fixed top-0 left-0 right-0 z-50 md:top-3 ${className || ''}`}
    >
      <div className="backdrop-blur-xl bg-background/70 border-b border-white/10 md:border md:rounded-xl md:w-[94.5%] md:max-w-6xl md:mx-auto">
        <div className="flex items-center justify-between h-14 px-4 max-w-6xl mx-auto md:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="font-bold text-sm hover:opacity-80 transition-opacity"
        >
          Workout Timer
        </Link>

        {/* Desktop Nav */}
        {showNav && (
          <nav className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {navLabels[item.labelKey]}
              </a>
            ))}
          </nav>
        )}

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Language switcher - always visible */}
          {showLanguageSwitcher && <LanguageSwitcher />}

          {/* CTA button - desktop */}
          {showNav && onCtaClick && (
            <Button size="sm" className="hidden md:inline-flex" onClick={onCtaClick}>
              {t.footer?.getStarted ?? 'Get Started'}
            </Button>
          )}

          {/* Hamburger button - mobile */}
          {showNav && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-white/10 rounded-md transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          )}
        </div>
        </div>

        {/* Mobile menu */}
        {showNav && mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10">
            <nav className="flex flex-col p-4 gap-2">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick}
                  className="text-sm py-2 px-3 rounded-md hover:bg-white/10 transition-colors"
                >
                  {navLabels[item.labelKey]}
                </a>
              ))}
              {onCtaClick && (
                <Button size="sm" className="mt-2" onClick={() => { handleNavClick(); onCtaClick(); }}>
                  {t.footer?.getStarted ?? 'Get Started'}
                </Button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
