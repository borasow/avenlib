import OutilShell, { outilMetadata } from "@/components/calc/OutilShell";
import MicroReelCalc from "@/components/calc/MicroReelCalc";

export const metadata = outilMetadata("micro-ou-reel");

export default function Page() {
  return (
    <OutilShell slug="micro-ou-reel" methode={<><p>On calcule ton net après cotisations et impôt dans les deux régimes. En micro, un abattement forfaitaire remplace tes charges pour l'impôt. Au réel, tu déduis tes charges réelles et tes cotisations, mais elles sont estimées à 30 % du bénéfice.</p></>}>
      <MicroReelCalc />
    </OutilShell>
  );
}
