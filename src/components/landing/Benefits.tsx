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
import { Card, CardContent } from '@/components/ui';
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

  return (
    <section id="benefits" className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
        {t.landing.benefits.title}
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {t.landing.benefits.items.map((item, i) => (
          <BenefitCard
            key={i}
            icon={BENEFIT_ICONS[i]}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
}

interface BenefitCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

function BenefitCard({ icon: Icon, title, description }: BenefitCardProps) {
  return (
    <Card className="group hover:border-primary/50 hover:shadow-lg transition-all duration-300">
      <CardContent className="pt-6">
        <Icon className="size-8 mb-3 text-primary group-hover:scale-110 transition-transform duration-300" />
        <h3 className="font-bold mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
