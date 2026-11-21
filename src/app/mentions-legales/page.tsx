import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Mentions légales, Avenlib",
};

export default function MentionsLegales() {
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-8" style={{ color: "#2C2C2A" }}>
          Mentions légales
        </h1>
        <div className="space-y-8 text-secondary text-sm leading-relaxed">
          <section>
            <h2 className="font-semibold text-base mb-2" style={{ color: "#2C2C2A" }}>
              Éditeur du site
            </h2>
            <p>Avenlib, avenlib.fr</p>
            <p>Email : contact@avenlib.fr</p>
          </section>
          <section>
            <h2 className="font-semibold text-base mb-2" style={{ color: "#2C2C2A" }}>
              Hébergement
            </h2>
            <p>Vercel Inc., 340 Pine Street, Suite 701, San Francisco, CA 94104, USA</p>
          </section>
          <section>
            <h2 className="font-semibold text-base mb-2" style={{ color: "#2C2C2A" }}>
              Données personnelles
            </h2>
            <p>
              Les données collectées lors du bilan (prénom, email, réponses) sont utilisées
              uniquement pour personnaliser les recommandations et vous envoyer des conseils par email
              si vous avez consenti. Elles ne sont jamais revendues à des tiers.
            </p>
            <p className="mt-2">
              Newsletter : si vous cochez la case dédiée lors du bilan, vous recevez un email mensuel
              d'Avenlib. Votre consentement est enregistré avec sa date et conservé tant que vous
              restez abonné. Vous pouvez vous désinscrire à tout moment via le lien présent dans
              chaque email, ou en écrivant à contact@avenlib.fr.
            </p>
            <p className="mt-2">
              Calculateurs : si vous demandez à recevoir le résultat d'un calculateur par email, votre
              adresse, le calculateur utilisé et le résumé du résultat sont enregistrés pour vous envoyer
              cet email. Ces données sont conservées 3 ans maximum. Vous ne recevez la newsletter que si
              vous avez coché la case prévue à cet effet, qui n'est jamais cochée par défaut.
            </p>
            <p className="mt-2">
              Rappel du bilan : si vous avez fait votre bilan et consenti à recevoir nos emails, nous
              pouvons vous envoyer un rappel environ 6 mois plus tard pour le refaire. Chaque email
              contient un lien de désinscription.
            </p>
            <p className="mt-2">
              Responsable du traitement : Avenlib, contact@avenlib.fr. Prestataires utilisés : Supabase
              (base de données), Resend (envoi d'emails), Vercel (hébergement). Base légale : votre
              consentement pour la newsletter et les rappels, l'exécution de votre demande pour l'envoi
              d'un résultat. Vous pouvez aussi saisir la CNIL (cnil.fr) en cas de difficulté.
            </p>
            <p className="mt-2">
              Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de
              suppression de vos données. Contactez-nous à : contact@avenlib.fr
            </p>
          </section>
          <section>
            <h2 className="font-semibold text-base mb-2" style={{ color: "#2C2C2A" }}>
              Cookies
            </h2>
            <p>
              Ce site utilise des cookies d'analyse d'audience via Plausible Analytics (anonyme, sans
              trackers). Aucun cookie publicitaire n'est déposé.
            </p>
          </section>
          <section>
            <h2 className="font-semibold text-base mb-2" style={{ color: "#2C2C2A" }}>
              Liens partenaires
            </h2>
            <p>
              Avenlib peut percevoir une commission en cas de souscription via les liens partenaires
              présents sur le site. Cela ne modifie pas les prix ni les recommandations.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
