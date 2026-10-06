import React, { useState } from 'react';
import { Volume2, ArrowLeft, Sparkles, Check } from 'lucide-react';
import { Dino } from '../Dino';
import { Language } from '../../types';
import { UI_TEXT } from '../../data/i18n';
import { playDing, playTap, playProfessionSound } from '../../utils/audio';
import { speakText } from '../../utils/speech';

interface NextWeekPreviewProps {
  currentLang: Language;
  onGoHome: () => void;
}

export const NextWeekPreview: React.FC<NextWeekPreviewProps> = ({
  currentLang,
  onGoHome,
}) => {
  const t = UI_TEXT.nextWeek;
  const [activeCorner, setActiveCorner] = useState<string | null>('hospital');

  const corners = [
    {
      id: 'hospital',
      title: '🏥 Shifoxona burchagi',
      desc: t.cornerHospital[currentLang],
      sound: 'stethoscope',
      icon: '🩺',
      color: 'from-teal-400 to-sky-500',
      props: ['Oq xalat 🥼', 'Stetoskop 🩺', 'Harorat o‘lchagich 🌡️', 'Yara bog‘lagich 🩹'],
    },
    {
      id: 'kitchen',
      title: '🍳 Oshxona burchagi',
      desc: t.cornerKitchen[currentLang],
      sound: 'bubbles',
      icon: '👨‍🍳',
      color: 'from-amber-400 to-orange-500',
      props: ['Oshpaz qalpoqchasi 👨‍🍳', 'Katta qozon 🍲', 'Cho‘mich va qoshiq 🥄', 'Sabzavotlar 🥕'],
    },
    {
      id: 'school',
      title: '🏫 Sinf burchagi',
      desc: t.cornerSchool[currentLang],
      sound: 'bell',
      icon: '📘',
      color: 'from-blue-400 to-indigo-500',
      props: ['Dars doskasi 📋', 'Rangli kitoblar 📚', 'Qo‘ng‘iroqcha 🔔', 'Ko‘rsatkich tayoqcha 🪄'],
    },
  ];

  const handleSelectCorner = (corner: (typeof corners)[0]) => {
    playTap();
    playProfessionSound(corner.sound);
    setActiveCorner(corner.id);
    speakText(corner.desc, currentLang);
  };

  return (
    <div className="max-w-5xl mx-auto py-4 px-4">
      {/* Title */}
      <div className="text-center mb-6">
        <span className="text-sm font-black text-lime-800 bg-lime-100 px-4 py-1 rounded-full uppercase tracking-wider inline-block mb-1">
          9-Bosqich · 3-Haftaga tayyorlov
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {t.title[currentLang]}
        </h2>
        <p className="text-sm font-bold text-slate-600 max-w-xl mx-auto mt-1">
          {t.description[currentLang]}
        </p>
      </div>

      {/* Dino Mascot Callout */}
      <div className="bg-gradient-to-r from-lime-50 via-emerald-50 to-teal-50 rounded-3xl p-6 border-3 border-lime-300 shadow-md mb-8 flex flex-col md:flex-row items-center gap-6">
        <Dino
          speech={t.description[currentLang]}
          lang={currentLang}
          state="waving"
          size="md"
        />

        <div className="flex-1 bg-white p-5 rounded-2xl border-2 border-lime-200 shadow-sm">
          <h4 className="font-black text-slate-800 text-lg mb-2">
            Uyda o‘ylab kelamiz:
          </h4>
          <p className="text-sm text-slate-600 leading-relaxed font-semibold">
            "Men keyingi darsda qaysi kasb rolini o‘ynayman? Qanday libos yoki buyum olib kelishim mumkin?"
          </p>
        </div>
      </div>

      {/* 3 Role-Play Corners Interactive Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {corners.map((corner) => {
          const isSelected = activeCorner === corner.id;

          return (
            <button
              key={corner.id}
              onClick={() => handleSelectCorner(corner)}
              className={`p-6 rounded-3xl bg-white border-3 text-left flex flex-col transition-all shadow-md active:scale-95 ${
                isSelected
                  ? 'border-emerald-500 ring-4 ring-emerald-100 scale-102 shadow-xl'
                  : 'border-slate-200 hover:border-emerald-300'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-4xl">{corner.icon}</span>
                <span className="text-xs font-black uppercase text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                  Burchak
                </span>
              </div>

              <h3 className="text-xl font-black text-slate-900 mb-2">
                {corner.title}
              </h3>
              <p className="text-xs text-slate-600 font-semibold mb-4 leading-relaxed">
                {corner.desc}
              </p>

              {/* Props List */}
              <div className="mt-auto bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <span className="text-[11px] font-black text-slate-500 block mb-1.5 uppercase">
                  Kerakli anjomlar:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {corner.props.map((p, i) => (
                    <span
                      key={i}
                      className="text-xs font-bold text-slate-700 bg-white px-2 py-0.5 rounded-lg border border-slate-200"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Finish & Back to Map Button */}
      <div className="flex justify-center">
        <button
          onClick={() => {
            playTap();
            onGoHome();
          }}
          className="flex items-center gap-2 px-8 py-4 rounded-3xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-lg shadow-lg hover:scale-105 active:scale-95 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Bosh sahifaga (Dars xaritasiga) qaytish</span>
        </button>
      </div>
    </div>
  );
};
