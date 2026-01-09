'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const TIMER_BASE_URL = 'https://workout-timer.app/timer';

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

export default function SuccessPage() {
  const [answers, setAnswers] = useState<PollAnswers>(defaultAnswers);
  const [isLoading, setIsLoading] = useState(true);
  const [checkoutId, setCheckoutId] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setCheckoutId(urlParams.get('checkout_id'));

    const savedAnswers = localStorage.getItem('workout-poll-answers');
    if (savedAnswers) {
      try {
        setAnswers(JSON.parse(savedAnswers));
      } catch {
        // Use defaults
      }
    }
    setIsLoading(false);
  }, []);

  const isRu = answers.language === 'ru';

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

  if (isLoading) {
    return (
      <div className="min-h-dvh bg-slate-900 text-white flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading...</div>
      </div>
    );
  }

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

        <Link
          href="/timer"
          className="text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          {isRu ? '→ Открыть таймер' : '→ Open timer'}
        </Link>

        {checkoutId && (
          <p className="mt-6 text-xs text-slate-600">
            Order: {checkoutId}
          </p>
        )}
      </div>
    </div>
  );
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
