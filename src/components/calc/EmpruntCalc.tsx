"use client";
import { capaciteEmprunt } from "@/lib/calculs";
import { Big, Cta, Layout, Note, Num, Rows, eur, useNum } from "./ui";

export default function EmpruntCalc() {
  const [rS, setRS, rev] = useNum(3500);
  const [cS, setCS, cr] = useNum(0);
  const [tS, setTS, taux] = useNum(3.5);
  const [dS, setDS, duree] = useNum(20);
  const [aS, setAS, apport] = useNum(20000);
  const r = capaciteEmprunt({ revenuMensuel: rev, creditsEnCours: cr, tauxAnnuel: taux, assuranceAnnuelle: 0.34, dureeAns: duree, apport });
  return (
    <Layout
      slug="capacite-emprunt-independant"
      resume={[`Capacité d'emprunt : ${eur(r.capital)}`, `Mensualité maximale : ${eur(r.mensualiteMax)}`, `Budget avec apport : ${eur(r.budget)}`, `Coût du crédit : ${eur(r.coutCredit)}`]}
      form={<>
        <Num label="Revenu net mensuel moyen (€)" hint="Moyenne des 3 dernières années : c'est ce que regarde la banque." value={rS} onChange={setRS} suffix="€" />
        <Num label="Crédits en cours (€/mois)" value={cS} onChange={setCS} suffix="€" />
        <Num label="Taux du prêt (%)" value={tS} onChange={setTS} suffix="%" />
        <Num label="Durée (années)" value={dS} onChange={setDS} />
        <Num label="Apport (€)" value={aS} onChange={setAS} suffix="€" />
      </>}
      result={<>
        <Big label="Tu peux emprunter environ" value={eur(r.capital)} sub={`avec un budget total de ${eur(r.budget)} apport compris`} />
        <Rows rows={[
          { l: "Mensualité maximale (35 %)", v: eur(r.mensualiteMax) },
          { l: "Coût du crédit (intérêts)", v: eur(r.coutCredit) },
          { l: "Budget d'achat", v: eur(r.budget), strong: true, tone: "good" },
        ]} />
        <Note>Calcul avec 35 % d&apos;endettement maximum et 0,34 % d&apos;assurance par an. Les banques regardent la régularité de tes revenus : plus ils sont stables, mieux c&apos;est.</Note>
        <Cta pitch="Les banques regardent aussi ta protection : un indépendant couvert est un dossier plus solide." />
      </>}
    />
  );
}
