'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';

interface Exercise {
  name: string;
  reps: string;
  duration: number;
  weight?: string;
  video?: string;
  equipment?: string;
}

interface Workout {
  name: string;
  rounds: number;
  restEx: number;
  restRound: number;
  cooldown: boolean;
  exercises: Exercise[];
  lang?: 'en' | 'ru';
  tracker?: 'whoop' | 'apple' | 'garmin' | 'none';
}

interface CooldownStretch {
  name: string;
  duration: number;
  desc: string;
}

type Lang = 'en' | 'ru';

const translations: Record<Lang, {
  work: string;
  rest: string;
  roundRest: string;
  cooldown: string;
  complete: string;
  pause: string;
  resume: string;
  skip: string;
  reset: string;
  next: string;
  roundComplete: string;
  prepareRound: string;
  greatWork: string;
  workoutComplete: string;
  startAgain: string;
  newWorkout: string;
  start: string;
  video: string;
  loading: string;
  rounds: string;
  min: string;
  trackerTitle: string;
  trackerReady: string;
  trackerWhoop: string;
  trackerApple: string;
  trackerGarmin: string;
}> = {
  en: {
    work: 'WORK',
    rest: 'REST',
    roundRest: 'REST',
    cooldown: 'COOLDOWN',
    complete: 'DONE',
    pause: 'PAUSE',
    resume: 'CONTINUE',
    skip: 'SKIP',
    reset: 'Reset',
    next: 'Next:',
    roundComplete: 'Round',
    prepareRound: 'Prepare for round',
    greatWork: 'Great Work!',
    workoutComplete: 'complete',
    startAgain: 'Start Again',
    newWorkout: 'New Workout',
    start: 'START',
    video: 'Video',
    loading: 'Loading workout...',
    rounds: 'rounds',
    min: 'min',
    trackerTitle: 'Start Tracking',
    trackerReady: "Ready, let's go!",
    trackerWhoop: 'Open WHOOP → Activity → Strength Training',
    trackerApple: 'Start a workout on your Apple Watch',
    trackerGarmin: 'Start activity recording on your Garmin',
  },
  ru: {
    work: 'РАБОТА',
    rest: 'ОТДЫХ',
    roundRest: 'ОТДЫХ',
    cooldown: 'ЗАМИНКА',
    complete: 'ГОТОВО',
    pause: 'ПАУЗА',
    resume: 'ДАЛЬШЕ',
    skip: 'ПРОПУСТИТЬ',
    reset: 'Сбросить',
    next: 'Следующее:',
    roundComplete: 'Круг',
    prepareRound: 'Готовься к кругу',
    greatWork: 'Отличная работа!',
    workoutComplete: 'завершена',
    startAgain: 'Начать заново',
    newWorkout: 'Другая тренировка',
    start: 'НАЧАТЬ',
    video: 'Видео',
    loading: 'Загрузка тренировки...',
    rounds: 'кругов',
    min: 'мин',
    trackerTitle: 'Включи трекер',
    trackerReady: 'Готов, поехали!',
    trackerWhoop: 'Открой WHOOP → Activity → Strength Training',
    trackerApple: 'Запусти тренировку на Apple Watch',
    trackerGarmin: 'Запусти запись активности на Garmin',
  },
};

const COOLDOWN: Record<Lang, CooldownStretch[]> = {
  en: [
    { name: 'Quad Stretch', duration: 30, desc: 'Standing, pull heel to glute, 15s per leg' },
    { name: 'Forward Fold', duration: 30, desc: 'Legs straight, reach for toes' },
    { name: 'Chest Stretch', duration: 30, desc: 'Hand on wall, rotate torso away' },
    { name: 'Cat-Cow', duration: 40, desc: 'On all fours, arch and round back' },
    { name: "Child's Pose", duration: 40, desc: 'Sit on heels, arms forward, relax' },
    { name: 'Lying Twist', duration: 40, desc: 'On back, knees to side, 20s per side' },
    { name: 'Hip Stretch', duration: 60, desc: 'Half pigeon, 30s per leg' },
  ],
  ru: [
    { name: 'Растяжка квадрицепса', duration: 30, desc: 'Стоя, подтяни пятку к ягодице, 15 сек на ногу' },
    { name: 'Наклон к ногам', duration: 30, desc: 'Ноги прямые, тянись к носкам' },
    { name: 'Растяжка грудных', duration: 30, desc: 'Рука на стене, разверни корпус' },
    { name: 'Кошка-корова', duration: 40, desc: 'На четвереньках, прогибай и округляй спину' },
    { name: 'Поза ребёнка', duration: 40, desc: 'Сядь на пятки, руки вперёд, расслабься' },
    { name: 'Лежачий твист', duration: 40, desc: 'На спине, колени в сторону, 20 сек на сторону' },
    { name: 'Растяжка бёдер', duration: 60, desc: 'Полуголубь, 30 сек на ногу' },
  ],
};

