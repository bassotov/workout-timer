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
    legal: 'Legal',
    privacy: 'Privacy',
    terms: 'Terms',
    copyright: '© 2025 Workout Timer. All rights reserved.',
  },

  // Timer translations
  timer: {
    work: 'WORK',
    rest: 'REST',
    roundRest: 'REST',
    cooldown: 'COOLDOWN',
    complete: 'DONE',
    loading: 'Loading workout...',
  },
  demo: {
    title: 'Workout Timer',
    description: 'This timer loads workouts from URL parameters. Ask your AI to generate a workout link!',
    examplePrompt: 'Example prompt for your AI:',
    exampleText: 'Create a 20-minute upper body workout with dumbbells and give me a timer link',
    tryDemo: 'Try Full Feature Demo',
    includes: 'Includes: tracker popup, equipment preview, video links',
    urlFormat: 'URL format:',
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
    platformSteps: {
      chatgpt: ['Open chatgpt.com', 'Create a new GPT or project', 'Paste the file contents into instructions'],
      claude: ['Open claude.ai', 'Create a new project', 'Paste contents into Project Instructions'],
      gemini: ['Open Gemini', 'Create a new Gem', 'Paste contents into system instructions'],
      other: ['Open your AI assistant', 'Start a new chat', 'Paste file contents as your first message'],
    },
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
    chatgpt: {
      description: 'Learn how to set up your personalized workout instructions in ChatGPT using GPTs or Projects.',
      steps: [
        'Open chatgpt.com and sign in',
        'Create a new GPT or start a Project',
        'Paste your instructions file contents into the instructions',
        'Ask ChatGPT to create a workout for you!',
      ],
    },
    claude: {
      description: 'Set up Claude as your personal trainer using Projects for persistent workout context.',
      steps: [
        'Open claude.ai and sign in',
        'Create a new Project',
        'Add your instructions file to Project Instructions',
        'Start chatting and ask for workouts!',
      ],
    },
    gemini: {
      description: 'Configure Google Gemini with custom Gems for AI-powered workout generation.',
      steps: [
        'Open Gemini and sign in with Google',
        'Create a new Gem',
        'Paste your instructions file into system instructions',
        'Use your Gem to generate workouts!',
      ],
    },
  },
};

export type TranslationKeys = typeof en;
