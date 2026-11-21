"use client";
import { matelas } from "@/lib/calculs";
import { Big, Cta, Layout, Note, Num, Rows, eur, useNum } from "./ui";

export default function MatelasCalc() {
  const [eS, setES, ep] = useNum(6000);
  const [cS, setCS, ch] = useNum(2000);
  const [sS, setSS, sa] = useNum(300);
  const r = matelas(ep, ch, sa);
  const ok = r.moisTenus >= 6;
  return (
    <Layout
      slug="matelas-securite"
      resume={[`Épargne : ${eur(ep)}`, `Charges mensuelles : ${eur(ch)}`, `Tu tiens ${String(r.moisTenus).replace(".", ",")} mois sans revenu`, `Objectif de 6 mois : ${eur(r.cible)}`, `Il te manque : ${eur(r.manque)}`]}
      form={<>
        <Num label="Épargne disponible (€)" hint="Livrets et liquidités mobilisables rapidement." value={eS} onChange={setES} suffix="€" />
        <Num label="Charges mensuelles incompressibles (€)" hint="Loyer, crédits, assurances, cotisations, alimentation." value={cS} onChange={setCS} suffix="€" />
        <Num label="Épargne mensuelle possible (€)" value={sS} onChange={setSS} suffix="€" />
      </>}
      result={<>
        <Big label="Tu tiens" value={`${String(r.moisTenus).replace(".", ",")} mois`} sub={ok ? "sans aucun revenu : tu as le matelas recommandé" : "sans aucun revenu, contre 6 mois recommandés"} />
        <Rows rows={[
          { l: "Objectif (6 mois de charges)", v: eur(r.cible) },
          { l: ok ? "Excédent" : "Il te manque", v: ok ? eur(ep - r.cible) : eur(r.manque), tone: ok ? "good" : "bad" },
          { l: "Temps pour y arriver", v: r.manque === 0 ? "Atteint" : r.moisPourAtteindre === null ? "Épargne à 0 €" : `${r.moisPourAtteindre} mois`, strong: true },
        ]} />
        <Note>Un indépendant n&apos;a pas de chômage classique : 6 mois est un repère courant, à adapter à ta régularité de revenus.</Note>
        <Cta pitch="Ton matelas dit combien de temps tu tiens. Reste à vérifier ce qui t'est versé en cas d'arrêt maladie." />
      </>}
    />
  );
}
