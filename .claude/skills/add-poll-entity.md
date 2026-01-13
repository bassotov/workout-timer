# Skill: Add New Poll Entity

This skill guides you through adding new options to any poll step (tracker, training type, equipment, goals, etc.).

## Data Flow Overview

```
Poll Config → Types → Translations → UI Components → Checkout API → SKILL.md Generator
```

When a user selects an option:
1. Stored in `usePoll` hook state
2. Saved to localStorage (`workout-poll-answers`)
3. Displayed in PaymentSummary
4. Sent to Polar via checkout API metadata
5. Used in `generateInstructions()` to build SKILL.md
6. For trackers: shown in TrackerPopup on timer page

## Files to Modify

### 1. Poll Configuration
**File:** `src/config/poll-steps.ts`

Add the new option ID to the appropriate step's `options` array:

```typescript
{
  id: 'tracker', // or 'trainingType', 'equipment', 'goals', etc.
  options: [
    { id: 'existingOption' },
    { id: 'newOption' },        // Add here
    { id: 'other', allowCustom: true }, // Keep 'other' last if present
    { id: 'none' },             // Keep 'none' last for trackers
  ],
},
```

### 2. Type Definitions (if applicable)
**File:** `src/types/timer.ts`

Update the union type if one exists for this poll step:

```typescript
// For trackers:
export type Tracker = 'whoop' | 'apple' | 'garmin' | 'newTracker' | 'other' | 'none';

// For training types:
export type TrainingType = 'strength' | 'hiit' | 'yoga' | 'mixed' | 'newType';

// For equipment:
export type Equipment = 'bodyweight' | 'home' | 'fullgym' | 'custom';

// For goals:
export type Goal = 'muscle' | 'weight' | 'endurance' | 'general';
```

### 3. English Translations
**File:** `src/i18n/en.ts`

Add translations in TWO places:

**Poll option label** (under `poll.steps.[stepId].options`):
```typescript
poll: {
  steps: {
    tracker: {
      options: {
        newTracker: 'New Tracker Name',
      },
    },
    trainingType: {
      options: {
        newType: 'New Training Type',
      },
    },
  },
},
```

**For trackers only** - add timer reminder message (under `tracker`):
```typescript
tracker: {
  newTracker: "Don't forget to start activity on New Tracker",
  // OR for passive trackers like Oura:
  newTracker: 'Your New Tracker is tracking your workout',
},
```

### 4. Russian Translations
**File:** `src/i18n/ru.ts`

Mirror the same structure as English:

```typescript
poll: {
  steps: {
    tracker: {
      options: {
        newTracker: 'Название трекера',
      },
    },
  },
},
tracker: {
  newTracker: 'Напоминание о трекере на русском',
},
```

### 5. Instruction Generator
**File:** `src/lib/instruction-generator.ts`

Update the local type definition and mapping:

**For trackers:**
```typescript
type Tracker = 'whoop' | 'apple' | 'garmin' | 'newTracker' | 'other' | 'none';

const TRACKER_MAP: Record<Tracker, string> = {
  // ... existing
  newTracker: 'New Tracker Display Name',
};
```

**For training types:**
```typescript
type TrainingType = 'strength' | 'hiit' | 'yoga' | 'mixed' | 'newType';

const TRAINING_MAP: Record<TrainingType, string> = {
  // ... existing
  newType: 'Description for AI instructions',
};
```

**For equipment:**
```typescript
const EQUIPMENT_MAP: Record<Equipment, string> = {
  // ... existing
  newEquipment: 'Equipment description for AI',
};
```

**For goals:**
```typescript
const GOALS_MAP: Record<Goal, string> = {
  // ... existing
  newGoal: 'Goal description for AI',
};
```

### 6. TrackerPopup Component (trackers only)
**File:** `src/components/timer/TrackerPopup.tsx`

**Update interface:**
```typescript
interface TrackerPopupTranslations {
  // ... existing
  trackerNewTracker: string;
}
```

**Add case to switch:**
```typescript
function getTrackerMessage(tracker: string | undefined, t: TrackerPopupTranslations): string {
  switch (tracker?.toLowerCase()) {
    // ... existing cases
    case 'newtracker':
    case 'new tracker': // alternative spelling
      return t.trackerNewTracker;
    // ... rest
  }
}
```

### 7. Timer Page (trackers only)
**File:** `src/app/timer/page.tsx`

The `trackerTranslations` object should already include the new key pattern:
```typescript
const trackerTranslations = {
  // ... existing
  trackerNewTracker: t.tracker.newTracker,
};
```

## Verification Checklist

1. **Build**: Run `npm run build` - should compile without errors
2. **Poll Flow**: Start dev server, go through poll, verify new option appears
3. **Selection**: Select new option, check localStorage in DevTools
4. **PaymentSummary**: Verify selection displays correctly
5. **SKILL.md**: Download instructions after purchase, verify new option in user profile
6. **Timer** (trackers only): Create workout URL with new tracker, verify popup message

## Quick Reference: File Dependencies by Poll Step

| Poll Step | poll-steps.ts | timer.ts types | en.ts | ru.ts | instruction-generator.ts | TrackerPopup.tsx | timer/page.tsx |
|-----------|:-------------:|:--------------:|:-----:|:-----:|:------------------------:|:----------------:|:--------------:|
| tracker | Yes | Yes | Yes (2 places) | Yes (2 places) | Yes | Yes | Yes |
| trainingType | Yes | Yes | Yes | Yes | Yes | - | - |
| equipment | Yes | Yes | Yes | Yes | Yes | - | - |
| goals | Yes | Yes | Yes | Yes | Yes | - | - |
| weightPreference | Yes | - | Yes | Yes | Yes | - | - |
| coachingStyle | Yes | - | Yes | Yes | - | - | - |
| aiPlatform | Yes | - | Yes | Yes | - | - | - |

## Example: Adding a New Tracker

To add "Fitbit" as a tracker option:

1. `poll-steps.ts`: Add `{ id: 'fitbit' }` to tracker options
2. `timer.ts`: Add `'fitbit'` to Tracker type
3. `en.ts`: Add `fitbit: 'Fitbit'` in poll options + `fitbit: "Don't forget to start workout on Fitbit"` in tracker
4. `ru.ts`: Add Russian translations
5. `instruction-generator.ts`: Add `fitbit: 'Fitbit'` to TRACKER_MAP
6. `TrackerPopup.tsx`: Add `trackerFitbit` to interface + case `'fitbit'` in switch
7. `timer/page.tsx`: Add `trackerFitbit: t.tracker.fitbit` to trackerTranslations

## Example: Adding a New Training Type

To add "Stretching" as a training type:

1. `poll-steps.ts`: Add `{ id: 'stretching' }` to trainingType options
2. `timer.ts`: Add `'stretching'` to TrainingType type
3. `en.ts`: Add `stretching: 'Stretching / Flexibility'` in poll options
4. `ru.ts`: Add `stretching: 'Растяжка / Гибкость'`
5. `instruction-generator.ts`: Add `stretching: 'Stretching and flexibility work'` to TRAINING_MAP
