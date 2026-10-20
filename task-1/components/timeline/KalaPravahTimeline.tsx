'use client';

import React, { useState } from 'react';
import { ARTIFACTS_DATA, HISTORICAL_PERIODS, Artifact } from '@/data/artifacts';
import { EpochCard } from '@/components/timeline/EpochCard';
import { ArtifactModal } from '@/components/timeline/ArtifactModal';
import { ArtifactComparisonModal } from '@/components/timeline/ArtifactComparisonModal';
import { Search, Sparkles, Filter, Layers } from 'lucide-react';

export const KalaPravahTimeline: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArtifact, setActiveArtifact] = useState<Artifact | null>(null);
  const [compareArtifact, setCompareArtifact] = useState<Artifact | null>(null);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Filter artifacts
  const filteredArtifacts = ARTIFACTS_DATA.filter((art) => {
    // Period filter
    let matchesPeriod = true;
    if (selectedPeriod === 'proto-historic') {
      matchesPeriod = art.approxYear <= -250;
    } else if (selectedPeriod === 'classical') {
      matchesPeriod = art.approxYear > -250 && art.approxYear <= 600;
    } else if (selectedPeriod === 'medieval') {
      matchesPeriod = art.approxYear > 600 && art.approxYear <= 1760;
    } else if (selectedPeriod === 'folk-living') {
      matchesPeriod = art.approxYear > 1760;
    }

    // Search query filter
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      art.title.toLowerCase().includes(q) ||
      art.era.toLowerCase().includes(q) ||
      art.medium.toLowerCase().includes(q) ||
      art.region.toLowerCase().includes(q) ||
      art.keyThemes.some(t => t.toLowerCase().includes(q));

    return matchesPeriod && matchesSearch;
  });

  const handleOpenCompare = (artifact?: Artifact) => {
    setCompareArtifact(artifact || null);
    setIsCompareOpen(true);
  };

  return (
    <section id="timeline-section" className="relative w-full py-20 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Timeline Exhibition Intro Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF7F0] border border-[#D8CCA8] shadow-sm text-xs font-semibold text-[#8C4F3B]">
          <Sparkles className="w-3.5 h-3.5 text-[#C29B38]" />
          <span>Interactive Exhibition · CO1 Academic Evaluation</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold font-heading text-[#1C1A17] tracking-tight">
          The Flow of Five Millennia
        </h2>
        <p className="text-base sm:text-lg text-[#4A453F] font-body-editorial leading-relaxed">
          Traverse through India&apos;s most influential artistic milestones. Click any artifact card to engage with the virtual 3D replica, inspect material details, or play audio guides.
        </p>

        {/* Global Compare CTA */}
        <div className="pt-2">
          <button
            onClick={() => handleOpenCompare()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-[#F4EFE6] text-[#A84B29] border border-[#E7DFD2] shadow-sm hover:shadow transition-all text-xs font-bold uppercase tracking-wider"
          >
            <Layers className="w-4 h-4 text-[#C29B38]" />
            <span>Open Comparative Art History Matrix</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-[#E7DFD2] shadow-sm mb-16 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Period Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {HISTORICAL_PERIODS.map((period) => (
            <button
              key={period.id}
              onClick={() => setSelectedPeriod(period.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                selectedPeriod === period.id
                  ? 'bg-[#A84B29] text-white shadow-sm'
                  : 'bg-[#FAF7F0] text-[#4A453F] hover:bg-[#F4EFE6] border border-[#E7DFD2]'
              }`}
            >
              <span>{period.label}</span>
              <span className="block text-[10px] opacity-75 font-normal">{period.sublabel}</span>
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[#7E766D] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search material, dynasty, theme..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#FAF7F0] border border-[#E7DFD2] text-xs font-medium text-[#1C1A17] placeholder:text-[#7E766D] focus:outline-none focus:border-[#A84B29]"
          />
        </div>
      </div>

      {/* Central Flowing Timeline Spine on Desktop */}
      <div className="relative">
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-[#B85D3B] via-[#C29B38] to-[#1F3A52] opacity-40" />

        {/* Artifacts List */}
        {filteredArtifacts.length > 0 ? (
          <div className="space-y-12">
            {filteredArtifacts.map((artifact, index) => (
              <EpochCard
                key={artifact.id}
                artifact={artifact}
                index={index}
                onSelect={(art) => setActiveArtifact(art)}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl bg-white border border-[#E7DFD2] space-y-3">
            <Filter className="w-8 h-8 text-[#A84B29] mx-auto opacity-60" />
            <h4 className="font-heading font-semibold text-lg text-[#1C1A17]">No artifacts matched your criteria</h4>
            <p className="text-sm text-[#7E766D]">Try searching for &quot;Bronze&quot;, &quot;Buddha&quot;, &quot;Sandstone&quot;, or select &quot;Full Chronology&quot;.</p>
            <button
              onClick={() => { setSelectedPeriod('all'); setSearchQuery(''); }}
              className="px-4 py-2 rounded-lg bg-[#A84B29] text-white text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Artifact Full Detail & 3D Inspection Modal */}
      {activeArtifact && (
        <ArtifactModal
          artifact={activeArtifact}
          onClose={() => setActiveArtifact(null)}
          onOpenCompare={(art) => {
            setActiveArtifact(null);
            handleOpenCompare(art);
          }}
        />
      )}

      {/* Comparison Modal */}
      {isCompareOpen && (
        <ArtifactComparisonModal
          initialArtifact={compareArtifact}
          onClose={() => setIsCompareOpen(false)}
        />
      )}
    </section>
  );
};
