"use client";
import { useEffect, useState } from "react";
import { Download, ChevronDown } from "lucide-react";

const STATUT_OPTIONS = ["nouveau", "contacté", "converti", "perdu"];

const STATUT_COLORS: Record<string, { bg: string; text: string }> = {
  nouveau:   { bg: "#EFF9F5", text: "#085041" },
  contacté:  { bg: "#EFF6FF", text: "#1D4ED8" },
  converti:  { bg: "#F0FDF4", text: "#15803D" },
  perdu:     { bg: "#FFF1F1", text: "#DC2626" },
};

interface Lead {
  id: string;
  created_at: string;
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  domaine: string;
  statut: string;
  scheduled_at: string | null;
  notes: string | null;
}

const DOMAINE_LABELS: Record<string, string> = {
  retraite: "Retraite", prevoyance: "Prévoyance", sante: "Santé",
  fiscalite: "Fiscalité", deces: "Décès/Invalidité", banque_pro: "Banque pro",
  assurance_pro: "RC Pro", epargne: "Épargne", credit: "Crédit immo",
  portage_salarial: "Portage salarial",
};

export default function DashboardClient({ token }: { token: string }) {
  const [partenaireName, setPartenaireName] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/admin/leads?token=${token}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) { setError(data.error); return; }
        setPartenaireName(data.partenaire_nom);
        setLeads(data.leads);
      })
      .catch(() => setError("Erreur de chargement"))
      .finally(() => setLoading(false));
  }, [token]);

  async function updateStatut(lead_id: string, statut: string) {
    setUpdating(lead_id);
    try {
      await fetch(`/api/leads/${lead_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, statut }),
      });
      setLeads((prev) => prev.map((l) => l.id === lead_id ? { ...l, statut } : l));
    } finally {
      setUpdating(null);
    }
  }

  function exportCSV() {
    const headers = ["Date", "Prénom", "Nom", "Email", "Téléphone", "Domaine", "Statut", "Contact prévu"];
    const rows = leads.map((l) => [
      new Date(l.created_at).toLocaleDateString("fr-FR"),
      l.prenom,
      l.nom,
      l.email,
      l.telephone,
      DOMAINE_LABELS[l.domaine] ?? l.domaine,
      l.statut,
      l.scheduled_at ? new Date(l.scheduled_at).toLocaleDateString("fr-FR") : "",
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${partenaireName.toLowerCase().replace(/\s+/g, "-")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F1EFE8" }}>
        <p style={{ color: "#6B6B67" }}>Chargement...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F1EFE8" }}>
        <div className="bg-white rounded-2xl p-10 max-w-sm w-full text-center border" style={{ borderColor: "#D3D1C7" }}>
          <p className="text-sm" style={{ color: "#DC2626" }}>{error}</p>
          <p className="text-xs mt-2" style={{ color: "#9B9B97" }}>Vérifiez que le lien est correct.</p>
        </div>
      </div>
    );
  }

  const stats = {
    total: leads.length,
    nouveau: leads.filter((l) => l.statut === "nouveau").length,
    converti: leads.filter((l) => l.statut === "converti").length,
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F1EFE8" }}>
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "#2C2C2A" }}>
              Leads — {partenaireName}
            </h1>
            <p className="text-sm mt-1" style={{ color: "#6B6B67" }}>
              {stats.total} lead{stats.total > 1 ? "s" : ""} au total · {stats.converti} converti{stats.converti > 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
            style={{ backgroundColor: "#1D9E75" }}
          >
            <Download size={14} /> Exporter CSV
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total", value: stats.total, color: "#2C2C2A" },
            { label: "Nouveaux", value: stats.nouveau, color: "#D97706" },
            { label: "Convertis", value: stats.converti, color: "#1D9E75" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl p-5 border" style={{ borderColor: "#D3D1C7" }}>
              <p className="text-xs font-medium mb-1" style={{ color: "#6B6B67" }}>{s.label}</p>
              <p className="text-3xl font-bold" style={{ color: s.color }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        {leads.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center border" style={{ borderColor: "#D3D1C7" }}>
            <p style={{ color: "#6B6B67" }}>Aucun lead pour l'instant.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: "#D3D1C7" }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid #F0F0F0", backgroundColor: "#FAFAFA" }}>
                  {["Date", "Contact", "Email", "Téléphone", "Domaine", "Contact prévu", "Statut"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 font-semibold" style={{ color: "#6B6B67", fontSize: "12px" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => {
                  const sc = STATUT_COLORS[lead.statut] ?? STATUT_COLORS.nouveau;
                  return (
                    <tr key={lead.id} style={{ borderBottom: "1px solid #F9FAFB" }}>
                      <td className="px-4 py-3 whitespace-nowrap" style={{ color: "#9B9B97", fontSize: "12px" }}>
                        {new Date(lead.created_at).toLocaleDateString("fr-FR")}
                      </td>
                      <td className="px-4 py-3 font-medium" style={{ color: "#2C2C2A" }}>
                        {lead.prenom} {lead.nom}
                      </td>
                      <td className="px-4 py-3" style={{ color: "#1D9E75" }}>
                        <a href={`mailto:${lead.email}`}>{lead.email}</a>
                      </td>
                      <td className="px-4 py-3" style={{ color: "#2C2C2A" }}>
                        {lead.telephone}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap" style={{ color: "#6B6B67", fontSize: "12px" }}>
                        {DOMAINE_LABELS[lead.domaine] ?? lead.domaine}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap" style={{ color: "#6B6B67", fontSize: "12px" }}>
                        {lead.scheduled_at ? new Date(lead.scheduled_at).toLocaleDateString("fr-FR") : "—"}
                      </td>
                      <td className="px-4 py-3">
                        <div className="relative">
                          <select
                            value={lead.statut}
                            disabled={updating === lead.id}
                            onChange={(e) => updateStatut(lead.id, e.target.value)}
                            className="appearance-none pl-2 pr-6 py-1 rounded-full text-xs font-medium border-0 cursor-pointer"
                            style={{ backgroundColor: sc.bg, color: sc.text }}
                          >
                            {STATUT_OPTIONS.map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                          <ChevronDown
                            size={10}
                            className="absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none"
                            style={{ color: sc.text }}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
