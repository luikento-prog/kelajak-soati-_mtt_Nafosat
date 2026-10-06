import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Maximize2, Minimize2, Lock, Star, Sparkles } from 'lucide-react';
import { Language, AgeMode } from '../types';
import { UI_TEXT } from '../data/i18n';
import { setAudioMuted, getAudioMuted, playTap } from '../utils/audio';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  ageMode: AgeMode;
  onAgeModeChange: (mode: AgeMode) => void;
  totalStars: number;
  onOpenTeacherPanel: () => void;
  onGoHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  ageMode,
  onAgeModeChange,
  totalStars,
  onOpenTeacherPanel,
  onGoHome,
}) => {
  const [isMuted, setIsMuted] = useState(getAudioMuted());
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const holdTimerRef = useRef<number | null>(null);
  const holdStartRef = useRef<number>(0);

  const t = UI_TEXT.header;

  // Track fullscreen state
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setAudioMuted(nextMuted);
    setIsMuted(nextMuted);
    if (!nextMuted) {
      playTap();
    }
  };

  const toggleFullscreen = async () => {
    playTap();
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      // Fullscreen not supported or blocked in iframe
    }
  };

  // 3-second hold to unlock teacher panel
  const startHold = () => {
    holdStartRef.current = Date.now();
    const interval = window.setInterval(() => {
      const elapsed = Date.now() - holdStartRef.current;
      const progress = Math.min(100, (elapsed / 2500) * 100);
      setHoldProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);
        holdTimerRef.current = null;
        setHoldProgress(0);
        onOpenTeacherPanel();
      }
    }, 50);
    holdTimerRef.current = interval;
  };

  const cancelHold = () => {
    if (holdTimerRef.current) {
      clearInterval(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    setHoldProgress(0);
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b-2 border-amber-200/80 shadow-sm px-3 sm:px-6 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Brand & Home Link */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              playTap();
              onGoHome();
            }}
            className="flex items-center gap-2.5 text-left group transition-transform active:scale-95"
            title="Bosh sahifa"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-2xl shadow-md border-2 border-white group-hover:rotate-6 transition-transform">
              🦖
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-emerald-800">
                  {t.title[currentLang]}
                </span>
                <span className="hidden sm:inline-block text-xs font-bold text-amber-700 bg-amber-100/90 px-2 py-0.5 rounded-full border border-amber-200">
                  2-hafta · 6-mavzu
                </span>
              </div>
              <p className="hidden md:block text-xs text-slate-500 font-semibold truncate max-w-sm">
                {t.topic[currentLang]}
              </p>
            </div>
          </button>
        </div>

        {/* Center: Age Mode Selector (touch-friendly buttons) */}
        <div className="flex items-center bg-amber-100/70 p-1 rounded-2xl border border-amber-200/90 shadow-inner">
          {(
            [
              { id: '3-4', icon: '🐣', label: '3–4' },
              { id: '4-5', icon: '🐥', label: '4–5' },
              { id: '5-6', icon: '🦁', label: '5–6' },
            ] as const
          ).map((item) => {
            const isActive = ageMode === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  playTap();
                  onAgeModeChange(item.id);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-sm transition-all ${
                  isActive
                    ? 'bg-white text-emerald-800 shadow-sm scale-102 border border-emerald-300'
                    : 'text-slate-600 hover:text-slate-900 active:scale-95'
                }`}
                title={`${item.label} yosh`}
              >
                <span className="text-base">{item.icon}</span>
                <span className="whitespace-nowrap">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Controls: Stars, Language Flags, Audio, Fullscreen, Teacher Lock */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Star Counter (Group stars) */}
          <div
            className="flex items-center gap-1.5 bg-amber-50 border-2 border-amber-300 px-3 py-1.5 rounded-2xl shadow-sm text-amber-900 font-black text-base"
            title={`${t.stars[currentLang]}: ${totalStars}`}
          >
            <Star className="w-5 h-5 text-amber-500 fill-amber-400 animate-pulse" />
            <span className="tabular-nums font-black">{totalStars}</span>
          </div>

          {/* Language Switcher: Big flags */}
          <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200">
            {(
              [
                { code: 'uz', flag: '🇺🇿', label: 'O‘z' },
                { code: 'ru', flag: '🇷🇺', label: 'Ру' },
                { code: 'en', flag: '🇬🇧', label: 'En' },
              ] as const
            ).map((lang) => {
              const active = currentLang === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => {
                    playTap();
                    onLanguageChange(lang.code);
                  }}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-black transition-all ${
                    active
                      ? 'bg-white text-indigo-900 shadow-sm border border-indigo-200 scale-105'
                      : 'text-slate-600 hover:text-slate-900 active:scale-95'
                  }`}
                  title={lang.code.toUpperCase()}
                >
                  <span className="text-base">{lang.flag}</span>
                  <span className="hidden sm:inline">{lang.label}</span>
                </button>
              );
            })}
          </div>

          {/* Mute Button */}
          <button
            onClick={toggleMute}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center border transition-all active:scale-95 ${
              isMuted
                ? 'bg-rose-50 border-rose-300 text-rose-600'
                : 'bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100'
            }`}
            title={isMuted ? t.soundOff[currentLang] : t.soundOn[currentLang]}
            aria-label="Ovoz"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>

          {/* Fullscreen Button for Smartboards */}
          <button
            onClick={toggleFullscreen}
            className="w-11 h-11 rounded-2xl flex items-center justify-center bg-sky-50 border border-sky-300 text-sky-700 hover:bg-sky-100 transition-all active:scale-95"
            title={t.fullscreen[currentLang]}
            aria-label="To‘liq ekran"
          >
            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>

          {/* Teacher Lock (hold 3s) */}
          <div className="relative">
            <button
              onMouseDown={startHold}
              onMouseUp={cancelHold}
              onMouseLeave={cancelHold}
              onTouchStart={startHold}
              onTouchEnd={cancelHold}
              className="relative w-11 h-11 rounded-2xl flex items-center justify-center bg-violet-50 border-2 border-violet-300 text-violet-700 hover:bg-violet-100 transition-all overflow-hidden select-none active:scale-95"
              title={t.teacherLock[currentLang]}
              aria-label="Tarbiyachi paneli"
            >
              {holdProgress > 0 && (
                <div
                  className="absolute bottom-0 left-0 right-0 bg-violet-400 opacity-40 transition-all"
                  style={{ height: `${holdProgress}%` }}
                />
              )}
              <Lock className="w-5 h-5 z-10" />
            </button>
            {holdProgress > 0 && (
              <div className="absolute top-12 right-0 whitespace-nowrap bg-violet-900 text-white text-[11px] px-2 py-1 rounded-md shadow-lg pointer-events-none z-40">
                Bosib turing: {Math.round(holdProgress)}%
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
