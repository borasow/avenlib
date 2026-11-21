"use client";
import { useState } from "react";
import { MICRO, RegimeMicro, calculerTjm } from "@/lib/calculs";
import { RATIO_NET_SALARIE } from "@/lib/tva";
import { Big, Cta, Layout, Note, Num, Rows, Sel, eur, useNum } from "./ui";

export default function SalarieCalc() {
  const [bS, setBS, brut] = useNum(45000);
  const [cadre, setCadre] = useState<"noncadre" | "cadre">("noncadre");
  const [regime, setRegime] = useState<RegimeMicro>("bnc");
  const [chS, setChS, ch] = useNum(200);
  const [pS, setPS, pct] = useNum(20);
  const netSalarie = brut * RATIO_NET_SALARIE[cadre];
  const r = calculerTjm({ netMensuelVoulu: netSalarie / 12, chargesMensuelles: ch, regime, congesJours: 25, maladieJours: 5, pctNonFacture: pct });
  const jourSalarie = brut / 218;
  const caEquivalent = r.caNecessaire;
  return (
    <Layout
      slug="freelance-vs-salarie"
      resume={[`Salaire brut annuel : ${eur(brut)}`, `Net salarié estimé : ${eur(netSalarie / 12)} par mois`, `TJM pour faire pareil en freelance : ${eur(r.tjm)}`, `Chiffre d'affaires annuel nécessaire : ${eur(caEquivalent)}`]}
      form={<>
        <Num label="Salaire brut annuel en CDI (€)" value={bS} onChange={setBS} suffix="€" />
        <Sel label="Statut du salarié" value={cadre} onChange={setCadre} options={[{ v: "noncadre", l: "Non-cadre (net ≈ 78 % du brut)" }, { v: "cadre", l: "Cadre (net ≈ 75 % du brut)" }]} />
        <Sel label="Ton activité en freelance" value={regime} onChange={setRegime} options={(Object.keys(MICRO) as RegimeMicro[]).map((k) => ({ v: k, l: MICRO[k].label }))} hint="Calcul avec les cotisations micro-entrepreneur." />
        <Num label="Charges pro mensuelles en freelance (€)" hint="Mutuelle, prévoyance, comptable, logiciels, matériel." value={chS} onChange={setChS} suffix="€" />
        <Num label="Temps non facturé (%)" hint="Prospection, administratif. 20 % est courant." value={pS} onChange={setPS} suffix="%" />
      </>}
      result={<>
        <Big label="TJM pour gagner autant qu'en CDI" value={eur(r.tjm)} sub={`soit ${eur(caEquivalent)} de chiffre d'affaires par an`} />
        <Rows rows={[
          { l: "Net mensuel en CDI (avant impôt)", v: eur(netSalarie / 12) },
          { l: "Ton jour de salarié (brut)", v: eur(jourSalarie) },
          { l: "TJM freelance / jour brut CDI", v: "× " + (r.tjm / jourSalarie).toFixed(1).replace(".", ",") },
          { l: "Jours facturés par an", v: String(r.joursFactures) },
        ]} />
        <Note>Un freelance facture environ 1,5 à 2,5 fois le salaire journalier brut d'un salarié pour garder le même net : il paie ses congés, son arrêt maladie, sa mutuelle et ses périodes sans mission. Estimation indicative.</Note>
        <Cta />
      </>}
    />
  );
}
