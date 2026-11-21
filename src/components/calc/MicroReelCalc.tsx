"use client";
import { useState } from "react";
import { MICRO, RegimeMicro, netMicro, netReel } from "@/lib/calculs";
import { Cta, Layout, Note, Num, Rows, Sel, eur, useNum } from "./ui";

export default function MicroReelCalc() {
  const [regime, setRegime] = useState<RegimeMicro>("service");
  const [caS, setCaS, ca] = useNum(50000);
  const [chS, setChS, charges] = useNum(15000);
  const base = { ca, charges, parts: 1, couple: false, autresRevenus: 0 };
  const micro = netMicro({ ...base, regime, versementLiberatoire: false });
  const reel = netReel(base);
  const gagne = reel.netApresImpot > micro.netApresImpot ? "reel" : "micro";
  const ecart = Math.abs(reel.netApresImpot - micro.netApresImpot);
  return (
    <Layout
      slug="micro-ou-reel"
      resume={[`Chiffre d'affaires : ${eur(ca)}`, `Charges : ${eur(charges)}`, `Net annuel en micro : ${eur(micro.netApresImpot)}`, `Net annuel au réel (estimé) : ${eur(reel.netApresImpot)}`, `Régime le plus avantageux : ${gagne === "micro" ? "micro-entreprise" : "régime réel"}, environ ${eur(ecart)} de plus par an`]}
      form={<>
        <Sel label="Ton activité" value={regime} onChange={setRegime} options={(Object.keys(MICRO) as RegimeMicro[]).map((k) => ({ v: k, l: MICRO[k].label }))} />
        <Num label="Chiffre d'affaires annuel (€)" value={caS} onChange={setCaS} suffix="€" />
        <Num label="Charges réelles annuelles (€)" hint="Plus tes charges sont élevées, plus le réel devient intéressant." value={chS} onChange={setChS} suffix="€" />
      </>}
      result={<>
        <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: "#9FE1CB" }}>Le plus avantageux pour toi</p>
        <p className="text-4xl font-bold mb-1">{gagne === "micro" ? "La micro-entreprise" : "Le régime réel"}</p>
        <p className="text-sm mb-6" style={{ color: "#E1F5EE" }}>soit environ {eur(ecart)} de plus par an dans ta poche</p>
        <Rows rows={[
          { l: "Net annuel en micro", v: eur(micro.netApresImpot), tone: gagne === "micro" ? "good" : undefined },
          { l: "Net annuel au réel (estimé)", v: eur(reel.netApresImpot), tone: gagne === "reel" ? "good" : undefined },
          { l: "Cotisations en micro", v: eur(micro.cotisations) },
          { l: "Cotisations au réel (estimées)", v: eur(reel.cotisations) },
        ]} />
        <Note>Célibataire sans autre revenu, par simplification. Le réel implique un comptable (souvent 800 à 1 500 € par an) qui n&apos;est pas compté ici.</Note>
        <Cta pitch="Le bon régime dépend aussi de ta protection sociale, qui change selon ton statut." />
      </>}
    />
  );
}
