'use client';

import { useEffect, useRef } from 'react';
import { Card, CardContent, WavyUnderline } from '@/components/ui';
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
    const scrollSpeed = 0.5; // pixels per frame

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
    <section className="py-16 overflow-hidden">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-30 px-6">
        <WavyUnderline>{t.landing.testimonials.title}</WavyUnderline>
      </h2>

      <div
        ref={containerRef}
        className="flex gap-6 overflow-x-hidden px-6"
        style={{ scrollBehavior: 'auto' }}
      >
        {allTestimonials.map((testimonial, i) => (
          <Card key={i} className="shrink-0 w-80">
            <CardContent className="pt-6">
              <p className="text-sm italic mb-4">&quot;{testimonial.quote}&quot;</p>
              <p className="text-xs text-muted-foreground">— {testimonial.author}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
