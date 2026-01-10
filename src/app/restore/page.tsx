'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function RestorePage() {
  const [orderId, setOrderId] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!orderId.trim()) {
      setError('Please enter your order ID');
      return;
    }

    setStatus('loading');
    setError('');

    try {
      const response = await fetch(`/api/restore?order_id=${encodeURIComponent(orderId.trim())}`);

      if (!response.ok) {
        const data = await response.json();
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

  return (
    <main className="min-h-dvh bg-background text-foreground flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Restore Your File</CardTitle>
            <CardDescription>
              Enter your order ID to download your personalized SKILL.md file
            </CardDescription>
          </CardHeader>
          <CardContent>
            {status === 'success' ? (
              <div className="text-center space-y-4">
                <div className="text-4xl">🎉</div>
                <p className="text-green-500 font-medium">File downloaded successfully!</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setStatus('idle');
                    setOrderId('');
                  }}
                >
                  Download Again
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    type="text"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder="Enter your order ID"
                    disabled={status === 'loading'}
                    className={error ? 'border-destructive' : ''}
                  />
                  {error && (
                    <p className="text-destructive text-sm mt-1">{error}</p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Generating...' : 'Download File'}
                </Button>
                <p className="text-sm text-muted-foreground text-center">
                  Find your order ID in your Polar purchase confirmation email
                </p>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
