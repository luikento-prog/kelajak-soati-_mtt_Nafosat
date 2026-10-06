import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, ArrowRight, Sparkles, Check, HelpCircle } from 'lucide-react';
import { Language, AgeMode, ProfessionData } from '../../types';
import { PROFESSIONS } from '../../data/professions';
import { UI_TEXT, praiseWords, tryAgainWords } from '../../data/i18n';
import { playDing, playBoop, playProfessionSound, playTap } from '../../utils/audio';
import { speakText } from '../../utils/speech';

interface Game4SoundGuessProps {
  currentLang: Language;
  ageMode: AgeMode;
  onComplete: () => void;
  onNext: () => void;
}

export const Game4SoundGuess: React.FC<Game4SoundGuessProps> = ({
  currentLang,
  ageMode,
  onComplete,
  onNext,
}) => {
  const t = UI_TEXT.game4;

  // Sound pool: firefighter, police, builder, driver, teacher, chef
  const soundProfs = PROFESSIONS.filter((p) =>
    ['firefighter', 'police', 'builder', 'driver', 'teacher', 'chef'].includes(p.id)
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [wigglingId, setWigglingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const targetProf = soundProfs[currentIndex];

  // Options (target + 2 random distractors)
  const getOptions = (target: ProfessionData) => {
    const distractors = soundProfs
      .filter((p) => p.id !== target.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 2);
    return [target, ...distractors].sort(() => 0.5 - Math.random());
  };

  const [options, setOptions] = useState<ProfessionData[]>(() =>
    targetProf ? getOptions(targetProf) : []
  );

  const handlePlaySound = () => {
    if (!targetProf) return;
    setIsPlayingSound(true);
    playProfessionSound(targetProf.soundType);
    setTimeout(() => setIsPlayingSound(false), 1600);
  };

  const handleGuess = (prof: ProfessionData) => {
    if (!targetProf || revealed) return;
    playTap();

    if (prof.id === targetProf.id) {
      // Correct!
      setRevealed(true);
      playDing();
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
      });

      const praise = praiseWords[currentLang][0];
      setFeedback(`${praise} ${t.revealedTitle[currentLang]} ${targetProf.name[currentLang]}!`);
      speakText(`${t.revealedTitle[currentLang]} ${targetProf.name[currentLang]}!`, currentLang);

      setTimeout(() => {
        setRevealed(false);
        setFeedback(null);
        if (currentIndex + 1 < soundProfs.length) {
          const nextIdx = currentIndex + 1;
          setCurrentIndex(nextIdx);
          setOptions(getOptions(soundProfs[nextIdx]));
        } else {
          setIsFinished(true);
          onComplete();
        }
      }, 2400);
    } else {
      playBoop();
      setWigglingId(prof.id);
      setFeedback(tryAgainWords[currentLang]);
      setTimeout(() => setWigglingId(null), 600);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-4 px-4">
      {/* Title */}
      <div className="text-center mb-6">
        <span className="text-sm font-black text-rose-800 bg-rose-100 px-4 py-1 rounded-full uppercase tracking-wider inline-block mb-1">
          6-Bosqich · Bonus O‘yin
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {t.title[currentLang]}
        </h2>
        <p className="text-sm font-bold text-slate-600">
          Tovush: {currentIndex + 1} / {soundProfs.length}
        </p>
      </div>

      {!isFinished && targetProf && (
        <div className="flex flex-col items-center">
          {/* Sound listening hero button */}
          <div className="bg-gradient-to-b from-rose-50 to-pink-50 rounded-3xl p-8 border-3 border-rose-300 shadow-md flex flex-col items-center mb-8 w-full max-w-lg">
            <button
              onClick={handlePlaySound}
              className={`w-28 h-28 rounded-3xl flex items-center justify-center text-white shadow-xl transition-all ${
                isPlayingSound
                  ? 'bg-rose-600 scale-110 animate-pulse ring-8 ring-rose-200'
                  : 'bg-gradient-to-tr from-rose-500 to-pink-500 hover:scale-105 active:scale-95'
              }`}
            >
              <Volume2 className="w-14 h-14" />
            </button>

            <span className="text-lg font-black text-rose-950 mt-4 text-center">
              {t.listenBtn[currentLang]}
            </span>
            <p className="text-xs text-rose-800 font-semibold text-center mt-1">
              {t.instruction[currentLang]}
            </p>

            {feedback && (
              <div className="mt-4 bg-white px-5 py-2 rounded-2xl border-2 border-rose-400 text-center animate-in zoom-in-95">
                <p className="text-sm font-black text-rose-900">{feedback}</p>
              </div>
            )}
          </div>

          {/* Mystery / Revealed Choice Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
            {options.map((opt) => {
              const isTarget = opt.id === targetProf.id;
              const isWiggling = wigglingId === opt.id;

              return (
                <button
                  key={opt.id}
                  onClick={() => handleGuess(opt)}
                  className={`p-6 rounded-3xl bg-white border-3 flex flex-col items-center text-center justify-center gap-2 min-h-[140px] shadow-md transition-all active:scale-95 ${
                    revealed && isTarget
                      ? 'bg-emerald-50 border-emerald-400 ring-4 ring-emerald-200 scale-105'
                      : isWiggling
                      ? 'animate-[wiggle_0.4s_ease-in-out] bg-rose-50 border-rose-300'
                      : 'border-amber-200 hover:border-rose-400 hover:scale-103'
                  }`}
                >
                  <span className="text-6xl mb-1 filter drop-shadow">
                    {revealed && isTarget ? opt.emoji : '❓'}
                  </span>
                  <span className="text-lg font-black text-slate-800">
                    {opt.name[currentLang]}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">
                    {opt.toolName[currentLang]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Finished Banner */}
      {isFinished && (
        <div className="bg-gradient-to-r from-rose-500 to-pink-500 rounded-3xl p-8 text-white text-center shadow-xl flex flex-col items-center">
          <span className="text-5xl mb-2">🎶</span>
          <h3 className="text-3xl font-black mb-1">Ajoyib eshitish qobiliyati!</h3>
          <p className="text-base font-semibold opacity-90 mb-6">
            Barcha tovushlar va kasblar aniq topildi!
          </p>

          <button
            onClick={() => {
              playTap();
              onNext();
            }}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-rose-950 font-black text-lg shadow-lg hover:scale-105 active:scale-95 transition-all"
          >
            <span>{UI_TEXT.lessonPath.nextStep[currentLang]}: Orzudagi kasb</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};
