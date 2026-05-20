import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Banque pro indépendant : quel compte choisir en 2026 ?",
  description: "Qonto, Shine, Blank : comparatif des meilleures banques pro pour freelances et indépendants. Facturation, comptabilité, tarifs.",
  openGraph: {
    title: "Banque pro indépendant : quel compte choisir en 2026 ?",
    description: "Qonto, Shine, Blank : comparatif des meilleures banques pro pour freelances et indépendants.",
    url: "https://avenlib.fr/banque",
    images: [{ url: "https://avenlib.fr/logo-avenlib.png", alt: "Avenlib" }],
  },
};

export default function PageBanque() {
  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#F1EFE8" }}>

        {/* Hero */}
        <section className="max-w-3xl mx-auto px-6 pt-16 pb-10">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#1D9E75" }}>
            Banque professionnelle
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6" style={{ color: "#2C2C2A" }}>
            Banque pro indépendant : quel compte choisir en 2026 ?
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "#6B6B67" }}>
            Avoir un compte professionnel dédié est obligatoire pour les sociétés et fortement conseillé pour tous les indépendants. Mais toutes les banques ne se valent pas quand on est freelance. Voici comment choisir.
          </p>
        </section>

        {/* Chiffres clés */}
        <section className="max-w-3xl mx-auto px-6 pb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { chiffre: "9 €/mois", label: "Prix d'entrée des meilleures néobanques pro (Qonto, Shine, Blank)" },
              { chiffre: "68 %", label: "Des freelances insatisfaits de leur banque pro actuelle" },
              { chiffre: "72 h", label: "Ouverture d'un compte pro en ligne contre 3-4 semaines en agence" },
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
                Pourquoi avoir un compte bancaire professionnel dédié ?
              </h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: "#4B4B47" }}>
                <p>
                  Pour les sociétés (EURL, SASU, SARL, SAS), le compte bancaire professionnel est <strong>obligatoire par la loi</strong>. Pour les micro-entrepreneurs et auto-entrepreneurs dont le chiffre d'affaires annuel dépasse 10 000 € pendant deux années consécutives, la loi PACTE impose également un compte dédié à l'activité.
                </p>
                <p>
                  Mais au-delà de l'obligation légale, séparer compte personnel et compte professionnel est une bonne pratique indispensable : elle simplifie la comptabilité, facilite les déclarations fiscales, protège votre patrimoine personnel en cas de litige, et vous évite les erreurs de catégorisation qui peuvent coûter cher lors d'un contrôle URSSAF.
                </p>
                <p>
                  Mélanger ses finances personnelles et professionnelles, c'est aussi prendre le risque de manquer des charges déductibles, de ne pas piloter sa trésorerie efficacement, et de perdre du temps précieux en fin d'exercice à démêler ses relevés bancaires.
                </p>
              </div>
            </div>

            <hr style={{ borderColor: "#E8E6DF" }} />

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: "#2C2C2A" }}>
                Banque traditionnelle vs néobanque pro : que choisir ?
              </h2>
              <div className="space-y-6 text-base leading-relaxed" style={{ color: "#4B4B47" }}>
                <div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: "#2C2C2A" }}>Les limites des banques traditionnelles</h3>
                  <p>
                    Les banques classiques (BNP, Société Générale, Crédit Agricole…) proposent des comptes pro, mais leurs offres sont souvent inadaptées aux besoins réels des freelances : frais mensuels élevés (15 à 30 €/mois), ouverture en agence chronophage, peu ou pas d'intégration avec les logiciels de comptabilité, et services digitaux dépassés.
                  </p>
                  <p className="mt-2">
                    En contrepartie, les banques traditionnelles offrent des agences physiques, des conseillers dédiés pour les projets d'envergure (crédit professionnel, découvert autorisé important) et une crédibilité historique auprès des grandes institutions.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: "#2C2C2A" }}>Les avantages des néobanques pro</h3>
                  <p>
                    Les néobanques professionnelles (Qonto, Shine, Blank) sont conçues dès le départ pour les indépendants et TPE. Elles offrent : ouverture de compte en 72h, interface mobile intuitive, facturation intégrée directement depuis l'app, catégorisation automatique des dépenses, export comptable en un clic (compatible avec Pennylane, Indy, Dougs), notifications en temps réel, cartes virtuelles illimitées.
                  </p>
                  <p className="mt-2">
                    Leur seule limite : elles ne proposent généralement pas de crédit professionnel ni de découvert autorisé conséquent. Pour un freelance dont la trésorerie est solide, ce n'est pas un problème.
                  </p>
                </div>
              </div>
            </div>

            <hr style={{ borderColor: "#E8E6DF" }} />

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: "#2C2C2A" }}>
                Comparatif des meilleures banques pro pour indépendants
              </h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: "#4B4B47" }}>
                <div className="space-y-4">
                  <div className="rounded-xl p-4" style={{ backgroundColor: "#F9F8F4", border: "1px solid #E8E6DF" }}>
                    <p className="font-semibold" style={{ color: "#2C2C2A" }}>Qonto — dès 9€/mois HT</p>
                    <p className="text-sm mt-1">La référence pour les freelances et TPE. Facturation intégrée, cartes Mastercard, export comptable automatique, IBAN français. Idéal pour les structures qui grandissent. Intégration native avec la plupart des logiciels comptables.</p>
                  </div>
                  <div className="rounded-xl p-4" style={{ backgroundColor: "#F9F8F4", border: "1px solid #E8E6DF" }}>
                    <p className="font-semibold" style={{ color: "#2C2C2A" }}>Shine — gratuit ou dès 9€/mois</p>
                    <p className="text-sm mt-1">Parfait pour les freelances solo. Accompagnement à la création d'entreprise, facturation, déclarations TVA simplifiées, épargne intégrée. L'offre gratuite couvre les besoins basiques.</p>
                  </div>
                  <div className="rounded-xl p-4" style={{ backgroundColor: "#F9F8F4", border: "1px solid #E8E6DF" }}>
                    <p className="font-semibold" style={{ color: "#2C2C2A" }}>Blank — dès 9€/mois</p>
                    <p className="text-sm mt-1">100% mobile, sans frais cachés. Idéal pour démarrer son activité ou les indépendants qui préfèrent la simplicité. Cartes Visa, virements SEPA instantanés, gestion des notes de frais.</p>
                  </div>
                </div>

                <div className="rounded-xl p-4 space-y-1" style={{ backgroundColor: "#EFF9F5", border: "1px solid #A7F3D0" }}>
                  <p className="font-semibold text-sm" style={{ color: "#085041" }}>Notre recommandation :</p>
                  <p className="text-sm" style={{ color: "#085041" }}>Qonto pour les freelances avec une activité conséquente et des besoins de facturation avancés. Shine pour les solo-preneurs qui démarrent. Blank pour la simplicité absolue.</p>
                </div>
              </div>
            </div>

            <hr style={{ borderColor: "#E8E6DF" }} />

            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: "#2C2C2A" }}>
                Banque pro et comptabilité : l'intégration qui change tout
              </h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: "#4B4B47" }}>
                <p>
                  Le vrai gain d'une néobanque pro n'est pas le prix, c'est l'intégration avec votre écosystème comptable. Qonto, Shine et Blank s'intègrent nativement avec les principaux logiciels de comptabilité (<Link href="/fiscalite" style={{ color: "#1D9E75", textDecoration: "underline" }}>Pennylane, Indy, Dougs</Link>), ce qui permet de synchroniser automatiquement vos transactions, de catégoriser vos dépenses et de préparer vos déclarations fiscales sans saisie manuelle.
                </p>
                <p>
                  Pour un freelance qui passe 3 à 5 heures par mois sur sa comptabilité, cette automatisation représente un gain de temps et d'énergie considérable. Sans compter la réduction des erreurs de saisie qui peuvent déclencher des demandes d'éclaircissement de l'URSSAF.
                </p>
              </div>
            </div>

            {/* Liens internes */}
            <div className="rounded-xl p-5" style={{ backgroundColor: "#F9F8F4", border: "1px solid #E8E6DF" }}>
              <p className="text-sm font-semibold mb-3" style={{ color: "#2C2C2A" }}>En lien avec la banque pro :</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { href: "/fiscalite", label: "Optimisation fiscale" },
                  { href: "/assurance-pro", label: "RC Pro" },
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
              Évalue ta situation financière complète →
            </h2>
            <p className="text-sm mb-8 max-w-md mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
              Le bilan Avenlib analyse 9 domaines de votre situation d'indépendant en 13 questions et vous oriente vers les meilleures solutions du marché, gratuitement.
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
