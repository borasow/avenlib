"use client";
import { useState } from "react";
import { Download, Lock } from "lucide-react";

const ADMIN_SECRET = "avenlib-admin-2024";

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === ADMIN_SECRET) {
      setAuthed(true);
      setError("");
    } else {
      setError("Mot de passe incorrect");
    }
  }

  function handleExport() {
    window.open(`/api/export?secret=${ADMIN_SECRET}`, "_blank");
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F1EFE8" }}>
        <div className="bg-white rounded-2xl p-10 w-full max-w-sm border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <Lock size={20} style={{ color: "#1D9E75" }} />
            <h1 className="text-xl font-bold" style={{ color: "#2C2C2A" }}>Espace admin</h1>
          </div>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-500"
              style={{ color: "#2C2C2A" }}
            />
            {error && <p className="text-xs text-red-500">{error}</p>}
            <button
              type="submit"
              className="py-3 rounded-xl text-white font-semibold text-sm"
              style={{ backgroundColor: "#1D9E75" }}
            >
              Accéder
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F1EFE8" }}>
      <div className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="text-2xl font-bold mb-2" style={{ color: "#2C2C2A" }}>Espace admin</h1>
        <p className="text-sm mb-10" style={{ color: "#6B6B67" }}>Gestion des inscriptions Avenlib</p>

        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          <h2 className="font-semibold mb-2" style={{ color: "#2C2C2A" }}>Exporter les inscriptions</h2>
          <p className="text-sm mb-6" style={{ color: "#6B6B67" }}>
            Télécharge un fichier CSV avec toutes les inscriptions, à ouvrir dans Excel ou Google Sheets.
          </p>
          <button
            onClick={handleExport}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#1D9E75" }}
          >
            <Download size={16} />
            Télécharger le CSV
          </button>
        </div>
      </div>
    </div>
  );
}
