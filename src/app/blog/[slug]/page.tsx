import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import { ARTICLES, getArticle, formatDate } from "@/lib/blog";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const a = getArticle(params.slug);
  if (!a) return {};
  const url = `https://avenlib.fr/blog/${a.slug}`;
  return {
    title: a.titre,
    description: a.description,
    alternates: { canonical: url },
    openGraph: {
      title: a.titre,
      description: a.description,
      url,
      type: "article",
      images: [{ url: "https://avenlib.fr/logo-avenlib.png", alt: "Avenlib" }],
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
      <main style={{ backgroundColor: "#F1EFE8" }}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <section className="max-w-3xl mx-auto px-6 pt-16 pb-10">
          <Link href="/blog" className="text-sm" style={{ color: "#1D9E75" }}>← Tous les articles</Link>
          <div className="text-xs mt-6 mb-3" style={{ color: "#1D9E75" }}>
            {a.categorie} · {formatDate(a.date)} · {a.lecture} de lecture
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-5" style={{ color: "#2C2C2A" }}>{a.titre}</h1>
          <p className="text-base leading-relaxed" style={{ color: "#6B6B67" }}>{a.intro}</p>
        </section>

        <section className="max-w-3xl mx-auto px-6 pb-10">
          <article className="rounded-2xl p-8 sm:p-12 space-y-10" style={{ backgroundColor: "#FFFFFF", border: "2px solid #E8E6DF" }}>
            {a.sections.map((s) => (
              <div key={s.titre}>
                <h2 className="text-xl font-semibold mb-3" style={{ color: "#2C2C2A" }}>{s.titre}</h2>
                {s.paragraphes.map((p, i) => (
                  <p key={i} className="text-sm leading-relaxed mb-3" style={{ color: "#6B6B67" }}>{p}</p>
                ))}
                {s.liste && (
                  <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed" style={{ color: "#6B6B67" }}>
                    {s.liste.map((l) => <li key={l}>{l}</li>)}
                  </ul>
                )}
              </div>
            ))}
            <p className="text-xs" style={{ color: "#6B6B67" }}>
              Cet article est une information générale et ne constitue pas un conseil personnalisé. Les règles et plafonds évoluent : vérifiez-les auprès des sources officielles ou d&apos;un professionnel.
            </p>
          </article>
        </section>

        <section className="max-w-3xl mx-auto px-6 pb-10">
          <div className="rounded-2xl p-8 text-center" style={{ backgroundColor: "#FFFFFF", border: "2px solid #1D9E75" }}>
            <h2 className="text-xl font-semibold mb-2" style={{ color: "#2C2C2A" }}>{a.ctaTitre}</h2>
            <p className="text-sm mb-5" style={{ color: "#6B6B67" }}>{a.ctaTexte}</p>
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white"
              style={{ backgroundColor: "#1D9E75" }}
            >
              Faire mon bilan gratuit <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-6 pb-20">
          <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#2C2C2A" }}>Sources</p>
          <ul className="text-xs space-y-1" style={{ color: "#6B6B67" }}>
            {a.sources.map((s) => (
              <li key={s.url + s.label}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline">{s.label}</a>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
