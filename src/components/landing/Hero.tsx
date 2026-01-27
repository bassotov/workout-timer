'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { Volume2, VolumeX, Play } from 'lucide-react';
import { Button, AILogoFlipper, WavyUnderline } from '@/components/ui';
import { useLanguage } from '@/i18n';
import { SocialProof } from './SocialProof';

interface HeroProps {
  onStart: () => void;
}

export function Hero({ onStart }: HeroProps) {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const [showMobileVideo, setShowMobileVideo] = useState(false);

  const openMobileVideo = () => {
    setShowMobileVideo(true);
    setTimeout(() => { mobileVideoRef.current?.play(); }, 100);
  };

  const closeMobileVideo = () => {
    mobileVideoRef.current?.pause();
    setShowMobileVideo(false);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  return (
    <div className="relative">
      {/* Sunrise gradient - orange circle at top fading down */}
      <div
        className="absolute inset-x-0 -top-28 bottom-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 100% 90% at 50% 10%, rgba(251, 146, 60, 0.15) 0%, transparent 90%)',
        }}
      />
      <div className="relative max-w-7xl mx-auto px-6 lg:pl-16 py-10 overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-6 items-center">
          {/* Left: Text content */}
          <div className="md:ml-15 text-center lg:text-left flex-1 min-w-0 max-w-[700]">
            <div className="animate-fade-in-up inline-block mb-8 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm text-muted-foreground">
              {t.landing.hero.subtext}
            </div>

            <h1 className="animate-fade-in-up text-4xl md:text-5xl font-bold mb-10" style={{ animationDelay: '200ms' }}>
              <span className="inline-flex items-center mb-1.5 justify-center lg:justify-start flex-wrap gap-x-3">
                <span>{t.landing.hero.titlePart1}</span>
                <AILogoFlipper />
                <span className="ml-0.5 md:ml-2">{t.landing.hero.titlePart2}</span>
              </span>
              <br />
              <span>{t.landing.hero.titlePart3}</span>
              <WavyUnderline>{t.landing.hero.titlePart4}</WavyUnderline>
            </h1>
            <p className="animate-fade-in-up text-xl text-muted-foreground mb-8 max-w-2xl lg:max-w-none" style={{ animationDelay: '400ms' }}>
              {t.landing.hero.subtitle}
            </p>

            {/* Mobile: See demo button */}
            <div className="animate-fade-in-up lg:hidden mb-8" style={{ animationDelay: '500ms' }}>
              <button
                onClick={openMobileVideo}
                className="inline-flex items-center gap-2 text-lg text-muted-foreground hover:text-foreground transition-colors"
              >
                <Play className="w-5 h-5" />
                {t.landing.hero.seeDemo}
              </button>
            </div>

            <Button onClick={onStart} size="lg" className="animate-fade-in-up text-lg px-16 py-6 h-auto" style={{ animationDelay: '600ms' }}>
              {t.landing.hero.cta}
            </Button>

            <Link
              href="/restore"
              className="animate-fade-in-up block mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
              style={{ animationDelay: '700ms' }}
            >
              {t.landing.hero.restorePurchase}
            </Link>

            <div className="animate-fade-in-up" style={{ animationDelay: '800ms' }}>
              <SocialProof/>
            </div>
          </div>

          {/* Right: Demo video (desktop) */}
          {/* CROPPING GUIDE:
              - h-[620px] / w-[300px]: visible window size — adjust to match your phone screen
              - object-[50%_50%]: crop anchor point — move to pan around the video
                  left/right: decrease/increase first % (e.g. 40% shifts left)
                  up/down: decrease/increase second % (e.g. 30% shifts up)
              - scale-[1.0]: zoom level — increase to zoom in (e.g. 1.2 = 120%)
              - rounded-[44px]: iPhone corner radius
          */}
          <div className="animate-fade-in-up hidden lg:block relative flex-shrink-0" style={{ animationDelay: '900ms' }}>
            <div
              className="relative rounded-[52px] overflow-hidden drop-shadow-2xl"
              style={{ height: 620, width: 300 }}
            >
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                src="/demo/checkout_demo.mp4"
                onClick={toggleMute}
                className="h-full w-full object-cover scale-[1.0] cursor-pointer"
                style={{ objectPosition: '50% 50%' }}
              />
              <button
                onClick={toggleMute}
                className="absolute bottom-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                aria-label={muted ? 'Unmute' : 'Mute'}
              >
                {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <span className="absolute bottom-4 left-4 text-xs text-white/70 bg-black/40 px-2 py-1 rounded">
                {t.landing.hero.tapToUnmute}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile fullscreen video modal */}
      {showMobileVideo && (
        <div
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          onClick={closeMobileVideo}
        >
          <button
            onClick={closeMobileVideo}
            className="absolute top-4 right-4 text-white text-2xl font-bold z-10 w-10 h-10 flex items-center justify-center"
          >
            ✕
          </button>
          <video
            ref={mobileVideoRef}
            controls
            playsInline
            className="max-h-full max-w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <source src="/demo/checkout_demo.mp4" type="video/mp4" />
          </video>
        </div>
      )}
    </div>
  );
}
