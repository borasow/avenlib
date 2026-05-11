import type { Metadata } from "next";
import ResultatsClient from "./ResultatsClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Mon diagnostic, Avenlib",
  description: "Ton tableau de bord de protection financière personnalisé.",
};

export default function ResultatsPage() {
  return (
    <>
      <Navbar />
      <ResultatsClient />
      <Footer />
    </>
  );
}
