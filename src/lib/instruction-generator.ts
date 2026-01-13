import type { PollAnswers, CoachingStyleId } from '@/types';
import { getTranslations } from '@/i18n';

// Template with XML structure for better LLM parsing
const INSTRUCTION_TEMPLATE = `<system>

<role>
You are {{USER_NAME}}'s personal workout coach.
You create customized workout timers based on their preferences and goals.
ALWAYS respond in {{LANGUAGE_NAME}}.
</role>

<coaching_style>
{{COACHING_STYLE_DESCRIPTION}}
</coaching_style>

<user_profile>
name: {{USER_NAME}}
{{GENDER_LINE}}{{WEIGHT_LINE}}{{HEIGHT_LINE}}{{BIRTH_YEAR_LINE}}equipment: {{EQUIPMENT}}
{{WEIGHT_PREFERENCE_LINE}}goals: {{GOALS}}
training_type: {{TRAINING_TYPE}}
limitations: {{LIMITATIONS}}
tracker: {{TRACKER}}
{{CUSTOM_GUIDELINES_LINE}}</user_profile>

<instructions>
1. When {{USER_NAME}} asks for a workout, ask clarifying questions if needed:
   - How are they feeling today (full energy, tired, ok, etc.)
   - Duration (30 minutes, 45 minutes, 1 hour)
   - Focus area (if not clear from request)
   - Any temporary limitations
2. Design appropriate workout based on user profile
3. Generate workout JSON following the schema in <workout_schema>
4. Create timer link: {{TIMER_BASE_URL}}?w={base64_encoded_json}
5. ALWAYS provide clickable link in your response
</instructions>

<workout_schema>
{
  "name": "Workout Name",
  "rounds": 3,
  "restEx": 20,
  "restRound": 90,
  "cooldown": true,
  "lang": "{{LANGUAGE_CODE}}",
  {{TRACKER_FIELD}}
  "exercises": [
    {
      "name": "Exercise Name",
      "reps": "x10",
      "duration": 60,
      "weight": "12kg",
      "equipment": "dumbbells"
    }
  ]
}
</workout_schema>

<schema_rules>
- name: Workout title
- rounds: 1-5 (number of times to repeat all exercises)
- restEx: 10-60 (seconds rest between exercises)
- restRound: 60-120 (seconds rest between rounds)
- cooldown: true/false (include stretching at end)
- lang: ALWAYS use "{{LANGUAGE_CODE}}"
{{TRACKER_RULE}}
- exercises[].name: Exercise name
- exercises[].reps: Rep count "x12" or duration "30 sec"
- exercises[].duration: Seconds for timer (how long exercise runs)
- exercises[].weight: Optional, for weighted exercises
- exercises[].equipment: ALWAYS for weights; else optional

CRITICAL - EVERY EXERCISE MUST HAVE EXACTLY THESE 3 FIELDS:
  "name": "...",
  "reps": "...",
  "duration": NUMBER

The timer field MUST be called "duration" (integer, seconds).
NEVER use: "time", "seconds", "dumbbells", "length", or ANY other name.
If you use the wrong field name, the timer WILL NOT WORK.

FOR WEIGHTED EXERCISES: Always include "weight" field with recommended weight.
Example: "weight": "12kg" or "weight": "8kg each hand"
{{WEIGHT_SCALING_GUIDE}}
</schema_rules>

<constraints>
- ONLY use exercises possible with: {{EQUIPMENT}}
- ALWAYS respect limitations: {{LIMITATIONS}}
- Focus on goals: {{GOALS}}
- Default to training style: {{TRAINING_TYPE}}
</constraints>

<link_generation>
BEFORE generating the link, verify EVERY exercise has:
- "name": string
- "reps": string (like "x10" or "30 sec")
- "duration": number (like 45)

If ANY exercise is missing "duration" or uses wrong field name, FIX IT FIRST.

CRITICAL: Encode workout JSON to base64 for the URL.

For non-ASCII characters (Russian, etc.), you MUST use this exact encoding:
  btoa(unescape(encodeURIComponent(JSON.stringify(workout))))

WARNING: Using btoa() directly on Russian text will CORRUPT the data!
The unescape(encodeURIComponent(...)) wrapper is REQUIRED for Cyrillic.

The resulting base64 should ONLY contain: A-Z, a-z, 0-9, +, /, =
No % symbols, no corrupted characters.

Build URL: {{TIMER_BASE_URL}}?w={base64}
See <link_format> for how to present the link.
</link_generation>

<response_format>
1. Show workout plan in readable list
2. Mention estimated duration
3. Provide timer link prominently (see link_format below)
4. Offer to adjust if needed
</response_format>

{{LINK_FORMAT}}

<example_response>
{{EXAMPLE_RESPONSE}}
</example_response>

</system>`;

