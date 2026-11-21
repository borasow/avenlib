import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Calculateur from "./Calculateur";
import { MAJ_CHIFFRES } from "@/lib/outils";

const TITLE = "Arrêt maladie indépendant : combien tu touches ? Calculateur gratuit";
const DESC = "Estime tes indemnités journalières d'indépendant (SSI), le jour de carence et le manque à gagner face à tes charges. Gratuit, sans inscription.";

export const metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "https://avenlib.fr/outils/calcul-indemnites-arret-maladie" },
  openGraph: { title: TITLE, description: DESC, url: "https://avenlib.fr/outils/calcul-indemnites-arret-maladie", images: [{ url: "https://avenlib.fr/logo-avenlib.png", alt: "Avenlib" }] },
};

export default function PageCalculateur() {
  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#F1EFE8" }}>
        <section className="max-w-5xl mx-auto px-6 pt-16 pb-8">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#15805F" }}>Outil gratuit</p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-5" style={{ color: "#2C2C2A" }}>
            Si tu tombes malade, tu touches combien ?
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl" style={{ color: "#6B6B67" }}>
            Indique ton statut et ton revenu moyen : on estime tes indemnités journalières et on les compare à tes charges.
          </p>
        </section>
        <section className="max-w-5xl mx-auto px-6 pb-10">
          <Calculateur />
        </section>
        <section className="max-w-3xl mx-auto px-6 pb-20">
          <div className="rounded-2xl p-8 space-y-4 text-sm leading-relaxed" style={{ backgroundColor: "#FFFFFF", border: "2px solid #E8E6DF", color: "#4B4B47" }}>
            <h2 className="text-xl font-bold" style={{ color: "#2C2C2A" }}>Comment c&apos;est calculé</h2>
            <p>L&apos;indemnité journalière correspond à 1/730 de ton revenu annuel moyen des 3 dernières années, dans la limite du plafond annuel de la Sécurité sociale (48 060 €), soit 65,84 € brut par jour au maximum. Elle démarre après 3 jours de carence.</p>
            <p>Pour un micro-entrepreneur, le revenu retenu est le chiffre d&apos;affaires moins l&apos;abattement forfaitaire (71 % vente, 50 % services, 34 % libéral BNC).</p>
            <h2 className="text-xl font-bold pt-2" style={{ color: "#2C2C2A" }}>Ce que cet outil ne couvre pas</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Il s&apos;agit d&apos;une estimation, pas d&apos;un calcul officiel de ta caisse.</li>
              <li>Il faut au moins 12 mois d&apos;affiliation et un revenu au-dessus du seuil d&apos;ouverture des droits (4 582 € en 2026, soit 10 % de la moyenne des plafonds de la Sécurité sociale des trois dernières années).</li>
              <li>Montants bruts, avant prélèvements sociaux.</li>
              <li>Les professions libérales réglementées (médecins, avocats, architectes...) relèvent d&apos;une caisse propre, aux règles différentes.</li>
            </ul>
            <p style={{ color: "#6B6B67" }}>Information générale, pas un conseil personnalisé. Chiffres 2026, mis à jour le {MAJ_CHIFFRES}, revérifiés chaque 1er janvier. Sources : <a href="https://entreprendre.service-public.gouv.fr/vosdroits/F36708" target="_blank" rel="noopener noreferrer" className="underline">service-public.gouv.fr</a>, ameli.fr.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
