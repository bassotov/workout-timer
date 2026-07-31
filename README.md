# Workout Timer

AI-powered workout timer. Users purchase personalized AI instructions (SKILL.md) that teach their AI assistant (ChatGPT, Claude, Gemini) to generate custom workout timer links.

## Quick Start

```bash
npm install
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run lint     # ESLint
```

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- shadcn/ui components
- TypeScript

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Landing page (~110 lines)
│   ├── timer/page.tsx      # Timer page (~135 lines)
│   ├── api/checkout/       # Polar checkout API
│   └── globals.css         # Global styles
├── components/
│   ├── landing/            # Landing page components
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── WhyItWorks.tsx
│   │   ├── PollStep.tsx
│   │   ├── PaymentSummary.tsx
│   │   └── SuccessContent.tsx
│   ├── timer/              # Timer components
│   │   ├── TimerDisplay.tsx
│   │   ├── ControlButtons.tsx
│   │   ├── RoundProgress.tsx
│   │   └── ...
│   └── ui/                 # shadcn/ui + custom components
├── hooks/                  # Custom React hooks
│   ├── usePoll.ts          # Poll state management
│   └── useTimer.ts         # Timer state machine (useReducer)
├── config/                 # Configuration
│   ├── constants.ts        # Environment vars, app constants
│   ├── poll-steps.ts       # Poll structure
│   └── phase-colors.ts     # Timer phase colors
├── i18n/                   # Internationalization
│   ├── en.ts               # English translations
│   └── ru.ts               # Russian translations
├── lib/                    # Utilities
│   ├── validation.ts       # Email, workout validation
│   ├── url.ts              # Base64 URL encoding
│   ├── time.ts             # Time formatting
│   └── storage.ts          # localStorage wrapper
└── types/                  # TypeScript types
    ├── workout.ts
    ├── poll.ts
    └── timer.ts
```

## Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_POLAR_PRODUCT_ID=your-polar-product-id
NEXT_PUBLIC_TIMER_BASE_URL=https://your-domain.com/timer
POLAR_ACCESS_TOKEN=your-polar-access-token
POLAR_SUCCESS_URL=https://your-domain.com/success?checkout_id={CHECKOUT_ID}

# Signs the purchase cookie that gates /api/instructions.
# Generate with: openssl rand -base64 32
PURCHASE_COOKIE_SECRET=
```

## Routes

- `/` - Landing page with poll, payment flow
- `/timer?w={base64}` - Workout timer (reads workout JSON from URL)
- `/success` - Post-purchase success page
- `/privacy` - Privacy policy
- `/terms` - Terms of service

## Workout URL Format

Timer URL: `/timer?w={base64_encoded_workout_json}`

Base64 uses URL-safe encoding (+ → -, / → _, padding removed).

```typescript
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

## License

MIT
