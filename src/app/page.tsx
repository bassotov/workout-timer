'use client';

import { useState, useEffect } from 'react';

// Polar product ID from env
const POLAR_PRODUCT_ID = process.env.NEXT_PUBLIC_POLAR_PRODUCT_ID;

// Timer URL - update this when you have a custom domain
const TIMER_BASE_URL = 'https://workout-timer.app/timer';

type Step = 'landing' | 'poll' | 'payment' | 'success';
type Lang = 'en' | 'ru';
type Platform = 'chatgpt' | 'claude' | 'gemini' | 'other';
type TrainingType = 'strength' | 'hiit' | 'yoga' | 'mixed';
type Equipment = 'bodyweight' | 'home' | 'fullgym' | 'custom';
type Goal = 'muscle' | 'weight' | 'endurance' | 'general';
type Tracker = 'whoop' | 'apple' | 'garmin' | 'other' | 'none';

interface PollAnswers {
  language: Lang;
  platform: Platform;
  trainingType: TrainingType;
  equipment: Equipment;
  customEquipment: string;
  goals: Goal;
  limitations: string;
  tracker: Tracker;
  name: string;
  email: string;
}

const defaultAnswers: PollAnswers = {
  language: 'en',
  platform: 'chatgpt',
  trainingType: 'strength',
  equipment: 'home',
  customEquipment: '',
  goals: 'general',
  limitations: '',
  tracker: 'none',
  name: '',
  email: '',
};

