'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

interface TrackerPopupTranslations {
  trackerTitle: string;
  trackerReady: string;
  trackerWhoop: string;
  trackerApple: string;
  trackerGarmin: string;
  trackerOura: string;
  trackerCustom: string; // Template with {name} placeholder
  reset: string;
}

interface TrackerPopupProps {
  open: boolean;
  tracker: string | undefined;
  onStart: () => void;
  onClose: () => void;
  translations: TrackerPopupTranslations;
}

function getTrackerMessage(tracker: string | undefined, t: TrackerPopupTranslations): string {
  switch (tracker?.toLowerCase()) {
    case 'whoop':
      return t.trackerWhoop;
    case 'apple':
    case 'apple watch':
      return t.trackerApple;
    case 'garmin':
      return t.trackerGarmin;
    case 'oura':
    case 'oura ring':
      return t.trackerOura;
    case 'none':
    case undefined:
      return '';
    default:
      // Custom tracker name - use template
      return t.trackerCustom.replace('{name}', tracker!);
  }
}

export function TrackerPopup({
  open,
  tracker,
  onStart,
  onClose,
  translations: t,
}: TrackerPopupProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent showCloseButton={false} className="max-w-xs sm:max-w-sm">
        <DialogHeader>
          <div className="text-5xl text-center mb-2">⌚</div>
          <DialogTitle className="text-center text-xl">{t.trackerTitle}</DialogTitle>
          <DialogDescription className="text-center text-base">
            {getTrackerMessage(tracker, t)}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col gap-3 sm:flex-col mt-2">
          <Button onClick={onStart} size="lg" className="w-full text-lg py-6">
            {t.trackerReady}
          </Button>
          <Button variant="outline" onClick={onClose} size="lg" className="w-full text-base py-5">
            ← {t.reset}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
