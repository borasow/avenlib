"use client";
import { retraiteSsi } from "@/lib/calculs";
import { Big, Cta, Layout, Note, Num, Rows, eur, useNum } from "./ui";

export default function RetraiteCalc() {
  const [rS, setRS, rev] = useNum(30000);
  const [tS, setTS, tri] = useNum(60);
  const [aS, setAS, ans] = useNum(25);
  const r = retraiteSsi(rev, tri, ans);
  return (
    <Layout
      slug="retraite-independant"
      resume={[`Pension estimée : ${eur(r.totalMensuel)} par mois (brut)`, `Retraite de base : ${eur(r.base)} par an`, `Retraite complémentaire : ${eur(r.complementaire)} par an`, `Trimestres à ton départ : ${r.trimestres} sur 172`]}
      form={<>
        <Num label="Revenu net annuel moyen (€)" hint="Ton bénéfice. En micro : CA moins abattement (71 %, 50 % ou 34 %)." value={rS} onChange={setRS} suffix="€" />
        <Num label="Trimestres déjà validés" hint="Visibles sur info-retraite.fr." value={tS} onChange={setTS} />
        <Num label="Années d'activité restantes" hint="Jusqu'à ton départ." value={aS} onChange={setAS} />
      </>}
      result={<>
        <Big label="Pension estimée" value={eur(r.totalMensuel) + "/mois"} sub={`brut, soit ${Math.round(r.tauxRemplacement * 100)} % de ton revenu actuel`} />
        <Rows rows={[
          { l: "Retraite de base (annuelle)", v: eur(r.base) },
          { l: "Retraite complémentaire RCI (annuelle)", v: eur(r.complementaire) },
          { l: "Trimestres à ton départ", v: `${r.trimestres} sur 172` },
          { l: r.tauxPlein ? "Taux plein" : "Taux plein non atteint", v: r.tauxPlein ? "Oui" : "Décote possible", strong: true, tone: r.tauxPlein ? "good" : "bad" },
        ]} />
        <Note>Pour les artisans, commerçants et libéraux non réglementés (SSI). L&apos;écart avec ton revenu actuel est ce que la prévoyance et l&apos;épargne retraite peuvent combler.</Note>
        <Cta />
      </>}
    />
  );
}
