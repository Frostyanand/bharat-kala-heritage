'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Artifact } from '@/data/artifacts';
import { VirtualArtifact3D } from '@/components/3d/VirtualArtifact3D';
import { X, Volume2, VolumeX, Eye, Box, FileText, MapPin, Building, Calendar, Layers, Sparkles, CheckCircle2 } from 'lucide-react';

interface Props {
  artifact: Artifact | null;
  onClose: () => void;
  onOpenCompare?: (artifact: Artifact) => void;
}

export const ArtifactModal: React.FC<Props> = ({ artifact, onClose, onOpenCompare }) => {
  const [activeTab, setActiveTab] = useState<'3d' | 'image' | 'dossier'>('3d');
  const [isSpeaking, setIsSpeaking] = useState(false);

  if (!artifact) return null;

  const toggleSpeech = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const text = `${artifact.title}. Dated ${artifact.dateRange}, from ${artifact.region}. ${artifact.summary} ${artifact.historicalContext}`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const handleClose = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md animate-fadeIn">
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-5xl max-h-[92vh] bg-[#FAF7F0] rounded-2xl border border-[#D8CCA8] shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-white/90 border-b border-[#E7DFD2]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B85D3B]" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold font-heading text-[#1C1A17]">{artifact.title}</h3>
                <span className="text-sm font-body-editorial italic text-[#8C4F3B]">({artifact.hindiTitle})</span>
              </div>
              <span className="text-xs uppercase tracking-wider text-[#7E766D] font-medium">
                {artifact.era} · {artifact.dateRange}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Guide Narration Button */}
            <button
              onClick={toggleSpeech}
              title={isSpeaking ? "Pause Audio Narration" : "Play Audio Narration"}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                isSpeaking 
                  ? 'bg-[#B85D3B] text-white border-[#8C3D20]' 
                  : 'bg-white hover:bg-[#F3ECE1] text-[#4A453F] border-[#E7DFD2]'
              }`}
            >
              {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span>{isSpeaking ? 'Listening...' : 'Curator Audio'}</span>
            </button>

            {/* Compare Button */}
            {onOpenCompare && (
              <button
                onClick={() => onOpenCompare(artifact)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#1F3A52] hover:bg-[#152737] text-white border border-[#152737] transition-all"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Compare</span>
              </button>
            )}

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="p-2 rounded-full hover:bg-[#E7DFD2] text-[#4A453F] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Selection Bar */}
        <div className="flex items-center gap-2 px-6 py-2.5 bg-[#F4EFE6] border-b border-[#E7DFD2] text-xs font-semibold">
          <button
            onClick={() => setActiveTab('3d')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg transition-all ${
              activeTab === '3d'
                ? 'bg-white text-[#A84B29] shadow-sm border border-[#E7DFD2]'
                : 'text-[#6C6358] hover:text-[#1C1A17]'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>Interactive 3D Replica</span>
          </button>

          <button
            onClick={() => setActiveTab('image')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg transition-all ${
              activeTab === 'image'
                ? 'bg-white text-[#A84B29] shadow-sm border border-[#E7DFD2]'
                : 'text-[#6C6358] hover:text-[#1C1A17]'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Museum Plate (High-Res)</span>
          </button>

          <button
            onClick={() => setActiveTab('dossier')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg transition-all ${
              activeTab === 'dossier'
                ? 'bg-white text-[#A84B29] shadow-sm border border-[#E7DFD2]'
                : 'text-[#6C6358] hover:text-[#1C1A17]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Curatorial Dossier</span>
          </button>
        </div>

        {/* Modal Main Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Main Visual / 3D Canvas Area */}
          <div className="w-full h-[380px] sm:h-[440px] rounded-xl overflow-hidden bg-white border border-[#E7DFD2] shadow-sm relative">
            {activeTab === '3d' && (
              <VirtualArtifact3D artifact={artifact} />
            )}

            {activeTab === 'image' && (
              <div className="relative w-full h-full flex items-center justify-center bg-[#1C1A17]">
                <Image
                  src={artifact.imageUrl}
                  alt={artifact.title}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 1024px) 100vw, 900px"
                  priority
                />
                <div className="absolute bottom-3 left-4 px-3 py-1 rounded bg-black/70 backdrop-blur-md text-[11px] text-[#FAF7F0] border border-white/20">
                  Museum Archival Documentation Plate · 8K Resolution
                </div>
              </div>
            )}

            {activeTab === 'dossier' && (
              <div className="w-full h-full p-6 overflow-y-auto bg-white font-body-editorial text-base text-[#3D352E] leading-relaxed space-y-4">
                <div className="p-4 rounded-xl bg-[#FAF7F0] border border-[#E7DFD2]">
                  <h4 className="font-heading font-bold text-sm text-[#A84B29] uppercase tracking-wider mb-2">
                    Academic Assignment Alignment
                  </h4>
                  <p className="text-sm text-[#4A453F]">
                    <strong>{artifact.academicCO}</strong>: Detailed archaeological, metallurgical, and cultural analysis fulfilling Semester 5 syllabus requirements.
                  </p>
                </div>

                <div>
                  <h4 className="font-heading font-semibold text-lg text-[#1C1A17] mb-1">Historical Context & Excavation</h4>
                  <p>{artifact.historicalContext}</p>
                </div>

                <div>
                  <h4 className="font-heading font-semibold text-lg text-[#1C1A17] mb-1">Artistic Significance & Form</h4>
                  <p>{artifact.artisticSignificance}</p>
                </div>

                <div>
                  <h4 className="font-heading font-semibold text-lg text-[#1C1A17] mb-1">Material Science & Ancient Technique</h4>
                  <p>{artifact.materialAndTechnique}</p>
                </div>
              </div>
            )}
          </div>

          {/* Quick Metadata Grid (Museum Spec Sheet) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-white border border-[#E7DFD2]">
              <div className="flex items-center gap-1.5 text-xs text-[#7E766D] mb-1">
                <Calendar className="w-3.5 h-3.5 text-[#B85D3B]" />
                <span>Date & Era</span>
              </div>
              <p className="text-sm font-semibold text-[#1C1A17]">{artifact.dateRange}</p>
              <p className="text-[11px] text-[#6C6358]">{artifact.era}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-[#E7DFD2]">
              <div className="flex items-center gap-1.5 text-xs text-[#7E766D] mb-1">
                <MapPin className="w-3.5 h-3.5 text-[#B85D3B]" />
                <span>Origin Region</span>
              </div>
              <p className="text-sm font-semibold text-[#1C1A17]">{artifact.region}</p>
              <p className="text-[11px] text-[#6C6358] truncate">{artifact.discoveredAt}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-[#E7DFD2]">
              <div className="flex items-center gap-1.5 text-xs text-[#7E766D] mb-1">
                <Layers className="w-3.5 h-3.5 text-[#B85D3B]" />
                <span>Medium & Material</span>
              </div>
              <p className="text-sm font-semibold text-[#1C1A17]">{artifact.medium}</p>
              <p className="text-[11px] text-[#6C6358]">{artifact.dimensions}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-[#E7DFD2]">
              <div className="flex items-center gap-1.5 text-xs text-[#7E766D] mb-1">
                <Building className="w-3.5 h-3.5 text-[#B85D3B]" />
                <span>Current Repository</span>
              </div>
              <p className="text-sm font-semibold text-[#1C1A17] truncate">{artifact.currentLocation}</p>
              <p className="text-[11px] text-[#6C6358]">Permanent Exhibition</p>
            </div>
          </div>

          {/* Iconography Breakdown */}
          <div className="p-5 rounded-xl bg-white border border-[#E7DFD2] space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C29B38]" />
              <h4 className="font-heading font-semibold text-sm text-[#1C1A17] uppercase tracking-wider">
                Key Iconographic Features & Visual Symbols
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {artifact.iconography.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#4A453F]">
                  <CheckCircle2 className="w-4 h-4 text-[#B85D3B] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Curatorial Quote / Scholarly Annotation */}
          <div className="p-4 rounded-xl bg-[#F4EFE6] border-l-4 border-[#A84B29] text-sm italic font-body-editorial text-[#4A453F]">
            &ldquo;{artifact.curatorNotes}&rdquo;
          </div>
        </div>
      </div>
    </div>
  );
};
