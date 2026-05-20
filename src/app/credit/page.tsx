import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Crédit immobilier freelance : comment convaincre les banques ?",
  description: "Freelance et propriétaire, c'est possible. Nos partenaires Pretto et Defacto comprennent votre statut et optimisent votre dossier.",
  openGraph: {
    title: "Crédit immobilier freelance : comment convaincre les banques ?",
    description: "Freelance et propriétaire, c'est possible. Nos partenaires comprennent votre statut.",
    url: "https://avenlib.fr/credit",
    images: [{ url: "https://avenlib.fr/logo-avenlib.png", alt: "Avenlib" }],
  },
};

export default function PageCredit() {
  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#F1EFE8" }}>

        {/* Hero */}
        <section className="max-w-3xl mx-auto px-6 pt-16 pb-10">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#1D9E75" }}>
            Crédit & financement
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6" style={{ color: "#2C2C2A" }}>
            Crédit immobilier freelance : comment convaincre les banques ?
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "#6B6B67" }}>
            Les banques traditionnelles sont conçues pour les salariés. Revenus variables, absence de bulletins de paie, statut atypique — autant de raisons qui compliquent les dossiers des indépendants. Pourtant, freelance et propriétaire, c'est tout à fait possible.
          </p>
        </section>

        {/* Chiffres clés */}
        <section className="max-w-3xl mx-auto px-6 pb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { chiffre: "40 %", label: "Des indépendants refusés ou compliqués par leur banque principale" },
              { chiffre: "3 ans", label: "D'historique souvent exigé par les banques classiques" },
              { chiffre: "2 min", label: "Pour obtenir une simulation chez les acteurs spécialisés" },
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
                Pourquoi les banques compliquent le crédit immo pour les indépendants
              </h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: "#4B4B47" }}>
                <p>
                  Le système bancaire français a été conçu autour du modèle du salarié en CDI : revenus fixes, stables et vérifiables via les bulletins de paie. Les algorithmes d'octroi de crédit des banques traditionnelles peinent à évaluer la solvabilité d'un freelance, dont les revenus peuvent varier de 20 à 50 % d'une année sur l'autre — même si la tendance est à la hausse.
                </p>
                <p>
                  Les principaux obstacles auxquels font face les indépendants pour un crédit immobilier freelance : l'absence de bulletins de paie (remplacés par des avis d'imposition et des bilans comptables), la variabilité des revenus perçue comme un risque, la demande de 3 ans d'ancienneté minimum pour la plupart des banques, et la difficulté à justifier les revenus en micro-entrepreneur (l'abattement forfaitaire peut masquer le revenu réel).
                </p>
                <p>
                  La bonne nouvelle : un nombre croissant d'acteurs spécialisés et de courtiers comprennent le profil des travailleurs indépendants et savent construire un dossier convaincant — ou orienter vers les banques les plus ouvertes à ces profils.
                </p>
              </div>
            </div>

            <hr style={{ borderColor: "#E8E6DF" }} />

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: "#2C2C2A" }}>
                Comment optimiser son dossier de crédit immobilier en tant qu'indépendant ?
              </h2>
              <div className="space-y-6 text-base leading-relaxed" style={{ color: "#4B4B47" }}>
                <div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: "#2C2C2A" }}>Les documents qui font la différence</h3>
                  <p>
                    Pour un dossier crédit freelance solide, préparez : les 2 ou 3 derniers avis d'imposition (indiquant le revenu net imposable réel), les 3 derniers bilans comptables (si vous êtes au réel), vos relevés de compte des 6 derniers mois (montrant une trésorerie régulière), vos 3 derniers relevés URSSAF (attestant de vos revenus déclarés), et si possible une attestation de votre expert-comptable sur la stabilité de votre activité.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: "#2C2C2A" }}>L'apport personnel : votre meilleur atout</h3>
                  <p>
                    Un apport de 20 à 30 % du prix du bien (contre 10 % pour un salarié) rassure considérablement les banques sur un dossier freelance. Si votre <Link href="/epargne" style={{ color: "#1D9E75", textDecoration: "underline" }}>épargne</Link> le permet, augmenter l'apport peut débloquer des taux plus favorables et élargir le nombre de banques disposées à étudier votre dossier.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: "#2C2C2A" }}>La régularité, pas le niveau absolu</h3>
                  <p>
                    Les banques s'intéressent moins au montant absolu de vos revenus qu'à leur régularité. Un freelance qui gagne 4 000 € net/mois avec des revenus stables sur 3 ans sera souvent mieux traité qu'un salarié qui gagne 5 000 €/mois mais vient d'arriver dans son entreprise. Pensez à mettre en avant la durée de vos contrats, la diversification de votre portefeuille clients, et la croissance régulière de votre chiffre d'affaires.
                  </p>
                </div>
              </div>
            </div>

            <hr style={{ borderColor: "#E8E6DF" }} />

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: "#2C2C2A" }}>
                Courtiers et acteurs spécialisés pour freelances
              </h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: "#4B4B47" }}>
                <p>
                  La meilleure stratégie pour un indépendant qui veut obtenir un crédit immobilier est de passer par un courtier spécialisé dans les profils atypiques. Ces courtiers connaissent les banques ouvertes aux freelances, savent mettre en valeur votre dossier et négocient les taux en votre nom — gratuitement pour vous, puisqu'ils sont rémunérés par les banques à la signature.
                </p>

                <div className="rounded-xl p-4 space-y-2" style={{ backgroundColor: "#EFF9F5", border: "1px solid #A7F3D0" }}>
                  <p className="font-semibold text-sm" style={{ color: "#085041" }}>Nos partenaires crédit recommandés :</p>
                  <ul className="text-sm space-y-1" style={{ color: "#085041" }}>
                    <li><strong>Pretto</strong> — Courtier crédit immo spécialisé dans les dossiers indépendants, gratuit, commission à la signature</li>
                    <li><strong>Defacto</strong> — Financement rapide de trésorerie freelance, sans abonnement, taux 0,05%/jour</li>
                  </ul>
                </div>
              </div>
            </div>

            <hr style={{ borderColor: "#E8E6DF" }} />

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: "#2C2C2A" }}>
                Financement de trésorerie : les solutions pour les creux d'activité
              </h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: "#4B4B47" }}>
                <p>
                  Au-delà du crédit immobilier, les indépendants ont parfois besoin de financer leur trésorerie sur le court terme : en attente d'un règlement client, pour avancer un gros projet, ou pour traverser un creux d'activité. Les solutions classiques (découvert bancaire, crédit personnel) sont souvent inadaptées et coûteuses.
                </p>
                <p>
                  Des acteurs comme Defacto analysent vos données réelles (factures, relevés URSSAF, compte bancaire) et peuvent mettre à disposition du financement en 24 à 48 heures, sans garantie personnelle et sans abonnement. C'est une alternative efficace à l'affacturage traditionnel pour les freelances qui ont des délais de paiement longs.
                </p>
                <p>
                  L'essentiel reste de ne pas confondre besoin de trésorerie ponctuel et problème structurel de l'activité. Si vous avez régulièrement besoin de financement externe pour couvrir vos charges, c'est le signe qu'une <Link href="/epargne" style={{ color: "#1D9E75", textDecoration: "underline" }}>épargne de précaution</Link> insuffisante — et un problème à traiter en priorité.
                </p>
              </div>
            </div>

            {/* Liens internes */}
            <div className="rounded-xl p-5" style={{ backgroundColor: "#F9F8F4", border: "1px solid #E8E6DF" }}>
              <p className="text-sm font-semibold mb-3" style={{ color: "#2C2C2A" }}>En lien avec le crédit :</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { href: "/epargne", label: "Épargne & apport" },
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
              Évalue ta capacité d'emprunt gratuitement →
            </h2>
            <p className="text-sm mb-8 max-w-md mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
              Le bilan Avenlib analyse votre profil financier et vous oriente vers les meilleures solutions de financement adaptées à votre statut d'indépendant, gratuitement.
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
