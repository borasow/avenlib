import OutilShell, { outilMetadata } from "@/components/calc/OutilShell";
import RetraiteCalc from "@/components/calc/RetraiteCalc";

export const metadata = outilMetadata("retraite-independant");

export default function Page() {
  return (
    <OutilShell slug="retraite-independant" methode={<><p>Retraite de base : revenu annuel moyen (plafonné à 48 060 €) × 50 % × trimestres / 172. Complémentaire RCI : cotisation (8,1 % du revenu jusqu'au plafond, 9,1 % entre 1 et 4 plafonds) convertie en points au prix de 21,726 €, valorisés 1,347 € chacun. On suppose un revenu constant et chaque année validée à 4 trimestres.</p><p>Hors régimes des professions libérales réglementées (Cipav, caisses propres), aux règles différentes.</p></>}>
      <RetraiteCalc />
    </OutilShell>
  );
}
