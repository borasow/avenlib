import type { Metadata } from "next";
import { Suspense } from "react";
import ConnexionClient from "./ConnexionClient";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Se connecter, Avenlib",
  description: "Connectez-vous à votre espace Avenlib pour accéder à votre bilan et vos recommandations personnalisées.",
};

export default function PageConnexion() {
  return (
    <>
      <Navbar />
      <Suspense>
        <ConnexionClient />
      </Suspense>
    </>
  );
}
