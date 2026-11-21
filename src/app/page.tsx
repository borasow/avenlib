import type { Metadata } from "next";
import type { CSSProperties } from "react";

export const metadata: Metadata = {
  title: "Avenlib | Le bilan protection gratuit pour freelances et indépendants",
  description: "Retraite, prévoyance, mutuelle, fiscalité : faites votre bilan en 3 minutes. Gratuit et sans engagement.",
  openGraph: {
    title: "Avenlib | Le bilan protection gratuit pour freelances et indépendants",
    description: "Retraite, prévoyance, mutuelle, fiscalité : faites votre bilan en 3 minutes. Gratuit et sans engagement.",
    url: "https://avenlib.fr",
    images: [{ url: "https://avenlib.fr/logo-avenlib.png", alt: "Avenlib" }],
  },
};
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { OUTILS } from "@/lib/outils";
import CookieBanner from "@/components/CookieBanner";
import PilierCard from "@/components/PilierCard";
import {
  ArrowRight,
  CheckCircle2,
  BarChart2,
  MapPin,
  Gift,
  ClipboardList,
  Users,
  ChevronDown,
} from "lucide-react";

/* ─────────────── Data ─────────────── */

const piliers = [
  { iconName: "TrendingUp" as const,  titre: "Retraite",               description: "En tant qu'indépendant, tu cotises peu. Prépare-toi avant qu'il soit trop tard.", href: "/retraite" },
  { iconName: "Shield" as const,      titre: "Prévoyance",             description: "Une indemnité d'arrêt maladie souvent bien inférieure à ton revenu. Découvre comment te protéger.", href: "/prevoyance" },
  { iconName: "Calculator" as const,  titre: "Fiscalité",              description: "Des leviers existent pour réduire tes impôts légalement selon ton statut.", href: "/fiscalite" },
  { iconName: "Heart" as const,       titre: "Santé",                  description: "La Sécu couvre peu. Une bonne mutuelle fait toute la différence.", href: "/sante" },
  { iconName: "Landmark" as const,    titre: "Crédit & Financement",   description: "Freelance ? Les banques compliquent votre dossier. On vous oriente vers ceux qui comprennent votre statut.", href: "/credit" },
  { iconName: "CreditCard" as const,  titre: "Banque pro",             description: "Une bonne banque pro c'est la base. Comptes, virements, facturation, tout en un.", href: "/banque" },
  { iconName: "ShieldCheck" as const, titre: "Assurance pro",          description: "RC Pro, assurance décennale, protection juridique, indispensable selon votre activité.", href: "/assurance-pro" },
  { iconName: "PiggyBank" as const,   titre: "Épargne & Investissement", description: "Faites fructifier votre épargne intelligemment selon votre profil de risque.", href: "/epargne" },
  { iconName: "Briefcase" as const,   titre: "Portage salarial",        description: "Liberté du freelance + protections du salarié. Une alternative souvent méconnue des indépendants.", href: "/portage" },
];

const etapes = [
  { numero: "01", titre: "Tu réponds à 13 questions", description: "Statut, revenus, famille, ce qui est déjà en place. 3 minutes chrono.", Icon: CheckCircle2 },
  { numero: "02", titre: "On analyse ta situation", description: "Notre algorithme identifie tes lacunes et évalue tes risques sur 9 domaines.", Icon: BarChart2 },
  { numero: "03", titre: "On te montre quoi faire et avec qui", description: "Des recommandations concrètes avec les bons partenaires, selon ta situation.", Icon: MapPin },
];

const arguments_ = [
  { icon: Gift, titre: "Gratuit et sans engagement", description: "Le bilan ne coûte rien. Aucune carte bancaire, aucun abonnement. Tu explores, tu décides." },
  { icon: ClipboardList, titre: "Bilan personnalisé en 13 questions", description: "On analyse ta situation réelle, statut, revenus, âge, famille, pour des recommandations qui te correspondent vraiment." },
  { icon: Users, titre: "Orienté vers les partenaires sélectionnés pour les indépendants", description: "On ne vend rien. On t'oriente vers des experts sélectionnés pour leur sérieux et leur spécialisation indépendants." },
];

