'use client';

import { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ShieldCheck, Delete02Icon, ArrowDown01Icon } from '@hugeicons/core-free-icons';
import { useLanguage } from '@/i18n';
import type { DataConsentChoice } from '@/types';

interface DataConsentSelectorProps {
  value: DataConsentChoice | undefined;
  onChange: (value: DataConsentChoice) => void;
}

export function DataConsentSelector({ value, onChange }: DataConsentSelectorProps) {
  const { t } = useLanguage();
  const [expandedId, setExpandedId] = useState<DataConsentChoice | null>(null);

  const options = [
    {
      id: 'save' as const,
      icon: ShieldCheck,
      title: t.details.dataConsent.save.title,
      description: t.details.dataConsent.save.description,
      subtext: t.details.dataConsent.save.reassurance,
      selectedStyles: 'border-emerald-500/50 bg-emerald-500/5',
      iconColor: 'text-emerald-500',
      subtextColor: 'text-emerald-600',
    },
    {
      id: 'discard' as const,
      icon: Delete02Icon,
      title: t.details.dataConsent.discard.title,
      description: t.details.dataConsent.discard.description,
      subtext: t.details.dataConsent.discard.warning,
      selectedStyles: 'border-amber-500/50 bg-amber-500/5',
      iconColor: 'text-amber-500',
      subtextColor: 'text-amber-600',
    },
  ];

  const handleClick = (optionId: DataConsentChoice) => {
    if (value === optionId && expandedId === optionId) {
      // Already selected and expanded - collapse it
      setExpandedId(null);
    } else {
      // Select and expand
      onChange(optionId);
      setExpandedId(optionId);
    }
  };

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-muted-foreground">
        {t.details.dataConsent.title} <span className="text-destructive">*</span>
      </p>
      {options.map((option) => {
        const isSelected = value === option.id;
        const isExpanded = expandedId === option.id;

        return (
          <div
            key={option.id}
            className={`rounded-lg border-2 transition-all overflow-hidden ${
              isSelected
                ? option.selectedStyles
                : 'border-border hover:border-muted-foreground/30'
            }`}
          >
            {/* Collapsed header - always visible */}
            <button
              type="button"
              onClick={() => handleClick(option.id)}
              className="w-full px-3 py-2.5 text-left flex items-center gap-2"
            >
              {/* Radio indicator */}
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                isSelected ? option.selectedStyles.split(' ')[0] : 'border-muted-foreground/40'
              }`}>
                {isSelected && (
                  <div className={`w-2 h-2 rounded-full ${
                    option.id === 'save' ? 'bg-emerald-500' : 'bg-amber-500'
                  }`} />
                )}
              </div>

              {/* Icon */}
              <HugeiconsIcon
                icon={option.icon}
                size={18}
                className={`shrink-0 ${isSelected ? option.iconColor : 'text-muted-foreground'}`}
              />

              {/* Title only */}
              <span className="flex-1 font-medium text-sm">{option.title}</span>

              {/* Expand indicator */}
              <HugeiconsIcon
                icon={ArrowDown01Icon}
                size={16}
                className={`shrink-0 text-muted-foreground transition-transform ${
                  isExpanded ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Expanded content */}
            {isExpanded && (
              <div className="px-3 pb-3 pt-1 border-t border-border/50">
                <p className="text-sm text-muted-foreground">{option.description}</p>
                <p className={`text-xs mt-2 ${option.subtextColor}`}>
                  {option.subtext}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
