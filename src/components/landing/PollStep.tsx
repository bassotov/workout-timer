'use client';

import { useState, useEffect } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { SquareLock01Icon } from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BackButton } from '@/components/ui/back-button';
import { PollProgress } from './PollProgress';
import { useLanguage, LANGUAGE_FLAGS, type Language } from '@/i18n';
import type { PollStep as PollStepType, PollStepId } from '@/types';

interface PollStepProps {
  step: PollStepType;
  selectedValue: string;
  customValue?: string;
  onSelect: (value: string) => void;
  onCustomChange?: (value: string) => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}

export function PollStep({
  step,
  selectedValue,
  customValue = '',
  onSelect,
  onCustomChange,
  onBack,
  currentStep,
  totalSteps,
}: PollStepProps) {
  const { setLanguage, t } = useLanguage();
  const [localCustomValue, setLocalCustomValue] = useState(customValue);

  // Sync local custom value with prop
  useEffect(() => {
    setLocalCustomValue(customValue);
  }, [customValue]);

  // Find the selected option to check if it allows custom input
  const selectedOption = step.options.find((opt) => opt.id === selectedValue);
  const showCustomInput = selectedOption?.allowCustom;

  // Get step translations
  const stepTranslations = t.poll.steps[step.id as PollStepId];

  const handleOptionClick = (optionId: string) => {
    const option = step.options.find((opt) => opt.id === optionId);

    // Reset custom value when switching to a non-custom option
    if (!option?.allowCustom) {
      setLocalCustomValue('');
    }

    // For language step, also update the context
    if (step.id === 'language') {
      setLanguage(optionId as Language);
    }

    // Select the option
    onSelect(optionId);
  };

  const handleCustomContinue = () => {
    if (localCustomValue.trim().length >= 3 && onCustomChange) {
      onCustomChange(localCustomValue.trim());
    }
  };

  const canContinue = localCustomValue.trim().length >= 3;

  // Get option label from translations (with flag for language step)
  const getOptionLabel = (optionId: string): string => {
    const options = stepTranslations.options as Record<string, string>;
    const label = options[optionId] || optionId;

    // Add flag emoji for language options
    if (step.id === 'language' && optionId in LANGUAGE_FLAGS) {
      return `${LANGUAGE_FLAGS[optionId as Language]} ${label}`;
    }

    return label;
  };

  return (
    <div className="min-h-dvh bg-background text-foreground flex flex-col items-center p-6">
      {/* Fixed-position header area - stays at consistent height from top */}
      <div className="w-full max-w-md pt-56">
        <BackButton onClick={onBack} label={t.poll.back} className="mb-4" />
          {/* Privacy indicator */}
          <div className="flex flex-col items-center justify-center gap-1.5 text-xs text-muted-foreground mb-4">
            <HugeiconsIcon icon={SquareLock01Icon} size={20} />
            <span className="text-center">{t.poll.privacy}</span>
          </div>

          <PollProgress
            currentStep={currentStep}
            totalSteps={totalSteps}
            className="mb-8"
          />

          <h2 className="text-2xl font-bold mb-6 text-center">
            {stepTranslations.title}
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {step.options.map((option) => {
              const isSelected = selectedValue === option.id;
              return (
                <Button
                  key={option.id}
                  variant="outline"
                  onClick={() => handleOptionClick(option.id)}
                  className={`p-4 h-auto text-left justify-start transition-colors ${
                    isSelected
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'hover:bg-primary hover:text-primary-foreground hover:border-primary'
                  }`}
                >
                  {getOptionLabel(option.id)}
                </Button>
              );
            })}
          </div>

          {/* Custom input for "Other" options - with smooth transition */}
          <div
            className={`mt-4 space-y-3 overflow-hidden transition-all duration-200 ease-out ${
              showCustomInput ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <Input
              value={localCustomValue}
              onChange={(e) => setLocalCustomValue(e.target.value)}
              placeholder={t.poll.specify}
              autoFocus={showCustomInput}
              tabIndex={showCustomInput ? 0 : -1}
            />
            <Button
              onClick={handleCustomContinue}
              disabled={!canContinue}
              className="w-full"
              tabIndex={showCustomInput ? 0 : -1}
            >
              {t.poll.continue}
            </Button>
            {localCustomValue.length > 0 && localCustomValue.length < 3 && (
              <p className="text-xs text-muted-foreground text-center">
                {t.poll.minChars}
              </p>
            )}
          </div>
      </div>
    </div>
  );
}
