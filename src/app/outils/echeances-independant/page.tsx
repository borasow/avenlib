import OutilShell, { outilMetadata } from "@/components/calc/OutilShell";
import EcheancesCalc from "@/components/calc/EcheancesCalc";

export const metadata = outilMetadata("echeances-independant");

export default function Page() {
  return (
    <OutilShell slug="echeances-independant" methode={<><p>Les dates concernent un micro-entrepreneur : déclaration du chiffre d&apos;affaires à l&apos;Urssaf (dernier jour du mois suivant, ou 31 janvier, 30 avril, 31 juillet et 31 octobre en déclaration trimestrielle), déclaration de revenus au printemps et CFE avant le 15 décembre. Si une date tombe un week-end ou un jour férié, vérifie le report sur ton espace. Les dates de la déclaration de revenus varient selon le département.</p></>}>
      <EcheancesCalc />
    </OutilShell>
  );
}
