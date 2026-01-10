export const en = {
  // Navigation
  nav: {
    howItWorks: 'How It Works',
    benefits: 'Benefits',
  },

  // Footer
  footer: {
    tagline: 'AI-powered workout timer',
    product: 'Product',
    timerDemo: 'Timer Demo',
    getStarted: 'Get Started',
    resources: 'Resources',
    restoreFile: 'Restore File',
    legal: 'Legal',
    privacy: 'Privacy',
    terms: 'Terms',
    copyright: '© 2026 Workout Timer. All rights reserved.',
  },

  // Timer translations
  timer: {
    work: 'WORK',
    rest: 'REST',
    roundRest: 'REST',
    cooldown: 'COOLDOWN',
    complete: 'DONE',
    countdown: 'GET READY',
    loading: 'Loading workout...',
  },
  demo: {
    title: 'Workout Timer Demo',
    description: 'This timer loads workouts from URL parameters. Ask your AI to generate a workout link!',
    examplePrompt: 'Example prompt for your AI:',
    exampleText: 'Create a 20-minute upper body workout with dumbbells and give me a timer link',
    tryDemo: 'Start Demo',
    includes: 'Includes: tracker popup, equipment preview, video links',
    urlFormat: 'URL format:',
  },
  error: {
    title: 'Invalid Workout Link',
    description: 'The workout link appears to be incorrectly formatted.',
    apology: "We're sorry for this experience. This usually happens due to AI encoding issues, not something you did wrong.",
    hint: 'What to do:',
    suggestion: 'Ask your AI to regenerate the workout link. Make sure it uses base64 encoding.',
    commonReasons: {
      title: 'Common causes',
      badEncoding: 'AI used incorrect URL encoding',
      wrongModel: 'Model not following instructions properly',
      cyrillicIssue: 'Cyrillic characters not encoded correctly',
      truncatedLink: 'Link was cut off or truncated',
    },
    solutions: {
      title: 'Try these fixes',
      regenerate: 'Ask AI to regenerate the link with proper base64 encoding',
      switchModel: 'Try a thinking/reasoning model (GPT-5.2, Claude Opus, Gemini thinking)',
      useEnglish: 'If using Russian, try English exercise names first',
      checkLink: 'Make sure the full link was copied (should not end with "...")',
    },
    viewInstructions: 'View detailed instructions',
    specific: {
      control_characters: {
        title: 'Corrupted Link Data',
        description: 'The AI generated invalid characters in the workout data.',
        fix: 'Try Gemini Thinking mode, or switch to ChatGPT/Claude.',
      },
      invalid_utf8: {
        title: 'Encoding Error',
        description: 'Russian/Cyrillic text was not encoded correctly.',
        fix: 'Ask AI to use English exercise names, or try a thinking model.',
      },
      malformed_json: {
        title: 'Malformed Data',
        description: 'The workout data structure is broken.',
        fix: 'Ask AI to regenerate the link carefully.',
      },
      invalid_base64: {
        title: 'Invalid Link Format',
        description: 'The link encoding is incorrect.',
        fix: 'Ensure the entire link was copied. Ask AI to regenerate.',
      },
      schema_mismatch: {
        title: 'Missing Workout Fields',
        description: 'The workout is missing required information.',
        fix: 'Ask AI to include all required fields (name, rounds, exercises with duration).',
      },
      truncated: {
        title: 'Incomplete Link',
        description: 'The link appears to be cut off.',
        fix: 'Make sure you copied the entire link. Should not end with "..."',
      },
      unknown: {
        title: 'Unknown Error',
        description: 'Could not process the workout link.',
        fix: 'Try regenerating the link or use a different AI model.',
      },
    },
    geminiWarning: 'Gemini has known encoding issues. Consider using ChatGPT or Claude for more reliable links.',
  },
  controls: {
    pause: 'PAUSE',
    resume: 'CONTINUE',
    skip: 'SKIP',
    reset: 'Reset',
    start: 'START',
    startAgain: 'Start Again',
    newWorkout: 'New Workout',
  },
  workout: {
    next: 'Next:',
    restGetReady: 'Rest. Get ready!',
    roundComplete: 'Round',
    prepareRound: 'Prepare for round',
    greatWork: 'Great Work!',
    workoutComplete: 'complete',
    video: 'Video',
    rounds: 'rounds',
    min: 'min',
  },
  tracker: {
    title: 'Start Tracking',
    ready: "Ready, let's go!",
    whoop: 'Open WHOOP → Activity → Strength Training',
    apple: 'Start a workout on your Apple Watch',
    garmin: 'Start activity recording on your Garmin',
  },
  cooldown: [
    { name: 'Quad Stretch', duration: 30, desc: 'Standing, pull heel to glute, 15s per leg' },
    { name: 'Forward Fold', duration: 30, desc: 'Legs straight, reach for toes' },
    { name: 'Chest Stretch', duration: 30, desc: 'Hand on wall, rotate torso away' },
    { name: 'Cat-Cow', duration: 40, desc: 'On all fours, arch and round back' },
    { name: "Child's Pose", duration: 40, desc: 'Sit on heels, arms forward, relax' },
    { name: 'Lying Twist', duration: 40, desc: 'On back, knees to side, 20s per side' },
    { name: 'Hip Stretch', duration: 60, desc: 'Half pigeon, 30s per leg' },
  ],
  demoWorkout: {
    name: 'Full Feature Demo',
    exercises: [
      { name: 'Goblet Squats', reps: 'x12', weight: '16kg', equipment: 'dumbbell' },
      { name: 'Push-ups', reps: 'x10', equipment: 'bodyweight' },
      { name: 'Dumbbell Rows', reps: 'x10 each', weight: '12kg', equipment: 'dumbbell + bench' },
      { name: 'Plank', reps: '30 sec', equipment: 'mat' },
    ],
  },
  coachingStyles: {
    motivator: {
      description:
        'Be enthusiastic and encouraging. Use exclamation points, celebrate effort, pump up the user. Show genuine excitement about their workouts.',
      example:
        "Let's crush this! Here's your 20-minute power session that's going to get those muscles firing!",
    },
    drill: {
      description:
        'Be direct and efficient. No fluff, just facts. Get to the point quickly. Use short sentences. Mission-focused communication.',
      example: '20-minute upper body. 3 rounds. Execute.',
    },
    friendly: {
      description:
        "Be warm and conversational. Show genuine care, ask how they're feeling. Use a supportive, encouraging tone without being over the top.",
      example:
        "Hey! Ready for today's session? I put together something I think you'll enjoy based on what you've been working on.",
    },
    analytical: {
      description:
        'Be precise and data-focused. Explain the reasoning behind exercise selection, mention muscle groups, optimize for efficiency. Use technical language when appropriate.',
      example:
        'Based on your goals and available equipment, here is an optimized routine targeting compound movements for maximum efficiency.',
    },
  },

  // Poll translations
  poll: {
    back: 'Back',
    continue: 'Continue',
    specify: 'Please specify...',
    minChars: 'Minimum 3 characters',
    privacy: 'Your replies are analyzed and immediately discarded. Nothing is stored.',
    steps: {
      language: {
        title: 'What language do you prefer?',
        options: {
          en: 'English',
          ru: 'Русский',
        },
      },
      aiPlatform: {
        title: 'Which AI assistant do you use?',
        options: {
          chatgpt: 'ChatGPT',
          claude: 'Claude',
          gemini: 'Gemini',
          other: 'Other / Multiple',
        },
      },
      trainingType: {
        title: 'What type of training do you prefer?',
        options: {
          strength: 'Strength / Weights',
          hiit: 'HIIT / Cardio',
          yoga: 'Yoga / Mobility',
          mixed: 'Mixed / Variety',
        },
      },
      equipment: {
        title: 'What equipment do you have?',
        options: {
          bodyweight: 'None (bodyweight only)',
          home: 'Home gym (dumbbells, bands)',
          fullgym: 'Full gym access',
          custom: 'Let me specify...',
        },
      },
      weightPreference: {
        title: 'What weight for dumbbell bicep curls?',
        subtitle: 'Helps AI suggest appropriate weights for all exercises',
        options: {
          light: '2kg / 4lb',
          moderate: '7kg / 15lb',
          medium: '12kg / 25lb',
          heavy: '15kg / 35lb',
          veryHeavy: '20kg+ / 45lb+',
          unknown: "I don't know yet",
        },
      },
      goals: {
        title: 'What is your main goal?',
        options: {
          muscle: 'Build muscle',
          weight: 'Lose weight',
          endurance: 'Improve endurance',
          general: 'General fitness',
        },
      },
      tracker: {
        title: 'Do you use a fitness tracker?',
        options: {
          whoop: 'WHOOP',
          apple: 'Apple Watch',
          garmin: 'Garmin',
          other: 'Other',
          none: 'No tracker',
        },
      },
      coachingStyle: {
        title: 'How should your coach talk to you?',
        options: {
          motivator: 'Motivator',
          drill: 'Drill Sergeant',
          friendly: 'Friendly Coach',
          analytical: 'Data-Driven',
        },
      },
    },
  },

  // Landing page translations
  landing: {
    hero: {
      title: 'Your AI-Powered Personal Trainer',
      subtitle: 'Custom workouts in one click. Works with ChatGPT, Claude, Gemini. No subscription. No app to install.',
      cta: 'Supercharge AI Workouts',
      subtext: 'Lifetime access \u2022 No subscription',
    },
    features: {
      title: 'How It Works',
      steps: [
        { title: '1. Answer Questions', description: 'Tell us about your equipment, goals, and preferences' },
        { title: '2. Get Your Setup', description: 'Receive personalized instructions for your AI assistant' },
        { title: '3. Train Forever', description: 'Ask your AI for custom workouts anytime' },
      ],
    },
    benefits: {
      title: 'Why This Works',
      items: [
        { title: 'Knows Your Equipment', description: 'AI only suggests exercises you can actually do' },
        { title: 'Infinitely Flexible', description: '"Make it harder" / "I hurt my knee" / "Only 10 mins"' },
        { title: 'No App Required', description: 'Timer runs in browser, works on any device' },
        { title: 'Pay Once, Own Forever', description: 'No subscriptions, no recurring fees' },
      ],
    },
  },

  // Personal details form
  details: {
    title: 'Final step!',
    subtitle: 'Tell us a bit about yourself for personalization',
    privacyNotice: "For personalization only. We don't store or process your personal data.",
    personalizeOptional: 'Personalize experience (optional)',
    name: 'Name',
    yourName: 'Your name',
    email: 'Email',
    gender: 'Gender',
    notSpecified: 'Not specified',
    weight: 'Weight',
    height: 'Height',
    birthYear: 'Year of birth',
    limitations: 'Limitations / injuries',
    limitationsPlaceholder: 'E.g., lower back pain, knee injury...',
    customGuidelines: 'Custom guidelines',
    guidelinesPlaceholder: 'E.g., more heavy lifting, kinesthetic approach...',
    genderOptions: {
      male: 'Male',
      female: 'Female',
      other: 'Other',
      prefer_not_to_say: 'Prefer not to say',
    },
  },

  // Payment summary
  payment: {
    orderReady: 'Your order is ready',
    personalizedTimer: 'Personalized Timer',
    stepByStep: 'Step-by-Step Guide',
    stepByStepDesc: "We'll show you how to supercharge your AI coach",
    moreValue: 'More Value',
    lifetimeFeatures: 'Lifetime access to all new features',
    discounts: 'Discounts on other health-tech services',
    lifetimeNoSub: 'Lifetime access. No subscription.',
    checkout: 'Checkout',
    securePolar: 'Secure payment via Polar',
    tags: {
      bodyweight: 'Bodyweight',
      home: 'Home Gym',
      fullgym: 'Full Gym',
      custom: 'Custom',
      strength: 'Strength',
      hiit: 'HIIT',
      yoga: 'Yoga',
      mixed: 'Mixed',
      muscle: 'Muscle',
      weight: 'Weight Loss',
      endurance: 'Endurance',
      general: 'Fitness',
      tracker: 'Tracker',
    },
  },

  // Success page
  success: {
    allSet: "You're all set!",
    downloadReady: 'Your personalized setup file is ready to download.',
    downloadFile: 'Download Setup File',
    nextSteps: 'Next steps:',
    askWorkout: 'Ask for a workout!',
    openTimer: 'Open timer',
    detailedInstructions: 'Detailed instructions',
    modelTip: 'Pro tip',
    modelRecommendations: {
      chatgpt: 'GPT-5.2 works well. If you experience encoding issues, try the thinking or pro model.',
      claude: 'Sonnet or Opus recommended. Projects feature works best for persistent context.',
      gemini: 'Select the thinking model for more reliable link generation.',
      other: 'Use the most capable model available. Thinking models produce better formatted links.',
    },
    platformSteps: {
      chatgpt: ['Open chatgpt.com', 'Create a new GPT or project', 'Paste the file contents into instructions'],
      claude: ['Open claude.ai', 'Create a new project', 'Paste contents into Project Instructions'],
      gemini: ['Open Gemini', 'Create a new Gem', 'Paste contents into system instructions'],
      other: ['Open your AI assistant', 'Start a new chat', 'Paste file contents as your first message'],
    },
    restoreNote: 'Lost your file? You can re-download it anytime using your email.',
    restoreLink: 'Restore file',
  },

  // Common
  common: {
    required: '*',
  },

  // AI platform instructions
  aiInstructions: {
    setupSteps: 'Setup Steps',
    noFileYet: "Don't have your instructions file yet?",
    getFile: 'Get Your Setup File',
    howToUse: 'How to use with',
    modelRecommendation: 'Recommended Model',
    troubleshooting: {
      title: 'Troubleshooting',
      tips: [
        'Make sure you copied the entire link',
        'Ask AI to regenerate with proper base64 encoding',
        'Switch to a thinking/reasoning model',
        'If errors persist, ask AI to translate workout to English',
      ],
    },
    commonIssues: {
      title: 'Common Issues',
      encoding: {
        title: 'Encoding Problems',
        description: 'If links contain broken characters or don\'t work, ask AI to use URL-safe base64 encoding.',
      },
      truncation: {
        title: 'Truncated Links',
        description: 'Long workout links may get cut off. Ask AI to shorten exercise names or reduce exercises.',
      },
      cyrillic: {
        title: 'Cyrillic Text Issues',
        description: 'Russian text needs special handling. Use thinking models or ask for English exercise names.',
      },
    },
    screenshotAlt: 'Setup step screenshot',
    stepByStep: 'Step-by-step guide',
    chatgpt: {
      subtitle: 'Log in. Create GPT. Add file. Ask for a workout.',
      steps: [
        'Open chatgpt.com and sign in',
        'Create a new GPT or start a Project',
        'Paste your instructions file contents',
        'Ask for a workout!',
      ],
      modelTip: {
        title: 'Works best with GPT-5.2',
        subtitle: 'If it glitches, try the thinking or pro model.',
      },
    },
    claude: {
      subtitle: 'Log in. Create project. Add file. Ask for a workout.',
      steps: [
        'Open claude.ai and sign in',
        'Create a new Project',
        'Add your instructions to Project Instructions',
        'Ask for a workout!',
      ],
      modelTip: {
        title: 'Works best with Sonnet 4.5 or Opus 4.5',
        subtitle: 'If Sonnet glitches, try Opus. But Claude is very stable.',
      },
    },
    gemini: {
      subtitle: 'Log in. Create Gem. Add file. Ask for a workout.',
      steps: [
        'Open Gemini and sign in with Google',
        'Create a new Gem',
        'Paste your instructions into system instructions',
        'Ask for a workout!',
      ],
      modelTip: {
        title: 'Works best with Thinking model',
        subtitle: 'Flash 3.0 or "Fast" mode makes mistakes often.',
      },
    },
  },
};

export type TranslationKeys = typeof en;
