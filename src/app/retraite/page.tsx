import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Retraite des indépendants : combien toucherez-vous vraiment ?",
  description: "Retraite freelance, micro-entrepreneur, auto-entrepreneur : découvrez pourquoi les indépendants sont mal couverts et les solutions concrètes pour préparer votre retraite (PER, Madelin…).",
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
            Un freelance, un micro-entrepreneur ou un auto-entrepreneur cotise chaque année à la retraite obligatoire — mais les montants perçus sont souvent deux fois inférieurs à ceux d'un salarié. Voici pourquoi, et surtout comment y remédier.
          </p>
        </section>

        {/* Chiffres clés */}
        <section className="max-w-3xl mx-auto px-6 pb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { chiffre: "1 100 €", label: "Pension mensuelle moyenne d'un indépendant" },
              { chiffre: "−40 %", label: "De moins qu'un salarié à situation équivalente" },
              { chiffre: "40 %", label: "Des indépendants sans aucune épargne retraite complémentaire" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl p-6 text-center" style={{ backgroundColor: "#FFFFFF", border: "0.5px solid #D3D1C7" }}>
                <p className="text-3xl font-bold mb-1" style={{ color: "#1D9E75" }}>{s.chiffre}</p>
                <p className="text-sm leading-snug" style={{ color: "#6B6B67" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Article */}
        <section className="max-w-3xl mx-auto px-6 pb-16">
          <div className="rounded-2xl p-8 sm:p-12 space-y-10" style={{ backgroundColor: "#FFFFFF", border: "0.5px solid #D3D1C7" }}>

            {/* H2 1 */}
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: "#2C2C2A" }}>
                Pourquoi les indépendants sont mal couverts à la retraite
              </h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: "#4B4B47" }}>
                <p>
                  En France, la retraite des travailleurs indépendants — freelances, micro-entrepreneurs, auto-entrepreneurs, gérants de SASU ou d'EURL — repose sur des régimes obligatoires spécifiques : le SSI (Sécurité sociale des indépendants) pour les artisans et commerçants, la CIPAV pour les professions libérales, ou encore la CARPIMKO pour les auxiliaires médicaux. Ces régimes fonctionnent sur le principe de la répartition, comme celui des salariés, mais avec une différence majeure : les cotisations sont calculées sur des revenus souvent plus volatils et généralement plus faibles en base de calcul.
                </p>
                <p>
                  Premier problème : le taux de remplacement. Un salarié peut espérer percevoir environ 50 à 75 % de son dernier salaire à la retraite. Pour un indépendant, ce taux tombe souvent en dessous de 30 à 40 %. Concrètement, un freelance qui gagne 4 000 € nets par mois aujourd'hui peut se retrouver avec moins de 1 200 € de pension, soit une chute brutale de son niveau de vie.
                </p>
                <p>
                  Deuxième problème : les années de faibles revenus pèsent lourd. Un auto-entrepreneur ou un micro-entrepreneur qui débute avec de petits chiffres d'affaires accumule très peu de trimestres validés et de points retraite. Les premières années d'activité, souvent les plus difficiles financièrement, hypothèquent la pension future de façon durable.
                </p>
                <p>
                  Troisième problème : l'absence de retraite complémentaire obligatoire comparable à celle des salariés (AGIRC-ARRCO). Les indépendants doivent, par eux-mêmes, mettre en place une épargne complémentaire — ce que près de 40 % d'entre eux ne font pas, faute d'information ou de temps.
                </p>
              </div>
            </div>

            <hr style={{ borderColor: "#E8E6DF" }} />

            {/* H2 2 */}
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: "#2C2C2A" }}>
                Combien touche vraiment un freelance à la retraite ?
              </h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: "#4B4B47" }}>
                <p>
                  Les chiffres varient selon le statut juridique, le secteur d'activité, les revenus déclarés et la durée de carrière — mais les ordres de grandeur sont clairs et souvent décevants.
                </p>
                <p>
                  Un <strong>micro-entrepreneur ou auto-entrepreneur</strong> qui déclare 30 000 € de chiffre d'affaires par an (soit environ 24 000 € de revenus nets après abattement) peut espérer, après 40 ans de carrière, une pension d'environ <strong>900 à 1 100 € par mois</strong>. Pour un freelance tech qui facture 80 000 € par an, la pension monte à environ <strong>1 400 à 1 700 €</strong> — toujours bien en dessous de ce que percevrait un cadre salarié équivalent.
                </p>
                <p>
                  La retraite freelance est particulièrement pénalisante pour ceux qui ont alterné périodes de salariat et périodes d'indépendance. Les règles de liquidation diffèrent selon les régimes, ce qui peut créer des « trous » dans la carrière et réduire encore la pension finale.
                </p>
                <p>
                  Pour les <strong>gérants de SASU</strong>, la situation est encore plus contrastée : s'ils se rémunèrent en dividendes plutôt qu'en salaire, ils ne cotisent quasiment pas à la retraite obligatoire. Résultat : des droits à la retraite proches de zéro malgré une activité florissante.
                </p>
                <p>
                  Le seul moyen d'obtenir une estimation fiable est de consulter son relevé de carrière sur <strong>info-retraite.fr</strong>, qui agrège tous les régimes auxquels vous avez cotisé. Mais cette estimation ne tient pas compte de l'inflation ni des réformes futures — deux facteurs qui pourraient encore réduire les pensions réelles.
                </p>
              </div>
            </div>

            <hr style={{ borderColor: "#E8E6DF" }} />

            {/* H2 3 */}
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: "#2C2C2A" }}>
                Les solutions pour améliorer sa retraite quand on est indépendant
              </h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: "#4B4B47" }}>
                <p>
                  Bonne nouvelle : des dispositifs puissants existent spécifiquement pour les travailleurs non salariés. À condition de les activer suffisamment tôt.
                </p>

                <p className="font-semibold" style={{ color: "#2C2C2A" }}>1. Le PER indépendant (Plan d'Épargne Retraite)</p>
                <p>
                  Le <strong>PER indépendant</strong> est aujourd'hui le dispositif le plus efficace pour un freelance ou un auto-entrepreneur. Il permet de déduire les versements de son revenu imposable — jusqu'à 10 % du bénéfice imposable, voire davantage selon les plafonds — ce qui réduit immédiatement la facture fiscale tout en constituant un capital pour la retraite. Pour un indépendant à 30 % de TMI qui verse 5 000 € sur son PER, l'économie d'impôt immédiate est de 1 500 €.
                </p>
                <p>
                  À la retraite, le capital peut être récupéré en rente viagère ou en capital (depuis la loi PACTE de 2019). Le <strong>PER retraite freelance</strong> est donc à la fois un outil d'optimisation fiscale à court terme et un filet de sécurité à long terme.
                </p>

                <p className="font-semibold" style={{ color: "#2C2C2A" }}>2. Le contrat Madelin (pour les TNS)</p>
                <p>
                  Pour les travailleurs non salariés (TNS) relevant du régime SSI ou de la CIPAV, le contrat Madelin permet de cotiser à une retraite complémentaire avec déductibilité fiscale. Les versements sont déductibles du bénéfice imposable dans la limite de plafonds spécifiques, souvent plus élevés que ceux du PER. Ce dispositif est particulièrement avantageux pour les indépendants avec des revenus élevés et une forte imposition.
                </p>

                <p className="font-semibold" style={{ color: "#2C2C2A" }}>3. L'assurance vie et le PEA</p>
                <p>
                  En complément du PER, l'assurance vie reste un incontournable pour les indépendants souhaitant constituer une épargne flexible. Elle n'offre pas de déduction fiscale à l'entrée, mais bénéficie d'une fiscalité allégée après 8 ans de détention. Le PEA, lui, permet d'investir en actions européennes avec une exonération d'impôt sur les plus-values après 5 ans.
                </p>

                <p className="font-semibold" style={{ color: "#2C2C2A" }}>4. Commencer tôt : la règle d'or</p>
                <p>
                  Qu'il s'agisse de <strong>retraite micro-entrepreneur</strong>, de <strong>retraite auto-entrepreneur</strong> ou de retraite freelance, le facteur temps est décisif. Un versement de 200 € par mois sur un PER à 30 ans génère un capital bien supérieur à 400 € par mois démarré à 45 ans, grâce aux intérêts composés. Chaque année d'attente coûte plus cher qu'on ne le pense.
                </p>
                <p>
                  La première étape est de connaître précisément sa situation : quels droits ai-je accumulés ? Quel sera mon écart à combler ? Quels dispositifs sont les plus adaptés à mon statut et ma tranche d'imposition ? C'est exactement ce que permet le bilan Avenlib.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* CTA */}
        <section className="max-w-3xl mx-auto px-6 pb-20">
          <div className="rounded-2xl px-8 py-14 text-center" style={{ backgroundColor: "#085041" }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#1D9E75" }}>
              Passez à l'action
            </p>
            <h2 className="text-2xl font-bold mb-3 text-white">
              Quelle sera vraiment votre retraite ?
            </h2>
            <p className="text-sm mb-8 max-w-md mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
              Le bilan Avenlib analyse votre situation retraite en 13 questions et vous oriente vers les dispositifs les plus adaptés à votre statut — PER, Madelin, assurance vie — gratuitement et sans engagement.
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
