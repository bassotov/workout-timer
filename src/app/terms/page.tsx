import Link from 'next/link';

export default function TermsOfService() {
  return (
    <div className="min-h-dvh bg-slate-900 text-white">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/" className="text-slate-400 hover:text-white transition-colors mb-8 inline-block">
          ← Back to Home
        </Link>

        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>

        <div className="prose prose-invert prose-slate max-w-none space-y-6 text-slate-300">
          <p className="text-sm text-slate-500">Last updated: January 2025</p>

          <section>
            <h2 className="text-xl font-semibold text-white mt-8 mb-4">1. Agreement to Terms</h2>
            <p>
              By purchasing and using the Workout Timer service, you agree to be bound by these Terms of Service.
              If you do not agree to these terms, please do not use our service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mt-8 mb-4">2. Description of Service</h2>
            <p>
              Workout Timer provides personalized workout instructions and a browser-based timer tool.
              Upon purchase, you receive a downloadable file containing instructions for setting up
              your preferred AI assistant (ChatGPT, Claude, Gemini, etc.) to generate custom workouts.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mt-8 mb-4">3. Purchase and Payment</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>The service is offered as a one-time purchase of $10 USD.</li>
              <li>Payment is processed securely through Polar.</li>
              <li>Upon successful payment, you will receive immediate access to download your personalized setup file.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mt-8 mb-4">4. Refund Policy</h2>
            <p>
              Due to the digital nature of this product and instant delivery, all sales are final.
              If you experience technical issues, please contact us at pasha@barbash.in and we will
              work to resolve the problem.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mt-8 mb-4">5. User Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You are responsible for ensuring any exercise program is appropriate for your fitness level.</li>
              <li>Consult a healthcare provider before starting any new exercise program.</li>
              <li>The AI-generated workouts are suggestions and should be adapted to your individual needs and limitations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mt-8 mb-4">6. Intellectual Property</h2>
            <p>
              The setup file and instructions provided are for your personal use only.
              You may not redistribute, resell, or share the purchased content with others.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mt-8 mb-4">7. Disclaimer of Warranties</h2>
            <p>
              The service is provided &quot;as is&quot; without warranties of any kind. We do not guarantee
              specific fitness results. The effectiveness of workouts depends on many factors including
              your commitment, physical condition, and proper form.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mt-8 mb-4">8. Limitation of Liability</h2>
            <p>
              We shall not be liable for any injuries, damages, or losses resulting from your use of
              the workouts or timer. You exercise at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mt-8 mb-4">9. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Continued use of the service
              after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mt-8 mb-4">10. Contact</h2>
            <p>
              For questions about these Terms of Service, please contact us at{' '}
              <a href="mailto:pasha@barbash.in" className="text-emerald-400 hover:text-emerald-300">
                pasha@barbash.in
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
