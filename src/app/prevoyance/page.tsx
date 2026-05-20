import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Prévoyance indépendant : que se passe-t-il en arrêt maladie ?",
  description: "La Sécu vous verse 22€/jour en arrêt maladie. Découvrez comment vous protéger efficacement avec les meilleures solutions pour indépendants.",
  openGraph: {
    title: "Prévoyance indépendant : que se passe-t-il en arrêt maladie ?",
    description: "La Sécu vous verse 22€/jour en arrêt maladie. Découvrez comment vous protéger efficacement.",
    url: "https://avenlib.fr/prevoyance",
    images: [{ url: "https://avenlib.fr/logo-avenlib.png", alt: "Avenlib" }],
  },
};

export default function PagePrevoyance() {
  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#F1EFE8" }}>

        {/* Hero */}
        <section className="max-w-3xl mx-auto px-6 pt-16 pb-10">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#1D9E75" }}>
            Prévoyance & protection
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6" style={{ color: "#2C2C2A" }}>
            Prévoyance indépendant : que se passe-t-il en arrêt maladie ?
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "#6B6B67" }}>
            Un salarié malade est indemnisé dès le 4e jour. Un indépendant, lui, peut attendre 3 mois sans rien. Cette réalité, peu de gens la connaissent — jusqu'au jour où elle les touche.
          </p>
        </section>

        {/* Chiffres clés */}
        <section className="max-w-3xl mx-auto px-6 pb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { chiffre: "22 €/j", label: "Indemnité journalière versée par le SSI après le délai de carence" },
              { chiffre: "90 jours", label: "De carence avant toute indemnisation pour les TNS au SSI" },
              { chiffre: "620 €", label: "Coût annuel moyen d'une prévoyance sérieuse — moins de 2€/jour" },
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
                La réalité brutale de l'arrêt maladie pour un indépendant
              </h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: "#4B4B47" }}>
                <p>
                  Quand un salarié tombe malade, la Sécurité sociale prend le relais dès le 4e jour. Son employeur peut même maintenir tout ou partie de son salaire. Pour un travailleur indépendant, la réalité est radicalement différente : le régime SSI (Sécurité sociale des indépendants) impose un <strong>délai de carence de 3 jours</strong> pour les accidents, mais en pratique, les indemnités journalières ne sont versées qu'après un délai effectif pouvant aller jusqu'à plusieurs semaines selon le traitement administratif.
                </p>
                <p>
                  Pire encore pour les micro-entrepreneurs et auto-entrepreneurs qui relèvent de la même caisse mais dont les droits sont directement liés au chiffre d'affaires déclaré. En dessous d'un certain seuil de revenus, les indemnités journalières peuvent être inférieures à 22 €/jour, voire nulles pour ceux qui ont déclaré peu ou pas de revenus l'année précédente.
                </p>
                <p>
                  L'impact financier est immédiat et brutal : les charges fixes continuent (loyer, abonnements, cotisations sociales minimales), le chiffre d'affaires s'arrête net, et le revenu de remplacement est dérisoire. Un arrêt de 2 mois peut coûter 8 000 à 15 000 € de revenus perdus à un freelance tech ou consultant facturant 700 €/jour.
                </p>
              </div>
            </div>

            <hr style={{ borderColor: "#E8E6DF" }} />

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: "#2C2C2A" }}>
                Les différents types de prévoyance pour indépendants
              </h2>
              <div className="space-y-6 text-base leading-relaxed" style={{ color: "#4B4B47" }}>
                <div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: "#2C2C2A" }}>Prévoyance arrêt maladie (indemnités journalières)</h3>
                  <p>
                    C'est la couverture la plus urgente pour tout indépendant. Un contrat de prévoyance arrêt maladie vous verse des <strong>indemnités journalières complémentaires</strong> en cas d'arrêt de travail, en complément (ou à la place) des maigres indemnités du SSI. Vous choisissez votre niveau de couverture : de 50 à 300 €/jour selon votre revenu, avec un délai de franchise paramétrable (15, 30, 90 jours).
                  </p>
                  <p className="mt-2">
                    La prévoyance TNS est déductible fiscalement pour les TNS (artisans, commerçants, professions libérales) via la loi Madelin, ce qui réduit significativement son coût réel.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: "#2C2C2A" }}>Prévoyance décès / invalidité</h3>
                  <p>
                    La prévoyance décès/invalidité couvre les conséquences d'un accident ou d'une maladie grave : versement d'un capital décès à vos proches, rente invalidité en cas d'incapacité permanente de travail. Si vous avez des enfants ou un emprunt immobilier en cours, c'est indispensable. Les régimes obligatoires des indépendants prévoient une couverture minimale, mais largement insuffisante pour maintenir le niveau de vie d'une famille.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: "#2C2C2A" }}>Les garanties indispensables à vérifier</h3>
                  <p>
                    Avant de souscrire, vérifiez systématiquement : le <strong>délai de franchise</strong> (combien de jours avant le premier versement), le <strong>montant des indemnités journalières</strong>, les <strong>exclusions de garantie</strong> (maladies préexistantes, certains sports), et la <strong>durée de versement</strong> (1 an, 3 ans, jusqu'à 65 ans). Un contrat pas cher avec un délai de franchise de 90 jours vous laissera sans revenu trois mois entiers.
                  </p>
                </div>
              </div>
            </div>

            <hr style={{ borderColor: "#E8E6DF" }} />

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: "#2C2C2A" }}>
                Comment choisir sa prévoyance quand on est indépendant ?
              </h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: "#4B4B47" }}>
                <p>
                  Le marché de la prévoyance indépendant est vaste et les contrats très hétérogènes. Voici les critères essentiels pour choisir :
                </p>
                <ul className="space-y-2 pl-4">
                  <li><strong>Le niveau d'indemnisation :</strong> visez au minimum 50 à 70 % de votre revenu net quotidien moyen.</li>
                  <li><strong>Le délai de franchise :</strong> si vous avez une épargne de précaution de 3 mois, une franchise à 90 jours est suffisante (et moins chère). Sinon, optez pour 15 ou 30 jours.</li>
                  <li><strong>La couverture invalidité :</strong> vérifiez le taux d'invalidité à partir duquel la rente est versée (50 % ou 33 %).</li>
                  <li><strong>La déductibilité Madelin :</strong> si vous êtes TNS, choisissez un contrat Madelin pour bénéficier de la déductibilité fiscale.</li>
                </ul>
                <div className="rounded-xl p-4 space-y-2" style={{ backgroundColor: "#EFF9F5", border: "1px solid #A7F3D0" }}>
                  <p className="font-semibold text-sm" style={{ color: "#085041" }}>Nos partenaires prévoyance recommandés :</p>
                  <ul className="text-sm space-y-1" style={{ color: "#085041" }}>
                    <li><strong>Wemind</strong> — Prévoyance conçue pour les freelances, devis en 2 minutes, entre 50 et 100€/mois</li>
                    <li><strong>April</strong> — Prévoyance arrêt maladie pour indépendants, dès 30€/mois</li>
                    <li><strong>Swiss Life</strong> — Solutions prévoyance complètes TNS, entre 40 et 100€/mois</li>
                  </ul>
                </div>
              </div>
            </div>

            <hr style={{ borderColor: "#E8E6DF" }} />

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: "#2C2C2A" }}>
                Combien coûte une bonne prévoyance indépendant ?
              </h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: "#4B4B47" }}>
                <p>
                  Le coût d'une prévoyance arrêt maladie pour un indépendant dépend principalement de votre âge, votre secteur d'activité (risque élevé ou non), le niveau d'indemnisation choisi et le délai de franchise sélectionné.
                </p>
                <p>
                  À titre indicatif, pour un freelance de 35 ans en activité de conseil (risque faible), une couverture à 100 €/jour avec franchise 30 jours coûte généralement entre <strong>50 et 80 €/mois</strong>. Pour un artisan ou un indépendant avec des activités physiques, la prime peut monter à 100-120 €/mois.
                </p>
                <p>
                  Rapporté à ce qu'un arrêt de 2 mois peut vous coûter (8 000 à 15 000 € de chiffre d'affaires perdu), une prévoyance à 60 €/mois est l'un des investissements les plus rentables qu'un indépendant puisse faire. D'autant que pour les TNS, cette dépense est déductible de votre bénéfice imposable via le contrat Madelin.
                </p>
              </div>
            </div>

            {/* Liens internes */}
            <div className="rounded-xl p-5" style={{ backgroundColor: "#F9F8F4", border: "1px solid #E8E6DF" }}>
              <p className="text-sm font-semibold mb-3" style={{ color: "#2C2C2A" }}>En lien avec la prévoyance :</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { href: "/sante", label: "Mutuelle santé" },
                  { href: "/retraite", label: "Retraite indépendant" },
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
              Évalue ta prévoyance gratuitement →
            </h2>
            <p className="text-sm mb-8 max-w-md mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
              Le bilan Avenlib analyse votre couverture prévoyance actuelle en 13 questions et vous oriente vers les contrats les mieux adaptés à votre statut et vos revenus, gratuitement.
            </p>
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#1D9E75" }}
            >
              Évaluer ma prévoyance gratuitement <ArrowRight size={18} />
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
