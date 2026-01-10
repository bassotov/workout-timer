'use client';

interface ExerciseProgressProps {
  exerciseIndex: number;
  totalExercises: number;
}

export function ExerciseProgress({ exerciseIndex, totalExercises }: ExerciseProgressProps) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: totalExercises }, (_, i) => {
        const isCompleted = i < exerciseIndex;
        const isCurrent = i === exerciseIndex;

        return (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${
              isCompleted
                ? 'bg-white/40'
                : isCurrent
                  ? 'bg-white'
                  : 'bg-black/20'
            }`}
          />
        );
      })}
    </div>
  );
}
