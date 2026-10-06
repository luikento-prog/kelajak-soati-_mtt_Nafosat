export type Language = 'uz' | 'ru' | 'en';
export type AgeMode = '3-4' | '4-5' | '5-6';

export type ProfessionId =
  | 'doctor'
  | 'chef'
  | 'builder'
  | 'teacher'
  | 'police'
  | 'firefighter'
  | 'farmer'
  | 'tailor'
  | 'driver';

export interface ProfessionData {
  id: ProfessionId;
  name: Record<Language, string>;
  toolName: Record<Language, string>;
  actionText: Record<Language, string>;
  simpleSentence: Record<Language, string>;
  whyReason: Record<Language, string>;
  emoji: string;
  toolEmoji: string;
  themeColor: string;
  bgLight: string;
  soundType: 'stethoscope' | 'bubbles' | 'hammer' | 'bell' | 'whistle' | 'siren' | 'water' | 'scissors' | 'horn';
}

export interface WallChild {
  id: string;
  name: string;
  professionId: ProfessionId;
  avatarFace: 'boy1' | 'girl1' | 'boy2' | 'girl2';
  reason?: string;
  timestamp: number;
}

export type ActiveSection =
  | 'home'
  | 'greeting'
  | 'show-and-tell'
  | 'game1'
  | 'game2'
  | 'game3'
  | 'game4'
  | 'dream-profession'
  | 'reflection'
  | 'next-week';
