export interface Testimonial {
  quote: string;
  author: string;
  image: string;
  llm: 'claude' | 'chatgpt' | 'perplexity' | 'gemini' | 'grok';
}

export const TESTIMONIALS: Testimonial[] = [
  { quote: 'Finally fully focused on workouts, no phone time', author: 'Pasha', image: '/users/user_1.jpg', llm: 'claude' },
  { quote: "It's like a proper crossfit workout clock but adjusted for me every time", author: 'Nick', image: '/users/user_3.jpg', llm: 'chatgpt' },
  { quote: 'Good I can use it for pilates at home and for crossfit in the gym', author: 'Lika', image: '/users/user_2.jpg', llm: 'claude' },
  { quote: 'Excited to experiment with workouts every time', author: 'Natalie', image: '/users/user_4.jpg', llm: 'chatgpt' },
  { quote: "It's so simple but so cool. Great first impressions with ChatGPT", author: 'Kirill', image: '/users/user_5.jpg', llm: 'chatgpt' },
  { quote: "I've built my own agent on top of this to make workouts even more custom", author: 'Oleg', image: '/users/user_6.jpg', llm: 'perplexity' }
];
