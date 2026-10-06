import React, { useState, useEffect } from 'react';
import { X, Play, Pause, Music, RotateCcw } from 'lucide-react';
import { Language } from '../../types';
import { UI_TEXT } from '../../data/i18n';
import { playDanceStep, playTap } from '../../utils/audio';

interface DanceBreakModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
}

export const DanceBreakModal: React.FC<DanceBreakModalProps> = ({
  isOpen,
  onClose,
  currentLang,
}) => {
  const t = UI_TEXT.danceBreak;

  const [secondsLeft, setSecondsLeft] = useState(60);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const steps = [
    { text: t.actionBuilder[currentLang], icon: '👷', emoji: '🔨', bg: 'from-amber-400 to-yellow-500' },
    { text: t.actionChef[currentLang], icon: '👨‍🍳', emoji: '🍲', bg: 'from-orange-400 to-red-500' },
    { text: t.actionDriver[currentLang], icon: '🚌', emoji: '🚙', bg: 'from-sky-400 to-blue-500' },
    { text: t.actionTailor[currentLang], icon: '🧵', emoji: '✂️', bg: 'from-pink-400 to-purple-500' },
    { text: t.actionFire[currentLang], icon: '🧑‍🚒', emoji: '🧯', bg: 'from-rose-500 to-orange-500' },
  ];

  // Tick timer and musical steps
  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const interval = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsPlaying(false);
          return 0;
        }
        return prev - 1;
      });

      // Change dance pose every 12 seconds
      setCurrentStepIndex((prev) => (prev + 1) % steps.length);
      playDanceStep(60 - secondsLeft);
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, isPlaying, secondsLeft, steps.length]);

  if (!isOpen) return null;

  const activeStep = steps[currentStepIndex];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border-4 border-pink-400 flex flex-col items-center animate-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between w-full mb-4">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-pink-100 text-pink-700 rounded-xl">
              <Music className="w-6 h-6 animate-bounce" />
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              {t.title[currentLang]}
            </h3>
          </div>
          <button
            onClick={() => {
              playTap();
              onClose();
            }}
            className="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 60s Circular Countdown */}
        <div className="my-2 flex items-center gap-4">
          <div className="w-20 h-20 rounded-full border-4 border-pink-400 bg-pink-50 flex items-center justify-center font-black text-2xl text-pink-700 shadow-inner">
            {secondsLeft}s
          </div>
          <div className="text-left">
            <span className="text-xs font-bold text-slate-500 block">
              Charchoqni yozamiz!
            </span>
            <span className="text-base font-black text-slate-800">
              O‘rningizdan turing va takrorlang!
            </span>
          </div>
        </div>

        {/* Dynamic Action Showcase */}
        <div
          className={`w-full my-4 p-8 rounded-3xl bg-gradient-to-r ${activeStep.bg} text-white text-center shadow-lg flex flex-col items-center justify-center min-h-[200px] transition-all transform animate-in fade-in duration-300`}
        >
          <div className="flex items-center justify-center gap-4 text-7xl mb-3 filter drop-shadow">
            <span className="animate-bounce">{activeStep.icon}</span>
            <span className="animate-pulse">{activeStep.emoji}</span>
          </div>
          <p className="text-2xl sm:text-3xl font-black leading-snug drop-shadow-sm">
            {activeStep.text}
          </p>
        </div>

        {/* Controls & Close Button */}
        <div className="flex items-center gap-3 w-full mt-2">
          <button
            onClick={() => {
              playTap();
              setIsPlaying(!isPlaying);
            }}
            className="flex-1 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-base flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            <span>{isPlaying ? 'To‘xtatish' : 'Davom ettirish'}</span>
          </button>

          <button
            onClick={() => {
              playTap();
              onClose();
            }}
            className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-black text-base shadow-md hover:scale-102 active:scale-95 transition-all"
          >
            {t.closeBtn[currentLang]}
          </button>
        </div>
      </div>
    </div>
  );
};
