"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { calculerScores, DiagnosticAnswers, ScoreDomaine } from "@/lib/scoring";
import { PARTENAIRES, DOMAINE_META } from "@/lib/partenaires";
import {
  ArrowRight, TrendingUp, Shield, Heart, Calculator, AlertTriangle,
  ChevronDown, ExternalLink, Smile, Building2, ShieldCheck, PiggyBank,
  Landmark, GraduationCap, Home,
} from "lucide-react";

const DOMAINE_CONFIG: Record<string, { label: string; icon: React.ElementType }> = {
  retraite:      { label: "Retraite",                   icon: TrendingUp },
  prevoyance:    { label: "Prévoyance arrêt maladie",   icon: Shield },
  sante:         { label: "Mutuelle santé",              icon: Heart },
  fiscalite:     { label: "Optimisation fiscale",        icon: Calculator },
  deces:         { label: "Prévoyance décès/invalidité", icon: AlertTriangle },
  banque_pro:    { label: "Banque professionnelle",      icon: Building2 },
  assurance_pro: { label: "Assurance RC Pro",            icon: ShieldCheck },
  epargne:       { label: "Épargne & investissement",    icon: PiggyBank },
  credit:        { label: "Crédit immobilier",           icon: Landmark },
};

// Supplementary categories (no score, always shown)
const EXTRAS: { key: string; icon: React.ElementType }[] = [
  { key: "immobilier", icon: Home },
  { key: "formation",  icon: GraduationCap },
];

function getNiveauColor(niveau: ScoreDomaine["niveau"]) {
  if (niveau === "urgent")    return { bg: "#FFF1F1", border: "#FECACA", text: "#DC2626", badge: "🔴 Urgent" };
  if (niveau === "optimiser") return { bg: "#FFFBEB", border: "#FDE68A", text: "#D97706", badge: "🟡 À optimiser" };
  return                             { bg: "#EFF9F5", border: "#A7F3D0", text: "#059669", badge: "🟢 OK" };
}

async function trackClick(domaine: string, partenaire: string) {
  try {
    const stored = localStorage.getItem("avenlib_profile");
    if (!stored) return;
    const { answers } = JSON.parse(stored);
    await fetch("/api/track-click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: answers.email, domaine, partenaire }),
    });
  } catch {}
}

function PartenaireItem({ p, domaine }: { p: { nom: string; description: string; url: string; tag?: string }; domaine: string }) {
  return (
    <div
      className="flex items-center justify-between gap-3 rounded-lg px-4 py-3"
      style={{ backgroundColor: "rgba(255,255,255,0.85)", border: "0.5px solid rgba(0,0,0,0.06)" }}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
          <span className="text-sm font-semibold" style={{ color: "#2C2C2A" }}>{p.nom}</span>
          {p.tag && (
            <span className="text-xs px-1.5 py-0.5 rounded-full font-medium" style={{ backgroundColor: "#EFF9F5", color: "#085041" }}>
              {p.tag}
            </span>
          )}
        </div>
        <p className="text-xs leading-relaxed" style={{ color: "#6B6B67" }}>{p.description}</p>
      </div>
      <a
        href={p.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackClick(domaine, p.nom)}
        className="shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-white transition-opacity hover:opacity-90"
        style={{ backgroundColor: "#1D9E75" }}
      >
        Voir l'offre <ExternalLink size={12} />
      </a>
    </div>
  );
}

