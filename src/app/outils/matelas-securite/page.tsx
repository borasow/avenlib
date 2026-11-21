import OutilShell, { outilMetadata } from "@/components/calc/OutilShell";
import MatelasCalc from "@/components/calc/MatelasCalc";

export const metadata = outilMetadata("matelas-securite");

export default function Page() {
  return (
    <OutilShell slug="matelas-securite" methode={<><p>Nombre de mois tenus = épargne disponible divisée par tes charges mensuelles. L'objectif de 6 mois est un repère courant pour les indépendants, qui n'ont pas droit au chômage classique.</p></>}>
      <MatelasCalc />
    </OutilShell>
  );
}
