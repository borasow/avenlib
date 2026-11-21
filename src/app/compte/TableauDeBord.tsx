"use client";
import Link from "next/link";
import { ArrowRight, ChevronRight, ShieldCheck } from "lucide-react";
import { ICONES, NIVEAU } from "@/components/domaineUi";
import type { ScoreDomaine } from "@/lib/scoring";

export default function TableauDeBord({ scores }: { scores: Record<string, ScoreDomaine> }) {
  const lignes = Object.entries(scores)
    .map(([key, s]) => ({ key, ...s }))
    .sort((a, b) => NIVEAU[a.niveau].ordre - NIVEAU[b.niveau].ordre || a.score - b.score);

  const total = lignes.length || 1;
  const global = Math.round(lignes.reduce((t, l) => t + l.score, 0) / total);
  const compte = (n: keyof typeof NIVEAU) => lignes.filter((l) => l.niveau === n).length;
  const priorite = lignes[0];
  const prioriteUrgente = priorite && priorite.niveau !== "ok";

  return (
    <section className="mb-8" aria-labelledby="tdb-titre">
      <div className="flex items-baseline justify-between mb-3 px-1">
        <h2 id="tdb-titre" className="text-lg sm:text-xl font-bold" style={{ color: "#2C2C2A" }}>Ta protection en un coup d&apos;œil</h2>
        <Link href="/resultats" className="text-sm font-semibold hover:underline whitespace-nowrap ml-3" style={{ color: "#15805F" }}>Bilan complet</Link>
      </div>

      {/* Synthèse */}
      <div className="rounded-3xl p-6 sm:p-7 text-white" style={{ backgroundColor: "#1F4A3F" }}>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <p className="text-sm" style={{ color: "#9FE1CB" }}>Protection globale</p>
            <p className="leading-none mt-1">
              <span className="text-6xl font-bold tracking-tight">{global}</span>
              <span className="text-xl ml-1" style={{ color: "#9FE1CB" }}>/100</span>
            </p>
          </div>
          <div className="flex gap-6 sm:gap-8">
            {(["urgent", "optimiser", "ok"] as const).map((n) => (
              <div key={n}>
                <p className="text-3xl font-bold leading-none">{compte(n)}</p>
                <p className="mt-1.5 flex items-center gap-1.5 text-xs" style={{ color: "#CFEFE3" }}>
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: NIVEAU[n].bar }} />
                  {NIVEAU[n].label}
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* Bande : un segment par domaine, classé du plus urgent au plus solide */}
        <div className="mt-6 flex gap-1.5" role="img" aria-label={`${compte("urgent")} domaines urgents, ${compte("optimiser")} à optimiser, ${compte("ok")} en ordre`}>
          {lignes.map((l) => (
            <span key={l.key} title={`${l.titre} : ${NIVEAU[l.niveau].label}`} className="h-2.5 flex-1 rounded-full" style={{ backgroundColor: NIVEAU[l.niveau].bar }} />
          ))}
        </div>
      </div>

      {/* Priorité */}
      {prioriteUrgente && (
        <Link
          href={`/resultats/${priorite.key}`}
          className="group mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl bg-white p-5 transition-shadow hover:shadow-md"
          style={{ border: "1px solid #EEECE6", borderLeft: `5px solid ${NIVEAU[priorite.niveau].bar}` }}
        >
          <div className="min-w-0">
            <p className="text-sm" style={{ color: "#6B6B67" }}>À traiter en premier</p>
            <p className="font-bold text-lg" style={{ color: "#2C2C2A" }}>{priorite.titre}</p>
            <p className="text-sm mt-0.5 line-clamp-2" style={{ color: "#4B4B47" }}>{priorite.message}</p>
          </div>
          <span className="shrink-0 inline-flex items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-bold text-white" style={{ backgroundColor: "#15805F" }}>
            Voir le plan <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>
      )}

      {/* Domaines */}
      <ul className="mt-3 overflow-hidden rounded-2xl bg-white" style={{ border: "1px solid #EEECE6" }}>
        {lignes.map((l, i) => {
          const N = NIVEAU[l.niveau];
          const Icone = ICONES[l.key] ?? ShieldCheck;
          return (
            <li key={l.key} style={i > 0 ? { borderTop: "1px solid #F1EFE8" } : undefined}>
              <Link href={`/resultats/${l.key}`} className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-[#FAF9F5]">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: N.bg, color: N.fg }}>
                  <Icone size={20} strokeWidth={2} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold" style={{ color: "#2C2C2A" }}>{l.titre}</span>
                  <span className="mt-1.5 flex items-center gap-3">
                    <span className="h-1.5 w-24 sm:w-32 overflow-hidden rounded-full" style={{ backgroundColor: "#EEECE6" }}>
                      <span className="block h-full rounded-full" style={{ width: `${Math.max(6, Math.min(100, l.score))}%`, backgroundColor: N.bar }} />
                    </span>
                    <span className="text-xs font-semibold rounded-full px-2.5 py-0.5" style={{ backgroundColor: N.bg, color: N.fg }}>{N.label}</span>
                  </span>
                </span>
                <ChevronRight size={18} className="shrink-0 transition-transform group-hover:translate-x-0.5" style={{ color: "#A8A6A0" }} />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
