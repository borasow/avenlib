import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Conditions générales d'utilisation, Avenlib",
};

export default function CGU() {
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-8" style={{ color: "#2C2C2A" }}>
          Conditions générales d'utilisation
        </h1>
        <div className="space-y-8 text-secondary text-sm leading-relaxed">
          <section>
            <h2 className="font-semibold text-base mb-2" style={{ color: "#2C2C2A" }}>
              1. Objet
            </h2>
            <p>
              Avenlib est une plateforme d'information et d'orientation financière pour les
              travailleurs indépendants. Les diagnostics et recommandations fournis sont indicatifs
              et ne constituent pas un conseil financier, juridique ou fiscal au sens réglementaire.
            </p>
          </section>
          <section>
            <h2 className="font-semibold text-base mb-2" style={{ color: "#2C2C2A" }}>
              2. Utilisation du service
            </h2>
            <p>
              L'utilisation d'Avenlib est gratuite. L'utilisateur s'engage à fournir des
              informations exactes lors du diagnostic. Avenlib se réserve le droit de modifier ou
              d'interrompre le service à tout moment.
            </p>
          </section>
          <section>
            <h2 className="font-semibold text-base mb-2" style={{ color: "#2C2C2A" }}>
              3. Responsabilité
            </h2>
            <p>
              Avenlib ne saurait être tenu responsable des décisions financières prises sur la base
              des informations fournies. Il est recommandé de consulter un professionnel agréé avant
              toute souscription.
            </p>
          </section>
          <section>
            <h2 className="font-semibold text-base mb-2" style={{ color: "#2C2C2A" }}>
              4. Propriété intellectuelle
            </h2>
            <p>
              L'ensemble des contenus du site (textes, algorithmes, design) est la propriété
              exclusive d'Avenlib. Toute reproduction sans autorisation est interdite.
            </p>
          </section>
          <section>
            <h2 className="font-semibold text-base mb-2" style={{ color: "#2C2C2A" }}>
              5. Droit applicable
            </h2>
            <p>
              Les présentes CGU sont soumises au droit français. Tout litige sera porté devant les
              tribunaux compétents français.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
