import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Mutuelle santé indépendant : pourquoi la Sécu ne suffit pas",
  description: "La Sécurité sociale rembourse en moyenne 70% des soins. Trouvez la mutuelle adaptée à votre statut d'indépendant.",
  openGraph: {
    title: "Mutuelle santé indépendant : pourquoi la Sécu ne suffit pas",
    description: "La Sécurité sociale rembourse en moyenne 70% des soins. Trouvez la mutuelle adaptée à votre statut.",
    url: "https://avenlib.fr/sante",
    images: [{ url: "https://avenlib.fr/logo-avenlib.png", alt: "Avenlib" }],
  },
};

export default function PageSante() {
  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#F1EFE8" }}>

        {/* Hero */}
        <section className="max-w-3xl mx-auto px-6 pt-16 pb-10">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#1D9E75" }}>
            Santé & complémentaire
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6" style={{ color: "#2C2C2A" }}>
            Mutuelle santé indépendant : pourquoi la Sécu ne suffit pas
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "#6B6B67" }}>
            Sans employeur pour vous imposer une mutuelle collective, vous devez choisir seul. Mais la Sécurité sociale ne rembourse pas tout, loin de là. Voici ce que les indépendants doivent vraiment savoir sur leur couverture santé.
          </p>
        </section>

        {/* Chiffres clés */}
        <section className="max-w-3xl mx-auto px-6 pb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { chiffre: "70 %", label: "Taux de remboursement moyen de la Sécu (hors optique et dentaire)" },
              { chiffre: "2 400 €", label: "Coût moyen annuel d'un reste-à-charge non couvert" },
              { chiffre: "4,8 M", label: "D'indépendants sans mutuelle adaptée à leur situation réelle" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl p-6 text-center" style={{ backgroundColor: "#FFFFFF", border: "2px solid #E8E6DF" }}>
                <p className="text-4xl font-bold mb-2" style={{ color: "#1D9E75" }}>{s.chiffre}</p>
                <p className="text-sm leading-snug" style={{ color: "#6B6B67" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Article */}
        <section className="max-w-3xl mx-auto px-6 pb-16">
          <div className="rounded-2xl p-8 sm:p-12 space-y-10" style={{ backgroundColor: "#FFFFFF", border: "2px solid #E8E6DF" }}>

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: "#2C2C2A" }}>
                Ce que rembourse vraiment la Sécu pour un indépendant
              </h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: "#4B4B47" }}>
                <p>
                  En théorie, un indépendant affilié au SSI bénéficie des mêmes droits de base qu'un salarié : consultations, médicaments, hospitalisation, maternité. En pratique, la Sécu ne couvre qu'une partie des dépenses réelles.
                </p>
                <p>
                  Pour une consultation chez un généraliste de secteur 1 (26,50 €), la Sécu rembourse environ 70 %, soit 18,55 €. Mais pour un spécialiste en secteur 2 ou 3, les dépassements d'honoraires ne sont pas remboursés et peuvent atteindre 150 à 400 € par consultation.
                </p>
                <p>
                  Sur l'optique, le remboursement Sécu est symbolique : quelques euros pour des lunettes à 200-600 €. Sur le dentaire, un implant à 1 200 € est remboursé environ 110 € par la Sécu seule. L'hospitalisation couvre le séjour, mais pas la chambre individuelle ni les dépassements du chirurgien.
                </p>
                <p>
                  La différence clé avec les salariés : ces derniers bénéficient d'une mutuelle collective obligatoire financée à 50 % minimum par l'employeur. Un indépendant doit financer seul sa complémentaire santé — mais peut, en contrepartie, déduire les cotisations de son revenu imposable via la loi Madelin (pour les TNS).
                </p>
              </div>
            </div>

            <hr style={{ borderColor: "#E8E6DF" }} />

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: "#2C2C2A" }}>
                Comment choisir sa mutuelle quand on est indépendant ?
              </h2>
              <div className="space-y-6 text-base leading-relaxed" style={{ color: "#4B4B47" }}>
                <div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: "#2C2C2A" }}>Les garanties essentielles à couvrir</h3>
                  <p>
                    Pour une mutuelle indépendant ou mutuelle freelance efficace, les priorités sont : les soins courants (médecin, médicaments), l'optique (si vous portez des lunettes ou lentilles), le dentaire (soins, prothèses), et l'hospitalisation (chambre individuelle, dépassements). Si vous avez des enfants, ajoutez l'orthodontie et les soins pédiatriques.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: "#2C2C2A" }}>Le budget selon votre profil</h3>
                  <p>Le coût d'une complémentaire santé TNS varie fortement selon l'âge et la couverture :</p>
                  <ul className="space-y-1 pl-4 mt-2">
                    <li><strong>Moins de 30 ans, célibataire :</strong> une bonne mutuelle adaptée coûte 37 à 60 €/mois</li>
                    <li><strong>35 à 45 ans, couple sans enfants :</strong> comptez 80 à 140 €/mois pour deux</li>
                    <li><strong>Famille avec enfants :</strong> 150 à 250 €/mois selon le niveau de couverture</li>
                    <li><strong>Plus de 50 ans :</strong> les primes augmentent significativement, 100 à 200 €/mois</li>
                  </ul>
                </div>

                <div className="rounded-xl p-4 space-y-2" style={{ backgroundColor: "#EFF9F5", border: "1px solid #A7F3D0" }}>
                  <p className="font-semibold text-sm" style={{ color: "#085041" }}>Nos partenaires mutuelle recommandés :</p>
                  <ul className="text-sm space-y-1" style={{ color: "#085041" }}>
                    <li><strong>Alan</strong> — Mutuelle santé 100% digitale pour indépendants, remboursements en 24h, dès 49€/mois</li>
                    <li><strong>Heyme</strong> — Idéal pour les jeunes indépendants, offres modulables, dès 37€/mois</li>
                    <li><strong>Harmonie Mutuelle</strong> — Leader en France, offres dédiées TNS et professions libérales, devis personnalisé</li>
                  </ul>
                </div>
              </div>
            </div>

            <hr style={{ borderColor: "#E8E6DF" }} />

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: "#2C2C2A" }}>
                La loi Madelin : déduire sa mutuelle de ses revenus
              </h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: "#4B4B47" }}>
                <p>
                  La loi Madelin permet aux travailleurs non salariés (TNS) de déduire leurs cotisations de complémentaire santé de leur bénéfice imposable. C'est un avantage fiscal significatif, souvent méconnu des indépendants.
                </p>
                <p>
                  <strong>Conditions :</strong> être TNS (artisan, commerçant, profession libérale — pas applicable aux gérants assimilés-salariés de SASU), souscrire un contrat « responsable et solidaire », et être à jour de ses cotisations sociales obligatoires.
                </p>
                <p>
                  <strong>Plafond de déduction 2024 :</strong> les cotisations santé Madelin sont déductibles dans la limite de 3,75 % du bénéfice + 7 % du PASS, soit environ 7 247 € par an. Concrètement, pour un TNS à 30 % de TMI qui paie 1 200 €/an de mutuelle Madelin, l'économie d'impôts est de <strong>360 €/an</strong> — soit une mutuelle qui coûte réellement 840 € après avantage fiscal.
                </p>
                <p>
                  La mutuelle auto-entrepreneur, en revanche, ne bénéficie pas des déductions Madelin (les micro-entrepreneurs ne peuvent pas déduire leurs charges). Mais les cotisations peuvent être prises en compte dans le calcul de l'impôt sur le revenu via les frais réels si vous optez pour ce régime de déclaration.
                </p>
              </div>
            </div>

            {/* Liens internes */}
            <div className="rounded-xl p-5" style={{ backgroundColor: "#F9F8F4", border: "1px solid #E8E6DF" }}>
              <p className="text-sm font-semibold mb-3" style={{ color: "#2C2C2A" }}>En lien avec la santé :</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { href: "/prevoyance", label: "Prévoyance arrêt maladie" },
                  { href: "/fiscalite", label: "Déductions Madelin" },
                  { href: "/assurance-pro", label: "RC Pro" },
                ].map((l) => (
                  <Link key={l.href} href={l.href} className="text-sm px-3 py-1.5 rounded-full border" style={{ color: "#1D9E75", borderColor: "#1D9E75" }}>
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* CTA */}
        <section className="max-w-3xl mx-auto px-6 pb-20">
          <div className="rounded-2xl px-8 py-14 text-center" style={{ backgroundColor: "#085041" }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#1D9E75" }}>Passez à l'action</p>
            <h2 className="text-2xl font-bold mb-3 text-white">
              Évalue ta couverture santé gratuitement →
            </h2>
            <p className="text-sm mb-8 max-w-md mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
              Le bilan Avenlib analyse votre couverture santé actuelle en 13 questions et vous oriente vers la mutuelle la plus adaptée à votre profil et votre statut.
            </p>
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#1D9E75" }}
            >
              Évaluer ma couverture santé <ArrowRight size={18} />
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
