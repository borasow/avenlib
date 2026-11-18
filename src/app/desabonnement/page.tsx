import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { verifyEmail } from "@/lib/newsletter";
import DesabonnementClient from "./DesabonnementClient";

export const metadata = {
  title: "Désinscription de la newsletter",
  robots: { index: false, follow: false },
};

export default function DesabonnementPage({ searchParams }: { searchParams: { e?: string; t?: string } }) {
  const e = searchParams.e ?? "";
  const t = searchParams.t ?? "";
  let valid = false;
  try {
    valid = !!e && !!t && verifyEmail(e, t);
  } catch {
    valid = false;
  }

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#F1EFE8" }}>
        <section className="max-w-xl mx-auto px-6 py-20">
          <div className="rounded-2xl p-8 text-center" style={{ backgroundColor: "#FFFFFF", border: "2px solid #E8E6DF" }}>
            {valid ? (
              <DesabonnementClient email={e} token={t} />
            ) : (
              <>
                <h1 className="text-2xl font-bold mb-3" style={{ color: "#2C2C2A" }}>Lien invalide</h1>
                <p className="text-sm" style={{ color: "#6B6B67" }}>
                  Ce lien de désinscription n&apos;est pas valide. Écrivez-nous à contact@avenlib.fr et nous vous désinscrirons.
                </p>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
