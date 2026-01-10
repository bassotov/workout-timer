import { useReducer, useMemo } from 'react';
import type { TimerPhase, TimerState, TimerAction, Workout, Exercise } from '@/types';
import { PHASE_COLORS, COOLDOWN_STRETCHES, COUNTDOWN_DURATION } from '@/config';
import { formatTime, calculateTotalDuration } from '@/lib/time';

const initialState: TimerState = {
  phase: 'idle',
  timeLeft: 0,
  currentRound: 1,
  exerciseIndex: 0,
  cooldownIndex: 0,
  isPaused: false,
};

function createReducer(workout: Workout | null) {
  const lang = workout?.lang || 'en';
  const cooldownStretches = COOLDOWN_STRETCHES[lang];
  const exercises = workout?.exercises || [];

  return function timerReducer(state: TimerState, action: TimerAction): TimerState {
    if (!workout) return state;

    switch (action.type) {
      case 'START': {
        if (workout.tracker && workout.tracker !== 'none') {
          return { ...state, phase: 'tracker', isPaused: false };
        }
        return { ...state, phase: 'countdown', timeLeft: COUNTDOWN_DURATION, isPaused: false };
      }

      case 'PAUSE':
        return { ...state, isPaused: true };

      case 'RESUME':
        return { ...state, isPaused: false };

      case 'TICK': {
        if (state.isPaused || state.timeLeft <= 0) return state;
        const newTime = state.timeLeft - 1;
        if (newTime === 0) {
          return timerReducer({ ...state, timeLeft: 0 }, { type: 'NEXT_PHASE' });
        }
        return { ...state, timeLeft: newTime };
      }

      case 'SKIP':
        return timerReducer(state, { type: 'NEXT_PHASE' });

      case 'SET_TIME':
        return { ...state, timeLeft: action.payload };

      case 'RESET':
        return { ...initialState };

      case 'NEXT_PHASE': {
        const { phase, exerciseIndex, currentRound, cooldownIndex } = state;

        // tracker -> countdown
        if (phase === 'tracker') {
          return { ...state, phase: 'countdown', timeLeft: COUNTDOWN_DURATION };
        }

        // countdown -> work
        if (phase === 'countdown') {
          return { ...state, phase: 'work', timeLeft: exercises[0].duration };
        }

        // work -> rest/roundRest/cooldown/complete
        if (phase === 'work') {
          const isLastExercise = exerciseIndex >= exercises.length - 1;
          const isLastRound = currentRound >= workout.rounds;

          if (!isLastExercise) {
            return { ...state, phase: 'rest', timeLeft: workout.restEx };
          }
          if (!isLastRound) {
            return { ...state, phase: 'roundRest', timeLeft: workout.restRound };
          }
          if (workout.cooldown) {
            return { ...state, phase: 'cooldown', cooldownIndex: 0, timeLeft: cooldownStretches[0].duration };
          }
          return { ...state, phase: 'complete', isPaused: true };
        }

        // rest -> work (next exercise)
        if (phase === 'rest') {
          const nextIndex = exerciseIndex + 1;
          return { ...state, phase: 'work', exerciseIndex: nextIndex, timeLeft: exercises[nextIndex].duration };
        }

        // roundRest -> countdown (next round)
        if (phase === 'roundRest') {
          return {
            ...state,
            phase: 'countdown',
            currentRound: currentRound + 1,
            exerciseIndex: 0,
            timeLeft: COUNTDOWN_DURATION,
          };
        }

        // cooldown -> next stretch or complete
        if (phase === 'cooldown') {
          const isLastStretch = cooldownIndex >= cooldownStretches.length - 1;
          if (!isLastStretch) {
            const nextIndex = cooldownIndex + 1;
            return { ...state, cooldownIndex: nextIndex, timeLeft: cooldownStretches[nextIndex].duration };
          }
          return { ...state, phase: 'complete', isPaused: true };
        }

        return state;
      }

      default:
        return state;
    }
  };
}

export interface UseTimerReturn {
  state: TimerState;
  actions: {
    start: () => void;
    pause: () => void;
    resume: () => void;
    skip: () => void;
    tick: () => void;
    reset: () => void;
  };
  derived: {
    currentExercise: Exercise | null;
    currentStretch: { name: string; duration: number; desc: string } | null;
    phaseColor: string;
    isRunning: boolean;
    totalDuration: number;
    progress: number;
    formattedTime: string;
  };
}

export function useTimer(workout: Workout | null): UseTimerReturn {
  const reducer = useMemo(() => createReducer(workout), [workout]);
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = useMemo(
    () => ({
      start: () => dispatch({ type: 'START' }),
      pause: () => dispatch({ type: 'PAUSE' }),
      resume: () => dispatch({ type: 'RESUME' }),
      skip: () => dispatch({ type: 'SKIP' }),
      tick: () => dispatch({ type: 'TICK' }),
      reset: () => dispatch({ type: 'RESET' }),
    }),
    []
  );

  const derived = useMemo(() => {
    const lang = workout?.lang || 'en';
    const cooldownStretches = COOLDOWN_STRETCHES[lang];
    const exercises = workout?.exercises || [];

    const currentExercise = exercises[state.exerciseIndex] || null;
    const currentStretch = cooldownStretches[state.cooldownIndex] || null;
    const phaseColor = PHASE_COLORS[state.phase as TimerPhase] || PHASE_COLORS.idle;
    const isRunning = !state.isPaused && state.phase !== 'idle' && state.phase !== 'complete';
    const totalDuration = workout ? calculateTotalDuration(workout) : 0;

    // Calculate progress as percentage of completed phases
    let progress = 0;
    if (workout && state.phase !== 'idle') {
      const totalExercises = exercises.length * workout.rounds;
      const completedExercises = (state.currentRound - 1) * exercises.length + state.exerciseIndex;
      const exerciseProgress = state.phase === 'work' || state.phase === 'rest' ? 0.5 : 0;
      progress = Math.min(100, ((completedExercises + exerciseProgress) / totalExercises) * 100);
    }

    return {
      currentExercise,
      currentStretch,
      phaseColor,
      isRunning,
      totalDuration,
      progress,
      formattedTime: formatTime(state.timeLeft),
    };
  }, [state, workout]);

  return { state, actions, derived };
}
