'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { WavyUnderline, ScrollReveal } from '@/components/ui';
import { useLanguage } from '@/i18n';
import { FAQ_ITEMS } from '@/config';

export function FAQ() {
  const { t } = useLanguage();

  return (
    <section id="faq" className="max-w-3xl mx-auto px-6 py-16">
      <ScrollReveal>
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          <WavyUnderline>{t.landing.faq.title}</WavyUnderline>
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={200}>
      <Accordion type="single" collapsible className="w-full">
        {FAQ_ITEMS.map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger className="text-left">
              {t.landing.faq.items[item.id as keyof typeof t.landing.faq.items].question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {t.landing.faq.items[item.id as keyof typeof t.landing.faq.items].answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      </ScrollReveal>
    </section>
  );
}
