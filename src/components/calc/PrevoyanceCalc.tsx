"use client";
import { useState } from "react";
import { prevoyance } from "@/lib/calculs";
import { Statut, calculerIj } from "@/lib/ij";
import { Big, Cta, Layout, Note, Num, Rows, Sel, eur, useNum } from "./ui";

export default function PrevoyanceCalc() {
  const [statut, setStatut] = useState<Statut>("reel");
  const [mS, setMS, montant] = useNum(40000);
  const [bS, setBS, besoin] = useNum(2500);
  const [fr, setFr] = useState("30");
  const ij = calculerIj({ statut, montantAnnuel: montant, dureeJours: 60, chargesMensuelles: besoin });
  const r = prevoyance(ij.ijJour, ij.droit, besoin, Number(fr));
  return (
    <Layout
      form={<>
        <Sel label="Ton statut" value={statut} onChange={setStatut} options={[{ v: "reel", l: "Au réel" }, { v: "micro_bic_service", l: "Micro, services (BIC)" }, { v: "micro_bnc", l: "Micro, libéral (BNC)" }, { v: "micro_bic_vente", l: "Micro, vente" }]} />
        <Num label={statut === "reel" ? "Revenu net annuel moyen (€)" : "Chiffre d'affaires annuel moyen (€)"} value={mS} onChange={setMS} suffix="€" />
        <Num label="Ce dont tu as besoin par mois (€)" hint="Charges personnelles et professionnelles à couvrir." value={bS} onChange={setBS} suffix="€" />
        <Sel label="Franchise envisagée" value={fr} onChange={setFr} options={[{ v: "0", l: "Aucune" }, { v: "15", l: "15 jours" }, { v: "30", l: "30 jours" }, { v: "90", l: "90 jours" }]} hint="Délai avant que la prévoyance ne paie." />
      </>}
      result={<>
        <Big label="Garantie mensuelle à viser" value={eur(r.manqueMensuel)} sub="par mois, en plus des indemnités de la Sécu" />
        <Rows rows={[
          { l: "Indemnités Sécu estimées (par mois)", v: eur(r.ijMensuelle) },
          { l: "Tes besoins mensuels", v: eur(besoin) },
          { l: `Reste à ta charge pendant la franchise (${fr} j)`, v: eur(r.coutFranchise), strong: true, tone: "bad" },
        ]} />
        <Note>Une franchise plus longue réduit la cotisation, mais tu finances toi-même cette période : prévois ce montant en épargne. Montants bruts, estimation.</Note>
        <Cta text="Comparer les solutions de prévoyance" />
      </>}
    />
  );
}