type Equipment = 'bodyweight' | 'home' | 'fullgym' | 'custom';
type Goal = 'muscle' | 'weight' | 'endurance' | 'general';
type TrainingType = 'strength' | 'hiit' | 'yoga' | 'mixed' | 'calisthenics' | 'cardio' | 'pilates';
type Tracker = 'whoop' | 'apple' | 'garmin' | 'oura' | 'other' | 'none';

const EQUIPMENT_MAP: Record<Equipment, string> = {
  bodyweight: 'Bodyweight only (no equipment)',
  home: 'Dumbbells, resistance bands, yoga mat',
  fullgym: 'Full gym access (barbells, machines, cables, dumbbells)',
  custom: 'Custom equipment',
};

const GOALS_MAP: Record<Goal, string> = {
  muscle: 'Build muscle and strength',
  weight: 'Lose weight and get leaner',
  endurance: 'Improve cardiovascular endurance',
  general: 'General fitness and health',
};

const TRAINING_MAP: Record<TrainingType, string> = {
  strength: 'Strength training with weights',
  hiit: 'HIIT and cardio workouts',
  yoga: 'Yoga and mobility work',
  mixed: 'Mixed variety training',
  calisthenics: 'Calisthenics and bodyweight exercises',
  cardio: 'Cardio and endurance training',
  pilates: 'Pilates and core work',
};

const TRACKER_MAP: Record<Tracker, string> = {
  whoop: 'WHOOP',
  apple: 'Apple Watch',
  garmin: 'Garmin',
  oura: 'Oura Ring',
  other: 'Fitness tracker',
  none: '',
};

type WeightPreference = 'light' | 'moderate' | 'medium' | 'heavy' | 'veryHeavy' | 'unknown';

const WEIGHT_PREFERENCE_MAP: Record<WeightPreference, string> = {
  light: '2kg/4lb for bicep curls (start light, can increase)',
  moderate: '7kg/15lb for bicep curls',
  medium: '12kg/25lb for bicep curls',
  heavy: '15kg/35lb for bicep curls',
  veryHeavy: '20kg+/45lb+ for bicep curls (experienced lifter)',
  unknown: 'unknown (start with lighter weights, user can request heavier)',
};

function interpolate(template: string, variables: Record<string, string>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => variables[key] ?? '');
}

function buildCoachingStyleDescription(styleId: CoachingStyleId | '', lang: 'en' | 'ru'): string {
  if (!styleId) return '';
  const t = getTranslations(lang);
  const style = t.coachingStyles[styleId];
  if (!style) return '';
  return style.description;
}

function getExampleResponse(styleId: CoachingStyleId | '', lang: 'en' | 'ru'): string {
  if (!styleId) return '';
  const t = getTranslations(lang);
  const style = t.coachingStyles[styleId];
  if (!style) return '';
  return style.example;
}

const GENDER_MAP: Record<string, string> = {
  male: 'Male',
  female: 'Female',
  other: 'Other',
  prefer_not_to_say: 'Not specified',
};

function getLinkFormatInstructions(platform: string): string {
  if (platform === 'gemini') {
    return `<link_format>
CRITICAL GEMINI ENCODING WARNING:
Gemini's base64 encoding frequently produces CORRUPTED links with Russian text.
Many users report broken links when using Cyrillic characters.

REQUIRED STEPS TO AVOID CORRUPTION:
1. Use ENGLISH exercise names only (not Russian/Cyrillic)
2. Use this EXACT encoding method:
   btoa(unescape(encodeURIComponent(JSON.stringify(workout))))
3. VERIFY the resulting base64 contains ONLY: A-Z, a-z, 0-9, +, /, =
4. If you see \\u0000 or other escape sequences, START OVER

VALIDATION CHECKLIST before sharing link:
- All exercise names are in English
- Base64 string has no % symbols
- Base64 string has no \\u escape sequences
- Link does not exceed 2000 characters

If encoding continues to fail, tell user:
"I'm having trouble generating a reliable link. Please try asking ChatGPT or Claude instead, as they handle encoding better."

OUTPUT FORMAT:
Output the timer URL as PLAIN TEXT on its own line:
https://workout-timer.app/timer?w=eyJuYW1l...

Then tell the user: "Copy this link and paste it into your browser address bar."

Do NOT use markdown link format - it will redirect to Google Search.
</link_format>`;
  }

  // Default for ChatGPT, Claude, and others
  return `<link_format>
Present the timer URL as a clickable markdown link:
**[Start Workout](https://workout-timer.app/timer?w=eyJuYW1l...)**

Or as a raw URL on its own line:
https://workout-timer.app/timer?w=eyJuYW1l...
</link_format>`;
}

