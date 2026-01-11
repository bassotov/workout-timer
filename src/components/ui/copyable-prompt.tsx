'use client';

import { useState, useCallback } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Copy01Icon, Tick01Icon } from '@hugeicons/core-free-icons';
import { cn } from '@/lib/utils';

interface CopyablePromptProps {
  text: string;
  className?: string;
}

export function CopyablePrompt({ text, className }: CopyablePromptProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      className={cn(
        'group relative w-full text-left rounded-lg border border-border/50 bg-muted/30',
        'px-3 py-2.5 pr-10 text-sm transition-colors hover:bg-muted/50 hover:border-border',
        'focus:outline-none focus:ring-2 focus:ring-primary/20',
        className
      )}
    >
      <span className="text-muted-foreground leading-relaxed">{text}</span>

      <span className="absolute right-2.5 top-1/2 -translate-y-1/2">
        {copied ? (
          <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
            <HugeiconsIcon icon={Tick01Icon} className="h-4 w-4" />
          </span>
        ) : (
          <HugeiconsIcon
            icon={Copy01Icon}
            className="h-4 w-4 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors"
          />
        )}
      </span>
    </button>
  );
}