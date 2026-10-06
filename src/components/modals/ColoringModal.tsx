import React, { useState } from 'react';
import { X, RotateCcw, Palette } from 'lucide-react';
import { Language } from '../../types';
import { UI_TEXT } from '../../data/i18n';
import { playTap } from '../../utils/audio';

interface ColoringModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
}

export const ColoringModal: React.FC<ColoringModalProps> = ({
  isOpen,
  onClose,
  currentLang,
}) => {
  const t = UI_TEXT.coloring;

  const [activeSheet, setActiveSheet] = useState<'chef' | 'doctor' | 'builder'>('chef');
  const [selectedColor, setSelectedColor] = useState('#f87171');
  const [coloredParts, setColoredParts] = useState<Record<string, string>>({});

  const palette = [
    '#ef4444', // Red
    '#f97316', // Orange
    '#f59e0b', // Amber
    '#eab308', // Yellow
    '#22c55e', // Green
    '#14b8a6', // Teal
    '#3b82f6', // Blue
    '#8b5cf6', // Purple
    '#ec4899', // Pink
    '#ffffff', // White
  ];

  const handleColorPart = (partId: string) => {
    playTap();
    setColoredParts((prev) => ({
      ...prev,
      [partId]: selectedColor,
    }));
  };

  const handleClear = () => {
    playTap();
    setColoredParts({});
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 shadow-2xl border-4 border-amber-300 flex flex-col items-center animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between w-full mb-3">
          <div className="flex items-center gap-2">
            <Palette className="w-6 h-6 text-amber-500" />
            <h3 className="text-xl font-black text-slate-900">{t.title[currentLang]}</h3>
          </div>
          <button
            onClick={() => {
              playTap();
              onClose();
            }}
            className="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sheet Switcher */}
        <div className="flex items-center gap-2 mb-4 bg-slate-100 p-1.5 rounded-2xl">
          {(
            [
              { id: 'chef', label: '👨‍🍳 Oshpaz' },
              { id: 'doctor', label: '👩‍⚕️ Shifokor' },
              { id: 'builder', label: '👷 Quruvchi' },
            ] as const
          ).map((s) => (
            <button
              key={s.id}
              onClick={() => {
                playTap();
                setActiveSheet(s.id);
                setColoredParts({});
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                activeSheet === s.id
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Color Palette (Large touch buttons) */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-4">
          {palette.map((color) => (
            <button
              key={color}
              onClick={() => {
                playTap();
                setSelectedColor(color);
              }}
              className={`w-11 h-11 rounded-2xl border-3 transition-transform shadow-sm active:scale-90 ${
                selectedColor === color
                  ? 'scale-115 ring-4 ring-amber-300 border-slate-900'
                  : 'border-slate-300 hover:scale-105'
              }`}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>

        {/* Interactive SVG Coloring Canvas */}
        <div className="w-full max-w-md aspect-square bg-amber-50/50 rounded-3xl border-3 border-amber-200 p-4 flex items-center justify-center shadow-inner">
          {activeSheet === 'chef' && (
            <svg viewBox="0 0 300 300" className="w-full h-full cursor-pointer">
              {/* Chef Hat Upper */}
              <path
                id="chef-hat"
                d="M90 100 C70 60 110 30 150 40 C190 30 230 60 210 100 Z"
                fill={coloredParts['chef-hat'] || '#ffffff'}
                stroke="#334155"
                strokeWidth="4"
                onClick={() => handleColorPart('chef-hat')}
              />
              {/* Chef Hat Band */}
              <rect
                id="chef-band"
                x="95"
                y="95"
                width="110"
                height="25"
                rx="6"
                fill={coloredParts['chef-band'] || '#ffffff'}
                stroke="#334155"
                strokeWidth="4"
                onClick={() => handleColorPart('chef-band')}
              />
              {/* Head / Face */}
              <circle
                id="chef-face"
                cx="150"
                cy="155"
                r="38"
                fill={coloredParts['chef-face'] || '#fef08a'}
                stroke="#334155"
                strokeWidth="4"
                onClick={() => handleColorPart('chef-face')}
              />
              {/* Face Details */}
              <circle cx="140" cy="150" r="4" fill="#1e293b" />
              <circle cx="160" cy="150" r="4" fill="#1e293b" />
              <path d="M142 165 Q150 172 158 165" fill="none" stroke="#1e293b" strokeWidth="3" />
              {/* Pot Base */}
              <rect
                id="chef-pot"
                x="80"
                y="200"
                width="140"
                height="75"
                rx="14"
                fill={coloredParts['chef-pot'] || '#cbd5e1'}
                stroke="#334155"
                strokeWidth="4"
                onClick={() => handleColorPart('chef-pot')}
              />
              {/* Pot Lid */}
              <ellipse
                id="chef-pot-lid"
                cx="150"
                cy="200"
                rx="68"
                ry="12"
                fill={coloredParts['chef-pot-lid'] || '#94a3b8'}
                stroke="#334155"
                strokeWidth="4"
                onClick={() => handleColorPart('chef-pot-lid')}
              />
              {/* Pot Handles */}
              <path
                id="chef-handle-left"
                d="M80 220 C65 220 65 245 80 245"
                fill="none"
                stroke="#334155"
                strokeWidth="5"
                onClick={() => handleColorPart('chef-handle-left')}
              />
              <path
                id="chef-handle-right"
                d="M220 220 C235 220 235 245 220 245"
                fill="none"
                stroke="#334155"
                strokeWidth="5"
                onClick={() => handleColorPart('chef-handle-right')}
              />
            </svg>
          )}

          {activeSheet === 'doctor' && (
            <svg viewBox="0 0 300 300" className="w-full h-full cursor-pointer">
              {/* Doctor Head */}
              <circle
                id="doc-head"
                cx="150"
                cy="90"
                r="40"
                fill={coloredParts['doc-head'] || '#fed7aa'}
                stroke="#334155"
                strokeWidth="4"
                onClick={() => handleColorPart('doc-head')}
              />
              {/* Eyes & Smile */}
              <circle cx="138" cy="85" r="4" fill="#1e293b" />
              <circle cx="162" cy="85" r="4" fill="#1e293b" />
              <path d="M142 100 Q150 108 158 100" fill="none" stroke="#1e293b" strokeWidth="3" />
              {/* Doctor Coat Body */}
              <path
                id="doc-coat"
                d="M100 135 L200 135 L220 250 L80 250 Z"
                fill={coloredParts['doc-coat'] || '#ffffff'}
                stroke="#334155"
                strokeWidth="4"
                onClick={() => handleColorPart('doc-coat')}
              />
              {/* Stethoscope Loop */}
              <path
                id="doc-steth"
                d="M125 135 C125 185 175 185 175 135"
                fill="none"
                stroke={coloredParts['doc-steth'] || '#0284c7'}
                strokeWidth="6"
                onClick={() => handleColorPart('doc-steth')}
              />
              {/* Stethoscope bell */}
              <circle
                id="doc-steth-bell"
                cx="150"
                cy="195"
                r="10"
                fill={coloredParts['doc-steth-bell'] || '#38bdf8'}
                stroke="#334155"
                strokeWidth="3"
                onClick={() => handleColorPart('doc-steth-bell')}
              />
              {/* Red Cross Badge */}
              <rect
                id="doc-cross-v"
                x="180"
                y="155"
                width="8"
                height="24"
                rx="2"
                fill={coloredParts['doc-cross'] || '#ef4444'}
                onClick={() => handleColorPart('doc-cross')}
              />
              <rect
                id="doc-cross-h"
                x="172"
                y="163"
                width="24"
                height="8"
                rx="2"
                fill={coloredParts['doc-cross'] || '#ef4444'}
                onClick={() => handleColorPart('doc-cross')}
              />
            </svg>
          )}

          {activeSheet === 'builder' && (
            <svg viewBox="0 0 300 300" className="w-full h-full cursor-pointer">
              {/* Helmet */}
              <path
                id="build-helmet"
                d="M105 105 C105 55 195 55 195 105 Z"
                fill={coloredParts['build-helmet'] || '#eab308'}
                stroke="#334155"
                strokeWidth="4"
                onClick={() => handleColorPart('build-helmet')}
              />
              <rect
                id="build-brim"
                x="95"
                y="102"
                width="110"
                height="12"
                rx="4"
                fill={coloredParts['build-brim'] || '#ca8a04'}
                stroke="#334155"
                strokeWidth="3"
                onClick={() => handleColorPart('build-brim')}
              />
              {/* Face */}
              <circle
                id="build-face"
                cx="150"
                cy="145"
                r="35"
                fill={coloredParts['build-face'] || '#fed7aa'}
                stroke="#334155"
                strokeWidth="4"
                onClick={() => handleColorPart('build-face')}
              />
              <circle cx="140" cy="140" r="4" fill="#1e293b" />
              <circle cx="160" cy="140" r="4" fill="#1e293b" />
              <path d="M142 155 Q150 162 158 155" fill="none" stroke="#1e293b" strokeWidth="3" />
              {/* Bricks Wall */}
              <rect
                id="brick-1"
                x="70"
                y="200"
                width="75"
                height="35"
                rx="4"
                fill={coloredParts['brick-1'] || '#f97316'}
                stroke="#334155"
                strokeWidth="3"
                onClick={() => handleColorPart('brick-1')}
              />
              <rect
                id="brick-2"
                x="155"
                y="200"
                width="75"
                height="35"
                rx="4"
                fill={coloredParts['brick-2'] || '#ea580c'}
                stroke="#334155"
                strokeWidth="3"
                onClick={() => handleColorPart('brick-2')}
              />
              <rect
                id="brick-3"
                x="110"
                y="240"
                width="80"
                height="35"
                rx="4"
                fill={coloredParts['brick-3'] || '#c2410c'}
                stroke="#334155"
                strokeWidth="3"
                onClick={() => handleColorPart('brick-3')}
              />
            </svg>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between w-full mt-4">
          <button
            onClick={handleClear}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{t.clearBtn[currentLang]}</span>
          </button>

          <button
            onClick={() => {
              playTap();
              onClose();
            }}
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black text-sm"
          >
            {t.closeBtn[currentLang]}
          </button>
        </div>
      </div>
    </div>
  );
};
