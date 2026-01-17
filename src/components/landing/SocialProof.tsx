'use client';

import Image from 'next/image';
import { useLanguage } from '@/i18n';

const USER_IMAGES = [
  '/users/user_1.jpg',
  '/users/user_2.jpg',
  '/users/user_3.jpg',
  '/users/user_4.jpg',
  '/users/user_5.jpg',
];

export function SocialProof() {
  const { t } = useLanguage();

  return (
    <div className="flex items-center justify-center lg:justify-start gap-3 mt-8">
      <div className="flex -space-x-5">
        {USER_IMAGES.map((src, i) => (
          <Image
            key={i}
            src={src}
            alt=""
            width={40}
            height={40}
            className="size-10 rounded-full border-2 border-background object-cover"
            style={{ zIndex: USER_IMAGES.length - i }}
          />
        ))}
      </div>
      <span className="text-sm text-muted-foreground">
        {USER_IMAGES.length} {t.landing.socialProof.text}
      </span>
    </div>
  );
}
