'use client';

import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/i18n';

interface ModelRecommendationsProps {
  platform: 'chatgpt' | 'claude' | 'gemini' | 'other';
}

export function ModelRecommendations({ platform }: ModelRecommendationsProps) {
  const { t } = useLanguage();

  return (
    <Card className="bg-primary/5 border-primary/20 mb-4 text-left">
      <CardContent className="pt-4">
        <div className="flex items-start gap-3">
          <span className="text-xl">💡</span>
          <div>
            <p className="font-medium text-sm">{t.success.modelTip}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {t.success.modelRecommendations[platform]}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
