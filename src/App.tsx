import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LessonPath } from './components/LessonPath';
import { GreetingSection } from './components/sections/GreetingSection';
import { ShowAndTellSection } from './components/sections/ShowAndTellSection';
import { Game1ToolMatch } from './components/sections/Game1ToolMatch';
import { Game2MemoryMatch } from './components/sections/Game2MemoryMatch';
import { Game3ActionQuiz } from './components/sections/Game3ActionQuiz';
import { Game4SoundGuess } from './components/sections/Game4SoundGuess';
import { DreamProfessionSection } from './components/sections/DreamProfessionSection';
import { ReflectionSection } from './components/sections/ReflectionSection';
import { NextWeekPreview } from './components/sections/NextWeekPreview';
import { DanceBreakModal } from './components/modals/DanceBreakModal';
import { ColoringModal } from './components/modals/ColoringModal';
import { TeacherPanelModal } from './components/modals/TeacherPanelModal';
import { Language, AgeMode, ActiveSection, WallChild } from './types';
import { ArrowLeft, Home } from 'lucide-react';
import { UI_TEXT } from './data/i18n';
import { playTap, playDing } from './utils/audio';

const STORAGE_KEYS = {
  LANG: 'future_hour_lang',
  AGE: 'future_hour_agemode',
  STARS: 'future_hour_stars',
  COMPLETED: 'future_hour_completed_steps',
  WALL: 'future_hour_wall_children',
};

