import type { Metadata } from "next";
import DiagnosticClient from "./DiagnosticClient";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Bilan gratuit, Votre protection financière en 13 questions",
  description: "Répondez à 13 questions et découvrez exactement ce qu'il vous manque. Gratuit, sans engagement, résultats personnalisés.",
};

export default function DiagnosticPage() {
  return (
    <>
      <Navbar />
      <DiagnosticClient />
    </>
  );
}
