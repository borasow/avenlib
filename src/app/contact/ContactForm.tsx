"use client";
import { useState } from "react";
import Link from "next/link";

const MOTIFS = ["Question sur mon bilan", "Partenariat", "Presse", "Signaler une erreur sur le site", "Supprimer mes données", "Autre"];
const field = { border: "2px solid #E8E6DF", color: "#2C2C2A", backgroundColor: "#FFFFFF" };

export default function ContactForm() {
  const [v, setV] = useState({ prenom: "", nom: "", email: "", motif: MOTIFS[0], message: "", website: "" });
  const [etat, setEtat] = useState<"idle" | "envoi" | "ok" | "erreur">("idle");
  const [msg, setMsg] = useState("");
  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setV({ ...v, [k]: e.target.value });

  async function envoyer(e: React.FormEvent) {
    e.preventDefault();
    setEtat("envoi");
    try {
      const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(v) });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) { setMsg(d.error ?? "Une erreur est survenue."); setEtat("erreur"); return; }
      setEtat("ok");
    } catch { setMsg("Connexion impossible, réessaie."); setEtat("erreur"); }
  }

  if (etat === "ok") {
    return (
      <div className="rounded-2xl p-8 text-center" style={{ backgroundColor: "#E1F5EE", border: "0.5px solid #9FE1CB" }}>
        <p className="font-bold text-lg mb-2" style={{ color: "#085041" }}>Message envoyé</p>
        <p className="text-sm" style={{ color: "#4B4B47" }}>Merci {v.prenom}. On te répond sous 24h à l&apos;adresse {v.email}.</p>
      </div>
    );
  }

  return (
    <form onSubmit={envoyer} className="rounded-2xl p-6 sm:p-8 space-y-4 text-left" style={{ backgroundColor: "#FFFFFF", border: "2px solid #E8E6DF" }}>
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block"><span className="block text-sm font-semibold mb-1" style={{ color: "#2C2C2A" }}>Prénom</span>
          <input required value={v.prenom} onChange={set("prenom")} autoComplete="given-name" className="w-full rounded-lg px-3 py-3 text-base" style={field} /></label>
        <label className="block"><span className="block text-sm font-semibold mb-1" style={{ color: "#2C2C2A" }}>Nom</span>
          <input required value={v.nom} onChange={set("nom")} autoComplete="family-name" className="w-full rounded-lg px-3 py-3 text-base" style={field} /></label>
      </div>
      <label className="block"><span className="block text-sm font-semibold mb-1" style={{ color: "#2C2C2A" }}>Ton email</span>
        <input required type="email" value={v.email} onChange={set("email")} autoComplete="email" className="w-full rounded-lg px-3 py-3 text-base" style={field} /></label>
      <label className="block"><span className="block text-sm font-semibold mb-1" style={{ color: "#2C2C2A" }}>Raison du message</span>
        <select value={v.motif} onChange={set("motif")} className="w-full rounded-lg px-3 py-3 text-base" style={field}>
          {MOTIFS.map((m) => <option key={m}>{m}</option>)}
        </select></label>
      <label className="block"><span className="block text-sm font-semibold mb-1" style={{ color: "#2C2C2A" }}>Ton message</span>
        <textarea required rows={6} minLength={5} maxLength={4000} value={v.message} onChange={set("message")} className="w-full rounded-lg px-3 py-3 text-base" style={field} /></label>
      <input type="text" tabIndex={-1} autoComplete="off" value={v.website} onChange={set("website")} className="hidden" aria-hidden="true" name="website" />
      <button type="submit" disabled={etat === "envoi"} className="w-full rounded-lg px-5 py-3 text-base font-bold disabled:opacity-60" style={{ backgroundColor: "#15805F", color: "#FFFFFF" }}>
        {etat === "envoi" ? "Envoi..." : "Envoyer mon message"}
      </button>
      <p className="text-xs" style={{ color: "#6B6B67" }}>Ces informations servent uniquement à te répondre. <Link href="/mentions-legales" className="underline">En savoir plus</Link></p>
      {etat === "erreur" && <p className="text-sm font-semibold" style={{ color: "#B3261E" }}>{msg}</p>}
    </form>
  );
}
