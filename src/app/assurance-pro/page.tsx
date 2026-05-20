import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "RC Pro indépendant : êtes-vous vraiment couvert ?",
  description: "La RC Pro est indispensable pour tout indépendant. Découvrez les meilleures offres du marché et pourquoi votre patrimoine personnel est en jeu.",
  openGraph: {
    title: "RC Pro indépendant : êtes-vous vraiment couvert ?",
    description: "La RC Pro est indispensable pour tout indépendant. Découvrez les meilleures offres du marché.",
    url: "https://avenlib.fr/assurance-pro",
    images: [{ url: "https://avenlib.fr/logo-avenlib.png", alt: "Avenlib" }],
  },
};

export default function PageAssurancePro() {
  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#F1EFE8" }}>

        {/* Hero */}
        <section className="max-w-3xl mx-auto px-6 pt-16 pb-10">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#1D9E75" }}>
            Assurance professionnelle
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6" style={{ color: "#2C2C2A" }}>
            RC Pro indépendant : êtes-vous vraiment couvert ?
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "#6B6B67" }}>
            En cas d'erreur dans une mission, de dommage causé à un client ou de litige juridique, c'est votre patrimoine personnel qui est en jeu sans assurance RC Pro. Ce n'est pas une option, c'est une nécessité.
          </p>
        </section>

        {/* Chiffres clés */}
        <section className="max-w-3xl mx-auto px-6 pb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { chiffre: "1/3", label: "Des indépendants exercent sans RC Pro en France" },
              { chiffre: "15 000 €", label: "Montant moyen d'un sinistre RC Pro pour un consultant" },
              { chiffre: "25 €/mois", label: "Coût moyen d'une RC Pro pour un freelance — moins d'1€/jour" },
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
                Qu'est-ce que la RC Pro et pourquoi est-elle indispensable ?
              </h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: "#4B4B47" }}>
                <p>
                  La Responsabilité Civile Professionnelle (RC Pro) est une assurance qui couvre les dommages que vous pourriez causer à des tiers (clients, partenaires, tiers) dans le cadre de votre activité professionnelle. Elle prend en charge les indemnisations dues, les frais de défense juridique et les frais de procédure.
                </p>
                <p>
                  Pour un salarié, l'employeur est responsable des dommages causés dans l'exercice des fonctions. Pour un indépendant, <strong>vous êtes personnellement responsable</strong>. Sans RC Pro, en cas de condamnation, c'est votre épargne personnelle, votre voiture, voire votre résidence principale (si non protégée par une déclaration d'insaisissabilité) qui peuvent être saisis.
                </p>
                <p>
                  Les situations qui déclenchent une réclamation sont plus fréquentes qu'on ne le pense : un livrable rendu en retard qui cause une perte commerciale au client, un conseil erroné qui entraîne une mauvaise décision d'investissement, un bug informatique dans un logiciel livré, une violation accidentelle de données confidentielles, des dommages matériels causés chez un client lors d'une intervention.
                </p>
              </div>
            </div>

            <hr style={{ borderColor: "#E8E6DF" }} />

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: "#2C2C2A" }}>
                RC Pro obligatoire ou facultative selon votre activité
              </h2>
              <div className="space-y-6 text-base leading-relaxed" style={{ color: "#4B4B47" }}>
                <div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: "#2C2C2A" }}>Professions pour lesquelles la RC Pro est obligatoire</h3>
                  <p>
                    Certaines professions réglementées ont l'obligation légale de souscrire une RC Pro : les professions libérales réglementées (avocats, médecins, architectes, experts-comptables, notaires), les agents immobiliers, les professionnels du BTP (assurance décennale incluse), les agences de voyage et les organisateurs d'événements.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: "#2C2C2A" }}>Professions pour lesquelles la RC Pro est fortement recommandée</h3>
                  <p>
                    Pour les consultants, développeurs, designers, rédacteurs, photographes, coachs, formateurs, traducteurs et tous les prestataires de services intellectuels, la RC Pro n'est pas légalement obligatoire — mais elle est indispensable en pratique. De nombreux donneurs d'ordre (grandes entreprises, ETI) exigent d'ailleurs une attestation RC Pro avant de signer un contrat de prestation.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: "#2C2C2A" }}>La clause de responsabilité dans vos contrats</h3>
                  <p>
                    Même si votre contrat de prestation prévoit une clause limitant votre responsabilité au montant de la prestation, cette clause peut être annulée par un tribunal si le dommage est considéré comme important. La RC Pro est votre filet de sécurité réel.
                  </p>
                </div>
              </div>
            </div>

            <hr style={{ borderColor: "#E8E6DF" }} />

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: "#2C2C2A" }}>
                Comment choisir sa RC Pro quand on est indépendant ?
              </h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: "#4B4B47" }}>
                <p>Les critères essentiels pour choisir votre assurance RC Pro :</p>
                <ul className="space-y-2 pl-4">
                  <li><strong>Le plafond de garantie :</strong> visez au minimum 500 000 € à 1 M€ par sinistre pour une activité de conseil ou prestation intellectuelle.</li>
                  <li><strong>La franchise :</strong> montant restant à votre charge en cas de sinistre. Une franchise de 500 à 1 500 € est standard.</li>
                  <li><strong>Les garanties incluses :</strong> dommages immatériels (les plus courants pour les prestataires intellectuels), dommages matériels, dommages corporels, cyber-risques.</li>
                  <li><strong>La protection juridique :</strong> couvre vos frais d'avocat en cas de litige. Souvent disponible en option ou incluse.</li>
                  <li><strong>Le délai de souscription :</strong> privilégiez les assureurs qui émettent une attestation immédiate — certains clients en ont besoin avant de signer.</li>
                </ul>

                <div className="rounded-xl p-4 space-y-2" style={{ backgroundColor: "#EFF9F5", border: "1px solid #A7F3D0" }}>
                  <p className="font-semibold text-sm" style={{ color: "#085041" }}>Nos partenaires RC Pro recommandés :</p>
                  <ul className="text-sm space-y-1" style={{ color: "#085041" }}>
                    <li><strong>Hiscox</strong> — Leader RC Pro professions libérales et cyber-risques, devis personnalisé en ligne</li>
                    <li><strong>Simplis</strong> — RC Pro consultants et freelances, souscription 100% en ligne, dès 9,99€/mois</li>
                  </ul>
                </div>
              </div>
            </div>

            <hr style={{ borderColor: "#E8E6DF" }} />

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: "#2C2C2A" }}>
                Combien coûte une RC Pro indépendant ?
              </h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: "#4B4B47" }}>
                <p>
                  Le coût d'une RC Pro dépend de votre secteur d'activité (risque plus ou moins élevé), votre chiffre d'affaires annuel, le plafond de garantie choisi et les options sélectionnées (cyber-risques, protection juridique…).
                </p>
                <p>
                  À titre indicatif :
                </p>
                <ul className="space-y-1 pl-4">
                  <li><strong>Consultant, développeur, designer :</strong> 150 à 400 €/an (soit 12 à 33 €/mois)</li>
                  <li><strong>Formateur, coach, rédacteur :</strong> 100 à 250 €/an</li>
                  <li><strong>Architecte, expert-comptable (réglementé) :</strong> 800 à 2 000 €/an</li>
                  <li><strong>Professions du BTP :</strong> 1 500 à 5 000 €/an (assurance décennale incluse)</li>
                </ul>
                <p className="mt-2">
                  Pour un freelance tech ou consultant qui facture 50 000 à 100 000 € par an, payer 200 à 300 €/an pour une RC Pro qui couvre jusqu'à 1 M€ de responsabilité est l'un des meilleurs rapports protection/coût du marché.
                </p>
              </div>
            </div>

            {/* Liens internes */}
            <div className="rounded-xl p-5" style={{ backgroundColor: "#F9F8F4", border: "1px solid #E8E6DF" }}>
              <p className="text-sm font-semibold mb-3" style={{ color: "#2C2C2A" }}>En lien avec l'assurance pro :</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { href: "/prevoyance", label: "Prévoyance arrêt maladie" },
                  { href: "/banque", label: "Banque pro" },
                  { href: "/fiscalite", label: "Optimisation fiscale" },
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
              Vérifie ta couverture RC Pro gratuitement →
            </h2>
            <p className="text-sm mb-8 max-w-md mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
              Le bilan Avenlib identifie si vous êtes correctement couvert en RC Pro et vous oriente vers les meilleures offres adaptées à votre activité, gratuitement.
            </p>
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#1D9E75" }}
            >
              Faire mon bilan gratuit <ArrowRight size={18} />
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
