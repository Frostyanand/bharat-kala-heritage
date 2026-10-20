'use client';

import React, { useState, useEffect } from 'react';
import { tanpuraAudio } from '@/components/audio/AudioGuide';
import { Volume2, VolumeX, Music, Compass, BookOpen } from 'lucide-react';

export const MuseumHeader: React.FC = () => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleAmbiance = () => {
    const newState = tanpuraAudio.toggle();
    setIsPlayingAudio(newState);
  };

  return (
    <header className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
      isScrolled 
        ? 'bg-[#FAF7F0]/90 backdrop-blur-md border-b border-[#E7DFD2] py-3 shadow-xs' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#FAF7F0] border border-[#B85D3B] flex items-center justify-center shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B85D3B]" />
          </div>
          <div>
            <span className="text-base sm:text-lg font-bold font-heading text-[#1C1A17] tracking-wider">
              KALA PRAVAH
            </span>
            <span className="hidden sm:inline-block ml-2 text-xs font-semibold text-[#8C4F3B] uppercase tracking-widest font-body-editorial">
              काल प्रवाह · Sem 5 CLA-I
            </span>
          </div>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Ambient Music / Tanpura Drone Button */}
          <button
            onClick={toggleAmbiance}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
              isPlayingAudio
                ? 'bg-[#A84B29] text-white border-[#8C3D20] shadow-sm'
                : 'bg-white/85 hover:bg-white text-[#3D352E] border-[#E7DFD2] shadow-xs'
            }`}
            title="Toggle authentic Indian Tanpura drone ambient sound"
          >
            {isPlayingAudio ? (
              <>
                <Volume2 className="w-3.5 h-3.5 animate-pulse text-[#D4AF37]" />
                <span className="hidden sm:inline">Tanpura Ambiance: ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#7E766D]" />
                <span className="hidden sm:inline">Museum Ambiance</span>
              </>
            )}
          </button>

          {/* Academic Scope Pill */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/70 border border-[#E7DFD2] text-[11px] font-medium text-[#7E766D]">
            <BookOpen className="w-3 h-3 text-[#B85D3B]" />
            <span>Task 1 · 10 Marks (CO1)</span>
          </div>
        </div>
      </div>
    </header>
  );
};
