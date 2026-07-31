export const en = {
  // Navigation
  nav: {
    howItWorks: 'How It Works',
    benefits: 'Benefits',
    pricing: 'Pricing',
    guide: 'Guide',
    restore: 'Restore',
    troubleshooting: 'Troubleshooting',
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
    cooldownCountdown: 'COOLDOWN',
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
    linkErrorsTab: 'Link Errors',
    copyPromptToFix: 'Give prompt below to LLM to fix the error',
    troubleshootingGuide: 'Troubleshooting Guide',
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
        title: 'Corrupted Data',
        why: 'Invisible characters in the link.',
        prompt: 'Regenerate without control characters. Return full link, not markdown.',
      },
      invalid_utf8: {
        title: 'Character Error',
        why: "Non-Latin characters weren't encoded properly.",
        prompt: 'Regenerate with proper UTF-8 encoding. Return full link, not markdown.',
      },
      malformed_json: {
        title: 'Invalid Data',
        why: 'Data structure has syntax errors.',
        prompt: 'Regenerate with valid JSON. Return full link, not markdown.',
      },
      invalid_base64: {
        title: 'Invalid Encoding',
        why: 'Link encoding is broken.',
        prompt: 'Regenerate with URL-safe base64 encoding. Return full link, not markdown.',
      },
      schema_mismatch: {
        title: 'Missing Fields',
        why: 'Required workout fields are missing.',
        prompt: 'Regenerate with: name, rounds, exercises (each with duration). Return full link, not markdown.',
      },
      truncated: {
        title: 'Incomplete Link',
        why: 'Link was cut off during generation or copy-paste.',
        prompt: 'Regenerate the full workout link. Return complete URL, not markdown.',
      },
      unknown: {
        title: 'Unknown Error',
        why: 'Something went wrong.',
        prompt: 'Regenerate the workout link. Return full link, not markdown.',
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
    restGetReady: 'Rest. Next:',
    equipment: 'Equipment:',
    roundComplete: 'Round',
    prepareRound: 'Prepare for round',
    prepareStretching: 'Prepare for stretching',
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
    oura: 'Your Oura Ring is tracking your workout',
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
          grok: 'Grok',
          perplexity: 'Perplexity',
          other: 'Other',
        },
      },
      trainingType: {
        title: 'What type of training do you prefer?',
        options: {
          strength: 'Strength.Weights, heavylifting',
          hiit: 'HIIT.Intensive, functional',
          yoga: 'Yoga.Mobility, flexibility',
          calisthenics: 'Calisthenics.Power, control',
          cardio: 'Cardio.Endurance, VO2',
          pilates: 'Pilates.Fortification, core',
          other: 'Other.Something special?',
        },
      },
      equipment: {
        title: 'What equipment do you have?',
        options: {
          bodyweight: 'None.Bodyweight only',
          home: 'Essentials.Bands, dumbbells, mat',
          localgym: 'Local gym.Weights, bars, bench',
          fullgym: 'Big gym.Cable station, rowing',
        },
      },
      weightPreference: {
        title: 'How many push-ups can you do?',
        subtitle: "It'll help calibrate workout intensity",
        options: {
          light: 'Under 5',
          moderate: '5-10',
          medium: '10-20',
          heavy: '20-30',
          veryHeavy: '30+',
          unknown: "I don't know",
        },
      },
      goals: {
        title: 'What is your main goal?',
        options: {
          muscle: 'Build muscle',
          weight: 'Lose weight',
          endurance: 'Improve endurance',
          general: 'General fitness',
          health: 'Get healthier',
          other: 'Other',
        },
      },
      tracker: {
        title: 'Do you use a fitness tracker?',
        options: {
          whoop: 'WHOOP',
          apple: 'Apple Watch',
          garmin: 'Garmin',
          oura: 'Oura Ring',
          other: 'Other',
          none: 'No tracker',
        },
      },
      coachingStyle: {
        title: 'How should your coach talk to you?',
        options: {
          motivator: 'Motivator.Ambitious, inspiring',
          drill: 'Drill Sergeant.Demanding, no BS',
          friendly: 'Friendly Coach.Gentle, caring',
          analytical: 'Data-Driven.Methodical, rational',
        },
      },
    },
  },

  // Landing page translations
  landing: {
    hero: {
      titlePart1: 'Your ',
      titlePart2: 'workout is text.',
      titlePart3: '',
      titlePart4: 'Make it count.',
      subtitle: 'Supercharge your AI chat to create personalised workouts and turn them into interactive timers',
      cta: 'Get Started',
      subtext: 'No login. No subscription. Lifetime.',
      restorePurchase: 'Restore Purchase',
      seeDemo: 'See demo',
      tapToUnmute: 'Tap to unmute',
    },
    socialProof: {
      rating: '4.8',
      text: 'Highly rated by users',
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
        { title: 'You already plan your workouts with AI', description: 'Level up the game! Wrap your workouts as timer' },
        { title: 'Tired of YouTube workouts', description: 'Create your personalized ones. Learn from the embedded videos' },
        { title: 'You coach people remotely', description: 'Do not send them text. Create a link to a workout timer for them' },
      ],
    },
    pricing: {
      title: 'Buy Once. Use Forever.',
      badge: 'Limited Offer',
      planTitle: 'Lifetime Access',
      planSubtitle: 'No login. No subscription.',
      originalPrice: '$25',
      price: '$19',
      countdown: {
        title: 'Offer ends in:',
        days: 'days',
        hours: 'hours',
        minutes: 'min',
        seconds: 'sec',
      },
      cta: 'Lock This Price',
      benefits: [
        'Works with any LLM (ChatGPT, Claude, Gemini)',
        'Personalized AI Workouts',
        'Turn any workout into a timer',
        'Money-Back Guarantee',
        'Personal support if any issues',
      ],
    },
    testimonials: {
      title: 'What Users Say',
    },
    faq: {
      title: 'Frequently Asked Questions',
      items: {
        whatGetting: {
          question: 'What am I actually getting?',
          answer:
            "We craft a markdown file with instructions for your LLM. It contains personalized guidelines based on your poll responses and teaches your AI to create custom workout timer links.",
        },
        howWorks: {
          question: 'How does this custom timer work?',
          answer:
            "Your LLM creates workouts for you. Our instructions explain how to encode your workout into a link. When you click the link, we decode it and show you a personalized timer.",
        },
        multipleLLMs: {
          question: 'Can I use it in multiple LLMs?',
          answer:
            "Yes! It's your file. You can use it, hack it, change it. Use it in several LLMs at once. No limits.",
        },
        workoutLimitations: {
          question: 'Any limitations on types of workouts?',
          answer:
            'The timer works as "X sets" of "Y exercises" — basically a circuit workout. But you can get creative and make tabata, supersets, or even AMRAP by customizing exercise durations and rest periods.',
        },
        shareLinks: {
          question: 'Can I share or re-use a workout link?',
          answer:
            "Yes! Once created, workout links can be used endlessly. Save your favorites. Want to share with a friend or partner? Just send the link.",
        },
        mobileSupport: {
          question: 'Does the timer work on mobile?',
          answer: 'Yes. All devices. All operating systems.',
        },
        updates: {
          question: 'Will I get updates to my instructions?',
          answer:
            "Yes. When we evolve the timer with new features, we'll send you updated instructions too.",
        },
        aiAssistants: {
          question: 'Which AI assistants does it work with?',
          answer:
            "All of them. Some work more stable, some less. We've tested and have installation guides for Claude, ChatGPT, Gemini, Grok, and Perplexity. You can test with different LLMs to see what works best — it's compatible with free plans.",
        },
        refundPolicy: {
          question: 'Is there a refund policy?',
          answer: 'Yes. Not happy? Get your money back, no questions asked.',
        },
        whyPay: {
          question: 'Why pay when I can just ask AI for workouts?',
          answer:
            "We instruct your LLM to create a magic link to a custom timer for your workout. It's a different experience than getting a workout in bullet points. Plus, we save you the time of setting up proper instructions.",
        },
      },
    },
    finalCTA: {
      title: 'This is your year.',
      subtitle: 'Change the way you gym.',
      cta: 'Make It Count',
    },
  },

  // Personal details form
  details: {
    title: 'Final step!',
    subtitle: 'Tell us a bit about yourself for personalization',
    privacyNotice: "For personalization only. We don't store or process your personal data.",
    personalizeOptional: 'Personalize experience (optional)',
    personalizeSection: {
      title: 'Share your personal context',
      subtitle: 'Recommended for best results',
    },
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
        title: 'Save data (Restore purchase anytime)',
        description: 'We store your preferences securely. You can restore your purchase anytime using your email.',
        reassurance: 'Only used for purchase restoration. Never shared or analyzed.',
      },
      discard: {
        title: 'Discard data (Secure but no backup)',
        description: "We won't store any personal information. Your data stays completely private.",
        warning: "If you lose your purchase, we won't be able to restore it. Make sure to save your file somewhere safe.",
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
    andMore: "And that's not all",
    lifetimeFeatures: 'Lifetime access to all new features',
    installationGuide: 'Installation guide for your AI',
    customerSupport: 'Customer support if any issues',
    discounts: 'Discounts on other health-tech services',
    lifetimeNoSub: 'Lifetime access. No subscription.',
    checkout: 'Checkout',
    processing: 'Processing...',
    securePolar: 'Secure payment via Polar',
    seeDemo: 'See the live demo',
    tags: {
      bodyweight: 'Bodyweight',
      home: 'Essentials',
      localgym: 'Local Gym',
      fullgym: 'Big Gym',
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
    installGuide: 'Open install guide',
    contactHelp: 'Need help? Contact',
    platformSteps: {
      chatgpt: ['Open chatgpt.com and sign in', 'Create a new Project', 'Upload file to Project Knowledge', 'Add instructions to ALWAYS follow instructions in the file'],
      claude: ['Open claude.ai and sign in', 'Open "Projects"', 'Create new project', 'Add instruction "ALWAYS follow the instructions in the file" and drag your file to "Files"'],
      gemini: ['Open sidemenu in Gemini', 'Create a new Gem', 'Add instructions and your file to your Gem', 'Ask for a workout. Use "Thinking" model if issues.'],
      grok: ['Open Grok, create Project', 'Name project, add instructions', 'Add your file to the project', 'Ask for a workout'],
      perplexity: ['Open Perplexity, create a Space', 'Name Space, add your file', 'Add instructions to ALWAYS follow the file', 'Ask for a workout'],
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
      message: '',
      cannotRestore: 'You chose not to save your data at checkout',
      contactSupport: 'File restoration is not available. Contact support@workout-timer.app for a discount on repurchase.',
    },
  },

  // Getting started page (linked from Polar benefit)
  gettingStarted: {
    title: 'Welcome to Workout Timer',
    quickLinks: 'Quick Links',
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
      otherTitle: 'Other LLMs',
      otherHint: 'Let us know if needed',
      chatgpt: [
        'Open chatgpt.com and sign in',
        'Create a new Project',
        'Upload file to Project Knowledge',
        'Add instructions to ALWAYS follow instructions in the file',
        'Ask for a workout!',
      ],
      claude: [
        'Open claude.ai and sign in',
        'Open "Projects"',
        'Create new project',
        'Add instruction "ALWAYS follow the instructions in the file" and drag your file to "Files"',
        'Ask for a workout!',
        'Click the link to open a timer',
      ],
      gemini: [
        'Open sidemenu in Gemini',
        'Create a new Gem',
        'Add instructions and your file to your Gem',
        'Ask for a workout. Consider using "Thinking" model if any issues.',
        'Gemini should return the full link. If not – ask it to return the full link. Copy this link.',
        'Paste the link into a new browser window to open the timer.',
      ],
      grok: [
        'Open Grok, create Project',
        'Name a Project, add instructions. Ask it to be vigilant – Grok is fast but sloppy.',
        'Add your instructions file to the project',
        'Ask for a workout naturally',
        'Click on a workout link to open the timer',
        'Grok on "Fast" will likely break the link. Prompt it to fix/review. Or switch to "Thinking" model.',
      ],
      perplexity: [
        'Open Perplexity, create a Space',
        'Name a Space, add your instruction file',
        'Open Space instructions',
        'Ask it to ALWAYS follow the instructions in the file. Turn off web search. Save.',
        'Ask for a workout naturally. Search mode works okay, Research mode returns better results.',
        'Click on the link to open the timer',
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
        'Make sure to add both the file AND instructions to follow the file\'s guidelines',
        'Thinking models generate better timer-links (less errors)',
        'Link returned an error? Ask LLM to fix it. Usually it fixes mistakes on the first re-try',
        'In the project instruction add your own. Like "keep rest time low at 10 sec" or "never give me bulgarian lunges"',
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
      title: 'Why Workout Timer links can be broken?',
      linkErrorsTitle: 'Prompts to fix errors',
      block1: {
        title: 'AI can mess up the link',
        tips: [
          'Ask AI to regenerate the link or use our troubleshooting guide; it often helps on the first retry',
          'Some models, or faster models, make many typos while generating a link. Switching to a thinking but slower model tends to help',
          'Faster models like to invent their own approach. Including an instruction to always follow the file\'s guidelines tends to help',
        ],
      },
      block2: {
        title: 'Your custom settings trigger errors',
        tips: [
          'If you instruct it to work in a non-Latin alphabet (Russian, Mandarin, Japanese), it might generate links with coding errors',
          'If you experiment with exercise formats that aren\'t standard, it might cause errors',
        ],
      },
      needHelp: 'Need more help? Contact us at',
      supportEmail: 'support@workout-timer.app',
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
      subtitle: 'Log in. Open Projects. Add file. Ask for a workout.',
      steps: [
        'Open claude.ai and sign in',
        'Open "Projects"',
        'Create new project',
        'Add instruction "ALWAYS follow the instructions in the file" and drag your file to "Files"',
        'Ask for a workout!',
        'Click the link to open a timer',
      ],
      modelTip: {
        title: 'Works best with Sonnet 4.5 or Opus 4.5',
        subtitle: 'If Sonnet glitches, try Opus. But Claude is very stable.',
      },
    },
    gemini: {
      subtitle: 'Open sidemenu. Create Gem. Add file. Ask for a workout.',
      steps: [
        'Open sidemenu in Gemini',
        'Create a new Gem',
        'Add instructions and your file to your Gem',
        'Ask for a workout. Consider using "Thinking" model if any issues.',
        'Gemini should return the full link. If not – ask it to return the full link. Copy this link.',
        'Paste the link into a new browser window to open the timer.',
      ],
      modelTip: {
        title: 'Works best with Thinking model',
        subtitle: 'Flash 3.0 or "Fast" mode makes mistakes sometimes.',
      },
    },
    grok: {
      subtitle: 'Create Project. Add file. Ask for a workout.',
      steps: [
        'Open Grok, create Project',
        'Name a Project, add instructions. Ask it to be vigilant – Grok is fast but sloppy.',
        'Add your instructions file to the project',
        'Ask for a workout naturally',
        'Click on a workout link to open the timer',
        'Grok on "Fast" will likely break the link. Prompt it to fix/review. Or switch to "Thinking" model.',
      ],
      modelTip: {
        title: 'Use "Thinking" model for stability',
        subtitle: '"Fast" mode is quick but often breaks links. Ask Grok to fix or switch models.',
      },
    },
    perplexity: {
      subtitle: 'Create Space. Add file. Configure instructions. Ask for a workout.',
      steps: [
        'Open Perplexity, create a Space',
        'Name a Space, add your instruction file',
        'Open Space instructions',
        'Ask it to ALWAYS follow the instructions in the file. Turn off web search. Save.',
        'Ask for a workout naturally. Search mode works okay, Research mode returns better results.',
        'Click on the link to open the timer',
      ],
      modelTip: {
        title: 'Research mode works best',
        subtitle: 'Search mode is okay, but Research mode returns better workout results.',
      },
    },
  },
};

export type TranslationKeys = typeof en;
