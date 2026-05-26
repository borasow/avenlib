import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Avenlib, L'indépendance sans l'inquiétude",
  description:
    "Le premier service qui oriente les freelances et indépendants vers les bons experts. Retraite, prévoyance, fiscalité, crédit, santé. Bilan gratuit en 13 questions.",
  keywords: "protection financière, freelance, indépendant, retraite, prévoyance, mutuelle, fiscalité",
  verification: {
    google: "fZzAMahDY16iUIfZOS-JNxHKnvdQTcVoAI8qJq-GbcM",
  },
  openGraph: {
    title: "Avenlib, L'indépendance sans l'inquiétude",
    description:
      "Le premier service qui oriente les freelances et indépendants vers les bons experts. Bilan gratuit en 13 questions.",
    url: "https://avenlib.fr",
    siteName: "Avenlib",
    locale: "fr_FR",
    type: "website",
    images: [{ url: "https://avenlib.fr/logo-avenlib.png", width: 400, height: 200, alt: "Avenlib" }],
  },
  twitter: {
    card: "summary",
    title: "Avenlib | Bilan financier gratuit pour indépendants",
    description: "Retraite, prévoyance, mutuelle, fiscalité — bilan gratuit en 13 questions.",
    images: ["https://avenlib.fr/logo-avenlib.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <script
          defer
          data-domain="avenlib.fr"
          src="https://plausible.io/js/script.js"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
