import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Download, Printer, Volume2, Star, Sparkles, Heart, ArrowRight } from 'lucide-react';
import { Dino } from '../Dino';
import { Language } from '../../types';
import { UI_TEXT } from '../../data/i18n';
import { playDing, playCelebration, playTap } from '../../utils/audio';
import { speakText } from '../../utils/speech';

interface ReflectionSectionProps {
  currentLang: Language;
  onComplete: () => void;
  onNext: () => void;
}

export const ReflectionSection: React.FC<ReflectionSectionProps> = ({
  currentLang,
  onComplete,
  onNext,
}) => {
  const t = UI_TEXT.reflection;

  // Mood poll results (group tally)
  const [moodCounts, setMoodCounts] = useState({ great: 12, good: 6, okay: 1 });
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  // Child name for digital medal customization
  const [medalChildName, setMedalChildName] = useState('Guruh bolajonlari');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Redraw certificate / medal canvas whenever name or language changes
  const renderMedalCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 800;
    const height = 600;
    canvas.width = width;
    canvas.height = height;

    // Background gradient
    const bgGradient = ctx.createLinearGradient(0, 0, width, height);
    bgGradient.addColorStop(0, '#fefce8');
    bgGradient.addColorStop(0.5, '#fffbeb');
    bgGradient.addColorStop(1, '#ecfdf5');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // Decorative Borders
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 14;
    ctx.strokeRect(20, 20, width - 40, height - 40);

    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 4;
    ctx.strokeRect(32, 32, width - 64, height - 64);

    // Corner decorative stars
    ctx.font = '28px sans-serif';
    ctx.fillText('⭐', 44, 68);
    ctx.fillText('⭐', width - 80, 68);
    ctx.fillText('⭐', 44, height - 52);
    ctx.fillText('⭐', width - 80, height - 52);

    // Top Header Text
    ctx.fillStyle = '#065f46';
    ctx.font = 'bold 22px Nunito, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('MEHRIBON TARBIYACHIM – MENING SUYANCHIM', width / 2, 85);

    ctx.fillStyle = '#b45309';
    ctx.font = 'bold 18px Nunito, sans-serif';
    ctx.fillText('6-MAVZU: OILADAN O‘RGANGAN KASBLARIMIZ', width / 2, 115);

    // Big Gold Medal Circle
    const centerX = width / 2;
    const centerY = 240;

    // Ribbons
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.moveTo(centerX - 40, centerY);
    ctx.lineTo(centerX - 70, centerY + 120);
    ctx.lineTo(centerX - 40, centerY + 105);
    ctx.lineTo(centerX - 10, centerY + 120);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#3b82f6';
    ctx.beginPath();
    ctx.moveTo(centerX + 40, centerY);
    ctx.lineTo(centerX + 70, centerY + 120);
    ctx.lineTo(centerX + 40, centerY + 105);
    ctx.lineTo(centerX + 10, centerY + 120);
    ctx.closePath();
    ctx.fill();

    // Medal Gold Disc
    const medalGrad = ctx.createRadialGradient(
      centerX - 15,
      centerY - 15,
      10,
      centerX,
      centerY,
      80
    );
    medalGrad.addColorStop(0, '#fef08a');
    medalGrad.addColorStop(0.6, '#f59e0b');
    medalGrad.addColorStop(1, '#b45309');

    ctx.beginPath();
    ctx.arc(centerX, centerY, 75, 0, Math.PI * 2);
    ctx.fillStyle = medalGrad;
    ctx.fill();
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 6;
    ctx.stroke();

    // Medal Center Emoji / Trophy
    ctx.font = '65px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🏅', centerX, centerY);

    // Certificate Recipient Name
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = '#1e293b';
    ctx.font = '900 36px Nunito, sans-serif';
    ctx.fillText(medalChildName || 'Guruh bolajonlari', width / 2, 400);

    // Title of Achievement
    ctx.fillStyle = '#047857';
    ctx.font = '800 28px Nunito, sans-serif';
    ctx.fillText('«KASBLAR BILIMDONI»', width / 2, 445);

    // Motto
    ctx.fillStyle = '#475569';
    ctx.font = 'italic 600 20px Nunito, sans-serif';
    ctx.fillText(
      '«O‘rganish uchun gapirish ham, tinglash ham kerak!»',
      width / 2,
      495
    );

    // Date & Stamp
    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 15px Nunito, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`Sana: ${new Date().toLocaleDateString()}`, 60, height - 52);

    ctx.textAlign = 'right';
    ctx.fillText('Tarbiyachi imzosi: ______________', width - 60, height - 52);
  };

  useEffect(() => {
    renderMedalCanvas();
  }, [medalChildName, currentLang]);

  const handleSelectMood = (type: 'great' | 'good' | 'okay') => {
    playTap();
    playDing();
    setSelectedMood(type);
    setMoodCounts((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
    onComplete();
  };

  const handleDownloadMedal = () => {
    playTap();
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      const link = document.createElement('a');
      link.download = `Kasblar_bilimdoni_${medalChildName.replace(/\s+/g, '_')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch {
      // ignore
    }
  };

  const handlePrintMedal = () => {
    playTap();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL();
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head><title>Kasblar Bilimdoni Medali</title></head>
          <body style="margin:0;display:flex;align-items:center;justify-content:center;height:100vh;">
            <img src="${dataUrl}" style="max-width:100%;max-height:100%;" onload="window.print();window.close();"/>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  const totalVotes = moodCounts.great + moodCounts.good + moodCounts.okay;

  return (
    <div className="max-w-5xl mx-auto py-4 px-4">
      {/* Title */}
      <div className="text-center mb-6">
        <span className="text-sm font-black text-sky-800 bg-sky-100 px-4 py-1 rounded-full uppercase tracking-wider inline-block mb-1">
          8-Bosqich · Yakuniy refleksiya
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {t.title[currentLang]}
        </h2>
      </div>

      {/* Dino Reflection Dialogue */}
      <div className="bg-gradient-to-r from-sky-50 via-teal-50 to-amber-50 rounded-3xl p-6 border-3 border-sky-300 shadow-md mb-8 flex flex-col md:flex-row items-center gap-6">
        <Dino
          speech={t.finalMotto[currentLang]}
          lang={currentLang}
          state="celebrating"
          size="md"
        />

        <div className="flex-1 bg-white p-5 rounded-2xl border-2 border-sky-200 shadow-sm flex flex-col gap-3">
          <h4 className="font-black text-slate-800 text-base">
            Refleksiya savollari:
          </h4>
          <p className="text-sm font-semibold text-slate-600">
            • {t.question1[currentLang]}
          </p>
          <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
            <p className="text-sm font-black text-emerald-900">
              • {t.question2[currentLang]}
            </p>
            <p className="text-xs font-bold text-emerald-700 mt-0.5">
              {t.answer2[currentLang]}
            </p>
          </div>
          <p className="text-sm font-semibold text-slate-600">
            • {t.question3[currentLang]}
          </p>
        </div>
      </div>

      {/* Mood Check Interactive Poll */}
      <div className="bg-white rounded-3xl p-6 border-3 border-amber-200 shadow-md mb-8">
        <h3 className="text-xl font-black text-slate-900 mb-4 text-center">
          {t.moodTitle[currentLang]}
        </h3>

        {/* 3 Big Mood Faces (Touch-first, min 90px height) */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {(
            [
              { key: 'great', label: t.moodGreat[currentLang], icon: '😀', bg: 'hover:bg-emerald-50 border-emerald-300 text-emerald-800' },
              { key: 'good', label: t.moodGood[currentLang], icon: '🙂', bg: 'hover:bg-amber-50 border-amber-300 text-amber-800' },
              { key: 'okay', label: t.moodOkay[currentLang], icon: '😐', bg: 'hover:bg-slate-50 border-slate-300 text-slate-800' },
            ] as const
          ).map((item) => (
            <button
              key={item.key}
              onClick={() => handleSelectMood(item.key)}
              className={`p-5 rounded-2xl border-3 flex flex-col items-center justify-center gap-2 transition-all active:scale-95 shadow-sm ${item.bg} ${
                selectedMood === item.key ? 'scale-105 ring-4 ring-amber-300 bg-amber-50' : 'bg-white'
              }`}
            >
              <span className="text-5xl">{item.icon}</span>
              <span className="font-black text-base">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Group Result Tally Bar */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
            <span>Guruh fikri ({totalVotes} ovoz)</span>
            <span className="text-emerald-700">😀 {Math.round((moodCounts.great / totalVotes) * 100)}%</span>
          </div>

          <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden flex">
            <div
              className="bg-emerald-500 transition-all duration-500"
              style={{ width: `${(moodCounts.great / totalVotes) * 100}%` }}
              title="Ajoyib"
            />
            <div
              className="bg-amber-400 transition-all duration-500"
              style={{ width: `${(moodCounts.good / totalVotes) * 100}%` }}
              title="Yaxshi"
            />
            <div
              className="bg-slate-400 transition-all duration-500"
              style={{ width: `${(moodCounts.okay / totalVotes) * 100}%` }}
              title="O‘rtacha"
            />
          </div>
        </div>
      </div>

      {/* Digital Medal Generator & Download */}
      <div className="bg-gradient-to-br from-amber-50 to-emerald-50 rounded-3xl p-6 border-3 border-amber-300 shadow-md flex flex-col items-center">
        <div className="text-center mb-4">
          <span className="text-3xl">🏅</span>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            «Kasblar bilimdoni» Faxriy Medali
          </h3>
          <p className="text-xs text-slate-600 font-semibold">
            Ismni yozing va tayyor medalni yuklab oling yoki chop eting:
          </p>
        </div>

        {/* Child Name input */}
        <div className="w-full max-w-sm mb-4">
          <input
            type="text"
            value={medalChildName}
            onChange={(e) => setMedalChildName(e.target.value)}
            placeholder="Bolaning ismi yoki guruh nomi..."
            className="w-full px-4 py-2.5 rounded-2xl border-2 border-amber-300 focus:outline-none focus:border-amber-500 font-bold text-center text-slate-800 bg-white"
          />
        </div>

        {/* Canvas Display */}
        <div className="w-full max-w-lg overflow-hidden rounded-2xl shadow-xl border-4 border-amber-400 bg-white mb-5">
          <canvas ref={canvasRef} className="w-full h-auto block" />
        </div>

        {/* Action Buttons: Download & Print */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={handleDownloadMedal}
            className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm flex items-center gap-2 shadow-md active:scale-95 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>{t.downloadMedalBtn[currentLang]}</span>
          </button>

          <button
            onClick={handlePrintMedal}
            className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-sm flex items-center gap-2 shadow-md active:scale-95 transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>{t.printMedalBtn[currentLang]}</span>
          </button>
        </div>
      </div>

      {/* Next Step Navigation: Next Week Preview */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={() => {
            playTap();
            onNext();
          }}
          className="flex items-center gap-3 px-8 py-4 rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-lg shadow-lg hover:scale-105 active:scale-95 transition-all"
        >
          <span>{UI_TEXT.lessonPath.nextStep[currentLang]}: 3-Haftaga tayyorlov</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