const faq = [
  {
    question: "C'est vraiment gratuit ?",
    reponse: "Oui, à 100%. Le bilan, les recommandations et l'accès à ta page de résultats sont totalement gratuits. Avenlib est rémunéré par les partenaires si tu souscris via notre plateforme, ce qui ne modifie jamais le prix que tu paies.",
  },
  {
    question: "Mes données sont-elles sécurisées ?",
    reponse: "Tes données sont chiffrées et stockées sur des serveurs européens (Supabase). Elles ne sont jamais revendues à des tiers. Tu peux demander leur suppression à tout moment à contact@avenlib.fr.",
  },
  {
    question: "Combien de temps prend le bilan ?",
    reponse: "Environ 3 minutes. 13 questions simples sur ta situation personnelle et professionnelle. Pas de calcul complexe, pas de document à préparer.",
  },
  {
    question: "Êtes-vous un assureur ?",
    reponse: "Non. Avenlib n'est pas un assureur, ni un conseiller financier réglementé. Nous sommes un service d'orientation : on analyse ta situation et on t'envoie vers les bons experts. Les décisions et souscriptions se font directement avec eux.",
  },
];

/* ─────────────── Styles ─────────────── */

const CARD: CSSProperties = {
  backgroundColor: "#FFFFFF",
  border: "0.5px solid #D3D1C7",
  borderRadius: "12px",
};

/* ─────────────── Component ─────────────── */

