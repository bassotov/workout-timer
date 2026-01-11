'use client';

import { useState, type KeyboardEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { EmailInput } from './EmailInput';
import { DataConsentSelector } from './DataConsentSelector';
import { BackButton } from '@/components/ui/back-button';
import { useLanguage } from '@/i18n';
import { isValidEmail } from '@/lib/validation';
import type { PollAnswers, GenderId } from '@/types';

const GENDER_IDS: GenderId[] = ['male', 'female', 'other', 'prefer_not_to_say'];

// Input validation helpers
const handleNumericInput = (e: KeyboardEvent<HTMLInputElement>, allowDecimal = true) => {
  const allowedKeys = ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'Home', 'End'];
  if (allowedKeys.includes(e.key)) return;

  // Allow decimal point (once)
  if (allowDecimal && e.key === '.') {
    if (e.currentTarget.value.includes('.')) {
      e.preventDefault();
    }
    return;
  }

  // Only allow digits
  if (!/^\d$/.test(e.key)) {
    e.preventDefault();
  }
};

// Unit switch component for consistent styling
function UnitSwitch({
  options,
  value,
  onChange,
}: {
  options: readonly [string, string];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex rounded-md border border-input overflow-hidden shrink-0">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`w-10 h-9 text-sm font-medium transition-colors ${
            value === opt
              ? 'bg-primary text-primary-foreground'
              : 'bg-background hover:bg-muted'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

interface PersonalDetailsFormProps {
  answers: PollAnswers;
  onBack: () => void;
  onContinue: () => void;
  setAnswer: <K extends keyof PollAnswers>(field: K, value: PollAnswers[K]) => void;
}

export function PersonalDetailsForm({
  answers,
  onBack,
  onContinue,
  setAnswer,
}: PersonalDetailsFormProps) {
  const { t } = useLanguage();
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
  const [heightUnit, setHeightUnit] = useState<'cm' | 'in'>('cm');

  const isValid = answers.name.trim().length > 0 && isValidEmail(answers.email) && answers.dataConsent !== undefined;

  const handleWeightChange = (value: string) => {
    if (value) {
      setAnswer('weight', `${value} ${weightUnit}`);
    } else {
      setAnswer('weight', undefined);
    }
  };

  const handleHeightChange = (value: string) => {
    if (value) {
      setAnswer('height', `${value} ${heightUnit}`);
    } else {
      setAnswer('height', undefined);
    }
  };

  // Extract numeric value from stored weight/height
  const weightValue = answers.weight?.replace(/[^\d.]/g, '') || '';
  const heightValue = answers.height?.replace(/[^\d.]/g, '') || '';

  return (
    <div className="min-h-dvh bg-background text-foreground flex flex-col items-center p-6">
      <div className="flex-1 flex flex-col max-w-md w-full pt-8">
        <BackButton onClick={onBack} className="mb-6" />
        <h2 className="text-2xl font-bold mb-2">{t.details.title}</h2>
        <p className="text-muted-foreground mb-4">{t.details.subtitle}</p>

        <div className="space-y-5 flex-1">
          {/* Required: Name */}
          <div>
            <Label htmlFor="name" className="text-sm font-medium">
              {t.details.name} <span className="text-destructive">{t.common.required}</span>
            </Label>
            <Input
              id="name"
              value={answers.name}
              onChange={(e) => setAnswer('name', e.target.value)}
              placeholder={t.details.yourName}
              className="mt-1"
              required
            />
          </div>

          {/* Required: Email */}
          <div>
            <Label htmlFor="email" className="text-sm font-medium">
              {t.details.email} <span className="text-destructive">{t.common.required}</span>
            </Label>
            <div className="mt-1">
              <EmailInput
                value={answers.email}
                onChange={(value) => setAnswer('email', value)}
              />
            </div>
          </div>

          {/* Divider - Personalize experience (optional) */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-3 text-xs text-muted-foreground">
                {t.details.personalizeOptional}
              </span>
            </div>
          </div>

          {/* Gender + Birth Year row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="gender" className="text-sm font-medium text-muted-foreground">
                {t.details.gender}
              </Label>
              <select
                id="gender"
                value={answers.gender || ''}
                onChange={(e) => setAnswer('gender', (e.target.value || undefined) as GenderId | undefined)}
                className="mt-1 w-full h-9 px-3 rounded-md border border-input bg-background text-sm"
              >
                <option value="">{t.details.notSpecified}</option>
                {GENDER_IDS.map((id) => (
                  <option key={id} value={id}>
                    {t.details.genderOptions[id]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="birthYear" className="text-sm font-medium text-muted-foreground">
                {t.details.birthYear}
              </Label>
              <Input
                id="birthYear"
                inputMode="numeric"
                value={answers.birthYear || ''}
                onChange={(e) => setAnswer('birthYear', e.target.value || undefined)}
                onKeyDown={(e) => handleNumericInput(e, false)}
                placeholder="1990"
                maxLength={4}
                className="mt-1"
              />
            </div>
          </div>

          {/* Weight + Height row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="weight" className="text-sm font-medium text-muted-foreground">
                {t.details.weight}
              </Label>
              <div className="mt-1 flex gap-1">
                <Input
                  id="weight"
                  inputMode="decimal"
                  value={weightValue}
                  onChange={(e) => handleWeightChange(e.target.value)}
                  onKeyDown={(e) => handleNumericInput(e, true)}
                  placeholder={weightUnit === 'kg' ? '75' : '165'}
                  className="flex-1 min-w-0"
                />
                <UnitSwitch
                  options={['kg', 'lbs'] as const}
                  value={weightUnit}
                  onChange={(v) => setWeightUnit(v as 'kg' | 'lbs')}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="height" className="text-sm font-medium text-muted-foreground">
                {t.details.height}
              </Label>
              <div className="mt-1 flex gap-1">
                <Input
                  id="height"
                  inputMode="decimal"
                  value={heightValue}
                  onChange={(e) => handleHeightChange(e.target.value)}
                  onKeyDown={(e) => handleNumericInput(e, true)}
                  placeholder={heightUnit === 'cm' ? '180' : '71'}
                  className="flex-1 min-w-0"
                />
                <UnitSwitch
                  options={['cm', 'in'] as const}
                  value={heightUnit}
                  onChange={(v) => setHeightUnit(v as 'cm' | 'in')}
                />
              </div>
            </div>
          </div>

          {/* Optional: Limitations */}
          <div>
            <Label htmlFor="limitations" className="text-sm font-medium text-muted-foreground">
              {t.details.limitations}
            </Label>
            <Textarea
              id="limitations"
              value={answers.limitations}
              onChange={(e) => setAnswer('limitations', e.target.value)}
              placeholder={t.details.limitationsPlaceholder}
              className="mt-1 min-h-[80px]"
            />
          </div>

          {/* Optional: Custom Guidelines */}
          <div>
            <Label htmlFor="customGuidelines" className="text-sm font-medium text-muted-foreground">
              {t.details.customGuidelines}
            </Label>
            <Textarea
              id="customGuidelines"
              value={answers.customGuidelines || ''}
              onChange={(e) => setAnswer('customGuidelines', e.target.value || undefined)}
              placeholder={t.details.guidelinesPlaceholder}
              className="mt-1 min-h-[80px]"
            />
          </div>
        </div>

        {/* Data consent - required, right above continue */}
        <div className="mt-6">
          <DataConsentSelector
            value={answers.dataConsent}
            onChange={(value) => setAnswer('dataConsent', value)}
          />
        </div>

        <Button
          onClick={onContinue}
          disabled={!isValid}
          className="w-full mt-4 py-6 text-lg"
        >
          {t.poll.continue}
        </Button>
      </div>
    </div>
  );
}