export function generateInstructions(answers: PollAnswers, timerUrl: string): string {
  const lang = 'en'; // Force English for instructions
  const equipment = (Array.isArray(answers.equipment) ? answers.equipment[0] : answers.equipment) as Equipment || 'home';
  const goal = (Array.isArray(answers.goals) ? answers.goals[0] : answers.goals) as Goal || 'general';
  const training = (answers.trainingType as TrainingType) || 'strength';
  const tracker = (answers.tracker as Tracker) || 'none';
  const coachingStyle = (answers.coachingStyle as CoachingStyleId) || 'friendly';

  // Handle custom values for "other" options
  const customEquipment = answers.customEquipment || '';
  const customTracker = answers.customTracker || '';

  const equipmentText = equipment === 'custom' && customEquipment
    ? customEquipment
    : EQUIPMENT_MAP[equipment] || equipment;

  const hasTracker = tracker !== 'none';
  const trackerText = tracker === 'other' && customTracker
    ? customTracker
    : TRACKER_MAP[tracker] || tracker;

  // Build optional profile lines (only include if value exists)
  const genderLine = answers.gender ? `gender: ${GENDER_MAP[answers.gender] || answers.gender}\n` : '';
  const weightLine = answers.weight ? `weight: ${answers.weight}\n` : '';
  const heightLine = answers.height ? `height: ${answers.height}\n` : '';
  const birthYearLine = answers.birthYear ? `birth_year: ${answers.birthYear}\n` : '';
  const customGuidelinesLine = answers.customGuidelines ? `custom_guidelines: ${answers.customGuidelines}\n` : '';

  // Weight preference for dumbbell exercises
  const weightPrefRaw = answers.weightPreference || '';
  const hasWeightPref = weightPrefRaw !== '';
  const weightPref = weightPrefRaw as WeightPreference;
  const weightPreferenceLine = hasWeightPref
    ? `weight_preference: ${WEIGHT_PREFERENCE_MAP[weightPref] || weightPref}\n`
    : '';

  // Weight scaling guide (only if user has weight preference)
  const weightScalingGuide = hasWeightPref && weightPref !== 'unknown'
    ? `
WEIGHT SCALING GUIDE (based on user's bicep curl preference):
- Bicep curls: use user's preference as baseline
- Goblet squats / lunges: ~1.5x bicep weight
- Rows: ~1.2x bicep weight
- Shoulder press: ~0.8x bicep weight
- Lateral raises: ~0.5x bicep weight`
    : hasWeightPref && weightPref === 'unknown'
    ? `
WEIGHT GUIDANCE: User is unsure of their weights.
Start with LIGHTER weights and note "increase if too easy" in workout.`
    : '';

  const platform = answers.aiPlatform || 'chatgpt';

  const variables: Record<string, string> = {
    USER_NAME: answers.name || 'User',
    LANGUAGE_NAME: 'English', // Always English
    LANGUAGE_CODE: lang,
    EQUIPMENT: equipmentText,
    GOALS: GOALS_MAP[goal] || goal,
    TRAINING_TYPE: TRAINING_MAP[training] || training,
    LIMITATIONS: answers.limitations || 'None specified',
    TRACKER: hasTracker ? trackerText : 'None',
    TRACKER_CODE: trackerText,
    TRACKER_FIELD: hasTracker ? `"tracker": "${trackerText}",` : '',
    TRACKER_RULE: hasTracker ? `- tracker: ALWAYS use "${trackerText}"` : '',
    TIMER_BASE_URL: timerUrl,
    COACHING_STYLE_DESCRIPTION: buildCoachingStyleDescription(coachingStyle, lang),
    EXAMPLE_RESPONSE: getExampleResponse(coachingStyle, lang),
    LINK_FORMAT: getLinkFormatInstructions(platform),

    // Optional profile fields
    GENDER_LINE: genderLine,
    WEIGHT_LINE: weightLine,
    HEIGHT_LINE: heightLine,
    BIRTH_YEAR_LINE: birthYearLine,
    CUSTOM_GUIDELINES_LINE: customGuidelinesLine,
    WEIGHT_PREFERENCE_LINE: weightPreferenceLine,
    WEIGHT_SCALING_GUIDE: weightScalingGuide,
  };

  return interpolate(INSTRUCTION_TEMPLATE, variables);
}
