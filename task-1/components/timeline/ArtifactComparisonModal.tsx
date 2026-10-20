'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ARTIFACTS_DATA, Artifact } from '@/data/artifacts';
import { X, Layers, ArrowRightLeft } from 'lucide-react';

interface Props {
  initialArtifact?: Artifact | null;
  onClose: () => void;
}

export const ArtifactComparisonModal: React.FC<Props> = ({ initialArtifact, onClose }) => {
  const [artifactA, setArtifactA] = useState<Artifact>(
    initialArtifact || ARTIFACTS_DATA[0]
  );
  const [artifactB, setArtifactB] = useState<Artifact>(
    ARTIFACTS_DATA.find(a => a.id !== (initialArtifact?.id || ARTIFACTS_DATA[0].id)) || ARTIFACTS_DATA[4]
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-5xl max-h-[92vh] bg-[#FAF7F0] rounded-2xl border border-[#D8CCA8] shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white/90 border-b border-[#E7DFD2]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#FAF7F0] text-[#A84B29] border border-[#E7DFD2]">
              <ArrowRightLeft className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-heading text-[#1C1A17]">Comparative Art History Matrix</h3>
              <p className="text-xs text-[#7E766D]">
                Side-by-side structural analysis of Indian artistic evolution across epochs (CO1 Academic Scope)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#E7DFD2] text-[#4A453F] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selection Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-6 py-3.5 bg-[#F4EFE6] border-b border-[#E7DFD2]">
          <div>
            <label className="block text-xs font-semibold text-[#8C4F3B] uppercase mb-1">Artifact Specimen 1</label>
            <select
              value={artifactA.id}
              onChange={(e) => {
                const found = ARTIFACTS_DATA.find(a => a.id === e.target.value);
                if (found) setArtifactA(found);
              }}
              className="w-full px-3 py-2 rounded-lg bg-white border border-[#E7DFD2] text-sm font-medium text-[#1C1A17] focus:outline-none focus:border-[#A84B29]"
            >
              {ARTIFACTS_DATA.map((art) => (
                <option key={art.id} value={art.id}>
                  {art.title} ({art.dateRange})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#8C4F3B] uppercase mb-1">Artifact Specimen 2</label>
            <select
              value={artifactB.id}
              onChange={(e) => {
                const found = ARTIFACTS_DATA.find(a => a.id === e.target.value);
                if (found) setArtifactB(found);
              }}
              className="w-full px-3 py-2 rounded-lg bg-white border border-[#E7DFD2] text-sm font-medium text-[#1C1A17] focus:outline-none focus:border-[#A84B29]"
            >
              {ARTIFACTS_DATA.map((art) => (
                <option key={art.id} value={art.id}>
                  {art.title} ({art.dateRange})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparison Content Table (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Side by Side Visual Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Artifact A */}
            <div className="p-4 rounded-xl bg-white border border-[#E7DFD2] space-y-3">
              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-[#FAF7F0]">
                <Image
                  src={artifactA.imageUrl}
                  alt={artifactA.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-xs font-bold text-[#B85D3B] uppercase">{artifactA.era}</span>
                <h4 className="text-lg font-bold font-heading text-[#1C1A17]">{artifactA.title}</h4>
                <p className="text-xs text-[#7E766D]">{artifactA.dateRange} · {artifactA.region}</p>
              </div>
            </div>

            {/* Artifact B */}
            <div className="p-4 rounded-xl bg-white border border-[#E7DFD2] space-y-3">
              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-[#FAF7F0]">
                <Image
                  src={artifactB.imageUrl}
                  alt={artifactB.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-xs font-bold text-[#B85D3B] uppercase">{artifactB.era}</span>
                <h4 className="text-lg font-bold font-heading text-[#1C1A17]">{artifactB.title}</h4>
                <p className="text-xs text-[#7E766D]">{artifactB.dateRange} · {artifactB.region}</p>
              </div>
            </div>
          </div>

          {/* Comparative Metric Rows */}
          <div className="space-y-4">
            {/* Row 1: Medium & Material Evolution */}
            <div className="p-4 rounded-xl bg-white border border-[#E7DFD2] space-y-2">
              <span className="text-xs font-bold text-[#A84B29] uppercase tracking-wider">
                Material & Metallurgical Evolution
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-[#3D352E]">
                <div className="p-2.5 rounded bg-[#FAF7F0] border border-[#E7DFD2]">
                  <strong>{artifactA.title}:</strong> {artifactA.materialAndTechnique}
                </div>
                <div className="p-2.5 rounded bg-[#FAF7F0] border border-[#E7DFD2]">
                  <strong>{artifactB.title}:</strong> {artifactB.materialAndTechnique}
                </div>
              </div>
            </div>

            {/* Row 2: Artistic Significance */}
            <div className="p-4 rounded-xl bg-white border border-[#E7DFD2] space-y-2">
              <span className="text-xs font-bold text-[#A84B29] uppercase tracking-wider">
                Artistic Significance & Visual Language
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-[#3D352E]">
                <div className="p-2.5 rounded bg-[#FAF7F0] border border-[#E7DFD2]">
                  <strong>{artifactA.title}:</strong> {artifactA.artisticSignificance}
                </div>
                <div className="p-2.5 rounded bg-[#FAF7F0] border border-[#E7DFD2]">
                  <strong>{artifactB.title}:</strong> {artifactB.artisticSignificance}
                </div>
              </div>
            </div>

            {/* Row 3: Discovery & Current Repository */}
            <div className="p-4 rounded-xl bg-white border border-[#E7DFD2] space-y-2">
              <span className="text-xs font-bold text-[#A84B29] uppercase tracking-wider">
                Excavation Site & Museum Repository
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-[#3D352E]">
                <div className="p-2.5 rounded bg-[#FAF7F0] border border-[#E7DFD2]">
                  <p><strong>Found:</strong> {artifactA.discoveredAt}</p>
                  <p><strong>Preserved at:</strong> {artifactA.currentLocation}</p>
                </div>
                <div className="p-2.5 rounded bg-[#FAF7F0] border border-[#E7DFD2]">
                  <p><strong>Found:</strong> {artifactB.discoveredAt}</p>
                  <p><strong>Preserved at:</strong> {artifactB.currentLocation}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
