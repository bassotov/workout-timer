export interface Exercise {
  name: string;
  reps: string;          // e.g., "x10" or "30 sec"
  duration: number;      // Timer duration in seconds
  weight?: string;       // e.g., "12kg"
  equipment?: string;    // What's needed
  video?: string;        // YouTube link
}

export interface Workout {
  name: string;
  rounds: number;
  restEx: number;        // Rest between exercises (seconds)
  restRound: number;     // Rest between rounds (seconds)
  cooldown: boolean;
  lang?: 'en' | 'ru';    // UI language
  tracker?: string; // 'whoop' | 'apple' | 'garmin' | 'none' or custom name
  exercises: Exercise[];
}
