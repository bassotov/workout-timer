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

Next.js 16 (App Router), React 19, Tailwind CSS 4.

### Route Structure

- `/` - Landing page with onboarding poll, Polar payment integration, SKILL.md generator
- `/timer` - Workout timer (reads workout JSON from `?w=` base64 URL parameter)

### Key Files

```
src/app/
├── page.tsx           # Landing page + poll + payment flow
├── timer/page.tsx     # Timer component (main product)
├── layout.tsx         # Root layout with viewport settings
└── globals.css        # Safe area utilities, theme variables

docs/
├── product-plan.md    # Full product strategy and roadmap
└── SKILL.md           # Base template for AI instructions
```

### Timer Features

- Multi-language support (EN/RU translations)
- Tracker popup (WHOOP, Apple Watch, Garmin) - shows before workout starts
- Equipment preview during rest phases
- Video links for exercises
- Safe area handling for mobile browsers (notches, browser chrome)
- Audio cues with speech synthesis

### Workout JSON Schema

```typescript
interface Workout {
  name: string;
  rounds: number;
  restEx: number;        // Rest between exercises (seconds)
  restRound: number;     // Rest between rounds (seconds)
  cooldown: boolean;
  lang?: 'en' | 'ru';    // UI language
  tracker?: 'whoop' | 'apple' | 'garmin' | 'none';
  exercises: Exercise[];
}

interface Exercise {
  name: string;
  reps: string;          // e.g., "x10" or "30 sec"
  duration: number;      // Timer duration in seconds
  weight?: string;       // e.g., "12kg"
  equipment?: string;    // What's needed
  video?: string;        // YouTube link
}
```

### URL Format

Timer URL: `/timer?w={base64_encoded_workout_json}`

The base64 uses URL-safe encoding (+ → -, / → _, padding removed).

### Landing Page Flow

1. Hero section with value proposition
2. Multi-step poll (language, AI platform, training type, equipment, goals, limitations, tracker, name)
3. Polar checkout redirect
4. Success page with SKILL.md download

### Configuration Constants (in page.tsx)

```typescript
const POLAR_CHECKOUT_URL = 'https://polar.sh/checkout?productId=YOUR_PRODUCT_ID';
const TIMER_BASE_URL = 'https://YOUR_DOMAIN/timer';
```

**TODO:** Update these with actual Polar product ID and production domain.

## Mobile Considerations

- Uses `min-h-dvh` for dynamic viewport height (handles mobile browser chrome)
- Safe area utilities in globals.css for notches and home indicators
- `viewportFit: "cover"` in layout.tsx

## Key Patterns

**State machine for timer phases:**
- `idle` → `tracker` → `countdown` → `work` → `rest` → `roundRest` → `cooldown` → `complete`

**Poll state management:**
- Uses React useState with step-by-step progression
- Answers stored in object, used to generate personalized SKILL.md

**SKILL.md generation:**
- Client-side template injection based on poll answers
- Downloads as markdown file after payment success
