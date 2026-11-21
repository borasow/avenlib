import OutilShell, { outilMetadata } from "@/components/calc/OutilShell";
import TvaCalc from "@/components/calc/TvaCalc";

export const metadata = outilMetadata("seuil-tva-independant");

export default function Page() {
  return (
    <OutilShell slug="seuil-tva-independant" methode={<><p>On compare ton chiffre d'apos;affaires HT aux seuils de la franchise en base de TVA : 37 500 € (services) ou 85 000 € (vente), et aux seuils majorés de 41 250 € et 93 500 €. Sous le seuil de base, pas de TVA. Entre le seuil de base et le seuil majoré, tu restes sans TVA jusqu'apos;au 31 décembre. Au-dessus du seuil majoré, la TVA s'apos;applique dès le jour du dépassement. Si ton chiffre d'apos;affaires de l'apos;an dernier dépassait déjà le seuil de base, tu es redevable de la TVA.</p></>}>
      <TvaCalc />
    </OutilShell>
  );
}
