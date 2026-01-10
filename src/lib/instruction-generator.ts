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
goals: {{GOALS}}
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
- exercises[].equipment: Optional, what's needed
</schema_rules>

<constraints>
- ONLY use exercises possible with: {{EQUIPMENT}}
- ALWAYS respect limitations: {{LIMITATIONS}}
- Focus on goals: {{GOALS}}
- Default to training style: {{TRAINING_TYPE}}
</constraints>

<link_generation>
CRITICAL: Encode workout JSON to base64 for the URL.

For non-ASCII characters (Russian, etc.), you MUST use this exact encoding:
  btoa(unescape(encodeURIComponent(JSON.stringify(workout))))

WARNING: Using btoa() directly on Russian text will CORRUPT the data!
The unescape(encodeURIComponent(...)) wrapper is REQUIRED for Cyrillic.

The resulting base64 should ONLY contain: A-Z, a-z, 0-9, +, /, =
No % symbols, no corrupted characters.

Build URL: {{TIMER_BASE_URL}}?w={base64}
Provide as clickable markdown link.
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
type TrainingType = 'strength' | 'hiit' | 'yoga' | 'mixed';
type Tracker = 'whoop' | 'apple' | 'garmin' | 'other' | 'none';

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
};

const TRACKER_MAP: Record<Tracker, string> = {
  whoop: 'WHOOP',
  apple: 'Apple Watch',
  garmin: 'Garmin',
  other: 'Fitness tracker',
  none: '',
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
IMPORTANT: Gemini cannot create clickable links that work properly.

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
  const lang = answers.language || 'en';
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

  const platform = answers.aiPlatform || 'chatgpt';

  const variables: Record<string, string> = {
    USER_NAME: answers.name || 'User',
    LANGUAGE_NAME: lang === 'ru' ? 'Russian' : 'English',
    LANGUAGE_CODE: lang,
    EQUIPMENT: equipmentText,
    GOALS: GOALS_MAP[goal] || goal,
    TRAINING_TYPE: TRAINING_MAP[training] || training,
    LIMITATIONS: answers.limitations || 'None specified',
    TRACKER: hasTracker ? trackerText : 'None',
    TRACKER_CODE: tracker,
    TRACKER_FIELD: hasTracker ? `"tracker": "${tracker}",` : '',
    TRACKER_RULE: hasTracker ? `- tracker: ALWAYS use "${tracker}"` : '',
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
  };

  return interpolate(INSTRUCTION_TEMPLATE, variables);
}
