import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, ArrowRight, Sparkles, Check } from 'lucide-react';
import { Language, AgeMode, ProfessionData } from '../../types';
import { PROFESSIONS } from '../../data/professions';
import { UI_TEXT, praiseWords, tryAgainWords } from '../../data/i18n';
import { playDing, playBoop, playProfessionSound, playTap } from '../../utils/audio';
import { speakText } from '../../utils/speech';

interface Game3ActionQuizProps {
  currentLang: Language;
  ageMode: AgeMode;
  onComplete: () => void;
  onNext: () => void;
}

export const Game3ActionQuiz: React.FC<Game3ActionQuizProps> = ({
  currentLang,
  ageMode,
  onComplete,
  onNext,
}) => {
  const t = UI_TEXT.game3;

  // Selected questions count
  const questionCount = ageMode === '3-4' ? 3 : ageMode === '4-5' ? 4 : 5;
  const [questions] = useState<ProfessionData[]>(() =>
    [...PROFESSIONS].sort(() => 0.5 - Math.random()).slice(0, questionCount)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wigglingOptionId, setWigglingOptionId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const currentProf = questions[currentIndex];

  // Generate options (1 correct + 1 or 2 distractors)
  const getOptions = (target: ProfessionData) => {
    const distractors = PROFESSIONS.filter((p) => p.id !== target.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, ageMode === '3-4' ? 1 : 2);

    return [target, ...distractors].sort(() => 0.5 - Math.random());
  };

  const [currentOptions, setCurrentOptions] = useState<ProfessionData[]>(() =>
    currentProf ? getOptions(currentProf) : []
  );

  const handleSelectOption = (option: ProfessionData) => {
    if (!currentProf) return;
    playTap();

    if (option.id === currentProf.id) {
      // Correct!
      playDing();
      playProfessionSound(currentProf.soundType);

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });

      const praise = praiseWords[currentLang][0];
      setFeedback(`${praise} ${currentProf.name[currentLang]} ${currentProf.actionText[currentLang].toLowerCase()}!`);
      speakText(`${currentProf.name[currentLang]} ${currentProf.actionText[currentLang]}`, currentLang);

      setTimeout(() => {
        setFeedback(null);
        if (currentIndex + 1 < questions.length) {
          const nextIdx = currentIndex + 1;
          setCurrentIndex(nextIdx);
          setCurrentOptions(getOptions(questions[nextIdx]));
        } else {
          setIsFinished(true);
          onComplete();
        }
      }, 2000);
    } else {
      // Try again
      playBoop();
      setWigglingOptionId(option.id);
      setFeedback(tryAgainWords[currentLang]);
      setTimeout(() => {
        setWigglingOptionId(null);
      }, 600);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-4 px-4">
      {/* Title */}
      <div className="text-center mb-6">
        <span className="text-sm font-black text-orange-800 bg-orange-100 px-4 py-1 rounded-full uppercase tracking-wider inline-block mb-1">
          5-Bosqich · 3-O‘yin
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {t.title[currentLang]}
        </h2>
        <p className="text-sm font-bold text-slate-600">
          Savol: {currentIndex + 1} / {questions.length}
        </p>
      </div>

      {!isFinished && currentProf && (
        <div className="flex flex-col items-center">
          {/* Question Character Showcase */}
          <div className="w-full bg-gradient-to-b from-orange-50 to-amber-50 rounded-3xl p-6 border-3 border-orange-200 shadow-md flex flex-col items-center mb-6">
            <span className="text-7xl filter drop-shadow mb-2">{currentProf.emoji}</span>

            <div className="flex items-center gap-2">
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                {currentProf.name[currentLang]} {t.questionPrefix[currentLang]}
              </h3>
              <button
                onClick={() =>
                  speakText(
                    `${currentProf.name[currentLang]} ${t.questionPrefix[currentLang]}`,
                    currentLang
                  )
                }
                className="w-10 h-10 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center hover:bg-orange-200 active:scale-95"
                title="Ovoz chiqarib eshitish"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            {feedback && (
              <div className="mt-3 bg-white px-5 py-2 rounded-2xl border-2 border-orange-300 shadow-sm text-center animate-in fade-in">
                <span className="text-sm font-black text-orange-900">{feedback}</span>
              </div>
            )}
          </div>

          {/* Action Choice Buttons (min 100px touch height) */}
          <div className={`grid w-full gap-4 ${currentOptions.length === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-3'}`}>
            {currentOptions.map((opt) => {
              const isWiggling = wigglingOptionId === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt)}
                  className={`p-6 rounded-3xl bg-white border-3 flex flex-col items-center text-center justify-center gap-3 transition-all min-h-[120px] shadow-md hover:shadow-xl active:scale-95 ${
                    isWiggling
                      ? 'animate-[wiggle_0.4s_ease-in-out] bg-rose-50 border-rose-300'
                      : 'border-amber-200 hover:border-orange-400 hover:scale-103'
                  }`}
                >
                  <span className="text-5xl">{opt.toolEmoji}</span>
                  <span className="text-lg font-black text-slate-800 leading-snug">
                    {opt.actionText[currentLang]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Finished Banner */}
      {isFinished && (
        <div className="bg-gradient-to-r from-orange-400 to-amber-500 rounded-3xl p-8 text-white text-center shadow-xl flex flex-col items-center">
          <span className="text-5xl mb-2">🎈</span>
          <h3 className="text-3xl font-black mb-1">{t.actionDone[currentLang]}</h3>
          <p className="text-base font-semibold opacity-90 mb-6">
            Barcha kasb egalarining harakatlarini mukammal bilasiz!
          </p>

          <button
            onClick={() => {
              playTap();
              onNext();
            }}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-orange-950 font-black text-lg shadow-lg hover:scale-105 active:scale-95 transition-all"
          >
            <span>{UI_TEXT.lessonPath.nextStep[currentLang]}: 4-O‘yin (Bonus)</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};
