import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, Mic, ArrowRight, Check, Sparkles, RefreshCw } from 'lucide-react';
import { Language, AgeMode, ProfessionData } from '../../types';
import { PROFESSIONS } from '../../data/professions';
import { UI_TEXT, praiseWords } from '../../data/i18n';
import { playDing, playBoop, playProfessionSound, playTap } from '../../utils/audio';
import { speakText } from '../../utils/speech';

interface Game2MemoryMatchProps {
  currentLang: Language;
  ageMode: AgeMode;
  onComplete: () => void;
  onNext: () => void;
}

interface MemoryCard {
  cardId: string;
  profId: string;
  type: 'character' | 'tool';
  emoji: string;
  label: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export const Game2MemoryMatch: React.FC<Game2MemoryMatchProps> = ({
  currentLang,
  ageMode,
  onComplete,
  onNext,
}) => {
  const t = UI_TEXT.game2;

  // Pairs based on age
  const pairCount = ageMode === '3-4' ? 3 : ageMode === '4-5' ? 4 : 6;

  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedProfIds, setMatchedProfIds] = useState<Set<string>>(new Set());
  const [activeWhyProf, setActiveWhyProf] = useState<ProfessionData | null>(null);
  const [lineMode, setLineMode] = useState(false);
  const [selectedProfLine, setSelectedProfLine] = useState<ProfessionData | null>(null);

  // Initialize cards
  const initGame = () => {
    const selectedProfs = [...PROFESSIONS]
      .sort(() => 0.5 - Math.random())
      .slice(0, pairCount);

    const generatedCards: MemoryCard[] = [];

    selectedProfs.forEach((prof) => {
      // Card 1: Character
      generatedCards.push({
        cardId: `${prof.id}-char`,
        profId: prof.id,
        type: 'character',
        emoji: prof.emoji,
        label: prof.name[currentLang],
        isFlipped: false,
        isMatched: false,
      });

      // Card 2: Tool
      generatedCards.push({
        cardId: `${prof.id}-tool`,
        profId: prof.id,
        type: 'tool',
        emoji: prof.toolEmoji,
        label: prof.toolName[currentLang],
        isFlipped: false,
        isMatched: false,
      });
    });

    // Shuffle cards
    setCards(generatedCards.sort(() => 0.5 - Math.random()));
    setFlippedCards([]);
    setMatchedProfIds(new Set());
    setActiveWhyProf(null);
  };

  useEffect(() => {
    initGame();
  }, [ageMode, pairCount, currentLang]);

