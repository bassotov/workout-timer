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
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <div className="text-4xl text-center mb-2">⌚</div>
          <DialogTitle className="text-center">{t.trackerTitle}</DialogTitle>
          <DialogDescription className="text-center">
            {getTrackerMessage(tracker, t)}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col gap-2 sm:flex-col">
          <Button onClick={onStart} className="w-full">
            {t.trackerReady}
          </Button>
          <Button variant="outline" onClick={onClose} className="w-full">
            ← {t.reset}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
