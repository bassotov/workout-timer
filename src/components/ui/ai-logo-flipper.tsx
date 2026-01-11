'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { cn } from '@/lib';

const AI_LOGOS = [
  { src: '/logos/chatgpt.png', name: 'ChatGPT' },
  { src: '/logos/claude.png', name: 'Claude' },
  { src: '/logos/gemini.png', name: 'Gemini' },
  { src: '/logos/copilot.png', name: 'Copilot' },
  { src: '/logos/grok.png', name: 'Grok' },
] as const;

const CYCLE_INTERVAL = 2000;
const ANIMATION_DURATION = 0.4;

// Position configs
const POSITIONS = {
  exit: { x: '-1.25em', scale: 0.85, opacity: 0 },
  front: { x: 0, scale: 1, opacity: 1 },
  middle: { x: '0.1em', scale: 0.96, opacity: 0.7 },
  back: { x: '0.2em', scale: 0.92, opacity: 0 }, // Enter invisible, fade in
};

const Z_INDEX = { front: 3, middle: 2, back: 1 };

// Material Design standard easing (cubic bezier)
const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

interface AILogoFlipperProps {
  className?: string;
}

export function AILogoFlipper({ className }: AILogoFlipperProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % AI_LOGOS.length);
    }, CYCLE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  // 3 visible logos: front, middle, back
  const visibleIndices = [
    currentIndex,
    (currentIndex + 1) % AI_LOGOS.length,
    (currentIndex + 2) % AI_LOGOS.length,
  ];

  const getPosition = (logoIndex: number) => {
    const offset = (logoIndex - currentIndex + AI_LOGOS.length) % AI_LOGOS.length;
    if (offset === 0) return 'front';
    if (offset === 1) return 'middle';
    return 'back';
  };

  const frontLogo = AI_LOGOS[currentIndex];

  const cardBaseClass =
    'absolute top-0 left-0 inline-flex items-center justify-center size-[1em] rounded-md p-[0.12em] bg-white';

  const frontShadow = `
    0.05em 0.025em 0 0 #e5e5e5,
    0.1em 0.05em 0 0 #d4d4d4,
    0.15em 0.075em 0 0 #a3a3a3,
    0.2em 0.1em 0.35em rgba(0,0,0,0.25)
  `;

  const stackShadow = '0.07em 0.035em 0.12em rgba(0,0,0,0.15)';

  return (
    <span
      className={cn('inline-flex items-center justify-center', className)}
      role="img"
      aria-label={`AI assistant: ${frontLogo.name}`}
      style={{ perspective: '600px' }}
    >
      <span
        className="relative inline-block"
        style={{
          transform: 'rotateY(-20deg) rotateX(8deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        <AnimatePresence initial={false}>
          {visibleIndices.map((logoIndex) => {
            const position = getPosition(logoIndex);
            const logo = AI_LOGOS[logoIndex];
            const isFront = position === 'front';

            return (
              <motion.span
                key={logoIndex}
                initial={POSITIONS.back}
                animate={POSITIONS[position]}
                exit={POSITIONS.exit}
                transition={{ duration: ANIMATION_DURATION, ease: EASE }}
                className={cardBaseClass}
                style={{
                  zIndex: Z_INDEX[position],
                  boxShadow: isFront ? frontShadow : stackShadow,
                }}
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={48}
                  height={48}
                  className="size-full object-contain"
                  priority={isFront}
                />
              </motion.span>
            );
          })}
        </AnimatePresence>

        <span className="invisible inline-flex size-[1em]" />
      </span>
    </span>
  );
}
