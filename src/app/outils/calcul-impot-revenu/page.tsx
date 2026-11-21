import OutilShell, { outilMetadata } from "@/components/calc/OutilShell";
import ImpotCalc from "@/components/calc/ImpotCalc";

export const metadata = outilMetadata("calcul-impot-revenu");

export default function Page() {
  return (
    <OutilShell slug="calcul-impot-revenu" methode={<><p>Barème progressif 2026 appliqué au quotient familial (revenu divisé par le nombre de parts) : 0 % jusqu'à 11 600 €, 11 % jusqu'à 29 579 €, 30 % jusqu'à 84 577 €, 41 % jusqu'à 181 917 €, 45 % au-delà. L'avantage des demi-parts supplémentaires est plafonné à 1 807 € par demi-part.</p></>}>
      <ImpotCalc />
    </OutilShell>
  );
}
