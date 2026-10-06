import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, Lightbulb, ArrowRight, Sparkles, Check } from 'lucide-react';
import { Language, AgeMode, ProfessionData } from '../../types';
import { PROFESSIONS } from '../../data/professions';
import { UI_TEXT, praiseWords, tryAgainWords } from '../../data/i18n';
import { playDing, playBoop, playProfessionSound, playTap } from '../../utils/audio';
import { speakText } from '../../utils/speech';

interface Game1ToolMatchProps {
  currentLang: Language;
  ageMode: AgeMode;
  onComplete: () => void;
  onNext: () => void;
}

export const Game1ToolMatch: React.FC<Game1ToolMatchProps> = ({
  currentLang,
  ageMode,
  onComplete,
  onNext,
}) => {
  const t = UI_TEXT.game1;

  // Decide how many professions per round based on age
  const profCount = ageMode === '3-4' ? 3 : ageMode === '4-5' ? 4 : 5;

  const [pool, setPool] = useState<ProfessionData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedToolProf, setSelectedToolProf] = useState<ProfessionData | null>(null);
  const [hintActive, setHintActive] = useState(false);
  const [wigglingProfId, setWigglingProfId] = useState<string | null>(null);
  const [matchedProfs, setMatchedProfs] = useState<Set<string>>(new Set());
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // Initialize pool of professions for this round
  useEffect(() => {
    const shuffled = [...PROFESSIONS].sort(() => 0.5 - Math.random()).slice(0, profCount);
    setPool(shuffled);
    setCurrentIndex(0);
    setSelectedToolProf(shuffled[0]);
    setMatchedProfs(new Set());
    setHintActive(false);
  }, [ageMode, profCount]);

  const currentTarget = pool[currentIndex];

  const handleMatchAttempt = (chosen: ProfessionData) => {
    if (!currentTarget) return;

    if (chosen.id === currentTarget.id) {
      // Correct!
      playDing();
      playProfessionSound(chosen.soundType);

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });

      const nextSet = new Set(matchedProfs);
      nextSet.add(chosen.id);
      setMatchedProfs(nextSet);

      const praise = praiseWords[currentLang][Math.floor(Math.random() * praiseWords[currentLang].length)];
      setFeedbackMessage(`${praise} ${chosen.simpleSentence[currentLang]}`);

      // Speak sentence aloud
      speakText(chosen.simpleSentence[currentLang], currentLang);

      setHintActive(false);

      if (currentIndex + 1 < pool.length) {
        setTimeout(() => {
          setCurrentIndex((prev) => prev + 1);
          setSelectedToolProf(pool[currentIndex + 1]);
          setFeedbackMessage(null);
        }, 2200);
      } else {
        // Round completed!
        setTimeout(() => {
          onComplete();
        }, 1500);
      }
    } else {
      // Gentle encouragement
      playBoop();
      setWigglingProfId(chosen.id);
      setFeedbackMessage(tryAgainWords[currentLang]);
      setTimeout(() => {
        setWigglingProfId(null);
      }, 600);
    }
  };

  const handleApplyHint = () => {
    playTap();
    setHintActive(true);
    if (currentTarget) {
      const hintText =
        currentLang === 'uz'
          ? `Bu buyum ${currentTarget.name[currentLang]}gami yoki boshqasigami?`
          : currentLang === 'ru'
          ? `Этот предмет нужен ${currentTarget.name[currentLang]} или другому?`
          : `Does this belong to the ${currentTarget.name[currentLang]}?`;
      speakText(hintText, currentLang);
    }
  };

  const isRoundFinished = pool.length > 0 && matchedProfs.size >= pool.length;

  return (
    <div className="max-w-5xl mx-auto py-4 px-4">
      {/* Top Title */}
      <div className="text-center mb-6">
        <span className="text-sm font-black text-teal-800 bg-teal-100 px-4 py-1 rounded-full uppercase tracking-wider inline-block mb-2">
          3-Bosqich · 1-O‘yin
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {t.title[currentLang]}
        </h2>
        <p className="text-sm font-bold text-slate-600 mt-1">
          {t.dragInstruction[currentLang]}
        </p>
      </div>

      {/* Target Tool Card to Match */}
      {currentTarget && !isRoundFinished && (
        <div className="bg-gradient-to-b from-teal-50 to-sky-50 rounded-3xl p-6 border-3 border-teal-300 shadow-md mb-8 flex flex-col items-center">
          <div className="flex items-center justify-between w-full mb-2">
            <span className="text-xs font-black text-teal-700 bg-white px-3 py-1 rounded-full shadow-sm">
              Topshiriq: {currentIndex + 1} / {pool.length}
            </span>

            {/* Hint Button */}
            <button
              onClick={handleApplyHint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs shadow-sm active:scale-95 transition-all"
              title="Yordam"
            >
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>{t.hintBtn[currentLang]}</span>
            </button>
          </div>

          {/* Big Tool Card (Touch-first, min 100px) */}
          <div className="my-2 p-6 bg-white rounded-3xl border-3 border-teal-400 shadow-lg flex flex-col items-center gap-2 animate-bounce-short">
            <span className="text-6xl sm:text-7xl filter drop-shadow">
              {currentTarget.toolEmoji}
            </span>
            <div className="text-center">
              <span className="text-xs font-bold text-slate-400 block">Buyum:</span>
              <h3 className="text-2xl font-black text-slate-800">
                {currentTarget.toolName[currentLang]}
              </h3>
            </div>
            <button
              onClick={() => speakText(currentTarget.toolName[currentLang], currentLang)}
              className="p-2 rounded-xl bg-teal-100 text-teal-800 hover:bg-teal-200 active:scale-95"
              title="Ovoz chiqarib o‘qish"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>

          {/* Feedback Text Message */}
          {feedbackMessage && (
            <div className="mt-3 bg-white/95 border-2 border-teal-400 px-5 py-2.5 rounded-2xl shadow-sm text-center">
              <p className="text-sm font-black text-teal-900">{feedbackMessage}</p>
            </div>
          )}
        </div>
      )}

      {/* Target Profession Options (Touch-first cards, min 80x80) */}
      {!isRoundFinished && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {pool.map((prof, idx) => {
            const isAlreadyMatched = matchedProfs.has(prof.id);
            const isTarget = currentTarget?.id === prof.id;
            // If hint is active, dim anything except the correct one and one distractor
            const isDimmed = hintActive && !isTarget && idx > 1;
            const isWiggling = wigglingProfId === prof.id;

            return (
              <button
                key={prof.id}
                disabled={isAlreadyMatched}
                onClick={() => {
                  playTap();
                  handleMatchAttempt(prof);
                }}
                className={`p-4 rounded-3xl border-3 flex flex-col items-center justify-between text-center min-h-[140px] transition-all shadow-md active:scale-95 ${
                  isAlreadyMatched
                    ? 'bg-slate-100 border-slate-200 opacity-40 cursor-not-allowed'
                    : isWiggling
                    ? 'animate-[wiggle_0.4s_ease-in-out] bg-rose-50 border-rose-300'
                    : isDimmed
                    ? 'opacity-25 grayscale'
                    : 'bg-white border-amber-200 hover:border-teal-400 hover:shadow-xl hover:scale-103'
                }`}
              >
                <span className="text-5xl sm:text-6xl mb-2 filter drop-shadow">
                  {prof.emoji}
                </span>

                <div className="w-full">
                  <h4 className="text-base sm:text-lg font-black text-slate-800 leading-tight">
                    {prof.name[currentLang]}
                  </h4>
                  {ageMode !== '3-4' && (
                    <span className="text-[11px] text-slate-500 font-semibold block truncate">
                      {prof.actionText[currentLang]}
                    </span>
                  )}
                </div>

                {isAlreadyMatched && (
                  <span className="mt-2 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs">
                    <Check className="w-4 h-4" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* All Pairs Completed Success Banner */}
      {isRoundFinished && (
        <div className="bg-gradient-to-r from-teal-400 to-emerald-500 rounded-3xl p-8 text-white text-center shadow-xl animate-in zoom-in-95 flex flex-col items-center">
          <span className="text-5xl mb-2">🎉</span>
          <h3 className="text-3xl font-black mb-2">Barakalla, bolajonlar!</h3>
          <p className="text-base font-semibold max-w-md opacity-90 mb-6">
            Barcha buyumlar o‘z kasb egalariga to‘g‘ri yetkazildi!
          </p>

          <button
            onClick={() => {
              playTap();
              onNext();
            }}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-teal-900 font-black text-lg shadow-lg hover:scale-105 active:scale-95 transition-all"
          >
            <span>{UI_TEXT.lessonPath.nextStep[currentLang]}: 2-O‘yin</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};
