'use client';

import { WavyUnderline } from '@/components/ui';
import { useLanguage } from '@/i18n';

export function HowItWorks() {
  const { t } = useLanguage();

  return (
    <section id="how-it-works" className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-30">
        <WavyUnderline>{t.landing.howItWorks.title}</WavyUnderline>
      </h2>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
        {/* Left: Demo video (desktop) */}
        <div className="hidden md:flex justify-center">
          <DemoVideo className="max-w-xs ml-40" />
        </div>

        {/* Mobile: Demo video above steps */}
        <div className="md:hidden mb-4">
          <DemoVideo />
        </div>

        {/* Right: Stepper */}
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

function DemoVideo({ className }: { className?: string }) {
  return (
    <div className={`relative ${className ?? ''}`}>
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-10">
        <span className="inline-flex items-center justify-center gap-1.5 px-6 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm text-muted-foreground whitespace-nowrap">
          Works in <img src="/logos/claude.png" alt="Claude" className="size-4" /> Claude
        </span>
      </div>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full rounded-2xl"
        poster="/demo/how-it-works.gif"
      >
        <source src="/demo/how-it-works.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
