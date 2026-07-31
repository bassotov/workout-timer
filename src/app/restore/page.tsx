'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Header } from '@/components/ui';
import { useLanguage } from '@/i18n';

type Status = 'idle' | 'loading' | 'success' | 'error' | 'discarded';

export default function RestorePage() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [orderId, setOrderId] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const downloadFile = async () => {
    setStatus('loading');
    setError('');

    try {
      const query = new URLSearchParams({ email: email.trim(), order: orderId.trim() });
      const response = await fetch(`/api/restore?${query}`);

      if (!response.ok) {
        const data = await response.json();

        // Handle discarded data case
        if (response.status === 410 && data.code === 'DATA_DISCARDED') {
          setStatus('discarded');
          return;
        }

        throw new Error(data.error || 'Failed to restore file');
      }

      // Get filename from Content-Disposition header
      const disposition = response.headers.get('Content-Disposition');
      const filenameMatch = disposition?.match(/filename="(.+)"/);
      const filename = filenameMatch?.[1] || 'WORKOUT_INSTRUCTIONS.md';

      // Download the file
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setError(t.restore.errors.emailRequired);
      return;
    }

    // Basic email validation
    if (!email.includes('@') || !email.includes('.')) {
      setError(t.restore.errors.emailInvalid);
      return;
    }

    if (!orderId.trim()) {
      setError(t.restore.errors.orderRequired);
      return;
    }

    downloadFile();
  };

  const resetForm = () => {
    setStatus('idle');
    setEmail('');
    setOrderId('');
    setError('');
  };

  return (
    <main className="min-h-dvh bg-background text-foreground flex flex-col">
      <Header variant="internal" />
      <div className="flex-1 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{t.restore.title}</CardTitle>
            <CardDescription>{t.restore.subtitle}</CardDescription>
          </CardHeader>
          <CardContent>
            {status === 'success' ? (
              <div className="text-center space-y-4">
                <div className="text-4xl">🎉</div>
                <p className="text-green-500 font-medium">{t.restore.success}</p>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={resetForm}>
                    {t.restore.back}
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={downloadFile}>
                    {t.restore.downloadAgain}
                  </Button>
                </div>
              </div>
            ) : status === 'discarded' ? (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl mb-2">📁</div>
                  <h3 className="font-semibold text-lg">{t.restore.discarded.title}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{t.restore.discarded.message}</p>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 space-y-2">
                  <p className="text-amber-600 dark:text-amber-400 text-sm">
                    {t.restore.discarded.cannotRestore}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t.restore.discarded.contactSupport}
                  </p>
                </div>

                <Button variant="outline" className="w-full" onClick={resetForm}>
                  {t.restore.back}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-3">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.restore.emailPlaceholder}
                    disabled={status === 'loading'}
                    className={error ? 'border-destructive' : ''}
                  />
                  <div>
                    <Input
                      type="text"
                      value={orderId}
                      onChange={(e) => setOrderId(e.target.value)}
                      placeholder={t.restore.orderPlaceholder}
                      disabled={status === 'loading'}
                      className={error ? 'border-destructive' : ''}
                    />
                    <p className="text-muted-foreground text-xs mt-1.5">{t.restore.orderHint}</p>
                  </div>
                  {error && (
                    <p className="text-destructive text-sm">{error}</p>
                  )}
                </div>
                <Button type="submit" className="w-full" disabled={status === 'loading'}>
                  {status === 'loading' ? t.restore.loading : t.restore.downloadButton}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
      </div>
    </main>
  );
}
