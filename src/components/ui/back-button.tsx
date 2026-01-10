'use client';

import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { useLanguage } from "@/i18n";

interface BackButtonProps {
  onClick: () => void;
  label?: string;
  className?: string;
}

export function BackButton({ onClick, label, className }: BackButtonProps) {
  const { t } = useLanguage();
  const displayLabel = label ?? t.poll.back;

  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={cn("text-slate-400 hover:text-white", className)}
    >
      <HugeiconsIcon icon={ArrowLeft01Icon} size={16} className="mr-1" />
      {displayLabel}
    </Button>
  );
}
