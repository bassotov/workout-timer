# CLAUDE.md

Guidance for Claude Code in this repo. Next.js 16 App Router app — see [README](README.md)
for tech stack and setup, [docs/architecture.md](docs/architecture.md) for depth.

Status: live at workout-timer.app (Vercel). Generic engineering rules (DRY, type safety,
small files) live in the global `~/.claude/CLAUDE.md` — not repeated here.

## Skills

- `add-poll-entity` (`.claude/skills/add-poll-entity.md`) — invoke for ANY change to a poll
  step (new tracker, training type, equipment, goal, …). It lists every file to edit in lockstep.
- `vercel-react-best-practices` — use when writing/reviewing/refactoring React or Next.js code.
- `web-design-guidelines` — use when building, reviewing, or auditing UI.

## Commands

```bash
npm run dev        # dev server at localhost:3000
npm run build      # production build, then the typecheck below
npm run typecheck  # TypeScript 7 (native) — tsc --noEmit, sub-second
npm run lint       # ESLint

# Generator smoke test — the only test-like check in the repo:
npx tsx scripts/test-instructions.ts [platform] [--custom]
#   platform = chatgpt | claude | gemini (default chatgpt); --custom exercises "other" values
```

No `npm test` exists — do not fabricate it. Verify types with `npm run typecheck`; verify
instruction generation with the tsx script above.

**Two TypeScript packages, on purpose.** `tsc` is TypeScript 7, the native compiler
(`typescript7` → `npm:typescript@7`), and it is the only thing that typechecks this repo.
It ships no `lib/typescript.js`, so Next (`verify-typescript-setup.js`) and editors can't use
it — they need the JS API, which is why `typescript` is aliased to `@typescript/typescript6`.
Next's own check is off (`typescript.ignoreBuildErrors` in `next.config.ts`) so it doesn't
re-run the slow TS 6 path; `npm run build` chains `npm run typecheck` instead. Never point
`typescript` at 7.x — it breaks Next's build. Drop TS 6 only once Next resolves `tsgo`.

## Product

$10 one-time purchase via Polar → a personalized `SKILL.md` that teaches the user's AI
(ChatGPT / Claude / Gemini / other) to design workouts and emit timer links. The repo also
hosts the timer those links open. Full flow in [docs/architecture.md](docs/architecture.md).

## Architecture

Poll → Polar payment → success/download, plus a standalone `/timer` reader. Key entry points:

- Instruction generator: `src/lib/instruction-generator.ts` → `generateInstructions(answers, baseUrl)`.
- Poll state: `src/hooks/usePoll.ts`. Timer state machine: `src/hooks/useTimer.ts`.
- `/restore` re-issues instructions from a buyer's Polar order by email.

Routes, schema, env vars, URL format, full directory map: [docs/architecture.md](docs/architecture.md).

## Key patterns

- **Timer (`useTimer`, `useReducer`)** — phases `idle → tracker → countdown → work → rest →
  roundRest → cooldownCountdown → cooldown → complete`; actions `START PAUSE RESUME TICK SKIP
  NEXT_PHASE SET_TIME RESET`.
- **Poll (`usePoll`)** — pages `landing → poll → payment → success`; auto-advances on
  selection, persists to `localStorage`.
- **Workout URL** — `/timer?w={url-safe-base64-json}`; encode/decode in `lib/url.ts`,
  canonical shape in `src/types/workout.ts`.

## Conventions

- **Barrel imports only** — import from the folder, not the file:
  `import { formatTime } from '@/lib'` / `from '@/types'` / `from '@/config'` /
  `from '@/components/ui'` (also `landing`, `timer`), `from '@/i18n'`. Never deep-import.
- **i18n discipline** — no hardcoded user-facing strings. Add every string to BOTH
  `src/i18n/en.ts` and `src/i18n/ru.ts`; read it via the `useLanguage()` context hook
  (`const { t } = useLanguage()`).

## Workflow

When exiting plan mode, delegate implementation to `Task` agents
(`subagent_type=general-purpose`) rather than editing directly — split the plan into
independent tasks that run in parallel. Only implement trivial single-file changes inline.
