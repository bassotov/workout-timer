# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Commands

```bash
npm run dev      # Start development server at localhost:3000
npm run build    # Production build
npm run lint     # ESLint
```

## Project Overview

**Workout Timer** - An AI-powered workout timer product. Users purchase personalized AI instructions (SKILL.md) that teach their AI assistant (ChatGPT, Claude, Gemini) to generate custom workout timer links.

**Business model:** $10 one-time purchase via Polar. User gets customized SKILL.md based on their equipment, goals, and preferences.

## Architecture

Next.js 16 (App Router), React 19, Tailwind CSS 4, shadcn/ui.

### Directory Structure

```
src/
├── app/                    # Pages (kept minimal, ~100-135 lines each)
│   ├── page.tsx            # Landing page orchestration
│   ├── timer/page.tsx      # Timer orchestration
│   ├── api/checkout/       # Polar checkout API (POST for email, GET for redirect)
│   ├── success/page.tsx    # Success redirect
│   ├── privacy/page.tsx    # Privacy policy
│   ├── terms/page.tsx      # Terms of service
│   └── globals.css         # Global styles, safe area utilities
├── components/
│   ├── landing/            # Landing page components
│   │   ├── Hero.tsx        # Hero section with CTA
│   │   ├── Features.tsx    # How it works section
│   │   ├── WhyItWorks.tsx  # Benefits section
│   │   ├── PollStep.tsx    # Single poll question
│   │   ├── PollProgress.tsx# Progress bar
│   │   ├── PaymentSummary.tsx # Payment confirmation
│   │   ├── SuccessContent.tsx # Success with SKILL.md download
│   │   └── EmailInput.tsx  # Email input with validation
│   ├── timer/              # Timer components
│   │   ├── TimerDisplay.tsx    # MM:SS display
│   │   ├── PhaseIndicator.tsx  # Current phase badge
│   │   ├── ExerciseInfo.tsx    # Exercise name, reps, equipment
│   │   ├── ControlButtons.tsx  # Play/Pause/Skip
│   │   ├── RoundProgress.tsx   # Round indicators
│   │   ├── ExerciseProgress.tsx# Exercise dots
│   │   ├── TrackerPopup.tsx    # Tracker selection dialog
│   │   ├── CompletionScreen.tsx# Workout complete
│   │   ├── ReadyScreen.tsx     # Pre-workout screen
│   │   └── DemoScreen.tsx      # No workout/demo mode
│   └── ui/                 # shadcn/ui + custom components
│       ├── button.tsx, card.tsx, input.tsx, etc. (shadcn)
│       ├── progress-dots.tsx   # Custom progress indicator
│       └── back-button.tsx     # Navigation back button
├── hooks/
│   ├── usePoll.ts          # Poll state (page, step, answers)
│   └── useTimer.ts         # Timer state machine (useReducer)
├── config/
│   ├── constants.ts        # POLAR_PRODUCT_ID, TIMER_BASE_URL, audio constants
│   ├── poll-steps.ts       # Poll structure (6 steps)
│   ├── phase-colors.ts     # Timer phase → Tailwind color
│   ├── cooldown.ts         # Cooldown stretches (EN/RU)
│   └── demo-workout.ts     # Demo workout data
├── i18n/
│   ├── en.ts               # English translations
│   ├── ru.ts               # Russian translations
│   └── index.ts            # useTranslations hook
├── lib/
│   ├── utils.ts            # cn() class utility
│   ├── validation.ts       # isValidEmail, isValidWorkout
│   ├── url.ts              # encodeWorkoutUrl, decodeWorkoutUrl
│   ├── time.ts             # formatTime, calculateTotalDuration
│   ├── storage.ts          # Typed localStorage wrapper
│   └── skill-generator.ts  # generateSkillMd function
└── types/
    ├── workout.ts          # Workout, Exercise interfaces
    ├── poll.ts             # PollAnswers, PollStep types
    ├── timer.ts            # TimerPhase, TimerState, TimerAction
    └── index.ts            # Re-exports
```

### Route Structure

- `/` - Landing page with onboarding poll, Polar payment integration
- `/timer` - Workout timer (reads workout JSON from `?w=` base64 URL parameter)
- `/success` - Post-purchase redirect
- `/privacy`, `/terms` - Legal pages

### Timer Features

- Multi-language support (EN/RU)
- Tracker popup (WHOOP, Apple Watch, Garmin)
- Equipment preview during rest phases
- Video links for exercises
- Safe area handling for mobile browsers
- Audio cues with speech synthesis