export default function LandingPage() {
  const [step, setStep] = useState<Step>('landing');
  const [pollStep, setPollStep] = useState(0);
  const [answers, setAnswers] = useState<PollAnswers>(defaultAnswers);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');

    if (success === 'true') {
      const savedAnswers = localStorage.getItem('workout-poll-answers');
      if (savedAnswers) {
        try {
          setAnswers(JSON.parse(savedAnswers));
          setStep('success');
        } catch {
          setStep('landing');
        }
      } else {
        setStep('landing');
      }
    }
    setIsLoading(false);
  }, []);

  const saveAnswers = (newAnswers: PollAnswers) => {
    setAnswers(newAnswers);
    localStorage.setItem('workout-poll-answers', JSON.stringify(newAnswers));
  };

  const handlePayment = () => {
    localStorage.setItem('workout-poll-answers', JSON.stringify(answers));
    const checkoutUrl = `/api/checkout?products=${POLAR_PRODUCT_ID}&customerEmail=${encodeURIComponent(answers.email)}`;
    window.location.href = checkoutUrl;
  };

  const updateAnswer = <K extends keyof PollAnswers>(key: K, value: PollAnswers[K]) => {
    const newAnswers = { ...answers, [key]: value };
    saveAnswers(newAnswers);
  };

  if (isLoading) {
    return (
      <div className="min-h-dvh bg-slate-900 text-white flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading...</div>
      </div>
    );
  }

  const pollSteps = [
    {
      title: 'What language do you prefer?',
      titleRu: 'Какой язык предпочитаете?',
      options: [
        { value: 'en', label: 'English', labelRu: 'English' },
        { value: 'ru', label: 'Русский', labelRu: 'Русский' },
      ],
      field: 'language' as const,
    },
    {
      title: 'Which AI assistant do you use?',
      titleRu: 'Какой AI-ассистент используете?',
      options: [
        { value: 'chatgpt', label: 'ChatGPT', labelRu: 'ChatGPT' },
        { value: 'claude', label: 'Claude', labelRu: 'Claude' },
        { value: 'gemini', label: 'Gemini', labelRu: 'Gemini' },
        { value: 'other', label: 'Other / Multiple', labelRu: 'Другой / Несколько' },
      ],
      field: 'platform' as const,
    },
    {
      title: 'What type of training do you prefer?',
      titleRu: 'Какой тип тренировок предпочитаете?',
      options: [
        { value: 'strength', label: 'Strength / Weights', labelRu: 'Силовые / С весами' },
        { value: 'hiit', label: 'HIIT / Cardio', labelRu: 'HIIT / Кардио' },
        { value: 'yoga', label: 'Yoga / Mobility', labelRu: 'Йога / Мобильность' },
        { value: 'mixed', label: 'Mixed / Variety', labelRu: 'Разное / Микс' },
      ],
      field: 'trainingType' as const,
    },
    {
      title: 'What equipment do you have?',
      titleRu: 'Какое оборудование есть?',
      options: [
        { value: 'bodyweight', label: 'None (bodyweight only)', labelRu: 'Нет (только свой вес)' },
        { value: 'home', label: 'Home gym (dumbbells, bands)', labelRu: 'Дом (гантели, резинки)' },
        { value: 'fullgym', label: 'Full gym access', labelRu: 'Полный зал' },
        { value: 'custom', label: 'Let me specify...', labelRu: 'Укажу сам...' },
      ],
      field: 'equipment' as const,
    },
    {
      title: 'What is your main goal?',
      titleRu: 'Какая главная цель?',
      options: [
        { value: 'muscle', label: 'Build muscle', labelRu: 'Нарастить мышцы' },
        { value: 'weight', label: 'Lose weight', labelRu: 'Похудеть' },
        { value: 'endurance', label: 'Improve endurance', labelRu: 'Улучшить выносливость' },
        { value: 'general', label: 'General fitness', labelRu: 'Общая форма' },
      ],
      field: 'goals' as const,
    },
    {
      title: 'Do you use a fitness tracker?',
      titleRu: 'Используете фитнес-трекер?',
      options: [
        { value: 'whoop', label: 'WHOOP', labelRu: 'WHOOP' },
        { value: 'apple', label: 'Apple Watch', labelRu: 'Apple Watch' },
        { value: 'garmin', label: 'Garmin', labelRu: 'Garmin' },
        { value: 'other', label: 'Other', labelRu: 'Другой' },
        { value: 'none', label: 'No tracker', labelRu: 'Нет трекера' },
      ],
      field: 'tracker' as const,
    },
  ];

  const currentPollStep = pollSteps[pollStep];
  const isRu = answers.language === 'ru';
  const totalSteps = pollSteps.length + 1;

  // LANDING PAGE
  if (step === 'landing') {
    return (
      <div className="min-h-dvh bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <div className="text-6xl mb-6">🏋️</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Your AI-Powered Personal Trainer
          </h1>
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Custom workouts in one click. Works with ChatGPT, Claude, Gemini.
            No subscription. No app to install.
          </p>

          <button
            onClick={() => setStep('poll')}
            className="bg-emerald-500 hover:bg-emerald-400 font-bold py-4 px-10 rounded-xl text-xl transition-all transform hover:scale-105"
          >
            Get Started — $10
          </button>

          <p className="mt-4 text-slate-500 text-sm">One-time purchase • Instant delivery</p>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-center mb-8">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-800 rounded-xl p-6 text-center">
              <div className="text-3xl mb-3">📝</div>
              <h3 className="font-bold mb-2">1. Answer Questions</h3>
              <p className="text-slate-400 text-sm">Tell us about your equipment, goals, and preferences</p>
            </div>
            <div className="bg-slate-800 rounded-xl p-6 text-center">
              <div className="text-3xl mb-3">🤖</div>
              <h3 className="font-bold mb-2">2. Get Your Setup</h3>
              <p className="text-slate-400 text-sm">Receive personalized instructions for your AI assistant</p>
            </div>
            <div className="bg-slate-800 rounded-xl p-6 text-center">
              <div className="text-3xl mb-3">💪</div>
              <h3 className="font-bold mb-2">3. Train Forever</h3>
              <p className="text-slate-400 text-sm">Ask your AI for custom workouts anytime</p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-center mb-8">Why This Works</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: '🎯', title: 'Knows Your Equipment', desc: 'AI only suggests exercises you can actually do' },
              { icon: '🔄', title: 'Infinitely Flexible', desc: '"Make it harder" / "I hurt my knee" / "Only 10 mins"' },
              { icon: '📱', title: 'No App Required', desc: 'Timer runs in browser, works on any device' },
              { icon: '💰', title: 'Pay Once, Own Forever', desc: 'No subscriptions, no recurring fees' },
            ].map((f, i) => (
              <div key={i} className="bg-slate-800/50 rounded-xl p-4 flex gap-4">
                <div className="text-2xl">{f.icon}</div>
                <div>
                  <h3 className="font-bold">{f.title}</h3>
                  <p className="text-slate-400 text-sm">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-12 text-center">
          <button
            onClick={() => setStep('poll')}
            className="bg-emerald-500 hover:bg-emerald-400 font-bold py-4 px-10 rounded-xl text-xl transition-all transform hover:scale-105"
          >
            Get Started — $10
          </button>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-8 text-center text-slate-500 text-sm">
          <p>Questions? <a href="mailto:pasha@barbash.in" className="underline">pasha@barbash.in</a></p>
          <p className="mt-2">
            <a href="/terms" className="underline hover:text-slate-400">Terms of Service</a>
            {' · '}
            <a href="/privacy" className="underline hover:text-slate-400">Privacy Policy</a>
          </p>
        </div>
      </div>
    );
  }

  // POLL
  if (step === 'poll') {
    if (pollStep === pollSteps.length) {
      return (
        <div className="min-h-dvh bg-slate-900 text-white flex flex-col">
          <div className="p-4">
            <button
              onClick={() => setPollStep(pollStep - 1)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              ← {isRu ? 'Назад' : 'Back'}
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-md">
              <div className="flex gap-1 mb-8">
                {Array.from({ length: totalSteps }, (_, i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full ${i <= pollStep ? 'bg-emerald-500' : 'bg-slate-700'}`}
                  />
                ))}
              </div>

              <h2 className="text-2xl font-bold mb-6 text-center">
                {isRu ? 'Почти готово!' : 'Almost there!'}
              </h2>

              {answers.equipment === 'custom' && (
                <div className="mb-6">
                  <label className="block text-sm text-slate-400 mb-2">
                    {isRu ? 'Ваше оборудование' : 'Your equipment'}
                  </label>
                  <textarea
                    value={answers.customEquipment}
                    onChange={(e) => updateAnswer('customEquipment', e.target.value)}
                    placeholder={isRu ? 'Например: гантели 5-15 кг, турник, коврик...' : 'e.g., dumbbells 5-30 lbs, pull-up bar, mat...'}
                    className="w-full bg-slate-800 rounded-xl p-4 text-white placeholder-slate-500 resize-none"
                    rows={3}
                  />
                </div>
              )}

              <div className="mb-6">
                <label className="block text-sm text-slate-400 mb-2">
                  {isRu ? 'Ограничения (необязательно)' : 'Any limitations? (optional)'}
                </label>
                <textarea
                  value={answers.limitations}
                  onChange={(e) => updateAnswer('limitations', e.target.value)}
                  placeholder={isRu ? 'Травмы, ограничения пространства...' : 'Injuries, space constraints...'}
                  className="w-full bg-slate-800 rounded-xl p-4 text-white placeholder-slate-500 resize-none"
                  rows={2}
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm text-slate-400 mb-2">
                  {isRu ? 'Как вас зовут? (необязательно)' : 'Your name (optional)'}
                </label>
                <input
                  type="text"
                  value={answers.name}
                  onChange={(e) => updateAnswer('name', e.target.value)}
                  placeholder={isRu ? 'Для персонализации' : 'For personalization'}
                  className="w-full bg-slate-800 rounded-xl p-4 text-white placeholder-slate-500"
                />
              </div>

              <div className="mb-8">
                <label className="block text-sm text-slate-400 mb-2">
                  {isRu ? 'Email (для доставки)' : 'Email (for delivery)'}
                </label>
                <input
                  type="email"
                  value={answers.email}
                  onChange={(e) => updateAnswer('email', e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-slate-800 rounded-xl p-4 text-white placeholder-slate-500"
                  required
                />
              </div>

              <button
                onClick={() => setStep('payment')}
                disabled={!answers.email}
                className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-700 disabled:cursor-not-allowed font-bold py-4 rounded-xl text-xl transition-all"
              >
                {isRu ? 'Продолжить к оплате — $10' : 'Continue to Payment — $10'}
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-dvh bg-slate-900 text-white flex flex-col">
        <div className="p-4">
          <button
            onClick={() => pollStep > 0 ? setPollStep(pollStep - 1) : setStep('landing')}
            className="text-slate-400 hover:text-white transition-colors"
          >
            ← {isRu ? 'Назад' : 'Back'}
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="w-full max-w-md">
            <div className="flex gap-1 mb-8">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full ${i <= pollStep ? 'bg-emerald-500' : 'bg-slate-700'}`}
                />
              ))}
            </div>

            <h2 className="text-2xl font-bold mb-6 text-center">
              {isRu ? currentPollStep.titleRu : currentPollStep.title}
            </h2>

            <div className="space-y-3">
              {currentPollStep.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    updateAnswer(currentPollStep.field, option.value as never);
                    setPollStep(pollStep + 1);
                  }}
                  className={`w-full p-4 rounded-xl text-left transition-all ${
                    answers[currentPollStep.field] === option.value
                      ? 'bg-emerald-600 border-2 border-emerald-400'
                      : 'bg-slate-800 hover:bg-slate-700 border-2 border-transparent'
                  }`}
                >
                  {isRu ? option.labelRu : option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // PAYMENT
  if (step === 'payment') {
    return (
      <div className="min-h-dvh bg-slate-900 text-white flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md text-center">
          <div className="text-4xl mb-4">💳</div>
          <h2 className="text-2xl font-bold mb-4">
            {isRu ? 'Оплата' : 'Payment'}
          </h2>

          <div className="bg-slate-800 rounded-xl p-4 mb-6 text-left">
            <h3 className="font-bold mb-3">{isRu ? 'Ваш заказ:' : 'Your order:'}</h3>
            <div className="space-y-2 text-sm text-slate-400">
              <p>• {isRu ? 'Язык:' : 'Language:'} {answers.language === 'en' ? 'English' : 'Русский'}</p>
              <p>• {isRu ? 'Платформа:' : 'Platform:'} {answers.platform}</p>
              <p>• {isRu ? 'Тренировки:' : 'Training:'} {answers.trainingType}</p>
              <p>• {isRu ? 'Оборудование:' : 'Equipment:'} {answers.equipment}</p>
              <p>• {isRu ? 'Цель:' : 'Goal:'} {answers.goals}</p>
              {answers.tracker !== 'none' && <p>• Tracker: {answers.tracker}</p>}
            </div>
            <div className="mt-4 pt-4 border-t border-slate-700 flex justify-between font-bold">
              <span>{isRu ? 'Итого:' : 'Total:'}</span>
              <span>$10</span>
            </div>
          </div>

          <button
            onClick={handlePayment}
            className="w-full bg-emerald-500 hover:bg-emerald-400 font-bold py-4 rounded-xl text-xl transition-all mb-4"
          >
            {isRu ? 'Оплатить $10' : 'Pay $10'}
          </button>

          {process.env.NODE_ENV === 'development' && (
            <button
              onClick={() => setStep('success')}
              className="w-full bg-slate-700 hover:bg-slate-600 text-sm py-2 rounded-xl transition-all mb-4"
            >
              [DEV] Skip to success
            </button>
          )}

          <p className="text-slate-500 text-sm">
            {isRu ? 'Безопасная оплата через Polar' : 'Secure payment via Polar'}
          </p>

          <button
            onClick={() => {
              setPollStep(pollSteps.length);
              setStep('poll');
            }}
            className="mt-4 text-slate-400 hover:text-white transition-colors text-sm"
          >
            ← {isRu ? 'Изменить данные' : 'Edit details'}
          </button>
        </div>
      </div>
    );
  }

  // SUCCESS
  if (step === 'success') {
    const downloadSkillMd = () => {
      const skill = generateSkillMd(answers, TIMER_BASE_URL);
      const blob = new Blob([skill], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'YOUR-WORKOUT-TIMER-SETUP.md';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      localStorage.removeItem('workout-poll-answers');
    };

    return (
      <div className="min-h-dvh bg-slate-900 text-white flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold mb-4">
            {isRu ? 'Готово!' : "You're all set!"}
          </h2>
          <p className="text-slate-400 mb-8">
            {isRu
              ? 'Ваш персональный файл настроек готов к скачиванию.'
              : 'Your personalized setup file is ready to download.'}
          </p>

          <button
            onClick={downloadSkillMd}
            className="w-full bg-emerald-500 hover:bg-emerald-400 font-bold py-4 rounded-xl text-xl transition-all mb-4"
          >
            {isRu ? '📥 Скачать файл' : '📥 Download Setup File'}
          </button>

          <div className="bg-slate-800 rounded-xl p-4 text-left mb-6">
            <h3 className="font-bold mb-3">{isRu ? 'Что дальше:' : 'Next steps:'}</h3>
            <ol className="space-y-2 text-sm text-slate-400 list-decimal list-inside">
              {answers.platform === 'chatgpt' && (
                <>
                  <li>{isRu ? 'Откройте chatgpt.com' : 'Open chatgpt.com'}</li>
                  <li>{isRu ? 'Создайте новый GPT или проект' : 'Create a new GPT or project'}</li>
                  <li>{isRu ? 'Вставьте содержимое файла в инструкции' : 'Paste the file contents into instructions'}</li>
                </>
              )}
              {answers.platform === 'claude' && (
                <>
                  <li>{isRu ? 'Откройте claude.ai' : 'Open claude.ai'}</li>
                  <li>{isRu ? 'Создайте новый проект' : 'Create a new project'}</li>
                  <li>{isRu ? 'Вставьте содержимое в Project Instructions' : 'Paste contents into Project Instructions'}</li>
                </>
              )}
              {answers.platform === 'gemini' && (
                <>
                  <li>{isRu ? 'Откройте Gemini' : 'Open Gemini'}</li>
                  <li>{isRu ? 'Создайте новый Gem' : 'Create a new Gem'}</li>
                  <li>{isRu ? 'Вставьте содержимое в системные инструкции' : 'Paste contents into system instructions'}</li>
                </>
              )}
              {answers.platform === 'other' && (
                <>
                  <li>{isRu ? 'Откройте ваш AI-ассистент' : 'Open your AI assistant'}</li>
                  <li>{isRu ? 'Начните новый чат' : 'Start a new chat'}</li>
                  <li>{isRu ? 'Вставьте содержимое файла как первое сообщение' : 'Paste file contents as your first message'}</li>
                </>
              )}
              <li>{isRu ? 'Попросите создать тренировку!' : 'Ask for a workout!'}</li>
            </ol>
          </div>

          <a
            href="/timer"
            className="text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            {isRu ? '→ Открыть таймер' : '→ Open timer'}
          </a>
        </div>
      </div>
    );
  }

  return null;
}

function generateSkillMd(answers: PollAnswers, timerUrl: string): string {
  const isRu = answers.language === 'ru';

  const equipmentMap: Record<Equipment, { en: string; ru: string }> = {
    bodyweight: { en: 'Bodyweight only (no equipment)', ru: 'Только свой вес (без оборудования)' },
    home: { en: 'Dumbbells, resistance bands, yoga mat', ru: 'Гантели, резинки, коврик' },
    fullgym: { en: 'Full gym access (barbells, machines, cables, dumbbells)', ru: 'Полный зал (штанги, тренажёры, кабели, гантели)' },
    custom: { en: answers.customEquipment || 'Custom equipment', ru: answers.customEquipment || 'Своё оборудование' },
  };

  const goalsMap: Record<Goal, { en: string; ru: string }> = {
    muscle: { en: 'Build muscle and strength', ru: 'Нарастить мышцы и силу' },
    weight: { en: 'Lose weight and get leaner', ru: 'Похудеть и стать стройнее' },
    endurance: { en: 'Improve cardiovascular endurance', ru: 'Улучшить выносливость' },
    general: { en: 'General fitness and health', ru: 'Общая форма и здоровье' },
  };

  const trainingMap: Record<TrainingType, { en: string; ru: string }> = {
    strength: { en: 'Strength training with weights', ru: 'Силовые тренировки с весами' },
    hiit: { en: 'HIIT and cardio workouts', ru: 'HIIT и кардио тренировки' },
    yoga: { en: 'Yoga and mobility work', ru: 'Йога и работа над мобильностью' },
    mixed: { en: 'Mixed variety training', ru: 'Разнообразные тренировки' },
  };

  const trackerInstructions: Record<Tracker, string> = {
    whoop: 'WHOOP',
    apple: 'Apple Watch',
    garmin: 'Garmin',
    other: 'fitness tracker',
    none: '',
  };

  const platformInstructions: Record<Platform, { en: string; ru: string }> = {
    chatgpt: {
      en: `## Setup for ChatGPT
1. Go to chatgpt.com
2. Click your profile → My GPTs → Create a GPT
3. Paste this entire file into the "Instructions" field
4. Name it "My Workout Timer" and save
5. Start chatting with your new GPT!`,
      ru: `## Настройка для ChatGPT
1. Откройте chatgpt.com
2. Нажмите на профиль → My GPTs → Create a GPT
3. Вставьте весь этот файл в поле "Instructions"
4. Назовите "Мой Таймер Тренировок" и сохраните
5. Начните общаться с вашим GPT!`,
    },
    claude: {
      en: `## Setup for Claude
1. Go to claude.ai
2. Click Projects → New Project
3. Paste this entire file into "Project Instructions"
4. Name your project and start chatting!`,
      ru: `## Настройка для Claude
1. Откройте claude.ai
2. Нажмите Projects → New Project
3. Вставьте весь этот файл в "Project Instructions"
4. Назовите проект и начните общаться!`,
    },
    gemini: {
      en: `## Setup for Gemini
1. Open Gemini
2. Create a new Gem
3. Paste this entire file into system instructions
4. Start chatting with your Gem!`,
      ru: `## Настройка для Gemini
1. Откройте Gemini
2. Создайте новый Gem
3. Вставьте весь этот файл в системные инструкции
4. Начните общаться с вашим Gem!`,
    },
    other: {
      en: `## Setup for Any AI
1. Start a new chat with your AI assistant
2. Paste this entire file as your first message
3. The AI will remember these instructions for the conversation
4. Ask for a workout!`,
      ru: `## Настройка для любого AI
1. Начните новый чат с вашим AI-ассистентом
2. Вставьте весь этот файл как первое сообщение
3. AI запомнит эти инструкции на время разговора
4. Попросите тренировку!`,
    },
  };

  const name = answers.name || (isRu ? 'пользователь' : 'User');
  const equipment = equipmentMap[answers.equipment][isRu ? 'ru' : 'en'];
  const goals = goalsMap[answers.goals][isRu ? 'ru' : 'en'];
  const training = trainingMap[answers.trainingType][isRu ? 'ru' : 'en'];
  const platform = platformInstructions[answers.platform][isRu ? 'ru' : 'en'];
  const tracker = answers.tracker !== 'none' ? trackerInstructions[answers.tracker] : null;

  if (isRu) {
    return `# Тренировочный Таймер — Персональные Инструкции

${platform}

---

## Твоя Роль

Ты персональный тренер для ${name}. Ты создаёшь персонализированные тренировки и генерируешь ссылки на таймер.

## Профиль Пользователя

- **Оборудование:** ${equipment}
- **Цель:** ${goals}
- **Стиль тренировок:** ${training}
${answers.limitations ? `- **Ограничения:** ${answers.limitations}` : ''}
${tracker ? `- **Трекер:** ${tracker}` : ''}

## URL Таймера

Базовый URL: ${timerUrl}

## Как Создавать Тренировки

1. Пойми что хочет пользователь (длительность, фокус, интенсивность)
2. Создай тренировку используя ТОЛЬКО доступное оборудование
3. Учитывай цели и ограничения
4. Сгенерируй JSON тренировки
5. Закодируй в base64 и создай кликабельную ссылку

## JSON Схема Тренировки

\`\`\`json
{
  "name": "Название Тренировки",
  "rounds": 3,
  "restEx": 20,
  "restRound": 90,
  "cooldown": true,
  "lang": "ru",
  ${tracker ? `"tracker": "${answers.tracker}",` : ''}
  "exercises": [
    {
      "name": "Название упражнения",
      "weight": "12кг",
      "reps": "x10",
      "duration": 45,
      "video": "https://www.youtube.com/results?search_query=название+упражнения+техника",
      "equipment": "гантели"
    }
  ]
}
\`\`\`

### Поля:
- **name**: Название тренировки
- **rounds**: Количество кругов (1-5)
- **restEx**: Отдых между упражнениями в секундах (10-30)
- **restRound**: Отдых между кругами в секундах (60-120)
- **cooldown**: true = добавить заминку в конце
- **lang**: "ru" для русского интерфейса
${tracker ? `- **tracker**: "${answers.tracker}" для напоминания включить трекер` : ''}
- **exercises**: Массив упражнений
  - **name**: Название упражнения
  - **weight**: Вес (опционально)
  - **reps**: Повторения ("x12") или время ("30 сек")
  - **duration**: Время на упражнение в секундах
  - **video**: Ссылка на YouTube поиск техники
  - **equipment**: Нужное оборудование (опционально)

## Генерация Ссылки

После создания JSON:
1. Преобразуй в base64: \`btoa(unescape(encodeURIComponent(JSON.stringify(workout))))\`
2. Создай URL: \`${timerUrl}?w={base64}\`

## Формат Ответа

1. Покажи план тренировки списком
2. Укажи примерную длительность
3. Дай кликабельную ссылку на таймер
4. Предложи корректировки

## Важные Правила

- Используй ТОЛЬКО упражнения с доступным оборудованием
- Учитывай травмы и ограничения
- По умолчанию используй предпочтительный стиль тренировок
- Всегда давай ссылку на таймер
- Добавляй ссылки на YouTube для техники упражнений
`;
  }

  return `# Workout Timer — Personalized Instructions

${platform}

---

## Your Role

You are a personal workout coach for ${name}. You create personalized workouts and generate timer links.

## User Profile

- **Equipment:** ${equipment}
- **Goal:** ${goals}
- **Training Style:** ${training}
${answers.limitations ? `- **Limitations:** ${answers.limitations}` : ''}
${tracker ? `- **Tracker:** ${tracker}` : ''}

## Timer URL

Base URL: ${timerUrl}

## How to Create Workouts

1. Understand what the user wants (duration, focus, intensity)
2. Design a workout using ONLY their available equipment
3. Consider their goals and any limitations
4. Generate workout JSON
5. Encode as base64 and create a clickable link

## Workout JSON Schema

\`\`\`json
{
  "name": "Workout Name",
  "rounds": 3,
  "restEx": 20,
  "restRound": 90,
  "cooldown": true,
  "lang": "en",
  ${tracker ? `"tracker": "${answers.tracker}",` : ''}
  "exercises": [
    {
      "name": "Exercise Name",
      "weight": "12kg",
      "reps": "x10",
      "duration": 45,
      "video": "https://www.youtube.com/results?search_query=exercise+name+form",
      "equipment": "dumbbells"
    }
  ]
}
\`\`\`

### Fields:
- **name**: Workout title
- **rounds**: Number of rounds (1-5)
- **restEx**: Rest between exercises in seconds (10-30)
- **restRound**: Rest between rounds in seconds (60-120)
- **cooldown**: true = include stretching at end
- **lang**: "en" for English interface
${tracker ? `- **tracker**: "${answers.tracker}" to show reminder to start tracking` : ''}
- **exercises**: Array of exercises
  - **name**: Exercise name
  - **weight**: Weight used (optional)
  - **reps**: Rep count ("x12") or duration ("30 sec")
  - **duration**: Time in seconds for this exercise
  - **video**: YouTube search link for form reference
  - **equipment**: Equipment needed (optional)

## Generating the Link

After creating the workout JSON:
1. Convert to base64: \`btoa(unescape(encodeURIComponent(JSON.stringify(workout))))\`
2. Create URL: \`${timerUrl}?w={base64}\`

## Response Format

1. Show the workout plan in a readable list
2. Mention estimated duration
3. Provide the timer link prominently
4. Offer to adjust if needed

## Important Rules

- ONLY use exercises possible with user's equipment
- Respect any injuries or limitations
- Default to user's preferred training style
- Always provide the timer link
- Include YouTube search links for exercise form videos
`;
}
