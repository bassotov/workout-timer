import { Badge } from '@/components/ui/badge';
import type { Exercise } from '@/types';

interface Translations {
  video: string;
  next: string;
  restGetReady?: string;
}

interface ExerciseInfoProps {
  exercise: Exercise | null;
  translations: Translations;
  showAsNext?: boolean;
  showEquipment?: boolean;
}

function YouTubeIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
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
  const videoUrl = exercise.video || `https://www.youtube.com/results?search_query=${encodeURIComponent(exercise.name)}`;

  if (showAsNext) {
    return (
      <div className="text-center">
        {/* Prominent rest message */}
        <h1 className="text-5xl font-bold mb-8">
          {translations.restGetReady || 'Rest. Next:'}
        </h1>

        {/* Next exercise info */}
        <div className="opacity-75">
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <span className="text-4xl font-semibold underline decoration-white/30 underline-offset-4">
              <YouTubeIcon className="inline-block w-6 h-6 opacity-60 mr-1.5" style={{ verticalAlign: 'baseline', marginBottom: '-0.1em' }} />
              {exercise.name}
            </span>
          </a>
          <div className="flex flex-col gap-2 items-center mt-4">
            {hasWeight && (
              <Badge variant="secondary" className="bg-black/20 text-white border-0 text-lg px-4 py-2 opacity-70">
                ⚖️ {exercise.weight}
              </Badge>
            )}
            {showEquipment && exercise.equipment && (
              <Badge variant="secondary" className="bg-black/20 text-white border-0 text-lg px-4 py-2 opacity-70">
                🏋️ {exercise.equipment}
              </Badge>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <a
        href={videoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:opacity-80 transition-opacity group mb-6 text-center"
      >
        <h1 className="text-5xl font-bold underline decoration-white/30 underline-offset-4">
          <YouTubeIcon className="inline-block w-8 h-8 opacity-50 group-hover:opacity-70 mr-2 align-baseline" style={{ verticalAlign: 'baseline', marginBottom: '-0.1em' }} />
          {exercise.name}
        </h1>
      </a>
      <div className="flex gap-4 justify-center text-2xl mb-4">
        {hasWeight && (
          <Badge variant="secondary" className="bg-black/20 text-white border-0 text-xl px-5 py-3">
            ⚖️ {exercise.weight}
          </Badge>
        )}
        <Badge variant="secondary" className="bg-black/20 text-white border-0 text-xl px-5 py-3">
          {exercise.reps}
        </Badge>
      </div>
    </div>
  );
}
