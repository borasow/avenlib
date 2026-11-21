import OutilShell, { outilMetadata } from "@/components/calc/OutilShell";
import SalarieCalc from "@/components/calc/SalarieCalc";

export const metadata = outilMetadata("freelance-vs-salarie");

export default function Page() {
  return (
    <OutilShell slug="freelance-vs-salarie" methode={<><p>On estime ton net de salarié à 78 % du brut (non-cadre) ou 75 % (cadre), puis on calcule le chiffre d'apos;affaires micro-entrepreneur qui te laisse ce même net après cotisations et charges, avec 25 jours de congés et 5 jours d'apos;arrêt à ta charge. Le TJM est ce chiffre divisé par tes jours facturés.</p></>}>
      <SalarieCalc />
    </OutilShell>
  );
}
