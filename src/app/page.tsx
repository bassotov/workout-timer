'use client';

import { useEffect, useState } from 'react';
import { usePoll } from '@/hooks';
import { validateEnv, POLL_STEPS } from '@/config';
import { getVisibleSteps, getVisibleStepIndex, getStoredValue, STORAGE_KEYS } from '@/lib';
import { Header, Footer } from '@/components/ui';
import {
  Hero,
  HowItWorks,
  Benefits,
  ForWhom,
  Pricing,
  Testimonials,
  FinalCTA,
  PollStep,
  PersonalDetailsForm,
  PaymentSummary,
  SuccessContent,
} from '@/components/landing';

export default function LandingPage() {
  const {
    page,
    pollStep,
    answers,
    isFirstStep,
    goToLanding,
    goToPoll,
    goToDetails,
    goToPayment,
    goToSuccess,
    nextStep,
    prevStep,
    setAnswer,
    currentStepConfig,
  } = usePoll();

  const [isPurchaseVerified, setIsPurchaseVerified] = useState(false);

  useEffect(() => {
    validateEnv();

    const urlParams = new URLSearchParams(window.location.search);

    // Check for start=poll parameter to go directly to poll
    if (urlParams.get('start') === 'poll') {
      goToPoll();
      // Clean up URL
      window.history.replaceState({}, '', '/');
    }

    // Check for success redirect from Polar
    if (urlParams.get('success') === 'true') {
      // Check if purchase was verified (set by /success page with checkout_id)
      const verification = getStoredValue<{ timestamp: number; checkoutId: string } | null>(
        STORAGE_KEYS.PURCHASE_VERIFIED,
        null
      );

      // Verification is valid if it exists and was set within the last hour
      const isValid = verification && Date.now() - verification.timestamp < 60 * 60 * 1000;
      setIsPurchaseVerified(!!isValid);

      goToSuccess();
    }
  }, [goToSuccess, goToPoll]);

  const handlePayment = async () => {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Checkout error:', data.error);
        alert(data.error || 'Failed to initiate checkout');
        return;
      }

      window.location.href = data.checkoutUrl;
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to initiate checkout. Please try again.');
    }
  };

  const handlePollSelect = (value: string) => {
    const field = currentStepConfig.id;
    setAnswer(field, value);

    // Build updated answers for nextStep (state won't be updated yet)
    const updatedAnswers: Record<string, string> = { [field]: value };

    // When equipment changes to a different value, clear weightPreference
    if (field === 'equipment' && value !== answers.equipment) {
      setAnswer('weightPreference', '');
      updatedAnswers.weightPreference = '';
    }

    // Check if this option has allowCustom - if so, don't auto-advance
    const selectedOption = currentStepConfig.options.find((opt) => opt.id === value);
    if (selectedOption?.allowCustom) {
      return; // Wait for custom input + Continue button
    }

    // Auto-advance after selection, go to details after last step
    setTimeout(() => {
      if (pollStep === POLL_STEPS.length - 1) {
        goToDetails();
      } else {
        nextStep(updatedAnswers);
      }
    }, 200);
  };

  // Handle custom "other" input continue
  const handleCustomContinue = (customValue: string) => {
    const field = currentStepConfig.id;

    // Store custom value in appropriate field
    if (field === 'equipment') {
      setAnswer('customEquipment', customValue);
    } else if (field === 'aiPlatform') {
      setAnswer('customAiPlatform', customValue);
    } else if (field === 'tracker') {
      setAnswer('customTracker', customValue);
    } else if (field === 'trainingType') {
      setAnswer('customTrainingType', customValue);
    } else if (field === 'goals') {
      setAnswer('customGoals', customValue);
    }

    // Advance to next step or details
    setTimeout(() => {
      if (pollStep === POLL_STEPS.length - 1) {
        goToDetails();
      } else {
        nextStep();
      }
    }, 200);
  };

  // Success page
  if (page === 'success') {
    return (
      <main className="min-h-dvh bg-background">
        <SuccessContent answers={answers} verified={isPurchaseVerified} onStartPoll={goToPoll} />
      </main>
    );
  }

  // Payment summary page
  if (page === 'payment') {
    return (
      <main className="min-h-dvh bg-background">
        <PaymentSummary
          answers={answers}
          onBack={goToDetails}
          onPayment={handlePayment}
          onDevSkip={goToSuccess}
        />
      </main>
    );
  }

  // Personal details form (after poll, before payment)
  if (page === 'details') {
    return (
      <PersonalDetailsForm
        answers={answers}
        onBack={goToPoll}
        onContinue={goToPayment}
        setAnswer={setAnswer}
      />
    );
  }

  // Poll flow
  if (page === 'poll') {
    // Get custom value for current step if applicable
    const customValueMap: Record<string, string | undefined> = {
      equipment: answers.customEquipment,
      aiPlatform: answers.customAiPlatform,
      tracker: answers.customTracker,
      trainingType: answers.customTrainingType,
      goals: answers.customGoals,
    };

    return (
      <PollStep
        step={currentStepConfig}
        selectedValue={answers[currentStepConfig.id]}
        customValue={customValueMap[currentStepConfig.id]}
        onSelect={handlePollSelect}
        onCustomChange={handleCustomContinue}
        onBack={isFirstStep ? goToLanding : prevStep}
        currentStep={getVisibleStepIndex(pollStep, answers)}
        totalSteps={getVisibleSteps(answers)}
      />
    );
  }

  // Landing page (default)
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <Header onCtaClick={goToPoll} />
      <div className="pt-14 md:pt-28">
        <section id="hero">
          <Hero onStart={goToPoll} />
        </section>
        <HowItWorks />
        <Benefits />
        <ForWhom />
        <Pricing />
        <Testimonials />
        <FinalCTA onStart={goToPoll} />
      </div>
      <Footer />
    </main>
  );
}
