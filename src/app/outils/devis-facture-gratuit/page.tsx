import OutilShell, { outilMetadata } from "@/components/calc/OutilShell";
import FactureCalc from "@/components/calc/FactureCalc";

export const metadata = outilMetadata("devis-facture-gratuit");

export default function Page() {
  return (
    <OutilShell slug="devis-facture-gratuit" methode={<><p>Le document reprend les mentions courantes d&apos;une facture ou d&apos;un devis de micro-entrepreneur : identité du vendeur et du client, numéro, date, détail des prestations, total, mention de franchise de TVA (article 293 B du CGI), pénalités de retard et indemnité forfaitaire de 40 €. Tout se fait dans ton navigateur, rien n&apos;est enregistré. Vérifie que ton document est complet pour ta situation, par exemple si tu factures la TVA ou si tu as des mentions propres à ton métier.</p><p>À partir de septembre 2027, les micro-entreprises devront émettre des factures électroniques via une plateforme agréée : ce générateur sert aux devis et aux factures papier ou PDF d&apos;ici là.</p></>}>
      <FactureCalc />
    </OutilShell>
  );
}
