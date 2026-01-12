export const en = {
  // Navigation
  nav: {
    howItWorks: 'How It Works',
    benefits: 'Benefits',
    pricing: 'Pricing',
    guide: 'Guide',
    restore: 'Restore',
  },

  // Footer
  footer: {
    tagline: 'AI-powered workout timer',
    product: 'Product',
    timerDemo: 'Timer Demo',
    getStarted: 'Get Started',
    help: 'Help',
    gettingStartedGuide: 'Quick Guide',
    restoreFile: 'Restore File',
    troubleshooting: 'Troubleshooting',
    getHelp: 'Get Help',
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
    troubleshootingTitle: 'Common Errors You Might Face',
    whyTitle: 'Why this happened?',
    whyGeneric: 'AI sometimes generates links with encoding errors. There are several ways to fix this.',
    generalTab: 'General',
    fixSteps: {
      title: "Let's troubleshoot in this order:",
      step1Title: "Make sure you've set up Workout Timer correctly",
      step1Link: 'Detailed installation guide (ChatGPT example)',
      step2Title: 'Try regenerating the link',
      step3Title: 'Use a more advanced model',
      step3Examples: 'GPT-5.2, Claude Opus, Gemini Thinking',
      step3Prompt: 'Please use a more capable AI model (like GPT-5.2, Claude Opus, or Gemini Thinking) and regenerate the workout timer link. Return full link, not markdown.',
      step4Title: 'Try English exercise names',
      step4Prompt: 'Links break more often with non-Latin character languages (Russian, Mandarin, Korean, etc.). Please translate all exercise names to English and regenerate the workout timer link. Return full link, not markdown.',
    },
    specific: {
      control_characters: {
        title: 'Corrupted Link Data',
        why: 'The AI inserted invisible control characters into the link data. This commonly happens with Gemini.',
        prompt: 'Please regenerate the workout timer link using clean text encoding. Do not include any special or control characters. Return full link, not markdown.',
      },
      invalid_utf8: {
        title: 'Encoding Error',
        why: 'Russian or special characters were not encoded correctly. Some AI models struggle with non-Latin text.',
        prompt: 'Please regenerate the workout timer link with proper UTF-8 encoding for all text. Return full link, not markdown.',
      },
      malformed_json: {
        title: 'Malformed Data',
        why: 'The workout data structure got corrupted during generation. The AI may have made a syntax error.',
        prompt: 'Please regenerate the workout timer link. Make sure the JSON is valid and properly formatted. Return full link, not markdown.',
      },
      invalid_base64: {
        title: 'Invalid Link Format',
        why: 'The link encoding is broken. This can happen when the AI uses the wrong encoding method.',
        prompt: 'Please regenerate the workout timer link using proper URL-safe base64 encoding. Return full link, not markdown.',
      },
      schema_mismatch: {
        title: 'Missing Workout Fields',
        why: 'The workout data is missing required fields. The AI may not have followed the schema correctly.',
        prompt: 'Please regenerate the link. Double-check the required schema: name, rounds, exercises with duration. Return full link, not markdown.',
      },
      truncated: {
        title: 'Incomplete Link',
        why: 'The link was cut off, likely due to message length limits or copy-paste issues.',
        prompt: 'Please regenerate the workout timer link. Return it as a complete, uncut string, not markdown.',
      },
      unknown: {
        title: 'Unknown Error',
        why: 'Something went wrong with the link generation. The exact cause is unclear.',
        prompt: 'Please regenerate the workout timer link using proper encoding. Return full link, not markdown.',
      },
    },
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
    title: 'Quick Reminder',
    ready: 'Ok! Go!',
    whoop: "Don't forget to start activity on WHOOP",
    apple: "Don't forget to start a workout on Apple Watch",
    garmin: "Don't forget to start activity on Garmin",
    custom: "Don't forget to start {name}",
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
    maxChars: 'Maximum 50 characters',
    invalidChars: 'Please use only letters, numbers, and basic punctuation',
    privacy: 'Your replies are used for workouts personalization only. Immediately discarded after. Nothing is stored.',
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
          other: 'Other / Let me specify',
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
          other: 'Other / Let me specify',
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
      titlePart1: 'Your',
      titlePart2: 'workouts',
      titlePart3: 'could be more than ',
      titlePart4: 'text',
      subtitle: 'Supercharge your AI chat to create personalised workouts and turn them into interactive timers',
      cta: 'Get Started',
      subtext: 'No login. No subscription. Lifetime access.',
      restorePurchase: 'Restore Purchase',
    },
    socialProof: {
      text: 'users already training',
    },
    howItWorks: {
      title: 'How It Works',
      steps: [
        { title: 'Complete the poll', description: 'Personalize your workout experience.' },
        { title: 'Download the file', description: "We create you a file to level-up your AI chat." },
        { title: 'Add file as an instruction', description: "Create a project in your AI chat. Add our file. Done – you're set" },
        { title: 'Ask for a workout', description: 'Chat with LLM as usual. Share preferences if any or sinply ask for a workout' },
        { title: 'Open your personalised timer', description: 'Get a personalised workout and a link to a timer tailored for your workout.' },
      ],
      demoButton: 'Try Demo Timer',
    },
    benefits: {
      title: 'Why Choose Workout Timer',
      items: [
        { title: 'It knows you. Literally.', description: "It's your AI chat. Your context" },
        { title: 'Works on any device', description: 'Mobile and Desktop. iOS and Android' },
        { title: 'Hackable. Flexible.', description: 'Build your own instructions' },
        { title: 'Lifetime access', description: "Pay once, use forever" },
        { title: 'Secure & Private', description: "We don't store your data unless you ask" },
        { title: 'Dead simple', description: 'Quick poll. No login. 2 min setup.' },
        { title: 'Works in all top LLMs', description: 'Claude, ChatGPT, Gemini, etc...' },
        { title: 'Learn new tricks', description: 'Quick YouTube tutorials for any exercise' },
      ],
    },
    forWhom: {
      title: 'Is This For You?',
      items: [
        { title: 'You already plan your workouts with AI', description: 'Level up the game! Stop checking that table on the phone every time – just run the timer fullscreen and GO!' },
        { title: 'Tired of YouTube workouts', description: 'Create your personalized ones. Learn from the embedded videos. Tailor the timer to your pace.' },
        { title: 'Still didn\'t get to "that gym"', description: 'Want to start working out but don\'t know how to start – tell your best AI buddy about it and don\'t skip the leg day.' },
      ],
    },
    pricing: {
      title: 'Buy Once. Use Forever.',
      badge: 'Limited Offer',
      planTitle: 'Lifetime Access',
      planSubtitle: 'No login. No subscription. Simple.',
      originalPrice: '$25',
      price: '$10',
      countdown: {
        title: 'Price increases in:',
        days: 'days',
        hours: 'hours',
        minutes: 'min',
        seconds: 'sec',
      },
      cta: 'Lock This Price',
      benefits: [
        'Setup Guide & Support',
        'Personalized AI Workouts',
        'Interactive Workout Timer',
        'Discounts & Bonuses (coming soon)',
        'Money-Back Guarantee',
      ],
    },
    testimonials: {
      title: 'What Users Say',
    },
    finalCTA: {
      title: 'This is your year.',
      subtitle: 'Change the way you gym.',
      cta: 'Personalise Workouts',
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
    dataConsent: {
      title: 'What would you like us to do with your data?',
      save: {
        title: 'Save data (Restore file anytime)',
        description: 'We store your preferences securely. You can restore your file anytime using your email.',
        reassurance: 'Only used for file restoration. Never shared or analyzed.',
      },
      discard: {
        title: 'Discard data (Secure but no backup)',
        description: "We won't store any personal information. Your data stays completely private.",
        warning: "If you lose your file, we won't be able to restore it. Make sure to save it somewhere safe.",
      },
      selectButton: 'Select this option',
    },
  },

  // Payment summary
  payment: {
    orderReady: 'Your order is ready',
    personalizedWorkouts: 'Personalized Workouts',
    interactiveTimer: 'Interactive Workout Timer',
    interactiveTimerDesc: 'Level up your personalized workouts',
    guidesSupport: 'Guides and Support',
    guidesDesc: "We'll show you how to supercharge your AI coach",
    andMore: "And that's not all",
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
    allSet: 'Great! Now download your file',
    downloadReady: 'Your personalized setup file is ready.',
    downloadFile: 'Download Setup File',
    niceTry: 'Nice try!',
    notPurchased: 'This page is reserved for paying customers. Good thinking though!',
    startOver: 'Start from the beginning',
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
      chatgpt: ['Open chatgpt.com and sign in', 'Create a new Project', 'Upload file to Project Knowledge', 'Add instructions to ALWAYS follow instructions in the file'],
      claude: ['Open claude.ai and sign in', 'Create a new Project', 'In Project Instructions, write to ALWAYS follow instructions in the attached file'],
      gemini: ['Open Gemini and sign in with Google', 'Create a new Gem', 'In Gem instructions, write to ALWAYS follow instructions in the attached file'],
      other: ['Open your AI assistant', 'Start a new chat', 'Paste file contents as your first message'],
    },
    restoreNote: 'Lost your file? You can re-download it anytime using your email.',
    downloadAgain: 'Download Again',
    discardWarning: 'You chose to discard your data. Save this file now — it cannot be restored later.',
    // Non-verified state
    alreadyPurchased: 'Already purchased?',
    notPurchasedYet: "Haven't purchased yet?",
    findEmailInstructions: 'Find your confirmation email from "Workout Timer (via Polar)" and click "Access my purchase"',
    restoreYourFile: 'Restore Your File',
    takeQuickPoll: 'Take a quick poll and get your personalized workouts with interactive timer',
    getStarted: 'Get Started',
    // Help section
    needHelp: 'Need help?',
    gettingStartedGuide: 'Quick Guide',
    helpText: 'If any questions or need help, please contact',
  },

  // Common
  common: {
    required: '*',
  },

  // Restore page
  restore: {
    title: 'Restore Your File',
    subtitle: 'Enter your email to re-download your file',
    emailPlaceholder: 'Use the email linked to your order',
    downloadButton: 'Download File',
    loading: 'Looking up...',
    success: 'File downloaded successfully!',
    back: '← Back',
    downloadAgain: 'Download Again',
    // Discarded data states
    discarded: {
      title: 'Data Not Saved',
      message: 'You chose not to save your data at checkout.',
      localAvailable: 'Good news: Your local copy is still available!',
      timeRemaining: 'Time remaining: ',
      downloadLocal: 'Download from local storage',
      expired: 'Your local storage has expired and file cannot be restored.',
      contactSupport: 'Contact support@workout-timer.app for a discount on repurchase.',
    },
  },

  // Getting started page (linked from Polar benefit)
  gettingStarted: {
    title: 'Welcome to Workout Timer',
    whatYouGot: {
      title: 'Make sure to store the file safely',
      description: 'You will use this file to supercharge your AI chats to generate personalised workouts and create interactive timers.',
    },
    links: {
      restore: {
        title: 'Restore Your File',
        description: 'Lost your file? Re-download it using your purchase email.',
      },
      timer: {
        title: 'Try the Timer',
        description: 'See the workout timer in action with a demo workout.',
      },
      troubleshooting: {
        title: 'Common Errors',
        description: 'Solutions for link generation issues.',
      },
      feedback: {
        title: 'Leave Feedback',
      },
    },
    setup: {
      title: 'Quick Setup by Platform',
      detailedGuide: 'Learn more',
      otherTitle: 'Other AI Assistants',
      otherHint: 'Follow instructions in file',
      chatgpt: [
        'Open chatgpt.com and sign in',
        'Create a new Project',
        'Upload file to Project Knowledge',
        'Add instructions to ALWAYS follow instructions in the file',
        'Ask for a workout!',
      ],
      claude: [
        'Open claude.ai and sign in',
        'Create a new Project',
        'In Project Instructions, write to ALWAYS follow instructions in the attached file',
        'Ask for a workout!',
      ],
      gemini: [
        'Open Gemini and sign in with Google',
        'Create a new Gem',
        'In Gem instructions, write to ALWAYS follow instructions in the attached file',
        'Ask for a workout!',
      ],
      other: [
        'Open your AI assistant',
        'Start a new chat',
        'Paste file contents as your first message',
        'Ask for a workout!',
      ],
    },
    tips: {
      title: 'Pro Tips',
      items: [
        'Use a thinking/reasoning model for best results (GPT-4o, Claude Sonnet, Gemini Pro)',
        'Be specific: "Give me a 20-minute upper body workout with dumbbells"',
        'The AI will generate a clickable timer link - just tap it to start!',
        'Save your file somewhere safe, or use the restore link anytime',
      ],
    },
    cta: 'Restore My File',
    supportNote: 'Need help?',
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
    setupOnMobile: 'Setup on Mobile',
    stepByStep: 'Step-by-step guide',
    chatgpt: {
      subtitle: 'Log in. Create GPT. Add file. Ask for a workout.',
      steps: [
        'Open chatgpt.com and sign in',
        'Create a new Project',
        'Upload file to Project Knowledge',
        'Add instructions to ALWAYS follow instructions in the file',
        'Ask for a workout!',
        'Click the link to open a timer',
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
        'In Project Instructions, write to ALWAYS follow instructions in the attached file',
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
        'In Gem instructions, write to ALWAYS follow instructions in the attached file',
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
