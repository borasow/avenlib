import type { Metadata } from "next";
import CompteClient from "./CompteClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Mon espace | Avenlib",
  description: "Accède à ton profil et ton tableau de bord Avenlib.",
  robots: { index: false, follow: false },
};

export default function ComptePage() {
  return (
    <>
      <Navbar />
      <CompteClient />
      <Footer />
    </>
  );
}