  // Handle Memory Card Flip
  const handleCardClick = (index: number) => {
    if (flippedCards.length >= 2) return;
    const card = cards[index];
    if (card.isFlipped || card.isMatched) return;

    playTap();

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const first = cards[newFlipped[0]];
      const second = cards[newFlipped[1]];

      if (first.profId === second.profId && first.type !== second.type) {
        // MATCH!
        playDing();
        const matchedProf = PROFESSIONS.find((p) => p.id === first.profId);
        if (matchedProf) {
          playProfessionSound(matchedProf.soundType);
        }

        setTimeout(() => {
          const updated = [...cards];
          updated[newFlipped[0]].isMatched = true;
          updated[newFlipped[1]].isMatched = true;
          setCards(updated);
          setFlippedCards([]);

          const nextMatched = new Set(matchedProfIds);
          nextMatched.add(first.profId);
          setMatchedProfIds(nextMatched);

          // In 5-6 mode, prompt "Nega?"
          if (ageMode === '5-6' && matchedProf) {
            setActiveWhyProf(matchedProf);
          }

          if (nextMatched.size >= pairCount) {
            confetti({
              particleCount: 70,
              spread: 70,
              origin: { y: 0.6 },
            });
            onComplete();
          }
        }, 500);
      } else {
        // NO MATCH
        playBoop();
        setTimeout(() => {
          const reverted = [...cards];
          reverted[newFlipped[0]].isFlipped = false;
          reverted[newFlipped[1]].isFlipped = false;
          setCards(reverted);
          setFlippedCards([]);
        }, 1200);
      }
    }
  };

  // Line Mode matching handlers
  const handleLineProfClick = (prof: ProfessionData) => {
    if (matchedProfIds.has(prof.id)) return;
    playTap();
    setSelectedProfLine(prof);
  };

  const handleLineToolClick = (prof: ProfessionData) => {
    if (!selectedProfLine) return;
    if (selectedProfLine.id === prof.id) {
      // Match!
      playDing();
      playProfessionSound(prof.soundType);
      const nextMatched = new Set(matchedProfIds);
      nextMatched.add(prof.id);
      setMatchedProfIds(nextMatched);
      setSelectedProfLine(null);

      if (ageMode === '5-6') {
        setActiveWhyProf(prof);
      }

      if (nextMatched.size >= pairCount) {
        confetti({
          particleCount: 70,
          spread: 70,
          origin: { y: 0.6 },
        });
        onComplete();
      }
    } else {
      playBoop();
      setSelectedProfLine(null);
    }
  };

  const activeProfsList = PROFESSIONS.slice(0, pairCount);
  const isFinished = matchedProfIds.size >= pairCount;

  return (
    <div className="max-w-5xl mx-auto py-4 px-4">
      {/* Title & Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-sm font-black text-indigo-800 bg-indigo-100 px-4 py-1 rounded-full uppercase tracking-wider inline-block mb-1">
            4-Bosqich · 2-O‘yin
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {t.title[currentLang]}
          </h2>
          <p className="text-sm font-bold text-slate-600">
            {t.matchedCount[currentLang]} {matchedProfIds.size} / {pairCount}
          </p>
        </div>

        {/* Mode Toggle: Memory Cards vs Line Match */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl border border-slate-200">
          <button
            onClick={() => {
              playTap();
              setLineMode(false);
            }}
            className={`px-3 py-2 rounded-xl text-xs font-black transition-all ${
              !lineMode
                ? 'bg-white text-indigo-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.modeFlip[currentLang]}
          </button>
          <button
            onClick={() => {
              playTap();
              setLineMode(true);
            }}
            className={`px-3 py-2 rounded-xl text-xs font-black transition-all ${
              lineMode
                ? 'bg-white text-indigo-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.modeLines[currentLang]}
          </button>
        </div>
      </div>

      {/* 5-6 Age Mode Prompt: "Nega shu buyumni tanlading?" */}
      {activeWhyProf && (
        <div className="bg-purple-100 border-2 border-purple-300 rounded-3xl p-4 mb-6 flex flex-wrap items-center justify-between gap-3 animate-in slide-in-from-top">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{activeWhyProf.emoji}</span>
            <div>
              <p className="text-sm sm:text-base font-black text-purple-950">
                {t.whyQuestion[currentLang]}
              </p>
              <p className="text-xs text-purple-800">
                Masalan: "{activeWhyProf.whyReason[currentLang]}"
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              speakText(
                `Nega ${activeWhyProf.name[currentLang]} uchun ${activeWhyProf.toolName[currentLang]} tanlandi? Chunki ${activeWhyProf.whyReason[currentLang]}`,
                currentLang
              );
            }}
            className="px-4 py-2 bg-purple-600 text-white rounded-xl font-black text-xs flex items-center gap-1.5 shadow-sm active:scale-95"
          >
            <Mic className="w-4 h-4" />
            <span>Ovoz berish</span>
          </button>
        </div>
      )}

      {/* Memory Cards Grid Mode */}
      {!lineMode && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {cards.map((card, index) => {
            const isVisible = card.isFlipped || card.isMatched;

            return (
              <button
                key={card.cardId}
                onClick={() => handleCardClick(index)}
                disabled={card.isMatched}
                className={`relative h-32 sm:h-36 rounded-3xl border-3 flex flex-col items-center justify-center p-3 text-center transition-all duration-300 shadow-md active:scale-95 ${
                  card.isMatched
                    ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-200'
                    : isVisible
                    ? 'bg-white border-indigo-400 shadow-lg'
                    : 'bg-gradient-to-br from-indigo-500 to-purple-600 border-indigo-400 text-white hover:scale-103'
                }`}
              >
                {isVisible ? (
                  <div className="flex flex-col items-center justify-center gap-1 animate-in zoom-in-75">
                    <span className="text-4xl filter drop-shadow">{card.emoji}</span>
                    <span className="text-xs font-black text-slate-800 leading-tight line-clamp-2">
                      {card.label}
                    </span>
                    {card.isMatched && (
                      <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-1">
                    <span className="text-3xl opacity-80">❓</span>
                    <span className="text-[11px] font-black uppercase tracking-wider opacity-90">
                      Dino
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Alternative Line Connect Mode */}
      {lineMode && (
        <div className="grid grid-cols-2 gap-6 bg-white p-6 rounded-3xl border-3 border-indigo-200 shadow-md">
          {/* Left Column: Professions */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-black uppercase tracking-wider text-indigo-700 bg-indigo-50 p-2 rounded-xl text-center">
              Kasb egalari 👩‍🍳
            </span>
            {activeProfsList.map((prof) => {
              const isMatched = matchedProfIds.has(prof.id);
              const isSelected = selectedProfLine?.id === prof.id;

              return (
                <button
                  key={prof.id}
                  disabled={isMatched}
                  onClick={() => handleLineProfClick(prof)}
                  className={`p-3.5 rounded-2xl border-2 flex items-center gap-3 transition-all ${
                    isMatched
                      ? 'bg-emerald-50 border-emerald-300 opacity-50'
                      : isSelected
                      ? 'bg-indigo-100 border-indigo-500 ring-4 ring-indigo-200 scale-102'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100 active:scale-95'
                  }`}
                >
                  <span className="text-3xl">{prof.emoji}</span>
                  <span className="font-black text-sm text-slate-800">
                    {prof.name[currentLang]}
                  </span>
                  {isMatched && <Check className="w-4 h-4 text-emerald-600 ml-auto" />}
                </button>
              );
            })}
          </div>

          {/* Right Column: Tools */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-black uppercase tracking-wider text-amber-700 bg-amber-50 p-2 rounded-xl text-center">
              Mehnat buyumlari 🛠
            </span>
            {activeProfsList.map((prof) => {
              const isMatched = matchedProfIds.has(prof.id);

              return (
                <button
                  key={prof.id}
                  disabled={isMatched}
                  onClick={() => handleLineToolClick(prof)}
                  className={`p-3.5 rounded-2xl border-2 flex items-center gap-3 transition-all ${
                    isMatched
                      ? 'bg-emerald-50 border-emerald-300 opacity-50'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100 active:scale-95'
                  }`}
                >
                  <span className="text-3xl">{prof.toolEmoji}</span>
                  <span className="font-black text-sm text-slate-800">
                    {prof.toolName[currentLang]}
                  </span>
                  {isMatched && <Check className="w-4 h-4 text-emerald-600 ml-auto" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Completion Banner */}
      {isFinished && (
        <div className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-6 text-white text-center shadow-xl flex flex-col items-center">
          <span className="text-4xl mb-2">🌟</span>
          <h3 className="text-2xl font-black mb-1">Ofarin! Barcha juftliklar topildi!</h3>
          <p className="text-sm font-semibold opacity-90 mb-4">
            Xotirangiz juda kuchli, yulduzcha guruh hisobiga qo‘shildi!
          </p>

          <button
            onClick={() => {
              playTap();
              onNext();
            }}
            className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-indigo-900 font-black text-lg shadow-md hover:scale-105 active:scale-95 transition-all"
          >
            <span>{UI_TEXT.lessonPath.nextStep[currentLang]}: 3-O‘yin</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};
