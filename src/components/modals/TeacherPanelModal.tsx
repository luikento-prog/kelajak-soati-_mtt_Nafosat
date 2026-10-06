import React, { useState } from 'react';
import { X, CheckSquare, Square, Clock, Printer, BookOpen, Settings, Heart, RotateCcw } from 'lucide-react';
import { Language, AgeMode } from '../../types';
import { PROFESSIONS } from '../../data/professions';
import { UI_TEXT } from '../../data/i18n';
import { playTap } from '../../utils/audio';

interface TeacherPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  ageMode: AgeMode;
  onAgeModeChange: (mode: AgeMode) => void;
  onResetProgress: () => void;
}

export const TeacherPanelModal: React.FC<TeacherPanelModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  ageMode,
  onAgeModeChange,
  onResetProgress,
}) => {
  const t = UI_TEXT.teacherPanel;

  const [activeTab, setActiveTab] = useState<
    'goals' | 'checklist' | 'agetips' | 'timer' | 'print' | 'parents' | 'settings'
  >('goals');

  // Interactive Checklist states
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    c1: false,
    c2: false,
    c3: false,
    c4: false,
    c5: false,
  });

  // Overall lesson stopwatch / timer (20-25 mins)
  const [lessonSeconds, setLessonSeconds] = useState(22 * 60);
  const [isLessonTimerRunning, setIsLessonTimerRunning] = useState(false);

  const toggleCheck = (id: string) => {
    playTap();
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePrintCards = () => {
    playTap();
    window.print();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-md flex items-center justify-center p-3 sm:p-5">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-6 shadow-2xl border-4 border-violet-400 flex flex-col max-h-[92vh] overflow-hidden animate-in zoom-in-95">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <span className="w-10 h-10 rounded-2xl bg-violet-100 text-violet-700 flex items-center justify-center font-black">
              🔒
            </span>
            <div>
              <h3 className="text-xl font-black text-slate-900 leading-tight">
                {t.title[currentLang]}
              </h3>
              <span className="text-xs font-bold text-violet-700">
                Mehribon tarbiyachim · 2-hafta · 6-mavzu
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              playTap();
              onClose();
            }}
            className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center active:scale-95 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-3 border-b border-slate-100 scrollbar-none">
          {(
            [
              { id: 'goals', label: t.tabGoals[currentLang] },
              { id: 'checklist', label: t.tabChecklist[currentLang] },
              { id: 'agetips', label: t.tabAgeTips[currentLang] },
              { id: 'timer', label: t.tabTimer[currentLang] },
              { id: 'print', label: t.tabPrint[currentLang] },
              { id: 'parents', label: t.tabParents[currentLang] },
              { id: 'settings', label: t.tabSettings[currentLang] },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                playTap();
                setActiveTab(tab.id);
              }}
              className={`px-3 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-violet-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto py-4 px-1 space-y-4">
          {/* TAB 1: Goals */}
          {activeTab === 'goals' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-200">
                <h4 className="font-black text-emerald-900 text-base mb-1">
                  1. Ta’limiy maqsad
                </h4>
                <p className="text-sm font-semibold text-emerald-800">
                  {t.goalsEdu[currentLang]}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-200">
                <h4 className="font-black text-amber-900 text-base mb-1">
                  2. Tarbiyaviy maqsad
                </h4>
                <p className="text-sm font-semibold text-amber-800">
                  {t.goalsUpbr[currentLang]}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-sky-50 border-2 border-sky-200">
                <h4 className="font-black text-sky-900 text-base mb-1">
                  3. Rivojlantiruvchi maqsad
                </h4>
                <p className="text-sm font-semibold text-sky-800">
                  {t.goalsDev[currentLang]}
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: Checklist */}
          {activeTab === 'checklist' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-500 font-bold mb-2">
                Mashg‘ulot davomida bolalarda shakllanadigan ko‘nikmalar tekshiruvi:
              </p>

              {(
                [
                  { id: 'c1', text: 'Bolalar o‘z buyumi qaysi kasbga tegishli ekanini ayta oladi.' },
                  { id: 'c2', text: 'Kasb egalarining asosiy harakatlarini (ovqat pishirish, uy qurish) to‘g‘ri nomlaydi.' },
                  { id: 'c3', text: 'Do‘stining chiqishini oxirigacha tinglash qoidasiga amal qiladi.' },
                  { id: 'c4', text: 'Barcha kasblarga hurmat bilan munosabatda bo‘ladi (teng qadrlaydi).' },
                  { id: 'c5', text: 'Kelajakdagi orzusidagi kasbni tanlab, oddiy jumlada fikrini bildiradi.' },
                ] as const
              ).map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className="w-full p-3.5 rounded-2xl border-2 border-slate-200 hover:border-violet-300 flex items-center gap-3 text-left transition-all bg-white"
                >
                  {checkedItems[item.id] ? (
                    <CheckSquare className="w-5 h-5 text-violet-600 shrink-0" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-300 shrink-0" />
                  )}
                  <span
                    className={`text-sm font-bold ${
                      checkedItems[item.id] ? 'line-through text-slate-400' : 'text-slate-800'
                    }`}
                  >
                    {item.text}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* TAB 3: Age Tips */}
          {activeTab === 'agetips' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-200">
                <span className="text-xs font-black uppercase text-amber-800 bg-amber-200 px-2 py-0.5 rounded-full inline-block mb-1">
                  Kichik guruh (3–4 yosh)
                </span>
                <p className="text-sm font-bold text-amber-950 mt-1">
                  {t.ageTips34[currentLang]}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-200">
                <span className="text-xs font-black uppercase text-emerald-800 bg-emerald-200 px-2 py-0.5 rounded-full inline-block mb-1">
                  O‘rta guruh (4–5 yosh)
                </span>
                <p className="text-sm font-bold text-emerald-950 mt-1">
                  {t.ageTips45[currentLang]}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50 border-2 border-indigo-200">
                <span className="text-xs font-black uppercase text-indigo-800 bg-indigo-200 px-2 py-0.5 rounded-full inline-block mb-1">
                  Katta guruh (5–6 yosh)
                </span>
                <p className="text-sm font-bold text-indigo-950 mt-1">
                  {t.ageTips56[currentLang]}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200">
                <h5 className="font-black text-slate-800 text-sm mb-1">
                  Pedagogik oltin qoidalar:
                </h5>
                <p className="text-xs font-semibold text-slate-600 leading-relaxed">
                  {t.generalTips[currentLang]}
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: Lesson Timer */}
          {activeTab === 'timer' && (
            <div className="space-y-4">
              <div className="bg-violet-50 p-6 rounded-3xl border-2 border-violet-200 text-center">
                <span className="text-xs font-bold text-violet-700 block mb-1">
                  Tavsiya etilgan dars davomiyligi: 20–25 daqiqa
                </span>
                <div className="text-4xl font-black text-violet-950 tabular-nums my-2">
                  {Math.floor(lessonSeconds / 60)}:
                  {String(lessonSeconds % 60).padStart(2, '0')}
                </div>
                <div className="flex items-center justify-center gap-2 mt-4">
                  <button
                    onClick={() => setIsLessonTimerRunning(!isLessonTimerRunning)}
                    className="px-5 py-2.5 rounded-xl bg-violet-600 text-white font-black text-sm active:scale-95"
                  >
                    {isLessonTimerRunning ? 'To‘xtatish' : 'Boshlash'}
                  </button>
                  <button
                    onClick={() => {
                      setIsLessonTimerRunning(false);
                      setLessonSeconds(22 * 60);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-white border border-violet-200 text-violet-700 font-bold text-sm"
                  >
                    Qayta o‘rnatish
                  </button>
                </div>
              </div>

              {/* Stage breakdown */}
              <div className="space-y-2">
                <span className="text-xs font-black text-slate-500 uppercase">
                  Bosqichlar bo‘yicha vaqt taqsimoti:
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  <div className="p-2.5 bg-slate-50 rounded-xl">1. Salomlashuv & Dino eslashi: 2 min</div>
                  <div className="p-2.5 bg-slate-50 rounded-xl">2. Mening buyumim (Taqdimot): 7 min</div>
                  <div className="p-2.5 bg-slate-50 rounded-xl">3. O‘yinlar (1, 2, 3, bonus): 8 min</div>
                  <div className="p-2.5 bg-slate-50 rounded-xl">4. Kasblar raqsi (charchoq yozish): 1 min</div>
                  <div className="p-2.5 bg-slate-50 rounded-xl">5. Orzudagi kasb & Devor: 3 min</div>
                  <div className="p-2.5 bg-slate-50 rounded-xl">6. Refleksiya & Medallar: 2 min</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: Print Cards */}
          {activeTab === 'print' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-amber-50 p-4 rounded-2xl border border-amber-200">
                <p className="text-xs font-bold text-amber-900 max-w-md">
                  {t.printNotice[currentLang]}
                </p>
                <button
                  onClick={handlePrintCards}
                  className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-sm flex items-center gap-2 shadow-sm active:scale-95"
                >
                  <Printer className="w-4 h-4" />
                  <span>A4 Chop etish</span>
                </button>
              </div>

              {/* Printable Cards Preview Grid */}
              <div className="grid grid-cols-3 gap-3 border-2 border-dashed border-slate-200 p-4 rounded-2xl">
                {PROFESSIONS.map((p) => (
                  <div
                    key={p.id}
                    className="p-3 rounded-xl border border-slate-300 bg-white flex flex-col items-center text-center gap-1 shadow-sm"
                  >
                    <span className="text-3xl">{p.emoji}</span>
                    <span className="font-black text-xs text-slate-900">
                      {p.name[currentLang]}
                    </span>
                    <span className="text-2xl mt-1">{p.toolEmoji}</span>
                    <span className="text-[10px] text-slate-500">
                      {p.toolName[currentLang]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: Parent Note */}
          {activeTab === 'parents' && (
            <div className="p-5 bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl border-2 border-pink-200 space-y-3">
              <h4 className="font-black text-pink-950 text-base flex items-center gap-2">
                <Heart className="w-5 h-5 text-pink-500" />
                <span>Ota-onalar telegram guruhiga yuborish uchun xabar:</span>
              </h4>
              <div className="p-4 bg-white rounded-2xl border border-pink-200 text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed select-all">
                {t.parentNoteText[currentLang]}
              </div>
            </div>
          )}

          {/* TAB 7: Settings */}
          {activeTab === 'settings' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div>
                  <h5 className="font-black text-slate-800 text-sm">Guruh yoshi</h5>
                  <p className="text-xs text-slate-500">Mashg‘ulot darajasini sozlash</p>
                </div>
                <div className="flex gap-1.5 bg-white p-1 rounded-xl border border-slate-200">
                  {(['3-4', '4-5', '5-6'] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => onAgeModeChange(m)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-black ${
                        ageMode === m ? 'bg-violet-600 text-white' : 'text-slate-600'
                      }`}
                    >
                      {m} yosh
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 flex items-center justify-between">
                <div>
                  <h5 className="font-black text-rose-900 text-sm">
                    Guruh yutuqlarini qayta o‘rnatish
                  </h5>
                  <p className="text-xs text-rose-700">
                    Barcha yulduzchalar va devor ma’lumotlarini tozalaydi
                  </p>
                </div>
                <button
                  onClick={() => {
                    playTap();
                    onResetProgress();
                    onClose();
                  }}
                  className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 active:scale-95"
                >
                  Qayta o‘rnatish ↺
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-200 flex justify-end">
          <button
            onClick={() => {
              playTap();
              onClose();
            }}
            className="px-6 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 font-bold text-sm text-slate-800"
          >
            {t.closeBtn[currentLang]}
          </button>
        </div>
      </div>
    </div>
  );
};
