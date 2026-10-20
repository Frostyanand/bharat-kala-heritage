'use client';

import React from 'react';
import { MuseumHeader } from '@/components/ui/MuseumHeader';
import { CosmicGlobeHero } from '@/components/3d/CosmicGlobeHero';
import { KalaPravahTimeline } from '@/components/timeline/KalaPravahTimeline';
import { Sparkles, Award, ExternalLink, Compass, ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAF7F0] text-[#1C1A17] relative selection:bg-[#B85D3B]/20 selection:text-[#7A2E14]">
      {/* Museum Header with Tanpura Ambiance */}
      <MuseumHeader />

      {/* Act I, II, III: 3D Cosmic Globe -> India Descent -> Particle Disintegration */}
      <CosmicGlobeHero />

      {/* Act IV: The Kala Pravah Interactive Timeline Exhibition */}
      <KalaPravahTimeline />

      {/* Curatorial & Academic Assignment Footer */}
      <footer className="relative mt-24 border-t border-[#E7DFD2] bg-[#F4EFE6] py-16 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-10">
          {/* Left Column: Assignment Details */}
          <div className="space-y-4 max-w-lg">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#B85D3B]" />
              <h4 className="font-heading font-bold text-lg text-[#1C1A17] tracking-wider">
                KALA PRAVAH (काल प्रवाह)
              </h4>
            </div>
            <p className="text-sm font-body-editorial text-[#4A453F] leading-relaxed">
              Curated for <strong>Continuous Learning Assessment (CLA-I)</strong> in <strong>Indian Art Form — Semester 5</strong>. This project fulfills all requirements of <strong>Task 1: Interactive Timeline with Artifacts (10 Marks — CO1)</strong>, featuring virtual 3D replicas, historical context, materials analysis, and cross-epoch comparisons.
            </p>
            <div className="flex items-center gap-3 text-xs text-[#7E766D]">
              <span className="flex items-center gap-1 font-semibold text-[#8C4F3B]">
                <ShieldCheck className="w-4 h-4 text-[#B85D3B]" />
                Academic Integrity & Authentic Provenance
              </span>
            </div>
          </div>

          {/* Center Column: Syllabus Modules Covered */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8C4F3B]">
              Course Syllabus Modules
            </span>
            <ul className="text-xs text-[#4A453F] space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A84B29]" />
                <span>Unit 1: Indus Valley Metallurgy & Harappan City Planning</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A84B29]" />
                <span>Unit 2: Mauryan Sandstone & Ashokan Dhamma Epigraphy</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A84B29]" />
                <span>Unit 3: Classical Gupta Murals & Ajanta Fresco Aesthetics</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A84B29]" />
                <span>Unit 4: Medieval Chola Panchaloha Bronzes & Sacred Iconography</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A84B29]" />
                <span>Unit 5: Mughal-Rajput Miniatures & Tribal Warli Heritage</span>
              </li>
            </ul>
          </div>

          {/* Right Column: Repository Structure */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8C4F3B]">
              Integrated Multi-Task Workspace
            </span>
            <div className="p-4 rounded-xl bg-white border border-[#E7DFD2] space-y-2 text-xs">
              <div className="flex items-center justify-between text-[#1C1A17] font-semibold">
                <span>Task 1: Interactive Timeline</span>
                <span className="text-[#B85D3B]">Completed ✓</span>
              </div>
              <div className="flex items-center justify-between text-[#7E766D]">
                <span>Task 2: Interactive Art Map</span>
                <span className="italic">Ready for Teammate</span>
              </div>
              <div className="pt-2 text-[11px] text-[#7E766D] border-t border-[#E7DFD2]">
                Unified Repository: <code className="bg-[#FAF7F0] px-1.5 py-0.5 rounded text-[#A84B29]">Indian Art Form Sem 5</code>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-[#E7DFD2] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7E766D]">
          <p>© 2026 Frosty Coder · Academic Visual Exhibition · Made with precision & cultural reverence.</p>
          <p className="italic font-body-editorial text-sm">Dedicated to the preservation and digital reimagining of Bharatiya Kala.</p>
        </div>
      </footer>
    </main>
  );
}
