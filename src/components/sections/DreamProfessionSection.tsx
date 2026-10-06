import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, User, Plus, ArrowRight, Heart, Volume2 } from 'lucide-react';
import { Language, AgeMode, ProfessionId, WallChild } from '../../types';
import { PROFESSIONS } from '../../data/professions';
import { UI_TEXT, praiseWords } from '../../data/i18n';
import { playDing, playCelebration, playTap } from '../../utils/audio';
import { speakText } from '../../utils/speech';

interface DreamProfessionSectionProps {
  currentLang: Language;
  ageMode: AgeMode;
  wallChildren: WallChild[];
  onAddChildToWall: (child: WallChild) => void;
  onComplete: () => void;
  onNext: () => void;
}

export const DreamProfessionSection: React.FC<DreamProfessionSectionProps> = ({
  currentLang,
  ageMode,
  wallChildren,
  onAddChildToWall,
  onComplete,
  onNext,
}) => {
  const t = UI_TEXT.dream;

  const [childName, setChildName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState<'boy1' | 'girl1' | 'boy2' | 'girl2'>('boy1');
  const [selectedProfId, setSelectedProfId] = useState<ProfessionId>('doctor');
  const [customReason, setCustomReason] = useState('');

  const activeProf = PROFESSIONS.find((p) => p.id === selectedProfId) || PROFESSIONS[0];

  const avatarOptions: { id: 'boy1' | 'girl1' | 'boy2' | 'girl2'; label: string; icon: string }[] = [
    { id: 'boy1', label: 'Bola 1', icon: '👦' },
    { id: 'girl1', label: 'Qizaloq 1', icon: '👧' },
    { id: 'boy2', label: 'Bola 2', icon: '🧒' },
    { id: 'girl2', label: 'Qizaloq 2', icon: '👩' },
  ];

  const handleAddToWall = () => {
    if (!childName.trim()) return;
    playCelebration();

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });

    const newChild: WallChild = {
      id: `${Date.now()}-${Math.random()}`,
      name: childName.trim(),
      professionId: selectedProfId,
      avatarFace: selectedAvatar,
      reason: customReason.trim() || activeProf.whyReason[currentLang],
      timestamp: Date.now(),
    };

    onAddChildToWall(newChild);
    setChildName('');
    setCustomReason('');
    onComplete();
  };

  const currentSentence = `${t.sentenceStarter[currentLang]} ${activeProf.name[currentLang]}. ${activeProf.whyReason[currentLang]}`;

  return (
    <div className="max-w-6xl mx-auto py-4 px-4">
      {/* Title */}
      <div className="text-center mb-6">
        <span className="text-sm font-black text-purple-800 bg-purple-100 px-4 py-1 rounded-full uppercase tracking-wider inline-block mb-1">
          7-Bosqich · Orzudagi kasb
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {t.title[currentLang]}
        </h2>
        <p className="text-sm font-bold text-slate-600 mt-1">
          {t.subtitle[currentLang]}
        </p>
      </div>

      {/* Equality Banner */}
      <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-amber-100 rounded-3xl p-4 border-2 border-purple-200 text-center mb-6 shadow-sm">
        <p className="text-sm sm:text-base font-black text-purple-950 flex items-center justify-center gap-2">
          <Heart className="w-5 h-5 text-rose-500 fill-rose-500 shrink-0" />
          <span>{t.mottoBanner[currentLang]}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Dress-Up Creator Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border-3 border-purple-200 shadow-md flex flex-col gap-5">
          {/* 1. Name Input */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">
              {t.nameInput[currentLang]}
            </label>
            <input
              type="text"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              placeholder="Masalan: Ali, Fotima, Jasur..."
              className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-purple-400 focus:outline-none font-bold text-base text-slate-800"
            />
          </div>

          {/* 2. Choose Avatar face */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">
              {t.characterType[currentLang]}
            </label>
            <div className="grid grid-cols-4 gap-2">
              {avatarOptions.map((av) => (
                <button
                  key={av.id}
                  type="button"
                  onClick={() => {
                    playTap();
                    setSelectedAvatar(av.id);
                  }}
                  className={`p-3 rounded-2xl border-2 flex flex-col items-center gap-1 transition-all active:scale-95 ${
                    selectedAvatar === av.id
                      ? 'bg-purple-100 border-purple-500 ring-2 ring-purple-300 scale-102'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-3xl">{av.icon}</span>
                  <span className="text-xs font-bold text-slate-700">{av.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Choose Profession */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">
              {t.selectProfession[currentLang]}
            </label>
            <div className="grid grid-cols-3 gap-2.5 max-h-48 overflow-y-auto p-1">
              {PROFESSIONS.map((p) => {
                const isSelected = selectedProfId === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      playTap();
                      setSelectedProfId(p.id);
                    }}
                    className={`p-2.5 rounded-2xl border-2 flex items-center gap-2 transition-all active:scale-95 ${
                      isSelected
                        ? 'bg-purple-50 border-purple-500 ring-2 ring-purple-300 scale-102'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-2xl">{p.emoji}</span>
                    <span className="text-xs font-black text-slate-800 truncate">
                      {p.name[currentLang]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Sentence Starter Prompt */}
          <div className="bg-purple-50 rounded-2xl p-4 border border-purple-200">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-black text-purple-800">
                Gap namunasi (5-6 yosh uchun):
              </span>
              <button
                onClick={() => speakText(currentSentence, currentLang)}
                className="w-8 h-8 rounded-lg bg-purple-200 text-purple-900 flex items-center justify-center hover:bg-purple-300 active:scale-95"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm font-bold text-purple-950 italic">"{currentSentence}"</p>
          </div>

          {/* Add to Wall Button */}
          <button
            type="button"
            disabled={!childName.trim()}
            onClick={handleAddToWall}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black text-lg shadow-md hover:scale-102 active:scale-95 transition-all disabled:opacity-40 flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            <span>{t.addToWallBtn[currentLang]}</span>
          </button>
        </div>

        {/* Right Column: Live Dressed-Up Avatar Preview (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-b from-purple-50 to-pink-50 rounded-3xl p-6 border-3 border-purple-300 shadow-md flex flex-col items-center">
          <span className="text-xs font-black uppercase tracking-wider text-purple-700 bg-white px-3 py-1 rounded-full mb-4 shadow-sm">
            Qahramon ko‘rinishi ✨
          </span>

          {/* Layered Avatar Uniform Preview */}
          <div className="relative w-48 h-48 bg-white rounded-3xl border-3 border-purple-300 shadow-lg flex flex-col items-center justify-center p-4">
            {/* Base Head Emoji */}
            <span className="text-7xl filter drop-shadow">
              {avatarOptions.find((a) => a.id === selectedAvatar)?.icon}
            </span>

            {/* Profession Tool & Badge Overlay */}
            <div className="absolute -top-3 -right-3 w-12 h-12 bg-amber-300 border-2 border-white rounded-2xl flex items-center justify-center text-2xl shadow-md animate-bounce">
              {activeProf.toolEmoji}
            </div>

            <div className="absolute -bottom-3 -left-3 w-12 h-12 bg-purple-400 border-2 border-white rounded-2xl flex items-center justify-center text-2xl shadow-md">
              {activeProf.emoji}
            </div>
          </div>

          <div className="mt-4 text-center">
            <h4 className="text-xl font-black text-slate-800">
              {childName || 'Bolajon'}
            </h4>
            <span className="text-sm font-bold text-purple-700 block mt-0.5">
              Kelajakda: {activeProf.name[currentLang]} 🌟
            </span>
          </div>
        </div>
      </div>

      {/* Classroom "Kasblar Devori" Gallery */}
      <div className="mt-10 bg-white rounded-3xl p-6 border-3 border-amber-200 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <span>🖼️</span>
            <span>{t.wallTitle[currentLang]}</span>
            <span className="text-xs font-black text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full ml-2">
              {wallChildren.length} nafar do‘stimiz
            </span>
          </h3>
        </div>

        {wallChildren.length === 0 ? (
          <div className="py-8 text-center text-slate-400 font-semibold text-sm">
            Hozircha devorda hech kim yo‘q. Bolajonlarning orzusidagi kasblarini yuqorida qo‘shing!
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {wallChildren.map((item) => {
              const prof = PROFESSIONS.find((p) => p.id === item.professionId);
              const face = avatarOptions.find((a) => a.id === item.avatarFace)?.icon || '🧒';

              return (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-gradient-to-b from-amber-50/80 to-purple-50/80 border-2 border-amber-200 flex flex-col items-center text-center gap-1 shadow-sm hover:scale-103 transition-transform"
                >
                  <div className="relative">
                    <span className="text-4xl">{face}</span>
                    <span className="absolute -bottom-1 -right-1 text-lg">
                      {prof?.toolEmoji}
                    </span>
                  </div>
                  <span className="font-black text-sm text-slate-900 truncate w-full mt-1">
                    {item.name}
                  </span>
                  <span className="text-[11px] font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded-full truncate w-full">
                    {prof?.name[currentLang]}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Next Step Navigation */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={() => {
            playTap();
            onNext();
          }}
          className="flex items-center gap-3 px-8 py-4 rounded-3xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black text-lg shadow-lg hover:scale-105 active:scale-95 transition-all"
        >
          <span>{UI_TEXT.lessonPath.nextStep[currentLang]}: Yakuniy refleksiya</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
