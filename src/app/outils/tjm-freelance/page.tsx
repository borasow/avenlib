import OutilShell, { outilMetadata } from "@/components/calc/OutilShell";
import TjmCalc from "@/components/calc/TjmCalc";

export const metadata = outilMetadata("tjm-freelance");

export default function Page() {
  return (
    <OutilShell slug="tjm-freelance" methode={<><p>On part de 253 jours ouvrés par an (hors week-ends et 8 jours fériés), on retire congés et maladie, puis le temps non facturé. Le chiffre d'affaires nécessaire couvre ton net voulu, tes charges et les cotisations micro. Le TJM est ce chiffre divisé par les jours facturés.</p></>}>
      <TjmCalc />
    </OutilShell>
  );
}
