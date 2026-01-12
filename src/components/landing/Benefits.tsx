'use client';

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
import { Card, CardContent, WavyUnderline } from '@/components/ui';
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
  const leftItems = items.slice(0, 4);
  const rightItems = items.slice(4, 8);

  return (
    <section id="benefits" className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-30">
        <WavyUnderline>{t.landing.benefits.title}</WavyUnderline>
      </h2>

      {/* Mobile: Video first, then benefits */}
      <div className="lg:hidden">
        <div className="flex justify-center mb-8">
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

      {/* Desktop: 3 columns - left benefits, video, right benefits */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_1.5fr_1fr] gap-6 items-center">
        <div className="grid grid-rows-4 gap-3">
          {leftItems.map((item, i) => (
            <BenefitCard
              key={i}
              icon={BENEFIT_ICONS[i]}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>

        <div className="flex justify-center px-4">
          <DemoVideo className="w-full" />
        </div>

        <div className="grid grid-rows-4 gap-3">
          {rightItems.map((item, i) => (
            <BenefitCard
              key={i + 4}
              icon={BENEFIT_ICONS[i + 4]}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function DemoVideo({ className }: { className?: string }) {
  return (
    <div className={`relative ${className ?? ''}`}>
      <div className="absolute -top-12 inset-x-0 flex justify-center z-10">
        <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm text-muted-foreground">
          Works in <img src="/logos/chatgpt.png" alt="ChatGPT" className="size-4 mx-1.5 invert" /> ChatGPT
        </span>
      </div>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full rounded-2xl"
        poster="/demo/chatgpt-demo.gif"
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
