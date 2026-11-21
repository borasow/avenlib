"use client";

import { useState } from "react";
import BilanLink from "@/components/BilanLink";
import { calculerIj, Statut, CARENCE_JOURS } from "@/lib/ij";
import { EmailCapture } from "@/components/calc/ui";

const fmt = (n: number) => n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
const fieldStyle = { border: "2px solid #E8E6DF", backgroundColor: "#FFFFFF", color: "#2C2C2A" };

export default function Calculateur() {
  const [statut, setStatut] = useState<Statut>("reel");
  const [montant, setMontant] = useState("40000");
  const [duree, setDuree] = useState("60");
  const [charges, setCharges] = useState("2000");

  const r = calculerIj({
    statut,
    montantAnnuel: Number(montant),
    dureeJours: Number(duree),
    chargesMensuelles: Number(charges),
  });
  const micro = statut !== "reel";

  const resume = r.droit
    ? [`Indemnité journalière : ${fmt(r.ijJour)} brut`, `Jours indemnisés : ${r.joursIndemnises}`, `Total d'indemnités : ${fmt(r.totalIj)}`, `Charges sur la période : ${fmt(r.chargesPeriode)}`, `${r.ecart >= 0 ? "Marge" : "Manque à gagner"} : ${fmt(Math.abs(r.ecart))}`]
    : [`Probablement aucune indemnité avec ce revenu`, `Charges à couvrir seul : ${fmt(r.chargesPeriode)}`];
  return (
    <div>
    <div className="grid md:grid-cols-2 gap-6">
      <div className="rounded-2xl p-6 space-y-5" style={{ backgroundColor: "#FFFFFF", border: "2px solid #E8E6DF" }}>
        <label className="block text-sm font-semibold" style={{ color: "#2C2C2A" }}>
          Ton statut
          <select value={statut} onChange={(e) => setStatut(e.target.value as Statut)} className="mt-2 w-full rounded-lg px-3 py-3 text-base" style={fieldStyle}>
            <option value="reel">Entrepreneur individuel / gérant (au réel)</option>
            <option value="micro_bic_service">Micro-entrepreneur, prestations de services (BIC)</option>
            <option value="micro_bnc">Micro-entrepreneur, professions libérales (BNC)</option>
            <option value="micro_bic_vente">Micro-entrepreneur, vente de marchandises</option>
          </select>
        </label>
        <label className="block text-sm font-semibold" style={{ color: "#2C2C2A" }}>
          {micro ? "Chiffre d'affaires annuel moyen (€)" : "Revenu net annuel moyen (€)"}
          <input inputMode="numeric" value={montant} onChange={(e) => setMontant(e.target.value.replace(/[^0-9]/g, ""))} className="mt-2 w-full rounded-lg px-3 py-3 text-base" style={fieldStyle} />
          <span className="block mt-1 text-xs font-normal" style={{ color: "#6B6B67" }}>Moyenne des 3 dernières années.</span>
        </label>
        <label className="block text-sm font-semibold" style={{ color: "#2C2C2A" }}>
          Durée de l&apos;arrêt (jours)
          <input inputMode="numeric" value={duree} onChange={(e) => setDuree(e.target.value.replace(/[^0-9]/g, ""))} className="mt-2 w-full rounded-lg px-3 py-3 text-base" style={fieldStyle} />
        </label>
        <label className="block text-sm font-semibold" style={{ color: "#2C2C2A" }}>
          Charges mensuelles à couvrir (€)
          <input inputMode="numeric" value={charges} onChange={(e) => setCharges(e.target.value.replace(/[^0-9]/g, ""))} className="mt-2 w-full rounded-lg px-3 py-3 text-base" style={fieldStyle} />
          <span className="block mt-1 text-xs font-normal" style={{ color: "#6B6B67" }}>Loyer, crédits, cotisations, abonnements, vie courante.</span>
        </label>
      </div>

      <div className="rounded-2xl p-6" style={{ backgroundColor: "#1F4A3F", color: "#FFFFFF" }} aria-live="polite">
        {!r.droit ? (
          <>
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#9FE1CB" }}>Résultat</p>
            <p className="text-2xl font-bold mb-3">Probablement aucune indemnité</p>
            <p className="text-sm leading-relaxed" style={{ color: "#E1F5EE" }}>
              Avec ce revenu, le seuil d&apos;ouverture des droits ne semble pas atteint. Sur {duree || 0} jours, il te resterait {fmt(r.chargesPeriode)} de charges à couvrir seul.
            </p>
          </>
        ) : (
          <>
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#9FE1CB" }}>Ton indemnité estimée</p>
            <p className="text-5xl font-bold mb-1">{fmt(r.ijJour)}</p>
            <p className="text-sm mb-6" style={{ color: "#E1F5EE" }}>brut par jour{r.plafonne ? " (plafond atteint)" : ""}, à partir du {CARENCE_JOURS + 1}e jour</p>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between gap-4"><dt>Jours indemnisés</dt><dd className="font-semibold">{r.joursIndemnises}</dd></div>
              <div className="flex justify-between gap-4"><dt>Total d&apos;indemnités</dt><dd className="font-semibold">{fmt(r.totalIj)}</dd></div>
              <div className="flex justify-between gap-4"><dt>Charges sur la période</dt><dd className="font-semibold">{fmt(r.chargesPeriode)}</dd></div>
              <div className="flex justify-between gap-4 pt-3" style={{ borderTop: "1px solid #3C6A5D" }}>
                <dt>{r.ecart >= 0 ? "Marge" : "Manque à gagner"}</dt>
                <dd className="font-bold text-lg" style={{ color: r.ecart >= 0 ? "#9FE1CB" : "#F7A5A4" }}>{fmt(Math.abs(r.ecart))}</dd>
              </div>
            </dl>
          </>
        )}
        <BilanLink className="mt-6 block text-center rounded-lg px-5 py-3 text-sm font-bold" style={{ backgroundColor: "#1D9E75", color: "#FFFFFF" }} label="Faire mon bilan gratuit" />
      </div>
    </div>
    <EmailCapture slug="calcul-indemnites-arret-maladie" resume={resume} />
    </div>
  );
}
