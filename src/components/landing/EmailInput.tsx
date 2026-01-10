'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/i18n';
import { isValidEmail } from '@/lib/validation';
import { cn } from '@/lib/utils';

interface EmailInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function EmailInput({ value, onChange, placeholder }: EmailInputProps) {
  const { language } = useLanguage();
  const [touched, setTouched] = useState(false);

  const showError = touched && value && !isValidEmail(value);
  const showValid = touched && value && isValidEmail(value);

  const errorMessage = language === 'ru' ? 'Введите корректный email' : 'Please enter a valid email';

  return (
    <div>
      <div className="relative">
        <Input
          type="email"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => setTouched(true)}
          placeholder={placeholder || 'you@example.com'}
          className={cn(
            'pr-10',
            showError && 'border-destructive focus-visible:border-destructive',
            showValid && 'border-green-500 focus-visible:border-green-500'
          )}
          required
        />
        {showValid && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
            &#10003;
          </span>
        )}
        {showError && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-destructive">
            &#10007;
          </span>
        )}
      </div>
      {showError && (
        <p className="text-destructive text-sm mt-1">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
