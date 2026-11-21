import Link from "next/link";
import BilanLink from "@/components/BilanLink";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TITLE = "Qui sommes-nous ? Avenlib, le bilan gratuit des indépendants";
const DESC = "Ce qu'est Avenlib, comment le service est financé, d'où viennent nos chiffres et ce que nous ne faisons pas.";

export const metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "https://avenlib.fr/qui-sommes-nous" },
  openGraph: { title: TITLE, description: DESC, url: "https://avenlib.fr/qui-sommes-nous", images: [{ url: "https://avenlib.fr/logo-avenlib.png", alt: "Avenlib" }] },
};

const BLOCS = [
  { t: "Ce qu'est Avenlib", p: "Avenlib est une plateforme gratuite qui fait le bilan de la protection des indépendants : arrêt maladie, retraite, prévoyance, assurance professionnelle. Tu réponds à quelques questions, on analyse ta situation et on t'oriente vers les solutions du marché qui te correspondent." },
  { t: "Comment Avenlib est financé", p: "Le bilan est gratuit pour toi. Si tu décides de donner suite avec l'un de nos partenaires, celui-ci peut rémunérer Avenlib. Cela ne change ni ton prix, ni notre analyse : nous ne vendons aucun produit et la rémunération n'influence pas ce que nous te montrons. Nous t'indiquons clairement quand un lien est partenaire." },
  { t: "D'où viennent nos chiffres", p: "Plafonds, indemnités, taux et délais viennent de sources publiques : ameli.fr, service-public.fr, les caisses de retraite et les textes officiels. Nous les mettons à jour chaque année. Chaque outil précise ses sources et ses limites." },
  { t: "Ce que nous ne faisons pas", p: "Avenlib fournit de l'information générale, pas un conseil personnalisé. Nous ne gérons pas tes contrats, ne touchons pas à ton argent et ne te mettons pas la pression. Avant toute souscription, vérifie les conditions auprès de l'organisme concerné." },
  { t: "Tes données", p: "Tes réponses servent uniquement à construire ton bilan. Nous ne les revendons pas. Le détail figure dans la politique de confidentialité et les mentions légales." },
];

export default function PageQuiSommesNous() {
  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#F1EFE8" }}>
        <section className="max-w-3xl mx-auto px-6 pt-16 pb-8">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#1D9E75" }}>Qui sommes-nous</p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-5" style={{ color: "#2C2C2A" }}>
            Un indépendant bien protégé est un indépendant vraiment libre.
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "#6B6B67" }}>
            En France, plus d&apos;une personne en emploi sur dix travaille à son compte, souvent sans filet. Avenlib existe pour que chacun sache où il en est, gratuitement.
          </p>
        </section>
        <section className="max-w-3xl mx-auto px-6 pb-16 space-y-4">
          {BLOCS.map((b) => (
            <div key={b.t} className="rounded-2xl p-7" style={{ backgroundColor: "#FFFFFF", border: "2px solid #E8E6DF" }}>
              <h2 className="text-xl font-bold mb-2" style={{ color: "#2C2C2A" }}>{b.t}</h2>
              <p className="text-base leading-relaxed" style={{ color: "#4B4B47" }}>{b.p}</p>
            </div>
          ))}
          <div className="flex flex-wrap gap-3 pt-4">
            <BilanLink className="rounded-lg px-5 py-3 text-sm font-bold" style={{ backgroundColor: "#1D9E75", color: "#FFFFFF" }} label="Faire mon bilan gratuit" />
            <Link href="/outils/calcul-indemnites-arret-maladie" className="rounded-lg px-5 py-3 text-sm font-bold" style={{ border: "2px solid #1D9E75", color: "#1D9E75" }}>Calculer mes indemnités</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
