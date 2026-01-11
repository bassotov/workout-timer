import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/">← Back to Home</Link>
        </Button>

        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

        <div className="space-y-8 text-muted-foreground">
          <p className="text-sm text-muted-foreground/60">Last updated: January 2026</p>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">1. Information We Collect</h2>
            <p className="mb-4">We collect minimal information necessary to provide our service:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-foreground">Email address:</strong> Required for purchase and delivery of your setup file.</li>
              <li><strong className="text-foreground">Name:</strong> Optional, used only for personalization of your workout instructions.</li>
              <li><strong className="text-foreground">Preferences:</strong> Your answers to the questionnaire (equipment, goals, etc.) are used to generate your personalized setup file.</li>
              <li><strong className="text-foreground">Payment information:</strong> Processed securely by Polar; we do not store your payment details.</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">2. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To generate and deliver your personalized workout setup file.</li>
              <li>To process your payment through our payment provider (Polar).</li>
              <li>To respond to support inquiries.</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">3. Data Storage</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your questionnaire answers are stored locally in your browser until purchase completion.</li>
              <li>After download, you can clear this data from your browser.</li>
              <li>We do not maintain a database of user workout preferences.</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">4. Third-Party Services</h2>
            <p className="mb-4">We use the following third-party services:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-foreground">Polar:</strong> Payment processing. See their privacy policy at polar.sh.</li>
              <li><strong className="text-foreground">Vercel:</strong> Website hosting. See their privacy policy at vercel.com.</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">5. Cookies and Tracking</h2>
            <p>
              We use minimal cookies necessary for the website to function. We do not use
              advertising cookies or third-party tracking scripts.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">6. Data Sharing</h2>
            <p>
              We do not sell, trade, or share your personal information with third parties,
              except as necessary to process payments or as required by law.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">7. Your Rights</h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Request information about what data we have about you.</li>
              <li>Request deletion of your data.</li>
              <li>Opt out of any marketing communications.</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">8. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your information.
              However, no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">9. Children&apos;s Privacy</h2>
            <p>
              Our service is not intended for children under 13. We do not knowingly collect
              information from children under 13.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">10. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any
              changes by posting the new policy on this page.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">11. Contact</h2>
            <p>
              For questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:support@workout-timer.app" className="text-primary hover:text-primary/80 transition-colors">
                support@workout-timer.app
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
