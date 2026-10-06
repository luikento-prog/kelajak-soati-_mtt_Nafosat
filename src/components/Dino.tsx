import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { speakText, stopSpeaking } from '../utils/speech';
import { Language } from '../types';

interface DinoProps {
  speech?: string;
  lang?: Language;
  state?: 'waving' | 'thinking' | 'celebrating' | 'encouraging' | 'dancing';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showSpeech?: boolean;
}

export const Dino: React.FC<DinoProps> = ({
  speech,
  lang = 'uz',
  state = 'waving',
  size = 'md',
  className = '',
  showSpeech = true,
}) => {
  const [isSpeaking, setIsSpeaking] = React.useState(false);

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else if (speech) {
      setIsSpeaking(true);
      speakText(speech, lang).then(() => setIsSpeaking(false));
    }
  };

  // Dimensions based on size
  const sizeMap = {
    sm: 'w-24 h-24',
    md: 'w-36 h-36 md:w-44 md:h-44',
    lg: 'w-48 h-48 md:w-56 md:h-56',
  };

  return (
    <div className={`relative flex items-end gap-3 select-none ${className}`}>
      {/* Dino Mascot SVG */}
      <div className={`relative shrink-0 ${sizeMap[size]}`}>
        <svg
          viewBox="0 0 200 200"
          className={`w-full h-full filter drop-shadow-md transition-transform duration-300 ${
            state === 'celebrating'
              ? 'animate-bounce'
              : state === 'dancing'
              ? 'animate-pulse scale-105'
              : 'hover:scale-105'
          }`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Dino Tail */}
          <path
            d="M50 145 C25 150 10 130 18 115 C26 100 40 120 55 130 Z"
            fill="#22c55e"
            stroke="#16a34a"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Dino Back Spikes */}
          <polygon points="50,90 35,80 48,70" fill="#f59e0b" />
          <polygon points="46,110 32,102 44,95" fill="#f59e0b" />
          <polygon points="42,130 28,125 40,118" fill="#f59e0b" />

          {/* Dino Main Body */}
          <ellipse
            cx="105"
            cy="135"
            rx="46"
            ry="42"
            fill="#4ade80"
            stroke="#16a34a"
            strokeWidth="3.5"
          />
          {/* Belly Patch (soft yellow-green) */}
          <ellipse cx="118" cy="142" rx="28" ry="26" fill="#fef08a" opacity="0.9" />

          {/* Back Leg / Foot */}
          <ellipse cx="78" cy="172" rx="16" ry="10" fill="#22c55e" stroke="#16a34a" strokeWidth="3" />
          {/* Front Leg / Foot */}
          <ellipse cx="125" cy="172" rx="18" ry="11" fill="#4ade80" stroke="#16a34a" strokeWidth="3" />
          {/* Foot Claws */}
          <circle cx="115" cy="176" r="3" fill="#ffffff" />
          <circle cx="125" cy="177" r="3" fill="#ffffff" />
          <circle cx="135" cy="176" r="3" fill="#ffffff" />

          {/* Neck & Head */}
          <path
            d="M95 110 C95 85 90 60 125 50 C155 42 165 70 155 90 C145 105 130 115 115 120 Z"
            fill="#4ade80"
            stroke="#16a34a"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Dino Snout */}
          <path
            d="M135 60 C162 60 168 76 156 86 C144 94 130 92 125 85 Z"
            fill="#86efac"
          />

          {/* Big Cartoon Eye (White) */}
          <circle cx="118" cy="62" r="14" fill="#ffffff" stroke="#16a34a" strokeWidth="2.5" />
          {/* Pupil */}
          <circle cx="122" cy="62" r="7.5" fill="#0f172a" />
          {/* Eye Sparkles */}
          <circle cx="125" cy="59" r="3" fill="#ffffff" />
          <circle cx="120" cy="65" r="1.5" fill="#ffffff" />

          {/* Cheerful Smile */}
          <path
            d="M135 76 Q146 84 153 74"
            fill="none"
            stroke="#0f172a"
            strokeWidth="3.2"
            strokeLinecap="round"
          />

          {/* Rosy Cheek */}
          <circle cx="122" cy="78" r="6" fill="#f472b6" opacity="0.65" />

          {/* Arms / Hand Gestures */}
          {state === 'waving' ? (
            /* Waving Right Hand */
            <g className="origin-[145px_120px] animate-[wiggle_1.5s_ease-in-out_infinite]">
              <path
                d="M140 120 C155 110 168 95 174 98 C178 102 165 120 148 126 Z"
                fill="#86efac"
                stroke="#16a34a"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <circle cx="174" cy="98" r="4.5" fill="#86efac" stroke="#16a34a" strokeWidth="2" />
            </g>
          ) : state === 'celebrating' ? (
            /* Both Arms Raised */
            <g>
              <path
                d="M135 120 C150 100 165 85 170 90 C172 95 155 115 140 125 Z"
                fill="#86efac"
                stroke="#16a34a"
                strokeWidth="3"
              />
              <path
                d="M95 122 C80 105 70 90 65 95 C62 100 78 118 90 126 Z"
                fill="#86efac"
                stroke="#16a34a"
                strokeWidth="3"
              />
            </g>
          ) : (
            /* Friendly resting arm */
            <path
              d="M130 122 C145 126 150 134 142 140 C134 144 125 136 122 130 Z"
              fill="#86efac"
              stroke="#16a34a"
              strokeWidth="3"
            />
          )}

          {/* Little Star sparkles around Dino when celebrating */}
          {state === 'celebrating' && (
            <g className="animate-spin origin-center">
              <text x="30" y="50" fontSize="18">✨</text>
              <text x="160" y="45" fontSize="20">⭐</text>
              <text x="175" y="140" fontSize="16">🌟</text>
            </g>
          )}
        </svg>
      </div>

      {/* Speech Bubble */}
      {showSpeech && speech && (
        <div className="relative max-w-sm md:max-w-md bg-white border-2 border-emerald-400 rounded-3xl p-4 shadow-lg flex items-start gap-3 z-10 animate-in fade-in zoom-in-95 duration-200">
          {/* Triangular Tail pointing to Dino */}
          <div className="absolute -left-3 bottom-6 w-0 h-0 border-t-8 border-t-transparent border-r-12 border-r-white border-b-8 border-b-transparent drop-shadow-[-2px_0_1px_rgba(52,211,153,0.5)]" />
          
          <div className="flex-1">
            <p className="text-slate-800 text-base md:text-lg font-bold leading-snug">
              {speech}
            </p>
          </div>

          {/* Voice Read Aloud Button (min 48x48 on touch) */}
          <button
            type="button"
            onClick={handleSpeak}
            className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-sm ${
              isSpeaking
                ? 'bg-emerald-500 text-white animate-pulse'
                : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 active:scale-95'
            }`}
            title="Ovoz chiqarib o‘qish"
            aria-label="Ovoz chiqarib o‘qish"
          >
            {isSpeaking ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
          </button>
        </div>
      )}
    </div>
  );
};
