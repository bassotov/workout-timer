'use client';

import Link from 'next/link';
import { Button } from '@/components/ui';
import { useLanguage } from '@/i18n';

export function HowItWorks() {
  const { t, language } = useLanguage();

  return (
    <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
        {t.landing.howItWorks.title}
      </h2>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Left: Stepper */}
        <div className="space-y-0">
          {t.landing.howItWorks.steps.map((step, i) => (
            <StepItem
              key={i}
              number={i + 1}
              title={step.title}
              description={step.description}
              isLast={i === t.landing.howItWorks.steps.length - 1}
            />
          ))}

          <div className="pt-6 pl-12">
            <Button variant="outline" asChild>
              <Link href={`/timer?lang=${language}`} target="_blank">
                {t.landing.howItWorks.demoButton}
              </Link>
            </Button>
          </div>
        </div>

        {/* Right: Phone mockup placeholder */}
        <div className="hidden md:flex justify-center">
          <PhoneMockup />
        </div>
      </div>
    </section>
  );
}

function StepItem({
  number,
  title,
  description,
  isLast,
}: {
  number: number;
  title: string;
  description: string;
  isLast: boolean;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
          {number}
        </div>
        {!isLast && <div className="w-0.5 h-full min-h-16 bg-border" />}
      </div>
      <div className="pb-8">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
  );
}

function PhoneMockup() {
  return (
    <div className="relative w-64 h-[500px] bg-muted rounded-[2.5rem] border-4 border-foreground/20 shadow-xl">
      {/* Notch */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-1.5 bg-foreground/20 rounded-full" />
      {/* Screen */}
      <div className="absolute inset-4 rounded-[2rem] bg-background/50 flex items-center justify-center">
        <span className="text-muted-foreground text-sm">Timer Preview</span>
      </div>
    </div>
  );
}
