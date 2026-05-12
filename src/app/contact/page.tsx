import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact, Avenlib",
};

export default function Contact() {
  return (
    <>
      <Navbar />
      <main className="max-w-xl mx-auto px-6 py-24 text-center">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ backgroundColor: "#EFF9F5" }}
        >
          <Mail size={28} style={{ color: "#1D9E75" }} />
        </div>
        <h1 className="text-3xl font-bold mb-4" style={{ color: "#2C2C2A" }}>
          Nous contacter
        </h1>
        <p className="text-secondary mb-8 leading-relaxed">
          Une question sur ton bilan, un partenariat, ou simplement envie
          de discuter ? On répond sous 24h.
        </p>
        <a
          href="mailto:contact@avenlib.fr"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-btn text-white font-semibold transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#1D9E75" }}
        >
          <Mail size={18} /> contact@avenlib.fr
        </a>
      </main>
      <Footer />
    </>
  );
}