const DEMO_WORKOUT: Workout = {
  name: 'Full Feature Demo',
  rounds: 2,
  restEx: 15,
  restRound: 60,
  cooldown: true,
  lang: 'en',
  tracker: 'whoop',
  exercises: [
    {
      name: 'Goblet Squats',
      reps: 'x12',
      duration: 45,
      weight: '16kg',
      equipment: 'dumbbell',
      video: 'https://www.youtube.com/results?search_query=goblet+squat+form'
    },
    {
      name: 'Push-ups',
      reps: 'x10',
      duration: 40,
      equipment: 'bodyweight',
      video: 'https://www.youtube.com/results?search_query=push+up+proper+form'
    },
    {
      name: 'Dumbbell Rows',
      reps: 'x10 each',
      duration: 50,
      weight: '12kg',
      equipment: 'dumbbell + bench',
      video: 'https://www.youtube.com/results?search_query=dumbbell+row+form'
    },
    {
      name: 'Plank',
      reps: '30 sec',
      duration: 30,
      equipment: 'mat',
      video: 'https://www.youtube.com/results?search_query=plank+proper+form'
    },
  ]
};

export default function WorkoutTimer() {
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [phase, setPhase] = useState<string>('loading');
  const [currentRound, setCurrentRound] = useState(1);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [cooldownIndex, setCooldownIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showTrackerPopup, setShowTrackerPopup] = useState(false);

  const lang: Lang = workout?.lang || 'en';
  const t = translations[lang];
  const cooldownStretches = COOLDOWN[lang];

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const encoded = params.get('w');
      if (encoded) {
        const standardBase64 = encoded
          .replace(/-/g, '+')
          .replace(/_/g, '/')
          .replace(/ /g, '+');
        const binaryString = atob(standardBase64);
        const bytes = Uint8Array.from(binaryString, (c) => c.charCodeAt(0));
        const jsonString = new TextDecoder().decode(bytes);
        const parsed = JSON.parse(jsonString) as Workout;
        setWorkout(parsed);
        setPhase('ready');
      } else {
        setPhase('demo');
      }
    } catch (e) {
      console.error('Failed to parse workout:', e);
      setPhase('demo');
    }
  }, []);

  const exercises = workout?.exercises || [];
  const currentExercise = exercises[exerciseIndex];
  const currentStretch = cooldownStretches[cooldownIndex];

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  const totalDuration = useMemo(() => {
    if (!workout) return 0;
    const exTime = exercises.reduce((sum, e) => sum + e.duration, 0);
    const restTime = (exercises.length - 1) * workout.restEx;
    const roundTime = exTime + restTime;
    const total = (roundTime * workout.rounds) + ((workout.rounds - 1) * workout.restRound);
    const cooldownTime = workout.cooldown ? cooldownStretches.reduce((sum: number, s) => sum + s.duration, 0) : 0;
    return Math.round((total + cooldownTime) / 60);
  }, [workout, exercises, cooldownStretches]);

  const playBeep = useCallback(() => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 800;
      osc.type = 'sine';
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.3);
    } catch (e) {}
  }, []);

  const moveToNext = useCallback(() => {
    if (!workout) return;

    if (phase === 'exercise') {
      if (exerciseIndex < exercises.length - 1) {
        setPhase('rest');
        setTimeLeft(workout.restEx);
      } else if (currentRound < workout.rounds) {
        setPhase('roundRest');
        setTimeLeft(workout.restRound);
      } else if (workout.cooldown) {
        setPhase('cooldown');
        setCooldownIndex(0);
        setTimeLeft(cooldownStretches[0].duration);
      } else {
        setPhase('complete');
        setIsRunning(false);
      }
    } else if (phase === 'rest') {
      setExerciseIndex(i => i + 1);
      setPhase('exercise');
      setTimeLeft(exercises[exerciseIndex + 1].duration);
    } else if (phase === 'roundRest') {
      setCurrentRound(r => r + 1);
      setExerciseIndex(0);
      setPhase('exercise');
      setTimeLeft(exercises[0].duration);
    } else if (phase === 'cooldown') {
      if (cooldownIndex < cooldownStretches.length - 1) {
        setCooldownIndex(i => i + 1);
        setTimeLeft(cooldownStretches[cooldownIndex + 1].duration);
      } else {
        setPhase('complete');
        setIsRunning(false);
      }
    }
  }, [phase, exerciseIndex, currentRound, cooldownIndex, exercises, workout, cooldownStretches]);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 4 && t > 1) playBeep();
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, playBeep]);

  useEffect(() => {
    if (isRunning && timeLeft === 0 && phase !== 'demo' && phase !== 'ready' && phase !== 'complete') {
      playBeep();
      moveToNext();
    }
  }, [isRunning, timeLeft, phase, moveToNext, playBeep]);

  const handleStartClick = () => {
    if (workout?.tracker && workout.tracker !== 'none') {
      setShowTrackerPopup(true);
    } else {
      startWorkout();
    }
  };

  const startWorkout = () => {
    setShowTrackerPopup(false);
    setPhase('exercise');
    setTimeLeft(exercises[0].duration);
    setIsRunning(true);
  };

  const getTrackerMessage = () => {
    if (!workout?.tracker) return '';
    switch (workout.tracker) {
      case 'whoop': return t.trackerWhoop;
      case 'apple': return t.trackerApple;
      case 'garmin': return t.trackerGarmin;
      default: return '';
    }
  };

  const reset = () => {
    setPhase('ready');
    setCurrentRound(1);
    setExerciseIndex(0);
    setCooldownIndex(0);
    setTimeLeft(0);
    setIsRunning(false);
    setShowTrackerPopup(false);
  };

  const loadDemo = () => {
    setWorkout(DEMO_WORKOUT);
    setPhase('ready');
  };

  const bgColor = {
    demo: 'bg-slate-800',
    ready: 'bg-slate-800',
    exercise: 'bg-emerald-600',
    rest: 'bg-amber-500',
    roundRest: 'bg-blue-600',
    cooldown: 'bg-indigo-500',
    complete: 'bg-purple-600',
  }[phase];

  const phaseLabel = {
    exercise: t.work,
    rest: t.rest,
    roundRest: t.roundRest,
    cooldown: t.cooldown,
    complete: t.complete,
  }[phase] || '';

  if (phase === 'loading') {
    return (
      <div className="min-h-dvh bg-slate-800 flex flex-col items-center justify-center p-6 safe-area-inset text-white">
        <div className="text-6xl mb-6 animate-pulse">⏱️</div>
        <p className="text-slate-400">{t.loading}</p>
      </div>
    );
  }

  if (phase === 'demo') {
    return (
      <div className="min-h-dvh bg-slate-800 flex flex-col items-center justify-center p-6 safe-area-inset text-white">
        <div className="text-6xl mb-6">⏱️</div>
        <h1 className="text-3xl font-bold mb-2 text-center">Workout Timer</h1>
        <p className="text-slate-400 text-center mb-8 max-w-md">
          This timer loads workouts from URL parameters. Ask your AI to generate a workout link!
        </p>

        <div className="bg-slate-700 rounded-xl p-4 mb-6 max-w-md w-full">
          <p className="text-sm text-slate-300 mb-2">Example prompt for your AI:</p>
          <p className="text-sm italic text-slate-400">
            &quot;Create a 20-minute upper body workout with dumbbells and give me a timer link&quot;
          </p>
        </div>

        <button
          onClick={loadDemo}
          className="bg-emerald-500 hover:bg-emerald-400 font-bold py-4 px-8 rounded-xl text-lg transition-all"
        >
          Try Full Feature Demo
        </button>

        <p className="mt-3 text-xs text-slate-500">
          Includes: tracker popup, equipment preview, video links
        </p>

        <div className="mt-8 text-slate-500 text-sm">
          <p>URL format: <code className="bg-slate-700 px-2 py-1 rounded">?w=BASE64_JSON</code></p>
        </div>
      </div>
    );
  }

  if (phase === 'ready' && workout) {
    return (
      <div className="min-h-dvh bg-slate-800 flex flex-col items-center justify-center p-6 safe-area-inset text-white relative">
        {showTrackerPopup && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-700 rounded-2xl p-6 max-w-sm w-full">
              <div className="text-4xl text-center mb-4">⌚</div>
              <h2 className="text-xl font-bold text-center mb-2">{t.trackerTitle}</h2>
              <p className="text-center text-slate-300 mb-6">{getTrackerMessage()}</p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={startWorkout}
                  className="bg-emerald-500 hover:bg-emerald-400 font-bold py-4 rounded-xl text-lg transition-all"
                >
                  {t.trackerReady}
                </button>
                <button
                  onClick={() => setShowTrackerPopup(false)}
                  className="bg-slate-600 hover:bg-slate-500 font-bold py-3 rounded-xl transition-all"
                >
                  ← {t.reset}
                </button>
              </div>
            </div>
          </div>
        )}

        <h1 className="text-2xl font-bold mb-2">{workout.name}</h1>
        <p className="text-slate-400 mb-4">
          {workout.rounds} {t.rounds} • ~{totalDuration} {t.min}
          {workout.cooldown && ` • + ${t.cooldown.toLowerCase()}`}
        </p>

        <div className="bg-slate-700 rounded-xl p-4 mb-6 w-full max-w-md">
          {exercises.map((ex, i) => (
            <div key={i} className="flex justify-between py-2 border-b border-slate-600 last:border-0 text-sm">
              <span>{ex.name}</span>
              <span className="text-slate-400">
                {ex.weight && ex.weight !== '—' && `${ex.weight} • `}{ex.reps}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={handleStartClick}
          className="bg-emerald-500 hover:bg-emerald-400 font-bold py-5 px-14 rounded-2xl text-xl transition-all transform hover:scale-105 active:scale-95"
        >
          {t.start}
        </button>
      </div>
    );
  }

  if (phase === 'complete' && workout) {
    return (
      <div className={`min-h-dvh ${bgColor} flex flex-col items-center justify-center p-6 safe-area-inset text-white`}>
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-4xl font-bold mb-4">{t.greatWork}</h1>
        <p className="text-xl mb-8 opacity-90">{workout.name} {t.workoutComplete}</p>

        <div className="flex flex-col gap-3">
          <button onClick={reset} className="bg-white/20 hover:bg-white/30 font-bold py-4 px-8 rounded-xl transition-all">
            {t.startAgain}
          </button>
          <button
            onClick={() => { setWorkout(null); setPhase('demo'); }}
            className="bg-black/20 hover:bg-black/30 font-bold py-3 px-8 rounded-xl transition-all"
          >
            {t.newWorkout}
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'cooldown') {
    return (
      <div className={`min-h-dvh ${bgColor} flex flex-col text-white transition-colors duration-500`}>
        <div className="flex justify-between items-center p-4 safe-top bg-black/20">
          <span className="text-lg font-semibold">{phaseLabel}</span>
          <div className="flex gap-1.5">
            {cooldownStretches.map((_, i) => (
              <div key={i} className={`w-3 h-3 rounded-full ${i < cooldownIndex ? 'bg-white/40' : i === cooldownIndex ? 'bg-white' : 'bg-black/20'}`} />
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <h1 className="text-4xl font-bold mb-4 text-center">{currentStretch.name}</h1>
          <p className="text-xl opacity-80 mb-8 text-center max-w-md">{currentStretch.desc}</p>
          <div className="text-8xl font-mono font-bold">{formatTime(timeLeft)}</div>
        </div>

        <div className="p-6 safe-bottom flex flex-col items-center gap-4">
          <div className="flex gap-4">
            <button onClick={() => setIsRunning(!isRunning)} className="bg-white/20 hover:bg-white/30 font-bold py-4 px-8 rounded-xl text-xl transition-all">
              {isRunning ? t.pause : t.resume}
            </button>
            <button onClick={moveToNext} className="bg-black/20 hover:bg-black/30 font-bold py-4 px-8 rounded-xl text-xl transition-all">
              {t.skip}
            </button>
          </div>
          <button onClick={reset} className="opacity-40 hover:opacity-100 transition-opacity text-sm">{t.reset}</button>
        </div>
      </div>
    );
  }

  if (!workout) return null;

  return (
    <div className={`min-h-dvh ${bgColor} flex flex-col text-white transition-colors duration-500`}>
      <div className="flex justify-between items-center p-4 safe-top bg-black/20">
        <span className="text-lg font-semibold">{phaseLabel}</span>
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            {Array.from({ length: workout.rounds }, (_, i) => (
              <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                ${i + 1 < currentRound ? 'bg-white/40' : i + 1 === currentRound ? 'bg-white text-emerald-700' : 'bg-black/20'}`}>
                {i + 1 < currentRound ? '✓' : i + 1}
              </div>
            ))}
          </div>
          <div className="w-px h-6 bg-white/30" />
          <div className="flex gap-1.5">
            {exercises.map((_, i) => (
              <div key={i} className={`w-3 h-3 rounded-full ${i < exerciseIndex ? 'bg-white/40' : i === exerciseIndex ? 'bg-white' : 'bg-black/20'}`} />
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        {phase === 'exercise' && (
          <>
            <h1 className="text-5xl font-bold mb-6 text-center">{currentExercise.name}</h1>
            <div className="flex gap-4 justify-center text-2xl mb-4">
              {currentExercise.weight && currentExercise.weight !== '—' && (
                <span className="bg-black/20 px-5 py-3 rounded-xl font-semibold">{currentExercise.weight}</span>
              )}
              <span className="bg-black/20 px-5 py-3 rounded-xl font-semibold">{currentExercise.reps}</span>
            </div>
            {currentExercise.video && (
              <a href={currentExercise.video} target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 underline transition-opacity mb-4">
                {t.video}
              </a>
            )}
          </>
        )}

        {phase === 'rest' && (
          <div className="text-center">
            <p className="text-xl mb-2 opacity-70">{t.next}</p>
            <h1 className="text-5xl font-bold mb-4">{exercises[exerciseIndex + 1]?.name}</h1>
            <div className="flex flex-col gap-2 items-center">
              {exercises[exerciseIndex + 1]?.weight && exercises[exerciseIndex + 1]?.weight !== '—' && (
                <div className="bg-black/20 px-6 py-3 rounded-xl inline-block">
                  <span className="text-xl">🏋️ {exercises[exerciseIndex + 1].weight}</span>
                </div>
              )}
              {exercises[exerciseIndex + 1]?.equipment && (
                <div className="bg-black/20 px-6 py-3 rounded-xl inline-block">
                  <span className="text-xl">🎒 {exercises[exerciseIndex + 1].equipment}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {phase === 'roundRest' && (
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-2">{t.roundComplete} {currentRound} ✓</h1>
            <p className="text-2xl opacity-80 mb-4">{t.prepareRound} {currentRound + 1}</p>
            {exercises[0]?.equipment && (
              <div className="bg-black/20 px-6 py-3 rounded-xl inline-block">
                <span className="text-xl">🎒 {exercises[0].equipment}</span>
              </div>
            )}
          </div>
        )}

        <div className="text-8xl font-mono font-bold my-8">{formatTime(timeLeft)}</div>
      </div>

      <div className="p-6 safe-bottom flex flex-col items-center gap-4">
        <div className="flex gap-4">
          <button onClick={() => setIsRunning(!isRunning)} className="bg-white/20 hover:bg-white/30 font-bold py-4 px-8 rounded-xl text-xl transition-all">
            {isRunning ? t.pause : t.resume}
          </button>
          <button onClick={moveToNext} className="bg-black/20 hover:bg-black/30 font-bold py-4 px-8 rounded-xl text-xl transition-all">
            {t.skip}
          </button>
        </div>
        <button onClick={reset} className="opacity-40 hover:opacity-100 transition-opacity text-sm">{t.reset}</button>
      </div>
    </div>
  );
}
