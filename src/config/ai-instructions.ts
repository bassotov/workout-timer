export interface AIConfig {
  name: string;
  logo: string;
  color: string;
  screenshots: string[];
  logoInvert?: boolean;
}

export const AI_CONFIGS: Record<string, AIConfig> = {
  chatgpt: {
    name: 'ChatGPT',
    logo: '/logos/chatgpt.png',
    color: 'from-white/30 to-white/40',
    logoInvert: true,
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
    screenshots: [
      '/screenshots/claude/claude-1.png',
      '/screenshots/claude/claude-2.png',
      '/screenshots/claude/claude-3.png',
      '/screenshots/claude/claude-4.png',
      '/screenshots/claude/claude-5.png',
      '/screenshots/claude/claude-6.png',
    ],
  },
  gemini: {
    name: 'Gemini',
    logo: '/logos/gemini.png',
    color: 'from-blue-500/20 to-blue-600/20',
    screenshots: [
      '/screenshots/gemini/gemini-1.png',
      '/screenshots/gemini/gemini-2.png',
      '/screenshots/gemini/gemini-3.png',
      '/screenshots/gemini/gemini-4.png',
      '/screenshots/gemini/gemini-5.png',
      '/screenshots/gemini/gemini-6.png',
    ],
  },
  grok: {
    name: 'Grok',
    logo: '/logos/grok.png',
    color: 'from-neutral-500/20 to-neutral-600/20',
    logoInvert: true,
    screenshots: [
      '/screenshots/grok/grok-1.png',
      '/screenshots/grok/grok-2.png',
      '/screenshots/grok/grok-3.png',
      '/screenshots/grok/grok-4.png',
      '/screenshots/grok/grok-5.png',
      '/screenshots/grok/grok-6.png',
    ],
  },
  perplexity: {
    name: 'Perplexity',
    logo: '/logos/perplexity.png',
    color: 'from-teal-500/20 to-teal-600/20',
    logoInvert: true,
    screenshots: [
      '/screenshots/perplexity/perplexity-1.png',
      '/screenshots/perplexity/perplexity-2.png',
      '/screenshots/perplexity/perplexity-3.png',
      '/screenshots/perplexity/perplexity-4.png',
      '/screenshots/perplexity/perplexity-5.png',
      '/screenshots/perplexity/perplexity-6.png',
    ],
  },
};

export type AIConfigKey = 'chatgpt' | 'claude' | 'gemini' | 'grok' | 'perplexity';
export const AI_CONFIG_KEYS: AIConfigKey[] = ['chatgpt', 'claude', 'gemini', 'grok', 'perplexity'];
