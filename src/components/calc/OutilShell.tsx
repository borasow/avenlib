import Link from "next/link";
import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { OUTILS } from "@/lib/outils";

export function outilMetadata(slug: string) {
  const o = OUTILS.find((x) => x.slug === slug)!;
  const url = `https://avenlib.fr/outils/${slug}`;
  return {
    title: `${o.titre} | Avenlib`,
    description: o.meta,
    alternates: { canonical: url },
    openGraph: { title: o.titre, description: o.meta, url, images: [{ url: "https://avenlib.fr/logo-avenlib.png", alt: "Avenlib" }] },
  };
}

export default function OutilShell({ slug, children, methode }: { slug: string; children: ReactNode; methode: ReactNode }) {
  const o = OUTILS.find((x) => x.slug === slug)!;
  const autres = OUTILS.filter((x) => x.slug !== slug).slice(0, 4);
  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#F1EFE8" }}>
        <section className="max-w-5xl mx-auto px-6 pt-16 pb-8">
          <Link href="/outils" className="text-xs font-bold uppercase tracking-widest mb-4 inline-block" style={{ color: "#1D9E75" }}>
            Calculateur Avenlib · {o.theme}
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-5" style={{ color: "#2C2C2A" }}>{o.titre}</h1>
          <p className="text-lg leading-relaxed max-w-2xl" style={{ color: "#6B6B67" }}>{o.accroche} Gratuit, sans inscription.</p>
        </section>
        <section className="max-w-5xl mx-auto px-6 pb-10">{children}</section>
        <section className="max-w-3xl mx-auto px-6 pb-12">
          <div className="rounded-2xl p-8 space-y-4 text-sm leading-relaxed" style={{ backgroundColor: "#FFFFFF", border: "2px solid #E8E6DF", color: "#4B4B47" }}>
            <h2 className="text-xl font-bold" style={{ color: "#2C2C2A" }}>Comment c&apos;est calculé</h2>
            {methode}
            <p style={{ color: "#6B6B67" }}>Estimation indicative, pas un conseil personnalisé. Chiffres 2026 issus de sources publiques (service-public.gouv.fr, economie.gouv.fr, ameli.fr, Assurance retraite).</p>
          </div>
        </section>
        <section className="max-w-5xl mx-auto px-6 pb-20">
          <h2 className="text-xl font-bold mb-4" style={{ color: "#2C2C2A" }}>Les autres calculateurs</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {autres.map((a) => (
              <Link key={a.slug} href={`/outils/${a.slug}`} className="rounded-2xl p-5 transition-opacity hover:opacity-80" style={{ backgroundColor: "#FFFFFF", border: "2px solid #E8E6DF" }}>
                <p className="font-bold text-sm mb-1" style={{ color: "#2C2C2A" }}>{a.nav}</p>
                <p className="text-xs" style={{ color: "#6B6B67" }}>{a.accroche}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
