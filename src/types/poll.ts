export type CoachingStyleId = 'motivator' | 'drill' | 'friendly' | 'analytical';
export type GenderId = 'male' | 'female' | 'other' | 'prefer_not_to_say';

export interface PollAnswers {
  // Core poll answers
  language: 'en' | 'ru' | '';
  aiPlatform: string;
  trainingType: string;
  equipment: string;
  goals: string;
  tracker: string;
  coachingStyle: CoachingStyleId | '';

  // Personal details (collected on details form)
  name: string;
  email: string;
  limitations: string;

  // Optional personalization fields
  gender?: GenderId;
  weight?: string;
  height?: string;
  birthYear?: string;
  customGuidelines?: string;

  // Custom "other" inputs
  customEquipment?: string;
  customAiPlatform?: string;
  customTracker?: string;
}

export type PollStepId = 'language' | 'aiPlatform' | 'trainingType' | 'equipment' | 'goals' | 'tracker' | 'coachingStyle';

export interface PollOption {
  id: string;
  allowCustom?: boolean; // Show custom input when selected
}

export interface PollStep {
  id: PollStepId;
  multiSelect?: boolean;
  options: PollOption[];
}
