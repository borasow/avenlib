"use client";
import { useState } from "react";
import { SEUILS_TVA, ActiviteTva, seuilTva } from "@/lib/tva";
import { Cta, Layout, Note, Num, Rows, Sel, eur, useNum } from "./ui";

export default function TvaCalc() {
  const [act, setAct] = useState<ActiviteTva>("services");
  const [pS, setPS, prec] = useNum(30000);
  const [cS, setCS, cours] = useNum(36000);
  const r = seuilTva(act, prec, cours);
  const s = SEUILS_TVA[act];
  const couleur = r.statut === "franchise" ? "#9FE1CB" : r.statut === "tva-janvier" ? "#F5C26B" : "#F4A3A2";
  return (
    <Layout
      slug="seuil-tva-independant"
      resume={[r.titre, `Activité : ${s.label}`, `CA de l'an dernier : ${eur(prec)}`, `CA depuis janvier : ${eur(cours)}`, `Seuils : ${eur(s.base)} (base), ${eur(s.majore)} (majoré)`]}
      form={<>
        <Sel label="Ton activité" value={act} onChange={setAct} options={(Object.keys(SEUILS_TVA) as ActiviteTva[]).map((k) => ({ v: k, l: SEUILS_TVA[k].label }))} />
        <Num label="Chiffre d'affaires HT de l'an dernier (€)" value={pS} onChange={setPS} suffix="€" />
        <Num label="Chiffre d'affaires HT depuis le 1er janvier (€)" value={cS} onChange={setCS} suffix="€" />
      </>}
      result={<>
        <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: couleur }}>Ta situation</p>
        <p className="text-2xl font-bold leading-snug mb-3">{r.titre}</p>
        <p className="text-sm leading-relaxed mb-4" style={{ color: "#E1F5EE" }}>{r.detail}</p>
        <Rows rows={[
          { l: "Seuil de base", v: eur(s.base) },
          { l: "Seuil majoré", v: eur(s.majore) },
          { l: "Marge avant le seuil de base", v: r.margeBase >= 0 ? eur(r.margeBase) : "Dépassé de " + eur(-r.margeBase), strong: true, tone: r.margeBase >= 0 ? "good" : "bad" },
          { l: "Marge avant le seuil majoré", v: r.margeMajore >= 0 ? eur(r.margeMajore) : "Dépassé de " + eur(-r.margeMajore) },
        ]} />
        <Note>Avec la TVA, tes prix HT ne changent pas mais tes clients particuliers paient 20 % de plus, sauf si tu baisses ton prix. Pense-y avant de franchir le seuil.</Note>
        <Cta />
      </>}
    />
  );
}
