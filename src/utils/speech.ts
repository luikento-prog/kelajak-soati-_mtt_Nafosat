import { Language } from '../types';
import { getAudioMuted } from './audio';

let currentUtterance: SpeechSynthesisUtterance | null = null;

// Listeners to highlight text while reading
type SpeechStateListener = (speaking: boolean, text: string) => void;
const listeners: Set<SpeechStateListener> = new Set();

export function onSpeechStateChange(fn: SpeechStateListener) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

function notifyState(speaking: boolean, text: string) {
  listeners.forEach((fn) => fn(speaking, text));
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    try {
      window.speechSynthesis.cancel();
      currentUtterance = null;
      notifyState(false, '');
    } catch {
      // ignore
    }
  }
}

export function speakText(text: string, lang: Language = 'uz'): Promise<boolean> {
  if (getAudioMuted()) {
    return Promise.resolve(false);
  }

  if (typeof window === 'undefined' || !window.speechSynthesis) {
    return Promise.resolve(false);
  }

  return new Promise((resolve) => {
    try {
      stopSpeaking();

      const utterance = new SpeechSynthesisUtterance(text);
      currentUtterance = utterance;

      const langMap: Record<Language, string> = {
        uz: 'uz-UZ',
        ru: 'ru-RU',
        en: 'en-US',
      };

      utterance.lang = langMap[lang] || 'uz-UZ';
      utterance.rate = 0.88; // Slightly slower, gentle pace for 3-6 year olds
      utterance.pitch = 1.05; // Friendly, warm tone

      // Try finding an appropriate voice
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        const targetPrefix = langMap[lang];
        const matchingVoice = voices.find((v) => v.lang.startsWith(targetPrefix.slice(0, 2)));
        if (matchingVoice) {
          utterance.voice = matchingVoice;
        }
      }

      utterance.onstart = () => {
        notifyState(true, text);
      };

      utterance.onend = () => {
        notifyState(false, '');
        currentUtterance = null;
        resolve(true);
      };

      utterance.onerror = () => {
        notifyState(false, '');
        currentUtterance = null;
        resolve(false);
      };

      window.speechSynthesis.speak(utterance);
    } catch {
      notifyState(false, '');
      resolve(false);
    }
  });
}
