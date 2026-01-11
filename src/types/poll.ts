export type CoachingStyleId = 'motivator' | 'drill' | 'friendly' | 'analytical';
export type GenderId = 'male' | 'female' | 'other' | 'prefer_not_to_say';
export type DataConsentChoice = 'save' | 'discard';

export interface PollAnswers {
  // Core poll answers
  language: 'en' | 'ru' | '';
  aiPlatform: string;
  trainingType: string;
  equipment: string;
  weightPreference: string;
  goals: string;
  tracker: string;
  coachingStyle: CoachingStyleId | '';

  // Personal details (collected on details form)
  name: string;
  email: string;
  dataConsent?: DataConsentChoice;
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
  customTrainingType?: string;
  customGoals?: string;
}

export type PollStepId = 'language' | 'aiPlatform' | 'trainingType' | 'equipment' | 'weightPreference' | 'goals' | 'tracker' | 'coachingStyle';

export interface PollOption {
  id: string;
  allowCustom?: boolean; // Show custom input when selected
}

export interface PollStep {
  id: PollStepId;
  multiSelect?: boolean;
  options: PollOption[];
  /** Conditional function - step only shows if returns true */
  conditional?: (answers: PollAnswers) => boolean;
}
