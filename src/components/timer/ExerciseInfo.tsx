import { Badge } from '@/components/ui/badge';
import type { Exercise } from '@/types';

interface Translations {
  video: string;
  next: string;
}

interface ExerciseInfoProps {
  exercise: Exercise | null;
  translations: Translations;
  showAsNext?: boolean;
  showEquipment?: boolean;
}

/**
 * Displays current exercise details: name, reps, equipment, video link.
 * Can show equipment during rest phase and handle null exercise gracefully.
 */
export function ExerciseInfo({
  exercise,
  translations,
  showAsNext = false,
  showEquipment = false
}: ExerciseInfoProps) {
  if (!exercise) {
    return null;
  }

  const hasWeight = exercise.weight && exercise.weight !== '—';

  if (showAsNext) {
    return (
      <div className="text-center">
        <p className="text-xl mb-2 opacity-70">{translations.next}</p>
        <h1 className="text-5xl font-bold mb-4">{exercise.name}</h1>
        <div className="flex flex-col gap-2 items-center">
          {hasWeight && (
            <Badge variant="secondary" className="bg-black/20 text-white border-0 text-xl px-6 py-3">
              {exercise.weight}
            </Badge>
          )}
          {showEquipment && exercise.equipment && (
            <Badge variant="secondary" className="bg-black/20 text-white border-0 text-xl px-6 py-3">
              {exercise.equipment}
            </Badge>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-5xl font-bold mb-6 text-center">{exercise.name}</h1>
      <div className="flex gap-4 justify-center text-2xl mb-4">
        {hasWeight && (
          <Badge variant="secondary" className="bg-black/20 text-white border-0 text-xl px-5 py-3">
            {exercise.weight}
          </Badge>
        )}
        <Badge variant="secondary" className="bg-black/20 text-white border-0 text-xl px-5 py-3">
          {exercise.reps}
        </Badge>
      </div>
      {exercise.video && (
        <a
          href={exercise.video}
          target="_blank"
          rel="noopener noreferrer"
          className="opacity-60 hover:opacity-100 underline transition-opacity mb-4"
        >
          {translations.video}
        </a>
      )}
    </div>
  );
}
