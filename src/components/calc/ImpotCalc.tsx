"use client";
import { useState } from "react";
import { bareme, impotRevenu } from "@/lib/calculs";
import { Big, Check, Cta, Layout, Note, Num, Rows, eur, useNum } from "./ui";

export default function ImpotCalc() {
  const [rS, setRS, revenu] = useNum(30000);
  const [pS, setPS, parts] = useNum(1);
  const [couple, setCouple] = useState(false);
  const impot = impotRevenu(revenu, parts, couple);
  const base = couple ? 2 : 1;
  const p = Math.max(base, parts);
  const tmi = [0, 0.11, 0.3, 0.41, 0.45].find((_, i) => (revenu / p) <= [11600, 29579, 84577, 181917, Infinity][i]) ?? 0.45;
  void bareme;
  return (
    <Layout
      form={<>
        <Num label="Revenu net imposable du foyer (€/an)" hint="Pour un micro : CA moins abattement. Pour un réel : bénéfice. Après l'abattement de 10 % pour un salaire." value={rS} onChange={setRS} suffix="€" />
        <Check label="En couple (imposition commune)" checked={couple} onChange={setCouple} />
        <Num label="Nombre de parts fiscales" hint="1 seul, 2 couple, +0,5 par enfant (1 part pour le 3e)." value={pS} onChange={setPS} />
      </>}
      result={<>
        <Big label="Impôt estimé" value={eur(impot)} sub={`soit ${eur(impot / 12)} par mois, tranche marginale à ${Math.round(tmi * 100)} %`} />
        <Rows rows={[
          { l: "Revenu net imposable", v: eur(revenu) },
          { l: "Quotient familial", v: eur(revenu / p) },
          { l: "Taux moyen d'imposition", v: revenu ? (impot / revenu * 100).toFixed(1).replace(".", ",") + " %" : "0 %", strong: true },
        ]} />
        <Note>Barème 2026 (revenus 2025). Hors décote, réductions et crédits d&apos;impôt, qui peuvent faire baisser le montant.</Note>
        <Cta />
      </>}
    />
  );
}
