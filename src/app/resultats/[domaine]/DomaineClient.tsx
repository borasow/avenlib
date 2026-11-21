"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronRight, Lightbulb, Info, ShieldCheck, ExternalLink } from "lucide-react";
import { calculerScores, DiagnosticAnswers, ScoreDomaine, fourchettePension } from "@/lib/scoring";
import { Partenaire, getPartenaires } from "@/lib/partenaires";
import { slugify, PARTENAIRES_AVEC_ACCORD } from "@/lib/partenaires-utils";
import { ICONES, NIVEAU } from "@/components/domaineUi";

const AUTRES = [
  { slug: "retraite", label: "Retraite" },
  { slug: "prevoyance", label: "Prévoyance" },
  { slug: "sante", label: "Santé" },
  { slug: "fiscalite", label: "Fiscalité" },
  { slug: "deces", label: "Décès et invalidité" },
  { slug: "banque_pro", label: "Banque pro" },
  { slug: "assurance_pro", label: "RC Pro" },
  { slug: "epargne", label: "Épargne" },
  { slug: "credit", label: "Crédit immo" },
  { slug: "portage_salarial", label: "Portage salarial" },
];

function PartenaireCard({ p, domaine, onTrack, premier }: { p: Partenaire; domaine: string; onTrack: () => void; premier: boolean }) {
  const [imgError, setImgError] = useState(false);
  const interne = PARTENAIRES_AVEC_ACCORD.has(slugify(p.nom));
  const cta = "inline-flex w-full sm:w-auto items-center justify-center gap-1.5 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90";
  return (
    <li
      className="rounded-2xl bg-white p-5 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5"
      style={{ border: premier ? "2px solid #15805F" : "1px solid #EEECE6" }}
    >
      <div className="flex h-16 w-full sm:w-40 shrink-0 items-center justify-center rounded-xl px-4" style={{ backgroundColor: "#FAF9F5" }}>
        {p.logo && !imgError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.logo} alt={p.nom} className="max-h-10 max-w-full object-contain" onError={() => setImgError(true)} />
        ) : (
          <span className="font-bold" style={{ color: "#2C2C2A" }}>{p.nom}</span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-bold" style={{ color: "#2C2C2A" }}>{p.nom}</span>
          {p.tag && (
            <span className="rounded-full px-2.5 py-0.5 text-xs font-semibold" style={{ backgroundColor: "#E1F5EE", color: "#0F5C46" }}>{p.tag}</span>
          )}
          {p.tarif && (
            <span className="rounded-full px-2.5 py-0.5 text-xs font-semibold" style={{ backgroundColor: "#F1EFE8", color: "#4B4B47" }}>{p.tarif} *</span>
          )}
        </div>
        <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "#4B4B47" }}>{p.description}</p>
      </div>

      {interne ? (
        <Link href={`/partenaires/${slugify(p.nom)}?domaine=${domaine}`} onClick={onTrack} className={cta} style={{ backgroundColor: "#15805F" }}>
          Être recontacté <ArrowRight size={15} />
        </Link>
      ) : (
        <a href={p.url} target="_blank" rel="noopener noreferrer" onClick={onTrack} className={cta} style={{ backgroundColor: "#15805F" }}>
          Voir l&apos;offre <ExternalLink size={14} />
        </a>
      )}
    </li>
  );
}

interface Props {
  domaine: string;
  partenaires: Partenaire[];
  meta: { titre: string; description: string; conseil: string };
}

