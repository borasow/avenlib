import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Portage salarial freelance : la solution pour se lancer sans risque",
  description: "Statut hybride entre salarié et indépendant. Découvrez si le portage salarial est fait pour vous : protections, revenus, liberté.",
  openGraph: {
    title: "Portage salarial freelance : la solution pour se lancer sans risque",
    description: "Statut hybride entre salarié et indépendant. Découvrez si le portage salarial est fait pour vous.",
    url: "https://avenlib.fr/portage",
    images: [{ url: "https://avenlib.fr/logo-avenlib.png", alt: "Avenlib" }],
  },
};

export default function PagePortage() {
  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#F1EFE8" }}>

        {/* Hero */}
        <section className="max-w-3xl mx-auto px-6 pt-16 pb-10">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#1D9E75" }}>
            Portage salarial
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6" style={{ color: "#2C2C2A" }}>
            Portage salarial freelance : la solution pour se lancer sans risque
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "#6B6B67" }}>
            Le portage salarial est un statut hybride entre salarié et indépendant. Tu choisis tes missions librement, mais une société de portage gère toute l'administratif et te verse un salaire avec les protections sociales complètes.
          </p>
        </section>

        {/* Chiffres clés */}
        <section className="max-w-3xl mx-auto px-6 pb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { chiffre: "900 000", label: "Salariés portés en France en 2024 — un marché en forte croissance" },
              { chiffre: "5 à 10 %", label: "Frais de gestion prélevés sur le CA HT par les sociétés de portage" },
              { chiffre: "100 %", label: "Des protections salariales : chômage, retraite, mutuelle, prévoyance" },
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
                Qu'est-ce que le portage salarial exactement ?
              </h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: "#4B4B47" }}>
                <p>
                  Le portage salarial est un arrangement tripartite : toi (le consultant), ta société de portage (qui te porte administrativement), et ton client (qui paie la prestation). Tu trouves tes missions et tu les réalises — la société de portage transforme ton chiffre d'affaires en salaire après déduction des charges sociales et de ses frais de gestion.
                </p>
                <p>
                  Ce qui rend ce statut particulièrement attractif pour les freelances : tu restes <strong>totalement libre dans le choix de tes missions</strong>, tu n'as pas de lien de subordination avec la société de portage, et tu bénéficies de toutes les protections du droit du travail : <strong>allocations chômage (ARE) en fin de mission, retraite complémentaire AGIRC-ARRCO, mutuelle d'entreprise, prévoyance, congés payés</strong>.
                </p>
                <p>
                  Le portage salarial est encadré par la loi depuis 2008 et codifié dans le Code du travail depuis 2017. Les sociétés de portage doivent adhérer à un syndicat professionnel (PEPS ou FEPS) et sont soumises à des obligations strictes de transparence sur les frais prélevés.
                </p>
              </div>
            </div>

            <hr style={{ borderColor: "#E8E6DF" }} />

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: "#2C2C2A" }}>
                Portage salarial vs statut indépendant : les vraies différences
              </h2>
              <div className="space-y-6 text-base leading-relaxed" style={{ color: "#4B4B47" }}>
                <div>
                  <h3 className="text-lg font-semibold mb-3" style={{ color: "#2C2C2A" }}>Ce que tu gagnes avec le portage</h3>
                  <ul className="space-y-2 pl-4">
                    <li><strong>Accès au chômage :</strong> en fin de mission sans nouveau contrat, tu peux percevoir les allocations ARE comme un salarié classique. C'est l'avantage numéro 1 pour les freelances en début de carrière.</li>
                    <li><strong>Retraite complémentaire :</strong> tu cotises à l'AGIRC-ARRCO, nettement plus favorable que le régime SSI des indépendants.</li>
                    <li><strong>Mutuelle collective :</strong> prise en charge à 50 % minimum par la société de portage.</li>
                    <li><strong>Prévoyance :</strong> couverture arrêt maladie, invalidité, décès dès le premier jour.</li>
                    <li><strong>Zéro comptabilité :</strong> la société de portage gère tout — facturation, déclarations sociales, bulletins de paie.</li>
                    <li><strong>Accès à la formation :</strong> droit au CPF (Compte Personnel de Formation) comme tout salarié.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3" style={{ color: "#2C2C2A" }}>Ce que tu perds ou payes</h3>
                  <ul className="space-y-2 pl-4">
                    <li><strong>Frais de gestion :</strong> la société de portage prélève entre 5 et 10 % de ton CA HT, ce qui réduit ton salaire net.</li>
                    <li><strong>Charges sociales élevées :</strong> le taux de charges salariales + patronales dépasse 45 %, contre 20-25 % pour un micro-entrepreneur. Ton salaire net représente environ 45-55 % de ton CA HT.</li>
                    <li><strong>Revenus minimums :</strong> la loi impose un salaire minimum de 2 517 € brut/mois (environ 1 960 € net), ce qui exige un CA mensuel minimum d'environ 4 500-5 000 € HT pour être viable.</li>
                    <li><strong>Pas d'optimisation fiscale avancée :</strong> tu ne peux pas déduire de frais professionnels aussi librement qu'en société.</li>
                  </ul>
                </div>

                <div className="rounded-xl p-4" style={{ backgroundColor: "#FFFBEB", border: "1px solid #FDE68A" }}>
                  <p className="text-sm font-semibold mb-1" style={{ color: "#D97706" }}>À qui s'adresse vraiment le portage salarial ?</p>
                  <p className="text-sm" style={{ color: "#92400E" }}>
                    Le portage est particulièrement adapté aux consultants qui facturent entre 4 000 et 15 000 € HT/mois, aux freelances qui souhaitent se lancer sans créer de société, et à ceux qui valorisent la sécurité (chômage, retraite) sur la maximisation du revenu net.
                  </p>
                </div>
              </div>
            </div>

            <hr style={{ borderColor: "#E8E6DF" }} />

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: "#2C2C2A" }}>
                Comment fonctionne le calcul du salaire en portage ?
              </h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: "#4B4B47" }}>
                <p>
                  La formule est simple : <strong>Salaire net = CA HT − frais de gestion − charges patronales − charges salariales</strong>.
                </p>
                <p>
                  Exemple concret : tu factures 8 000 € HT/mois à ton client.
                </p>
                <div className="rounded-xl p-4 space-y-1 text-sm font-mono" style={{ backgroundColor: "#F9F8F4", border: "1px solid #E8E6DF" }}>
                  <p>CA HT facturé :           8 000 € </p>
                  <p>− Frais de gestion (7%) :  − 560 €</p>
                  <p>= Base de calcul :          7 440 €</p>
                  <p>− Charges patronales (~45%) − 2 305 €</p>
                  <p>= Salaire brut :            5 135 €</p>
                  <p>− Charges salariales (~23%) − 1 181 €</p>
                  <p style={{ fontWeight: 700, color: "#1D9E75" }}>= Salaire net :           ≈ 3 950 €/mois</p>
                </div>
                <p>
                  En comparaison, un micro-entrepreneur qui facture 8 000 € HT/mois en prestations de services (BNC) paie environ 22 % de cotisations, soit un revenu net d'environ 6 240 €. La différence (≈ 2 300 €/mois) représente le coût des protections sociales supplémentaires du portage : chômage, retraite complémentaire AGIRC-ARRCO, mutuelle, prévoyance.
                </p>
                <p>
                  La vraie question est donc : ces protections valent-elles 2 300 €/mois pour vous ? Pour un freelance débutant qui valorise la sécurité, la réponse est souvent oui. Pour un indépendant expérimenté avec une clientèle stable et une épargne solide, la réponse peut être non.
                </p>
              </div>
            </div>

            <hr style={{ borderColor: "#E8E6DF" }} />

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: "#2C2C2A" }}>
                Comment choisir sa société de portage salarial ?
              </h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: "#4B4B47" }}>
                <p>Les critères essentiels pour choisir :</p>
                <ul className="space-y-2 pl-4">
                  <li><strong>Le taux de frais de gestion :</strong> varie de 4 à 10 % selon les sociétés et votre volume. Comparez plusieurs devis.</li>
                  <li><strong>La solidité financière :</strong> privilégiez les membres du PEPS ou FEPS, dont les adhérents ont des obligations de garanties financières.</li>
                  <li><strong>L'accompagnement :</strong> certaines sociétés proposent un accompagnement commercial (aide à trouver des missions), d'autres sont purement administratives.</li>
                  <li><strong>La spécialisation sectorielle :</strong> certains porteurs sont spécialisés tech & numérique, d'autres en conseil, formation, ingénierie.</li>
                  <li><strong>Les outils digitaux :</strong> interface de suivi des missions, émission de factures, bulletins de paie en ligne.</li>
                </ul>

                <div className="rounded-xl p-4 space-y-2" style={{ backgroundColor: "#EFF9F5", border: "1px solid #A7F3D0" }}>
                  <p className="font-semibold text-sm" style={{ color: "#085041" }}>Nos partenaires portage salarial recommandés :</p>
                  <ul className="text-sm space-y-1" style={{ color: "#085041" }}>
                    <li><strong>Jumpwork</strong> — 100% en ligne, simulation instantanée, frais 5 à 8% du CA HT</li>
                    <li><strong>Webportage</strong> — Spécialiste numérique & conseil, frais 5 à 7% du CA HT</li>
                    <li><strong>Portageo</strong> — Flexible, toutes activités, frais 4 à 9% du CA HT</li>
                  </ul>
                </div>
              </div>
            </div>

            <hr style={{ borderColor: "#E8E6DF" }} />

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: "#2C2C2A" }}>
                Le portage salarial est-il fait pour vous ?
              </h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: "#4B4B47" }}>
                <p>Le portage salarial est probablement une bonne option si :</p>
                <ul className="space-y-1 pl-4">
                  <li>Vous vous lancez en freelance et voulez garder un filet de sécurité (chômage si ça ne marche pas)</li>
                  <li>Vous facturez régulièrement entre 4 000 et 15 000 € HT/mois</li>
                  <li>Vous êtes dans un secteur porteur (tech, conseil, formation, ingénierie)</li>
                  <li>Vous ne voulez pas gérer la comptabilité et l'administratif</li>
                  <li>Vous venez de quitter le salariat et souhaitez une transition en douceur</li>
                </ul>
                <p className="mt-2">Il est moins adapté si :</p>
                <ul className="space-y-1 pl-4">
                  <li>Vos revenus sont irréguliers (le salaire minimum de 2 517 € brut doit être respecté chaque mois d'activité)</li>
                  <li>Vous avez de nombreuses charges professionnelles déductibles (frais de déplacement, matériel important) — le réel sera plus avantageux</li>
                  <li>Vous avez déjà une épargne de précaution solide et une clientèle stable</li>
                </ul>
                <p>
                  Le <Link href="/diagnostic" style={{ color: "#1D9E75", textDecoration: "underline" }}>bilan Avenlib</Link> analyse votre profil et vous dit si le portage salarial est pertinent pour votre situation, en le comparant à votre statut actuel.
                </p>
              </div>
            </div>

            {/* Liens internes */}
            <div className="rounded-xl p-5" style={{ backgroundColor: "#F9F8F4", border: "1px solid #E8E6DF" }}>
              <p className="text-sm font-semibold mb-3" style={{ color: "#2C2C2A" }}>En lien avec le portage salarial :</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { href: "/prevoyance", label: "Prévoyance indépendant" },
                  { href: "/retraite", label: "Retraite freelance" },
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
              Portage salarial ou indépendant ? Découvre ce qui est fait pour toi →
            </h2>
            <p className="text-sm mb-8 max-w-md mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
              Le bilan Avenlib analyse ton profil en 13 questions et te dit si le portage salarial est adapté à ta situation, gratuitement.
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
