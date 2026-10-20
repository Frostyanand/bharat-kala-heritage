'use client';

import React from 'react';
import Image from 'next/image';
import { Artifact } from '@/data/artifacts';
import { Box, Calendar, MapPin, Sparkles, ArrowRight } from 'lucide-react';

interface Props {
  artifact: Artifact;
  index: number;
  onSelect: (artifact: Artifact) => void;
}

export const EpochCard: React.FC<Props> = ({ artifact, index, onSelect }) => {
  const isEven = index % 2 === 0;

  return (
    <div className={`relative flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-14 my-16 sm:my-24`}>
      {/* Central Timeline Milestone Node on Desktop */}
      <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#FAF7F0] border-2 border-[#A84B29] items-center justify-center shadow-md z-10">
        <span className="w-3 h-3 rounded-full bg-[#B85D3B] animate-pulse" />
      </div>

      {/* Visual Artifact Plate Column */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <div 
          onClick={() => onSelect(artifact)}
          className="group relative w-full max-w-lg aspect-[3/4] max-h-[500px] rounded-2xl overflow-hidden bg-white border border-[#E7DFD2] shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer"
        >
          {/* Main Artifact Image */}
          <Image
            src={artifact.imageUrl}
            alt={artifact.title}
            fill
            sizes="(max-width: 1024px) 100vw, 550px"
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          {/* Elegant Vignette & Border Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-85 group-hover:opacity-75 transition-opacity" />

          {/* 3D Replica Indicator Pill */}
          <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white/40 shadow-sm text-xs font-semibold text-[#1C1A17]">
            <Box className="w-3.5 h-3.5 text-[#B85D3B]" />
            <span>Interactive 3D Replica</span>
          </div>

          {/* Date Badge */}
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-medium text-[#FAF7F0]">
            {artifact.dateRange}
          </div>

          {/* Bottom Card Title & Trigger */}
          <div className="absolute bottom-0 inset-x-0 p-6 text-white space-y-1.5">
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
              {artifact.era}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-heading leading-tight drop-shadow-sm">
              {artifact.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#F4EFE6] font-body-editorial line-clamp-2">
              {artifact.summary}
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-[#D4AF37] group-hover:translate-x-1 transition-transform">
              <span>Click to inspect 360° replica & dossier</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Curatorial Story & Metadata Column */}
      <div className="w-full lg:w-1/2 space-y-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F4EFE6] border border-[#D8CCA8] text-xs font-semibold text-[#8C4F3B]">
          <Calendar className="w-3.5 h-3.5" />
          <span>Epoch {index + 1} of 8 · {artifact.periodLabel}</span>
        </div>

        <div>
          <div className="flex items-baseline gap-3 flex-wrap">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#1C1A17] tracking-tight">
              {artifact.title}
            </h2>
            <span className="text-lg font-body-editorial italic text-[#A84B29]">
              {artifact.hindiTitle}
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-[#7E766D] font-medium flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#B85D3B]" />
            <span>{artifact.region} · Discovered: {artifact.discoveredAt}</span>
          </p>
        </div>

        <p className="text-base sm:text-lg text-[#3D352E] font-body-editorial leading-relaxed">
          {artifact.historicalContext}
        </p>

        {/* Material & Method Spec Pill */}
        <div className="p-4 rounded-xl bg-white border border-[#E7DFD2] space-y-2">
          <div className="flex items-center gap-2 text-xs uppercase font-bold text-[#A84B29] tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#C29B38]" />
            <span>Material & Ancient Technique</span>
          </div>
          <p className="text-xs sm:text-sm text-[#4A453F] leading-normal">
            {artifact.materialAndTechnique}
          </p>
        </div>

        {/* Key Themes Chips */}
        <div className="flex flex-wrap gap-2 pt-1">
          {artifact.keyThemes.map((theme, tIdx) => (
            <span 
              key={tIdx}
              className="px-2.5 py-1 rounded-md bg-[#F4EFE6] text-[#593122] text-xs font-medium border border-[#E7DFD2]"
            >
              #{theme}
            </span>
          ))}
        </div>

        {/* Action Button */}
        <div>
          <button
            onClick={() => onSelect(artifact)}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#1C1A17] hover:bg-[#A84B29] text-[#FAF7F0] shadow-sm hover:shadow-md transition-all duration-300 text-sm font-semibold group"
          >
            <Box className="w-4 h-4 text-[#C29B38]" />
            <span>Launch Virtual 3D Replica</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
