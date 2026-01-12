export interface AIConfig {
  name: string;
  logo: string;
  color: string;
  screenshots: string[];
}

export const AI_CONFIGS: Record<string, AIConfig> = {
  chatgpt: {
    name: 'ChatGPT',
    logo: '/logos/chatgpt.png',
    color: 'from-white/30 to-white/40',
    screenshots: [
      '/screenshots/chatgpt/chatgpt-1.png',
      '/screenshots/chatgpt/chatgpt-2.png',
      '/screenshots/chatgpt/chatgpt-3.png',
      '/screenshots/chatgpt/chatgpt-3.5.png',
      '/screenshots/chatgpt/chatgpt-4.png',
      '/screenshots/chatgpt/chatgpt-5.png',
    ],
  },
  claude: {
    name: 'Claude',
    logo: '/logos/claude.png',
    color: 'from-orange-500/20 to-orange-600/20',
    screenshots: [],
  },
  gemini: {
    name: 'Gemini',
    logo: '/logos/gemini.png',
    color: 'from-blue-500/20 to-blue-600/20',
    screenshots: [],
  },
};

export type AIConfigKey = 'chatgpt' | 'claude' | 'gemini';
export const AI_CONFIG_KEYS: AIConfigKey[] = ['chatgpt', 'claude', 'gemini'];
