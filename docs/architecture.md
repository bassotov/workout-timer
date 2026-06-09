# Architecture

Depth reference for Workout Timer. CLAUDE.md keeps only altitude pointers; this file
and README hold the detail. Discover the live tree with `ls src` rather than trusting a
static listing here.

## What the product is

Users pay $10 once via Polar and receive a personalized `SKILL.md` (the generated AI
instructions) that teaches their AI assistant — ChatGPT, Claude, Gemini, or other — to
design workouts and emit timer links. The same repo also hosts the timer that those
links open.

## Directory map (folder altitude)

- `src/app/` — App Router pages and API routes. Pages orchestrate; logic lives in
  components/hooks/lib. Notable routes below.
- `src/components/` — `landing/`, `timer/`, `ui/` (shadcn + custom). Each has a barrel `index.ts`.
- `src/hooks/` — `usePoll` (poll flow state), `useTimer` (timer `useReducer` state machine).
- `src/config/` — static data + constants (poll steps, phase colors, cooldown, demo workout,
  coaching styles, FAQ, testimonials, AI-instruction templates, `constants.ts`).
- `src/i18n/` — `en.ts` + `ru.ts` translation tables, `LanguageContext.tsx` (`useLanguage`).
- `src/lib/` — pure utilities. The instruction generator is `instruction-generator.ts`
  → `generateInstructions(answers, baseUrl)`.
- `src/types/` — `workout.ts`, `poll.ts`, `timer.ts`, `errors.ts`, barrel `index.ts`.
- `src/templates/` — instruction template assets used by the generator.
- `scripts/test-instructions.ts` — manual generator smoke test (see CLAUDE.md Commands).

## Routes

- `/` — landing page + onboarding poll + Polar payment flow.
- `/timer?w={base64}` — timer; reads workout JSON from the `w` query param (see URL Format).
- `/success` — post-purchase page; surfaces the SKILL.md download.
- `/restore` + `/api/restore` — re-issue a buyer's instructions by purchase email (looks up
  the latest Polar order).
- `/api/checkout` — Polar checkout (POST creates session with poll metadata; GET redirects).
- `/getting-started`, `/getting-started/instructions/[ai]`, `/getting-started/troubleshooting`
  — setup guides. `next.config.ts` permanently redirects the old `/instructions/:ai` and
  `/troubleshooting` paths here.
- `/privacy`, `/terms` — legal. `sitemap.ts` generates the sitemap.

## Poll → payment → instructions flow

1. `usePoll` collects answers (pages: landing → poll → payment → success), auto-advancing on
   selection and persisting to `localStorage` (`workout-poll-answers`).
2. Answers go to Polar as checkout metadata via `/api/checkout`.
3. After purchase, `generateInstructions()` builds the personalized SKILL.md.
4. `/restore` regenerates it from the buyer's most recent Polar order.

To add a new option to any poll step (tracker, training type, equipment, goals, …), use the
`add-poll-entity` skill — it enumerates every file that must change in lockstep.

## Timer state machine (`useTimer`, `useReducer`)

- Phases: `idle` → `tracker` → `countdown` → `work` → `rest` → `roundRest` →
  `cooldownCountdown` → `cooldown` → `complete`.
- Actions: `START`, `PAUSE`, `RESUME`, `TICK`, `SKIP`, `NEXT_PHASE`, `SET_TIME`, `RESET`.
- Phase → Tailwind color mapping lives in `config/phase-colors.ts`.
- Timer features: EN/RU, tracker popup (WHOOP / Apple Watch / Garmin), equipment preview on
  rest, exercise video links, speech-synthesis audio cues, mobile safe-area handling.

## Workout URL format

`/timer?w={base64_encoded_workout_json}` — URL-safe base64 (`+`→`-`, `/`→`_`, padding
removed). Encode/decode in `lib/url.ts`. The canonical `Workout` / `Exercise` shapes are
the TypeScript interfaces in `src/types/workout.ts` — read those rather than a duplicated
copy. README's "Workout URL Format" section mirrors them for outside readers.

## Environment variables

Defined in `.env.local` (not committed; template in README). `NEXT_PUBLIC_POLAR_PRODUCT_ID`
is required; `NEXT_PUBLIC_TIMER_BASE_URL` has a default; `POLAR_ACCESS_TOKEN` and
`POLAR_SUCCESS_URL` are server-side for the checkout/restore API routes. Constants surface
through `config/constants.ts` (`POLAR_PRODUCT_ID`, `TIMER_BASE_URL`, audio constants).

## Mobile

`min-h-dvh` for dynamic viewport height, safe-area utilities in `globals.css`,
`viewportFit: "cover"` in `layout.tsx`.
