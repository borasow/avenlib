import OutilShell, { outilMetadata } from "@/components/calc/OutilShell";
import NetCalc from "@/components/calc/NetCalc";

export const metadata = outilMetadata("revenu-net-independant");

export default function Page() {
  return (
    <OutilShell slug="revenu-net-independant" methode={<><p>Micro-entrepreneur : les cotisations sont un pourcentage du chiffre d'affaires (12,3 % vente, 21,2 % services BIC, 25,6 % libéral BNC, 23,2 % Cipav, plus la contribution formation). L'impôt utilise l'abattement forfaitaire (71 %, 50 % ou 34 %) puis le barème 2026, ou le versement libératoire (1 %, 1,7 % ou 2,2 % du CA).</p><p>Au réel, les cotisations sont estimées à 30 % du bénéfice et l'impôt est calculé sur le bénéfice après cotisations.</p></>}>
      <NetCalc />
    </OutilShell>
  );
}
