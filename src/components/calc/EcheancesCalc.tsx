"use client";
import { useState } from "react";
import Link from "next/link";
import { Periodicite, prochaines, formatJour } from "@/lib/echeances";

const fieldStyle = { border: "2px solid #E8E6DF", color: "#2C2C2A", backgroundColor: "#FFFFFF" };
const COULEURS = { urssaf: "#1D9E75", impot: "#E24B4A", cfe: "#2C6B8F" } as const;

export default function EcheancesCalc() {
  const [per, setPer] = useState<Periodicite>("trimestrielle");
  const [email, setEmail] = useState("");
  const [site, setSite] = useState("");
  const [etat, setEtat] = useState<"idle" | "envoi" | "ok" | "erreur">("idle");
  const [msg, setMsg] = useState("");
  const liste = prochaines(per, new Date(), 8);

  async function s_abonner(e: React.FormEvent) {
    e.preventDefault();
    setEtat("envoi");
    try {
      const r = await fetch("/api/outils/echeances", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, periodicite: per, website: site }) });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) { setMsg(d.error ?? "Une erreur est survenue."); setEtat("erreur"); return; }
      setEtat("ok");
    } catch { setMsg("Connexion impossible, réessaie."); setEtat("erreur"); }
  }

  return (
    <div className="grid md:grid-cols-2 gap-6 items-start">
      <div className="rounded-2xl p-6 space-y-5" style={{ backgroundColor: "#FFFFFF", border: "2px solid #E8E6DF" }}>
        <label className="block">
          <span className="block text-sm font-semibold mb-1" style={{ color: "#2C2C2A" }}>Tu déclares ton chiffre d'affaires</span>
          <select value={per} onChange={(e) => setPer(e.target.value as Periodicite)} className="w-full rounded-lg px-3 py-3 text-base" style={fieldStyle}>
            <option value="trimestrielle">Chaque trimestre</option>
            <option value="mensuelle">Chaque mois</option>
          </select>
        </label>
        <div className="rounded-xl p-5" style={{ backgroundColor: "#E1F5EE", border: "0.5px solid #9FE1CB" }}>
          {etat === "ok" ? (
            <p className="text-sm font-semibold" style={{ color: "#085041" }}>C'est noté. Tu recevras un email 5 jours avant chaque échéance. Regarde aussi tes courriers indésirables pour l'email de confirmation.</p>
          ) : (
            <form onSubmit={s_abonner} className="space-y-3">
              <p className="font-bold" style={{ color: "#085041" }}>Reçois un rappel par email</p>
              <p className="text-sm" style={{ color: "#4B4B47" }}>Un email 5 jours avant chaque échéance, rien d'autre. Désabonnement en un clic.</p>
              <input type="email" required placeholder="ton@email.fr" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg px-3 py-3 text-base" style={fieldStyle} aria-label="Ton email" />
              <input type="text" tabIndex={-1} autoComplete="off" value={site} onChange={(e) => setSite(e.target.value)} className="hidden" aria-hidden="true" name="website" />
              <button type="submit" disabled={etat === "envoi"} className="w-full rounded-lg px-5 py-3 text-sm font-bold disabled:opacity-60" style={{ backgroundColor: "#1D9E75", color: "#FFFFFF" }}>
                {etat === "envoi" ? "Envoi..." : "Me rappeler mes échéances"}
              </button>
              <p className="text-xs" style={{ color: "#4B4B47" }}>Ton email sert uniquement à ces rappels. <Link href="/mentions-legales" className="underline">En savoir plus</Link></p>
              {etat === "erreur" && <p className="text-sm font-semibold" style={{ color: "#B3261E" }}>{msg}</p>}
            </form>
          )}
        </div>
      </div>
      <div className="rounded-2xl p-6" style={{ backgroundColor: "#1F4A3F", color: "#FFFFFF" }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#9FE1CB" }}>Tes prochaines échéances</p>
        <ul className="space-y-4">
          {liste.map((e) => (
            <li key={e.date + e.titre} className="flex gap-3">
              <span className="mt-1.5 h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: COULEURS[e.type] }} />
              <div>
                <p className="font-bold text-sm">{e.titre}</p>
                <p className="text-xs first-letter:uppercase" style={{ color: "#9FE1CB" }}>{formatJour(e.date)}</p>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: "#E1F5EE" }}>{e.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
