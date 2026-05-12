import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#F1EFE8", borderTop: "0.5px solid #D3D1C7" }}>
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Top row */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10 mb-10">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-1.5 mb-3">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#1D9E75" }} />
              <span className="font-bold text-base" style={{ color: "#2C2C2A" }}>Avenlib</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "#6B6B67" }}>
              Le premier service qui oriente les freelances vers les bons experts pour leur protection financière.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-x-16 gap-y-6 text-sm" style={{ color: "#6B6B67" }}>
            <div className="flex flex-col gap-2.5">
              <p className="font-semibold text-xs uppercase tracking-wider mb-1" style={{ color: "#2C2C2A" }}>Produit</p>
              <Link href="/#pourquoi" className="hover:text-[#2C2C2A] transition-colors">Pourquoi Avenlib</Link>
              <Link href="/#comment" className="hover:text-[#2C2C2A] transition-colors">Comment ça marche</Link>
              <Link href="/diagnostic" className="hover:text-[#2C2C2A] transition-colors">Faire mon bilan</Link>
            </div>
            <div className="flex flex-col gap-2.5">
              <p className="font-semibold text-xs uppercase tracking-wider mb-1" style={{ color: "#2C2C2A" }}>Société</p>
              <Link href="/contact" className="hover:text-[#2C2C2A] transition-colors">Qui sommes-nous</Link>
              <Link href="/contact" className="hover:text-[#2C2C2A] transition-colors">Contact</Link>
            </div>
            <div className="flex flex-col gap-2.5">
              <p className="font-semibold text-xs uppercase tracking-wider mb-1" style={{ color: "#2C2C2A" }}>Légal</p>
              <Link href="/mentions-legales" className="hover:text-[#2C2C2A] transition-colors">Mentions légales</Link>
              <Link href="/cgu" className="hover:text-[#2C2C2A] transition-colors">CGU</Link>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-xs"
          style={{ borderTop: "0.5px solid #D3D1C7", color: "#6B6B67" }}
        >
          <span>© 2026 Avenlib, Tous droits réservés</span>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-[#2C2C2A] transition-colors"
          >
            <ExternalLink size={13} />
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
