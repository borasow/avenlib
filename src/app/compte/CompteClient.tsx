"use client";
import { useEffect, useState } from "react";
import BilanLink from "@/components/BilanLink";
import { useRouter } from "next/navigation";
import { calculerScores, DiagnosticAnswers } from "@/lib/scoring";
import { ArrowRight, User, RefreshCw } from "lucide-react";
import TableauDeBord from "./TableauDeBord";
import ProfilCompte from "./ProfilCompte";

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
          <User size={28} style={{ color: "#15805F" }} />
        </div>
        <h2 className="text-2xl font-bold mb-3" style={{ color: "#2C2C2A" }}>
          Aucun profil trouvé
        </h2>
        <p className="text-secondary mb-8 max-w-sm">
          Fais ton bilan pour créer ton profil et accéder à ton tableau de bord.
        </p>
        <BilanLink className="inline-flex items-center gap-2 px-6 py-3 rounded-btn text-white font-semibold"
          style={{ backgroundColor: "#15805F" }} label="Faire mon bilan" icon={<ArrowRight size={18} />} />
      </div>
    );
  }

  const scores = calculerScores(profile.answers);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAFAFA" }}>
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-10">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-1" style={{ color: "#2C2C2A" }}>
              Bonjour {profile.prenom.charAt(0).toUpperCase() + profile.prenom.slice(1)}
            </h1>
            <p className="text-secondary text-sm">Voici ton espace personnel Avenlib</p>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 text-sm text-secondary hover:text-secondary transition-colors border border-gray-200 rounded-btn px-3 py-2 self-start shrink-0"
          >
            <RefreshCw size={14} /> Mettre à jour mon bilan
          </button>
        </div>

        <TableauDeBord scores={scores} />

        <ProfilCompte answers={profile.answers} />
      </div>
    </div>
  );
}
