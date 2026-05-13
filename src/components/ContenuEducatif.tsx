import type { CSSProperties } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, AlertTriangle, Lightbulb, CheckCircle2 } from "lucide-react";

interface Point {
  chiffre: string;
  titre: string;
  texte: string;
}

interface Solution {
  titre: string;
  texte: string;
}

interface Props {
  meta: { title: string; description: string };
  surtitre: string;
  titre: string;
  intro: string;
  points: Point[];
  solutions: Solution[];
  ctaLabel?: string;
}

const CARD: CSSProperties = {
  backgroundColor: "#FFFFFF",
  border: "0.5px solid #D3D1C7",
  borderRadius: "12px",
};

export default function ContenuEducatif({
  surtitre,
  titre,
  intro,
  points,
  solutions,
  ctaLabel = "Faire mon bilan gratuit",
}: Props) {
  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#F1EFE8" }}>

        {/* ── Hero ── */}
        <section className="max-w-3xl mx-auto px-6 pt-16 pb-12">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#1D9E75" }}>
            {surtitre}
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6" style={{ color: "#2C2C2A" }}>
            {titre}
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "#6B6B67" }}>
            {intro}
          </p>
        </section>

        {/* ── Le problème en 3 points ── */}
        <section className="max-w-3xl mx-auto px-6 pb-14">
          <div className="flex items-center gap-3 mb-8">
            <span style={{ display: "block", width: "40px", height: "3px", backgroundColor: "#1D9E75", borderRadius: "2px" }} />
            <p style={{ fontSize: "13px", fontWeight: 700, color: "#1D9E75", letterSpacing: "0.08em", textTransform: "uppercase", margin: 0 }}>
              Le problème
            </p>
          </div>
          <div className="space-y-4">
            {points.map((p, i) => (
              <div key={i} className="p-6 flex gap-5" style={CARD}>
                <div className="shrink-0">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: "#E1F5EE" }}
                  >
                    <AlertTriangle size={20} style={{ color: "#1D9E75" }} />
                  </div>
                  <p className="text-center text-xs font-bold mt-2" style={{ color: "#1D9E75" }}>
                    {p.chiffre}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1" style={{ color: "#2C2C2A", fontSize: "16px" }}>
                    {p.titre}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#6B6B67" }}>
                    {p.texte}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Ce qu'Avenlib propose ── */}
        <section className="max-w-3xl mx-auto px-6 pb-14">
          <div className="flex items-center gap-3 mb-8">
            <span style={{ display: "block", width: "40px", height: "3px", backgroundColor: "#1D9E75", borderRadius: "2px" }} />
            <p style={{ fontSize: "13px", fontWeight: 700, color: "#1D9E75", letterSpacing: "0.08em", textTransform: "uppercase", margin: 0 }}>
              Ce qu&apos;Avenlib propose
            </p>
          </div>
          <div className="space-y-4">
            {solutions.map((s, i) => (
              <div key={i} className="p-6 flex gap-5" style={CARD}>
                <CheckCircle2 size={22} style={{ color: "#1D9E75", flexShrink: 0, marginTop: 2 }} />
                <div>
                  <h3 className="font-semibold mb-1" style={{ color: "#2C2C2A", fontSize: "16px" }}>
                    {s.titre}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#6B6B67" }}>
                    {s.texte}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="max-w-3xl mx-auto px-6 pb-20">
          <div className="rounded-2xl px-8 py-14 text-center" style={{ backgroundColor: "#085041" }}>
            <Lightbulb size={32} className="mx-auto mb-4" style={{ color: "#1D9E75" }} />
            <h2 className="text-2xl font-bold mb-3 text-white">
              Quelle est ta situation réelle ?
            </h2>
            <p className="text-sm mb-8 max-w-md mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
              Le bilan Avenlib analyse ta situation en 13 questions et t&apos;oriente vers les bons experts, gratuitement.
            </p>
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#1D9E75" }}
            >
              {ctaLabel} <ArrowRight size={18} />
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