export default function DomaineClient({ domaine, partenaires, meta }: Props) {
  const [score, setScore] = useState<ScoreDomaine | null>(null);
  const [profile, setProfile] = useState<{ prenom: string; answers: DiagnosticAnswers } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("avenlib_profile");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setProfile(parsed);
        const scores = calculerScores(parsed.answers);
        setScore(scores[domaine] || null);
      } catch {}
    }
  }, [domaine]);

  const displayedPartenaires = profile ? getPartenaires(domaine, profile.answers) : partenaires;
  const N = score ? NIVEAU[score.niveau] : null;
  const Icone = ICONES[domaine] ?? ShieldCheck;

  async function handlePartenaireClick(partenaire: Partenaire) {
    const stored = localStorage.getItem("avenlib_profile");
    if (stored) {
      try {
        const { answers } = JSON.parse(stored);
        await fetch("/api/track-click", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: answers.email, domaine, partenaire: partenaire.nom }),
        });
      } catch {}
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAFAFA" }}>
      <div className="max-w-3xl mx-auto px-6 py-10 sm:py-12">
        <Link href="/resultats" className="mb-6 inline-flex items-center gap-2 text-sm font-medium hover:underline" style={{ color: "#6B6B67" }}>
          <ArrowLeft size={16} /> Retour au bilan
        </Link>

        {/* En-tête : domaine, statut et jauge réunis */}
        <header className="rounded-3xl bg-white p-6 sm:p-7" style={{ border: "1px solid #EEECE6" }}>
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl" style={{ backgroundColor: N?.bg ?? "#E1F5EE", color: N?.fg ?? "#0F6B50" }}>
              <Icone size={24} />
            </span>
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold leading-tight" style={{ color: "#2C2C2A" }}>{meta.titre}</h1>
              {score && N && (
                <div className="mt-3 flex items-center gap-3">
                  <span className="rounded-full px-3 py-1 text-sm font-semibold" style={{ backgroundColor: N.bg, color: N.fg }}>{N.label}</span>
                  <span className="h-2 w-28 sm:w-40 overflow-hidden rounded-full" style={{ backgroundColor: "#EEECE6" }}>
                    <span className="block h-full rounded-full" style={{ width: `${Math.max(6, Math.min(100, score.score))}%`, backgroundColor: N.bar }} />
                  </span>
                </div>
              )}
            </div>
          </div>
          {score && <p className="mt-5 text-base leading-relaxed" style={{ color: "#2C2C2A" }}>{score.message}</p>}
        </header>

        {/* Pension estimée (retraite uniquement) */}
        {domaine === "retraite" && score?.pensionEstimee && (
          <section className="mt-4 rounded-2xl p-6 text-white" style={{ backgroundColor: "#1F4A3F" }}>
            <p className="text-sm" style={{ color: "#9FE1CB" }}>Ta pension estimée</p>
            <p className="mt-1 flex flex-wrap items-baseline gap-x-2">
              <span className="text-4xl font-bold tracking-tight">{fourchettePension(score.pensionEstimee)}</span>
              <span className="text-sm" style={{ color: "#CFEFE3" }}>par mois à la retraite</span>
            </p>
            <p className="mt-3 text-xs leading-relaxed" style={{ color: "#CFEFE3" }}>
              Estimation indicative, basée sur ton statut et tes revenus. Pour un calcul précis, connecte-toi sur{" "}
              <a href="https://www.info-retraite.fr" target="_blank" rel="noopener noreferrer" className="underline">info-retraite.fr</a>.
            </p>
          </section>
        )}

        {/* Pourquoi + recommandation, côte à côte */}
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <section className="rounded-2xl bg-white p-6" style={{ border: "1px solid #EEECE6" }}>
            <div className="mb-3 flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ backgroundColor: "#F1EFE8", color: "#4B4B47" }}><Info size={18} /></span>
              <h2 className="font-bold" style={{ color: "#2C2C2A" }}>Pourquoi c&apos;est important</h2>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "#4B4B47" }}>{meta.description}</p>
          </section>
          <section className="rounded-2xl p-6" style={{ backgroundColor: "#E8F6F0" }}>
            <div className="mb-3 flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white" style={{ color: "#15805F" }}><Lightbulb size={18} /></span>
              <h2 className="font-bold" style={{ color: "#0F4A3A" }}>Notre recommandation</h2>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "#0F4A3A" }}>{meta.conseil}</p>
          </section>
        </div>

        {/* Partenaires */}
        <h2 className="mt-10 mb-1 text-xl font-bold" style={{ color: "#2C2C2A" }}>Les bons partenaires pour toi</h2>
        <p className="mb-4 text-sm" style={{ color: "#6B6B67" }}>
          Sélectionnés selon ton profil. Avenlib peut être rémunéré par un partenaire si tu donnes suite, sans changer ton prix.{" "}
          <Link href="/qui-sommes-nous" className="underline">En savoir plus</Link>
        </p>
        {displayedPartenaires.length === 0 && (
          <p className="text-sm" style={{ color: "#6B6B67" }}>Partenaires en cours de sélection, reviens bientôt.</p>
        )}
        <ul className="space-y-3">
          {displayedPartenaires.map((p, i) => (
            <PartenaireCard key={p.nom} p={p} domaine={domaine} premier={i === 0 && displayedPartenaires.length > 1} onTrack={() => handlePartenaireClick(p)} />
          ))}
        </ul>
        {displayedPartenaires.some((p) => p.tarif) && (
          <p className="mt-3 text-xs" style={{ color: "#8A8A85" }}>* Tarifs indicatifs, ils peuvent varier selon ton profil.</p>
        )}

        {/* Autres domaines */}
        <nav className="mt-12" aria-label="Autres domaines">
          <p className="mb-3 font-bold" style={{ color: "#2C2C2A" }}>Explorer un autre domaine</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {AUTRES.filter((d) => d.slug !== domaine).map((d) => {
              const I = ICONES[d.slug] ?? ShieldCheck;
              return (
                <li key={d.slug}>
                  <Link href={`/resultats/${d.slug}`} className="group flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-sm font-semibold transition-colors hover:bg-[#FAF9F5]" style={{ border: "1px solid #EEECE6", color: "#2C2C2A" }}>
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: "#EEF6F2", color: "#15805F" }}><I size={17} /></span>
                    <span className="flex-1">{d.label}</span>
                    <ChevronRight size={16} style={{ color: "#A8A6A0" }} className="transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
