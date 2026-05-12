"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function ConnexionClient() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (authError) {
        if (authError.message === "Invalid login credentials") {
          setError("Email ou mot de passe incorrect.");
        } else {
          setError(authError.message);
        }
        return;
      }
      router.push("/compte");
      router.refresh();
    } catch {
      setError("Une erreur est survenue. Réessaie.");
    } finally {
      setLoading(false);
    }
  }

  async function handleForgotPassword() {
    if (!email.trim()) {
      setError("Saisis ton email ci-dessus pour recevoir le lien de réinitialisation.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const supabase = createClient();
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/compte`,
      });
      if (resetError) throw resetError;
      setError("__SUCCESS__");
    } catch {
      setError("Impossible d'envoyer l'email de réinitialisation. Réessaie.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16" style={{ backgroundColor: "#FAFAFA" }}>
      <div className="w-full max-w-md">

        {/* Formulaire de connexion */}
        <div className="bg-white border border-gray-100 rounded-2xl p-8 mb-4">
          <h1 className="text-2xl font-bold mb-1" style={{ color: "#2C2C2A" }}>
            Connexion
          </h1>
          <p className="text-sm mb-8" style={{ color: "#6B6B67" }}>
            Accède à ton bilan et tes recommandations.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: "#2C2C2A" }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                placeholder="marie@exemple.fr"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-400 transition-colors"
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: "#2C2C2A" }}>
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  placeholder="Ton mot de passe"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-11 text-sm focus:outline-none focus:border-gray-400 transition-colors"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-60"
                  style={{ color: "#9B9B97" }}
                  tabIndex={-1}
                  aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Messages d'erreur / succès */}
            {error === "__SUCCESS__" ? (
              <div className="rounded-lg px-4 py-3 text-sm" style={{ backgroundColor: "#EFF9F5", border: "1px solid #A7F3D0" }}>
                <p style={{ color: "#059669", fontWeight: 600 }}>Email envoyé !</p>
                <p style={{ color: "#065F46", marginTop: "2px" }}>Vérifie ta boîte mail pour réinitialiser ton mot de passe.</p>
              </div>
            ) : error ? (
              <p className="text-sm" style={{ color: "#DC2626" }}>{error}</p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-semibold transition-opacity hover:opacity-90 disabled:opacity-60"
              style={{ backgroundColor: "#1D9E75" }}
            >
              {loading ? "Connexion..." : <>Se connecter <ArrowRight size={18} /></>}
            </button>
          </form>

          <button
            type="button"
            onClick={handleForgotPassword}
            disabled={loading}
            className="mt-4 text-sm underline transition-opacity hover:opacity-70 disabled:opacity-40"
            style={{ color: "#6B6B67" }}
          >
            Mot de passe oublié ?
          </button>
        </div>

        {/* Bloc "Pas encore de compte ?" */}
        <div
          className="rounded-2xl p-6 text-center"
          style={{ backgroundColor: "#F1EFE8", border: "0.5px solid #D3D1C7" }}
        >
          <p className="font-semibold mb-1" style={{ color: "#2C2C2A", fontSize: "15px" }}>
            Pas encore de compte ?
          </p>
          <p className="text-sm mb-5" style={{ color: "#6B6B67", lineHeight: "1.6" }}>
            Faites votre bilan gratuit en 13 questions et créez votre compte à la fin.
          </p>
          <Link
            href="/diagnostic"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#1D9E75" }}
          >
            Faire mon bilan <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </div>
  );
}
