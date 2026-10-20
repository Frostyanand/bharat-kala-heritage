import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700", "900"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Kala Pravah (काल प्रवाह) — Interactive Timeline of Indian Art Forms & Artifacts",
  description: "An interactive, scholarly scrollytelling exhibition tracing 5,000 years of Indian art history through 3D virtual artifact replicas, epigraphy, and cultural context. Semester 5 CLA-I Assignment.",
  keywords: ["Indian Art Forms", "Indian Art History", "Mohenjo-daro", "Ashoka Pillar", "Ajanta Frescoes", "Chola Bronze", "Nataraja", "Kishangarh Miniature", "Tanjore Painting", "Warli Art"],
  authors: [{ name: "Frosty Coder" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${cormorant.variable} ${jakarta.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#FAF7F0] text-[#1E1B18] antialiased selection:bg-[#B85D3B]/20 selection:text-[#7A2E14]">
        {children}
      </body>
    </html>
  );
}
