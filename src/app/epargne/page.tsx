import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Épargne et investissement pour indépendants : par où commencer ?",
  description: "PER, assurance-vie, PEA : les meilleures solutions d'épargne et d'investissement pour les freelances et indépendants.",
  openGraph: {
    title: "Épargne et investissement pour indépendants : par où commencer ?",
    description: "PER, assurance-vie, PEA : les meilleures solutions d'épargne pour les freelances.",
    url: "https://avenlib.fr/epargne",
    images: [{ url: "https://avenlib.fr/logo-avenlib.png", alt: "Avenlib" }],
  },
};

export default function PageEpargne() {
  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#F1EFE8" }}>

        {/* Hero */}
        <section className="max-w-3xl mx-auto px-6 pt-16 pb-10">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#1D9E75" }}>
            Épargne & investissement
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6" style={{ color: "#2C2C2A" }}>
            Épargne et investissement pour indépendants : par où commencer ?
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "#6B6B67" }}>
            Un salarié dispose d'un filet de sécurité : chômage, arrêt maladie, épargne salariale. Un indépendant n'a rien de tout cela. Construire une épargne solide n'est pas un luxe, c'est une nécessité structurelle.
          </p>
        </section>

        {/* Chiffres clés */}
        <section className="max-w-3xl mx-auto px-6 pb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { chiffre: "3-6 mois", label: "De charges à couvrir avec votre épargne de précaution" },
              { chiffre: "72 %", label: "Des freelances n'ont pas de stratégie d'investissement définie" },
              { chiffre: "+30 %", label: "D'économie fiscale possible avec l'assurance vie et le PER combinés" },
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
                L'épargne de précaution : la priorité absolue
              </h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: "#4B4B47" }}>
                <p>
                  Avant tout investissement, tout indépendant doit constituer une <strong>épargne de précaution</strong> : un matelas financier disponible immédiatement pour faire face aux aléas de l'activité indépendante. Perte d'un client majeur, creux d'activité, imprévu fiscal, retard de paiement d'un gros client — sans épargne de précaution, chacune de ces situations peut mettre en danger votre activité et votre stabilité personnelle.
                </p>
                <p>
                  La règle classique : <strong>3 à 6 mois de charges</strong> (loyer, charges fixes, cotisations sociales minimales) placés sur un compte disponible immédiatement — Livret A, LDDS, ou compte courant rémunéré. Cette somme ne doit pas être investie en Bourse : sa vocation est la disponibilité immédiate, pas le rendement.
                </p>
                <p>
                  Pour un freelance avec 3 000 € de charges mensuelles, l'épargne de précaution cible est de 9 000 à 18 000 €. C'est le socle sur lequel tout le reste se construit.
                </p>
              </div>
            </div>

            <hr style={{ borderColor: "#E8E6DF" }} />

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: "#2C2C2A" }}>
                Les meilleures solutions d'épargne pour indépendants
              </h2>
              <div className="space-y-6 text-base leading-relaxed" style={{ color: "#4B4B47" }}>
                <div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: "#2C2C2A" }}>Le PER : épargne et optimisation fiscale</h3>
                  <p>
                    Le Plan d'Épargne Retraite est à la fois un outil d'épargne long terme et un levier fiscal puissant. Les versements sont déductibles du revenu imposable (jusqu'à 10 % du bénéfice net, plafonné à 32 908 € en 2024), ce qui réduit immédiatement votre imposition. En savoir plus sur <Link href="/retraite" style={{ color: "#1D9E75", textDecoration: "underline" }}>la retraite des indépendants et le PER</Link>.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: "#2C2C2A" }}>L'assurance vie : flexibilité et fiscalité douce</h3>
                  <p>
                    L'assurance vie est l'enveloppe d'investissement la plus populaire en France, et pour de bonnes raisons. Elle permet d'investir dans des fonds en euros (capital garanti, rendement faible) et des unités de compte (actions, obligations, SCPI) selon votre profil de risque. Après 8 ans de détention, les plus-values bénéficient d'un abattement fiscal de 4 600 € par an (9 200 € pour un couple) — un avantage significatif pour un investisseur long terme.
                  </p>
                  <p className="mt-2">
                    Pour un indépendant, l'assurance vie présente un autre avantage : la transmission. En cas de décès, le capital est versé aux bénéficiaires désignés hors succession, avec une fiscalité très avantageuse. C'est aussi un outil de <Link href="/retraite" style={{ color: "#1D9E75", textDecoration: "underline" }}>préparation à la retraite</Link> complémentaire du PER.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: "#2C2C2A" }}>Le PEA : investir en actions avec une fiscalité allégée</h3>
                  <p>
                    Le Plan d'Épargne en Actions permet d'investir en actions européennes avec une exonération totale d'impôt sur les plus-values après 5 ans de détention (hors prélèvements sociaux à 17,2 %). Plafonné à 150 000 € de versements, le PEA est idéal pour les indépendants qui veulent investir à long terme avec une fiscalité maîtrisée.
                  </p>
                </div>

                <div className="rounded-xl p-4 space-y-2" style={{ backgroundColor: "#EFF9F5", border: "1px solid #A7F3D0" }}>
                  <p className="font-semibold text-sm" style={{ color: "#085041" }}>Nos partenaires épargne recommandés :</p>
                  <ul className="text-sm space-y-1" style={{ color: "#085041" }}>
                    <li><strong>Nalo</strong> — Gestion de patrimoine personnalisée, assurance vie pilotée, frais max 1,6%/an</li>
                    <li><strong>Ramify</strong> — PER et assurance vie haut de gamme, gestion pilotée, frais 1,3 à 1,6%/an</li>
                    <li><strong>Yomoni</strong> — Gestion pilotée accessible, PEA et assurance vie, frais 0,6 à 1,6%/an</li>
                  </ul>
                </div>
              </div>
            </div>

            <hr style={{ borderColor: "#E8E6DF" }} />

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: "#2C2C2A" }}>
                Quelle stratégie d'épargne pour un indépendant ?
              </h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: "#4B4B47" }}>
                <p>
                  Il n'existe pas de stratégie universelle, mais un ordre de priorité logique s'impose pour la plupart des indépendants :
                </p>
                <ol className="space-y-3 pl-4 list-decimal">
                  <li>
                    <strong>Constituer l'épargne de précaution</strong> (3 à 6 mois de charges sur un Livret A ou LDDS)
                  </li>
                  <li>
                    <strong>Ouvrir un PER</strong> si votre TMI est à 30 % ou plus — le gain fiscal immédiat est significatif
                  </li>
                  <li>
                    <strong>Ouvrir une assurance vie</strong> pour l'épargne long terme flexible et la préparation de la retraite
                  </li>
                  <li>
                    <strong>Ouvrir un PEA</strong> pour l'investissement en actions avec exonération fiscale à terme
                  </li>
                  <li>
                    <strong>Diversifier</strong> selon votre profil de risque et vos objectifs (SCPI, cryptoactifs, immobilier locatif…)
                  </li>
                </ol>
                <p>
                  La gestion pilotée (proposée par Nalo, Ramify, Yomoni) est une excellente option pour les indépendants qui n'ont pas le temps de gérer activement leurs investissements : un algorithme détermine la répartition optimale selon votre profil de risque et rééquilibre automatiquement le portefeuille.
                </p>
              </div>
            </div>

            {/* Liens internes */}
            <div className="rounded-xl p-5" style={{ backgroundColor: "#F9F8F4", border: "1px solid #E8E6DF" }}>
              <p className="text-sm font-semibold mb-3" style={{ color: "#2C2C2A" }}>En lien avec l'épargne :</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { href: "/retraite", label: "PER & retraite" },
                  { href: "/fiscalite", label: "Optimisation fiscale" },
                  { href: "/credit", label: "Crédit immobilier" },
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
              Évalue ta stratégie d'épargne gratuitement →
            </h2>
            <p className="text-sm mb-8 max-w-md mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
              Le bilan Avenlib analyse votre situation financière globale et vous oriente vers les meilleures solutions d'épargne et d'investissement adaptées à votre profil, gratuitement.
            </p>
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#1D9E75" }}
            >
              Faire mon bilan épargne gratuit <ArrowRight size={18} />
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
