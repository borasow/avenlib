import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ARTICLES, getArticle, formatDate } from "@/lib/blog";

const DARK = "#1F4A3F";

const COVERS: Record<string, string> = {
  "retraite-freelance": "/blog/retraite.png",
  "prevoyance-independant": "/blog/prevoyance.png",
  "mutuelle-auto-entrepreneur": "/blog/mutuelle.png",
  "optimisation-fiscale-freelance": "/blog/fiscalite.png",
  "protection-sociale-independant": "/blog/protection.png",
};

function anchor(t: string) {
  return t
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const a = getArticle(params.slug);
  if (!a) return {};
  const url = `https://avenlib.fr/blog/${a.slug}`;
  const cover = `https://avenlib.fr${COVERS[a.slug]}`;
  return {
    title: a.titre,
    description: a.description,
    alternates: { canonical: url },
    openGraph: {
      title: a.titre,
      description: a.description,
      url,
      type: "article",
      images: [{ url: cover, alt: a.titre }],
    },
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const a = getArticle(params.slug);
  if (!a) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.titre,
    description: a.description,
    datePublished: a.date,
    author: { "@type": "Organization", name: "Avenlib" },
    publisher: { "@type": "Organization", name: "Avenlib" },
    mainEntityOfPage: `https://avenlib.fr/blog/${a.slug}`,
  };

  return (
    <>
      <Navbar />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        {/* En-tête */}
        <section style={{ backgroundColor: "#F1EFE8" }}>
          <div className="max-w-3xl mx-auto px-6 pt-14 pb-10">
            <Link href="/blog" className="text-sm" style={{ color: "#1D9E75" }}>← Tous les articles</Link>
            <div className="text-xs mt-6 mb-3 font-medium" style={{ color: "#1D9E75" }}>
              {a.categorie} · {formatDate(a.date)} · {a.lecture} de lecture
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-5" style={{ color: "#2C2C2A" }}>{a.titre}</h1>
            <p className="text-base sm:text-lg leading-relaxed mb-8" style={{ color: "#4A4A47" }}>{a.intro}</p>
            <Image
              src={COVERS[a.slug]}
              alt={a.titre}
              width={1200}
              height={630}
              priority
              className="w-full h-auto rounded-2xl"
            />
          </div>
        </section>

        {/* Corps */}
        <section style={{ backgroundColor: "#FFFFFF" }}>
          <div className="max-w-3xl mx-auto px-6 py-12">
            <div className="rounded-2xl p-6 mb-8" style={{ backgroundColor: "#E1F5EE", border: "1px solid #9FE1CB" }}>
              <p className="text-sm font-bold mb-3" style={{ color: DARK }}>À retenir</p>
              <ul className="space-y-2">
                {a.aretenir.map((x) => (
                  <li key={x} className="flex gap-2 text-sm leading-relaxed" style={{ color: DARK }}>
                    <CheckCircle2 size={18} className="shrink-0 mt-0.5" style={{ color: "#1D9E75" }} />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>

            {a.sections.length > 2 && (
              <nav className="mb-10 text-sm" aria-label="Sommaire">
                <p className="font-bold mb-2" style={{ color: "#2C2C2A" }}>Sommaire</p>
                <ol className="list-decimal pl-5 space-y-1" style={{ color: "#1D9E75" }}>
                  {a.sections.map((s) => (
                    <li key={s.titre}><a href={`#${anchor(s.titre)}`} className="underline">{s.titre}</a></li>
                  ))}
                </ol>
              </nav>
            )}

            <article className="space-y-10">
              {a.sections.map((s) => (
                <div key={s.titre} id={anchor(s.titre)} className="scroll-mt-24">
                  <h2 className="text-xl sm:text-2xl font-semibold mb-3" style={{ color: "#2C2C2A" }}>{s.titre}</h2>
                  {s.paragraphes.map((p, i) => (
                    <p key={i} className="text-base leading-relaxed mb-3" style={{ color: "#4A4A47" }}>{p}</p>
                  ))}
                  {s.liste && (
                    <ul className="list-disc pl-5 space-y-2 text-base leading-relaxed" style={{ color: "#4A4A47" }}>
                      {s.liste.map((l) => <li key={l}>{l}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </article>

            <p className="text-xs mt-10" style={{ color: "#6B6B67" }}>
              Cet article est une information générale et ne constitue pas un conseil personnalisé. Les règles et plafonds évoluent : vérifiez-les auprès des sources officielles ou d&apos;un professionnel.
            </p>
          </div>
        </section>

        {/* Appel à l'action */}
        <section style={{ backgroundColor: DARK }}>
          <div className="max-w-3xl mx-auto px-6 py-14 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-white">{a.ctaTitre}</h2>
            <p className="text-base mb-7" style={{ color: "#D5EDE4" }}>{a.ctaTexte}</p>
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold"
              style={{ backgroundColor: "#FFFFFF", color: DARK }}
            >
              Faire mon bilan gratuit <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* Sources */}
        <section style={{ backgroundColor: "#F1EFE8" }}>
          <div className="max-w-3xl mx-auto px-6 py-10">
            <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#2C2C2A" }}>Sources</p>
            <ul className="text-xs space-y-1" style={{ color: "#6B6B67" }}>
              {a.sources.map((s) => (
                <li key={s.url + s.label}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline">{s.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
