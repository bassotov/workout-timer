'use client';

import Image from 'next/image';
import {
  UserCircle2,
  Smartphone,
  Settings2,
  Infinity,
  ShieldCheck,
  Sparkles,
  Cpu,
  Youtube,
  type LucideIcon,
} from 'lucide-react';
import { Card, CardContent, WavyUnderline, ScrollReveal } from '@/components/ui';
import { useLanguage } from '@/i18n';

const BENEFIT_ICONS: LucideIcon[] = [
  UserCircle2,
  Smartphone,
  Settings2,
  Infinity,
  ShieldCheck,
  Sparkles,
  Cpu,
  Youtube,
];

export function Benefits() {
  const { t } = useLanguage();
  const items = t.landing.benefits.items;

  return (
    <section id="benefits" className="max-w-6xl mx-auto px-6 py-16">
      <ScrollReveal>
        <h2 className="text-2xl md:text-3xl font-bold text-center md:mb-30 mb-20">
          <WavyUnderline>{t.landing.benefits.title}</WavyUnderline>
        </h2>
      </ScrollReveal>

      {/* Mobile: Video first, then benefits */}
      <ScrollReveal delay={200}>
      <div className="lg:hidden">
        <div className="flex justify-center mb-15">
          <DemoVideo />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {items.map((item, i) => (
            <BenefitCard
              key={i}
              icon={BENEFIT_ICONS[i]}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
      </ScrollReveal>

      {/* Desktop: 2 columns - all benefits on left, sticky video on right */}
      <ScrollReveal delay={200}>
      <div className="hidden lg:grid lg:grid-cols-[1fr_minmax(300px,400px)] gap-8 items-start">
        <div className="grid grid-cols-2 gap-4">
          {items.map((item, i) => (
            <BenefitCard
              key={i}
              icon={BENEFIT_ICONS[i]}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>

        <div className="sticky top-24">
          <DemoVideo className="w-full" />
        </div>
      </div>
      </ScrollReveal>
    </section>
  );
}

function DemoVideo({ className }: { className?: string }) {
  return (
    <div className={`top-10 relative ${className ?? ''}`}>
      <div className="absolute -top-12 inset-x-0 flex justify-center z-10">
        <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm text-muted-foreground">
          Works in <Image src="/logos/chatgpt.png" alt="ChatGPT" width={16} height={16} className="size-4 mx-1.5 invert" /> ChatGPT
        </span>
      </div>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full rounded-2xl"
      >
        <source src="/demo/chatgpt-demo.mp4" type="video/mp4" />
      </video>
    </div>
  );
}

interface BenefitCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

function BenefitCard({ icon: Icon, title, description }: BenefitCardProps) {
  return (
    <Card className="group hover:border-primary/50 hover:shadow-lg transition-all duration-300 h-full">
      <CardContent className="p-4 h-full">
        <Icon className="size-7 mb-2 text-primary group-hover:scale-110 transition-transform duration-300" />
        <h3 className="font-bold mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
