"use client";
import { useState } from "react";
import { MICRO, RegimeMicro, calculerTjm } from "@/lib/calculs";
import { Big, Cta, Layout, Note, Num, Rows, Sel, eur, useNum } from "./ui";

export default function TjmCalc() {
  const [regime, setRegime] = useState<RegimeMicro>("bnc");
  const [nS, setNS, net] = useNum(3000);
  const [cS, setCS, ch] = useNum(300);
  const [vS, setVS, conges] = useNum(25);
  const [mS, setMS, mal] = useNum(5);
  const [pS, setPS, pct] = useNum(20);
  const r = calculerTjm({ netMensuelVoulu: net, chargesMensuelles: ch, regime, congesJours: conges, maladieJours: mal, pctNonFacture: pct });
  return (
    <Layout
      form={<>
        <Sel label="Ton activité" value={regime} onChange={setRegime} options={(Object.keys(MICRO) as RegimeMicro[]).map((k) => ({ v: k, l: MICRO[k].label }))} hint="Calcul fait avec les cotisations micro-entrepreneur." />
        <Num label="Revenu net voulu par mois (€)" hint="Après cotisations, avant impôt sur le revenu." value={nS} onChange={setNS} suffix="€" />
        <Num label="Charges mensuelles professionnelles (€)" value={cS} onChange={setCS} suffix="€" />
        <Num label="Jours de congés par an" value={vS} onChange={setVS} />
        <Num label="Jours d'arrêt maladie prévus par an" value={mS} onChange={setMS} />
        <Num label="Temps non facturé (%)" hint="Prospection, administratif, formation. 20 % est courant." value={pS} onChange={setPS} suffix="%" />
      </>}
      result={<>
        <Big label="Ton TJM minimum" value={eur(r.tjm)} sub={`pour ${r.joursFactures} jours facturés par an`} />
        <Rows rows={[
          { l: "Jours travaillés par an", v: String(r.joursTravailles) },
          { l: "Chiffre d'affaires nécessaire", v: eur(r.caNecessaire) },
          { l: "Cotisations sociales", v: eur(r.cotisations) },
          { l: "Net annuel visé", v: eur(net * 12), strong: true, tone: "good" },
        ]} />
        <Note>Ajoute une marge pour les imprévus et les périodes sans mission. Un TJM trop juste te laisse sans filet.</Note>
        <Cta />
      </>}
    />
  );
}
