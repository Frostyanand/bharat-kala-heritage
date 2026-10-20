# Bharatiya Kala Heritage (भारतीय कला धरोहर)
### Integrated Visual Arts Repository · Semester 5 CLA-I Academic Assignment

---

## 🏛️ Project Overview

This repository houses the digital assignments for **Indian Art Form (Semester 5)**. Designed with high-fidelity museum-grade aesthetics, the project prioritizes authentic cultural representation, rigorous archaeological provenance, and interactive 3D virtual replicas while completely eschewing modern "AI-slop" web clichés.

---

## 📂 Repository Architecture

```
Indian Art Form Sem 5/                     <-- Unified Project Root (Git Repository)
│
├── task-1/                                <-- Task 1: Interactive Timeline with Artifacts (CO1)
│   ├── app/                               <-- Next.js 16 App Router
│   │   ├── layout.tsx                     <-- Google Fonts (Cinzel, Cormorant, Plus Jakarta Sans)
│   │   ├── page.tsx                       <-- Master Scrollytelling & Exhibition Page
│   │   └── globals.css                    <-- Indian Heritage Design Tokens & Parchment Texture
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── CosmicGlobeHero.tsx        <-- 3D Parchment Earth & GPU Particle Disintegration
│   │   │   └── VirtualArtifact3D.tsx      <-- 360° Interactive 3D Artifact Replica Viewer
│   │   ├── timeline/
│   │   │   ├── KalaPravahTimeline.tsx     <-- Chronological Timeline River & Filter Engine
│   │   │   ├── EpochCard.tsx              <-- Museum Exhibition Artifact Card
│   │   │   ├── ArtifactModal.tsx          <-- 3D Inspector, Audio Guide, & Curatorial Dossier
│   │   │   └── ArtifactComparisonModal.tsx<-- Cross-Epoch Art History Matrix
│   │   ├── audio/
│   │   │   └── AudioGuide.ts              <-- Procedural Web Audio API Tanpura Drone
│   │   └── ui/
│   │       └── MuseumHeader.tsx           <-- Sticky Curatorial Navigation & Sound Toggle
│   ├── data/
│   │   └── artifacts.ts                   <-- Curated Academic Dataset Across 8 Epochs
│   └── public/
│       ├── artifacts/                     <-- 8K Museum Documentation Plates
│       └── textures/                      <-- Equirectangular Parchment Cartography Map
│
├── task-2/                                <-- Task 2: Interactive Art Map (CO1 - Incoming from Teammate)
├── run-project.bat                        <-- Standalone One-Click Launch Script
└── README.md                              <-- Master Academic Documentation
```

---

## 🌟 Task 1: Kala Pravah (काल प्रवाह) Highlights

### 1. Scrollytelling Choreography (3D WebGL)
- **Act I: Cosmic Prithvi:** An antiqued parchment 3D Earth globe rotating smoothly in ambient gallery warmth.
- **Act II: Continental Descent:** Scroll-interpolated camera tracking smoothly zooming down to the Indian subcontinent ($20.6^\circ\text{ N}, 78.9^\circ\text{ E}$).
- **Act III: The Mahapralaya Disintegration:** Custom GPU shader dissolving the globe mesh into **18,000+ golden and terracotta particles**, swirling in a curling shockwave that funnels down into the timeline.
- **Act IV: The Kala Pravah Timeline:** An interactive chronological river spanning 5,000 years of Bharatiya artistic consciousness.

### 2. The 8 Curated Historical Epochs & Virtual 3D Replicas
1. **Indus Valley Civilization (c. 2500 BCE):** *The Dancing Girl of Mohenjo-daro* (Lost-wax bronze replica in Tribhanga posture).
2. **Mauryan Empire (c. 250 BCE):** *Lion Capital of Ashoka at Sarnath* (Monolithic Chunar sandstone replica with Mauryan polish).
3. **Kushan & Gandhara (c. 2nd C. CE):** *Fasting Siddhartha* (Greco-Buddhist dark grey schist stone replica in Dhyana Mudra).
4. **Gupta Classical Golden Age (c. 5th C. CE):** *Bodhisattva Padmapani from Ajanta Cave 1* (Lapis lazuli and mineral tempera fresco replica).
5. **Medieval Chola Dynasty (c. 1000 CE):** *Nataraja: Lord of the Cosmic Dance* (Panchaloha lost-wax casting within flaming halo prabhamandala).
6. **Mughal & Rajput Era (c. 1755 CE):** *Radha as Bani Thani* by Nihal Chand (Kishangarh miniature on burnished wasli paper).
7. **Southern Classical Masters (c. 1820 CE):** *Thanjavur Balakrishna* (22k embossed gold leaf, gesso relief, and uncut gemstones).
8. **Folk & Living Heritage (Continuum):** *Warli Tribal Tarpa Dance* (Sacred geometry, rice paste on terracotta mud).

### 3. Curatorial Features
- **360° Drag-to-Rotate 3D Replica:** Real-time orbit, material reflection, and directional lighting.
- **Curator Audio Guide:** Live audio narration synthesized via the Web Speech API.
- **Procedural Tanpura Ambiance:** Zero-dependency Indian classical drone ($C^\sharp$ - $G^\sharp$) generated via Web Audio API oscillators.
- **Comparative Art History Matrix:** Side-by-side analysis contrasting material evolution, iconography, and excavation origins across any two artifacts.

---

## 🚀 How to Run the Demos

### Method A: Master Interactive Launcher (Recommended)
Double-click **`run-all-demos.bat`** in the project root:
- Choose `[1]` to launch **Task 1: Kala Pravah** on `http://localhost:3001`
- Choose `[2]` to launch **Task 2: KalaDarshan** on `http://localhost:5173`
- Choose `[3]` to launch **BOTH** simultaneously for a side-by-side presentation!

### Method B: Standalone Task Launchers
* **Task 1 (Interactive Timeline):** Double-click **`run-project.bat`**
* **Task 2 (Interactive Art Map):** Double-click **`run-task-2.bat`**

### Method C: Manual Terminal Execution
```bash
# To run Task 1 (Next.js):
cd task-1
npm run dev -- -p 3001
# Open http://localhost:3001

# To run Task 2 (Vite):
cd task-2
npm run dev -- --port 5173
# Open http://localhost:5173
```

---

## 🎨 Anti-"AI Slop" Design Manifesto

This project intentionally eliminates the generic hallmarks of automated AI web templates:
- **No Neon Purple/Blue Gradients:** Grounded exclusively in historical pigments: **Sandstone Ivory** (`#FAF7F0`), **Terracotta** (`#A84B29`), **Ajanta Indigo** (`#1F3A52`), and **Temple Gold** (`#C29B38`).
- **No Formulaic Bento Boxes:** Replaced with spacious exhibition pedestal margins, asymmetric columns, and tactile paper grains.
- **No Generic System Sans:** Employs classical epigraphic serif (*Cinzel*), curatorial reading serif (*Cormorant Garamond*), and editorial accents (*Plus Jakarta Sans*).
- **No Marketing Fluff:** Every paragraph is grounded in verified archaeological data, excavation years, museum accession repositories, and Sanskrit art history terminologies.

---

## 👥 Course & Assignment Mapping
* **Course:** Indian Art Form (Semester 5)
* **Assessment:** Continuous Learning Assessment (CLA-I) — 30% Weightage
* **Task 1: Interactive Timeline with Virtual Artifacts (CO1)** — Complete (Port 3001)
* **Task 2: Interactive Art Map & Living Heritage Atlas (CO1)** — Complete (Port 5173)
* **Status:** Complete, Integrated & Ready for Evaluation

