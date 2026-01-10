export const AI_CONFIGS = {
  chatgpt: {
    name: 'ChatGPT',
    icon: '🤖',
    color: 'from-green-500/20 to-green-600/20',
  },
  claude: {
    name: 'Claude',
    icon: '🧠',
    color: 'from-orange-500/20 to-orange-600/20',
  },
  gemini: {
    name: 'Gemini',
    icon: '✨',
    color: 'from-blue-500/20 to-blue-600/20',
  },
} as const;

export type AIConfigKey = keyof typeof AI_CONFIGS;
export const AI_CONFIG_KEYS = Object.keys(AI_CONFIGS) as AIConfigKey[];
