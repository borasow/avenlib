import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Optimisation fiscale freelance : économisez jusqu'à 3 200€/an",
  description: "PER, charges déductibles, choix du statut : tous les leviers pour réduire vos impôts légalement en tant qu'indépendant.",
  openGraph: {
    title: "Optimisation fiscale freelance : économisez jusqu'à 3 200€/an",
    description: "PER, charges déductibles, choix du statut : tous les leviers pour réduire vos impôts légalement.",
    url: "https://avenlib.fr/fiscalite",
    images: [{ url: "https://avenlib.fr/logo-avenlib.png", alt: "Avenlib" }],
  },
};

export default function PageFiscalite() {
  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#F1EFE8" }}>

        {/* Hero */}
        <section className="max-w-3xl mx-auto px-6 pt-16 pb-10">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#1D9E75" }}>
            Fiscalité & optimisation
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6" style={{ color: "#2C2C2A" }}>
            Optimisation fiscale freelance : économisez jusqu'à 3 200€/an
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "#6B6B67" }}>
            La fiscalité des indépendants est complexe, mais elle réserve des opportunités que la plupart n'exploitent pas. PER, régime réel, déductions Madelin : voici comment réduire légalement votre imposition.
          </p>
        </section>

        {/* Chiffres clés */}
        <section className="max-w-3xl mx-auto px-6 pb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { chiffre: "3 200 €", label: "Économie fiscale annuelle moyenne non réalisée par les indépendants" },
              { chiffre: "10 %", label: "Seulement des indépendants utilisent un PER comme outil fiscal" },
              { chiffre: "32 908 €", label: "Plafond de déduction fiscale via le PER en 2024" },
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
                Les erreurs fiscales classiques des indépendants
              </h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: "#4B4B47" }}>
                <p>
                  La plupart des indépendants paient trop d'impôts, non par malchance, mais par méconnaissance des dispositifs légaux à leur disposition. Voici les erreurs les plus fréquentes.
                </p>

                <div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: "#2C2C2A" }}>Ne pas utiliser le PER</h3>
                  <p>
                    Le Plan d'Épargne Retraite permet de déduire ses versements du revenu imposable, jusqu'à 10 % du bénéfice net. Pour un freelance avec 60 000 € de revenus nets à 30 % de TMI, verser 6 000 € sur un PER génère une économie d'impôt immédiate de 1 800 €. C'est une économie réelle, cette année, en plus de préparer sa retraite.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: "#2C2C2A" }}>Rester en micro avec des revenus élevés</h3>
                  <p>
                    Le régime micro-entrepreneur est simple, mais il est rarement optimal au-delà de 30 000-40 000 € de revenus. L'abattement forfaitaire (34 % pour les services) ne reflète pas la réalité des charges si vous avez des frais professionnels significatifs. Passer au régime réel permet de déduire 100 % de vos charges réelles : loyer professionnel, matériel, déplacements, formation, cotisations de prévoyance Madelin…
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: "#2C2C2A" }}>Oublier les charges déductibles</h3>
                  <p>
                    En régime réel, de nombreuses charges sont déductibles et régulièrement oubliées : les cotisations sociales obligatoires, la prévoyance Madelin, les frais de formation, l'abonnement internet et téléphone pro, les logiciels et outils SaaS, les honoraires d'expert-comptable, les frais de déplacement professionnel. Chaque euro de charge déduit réduit d'autant le bénéfice imposable.
                  </p>
                </div>
              </div>
            </div>

            <hr style={{ borderColor: "#E8E6DF" }} />

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: "#2C2C2A" }}>
                Les leviers d'optimisation selon votre statut
              </h2>
              <div className="space-y-6 text-base leading-relaxed" style={{ color: "#4B4B47" }}>
                <div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: "#2C2C2A" }}>Fiscalité micro-entrepreneur : les limites</h3>
                  <p>
                    Le régime micro offre une grande simplicité administrative, mais ses limites fiscales sont réelles. L'abattement forfaitaire (71 % pour la vente, 50 % pour les services BIC, 34 % pour les BNC) ne correspond pas aux charges réelles de beaucoup d'indépendants. Si vos frais réels dépassent l'abattement, vous payez de l'impôt sur des revenus que vous n'avez pas vraiment perçus.
                  </p>
                  <p className="mt-2">
                    De plus, le micro n'ouvre pas droit aux cotisations Madelin, ni aux déductions de charges de prévoyance. La fiscalité micro-entrepreneur est avantageuse uniquement si vos charges réelles sont inférieures à l'abattement et vos revenus modestes.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: "#2C2C2A" }}>Régime réel : l'avantage méconnu</h3>
                  <p>
                    Passer au régime réel simplifié (BIC) ou au régime de la déclaration contrôlée (BNC) permet de déduire toutes vos charges professionnelles réelles. Pour un consultant qui dépense 15 000 € de charges annuelles, le gain fiscal peut dépasser 4 500 € par rapport au micro. L'inconvénient : une comptabilité plus rigoureuse, qui justifie l'intervention d'un expert-comptable.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: "#2C2C2A" }}>EURL et SASU : optimisations avancées</h3>
                  <p>
                    Les structures en société ouvrent des leviers supplémentaires : choix entre IS (impôt sur les sociétés) et IR (impôt sur le revenu), répartition optimale entre salaire et dividendes, déduction des charges sociales patronales, plan d'épargne salariale... Ces stratégies nécessitent un accompagnement professionnel pour être mises en œuvre correctement.
                  </p>
                </div>
              </div>
            </div>

            <hr style={{ borderColor: "#E8E6DF" }} />

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: "#2C2C2A" }}>
                Le PER : le levier fiscal numéro 1 des indépendants
              </h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: "#4B4B47" }}>
                <p>
                  Le Plan d'Épargne Retraite est le dispositif fiscal le plus puissant pour réduire ses impôts légalement en tant qu'indépendant. Son fonctionnement est simple : vous versez de l'argent sur le PER, vous déduisez ces versements de votre revenu imposable, et votre capital fructifie jusqu'à la retraite.
                </p>
                <p>
                  Le plafond de déduction est généreux : 10 % du bénéfice net imposable, avec un minimum de 4 399 € et un maximum de 32 908 € (chiffres 2024). Si vous n'avez pas utilisé tout votre plafond les 3 dernières années, vous pouvez le rattraper — c'est le « carry-forward » du PER.
                </p>
                <p>
                  Exemple concret : un consultant indépendant avec 80 000 € de bénéfice net et une TMI à 41 % verse 8 000 € sur son PER. Il économise 3 280 € d'impôts cette année, tout en constituant un capital retraite. Le PER est donc simultanément un outil d'optimisation fiscale à court terme et un outil de <Link href="/retraite" style={{ color: "#1D9E75", textDecoration: "underline" }}>préparation à la retraite</Link>.
                </p>
                <div className="rounded-xl p-4 space-y-2" style={{ backgroundColor: "#EFF9F5", border: "1px solid #A7F3D0" }}>
                  <p className="font-semibold text-sm" style={{ color: "#085041" }}>Nos partenaires PER recommandés :</p>
                  <ul className="text-sm space-y-1" style={{ color: "#085041" }}>
                    <li><strong>Caravel</strong> — Spécialiste PER indépendants, frais 1,38%/an, ouverture en ligne en 10 min</li>
                    <li><strong>Ramify</strong> — PER haut de gamme, gestion pilotée, frais 1,3 à 1,6%/an</li>
                    <li><strong>Linxea</strong> — PER sans frais d'entrée, frais de gestion parmi les plus bas du marché</li>
                  </ul>
                </div>
              </div>
            </div>

            <hr style={{ borderColor: "#E8E6DF" }} />

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: "#2C2C2A" }}>
                Se faire accompagner par un expert-comptable
              </h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: "#4B4B47" }}>
                <p>
                  L'optimisation fiscale dépasse souvent ce qu'un indépendant peut gérer seul. Un expert-comptable spécialisé dans les profils freelances et TNS peut vous faire économiser bien plus que ses honoraires dès la première année. Il identifie les déductions manquées, choisit le régime fiscal optimal, optimise la structure juridique et vous accompagne lors des contrôles fiscaux.
                </p>
                <p>
                  Le bon moment pour s'en doter : dès que vos revenus dépassent 30 000 € annuels, ou dès que vous envisagez de passer de micro à réel, ou de créer une société.
                </p>
                <div className="rounded-xl p-4 space-y-2" style={{ backgroundColor: "#EFF9F5", border: "1px solid #A7F3D0" }}>
                  <p className="font-semibold text-sm" style={{ color: "#085041" }}>Nos partenaires comptabilité recommandés :</p>
                  <ul className="text-sm space-y-1" style={{ color: "#085041" }}>
                    <li><strong>Dougs</strong> — Expert-comptable en ligne, accompagnement personnalisé, dès 29€/mois</li>
                    <li><strong>Indy</strong> — Comptabilité automatisée, connexion bancaire, gratuit ou dès 12€/mois</li>
                    <li><strong>Pennylane</strong> — Gestion financière tout-en-un pour entrepreneurs, dès 14€/mois HT</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Liens internes */}
            <div className="rounded-xl p-5" style={{ backgroundColor: "#F9F8F4", border: "1px solid #E8E6DF" }}>
              <p className="text-sm font-semibold mb-3" style={{ color: "#2C2C2A" }}>En lien avec la fiscalité :</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { href: "/retraite", label: "PER & retraite" },
                  { href: "/epargne", label: "Épargne & investissement" },
                  { href: "/banque", label: "Banque pro" },
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
              Évalue ton niveau d'optimisation fiscale →
            </h2>
            <p className="text-sm mb-8 max-w-md mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
              Le bilan Avenlib identifie vos leviers fiscaux inexploités en 13 questions et vous oriente vers les bons experts et outils — gratuitement.
            </p>
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#1D9E75" }}
            >
              Faire mon bilan fiscal gratuit <ArrowRight size={18} />
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
