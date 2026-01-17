'use client';

import { Suspense, useEffect, useMemo, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import {
  TimerDisplay, PhaseIndicator, ExerciseInfo, ControlButtons,
  RoundProgress, ExerciseProgress, TrackerPopup, CompletionScreen,
  LoadingScreen, DemoScreen, ErrorScreen, ReadyScreen,
} from '@/components/timer';
import { useTimer } from '@/hooks';
import { useTranslations, detectBrowserLanguage } from '@/i18n';
import { decodeWorkoutUrlWithDiagnostics } from '@/lib/url';
import { PHASE_COLORS, COOLDOWN_STRETCHES, BEEP_FREQUENCY, BEEP_GAIN, BEEP_DURATION, BEEP_THRESHOLD, getDemoWorkout } from '@/config';
import type { Workout, TimerPhase } from '@/types';

function TimerContent() {
  const searchParams = useSearchParams();
  const [demoWorkout, setDemoWorkout] = useState<Workout | null>(null);

  const workoutParam = searchParams.get('w');
  const langParam = searchParams.get('lang') as 'en' | 'ru' | null;

  // Decode workout with diagnostic error detection
  const { parsedWorkout, decodeError } = useMemo(() => {
    if (!workoutParam) return { parsedWorkout: null, decodeError: null };

    const result = decodeWorkoutUrlWithDiagnostics(workoutParam);
    return result.success
      ? { parsedWorkout: result.workout ?? null, decodeError: null }
      : { parsedWorkout: null, decodeError: result.error ?? null };
  }, [workoutParam]);

  // Track if we have a malformed URL (param exists but couldn't decode)
  const hasInvalidUrl = workoutParam && !parsedWorkout;

  const workout = demoWorkout || parsedWorkout;
  const effectiveLang = workout?.lang || langParam || 'en';
  const t = useTranslations(effectiveLang);
  const timer = useTimer(workout);
  const cooldownStretches = COOLDOWN_STRETCHES[effectiveLang];

  const playBeep = useCallback(() => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = BEEP_FREQUENCY;
      osc.type = 'sine';
      gain.gain.setValueAtTime(BEEP_GAIN, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + BEEP_DURATION);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + BEEP_DURATION);
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    if (!timer.derived.isRunning) return;
    const interval = setInterval(() => {
      if (timer.state.timeLeft <= BEEP_THRESHOLD && timer.state.timeLeft > 1) playBeep();
      timer.actions.tick();
    }, 1000);
    return () => clearInterval(interval);
  }, [timer.derived.isRunning, timer.state.timeLeft, timer.actions, playBeep]);

  const totalDuration = useMemo(() => {
    if (!workout) return 0;
    const exTime = workout.exercises.reduce((sum, e) => sum + e.duration, 0);
    const restTime = (workout.exercises.length - 1) * workout.restEx;
    const roundTime = exTime + restTime;
    const total = roundTime * workout.rounds + (workout.rounds - 1) * workout.restRound;
    const cooldownTime = workout.cooldown ? cooldownStretches.reduce((sum, s) => sum + s.duration, 0) : 0;
    return Math.round((total + cooldownTime) / 60);
  }, [workout, cooldownStretches]);

  // Show error screen if URL param exists but failed to decode
  if (!workout && hasInvalidUrl) {
    return <ErrorScreen errorType={decodeError?.type} />;
  }

  // Show demo screen if no workout URL provided
  if (!workout) return <DemoScreen onLoadDemo={() => setDemoWorkout(getDemoWorkout(langParam || detectBrowserLanguage()))} lang={langParam || undefined} />;

  const trackerTranslations = { trackerTitle: t.tracker.title, trackerReady: t.tracker.ready, trackerWhoop: t.tracker.whoop, trackerApple: t.tracker.apple, trackerGarmin: t.tracker.garmin, trackerOura: t.tracker.oura, trackerCustom: t.tracker.custom, reset: t.controls.reset };

  if (timer.state.phase === 'complete') {
    return <CompletionScreen workoutName={workout.name} onStartAgain={timer.actions.reset} onNewWorkout={() => { setDemoWorkout(null); timer.actions.reset(); }} translations={{ greatWork: t.workout.greatWork, workoutComplete: t.workout.workoutComplete, startAgain: t.controls.startAgain, newWorkout: t.controls.newWorkout }} />;
  }

  if (timer.state.phase === 'idle') {
    return <ReadyScreen workout={workout} totalDuration={totalDuration} onStart={timer.actions.start} translations={{ rounds: t.workout.rounds, min: t.workout.min, cooldown: t.timer.cooldown, start: t.controls.start }} />;
  }

  if (timer.state.phase === 'tracker') {
    return (
      <div className="min-h-dvh bg-background flex flex-col items-center justify-center p-6 safe-area-inset text-foreground">
        <TrackerPopup open={true} tracker={workout.tracker} onStart={timer.actions.skip} onClose={timer.actions.reset} translations={trackerTranslations} />
      </div>
    );
  }

  const { phase, currentRound, exerciseIndex, cooldownIndex, isPaused, timeLeft } = timer.state;
  const phaseColor = PHASE_COLORS[phase as TimerPhase] || PHASE_COLORS.idle;
  const nextExercise = workout.exercises[exerciseIndex + 1] || null;
  const compactPhaseIndicator = workout.rounds > 3 || workout.exercises.length > 5;

  return (
    <main className={`min-h-dvh ${phaseColor} flex flex-col text-white transition-colors duration-500`}>
      <div className="flex justify-between items-center p-4 safe-top bg-black/20">
        <PhaseIndicator phase={phase} translations={t.timer} compactMode={compactPhaseIndicator} />
        <div className="flex items-center gap-4">
          <RoundProgress currentRound={currentRound} totalRounds={workout.rounds} phase={phase} />
          <div className="w-px h-6 bg-white/30" />
          <ExerciseProgress exerciseIndex={phase === 'cooldown' ? cooldownIndex : exerciseIndex} totalExercises={phase === 'cooldown' ? cooldownStretches.length : workout.exercises.length} />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        {phase === 'countdown' && <h1 className="text-5xl font-bold mb-6 text-center">{t.workout.prepareRound} {currentRound}</h1>}
        {phase === 'cooldownCountdown' && <h1 className="text-5xl font-bold mb-6 text-center">{t.workout.prepareStretching}</h1>}
        {phase === 'work' && <ExerciseInfo exercise={timer.derived.currentExercise} translations={{ video: t.workout.video, next: t.workout.next }} />}
        {phase === 'rest' && <ExerciseInfo exercise={nextExercise} translations={{ video: t.workout.video, next: t.workout.next, restGetReady: t.workout.restGetReady }} showAsNext showEquipment />}
        {phase === 'roundRest' && (
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-2">{t.workout.roundComplete} {currentRound} ✓</h1>
            <p className="text-2xl opacity-80 mb-4">{t.workout.prepareRound} {currentRound + 1}</p>
            <div className="flex flex-col gap-2 items-center">
              {workout.exercises[0]?.weight && workout.exercises[0].weight !== '—' && (
                <Badge variant="secondary" className="bg-black/20 text-white border-0 text-xl px-6 py-3">
                  ⚖️ {workout.exercises[0].weight}
                </Badge>
              )}
              {workout.exercises[0]?.equipment && (
                <Badge variant="secondary" className="bg-black/20 text-white border-0 text-xl px-6 py-3">
                  🏋️ {workout.exercises[0].equipment}
                </Badge>
              )}
            </div>
          </div>
        )}
        {phase === 'cooldown' && timer.derived.currentStretch && (
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">{timer.derived.currentStretch.name}</h1>
            <p className="text-xl opacity-80 mb-8 max-w-md">{timer.derived.currentStretch.desc}</p>
          </div>
        )}
        <TimerDisplay timeLeft={timeLeft} />
      </div>

      <div className="p-6 safe-bottom">
        <ControlButtons isPaused={isPaused} onPause={timer.actions.pause} onResume={timer.actions.resume} onSkip={timer.actions.skip} onReset={timer.actions.reset} translations={{ pause: t.controls.pause, resume: t.controls.resume, skip: t.controls.skip, reset: t.controls.reset }} />
      </div>
    </main>
  );
}

export default function TimerPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <TimerContent />
    </Suspense>
  );
}
