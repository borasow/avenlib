import type { Metadata } from "next";
import DiagnosticClient from "./DiagnosticClient";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Faire mon diagnostic financier | Avenlib",
  description: "13 questions pour connaître votre situation financière complète. Gratuit, confidentiel, résultat immédiat.",
  openGraph: {
    title: "Faire mon diagnostic financier | Avenlib",
    description: "13 questions pour connaître votre situation financière complète. Gratuit, confidentiel, résultat immédiat.",
    url: "https://avenlib.fr/diagnostic",
    images: [{ url: "https://avenlib.fr/logo-avenlib.png", alt: "Avenlib" }],
  },
};

export default function DiagnosticPage() {
  return (
    <>
      <Navbar />
      <DiagnosticClient />
    </>
  );
}