export default function App() {
  // Load persisted state safely
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LANG);
      if (saved === 'uz' || saved === 'ru' || saved === 'en') return saved;
    } catch {
      // ignore
    }
    return 'uz';
  });

  const [ageMode, setAgeMode] = useState<AgeMode>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.AGE);
      if (saved === '3-4' || saved === '4-5' || saved === '5-6') return saved;
    } catch {
      // ignore
    }
    return '4-5';
  });

  const [totalStars, setTotalStars] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STARS);
      if (saved) return parseInt(saved, 10) || 0;
    } catch {
      // ignore
    }
    return 0;
  });

  const [completedSteps, setCompletedSteps] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMPLETED);
      if (saved) return new Set(JSON.parse(saved));
    } catch {
      // ignore
    }
    return new Set<string>();
  });

  const [wallChildren, setWallChildren] = useState<WallChild[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WALL);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        id: 'init-1',
        name: 'Jasur',
        professionId: 'builder',
        avatarFace: 'boy1',
        reason: 'Chunki chiroyli uylar qurishni yoqtiraman!',
        timestamp: Date.now() - 100000,
      },
      {
        id: 'init-2',
        name: 'Madina',
        professionId: 'doctor',
        avatarFace: 'girl1',
        reason: 'Odamlarga yordam berish uchun!',
        timestamp: Date.now() - 50000,
      },
    ];
  });

  const [activeSection, setActiveSection] = useState<ActiveSection>('home');
  const [isTeacherPanelOpen, setIsTeacherPanelOpen] = useState(false);
  const [isDanceBreakOpen, setIsDanceBreakOpen] = useState(false);
  const [isColoringOpen, setIsColoringOpen] = useState(false);

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.LANG, currentLang);
    } catch {
      // ignore
    }
  }, [currentLang]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.AGE, ageMode);
    } catch {
      // ignore
    }
  }, [ageMode]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.STARS, String(totalStars));
    } catch {
      // ignore
    }
  }, [totalStars]);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEYS.COMPLETED,
        JSON.stringify(Array.from(completedSteps))
      );
    } catch {
      // ignore
    }
  }, [completedSteps]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WALL, JSON.stringify(wallChildren));
    } catch {
      // ignore
    }
  }, [wallChildren]);

  // Earn stars & step completion
  const handleMarkStepCompleted = (stepKey: string) => {
    if (!completedSteps.has(stepKey)) {
      setCompletedSteps((prev) => new Set([...prev, stepKey]));
      setTotalStars((prev) => prev + 1);
      playDing();
    }
  };

  const handleAddChildToWall = (child: WallChild) => {
    setWallChildren((prev) => [child, ...prev]);
    handleMarkStepCompleted('dream-profession');
  };

  const handleResetProgress = () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.STARS);
      localStorage.removeItem(STORAGE_KEYS.COMPLETED);
      localStorage.removeItem(STORAGE_KEYS.WALL);
    } catch {
      // ignore
    }
    setTotalStars(0);
    setCompletedSteps(new Set());
    setWallChildren([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/40 text-slate-800">
      {/* Top Header */}
      <Header
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        ageMode={ageMode}
        onAgeModeChange={setAgeMode}
        totalStars={totalStars}
        onOpenTeacherPanel={() => setIsTeacherPanelOpen(true)}
        onGoHome={() => setActiveSection('home')}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto py-4 px-2 sm:px-6">
        {/* Back to Roadmap button if not on home */}
        {activeSection !== 'home' && (
          <div className="mb-4 flex items-center justify-between">
            <button
              onClick={() => {
                playTap();
                setActiveSection('home');
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border-2 border-amber-200 text-slate-700 font-black text-sm shadow-sm hover:bg-amber-50 active:scale-95 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{UI_TEXT.lessonPath.backToMap[currentLang]}</span>
            </button>
          </div>
        )}

        {/* Home / Lesson Roadmap View */}
        {activeSection === 'home' && (
          <LessonPath
            currentLang={currentLang}
            completedSteps={completedSteps}
            onSelectSection={setActiveSection}
            onOpenDanceBreak={() => setIsDanceBreakOpen(true)}
            onOpenColoring={() => setIsColoringOpen(true)}
          />
        )}

        {/* 1. Greeting */}
        {activeSection === 'greeting' && (
          <GreetingSection
            currentLang={currentLang}
            onComplete={() => handleMarkStepCompleted('greeting')}
            onNext={() => setActiveSection('show-and-tell')}
          />
        )}

        {/* 2. Show-and-Tell */}
        {activeSection === 'show-and-tell' && (
          <ShowAndTellSection
            currentLang={currentLang}
            ageMode={ageMode}
            onComplete={() => handleMarkStepCompleted('show-and-tell')}
            onNext={() => setActiveSection('game1')}
          />
        )}

        {/* 3. Game 1: Tool Match */}
        {activeSection === 'game1' && (
          <Game1ToolMatch
            currentLang={currentLang}
            ageMode={ageMode}
            onComplete={() => handleMarkStepCompleted('game1')}
            onNext={() => setActiveSection('game2')}
          />
        )}

        {/* 4. Game 2: Memory / Line Match */}
        {activeSection === 'game2' && (
          <Game2MemoryMatch
            currentLang={currentLang}
            ageMode={ageMode}
            onComplete={() => handleMarkStepCompleted('game2')}
            onNext={() => setActiveSection('game3')}
          />
        )}

        {/* 5. Game 3: Actions Quiz */}
        {activeSection === 'game3' && (
          <Game3ActionQuiz
            currentLang={currentLang}
            ageMode={ageMode}
            onComplete={() => handleMarkStepCompleted('game3')}
            onNext={() => setActiveSection('game4')}
          />
        )}

        {/* 6. Game 4: Sound Guess */}
        {activeSection === 'game4' && (
          <Game4SoundGuess
            currentLang={currentLang}
            ageMode={ageMode}
            onComplete={() => handleMarkStepCompleted('game4')}
            onNext={() => setActiveSection('dream-profession')}
          />
        )}

        {/* 7. Dream Profession & Wall */}
        {activeSection === 'dream-profession' && (
          <DreamProfessionSection
            currentLang={currentLang}
            ageMode={ageMode}
            wallChildren={wallChildren}
            onAddChildToWall={handleAddChildToWall}
            onComplete={() => handleMarkStepCompleted('dream-profession')}
            onNext={() => setActiveSection('reflection')}
          />
        )}

        {/* 8. Reflection & Digital Medal */}
        {activeSection === 'reflection' && (
          <ReflectionSection
            currentLang={currentLang}
            onComplete={() => handleMarkStepCompleted('reflection')}
            onNext={() => setActiveSection('next-week')}
          />
        )}

        {/* 9. Next Week Preview */}
        {activeSection === 'next-week' && (
          <NextWeekPreview
            currentLang={currentLang}
            onGoHome={() => setActiveSection('home')}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-amber-200/80 py-4 px-6 text-center text-xs font-semibold text-slate-500 bg-white/60">
        <p>
          «Mehribon tarbiyachim – mening suyanchim» dasturi · 6-mavzu: Oiladan o‘rganganim — kasblar haqida
        </p>
      </footer>

      {/* Modals */}
      <DanceBreakModal
        isOpen={isDanceBreakOpen}
        onClose={() => setIsDanceBreakOpen(false)}
        currentLang={currentLang}
      />

      <ColoringModal
        isOpen={isColoringOpen}
        onClose={() => setIsColoringOpen(false)}
        currentLang={currentLang}
      />

      <TeacherPanelModal
        isOpen={isTeacherPanelOpen}
        onClose={() => setIsTeacherPanelOpen(false)}
        currentLang={currentLang}
        ageMode={ageMode}
        onAgeModeChange={setAgeMode}
        onResetProgress={handleResetProgress}
      />
    </div>
  );
}
