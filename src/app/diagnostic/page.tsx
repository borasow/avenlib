import type { Metadata } from "next";
import DiagnosticClient from "./DiagnosticClient";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Diagnostic, Avenlib",
  description:
    "Réponds à 13 questions pour identifier tes lacunes en protection financière.",
};

export default function DiagnosticPage() {
  return (
    <>
      <Navbar />
      <DiagnosticClient />
    </>
  );
}
