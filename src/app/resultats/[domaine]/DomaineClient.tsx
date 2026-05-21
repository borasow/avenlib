"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Lightbulb, Info } from "lucide-react";
import { calculerScores, DiagnosticAnswers, ScoreDomaine } from "@/lib/scoring";
import { Partenaire, getPartenaires } from "@/lib/partenaires";
import { slugify } from "@/lib/partenaires-utils";

function PartenaireCard({ p, domaine, onTrack }: { p: Partenaire; domaine: string; onTrack: () => void }) {
  const [imgError, setImgError] = useState(false);
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5 flex items-start justify-between gap-4">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          {p.logo && !imgError ? (
            <div style={{ width: "180px", height: "72px", backgroundColor: "#fff", border: "1px solid #F0F0F0", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", padding: "8px 16px" }}>
              <img
                src={p.logo}
                alt={p.nom}
                style={{ maxHeight: "62px", maxWidth: "100%", objectFit: "contain" }}
                onError={() => setImgError(true)}
              />
            </div>
          ) : (
            <span className="font-semibold" style={{ color: "#2C2C2A" }}>{p.nom}</span>
          )}
          {p.tag && (
            <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: "#EFF9F5", color: "#085041" }}>
              {p.tag}
            </span>
          )}
        </div>
        {p.tarif && (
          <p style={{ fontSize: "12px", color: "#1D9E75", fontWeight: 500, marginBottom: "2px" }}>{p.tarif} *</p>
        )}
        <p className="text-sm text-secondary leading-relaxed">{p.description}</p>
      </div>
      <Link
        href={`/partenaires/${slugify(p.nom)}?domaine=${domaine}`}
        onClick={onTrack}
        className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-btn text-sm font-semibold text-white transition-opacity hover:opacity-90"
        style={{ backgroundColor: "#1D9E75" }}
      >
        Être recontacté <ArrowRight size={14} />
      </Link>
    </div>
  );
}

interface Props {
  domaine: string;
  partenaires: Partenaire[];
  meta: { titre: string; description: string; conseil: string };
}