export default function ResultatsClient() {
  const [profile, setProfile] = useState<{ prenom: string; answers: DiagnosticAnswers } | null>(null);
  const [openDomaine, setOpenDomaine] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("avenlib_profile");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setProfile(parsed);
        const scores = calculerScores(parsed.answers);
        const lowestKey = Object.keys(scores).reduce((a, b) =>
          scores[a].score < scores[b].score ? a : b
        );
        setOpenDomaine(lowestKey);
      } catch {}
    }
  }, []);

  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <h2 className="text-2xl font-bold mb-4" style={{ color: "#2C2C2A" }}>Aucun diagnostic trouvé</h2>
        <p className="text-secondary mb-8">Tu dois d'abord faire ton diagnostic pour voir tes résultats.</p>
        <Link href="/diagnostic" className="inline-flex items-center gap-2 px-6 py-3 rounded-btn text-white font-semibold" style={{ backgroundColor: "#1D9E75" }}>
          Faire mon diagnostic <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  const scores = calculerScores(profile.answers);
  const scoreKeys = Object.keys(scores);
  const urgentCount = scoreKeys.filter((k) => scores[k].niveau === "urgent").length;
  const ressenti = profile.answers.ressenti ?? "";
  const isTresInquiet = ressenti === "Très inquiet, j'ai besoin d'aide rapidement";
  const isSerein = ressenti === "Serein, j'ai tout en place";

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAFAFA" }}>
      <div className="max-w-3xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: "#2C2C2A" }}>
            Bonjour {profile.prenom}, voici ton diagnostic
          </h1>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm px-3 py-1 rounded-full font-medium" style={{ backgroundColor: "#EFF9F5", color: "#085041" }}>
              {profile.answers.statut}
            </span>
            <span className="text-sm px-3 py-1 rounded-full font-medium" style={{ backgroundColor: "#F3F4F6", color: "#6B7280" }}>
              {profile.answers.revenus}/an
            </span>
          </div>
        </div>

        {/* Bandeau ressenti — Très inquiet */}
        {isTresInquiet && (
          <div className="rounded-xl p-4 mb-6 flex items-start gap-3" style={{ backgroundColor: "#FFF1F1", border: "1px solid #FECACA" }}>
            <AlertTriangle size={20} style={{ color: "#DC2626", flexShrink: 0, marginTop: 2 }} />
            <div>
              <p className="font-semibold text-sm mb-0.5" style={{ color: "#DC2626" }}>Tu n'es pas seul(e) dans cette situation</p>
              <p className="text-sm" style={{ color: "#991B1B" }}>
                Beaucoup d'indépendants se retrouvent dans cette position. Nos recommandations ci-dessous sont conçues pour t'aider à agir rapidement, étape par étape.
              </p>
            </div>
          </div>
        )}

        {/* Bandeau ressenti — Serein */}
        {isSerein && (
          <div className="rounded-xl p-4 mb-6 flex items-start gap-3" style={{ backgroundColor: "#EFF9F5", border: "1px solid #A7F3D0" }}>
            <Smile size={20} style={{ color: "#059669", flexShrink: 0, marginTop: 2 }} />
            <div>
              <p className="font-semibold text-sm mb-0.5" style={{ color: "#059669" }}>Bonne nouvelle : tu as déjà de bonnes bases</p>
              <p className="text-sm" style={{ color: "#065F46" }}>
                Ton diagnostic confirme que ta situation est solide. Quelques optimisations ciblées pourraient néanmoins améliorer encore ta protection et réduire ta fiscalité.
              </p>
            </div>
          </div>
        )}

        {/* Résumé alerte */}
        {urgentCount > 0 && (
          <div className="rounded-xl p-4 mb-8 flex items-start gap-3" style={{ backgroundColor: "#FFF1F1", border: "1px solid #FECACA" }}>
            <AlertTriangle size={20} style={{ color: "#DC2626", flexShrink: 0, marginTop: 2 }} />
            <div>
              <p className="font-semibold text-sm" style={{ color: "#DC2626" }}>
                {urgentCount} domaine{urgentCount > 1 ? "s" : ""} nécessite{urgentCount > 1 ? "nt" : ""} une action urgente
              </p>
              <p className="text-sm" style={{ color: "#991B1B" }}>
                Ces lacunes peuvent avoir de lourdes conséquences financières. Consulte les recommandations ci-dessous.
              </p>
            </div>
          </div>
        )}

        {/* Accordéon principal — tous les domaines scorés */}
        <div className="space-y-3 mb-6">
          {scoreKeys.map((key) => {
            const score = scores[key];
            const config = DOMAINE_CONFIG[key];
            if (!config) return null;
            const colors = getNiveauColor(score.niveau);
            const Icon = config.icon;
            const meta = DOMAINE_META[key];
            const partenaires = PARTENAIRES[key] ?? [];
            const isOpen = openDomaine === key;

            return (
              <div
                key={key}
                className="rounded-xl border overflow-hidden"
                style={{ borderColor: isOpen ? colors.border : "#D3D1C7", backgroundColor: isOpen ? colors.bg : "#FFFFFF" }}
              >
                {/* Header */}
                <button
                  className="w-full text-left px-5 py-4 flex items-center gap-4 transition-colors"
                  onClick={() => setOpenDomaine(isOpen ? null : key)}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: isOpen ? "rgba(255,255,255,0.7)" : "#F3F4F6" }}
                  >
                    <Icon size={20} style={{ color: colors.text }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm" style={{ color: "#2C2C2A" }}>{score.titre}</span>
                      <span className="text-xs font-medium">{colors.badge}</span>
                    </div>
                    {!isOpen && (
                      <p className="text-xs mt-0.5 truncate" style={{ color: "#6B6B67" }}>{score.message}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <p className="text-xl font-bold leading-none" style={{ color: colors.text }}>{score.score}</p>
                      <p className="text-xs" style={{ color: "#9B9B97" }}>/100</p>
                    </div>
                    <ChevronDown
                      size={18}
                      style={{ color: "#6B6B67", transition: "transform 0.25s ease", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }}
                    />
                  </div>
                </button>

                {/* Contenu */}
                <div style={{ maxHeight: isOpen ? "900px" : "0px", overflow: "hidden", transition: "max-height 0.3s ease" }}>
                  <div className="px-5 pb-5">
                    {/* Barre score */}
                    <div className="h-1.5 rounded-full overflow-hidden mb-5" style={{ backgroundColor: "rgba(255,255,255,0.6)" }}>
                      <div className="h-full rounded-full" style={{ width: `${score.score}%`, backgroundColor: colors.text, transition: "width 0.5s ease" }} />
                    </div>

                    {/* Pension estimée (retraite) */}
                    {key === "retraite" && score.pensionEstimee && (
                      <div className="rounded-lg px-4 py-3 mb-4 border" style={{ backgroundColor: "rgba(255,255,255,0.8)", borderColor: "rgba(0,0,0,0.06)" }}>
                        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: colors.text }}>Pension estimée</p>
                        <div className="flex items-end gap-1">
                          <span className="text-3xl font-bold" style={{ color: "#2C2C2A" }}>~{score.pensionEstimee} €</span>
                          <span className="text-sm mb-0.5" style={{ color: "#6B6B67" }}>/mois</span>
                        </div>
                        <p className="text-xs mt-2" style={{ color: "#9B9B97" }}>
                          Estimation indicative. Pour un calcul précis,{" "}
                          <a href="https://www.info-retraite.fr" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-70" style={{ color: "#6B6B67" }}>
                            connectez-vous sur info-retraite.fr
                          </a>
                        </p>
                      </div>
                    )}

                    {meta && (
                      <>
                        {/* Le problème */}
                        <div className="mb-4">
                          <p className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: colors.text }}>Le problème</p>
                          <p className="text-sm leading-relaxed" style={{ color: "#2C2C2A" }}>{meta.description}</p>
                        </div>
                        {/* Recommandation */}
                        <div className="rounded-lg px-4 py-3 mb-5" style={{ backgroundColor: "rgba(255,255,255,0.7)" }}>
                          <p className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: "#1D9E75" }}>Notre recommandation</p>
                          <p className="text-sm leading-relaxed" style={{ color: "#085041" }}>{meta.conseil}</p>
                        </div>
                      </>
                    )}

                    {/* Partenaires */}
                    {partenaires.length > 0 ? (
                      <div className="space-y-2">
                        {partenaires.slice(0, 3).map((p) => (
                          <PartenaireItem key={p.nom} p={p} domaine={key} />
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-center py-3" style={{ color: "#9B9B97" }}>
                        Partenaires en cours de sélection — revenez bientôt
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ressources complémentaires (sans score) */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <span style={{ display: "block", width: "32px", height: "2px", backgroundColor: "#D3D1C7", borderRadius: "2px" }} />
            <p style={{ fontSize: "12px", fontWeight: 700, color: "#6B6B67", letterSpacing: "0.08em", textTransform: "uppercase", margin: 0 }}>
              Ressources complémentaires
            </p>
          </div>
          <div className="space-y-3">
            {EXTRAS.map(({ key, icon: Icon }) => {
              const meta = DOMAINE_META[key];
              const partenaires = PARTENAIRES[key] ?? [];
              const isOpen = openDomaine === key;
              return (
                <div
                  key={key}
                  className="rounded-xl border overflow-hidden"
                  style={{ borderColor: isOpen ? "#D3D1C7" : "#E8E6DF", backgroundColor: isOpen ? "#F9F8F4" : "#FFFFFF" }}
                >
                  <button
                    className="w-full text-left px-5 py-4 flex items-center gap-4 transition-colors"
                    onClick={() => setOpenDomaine(isOpen ? null : key)}
                  >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: isOpen ? "#F1EFE8" : "#F3F4F6" }}>
                      <Icon size={20} style={{ color: "#6B6B67" }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="font-semibold text-sm" style={{ color: "#2C2C2A" }}>{meta.titre}</span>
                      {!isOpen && <p className="text-xs mt-0.5 truncate" style={{ color: "#6B6B67" }}>{meta.description}</p>}
                    </div>
                    <ChevronDown size={18} style={{ color: "#9B9B97", transition: "transform 0.25s ease", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }} />
                  </button>
                  <div style={{ maxHeight: isOpen ? "600px" : "0px", overflow: "hidden", transition: "max-height 0.3s ease" }}>
                    <div className="px-5 pb-5">
                      <div className="mb-4">
                        <p className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: "#6B6B67" }}>Pourquoi c'est important</p>
                        <p className="text-sm leading-relaxed" style={{ color: "#2C2C2A" }}>{meta.description}</p>
                      </div>
                      <div className="rounded-lg px-4 py-3 mb-5" style={{ backgroundColor: "#EFF9F5" }}>
                        <p className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: "#1D9E75" }}>Notre recommandation</p>
                        <p className="text-sm leading-relaxed" style={{ color: "#085041" }}>{meta.conseil}</p>
                      </div>
                      {partenaires.length > 0 ? (
                        <div className="space-y-2">
                          {partenaires.map((p) => (
                            <PartenaireItem key={p.nom} p={p} domaine={key} />
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-center py-3" style={{ color: "#9B9B97" }}>
                          Partenaires en cours de sélection — revenez bientôt
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-xl p-6 text-center" style={{ backgroundColor: "#085041" }}>
          <h3 className="text-white font-bold text-lg mb-2">Besoin d'être accompagné(e) ?</h3>
          <p className="text-white/70 text-sm mb-4">Explore chaque domaine pour découvrir les solutions adaptées à ta situation.</p>
          <Link
            href="/diagnostic"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-btn text-white font-semibold text-sm transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#1D9E75" }}
          >
            Refaire le diagnostic <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </div>
  );
}