export default function Home() {
  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#F1EFE8" }}>

        {/* ── Badge pleine largeur ── */}
        <div style={{ display: "block", width: "100%", backgroundColor: "#1D9E75", color: "#FFFFFF", fontSize: "clamp(16px, 3vw, 24px)", fontWeight: 600, padding: "14px 16px", textAlign: "center", borderRadius: 0 }}>
          Le bilan complet et gratuit pour freelances et indépendants
        </div>

        {/* ── Hero ── */}
        <section style={{ backgroundColor: "#F1EFE8" }}>
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row md:min-h-[560px]">

            {/* Colonne gauche, texte */}
            <div className="flex flex-col justify-center py-12 md:py-20 pr-0 md:pr-12 md:w-[45%] w-full">

              {/* Titre */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-5" style={{ color: "#2C2C2A" }}>
                L&apos;indépendance
                <br />
                <span style={{ color: "#1D9E75" }}>sans l&apos;inquiétude.</span>
              </h1>

              {/* Sous-titre */}
              <p className="mb-8 leading-relaxed text-base md:text-xl" style={{ color: "#2C2C2A" }}>
                Retraite, prévoyance, fiscalité, crédit, santé, on t&apos;oriente vers les bonnes solutions.
              </p>

              <Link
                href="/diagnostic"
                className="inline-flex items-center gap-2 px-6 md:px-8 py-3.5 md:py-4 rounded-xl text-white font-semibold text-base transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#1D9E75", width: "fit-content" }}
              >
                Faire mon bilan gratuit
                <ArrowRight size={18} />
              </Link>
              <p className="mt-4 text-sm" style={{ color: "#6B6B67" }}>
                Gratuit · Sans engagement · 100% confidentiel
              </p>
            </div>

            {/* Colonne droite, illustration */}
            <div className="hidden md:flex items-center md:w-[55%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/hero-illustration.png"
                alt="Illustration Avenlib"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>

          </div>
        </section>

        {/* ── 4 Piliers ── */}
        <section className="max-w-6xl mx-auto px-6 pb-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {piliers.map((p) => (
              <PilierCard
                key={p.titre}
                iconName={p.iconName}
                titre={p.titre}
                description={p.description}
                href={p.href}
              />
            ))}
          </div>
        </section>

        {/* ── Calculateurs ── */}
        <section className="max-w-6xl mx-auto px-6 pb-6">
          <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#1D9E75" }}>Essaye maintenant</p>
              <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: "#2C2C2A" }}>Des calculateurs gratuits, sans inscription</h2>
            </div>
            <Link href="/outils" className="text-sm font-bold flex items-center gap-1" style={{ color: "#1D9E75" }}>
              Voir les {OUTILS.length} calculateurs <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {["calcul-indemnites-arret-maladie", "retraite-independant", "revenu-net-independant", "tjm-freelance"].map((slug) => {
              const o = OUTILS.find((x) => x.slug === slug)!;
              return (
                <Link key={slug} href={`/outils/${slug}`} className="rounded-2xl p-6 flex flex-col transition-opacity hover:opacity-80" style={{ backgroundColor: "#FFFFFF", border: "0.5px solid #D3D1C7" }}>
                  <p className="font-bold text-base mb-2" style={{ color: "#2C2C2A" }}>{o.nav}</p>
                  <p className="text-sm mb-4" style={{ color: "#6B6B67" }}>{o.accroche}</p>
                  <span className="mt-auto text-sm font-bold flex items-center gap-1" style={{ color: "#1D9E75" }}>Calculer <ArrowRight size={14} /></span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── Le problème ── */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="rounded-2xl px-8 pt-12 pb-0 overflow-hidden" style={{ backgroundColor: "#085041" }}>

              {/* Label */}
              <div className="flex items-center gap-3 mb-8">
                <span style={{ display: "block", width: "40px", height: "3px", backgroundColor: "#1D9E75", borderRadius: "2px", flexShrink: 0 }} />
                <p style={{ fontSize: "24px", fontWeight: 800, color: "#5DCAA5", letterSpacing: "0.08em", textTransform: "uppercase", margin: 0 }}>
                  Le problème
                </p>
              </div>

              {/* Contenu principal */}
              <div className="grid md:grid-cols-2 gap-10 mb-12">
                {/* Partie 1 + 2 */}
                <div>
                  <p className="text-2xl sm:text-3xl font-bold leading-snug text-white mb-4">
                    Indépendant, tu es responsable de ta propre protection.
                  </p>
                  <p className="text-base font-medium leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.70)" }}>
                    Retraite, arrêt maladie, mutuelle, fiscalité : sais-tu où tu en es vraiment ?
                  </p>
                  <div className="space-y-3">
                    {[
                      "Pas de mutuelle d'entreprise automatique.",
                      "Pas de retraite garantie.",
                      "Pas de protection en cas d'arrêt maladie.",
                    ].map((item) => (
                      <p key={item} className="flex items-start gap-3 text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
                        <span className="shrink-0 mt-0.5" style={{ color: "#1D9E75" }}>•</span>
                        {item}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Partie 3 */}
                <div className="flex items-end">
                  <div
                    className="rounded-xl px-6 py-6 w-full"
                    style={{ backgroundColor: "rgba(255,255,255,0.15)", border: "0.5px solid rgba(255,255,255,0.12)" }}
                  >
                    <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.85)" }}>
                      Tu sais combien tu toucheras à la retraite ?<br />
                      Ce qui se passe si tu tombes malade 3 mois ?
                    </p>
                    <p className="text-base leading-relaxed mt-3" style={{ color: "rgba(255,255,255,0.55)" }}>
                      La plupart des indépendants ne savent pas.
                    </p>
                    <p className="text-base font-semibold mt-3 text-white">
                      On change ça.
                    </p>
                  </div>
                </div>
              </div>

              {/* Chiffres clés, bande en bas */}
              <div
                className="grid grid-cols-2 md:grid-cols-4"
                style={{ borderTop: "0.5px solid rgba(255,255,255,0.12)" }}
              >
                {[
                  { chiffre: "13,5 %", label: "des personnes en emploi en France sont indépendantes (Insee, 2025)" },
                  { chiffre: "3 jours", label: "de carence avant toute indemnité en arrêt maladie" },
                  { chiffre: "65,84 €", label: "indemnité journalière maximale par jour en 2026 (SSI)" },
                  { chiffre: "9", label: "domaines analysés par ton bilan, en 3 minutes" },
                ].map((s, i) => (
                  <div
                    key={s.chiffre}
                    className="px-6 py-7 text-center"
                    style={{ borderLeft: i > 0 ? "0.5px solid rgba(255,255,255,0.12)" : undefined }}
                  >
                    <p className="mb-1" style={{ fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 700, color: "#FFFFFF", lineHeight: 1 }}>{s.chiffre}</p>
                    <p className="text-xs leading-snug" style={{ color: "rgba(255,255,255,0.5)" }}>{s.label}</p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* ── Pourquoi Avenlib ── */}
        <section className="py-20" id="pourquoi" style={{ backgroundColor: "#E1F5EE" }}>
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-2" style={{ color: "#2C2C2A" }}>
              Pourquoi Avenlib
            </h2>
            <p className="text-center mb-12 text-sm" style={{ color: "#6B6B67" }}>
              Simple, neutre, efficace.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {arguments_.map((a) => {
                const Icon = a.icon;
                return (
                  <div key={a.titre} className="p-7" style={CARD}>
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: "#E1F5EE" }}>
                      <Icon size={21} style={{ color: "#1D9E75" }} />
                    </div>
                    <h3 className="font-semibold text-base mb-2" style={{ color: "#2C2C2A" }}>{a.titre}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#6B6B67" }}>{a.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Comment ça marche ── */}
        <section className="py-20" id="comment">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-2" style={{ color: "#2C2C2A" }}>
              Comment ça marche
            </h2>
            <p className="text-center mb-12 text-sm" style={{ color: "#6B6B67" }}>
              3 étapes, 3 minutes.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {etapes.map((e) => {
                const Icon = e.Icon;
                return (
                  <div key={e.numero} className="p-6" style={CARD}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-bold tabular-nums" style={{ color: "#1D9E75" }}>{e.numero}</span>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#E1F5EE" }}>
                        <Icon size={16} style={{ color: "#1D9E75" }} />
                      </div>
                    </div>
                    <h3 className="font-semibold text-base mb-2" style={{ color: "#2C2C2A" }}>{e.titre}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#6B6B67" }}>{e.description}</p>
                  </div>
                );
              })}
            </div>
            <div className="text-center mt-10">
              <Link
                href="/diagnostic"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#1D9E75" }}
              >
                Commencer mon bilan <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* ── Aperçu du résultat ── */}
        <section className="py-20" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-3" style={{ color: "#2C2C2A" }}>
                Un tableau clair, domaine par domaine
              </h2>
              <p className="text-base leading-relaxed mb-5" style={{ color: "#4A4A47" }}>
                À la fin du bilan, tu vois d&apos;un coup d&apos;œil où tu es exposé et par quoi commencer.
              </p>
              <ul className="space-y-2 text-sm" style={{ color: "#2C2C2A" }}>
                <li className="flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#E24B4A" }} /> À traiter en priorité</li>
                <li className="flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#EF9F27" }} /> À améliorer</li>
                <li className="flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#1D9E75" }} /> Bien couvert</li>
              </ul>
            </div>
            <div className="rounded-2xl p-5" style={{ backgroundColor: "#F1EFE8", border: "2px solid #E8E6DF" }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#6B6B67" }}>Exemple de résultat</p>
              <div className="space-y-2">
                {[
                  ["Retraite", "#E24B4A"],
                  ["Prévoyance", "#E24B4A"],
                  ["Santé", "#EF9F27"],
                  ["Fiscalité", "#EF9F27"],
                  ["Banque pro", "#1D9E75"],
                ].map(([nom, couleur]) => (
                  <div key={nom} className="flex items-center justify-between rounded-xl px-4 py-3" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8E6DF" }}>
                    <span className="text-sm font-medium" style={{ color: "#2C2C2A" }}>{nom}</span>
                    <span className="w-4 h-4 rounded-full" style={{ backgroundColor: couleur }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-20">
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-2" style={{ color: "#2C2C2A" }}>
              Questions fréquentes
            </h2>
            <p className="text-center mb-12 text-sm" style={{ color: "#6B6B67" }}>
              Tout ce qu&apos;on nous demande souvent.
            </p>
            <div className="space-y-3">
              {faq.map((f, i) => (
                <FaqItem key={i} question={f.question} reponse={f.reponse} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Qui sommes-nous ── */}
        <section className="py-20" id="qui-sommes-nous">
          <div className="max-w-6xl mx-auto px-6">
            <div className="rounded-2xl overflow-hidden" style={{ border: "0.5px solid #D3D1C7" }}>
              {/* Header */}
              <div className="px-8 py-5" style={{ backgroundColor: "#E1F5EE", borderBottom: "0.5px solid #D3D1C7" }}>
                <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#085041" }}>
                  Qui sommes-nous
                </p>
              </div>
              {/* Body */}
              <div className="px-8 py-10 md:py-12 grid md:grid-cols-2 gap-10" style={{ backgroundColor: "#FFFFFF" }}>
                {/* Colonne gauche */}
                <div className="space-y-5 text-sm leading-relaxed" style={{ color: "#6B6B67" }}>
                  <p>
                    Avenlib est né d&apos;un constat simple : en France, <strong style={{ color: "#2C2C2A" }}>plus d&apos;une personne en emploi sur dix</strong> travaille à leur compte sans filet de sécurité. Pas de mutuelle d&apos;entreprise, pas de conseiller RH, pas de bulletin de salaire qui gère tout automatiquement.
                  </p>
                  <p>
                    Résultat : la plupart ne savent pas combien ils toucheront à la retraite, ne sont pas couverts en cas d&apos;arrêt maladie, et paient trop d&apos;impôts faute d&apos;optimisation.
                  </p>
                  <p className="font-semibold text-base" style={{ color: "#1D9E75" }}>
                    On a créé Avenlib pour changer ça.
                  </p>
                </div>
                {/* Colonne droite */}
                <div className="space-y-5 text-sm leading-relaxed" style={{ color: "#6B6B67" }}>
                  <p>
                    Notre mission est simple : poser les bonnes questions, analyser ta situation, et t&apos;orienter vers les meilleurs experts et solutions du marché, <strong style={{ color: "#2C2C2A" }}>gratuitement, sans commission cachée, sans pression commerciale.</strong>
                  </p>
                  <p>
                    Avenlib ne vend rien. On t&apos;oriente vers ceux qui ont les meilleures solutions pour toi. C&apos;est tout.
                  </p>
                  <p
                    className="rounded-xl px-5 py-4 font-medium"
                    style={{ backgroundColor: "#E1F5EE", color: "#085041" }}
                  >
                    &ldquo;Parce qu&apos;un indépendant bien protégé est un indépendant vraiment libre.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA final ── */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="rounded-2xl px-8 py-16 text-center" style={{ backgroundColor: "#085041" }}>
              <h2 className="text-3xl font-bold mb-3 text-white">
                Prêt à connaître ta situation réelle ?
              </h2>
              <p className="mb-8 max-w-md mx-auto text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                Le bilan est gratuit. Tes données sont confidentielles. Et les résultats sont immédiats.
              </p>
              <Link
                href="/diagnostic"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#1D9E75" }}
              >
                Faire mon bilan gratuit <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <CookieBanner />
    </>
  );
}

/* ─────────────── FAQ accordion (client component) ─────────────── */

function FaqItem({ question, reponse }: { question: string; reponse: string }) {
  return (
    <details
      className="group rounded-xl overflow-hidden"
      style={CARD}
    >
      <summary
        className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer list-none select-none font-medium text-sm"
        style={{ color: "#2C2C2A" }}
      >
        {question}
        <ChevronDown
          size={16}
          className="shrink-0 transition-transform group-open:rotate-180"
          style={{ color: "#6B6B67" }}
        />
      </summary>
      <div className="px-6 pb-5">
        <div className="h-px mb-4" style={{ backgroundColor: "#D3D1C7" }} />
        <p className="text-sm leading-relaxed" style={{ color: "#6B6B67" }}>{reponse}</p>
      </div>
    </details>
  );
}
