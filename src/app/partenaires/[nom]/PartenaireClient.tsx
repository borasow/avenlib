"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Shield, CheckCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { PartenaireWithMeta } from "@/lib/partenaires-utils";

interface Props {
  partenaire: PartenaireWithMeta;
  domaine: string;
  domaineLabel: string;
}

export default function PartenaireClient({ partenaire, domaine, domaineLabel }: Props) {
  const router = useRouter();
  const supabase = createClient();

  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [rgpd, setRgpd] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [logoError, setLogoError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Pré-remplir depuis localStorage (bilan)
    const stored = localStorage.getItem("avenlib_profile");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.prenom) setPrenom(parsed.prenom);
      } catch {}
    }

    // Pré-remplir depuis la session Supabase
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUserId(user.id);
        if (user.email) setEmail(user.email);
        const meta = user.user_metadata;
        if (meta?.full_name) {
          const parts = (meta.full_name as string).split(" ");
          setPrenom(parts[0] ?? "");
          setNom(parts.slice(1).join(" ") ?? "");
        } else if (meta?.first_name) {
          setPrenom(meta.first_name as string);
          setNom((meta.last_name as string) ?? "");
        }
      }
    });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!rgpd) { setError("Veuillez accepter les conditions."); return; }
    if (!telephone.trim()) { setError("Veuillez saisir votre téléphone."); return; }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prenom, nom, email, telephone,
          partenaire_nom: partenaire.nom,
          partenaire_slug: partenaire.slug,
          domaine,
          user_id: userId,
        }),
      });

      if (!res.ok) throw new Error("Erreur");
      router.push("/partenaires/confirmation");
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer.");
      setLoading(false);
    }
  }

  const prefilled = !!email;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F1EFE8" }}>
      <div className="max-w-lg mx-auto px-6 py-12">
        <Link
          href={`/resultats/${domaine}`}
          className="inline-flex items-center gap-2 text-sm mb-8 transition-opacity hover:opacity-70"
          style={{ color: "#6B6B67" }}
        >
          <ArrowLeft size={16} /> Retour
        </Link>

        {/* Logo + titre */}
        <div className="bg-white rounded-2xl p-6 mb-6 border" style={{ borderColor: "#D3D1C7" }}>
          <div className="flex items-center gap-4 mb-4">
            {!logoError ? (
              <img
                src={partenaire.logoUrl}
                alt={partenaire.nom}
                style={{ height: "48px", maxWidth: "140px", objectFit: "contain" }}
                onError={() => setLogoError(true)}
              />
            ) : (
              <span className="text-xl font-bold" style={{ color: "#2C2C2A" }}>{partenaire.nom}</span>
            )}
          </div>
          <span
            className="inline-block text-xs px-2 py-0.5 rounded-full font-medium mb-3"
            style={{ backgroundColor: "#EFF9F5", color: "#085041" }}
          >
            {domaineLabel}
          </span>
          <p className="text-sm leading-relaxed" style={{ color: "#6B6B67" }}>
            {partenaire.description}
          </p>
          {partenaire.tarif && (
            <p className="text-xs font-medium mt-2" style={{ color: "#1D9E75" }}>
              {partenaire.tarif}
            </p>
          )}
        </div>

        {/* Formulaire */}
        <div className="bg-white rounded-2xl p-6 border" style={{ borderColor: "#D3D1C7" }}>
          <h1 className="text-xl font-bold mb-1" style={{ color: "#2C2C2A" }}>
            Être recontacté par {partenaire.nom}
          </h1>
          <p className="text-sm mb-6" style={{ color: "#6B6B67" }}>
            Un conseiller te rappelle sous 48h.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: "#6B6B67" }}>Prénom</label>
                <input
                  type="text"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  readOnly={prefilled}
                  required
                  className="w-full px-3 py-2 rounded-lg border text-sm"
                  style={{
                    borderColor: "#D3D1C7",
                    backgroundColor: prefilled ? "#F9FAFB" : "#fff",
                    color: "#2C2C2A",
                  }}
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: "#6B6B67" }}>Nom</label>
                <input
                  type="text"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  readOnly={prefilled}
                  required
                  className="w-full px-3 py-2 rounded-lg border text-sm"
                  style={{
                    borderColor: "#D3D1C7",
                    backgroundColor: prefilled ? "#F9FAFB" : "#fff",
                    color: "#2C2C2A",
                  }}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "#6B6B67" }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                readOnly={prefilled}
                required
                className="w-full px-3 py-2 rounded-lg border text-sm"
                style={{
                  borderColor: "#D3D1C7",
                  backgroundColor: prefilled ? "#F9FAFB" : "#fff",
                  color: "#2C2C2A",
                }}
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "#6B6B67" }}>
                Téléphone <span style={{ color: "#1D9E75" }}>*</span>
              </label>
              <input
                type="tel"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                placeholder="06 12 34 56 78"
                required
                className="w-full px-3 py-2 rounded-lg border text-sm"
                style={{ borderColor: "#D3D1C7", color: "#2C2C2A" }}
              />
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={rgpd}
                onChange={(e) => setRgpd(e.target.checked)}
                className="mt-0.5 shrink-0"
              />
              <span className="text-xs leading-relaxed" style={{ color: "#6B6B67" }}>
                J'accepte que mes coordonnées soient transmises à {partenaire.nom} pour être recontacté(e). Ces données ne seront utilisées qu'à cet effet.
              </span>
            </label>

            {error && (
              <p className="text-xs" style={{ color: "#DC2626" }}>{error}</p>
            )}

            <button
              type="submit"
              disabled={loading || !rgpd}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-semibold transition-opacity"
              style={{
                backgroundColor: "#1D9E75",
                opacity: loading || !rgpd ? 0.6 : 1,
                cursor: loading || !rgpd ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Envoi..." : (
                <>Je veux être recontacté <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          <div className="flex items-center gap-2 mt-5 pt-5 border-t" style={{ borderColor: "#F0F0F0" }}>
            <Shield size={14} style={{ color: "#9B9B97", flexShrink: 0 }} />
            <p className="text-xs" style={{ color: "#9B9B97" }}>
              Données chiffrées et sécurisées · Aucun spam · Désabonnement en 1 clic
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
