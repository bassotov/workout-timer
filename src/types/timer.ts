export type TimerPhase = 'idle' | 'tracker' | 'countdown' | 'work' | 'rest' | 'roundRest' | 'cooldown' | 'complete';

export interface TimerState {
  phase: TimerPhase;
  timeLeft: number;
  currentRound: number;
  exerciseIndex: number;
  cooldownIndex: number;
  isPaused: boolean;
}

export type TimerAction =
  | { type: 'START' }
  | { type: 'PAUSE' }
  | { type: 'RESUME' }
  | { type: 'TICK' }
  | { type: 'SKIP' }
  | { type: 'NEXT_PHASE' }
  | { type: 'SET_TIME'; payload: number }
  | { type: 'RESET' };

export interface CooldownStretch {
  name: string;
  duration: number;
  desc: string;
}

export type Lang = 'en' | 'ru';
export type Platform = 'chatgpt' | 'claude' | 'gemini' | 'other';
export type TrainingType = 'strength' | 'hiit' | 'yoga' | 'mixed';
export type Equipment = 'bodyweight' | 'home' | 'fullgym' | 'custom';
export type Goal = 'muscle' | 'weight' | 'endurance' | 'general';
export type Tracker = 'whoop' | 'apple' | 'garmin' | 'other' | 'none';
