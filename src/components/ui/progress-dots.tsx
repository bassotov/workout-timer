import { cn } from "@/lib/utils";

interface ProgressDotsProps {
  total: number;
  current: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  activeColor?: string;
  completedColor?: string;
  pendingColor?: string;
}

export function ProgressDots({
  total,
  current,
  size = 'md',
  className,
  activeColor = 'bg-white',
  completedColor = 'bg-white/40',
  pendingColor = 'bg-black/20',
}: ProgressDotsProps) {
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  };

  return (
    <div className={cn("flex gap-2", className)}>
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={cn(
            "rounded-full transition-colors",
            sizeClasses[size],
            i < current ? completedColor : i === current ? activeColor : pendingColor
          )}
        />
      ))}
    </div>
  );
}
