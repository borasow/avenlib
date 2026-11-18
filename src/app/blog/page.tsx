import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import { ARTICLES, formatDate } from "@/lib/blog";

const title = "Blog Avenlib : protection financière des freelances et indépendants";
const description =
  "Guides pratiques sur la retraite, la prévoyance, la mutuelle et la fiscalité pour les freelances, auto-entrepreneurs et indépendants.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "https://avenlib.fr/blog" },
  openGraph: {
    title,
    description,
    url: "https://avenlib.fr/blog",
    images: [{ url: "https://avenlib.fr/logo-avenlib.png", alt: "Avenlib" }],
  },
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#F1EFE8" }}>
        <section className="max-w-3xl mx-auto px-6 pt-16 pb-6">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: "#2C2C2A" }}>
            Le blog Avenlib
          </h1>
          <p className="text-base leading-relaxed" style={{ color: "#6B6B67" }}>
            Des guides clairs pour comprendre et améliorer votre protection financière quand vous travaillez à votre compte.
          </p>
        </section>
        <section className="max-w-3xl mx-auto px-6 pb-20 space-y-4">
          {ARTICLES.map((a) => (
            <Link
              key={a.slug}
              href={`/blog/${a.slug}`}
              className="block rounded-2xl p-6 transition-opacity hover:opacity-80"
              style={{ backgroundColor: "#FFFFFF", border: "2px solid #E8E6DF" }}
            >
              <div className="text-xs mb-2" style={{ color: "#1D9E75" }}>
                {a.categorie} · {formatDate(a.date)} · {a.lecture} de lecture
              </div>
              <h2 className="text-lg font-semibold mb-2" style={{ color: "#2C2C2A" }}>{a.titre}</h2>
              <p className="text-sm leading-relaxed mb-3" style={{ color: "#6B6B67" }}>{a.description}</p>
              <span className="inline-flex items-center gap-1 text-sm font-medium" style={{ color: "#1D9E75" }}>
                Lire l&apos;article <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
