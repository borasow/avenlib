"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { calculerScores, DiagnosticAnswers } from "@/lib/scoring";
import { ArrowRight, User, RefreshCw, BarChart2 } from "lucide-react";

const LABELS: Record<string, string> = {
  statut: "Statut juridique",
  secteur: "Secteur",
  anciennete: "Ancienneté",
  revenus: "Revenus annuels",
  situation_familiale: "Situation familiale",
  age: "Âge",
  prevoyance_niveau: "Niveau de prévoyance",
  connaissance: "Connaissance finances",
};

const NIVEAU_ORDER: Record<string, number> = { urgent: 0, optimiser: 1, ok: 2 };

function getBadge(score: number) {
  if (score < 40)  return <span style={{ fontSize: "18px", lineHeight: 1 }}>🔴</span>;
  if (score <= 70) return <span style={{ fontSize: "18px", lineHeight: 1 }}>🟡</span>;
  return               <span style={{ fontSize: "18px", lineHeight: 1 }}>🟢</span>;
}

export default function CompteClient() {
  const [profile, setProfile] = useState<{ prenom: string; answers: DiagnosticAnswers } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("avenlib_profile");
    if (stored) {
      try {
        setProfile(JSON.parse(stored));
      } catch {}
    }
  }, []);

  function handleReset() {
    router.push("/diagnostic");
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
          style={{ backgroundColor: "#EFF9F5" }}
        >
          <User size={28} style={{ color: "#1D9E75" }} />
        </div>
        <h2 className="text-2xl font-bold mb-3" style={{ color: "#2C2C2A" }}>
          Aucun profil trouvé
        </h2>
        <p className="text-secondary mb-8 max-w-sm">
          Fais ton bilan pour créer ton profil et accéder à ton tableau de bord.
        </p>
        <Link
          href="/diagnostic"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-btn text-white font-semibold"
          style={{ backgroundColor: "#1D9E75" }}
        >
          Faire mon bilan <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  const scores = calculerScores(profile.answers);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAFAFA" }}>
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold mb-1" style={{ color: "#2C2C2A" }}>
              Bonjour {profile.prenom.charAt(0).toUpperCase() + profile.prenom.slice(1)}
            </h1>
            <p className="text-secondary text-sm">Voici ton espace personnel Avenlib</p>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 text-sm text-secondary hover:text-secondary transition-colors border border-gray-200 rounded-btn px-3 py-2"
          >
            <RefreshCw size={14} /> Mettre à jour mon bilan
          </button>
        </div>

        {/* Résumé scores */}
        <div className="bg-white border border-gray-100 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-1">
            <BarChart2 size={20} style={{ color: "#1D9E75" }} />
            <h2 className="font-semibold" style={{ color: "#2C2C2A" }}>
              Ton tableau de bord
            </h2>
          </div>
          <p style={{ fontSize: "12px", color: "#6B6B67", marginBottom: "16px" }}>
            🔴 Urgent · 🟡 À optimiser · 🟢 OK
          </p>
          <div className="space-y-3">
            {Object.entries(scores)
              .sort(([, a], [, b]) => {
                const diff = NIVEAU_ORDER[a.niveau] - NIVEAU_ORDER[b.niveau];
                return diff !== 0 ? diff : a.score - b.score;
              })
              .map(([key, score]) => (
              <Link
                key={key}
                href={`/resultats/${key}`}
                className="flex items-center justify-between py-2 hover:opacity-80 transition-opacity group"
              >
                <span className="text-sm" style={{ color: "#2C2C2A" }}>
                  {score.titre}
                </span>
                <div className="flex items-center gap-3">
                  {getBadge(score.score)}
                  <span className="group-hover:underline" style={{ color: "#2C2C2A", fontSize: "13px", fontWeight: 700 }}>En savoir plus →</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <Link
              href="/resultats"
              className="flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-80"
              style={{ color: "#1D9E75" }}
            >
              Voir le bilan complet <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Profil */}
        <div className="bg-white border border-gray-100 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <User size={20} style={{ color: "#1D9E75" }} />
            <h2 className="font-semibold" style={{ color: "#2C2C2A" }}>
              Mon profil
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(LABELS).map(([key, label]) => {
              const val = profile.answers[key as keyof DiagnosticAnswers];
              if (!val) return null;
              return (
                <div key={key}>
                  <p className="text-xs text-secondary mb-0.5">{label}</p>
                  <p className="text-sm font-medium" style={{ color: "#2C2C2A" }}>
                    {Array.isArray(val) ? val.join(", ") : val}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ce qui est en place */}
        {profile.answers.existant && profile.answers.existant.length > 0 && (
          <div className="bg-white border border-gray-100 rounded-xl p-6 mb-6">
            <h2 className="font-semibold mb-3" style={{ color: "#2C2C2A" }}>
              Déjà en place
            </h2>
            <div className="flex flex-wrap gap-2">
              {profile.answers.existant.map((item) => (
                <span
                  key={item}
                  className="text-xs px-3 py-1.5 rounded-full border border-gray-200"
                  style={{ color: "#2C2C2A" }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Objectifs */}
        {profile.answers.objectifs && profile.answers.objectifs.length > 0 && (
          <div className="bg-white border border-gray-100 rounded-xl p-6">
            <h2 className="font-semibold mb-3" style={{ color: "#2C2C2A" }}>
              Mes objectifs
            </h2>
            <div className="flex flex-wrap gap-2">
              {profile.answers.objectifs.map((obj) => (
                <span
                  key={obj}
                  className="text-xs px-3 py-1.5 rounded-full"
                  style={{ backgroundColor: "#EFF9F5", color: "#085041" }}
                >
                  {obj}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
