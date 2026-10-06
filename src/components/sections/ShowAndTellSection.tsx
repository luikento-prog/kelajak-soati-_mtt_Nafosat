import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Play, Pause, RotateCcw, Volume2, Award, Sparkles, Check, ArrowRight } from 'lucide-react';
import { Language, AgeMode, ProfessionId } from '../../types';
import { PROFESSIONS } from '../../data/professions';
import { UI_TEXT, praiseWords } from '../../data/i18n';
import { playApplause, playDing, playTap, playBoop } from '../../utils/audio';
import { speakText } from '../../utils/speech';

interface ShowAndTellSectionProps {
  currentLang: Language;
  ageMode: AgeMode;
  onComplete: () => void;
  onNext: () => void;
}

export const ShowAndTellSection: React.FC<ShowAndTellSectionProps> = ({
  currentLang,
  ageMode,
  onComplete,
  onNext,
}) => {
  const t = UI_TEXT.showAndTell;

  // Initial student names for spinning wheel
  const [students, setStudents] = useState<string[]>([
    'Ali',
    'Fotima',
    'Jasur',
    'Madina',
    'Bobur',
    'Rayhona',
    'Umar',
    'Ziyoda',
  ]);
  const [selectedStudent, setSelectedStudent] = useState<string>('Ali');
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);

  // Timer configuration based on age mode
  const initialDuration = ageMode === '3-4' ? 15 : ageMode === '4-5' ? 25 : 35;
  const [timeLeft, setTimeLeft] = useState(initialDuration);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Backup card selection modal
  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false);
  const [chosenBackupProf, setChosenBackupProf] = useState<ProfessionId | null>(null);

  // Active prompt step
  const [promptStep, setPromptStep] = useState(0);

  // Listening sticker rewarded state
  const [listenersRewarded, setListenersRewarded] = useState(false);

  useEffect(() => {
    setTimeLeft(initialDuration);
    setIsTimerRunning(false);
  }, [ageMode, initialDuration]);

  // Visual sand timer countdown
  useEffect(() => {
    let timer: number;
    if (isTimerRunning && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            playDing();
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft]);

  // Spin wheel action
  const handleSpinWheel = () => {
    if (isSpinning) return;
    playTap();
    setIsSpinning(true);
    setListenersRewarded(false);

    const randomRotations = 5 + Math.floor(Math.random() * 5);
    const randomIndex = Math.floor(Math.random() * students.length);
    const sliceAngle = 360 / students.length;
    const targetAngle = wheelRotation + randomRotations * 360 + randomIndex * sliceAngle;

    setWheelRotation(targetAngle);

    setTimeout(() => {
      setSelectedStudent(students[randomIndex]);
      setIsSpinning(false);
      playDing();
      setTimeLeft(initialDuration);
      setPromptStep(0);
    }, 2800);
  };

  const handleApplause = () => {
    playApplause();
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.6 },
    });
    setListenersRewarded(true);
    onComplete();
  };

  const prompts = [
    t.prompt1[currentLang],
    t.prompt2[currentLang],
    ...(ageMode !== '3-4' ? [t.prompt3[currentLang]] : []),
    ...(ageMode === '5-6' ? [t.prompt4[currentLang]] : []),
  ];

  // Sand clock ratio
  const progressRatio = (initialDuration - timeLeft) / initialDuration;

  return (
    <div className="max-w-6xl mx-auto py-4 px-4">
      {/* Title */}
      <div className="text-center mb-6">
        <span className="text-sm font-black text-amber-800 bg-amber-100 px-4 py-1 rounded-full uppercase tracking-wider inline-block mb-2">
          2-Bosqich · Mening buyumim
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {t.title[currentLang]}
        </h2>
        <p className="text-sm text-slate-600 font-semibold mt-1">
          {ageMode === '3-4'
            ? '10–20 soniya · 1–2 so‘zli javoblar · Rasmlar yordamida'
            : ageMode === '4-5'
            ? '20–30 soniya · Oddiy gap tuzish'
            : '30–40 soniya · Fikrni asoslash va tushuntirish'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Random Turn Spinner (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border-3 border-amber-200 shadow-md flex flex-col items-center">
          <h3 className="text-lg font-black text-slate-800 mb-4 text-center">
            {t.spinTitle[currentLang]}
          </h3>

          {/* Wheel Graphic */}
          <div className="relative w-52 h-52 my-2 flex items-center justify-center">
            {/* Top Indicator Triangle */}
            <div className="absolute -top-3 z-20 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-16 border-t-rose-500 drop-shadow-md" />

            <div
              className="w-full h-full rounded-full border-4 border-amber-300 shadow-inner overflow-hidden relative transition-transform ease-out"
              style={{
                transform: `rotate(${wheelRotation}deg)`,
                transitionDuration: isSpinning ? '2.8s' : '0s',
                background:
                  'conic-gradient(#fde047 0% 12.5%, #a7f3d0 12.5% 25%, #bae6fd 25% 37.5%, #fed7aa 37.5% 50%, #fbcfe8 50% 62.5%, #ddd6fe 62.5% 75%, #bbf7d0 75% 87.5%, #fef08a 87.5% 100%)',
              }}
            >
              {/* Center Dot */}
              <div className="absolute inset-0 m-auto w-12 h-12 bg-white rounded-full border-2 border-amber-400 flex items-center justify-center shadow-md z-10 text-xl font-black">
                🎯
              </div>
            </div>
          </div>

          {/* Current Speaker Display */}
          <div className="mt-3 text-center w-full">
            <span className="text-xs font-bold text-slate-500">{t.spinWinner[currentLang]}</span>
            <div className="text-2xl font-black text-amber-700 bg-amber-50 py-2 px-4 rounded-2xl border border-amber-200 mt-1">
              ✨ {selectedStudent} ✨
            </div>
          </div>

          {/* Spin Button */}
          <button
            onClick={handleSpinWheel}
            disabled={isSpinning}
            className="w-full mt-4 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-400 text-amber-950 font-black text-lg shadow-md hover:scale-102 active:scale-95 transition-all disabled:opacity-50"
          >
            {t.spinBtn[currentLang]}
          </button>
        </div>

        {/* Right Column: Visual Sand Clock & Prompt Stages (8 cols) */}
        <div className="lg:col-span-8 bg-gradient-to-br from-amber-50/70 to-emerald-50/70 rounded-3xl p-6 border-3 border-emerald-200 shadow-md flex flex-col gap-6">
          {/* Top Row: Visual Sand-Clock Timer */}
          <div className="bg-white rounded-2xl p-5 border-2 border-amber-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Cute Sand Clock Illustration */}
              <div className="relative w-16 h-20 bg-amber-100 rounded-2xl border-2 border-amber-300 flex flex-col justify-between p-1 overflow-hidden shadow-inner">
                {/* Upper bulb */}
                <div
                  className="w-full bg-amber-400 rounded-t-lg transition-all duration-1000"
                  style={{ height: `${Math.max(4, (1 - progressRatio) * 36)}px` }}
                />
                {/* Thin waist */}
                <div className="w-1.5 h-2 mx-auto bg-amber-300" />
                {/* Lower bulb */}
                <div
                  className="w-full bg-amber-500 rounded-b-lg transition-all duration-1000 mt-auto"
                  style={{ height: `${Math.max(4, progressRatio * 36)}px` }}
                />
              </div>

              <div>
                <span className="text-xs font-bold text-slate-500 block">
                  {t.timerLabel[currentLang]}
                </span>
                <span className="text-3xl font-black text-amber-800 tabular-nums">
                  {timeLeft} s
                </span>
              </div>
            </div>

            {/* Timer Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  playTap();
                  setIsTimerRunning(!isTimerRunning);
                }}
                className={`px-5 py-3 rounded-2xl font-black text-base flex items-center gap-2 shadow-sm transition-all active:scale-95 ${
                  isTimerRunning
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-emerald-500 text-white hover:bg-emerald-600'
                }`}
              >
                {isTimerRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                <span>
                  {isTimerRunning ? t.pauseTimer[currentLang] : t.startTimer[currentLang]}
                </span>
              </button>

              <button
                onClick={() => {
                  playTap();
                  setIsTimerRunning(false);
                  setTimeLeft(initialDuration);
                }}
                className="p-3 rounded-2xl bg-slate-100 text-slate-600 hover:bg-slate-200 active:scale-95 transition-all"
                title={t.resetTimer[currentLang]}
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Middle Row: Progressive Prompt Cards */}
          <div className="bg-white rounded-2xl p-5 border-2 border-emerald-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                Taqdimot savollari ({promptStep + 1}/{prompts.length})
              </span>
              <button
                onClick={() => {
                  speakText(prompts[promptStep], currentLang);
                }}
                className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center hover:bg-emerald-200 active:scale-95"
                title="Ovoz chiqarib eshitish"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 mb-4 min-h-[70px] flex items-center">
              <p className="text-xl font-black text-emerald-900">{prompts[promptStep]}</p>
            </div>

            {/* Stepper Buttons */}
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  playTap();
                  setPromptStep((prev) => Math.max(0, prev - 1));
                }}
                disabled={promptStep === 0}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold disabled:opacity-30 active:scale-95"
              >
                ← Oldingi savol
              </button>

              <button
                onClick={() => {
                  playTap();
                  setPromptStep((prev) => Math.min(prompts.length - 1, prev + 1));
                }}
                disabled={promptStep === prompts.length - 1}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-black disabled:opacity-30 active:scale-95 shadow-sm"
              >
                Keyingi savol →
              </button>
            </div>
          </div>

          {/* Backup Button: Uy vazifam yo'q */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => {
                playTap();
                setIsBackupModalOpen(true);
              }}
              className="px-4 py-3 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 border-2 border-amber-300 font-bold text-sm flex items-center gap-2 active:scale-95 transition-all"
            >
              <span>{t.noHomeworkBtn[currentLang]}</span>
            </button>

            {chosenBackupProf && (
              <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-200">
                Tanlangan: {PROFESSIONS.find((p) => p.id === chosenBackupProf)?.name[currentLang]}
              </span>
            )}

            {/* Applause and Listener reward button */}
            <button
              onClick={handleApplause}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-base shadow-md hover:scale-103 active:scale-95 flex items-center gap-2 transition-all"
            >
              <span>{t.applauseBtn[currentLang]}</span>
            </button>
          </div>

          {/* Listener Sticker Shower Feedback */}
          {listenersRewarded && (
            <div className="bg-amber-100 border-2 border-amber-300 rounded-2xl p-4 flex items-center gap-3 animate-in fade-in slide-in-from-bottom duration-300">
              <span className="text-3xl">👂</span>
              <div className="flex-1">
                <span className="font-black text-amber-900 block text-sm">
                  {t.listenerSticker[currentLang]}
                </span>
                <span className="text-xs text-amber-800">{t.listenersRewarded[currentLang]}</span>
              </div>
              <span className="text-2xl animate-bounce">⭐</span>
            </div>
          )}
        </div>
      </div>

      {/* Backup Card Selection Modal */}
      {isBackupModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border-4 border-amber-300 animate-in zoom-in-95">
            <h3 className="text-xl font-black text-slate-900 mb-2 text-center">
              {t.noHomeworkModalTitle[currentLang]}
            </h3>
            <p className="text-xs text-slate-500 font-semibold mb-4 text-center">
              Har bir kasb qiziq va muhim! O‘zingga yoqqan rasmni tanlab gapirib ber:
            </p>

            <div className="grid grid-cols-3 gap-3 max-h-[60vh] overflow-y-auto p-1">
              {PROFESSIONS.map((prof) => (
                <button
                  key={prof.id}
                  onClick={() => {
                    playTap();
                    setChosenBackupProf(prof.id);
                    setIsBackupModalOpen(false);
                    speakText(prof.simpleSentence[currentLang], currentLang);
                  }}
                  className="p-3 rounded-2xl bg-amber-50 hover:bg-amber-100 border-2 border-amber-200 flex flex-col items-center gap-1.5 transition-all hover:scale-105 active:scale-95"
                >
                  <span className="text-3xl">{prof.emoji}</span>
                  <span className="text-sm font-black text-slate-800 text-center">
                    {prof.name[currentLang]}
                  </span>
                  <span className="text-xs text-slate-500 text-center">
                    {prof.toolEmoji} {prof.toolName[currentLang]}
                  </span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsBackupModalOpen(false)}
              className="mt-4 w-full py-3 rounded-2xl bg-slate-100 text-slate-700 font-black hover:bg-slate-200"
            >
              Yopish
            </button>
          </div>
        </div>
      )}

      {/* Next Step Navigation */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={() => {
            playTap();
            onNext();
          }}
          className="flex items-center gap-3 px-8 py-4 rounded-3xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-lg shadow-lg hover:scale-105 active:scale-95 transition-all"
        >
          <span>{UI_TEXT.lessonPath.nextStep[currentLang]}: 1-O‘yin</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