function getNiveauColor(niveau?: ScoreDomaine["niveau"]) {
  if (niveau === "urgent") return { bg: "#FFF1F1", border: "#FECACA", text: "#DC2626", badge: "🔴 Urgent" };
  if (niveau === "optimiser") return { bg: "#FFFBEB", border: "#FDE68A", text: "#D97706", badge: "🟡 À optimiser" };
  return { bg: "#EFF9F5", border: "#A7F3D0", text: "#059669", badge: "🟢 OK" };
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

  const colors = getNiveauColor(score?.niveau);

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
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Link
          href="/resultats"
          className="flex items-center gap-2 text-sm text-secondary hover:text-secondary mb-8 transition-colors"
        >
          <ArrowLeft size={16} /> Retour au bilan
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-3" style={{ color: "#2C2C2A" }}>
            {meta.titre}
          </h1>
          {score && (
            <div className="flex items-center gap-3 flex-wrap">
              <span
                className="text-sm px-3 py-1 rounded-full font-medium border"
                style={{ backgroundColor: colors.bg, borderColor: colors.border, color: colors.text }}
              >
                {colors.badge}
              </span>
            </div>
          )}
        </div>

        {/* Score bar */}
        {score && (
          <div
            className="rounded-xl p-5 mb-6 border"
            style={{ backgroundColor: colors.bg, borderColor: colors.border }}
          >
            <p className="text-sm font-medium" style={{ color: colors.text }}>
              {score.message}
            </p>
          </div>
        )}

        {/* Pension estimée (retraite uniquement) */}
        {domaine === "retraite" && score?.pensionEstimee && (
          <div
            className="rounded-xl p-6 mb-6 border"
            style={{ backgroundColor: "#FFFFFF", borderColor: "#D3D1C7" }}
          >
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#1D9E75" }}>
              Ta pension estimée
            </p>
            <div className="flex items-end gap-2 mb-1">
              <span className="text-4xl font-bold" style={{ color: "#2C2C2A" }}>
                ~{score.pensionEstimee} €
              </span>
              <span className="text-sm mb-1" style={{ color: "#6B6B67" }}>/mois à la retraite</span>
            </div>
            <p className="text-xs mt-3 leading-relaxed" style={{ color: "#9B9B97" }}>
              Estimation indicative basée sur votre statut et vos revenus déclarés. Pour un calcul précis,{" "}
              <a
                href="https://www.info-retraite.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-70 transition-opacity"
                style={{ color: "#6B6B67" }}
              >
                connectez-vous sur info-retraite.fr
              </a>
            </p>
          </div>
        )}

        {/* Explication */}
        <div className="bg-white border border-gray-100 rounded-xl p-6 mb-6">
          <div className="flex items-start gap-3 mb-3">
            <Info size={20} style={{ color: "#1D9E75", flexShrink: 0, marginTop: 2 }} />
            <div>
              <h2 className="font-semibold mb-2" style={{ color: "#2C2C2A" }}>
                Pourquoi c'est important
              </h2>
              <p className="text-secondary text-sm leading-relaxed">{meta.description}</p>
            </div>
          </div>
        </div>

        {/* Conseil */}
        <div
          className="rounded-xl p-6 mb-8"
          style={{ backgroundColor: "#EFF9F5" }}
        >
          <div className="flex items-start gap-3">
            <Lightbulb size={20} style={{ color: "#1D9E75", flexShrink: 0, marginTop: 2 }} />
            <div>
              <h2 className="font-semibold mb-2" style={{ color: "#085041" }}>
                Notre recommandation
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: "#085041" }}>
                {meta.conseil}
              </p>
            </div>
          </div>
        </div>

        {/* Partenaires */}
        <h2 className="text-xl font-bold mb-4" style={{ color: "#2C2C2A" }}>
          Les bons partenaires pour toi
        </h2>
        <div className="space-y-4 mb-2">
          {displayedPartenaires.length === 0 && (
            <p className="text-sm text-secondary">Partenaires en cours de sélection, revenez bientôt.</p>
          )}
          {displayedPartenaires.map((p) => (
            <PartenaireCard key={p.nom} p={p} domaine={domaine} onTrack={() => handlePartenaireClick(p)} />
          ))}
        </div>
        {displayedPartenaires.some((p) => p.tarif) && (
          <p className="mb-10" style={{ fontSize: "11px", color: "#9B9B97" }}>
            * Tarifs indicatifs, peuvent varier selon profil
          </p>
        )}

        {/* Navigation entre domaines */}
        <div
          className="rounded-xl p-5 border"
          style={{ backgroundColor: "#F9FAFB", borderColor: "#E5E7EB" }}
        >
          <p className="text-sm font-medium mb-3" style={{ color: "#2C2C2A" }}>
            Explorer les autres domaines
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { slug: "retraite",     label: "Retraite" },
              { slug: "prevoyance",   label: "Prévoyance" },
              { slug: "sante",        label: "Santé" },
              { slug: "fiscalite",    label: "Fiscalité" },
              { slug: "deces",        label: "Décès/Invalidité" },
              { slug: "banque_pro",   label: "Banque pro" },
              { slug: "assurance_pro", label: "RC Pro" },
              { slug: "epargne",      label: "Épargne" },
              { slug: "credit",           label: "Crédit immo" },
              { slug: "portage_salarial", label: "Portage salarial" },
            ]
              .filter((d) => d.slug !== domaine)
              .map((d) => (
                <Link
                  key={d.slug}
                  href={`/resultats/${d.slug}`}
                  className="text-sm px-3 py-1.5 rounded-full border border-gray-200 hover:border-gray-300 transition-colors"
                  style={{ color: "#2C2C2A" }}
                >
                  {d.label}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
