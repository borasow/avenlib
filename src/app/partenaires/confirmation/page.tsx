import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";

export default function ConfirmationPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ backgroundColor: "#F1EFE8" }}>
      <div className="bg-white rounded-2xl p-10 w-full max-w-md border text-center" style={{ borderColor: "#D3D1C7" }}>
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ backgroundColor: "#EFF9F5" }}
        >
          <CheckCircle size={32} style={{ color: "#1D9E75" }} />
        </div>

        <h1 className="text-2xl font-bold mb-3" style={{ color: "#2C2C2A" }}>
          Demande envoyée !
        </h1>
        <p className="text-sm leading-relaxed mb-8" style={{ color: "#6B6B67" }}>
          Le partenaire va te recontacter dans les prochains jours. Tu recevras aussi un email de confirmation avec les détails de ta demande.
        </p>

        <div
          className="rounded-xl p-4 mb-8 text-left"
          style={{ backgroundColor: "#EFF9F5" }}
        >
          <p className="text-xs font-semibold mb-1" style={{ color: "#085041" }}>
            Et maintenant ?
          </p>
          <p className="text-xs leading-relaxed" style={{ color: "#085041" }}>
            Consulte les autres domaines de ton bilan pour optimiser l'ensemble de ta protection sociale en tant qu'indépendant.
          </p>
        </div>

        <Link
          href="/resultats"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#1D9E75" }}
        >
          Voir mon bilan complet <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
