import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Avenlib, Ta protection financière, enfin claire",
  description:
    "13 questions pour savoir exactement ce qu'il te manque en protection financière, et où le trouver. Retraite, prévoyance, santé, fiscalité pour indépendants.",
  keywords: "protection financière, freelance, indépendant, retraite, prévoyance, mutuelle, fiscalité",
  openGraph: {
    title: "Avenlib, Ta protection financière, enfin claire",
    description:
      "13 questions pour savoir exactement ce qu'il te manque, et où le trouver.",
    url: "https://avenlib.fr",
    siteName: "Avenlib",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
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
