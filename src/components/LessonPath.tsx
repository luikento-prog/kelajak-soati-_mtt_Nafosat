import React from 'react';
import { Star, CheckCircle, Sparkles, Music, Palette } from 'lucide-react';
import { Language, ActiveSection } from '../types';
import { UI_TEXT } from '../data/i18n';
import { playTap } from '../utils/audio';

interface LessonPathProps {
  currentLang: Language;
  completedSteps: Set<string>;
  onSelectSection: (section: ActiveSection) => void;
  onOpenDanceBreak: () => void;
  onOpenColoring: () => void;
}

export const LessonPath: React.FC<LessonPathProps> = ({
  currentLang,
  completedSteps,
  onSelectSection,
  onOpenDanceBreak,
  onOpenColoring,
}) => {
  const t = UI_TEXT.lessonPath;

  const steps: {
    id: ActiveSection;
    key: string;
    icon: string;
    title: string;
    desc: string;
    badgeBg: string;
    borderCol: string;
  }[] = [
    {
      id: 'greeting',
      key: 'step1',
      icon: '👋',
      title: t.step1Title[currentLang],
      desc: t.step1Desc[currentLang],
      badgeBg: 'bg-emerald-100 text-emerald-800',
      borderCol: 'border-emerald-300 hover:border-emerald-500',
    },
    {
      id: 'show-and-tell',
      key: 'step2',
      icon: '🎒',
      title: t.step2Title[currentLang],
      desc: t.step2Desc[currentLang],
      badgeBg: 'bg-amber-100 text-amber-800',
      borderCol: 'border-amber-300 hover:border-amber-500',
    },
    {
      id: 'game1',
      key: 'step3',
      icon: '🎯',
      title: t.step3Title[currentLang],
      desc: t.step3Desc[currentLang],
      badgeBg: 'bg-teal-100 text-teal-800',
      borderCol: 'border-teal-300 hover:border-teal-500',
    },
    {
      id: 'game2',
      key: 'step4',
      icon: '🃏',
      title: t.step4Title[currentLang],
      desc: t.step4Desc[currentLang],
      badgeBg: 'bg-indigo-100 text-indigo-800',
      borderCol: 'border-indigo-300 hover:border-indigo-500',
    },
    {
      id: 'game3',
      key: 'step5',
      icon: '🛠',
      title: t.step5Title[currentLang],
      desc: t.step5Desc[currentLang],
      badgeBg: 'bg-orange-100 text-orange-800',
      borderCol: 'border-orange-300 hover:border-orange-500',
    },
    {
      id: 'game4',
      key: 'step6',
      icon: '🔊',
      title: t.step6Title[currentLang],
      desc: t.step6Desc[currentLang],
      badgeBg: 'bg-rose-100 text-rose-800',
      borderCol: 'border-rose-300 hover:border-rose-500',
    },
    {
      id: 'dream-profession',
      key: 'step7',
      icon: '🌟',
      title: t.step7Title[currentLang],
      desc: t.step7Desc[currentLang],
      badgeBg: 'bg-purple-100 text-purple-800',
      borderCol: 'border-purple-300 hover:border-purple-500',
    },
    {
      id: 'reflection',
      key: 'step8',
      icon: '💬',
      title: t.step8Title[currentLang],
      desc: t.step8Desc[currentLang],
      badgeBg: 'bg-sky-100 text-sky-800',
      borderCol: 'border-sky-300 hover:border-sky-500',
    },
    {
      id: 'next-week',
      key: 'step9',
      icon: '📅',
      title: t.step9Title[currentLang],
      desc: t.step9Desc[currentLang],
      badgeBg: 'bg-lime-100 text-lime-800',
      borderCol: 'border-lime-300 hover:border-lime-500',
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto py-6 px-4">
      {/* Banner & Energy Breaks Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-gradient-to-r from-amber-100/90 via-emerald-100/80 to-sky-100/90 p-5 rounded-3xl border-2 border-amber-200/90 shadow-sm">
        <div>
          <span className="inline-block text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-200/80 px-3 py-1 rounded-full mb-1">
            20–25 daqiqalik dars xaritasi
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Kasblar olamiga sayohat 🎈
          </h1>
          <p className="text-sm font-semibold text-slate-600">
            Har bir bosqichni birgalikda o‘rganamiz va yulduzchalarni to‘playmiz!
          </p>
        </div>

        {/* Quick Activity Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              playTap();
              onOpenDanceBreak();
            }}
            className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-black text-sm shadow-md hover:shadow-lg hover:scale-103 active:scale-95 transition-all"
          >
            <Music className="w-5 h-5 animate-bounce" />
            <span>{t.movementBreakBtn[currentLang]}</span>
          </button>

          <button
            onClick={() => {
              playTap();
              onOpenColoring();
            }}
            className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 text-amber-950 font-black text-sm shadow-md hover:shadow-lg hover:scale-103 active:scale-95 transition-all"
          >
            <Palette className="w-5 h-5" />
            <span>{t.coloringBtn[currentLang]}</span>
          </button>
        </div>
      </div>

      {/* Stepping Stones Grid (min 80px touch target, cards are 100px+) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {steps.map((step, index) => {
          const isDone = completedSteps.has(step.id);
          return (
            <button
              key={step.id}
              onClick={() => {
                playTap();
                onSelectSection(step.id);
              }}
              className={`relative flex flex-col text-left p-6 rounded-3xl bg-white border-3 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 active:translate-y-0 active:scale-98 ${step.borderCol} group min-h-[140px]`}
            >
              {/* Top Row: Number, Icon, and Completed Star Badge */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-inner bg-slate-50 border border-slate-100 group-hover:scale-110 transition-transform">
                    {step.icon}
                  </span>
                  <div>
                    <span className="text-xs font-black text-slate-600 block">
                      {index + 1}-qadam
                    </span>
                    <h3 className="text-lg font-black text-slate-800 leading-tight">
                      {step.title}
                    </h3>
                  </div>
                </div>

                {isDone ? (
                  <span className="w-9 h-9 rounded-full bg-amber-400 text-white flex items-center justify-center shadow-md animate-pulse">
                    <Star className="w-5 h-5 fill-white text-white" />
                  </span>
                ) : (
                  <span className="w-9 h-9 rounded-full bg-slate-100 text-slate-300 flex items-center justify-center border border-slate-200">
                    <Star className="w-5 h-5" />
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs font-semibold text-slate-500 mt-auto leading-relaxed">
                {step.desc}
              </p>

              {/* Bottom decorative bar */}
              <div className="mt-3 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    isDone ? 'w-full bg-amber-400' : 'w-0'
                  }`}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
