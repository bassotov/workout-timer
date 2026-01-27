'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Quote } from 'lucide-react';
import { Card, CardContent, WavyUnderline, ScrollReveal } from '@/components/ui';
import { useLanguage } from '@/i18n';
import { TESTIMONIALS } from '@/config';

export function Testimonials() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationId: number;
    let scrollPos = 0;
    const scrollSpeed = 1.5; // pixels per frame

    const scroll = () => {
      scrollPos += scrollSpeed;
      // Reset when we've scrolled half the content (the duplicate)
      if (scrollPos >= container.scrollWidth / 2) {
        scrollPos = 0;
      }
      container.scrollLeft = scrollPos;
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationId);
  }, []);

  // Duplicate testimonials for infinite scroll effect
  const allTestimonials = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="py-16 relative">
      <ScrollReveal>
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-30 px-6">
          <WavyUnderline>{t.landing.testimonials.title}</WavyUnderline>
        </h2>
      </ScrollReveal>

      <div
        ref={containerRef}
        className="flex gap-6 overflow-x-hidden px-6"
        style={{ scrollBehavior: 'auto' }}
      >
        {allTestimonials.map((testimonial, i) => (
          <Card key={i} className="shrink-0 w-80 h-48 relative">
            <Quote className="absolute top-5 right-5 size-6 text-primary/20" />
            <CardContent className="p-6 pb-16 h-full flex items-center">
              <p className="text-sm italic pr-6">&quot;{testimonial.quote}&quot;</p>
            </CardContent>
            <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image
                  src={testimonial.image}
                  alt={testimonial.author}
                  width={32}
                  height={32}
                  className="size-8 rounded-full object-cover"
                />
                <p className="text-xs text-muted-foreground">{testimonial.author}</p>
              </div>
              <Image
                src={`/logos/${testimonial.llm}.png`}
                alt={testimonial.llm}
                width={32}
                height={32}
                className="size-8 opacity-30 brightness-0 invert"
              />
            </div>
          </Card>
        ))}
      </div>

      {/* Left fade gradient */}
      <div
        className="absolute left-0 top-0 bottom-0 w-16 md:w-100 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, var(--background) 20%, transparent)' }}
      />
      {/* Right fade gradient */}
      <div
        className="absolute right-0 top-0 bottom-0 w-16 md:w-100 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, var(--background) 20%, transparent)' }}
      />
    </section>
  );
}
