'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { HugeiconsIcon } from '@hugeicons/react';
import { SquareLock01Icon } from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BackButton } from '@/components/ui/back-button';
import { PollProgress } from './PollProgress';
import { useLanguage, LANGUAGE_FLAGS, type Language } from '@/i18n';
import { validateCustomInput, MAX_CUSTOM_INPUT_LENGTH } from '@/lib';
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

  // Validate custom input
  const validation = validateCustomInput(localCustomValue);

  const handleCustomContinue = () => {
    if (validation.isValid && onCustomChange) {
      onCustomChange(validation.sanitized);
    }
  };

  const handleCustomInputChange = (value: string) => {
    // Enforce max length during input
    if (value.length <= MAX_CUSTOM_INPUT_LENGTH) {
      setLocalCustomValue(value);
    }
  };

  // Threshold to start showing character count
  const SHOW_COUNT_FROM = 40;

  // Get helper message for display (errors, character count, or max reached)
  const getHelperMessage = (): string | null => {
    const len = localCustomValue.length;

    // Show nothing if empty
    if (len === 0) return null;

    // Show invalid chars error (priority)
    if (validation.error === 'invalidChars') {
      return t.poll.invalidChars;
    }

    // Show min chars hint
    if (len < 3) {
      return t.poll.minChars;
    }

    // Show max reached message
    if (len >= MAX_CUSTOM_INPUT_LENGTH) {
      return t.poll.maxChars;
    }

    // Show character count when approaching limit
    if (len >= SHOW_COUNT_FROM) {
      return `${len}/${MAX_CUSTOM_INPUT_LENGTH}`;
    }

    return null;
  };

  const helperMessage = getHelperMessage();

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

  // Parse label with "." separator into title and subtitle
  const parseLabel = (label: string): { title: string; subtitle?: string } => {
    const dotIndex = label.indexOf('.');
    if (dotIndex === -1) {
      return { title: label };
    }
    return {
      title: label.substring(0, dotIndex),
      subtitle: label.substring(dotIndex + 1),
    };
  };

  return (
    <div className="min-h-dvh bg-background text-foreground flex flex-col items-center p-6">
      {/* Fixed-position header area - stays at consistent height from top */}
      <div className="w-full max-w-md pt-8 sm:pt-56">
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

          <h2 className="text-2xl font-bold mb-2 text-center">
            {stepTranslations.title}
          </h2>
          {'subtitle' in stepTranslations && stepTranslations.subtitle && (
            <p className="text-sm text-muted-foreground mb-6 text-center">
              {stepTranslations.subtitle as string}
            </p>
          )}
          {!('subtitle' in stepTranslations) && <div className="mb-4" />}

          <div className="grid grid-cols-2 gap-3">
            {step.options.map((option) => {
              const isSelected = selectedValue === option.id;
              return (
                <Button
                  key={option.id}
                  variant="outline"
                  onClick={() => handleOptionClick(option.id)}
                  className={`group p-4 h-auto text-left justify-start whitespace-normal transition-colors ${
                    isSelected
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'hover:bg-primary hover:text-primary-foreground hover:border-primary'
                  }`}
                >
                  {option.logo && (
                    <Image
                      src={option.logo}
                      alt=""
                      width={20}
                      height={20}
                      className={`mr-0 shrink-0 ${option.logoInvert ? (isSelected ? 'brightness-0' : 'brightness-0 invert') : ''}`}
                    />
                  )}
                  {(() => {
                    const { title, subtitle } = parseLabel(getOptionLabel(option.id));
                    return subtitle ? (
                      <span className="flex flex-col">
                        <span>{title}</span>
                        <span className={`${isSelected ? 'text-primary-foreground/70' : 'text-muted-foreground group-hover:text-primary-foreground/70'}`}>{subtitle}</span>
                      </span>
                    ) : (
                      title
                    );
                  })()}
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
              onChange={(e) => handleCustomInputChange(e.target.value)}
              placeholder={t.poll.specify}
              autoFocus={showCustomInput}
              tabIndex={showCustomInput ? 0 : -1}
              maxLength={MAX_CUSTOM_INPUT_LENGTH}
            />
            <Button
              onClick={handleCustomContinue}
              disabled={!validation.isValid}
              className="w-full"
              tabIndex={showCustomInput ? 0 : -1}
            >
              {t.poll.continue}
            </Button>
            {helperMessage && (
              <p className="text-xs text-muted-foreground text-center">
                {helperMessage}
              </p>
            )}
          </div>
      </div>
    </div>
  );
}
