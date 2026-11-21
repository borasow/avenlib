import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { OUTILS } from "@/lib/outils";

export const metadata = {
  title: "Calculateurs gratuits pour indépendants | Avenlib",
  description: "Arrêt maladie, retraite, impôt, TJM, prêt, prévoyance : les calculateurs gratuits Avenlib pour les freelances et indépendants.",
  alternates: { canonical: "https://avenlib.fr/outils" },
};

export default function PageOutils() {
  const themes = ["Protection", "Revenus", "Retraite", "Projets"] as const;
  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#F1EFE8" }}>
        <section className="max-w-5xl mx-auto px-6 pt-16 pb-8">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#1D9E75" }}>Calculateur Avenlib</p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-5" style={{ color: "#2C2C2A" }}>Tous tes chiffres d&apos;indépendant, au même endroit</h1>
          <p className="text-lg leading-relaxed max-w-2xl" style={{ color: "#6B6B67" }}>Des calculateurs gratuits, basés sur les règles 2026.</p>
        </section>
        <section className="max-w-5xl mx-auto px-6 pb-20 space-y-10">
          {themes.map((t) => (
            <div key={t}>
              <h2 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: "#085041" }}>{t}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {OUTILS.filter((o) => o.theme === t).map((o) => (
                  <Link key={o.slug} href={`/outils/${o.slug}`} className="rounded-2xl p-6 transition-opacity hover:opacity-80" style={{ backgroundColor: "#FFFFFF", border: "2px solid #E8E6DF" }}>
                    <p className="font-bold text-lg mb-2" style={{ color: "#2C2C2A" }}>{o.nav}</p>
                    <p className="text-sm" style={{ color: "#6B6B67" }}>{o.accroche}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
