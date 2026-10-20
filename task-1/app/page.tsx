'use client';

import React from 'react';
import { MuseumHeader } from '@/components/ui/MuseumHeader';
import { CosmicGlobeHero } from '@/components/3d/CosmicGlobeHero';
import { KalaPravahTimeline } from '@/components/timeline/KalaPravahTimeline';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAF7F0] text-[#1C1A17] relative selection:bg-[#B85D3B]/20 selection:text-[#7A2E14]">
      {/* Museum Header with Tanpura Ambiance */}
      <MuseumHeader />

      {/* Act I, II, III: 3D Cosmic Globe -> India Descent -> Particle Disintegration */}
      <CosmicGlobeHero />

      {/* Act IV: The Kala Pravah Interactive Timeline Exhibition */}
      <KalaPravahTimeline />

      {/* Museum Colophon & Epigraphic Inscription Footer */}
      <footer className="relative mt-24 border-t border-[#E7DFD2] bg-[#F4EFE6] py-16 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start justify-between gap-10">
          
          {/* Left Column: Curatorial Project Colophon */}
          <div className="space-y-4 max-w-lg">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#B85D3B]" />
              <h4 className="font-heading font-bold text-lg text-[#1C1A17] tracking-wider">
                KALA PRAVAH (काल प्रवाह)
              </h4>
            </div>
            
            <p className="text-sm font-body-editorial text-[#4A453F] leading-relaxed">
              A digital visual exhibition dedicated to the study, virtual conservation, and interactive exploration of five millennia of Bharatiya artistic traditions — from Harappan lost-wax metallurgy and Ashokan epigraphy to classical Ajanta tempera, imperial Chola bronzes, and living tribal cosmologies.
            </p>

            {/* Non-intrusive Team Curation Registry */}
            <div className="pt-2">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#8C4F3B] block mb-2">
                Curatorial Research & Exhibition Team
              </span>
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs text-[#594E42]">
                <span className="font-semibold text-[#1C1A17] bg-white/80 px-2.5 py-1 rounded-md border border-[#E7DFD2]">Anurag Anand</span>
                <span className="font-semibold text-[#1C1A17] bg-white/80 px-2.5 py-1 rounded-md border border-[#E7DFD2]">Vanshika</span>
                <span className="font-semibold text-[#1C1A17] bg-white/80 px-2.5 py-1 rounded-md border border-[#E7DFD2]">Yamini</span>
                <span className="font-semibold text-[#1C1A17] bg-white/80 px-2.5 py-1 rounded-md border border-[#E7DFD2]">Devanshi</span>
                <span className="font-semibold text-[#1C1A17] bg-white/80 px-2.5 py-1 rounded-md border border-[#E7DFD2]">Soumyadeep</span>
              </div>
            </div>
          </div>

          {/* Right Column: Epigraphic Mural Inscription of Art Traditions */}
          <div className="p-6 rounded-2xl bg-white/80 border border-[#D8CCA8] shadow-xs space-y-3.5 max-w-xl w-full">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#B85D3B]" />
              <h5 className="font-heading font-semibold text-xs text-[#8C4F3B] uppercase tracking-widest">
                प्रशस्ति एवं कला धारा · The Chronicles of Bharatiya Silpa
              </h5>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#4A453F] font-body-editorial">
              <div className="p-3 rounded-xl bg-[#FAF7F0] border border-[#E7DFD2] space-y-1">
                <span className="font-bold text-[#A84B29] font-heading text-[11px] block">
                  सिंधु-सरस्वती धातु परंपरा
                </span>
                <p className="text-[12px] text-[#594E42]">
                  Proto-historic lost-wax bronze casting & kinetic Harappan naturalism (c. 2500 BCE).
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#FAF7F0] border border-[#E7DFD2] space-y-1">
                <span className="font-bold text-[#A84B29] font-heading text-[11px] block">
                  मौर्य एवं गांधार प्रस्तर शिल्प
                </span>
                <p className="text-[12px] text-[#594E42]">
                  Monolithic polished Chunar sandstone & Greco-Buddhist meditative schist (c. 3rd BCE – 2nd CE).
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#FAF7F0] border border-[#E7DFD2] space-y-1">
                <span className="font-bold text-[#A84B29] font-heading text-[11px] block">
                  अजंता चित्र-सूत्र
                </span>
                <p className="text-[12px] text-[#594E42]">
                  Classical rock-cut tempera murals with pure lapis lazuli and mineral pigments (c. 5th C. CE).
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#FAF7F0] border border-[#E7DFD2] space-y-1">
                <span className="font-bold text-[#A84B29] font-heading text-[11px] block">
                  चोल, राजपूत एवं वारली धारा
                </span>
                <p className="text-[12px] text-[#594E42]">
                  Panchaloha cosmic dance bronzes, burnished Wasli court lyricism, and tribal cosmology.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-[#E7DFD2] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7E766D]">
          <p>© 2026 Bharatiya Kala Heritage Archive · Curated with historical reverence.</p>
          <p className="italic font-body-editorial text-sm text-[#8C4F3B]">Dedicated to the timeless preservation and visual celebration of Bharatiya Kala.</p>
        </div>
      </footer>
    </main>
  );
}
