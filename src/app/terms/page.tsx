import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function TermsOfService() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/">← Back to Home</Link>
        </Button>

        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>

        <div className="space-y-8 text-muted-foreground">
          <p className="text-sm text-muted-foreground/60">Last updated: January 2026</p>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">1. Agreement to Terms</h2>
            <p>
              By purchasing and using the Workout Timer service, you agree to be bound by these Terms of Service.
              If you do not agree to these terms, please do not use our service.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">2. Description of Service</h2>
            <p>
              Workout Timer provides personalized workout instructions and a browser-based timer tool.
              Upon purchase, you receive a downloadable file containing instructions for setting up
              your preferred AI assistant (ChatGPT, Claude, Gemini, etc.) to generate custom workouts.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">3. Purchase and Payment</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>The service is offered as a one-time purchase of $10 USD.</li>
              <li>Payment is processed securely through Polar.</li>
              <li>Upon successful payment, you will receive immediate access to download your personalized setup file.</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">4. Refund Policy</h2>
            <p className="mb-4">
              Payments are processed by Polar as our Merchant of Record. Refund requests are handled
              according to Polar&apos;s refund policy:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Refund requests may be submitted within 60 days of purchase.</li>
              <li>Refunds are issued at Polar&apos;s discretion.</li>
              <li>Payment processing fees are non-refundable.</li>
            </ul>
            <p>
              We&apos;re committed to customer satisfaction. If you experience any issues with your purchase,
              please contact us at{' '}
              <a href="mailto:support@workout-timer.app" className="text-primary hover:text-primary/80 transition-colors">
                support@workout-timer.app
              </a>{' '}
              and we&apos;ll work to resolve the problem.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">5. User Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You are responsible for ensuring any exercise program is appropriate for your fitness level.</li>
              <li>Consult a healthcare provider before starting any new exercise program.</li>
              <li>The AI-generated workouts are suggestions and should be adapted to your individual needs and limitations.</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">6. Intellectual Property</h2>
            <p>
              The setup file and instructions provided are for your personal use only.
              You may not redistribute, resell, or share the purchased content with others.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">7. Disclaimer of Warranties</h2>
            <p>
              The service is provided &quot;as is&quot; without warranties of any kind. We do not guarantee
              specific fitness results. The effectiveness of workouts depends on many factors including
              your commitment, physical condition, and proper form.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">8. Limitation of Liability</h2>
            <p>
              We shall not be liable for any injuries, damages, or losses resulting from your use of
              the workouts or timer. You exercise at your own risk.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">9. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Continued use of the service
              after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">10. Contact</h2>
            <p>
              For questions about these Terms of Service, please contact us at{' '}
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