### Workout JSON Schema

```typescript
// From src/types/workout.ts
interface Workout {
  name: string;
  rounds: number;
  restEx: number;        // Rest between exercises (seconds)
  restRound: number;     // Rest between rounds (seconds)
  cooldown: boolean;
  lang?: 'en' | 'ru';
  tracker?: 'whoop' | 'apple' | 'garmin' | 'none';
  exercises: Exercise[];
}

interface Exercise {
  name: string;
  reps: string;          // e.g., "x10" or "30 sec"
  duration: number;      // Timer duration in seconds
  weight?: string;
  equipment?: string;
  video?: string;        // YouTube link
}
```

### URL Format

Timer URL: `/timer?w={base64_encoded_workout_json}`

Base64 uses URL-safe encoding (+ → -, / → _, padding removed).

### Environment Variables

```env
# Required
NEXT_PUBLIC_POLAR_PRODUCT_ID=...

# Optional (has defaults)
NEXT_PUBLIC_TIMER_BASE_URL=https://workout-timer.app/timer

# Server-side only (for API routes)
POLAR_ACCESS_TOKEN=...
POLAR_SUCCESS_URL=...
```

## Key Patterns

**Timer state machine (useReducer):**
- Phases: `idle` → `tracker` → `countdown` → `work` → `rest` → `roundRest` → `cooldown` → `complete`
- Actions: START, PAUSE, RESUME, TICK, SKIP, NEXT_PHASE, RESET

**Poll state management (usePoll hook):**
- Pages: landing → poll → payment → success
- Auto-advances on selection, persists to localStorage

**Imports:**
```typescript
import { Workout, Exercise } from '@/types';
import { POLL_STEPS, PHASE_COLORS } from '@/config';
import { useTranslations } from '@/i18n';
import { formatTime, isValidEmail } from '@/lib';
import { Button, Card } from '@/components/ui';
import { Hero, PollStep } from '@/components/landing';
import { TimerDisplay, ControlButtons } from '@/components/timer';
```

## Mobile Considerations

- Uses `min-h-dvh` for dynamic viewport height
- Safe area utilities in globals.css for notches
- `viewportFit: "cover"` in layout.tsx

## Workflow Rules

### Plan Mode Implementation
When exiting plan mode, **always use agents** to implement the plan rather than implementing directly:
- Use the `Task` tool with `subagent_type=general-purpose` to delegate implementation
- Break large plans into smaller agent tasks that can run in parallel
- Only implement directly for trivial single-file changes (typos, small fixes)

This ensures better context management and allows for parallel execution of independent tasks.

## Coding Guidelines

### DRY Principle
- Extract repeated code into reusable components, hooks, or utilities
- If you write similar code twice, refactor it
- Use config files for data that appears in multiple places

### File Size
- **Target: <150 lines per file** - smaller is better
- If a file grows large, split into smaller focused modules
- Page files should orchestrate, not implement (keep ~100 lines)

### Imports
- **Always use barrel exports** - import from index files, not direct paths
```typescript
// Good
import { Button, Card } from '@/components/ui';
import { Workout, Exercise } from '@/types';
import { formatTime, isValidEmail } from '@/lib';

// Bad
import { Button } from '@/components/ui/button';
import { Workout } from '@/types/workout';
```

### Type Safety
- **No `any` type** - use proper types or `unknown` with type guards
- **No `unknown` without validation** - always narrow with type guards
- Define interfaces in `src/types/` and export via barrel
- Use `satisfies` for type checking config objects

```typescript
// Good
function parseData(data: unknown): Workout | null {
  if (isValidWorkout(data)) return data;
  return null;
}

// Bad
function parseData(data: any): Workout {
  return data as Workout;
}
```

### Component Structure
- Props interface above component
- Hooks at top of component
- Handlers after hooks
- Return JSX last
- Extract complex logic to custom hooks

### Naming
- Components: PascalCase (`TimerDisplay.tsx`)
- Hooks: camelCase with `use` prefix (`useTimer.ts`)
- Utilities: camelCase (`formatTime.ts`)
- Types: PascalCase (`TimerState`)
- Constants: SCREAMING_SNAKE_CASE (`PHASE_COLORS`)

### Internationalization
- **All UI text must go in `src/i18n/`** - never hardcode user-facing strings
- Add translations to both `en.ts` and `ru.ts`
- Access via `useLanguage()` hook: `const { t } = useLanguage()`
