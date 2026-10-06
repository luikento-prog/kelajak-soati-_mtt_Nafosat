import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowRight, Sparkles, BookOpen, Moon } from 'lucide-react';
import { Dino } from '../Dino';
import { Language } from '../../types';
import { UI_TEXT, praiseWords, tryAgainWords } from '../../data/i18n';
import { playDing, playBoop, playCelebration, playTap } from '../../utils/audio';

interface GreetingSectionProps {
  currentLang: Language;
  onComplete: () => void;
  onNext: () => void;
}

export const GreetingSection: React.FC<GreetingSectionProps> = ({
  currentLang,
  onComplete,
  onNext,
}) => {
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);
  const [wiggleWrong, setWiggleWrong] = useState(false);
  const [dinoSpeechOverride, setDinoSpeechOverride] = useState<string | null>(null);

  const t = UI_TEXT.greeting;

  const handleCorrect = () => {
    playCelebration();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
    setAnsweredCorrectly(true);
    const randomPraise = praiseWords[currentLang][0];
    setDinoSpeechOverride(`${randomPraise} ${t.successDesc[currentLang]}`);
    onComplete();
  };

  const handleWrong = () => {
    playBoop();
    setWiggleWrong(true);
    setDinoSpeechOverride(tryAgainWords[currentLang]);
    setTimeout(() => setWiggleWrong(false), 600);
  };

  const currentSpeech = dinoSpeechOverride || t.dinoSpeech[currentLang];

  return (
    <div className="max-w-4xl mx-auto py-4 px-4 flex flex-col items-center">
      {/* Top Title */}
      <div className="text-center mb-6">
        <span className="text-sm font-black text-emerald-800 bg-emerald-100 px-4 py-1 rounded-full uppercase tracking-wider inline-block mb-2">
          1-Bosqich · Salomlashuv
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Assalomu alaykum, aziz bolajonlar! 👋
        </h2>
      </div>

      {/* Dino Mascot Stage */}
      <div className="w-full bg-gradient-to-b from-emerald-50 via-teal-50 to-amber-50 rounded-3xl p-6 sm:p-8 border-3 border-emerald-200 shadow-md mb-8 flex flex-col items-center justify-center">
        <Dino
          speech={currentSpeech}
          lang={currentLang}
          state={answeredCorrectly ? 'celebrating' : 'waving'}
          size="lg"
          className="mb-4"
        />

        {/* Recall Question Box */}
        <div className="w-full max-w-xl bg-white/95 rounded-2xl p-5 border-2 border-emerald-300 shadow-sm mt-4 text-center">
          <h3 className="text-lg sm:text-xl font-black text-slate-800 mb-4 flex items-center justify-center gap-2">
            <span>🤔</span>
            <span>{t.recallQuestion[currentLang]}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Option Correct: O'rganish kerak */}
            <button
              onClick={() => {
                playTap();
                handleCorrect();
              }}
              className={`p-5 rounded-2xl text-lg font-black flex items-center justify-center gap-3 transition-all min-h-[80px] shadow-md ${
                answeredCorrectly
                  ? 'bg-emerald-500 text-white ring-4 ring-emerald-200 scale-102'
                  : 'bg-emerald-50 text-emerald-800 border-2 border-emerald-400 hover:bg-emerald-100 hover:scale-102 active:scale-95'
              }`}
            >
              <BookOpen className="w-6 h-6 shrink-0" />
              <span>{t.optCorrect[currentLang]}</span>
            </button>

            {/* Option Wrong: Uxlash kerak */}
            <button
              onClick={() => {
                playTap();
                handleWrong();
              }}
              className={`p-5 rounded-2xl text-lg font-black flex items-center justify-center gap-3 transition-all min-h-[80px] border-2 shadow-sm ${
                wiggleWrong
                  ? 'animate-[wiggle_0.4s_ease-in-out] bg-amber-100 border-amber-400 text-amber-900'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 active:scale-95'
              }`}
            >
              <Moon className="w-6 h-6 shrink-0" />
              <span>{t.optWrong[currentLang]}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Next Step Button */}
      {answeredCorrectly && (
        <div className="animate-in fade-in zoom-in duration-300">
          <button
            onClick={() => {
              playTap();
              onNext();
            }}
            className="flex items-center gap-3 px-8 py-5 rounded-3xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            <span>{UI_TEXT.lessonPath.nextStep[currentLang]}: Mening buyumim</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};
