import { Progress } from '@/components/ui/progress';

interface PollProgressProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export function PollProgress({ currentStep, totalSteps, className }: PollProgressProps) {
  const progressValue = ((currentStep + 1) / totalSteps) * 100;

  return (
    <Progress value={progressValue} className={className} />
  );
}
