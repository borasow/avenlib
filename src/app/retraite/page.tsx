import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Retraite des indépendants : combien toucherez-vous vraiment ?",
  description: "Micro-entrepreneur, EURL, SASU : découvrez votre pension estimée et les solutions pour améliorer votre retraite.",
  openGraph: {
    title: "Retraite des indépendants : combien toucherez-vous vraiment ?",
    description: "Micro-entrepreneur, EURL, SASU : découvrez votre pension estimée et les solutions pour améliorer votre retraite.",
    url: "https://avenlib.fr/retraite",
    images: [{ url: "https://avenlib.fr/logo-avenlib.png", alt: "Avenlib" }],
  },
};

export default function PageRetraite() {
  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#F1EFE8" }}>

        {/* Hero */}
        <section className="max-w-3xl mx-auto px-6 pt-16 pb-10">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#1D9E75" }}>
            Retraite & indépendants
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6" style={{ color: "#2C2C2A" }}>
            Retraite des indépendants : combien toucherez-vous vraiment ?
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "#6B6B67" }}>
            Retraite freelance, retraite micro-entrepreneur, retraite auto-entrepreneur : les indépendants cotisent chaque année, mais les pensions perçues sont souvent deux fois inférieures à celles des salariés. Voici pourquoi, et surtout comment y remédier.
          </p>
        </section>

        {/* Chiffres clés */}
        <section className="max-w-3xl mx-auto px-6 pb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { chiffre: "620 €", label: "Pension mensuelle moyenne d'un indépendant (régime SSI)" },
              { chiffre: "−40 %", label: "De moins qu'un salarié à revenus équivalents" },
              { chiffre: "40 %", label: "Des indépendants sans aucune épargne retraite complémentaire" },
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
                Pourquoi les indépendants sont mal couverts à la retraite
              </h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: "#4B4B47" }}>
                <p>
                  En France, la retraite des travailleurs indépendants repose sur des régimes obligatoires spécifiques : le SSI (Sécurité sociale des indépendants) pour les artisans et commerçants, la CIPAV pour les professions libérales, ou encore l'URSSAF pour les auto-entrepreneurs. Ces régimes fonctionnent sur le principe de la répartition, comme celui des salariés, mais avec une différence majeure : les cotisations sont calculées sur des revenus souvent volatils et les taux de remplacement sont structurellement plus faibles.
                </p>
                <p>
                  Un salarié peut espérer percevoir environ 50 à 75 % de son dernier salaire à la retraite. Pour un indépendant, ce taux tombe souvent en dessous de 30 à 40 %. Concrètement, un freelance qui gagne 4 000 € nets par mois aujourd'hui peut se retrouver avec moins de 1 200 € de pension — soit une chute brutale de son niveau de vie.
                </p>
                <p>
                  Deuxième problème : les années de faibles revenus pèsent lourd. Un auto-entrepreneur ou un micro-entrepreneur qui débute avec un petit chiffre d'affaires accumule très peu de trimestres validés et de points retraite. Les premières années d'activité hypothèquent la pension future de façon durable.
                </p>
                <p>
                  Troisième problème : l'absence de retraite complémentaire obligatoire comparable à celle des salariés (AGIRC-ARRCO). Les indépendants doivent, par eux-mêmes, mettre en place une épargne complémentaire — ce que près de 40 % d'entre eux ne font pas, faute d'information ou de temps.
                </p>
              </div>
            </div>

            <hr style={{ borderColor: "#E8E6DF" }} />

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: "#2C2C2A" }}>
                Combien touchera un freelance selon son statut ?
              </h2>
              <div className="space-y-6 text-base leading-relaxed" style={{ color: "#4B4B47" }}>
                <div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: "#2C2C2A" }}>Retraite micro-entrepreneur et auto-entrepreneur</h3>
                  <p>
                    La retraite auto-entrepreneur est calculée sur la base du chiffre d'affaires déclaré, après application d'un abattement forfaitaire. Un micro-entrepreneur qui déclare 35 000 € de CA (services) cotise sur environ 22 750 € de revenus nets. Après 40 ans de carrière à ce niveau, la pension estimée tourne autour de <strong>620 à 850 € par mois</strong>. C'est la pension indépendant la plus faible du marché — suffisante pour survivre, insuffisante pour vivre.
                  </p>
                  <p className="mt-2">
                    La retraite micro-entrepreneur souffre d'une autre particularité : le plafond de CA du régime (77 700 € pour les services en 2024) limite mécaniquement la base de cotisation. Un freelance qui dépasse ce seuil et reste en micro paie des cotisations sans bénéficier de droits supplémentaires au-delà.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: "#2C2C2A" }}>Retraite EURL et gérant majoritaire de SARL</h3>
                  <p>
                    La retraite EURL est calculée sur le bénéfice net déclaré (revenu professionnel). Un gérant majoritaire qui se verse 50 000 € de rémunération annuelle cotise davantage qu'un micro-entrepreneur au même revenu, et accumule plus de droits. La pension estimée après 40 ans à ce niveau dépasse généralement <strong>1 050 à 1 400 € par mois</strong>. Mais attention : si le gérant opte pour une rémunération faible et des dividendes importants, les droits retraite s'effondrent.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: "#2C2C2A" }}>Retraite SASU : le cas particulier</h3>
                  <p>
                    Le président de SASU est assimilé-salarié : il cotise au régime général comme un cadre, avec des droits bien supérieurs à ceux d'un TNS. En contrepartie, les cotisations sociales sont beaucoup plus élevées. Mais si le dirigeant se rémunère majoritairement en dividendes, il perd presque tous ses droits à la retraite. Un président de SASU qui ne se verse aucun salaire pendant 10 ans aura une pension... proche de zéro.
                  </p>
                </div>

                <p>
                  Pour obtenir une estimation fiable, consultez votre relevé de carrière sur <strong>info-retraite.fr</strong>, qui agrège tous les régimes auxquels vous avez cotisé. Ou faites le <Link href="/diagnostic" style={{ color: "#1D9E75", textDecoration: "underline" }}>bilan Avenlib</Link> qui calcule une estimation instantanée selon votre statut et vos revenus.
                </p>
              </div>
            </div>

            <hr style={{ borderColor: "#E8E6DF" }} />

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: "#2C2C2A" }}>
                Les solutions pour améliorer sa retraite en tant qu'indépendant
              </h2>
              <div className="space-y-6 text-base leading-relaxed" style={{ color: "#4B4B47" }}>
                <div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: "#2C2C2A" }}>Le PER indépendant : le levier numéro 1</h3>
                  <p>
                    Le <strong>PER indépendant</strong> (Plan d'Épargne Retraite) est aujourd'hui le dispositif le plus efficace pour un freelance ou un auto-entrepreneur. Il permet de déduire les versements de son revenu imposable — jusqu'à 10 % du bénéfice imposable, plafonné à 32 908 € en 2024 — ce qui réduit immédiatement la facture fiscale tout en constituant un capital pour la retraite.
                  </p>
                  <p className="mt-2">
                    Exemple concret : un indépendant à 30 % de TMI qui verse 5 000 € sur son PER économise 1 500 € d'impôts cette année, tout en se constituant un capital retraite. La déduction est applicable dès la première année, sans plafond de revenus minimum.
                  </p>
                  <p className="mt-2">
                    À la retraite, le capital peut être récupéré en rente viagère ou en capital (depuis la loi PACTE de 2019). Le PER retraite freelance est donc à la fois un outil d'optimisation fiscale à court terme et un filet de sécurité à long terme.
                  </p>
                  <div className="mt-4 rounded-xl p-4 space-y-2" style={{ backgroundColor: "#EFF9F5", border: "1px solid #A7F3D0" }}>
                    <p className="font-semibold text-sm" style={{ color: "#085041" }}>Nos partenaires PER recommandés :</p>
                    <ul className="text-sm space-y-1" style={{ color: "#085041" }}>
                      <li><strong>Caravel</strong> — Spécialiste PER indépendants, dès 50€/mois, frais 1,38%/an</li>
                      <li><strong>Linxea</strong> — PER sans frais d'entrée, large choix de fonds, frais 0,5%/an</li>
                      <li><strong>Yomoni</strong> — Gestion pilotée, dès 1 000€, frais 0,6 à 1,6%/an</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: "#2C2C2A" }}>L'assurance vie et le PEA en complément</h3>
                  <p>
                    En complément du PER, l'assurance vie reste un incontournable pour les indépendants souhaitant constituer une épargne flexible. Elle n'offre pas de déduction fiscale à l'entrée, mais bénéficie d'une fiscalité allégée après 8 ans de détention et d'une grande souplesse de retrait. Le PEA, lui, permet d'investir en actions européennes avec une exonération d'impôt sur les plus-values après 5 ans.
                  </p>
                </div>
              </div>
            </div>

            <hr style={{ borderColor: "#E8E6DF" }} />

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: "#2C2C2A" }}>
                Quand commencer à préparer sa retraite ?
              </h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: "#4B4B47" }}>
                <p>
                  La réponse universelle est : maintenant. Mais les priorités varient selon l'âge.
                </p>
                <p>
                  <strong>À 30 ans :</strong> Le capital temps est votre meilleur allié. Un versement de 200 € par mois sur un PER à 30 ans peut générer, avec un rendement moyen de 5 %, un capital de plus de 160 000 € à 65 ans. Commencer à 45 ans avec les mêmes versements n'en produit que 85 000 €. La différence est spectaculaire grâce aux intérêts composés.
                </p>
                <p>
                  <strong>À 40 ans :</strong> Il est encore temps d'agir efficacement. Le PER devient particulièrement intéressant si votre tranche marginale d'imposition est à 30 % ou plus — la déduction fiscale « subventionne » votre épargne retraite.
                </p>
                <p>
                  <strong>À 50 ans :</strong> L'urgence est réelle. Deux leviers à activer immédiatement : maximiser les versements sur le PER (les plafonds non utilisés des 3 dernières années sont reportables) et consulter son relevé de carrière pour identifier les trimestres manquants éventuels.
                </p>
                <p>
                  Quelle que soit votre situation, la première étape est de connaître précisément votre pension estimée et l'écart à combler. C'est exactement ce que permet le <Link href="/diagnostic" style={{ color: "#1D9E75", textDecoration: "underline" }}>bilan Avenlib</Link>, en 13 questions et 3 minutes.
                </p>
              </div>
            </div>

            {/* Liens internes */}
            <div className="rounded-xl p-5" style={{ backgroundColor: "#F9F8F4", border: "1px solid #E8E6DF" }}>
              <p className="text-sm font-semibold mb-3" style={{ color: "#2C2C2A" }}>En lien avec la retraite :</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { href: "/prevoyance", label: "Prévoyance arrêt maladie" },
                  { href: "/fiscalite", label: "Optimisation fiscale" },
                  { href: "/epargne", label: "Épargne & investissement" },
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
              Fais ton bilan retraite gratuit →
            </h2>
            <p className="text-sm mb-8 max-w-md mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
              Le bilan Avenlib calcule votre pension estimée en 13 questions et vous oriente vers les dispositifs les plus adaptés à votre statut — PER, Madelin, assurance vie — gratuitement et sans engagement.
            </p>
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#1D9E75" }}
            >
              Faire mon bilan retraite gratuit <ArrowRight size={18} />
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
