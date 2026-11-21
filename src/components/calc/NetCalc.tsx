"use client";
import { useState } from "react";
import { MICRO, RegimeMicro, netMicro, netReel } from "@/lib/calculs";
import { Big, Check, Cta, Layout, Note, Num, Rows, Sel, eur, useNum } from "./ui";

export default function NetCalc() {
  const [mode, setMode] = useState<"micro" | "reel">("micro");
  const [regime, setRegime] = useState<RegimeMicro>("service");
  const [caS, setCaS] = useState("50000");
  const [chS, setChS, charges] = useNum(3000);
  const [partsS, setPartsS, parts] = useNum(1);
  const [couple, setCouple] = useState(false);
  const [autresS, setAutresS, autres] = useNum(0);
  const [vl, setVl] = useState(false);
  const caN = Number(caS.replace(",", ".")) || 0;
  const r = mode === "micro"
    ? netMicro({ regime, ca: caN, charges, parts, couple, autresRevenus: autres, versementLiberatoire: vl })
    : netReel({ ca: caN, charges, parts, couple, autresRevenus: autres });
  return (
    <Layout
      slug="revenu-net-independant"
      resume={[`Chiffre d'affaires : ${eur(caN)}`, `Cotisations : ${eur(r.cotisations)}`, `Charges : ${eur(charges)}`, `Impôt lié à l'activité : ${eur(r.impot)}`, `Net annuel : ${eur(r.netApresImpot)}`, `Net mensuel : ${eur(r.netMensuel)}`]}
      form={<>
        <Sel label="Ton régime" value={mode} onChange={setMode} options={[{ v: "micro", l: "Micro-entrepreneur" }, { v: "reel", l: "Entreprise individuelle au réel (estimation)" }]} />
        {mode === "micro" && <Sel label="Ton activité" value={regime} onChange={setRegime} options={(Object.keys(MICRO) as RegimeMicro[]).map((k) => ({ v: k, l: MICRO[k].label }))} />}
        <Num label="Chiffre d'affaires annuel (€)" value={caS} onChange={setCaS} suffix="€" />
        <Num label="Charges réelles annuelles (€)" hint="Matériel, logiciels, déplacements, comptable..." value={chS} onChange={setChS} suffix="€" />
        <Num label="Nombre de parts fiscales" hint="1 pour une personne seule, +0,5 par enfant..." value={partsS} onChange={setPartsS} />
        <Check label="En couple (imposition commune)" checked={couple} onChange={setCouple} />
        <Num label="Autres revenus imposables du foyer (€/an)" hint="Salaire du conjoint, par exemple. Sinon 0." value={autresS} onChange={setAutresS} suffix="€" />
        {mode === "micro" && <Check label="Versement libératoire de l'impôt" checked={vl} onChange={setVl} />}
      </>}
      result={<>
        <Big label="Ton revenu net par mois" value={eur(r.netMensuel)} sub={`après cotisations, charges et impôt, soit ${Math.round(r.partCA * 100)} % de ton chiffre d'affaires`} />
        <Rows rows={[
          { l: "Chiffre d'affaires", v: eur(caN) },
          { l: "Cotisations sociales", v: "− " + eur(r.cotisations) },
          { l: "Charges", v: "− " + eur(charges) },
          { l: "Impôt sur le revenu (part liée à l'activité)", v: "− " + eur(r.impot) },
          { l: "Net annuel", v: eur(r.netApresImpot), strong: true, tone: "good" },
        ]} />
        <Note>{mode === "reel" ? "Au réel, les cotisations sont estimées à 30 % du bénéfice : elles varient selon le revenu." : "En micro, les charges ne réduisent ni les cotisations ni l'impôt."}</Note>
        <Cta />
      </>}
    />
  );
}
